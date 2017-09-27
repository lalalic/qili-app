require('../style/index.less')
import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton, AppBar, IconButton} from 'material-ui'
import {combineReducers} from "redux"
import {connect} from "react-redux"

import {compose, withProps, withContext, getContext, setStatic, branch, createEagerFactory,renderNothing} from "recompose"
import {graphql, withFragment, withQuery, withInit, withMutation, withPagination} from "tools/recompose"

import Logo from 'icons/logo'
import QiliApp, * as qili from 'qili'

import Profile from "ui/user-profile"
import Dashboard from "ui/dashboard"
import My from "ui/my"
import Setting from "ui/setting"
import App from "ui/app"
import Comment from "components/comment"
import Cloud from "ui/cloud"

const {DOMAIN,REDUCER}=qili

export const ACTION={
	CURRENT_APP: payload=>({
		type:`@@${DOMAIN}/CURRENT_APP`,
		payload,
	})
}

const reducer=(state={},{type,payload})=>{
	state=REDUCER(state, {type,payload})
	switch(type){
	case `@@${DOMAIN}/CURRENT_APP`:
		return {...state, current:payload}
	}
	return state
}

const QiliAdmin=compose(
	withProps(()=>({
		project: require("../package.json"),
		appId:"qiliAdmin",
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
						cloudCode
						apiKey
					}
				}
			}
		`,
		onSuccess(response,dispatch){
			const {me:{apps, token,name}}=response
			dispatch(qili.ACTION.CURRENT_USER({name,token}))
			if(apps && apps.length>0){
				dispatch(ACTION.CURRENT_APP(apps[0].id))
			}
		}
	}),
)(QiliApp)

const Current=compose(
	connect(({qili:{current}})=>({id:current})),
	branch(({id})=>!id, renderNothing),
	getContext({client: PropTypes.object}),
	withProps(({dispatch, client,id})=>({
		name: client.get(id).name,
		switchApp(){
			let apps=client.getAll("App")
			let i=apps.findIndex(a=>a.id==id)
			dispatch(ACTION.CURRENT_APP(apps.length ? apps[(i+1)%apps.length].id : null))
		}
	})),
)(({name,switchApp})=>(
	<FloatingActionButton className="sticky top right" mini={true}
		style={{fontSize:"xx-small"}}
		onClick={switchApp}>
		{name}
	</FloatingActionButton>
))

const withCurrent=()=>BaseComponent=>{
	const factory=createEagerFactory(BaseComponent)
	const WithCurrent=props=>(<div><Current/>{factory(props)}</div>)
	return WithCurrent
}

const router=(
	<Router history={hashHistory}>
		<Route path="/">
			<IndexRoute component={withCurrent()(Dashboard)}/>

			<Route path="my">
				<IndexRoute  component={
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

				<Route path="setting" component={Setting}/>

				<Route path="profile" component={
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

			<Route path="app">
				<IndexRoute component={App.Creator}/>
				<Route path=":id" component={
						compose(
							withQuery(({params:{id}})=>({
								variables:{
									id
								},
								query: graphql`
									query main_app_update_Query($id:ObjectID!){
										me{
											app(_id:$id){
												...app
											}
										}
									}
								`,
							})),
							connect(({qili:{current}})=>({current})),
							getContext({client:PropTypes.object}),
							withProps(({me,client,current,dispatch})=>({
								data:me.app,
								switchApp(){
									let apps=client.getAll("App")
									dispatch(ACTION.CURRENT_APP(apps.length ? apps[0].id : null))
								},
								client:undefined,
								current:undefined,
							})),
						)(App)
					}/>
			</Route>

			<Route path="comment/:id" component={compose(
				withPagination(({params:{id}})=>({
					variables:{id},
					query: graphql`
				        query main_comment_Query($id:ObjectID!, $count: Int=10, $cursor: String=null){
				            me{
								id
				                app(_id:$id){
				                    ...comment
				                }
				            }
				        }
				    `,
				})),
				withProps(({me, params:{id}})=>({
					data:me && me.app,
					currentUserId: me && me.id && me.id.split(":").pop(),
					id,
				})),
				withCurrent(),
			)(Comment)}/>
			
			<Route path="cloud" component={compose(
				getContext({client:PropTypes.object}),
				connect(({qili:{current}}, {client})=>({
					id:current,
					cloudCode: client.get(current).cloudCode
				})),
				withCurrent(),
			)(Cloud)}/>
			
		</Route>
	</Router>
)

/**
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
