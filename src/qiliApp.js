import React, {Component, PropTypes} from "react"
import ReactDOM, {render} from "react-dom"

import {Router, Route, IndexRoute, hashHistory} from "react-router"

import {createStore, applyMiddleware,compose} from "redux"
import {Provider, connect} from "react-redux"
import thunk from 'redux-thunk'

import {Styles, Snackbar, Utils, FloatingActionButton} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"

import {enhancedCombineReducers} from "."

import {init,User} from "./db"
import Messager from "./components/messager"
import Loading from "./components/loading"
import supportTap from 'react-tap-event-plugin'
import Account from './account'
import Tutorial from "./components/tutorial"
import Comment from "./components/comment"

export const DOMAIN="qiliApp"

export const ACTION={
	INIT_APP(error,tutorialized){
		if(!!error){
			return {
				type:`@@${DOMAIN}/initedError`
				,payload:{user:User.current,error}
			}
		}else{
			return {
				type:`@@${DOMAIN}/inited`
				,payload:{tutorialized}
			}
		}
	}
	,CHECK_VERSION:(homepage,currentVersion)=>dispatch=>{
		require("http").get(`${homepage}/app.apk.version`, res=>{
			res.on("data", data=>{
				dispatch({type:`@@${DOMAIN}/LASTEST_VERSION`, payload:new Buffer(data).toString().trim()})
			})
		}).end()
	}
	,LOGOUT: A=>User.logout()
	,USER_CHANGED:user=>({
        type:`@@${DOMAIN}/USER_CHANGED`
		,payload:user
	}),TUTORIALIZED:({
        type:`@@${DOMAIN}/TUTORIALIZED`
	})
}

export const REDUCER=(state={},{type,payload})=>{
	switch(type){
	case `@@${DOMAIN}/inited`:
		return Object.assign({}, state,{
			inited:true
			,user:User.current
			,tutorialized:payload.tutorialized
		})
	break
	case `@@${DOMAIN}/initedError`:
		return Object.assign({},state,{
			initedError:payload.error
		})
	break
	case `@@${DOMAIN}/USER_CHANGED`:
		return Object.assign({},state,{
			user:payload
		})
	case `@@${DOMAIN}/TUTORIALIZED`:
		return Object.assign({},state,{tutorialized:true})

	case `@@${DOMAIN}/LASTEST_VERSION`:
		return Object.assign({},state,{latestVersion:payload})
	}

	return state
}

export class QiliApp extends Component{
	constructor(props){
		super(props)

		const {service, appId}=this.props

		if(!appId)
			throw new Error("Please give application key")

		if(!service)
			throw new Error("Please give service url")
	}

	componentDidMount(){
		var {init:initApp, service, appId, title, project, dispatch}=this.props
		if(title)
			document.title=title

		init(service, appId, initApp, (e,type='Error')=>this.refs.msg.show(e,type), this.refs.loading)
			.then((tutorialized=false)=>{
					dispatch(ACTION.INIT_APP(null,!!tutorialized))
					User.on('change', user=>dispatch(ACTION.USER_CHANGED(user)))
				},
				(e)=>dispatch(ACTION.INIT_APP(e.message)))
			.then(a=>dispatch(ACTION.CHECK_VERSION(project.homepage, project.version)))
	}

	getChildContext(){
		let self=this
		return {
			showMessage(){
				self.showMessage(...arguments)
			}
			,loading(open){
				self.refs.loading[open ? "show" : "close"]()
			},
			is:{
				app: typeof(cordova)!=='undefined'
			},
			project: this.props.project
		}
	}

	showMessage(){
		this.refs.msg.show(...arguments)
	}


	render(){
		const {theme, inited, initedError, user, lastUser, tutorialized, dispatch}=this.props
		let content

		if(!inited){
			if(initedError)
				content= `initializing Error: ${initedError}`
			else
				content= "initializing..."
		}else if(!user){
			if(!tutorialized && Array.isArray(this.props.tutorial) && this.props.tutorial.length){
				return (
					<MuiThemeProvider muiTheme={theme}>
						<Tutorial slides={this.props.tutorial} onEnd={e=>dispatch(ACTION.TUTORIALIZED)}/>
					</MuiThemeProvider>
				)
			}

			content=(<Account dispatch={dispatch}/>)
		}else if(!user.sessionToken){
			content=(<Account user={user} dispatch={dispatch}/>)
		}else {
			content=this.renderContent()
		}

		return (
			<MuiThemeProvider muiTheme={theme}>
				<div className="withFootbar">
					<div id="container" style={{overflowY:"scroll"}}>
						{content}
						<Messager ref="msg" className="sticky bottom left"/>
						<Loading ref="loading"  className="sticky top right"/>
					</div>
				</div>
			</MuiThemeProvider>
		)
	}

	renderContent(){
		return this.props.children
	}

	static defaultProps={
		service:"http://qili2.com/1/",
		theme:getMuiTheme(lightBaseTheme,{
			footbar:{
				height: 50
			},
			page:{
				width: window.innerWidth > 960 ? 960 : window.innerWidth
				,height:window.innerHeight
			}
		}),
		init(){},
		tutorial:[],
		project:{}
	}

	static propsTypes={
		service: PropTypes.string.isRequired,
		appId:PropTypes.string.isRequired,
		theme: PropTypes.object.isRequired,
		init:PropTypes.func,
		tutorial:PropTypes.array,
		title: PropTypes.string,
		project: PropTypes.object
	}

	static childContextTypes={
		showMessage: PropTypes.func,
		loading: PropTypes.func,
		is: PropTypes.object,
		project: PropTypes.object
	}

	static render(route, reducers=[], ...middlewars){
		const props={}
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

		if(!props.history)
			props.history=hashHistory

		function routerRducer(state={},{type,payload}){
			switch(type){
			case '@@router/LOCATION_CHANGE':
			return payload
			}
			return state
		}

		const enhancedRoute=(root,dispatch)=>{
			const {onEnter, onChange}=root.props
			return React.cloneElement(root, {
				onEnter(nextState){
					dispatch({type:`@@router/LOCATION_CHANGE`,payload:nextState});
					onEnter && onEnter.bind(this)(...arguments)
				},
				onChange(state,nextState){
					dispatch({type:`@@router/LOCATION_CHANGE`,payload:nextState});
					onChange && onChange.bind(this)(...arguments)
				}
			})
		}

		function normalizeData(entities={},{type,payload}){
			switch(type){
			case 'NORMALIZED_DATA':
				return Object.assign(
					{},
					entities,
					Object.keys(payload).reduce((merged,type)=>{
						if(typeof(payload[type]['$remove'])=='undefined')
							merged[type]=Object.assign({},entities[type],payload[type])
						else
							merged[type]=Object.assign({},payload[type]['$remove'].reduce((all,a)=>(delete all[a],all),entities[type]))

						return merged
					},{})
				)
			}
			return entities
		}


		const allReducers=enhancedCombineReducers({
					routing:routerRducer
					,entities:normalizeData
					,comment:Comment.reducer
					,[DOMAIN]:REDUCER
				}, ...reducers)
		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		const store=createStore(allReducers, {qiliApp:{}, ui:{}, entities:{},comment:{}}, composeEnhancers(applyMiddleware(thunk,...middlewars)))

		supportTap()

		return render((
				<Provider store={store}>
					<Router {...props}>
						{enhancedRoute(route,store.dispatch)}
					</Router>
				</Provider>
			),container)
	}
}


export default Object.assign(connect(state=>state[DOMAIN],null,null,{pure:true,withRef:true})(QiliApp),{DOMAIN, ACTION,REDUCER})
