import React, {Component} from 'react'
import {TextField, FlatButton, RaisedButton} from 'material-ui'
import {connect} from "react-redux"

import User from './db/user'
import TextFieldx from "./components/text-field"
import SMSRequest from "./components/sms-request"

const ENTER=13

export const ACTION={
	SIGNUP:user=>dispatch=>{
		const {username,password,password2,verifyPhone}=user
		let usernameError, passwordError,password2Error
		if(!username)
			usernameError="帐号必须有"
		if(!password)
			passwordError="密码必须有"

		if(password!=password2)
			password2Error="2次密码不相同"

		if(usernameError || passwordError||password2Error)
			return Promise.reject({passwordError, usernameError,password2Error})

		return User.signup({username,password,verifyPhone})
			.catch(({message})=>Promise.reject({usernameError:message}))
	}
	,SIGNIN:user=>dispatch=>{
		const {username, password}=user
		let usernameError, passwordError
		if(!username)
			usernameError="帐号必须有"
		if(!password)
			passwordError="密码必须有"

		if(usernameError || passwordError)
			return Promise.reject({usernameError, passwordError})

		return User.signin(user)
			.catch(({message})=>Promise.reject({usernameError:message}))
	}
	,PHONE_CODE_REQUEST:(phone,existence)=>dispatch=>User.requestPhoneCode(phone,existence)

	,FORGET_PASSWORD: verifyPhone=>dispatch=>User.requestPasswordReset(verifyPhone)

	,RESET_PASSWORD: (oldPwd, newPwd)=>dispatch=>User.resetPassword(oldPwd, newPwd)

	,SIGNUP_UI:{type:`SIGNUP_UI`}
	,SIGNIN_UI:{type:`SIGNIN_UI`}
	,FORGET_PASSWORD_UI:{type:`FORGET_PASSWORD_UI`}
}

export class Account extends Component{
	state={type:null}
	render(){
		let {user,dispatch,...others}=this.props
		let {type}=this.state

		if(!type)
			type='SIGNIN_UI'

		others.dispatch=action=>{
			switch(action.type){
			case `SIGNUP_UI`:
			case `SIGNIN_UI`:
			case `FORGET_PASSWORD_UI`:
				this.setState({type:action.type})
			default:
				return dispatch(action)
			}
		}

		switch(type){
		case 'SIGNUP_UI':
			return (<Signup {...others} />)
		case 'SIGNIN_UI':
			return (<Signin {...others} username={user ? user.username : null}/>)
		case 'FORGET_PASSWORD_UI':
			return (<ForgetPassword {...others}/>)
		}
	}
}

class Signup extends Component{
	state= {usernameError:null, passwordError:null, password2Error:null}
	render(){
		const {usernameError, passwordError, password2Error}=this.state
		const {dispatch}=this.props

		let username, password, password2, sms

		const send=a=>dispatch(ACTION.SIGNUP({
			username:username.getValue()
			,password:password.getValue()
			,password2:password2.getValue()
			,verifyPhone:sms.data
		})).catch(e=>this.setState(Object.assign({},{usernameError:null, passwordError:null, password2Error:null},e)))

		return (
			<div className="form" key="signup">
				<SMSRequest ref={a=>sms=a} dispatch={dispatch} existence={false}/>

				<TextField ref={a=>username=a}
					hintText="帐号"
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					errorText={usernameError}/>

				<TextField ref={a=>password=a}
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					type="password" hintText="密码" errorText={passwordError}/>

				<TextField ref={a=>password2=a}
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					type="password" hintText="密码确认" errorText={password2Error}/>

				<center>
					<RaisedButton label="创建帐号" primary={true}
						onClick={e=>send()}/>
				</center>
				<div className="commands">
					<FlatButton label="已经有帐号了"
						onClick={e=>dispatch(ACTION.SIGNIN_UI)}/>

					<FlatButton label="忘记密码"
						onClick={e=>dispatch(ACTION.FORGET_PASSWORD_UI)}/>
				</div>
			</div>
		)
	}
}

class Signin extends Component{
	state={usernameError:null, passwordError:null}
	render(){
		const {username, dispatch}=this.props
		const {usernameError, passwordError}=this.state
		let refUsername, refPassword

		let send=a=>dispatch(ACTION.SIGNIN({
			username:refUsername.getValue()
			,password:refPassword.getValue()
		})).catch(e=>this.setState(Object.assign({},{usernameError:null, passwordError:null},e)))

		return (
			<div className="form" key="signin">
				<TextField ref={a=>refUsername=a}
					hintText="帐号"
					defaultValue={username}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					fullWidth={true}
					errorText={usernameError}/>
				<TextField ref={a=>refPassword=a}
						onKeyDown={e=>{e.keyCode==ENTER && send()}}
						fullWidth={true} errorText={passwordError}
						type="password" hintText="密码"/>
				<center>
					<RaisedButton label="登录" primary={true}
						onClick={e=>send()}/>
				</center>
				<div className="commands">
					<FlatButton label="没有帐号"
							onClick={e=>dispatch(ACTION.SIGNUP_UI)}/>

					<FlatButton label="密码忘记了"
						onClick={e=>dispatch(ACTION.FORGET_PASSWORD_UI)}/>

				</div>
			</div>
		)
	}
}

class ForgetPassword extends Component{
	state={phoneVerifiedError:null}
	render(){
		const {dispatch}=this.props
		const {phoneVerifiedError}=this.state
		let sms
		const send=a=>dispatch(ACTION.FORGET_PASSWORD({verifyPhone:sms.data}))
			.then(a=>{
					this.setState({phoneVerifiedError:null})
					alert(`a temp password sent to your phone, please sign in within 2 hours and reset password immediatly`)
					dispatch(ACTION.SIGNIN_UI)
				}, e=>this.setState({phoneVerifiedError:e}))

		return (
			<div className="form" key="forgetPwd">
				<SMSRequest ref={a=>sms=a} dispatch={dispatch} existence={true}/>

				<center>
					<RaisedButton label="发送一个临时密码" primary={true}
						onClick={e=>send()}/>
				</center>
				<div className="commands">
					<FlatButton label="登录"
						onClick={e=>dispatch(ACTION.SIGNIN_UI)}/>

					<FlatButton label="创建帐号"
						onClick={e=>dispatch(ACTION.SIGNUP_UI)}/>
				</div>
			</div>
			)
	}
}

export class ResetPassword extends Component{
	state={resetError:null, passwordError:null, password2Error:null}
	render(){
		const {dispatch}=this.props
		const {resetError, passwordError, password2Error}=this.state

		let oldPassword, password, password2
		const send=a=>{
			let newPassword=password.getValue()
			if(password2.getValue()!=newPassword){
				this.setState({password2Error:"密码确认错误"})
				return
			}

			dispatch(ACTION.RESET_PASSWORD(oldPassword.getValue(), newPassword))
				.then(a=>{
						this.setState({resetError:null, passwordError:null, password2Error:null})
						alert("修改成功")
					},
					error=>this.setState({resetError:error, passwordError:null, password2Error:null}))
		}

		return (
			<div className="form" key="reset">
				<TextField ref={a=>oldPassword=a} hintText="老密码"
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					errorText={resetError}/>

				<TextField ref={a=>password=a}
					fullWidth={true}
					errorText={passwordError}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					type="password" hintText="密码"/>

				<TextFieldx ref={a=>password2=a}
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					errorText={password2Error}
					type="password"
					hintText="密码确认"/>

				<center>
					<RaisedButton label="保存" primary={true}
						onClick={e=>send()}/>
				</center>
			</div>
			)
	}
}

export default Account
