import {Environment, Network, RecordSource,  Store} from 'relay-runtime'
import print from "graphql/language/printer"
import { SubscriptionClient } from 'subscriptions-transport-ws/dist/client'

const handlerProvider = null;
const NoService=new Error("Network error")

export function createEnvironment({
	service="https://api.qili2.com/1/graphql", //must, such as https://
	appId, //must
	user, 
	token, 
	supportOffline,
	ws:wsService,
	optics=a=>console.debug({reporting:true, ...a}), 
	network=a=>"online", 
	showMessage=console.debug, 
	loading=a=>console.debug(`loading=${a}`), 
	isDev
}){
	const source=new RecordSource()
	const store = new Store(source);

	if(supportOffline){
		supportOffline.user=user
	}

	function handleErrors(errors){
		let {message,stack}=errors.reduce((state,a)=>{
			state.message.add(a.message)
			state.stack.add(a.stack)
			return state
		}, {message:new Set(), stack:new Set()})
		if(isDev){
			showMessage({message:Array.from(message).join("|"),level:"error"})
			console.error("Server Error\r\n"+Array.from(stack).join("\r\n"))
		}else{
			showMessage({message:Array.from(message).join("|"),level:"warn"})
		}
	}


	function fetcherOnline(opt){
		if(supportOffline)
			supportOffline.setSource(source)

		return fetch(service,{
			method: 'POST',
			...opt,
			headers: {
				'content-type': 'application/json',
				"x-application-id": appId,
				"x-session-token": token,
				...(opt?opt.headers:null)
			},
		})
		.then(res=>{
			if(!res.ok){
				throw new Error(res.statusText)
			}
			return res.json()
		})
		.then(res=>{
			if(res.errors)
				handleErrors(res.errors, showMessage)

			if(res.extensions)
				optics(res.extensions.report)

			return res
		})
	}

	function fetchQueryOnline(operation, variables, cacheConfig,uploadables){
		return fetcherOnline({
			body: JSON.stringify({
				query: isDev===true ? operation.text : undefined, // GraphQL text from input
				operationName: isDev===true ? undefined : operation.name,
				variables,
			}),
		})
		.catch(e=>{

			network("offline")

			if(supportOffline)
				return fetchQueryOffline(operation, variables, cacheConfig,uploadables)

			throw e
		})
	}

	function fetchQueryOffline(operation, variables, cacheConfig,uploadables){
		supportOffline.unsetSource(source)
		return supportOffline.runQL(operation.text, variables)
			.then(res=>{
				if(res.errors)
					handleErrors(res.errors, showMessage)

				if(isDev){
					console.dir({
						query:operation.text,
						variables,
						result:res
					})
				}
				return res
			})
	}

	function fetchQuery(operation, variables){
		return (()=>{
			loading(true)
			if(window.__RELAY_BOOTSTRAP_DATA__){
				const {query,variables,data}=window.__RELAY_BOOTSTRAP_DATA__
				delete window.__RELAY_BOOTSTRAP_DATA__
				if(query==operation.id||operation.name){
					return Promise.resolve(data)
				}
			}
			if(network()=="online")
				return fetchQueryOnline(...arguments)
			else if(supportOffline)
				return fetchQueryOffline(...arguments)
			else
				return Promise.resolve(NoService)
		})().catch(e=>{
			loading(false)
			showMessage({message:e.message, level:"error"})
			throw e
		}).then(res=>{
			loading(false)
			return res
		})
	}

	function setupSubscription(){
		const wsUrl=wsService || (([procol,...d])=>['ws',...d].join(":"))(service.split(":"))
		const ws = new SubscriptionClient(wsUrl, {
			reconnect: true,
			lazy:true,
			connectionParams:{
				"x-application-id": appId,
				"x-session-token": token,
			}
		})

		return Object.assign((operation, variables) =>{
			return ws.request({
				query: operation.text,
				operationName: isDev===true ? undefined : operation.name,
				variables
			})
		},{ws})
	}

	const subscription=setupSubscription()
	return Object.assign(new Environment({
		handlerProvider,
		network: Network.create(fetchQuery,subscription),
		store,
	}),{
		changeToken(newToken){
			token=newToken
		},

		fetcher(req){
			loading(true)
			return (()=>{
				if(network()=="online"){
					return fetcherOnline(...arguments)
				}else if(supportOffline){
					let {query, variables}=JSON.parse(req.body)
					return supportOffline.runQL(query, variables)
						.then(result=>{
							if(isDev){
								console.dir({
									query,
									variables,
									result
								})
							}
							return result
						})
				}else{
					return Promise.resolve(NoService)
				}
			})().catch(e=>{
				loading(false)
				showMessage({message:e.message, level:"error"})
				return e
			}).then(res=>{
				loading(false)
				return res
			})
		},

		runQL(query, variables){
			loading(true)
			return (()=>{
				if(network()=="online"){
					return fetcherOnline({body:JSON.stringify(query)})
				}else if(supportOffline){
					return supportOffline.runQL(query, variables)
						.then(result=>{
							if(isDev){
								console.dir({
									query,
									variables,
									result
								})
							}
							return result
						})
				}else {
					return Promise.resolve(NoService)
				}
			})().catch(e=>{
				loading(false)
				showMessage({message:e.message, level:"error"})
				return e
			}).then(res=>{
				loading(false)
				return res
			})
		},

		publish(query,variables){
			const {operation, params}=query()
			const {stringify, parse}=JSON
			try{
				JSON.stringify=(a)=>{
					let counter=0, data=[]
					const str=stringify(a,function(k,v){
						if(v){
							if(v instanceof Uint8Array || v instanceof Blob){
								data.push(v)
								return `__$${++counter}`
							}else if(v.type=="Buffer" && v.data){
								data.push(new Uint8Array(v.data))
								return `__$${++counter}`
							}
						}
						return v
					})
					if(data.length){
						return new Blob([new Uint32Array([str.length]).buffer,str,...data.map(a=>[new Uint32Array([a.length]).buffer,a]).flat()])
					}
					return str
				}

				JSON.parse=()=>1
				return subscription.ws.sendMessage(undefined,'publish',{
					query: isDev===true ? operation.text||params.text : undefined,
					operationName: isDev===true ? undefined : operation.name,
					variables
				})
			}finally{
				Object.assign(JSON,{stringify,parse})
			}
		},

		static(url){
			url=`${service.replace("graphql",appId)}/static${url}`
			return fetch(url,{headers:{"x-session-token": token}})
		}
	});
}
