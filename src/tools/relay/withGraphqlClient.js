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
		let {client:environment,service, appId}=props
		if(!environment){
			environment=createEnvironment(appId, props.user? props.user.token : undefined)
		}else if(typeof(environment)=="function"){
			environment=environment(props)
		}
		
		return factory({client:environment,...props})
	}
	
	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withGraphqlClient'))(WithGraphqlClient)
	}
	
	return WithGraphqlClient
}

export default withGraphqlClient