import React, {Component, PropTypes} from 'react'
import {getContext} from "recompose"

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
		<GraphiQL
			fetcher={params=>fetcher({body:JSON.stringify(params)}).then(res=>res.json())}/>
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

export default getContext({router:PropTypes.object, fetcher: PropTypes.func})(Dashboard)
