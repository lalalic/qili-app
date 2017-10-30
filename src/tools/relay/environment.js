import {Environment, Network, RecordSource,  Store} from 'relay-runtime'

const source = new RecordSource();
const store = new Store(source);
const handlerProvider = null;

const environments={}

export default function createEnvironment(service, appId, token, showMessage=console.log, isDev){
	let key=`${appId}-${!!token}`
	if(environments[key])
		return environments[key]

	const fetcher=opt=>{
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
				showMessage({message:"server error!",level:"error"})
				console.error("server error:"+res.errors.map(a=>a.message).join("\r\n"))
			}
			return res
		},e=>{
			showMessage({message:"server error!",level:"error"})
			console.error("server error:"+e.message)
			throw e
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
		}); // see note below

	return environments[key]=Object.assign(new Environment({
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


