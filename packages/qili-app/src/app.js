import "../index.less"
import * as date from "./tools/date"

import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {render} from "react-dom"
import {persistStore, autoRehydrate} from 'redux-persist'

import {compose, pure,branch,renderComponent, renderNothing,
		setDisplayName,
		withProps, defaultProps, withContext, setStatic, setPropTypes, mapProps} from "recompose"
import {withGraphql} from "./graphql"
import File from "./components/file"
import {createStore, applyMiddleware, combineReducers} from "redux"

import {connect, Provider} from "react-redux"
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import LightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

import Performance from "./components/performance"
import Authentication from "./components/authentication"
import Tutorial from "./components/tutorial"
import Empty from "./components/empty"
import SplashAD from "./components/splash-ad"
import * as offline from "./components/offline"

import {DOMAIN, ACTION, REDUCER} from "./state"

const THEME=getMuiTheme(LightBaseTheme,{
	footbar:{
		height: 50
	},
	page:{
		width: window.innerWidth > 960 ? 960 : window.innerWidth,
		height:window.innerHeight
	}
})



const UI=({muiTheme,children="hello Qili!"})=>(
	<MuiThemeProvider muiTheme={muiTheme}>
		<Fragment>
			{children}
		</Fragment>
	</MuiThemeProvider>
)

const Loading=connect(state=>({loading:!!state[DOMAIN].loading}))(({loading})=>(
	<div className="loading sticky top right" style={{zIndex:9000}}>
		<CircularProgress style={{display: loading ? undefined : "none"}}/>
	</div>
))

const Message=connect(state=>({level:"info",...state[DOMAIN].message}))(
	({level,message,dispatch,duration=(level=="info" ? 1000 : 3000)})=>(
	<Snackbar
		  className="message"
          open={!!message}
		  contentStyle={{color: level=="info" ? "white" : "red"}}
          message={message||""}
          autoHideDuration={duration}
          onRequestClose={e=>dispatch(ACTION.MESSAGE())}
        />
))

export default compose(
	setDisplayName("QiliApp"),
	setPropTypes({
		appId: PropTypes.string.isRequired,
		service: PropTypes.string,
		store: PropTypes.object,
		theme: PropTypes.object,
		offlineTheme: PropTypes.object,
		tutorial: PropTypes.arrayOf(PropTypes.string),
		project: PropTypes.object,
		isDev: PropTypes.bool,
		notifyOffline: PropTypes.bool,
		supportOffline: PropTypes.object,
		persistStoreConfig: PropTypes.object,
		supportEmailAccount: PropTypes.bool,
	}),

	setStatic("render", (app,container)=>{
		container=container||document.getElementById('app')
		if(!container){
			container=document.createElement('div')
			container.id='app'
			document.body.appendChild(container)
			document.body.style=`
				display:flex;
				flex-direction:column;
				overflow:hidden;
				margin:0px auto;
				padding:0;
				background-color:lightgray;
				position:absolute;
				width:100%;
				height:100%
			`
			container.style=`
				flex:1 1 100%;
				background-color:white;
				margin:0px auto;
				position:relative;
				display:flex;
				flex-direction:column;
			`
		}

		let style=document.createElement("style")
		document.getElementsByTagName("head")[0].appendChild(style)

		function size(){
			style.innerHTML=`
				.page{
					position:absolute;
					width:100%;
					height:100%;
					overflow:hidden;
				}
			`
			THEME.page.height=window.innerHeight
		}

		size()
		window.addEventListener("resize", size)

		return render(app,container)
	}),

	defaultProps({
		service:"https://api.qili2.com/1/graphql",
		theme:THEME
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

	withProps(({store,reducers,appId,project,isDev,persistStoreConfig, debug})=>{
		File.root=appId
		if(!store){
			const composeEnhancers = (debug||process.env.NODE_ENV !== 'production') && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
			store=createStore(
				combineReducers({[DOMAIN]:REDUCER,...reducers}),
				composeEnhancers(applyMiddleware(thunk),autoRehydrate())
			)

			persistStore(store,{keyPrefix:`${appId}:`,...persistStoreConfig}, ()=>{
				store.dispatch(ACTION.LOADING(false))
				store.dispatch(ACTION.ONLINE())
				store.dispatch(ACTION.READY)
			})

			store.combineReducers=function(appending){
				store.replaceReducer(combineReducers({...appending, [DOMAIN]:REDUCER,...reducers}))
				return store
			}

			const dispatch=store.dispatch.bind(store)

			const props={
				store,
				checkVersion(){
					project && dispatch(ACTION.CHECK_VERSION(project.version))
				},
				tutorialize(){
					dispatch(ACTION.TUTORIALIZED)
				},
				setUser(user){
					dispatch(ACTION.CURRENT_USER(user))
				},
				loading(a){
					//dispatch(ACTION.LOADING(a))
				},
				showMessage(m){
					dispatch(ACTION.MESSAGE(m))
				},
				doneAD(){
					dispatch(ACTION.AD_DONE)
				},
				optics(report){
					if(isDev)
						dispatch(ACTION.REPORT(report))
				},
				network(status){
					switch(status){
						case  "online":
							dispatch(ACTION.ONLINE())
						break
						case  "offline":
							dispatch(ACTION.OFFLINE())
						break
						default:
							return store.getState().qili.networkStatus

					}
				}
			}

			window.addEventListener('online',  ()=>props.network("online"))
			window.addEventListener('offline', ()=>props.network("offline"))

			return props
		}
	}),
	withContext({
			is: PropTypes.object,
			project: PropTypes.object,
			loading: PropTypes.func,
			showMessage: PropTypes.func,
			theme: PropTypes.object,
			optics: PropTypes.func,
		},
		({project,loading,showMessage,theme,optics})=>({
			is:{
				app: typeof(cordova)!=="undefined"
			},
			project,
			loading,
			showMessage,
			theme,
			optics
		})
	),
	
	connect(({qili:{user={}}})=>{
		const {id,token}=user
		return {user:id,token, key:id}
	}),

	connect(({qili:{inited,AD,tutorialized}})=>{
		let props={}
		if(inited!=undefined)
			props.inited=inited
		if(AD!=undefined)
			props.AD=AD
		if(tutorialized!=undefined)
			props.tutorialized=tutorialized
		return props
	}),

	branch(({tutorialized,tutorial=[]})=>!tutorialized&&tutorial.length,
		renderComponent(({tutorial,tutorialize,theme,store, })=>
			<Provider store={store}>
				<UI muiTheme={theme}>
					<Tutorial slides={tutorial} onEnd={tutorialize}/>
				 </UI>
			</Provider>
	)),

	branch(({AD, inited, adUrl})=>!AD || !inited,
		renderComponent(({inited, doneAD, adUrl, store, theme})=>(
				<Provider store={store}>
					<UI muiTheme={theme}>
						<SplashAD url={adUrl} onEnd={inited ? doneAD : a=>a}/>
					 </UI>
				</Provider>
			)
		)
	),

	withGraphql(),

	branch(({token})=>!token,renderComponent(({theme, store, setUser, supportEmailAccount})=>
		<Provider store={store}>
			<UI muiTheme={theme}>
				<div style={{margin:10}}>
					<Authentication onSuccess={setUser} supportEmail={supportEmailAccount}/>
				</div>
				<Loading/>
				<Message/>
			 </UI>
		</Provider>
	)),

	mapProps(({title,theme,checkVersion,store,children,isDev,notifyOffline, supportOffline})=>(
		{title,theme,checkVersion,store,children,isDev,notifyOffline,supportOffline}
	)),
	pure,
)(
	class extends Component{
		render(){
			let {theme, store, children,isDev, notifyOffline=true}=this.props
			return (
				<Provider store={store}>
					<UI muiTheme={theme}>
						<Loading/>
						{notifyOffline ? <offline.Notification/> : null}
						{children}
						<Message/>
						{isDev ? <Performance/> : null}
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
			title: PropTypes.string,
			notifyOffline: PropTypes.bool,
		}
	}
)
