import React, {Component, PropTypes} from "react"
import {compose, getContext, pure} from "recompose"
import {withMutation, graphql} from "tools/recompose" 

import CommandBar from 'components/command-bar'
import file from "components/file"

import UploadIcon from "material-ui/svg-icons/file/file-upload"
import SaveIcon from "material-ui/svg-icons/content/save"

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
		const {mutate}=this.props
		const {cloudCode}=this.state
		
		return (
			<div>
				<textarea value={cloudCode||""}
					onChange={({target:{value}})=>this.setState({cloudCode:value})}
					placeholder="Cloud nodejs code"
					style={{position:'absolute', height: '100%', top:0,lineHeight:'2em',
						margin:0,width:'100%', padding:10, paddingBottom:51,border:0}}/>
				<CommandBar className="footbar"
					items={[
						{action:"Back"}
						,{action:"Upload", icon:<UploadIcon/>,
							onSelect:e=>file.selectTextFile()
								.then(({data:cloudCode})=>{
									this.setState({cloudCode})
									this.update()
								})
						}
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
	getContext({showMessage: PropTypes.func})
)(Cloud)