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
        var {params={}}=this.props,
            {name:collectionName=User._name}=params;

        this.state={col:collectionName}
    }

    componentDidMount(){
        var {col:collectionName}=this.state
        this._data= App.collectionData(collectionName)
        this._index=App.collectionIndexes(collectionName)
        this._schema=App.schema
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.app!=nextProps.app){
            this._data= App.collectionData(this.state.col)
            this._index=App.collectionIndexes(this.state.col)
            this._schema=App.schema
            return true
        }

        var {col:nextCol}=nextState, {col}=this.state
        if(nextCol!=col){
            this._data= App.collectionData(nextCol)
            this._index=App.collectionIndexes(nextCol)
            return true
        }
        return false
    }

    render(){
		var {col:colName}=this.state
        return (
			<div>
				<Tabs>
					<Tab label={colName}>
						<List.Table className="data" model={this._data} key={colName}/>
					</Tab>
					<Tab label="Indexes">
						{<List model={this._index} template={IndexItem} key={colName}/>}
					</Tab>
				</Tabs>
				<CommandBar className="footbar" style={{textAlign:'left'}}
					onSelect={this.onSelect.bind(this)}
					items={[
                        {action:"Back"},
                        {action:"Upload Schema", label:"Schema", icon:Upload},
                        {action:"Upload Data", label:"Data", icon:Upload},
                        {action:"Collection", icon:More, onSelect:()=>this.refs.names.show()}
						]}/>
                {/*<Names ref="names" model={this._schema}
                    onItemClick={(a)=>{
                        this.refs.names.dismiss();
                        this.setState({col:a.name})
                        this.context.router.replace(`data/${a.name}`)
                    }}/>*/}
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
