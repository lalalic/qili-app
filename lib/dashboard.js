var React=require('react'),
    {Component, UI:{CommandBar, List}}=require('.'),
	{FontIcon}=require('material-ui');

export default class Main extends Component{
    render(){
        return (
			<div>
				<CommandBar  className="footbar" 
					items={["Schema","Data","Cloud","Log", (<MoreActions label="..." ref="more" self={()=>this.refs.more}/>)]}
					onSelect={this.onSelect.bind(this)}
					/>
			</div>
		)
    }
	
	onSelect(cmd){
		switch(cmd){
		case 'Schema':
			this.context.router.transitionTo("Schema")
		break
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
Main.contextTypes={router:React.PropTypes.func}

class MoreActions extends CommandBar.DialogCommand{
	renderContent(){
		return (
			<List>
				<List.Item label="Add app" rightIcon={<FontIcon className="mui-font-icon icon-plus"/>} />
			</List>
		)
	}
}