var React=require('react'),
    {Component, Router, UI:{CommandBar, List, Empty, Icons: { System: {Data, Cloud , Log, More}}}}=require('.'),
	{Command, DialogCommand}=CommandBar,
    {Avatar}=require('material-ui'),
    App=require('./db/app');

export default class Dashboard extends Component{
    componentWillReceiveProps(next){
        if(this.props.app!=next.app)
            this.forceUpdate()
    }
    render(){
        var content
        if(!App.all || 0==App.all.length)
            content=(<Empty text={<a style={{cursor:"cell"}} onClick={()=>this.context.history.transitionTo("app")}>Create first QiLi!</a>}/>)
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
        if(!this.props.app)
            return;
		switch(cmd){
		case 'Data':
			this.context.history.transitionTo("data")
		break
		case 'Cloud':
			this.context.history.transitionTo("cloud")
		break
		case 'Log':
			this.context.history.transitionTo("log")
		break
		}
	}
}

class MoreActions extends DialogCommand{
	renderContent(){
        var setting
        if(this.props.app){
            setting=(
                <List.Item primaryText="Setting" style={{textAlign:'left'}}
                    leftIcon={<span/>}
                    onClick={()=>this.context.history.transitionTo("app",this.props.app)}/>
                )
        }
        return (
            <List>
                {setting}
				<List.Item primaryText={`${this.props.app ? "More" : "First"} QiLi`}
                    style={{textAlign:'left'}}
                    leftAvatar={<Avatar onClick={()=>this.context.history.transitionTo("app",App.current={})}>+</Avatar>}
                    nestedItems={
                        App.all.map((a)=>(
                            <List.Item primaryText={a.name} key={`${a.name}`}
                                leftIcon={<span/>} style={{textAlign:'left'}}
                                onClick={()=>this.context.history.transitionTo("app",App.current=a)}/>
                        ))}
                    />
            </List>
		)
	}
}
Dashboard.contextTypes=MoreActions.contextTypes={history:Router.PropTypes.history}
