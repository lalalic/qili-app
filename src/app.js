import React,{Component, PropTypes} from "react"
import {TextField} from 'material-ui'
import {connect} from "react-redux"

import Upload from "material-ui/svg-icons/file/file-upload"
import Download from "material-ui/svg-icons/file/file-download"
import Save from "material-ui/svg-icons/content/save"
import Remove from "material-ui/svg-icons/action/delete"

import {UI} from "."

import dbApplication from "./db/app"

const ENTER=13
export const DOMAIN="ui.app"
export const ACTION={
	CREATE: (name, uname)=>{
		let nameError, unameError
		if(!name)
			nameError="name is required"
		if(nameError){
			return dispatch=>{
				dispatch({type:`@@${DOMAIN}/error`, payload:{nameError}})
				return Promise.reject()
			}
		}

		return dispatch=>dbApplication.upsert({name,uname})
			.then(app=>{
				dispatch({type:`@@${DOMAIN}/created`})
				return dbApplication.current=app
			})
	}
	,CHANGE: (key,value)=>{
		const app=dbApplication.current
		app[key]=value
		return dispatch=>dbApplication.upsert(app)
			.then(app=>{
				dispatch({type:`@@${DOMAIN}/updated`})
				return dbApplication.current=app
			})
	}
	,REMOVE: id=>dispatch=>dbApplication.remove(id).then(a=>dispatch({type:`@@${DOMAIN}/removed`}))

	,UPLOAD: a=>displatch=>UI.fileSelector.select()
			.then(app=>dbApplication.upload(app))
			.then(app=>{
				dispatch({type:`@@${DOMAIN}/uploaded`})
				return dbApplication.current=app
			})
}
const INIT_STATE={}
export const REDUCER=(state=INIT_STATE,{type, payload})=>{
	switch(type){
	case `@@${DOMAIN}/error`:
		return payload
	case `@@${DOMAIN}/uploaded`:
	case `@@${DOMAIN}/removed`:
	case `@@${DOMAIN}/created`:
	case `@@${DOMAIN}/updated`:
		return INIT_STATE
	}
	return state
}

export class App extends Component{
	componentWillReceiveProps(next){
		if(next.name!=this.props.name && next.name!=dbApplication.current.name)
			dbApplication.current=next.name
	}
	render(){
		const {app, dispatch, nameError, unameError}=this.props
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
								let name=prompt("Please make sure you know what you are doing by giving this app name")
								if(name==app.name){
									dispatch(ACTION.REMOVE(app._id))
										.then(a=>router.replace("/"))
								}else
									alert("name is not correct")
							}
						}
					]}
				/>)
		else
			commandBar=(<UI.CommandBar className="footbar" items={[{action:"Back"}]}/>)

		const changeName=value=>value!=app.name && dispatch(ACTION.CHANGE("name",value)).then(({name})=>router.replace(`app/${name}`))
		const changeUName=value=>value!=app.uname && dispatch(ACTION.CHANGE("uname",value))
		let refName, refUname
		return (
			<div className="form">
				<TextField ref={a=>refName}
					floatingLabelText="application name"
					fullWidth={true}
					disabled={!removable}
					value={app.name}
					errorText={nameError}
					onChange={({target:{value}})=>refName.value=value}
					onKeyDown={e=>e.keyCode==ENTER && changeName(e.target.value.trim())}
					onBlur={({target:{value}})=>changeName(value.trim())}/>

				<TextField ref={a=>refUname}
					floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
					fullWidth={true}
					disabled={!removable}
					value={app.uname}
					errorText={unameError}
					onChange={({target:{value}})=>refUname.value=value}
					onKeyDown={e=>e.keyCode==ENTER && changeUName(e.target.value.trim())}
					onBlur={({target:{value}})=>changeUName(value.trim())}/>

				<TextField
					floatingLabelText="API key: value of http header 'x-application-id'"
					disabled={true}
					fullWidth={true}
					value={app.apiKey}/>

				<TextField
					floatingLabelText="wechat url: use it to accept message from wechat"
					disabled={true}
					fullWidth={true}
					value={app.apiKey ? `http://qili2.com/1/${app.apiKey}/wechat` : ""}/>

				{commandBar}
			</div>
		)
	}
}

App.contextTypes={router: PropTypes.object}

export const Creator=({dispatch, nameError},{router})=>{
	let refName,refUname
	return (
		<div className="form">
			<TextField ref={a=>refName=a}
				floatingLabelText="application name"
				errorText={nameError}
				fullWidth={true}/>

			<TextField ref={a=>refUname=a}
				floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
				fullWidth={true}/>

			<UI.CommandBar className="footbar"
				items={[
					{action:"Back"}
					,{action:"Save", label:"保存", icon:<Save/>
						,onSelect:a=>dispatch(ACTION.CREATE(refName.getValue(),refUname.getValue()))
							.then(({name})=>router.replace(`/app/${name}`))
					}
				]}
				/>
		</div>
	)
}
Creator.contextTypes={router: PropTypes.object}

export default Object.assign(App,{DOMAIN, ACTION, REDUCER})
