import React, {Component, PropTypes} from "react"
import {compose,getContext,withProps} from "recompose"
import {graphql, withMutation, withFragment} from "tools/recompose"

import {Avatar,List, ListItem, Divider} from "material-ui"
import {Link} from "react-router"


import IconRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconSetting from 'material-ui/svg-icons/action/settings'
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

import CheckUpdate from "components/check-update"
import Photo from "components/photo"


export const Account=({photo, username, children,router, setPhoto})=>{
	return (
		<div>
			<List>
				<ListItem primaryText={username}
					leftAvatar={
						<Photo src={photo} iconRatio={2/3} width={40} height={40}
							onPhoto={url=>setPhoto({url})}/>
					}
					rightIcon={<IconRightArrow/>}
					onClick={e=>router.push("/my/profile")}
					/>

				<Divider inset={true}/>

				{children}

				<Divider inset={true}/>

				<ListItem primaryText={<CheckUpdate>设置</CheckUpdate>}
					leftIcon={<IconSetting/>}
					rightIcon={<IconRightArrow/>}
					onClick={e=>router.push("/my/setting")}
					/>
			</List>
		</div>
	)
}

export default compose(
	getContext({router: PropTypes.object}),
	withFragment(graphql`
		fragment account on User{
			id
			username
			photo
		}
	`),
	withProps(({data})=>data),
	withMutation(({id},{url})=>({
		name:"setPhoto",
		variables:{
			id,
			url,
		},
		patch4:id,
		mutation:graphql`
			mutation account_setPhoto_Mutation($url:String!, $id:ID!, $field:String="photo"){
				file_link(url:$url, id:$id, field:$field)
			}
		`
	}))
)(Account)
