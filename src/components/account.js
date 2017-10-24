import React, {Component, PropTypes} from "react"
import {compose,getContext,withProps} from "recompose"
import {graphql, withMutation} from "tools/recompose"

import {Avatar,List, ListItem, Divider} from "material-ui"
import {Link} from "react-router"


import IconRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconSetting from 'material-ui/svg-icons/action/settings'
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

import CheckUpdate from "components/check-update"
import Photo from "components/photo"


export const Account=({id, photo, username, children,toSetting,toProfile,mutate})=>{
	return (
		<div>
			<List>
				<ListItem primaryText={username}
					leftAvatar={
						<Photo src={photo}
							autoUpload={{id,key:"photo.jpg"}}
							iconRatio={2/3} width={40} height={40}
							onPhoto={url=>mutate({photo})}/>
					}
					rightIcon={<IconRightArrow/>}
					onClick={toProfile}
					/>

				<Divider inset={true}/>

				{children}

				<Divider inset={true}/>

				<ListItem primaryText={<CheckUpdate>设置</CheckUpdate>}
					leftIcon={<IconSetting/>}
					rightIcon={<IconRightArrow/>}
					onClick={toSetting}
					/>
			</List>
		</div>
	)
}

export default compose(
	withMutation(({id}, data)=>{
		return {
			patch4:id,
			mutation: graphql`
				mutation account_update_Mutation($photo:String){
					user_update(photo:$photo)
				}
			`
		}
	})
)(Account)
