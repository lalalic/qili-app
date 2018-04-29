import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose,getContext,withProps,setPropTypes} from "recompose"
import {graphql, withMutation} from "../tools/recompose"

import {Avatar,List, ListItem, Divider} from "material-ui"

import IconRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconSetting from 'material-ui/svg-icons/action/settings'
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

import CheckUpdate from "./check-update"
import Photo from "./photo"


export const Account=({id, photo, username, children,toSetting,toProfile,mutate})=>{
	return (
		<div>
			<List>
				<ListItem primaryText={username}
					leftIcon={
						<Photo src={photo}
							autoUpload={{id,key:"photo.jpg"}}
							onPhoto={photo=>mutate({photo})}/>
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
	setPropTypes({
		id: PropTypes.string.isRequired,
		photo: PropTypes.string,
		username: PropTypes.string,
		toSetting: PropTypes.func.isRequired,
		toProfile: PropTypes.func.isRequired
	}),
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
