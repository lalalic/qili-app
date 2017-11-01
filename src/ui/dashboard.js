import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {getContext,compose} from "recompose"

import GraphiQL from 'graphiql'

export const Dashboard=({fetcher,height})=>(
	<GraphiQL
		ref={ql=>{
			if(ql){
				let a=document.querySelector('.graphiql-container')
				a.style.position="absolute"
				a.style.height=`${height}px`
				ql.setState({docExplorerOpen:false})
			}
		}}
		fetcher={fetcher}

		/>
)

export default compose(
	getContext({
		theme: PropTypes.object,
		client: PropTypes.object,
		showMessage: PropTypes.func
	}),
	connect(({qili:{current}},{client,theme,showMessage})=>{
		let height=theme.page.height-theme.footbar.height
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
			},
			height
		}
	}),
)(Dashboard)
