import React from "react"
import {compose} from "recompose"
import {withFragment} from "qili-app/graphql"
import Account from "qili-app/components/account"

import {ListItem} from "material-ui/List"
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

export const My=({user, toCreate, toApp, toProfile, toSetting})=>(
	<Account {...{user,toProfile,toSetting}} >
		<ListItem
			primaryText="Create QiLi app"
			initiallyOpen={true}
			autoGenerateNestedIndicator={false}
			onClick={toCreate}
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
	withFragment({user:graphql`
		fragment my_user on User{
			...qili_account_user
			apps{
				id
				name
			}
		}
	`})
)(My)
