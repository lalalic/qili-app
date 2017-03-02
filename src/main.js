require('../style/index.less')
import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton, AppBar, IconButton} from 'material-ui'
import {normalize,arrayOf} from "normalizr"
import {combineReducers} from "redux"

import {init,User,QiliApp, UI, enhancedCombineReducers, compact, ENTITIES} from '.'
import Application from './db/app'
import App from './app'
import Logo from './icons/logo'
import {getCurrentApp, getApp} from "./selector"

import Dashboard from './dashboard'
import AppUI, {Creator} from './app'
import CloudUI from './cloud'
import DataUI from './data'
import LogUI from './log'
import MyUI from "./my"
import SettingUI from "./setting"
import ProfileUI from "./user-profile"

import {connect} from "react-redux"

let initApp=null

const {Empty}=UI

const DOMAIN="qiliAdmin"

export const ACTION={
	SET_CURRENT_APP_BY_ID: id=>(dispatch,getState)=>{
		let state=getState()
		let apps=state.entities[Application._name]
		let found=apps[id]
		if(found)
			dispatch(ACTION.SET_CURRENT_APP(found))
	}
	,SET_CURRENT_APP:app=>{
		Application.current=app
		return {type:`SET_CURRENT_APP`,payload:app}
	}
	,APPS_FETCHED: apps=>dispatch=>{
		if(apps.length){
			dispatch(ENTITIES(normalize(apps,arrayOf(Application.schema)).entities))
			let current=null
			if(initApp)
				current=apps.find(a=>a._id==initApp)
			if(!current)
				current=apps[0]
			dispatch(ACTION.SET_CURRENT_APP(current))
		}
	}
	,NEXT_APPLICATION: app=>(dispatch,getState)=>{
		const state=getState()
		const apps=state.entities[Application._name]
		let ids=Object.keys(apps)
		let index=ids[(ids.indexOf(app)+1)%ids.length]
		if(index){
			let next=apps[index]
			dispatch(ACTION.SET_CURRENT_APP(next))
		}
	}
}

const REDUCER=(state={},{type,payload})=>{
	switch(type){
	case `SET_CURRENT_APP`:
		return {app:payload._id}
	}
	return state
}

export class QiliConsole extends Component{
	state={contextual:true}
    render(){
        const {_id,name, children, dispatch}=this.props
		const {contextual}=this.state
		let props={
			appId: "qiliAdmin"
			,init:a=>Application.init().then(apps=>dispatch(ACTION.APPS_FETCHED(apps)))
			,project: require("../package.json")
		}
		if(!_id){
			return (
				<QiliApp {...props}>
					<AppBar title="Start from your first qili Applicaiton!"/>
					<Creator bFirst={true} dispatch={dispatch}/>
				</QiliApp>
			)
		}

        return (
            <QiliApp {...props}>
				{
					contextual ? 
					(<FloatingActionButton className="sticky top right" mini={true}
						style={{fontSize:"xx-small"}}
						onClick={e=>dispatch(ACTION.NEXT_APPLICATION(_id))}>
						{name}
					</FloatingActionButton>) : null
				}
				<Router history={hashHistory}>
					<Route path="/"
						onEnter={({routes})=>
							this.setState({contextual:!!!routes.find(a=>a.contextual===false)})
						}
						onChange={(prevState, {routes})=>
							this.setState({contextual:!!!routes.find(a=>a.contextual===false)})
						}>

						<IndexRoute component={Dashboard}/>

						<Route path="app" contextual={false}>
							<IndexRoute component={connect()(Creator)}/>

							<Route path=":_id"
								component={connect((state,{params:{_id}})=>{
									let urlApp=getApp(state,_id)
									let current=getCurrentApp(state)
									let info=compact(urlApp,"name","uname","apiKey")
									info.isCurrent=urlApp==current
									return info
									})(AppUI)}
								onEnter={({params:{_id}})=>initApp=_id}
								/>
						</Route>

						<Route path="cloud" component={connect(state=>({cloudCode:getCurrentApp(state).cloudCode}))(CloudUI)}/>

						<Route path="data"
							component={connect(state=>({...state.ui.data,app:getCurrentApp(state)._id}))(DataUI)}>
							<IndexRedirect to={`${User._name}`}/>
							<Route path=":name"/>
						</Route>

						<Route path="log"
							component={connect(state=>state.ui.log)(LogUI)}>
							<IndexRedirect to="all"/>
							<Route path=":level"/>
						</Route>

						<Route path="my">
							<IndexRoute
								component={connect(state=>{
									let apps=state.entities[Application._name]
									return {apps: apps ? Object.keys(apps).map(k=>apps[k]) : []}	
								})(MyUI)}
								contextual={false}/>

							<Route path="setting" component={SettingUI} />
							<Route path="profile" component={ProfileUI} contextual={false}/>
						</Route>
					</Route>
				</Router>
            </QiliApp>
        )
    }
}

const StateQiliConsole=connect(state=>compact(getCurrentApp(state),"_id","name"))(QiliConsole)

export const Main=QiliApp.render(<StateQiliConsole/>,{
	[DOMAIN]:REDUCER,
	ui:combineReducers({
		log:LogUI.REDUCER,
		cloud:CloudUI.REDUCER,
		data:DataUI.REDUCER
	})
})
