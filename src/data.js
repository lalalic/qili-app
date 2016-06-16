import React, {Component} from 'react'
import {User, UI} from '.'
import App from "./db/app"
import {Tabs, Tab} from 'material-ui'

import Upload from "material-ui/svg-icons/file/file-upload"
import More from "material-ui/svg-icons/navigation/more-vert"
import IconCol from "material-ui/svg-icons/device/storage"

const {List, Loading, Empty, CommandBar, fileSelector}=UI
export default class Data extends Component{
    state={data:null, index:null, schema:null}
	
	getData(col, app){
		let state={
			data:App.collectionData(col),
			index:App.collectionIndexes(col)
		}
		app && (state.schema=App.schema);
			
		this.setState(state)
	}

    componentDidMount(){
		let {params:{name}, app}=this.props
        this.getData(name, app)
    }
	
	componentWillReceiveProps(nextProps){
        if(this.props.app!=nextProps.app)
			this.getData(this.props.params.name, nextProps.app)
		else if(this.props.params.name!=nextProps.params.name)
			this.getData(nextProps.params.name)
    }

    render(){
		let {data, index, schema}=this.state
		let {name}=this.props.params
		const {IndexItem, Names}=this.constructor
        return (
			<div>
				<Tabs>
					<Tab label={name}>
						<List.Table className="data" model={data} key={name}/>
					</Tab>
					<Tab label="Indexes">
						{<List model={index} template={IndexItem} key={name}/>}
					</Tab>
				</Tabs>
				<CommandBar className="footbar"
					onSelect={cmd=>this.onSelect(cmd)}
					items={[
                        {action:"Upload Schema", label:"Schema", icon:Upload},
                        {action:"Upload Data", label:"Data:[colName].js", icon:Upload},
                        {action:"Collections", icon:More, onSelect:a=>this.refs.names.show()}
						]}/>
						
                {<Names ref="names" model={schema}
                    onItemClick={(a)=>{
                        this.refs.names.dismiss()
                        this.context.router.push(`data/${a.name}`)
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
                        .then(a=>this.setState({schema}))
				})
		break
		case "Upload Data":
			fileSelector.selectJsonInJsFile()
				.then(({data,name})=>{
					if(!data || data.length==0)
						return;
					var kind=name.split(/[\/\\]/).pop().split('.')[0]
					App.collectionData(kind, data)
                        .then(a=>{
							let path=`data/${kind}`
							if(this.context.router.isActive(path))
								this.setState({data:App.collectionData(kind)})
							else
								this.context.router.push(`data/${kind}`)
						})
				})
		break
        }
	}
	
	static contextTypes={router:React.PropTypes.object}
	
	static Names=class  extends CommandBar.DialogCommand{
		renderContent(){
			return (<List {...this.props} template={this.constructor.NameItem}/>)
		}
		
		static NameItem=class extends Component{
			render(){
				let {model,...others}=this.props
				return (<List.Item primaryText={model.name} leftIcon={<IconCol/>}  {...others}/>)
			}
		}
	}
	
	static IndexItem=class extends Component{
		render(){
			let {model}=this.props,
				{$option={}}=model,
				keys=Object.keys(model).filter((a)=>a!='$option'),
				text=keys.map((a)=>` ${a}${model[a]==1 ? ' asc' : ' desc'}`).join(', '),
				{unique, sparse, name=keys.join(',')}=$option;

			return (<List.Item primaryText={name} 
						secondaryText={`${unique?'unique ':''}${sparse?'sparse ':''}${text}`}/>)
		}
	}
}
