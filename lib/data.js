var React=require('react'),
    {Component, User, UI: {List, Loading, Empty, CommandBar}}=require('.'),
    App=require("./db/app"),
    {Tabs, Tab}=require('material-ui');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={col:User._name}
    }
    render(){
		var {col:colName}=this.state
        return (
			<div>
				<Tabs>
					<Tab label={`${colName}: Data`}>
						<List.Table model={App.collectionData(colName)} columnOrder={["_id","name"]}/>
					</Tab>
					<Tab label={`Schema`}>
						<List.Table model={App.collectionSchema(colName)} columnOrder={["name"]}/>
					</Tab>
				</Tabs>
				<CommandBar className="footbar" style={{textAlign:'left'}}
					onSelect={this.onSelect.bind(this)}
					items={["Back", "Upload Schema", "Upload Data",
                            (<Names ref="names" label="Collection" self={()=>this.refs.names}
						         onItemClick={(a)=>this.setState({col:a.name})}/>) ]}/>
			</div>
        )
    }
    onSelect(cmd){
        switch(cmd){
            case "Upload Schema":
            break
            case "Upload Data":
            break
        }
	}
}
class Names extends CommandBar.DialogCommand{
    renderContent(){
        var {onItemClick}=this.props
		return (<List model={App.schema} template={NameItem} onItemClick={onItemClick} />)
    }
}

class NameItem extends Component{
	render(){
		var{model,...others}=this.props
		return (
			<List.Item primaryText={model.name} leftIcon={<span/>}  {...others}/>
		)
	}
}
