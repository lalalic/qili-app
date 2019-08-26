import {Environment, Network, RecordSource,  Store} from 'relay-runtime'
import {RelayNetworkLayer,urlMiddleware} from "react-relay-network-modern/lib"
import RelayClientSSR from 'react-relay-network-modern-ssr/lib/client'

import isNode from "../is-node"

const handlerProvider = null;
const NoService=new Error("Network error")

export default function createEnvironment(props){
	if(isNode){
		return createServerEnvironment(...arguments)
	}
	
	const source=new RecordSource(window._initRelay)
	const store = new Store(source);

	let {user, token, appId, supportOffline, network=a=>a, showMessage=a=>a, loading=a=>a, isDev}=props
	
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

		const {service,optics:report}=props
		return fetch(service,{
			method: 'POST',
			...opt,
			headers: {
				'content-type': 'application/json',
				"X-Application-ID": appId,
				"X-Session-Token": token,
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
				report(res.extensions.report)

			return res
		})
	}

	function fetchQueryOnline(operation, variables, cacheConfig,uploadables){
		return fetcherOnline({
			body: JSON.stringify({
				query: isDev===true ? operation.text : undefined, // GraphQL text from input
				id: isDev===true ? undefined : operation.name,
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

	function fetchQuery(){
		return (()=>{
			loading(true)
			if(network()=="online")
				return fetchQueryOnline(...arguments)
			else if(supportOffline)
				return fetchQueryOffline(...arguments)
			else
				return Promise.resolve(NoService)
		})().catch(e=>{
			loading(false)
			showMessage({message:e.message, level:"error"})
			console.debug({error:e, props, network:network()})
			throw e
		}).then(res=>{
			loading(false)
			return res
		})
	}

	function createNetwork(){
		const relayClientSSR = new RelayClientSSR(window.__RELAY_BOOTSTRAP_DATA__)
		return new RelayNetworkLayer([
			(next)=>async (req) =>{
				loading(true)
				if(network()=="online"){
					const res=await next(req)
					loading(false)
					return res
				}else if(supportOffline){
					return fetchQueryOffline({text:req.query}, req.variables)
				}else
					return Promise.resolve(NoService)
			},
			relayClientSSR.getMiddleware({
				// Will preserve cache rather than purge after mount.
				lookup: false
			}),

			urlMiddleware({
				url:req=>props.service,
				headers:{
					"X-Application-ID": appId,
					"X-Session-Token": token,
				},
			})
		])
	}

	return Object.assign(new Environment({
		handlerProvider,
		network: createNetwork(),//Network.create(fetchQuery),
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
		}
	});
}


function createServerEnvironment({app,user}){
	function fetchQuery(operation, variables){
		return app.runQL(typeof(operation)=="string" ? operation : operation.text,variables)
	}

	return Object.assign(new Environment({
		handlerProvider,
		network:Network.create(fetchQuery),
		store:new Store(new RecordSource()),
	}),{
		changeToken(){

		},
		fetcher(){

		},
		runQL:fetchQuery
	})

}
