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
require("graphiql/graphiql.css")

export const Dashboard=({router, fetcher})=>(
	<div>
		<GraphiQL fetcher={fetcher}/>
		<CommandBar  className="footbar"
			onSelect={cmd=>router.push(`/${cmd.toLowerCase()}`)}
			items={[
				{action:"Data", icon:<IconData/>},
				{action:"Cloud", icon:<IconCloud/>},
				{action:"Log", icon:<IconLog/>},
				{action:"My", icon:<CheckUpdate><IconAccount/></CheckUpdate>}
				]}
			/>
	</div>
)

export default compose(
	getContext({router:PropTypes.object, fetcher: PropTypes.func}),
	connect(({qili:{current}},{fetcher})=>({
		fetcher(params){
			return fetcher({
				body:JSON.stringify(params),
				headers:{
					"X-Application-ID2": current.split(":").pop()
				}
			}).then(res=>res.json())
		}
	})),
)(Dashboard)
