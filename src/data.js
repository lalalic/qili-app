import React, {Component} from 'react'
import {User, UI} from '.'
import App from "./db/app"
import {Tabs, Tab} from 'material-ui'

import Upload from "material-ui/svg-icons/file/file-upload"
import More from "material-ui/svg-icons/navigation/more-vert"

const {List, Loading, Empty, CommandBar, fileSelector}=UI
export default class Data extends Component{
    constructor(props){
        super(props)
        this.state={col:null}
    }

    componentWillMount(){
        var {name:collectionName}=this.props.params||{}

        this.setState({
            schema:App.schema,
            col:collectionName,
            data:App.collectionData(collectionName),
            index:App.collectionIndexes(collectionName)
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.app!=nextProps.app)
            this.setState({
                schema:App.schema,
                data:App.collectionData(this.state.col),
                index:App.collectionIndexes(this.state.col)
            })
    }

    render(){
		var {col:colName, data, index, schema}=this.state
        return (
			<div>
				<Tabs>
					<Tab label={colName}>
						<List.Table className="data" model={data} key={colName}/>
					</Tab>
					<Tab label="Indexes">
						{<List model={index} template={IndexItem} key={colName}/>}
					</Tab>
				</Tabs>
				<CommandBar className="footbar" style={{textAlign:'left'}}
					onSelect={cmd=>this.onSelect(cmd)}
					items={[
                        {action:"Back"},
                        {action:"Upload Schema", label:"Schema", icon:Upload},
                        {action:"Upload Data", label:"Data", icon:Upload},
                        {action:"Collection", icon:More, onSelect:()=>this.refs.names.show()}
						]}/>
                {<Names ref="names" model={schema}
                    onItemClick={(a)=>{
                        this.refs.names.dismiss();
                        this.setState({
                            col:a.name,
                            data:App.collectionData(a.name),
                            index:App.collectionIndexes(a.name)
                        })
                        this.context.router.replace(`data/${a.name}`)
                    }}/>}
			</div>
        )
    }
    onSelect(cmd){
        switch(cmd){
		case "Upload Schema":
			fileSelector.selectJsonInJsFile()
				.then(({data:schema})=>{
                    if(!schema || schema.length==0)
						return;
					App.setSchema(schema)
                        .then(()=>this.forceUpdate())
				})
		break
		case "Upload Data":
			fileSelector.selectJsonInJsFile()
				.then(({data,name})=>{
					if(!data || data.length==0)
						return;
					var kind=name.split(/[\/\\]/).pop().split('.')[0]
					App.collectionData(kind, data)
                        .then(()=>this.forceUpdate())
				})
		break
        }
	}
}

Data.contextTypes={router:React.PropTypes.object}

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
        return (<List {...this.props} template={NameItem}/>)
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


Data.NameItem=NameItem
Data.IndexItem=IndexItem
