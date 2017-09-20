import React, {PropTypes} from "react"
import {compose,withProps, getContext, setDisplayName, wrapDisplayName,createEagerFactory } from "recompose"
import {commitMutation} from "react-relay"
import spreadResponse from "tools/spread-response"

const isDate=date=>typeof date.getMonth === 'function'
export const withMutation=raw=>BaseComponent=>{
	const factory=createEagerFactory(BaseComponent)
	const EagerElement=({environment,...others})=>{
		const {name="mutate",mutation}=typeof(raw)=="function" ? raw(others, {}) : raw
		
		//////hack: make variables default undefined as undefined
		mutation().query.argumentDefinitions.forEach(def=>{
			if(def.defaultValue===null)
				def.defaultValue=undefined
		})
		
		function mutate(data){
			let props=typeof(raw)=="function" ? raw(others, ...arguments) : raw
			const {spread, variables, patch4, patchData, promise,dateFields=[], ...mutation}=props
			let smart={}
			if(patch4){
				const updater=(id,data)=>(store, res)=>{
					let entity=store.get(id)
					if(entity){
						Object.keys(data)
							.forEach(k=>{
								entity.setValue(isDate(data[k]) ? data[k].toISOString() : data[k],k)
							})
					}
				}
				smart.updater=smart.optimisticUpdater=updater(patch4, patchData||data)
			}
			
			let p=new Promise((resolve, reject)=>{
				commitMutation(environment,{
					variables:{...variables,...data},
					...smart,
					...mutation,
					onError: reject,
					onCompleted(res, error){
						if(error){
							reject(error)
						}else{
							resolve(spreadResponse(res, spread, others))
						}
					},
					
				})
			})
			
			if(promise)
				return p
		}
		return factory({...others, [name]:mutate})
	}
	
	const WithMutation=getContext({environment:PropTypes.object})(EagerElement)
	
	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withMutation'))(WithMutation)
	}
	
	return WithMutation
}

export default withMutation