import React, {Component} from 'react'
import {UI, User} from '.'
import {Avatar} from 'material-ui'
import App from './db/app'

import Data from "material-ui/svg-icons/action/dashboard"
import Cloud from "material-ui/svg-icons/file/cloud"
import Log from "material-ui/svg-icons/action/assignment"
import More from "material-ui/svg-icons/navigation/more-vert"
import IconSettings from "material-ui/svg-icons/action/settings"
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

const {CommandBar, List, Empty}=UI
const {Command, DialogCommand}=CommandBar

export default class Dashboard extends Component{
    shouldComponentUpdate(newProps){
        return this.props.app!=newProps.app
    }

    render(){
        return (
			<div>
                <Empty icon={<Cloud/>} text="Welcome"/>
				<CommandBar  className="footbar" onSelect={cmd=>this.context.router.push(cmd.toLowerCase())}
					items={[
                        {action:"Data", icon:Data},
                        {action:"Cloud", icon:Cloud},
                        {action:"Log", icon:Log},
                        {action:"More", icon:More, onSelect:()=>this.refs.more.show()}
                        ]}
					/>
                <Dashboard.MoreActions ref="more" app={this.props.app}/>
			</div>
		)
    }
	
	static contextTypes={router:React.PropTypes.object}
	
	static MoreActions=class  extends DialogCommand{
		shouldComponentUpdate(){
			return true
		}

		renderContent(){
			return (
				<List>
					<List.Item primaryText="Setting" style={{textAlign:'left'}}
						leftIcon={<IconSettings/>}
						key="setting"
						onClick={()=>this.context.router.push(`app/${this.props.app.name}`)}/>
					
					<List.Divider key={1} inset={true}/>
					
					<List.Item 
						primaryText="create more qili app"
						initiallyOpen={true}
						autoGenerateNestedIndicator={false}
						onTouchTap={a=>this.context.router.push("app")}
						leftIcon={<IconAdd/>}
						nestedItems={
							App.all.map(a=>{
								return (
									<List.Item primaryText={a.name} key={`${a._id}`}
										leftIcon={<span/>}
										rightIcon={<IconItem/>}
										onClick={()=>this.context.router.push(`app/${(App.current=a).name}`)}/>
								)
							})
						}
					/>
				</List>
			)
		}
		static contextTypes={router:React.PropTypes.object}
	}
}