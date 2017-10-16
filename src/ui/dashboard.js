import React, {Component, PropTypes} from 'react'
import {connect} from "react-redux"
import {getContext,compose} from "recompose"

import IconData from "material-ui/svg-icons/action/dashboard"
import IconCloud from "material-ui/svg-icons/file/cloud"
import IconLog from "material-ui/svg-icons/action/assignment"
import IconAccount from 'material-ui/svg-icons/action/account-box'

import CheckUpdate from "components/check-update"
import CommandBar from "components/command-bar"
import Empty from "components/empty"
import GraphiQL from 'graphiql'

export const Dashboard=({router, fetcher,theme})=>(
	<div>
		<GraphiQL
			ref={ql=>{
				if(ql){
					let a=document.querySelector('.graphiql-container')
					a.style.position="absolute"
					a.style.height=`${theme.page.height-theme.footbar.height}px`
					ql.setState({docExplorerOpen:false})
				}
			}}
			fetcher={fetcher}
			query="query{schema}"
			/>
		<CommandBar  className="footbar"
			onSelect={cmd=>router.push(`/${cmd.toLowerCase()}`)}
			items={[
				{action:"Cloud", icon:<IconCloud/>},
				{action:"Log", icon:<IconLog/>},
				{action:"My", icon:<CheckUpdate><IconAccount/></CheckUpdate>}
				]}
			/>
	</div>
)

export default compose(
	getContext({
		router:PropTypes.object,
		fetcher: PropTypes.func,
		theme: PropTypes.object,
		client: PropTypes.object
	}),
	connect(({qili:{current}},{fetcher,client})=>{
		let apiKey=client.get(current).apiKey
		return {
			fetcher(params){
				return fetcher({
					body:JSON.stringify(params),
					headers:{
						"X-Application-ID2": apiKey
					}
				})
				.then(res=>res.json())
			}
		}
	}),
)(Dashboard)
