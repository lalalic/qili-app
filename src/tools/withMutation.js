import React, {PropTypes} from "react"
import {compose,withProps, getContext, setDisplayName, wrapDisplayName,createEagerFactory } from "recompose"
import {commitMutation} from "react-relay"
import spreadResponse from "tools/spread-response"

const isDate=date=>typeof date.getMonth === 'function'
export const withMutation=raw=>BaseComponent=>{
	const factory=createEagerFactory(BaseComponent)
	const EagerElement=({environment,...others})=>{
		const {name="mutate"}=typeof(raw)=="function" ? raw(others, {}) : raw
		function mutate(data){
			let props=typeof(raw)=="function" ? raw(others, data) : raw
			const {spread, varName="data", variables, patch4, promise,dateFields=[], ...mutation}=props
			let smart={}
			if(patch4){
				const updater=id=>(store, res)=>{
					let entity=store.get(id)
					if(entity){
						Object.keys(data)
							.forEach(k=>{
								entity.setValue(isDate(data[k]) ? data[k].toISOString() : data[k],k)
							})
					}
				}
				smart.updater=smart.optimisticUpdater=updater(patch4)
			}
			
			let p=new Promise((resolve, reject)=>{
				commitMutation(environment,{
					variables:{...variables,[varName]:data},
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