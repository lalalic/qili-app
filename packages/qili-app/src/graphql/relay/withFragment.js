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
				function loadMore(pageSize, ...more){
					if(typeof(pageSize)!=="number"){//try to get count from query.count.defaultValue
						more=typeof(pageSize)!="undefined" ? [pageSize, ...more] : more
						const argCount=query().operation.argumentDefinitions.find(a=>a.name=="count" && a.defaultValue)
						if(argCount){
							pageSize=argCount.defaultValue
						}else{
							pageSize=20
						}
					}
					if(relay.hasMore() && !relay.isLoading()){
						relay.loadMore(pageSize, ...more)
					}else if(typeof(more[0])=="function"){
						more[0]()
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
			function getConnectionFromProps(props){
				var data=props[fragmentName]
				for (var i = 0; i < path.length; i++) {
					if (!data || typeof data !== 'object') {
						return null;
					}
					data = data[path[i]];
				}

				return data;
			}

			return getConnectionFromProps
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

