import {Service} from './service'
import User from './user'
import {RemoteDb} from 'minimongo'
import Role from './role'
import File from './file'
import Log from './log'

var schemas={}
	,indexes={}
	,_current=null
    ,dataDB;

export default class Application extends Service.BuiltIn{
    static init(){
        this.super('init')()
        return new Promise((resolve,reject)=>{
            this.find({/*author:{_id:User.current._id}*/},{interim:false})
				.fetch(resolve,reject)
			dataDB=new RemoteDb(this.server+'classes/',{},function(method, url, params, data, success, error){
                this.httpclient(method, url, params, data, success, error, _current.apiKey)
            }.bind(this))

        })
    }

	static set current(v){
		_current=v
	}

    static get _name(){
        return 'apps'
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

	static getSchema(){
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
