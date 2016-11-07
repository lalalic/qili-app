import React,{Component, PropTypes} from "react"
import {TextField} from 'material-ui'

import Upload from "material-ui/svg-icons/file/file-upload"
import Download from "material-ui/svg-icons/file/file-download"
import Save from "material-ui/svg-icons/content/save"
import Remove from "material-ui/svg-icons/action/delete"

import {UI} from "."
import {ACTION as qiliACTION} from "./main"
import {getCurrentApp} from "./selector"

import dbApplication from "./db/app"

const ENTER=13
export const DOMAIN="ui.app"
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
				dispatch(qiliACTION.SET_CURRENT_APP(app))
				return app
			})
	}
	,CHANGE: (key,value)=>(dispatch,getState)=>{
		const app=getCurrentApp(getState())
		app[key]=value
		return dispatch=>dbApplication.upsert(app)
	}
	,REMOVE: id=>dispatch=>dbApplication.remove(id)

	,UPLOAD: a=>displatch=>UI.fileSelector.select()
			.then(app=>dbApplication.upload(app))
			.then(app=>{
				dispatch(qiliACTION.SET_CURRENT_APP(app))
				return app
			})
}

export class App extends Component{
	state={nameError:null, unameError:null}
	render(){
		const {name,uname,apiKey, dispatch}=this.props
		const {nameError, unameError}=this.state
		const {router}=this.context
		let removable=dbApplication.isRemovable(app)
		let commandBar
		if(removable)
			commandBar=(<UI.CommandBar className="footbar" primary="Upload"
				items={[
						{action:"Back"}

						,{action:"Upload"
							,icon:<Upload/>
							,onSelect:e=>dispatch(ACTION.UPLOAD())
						}
						,{action:"Remove"
							,icon:<Remove/>
							,onSelect:e=>{
								let removing=prompt("Please make sure you know what you are doing by giving this app name")
								if(removing==name){
									dispatch(ACTION.REMOVE())
										.then(a=>router.replace("/"))
								}else
									alert("name is not correct")
							}
						}
					]}
				/>)
		else
			commandBar=(<UI.CommandBar className="footbar" items={[{action:"Back"}]}/>)

		const changeName=value=>value!=app.name && dispatch(ACTION.CHANGE("name",value))
			.then(a=>this.setState({nameError:null}),error=>this.setState(error))
		const changeUName=value=>value!=app.uname && dispatch(ACTION.CHANGE("uname",value))
			.then(a=>this.setState({unameError:null}),error=>this.setState(error))
		let refName, refUname
		return (
			<div className="form">
				<TextField ref={a=>refName}
					floatingLabelText="application name"
					fullWidth={true}
					disabled={!removable}
					value={name}
					errorText={nameError}
					onChange={({target:{value}})=>refName.value=value}
					onKeyDown={({target:{value},keyCode})=>keyCode==ENTER && changeName(value.trim())}
					onBlur={({target:{value}})=>changeName(value.trim())}/>

				<TextField ref={a=>refUname}
					floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
					fullWidth={true}
					disabled={!removable}
					value={uname}
					errorText={unameError}
					onChange={({target:{value}})=>refUname.value=value}
					onKeyDown={e=>e.keyCode==ENTER && changeUName(e.target.value.trim())}
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
		const {dispatch}=this.props
		const {error}=this.state
		const {router}=this.context
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

				<UI.CommandBar className="footbar"
					items={[
						{action:"Back"}
						,{action:"Save", label:"保存", icon:<Save/>
							,onSelect:a=>dispatch(ACTION.CREATE(refName.getValue(),refUname.getValue()))
								.then(({_id})=>router.replace(`/app/${_id}`), error=>this.setState({error}))
						}
					]}
					/>
			</div>
		)
	}
	static contextTypes={router: PropTypes.object}
}

export default Object.assign(App,{DOMAIN, ACTION})
