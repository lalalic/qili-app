var {Service}=require('./service'),
    User=require('./user'),
    {RemoteDb}=require('minimongo'),
    {EventEmitter}=require('events'),
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
    event=new EventEmitter();

export default class Application extends Service.BuiltIn{
    static init(){
        this.super('init')()
        if(!User.current)
            return Promise.resolve()

        return new Promise((resolve,reject)=>{
            this.find().fetch(function(d){
                _apps=d
                _current=_apps[0]
                resolve(_apps)
            },reject)

            dataDB=new RemoteDb(this.server+'classes',{},function(method, url, params, data, success, error){
                this.httpclient(method, url, params, data, success, error, _current.apiKey)
            }.bind(this))
        })
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
        if (!old && !v)
            return _current=v

        var {_id:old}=_current||{},
            {_id:next}=v;
        _last=_current
        _current=v
        event.emit('change')
        return _current
    }

    static get last(){
        return _last
    }
    static get event(){
        return event
    }

    static get indexes(){
        if(typeof(indexes[_current._id])!=='undefined')
            return Promise.resolve(indexes[_current._id])
        return this.ajax({
            url:this.server+'indexes?appman='+_current.apiKey,
			method:'get'
        }).then(function(d){
            return indexes[_current._id]=d
        })
    }

	static get schema(){
        if(typeof(schemas[_current._id])!=='undefined')
            return Promise.resolve(schemas[_current._id])
        return this.ajax({
            url:this.server+'schemas?appman='+_current.apiKey,
			method:'get'
        }).then(function(d){
            return schemas[_current._id]=d
        })
    }

    static setSchema(newSchema){
		return this.ajax({
            url:this.server+'schemas?appman='+_current.apiKey,
			method:'post'
        }).then(function(){
            return schemas[_current._id]=newSchema
        })
    }

    static collectionData(colName, data){
        return new Promise((resolve, reject)=>{
    		if(data==undefined)
                this.ajax({
                    method:'get',
                    url:this.server+'schemas/'+colName+'?appman='+_current.apiKey
                }).then((a)=>resolve(a), reject)
    		else
    			dataDB[colName].upsert(data,(a)=>resove(a), reject)
        })
        return p
    }

    static collectionIndexes(colName){
		return new Promise((resolve, reject)=>{
            this.indexes.then(function(all){
    			resolve(all[colName] || [])
    		}, reject)
        })
    }

    static getLog(level){
        return new Promise((resolve, reject)=>{
            this.ajax({
                method:'get',
                url:this.server+'schemas/logs?appman='+_current.apiKey+(level ? "level="+level : "")
            }).then((a)=>resolve(a), reject)
        })
    }

    static download(){

    }

    static upload(){

    }
}
