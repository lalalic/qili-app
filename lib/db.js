
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

class User extends Service{
    /**
	 *  @returns {Promise}
	 */
	static signup(user){
		return Service.ajax({
            method:'post',
            url:server+'/users',
            data:user}).then(function(data){
                currentUser=assign({},user,data)
    			localStorage.setItem('currentUser',JSON.stringify(currentUser.toJSON()))
    			return currentUser
    		})
	}
	/**
	 *  @returns {Promise}
	 */
	static signin(user){
		return Service.ajax({
    			url:server+'/login',
    			method:'get',
    			data:user
    		}).then(function(user){
                currentUser=user
    			localStorage.setItem('currentUser',JSON.stringify(currentUser.toJSON()))
    			return currentUser
    	})
	}
	/**
	 *  @returns {Promise}
	 */
	static verify(){
		if(!localStorage.getItem('sessionToken'))
			return

		return Service.ajax({
			url:server+'/me',
			method:'get'
		}).then(function(user){
			currentUser=user
			localStorage.setItem('currentUser',JSON.stringify(currentUser.toJSON()))
            return currentUser
		},function(e){
			User.logout()
			return e
		})
	}
	/**
	 *  @returns {Promise}
	 */
	static requestPasswordReset(email){
		return Service.ajax({
			url:server+'/requestPasswordReset',
			method:'POST',
			data:{email:email}.toJSON()
		})
	}
	/**
	 *  @instance
	 */
    static logout(){
		currentUser=null
		sessionToken=null
        localStorage.removeItem('currentUser')
		localStorage.removeItem('JSESSIONID')
		location.reload()
	}
}

class Role extends Service{

}

class File extends Service{

}

function init(server,appId,success){
    if(dbPromise)
        return dbPromise

    appId=appId
    server=server

    dbPromise=new Promise()
    utils.autoselectLocalDb({namespace:'qili'},function(localDb){
        db=new HybridDb(localDb,
                new RemoteDb(server+"classes/",{},httpclient));
        db.addCollection('roles')
        success && success(db);
        dbPromise.resolve(db)
    },function(error){
        dbPromise.reject(error)
    })
    return dbPromise
}


exports.init=init
exports.Service=Service
exports.User=User
exports.Role=Role
exports.File=File
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
Object.defineProperties(exports,{
    db: {
        get(){
            return db
        }
    }
})
