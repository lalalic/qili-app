import React, {Component} from "react"
import {Avatar,List, ListItem, Divider} from "material-ui"

import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import SettingIcon from 'material-ui/svg-icons/action/settings'
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

import Photo from "./photo"
import User from "../db/user"


export const Account=({children},{router})=>{
	let user=User.current,avatar
	if(user.photo)
		avatar=(<Avatar src={user.photo}/>)
	else {
		avatar=(<Photo iconRatio={2/3} width={40} height={40}
				onPhoto={url=>{
					user.photo=url
					User.upsert(user)
				}}
				/>)
	}

	return (
		<div>
			<List>
				<ListItem primaryText={user.name||user.username}
					leftAvatar={avatar}
					rightIcon={<RightArrow/>} 
					onClick={e=>router.push('my/profile')}	
					/>

				<Divider inset={true}/>

				{children}
				
				<Divider inset={true}/>

				<ListItem primaryText="设置"
					leftIcon={<SettingIcon/>}
					rightIcon={<RightArrow/>}
					onClick={e=>router.push('my/setting')}
					/>
			</List>
		</div>
	)
}

Account.contextTypes={
	router:React.PropTypes.object
}

export default Account

