import React, {Component, PropTypes} from "react"
import {render} from "react-dom"
import {persistStore, autoRehydrate} from 'redux-persist'

import {compose, pure,withState,branch,renderComponent,
		withProps, defaultProps, withContext, setStatic, setPropTypes, mapProps} from "recompose"
import {withGraphqlClient} from "tools/recompose"

import {createStore, applyMiddleware, combineReducers} from "redux"

import {connect, Provider} from "react-redux"
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import LightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

import supportTap from 'react-tap-event-plugin'
import * as date from "tools/date"

import File from "components/file"
import Authentication from "components/authentication"
import Tutorial from "components/tutorial"
import Empty from "components/empty"
import SplashAD from "components/splash-ad"

export const DOMAIN="qili"

export const ACTION={
	CHECK_VERSION:(homepage,currentVersion)=>dispatch=>{
		if(document.location.hostname=="localhost")
			return
		require("http").get(`${homepage}/app.apk.version`, res=>{
			res.on("data", data=>{
				dispatch({type:`@@${DOMAIN}/LASTEST_VERSION`, payload:new Buffer(data).toString().trim()})
			})
		}).end()
	},
	CURRENT_USER:user=>({
        type:`@@${DOMAIN}/USER_CHANGED`
		,payload:user
	}),
	TUTORIALIZED:({type:`@@${DOMAIN}/TUTORIALIZED`}),
	LOGOUT:({type:`@@${DOMAIN}/LOGOUT`}),
	LOADING: payload=>({type:`@@${DOMAIN}/LOADING`,payload}),
	MESSAGE: payload=>({
		type:`@@${DOMAIN}/MESSAGE`,
		payload: typeof(payload)=="string" ? {message:payload}:payload
	}),
	INITED: ({type:`@@${DOMAIN}/INITED`}),
}

export const REDUCER=(state={inited:false},{type,payload})=>{
	switch(type){
	case `@@${DOMAIN}/INITED`:
		return {...state, inited:true}
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

const Message=connect(state=>({level:"info",duration:2000,...state[DOMAIN].message}))(({level,message,dispatch,duration})=>(
	<Snackbar
          open={!!message}
		  contentStyle={{color: level=="info" ? "white" : "red"}}
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
		theme: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
		checkVersion: PropTypes.func.isRequired,
		title: PropTypes.string
	}
}

export default compose(
	setPropTypes({
		appId: PropTypes.string.isRequired,
		service: PropTypes.string,
		store: PropTypes.object,
		theme: PropTypes.object,
		tutorial: PropTypes.arrayOf(PropTypes.string),
		project: PropTypes.object,
		isDev: PropTypes.bool,
	}),

	setStatic("render", (app)=>{
		let container=document.getElementById('app')
		if(!container){
			container=document.createElement('div')
			container.id='app'
			document.body.appendChild(container)
		}

		let style=document.createElement("style")
		document.getElementsByTagName("head")[0].appendChild(style)
		style.innerHTML=".page{min-height:"+window.innerHeight+"px}"
		container.style.height=window.innerHeight+'px'

		supportTap()

		return render(app,container)
	}),

	defaultProps({
		service:"http://qili2.com/1/graphql",
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

	withProps(({store,reducers,appId})=>{
		File.root=appId
		if(!store){
			const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
			store=createStore(
				combineReducers({[DOMAIN]:REDUCER,...reducers}),
				composeEnhancers(applyMiddleware(thunk),autoRehydrate())
			)

			persistStore(store,{keyPrefix:`${appId}:`})

			return {store}
		}
	}),
	
	connect(({qili:{loading,message, ...others}})=>others,(dispatch, {project})=>({
		checkVersion(){
			project && dispatch(ACTION.CHECK_VERSION(project.homepage, project.version))
		},
		tutorialize(){
			dispatch(ACTION.TUTORIALIZED)
		},
		setUser(user){
			dispatch(ACTION.CURRENT_USER(user))
		},
		loading(a){
			dispatch(ACTION.LOADING(a))
		},
		showMessage(m){
			dispatch(ACTION.MESSAGE(m))
		},
		ready(){
			dispatch(ACTION.INITED)
		}
	})),
	
	withContext({
			is: PropTypes.object,
			project: PropTypes.object,
			loading: PropTypes.func,
			showMessage: PropTypes.func,
			theme: PropTypes.object
		},
		({project,loading,showMessage,theme})=>({
			is:{
				app: typeof(cordova)!=="undefined"
			},
			project,
			loading,
			showMessage,
			theme,
		})
	),
	
	branch(({inited})=>!inited,renderComponent(({ready})=><SplashAD n={10} onEnd={ready}/>)),

	branch(({tutorialized,tutorial=[]})=>!tutorialized&&tutorial.length,
		renderComponent(({tutorial,tutorialize,theme,store, })=>
			<Provider store={store}>
				<UI muiTheme={theme}>
					<Tutorial slides={tutorial} onEnd={tutorialize}/>
				 </UI>
			</Provider>
	)),
	withGraphqlClient("relay modern"),
	branch(({user})=>!user||!user.token,renderComponent(({theme, store, setUser})=>
		<Provider store={store}>
			<UI muiTheme={theme}>
				<div style={{margin:10}}>
					<Authentication onSuccess={setUser}/>
				</div>
				<Loading/>
				<Message/>
			 </UI>
		</Provider>
	)),
	mapProps(({title,theme,checkVersion,store,children})=>({title,theme,checkVersion,store,children})),
	pure,
)(QiliApp)
