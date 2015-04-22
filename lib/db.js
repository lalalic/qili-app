var {RemoteDb, HybridDb, WebSQLDb, IndexedDb, LocalStorageDb, MemoryDb, utils}=require('minimongo'),
    Promise = require('apromise'),
    p=new Promise();


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
    xhr.setRequestHeader('X-Application-Id','evergreen')
    xhr.setRequestHeader('X-Session-Token','lalalic')//current username, same with _id


    xhr.send(JSON.stringify(data))
}


utils.autoselectLocalDb({namespace:'evergreen'},function(localDb){
    var server="http://192.168.0.105:9080/1/",
        service=server+"classes/",
        polluterService=service+'polluters';

    var db=new HybridDb(localDb,
            new RemoteDb(service,{},httpclient));

    global.user={}
    
    p.resolve(db)

},function(error){
    p.reject(error)
})

module.exports=p
