require('../style/index.less')
import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton, AppBar, IconButton} from 'material-ui'
import {combineReducers} from "redux"
import {connect} from "react-redux"

import {compose, withProps, withContext, getContext, setStatic} from "recompose"
import {graphql, withFragment, withQuery, withInit, withMutation} from "tools/recompose"

import Logo from 'icons/logo'
import QiliApp, * as qili from 'qili'

import Profile from "ui/user-profile"
import Dashboard from "ui/dashboard"
import My from "ui/my"
import Setting from "ui/setting"
import App from "ui/app"

const {DOMAIN,REDUCER}=qili

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
		}
	})),
	withInit({
		query:graphql`
			query main_prefetch_Query{
				me{
					name
					token
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
			const {me:{apps, token,name}}=response
			dispatch(qili.ACTION.CURRENT_USER({name,token}))
			if(apps.length>0){
				dispatch(ACTION.CURRENT_APP(apps[0].id))
			}
		}
	}),
)(QiliApp)

const router=(
	<Router history={hashHistory}>
		<Route path="/">
			<IndexRoute component={Dashboard}/>

			<Route path="my">
				<IndexRoute  contextual={false} component={
						compose(
							withQuery({
								spread:false,
								query: graphql`
									query main_my_apps_Query{
										me{
											...my
										}
									}
								`
							}),
							withProps(({me})=>({data:me})),
						)(My)
					}/>
					
				<Route path="setting" component={Setting} />
				
				<Route path="profile"  contextual={false} component={
						compose(
							withQuery({
								spread:false,
								query:graphql`
									query main_userProfile_me_Query{
										me{
											...userProfile
										}
									}
									`,
							}),
							withProps(({me})=>({data:me})),
						)(Profile)
					}/>
			</Route>
			
			<Route path="app" contextual={false}>
				<IndexRoute component={App.Creator}/>
				<Route path=":id" component={
						compose(
							withQuery(({params:{id}})=>({
								variables:{
									id
								},
								query: graphql`
									query main_app_update_Query($id:ID!){
										node(id:$id){
											...app
										}
									}
								`,
							})),
							withProps(({node})=>({data:node})),
						)(App)
					}/>
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
