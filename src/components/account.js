import React, {Component, PropTypes} from "react"
import {Avatar,List, ListItem, Divider} from "material-ui"
import {Link} from "react-router"
import {connect} from "react-redux"

import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import SettingIcon from 'material-ui/svg-icons/action/settings'
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

import Photo from "./photo"
import User from "../db/user"
import {ACTION} from "../user-profile"
import {compact} from ".."


export const Account=({name, photo, username, children},{router})=>{
	return (
		<div>
			<List>
				<ListItem primaryText={name||username}
					leftAvatar={
						<Photo src={photo} iconRatio={2/3} width={40} height={40}
							onPhoto={url=>dispatch(ACTION.UPDATE_PHOTO(url))}/>
					}
					rightIcon={<RightArrow/>}
					onClick={e=>router.push("/my/profile")}
					/>

				<Divider inset={true}/>

				{children}

				<Divider inset={true}/>

				<ListItem primaryText="设置"
					leftIcon={<SettingIcon/>}
					rightIcon={<RightArrow/>}
					onClick={e=>router.push("/my/setting")}
					/>
			</List>
		</div>
	)
}

Account.contextTypes={
	router: PropTypes.object
}

export default connect(state=>compact(state.qiliApp.user,"name","username","photo"))(Account)
