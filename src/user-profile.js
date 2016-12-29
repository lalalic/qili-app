import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"

import Photo from "./components/photo"
import CommandBar from "./components/command-bar"
import User from "./db/user"
import QiliApp from "./qiliApp"
import {compact} from "."

import {InfoForm, Field} from "./components/info-form"
import TextFieldx from "./components/text-field"

import QuitIcon from "material-ui/svg-icons/file/cloud-off"

export const DOMAIN="profile"
export const ACTION={
	UPDATE:(key,value)=>(dispatch, getState)=>{
		const user=getState().qiliApp.user
		user[key]=value
		User.upsert(user).then(updated=>dispatch(QiliApp.ACTION.USER_CHANGED(updated)))
	}
}

export const REDUCER=(state={}, {type, payload})=>{
	return state
}

export const Profile=({username,nick,birthday,gender,location,photo,signature, dispatch, valueStyle={color:"lightgray"}})=>(
	<div>
		<InfoForm style={{padding:5}}>
			<Field primaryText="头像"
				rightAvatar={
					<Photo src={photo}
						onPhoto={url=>dispatch(ACTION.UPDATE("photo",url))}
						iconRatio={2/3} width={100} height={100}/>
					}
				style={{height:100}}/>

			<Field primaryText="账号"
				value={username}
				/>

			<Field primaryText="昵称"
				value={nick}
				type="input"
				onEdit={value=>dispatch(ACTION.UPDATE("nick",value))}
				hintText="好名字可以让你的朋友更容易记住你"
				/>

			<Field primaryText="性别"
				value={gender||"男"}
				type="single"
				options={["男","女"]}
				onEdit={value=>dispatch(ACTION.UPDATE("gender",value))}/>

			<Field primaryText="地址"
				value={location}
				type="input"
				onEdit={value=>dispatch(ACTION.UPDATE("location",value))}
				/>

			<Field primaryText="生日" value={birthday}
				type="date"
				onEdit={value=>dispatch(ACTION.UPDATE("birthday",value))}/>

			<Field primaryText="签名"
				value={signature}
				type="input"
				hintText="个性签名表达你的个性"
				onEdit={value=>dispatch(ACTION.UPDATE("signature",value))}
				/>
		</InfoForm>
		
		<CommandBar  className="footbar"
			items={[
				{action:"Back"},
				{action:"Logout", icon:<QuitIcon/>, onSelect:e=>User.logout()}
				]}
			/>
	</div>
)


export default Object.assign(connect(state=>compact(state.qiliApp.user,"username","nick","birthday","gender","location","photo","signature"))(Profile),{DOMAIN, ACTION, REDUCER})
