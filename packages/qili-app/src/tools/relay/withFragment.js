import React from "react"
import PropTypes from "prop-types"
import {compose,withProps, getContext, setDisplayName, wrapDisplayName}  from "recompose"
import {createFragmentContainer, createPaginationContainer} from "react-relay"

export const withFragment=options=>BaseComponent=>{
	let WithFragment=null
	if(isPagination(options)){
		WithFragment=getContext({pagination:PropTypes.any})(({pagination, ...props})=>{
			debugger
			let {query,variables, direction,getVariables, getConnectionFromProps, getFragmentVariables}=typeof(pagination)=="function" ? pagination(props) : pagination
			const PaginationContainer=createPaginationContainer(BaseComponent, options, {
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
			})
			return <PaginationContainer {...props}/>
		})
	}else{
		WithFragment=createFragmentContainer(props=><BaseComponent {...props}/>,options)
	}

	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withFragment'))(WithFragment)
	}
	return WithFragment
}

export default withFragment


function isPagination(gql){
	try{
		let {metadata}=gql[Object.keys(gql)[0]]()
		return metadata && metadata.connection && metadata.connection.length>0
	}catch(e){
		return false
	}
}

const trim=o=>Object.keys(o).reduce((o,k)=>{
  if(o[k]===null){
	  o[k]=undefined
  }else if(typeof(o[k])=="object"){
	  trim(o[k])
  }
  return o
},o)
