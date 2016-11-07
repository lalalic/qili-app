import React, {Component, PropTypes} from 'react'
import {Tabs, Tab, List, ListItem} from 'material-ui'
import {Table} from 'reactable'

import {User, UI} from '.'
import App from "./db/app"

import Upload from "material-ui/svg-icons/file/file-upload"
import More from "material-ui/svg-icons/navigation/more-vert"
import IconCol from "material-ui/svg-icons/device/storage"

const {CommandBar, fileSelector}=UI
const {DialogCommand}=CommandBar

export const DOMAIN="ui.data"
const INIT_STATE={
	data:[],index:[],schema:[]
}

export const ACTION={
	FETCH_INCLUDING_SCHEMA: name=>dispatch=>dispatch(ACTION.FETCH(name,App.getSchema()))
	,FETCH:(name,schema)=>dispatch=>Promise.all([App.collectionData(name),App.collectionIndexes(name),schema])
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

export const REDUCER=(state=INIT_STATE,{type,payload})=>{
	switch(type){
	case `@@${DOMAIN}/fetched`:
		payload.schema=payload.schema||state.schema
		return Object.assign({},state,payload)

	case `@@${DOMAIN}/schema`:
		return Object.assign({},state,{schema:payload})

	case `@@${DOMAIN}/CLEAR`:
		return INIT_STATE
	}
	return state
}

export class Data extends Component{
	componentDidMount(){
		const {params:{name}, dispatch}=this.props
		dispatch(ACTION.FETCH_INCLUDING_SCHEMA(name))
	}

	componentWillReceiveProps(next){
		if(next.app!=this.props.app)
			next.dispatch(ACTION.FETCH_INCLUDING_SCHEMA(next.params.name))
		else if(next.params.name!=this.props.params.name)
			next.dispatch(ACTION.FETCH(next.params.name))
	}
	componentWillUnmount(){
		this.props.dispatch({type:`@@${DOMAIN}/CLEAR`})
	}

	render(){
		const {data, index, schema, params:{name},dispatch}=this.props
		const {router}=this.context
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
							<ListItem primaryText={name} leftIcon={<IconCol/>} key={name}
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
                        {action:"Upload Schema", label:"Schema", icon:<Upload/>
							,onSelect:e=>dispatch(ACTION.UPLOAD_SCHEMA())
						}
                        ,{action:"Upload Data", label:"Data:[colName].js", icon:<Upload/>
							,onSelect:e=>dispatch(ACTION.UPLOAD_DATA())
								.then(colName=> colName && router.replace(`/data/${colName}`))
						}
                        ,{action:"Collections", icon:<More/>
							,onSelect:e=>refNames.show()
						}
						]}/>
			</div>
        )
	}
	static contextTypes={router:PropTypes.object}
}


export default Object.assign(Data,{DOMAIN, ACTION, REDUCER})
