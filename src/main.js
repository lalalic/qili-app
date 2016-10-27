require('../style/index.less')
import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton} from 'material-ui'

import {init,User,QiliApp, UI, Position} from '.'
import Application from './db/app'
import App from './app'
import Logo from './icons/logo'

const {Empty}=UI

const DOMAIN="qiliConsole"

const ACTION={
	APP_CHANGED:app=>{
		return {type:`@@${DOMAIN}/APP_CHANGED`,payload:{app}}
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

const QiliConsole=connect(state=>({app:state[DOMAIN].app}))(
class _QiliConsole extends Component{
    constructor(props){
        super(props)
		Application.on('change',app=>{
			const {dispatch,routes,params,router}=this.props
			dispatch(ACTION.APP_CHANGED(app))
			if(routes[1] && routes[1].name=='app' && params.name!=app.name)
				router.replace(`/app/${app.name}`)
		})
    }

    render(){
        const {app, initAppName, children}=this.props
		let props={
			appId: "qiliAdmin"
			, init:a=>Application.init(initAppName)
			, service:"http://localhost:9080/1/"
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


        return (
            <QiliApp {...props}>
				<CurrentApp name={app.name} app={app} open={!!app && this.contextual()}/>
				{children}
            </QiliApp>
        )
    }

	contextual(){
		const {routes}=this.props
		return !!!routes.find(a=>a.contextual===false)
	}

	static childContextTypes={
		app: React.PropTypes.object
	}

	getChildContext(){
		return {
			app: this.props.app
		}
	}

	static defaultProps={
		initAppName:null
	}
	
	static contextTypes={
		router: PropTypes.object
	}
})

const CurrentApp=({name, app, open})=>(
	<FloatingActionButton className="sticky top right" mini={true}
		style={{fontSize:"xx-small", display:open ? undefined : "none" }}
		onClick={e=>{
			let apps=Application.all, len=apps.length
			if(len>1){
				let index=apps.findIndex(a=>a._id==app._id)
				let target=apps[(index+1) % len]

				Application.current=target
			}
		}}>
		{name}
	</FloatingActionButton>
)

import Dashboard from './dashboard'
import AppUI, {Creator, REDUCER as appUIReducer} from './app'
import CloudUI from './cloud'
import DataUI from './data'
import LogUI, {REDUCER as logUIReducer} from './log'
import MyUI from "./my"
import SettingUI from "./setting"
import ProfileUI from "./user-profile"

import {connect} from "react-redux"
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

export const Main=QiliApp.render(
    (<Route path="/" component={QiliConsole}>
        <IndexRoute component={Dashboard}/>

        <Route path="app/:name" name="app" component={AppUI}
			onEnter={({params:{name}})=>{
				if(!Application.current){
					QiliConsole.WrappedComponent.defaultProps.initAppName=name
				}
			}}
			/>
		<Route path="app" contextual={false} component={Creator}/>

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


    </Route>),{}
	,Object.assign({},REDUCER,appUIReducer,logUIReducer)
	,thunk
	,createLogger()
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
