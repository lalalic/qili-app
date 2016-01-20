var React=require('react'),
    {Component, UI:{CommandBar, List, Empty}}=require('.'),
	{Command, DialogCommand}=CommandBar,
    {Avatar}=require('material-ui'),
    App=require('./db/app');

import Data from "material-ui/lib/svg-icons/action/dashboard"
import Cloud from "material-ui/lib/svg-icons/file/cloud"
import Log from "material-ui/lib/svg-icons/action/assignment"
import More from "material-ui/lib/svg-icons/navigation/more-vert"

export default class Dashboard extends Component{
    componentWillReceiveProps(newProps){
        if(this.props.app!=newProps.app)
            this.forceUpdate()
    }

    render(){
        var content, {app}=this.props
        if(!App.all || 0==App.all.length)
            content=(<Empty text={<a style={{cursor:"cell"}} onClick={()=>this.context.router.transitionTo("app")}>Create first QiLi!</a>}/>)
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
			this.context.router.transitionTo("data")
		break
		case 'Cloud':
			this.context.router.transitionTo("cloud")
		break
		case 'Log':
			this.context.router.transitionTo("log")
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
            setting=(
                    <List.Item primaryText="Setting" style={{textAlign:'left'}}
                    leftIcon={<span/>}
                    onClick={()=>this.context.router.transitionTo("app",App.current)}/>
                )
        return (
            <List>
                {setting}
				<List.Item primaryText={`${App.current ? "More" : "First"} QiLi`}
                    style={{textAlign:'left'}}
                    open={true}
                    leftAvatar={<Avatar onClick={()=>this.context.router.transitionTo("app",App.current={})}>+</Avatar>}>
					{
						App.all.map((a)=>{
							return (
								<List.Item primaryText={a.name} key={`${a._id}`}
									leftIcon={<span/>} style={{textAlign:'left'}}
									onClick={()=>this.context.router.transitionTo("app",App.current=a)}/>
							)
						})
					}
				</List.Item>
            </List>
		)
	}
}
Dashboard.contextTypes=MoreActions.contextTypes={router:React.PropTypes.func}
