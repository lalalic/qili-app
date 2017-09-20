import React, {PropTypes} from "react"
import {QueryRenderer} from "react-relay"
import {createEagerFactory, setDisplayName, wrapDisplayName, getContext} from "recompose"
import spreadResponse from "tools/spread-response"

export const withQuery=raw=>BaseComponent=>{
	const factory=createEagerFactory(QueryRenderer)
	const EargerElement=({environment,...others})=>{
		raw=typeof(raw)=="function" ? raw(others) : raw
		const {spread,query, ...more}=raw
		//////hack: make variables default undefined as undefined
		query().query.argumentDefinitions.forEach(def=>{
			if(def.defaultValue===null)
				def.defaultValue=undefined
		})
		
		return factory({
			render({error, props}){
				if(props){
					return <BaseComponent {...others} {...props} {...spreadResponse(props, spread, others)}/>
				}else if(error){
					return <div>error: {error.toString()}</div>
				}else {
					return <div>loading...</div>
				}
			},
			environment,
			query,
			...more,
			})
		}
	const WithQuery=getContext({environment:PropTypes.object})(EargerElement)
		
	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withQuery'))(WithQuery)
	}
	return WithQuery
}

export default withQuery

