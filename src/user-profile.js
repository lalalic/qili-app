import React, {Component} from "react"
import {Avatar} from "material-ui"

import List from "./components/list"
import Photo from "./components/photo"
import User from "./db/user"


export default class Profile extends Component{
	render(){
		var user=User.current
			,router=this.context.router
			,avatar
        if(user.photo)
            avatar=<Avatar src={user.photo}/>
        else {
            avatar=<Photo
                onPhoto={(url)=>{user.photo=url;User.upsert(user)}}
                iconRatio={2/3} width={100} height={100}/>
        }
		return (
			<List>
				<List.Item primaryText="头像" rightAvatar={avatar} style={{height:100}}/>
				<List.Divider/>
				<List.Item primaryText="帐号" rightIcon={<span>{user.name}</span>}/>
				<List.Divider/>
				<List.Item primaryText="昵称" rightIcon={<span>{user.nick}</span>}/>
				<List.Divider/>			
				<List.Item primaryText="性别" rightIcon={<span>{user.gender||"男"}</span>}/>
				<List.Divider/>
				<List.Item primaryText="地址" rightIcon={<span>{user.location}</span>}/>
				<List.Divider/>
				<List.Item primaryText="个性签名" rightIcon={<span>{user.sign}</span>}/>
			</List>
		)
	}
}