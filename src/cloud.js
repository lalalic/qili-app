import React, {Component} from "react"

import {connect} from "react-redux"

import {UI} from '.'
import App from './db/app'

import Upload from "material-ui/svg-icons/file/file-upload"
import Save from "material-ui/svg-icons/content/save"

const {CommandBar, fileSelector, Messager}=UI

export const DOMAIN="cloudCode"

export const ACTION={
	UPDATE: code=>dispatch=>{
		try{
			let app=App.current
			if(code===app.cloudCode)
				return Promise.resolve()
			new Function("Cloud",code)
			app.cloudCode=code
			return App.upsert(app)
				.catch(e=>alert(e.message))
				.then(a=>dispatch({type:`@@${DOMAIN}/updated`}))
		}catch(error){
			return Promise.reject(error)
				.catch(e=>alert(e.message))
		}
	}
	,UPLOAD: a=>dispatch=>fileSelector.selectTextFile()
		.then(({data:code})=>dispatch(ACTION.UPDATE(code)))
}

export const REDUCER={
	[DOMAIN]:(state={}, {type,payload})=>{
		switch(type){
		case `@@${DOMAIN}/updated`:
			return {}
		}
		return state
	}
}

export const Cloud=connect(state=>{cloudCode:App.current.cloudCode})(
	({cloudCode,dispatch})=>{
		let refCode
		return (
			<div>
				<textarea ref={a=>refCode=a}
					value={cloudCode}
					onChange={({target:{value}})=>refCode.value=value}
					placeholder="Cloud nodejs code"
					style={{position:'absolute', height: '100%', top:0,lineHeight:'2em',
						margin:0,width:'100%', padding:10, paddingBottom:51,border:0}}/>
				<CommandBar className="footbar"
					items={[
						{action:"Back"}
						,{action:"Upload", icon:<Upload/>,
							onSelect:e=>dispatch(ACTION.UPLOAD())
						}
						,{action:"Save",icon:<Save/>,
							onSelect:e=>dispatch(ACTION.UPDATE(refCode.getValue()))
						}
					]}/>
			</div>
		)
	}
)


export default Object.assign(Cloud,{ACTION,REDUCER})
