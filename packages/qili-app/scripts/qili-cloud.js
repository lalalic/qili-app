const Path=require("path")
const fs=require("fs")
const request=a=>a

module.exports=class QiliCloud{
	constructor(service="http://qili2.com/1/graphql",appId){
		this.service=service
		this.appId=appId
	}
	
	runQL(id, variables){
		return fetch(this.service,{
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				"X-Application-ID": this.appId,
				"X-Session-Token": this.token
			},
			body:{
				id,
				variables
			}
		}).then(({data, errors})=>{
			if(errors){
				throw new Error(errors.map(a=>a.message).join("\r\n"))
			}
			
			return data
		})
	}
	
	getRCPath(){
		return Path.resolve("~",".qilirc")
	}
	
	saveRC(data){
		let path=this.getRCPath()
		let stream=fs.createFileWriteStream(path)
		stream.write(JSON.stringify(data,null,4))
		stream.end()
	}
	
	loadRC(){
		let path=this.getRCPath()
		try{
			let data=fs.readFileSync(path)
			data=JSON.parse(data)
			return Promise.resolve(data)
		}catch(e){
			return Promise.reject()
		}
	}
	
	getToken(){
		if(this.token){
			return Promise.resolve(this.token)
		}
		
		return this.loadRC()
			.catch(()=>{
				const contact=request("contact")
				return this.runQL("authentication_requestToken_Mutation",{contact})
					.then(()=>{
						const code=request("code")
						return this.runQL("authentication_login_Mutation", {contact,token:code})
					})
					.then(({login:{id, token}})=>{
						this.saveRC({id,token,contact})
						return {id,token,contact}
					})
			})
			.then(({id,token,contact})=>{
				this.token=token
				return this.runQL("console_prefetch_Query")
					.then(({me})=>{
						this.saveRC({...me,contact})
						return this.token=me.token
					})
			})
	}
	
	list(){
		return this.runQL("console_my_apps_Query")
			.then(({me:{apps}})=>apps)
	}
	
	publish(){
		//yarn relay
		//yarn persist
		//yarn cloud
		const cloudCode=fs.readFileSync(Path.resolve(process.cwd(),"cloud/__generated.js"))
		return this.runQL("cloud_update_Mutation",{cloudCode,id:`apps:${this.appId}`})
			.then(()=>this.runQL("console_cloud_Query",{id:`apps:${this.appId}`}))
			.then(({me:{app:{schema}}})=>schema)
	}
	
	create(){
		const name=request("name")
		const uname=request("unique name",false)
		return this.runQL("app_create_Mutation",{name,uname})
			.then(({app_create:{id}})=>this.runQL("console_app_update_Query",{id}))
			.then(app=>{
				console.dir(app)
				this.loadRC()
					.then(data=>this.saveRC({...data,apps:[...data.apps,app]}))
				return app
			})
	}
	
	dev(){
		const value=request("development mode")
		return this.runQL("app_update_Mutation",{id:this.appId, isDev:!!value})
	}
	
	log(){
		return this.runQL("console_log_Query",{id:this.appId})
			.then(({me:{app:{logs:{edges}}}})=>edges.map(a=>a.log))
	}
}