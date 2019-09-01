import React from "react"
import PropTypes from "prop-types"
import {getContext, setDisplayName, wrapDisplayName}  from "recompose"
import {createFragmentContainer, createPaginationContainer} from "react-relay"
import {Pagination} from "../../components/pagination"

export const withFragment=options=>BaseComponent=>{
	if(typeof(options)=="function"){
		options={data:options}
	}
	let WithFragment=null
	const myGetConnectionFromProps=tryCreateGetConnectionFromProps(options)
	if(myGetConnectionFromProps){
		WithFragment=getContext({connectionConfig:PropTypes.any})(({connectionConfig, ...props})=>{
			let {query,variables, direction,getVariables, getConnectionFromProps=myGetConnectionFromProps, getFragmentVariables}=typeof(connectionConfig)=="function" ? connectionConfig(props) : connectionConfig
			variables=(getVariables ? getVariables(props,{}) : variables)||{}

			const RelayBaseComponent=({relay, pagination=true, ...myProps})=>{
				const connection=getConnectionFromProps(myProps)
				function loadMore(){
					if(relay.hasMore() && !relay.isLoading()){
						relay.loadMore(...arguments)
					}
				}
				return <BaseComponent {...myProps} 
						relay={relay} 
						pagination={pagination && connection && 
							<Pagination {...{
								relay, 
								loadMore,
								pageInfo:connection.pageInfo,
								url(props, cursor, dir){
									if(dir=="backward")
										return null
									return `?q=${JSON.stringify({...variables,cursor})}`
								}
							}}/>
						}
						loadMore={loadMore}
						/>
			}

			const PaginationContainer=createPaginationContainer(RelayBaseComponent, options, {
				getVariables(props,{count,cursor}){
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
		WithFragment=createFragmentContainer(BaseComponent,options)
	}

	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withFragment'))(WithFragment)
	}
	return WithFragment
}

export default withFragment


function tryCreateGetConnectionFromProps(fragmentsSpec){
	try{
		var metadata, fragmentName
		if(!!Object.keys(fragmentsSpec).find(k=>{
			metadata=fragmentsSpec[fragmentName=k]().metadata
			return metadata && metadata.connection && metadata.connection.length>0
		})){	
			//copy from ReactRelayPagination createGetConnectionFromProps
			var path=metadata.connection[0].path
			return function(props){
				var data=props[fragmentName]
				for (var i = 0; i < path.length; i++) {
					if (!data || typeof data !== 'object') {
						return null;
					}
					data = data[path[i]];
				}

				return data;
			}
		}
	}catch(e){
		
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

