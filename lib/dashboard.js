var React=require('react'),
    {Component, UI:{CommandBar, List, Icons: { System: {Data, Cloud , Log, More}}}}=require('.'),
	{Command, DialogCommand}=CommandBar,
    {Avatar}=require('material-ui'),
    App=require('./db/app');

export default class Main extends Component{
    render(){
        return (
			<div>
				<CommandBar  className="footbar" onSelect={this.onSelect.bind(this)}
					items={[
                        {action:"Data", icon:Data},
                        {action:"Cloud", icon:Cloud},
                        {action:"Log", icon:Log},
                        (<MoreActions label="..." icon={More} ref="more" self={()=>this.refs.more}/>)]}
					/>
			</div>
		)
    }

	onSelect(cmd){
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
		return (
            <List>
				<List.Item primaryText="Setting" style={{textAlign:'left'}}
                    leftIcon={<span/>}
                    onClick={()=>this.context.router.transitionTo("app")}/>
				<List.Item primaryText={`Creat ${App.current ? "more" : "your first"} app`}
                    style={{textAlign:'left'}}
                    leftAvatar={<Avatar onClick={()=>this.context.router.transitionTo("app",App.current={})}>+</Avatar>}>
					{
						App.all.map(function(a){
							if(App.current._id==a._id){
								return (
									<List.Item primaryText={a.name} key={`${a.name}-ascurrent`}
										leftAvatar={<Avatar style={{color:'red'}}>@</Avatar>}
										style={{textAlign:'left'}}
										/>
								)
							}else
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
