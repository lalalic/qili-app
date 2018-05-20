import React, {Component} from "react"
import PropTypes from "prop-types"
import {getContext,compose,withProps} from "recompose"
import {graphql, withFragment, Account} from "qili-app"

import {List, ListItem} from "material-ui"
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

export const My=({user, toCreate, toApp, toProfile, toSetting})=>(
	<Account {...{user,toProfile,toSetting}} >
		<ListItem
			primaryText="Create QiLi app"
			initiallyOpen={true}
			autoGenerateNestedIndicator={false}
			onTouchTap={toCreate}
			leftIcon={<IconAdd/>}
			nestedItems={
				user.apps.map(a=>(
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
		fragment my_user on User{
			...qili_account_user
			apps{
				id
				name
			}
		}
	`)
)(My)
