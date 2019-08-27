import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {compose,withProps,getContext,pure} from "recompose"
import {connect} from "react-redux"
import {graphql, withFragment, withMutation} from "../graphql"

import CommandBar from "../components/command-bar"
import Photo from "../components/photo"
import InfoForm from "../components/info-form"
import {TextField} from "material-ui"
import {ACTION} from "../state"
import ql from "../sharedQL/qili"

import IconQuit from "material-ui/svg-icons/file/cloud-off"
const {Field}=InfoForm

export const Profile=({
	user:{username,birthday,gender,location,photo,signature},
	children,
	valueStyle={color:"lightgray"},
	mutate: update,
	logout,
	})=>(
	<Fragment>
		<InfoForm style={{padding:5,flex:"1 1 100%", overflowY:"scroll"}}>
			<Field primaryText="头像"
				rightAvatar={
					<Photo src={photo} size={100}
						autoUpload={{path:'photo.jpg'}}
						onPhoto={photo=>update({photo})}/>
					}
				style={{height:100}}/>

			<Field primaryText="昵称"
				value={username}
				type="input"
				onEdit={username=>update({username})}
				/>

			<Field primaryText="性别"
				value={gender||"boy"}
				type="single"
				options={[{label:"男",value:"boy"},{label:"女",value:"girl"}]}
				onEdit={gender=>update({gender})}/>

			<Field primaryText="地址"
				value={location}
				type="input"
				onEdit={location=>update({location})}
				/>

			<Field primaryText="生日" value={new Date(birthday)}
				type="date"
				onEdit={birthday=>update({birthday})}/>

			<Field primaryText="签名"
				value={signature}
				type="input"
				hintText="个性签名表达你的个性"
				onEdit={signature=>update({signature})}
				/>

			{children}

		</InfoForm>

		<div style={{flex:"none"}}>
			<CommandBar
				items={[
					{action:"Back"},
					{action:"Logout", label:"退出账号", icon:<IconQuit/>, onSelect:logout}
					]}
				/>
		</div>
	</Fragment>
)


export default compose(
	withFragment({
		user:ql.profile_user
	}),
	withMutation(({user}, data)=>{
		return {
			patch4:user.id,
			mutation: graphql`
				mutation profile_update_Mutation($photo:URL,$username:String,$birthday:Date,$gender:Gender,$location:String,$signature:String){
					user_update(photo:$photo,username:$username,birthday:$birthday,gender:$gender,location:$location,signature:$signature)
				}
			`
		}
	}),
	connect(null,(dispatch)=>({
		logout:()=>dispatch(ACTION.LOGOUT),
	})),
	pure,
)(Profile)
