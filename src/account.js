import React, {Component} from 'react'
import {TextField, FlatButton, RaisedButton} from 'material-ui'
import {connect} from "react-redux"

import User from './db/user'
import TextFieldx from "./components/text-field"

const ENTER=13

export const ACTION={
	SIGNUP:user=>dispatch=>{
		const {username,password,password2}=user
		let usernameError, passwordError,password2Error
		if(!username)
			usernameError="user name is required"
		if(!password)
			passwordError="password is required"

		if(password!=password2)
			password2Error="password doesn't match"

		if(usernameError || passwordError||password2Error)
			return Promise.reject({passwordError, usernameError,password2Error})

		return User.signup({username,password})
			.catch(({message})=>Promise.reject({usernameError:message}))
	}
	,SIGNIN:user=>dispatch=>{
		const {username, password}=user
		let usernameError, passwordError
		if(!username)
			usernameError="user name is required"
		if(!password)
			passwordError="password is required"

		if(usernameError || passwordError)
			return Promise.reject({usernameError, passwordError})

		return User.signin({username,password})
			.catch(({message})=>Promise.reject({usernameError:message}))
	}
	,PHONE_VERIFY_REQUEST:(phone,existence)=>dispatch=>User.requestVerification(phone,existence)

	,PHONE_VERIFY:(phone,code)=>dispatch=>User.verifyPhone(phone,code)

	,FORGET_PASSWORD: (phone,code)=>dispatch=>{
		if(!phone || !code)
			return Promise.reject("a phone number must be given to recover password")

		return User.requestPasswordReset(phone,code)
	}
	,RESET_PASSWORD: (oldPwd, newPwd)=>dispatch=>User.resetPassword(oldPwd, newPwd)

	,SIGNUP_UI:{type:`SIGNUP_UI`}
	,SIGNIN_UI:{type:`SIGNIN_UI`}
	,FORGET_PASSWORD_UI:{type:`FORGET_PASSWORD_UI`}
	,RESET_PASSWORD_UI:{type:`RESET_PASSWORD_UI`}
	,PHONE_VERIFY_UI:({type:`PHONE_VERIFY_UI`})
}

export class Account extends Component{
	state={type:null}
	render(){
		let {user,dispatch,...others}=this.props
		let {type}=this.state
		if(!type){
			if(user)
				type='SIGNIN_UI'
			else
				type='PHONE_VERIFY_UI'
		}

		others.dispatch=action=>{
			switch(action.type){
			case `SIGNUP_UI`:
			case `SIGNIN_UI`:
			case `FORGET_PASSWORD_UI`:
			case `RESET_PASSWORD_UI`:
			case `PHONE_VERIFY_UI`:
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
		case 'PHONE_VERIFY_UI':
			return (<PhoneVerification {...others}/>)
		case 'FORGET_PASSWORD_UI':
			return (<ForgetPassword {...others}/>)
		case 'RESET_PASSWORD_UI':
			return (<ResetPassword {...others}/>)
		}
	}
}

class PhoneVerification extends Component{
	state={phoneVerifiedError:null}
	render(){
		const {phoneVerifiedError}=this.state
		const {dispatch}=this.props

		let code,phone

		const send=a=>dispatch(ACTION.PHONE_VERIFY(phone.getValue(),code.getValue()))
			.then(a=>dispatch(ACTION.SIGNUP_UI),e=>this.setState({phoneVerifiedError:e}))

		return (
			<div className="form" key="phoneverify">
				<SMSRequest ref={a=>phone=a} dispatch={dispatch}/>
				<TextField ref={a=>code=a} hintText="verification code you just received"
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					errorText={phoneVerifiedError}/>
				<center>
					<RaisedButton label="verify" primary={true}
						onClick={e=>send()}/>
				</center>
				<div className="commands">
					<FlatButton label="already have an account"
						onClick={e=>dispatch(ACTION.SIGNIN_UI)}/>

					<FlatButton label="forget password"
						onClick={e=>dispatch(ACTION.FORGET_PASSWORD_UI)}/>
				</div>
			</div>
		)
	}
}

class Signup extends Component{
	state= {usernameError:null, passwordError:null, password2Error:null}
	render(){
		const {usernameError, passwordError, password2Error}=this.state
		const {dispatch}=this.props

		let username, password, password2

		const send=a=>dispatch(ACTION.SIGNUP({
			username:username.getValue()
			,password:password.getValue()
			,password2:password2.getValue()
		})).catch(e=>this.setState(Object.assign({},{usernameError:null, passwordError:null, password2Error:null},e)))

		return (
			<div className="form" key="signup">
				<TextField ref={a=>username=a}
					hintText="login name"
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					errorText={usernameError}/>

				<TextField ref={a=>password=a}
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					type="password" hintText="password" errorText={passwordError}/>

				<TextField ref={a=>password2=a}
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					type="password" hintText="password again" errorText={password2Error}/>

				<center>
					<RaisedButton label="sign up" primary={true}
						onClick={e=>send()}/>
				</center>
				<div className="commands">
					<FlatButton label="already have an account"
						onClick={e=>dispatch(ACTION.SIGNIN_UI)}/>

					<FlatButton label="forget password"
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
					hintText="login name or phone number"
					defaultValue={username}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					fullWidth={true}
					errorText={usernameError}/>
				<TextField ref={a=>refPassword=a}
						onKeyDown={e=>{e.keyCode==ENTER && send()}}
						fullWidth={true} errorText={passwordError}
						type="password" hintText="password"/>
				<center>
					<RaisedButton label="sign in" primary={true}
						onClick={e=>send()}/>
				</center>
				<div className="commands">
					<FlatButton label="no account"
							onClick={e=>dispatch(ACTION.PHONE_VERIFY_UI)}/>

					<FlatButton label="forget password"
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
		let phone,code
		const send=a=>dispatch(ACTION.FORGET_PASSWORD(phone.getValue(),code.getValue()))
			.then(a=>{
					this.setState({phoneVerifiedError:null})
					alert(`a temp password sent to your phone, please sign in within 2 hours and reset password immediatly`)
				}, e=>this.setState({phoneVerifiedError:e}))

		return (
			<div className="form" key="forgetPwd">
				<SMSRequest ref={a=>phone=a} dispatch={dispatch} existence={true}/>

				<TextField ref={a=>code=a} hintText="verification code you just received"
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					errorText={phoneVerifiedError}/>

				<center>
					<RaisedButton label="send me temp password" primary={true}
						onClick={e=>send()}/>
				</center>
				<div className="commands">
					<FlatButton label="sign in"
						onClick={e=>dispatch(ACTION.SIGNIN_UI)}/>

					<FlatButton label="sign up"
						onClick={e=>dispatch(ACTION.PHONE_VERIFY_UI)}/>
				</div>
			</div>
			)
	}
}

class ResetPassword extends Component{
	state={resetError:null, passwordError:null, password2Error:null}
	render(){
		const {dispatch}=this.props
		const {resetError}=this.state

		let oldPassword, password, password2
		const send=a=>{
			let newPassword=password.getValue()
			if(password2.getValue()!=newPassword){
				this.setState({password2Error:"password not matched"})
				return
			}

			dispatch(ACTION.RESET_PASSWORD(oldPassword.getValue(), newPassword))
				.then(a=>this.setState({resetError:null, passwordError:null, password2Error:null}),
					error=>this.setState({resetError:error, passwordError:null, password2Error:null}))
		}

		return (
			<div className="form" key="reset">
				<TextField ref={a=>oldPassword=a} hintText="old password"
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					errorText={resetError}/>

				<TextField ref={a=>password=a}
					fullWidth={true}
					errorText={passwordError}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					type="password" hintText="password"/>

				<TextFieldx ref={a=>password2=a}
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && send()}}
					errorText={password2Error}
					type="password"
					hintText="password again"/>

				<center>
					<RaisedButton label="reset password" primary={true}
						onClick={e=>send()}/>
				</center>
				<div className="commands">
					<FlatButton label="sign in"
						onClick={e=>dispatch(ACTION.SIGNIN_UI)}/>

					<FlatButton label="forget password"
						onClick={e=>dispatch(ACTION.FORGET_PASSWORD_UI)}/>
				</div>
			</div>
			)
	}
}

class SMSRequest extends Component{
	state={phone:null,tick:null, error:null}

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

    render(){
        const {phone, tick,error}=this.state
		const {dispatch,existence=false}=this.props
		let button
		if(phone){
            if(tick)
                button=(<FlatButton label={tick} disabled={true}/>)
            else
                button=(<FlatButton label={tick===0 ? "resend" : "send"}
							onClick={e=>{
								this.tick()
								dispatch(ACTION.PHONE_VERIFY_REQUEST(this.refs.phone.getValue(),existence))
									.catch(error=>this.setState({error}))
							}}/>)
        }

        return (
            <div className="smsrequest">
                <TextField
					ref="phone"
					hintText="phone number (default +86)"
					disabled={!!tick}
					errorText={error}
                    onChange={({target:{value}})=>this.setState({phone: this.isPhone(value)? value : null})}/>
                {button}
            </div>
        )
    }

	isPhone(v){
        return (/^(\+\d{2})?\d{11}$/g).test(v)
    }

	getValue(){
		return this.state.phone
	}
}

export default Account
