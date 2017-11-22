import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose, setStatic, getContext, withProps} from "recompose"
import {graphql, withFragment, withMutation} from "tools/recompose"
import {connect} from "react-redux"

import {TextField,Toggle,Divider} from 'material-ui'

import IconUpload from "material-ui/svg-icons/file/file-upload"
import IconDownload from "material-ui/svg-icons/file/file-download"
import IconSave from "material-ui/svg-icons/content/save"
import IconRemove from "material-ui/svg-icons/action/delete"
import IconComment from "material-ui/svg-icons/editor/mode-comment"

import CommandBar from "components/command-bar"
import file from "components/file"

import * as Admin from "main"

const ENTER=13

export class App extends Component{
	state={nameError:null, unameError:null}
	render(){
		const {id, name,uname,apiKey, isDev,
			update, remove, toComment,removable}=this.props
		const {nameError, unameError}=this.state
		let commandBar
		if(removable)
			commandBar=(<CommandBar className="footbar" primary="Upload"
				items={[
						{action:"Back"}

						,{action:"Remove"
							,icon:<IconRemove/>
							,onSelect: remove
						},
						{
							action: "Comment",
							icon: <IconComment/>,
							onSelect:toComment
						}
					]}
				/>)
		else
			commandBar=(<CommandBar className="footbar" items={[{action:"Back"}]}/>)

		const changeName=value=>value!=name && update({name:value})
			.then(a=>this.setState({nameError:null}),error=>this.setState({nameError:error}))

		const changeUName=value=>value!=uname && update({uname:value})
			.then(a=>this.setState({unameError:null}),error=>this.setState({unameError:error}))

		return (
			<div className="form">
				<TextField
					floatingLabelText="application name"
					fullWidth={true}
					disabled={!removable}
					defaultValue={name}
					errorText={nameError}
					onKeyDown={({target:{value},keyCode})=>keyCode==ENTER && changeName(value.trim())}
					onBlur={({target:{value}})=>changeName(value.trim())}/>

				<TextField
					floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
					fullWidth={true}
					disabled={!removable}
					defaultValue={uname}
					errorText={unameError}
					onKeyDown={({target:{value},keyCode})=>keyCode==ENTER && changeUName(value.trim())}
					onBlur={({target:{value}})=>changeUName(value.trim())}/>

				<TextField
					floatingLabelText="API key: value of http header 'x-application-id'"
					fullWidth={true}
					onFocus={({target})=>target.select()}
					inputStyle={{color:"gray"}}
					value={apiKey||""}/>

				<TextField
					floatingLabelText="wechat url: use it to accept message from wechat"
					onFocus={({target})=>target.select()}
					fullWidth={true}
					inputStyle={{color:"gray"}}
					value={`http://qili2.com/1/${apiKey}/wechat`}/>

				<div style={{margin:50}}>
					<Toggle
						label="It's in development"
						toggled={isDev}
						onToggle={(e,isDev)=>update({isDev})}
						/>
					</div>
				{commandBar}
			</div>
		)
	}
}

export class Creator extends Component{
	state={error:null}
	render(){
		const {toApp, create}=this.props
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
							,onSelect:a=>create({name: refName.getValue(), uname: refUname.getValue()})
								.then(({id})=>toApp(id), error=>this.setState({error}))
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
					}
				}
			`,
		}),
	)(Creator)),

	getContext({
		router: PropTypes.object,
		showMessage: PropTypes.func,
	}),

	withFragment(graphql`
		fragment app on App{
			id
			name
			uname
			apiKey
			isDev
		}
	`),
	withProps(({data})=>({...data})),

	withMutation(({id})=>({
		promise:true,
		name:"update",
		patch4:id,
		variables:{id},
		mutation:graphql`
			mutation app_update_Mutation($id:ObjectID!, $name: String, $uname:String, $isDev:Boolean){
				app_update(_id:$id, name:$name, uname: $uname, isDev:$isDev){
					updatedAt
				}
			}
		`
	})),

	withMutation(({id})=>({
		promise:true,
		name:"doRemove",
		variables:{id},
		mutation:graphql`
			mutation app_remove_Mutation($id:ObjectID!){
				app_remove(_id:$id)
			}
		`,
	})),
	connect(state=>({
			removable:state.current!="qiliAdmin"
		}),
		(dispatch,{doRemove,doUpload,name, router,showMessage, switchApp, params:{id}})=>({
			syncCurrent(newAppID){
				if(newAppID!=id)
					dispatch(Admin.ACTION.CURRENT_APP(newAppID))
			},
			remove(){
				let removing=prompt("Please make sure you know what you are doing by giving this app name").trim()
				if(removing && removing==name){
					doRemove()
					router.replace("/")
					switchApp()
				}else{
					showMessage({
						message:"name is not correct, cancel removing",
						level:"warning",
					})
				}
			}
		})
	)
)(App)
