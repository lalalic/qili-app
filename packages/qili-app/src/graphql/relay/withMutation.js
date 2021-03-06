import React from "react"
import PropTypes from "prop-types"
import {getContext, setDisplayName, wrapDisplayName } from "recompose"
import {commitMutation} from "react-relay"

import spreadResponse from "../spread-response"

import hack from "./hack-null-default-undefined"

const isDate=date=>date && typeof date.getMonth === 'function'

/**
 * options:
 * all commitMutation options
 * spread?: to spread response on element
 *		>function(response, props): return {} to be spread
 * 		>string : response[spread]
 * 		>false: no spread
 * 		>any other: spread response[Object.keys(response)[0]] only when keys.length==1
 * patch4?: ID, auto update cache store for node[patch4]
 * patchData?: {}, only when patch4 specified
 * 		: spread it to node[patch4] in cache store
 * 		: spread input parameter of mutate to node[patch4]
 * shouldPatch(res): false will not patch, default function is all resonse are not null
 * promise?: boolean, mutate() return promise
 */

export const withMutation=option=>BaseComponent=>{
	const WithMutation=getContext({
			client:PropTypes.object,
			showMessage: PropTypes.func,
			loading: PropTypes.func,
		})(
		({client:environment, showMessage, loading,...others})=>{
			const {name="mutate"}=typeof(option)=="function" ? option(others, {},environment) : option

			function mutate(data){
				loading(true)
				const {spread, variables,
					patch4, patchData,shouldPatch,
					delete4,
					dateFields=[],
					mutation,
					...mutationConfig}=typeof(option)=="function" ? option(others, data, environment) : option
				let smart={}
				if(patch4){
					const updater=(id,data)=>(store,res)=>{
						if(res){//updater only
							if(shouldPatch && !shouldPatch(res)){
								return
							}
						}
						let entity=store.get(id)
						if(entity){
							Object.keys(data)
								.forEach(k=>{
									entity.setValue(isDate(data[k]) ? data[k].toISOString() : data[k],k)
								})
						}
					}
					smart.updater=smart.optimisticUpdater=updater(patch4, patchData||data)
				}else if(delete4){
					smart.updater=smart.optimisticUpdater=store=>{
						store.delete(delete4)
					}
				}

				return new Promise((resolve, reject)=>{
					commitMutation(environment,{
						variables:{...variables,...data},
						...smart,
						mutation:hack(mutation),
						...mutationConfig,
						onError: reject,
						onCompleted(res, error){
							loading(false)
							if(error){
								reject(error)
							}else{
								showMessage("Successful!")
								resolve(spreadResponse(res, spread, others))
							}
						},

					})
				})
			}
			return <BaseComponent {...{...others, [name]:mutate}}/>
		}
	)

	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withMutation'))(WithMutation)
	}

	return WithMutation
}

export default withMutation
