import React, {Component,createFactory} from "react"
import PropTypes from "prop-types"
import {withContext} from "recompose"
import {ConnectionHandler} from "relay-runtime"
import {createEnvironment} from "./environment"

export const withGraphqlClient=(options={})=>BaseComponent=>{
	const factory=createFactory(
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

	class WithGraphqlClient extends Component{
		constructor(){
			super(...arguments)
			this.createEnvironment()
		}
		
		createEnvironment(){
			const props=this.props
			let {client:environment}=props
			let clientOpts=typeof(options)=="function" ? options(props) : options
			environment=environment||clientOpts.environment
			if(!environment){
				environment=createEnvironment({...props,...clientOpts})
				environment.get=function(id){
					let store=this.getStore()
					return store.getSource().get(id)
				}

				environment.getAll=function(type){
					let store=this.getStore()
					let source=store.getSource()
					return source.getRecordIDs()
						.filter(id=>id.startsWith(type))
						.map(id=>source.get(id))
						.filter(a=>!!a)
				}


				environment.connection=function(store,key,filter,id="client:root"){
					const record=store.get(id)
					const connection=ConnectionHandler.getConnection(record,key,filter)
					const type=node=>{
						let TypeComment=node.id.split(":")[0]
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
			
			this.environment=environment
		}
		
		render(){
			this.environment.changeToken(this.props.token)
			return factory({client:this.environment,...this.props})
		}
	}
	return WithGraphqlClient
}

export default withGraphqlClient
