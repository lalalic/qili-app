import React, {Component, PropTypes} from "react"
import {compose,withProps} from "recompose"
import {connect} from "react-redux"
import {graphql, gql} from "react-apollo"

import CommandBar from "components/command-bar"

import {InfoForm, Field} from "components/info-form"

import QuitIcon from "material-ui/svg-icons/file/cloud-off"

export const Profile=({_id, username,birthday,gender,location,photo,signature,
	children, valueStyle={color:"lightgray"},
	update,
	dispatch
	})=>(
	<div>
		<InfoForm style={{padding:5}}>

			<Field primaryText="昵称"
				value={username}
				type="input"
				onEdit={username=>update({username})}
				/>

			<Field primaryText="性别"
				value={gender||"男"}
				type="single"
				options={["男","女"]}
				onEdit={gender=>setGender($(gender))}/>

			<Field primaryText="地址"
				value={location}
				type="input"
				onEdit={location=>setLocation($(location))}
				/>

			<Field primaryText="生日" value={birthday}
				type="date"
				onEdit={birthday=>setBirthday($(birthday))}/>

			<Field primaryText="签名"
				value={signature}
				type="input"
				hintText="个性签名表达你的个性"
				onEdit={signature=>setSignature($(signature))}
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

const Query=gql`
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
	}`
export default compose(
	graphql(Query),

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
		}
		`,{
			props({ownProps:{__typename, _id}, mutate}){
				return {
					update(variables){
						mutate({
							variables,
							optimisticResponse:{
								user_update:{
									__typename,
									_id,
									...variables,
									updatedAt: new Date()
								}
							}
						})
					}
				}
			}
		}),

	connect()
)(Profile)
