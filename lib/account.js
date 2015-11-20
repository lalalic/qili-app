var React=require('react'),
    {Component}=React,
    {TextField,FlatButton, RaisedButton}=require('material-ui'),
    User=require('./db/user'),
    Messager=require('./components/messager');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={user:User.current}
    }
    verifyPhone(){
        var phone=this.refs.phone.state.phone,
            code=this.refs.code.getValue();
        if(!phone.length || !code.length){
            Messager.show("phone must be specified")
            return
        }
        User.verifyPhone(phone, code).then(function(){
            this.setState({phoneVerified:true})
        }.bind(this),function(e){
            this.setState({phoneVerifiedError:e})
        }.bind(this))
    }
    signup(){
        var{username,password}=this.refs
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
        User.signup({username,password}).then(null,function(e){
            this.setState({signupError:e})
        }.bind(this))
    }
    signin(){
        var{username,password}=this.refs
        username=username.getValue()
        password=password.getValue()
        if(!username.length || !password.length){
            Messager.show("user name, password cannot be empty")
            return
        }
        User.signin({username,password}).then(null,function(e){
            this.setState({signinError:e})
        }.bind(this))
    }
    forgetPassword(){
        let contact=this.refs.contact.getValue()
        if(!contact.length){
            Messager.show("You have to give phone number or email to get new password")
            return
        }
        User.requestPasswordReset(contact)
    }
    render(){
        var {user, phoneVerified, forgetPwd}=this.state
        if(!user){
            if(phoneVerified){
                return (
                    <div className="form">
                        <TextField ref="username" hintText="login name"
                            fullWidth={true}
                            onEnterKeyDown={this.signup.bind(this)}
                            errorText={this.state.signupError}/>
                        <TextField ref="password"
                            fullWidth={true}
                            onEnterKeyDown={this.signup.bind(this)}
                            type="password" hintText="password"/>
                        <TextField ref="password2"
                            fullWidth={true}
                            onEnterKeyDown={this.signup.bind(this)}
                            type="password" hintText="password again"/>

                        <center>
                            <RaisedButton label="sign up" primary={true}
                                onClick={this.signup.bind(this)}/>
                        </center>
                        <div className="commands">
                            <FlatButton label="already have an account"
                                onClick={()=>this.setState({user:User.current||{}})}/>

                            <FlatButton label="forget password"
                                onClick={()=>this.setState({user:User.current||{},forgetPwd:true})}/>
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className="form">
                        <SMSRequest ref="phone"/>
                        <TextField ref="code" hintText="verification code you just received"
                            fullWidth={true}
                            onEnterKeyDown={this.verifyPhone.bind(this)}
                            errorText={this.state.phoneVerifiedError}/>
                        <center>
                            <RaisedButton label="verify" primary={true}
                                onClick={this.verifyPhone.bind(this)}/>
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
        }else {
            if(forgetPwd){
                return (
                    <div className="form">
                        <TextField ref="contact"
                            onEnterKeyDown={this.forgetPassword.bind(this)}
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
            }else{
                return (
                    <div className="form">
                        <TextField ref="username" hintText="login name or phone number"
                            onEnterKeyDown={this.signin.bind(this)}
                            fullWidth={true}
                            value={user.name}
                            errorText={this.state.signinError}/>
                        <TextField ref="password"
                                onEnterKeyDown={this.signin.bind(this)}
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
        }
    }
}

class SMSRequest extends Component{
    constructor(props){
        super(props)
        this.state={phone:null,tick:null}
    }
    requestVerification(){
        this.tick()
        User.requestVerification(this.state.phone)
    }
    tick(){
        var i=0, doTick;
        var t=setInterval(doTick=function(){
            if(i==10){
                clearInterval(t)
                this.setState({tick: 0})
            }else
                this.setState({tick:++i})
        }.bind(this),1000);

        doTick()
    }
    static isPhone(v){
        return (/^(\+\d{2})?\d{11}$/g).test(v)
    }
    changePhone(e){
        var phone=e.target.value
        if(SMSRequest.isPhone(phone))
            this.setState({phone:phone})
    }

    render(){
        var button
        if(SMSRequest.isPhone(this.state.phone)){
            if(this.state.tick)
                button=(<FlatButton label={this.state.tick} disabled={true}/>)
            else
                button=(<FlatButton label={this.state.tick===0 ? "resend" : "send"}
                    onClick={this.requestVerification.bind(this)}/>)
        }

        return (
            <div className="smsrequest">
                <TextField ref="phone" hintText="phone number (default +86)"
                    defaultValue={this.state.phone}
                    onChange={this.changePhone.bind(this)}/>
                {button}
            </div>
        )
    }
}
