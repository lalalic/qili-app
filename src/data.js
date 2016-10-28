import React, {Component} from 'react'
import {connect} from "react-redux"
import {Tabs, Tab, List, ListItem} from 'material-ui'
import {Table} from 'reactable'

import {User, UI} from '.'
import App from "./db/app"

import Upload from "material-ui/svg-icons/file/file-upload"
import More from "material-ui/svg-icons/navigation/more-vert"
import IconCol from "material-ui/svg-icons/device/storage"

const {CommandBar, fileSelector}=UI
const {DialogCommand}=CommandBar

const DOMAIN="data"
export const ACTION={
	FETCH:(name,schema)=>dispatch=>Promise.all([App.collectionData(name),App.collectionIndexes(name),schema])
			.then(([data,index,schema])=>dispatch({type:`@@${DOMAIN}/fetched`,payload:{data,index,schema}}))
	
	,UPLOAD_DATA:a=>dispatch=>fileSelector.selectJsonInJsFile()
				.then(({data,name})=>{
					if(data && data.length){
						let kind=name.split(/[\/\\]/).pop().split('.')[0]
						return App.collectionData(kind, data).then(a=>kind)
					}
				})

	,UPLOAD_SCHEMA:A=>dispatch=>fileSelector.selectJsonInJsFile()
				.then(({data:schema})=>{
                    if(schema && schema.length){
						return App.setSchema(schema)
                        .then(a=>dispatch({type:`@@${DOMAIN}/schema`,payload:schema}))
					}
				})
}

export const REDUCER={
	[DOMAIN]:(state={data:[],index:[],schema:[],app:null},{type,payload})=>{
		switch(type){
		case `@@${DOMAIN}/fetched`:
			payload.schema=payload.schema||state.schema
			return Object.assign({},state,payload)
			
		case `@@${DOMAIN}/schema`:
			return Object.assign({},state,{schema:payload})
			
		case `@@main/APP_CHANGED`:
			return {data:[],index:[],schema:[],app:payload.app._id}
		}
		return state
	}
}

export const Data=connect(state=>(state[DOMAIN]))(
class extends Component{
	componentDidMount(){
		const {params:{name}, dispatch}=this.props
		dispatch(ACTION.FETCH(name,App.schema))
	}
	
	componentWillReceiveProps(next){
		if(next.app!=this.props.app)
			next.dispatch(ACTION.FETCH(next.params.name,App.schema))
		else if(next.params.name!=this.props.params.name)
			next.dispatch(ACTION.FETCH(next.params.name))
	}
	
	render(){
		const {data, index, schema, params:{name},dispatch,router}=this.props
		const {IndexItem, Names}=this.constructor
		const indexData=index.map(col=>{
			Object.keys(col).filter(a=>a!='$option')
		})
		let refNames
		return (
			<div>
				<Tabs>
					<Tab label={name}>
						<Table data={data}/>
					</Tab>
					<Tab label="Indexes">
						<Table data={index}/>
					</Tab>
				</Tabs>
				
				<DialogCommand ref={a=>refNames=a}>
					<List>
					{
						schema.map(({name})=>(
							<ListItem primaryText={name} leftIcon={<IconCol/>} 
								onClick={e=>{
									refNames.dismiss()
									router.push(`/data/${name}`)
								}}/>
						))
					}
					</List>
				</DialogCommand>
				
				<CommandBar className="footbar"
					items={[{action:"Back"},
                        {action:"Upload Schema", label:"Schema", icon:Upload
							,onSelect:e=>dispatch(ACTION.UPLOAD_SCHEMA())
						}
                        ,{action:"Upload Data", label:"Data:[colName].js", icon:Upload
							,onSelect:e=>dispatch(ACTION.UPLOAD_DATA())
								.then(colName=> colName && router.replace(`/data/${colName}`))
						}
                        ,{action:"Collections", icon:More
							,onSelect:e=>refNames.show()
						}
						]}/>
			</div>
        )
	}
	
})

export default Object.assign(Data,{ACTION, REDUCER})

/*




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
		let {params:{name}}=this.props
        this.getData(name, this.context.app)
    }
	
	componentWillReceiveProps(nextProps, nextContext){
        if(this.context.app!=nextContext.app)
			this.getData(this.props.params.name, nextContext.app)
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
					items={[{action:"Back"},
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
	
	static contextTypes={
		router:React.PropTypes.object,
		app: React.PropTypes.object
	}
	
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
*/