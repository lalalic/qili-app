import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps} from "recompose"

import {Tabs, Tab} from "material-ui/Tabs"
import UploadIcon from "material-ui/svg-icons/file/file-upload"
import SaveIcon from "material-ui/svg-icons/content/save"

import CodeMirror from "react-codemirror"
import "codemirror/mode/javascript/javascript"

import {withMutation, graphql, withFragment,CommandBar} from ".." 

import Schema from "./schema"


export class Cloud extends Component{
	state={cloudCode:this.props.app.cloudCode||""}
	render(){
		const {mutate, height,app}=this.props
		const {cloudCode}=this.state
		
		return (
			<div>
				<Tabs>
					<Tab label="Code">
						<CodeMirror
							value={cloudCode}
							preserveScrollPosition={true}
							onChange={cloudCode=>this.setState({cloudCode})}
							options={{
								lineNumbers:true,
								mode:"javascript",
								dragDrop:true,
								allowDropFileTypes:[".js",".json",".jsx"],
							}}
							ref={a=>{
								if(a){
									if(a.codeMirror.getValue()!=cloudCode){//why
										a.codeMirror.setValue(cloudCode)
									}
									let container=document.querySelector('.CodeMirror')
									container.style.height=`${height}px`
								}
							}}
							/>
					</Tab>
					<Tab label="Schema">
						<Schema app={app} style={{height}}/>
					</Tab>
				</Tabs>
				<CommandBar className="footbar"
					items={[
						{action:"Back"}
						,{action:"Save",icon:<SaveIcon/>,
							onSelect:e=>this.update()
						}
					]}/>
			</div>
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
	withFragment(graphql`
		fragment cloud_app on App{
			cloudCode
			...schema_app
		}
	`),	
	getContext({
		showMessage: PropTypes.func,
		theme: PropTypes.object,
	}),
	mapProps(({app,theme,...others})=>({
		height:theme.page.height-theme.footbar.height-theme.appBar.height,
		app,
		...others
	})),	
)(Cloud)