import React, {Component} from "react"
import PropTypes from "prop-types"
import {getContext,compose,withProps} from "recompose"
import {graphql, withFragment} from "tools/recompose"

import {List, ListItem} from "material-ui"
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

import Account from "components/account"

export const My=({id, username, photo, apps, toCreate, toApp, toProfile, toSetting})=>(
	<Account {...{id, username, photo,toProfile,toSetting}} >
		<ListItem
			primaryText="Create QiLi app"
			initiallyOpen={true}
			autoGenerateNestedIndicator={false}
			onTouchTap={toCreate}
			leftIcon={<IconAdd/>}
			nestedItems={
				apps.map(a=>(
						<ListItem primaryText={a.name} key={a.id}
							leftIcon={<span/>}
							rightIcon={<IconItem/>}
							onClick={e=>toApp(a)}/>
				))
			}
		/>
	</Account>
)

export default compose(
	withFragment(graphql`
		fragment my on User{
			id
			username
			photo
			apps{
				id
				name
			}
		}
	`),
	withProps(({data})=>data)	
)(My)
