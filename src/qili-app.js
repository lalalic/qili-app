import React, {Component, PropTypes} from "react"
import {gql,graphql,ApolloClient,ApolloProvider,createNetworkInterface} from 'react-apollo'
import {compose, withState,branch,renderComponent,withProps} from "recompose"

import {createStore, applyMiddleware,combineReducers, compose as  redux_compose} from "redux"
import {Provider as ReduxProvider, connect} from "react-redux"
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import Authentication from "components/authentication"
import Empty from "components/empty"

export const DOMAIN="qiliApp"

export const ACTION={
	CHECK_VERSION:(homepage,currentVersion)=>dispatch=>{
		require("http").get(`${homepage}/app.apk.version`, res=>{
			res.on("data", data=>{
				dispatch({type:`@@${DOMAIN}/LASTEST_VERSION`, payload:new Buffer(data).toString().trim()})
			})
		}).end()
	},
	LOGIN:user=>({
        type:`@@${DOMAIN}/USER_CHANGED`
		,payload:user
	}),
	TUTORIALIZED:({
        type:`@@${DOMAIN}/TUTORIALIZED`
	}),
	LOGOUT:({type:`@@${DOMAIN}/LOGOUT`})
}

export const REDUCER=(state={},{type,payload})=>{
	switch(type){
	case `@@${DOMAIN}/USER_CHANGED`:
		return {...state,user:payload}
	case `@@${DOMAIN}/TUTORIALIZED`:
		return {...state,tutorialized:true}
	case `@@${DOMAIN}/LOGOUT`:
		return {...state, user:{...state.user, sessionToken:undefined}}
	case `@@${DOMAIN}/LASTEST_VERSION`:
		return {...state,latestVersion:payload}
	}

	return state
}

const UI=({muiTheme,children})=>(
	<MuiThemeProvider muiTheme={muiTheme}>
		<div className="withFootbar">
			<div id="container" style={{overflowY:"scroll"}}>
			{children}
			</div>
		</div>
	</MuiThemeProvider>
)

export class QiliApp extends Component{
	constructor(props){
		super(...arguments)
		this.createStore()
		this.createApollo()
	}
	
	createStore(){
		let {store}=this.props
		if(!store){
			const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_compose;
			store=createStore(
				combineReducers({[DOMAIN]:REDUCER}), 
				composeEnhancers(applyMiddleware(thunk))
			)
			
		}
		
		this.store=store
	}
	
	createApollo(){
		let {apollo}=this.props
		if(!apollo){
			let networkInterface=createNetworkInterface({
				uri:service
			})
			apollo=new ApolloClient({
				networkInterface
			})
		}else{
			
		}		
	}
	
	
    render(){
        let {theme}=this.props
        return (
			<ReduxProvider store={this.store}>
				<ApolloProvider client={this.apollo} store={this.store}>
					<UI muiTheme={theme}>
						<Authentication/>
					 </UI>
				</ApolloProvider>
			</ReduxProvider>
        )
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
}

const Lesson0=()=>(
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
)

export default compose(
	branch(({appId})=>!appId,renderComponent(({theme})=>
		<UI muiTheme={theme}>
			<Lesson0/>
		</UI>
	)),
	
	connect(state=>state[DOMAIN]),
	
	branch(({tutorialized,tutorial=[]})=>!tutorialized&&tutorial.length,
		renderComponent(({tutorial,theme,dispatch})=>
			<UI muiTheme={theme}>
				<Tutorial slides={tutorial} onEnd={e=>dispatch(ACTION.TUTORIALIZED)}/>
			</UI>
	)),
	
	branch(({user})=>!user,renderComponent(({dispatch})=>
		<UI muiTheme={theme}>
			<Authentication onSuccess={user=>dispatch(ACTION.LOGIN(user))}/>
		</UI>
	)),
	
	branch(({user})=>user&&!user.sessionToken,renderComponent(({dispatch})=>
		<UI muiTheme={theme}>
			<Authentication contact={user.phone||user.email} 
				onSuccess={user=>dispatch(ACTION.LOGIN(user))}/>
		</UI>
	))
)(QiliApp)
