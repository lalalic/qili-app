require('../style/index.less')
import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton} from 'material-ui'
import {normalize,arrayOf} from "normalizr"

import {init,User,QiliApp, UI, enhancedCombineReducers, compact, ENTITIES} from '.'
import Application from './db/app'
import App from './app'
import Logo from './icons/logo'
import {getCurrentApp, getApp} from "./selector"

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

class QiliConsole extends Component{
    render(){
        const {_id,name, children, dispatch, routes}=this.props
		let props={
			appId: "qiliAdmin"
			,init:a=>Application.init().then(apps=>dispatch(ACTION.APPS_FETCHED(apps)))
		}
		if(!_id){
			return (
				<QiliApp {...props}>
					<Empty icon={<Logo/>}>
						<Link to="app">click to create your first qili app</Link>
					</Empty>
				</QiliApp>
			)
		}

		let quickSwitchStyle={fontSize:"xx-small"}
		if(routes.find(a=>a.contextual===false))
			quickSwitchStyle.display="none"

        return (
            <QiliApp {...props}>
				<FloatingActionButton className="sticky top right" mini={true}
					style={quickSwitchStyle}
					onClick={e=>dispatch(ACTION.NEXT_APPLICATION(_id))}>
					{name}
				</FloatingActionButton>
				{children}
            </QiliApp>
        )
    }

	static contextTypes={
		router: PropTypes.object
	}
}

import Dashboard from './dashboard'
import AppUI, {Creator} from './app'
import CloudUI from './cloud'
import DataUI from './data'
import LogUI from './log'
import MyUI from "./my"
import SettingUI from "./setting"
import ProfileUI from "./user-profile"

import {connect} from "react-redux"


export const Main=QiliApp.render(
    (<Route path="/"
		component={connect(state=>compact(getCurrentApp(state),"_id","name"))(QiliConsole)}>

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
				component={connect(state=>({apps:Object.values(state.entities[Application._name])}))(MyUI)}
				contextual={false}/>

			<Route path="setting" component={SettingUI} />
			<Route path="profile" component={ProfileUI} contextual={false}/>
		</Route>


    </Route>)
	,[  {[DOMAIN]:REDUCER}
		,{
			ui:enhancedCombineReducers(
				{log:LogUI.REDUCER}
				,{cloud:CloudUI.REDUCER}
				,{data:DataUI.REDUCER}
			)
		}]
)


/**
@Todo:
*Done: after adding new application
    application list doesn't reflect the change
    local storage without All fields, such as without application name, ..., because server returned only _id, createdAt, ...
*Done: after application deletion, UI should go to / even with error
*Done: error happens, UI should not be Empty
*Don't: use <Link/> rather than this.context.router.transitionTo
**Done: Never empty UI
**Done: FloatActionButton position when view width is 960

* too small-zoom size in mobile browser
* first focus on form, cloud UI
* background to upload to backend
    done: WebSQLDb is done
    *** sqlite
    done: *** after remove app, local cache should be removed too
** textfield can't be changed (which??)
*Done: login error, placeholder and value show together
* simple data mode:
    * remote upsert and remove directly
    * local cache for search
* Cannot read property 'componentDidEnter' of undefined
*Done: Date show as meaningful
* data list to show object field [object]=>{...}
*/
