import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {Router, Route, IndexRoute, browserHistory} from "react-router"
import {FloatingActionButton} from 'material-ui'
import {connect} from "react-redux"

import {compose, withProps, getContext, setStatic, mapProps,
		branch,renderNothing,renderComponent} from "recompose"

import IconHome from "material-ui/svg-icons/action/home"
import IconCloud from "material-ui/svg-icons/file/cloud"
import IconLog from "material-ui/svg-icons/action/assignment"
import IconAccount from 'material-ui/svg-icons/action/account-box'

import {QiliApp, ACTION as qiliACTION,Comment, OfflineUI,CommandBar, CheckUpdate,Setting, Account,Offline} from 'qili-app'

import {withFragment, withQuery,withInit, withPagination} from 'qili-app/graphql'
	
import Dashboard from "./ui/dashboard"
import App from "./ui/app"
import Cloud from "./ui/cloud"
import Log from "./ui/log"
import My from "./ui/my"

import {ACTION, reducer} from "./state"

class QiliAdminOffline extends Offline{
	onSetUser(_id, record, {app,apps}){
		super.onSetUser(_id,record)
		if(app){
			this.onSet(app,{author:_id, id:app})
		}

		if(apps){
			apps.forEach(a=>this.onSet(a, {author:_id, id:a}))
		}
	}

	onSetLog(){

	}
}

const QiliAdmin=compose(
	withProps(()=>({
		project: require("../package.json"),
		appId:"qiliAdmin",
		reducers:{
			console:reducer
		},
		supportOffline: new QiliAdminOffline(
			"qiliAdmin",
			require("../cloud")
				.makeSchema(
					require("../schema.graphql"),
					{
						User:{
							async apps(parent,{},{app,user:{_id}}){
								return await app.findEntity("App",{author:_id})
							},

							async app(_, {_id}, {app,user}){
								return await app.get1Entity("App",{_id, author:user._id})
							}
						},

						App:{
							cloudCode:({cloudCode})=>cloudCode||"/**Not support offline**/",
							schema:()=>"Not support offline"
						}
					}
				)
		),
	})),
	withInit({
		query:graphql`
			query console_prefetch_Query{
				me{
					id
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
		onSuccess(response,dispatch,store){
			const {me:{apps, token,name,id}}=response
			dispatch(qiliACTION.CURRENT_USER({id,name,token}))
			let currentApp=store.getState().console.current
			if(!currentApp && apps && apps.length>0){
				dispatch(ACTION.CURRENT_APP(apps[0].id))
			}
		}
	})
)(QiliApp)

const Current=compose(
	connect(({console:{current}})=>({id:current})),
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
	const WithCurrent=props=>(<Fragment><Current/><BaseComponent {...props}/></Fragment>)
	return WithCurrent
}

const Navigator=()=>(
	<CommandBar
		items={[
			{link:"/",action:"dashboard",label:"Home", icon:<IconHome/>},
			{link:"/cloud",action:"cloud", label:"Cloud", icon:<IconCloud/>},
			{link:"/log",action:"log", label:"Log", icon:<IconLog/>},
			{link:"/my",action:"my",label:"My", icon:<CheckUpdate><IconAccount/></CheckUpdate>}
			]}
		/>
)

const withNavigator=()=>BaseComponent=>{
	const WithNavigator=props=>(
		<Fragment>
			<div style={{flex:"1 1 100%", overflowY:"scroll"}}>
				<BaseComponent {...props}/>
			</div>
			<div style={{flex:"none"}}>
				<Navigator/>
			</div>
		</Fragment>
	)
	return WithNavigator
}

const router=(
	<Router history={browserHistory}>
		<Route path="/" component={compose(
				connect(state=>({hasApp:!!state.console.current})),
				branch(({hasApp})=>!hasApp,renderComponent(compose(
						withProps(({dispatch})=>({
							toApp: id=>dispatch(ACTION.CURRENT_APP(id))
						})),
					)(props=>(
					<Fragment>
						<center style={{height:50, color:"lightgray", margin:20}}>
							start from creating your first App!
						</center>

						<App.Creator {...props} style={{margin:"0px 100px"}}/>
					</Fragment>)))),
			)(({children})=><Fragment>{children}</Fragment>)}>

			<IndexRoute component={compose(
							withCurrent(),
							withNavigator(),
							OfflineUI.notSupport,
							)(Dashboard)}/>

			{Account.routes({
				account:compose(
					withNavigator(),
					withQuery({
						query: graphql`
							query console_my_apps_Query{
								user:me{
									...my_user
									phone
								}
							}
						`
					}),
					getContext({router:PropTypes.object}),
					mapProps(({data, router,...others})=>({
						...others,
						user:data.user,
						toCreate: ()=>router.push(`/app`),
						toApp:a=>router.push(`/app/${a.id}`),
						toSetting: ()=>router.push('/my/setting'),
						toProfile: ()=>router.push('/my/profile')
					})),
				)(My),
				setting:withNavigator()(Setting),
				profileQL: graphql`
					query console_profile_Query{
						user:me{
							...qili_profile_user
						}
					}
				`
			}
		)}

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
									query console_app_update_Query($id:ObjectID!){
										me{
											app(_id:$id){
												...app
											}
										}
									}
								`,
							})),
							connect(({console:{current}})=>({current})),
							getContext({
								client:PropTypes.object,
								router:PropTypes.object,
							}),
							withProps(({data,client,current,dispatch,router,params:{id}})=>({
								app:data.me.app,
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
				        query console_comment_Query($parent:ObjectID!, $count: Int=10, $cursor: JSON){
				            ...console_appComments
				        }
				    `,
				})),
				withFragment(graphql`
					fragment console_appComments on Query{
						comments:app_comments(parent:$parent, last:$count, before: $cursor)@connection(key:"console_app_comments"){
							edges{
								node{
									...qili_comment
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
				withProps(({params:{id:parent}})=>({
					parent,
					connection:"console_app_comments"
				})),

			)(Comment)}/>

			<Route path="cloud" component={compose(
				withCurrent(),
				connect(({console:{current}})=>({
					id:current
				})),
				withQuery(({id})=>({
					variables:{id},
					query:graphql`
						query console_cloud_Query($id:ObjectID!){
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
				OfflineUI.notSupport,
				connect(({console:{current}})=>({
					id:current,
				})),
				withPagination(({id,status})=>({
					variables:{id,status},
					query:graphql`
						query console_log_Query($id:ObjectID!,$status:String, $count:Int=20, $cursor:JSON){
							me{
								app(_id:$id){
									...log_app
								}
							}
						}
					`
				})),
				withProps(({data})=>({data:data.me.app}))
			)(Log)}/>
		</Route>
	</Router>
)

QiliApp.render(<QiliAdmin>{router}</QiliAdmin>)
