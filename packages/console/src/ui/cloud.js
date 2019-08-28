import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps} from "recompose"

import {Tabs, Tab} from "material-ui/Tabs"
import OpenIcon from "material-ui/svg-icons/file/file-upload"
import SaveIcon from "material-ui/svg-icons/content/save"


import {Controlled as CodeMirror} from "react-codemirror2"
import "codemirror/mode/javascript/javascript"

import {CommandBar,File} from "qili-app"
import {withMutation, withFragment} from "qili-app/graphql"

import Schema from "./schema"


export class Cloud extends Component{
	state={cloudCode:this.props.app.cloudCode||""}
	render(){
		const {mutate,app}=this.props
		const {cloudCode}=this.state

		return (
			<Fragment>
				<Tabs style={{flex:"1 1 100%", overflowY:"scroll",display:"flex",flexDirection:"column"}}
					contentContainerStyle={{flex:"1 1 100%", overflow:"scroll"}}
					tabTemplateStyle={{height:"100%"}}
					>
					<Tab label="Code">
						<CodeMirror
							value={cloudCode}
							preserveScrollPosition={true}
							onBeforeChange={(editor,data,cloudCode)=>this.setState({cloudCode})}
							options={{
								lineNumbers:true,
								mode:"javascript",
								dragDrop:true,
								allowDropFileTypes:[".js"],
							}}
							/>
					</Tab>
					<Tab label="Schema">
						<Schema app={app}/>
					</Tab>
				</Tabs>

				<div style={{flex:"none"}}>
					<CommandBar
						items={[
							{action:"Back"},
							{
								action:"Save",
								icon:<SaveIcon/>,
								onSelect:e=>this.update()
							},
							{
								action:"Open",
								icon:<OpenIcon/>,
								onSelect:e=>{
									File
										.selectAsData(".js")
										.then(({data:cloudCode})=>this.setState({cloudCode}))
								}
							}
						]}/>
				</div>
			</Fragment>
		)
	}
	update(){
		const {cloudCode}=this.state
		const {mutate, showMessage}=this.props
		try{
			new Function("Cloud",cloudCode)
			mutate({cloudCode})
		}catch({message}){
			showMessage({message, level:"error"})
		}
	}
}

export default compose(
	withMutation(({id})=>({
		variables:{id},
		mutation: graphql`
			mutation cloud_update_Mutation($id:ObjectID!, $cloudCode: String!){
				app_update(_id:$id, cloudCode:$cloudCode){
					cloudCode
					schema
				}
			}
		`
	})),
	withFragment({app:graphql`
		fragment cloud_app on App{
			cloudCode
			...schema_app
		}
	`}),
	getContext({
		showMessage: PropTypes.func,
	})
)(Cloud)
