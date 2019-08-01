import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {compose, setStatic, getContext, withProps} from "recompose"
import {graphql, withFragment, withMutation,CommandBar} from "qili-app"
import {connect} from "react-redux"

import {TextField,Toggle,Divider} from 'material-ui'

import IconUpload from "material-ui/svg-icons/file/file-upload"
import IconDownload from "material-ui/svg-icons/file/file-download"
import IconSave from "material-ui/svg-icons/content/save"
import IconRemove from "material-ui/svg-icons/action/delete"
import IconComment from "material-ui/svg-icons/editor/mode-comment"

import {ACTION} from "../state"

const ENTER=13

export class App extends Component{
	state={nameError:null, unameError:null,smsNameError:null}
	render(){
		const {id, name,uname,apiKey, isDev,
			canRunInCore,setRunInCore,
			sms_name,
			update, remove, toComment,removable}=this.props
		const {nameError, unameError,smsNameError}=this.state
		let commandBar
		if(removable)
			commandBar=(<CommandBar primary="Upload"
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
			commandBar=(<CommandBar items={[{action:"Back"}]}/>)

		const changeName=value=>value!=name && update({name:value})
			.then(a=>this.setState({nameError:null}),error=>this.setState({nameError:error}))

		const changeUName=value=>value!=uname && update({uname:value})
			.then(a=>this.setState({unameError:null}),error=>this.setState({unameError:error}))

		const changeSMSName=value=>value!=sms_name && update({sms_name:value})
			.then(a=>this.setState({smsNameError:null}),error=>this.setState({smsNameError:error}))

		return (
			<Fragment>
				<div style={{flex:"1 1 100%", overflowY:"scroll",padding:5}}>
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
						floatingLabelText="sms sign name when sending certification code"
						fullWidth={true}
						disabled={!removable}
						defaultValue={sms_name}
						errorText={smsNameError}
						onKeyDown={({target:{value},keyCode})=>keyCode==ENTER && changeSMSName(value.trim())}
						onBlur={({target:{value}})=>changeSMSName(value.trim())}/>

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
						value={`https://qili2.com/1/${apiKey}/wechat`}/>

					<div style={{margin:50}}>
						<Toggle
							label="It's in development"
							toggled={isDev}
							onToggle={(e,isDev)=>update({isDev})}
							/>
						{canRunInCore==null ? null : (
							<Toggle
								label="**Can run in core**"
								toggled={canRunInCore}
								onToggle={(e,canRunInCore)=>setRunInCore({canRunInCore})}
								/>
							)
						}
						</div>
				</div>
				<div style={{flex:"none"}}>
					{commandBar}
				</div>
			</Fragment>
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
			<Fragment>
				<div style={{flex:"1 1 100%", overflowY:"scroll", padding:5}}>
					<TextField ref={a=>refName=a}
						floatingLabelText="application name"
						errorText={error}
						fullWidth={true}/>

					<TextField ref={a=>refUname=a}
						floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
						fullWidth={true}/>
				</div>
				<div style={{flex:"none"}}>
					<CommandBar
						items={[
							{action:"Back"}
							,{action:"Save", label:"保存", icon:<IconSave/>
								,onSelect:a=>create({name: refName.getValue(), uname: refUname.getValue()})
									.then(({id})=>toApp(id), error=>this.setState({error}))
							}
						]}
						/>
				</div>
			</Fragment>
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
			canRunInCore
			sms_name
		}
	`),
	withProps(({data})=>({...data})),

	withMutation(({id})=>({
		promise:true,
		name:"update",
		patch4:id,
		variables:{id},
		mutation:graphql`
			mutation app_update_Mutation($id:ObjectID!, $name: String, $uname:String, $isDev:Boolean, $sms_name:String){
				app_update(_id:$id, name:$name, uname: $uname, isDev:$isDev, sms_name:$sms_name){
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

	withMutation(({id})=>({
		promise:true,
		name:"setRunInCore",
		patch4:id,
		variables:{id},
		mutation:graphql`
			mutation app_canRunInCore_Mutation($id:ObjectID!,$canRunInCore:Boolean){
				app_canRunInCore(_id:$id,canRunInCore:$canRunInCore){
					updatedAt
					canRunInCore
				}
			}
		`,
	})),
	connect(state=>({
			removable:state.console.current!="qiliAdmin"
		}),
		(dispatch,{doRemove,doUpload,name, router,showMessage, switchApp, params:{id}})=>({
			syncCurrent(newAppID){
				if(newAppID!=id)
					dispatch(ACTION.CURRENT_APP(newAppID))
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
