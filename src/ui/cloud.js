import React, {Component, PropTypes} from "react"
import {compose, getContext} from "recompose"
import {withMutation, graphql} from "tools/recompose" 


import CodeMirror from "react-codemirror"
import CommandBar from 'components/command-bar'
import file from "components/file"

import UploadIcon from "material-ui/svg-icons/file/file-upload"
import SaveIcon from "material-ui/svg-icons/content/save"

require("codemirror/mode/javascript/javascript")
export class Cloud extends Component{
	constructor(){
		super(...arguments)
		this.state={cloudCode:this.props.cloudCode}
	}

	componentWillReceiveProps(next){
		this.setState({cloudCode:next.cloudCode})
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

	render(){
		const {mutate, theme}=this.props
		const {cloudCode}=this.state
		
		return (
			<div>
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
							container.style.height=`${theme.page.height-theme.footbar.height}px`
						}
					}}
					/>
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
}

export default compose(
	withMutation(({id})=>({
		variables:{id},
		patch4: id,
		mutation: graphql`
			mutation cloud_update_Mutation($id:ObjectID!, $cloudCode: String!){
				app_update(_id:$id, cloudCode:$cloudCode)
			}
		`
	})),
	getContext({
		showMessage: PropTypes.func,
		theme: PropTypes.object,
	}),
)(Cloud)