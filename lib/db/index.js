
var {RemoteDb, HybridDb, WebSQLDb, IndexedDb, LocalStorageDb, MemoryDb, utils}=require('minimongo'),
    Promise = require('apromise'),
    assign=require('react/lib/object.assign'),
    dbPromise,
    db;

var currentUser=localStorage.getItem('currentUser'),
    appId,
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
    currentUser && xhr.setRequestHeader('X-Session-Token',currentUser.sessionToken)//current username, same with _id

    xhr.send(typeof(data)=='string' ? data : JSON.stringify(data))
}

class Service{
    constructor(){
        this.db=db
        this.cols=this.constructor.cols
    }
    static init(db){
        db.addCollection(this.name)
        this.cols=db[this.name]
    }
    static ajax(o){
        var {context, method,url,params,data, _success, _error}=o,
            p=new Promise();
        success=function(r){
            p.resolve(_success && _success.apply(context,arguments) || r);
        }
        error=function(r,status){
            p.reject(_error && _error.apply(context, arguments) || new Error(r))
        }

        httpclient(method, url, params, data, success, error)
        return p
    }
}

exports.init=function(server,appId,success){
    if(dbPromise)
        return dbPromise

    appId=appId
    server=server

    dbPromise=new Promise()
    utils.autoselectLocalDb({namespace:'qili'},function(localDb){
        db=new HybridDb(localDb,
                new RemoteDb(server+"classes/",{},httpclient));

        (exports.User=require('./user')).init(db)

        (exports.Role=require('./role')).init(db)

        (exports.File=require('./file')).init(db)

        success && success(db);
        dbPromise.resolve(db)
    },function(error){
        dbPromise.reject(error)
    })
    return dbPromise
}

exports.switchApp=function(newAppId, handler){
    var _appId=appId
    appId=newAppId
    try{
        handler()
        appId=_appId
    }catch(e){
        appId=_appId
    }
}

exports.Service=Service
