const path=require("path")
const fs=require("fs")
const fetch=require("node-fetch")
const chalk=require("chalk")
const prompts=require("prompts")

module.exports=class QiliCloud{
	constructor(service="http://qili2.com/1/graphql", xApplicationID){
		this.service=service
		this.xApplicationID=xApplicationID
	}

	runQL(id, variables){
		return fetch(this.service,{
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				"X-Application-ID": this.xApplicationID,
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
				console.debug(errors)
				throw new Error(errors.map(a=>a.message).join("\r\n"))
			}
			console.debug({runQL:id,variables,data})
			return data
		})
	}

	saveRC(data){
		if(!this.constructor.NAME)
			return Promise.resolve(this)


		//if(data.service!="http://qili2.com/1/graphql")
			//return Promise.resolve(this)

		return new Promise((resolve,reject)=>
			fs.writeFile(path.resolve(require("os").homedir(),`.${this.constructor.NAME.toLowerCase()}rc`), JSON.stringify(data,null,4), (e)=>{
				if(e)
					reject(e)
				else
					resolve(this)
			})
			.then(()=>console.debug("rc saved"))
		)
	}

	getToken({token, config, configs,_,apps=[],verbose,...rc}){
		this.verbose=!!verbose
		if(this.token)
			return Promise.resolve(this)

		return Promise.resolve(rc.contact ? {contact:rc.contact}
				: prompts({name:"contact",type:"text",message:"account contact"}))
			.then(({contact})=>{
				const requestToken=()=>this.runQL("authentication_requestToken_Mutation",{contact})
					.then(async ()=>{
						const {code}=await prompts({name:"code",type:"text",message:`code in your ${contact}`})
						return this.runQL("authentication_login_Mutation", {contact,token:code})
					})
					.then(({login:{token}})=>{
						console.log(chalk.blue(`${this.service} connected`))
						this.token=token
						return this.init({...rc, token, contact})
					})

				if(token){
					this.token=token
					return this.runQL("authentication_renewToken_Query")
						.then(()=>{
							return this.init({...rc,token,contact})
						})
						.catch(requestToken)
				}

				return requestToken()
			})
			.catch(e=>{
				console.log(chalk.red(e.message))
				throw e
			})
	}

	init({service,contact,token}){
		return this.saveRC({service,contact,token})
	}
}
