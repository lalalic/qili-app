import React, {Component, PropTypes} from "react"
import {compose,withProps} from "recompose"
import {connect} from "react-redux"
import {graphql, gql} from "react-apollo"

import CommandBar from "components/command-bar"

import {InfoForm, Field} from "components/info-form"

import QuitIcon from "material-ui/svg-icons/file/cloud-off"

const Test=compose(
	graphql(gql`
		query me1{
			me{
				phone
			}
		}
	`,{
		props:({data:{me}})=>me
	})
)(({phone})=><span>{phone}</span>)

export const Profile=({
	username,birthday,gender,location,photo,signature,
	children, valueStyle={color:"lightgray"},
	update,
	dispatch
	})=>(
	<div>
		<Test/>
		<InfoForm style={{padding:5}}>

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
				{action:"Logout", label:"退出账号", icon:<QuitIcon/>, onSelect:e=>dispatch(QiliApp.ACTION.LOGOUT)}
				]}
			/>
	</div>
)

export default compose(
	graphql(gql`
		query me{
			me{
				_id
				username
				birthday
				gender
				location
				photo
				signature
			}
		}`),

	withProps(({data:{me}})=>me),

	graphql(gql`
		mutation user_update($username:String,$birthday:Date,$gender:Gender,$location:String,$signature:String){
			user_update(username:$username,birthday:$birthday,gender:$gender,location:$location,signature:$signature){
				_id
				__typename
				username
				birthday
				gender
				location
				photo
				signature
				updatedAt
			}
		}`,{
			props:({ownProps:{data:{me}}, mutate})=>({
				update(variables){
					mutate({
						variables,
						optimisticResponse:{
							user_update:{
								...me,
								...variables,
								updatedAt: new Date()
							}
						}
					})
				}
			})
		}),

	connect()
)(Profile)
