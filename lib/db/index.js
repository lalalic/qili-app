import {EventEmitter} from 'events'

;(function(emit){
    EventEmitter.prototype.emit=function(){
        try{
            emit.call(this, ...arguments)
        }catch(e){
            console.error(`EventEmitter error: ${e.message}`)
        }
    }
})(EventEmitter.prototype.emit);

var User=require('./user'),
    Role=require('./role'),
    Log=require('./log'),
    File=require('./file'),
    {Service}=require('./service'),
    __worker;

var {RemoteDb, HybridDb, utils}=require('minimongo'),
    db,dbPromise;

var appId,
    server,
    gHttpErrorHandler,
    loadingHandler;

function makeEnvReady(){
    (function(window){
        if(typeof(window.cordova)!='undefined' && typeof window.sqlitePlugin!='undefined'){
            window.deleteDatabase=window.sqlitePlugin.deleteDatabase
            window.openDatabase=function(){
                var db=window.sqlitePlugin.openDatabase.apply(window.sqlitePlugin,arguments)
                db.version=localStorage.dbVersion||""
                db.changeVersion=function(oldVersion,newVersion,transCallback, error, success){
                    if(this.version!==oldVersion)
                        return error ? error("") : null;

                    if(transCallback){
                        this.transaction(transCallback, error, function(){
                            db.version=localStorage.dbVersion=newVersion
                            typeof(success)!='undefined' && success();
                        })
                    }else{
                        this.version=localStorage.dbVersion=newVersion
                        typeof(success)!='undefined' && success();
                    }
                }
                return db
            }
        }
    })(typeof(window)=='undefined' ?global.window={} : window);

}

function fixMinimongo(db){
    require('./fix-minimongo')(db)
}

function ajaxRequest(method='get', url, params, data, success, error, _appId, _sessionToken) {
    if(!appId)
        throw new Error("Please specify application Key first")
    method=method.toLowerCase()
    loadingHandler.show()
    try{
        if(params){
            params.selector && params.selector!="{}" && (params.query=params.selector);
            var p=[]
            'sort,limit,skipt,fields,query'.split(',').forEach(function(key){
                params[key] && p.push(key+'='+params[key])
            });
            delete params.query;

            url=!p.length ? url : url+(url.indexOf('?')==-1 ? '?' : '&')+p.join('&');
        }

        var xhr=new XMLHttpRequest()

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                try{
                var type=xhr.getResponseHeader('Content-Type'),
                    r;
                if(type && type.indexOf('/json')!=-1){
                    r=JSON.parse(xhr.responseText)
                }else
                    r=xhr.responseText
                    loadingHandler.close()
                }catch(e){
                    loadingHandler.close()
                }

                if (xhr.status >= 200 && xhr.status < 300) {
                    method!='get' && gHttpErrorHandler(`${method=='delete' ? 'Deleted' :'Saved'} successfully`,'Info');
                    success && success(r)
                } else {
                    var m=r||(xhr.status==0&&"No network")||"error happens";
                    error && error(m)==0 && gHttpErrorHandler(m);

                }
            }
        };

        if(method=='post' && data && !(data instanceof FormData) && data._id)
            method='put'

        xhr.open(method,url,true)
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

        var isJson=false

        if(method=='delete')
            xhr.setRequestHeader('Content-type','text/plain');
        else if(data instanceof FormData)
            ;//xhr.setRequestHeader('Content-type','multipart/form-data')
        else{
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
            isJson=true
        }



        xhr.setRequestHeader('X-Application-Id',_appId||appId)
        if(User.current)
            xhr.setRequestHeader('X-Session-Token',User.current.sessionToken)//current username, same with _id
        if(_sessionToken)
            xhr.setRequestHeader('X-Session-Token',_sessionToken)

        xhr.send(typeof(data)=='string' || !isJson ? data : JSON.stringify(data))
    }catch(e){
        console.error(e.message)
        loadingHandler.close()
    }
    return xhr
}

export function init(_server,_appId, success, httpError, _loadingHandler){
    makeEnvReady()

    appId=_appId
    server=_server
    gHttpErrorHandler=httpError || ((e, code)=>console.error(`http error with status ${code}: ${e}`));
    loadingHandler=_loadingHandler || {show:()=>console.info('loading xhr'),close:()=>0}

    return dbPromise=new Promise((resolve, reject)=>{
        utils.autoselectLocalDb({namespace:`qili.${_appId}`},function(localDb){
            db=new HybridDb(localDb,new RemoteDb(server+"classes/",{},ajaxRequest));
            fixMinimongo(db)

            Service.init(null,db, ajaxRequest,server, makeLocalStorage(localDb))
            Service.isCurrentApp=function(__appId){
                return _appId==__appId
            }
            User.init().then(function(){
                Role.init();
                File.init();
                Log.init();

                if(success){
                    User.on('change',()=>success(db))
                    resolve(User.current ? success(db)||db : db)
                }else
                    resolve(db)

                supportWorker(_server, _appId)

                Service.emit('inited')
            },reject)

        },reject)
    })
}

function supportWorker(server, appId){
    return false
    __worker=require('webworkify')(require('./worker.js'))
    ;(function(postMessage){
        __worker.postMessage=function(m, ...data){
            postMessage.call(__worker, {type:m, args:JSON.stringify(data)})
        }
    })(__worker.postMessage);


    __worker.postMessage('init', server, appId)




    User.on('change',()=>__worker.postMessage('user',User.current))
    if(User.current)
        __worker.postMessage('user', User.current)

    ;(function(_addCollection){
        function wrap(success,state, type){
            return ()=>{
                __worker.postMessage(state,type)
                success && success(...arguments)
            }
        }
        HybridDb.prototype.addCollection=function(name, opt){
            _addCollection.call(this,...arguments)
            var r=this[name]

            ;(function(upsert){
                r.upsert=function(docs, bases, success, error){
                    return upsert.call(this, docs, bases, wrap(success,'upsert',name), error)
                }
            })(r.upsert)

            ;(function(remove){
                r.remove=function(id, success, error){
                    return remove.call(this,id, wrap(success,'remove',name),error)
                }
            })(r.remove)

            __worker.postMessage('addCollection',name)
            return r
        }
    })(HybridDb.prototype.addCollection);
}

function makeLocalStorage(localDb){
    localDb.addCollection("__localStorage")
    return {
            getItem(key){
                return new Promise((resolve, reject)=>
                    localDb.__localStorage.findOne({_id:key},(a)=>resolve(a && a.value), reject))
            },
            setItem(key, value){
                return new Promise((resolve, reject)=>
                    localDb.__localStorage.upsert({_id:key,value},resolve, reject))
            },
            removeItem(key){
                return new Promise((resolve, reject)=>
                    localDb.__localStorage.remove(key,resolve, reject))
            }
        }
}

exports.User=User
exports.Role=Role
exports.File=File
exports.Log=Log
exports.Model=Service

/**
* ajax request
* client _id
    * done: ok
* client createdAt, updatedAt
    * done
    * server side would give its own createdAt and updatedAt
        * cache operation Invalid
            * delete then cache
                * same transaction

    * hack in ajax
        * update: createdAt!=updatedAt
            * client insert then update
        * create: createdAt==updatedAt

* return appended part only VS whole object
    * merge client object and server return object

* any upsert and delete must act to server directly
    * cache in local
* any find/findOne must
    * first on local
    * then to remote
        * same with local, without call to success
        * not same with local, call to success

*/
