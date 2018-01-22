import {Environment, Network, RecordSource,  Store} from 'relay-runtime'

const source=new RecordSource()
const store = new Store(source);
const handlerProvider = null;
const environments={}
const NoService=new Error("Network error")

export default function createEnvironment(props){
	let {user, appId, supportOffline, isOnline, showMessage}=props
	const token=user ? user.token : null
	let key=`${appId}-${!!token}`
	if(environments[key])
		return environments[key]

	if(supportOffline){
		supportOffline.user=user
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
		const {isDev, offline, online}=props
		return fetcherOnline({
			body: JSON.stringify({
				query: isDev===true ? operation.text : undefined, // GraphQL text from input
				id: isDev===true ? undefined : operation.name,
				variables,
			}),
		})
		.catch(e=>{
			offline()

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
				return res
			})
	}

	function fetchQuery(){
		if(isOnline())
			return fetchQueryOnline(...arguments)
		else if(supportOffline)
			return fetchQueryOffline(...arguments)
		else
			return Promise.resolve(NoService)
	}

	let network=Network.create(fetchQuery)

	return Object.assign(new Environment({
		handlerProvider,
		network,
		store,
	}),{
		fetcher(){
			if(isOnline()){
				return fetcherOnline(...arguments)
			}else if(supportOffline){
				return supportOffline.runQL()
			}else{
				return Promise.resolve(NoService)
			}
		},
		runQL(query, variables){
			if(isOnline()){
				return fetcherOnline({body:JSON.stringify(query)})
			}else if(supportOffline){
				return supportOffline.runQL(query, variables)
			}else {
				return Promise.resolve(NoService)
			}
		}
	});
}

function handleErrors(errors, showMessage){
	let {message,stack}=errors.reduce((state,a)=>{
		state.message.add(a.message)
		state.stack.add(a.stack)
		return state
	}, {message:new Set(), stack:new Set()})
	showMessage({message:Array.from(message).join("|"),level:"error"})
	console.error("Server Error\r\n"+Array.from(stack).join("\r\n"))
}
