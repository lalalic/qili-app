import React, {Component, PropTypes} from "react"
import {List, ListItem} from "material-ui"

import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

import Account from "./components/account"
import App from "./db/app"
import {UI} from "."

const {CommandBar}=UI

export const My=({apps},{router})=>(
	<Account>
		<ListItem
			primaryText="Create QiLi app"
			initiallyOpen={true}
			autoGenerateNestedIndicator={false}
			onTouchTap={a=>router.push("app")}
			leftIcon={<IconAdd/>}
			nestedItems={
				apps.map(a=>(
						<ListItem primaryText={a.name} key={a._id}
							leftIcon={<span/>}
							rightIcon={<IconItem/>}
							onClick={e=>router.push(`/app/${(App.current=a).name}`)}/>
				))
			}
		/>
		<CommandBar className="footbar" items={[{action:"Back"}]}/>
	</Account>
)
My.contextTypes={router:PropTypes.object}
export default My
