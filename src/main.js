require('../style/index.less')
import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton, AppBar, IconButton} from 'material-ui'
import {combineReducers} from "redux"
import {connect} from "react-redux"

import {compose, withProps, withContext, getContext, setStatic} from "recompose"
import Logo from 'icons/logo'
import {QiliApp, compact} from '.'


import Profile from "ui/user-profile"
import Dashboard from "ui/dashboard"
import My from "ui/my"
import Setting from "ui/setting"


const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJyb290IiwidXNlcm5hbWUiOiJyb290MSIsImlhdCI6MTUwNTkyMjkwMiwiZXhwIjoxNTM3NDgwNTAyfQ.g8kZP6BCiL7eoZaTCawxpHabp9objwxxTlVjGE8bg28"
const QiliAdmin=compose(
	withProps(props=>({
		project: require("../package.json"),
		appId:"qiliAdmin",
		service: "http://localhost:8080/1/graphql",
		user:{token},
	})),
)(QiliApp)

const router=(
	<Router history={hashHistory}>
		<Route path="/">
			<IndexRoute component={Dashboard}/>

			<Route path="my">
				<IndexRoute component={My} contextual={false}/>
				<Route path="setting" component={Setting} />
				<Route path="profile" component={Profile} contextual={false}/>
			</Route>
		</Route>
	</Router>
)

/**

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



* */

QiliApp.render(<QiliAdmin>{router}</QiliAdmin>)
