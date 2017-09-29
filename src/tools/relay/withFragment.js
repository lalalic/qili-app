import React,{PropTypes} from "react"
import {compose,withProps, getContext, setDisplayName, wrapDisplayName,createEagerFactory}  from "recompose"
import {createFragmentContainer, createPaginationContainer} from "react-relay"

export const withFragment=options=>BaseComponent=>{
	let WithFragment=null
	if(isPagination(options)){
		WithFragment=getContext({pagination:PropTypes.any})(({pagination, ...props})=>{
			let {query,variables, direction,getVariables, getConnectionFromProps, getFragmentVariables}=typeof(pagination)=="function" ? pagination(props) : pagination
			let factory=createEagerFactory(createPaginationContainer(BaseComponent, options, {
				getVariables(props,{count,cursor}){
					if(getVariables)
						return getVariables(...arguments)
					return {
						...variables,
						count,
						cursor,
					}
				},
				direction,
				getConnectionFromProps,
				getFragmentVariables,
				query,
			}))
			return factory(props)
		})
	}else{
		let factory=createEagerFactory(BaseComponent)
		WithFragment=createFragmentContainer(props=>factory(props),options)
	}

	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withFragment'))(WithFragment)
	}
	return WithFragment
}

export default withFragment


function isPagination(gql){
	let {metadata}=gql[Object.keys(gql)[0]]()
	return metadata && metadata.connection && metadata.connection.length>0
}
