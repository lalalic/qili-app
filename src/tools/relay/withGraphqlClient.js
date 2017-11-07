import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose, withContext, setDisplayName, wrapDisplayName,createEagerFactory} from "recompose"
import {ConnectionHandler} from "relay-runtime"
import createEnvironment from "./environment"

export const withGraphqlClient=options=>BaseComponent=>{
	const factory=createEagerFactory(
			withContext({
					client: PropTypes.object,
					optics: PropTypes.func,
				},
				({client,optics})=>({
					client,
					optics
				})
			)((BaseComponent))
		)

	const WithGraphqlClient=props=>{
		let {client:environment,service, appId, user,showMessage, isDev,optics}=props
		const token=user ? user.token : undefined
		if(!environment){
			environment=createEnvironment(service, appId, token,showMessage,isDev,optics)
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


			environment.connection=function(store,key,filter,id="client:root"){
				const record=store.get(id)
				const connection=ConnectionHandler.getConnection(record,key,filter)
				const type=node=>{
					let typeComments=node.id.split(":")[0]
					let TypeComment=typeComments[0].toUpperCase()+typeComments.substr(1,typeComments.length-2)
					return TypeComment+'Edge'
				}
				return {
					append(node){
						let edge=ConnectionHandler.createEdge(store,connection,store.get(node.id),type(node))
						ConnectionHandler.insertEdgeAfter(connection,edge)
					},
					prepend(node){
						let edge=ConnectionHandler.createEdge(store,connection,store.get(node.id),type(node))
						ConnectionHandler.insertEdgeBefore(connection,edge)
					}
				}

			}
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
