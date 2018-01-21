import {Environment, Network, RecordSource,  Store} from 'relay-runtime'

const source=new RecordSource()
const store = new Store(source);
const handlerProvider = null;
const environments={}

export default function createEnvironment(props){
	let {user, appId, network, supportOffline}=props
	const token=user ? user.token : null
	let key=`${appId}-${!!token}-${network}`
	if(environments[key])
		return environments[key]

	let offlineRunQL=null
	if(supportOffline){
		if(supportOffline===true){
			supportOffline=require("tools/offline").default
		}
		offlineRunQL=supportOffline(source, user, appId)
	}

	switch(network){
		case "online":
			return environments[key]=createOnlineEnvironment({token,...props})
		case "offline":
			return environments[key]=createOfflineEnvironment(offlineRunQL)
	}
}

function createOnlineEnvironment({service, appId, token, showMessage=console.log, isDev,report=a=>a,offline,online}){
	const fetcher=opt=>{
		try{
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
			.then(res=>res.json())
			.then(res=>{
				if(res.errors){
					let {message,stack}=res.errors.reduce((state,a)=>{
						state.message.add(a.message)
						state.stack.add(a.stack)
						return state
					}, {message:new Set(), stack:new Set()})
					showMessage({message:Array.from(message).join("|"),level:"error"})
					console.error("Server Error\r\n"+Array.from(stack).join("\r\n"))
				}
				if(res.extensions)
					report(res.extensions.report)
				online()
				return res
			},offline)
		}catch(e){
			offline(e)
		}
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
		}); // see note below

	return Object.assign(new Environment({
		handlerProvider, // Can omit.
		network,
		store,
	}),{
		fetcher,
		runQL(query){
			return fetcher({body:JSON.stringify(query)})
		}
	});
}

function createOfflineEnvironment(runQL){
	const network = Network.create((
		  operation,
		  variables,
		  cacheConfig,
		  uploadables,
	  ) =>{
			return runQL(operation.text, variables)
		});

	return Object.assign(new Environment({
		handlerProvider, // Can omit.
		network,
		store,
	}),{
		fetcher(){
			throw new Error("not supported")
		},
		runQL
	});
}
