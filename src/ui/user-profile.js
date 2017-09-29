import React, {Component, PropTypes} from "react"
import {compose,withProps,getContext,pure} from "recompose"
import {connect} from "react-redux"
import {graphql, withFragment, withMutation, setPhoto} from "tools/recompose"

import CommandBar from "components/command-bar"
import Photo from "components/photo"
import {InfoForm, Field} from "components/info-form"
import {TextField} from "material-ui"
import {ACTION} from "qili"

import IconQuit from "material-ui/svg-icons/file/cloud-off"

export const Profile=({
	username,birthday,gender,location,photo,signature,
	children,
	valueStyle={color:"lightgray"},
	mutate: update,
	logout,
	})=>(
	<div>
		<InfoForm style={{padding:5}}>
			<Field primaryText="头像"
				rightAvatar={
					<Photo src={photo}
						onPhoto={url=>setPhoto({url})}
						iconRatio={2/3} width={100} height={100}/>
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

			<Field primaryText="生日" value={birthday}
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

		<CommandBar  className="footbar"
			items={[
				{action:"Back"},
				{action:"Logout", label:"退出账号", icon:<IconQuit/>, onSelect:logout}
				]}
			/>
	</div>
)


export default compose(
	withMutation(({id}, data)=>{
		return {
			patch4:id,
			mutation: graphql`
				mutation userProfile_update_Mutation($username:String,$birthday:Date,$gender:Gender,$location:String,$signature:String){
					user_update(username:$username,birthday:$birthday,gender:$gender,location:$location,signature:$signature)
				}
			`
		}
	}),
	setPhoto(),
	connect(null,(dispatch)=>({
		logout:()=>dispatch(ACTION.LOGOUT),
	})),
	pure,
)(Profile)
