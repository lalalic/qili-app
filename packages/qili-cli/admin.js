const QiliCloud=require("./cloud")

module.exports=class extends QiliCloud{
    constructor(service, xApplicationID, appId){
        super(...arguments)
        this.appId=appId
    }

    init({service,contact}){
        return this.runQL("console_prefetch_Query")
            .then(({me:{apps,token}})=>{
                this.token=token
                this.apps=apps
                return super.saveRC({service,contact, token, apps})
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
			Promise.resolve(require("fs").readFileSync(codeFile,{encoding:"utf8"}))
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
