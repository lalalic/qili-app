var React=require('react'),
    {Component, User, UI: {List, Loading, Empty, CommandBar, selectFile,
        Icons:{File:{Upload}, System:{More}}}}=require('.'),
    App=require("./db/app"),
    {Tabs, Tab}=require('material-ui');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={col:User._name}
    }
    componentWillReceiveProps(newProps){
        if(this.props.app!=newProps.app)
            this.forceUpdate()
    }

    render(){
		var {col:colName}=this.state, {Table}=require('reactable')
        return (
			<div>
				<Tabs>
					<Tab label={colName}>
						<List.Table className="data" model={App.collectionData(colName)} key={colName}/>
					</Tab>
					<Tab label="Indexes">
						<List model={App.collectionIndexes(colName)} template={IndexItem} key={colName}/>
					</Tab>
				</Tabs>
				<CommandBar className="footbar" style={{textAlign:'left'}}
					onSelect={this.onSelect.bind(this)}
					items={[
                        {action:"Back"},
                        {action:"Upload Schema", label:"Schema", icon:Upload},
                        {action:"Upload Data", label:"Data", icon:Upload},
                            (<Names ref="names" label="Collection" icon={More}
                                key={colName}
                                self={()=>this.refs.names}
						        onItemClick={ (a)=>{this.refs.names.dismiss();this.setState({col:a.name})} }/>)
							]}/>
			</div>
        )
    }
    onSelect(cmd){
		var self=this
        switch(cmd){
		case "Upload Schema":
			selectFile("jsonInJs")
				.then(function({data:schema}){
					if(!schema || schema.length==0)
						return;
					App.setSchema(schema).then(self.forceUpdate)
				})
		break
		case "Upload Data":
			selectFile("jsonInJs")
				.then(function({data,name}){
					if(!data || data.length==0)
						return;
					var kind=name.split(/[\/\\]/).pop().split('.')[0]
					App.collectionData(kind, data).then(self.forceUpdate)
				})
		break
        }
	}
}
class IndexItem extends Component{
	render(){
		var {model}=this.props,
			{$option={}}=model,
			keys=Object.keys(model).filter((a)=>a!='$option'),
			text=keys.map((a)=>` ${a}${model[a]==1 ? ' asc' : ' desc'}`).join(', '),
			{unique, sparse, name=keys.join(',')}=$option;

		return (<List.Item primaryText={name} secondaryText={`${unique?'unique ':''}${sparse?'sparse ':''}${text}`}/>)
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
