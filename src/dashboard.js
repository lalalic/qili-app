import React, {Component} from 'react'
import {UI} from '.'

import Data from "material-ui/svg-icons/action/dashboard"
import Cloud from "material-ui/svg-icons/file/cloud"
import Log from "material-ui/svg-icons/action/assignment"

import IconAccount from 'material-ui/svg-icons/action/account-box'

const {CommandBar, Empty}=UI

export default class Dashboard extends Component{
    render(){
        return (
			<div>
                <Empty icon={<Cloud/>} text="Welcome to Qili"/>
				<CommandBar  className="footbar" 
					onSelect={cmd=>this.context.router.push(cmd.toLowerCase())}
					items={[
                        {action:"Data", icon:Data},
                        {action:"Cloud", icon:Cloud},
                        {action:"Log", icon:Log},
						{action:"My", icon:IconAccount}
                        ]}
					/>
			</div>
		)
    }
	
	static contextTypes={router:React.PropTypes.object}
	
}