import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {getContext, compose} from "recompose"
import {connect} from "react-redux"

import {List, ListItem} from "material-ui"

import IconRate from 'material-ui/svg-icons/editor/mode-edit'
import IconBug from 'material-ui/svg-icons/action/bug-report'
import IconUpdate from 'material-ui/svg-icons/action/system-update-alt'
import IconAbout from 'material-ui/svg-icons/action/info-outline'
import IconLogo from "material-ui/svg-icons/action/android"


import CheckUpdate from "../components/check-update"
import CommandBar from "../components/command-bar"

export const Setting=({latestVersion,is:{app}, project:{version}})=>(
	<Fragment>
		<List>
			{app && (<ListItem primaryText="去评价" leftIcon={<IconRate/>}/>)}

			<ListItem primaryText="建议" leftIcon={<IconBug/>}/>

			<ListItem primaryText={app ? `${latestVersion && version!=latestVersion ? <CheckUpdate>当前{version},更新到{latestVersion}</CheckUpdate> : "已是最新v"+version}`:`下载App [V${version}]`} leftIcon={<IconLogo/>}
				onClick={e=>{
					if(app && (!latestVersion || version==latestVersion))
						return
					let a=document.createElement("a")
					a.href="/app.apk"
					a.download="app.apk"
					a.style.position="absolute"
					a.top=-1000;
					document.body.appendChild(a)
					a.click()
					document.body.removeChild(a)
				}}
			/>

			<ListItem primaryText="关于" leftIcon={<IconAbout/>}/>
		</List>
	</Fragment>
)

export default compose(
    getContext({
    	is: PropTypes.object,
    	project: PropTypes.object
    }),
    connect(state=>({latestVersion:state.qili.latestVersion})),
)(Setting)
