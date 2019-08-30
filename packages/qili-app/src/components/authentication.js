import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import FlatButton from "material-ui/FlatButton"
import TextField from "material-ui/TextField"

import isEmail from "is-valid-email"
import {compose, withState, withProps, branch,renderComponent,defaultProps} from "recompose"
import {graphql, withMutation} from "../graphql"
import * as offline from "./offline"

const ENTER=13
const isPhone=v=>(/^(\+\d{2})?\d{11}$/g).test(v)

export class Authentication extends Component{
	static propTypes={
		onSuccess: PropTypes.func,
		supportEmail: PropTypes.bool,
	}
	state={
        tick:null,
        error:null,
        exists:true,
		errName:null
    }

    tick(){
        let i=60, doTick;
        this._t=setInterval(doTick=()=>{
            if(i==0){
                clearInterval(this._t)
                this.setState({tick: 0})
            }else
                this.setState({tick:i--})
        },1000);

        doTick()
    }

    componentWillUnmount(){
        if(this._t)
            clearInterval(this._t)
    }

	requestCode(){
		const {contact, setToken,requestToken}=this.props
		if(contact){
			this.setState({error:null,errName:null,exists:true})
			setToken("")
			requestToken({contact})
				.then(exists=>{
					this.tick()
					this.setState({exists})
				})
				.catch(e=>this.setState({error:e.message}))
		}
	}

	login(){
		const {contact, token, name, success, onSuccess,login}=this.props
		const {exists}=this.state
		if(contact && (name || exists) && token){
			this.setState({error:undefined})
			login({contact, token, name})
				.then(user=>(onSuccess||success)(user))
				.catch(e=>this.setState({error:e.message}))
		}
	}

	render(){
        const {contact, setContact, token, setToken, name, setName,supportEmail}=this.props
		
		const {tick,error,errName,exists}=this.state
		let btnRequest, btnLogin, inputName
		if(contact){
            if(tick){
                btnRequest=(<FlatButton label={tick} disabled={true}/>)
            } else {
                btnRequest=(<FlatButton label={tick===0 ? "重新申请" : "申请验证码"}
							onClick={this.requestCode.bind(this)}/>)
            }

			if(!exists){
				inputName=(<TextField
							fullWidth={true}
							floatingLabelText="新用户名称/昵称"
							errorText={errName}
							onChange={({target:{value}})=>{
								setName(value)
							}}
							/>)
			}

            if((name || exists) && token){
				btnLogin=(<FlatButton
							label="登录"
							primary={true}
							onClick={this.login.bind(this)}
							/>)
			}
        }



        return (
			<Fragment>
				<div style={{display:"table",tableLayout:"fixed",width:"100%"}}>
					<div style={{display:"table-cell"}}>
						<TextField
							fullWidth={true}
							floatingLabelText={`手机号${supportEmail ? "/Email" : ""}`}
							disabled={!!tick}
							errorText={contact&&!token ? error : null}
							onChange={({target:{value}})=>setContact(this.validate(value))}
							onKeyDown={e=>e.keyCode==ENTER && this.requestCode()}
                            />
					</div>
					<div style={{display:"table-cell", textAlign:"right", width: !!btnRequest ? "8em" : 0}}>
						{btnRequest}
					</div>
				</div>

				<TextField
					value={token}
                    fullWidth={true}
                    floatingLabelText="验证码"
                    errorText={contact&&token ? error : null}
                    onChange={({target:{value}})=>setToken(value)}
					onKeyDown={e=>e.keyCode==ENTER && this.login()}
                    />

				{inputName}

				<center>
                    {btnLogin}
                </center>
			</Fragment>
        )
    }

    validate(v){
		const {supportEmail}=this.props
        return (isPhone(v) || (supportEmail && isEmail(v))) ? v : undefined
    }
}

export default compose(
	withState("done","success"),
	branch(({done})=>done,renderComponent(()=><span>成功</span>)),
	withState("contact","setContact"),
	withState("token","setToken",""),
	withState("name","setName"),
	offline.notSupport,
	withMutation({
		name: "requestToken",
		promise:true,
		mutation: graphql`
			mutation authentication_requestToken_Mutation($contact:String!){
				requestToken(contact:$contact)
			}
		`
	}),
	withMutation({
		name: "login",
		promise:true,
		mutation: graphql`
			mutation authentication_login_Mutation($contact:String!, $token: String!, $name: String){
				login(contact:$contact, token:$token, name: $name){
					id
					token
				}
			}
		`
	})
)(Authentication)

const renewToken=graphql`
	query authentication_renewToken_Query{
		me{
			token
		}
	}
`