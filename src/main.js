require('../style/index.less')
import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton} from 'material-ui'
import {normalize,arrayOf} from "normalizr"

import {init,User,QiliApp, UI, enhancedCombineReducers} from '.'
import Application from './db/app'
import App from './app'
import Logo from './icons/logo'

const {Empty}=UI

const DOMAIN="qiliAdmin"

const ACTION={
	APP_CHANGED:app=>({type:`@@${DOMAIN}/APP_CHANGED`,payload:{app}})
	,APPS_FETCHED: apps=>dispatch=>{
		dispatch({type:'NORMALIZED_DATA',payload:normalize(apps,arrayOf(Application.Schema)).entities})
	}
	,SWITCH_APPLICATION: app=>(dispatch,getState)=>{
		const apps=getState().entities[Application._name]
		let ids=Object.keys(apps)
		let index=ids[(ids.indexOf(app)+1)%ids.length]
		Application.current=apps[index]
	}
}

const REDUCER={
	[DOMAIN]: (state={},{type,payload})=>{
		switch(type){
		case `@@${DOMAIN}/APP_CHANGED`:
			return {app:payload.app}
		}
		return state
	}
}

class QiliConsole extends Component{
    constructor(props){
        super(props)
		Application.on('change',app=>{
			const {dispatch,routes,params}=this.props
			const {router}=this.context
			dispatch(ACTION.APP_CHANGED(app))
			if(routes[1] && routes[1].name=='app' && params.name!=app.name)
				router.replace(`/app/${app.name}`)
		})
    }

    render(){
        const {app, initAppName, children, dispatch, routes}=this.props
		let props={
			appId: "qiliAdmin"
			,init:a=>Application.init(initAppName).then(apps=>dispatch(ACTION.APPS_FETCHED(apps)))
		}
		if(!app){
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
					onClick={e=>dispatch(ACTION.SWITCH_APPLICATION(app._id))}>
					{app.name}
				</FloatingActionButton>
				{children}
            </QiliApp>
        )
    }

	static defaultProps={
		initAppName:null
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
		component={connect(state=>({app:state[DOMAIN].app}))(QiliConsole)}>
		
        <IndexRoute component={Dashboard}/>

        <Route path="app/:name" name="app" 
			component={connect(state=>({app:state[DOMAIN].app,...state.ui[AppUI.DOMAIN]}))(AppUI)}
			onEnter={({params:{name}})=>{
				if(!Application.current){
					QiliConsole.WrappedComponent.defaultProps.initAppName=name
				}
			}}
			/>
		<Route path="app" contextual={false} 
			component={connect(state=>state.ui)(Creator)}/>

        <Route path="cloud" component={CloudUI}/>

        <Route path="data" component={DataUI}>
            <IndexRedirect to={`${User._name}`}/>
            <Route path=":name"/>
        </Route>

        <Route path="log" component={LogUI}>
            <IndexRedirect to="all"/>
            <Route path=":level"/>
        </Route>

		<Route path="my">
			<IndexRoute component={MyUI} contextual={false}/>
			<Route path="setting" component={SettingUI} />
			<Route path="profile" component={ProfileUI} contextual={false}/>
		</Route>


    </Route>)
	,[REDUCER, {ui:enhancedCombineReducers(AppUI.REDUCER)}/*,AppUI.REDUCER,LogUI.REDUCER,CloudUI.REDUCER,ProfileUI.REDUCER,DataUI.REDUCER*/]
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
