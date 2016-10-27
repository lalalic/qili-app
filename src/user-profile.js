import React, {Component} from "react"
import {Avatar} from "material-ui"

import List from "./components/list"
import Photo from "./components/photo"
import User from "./db/user"

export const DOMAIN="setting"
export const ACTION={
	UPDATE_PHOTO:url=>dispatch=>{
		const user=User.current
		user.photo=url
		return User.upsert()
	}
}

export const REDUCER={
    [DOMAIN]: (state, {type, payload})=>{

    }
}



export default Profile=connect()(({router,dispatch})=>{
	const user=User.current
	let avatar
    if(user.photo)
        avatar=<Avatar src={user.photo}/>
    else {
        avatar=<Photo
            onPhoto={url=>dispatch(ACTION.UPDATE_PHOTO(url))}
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
})
