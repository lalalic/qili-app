import {Service} from './service'
import User from './user'
import {RemoteDb} from 'minimongo'
import Role from './role'
import File from './file'
import Log from './log'

var _apps=[],
    _current=null,
    _last=null,
    schemas={},
	indexes={},
    dataDB;

export default class Application extends Service.BuiltIn{
    static init(name){
        this.super('init')()
        return new Promise((resolve,reject)=>{
            this.find({},{interim:false}).fetch((d)=>{
                _apps=d
                resolve(_apps)
				if(!_current)
					Application.current=(name ? (d.find(a=>a.name==name)||_apps[0]) : _apps[0]);
            },reject)

            dataDB=new RemoteDb(this.server+'classes/',{},function(method, url, params, data, success, error){
                this.httpclient(method, url, params, data, success, error, _current.apiKey)
            }.bind(this))
        })
    }

    static upsert(doc, base, success, error){
        return this.super('upsert')(...arguments)
            .then(function(updated){
                if(_apps.filter(a=>a._id==updated._id).length==0)
                    _apps.push(updated)
                return updated
            }.bind(this))
    }

    static remove(id, success, error){
        return this.super('remove')(...arguments)
            .then(function(){
                _apps=_apps.filter((a)=>a._id!=id)
                this.current=_apps[0]
            }.bind(this))
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
		if(typeof(v)=='string')
			v=_apps.find(a=>a.name==v)

		v=v || null

        if(v!=_current){
			_last=_current
			_current=v
			this.emit('change',_current,_last)
		}
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
            return schemas[_current._id]=d.results
        })
    }

    static setSchema(newSchema){
		return this.ajax({
            url:this.server+'schemas?appman='+_current.apiKey,
			method:'post',
            data:newSchema
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
                }).then((a)=>resolve(a.results), reject)
    		else{
                dataDB.addCollection(colName)
                dataDB[colName].upsert(data,(a)=>resolve(a), reject)
            }
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
                url:`${this.server}schemas/logs?appman=${_current.apiKey}&query=${query}&limit=20`
            }).then((a)=>resolve(a.results), reject)
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
