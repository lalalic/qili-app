import {graphql} from 'graphql'
import DB from "./data-service-websql"

export {default as DataService} from "./data-service"
export {default as Collection} from "./collection"
export {default as Cursor} from "./cursor"
export {default as Websql} from "./data-service-websql"

const typed=id=>{
	const [Type, _id]=id.split(":")
	return [Type,_id]
}

export class Offline{
	constructor(schema){
		this.schema=schema
	}

	setSource(mutableRecordSource){
		if(mutableRecordSource.supportOffline)
			return

		const support=(key, fn)=>{
			let _fn=mutableRecordSource[key]
			mutableRecordSource[`__${key}`]=_fn
			mutableRecordSource[key]=function(){
				let r=_fn.apply(this,arguments)
				fn.apply(null,arguments)
				return r
			}
		}
		support("set", this.set.bind(this))
        support("delete", this.remove.bind(this))
        support("remove", this.remove.bind(this))
		mutableRecordSource.supportOffline=true
		return this
	}

	unsetSource(mutableRecordSource){
		if(mutableRecordSource.supportOffline){
			mutableRecordSource.set=mutableRecordSource.__set
			mutableRecordSource.delete=mutableRecordSource.__delete
			mutableRecordSource.remove=mutableRecordSource.__remove
			delete mutableRecordSource.supportOffline
		}
		return this
	}

	set user(user){
		if(user){
			this._user={id:user}
		}else{
			this._user=null
		}
	}

	set(id, {__id, __typename, ...record}){
		if(id.startsWith("client:"))
			return

		const [Type, _id]=typed(id)

		const {data,refs}=Object.keys(record).reduce((state,k)=>{
			const {data,refs}=state
			let v=record[k]
			if(v && typeof(v)=="object"){
				if(v.__ref){
					refs[k.split("{")[0]]=v.__ref
				}else if(v.__refs){
					refs[k.split("{")[0]]=v.__refs
				}
			}else{
				data[k]=v
			}
			return state
		},{data:{}, refs:{}})

		if(typeof(this[`onSet${Type}`])=="function")
			return this[`onSet${Type}`](_id, data, refs)
		else
			return this.onSet(id, data, refs)
	}

	remove(id){
		const [Type, _id]=typed(id)
		if(typeof(this[`onRemove${Type}`])=="function")
			return this[`onRemove${Type}`](_id)
		else
			return this.onRemove(id)
	}

	onSet(id, record){
		const [Type,_id]=typed(id)
		return this.createOrUpdateEntity(Type, _id, record)
	}

	onSetUser(_id, {...record}){
		return this.createOrUpdateEntity("User", _id, record)
	}

	onRemove(id){
		const [Type,_id]=typed(id)
		return this.removeEntity(Type,_id)
	}

	createOrUpdateEntity(Type, _id, data){
		throw new Error("createOrUpdateEntity must be implemented")
	}

	removeEntity(id){
		throw new Error("removeEntity must be implemented")
	}

	getApp(){
		throw new Error("getApp must be implemented")
	}

	getUser(){
		throw new Error("getUser must be implemented")
	}

	runQL(query, variables){
		if(query.startsWith("mutation "))
			return Promise.reject(new Error("offline not support this action"))

		return Promise.all([Promise.resolve(this.getApp()), Promise.resolve(this.getUser())])
			.then(([app,user])=>graphql(this.schema, query, {}, {user,app}, variables))
			.catch(e=>{
				console.error(e)
				return e
			})
	}
}

export default class WebSQLOffline extends Offline{
	constructor(appKey,...others){
		super(...others)
		this.db=new DB(appKey)
		this.seq=Promise.resolve()
	}

	getApp(){
		return this.db
	}

	getUser(){
		return this.db.get1Entity("User",this._user)
	}

	createOrUpdateEntity(Type, _id, data){
		return this.seq=this.seq.then(()=>
			this.db.get1Entity(Type,{_id})
			.then(doc=>this.db.createEntity(Type, {_id, ...doc, ...data}))
			.catch(console.error)
		)
	}

	removeEntity(Type,_id){
		return this.seq=this.seq.then(()=>
			this.db.remove1Entity(Type, {_id})
				.catch(console.error)
		)
	}
}
