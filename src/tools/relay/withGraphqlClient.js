import React, {PropTypes} from "react"
import {compose, withContext, setDisplayName, wrapDisplayName,createEagerFactory} from "recompose"
import createEnvironment from "./environment"

export const withGraphqlClient=options=>BaseComponent=>{
	const factory=createEagerFactory(
			withContext(
				{client: PropTypes.object},
				({client})=>({client})
			)((BaseComponent))
		)
	
	const WithGraphqlClient=props=>{
		let {client:environment,service, appId, user}=props
		if(!environment){
			environment=createEnvironment(service, appId, user? user.token : undefined)
		}else if(typeof(environment)=="function"){
			environment=environment(props)
		}
		
		environment.get=function(id){
			let store=this.getStore()
			return store.getSource().get(id)
		}
		
		environment.getAll=function(type){
			let store=this.getStore()
			let source=store.getSource()
			let ex=type[0].toLowerCase()+type.substr(1)+'s'
			return source.getRecordIDs()
				.filter(id=>id.startsWith(ex))
				.map(id=>source.get(id))
		}
		
		return factory({client:environment,...props})
	}
	
	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withGraphqlClient'))(WithGraphqlClient)
	}
	
	return WithGraphqlClient
}

export default withGraphqlClient