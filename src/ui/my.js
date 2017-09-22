import React, {Component, PropTypes} from "react"
import {getContext,compose,withProps} from "recompose"
import {graphql, withFragment} from "tools/recompose"

import {List, ListItem} from "material-ui"
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

import Account from "components/account"
import CommandBar from "components/command-bar"
	
export const My=({data, apps, router})=>(
	<Account data={data}>
		<ListItem
			primaryText="Create QiLi app"
			initiallyOpen={true}
			autoGenerateNestedIndicator={false}
			onTouchTap={a=>router.push("app")}
			leftIcon={<IconAdd/>}
			nestedItems={
				apps.map(a=>(
						<ListItem primaryText={a.name} key={a.id}
							leftIcon={<span/>}
							rightIcon={<IconItem/>}
							onClick={e=>router.push(`/app/${a.id}`)}/>
				))
			}
		/>
		<CommandBar className="footbar" items={[{action:"Back"}]}/>
	</Account>
)

export default compose(
	withFragment(graphql`
		fragment my on User{
			...account			
			apps{
				id
				name
			}
		}
	`),
	withProps(({data})=>data),
	getContext({router:PropTypes.object}),	
)(My)
