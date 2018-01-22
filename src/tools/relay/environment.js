import {Environment, Network, RecordSource,  Store} from 'relay-runtime'

const source=new RecordSource()
const store = new Store(source);
const handlerProvider = null;
const environments={}

export default function createEnvironment(props){
	let {user, appId, network, supportOffline}=props
	const token=user ? user.token : null
	let key=`${appId}-${!!token}`
	if(environments[key])
		return environments[key]

	if(supportOffline){
		supportOffline.user=user
	}
	
	function fetchQueryOnline(){

	}

	function fetchQueryOffline(operation, variables, cacheConfig,uploadables,){
		
	}

	function fetchQuery(){
		
	}
	
	let network=Network.create(fetchQuery)
	
	return Object.assign(new Environment({
		handlerProvider,
		network,
		store,
	}),{
		type:"online",
		fetcher,
		runQL(query){
			return fetcher({body:JSON.stringify(query)})
		}
	});
	

	switch(network){
		case "online":
			return environments[key]=createOnlineEnvironment(supportOffline, {token,...props})
		case "offline":
			return environments[key]=createOfflineEnvironment(supportOffline, props)
	}
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

function createOnlineEnvironment(supportOffline, {service, appId, token, showMessage=console.log, isDev,report=a=>a,offline,online}){
	const fetcher=opt=>{
		if(supportOffline)
			supportOffline.setSource(source)

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

	const network = Network.create(function fetchQuery(
		  operation,
		  variables,
		  cacheConfig,
		  uploadables,
		) {
		  return fetcher({
			body: JSON.stringify({
			  query: isDev===true ? operation.text : undefined, // GraphQL text from input
			  id: isDev===true ? undefined : operation.name,
			  variables,
			}),
		  })
			.catch(e=>{
				offline()
				
				if(supportOffline){
					supportOffline.unsetSource(source)  
					return supportOffline.runQL(operation.text, variables)
						.then(res=>{
							if(res.errors)
								handleErrors(res.errors, showMessage)
				
							return res
						})
				}
				
				return e
			})
		}); // see note below

	return Object.assign(new Environment({
		handlerProvider, // Can omit.
		network,
		store,
	}),{
		type:"online",
		fetcher,
		runQL(query){
			return fetcher({body:JSON.stringify(query)})
		}
	});
}

function createOfflineEnvironment(supportOffline, {showMessage}){
	const network = Network.create(function(
			  operation,
			  variables,
			  cacheConfig,
			  uploadables,
		  ){
			supportOffline.unsetSource(source)  
			return supportOffline.runQL(operation.text, variables)
				.then(res=>{
					if(res.errors)
						handleErrors(res.errors, showMessage)
		
					return res
				})
		});

	return Object.assign(new Environment({
		handlerProvider, // Can omit.
		network,
		store,
	}),{
		type:"offline",
		fetcher(){
			throw new Error("not supported")
		},
		runQL:supportOffline.runQL.bind(supportOffline)
	});
}

