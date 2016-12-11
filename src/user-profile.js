import React, {Component, PropTypes} from "react"
import {Avatar, List, ListItem, Divider} from "material-ui"
import {connect} from "react-redux"

import Photo from "./components/photo"
import User from "./db/user"
import QiliApp from "./qiliApp"
import {compact} from "."

export const DOMAIN="profile"
export const ACTION={
	UPDATE_PHOTO:url=>(dispatch,getState)=>{
		const user=getState().qiliApp.user
		user.photo=url
		User.upsert(user).then(updated=>dispatch(QiliApp.ACTION.USER_CHANGED(updated)))
	}
}

export const REDUCER=(state={}, {type, payload})=>{
	return state
}

export const Profile=({name,nick,gender,location,photo,signature, valueStyle={color:"lightgray"}})=>(
	<List style={{padding:5}}>
		<ListItem primaryText="头像"
			rightAvatar={
				<Photo src={photo}
					onPhoto={url=>dispatch(ACTION.UPDATE_PHOTO(url))}
					iconRatio={2/3} width={100} height={100}/>
				}
			style={{height:100}}/>

		<Divider/>
		<ListItem primaryText="姓名" rightIcon={<span style={valueStyle}>{name}</span>}/>

		<Divider/>
		<ListItem primaryText="性别" rightIcon={<span style={valueStyle}>{gender||"男"}</span>}/>

		<Divider/>
		<ListItem primaryText="地址" rightIcon={<span style={valueStyle}>{location}</span>}/>

		<Divider/>
		<ListItem primaryText="个性签名" rightIcon={<span style={valueStyle}>{signature}</span>}/>
	</List>
)

export default Object.assign(connect(state=>compact(state.qiliApp.user,"name","nick","gender","location","photo","signature"))(Profile),{DOMAIN, ACTION, REDUCER})
