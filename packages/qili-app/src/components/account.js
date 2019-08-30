import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {compose,getContext,mapProps,setPropTypes, setDisplayName} from "recompose"
import {graphql, withMutation, withFragment, withQuery} from "../graphql"

import {List, ListItem} from "material-ui/List"
import Divider from "material-ui/Divider"
import {Route, IndexRoute} from "react-router"

import IconRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconSetting from 'material-ui/svg-icons/action/settings'

import CheckUpdate from "./check-update"
import Photo from "./photo"
import Setting from "./setting"
import Profile from "./profile"
import ql from "../sharedQL/qili"

const Account=compose(
	setDisplayName("Account"),
	setPropTypes({
		toSetting: PropTypes.func.isRequired,
		toProfile: PropTypes.func.isRequired
	}),
	withFragment({
		user:ql.account_user
	}),
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
				<ListItem primaryText={username||<span style={{color:"lightgray"}}>Me</span>}
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
		accountQL,
		profileQL,
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
					mapProps(({router,data, ...others})=>({
						...others,
						user:data.user,
						toSetting: ()=>router.push(`/${path}/setting`),
						toProfile: ()=>router.push(`/${path}/profile`),
					})),
				)(Account)
			}/>

		<Route path="setting" component={setting||Setting}/>

		<Route path="profile" component={profile||
				compose(
					withQuery({
						query:profileQL
					}),
					mapProps(({data, ...others})=>({user:data.user, ...others})),
				)(Profile)
			}/>
	</Route>
)

export default Account
