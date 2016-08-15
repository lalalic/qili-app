import React, {Component} from "react"
import {Avatar} from "material-ui"
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import SettingIcon from 'material-ui/svg-icons/action/settings'
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconItem from "material-ui/svg-icons/hardware/keyboard-arrow-right"

import List from "./list"
import Photo from "./photo"
import User from "../db/user"

export default class extends Component{
    render(){
        var user=User.current
			,router=this.context.router
			,avatar
        if(user.photo)
            avatar=<Avatar src={user.photo}/>
        else {
            avatar=<Photo
                onPhoto={(url)=>{user.photo=url;User.upsert(user)}}
                iconRatio={2/3} width={40} height={40}/>
        }

        return (
            <div>
                <List>
                    <List.Item primaryText={user.name||user.username}
                        leftAvatar={avatar}
                        rightIcon={<RightArrow/>} 
						onClick={e=>this.context.router.push('my/profile')}	
						/>

                    <List.Divider inset={true}/>

					{this.more()}
					
                    <List.Divider inset={true}/>

                    <List.Item primaryText="设置"
                        leftIcon={<SettingIcon/>}
						rightIcon={<RightArrow/>}
                        onClick={e=>this.context.router.push('my/setting')}
                        />
                </List>
            </div>
        )
    }
	
	
	more(){
		
	}
	
	
	static contextTypes={
		router:React.PropTypes.object
	}
}
