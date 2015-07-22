var {Service}=require('./service'),
    User=require('./user'),
    Promise=require('apromise'),
    {RemoteDb}=require('minimongo'),
    Role=require('./role'),
    File=require('./file'),
    Log=require('./log');

var _apps,
    _current,
    _last,
    schemas={},
    dataDB,
    builtIns=[User._name, Role._name, File._name,Log._name,'apps'],
    onCurrentChange=null;

export default class Application extends Service.BuiltIn{
    static init(){
        this.super('init')()
        if(!User.current)
            return Promise.as()

        var p=new Promise(), remote=false
        this.find().fetch(function(d){
            _apps=d
            _current=_apps[0]
            if(!remote && d.length==0)
                return;
            p.resolve(_apps)
        },p.reject)

        dataDB=new RemoteDb(this.server+'classes',{},function(method, url, params, data, success, error){
            this.httpclient(method, url, params, data, success, error, _current.apiKey)
        }.bind(this))

        builtIns.forEach(function(name){
            dataDB.addCollection(name,{url:this.server+name})
        }.bind(this))

        return p
    }
    static get _name(){
        return 'apps'
    }
    static get all(){
        return _apps
    }
    static get current(){
        return _current
    }
    static set current(v){
        var {_id:old}=_current,
            {_id:next}=v;
        _last=_current
        _current=v
        if(onCurrentChange && old!=next)
            onCurrentChange()
        return _current
    }

    static get last(){
        return _last
    }
    static onCurrentChange(h){
        onCurrentChange=h
    }

    static get schema(){
        if(typeof(schemas[_current._id])!=='undefined')
            return Promise.as(schemas[_current._id])
        return this.ajax({
            url:this.server+'schemas',
            _apiKey: _current.apiKey
        }).then(function(d){
            return schemas[_current._id]=d
        })
    }

    static set schema(newSchema){

    }

    static collectionData(colName){
        var isBuiltIn=builtIns.indexOf(colName)!=-1;

        !isBuiltIn && dataDB.addCollection(colName);

        var p=new Promise();
        dataDB[colName].find().fetch(function(data){
            p.resolve(data)
        })
        return p
    }

    static collectionSchema(colName){
        return this.schema.then(function(all){
            return all.filter((a)=>a.name==colName)
        })
    }

    static getLog(opt){
        var p=new Promise()
        dataDB['logs'].find(opt)
            .fetch(function(logs){
                p.resolve(logs)
            })
        return p
    }

    static downloadLog(){

    }

    static cleanLog(){

    }

    static download(){

    }

    static upload(){

    }
}
