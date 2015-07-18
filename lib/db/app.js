var {Service}=require('./service'),
    User=require('./user'),
    Promise=require('apromise'),
    {RemoteDb}=require('minimongo'),
    Role=require('./role'),
    File=require('./file');

var _apps,
    _current,
    schemas={},
    dataDB,
    builtIns=[User._name, Role._name, File._name];

export default class Application extends Service.BuiltIn{
    static init(){
        this.super('init')()
        if(!User.current)
            return Promise.as()

        var p=new Promise()
        this.ajax({
            url:this.server+this._name
        }).then(function(d){
            _apps=d.results
            _current=_apps[0]
            p.resolve(_apps)
        })

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
        return _current=v
    }

    static getSchema(){
        if(typeof(schemas[_current._id])!=='undefined')
            return Promise.as(schemas[_current._id])
        return this.ajax({
            url:this.server+'schemas',
            _apiKey: _current.apiKey
        }).then(function(d){
            return schemas[_current._id]=d.results
        })
    }

    static setSchema(newSchema){

    }

    static getData(colName){
        return Promise.as([])
        var isBuiltIn=builtIns.indexOf(colName)!=-1;

        !isBuiltIn && dataDB.addCollection(colName);

        var p=new Promise();
        dataDB[colName].find().fetch(function(data){
            if(isBuiltIn)
                dataDB.removeCollection(colName)

            p.resolve(data)
        })
        return p
    }
}
