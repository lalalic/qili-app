var React=require('react'),
    {Component, User, UI: {List, Loading, Empty, CommandBar}}=require(.),
    App=require("./db/app"),
    {Tabs, Tab, FloatingActionButton}=require('material-ui'),
    {Table,Tr}=require('reactable');

class Data extends Component{
    constructor(props){
        super(props)
        this.state={data:null}
    }
    componentWillReceiveProps(next){
        App.getData(next.collection)
            .then(function(data){
                this.setState({data:data})
            }.bind(this))
    }
    render(){
        if(this.state.data===null)
            return (<Loading/>)

        if(this.state.data.length==0)
            return (<Empty/>)

        return (<Table data={this.state.data}/>)
    }
}

class Schema extends Component{
    constructor(props){
        super(props)
        this.state={schema:null}
    }
    componentWillReceiveProps(next){
        App.getSchema(next.collection)
            .then(function(schema){
                this.setState({schema:schema})
            })
    }
    render(){
        if(this.schema===null)
            return (<Loading/>)

        if(this.schema.fields==null || this.schema.fields.length==0)
            return (<Empty/>)

        return (<Table data={this.state.schema.fields}/>)
    }
}




export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={col:User._name}
    }
    render(){
		var {col:colName}=this.state
        return (
			<div>
				<h1>{colName}</h1>
				<Tabs>
					<Tab label=`${colName}: Data`>
						<Data collection={colName}/>
					</Tab>
					<Tab label=`${colName}: Schema`>
						<Schema collection={colName}/>
					</Tab>
				</Tabs>
				<CommandBar className="footer"
					onSelect={this.onSelect.bind(this)}
					items={["Upload Schema", (<Names ref="names" self={()=>this.refs.names} 
						onItemClick={(colName)=>this.setState({col:colName})}/>) ]}/>
			</div>
        )
    }
    onSelect(cmd){
		
	}
}
class Names extends CommandBar.DialogCommand{
    renderContent(){
		return (<List model={App.getSchema()} template={NameItem}/>)
    }
}

class NameItem extends Component{
	render(){
		var{model,...others}=this.props
		return (
			<List.Item primaryText={model.name} {...others}/>
		)
	}
}
