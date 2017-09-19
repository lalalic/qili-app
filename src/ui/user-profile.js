import React, {Component, PropTypes} from "react"
import {compose,withProps,getContext,pure} from "recompose"
import {connect} from "react-redux"
import {graphql, QueryRenderer, commitMutation} from "react-relay"
import withQuery from "tools/withQuery"
import withMutation from "tools/withMutation"
import withFragment from "tools/withFragment"

import CommandBar from "components/command-bar"

import {InfoForm, Field} from "components/info-form"

import QuitIcon from "material-ui/svg-icons/file/cloud-off"


const Test=compose(
	withFragment(graphql`
		fragment userProfile_test on User{
			phone
		}
	`),
	withProps(({test})=>test),
	
)(({phone})=><div>hello: {phone}</div>)


export const Profile=({
	username,birthday,gender,location,photo,signature,
	children,
	valueStyle={color:"lightgray"},
	mutate: update,
	logout,
	})=>(
	<div>
		<InfoForm style={{padding:5}}>
			<Test/>
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
				{action:"Logout", label:"退出账号", icon:<QuitIcon/>, onSelect:e=>logout()}
				]}
			/>
	</div>
)


export default compose(
<<<<<<< HEAD
	getContext({
		environment:PropTypes.object
	}),

	withProps(({environment})=>({
		update(data){
			return new Promise((resolve, reject)=>
				commitMutation(environment,{
					mutation: graphql`
						mutation userProfile_update_Mutation($data: user_updateInput!){
							user_update(data:$data){
								_id
								username
								birthday
								gender
								location
								photo
								signature
							}
						}
					`,
					variables:{data},
					onError: reject,
					onCompleted({user_update}, error){
						if(error){
							reject(error)
						}else{
							resolve(user_update)
						}
					},
				})
			)
		}
	})),
	setStatic("contextTypes", {
		environment:PropTypes.object
	}),
)
((others, {environment})=>(
	<QueryRenderer
		environment={environment}
		query={graphql`
=======
	withQuery({
		query:graphql`
>>>>>>> decaf7067ea517885216f2dafff51f9df009e4ed
			query userProfile_me_Query{
				me{
					id
					username
					birthday
					gender
					location
					photo
					signature
					...userProfile_test
				}
<<<<<<< HEAD
			}`
		}
		render={
			function({error, props}){
				if(props){
					return <Profile {...others} {...props.me}/>
				}else if(error){
					return <div>{error.toString()}</div>
				}else
					return <div>loading</div>
=======
>>>>>>> decaf7067ea517885216f2dafff51f9df009e4ed
			}
			`,
	}),
	withProps(({birthday})=>{
		if(birthday){
			return {birthday:new Date(birthday)}
		}
<<<<<<< HEAD
		/>
))
=======
	}),
	withMutation(({id}, data)=>{
		return {
			patch4:id,
			dateFields:["birthday"],
			mutation: graphql`
				mutation userProfile_update_Mutation($data: user_updateInput!){
					user_update(data:$data)
				}
			`
		}
	}),		
	pure,
)(Profile)
>>>>>>> decaf7067ea517885216f2dafff51f9df009e4ed
