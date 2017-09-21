require('../style/index.less')
import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton, AppBar, IconButton} from 'material-ui'
import {combineReducers} from "redux"
import {connect} from "react-redux"
import {graphql} from "react-relay"

import {compose, withProps, withContext, getContext, setStatic} from "recompose"
import withQuery from "tools/withQuery"
import Logo from 'icons/logo'
import QiliApp, {DOMAIN,REDUCER} from 'qili'

import Profile from "ui/user-profile"
import Dashboard from "ui/dashboard"
import My from "ui/my"
import Setting from "ui/setting"
import App from "ui/app"

export const ACTION={
	CURRENT_APP: payload=>({
		type:`@@${DOMAIN}/CURRENT_APP`,
		payload,
	}),
	NEXT_APP: payload=>({
		type:`@@${DOMAIN}/CURRENT_APP`,
		payload,
	}),	
}

const reducer=(state={},{type,payload})=>{
	state=REDUCER(state, {type,payload})
	switch(type){
	case `@@${DOMAIN}/CURRENT_APP`:
		return {...state, current:payload}
	case `@@${DOMAIN}/NEXT_APP`:
		let current=state.current
		let next=current
		return {...state, current:next}	
	}

	return state
}

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJyb290IiwidXNlcm5hbWUiOiJyb290MSIsImlhdCI6MTUwNTkyMjkwMiwiZXhwIjoxNTM3NDgwNTAyfQ.g8kZP6BCiL7eoZaTCawxpHabp9objwxxTlVjGE8bg28"
const QiliAdmin=compose(
	withProps(()=>({
		project: require("../package.json"),
		appId:"qiliAdmin",
		service: "http://localhost:8080/1/graphql",
		user:{token},
		reducers:{
			[DOMAIN]:reducer
		},
		prefetch: {
			query:graphql`
				query main_prefetch_Query{
					me{
						name
						apps{
							id
							name
							uname
							apiKey
						}
					}
				}
			`,
			onSuccess(response,dispatch){
				debugger
				const {me:{apps}}=response
				if(apps.length>0){
					dispatch(ACTION.CURRENT_APP(apps[0].id))
				}
			}
		}
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
			
			<Route path="app" contextual={false}>
				<IndexRoute component={App.Creator}/>
				<Route path=":id" component={App}/>
			</Route>
			
		</Route>
	</Router>
)

/**



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
