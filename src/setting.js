import React,{Component} from "react"
import {List, ListItem} from "material-ui"

import RateIcon from 'material-ui/svg-icons/editor/mode-edit'
import BugIcon from 'material-ui/svg-icons/action/bug-report'
import UpdateIcon from 'material-ui/svg-icons/action/system-update-alt'
import AboutIcon from 'material-ui/svg-icons/action/info-outline'
import LogoIcon from "material-ui/svg-icons/action/android"

export const DOMAIN="setting"
export const ACTION={

}

export const REDUCER={
    [DOMAIN]: (state, {type, payload}){

    }
}

export const Setting=props=>(
    <List>
        <ListItem primaryText="去评价" leftIcon={<RateIcon/>}/>
        <ListItem primaryText="建议" leftIcon={<BugIcon/>}/>

        <ListItem primaryText="更新" leftIcon={<UpdateIcon/>}/>

        <ListItem primaryText="App" leftIcon={<LogoIcon/>}
            onClick={e=>{
        		let a=document.createElement("a")
        		a.href="./app.apk"
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

export default Setting
