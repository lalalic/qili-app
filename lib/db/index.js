var User=require('./user'),
    Role=require('./role'),
    Log=require('./role'),
    File=require('./file'),
    {Service}=require('./service'),
    Messager=require('../components/messager'),
    React=require('react');

var {RemoteDb, HybridDb, utils}=require('minimongo'),
    Promise = require('apromise'),
    db,dbPromise;

var appId,
    server,
    gHttpErrorHandler;


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
HybridDb.prototype.addCollection=function(name, opt){
    if(!this.localDb[name])
        this.localDb.addCollection(name)

    if(!this.remoteDb[name])
        this.remoteDb.addCollection(name,opt)

    return _addCollection.apply(this,arguments)
}

function httpclient(method, url, params, data, success, error, _appId) {
    if(!appId)
        throw new Error("Please specify application Key first")

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
            var type=xhr.getResponseHeader('Content-Type'),
                r;
            if(type && type.indexOf('/json')!=-1)
                r=JSON.parse(xhr.responseText)
            else
                r=xhr.responseText

            if (xhr.status >= 200 && xhr.status < 300) {
                success && success(r)
            } else {
                gHttpErrorHandler && gHttpErrorHandler(r, xhr.status);
                error && error(r, xhr.status);
            }
        }
    };

    xhr.open(method||'get',url,true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.setRequestHeader('X-Application-Id',_appId||appId)
    if(User.current)
        xhr.setRequestHeader('X-Session-Token',User.current.sessionToken)//current username, same with _id

    xhr.send(typeof(data)=='string' ? data : JSON.stringify(data))
    return xhr
}

export function init(_server,_appId,success, httpError){
    if(dbPromise)
        return dbPromise

    if(!httpError){
        var messager=React.render(<Messager/>, document.body)
        httpError=function(error){
            messager.setState({message:"Server Error:"+error,type:'error'})
        }
    }

    appId=_appId
    server=_server
    gHttpErrorHandler=httpError
    dbPromise=new Promise()



    var errorDB=dbPromise.reject.bind(dbPromise)
    utils.autoselectLocalDb({namespace:'qili'},function(localDb){
        db=new HybridDb(localDb,
                new RemoteDb(server+"classes/",{},httpclient));
        Service.init(db,null,httpclient,server)
        User.init(db).then(function(){
            Role.init(db);
            File.init(db);
            Log.init(db);
            success && success(db);
            dbPromise.resolve(db)
        },errorDB)
    },errorDB)
    return dbPromise
}

exports.User=User
exports.Role=Role
exports.File=File
exports.Log=Log
exports.Model=Service
