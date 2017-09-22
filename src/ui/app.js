import React,{Component, PropTypes} from "react"
import {compose, setStatic, getContext, withProps} from "recompose"
import {graphql, withFragment, withMutation} from "tools/recompose"
import {connect} from "react-redux"

import {TextField} from 'material-ui'

import IconUpload from "material-ui/svg-icons/file/file-upload"
import IconDownload from "material-ui/svg-icons/file/file-download"
import IconSave from "material-ui/svg-icons/content/save"
import IconRemove from "material-ui/svg-icons/action/delete"

import TextFieldx from "components/text-field"
import CommandBar from "components/command-bar"
import file from "components/file"

import * as Admin from "main"

const ENTER=13

export class App extends Component{
	state={
		nameError:null, 
		unameError:null
	}
	componentWillReceiveProps(next){
		next.syncCurrent(next.params.id)
	}
	
	render(){
		const {name,uname,apiKey, update, upload, remove, router,removable}=this.props
		const {nameError, unameError}=this.state
		let commandBar
		if(removable)
			commandBar=(<CommandBar className="footbar" primary="Upload"
				items={[
						{action:"Back"}

						,{action:"Upload"
							,icon:<IconUpload/>
							,onSelect:upload
						}
						,{action:"Remove"
							,icon:<IconRemove/>
							,onSelect: remove
						}
					]}
				/>)
		else
			commandBar=(<CommandBar className="footbar" items={[{action:"Back"}]}/>)

		const changeName=value=>value!=name && update({name:value})
			.then(a=>this.setState({nameError:null}),error=>this.setState({nameError:error}))

		const changeUName=value=>value!=uname && update({uname:value})
			.then(a=>this.setState({unameError:null}),error=>this.setState({unameError:error}))

		let refName, refUname
		return (
			<div className="form">
				<TextFieldx ref={a=>refName=a}
					floatingLabelText="application name"
					fullWidth={true}
					disabled={!removable}
					value={name||""}
					errorText={nameError}
					onChange={({target:{value}})=>refName.value=value}
					onKeyDown={({target:{value},keyCode})=>keyCode==ENTER && changeName(value.trim())}
					onBlur={({target:{value}})=>changeName(value.trim())}/>

				<TextFieldx ref={a=>refUname=a}
					floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
					fullWidth={true}
					disabled={!removable}
					value={uname||""}
					errorText={unameError}
					onChange={({target:{value}})=>refUname.value=value}
					onKeyDown={({target:{value},keyCode})=>keyCode==ENTER && changeUName(value.trim())}
					onBlur={({target:{value}})=>changeUName(value.trim())}/>

				<TextField
					floatingLabelText="API key: value of http header 'x-application-id'"
					disabled={true}
					fullWidth={true}
					value={apiKey||""}/>

				<TextField
					floatingLabelText="wechat url: use it to accept message from wechat"
					disabled={true}
					fullWidth={true}
					value={`http://qili2.com/1/${apiKey}/wechat`}/>

				{commandBar}
			</div>
		)
	}
}

export class Creator extends Component{
	state={error:null}
	render(){
		const {router, bFirst, create}=this.props
		const {error}=this.state
		let refName,refUname
		return (
			<div className="form">
				<TextField ref={a=>refName=a}
					floatingLabelText="application name"
					errorText={error}
					fullWidth={true}/>

				<TextField ref={a=>refUname=a}
					floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
					fullWidth={true}/>

				<CommandBar className="footbar"
					items={[
						{action:"Back"}
						,{action:"Save", label:"保存", icon:<IconSave/>
							,onSelect:a=>create({name: refName.getValue, uname: refUname.getValue()})
								.then(({_id})=>router.replace(!bFirst ? `/app/${_id}` : "/"), error=>this.setState({error}))
						}
					]}
					/>
			</div>
		)
	}
}

export default compose(
	setStatic("Creator",compose(
		withMutation({
			name:"create",
			promise:true,
			mutation:graphql`
				mutation app_create_Mutation($name:String!, $uname: String){
					app_create(name:$name, uname:$uname){
						id
						name
						uname
						apiKey
					}
				}
			`,
		}),
		getContext({router: PropTypes.object}),
	)(Creator)),
	
	getContext({router: PropTypes.object}),
	
	withFragment(graphql`
		fragment app on App{
			id
			name
			uname
			apiKey
		}
	`),
	withProps(({data})=>({...data})),
	
	withMutation(({id},data)=>({
		name:"update",
		patch4:id,
		mutation:graphql`
			mutation app_update_Mutation($id:ObjectID!, $name: String, $uname:String){
				app_update(_id:$id, name:$name, uname: $uname)
			}
		`
	})),
	
	withMutation(({id})=>({
		name:"doRemove",
		variables:{id},
		mutation:graphql`
			mutation app_remove_Mutation($id:ObjectID!){
				app_remove(_id:$id)
			}
		`,
	})),
	/*
	withMutation({
		mutation:graphql`
			mutation app_upload_mutation(){
				app_upload()
			}
		`
	}),
	*/
	connect(state=>({
			removable:state.current!="qiliAdmin"
		}),
		(dispatch,{doRemove,doUpload,name, router,params:{id}})=>({
			syncCurrent(newAppID){
				if(newAppID!=id)
					dispatch(Admin.ACTION.CURRENT_APP(newAppID))
			},
			remove(){
				let removing=prompt("Please make sure you know what you are doing by giving this app name").trim()
				if(removing && removing==name){
					doRemove()
					router.replace("/")
					dispatch(Admin.ACTION.NEXT_APP())
				}else{
					dispatch(Admin.ACTION.MESSAGE({
						message:"name is not correct, cancel removing",
						level:"warning",
					}))
				}
			},
			
			upload(){
				file.select()
					.then(doUpload)
			}
		})
	)
)(App)
