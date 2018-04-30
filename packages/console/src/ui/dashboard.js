import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {getContext,compose,mapProps} from "recompose"

import GraphiQL from 'graphiql'

export default compose(
	getContext({
		client: PropTypes.object,
		showMessage: PropTypes.func
	}),
	connect(({console:{current}})=>({current})),
	mapProps(({client,showMessage,current})=>{
		let apiKey=client.get(current).apiKey
		return {
			fetcher(params){
				if(apiKey){
					return client.fetcher({
						body:JSON.stringify(params),
						headers:{
							"X-Application-ID2": apiKey
						}
					})
				}else{
					showMessage({level:"error",message:`system  error`})
				}
			}
		}
	})
)(({fetcher})=><GraphiQL fetcher={fetcher} />)
