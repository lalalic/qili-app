const path=require("path")
const fs=require("fs")
const fetch=require("node-fetch")
const chalk=require("chalk")
const prompts=require("prompts")

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
				"X-Application-ID": "qiliAdmin",
				"X-Session-Token": this.token
			},
			body:JSON.stringify({
				id,
				variables
			})
		})
		.then(res=>{
			if(!res.ok){
				throw new Error(res.statusText)
			}
			return res.json()
		})
		.then(({data, errors})=>{
			if(errors){
				throw new Error(errors.map(a=>a.message).join("\r\n"))
			}
			
			return data
		})
	}
	
	static saveRC(data){
		let stream=fs.createWriteStream(path.resolve(require("os").homedir(),".qilirc"))
		stream.end(JSON.stringify(data,null,4))
	}
	
	getToken({token, appId,config, configs,_,apps=[],...rc}){
		if(this.token)
			return Promise.resolve(this)
		
		return Promise.resolve(rc.contact ? {contact:rc.contact} 
				: prompts({name:"contact",type:"text",message:"account contact"}))
			.then(({contact})=>{
				if(token){
					this.token=token
					return {token, contact}
				}
				
				return this.runQL("authentication_requestToken_Mutation",{contact})
					.then(async ()=>{
						const {code}=await prompts({name:"code",type:"text",message:`code in your ${contact}`})
						return this.runQL("authentication_login_Mutation", {contact,token:code})
					})
					.then(({login:{token}})=>{
						this.token=token
						return {token,contact}
					})
			})
			.then(({token,contact})=>{
				return this.runQL("console_prefetch_Query")
					.then(({me:{apps,token}})=>{
						this.token=token
						this.apps=apps
						QiliCloud.saveRC({...rc,apps, token,contact})
						console.log(chalk.blue(`${this.service} connected`))
						return this
					})
			})
			.catch(e=>{
				console.log(chalk.red(e.message))
				throw e
			})
	}
	
	getAppId(){
		return Promise.resolve(this.appId || prompts({
				name:"appId",
				type:"select", 
				message:"select an app", 
				choices: this.apps.map(({name:title,apiKey:value})=>({title,value})),
				initial: 1
			}).then(a=>this.appId=a.appId))
			.then(appId=>this.apps.find(a=>a.apiKey==appId).id)
	}
	
	publish(codeFile){
		return this.getAppId().then(appId=>
			Promise.resolve(fs.readFileSync(codeFile,{encoding:"utf8"}))
				.then(cloudCode=>this.runQL("cloud_update_Mutation",{cloudCode,id:appId}))
				.then(a=>{
					console.log("cloud code updated on server")
					return this.runQL("console_cloud_Query",{id:appId})
				})
				.then(({me:{app:{schema}}})=>{
					return schema
				})
		)
	}
	
	dev(value){
		return this.getAppId().then(appId=>
			this.runQL("app_update_Mutation",{id:appId, isDev:!!value})
		)
	}
	
	log(){
		return this.getAppId().then(appId=>
			this.runQL("console_log_Query",{id:appId})
				.then(({me:{app:{logs:{edges}}}})=>
					edges.map(({node:{type,operation,startedAt,time,status,variables}})=>
						({type,operation,status,startedAt,time,variables})
					)
				)
		)		
	}
}