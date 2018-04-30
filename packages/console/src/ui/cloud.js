import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps} from "recompose"

import {Tabs, Tab} from "material-ui/Tabs"
import UploadIcon from "material-ui/svg-icons/file/file-upload"
import SaveIcon from "material-ui/svg-icons/content/save"

import {Controlled as CodeMirror} from "react-codemirror2"
import "codemirror/mode/javascript/javascript"

import {withMutation, graphql, withFragment,CommandBar} from "qili-app"

import Schema from "./schema"


export class Cloud extends Component{
	state={cloudCode:this.props.app.cloudCode||""}
	render(){
		const {mutate,app}=this.props
		const {cloudCode}=this.state

		return (
			<Fragment>
				<Tabs style={{flex:"1 100%",display:"flex",flexDirection:"column"}}
					contentContainerStyle={{flex:"1 100%"}}
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
								allowDropFileTypes:[".js",".json",".jsx"],
							}}
							/>
					</Tab>
					<Tab label="Schema">
						<Schema app={app}/>
					</Tab>
				</Tabs>

				<div style={{flex:1}}>
					<CommandBar
						items={[
							{action:"Back"}
							,{action:"Save",icon:<SaveIcon/>,
								onSelect:e=>this.update()
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
	withFragment(graphql`
		fragment cloud_app on App{
			cloudCode
			...schema_app
		}
	`),
	getContext({
		showMessage: PropTypes.func,
	}),
	mapProps(({app,...others})=>({
		app,
		...others
	})),
)(Cloud)
