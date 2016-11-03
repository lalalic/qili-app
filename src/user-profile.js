import React, {Component, PropTypes} from "react"
import {Avatar, List, ListItem, Divider} from "material-ui"
import {connect} from "react-redux"

import Photo from "./components/photo"
import User from "./db/user"

export const DOMAIN="profile"
export const ACTION={
	UPDATE_PHOTO:url=>dispatch=>{
		const user=User.current
		user.photo=url
		return User.upsert(user)
	}
}

export const REDUCER={
    [DOMAIN]: (state={}, {type, payload})=>{
		return state
    }
}

export const Profile=({user,dispatch},{router})=>(
	<List>
		<ListItem primaryText="头像"
			rightAvatar={
				<Photo src={user.photo}
					onPhoto={url=>dispatch(ACTION.UPDATE_PHOTO(url))}
					iconRatio={2/3} width={100} height={100}/>
				}
			style={{height:100}}/>

		<Divider/>
		<ListItem primaryText="帐号" rightIcon={<span>{user.name}</span>}/>

		<Divider/>
		<ListItem primaryText="昵称" rightIcon={<span>{user.nick}</span>}/>

		<Divider/>
		<ListItem primaryText="性别" rightIcon={<span>{user.gender||"男"}</span>}/>

		<Divider/>
		<ListItem primaryText="地址" rightIcon={<span>{user.location}</span>}/>

		<Divider/>
		<ListItem primaryText="个性签名" rightIcon={<span>{user.sign}</span>}/>
	</List>
)

Profile.contextTypes={router:PropTypes.object}


export default Object.assign(Profile,{DOMAIN, ACTION, REDUCER})
