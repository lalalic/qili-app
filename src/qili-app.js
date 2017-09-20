import React, {Component, PropTypes} from "react"
import {render} from "react-dom"

import {compose, withState,branch,renderComponent,withProps, defaultProps, withContext, setStatic} from "recompose"

import {createStore, applyMiddleware, combineReducers, compose as  redux_compose} from "redux"
import {connect, Provider} from "react-redux"
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import LightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

import supportTap from 'react-tap-event-plugin'

import Authentication from "components/authentication"
import Tutorial from "components/tutorial"
import Empty from "components/empty"
import createEnvironment from "tools/environment"

export const DOMAIN="qili"

export const ACTION={
	CHECK_VERSION:(homepage,currentVersion)=>dispatch=>{
		require("http").get(`${homepage}/app.apk.version`, res=>{
			res.on("data", data=>{
				dispatch({type:`@@${DOMAIN}/LASTEST_VERSION`, payload:new Buffer(data).toString().trim()})
			})
		}).end()
	},
	USER_CHANGED:user=>({
        type:`@@${DOMAIN}/USER_CHANGED`
		,payload:user
	}),
	TUTORIALIZED:({type:`@@${DOMAIN}/TUTORIALIZED`}),
	LOGOUT:({type:`@@${DOMAIN}/LOGOUT`}),
	LOADING: payload=>({type:`@@${DOMAIN}/LOADING`,payload:a}),
	MESSAGE: payload=>({type:`@@${DOMAIN}/MESSAGE`,payload}),
}

export const REDUCER=(state={},{type,payload})=>{
	switch(type){
	case `@@${DOMAIN}/USER_CHANGED`:
		return {...state,user:payload}
	case `@@${DOMAIN}/TUTORIALIZED`:
		return {...state,tutorialized:true}
	case `@@${DOMAIN}/LOGOUT`:
		return {...state, user:{...state.user, token:undefined}}
	case `@@${DOMAIN}/LASTEST_VERSION`:
		return {...state,latestVersion:payload}
	case `@@${DOMAIN}/LOADING`:
		return {...state,loading:!!payload}
	case `@@${DOMAIN}/MESSAGE`:
		return {...state, message:payload}
	}

	return state
}

const UI=({muiTheme,children="hello Qili!"})=>(
	<MuiThemeProvider muiTheme={muiTheme}>
		<div className="withFootbar">
			<div id="container" style={{overflowY:"scroll"}}>
			{children}
			</div>
		</div>
	</MuiThemeProvider>
)

const Loading=connect(state=>({loading:!!state[DOMAIN].loading}))(({loading})=>(
	<div className="sticky top right">
		<CircularProgress style={{display: loading ? undefined : "none"}}/>
	</div>
))

const Message=connect(state=>({level:"info",duration:4000,...state[DOMAIN].message}))(({level,message,dispatch,duration})=>(
	<Snackbar
          open={!!message}
		  contentStyle={{color: level=="info" ? "auto" : "red"}}
          message={message||""}
          autoHideDuration={duration}
          onRequestClose={e=>dispatch(ACTION.MESSAGE())}
        />
))


export class QiliApp extends Component{
	static displayName="QiliApp"
    render(){
        let {theme, store, children}=this.props
        return (
			<Provider store={store}>
				<UI muiTheme={theme}>
					{children}
					<Loading/>
					<Message/>
				 </UI>
			</Provider>
        )
    }

	componentDidMount(){
		const {title, checkVersion}=this.props
		if(title){
			document.title=title
		}
		checkVersion()
	}

	static propsTypes={
		service: PropTypes.string.isRequired,
		appId:PropTypes.string.isRequired,
		theme: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
		environment: PropTypes.object.isRequired,
		user: PropTypes.object,
		tutorial:PropTypes.array,
		title: PropTypes.string,
		project: PropTypes.object
	}
}

export default compose(
	setStatic("render", (app)=>{
		let container=document.getElementById('app')
		if(!container){
			container=document.createElement('div')
			container.id='app'
			document.body.appendChild(container)
			let style=document.createElement("style")
			document.getElementsByTagName("head")[0].appendChild(style)
			style.innerHTML=".page{min-height:"+window.innerHeight+"px}"
			container.style.height=window.innerHeight+'px'
		}

		supportTap()

		return render(app,container)
	}),

	defaultProps({
		service:"http://qili2.com/1/",
		theme:getMuiTheme(LightBaseTheme,{
			footbar:{
				height: 50
			},
			page:{
				width: window.innerWidth > 960 ? 960 : window.innerWidth
				,height:window.innerHeight
			}
		})
	}),

	branch(({appId})=>!appId,renderComponent(({theme})=>
		<UI muiTheme={theme}>
			<Empty icon={null}>
				<ol  style={{textAlign:"left"}}>
					<li>在app.qili.com上创建一个应用，获取AppId</li>
					<li>创建一个React Component
						<pre>
						{`
		import React from "react"
		import QiliApp from "qili-app"
		const MyApp=()=>(
			<QiliApp appId="xxxx">
				hello qili!
			</QiliApp>
		)
		QiliApp.render(<MyApp/>)
						`}
						</pre>
					</li>
					<li>Have fun</li>
				</ol>
			</Empty>
		</UI>
	)),

	withProps(({store,environment,reducers})=>{
		if(!store){
			const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

			store=createStore(
				combineReducers({
					...reducers,
					qili:REDUCER
				}),
				composeEnhancers(applyMiddleware(thunk))
			)

			return {store}
		}
	}),

	connect(state=>state[DOMAIN],(dispatch, {project})=>({
		checkVersion(){
			dispatch(ACTION.CHECK_VERSION(project.homepage, project.version))
		}
	})),

	branch(({tutorialized,tutorial=[]})=>!tutorialized&&tutorial.length,
		renderComponent(({tutorial,theme,dispatch,store})=>
			<Provider store={store}>
				<UI muiTheme={theme}>
					<Tutorial slides={tutorial} onEnd={e=>dispatch(ACTION.TUTORIALIZED)}/>
				 </UI>
			</Provider>
	)),

	withProps(props=>{
		let {environment,service, appId}=props
		if(!environment){
			return {environment: createEnvironment(appId, props.user? props.user.token : undefined)}
		}
	}),
	withContext({
			is: PropTypes.object,
			project: PropTypes.object,
			environment: PropTypes.object,
		},
		({project, environment})=>({
			is:{
				app: typeof(cordova)!=="undefined"
			},
			project,
			environment,
		})
	),
	branch(({user})=>!user||!user.token,renderComponent(({dispatch,theme,environment, store})=>
		<Provider store={store}>
			<UI muiTheme={theme}>
				<Authentication
					onSuccess={user=>dispatch(ACTION.USER_CHANGED(user))}/>
				<Loading/>
				<Message/>
			 </UI>
		</Provider>
	)),
)(QiliApp)
