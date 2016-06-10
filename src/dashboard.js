import React, {Component} from 'react'
import {UI, User} from '.'
import {Avatar} from 'material-ui'
import App from './db/app'

import Data from "material-ui/svg-icons/action/dashboard"
import Cloud from "material-ui/svg-icons/file/cloud"
import Log from "material-ui/svg-icons/action/assignment"
import More from "material-ui/svg-icons/navigation/more-vert"

const {CommandBar, List, Empty}=UI
const {Command, DialogCommand}=CommandBar

export default class Dashboard extends Component{
    componentWillReceiveProps(newProps){
        if(this.props.app!=newProps.app)
            this.forceUpdate()
    }

    render(){
        var content, {app}=this.props
        if(!App.all || 0==App.all.length)
            content=(<Empty text={<a style={{cursor:"cell"}} onClick={()=>this.context.router.push("app")}>Create first QiLi!</a>}/>)
        else {
            content=(<Empty icon={<Cloud/>} text="Welcome"/>)
        }
        return (
			<div>
                {content}
				<CommandBar  className="footbar" onSelect={this.onSelect.bind(this)}
					items={[
                        {action:"Data", icon:Data},
                        {action:"Cloud", icon:Cloud},
                        {action:"Log", icon:Log},
                        {action:"More", icon:More, onSelect:()=>this.refs.more.show()}
                        ]}
					/>
                <MoreActions ref="more" app={this.props.app}/>
			</div>
		)
    }

	onSelect(cmd){
        if(!App.current)
            return;
		switch(cmd){
		case 'Data':
			this.context.router.push(`/data`)
		break
		case 'Cloud':
			this.context.router.push("/cloud")
		break
		case 'Log':
			this.context.router.push("/log")
		break
		}
	}
}

class MoreActions extends DialogCommand{
    componentWillReceiveProps(newProps){
        this.forceUpdate()
    }

	renderContent(){
        var setting
        if(App.current)
            setting=[(
                    <List.Item primaryText="Setting" style={{textAlign:'left'}}
                    leftIcon={<span/>}
                    key="setting"
                    onClick={()=>this.context.router.push(`app/${App.current.name}`)}/>
                ),(<List.Divider key={1} inset={true}/>)]
        return (
            <List>
                {setting}
				<List.Item primaryText={`${App.current ? "More" : "First"} QiLi`}
                    style={{textAlign:'left'}}
                    initiallyOpen={true}
                    insetChildren={true}
                    leftAvatar={<Avatar onClick={()=>{App.current={};this.context.router.push("app")}}>+</Avatar>}
					nestedItems={
						App.all.map((a)=>{
							return (
								<List.Item primaryText={a.name} key={`${a._id}`}
									leftIcon={<span/>} style={{textAlign:'left'}}
									onClick={()=>this.context.router.push(`app/${(App.current=a).name}`)}/>
							)
						})
					}
				/>
            </List>
		)
	}
}
Dashboard.MoreActions=MoreActions
Dashboard.contextTypes=MoreActions.contextTypes={router:React.PropTypes.object}
