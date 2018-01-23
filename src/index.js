import React, {Component} from "react"
import PropTypes from "prop-types"
import {render} from "react-dom"
import {persistStore, autoRehydrate} from 'redux-persist'

import {compose, pure,withState,branch,renderComponent, renderNothing,
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
import IconOffline from "material-ui/svg-icons/file/cloud-off"

import supportTap from 'react-tap-event-plugin'
import * as date from "tools/date"

import Performance from "components/performance"
import File from "components/file"
import Authentication from "components/authentication"
import Tutorial from "components/tutorial"
import Empty from "components/empty"
import SplashAD from "components/splash-ad"

export const DOMAIN="qili"

export const ACTION={
	CHECK_VERSION:(homepage,currentVersion)=>dispatch=>{
		fetch(`${homepage}/app.apk.version`)
			.then(res=>res.text())
			.then(version=>dispatch({type:`@@${DOMAIN}/LASTEST_VERSION`, payload:ver}))
			.catch(e=>e)
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
	AD_DONE: ({type:`@@${DOMAIN}/ADDONE`}),
	READY:({type:`@@${DOMAIN}/INITED`}),
	REPORT: report=>({type:`@@${DOMAIN}/OPTICS`,payload:report}),
	ONLINE: ()=>({type:`@@${DOMAIN}/ONLINE`}),
	OFFLINE: ()=>({type:`@@${DOMAIN}/OFFLINE`}),
}

export const REDUCER=(state={networkStatus:"online"},{type,payload})=>{
	switch(type){
	case `@@${DOMAIN}/OPTICS`:
		return {...state, optics:{toJSON:()=>undefined,...payload}}
	case `@@${DOMAIN}/INITED`:
		return {...state, inited:{toJSON:()=>undefined}}
	case `@@${DOMAIN}/ADDONE`:
		return {...state, AD:{toJSON:()=>undefined}}
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
	case `@@${DOMAIN}/OFFLINE`:
		return {...state, networkStatus:"offline"}
	case `@@${DOMAIN}/ONLINE`:
		return {...state, networkStatus:"online"}
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
	<div className="sticky top right" style={{zIndex:1000}}>
		<CircularProgress style={{display: loading ? undefined : "none"}}/>
	</div>
))

const Message=connect(state=>({level:"info",...state[DOMAIN].message}))(
	({level,message,dispatch,duration=(level=="info" ? 1000 : 3000)})=>(
	<Snackbar
          open={!!message}
		  contentStyle={{color: level=="info" ? "white" : "red"}}
          message={message||""}
          autoHideDuration={duration}
          onRequestClose={e=>dispatch(ACTION.MESSAGE())}
        />
))

export const notSupportOffline=(NoSupport=()=>(<Empty icon={<IconOffline/>}>Not Support Offline</Empty>))=>BaseComponent=>{
	
	const NetworkSensitive=connect(state=>({offline:state[DOMAIN].networkStatus=="offline"}))(({offline, ...props})=>(
		offline ? <NoSupport/> : <BaseComponent {...props}/>
	))
	
	return NetworkSensitive
}


export class QiliApp extends Component{
	static displayName="QiliApp"
    render(){
        let {theme, store, children,isDev}=this.props
        return (
			<Provider store={store}>
				<UI muiTheme={theme}>
					{children}
					<Loading/>
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

	withProps(({store,reducers,appId,project,isDev})=>{
		File.root=appId
		if(!store){
			const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
			store=createStore(
				combineReducers({[DOMAIN]:REDUCER,...reducers}),
				composeEnhancers(applyMiddleware(thunk),autoRehydrate())
			)

			persistStore(store,{keyPrefix:`${appId}:`}, ()=>{
				store.dispatch(ACTION.ONLINE())
				store.dispatch(ACTION.READY)
			})

			const dispatch=store.dispatch.bind(store)

			return {
				store,
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

	branch(({AD, adUrl})=>!AD && adUrl,renderComponent(({doneAD, adUrl})=><SplashAD url={adUrl} onEnd={doneAD}/>)),

	branch(({inited})=>!inited, renderNothing),

	connect(({qili:{user}})=>(user!==undefined ? {user} : {})),

	withGraphqlClient(),

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
	mapProps(({title,theme,checkVersion,store,children,isDev})=>({title,theme,checkVersion,store,children,isDev})),
	pure,
)(QiliApp)
