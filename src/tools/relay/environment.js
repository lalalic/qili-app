import {Environment, Network, RecordSource,  Store} from 'relay-runtime'

const source=new RecordSource()
const store = new Store(source);
const handlerProvider = null;
const environments={}
const NoService=new Error("Network error")

export default function createEnvironment(props){
	let {user, appId, supportOffline, network, showMessage, loading, isDev}=props
	const token=user ? user.token : null
	let key=`${appId}-${!!token}`
	if(environments[key])
		return environments[key]

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

			return e
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
			console.debug({error, props, network:network()})
			return e
		}).then(res=>{
			loading(false)
			return res
		})
	}


	return Object.assign(new Environment({
		handlerProvider,
		network:Network.create(fetchQuery),
		store,
	}),{
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
