import React,{Component, PropTypes} from "react"
import {List, ListItem} from "material-ui"

import RateIcon from 'material-ui/svg-icons/editor/mode-edit'
import BugIcon from 'material-ui/svg-icons/action/bug-report'
import UpdateIcon from 'material-ui/svg-icons/action/system-update-alt'
import AboutIcon from 'material-ui/svg-icons/action/info-outline'
import LogoIcon from "material-ui/svg-icons/action/android"
import {connect} from "react-redux"

import CheckUpdate from "./components/check-update"

export const Setting=({latestVersion}, {is:{app}, project:{homepage=".",version}})=>(
    <List>
		{app && (<ListItem primaryText="去评价" leftIcon={<RateIcon/>}/>)}
		
        <ListItem primaryText="建议" leftIcon={<BugIcon/>}/>
		
		<ListItem primaryText={app ? `${latestVersion && version!=latestVersion ? <CheckUpdate>当前{lastVersion},更新到{version}</CheckUpdate> : "已是最新v"+version}`:`下载App [V${version}]`} leftIcon={<LogoIcon/>}
            onClick={e=>{
				if(app && (!latestVersion || version==latestVersion))
					return
        		let a=document.createElement("a")
        		a.href=`${homepage}/app.apk`
        		a.download="app.apk"
        		a.style.position="absolute"
        		a.top=-1000;
        		document.body.appendChild(a)
        		a.click()
        		document.body.removeChild(a)
        	}}
		/>
		
        <ListItem primaryText="关于" leftIcon={<AboutIcon/>}/>
    </List>
)

Setting.contextTypes={
	is: PropTypes.object,
	project: PropTypes.object
}

export default connect(state=>({latestVersion:state.qiliApp.latestVersion}))(Setting)
