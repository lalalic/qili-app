import React, {Component} from 'react'
import {TextField,FlatButton, RaisedButton} from 'material-ui'
import User from './db/user'
import {connect} from "react-redux"

const ENTER=13

/*
export default class Account extends Component{
    constructor(props){
        super(props)
        this.state={user:this.props.user}
    }

    verifyPhone(){
        var phone=this.refs.phone.state.phone,
            code=this.refs.code.getValue();
        if(!phone.length || !code.length){
            Messager.show("phone must be specified")
            return
        }
        User.verifyPhone(phone, code)
            .then(()=>this.setState({phoneVerified:true}))
            .catch(e=>this.setState({phoneVerifiedError:e.message}))
    }
    signup(){
        var{username,password,password2}=this.refs
        username=username.getValue()
        password=password.getValue()
        password2=password2.getValue()
        if(!username.length || !password.length ||!password2.length){
            Messager.show("user name, password cannot be empty")
            return
        }

        if(password!=password2){
            Messager.show("password not verified")
            return
        }
        User.signup({username,password})
            .catch((e)=>this.setState({signupError:e.message}))
    }
    signin(){
        var{username,password}=this.refs
        username=username.getValue()
        password=password.getValue()
        if(!username.length || !password.length){
            Messager.show("user name, password cannot be empty")
            return
        }
        User.signin({username,password})
            .catch((e)=>{
                this.setState({signinError:e.message})
            })
    }
    forgetPassword(){
        let contact=this.refs.contact.getValue()
        if(!contact.length){
            Messager.show("You have to give phone number or email to get new password")
            return
        }
        User.requestPasswordReset(contact)
    }

    resetPassword(){

    }

    render(){
        var {user, phoneVerified, forgetPwd, resetPassword}=this.state
        if(!user){
            if(phoneVerified){
                return this._renderSignup()
            }else{
                return this._renderBeforeSignup()
            }
        }else {
            if(forgetPwd){
                return this._renderForgetPassword()
            }else if(resetPassword){
                //return this._renderResetPassword()
            }else{
                return this._renderSignin()
            }
        }
    }

    _renderBeforeSignup(){
        var {user, phoneVerified, forgetPwd}=this.state
        return (
            <div className="form" key="beforesignup">
                <SMSRequest ref="phone"/>
                <TextField ref="code" hintText="verification code you just received"
                    fullWidth={true}
                    onKeyDown={e=>{e.keyCode==ENTER && this.verifyPhone()}}
                    errorText={this.state.phoneVerifiedError}/>
                <center>
                    <RaisedButton label="verify" primary={true}
                        onClick={()=>this.verifyPhone()}/>
                </center>
                <div className="commands">
                    <FlatButton label="already have an account"
                        onClick={()=>this.setState({user:User.current||{}})}/>

                    <FlatButton label="forget password"
                        onClick={()=>this.setState({user:User.current||{},forgetPwd:true})}/>
                </div>
            </div>
        )
    }


    _renderSignin(){
        var {user, phoneVerified, forgetPwd}=this.state
        return (
            <div className="form" key="signin">
                <TextField ref="username"
                    hintText="login name or phone number"
                    onKeyDown={e=>{e.keyCode==ENTER && this.signin()}}
                    fullWidth={true}
                    errorText={this.state.signinError}/>
                <TextField ref="password"
                        onKeyDown={e=>{e.keyCode==ENTER && this.signin()}}
                        fullWidth={true}
                        type="password" hintText="password"/>
                <center>
                    <RaisedButton label="sign in" primary={true}
                        onClick={this.signin.bind(this)}/>
                </center>
                <div className="commands">
                    <FlatButton label="no account"
                            onClick={()=>this.setState({user:undefined})}/>

                    <FlatButton label="forget password"
                        onClick={()=>this.setState({user:User.current||{},forgetPwd:true})}/>

                </div>
            </div>
        )
    }

    _renderForgetPassword(){
        var {user, phoneVerified, forgetPwd}=this.state
        return (
            <div className="form" key="forgetPwd">
                <TextField ref="contact"
                    onKeyDown={e=>{e.keyCode==ENTER && this.forgetPassword()}}
                    fullWidth={true} hintText="phone number or email"/>

                <center>
                    <RaisedButton label="send me" primary={true}
                        onClick={this.forgetPassword.bind(this)}/>
                </center>
                <div className="commands">
                    <FlatButton label="sign in"
                        onClick={()=>this.setState({user:User.current||{}, forgetPwd:undefined})}/>

                    <FlatButton label="sign up"
                        onClick={()=>this.setState({user:undefined,forgetPwd:undefined})}/>
                </div>
            </div>
        )
    }

    _renderResetPassword(){
        return (
            <div className="form" key="reset">
                <TextField ref="oldPassword" hintText="old password"
                    fullWidth={true}
                    onKeyDown={e=>{e.keyCode==ENTER && this.resetPassword()}}
                    errorText={this.state.resetError}/>

                <TextField ref="password"
                    fullWidth={true}
                    onKeyDown={e=>{e.keyCode==ENTER && this.resetPassword()}}
                    type="password" hintText="password"/>

                <TextField ref="password2"
                    fullWidth={true}
                    onKeyDown={e=>{e.keyCode==ENTER && this.resetPassword()}}
                    type="password" hintText="password again"/>

                <center>
                    <RaisedButton label="reset password" primary={true}
                        onClick={this.resetPassword.bind(this)}/>
                </center>
                <div className="commands">
                    <FlatButton label="sign in"
                        onClick={()=>this.setState({user:User.current||{}, forgetPwd:undefined})}/>

                    <FlatButton label="forget password"
                        onClick={()=>this.setState({user:User.current||{},forgetPwd:true})}/>
                </div>
            </div>
        )
    }
}

*/

export const ACTION={
	SIGNUP:user=>{
		return dispatch=>{
			const {username,password,password2}=user
			let usernameError, passwordError,password2Error
			if(!username)
				usernameError="user name is required"
			if(!password)
				passwordError="password is required"
			
			if(password!=password2)
				password2Error="password doesn't match"
			
			if(usernameError || passwordError||password2Error)
				return dispatch({type:"SIGNUP_UI", passwordError, usernameError,password2Error})
			
			return User.signup({username,password})
				.catch(e=>dispatch({type:"SIGNUP_UI", usernameError:e.message}))
		}
	}
	,SIGNIN:user=>{
		({type:"SIGNIN",user})	
	}
	,PHONE_VERIFY_REQUEST:phone=>{
		User.requestVerification(phone)
		return {type:"PHONE_VERIFY_REQUEST"}
	}
	,PHONE_VERIFY:(phone,code)=>{
		return dispatch=>User.verifyPhone(phone,code)
			.then(a=>dispatch(ACTION.SIGNUP_UI))
	}
	
	,SIGNUP_UI:{type:"SIGNUP_UI"}
	,SIGNIN_UI:{type:"SIGNIN_UI"}
	,FORGET_PASSWORD_UI:{type:"FORGET_PASSWORD_UI"}
	,RESET_PASSWORD_UI:{type:"RESET_PASSWORD_UI"}
	,PHONE_VERIFY_UI:({type:"PHONE_VERIFY_UI"})
}

export const reducer=(state={},action)=>{
	switch(action.type){
	case 'SIGNUP':
		return {}
	case 'SIGNIN':
		return {user}

	case 'SIGNUP_UI':
	case 'SIGNIN_UI':
	case 'FORGET_PASSWORD_UI':
	case 'RESET_PASSWORD_UI':
	case 'PHONE_VERIFY_UI':
		return action
	default:
		return state
	}
}

const Account=connect(state=>state.account)(({user,type, dispatch})=>{
	if(!type){
		if(user)
			type='SIGNIN_UI'
		else
			type='PHONE_VERIFY_UI'
	}
		
	switch(type){
	case 'SIGNUP_UI':
		return (<Signup/>)
	case 'SIGNIN_UI':
		return (<Signin user={user}/>)
	case 'PHONE_VERIFY_UI':
		return (<PhoneVerification />)
	case 'FORGET_PASSWORD_UI':
		return (<ForgetPassword/>)
	case 'RESET_PASSWORD_UI':
		return (<ResetPassword/>)
	}
})

const PhoneVerification=connect(state=>state.account)(
	({phoneVerifiedError,dispatch})=>{
		let code,phone
		return (
			<div className="form" key="phoneverify">
				<SMSRequest ref={a=>phone=a} dispatch={dispatch}/>
				<TextField ref={a=>code=a} hintText="verification code you just received"
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && dispatch(ACTION.PHONE_VERIFY(phone.getValue(),code.getValue()))}}
					errorText={phoneVerifiedError}/>
				<center>
					<RaisedButton label="verify" primary={true}
						onClick={e=>dispatch(ACTION.PHONE_VERIFY(phone.getValue(),code.getValue()))}/>
				</center>
				<div className="commands">
					<FlatButton label="already have an account"
						onClick={e=>dispatch(ACTION.SIGNIN_UI)}/>

					<FlatButton label="forget password"
						onClick={e=>dispatch(ACTION.FORGET_PASSWORD_UI)}/>
				</div>
			</div>
		)
});

const Signup=connect(state=>state.account)(
	({usernameError, passwordError, password2Error, dispatch})=>{
		let username, password, password2
		let values=a=>({
			username:username.getValue()
			,password:password.getValue()
			,password2:password2.getValue()
		})
		return (
			<div className="form" key="signup">
				<TextField ref={a=>username=a} hintText="login name"
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && dispatch(ACTION.SIGNUP(values()))}}
					errorText={usernameError}/>

				<TextField ref={a=>password=a}
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && dispatch(ACTION.SIGNUP(values()))}}
					type="password" hintText="password" errorText={passwordError}/>

				<TextField ref={a=>password2=a}
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && dispatch(ACTION.SIGNUP(values()))}}
					type="password" hintText="password again" errorText={password2Error}/>

				<center>
					<RaisedButton label="sign up" primary={true}
						onClick={e=>dispatch(ACTION.SIGNUP(values()))}/>
				</center>
				<div className="commands">
					<FlatButton label="already have an account"
						onClick={e=>dispatch(ACTION.SIGNIN_UI)}/>

					<FlatButton label="forget password"
						onClick={e=>dispatch(ACTION.FORGET_PASSWORD_UI)}/>
				</div>
			</div>
			)
});

const Signin=connect(state=>state.account)(
	({user, signinError, phoneVerified, forgetPwd,dispatch})=>{
		let username, password
		let values=a=>({
			username:username.getValue()
			,password:password.getValue()
		})
		return (
			<div className="form" key="signin">
				<TextField ref={a=>username=a}
					hintText="login name or phone number"
					defaultValue={user && user.username}
					onKeyDown={e=>{e.keyCode==ENTER && dispatch(ACTION.SIGNIN(values()))}}
					fullWidth={true}
					errorText={signinError}/>
				<TextField ref={a=>password=a}
						onKeyDown={e=>{e.keyCode==ENTER && dispatch(ACTION.SIGNIN(values()))}}
						fullWidth={true}
						type="password" hintText="password"/>
				<center>
					<RaisedButton label="sign in" primary={true}
						onClick={e=>dispatch(ACTION.SIGNIN(values()))}/>
				</center>
				<div className="commands">
					<FlatButton label="no account"
							onClick={e=>dispatch(ACTION.PHONE_VERIFY_UI)}/>

					<FlatButton label="forget password"
						onClick={e=>dispatch(ACTION.FORGET_PASSWORD_UI)}/>

				</div>
			</div>
		)
});

const ForgetPassword=connect(state=>state.account)(
	({dispatch})=>{
		let contact
		return (
			<div className="form" key="forgetPwd">
				<TextField ref={a=>contact=a}
					onKeyDown={e=>{e.keyCode==ENTER && dispatch(ACTION.FORGET_PASSWORD(contact.getValue()))}}
					fullWidth={true} hintText="phone number or email"/>

				<center>
					<RaisedButton label="send me" primary={true}
						onClick={e=>dispatch(ACTION.FORGET_PASSWORD(contact.getValue()))}/>
				</center>
				<div className="commands">
					<FlatButton label="sign in"
						onClick={e=>dispatch(ACTION.SIGNIN_UI)}/>

					<FlatButton label="sign up"
						onClick={e=>dispatch(ACTION.PHONE_VERIFY_UI)}/>
				</div>
			</div>
			)
});

const ResetPassword=connect(state=>state.account)(
	({resetError,dispatch})=>{
		let oldPassword, password, password2
		let values=a=>({
			oldPassword:oldPassword.getValue()
			,password:password.getValue()
			,password2:password2.getValue()
		})
		return (
			<div className="form" key="reset">
				<TextField ref={a=>oldPassword=a} hintText="old password"
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && dispatch(ACTION.RESET_PASSWORD(values()))}}
					errorText={resetError}/>

				<TextField ref={a=>password=a}
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && dispatch(ACTION.RESET_PASSWORD(values()))}}
					type="password" hintText="password"/>

				<TextField ref={a=>password2=a}
					fullWidth={true}
					onKeyDown={e=>{e.keyCode==ENTER && dispatch(ACTION.RESET_PASSWORD(values()))}}
					type="password" hintText="password again"/>

				<center>
					<RaisedButton label="reset password" primary={true}
						onClick={e=>dispatch(ACTION.RESET_PASSWORD(values()))}/>
				</center>
				<div className="commands">
					<FlatButton label="sign in"
						onClick={e=>dispatch(ACTION.SIGNIN_UI)}/>

					<FlatButton label="forget password"
						onClick={e=>dispatch(ACTION.FORGET_PASSWORD_UI)}/>
				</div>
			</div>
			)
})

class SMSRequest extends Component{
	state={phone:null,tick:null}

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
        const {phone, tick}=this.state
		const {dispatch}=this.props
		let button, refPhone
		if(phone){
            if(tick)
                button=(<FlatButton label={tick} disabled={true}/>)
            else
                button=(<FlatButton label={tick===0 ? "resend" : "send"}
							onClick={e=>{
								this.tick()
								dispatch(ACTION.PHONE_VERIFY_REQUEST(refPhone.getValue()))
							}}/>)
        }

        return (
            <div className="smsrequest">
                <TextField
					ref={a=>refPhone=a}
					hintText="phone number (default +86)"
					disabled={!!tick}
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