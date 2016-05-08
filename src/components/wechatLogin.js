import React from "react"
import {RaisedButton} from "material-ui"
import {User} from "../db"
export default class WechatLogin extends React.Component{
    static propTypes={
        scope: React.PropTypes.string
    }

    static defaultProps={
        scope:"snaapi_userinfo"
    }

    render(){
        if(Wechat.isInstalled())
            return (<RaisedButton onClick={e=>this.onLogin()}>WeChat Login</RaisedButton>)
        else
            return null
    }

    onLogin(){
        Wechat.auth(this.props.scope, response=>{
            User.wechat_access_code=response.code
        })
    }
}
