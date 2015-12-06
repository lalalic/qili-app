var {Service}=require('./service'),
    User=require('./user'),
    {RemoteDb}=require('minimongo'),
    Role=require('./role'),
    File=require('./file'),
    Log=require('./log');

var _apps=[],
    _current,
    _last,
    schemas={},
	indexes={},
    dataDB;

export default class Application extends Service.BuiltIn{
    static init(){
        this.super('init')()
        return new Promise((resolve,reject)=>{
            this.find().fetch((d)=>{//may twice
                _apps=d
                resolve()
                if(!_current || d.filter(a=>_current._id==a._id).length==0)
                    Application.current=_apps[0];
                resolve=()=>1
            },reject)

            dataDB=new RemoteDb(this.server+'classes',{},function(method, url, params, data, success, error){
                this.httpclient(method, url, params, data, success, error, _current.apiKey)
            }.bind(this))
        })
    }

    static upsert(doc, base, success, error){
        if(typeof(base)=='function'){
            error=success
            success=base
            base=null
        }
        var isNew=!doc._id
        this.xupsert(doc,base,(updated)=>{
            isNew && _apps.push(updated);
            success && success(updated)
        },error)
    }

    static remove(id, success, error){
        if(!error)
            error=()=>0
        this.cols.remoteCol.remove(id, ()=>{
            _apps=_apps.filter((a)=>a._id!=id)
            this.current=_apps[0]
            this.cols.localCol.resolveRemove(id, success, error)
        }, error)
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
        this.emit('change',_current,_last)
        return _current
    }

    static get last(){
        return _last
    }

    static get indexes(){
        if(typeof(indexes[_current._id])!=='undefined')
            return Promise.resolve(indexes[_current._id])
        return this.ajax({
            url:this.server+'schemas/indexes?appman='+_current.apiKey,
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
        var query=level ? JSON.stringify({level}) : "{}"
        return new Promise((resolve, reject)=>{
            this.ajax({
                method:'get',
                url:`${this.server}schemas/logs?appman=${_current.apiKey}&query=${query}`
            }).then((a)=>resolve(a), reject)
        })
    }

    static download(){

    }

    static upload(codeFile){
        var data=new FormData()
        data.append('clientcode',codeFile, "allin1.html")
        return this.ajax({
            method:'post',
            url:`${this.server}schemas/clientcode?appman=${_current.apiKey}`,
            data
        })
    }

    static isRemovable(app){
        return !this.isCurrentApp(app._id)
    }
}
