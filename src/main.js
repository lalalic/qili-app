import React, {Component} from "react"
import PropTypes from "prop-types"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton, AppBar, IconButton} from 'material-ui'
import {combineReducers} from "redux"
import {connect} from "react-redux"

import {compose, withProps, withContext, getContext, setStatic, mapProps,
		branch, createEagerFactory,renderNothing,renderComponent} from "recompose"
import {graphql, withFragment, withQuery, withInit, withMutation, withPagination} from "tools/recompose"

import Logo from 'icons/logo'
import QiliApp, * as qili from 'qili'


import CommandBar from "components/command-bar"
import CheckUpdate from "components/check-update"
import IconHome from "material-ui/svg-icons/action/home"
import IconData from "material-ui/svg-icons/action/dashboard"
import IconCloud from "material-ui/svg-icons/file/cloud"
import IconLog from "material-ui/svg-icons/action/assignment"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconSchema from 'material-ui/svg-icons/editor/insert-link'

import Profile from "ui/user-profile"
import Dashboard from "ui/dashboard"
import My from "ui/my"
import Setting from "ui/setting"
import App from "ui/app"
import Comment from "components/comment"
import Cloud from "ui/cloud"
import Schema from "ui/schema"
import Log from "ui/log"

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
		},
		supportOffline:true,
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
	})
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

const Navigator=()=>(
	<CommandBar  className="footbar"
		items={[
			{link:"/",action:"dashboard",label:"Home", icon:<IconHome/>},
			{link:"/cloud",action:"cloud", label:"Cloud", icon:<IconCloud/>},
			{link:"/log",action:"log", label:"Log", icon:<IconLog/>},
			{link:"/my",action:"my",label:"My", icon:<CheckUpdate><IconAccount/></CheckUpdate>}
			]}
		/>
)

const withNavigator=()=>BaseComponent=>{
	const factory=createEagerFactory(BaseComponent)
	const WithNavigator=props=>(<div>{factory(props)}<Navigator/></div>)
	return WithNavigator
}

const router=(
	<Router history={hashHistory}>
		<Route path="/" component={compose(
				connect(state=>({hasApp:!!state.qili.current})),
				branch(({hasApp})=>!hasApp,renderComponent(compose(
						withProps(({dispatch})=>({
							toApp: id=>dispatch(ACTION.CURRENT_APP(id))
						})),
					)(props=>(
					<div>
						<center style={{height:50, color:"lightgray", margin:20}}>
							start from creating your first App!
						</center>

						<App.Creator {...props} style={{margin:"0px 100px"}}/>
					</div>)))),
			)(({children})=><div>{children}</div>)}>
			<IndexRoute component={compose(withCurrent(),withNavigator())(Dashboard)}/>

			<Route path="my">
				<IndexRoute  component={
						compose(
							withNavigator(),
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
							getContext({router:PropTypes.object}),
							mapProps(({router,...others})=>({
								...others,
								toCreate: ()=>router.push(`/app`),
								toApp:a=>router.push(`/app/${a.id}`),
								toSetting: ()=>router.push('/my/setting'),
								toProfile: ()=>router.push('/my/profile')
							})),

						)(My)
					}/>

				<Route path="setting" component={withNavigator()(Setting)}/>

				<Route path="profile" component={
						compose(
							withQuery({
								query:graphql`
									query main_userProfile_me_Query{
										me{
											id
											username
											birthday
											gender
											location
											photo
											signature
										}
									}
									`,
							}),
							withProps(({me})=>({
								...me,
								birthday: me&&me.birthday ? new Date(me.birthday) : undefined
							})),
						)(Profile)
					}/>
			</Route>

			<Route path="app">
				<IndexRoute component={compose(
					getContext({router:PropTypes.object}),
					mapProps(({router,...others})=>({
						toApp: id=>router.replace(`/app/${id}`),
						...others
					})),
				)(App.Creator)}/>

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
							getContext({
								client:PropTypes.object,
								router:PropTypes.object,
							}),
							withProps(({me,client,current,dispatch,router,params:{id}})=>({
								data:me.app,
								switchApp(){
									let apps=client.getAll("App")
									dispatch(ACTION.CURRENT_APP(apps.length ? apps[0].id : null))
								},
								client:undefined,
								current:undefined,
								toComment: ()=>router.push(`/comment/${id}`),
							})),
						)(App)
					}/>

			</Route>

			<Route path="comment/:id" component={compose(
				withCurrent(),
				withPagination(({params:{id:parent}})=>({
					variables:{parent},
					query: graphql`
				        query main_comment_Query($parent:ObjectID!, $count: Int=10, $cursor: JSON){
				            ...main_appComments
				        }
				    `,
				})),
				withFragment({data:graphql`
					fragment main_appComments on Query{
						comments:app_comments(parent:$parent, last:$count, before: $cursor)@connection(key:"main_app_comments"){
							edges{
								node{
									id
									content
									type
									createdAt
									author{
										id
										name
										photo
									}
									isOwner
								}
							}
							pageInfo{
								hasPreviousPage
								startCursor
							}
						}
					}
				`}),
				withProps(({params:{id:parent}})=>({
					parent,
					connection:"main_app_comments"
				})),

			)(Comment)}/>

			<Route path="cloud" component={compose(
				withCurrent(),
				connect(({qili:{current}})=>({
					id:current
				})),
				withQuery(({id})=>({
					variables:{id},
					query:graphql`
						query main_cloud_Query($id:ObjectID!){
							me{
								app(_id:$id){
									...cloud_app
								}
							}
						}
					`
				})),
				mapProps(({data,...others})=>({
					app:data.me.app,
					...others
				})),

			)(Cloud)}/>

			<Route path="log" component={compose(
				withCurrent(),
				withNavigator(),
				connect(({qili:{current}})=>({
					id:current
				})),
				withPagination(({id,status})=>({
					variables:{id,status},
					query:graphql`
						query main_log_Query($id:ObjectID!,$status:String, $count:Int, $cursor:JSON){
							me{
								app(_id:$id){
									...main_logApp
								}
							}
						}
					`
				})),
				withProps(({data})=>({logApp:data.me.app})),
				withFragment(graphql`
					fragment main_logApp on App{
						logs(status:$status, first:$count, after:$cursor)@connection(key:"main_logs"){
							edges{
								node{
									...log
								}
								cursor
							}
							pageInfo{
								hasPreviousPage
								startCursor
							}
						}
					}
				`),
				mapProps(({logApp,data,relay})=>({
					data:logApp.logs.edges.map(a=>a.node),
					loadMore(ok){
						if(relay.hasMore() && !relay.isLoading()){
							relay.loadMore(10, e=>{
								ok()
								if(e){
									console.error(e)
								}
							})
						}
					},
				})),
			)(Log)}/>

		</Route>
	</Router>
)

QiliApp.render(<QiliAdmin>{router}</QiliAdmin>)
