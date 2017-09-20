import React,{Component, PropTypes} from "react"
import {compose, withStatic, withContext} from "recompse"
import withQuery from "tools/withQuery"
import withMutation from "tools/withMutation"
import {graphql} from "react-relay"

import {TextField} from 'material-ui'

import IconUpload from "material-ui/svg-icons/file/file-upload"
import IconDownload from "material-ui/svg-icons/file/file-download"
import IconSave from "material-ui/svg-icons/content/save"
import IconRemove from "material-ui/svg-icons/action/delete"

import TextFieldx from "components/TextField"
import CommandBar from "component/command-bar"
import file from "component/file"

import {ACTION as qiliACTION} from "./main"
import {getCurrentApp} from "./selector"

const ENTER=13

export const ACTION={
	CREATE: (name, uname)=>dispatch=>{
		let nameError, unameError
		if(!name)
			nameError="name is required"
		if(nameError){
			return Promise.reject(nameError)
		}

		return dbApplication.upsert({name,uname})
			.then(app=>{
				dispatch(ENTITIES(normalize(app,dbApplication.schema).entities))
				dispatch(qiliACTION.SET_CURRENT_APP(app))
				return app
			})
	}
	,CHANGE: (key,value)=>(dispatch,getState)=>{
		if(key=="name" && !value)
			return Promise.reject("name is required")
		const state=getState()
		const app=getCurrentApp(state)
		app[key]=value
		return dbApplication.upsert(app)
			.then(app=>dispatch(ENTITIES(normalize(app,dbApplication.schema).entities)))
	}
	,REMOVE: id=>(dispatch,getState)=>{
		const state=getState()
		let app=getCurrentApp(state)
		let id=app._id
		return dbApplication.remove(id)
			.then(a=>{
				dispatch(REMOVE_ENTITIES(dbApplication.schema.getKey(),id))
				dispatch(qiliACTION.NEXT_APPLICATION(id))
			})
	}

	,UPLOAD: a=>displatch=>fileSelector.select()
			.then(app=>dbApplication.upload(app))
}

export class App extends Component{
	state={nameError:null, unameError:null}
	componentWillReceiveProps(next){
		if(!next.isCurrent)
			next.dispatch(qiliACTION.SET_CURRENT_APP_BY_ID(next.params._id))
	}
	render(){
		const {name,uname,apiKey, dispatch, params:{_id}}=this.props
		const {nameError, unameError}=this.state
		const {router}=this.context
		let removable=dbApplication.isRemovable(_id)
		let commandBar
		if(removable)
			commandBar=(<CommandBar className="footbar" primary="Upload"
				items={[
						{action:"Back"}

						,{action:"Upload"
							,icon:<IconUpload/>
							,onSelect:e=>dispatch(ACTION.UPLOAD())
						}
						,{action:"Remove"
							,icon:<IconRemove/>
							,onSelect:e=>{
								let removing=prompt("Please make sure you know what you are doing by giving this app name").trim()
								if(removing && removing==name){
									dispatch(ACTION.REMOVE())
										.then(a=>router.replace("/"))
								}else
									alert("name is not correct")
							}
						}
					]}
				/>)
		else
			commandBar=(<CommandBar className="footbar" items={[{action:"Back"}]}/>)

		const changeName=value=>value!=name && dispatch(ACTION.CHANGE("name",value))
			.then(a=>this.setState({nameError:null}),error=>this.setState({nameError:error}))

		const changeUName=value=>value!=uname && dispatch(ACTION.CHANGE("uname",value))
			.then(a=>this.setState({unameError:null}),error=>this.setState({unameError:error}))

		let refName, refUname
		return (
			<div className="form">
				<TextFieldx ref={a=>refName=a}
					floatingLabelText="application name"
					fullWidth={true}
					disabled={!removable}
					value={name}
					errorText={nameError}
					onChange={({target:{value}})=>refName.value=value}
					onKeyDown={({target:{value},keyCode})=>keyCode==ENTER && changeName(value.trim())}
					onBlur={({target:{value}})=>changeName(value.trim())}/>

				<TextFieldx ref={a=>refUname=a}
					floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
					fullWidth={true}
					disabled={!removable}
					value={uname}
					errorText={unameError}
					onChange={({target:{value}})=>refUname.value=value}
					onKeyDown={({target:{value},keyCode})=>keyCode==ENTER && changeUName(value.trim())}
					onBlur={({target:{value}})=>changeUName(value.trim())}/>

				<TextField
					floatingLabelText="API key: value of http header 'x-application-id'"
					disabled={true}
					fullWidth={true}
					value={apiKey}/>

				<TextField
					floatingLabelText="wechat url: use it to accept message from wechat"
					disabled={true}
					fullWidth={true}
					value={`http://qili2.com/1/${apiKey}/wechat`}/>

				{commandBar}
			</div>
		)
	}
	static contextTypes={router: PropTypes.object}
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
	withStatic("Creator",compose(
		withMutation({
			name:"create",
			promise:true,
			mutation:graphql`
				mutation app_create_Mutation($name:String!, $uname: String){
					app_create(name:$name, uname:$uname)
				}
			`,
		}),
		getContext({router: PropTypes.object}),
	)(Creator)),
	getContext({router: PropTypes.object}),

	withQuery({
		query: graphql`
			query app_edit_Mutation{
				me{
					apps(){

					}
				}
			}
		`,
	}),
)(App)
