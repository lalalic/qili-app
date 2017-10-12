import {Environment, Network, RecordSource,  Store, RecordSourceInspector} from 'relay-runtime'

const source = new RecordSource();
const store = new Store(source);
const handlerProvider = null;

const environments={}
	
export default function createEnvironment(service, appId, token, loading=a=>a, showMessage=console.log){
	let key=`${appId}-${!!token}`
	if(environments[key])
		return environments[key]
	const network = Network.create(function fetchQuery(
		  operation,
		  variables,
		  cacheConfig,
		  uploadables,
		) {
			//loading(true)
		  return fetch(service, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				"X-Application-ID": appId,
				"X-Session-Token": token,
			},
			body: JSON.stringify({
			  query: operation.text, // GraphQL text from input
			  variables,
			}),
		  })
		  .then(res=>res.json())
		  .then(res=>{
			  //loading(false)
			  if(res.errors){
				  showMessage({message:"server error!",level:"error"})
				  console.error("server error:"+res.errors.map(a=>a.message).join("\r\n"))
			  }
			  return res
		  },e=>{
			  //loading(false)
			  showMessage({message:"server error!",level:"error"})
			  console.error("server error:"+e.message)
			  throw e
		  })
		}); // see note below
		
	return environments[key]=new Environment({
	  handlerProvider, // Can omit.
	  network,
	  store,
	});	
}