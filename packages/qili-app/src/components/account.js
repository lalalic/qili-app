import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {compose,getContext,withProps,mapProps,setPropTypes} from "recompose"
import {graphql, withMutation, withFragment, withQuery} from "../tools/recompose"

import {Avatar,List, ListItem, Divider} from "material-ui"
import {Route, IndexRoute} from "react-router"

import IconRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconSetting from 'material-ui/svg-icons/action/settings'
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

import CheckUpdate from "./check-update"
import Photo from "./photo"
import Setting from "./setting"
import Profile from "./user-profile"

const Account=compose(
	setPropTypes({
		toSetting: PropTypes.func.isRequired,
		toProfile: PropTypes.func.isRequired
	}),
	withFragment(graphql`
		fragment account_user on User{
			id
			photo
			username
		}
	`),
	withMutation(({user}, data)=>{
		return {
			patch4:user.id,
			mutation: graphql`
				mutation account_update_Mutation($photo:URL){
					user_update(photo:$photo)
				}
			`
		}
	})
)(({user:{photo, username}, children,toSetting,toProfile,mutate})=>{
	return (
		<Fragment>
			<List>
				<ListItem primaryText={username}
					leftIcon={
						<Photo src={photo}
							autoUpload={{path:"photo.jpg"}}
							onPhoto={photo=>mutate({photo})}/>
					}
					rightIcon={<IconRightArrow/>}
					onClick={toProfile}
					/>

				<Divider inset={true}/>

				{children}

				<Divider inset={true}/>

				<ListItem primaryText={<CheckUpdate>设置</CheckUpdate>}
					leftIcon={<IconSetting/>}
					rightIcon={<IconRightArrow/>}
					onClick={toSetting}
					/>
			</List>
		</Fragment>
	)
})


Account.routes=({
		path="my",
		accountQL=graphql`
			query account_me_Query{
				user:me{
					...my_user
				}
			}
		`,
		profileQL=graphql`
			query account_userProfile_Query{
				user:me{
					...userProfile_user
				}
			}
			`,
		account,
		setting,
		profile,
	}={})=>(
	<Route path={path}>
		<IndexRoute  component={account ||
				compose(
					withQuery({
						query: accountQL
					}),
					getContext({router:PropTypes.object}),
					mapProps(({router,...others})=>({
						...others,
						toSetting: ()=>router.push(`/${path}/setting`),
						toProfile: ()=>router.push(`/${path}/profile`)
					})),
				)(Account)
			}/>

		<Route path="setting" component={setting||Setting}/>

		<Route path="profile" component={profile||
				compose(
					withQuery({
						query:profileQL
					}),
				)(Profile)
			}/>
	</Route>
)

export default Account
