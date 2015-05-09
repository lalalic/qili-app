var User=require('./user')

var {RemoteDb, HybridDb, WebSQLDb, IndexedDb, LocalStorageDb, MemoryDb, utils}=require('minimongo'),
    Promise = require('apromise'),
    assign=require('react/lib/object.assign'),
    db,dbPromise;

var appId,
    server;


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
    //alert('websql is replaced with sqlite')
}

var _addCollection=HybridDb.prototype.addCollection
HybridDb.prototype.addCollection=function(name){
    if(!this.localDb[name])
        this.localDb.addCollection(name)

    if(!this.remoteDb[name])
        this.remoteDb.addCollection(name)

    return _addCollection.apply(this,arguments)
}


function httpclient(method, url, params, data, success, error) {
    if(!appId)
        throw new Error("Please specify application Key first")

    if(params){
        params.selector && (params.query=params.selector);
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
            var type=xhr.getResponseHeader('Content-Type'),
                r;
            if(type && type.indexOf('/json')!=-1)
                r=JSON.parse(xhr.responseText)
            else
                r=xhr.responseText

            if (xhr.status >= 200 && xhr.status < 300) {
                success && success(r)
            } else {
                error && error(r, xhr.status)
            }
        }
    };

    xhr.open(method,url,true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.setRequestHeader('X-Application-Id',appId)
    if(User.current)
        xhr.setRequestHeader('X-Session-Token',User.current.sessionToken)//current username, same with _id

    xhr.send(typeof(data)=='string' ? data : JSON.stringify(data))
}

export function init(server,appId,success){
    if(dbPromise)
        return dbPromise

    appId=appId
    server=server
    dbPromise=new Promise()

    var errorDB=dbPromise.reject.bind(dbPromise)
    utils.autoselectLocalDb({namespace:'qili'},function(localDb){
        db=new HybridDb(localDb,
                new RemoteDb(server+"classes/",{},httpclient));
        require('./service').Service.init(db,null,httpclient,server)
        User.init(db).then(function(){
            require('./role').init(db);
            require('./file').init(db);
            success && success(db);
            dbPromise.resolve(db)
        },errorDB)
    },errorDB)
    return dbPromise
}

export function switchApp(newAppId, handler){
    var _appId=appId
    appId=newAppId
    try{
        handler()
        appId=_appId
    }catch(e){
        appId=_appId
    }
}
