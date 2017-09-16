import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {compose} from "recompose"
import {withApollo, graphql, gql} from "react-apollo"

import Photo from "components/photo"
import CommandBar from "components/command-bar"
import * as QiliApp from "qili-app/qili-app"
import {ResetPassword} from "qili-app/account"

import {InfoForm, Field} from "components/info-form"
import TextFieldx from "components/text-field"

import QuitIcon from "material-ui/svg-icons/file/cloud-off"

export const Profile=({name,birthday,gender,location,photo,signature, children, valueStyle={color:"lightgray"},
	setName, setBirthday, setGender, setLocation, setPhoto, setSignature,
	$=a=>({variables:a})
	})=>(
	<div>
		<InfoForm style={{padding:5}}>
			<Field primaryText="头像"
				rightAvatar={
					<Photo src={photo}
						onPhoto={photo=>setPhoto($({photo}))}
						iconRatio={2/3} width={100} height={100}/>
					}
				style={{height:100}}/>

			<Field primaryText="账号"
				value={name}
				type="input"
				onEdit={name=>setName($({name}))}
				/>

			<Field primaryText="密码" hintText="经常改密码更安全" value="...">
				<ResetPassword/>
			</Field>

			<Field primaryText="性别"
				value={gender||"男"}
				type="single"
				options={["男","女"]}
				onEdit={gender=>setGender($({gender}))}/>

			<Field primaryText="地址"
				value={location}
				type="input"
				onEdit={location=>setLocation($({location}))}
				/>

			<Field primaryText="生日" value={birthday}
				type="date"
				onEdit={birthday=>setBirthday($({birthday}))}/>

			<Field primaryText="签名"
				value={signature}
				type="input"
				hintText="个性签名表达你的个性"
				onEdit={signature=>setSignature($({signature}))}
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
		query{
			me{
				username
				birthday
				gender
				location
				photo
				signature
			}
		}`),
	withProps(({data:{me}})=>me),
	..."Name,Gender,Location,Photo,Signature"
		.split(",")
		.map(Key=>graphql(gql`
			mutation set${Key}($v:String){
				user_update(${Key.toLowerCase()}:$v)
			}`,{name:`set${Key}`})),
	graphql(gql`
		mutation setBirthday($v:Date){
			user_update(birthday:$v)
		}
		`,{name:`setBirthday`})
)(Profile)
