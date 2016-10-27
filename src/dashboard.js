import React, {Component, PropTypes} from 'react'
import {UI} from '.'

import Data from "material-ui/svg-icons/action/dashboard"
import Cloud from "material-ui/svg-icons/file/cloud"
import Log from "material-ui/svg-icons/action/assignment"

import IconAccount from 'material-ui/svg-icons/action/account-box'

const {CommandBar, Empty}=UI

export const Dashboard=({router})=>(
	<div>
		<Empty icon={<Cloud/>} text="Welcome to Qili"/>
		<CommandBar  className="footbar" 
			onSelect={cmd=>router.push(`/${cmd.toLowerCase()}`)}
			items={[
				{action:"Data", icon:Data},
				{action:"Cloud", icon:Cloud},
				{action:"Log", icon:Log},
				{action:"My", icon:IconAccount}
				]}
			/>
	</div>
)

export default Dashboard
