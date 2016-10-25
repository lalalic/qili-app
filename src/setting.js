import React,{Component} from "react"
import {UI} from "."
import RateIcon from 'material-ui/svg-icons/editor/mode-edit'
import BugIcon from 'material-ui/svg-icons/action/bug-report'
import UpdateIcon from 'material-ui/svg-icons/action/system-update-alt'
import AboutIcon from 'material-ui/svg-icons/action/info-outline'
import LogoIcon from "material-ui/svg-icons/action/android"

const {List}=UI

export default class Setting extends Component{
    render(){
        return (
            <List>
                <List.Item primaryText="去评价" leftIcon={<RateIcon/>}/>
                <List.Item primaryText="建议" leftIcon={<BugIcon/>}/>

                <List.Item primaryText="更新" leftIcon={<UpdateIcon/>}/>

				<List.Item primaryText="App" leftIcon={<LogoIcon/>}
					onClick={a=>this.downloadApp()}
					/>
                <List.Item primaryText="关于" leftIcon={<AboutIcon/>}/>
            </List>
        )
    }

	downloadApp(){
		var a=document.createElement("a")
		a.href="./app.apk"
		a.download="app.apk"
		a.style.position="absolute"
		a.top=-1000;
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}
}
