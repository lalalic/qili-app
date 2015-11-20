var React=require('react'),
    {Component, UI:{CommandBar, List, Empty, Icons: { System: {Data, Cloud , Log, More}}}}=require('.'),
	{Command, DialogCommand}=CommandBar,
    {Avatar}=require('material-ui'),
    App=require('./db/app');

export default class Main extends Component{
    render(){
        var content
        if(!App.all || 0==App.all.length)
            content=(<Empty text={<a style={{cursor:"cell"}} onClick={()=>this.context.router.transitionTo("app")}>Create first QiLi!</a>}/>)
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
                <MoreActions ref="more"/>
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
                    leftAvatar={<Avatar onClick={()=>this.context.router.transitionTo("app",App.current={})}>+</Avatar>}>
					{
						App.all.map(function(a){
							return (
								<List.Item primaryText={a.name} key={`${a.name}`}
									leftIcon={<span/>} style={{textAlign:'left'}}
									onClick={()=>this.context.router.transitionTo("app",App.current=a)}/>
							)
						}.bind(this))
					}
				</List.Item>
            </List>
		)
	}
}
Main.contextTypes=MoreActions.contextTypes={router:React.PropTypes.func}
