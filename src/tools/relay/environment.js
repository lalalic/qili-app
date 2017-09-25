import {Environment, Network, RecordSource,  Store, RecordSourceInspector} from 'relay-runtime'

const source = new RecordSource();
const store = new Store(source);
const handlerProvider = null;

const environments={}
	
export default function createEnvironment(service, appId, token){
	let key=`${appId}-${!!token}`
	if(environments[key])
		return environments[key]
	const network = Network.create(function fetchQuery(
		  operation,
		  variables,
		  cacheConfig,
		  uploadables,
		) {
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
		  }).then(response => {
			return response.json();
		  });
		}); // see note below
		
	return environments[key]=new Environment({
	  handlerProvider, // Can omit.
	  network,
	  store,
	});	
}