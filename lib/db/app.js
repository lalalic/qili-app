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
	indexes={},
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
            p.resolve(_apps)
        },p.reject.bind(p))

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
        var {_id:old}=_current||{},
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

    static get indexes(){
        if(typeof(indexes[_current._id])!=='undefined')
            return Promise.as(indexes[_current._id])
        return this.ajax({
            url:this.server+'indexes',
			method:'get',
            _apiKey: _current.apiKey
        }).then(function(d){
            return indexes[_current._id]=d
        })
    }

	static get schema(){
        if(typeof(schemas[_current._id])!=='undefined')
            return Promise.as(schemas[_current._id])
        return this.ajax({
            url:this.server+'schemas',
			method:'get',
            _apiKey: _current.apiKey
        }).then(function(d){
            return schemas[_current._id]=d
        })
    }

    static setSchema(newSchema){
		return this.ajax({
            url:this.server+'schemas',
			method:'post',
            _apiKey: _current.apiKey
        }).then(function(){
            return schemas[_current._id]=newSchema
        })
    }

    static collectionData(colName, data){
        var isBuiltIn=builtIns.indexOf(colName)!=-1;

        !isBuiltIn && dataDB.addCollection(colName);

        var p=new Promise();
		if(data==undefined)
			dataDB[colName].find().fetch((a)=>p.resolve(a), p.reject.bind(p))
		else
			dataDB[colName].upsert(data,(a)=>p.resove(a), p.reject.bind(p))
        return p
    }

    static collectionIndexes(colName){
		var p=new Promise()
        this.indexes.then(function(all){
			p.resolve(all[colName])
		}, p.reject.bind(p))
		return p
    }

    static getLog(opt){
        var p=new Promise()
        dataDB['logs'].find(opt).fetch((logs)=>p.resolve(logs),p.reject.bind(p))
        return p
    }
}
