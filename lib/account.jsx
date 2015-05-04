var React=require('react');
var {User}=require('./db');
var mui=require('material-ui'),
    {TextField,FlatButton, RaisedButton}=mui,
    ajax=function(){return "ajax"};

class SMSRequest extends React.Component{
    constructor(props){
        super(props)
        this.state={phone:null,tick:null}
    }
    requestVerification(){
        this.tick()
        ajax("/requestVerification")
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

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    verify(){
        User.verify().then(function(){
            this.setState({verified:true})
        }.bind(this),function(e){
            this.setState({verifyError:e})
        }.bind(this))
    }
    signup(){
        User.signup().then(function(user){
            global.user=user
        }.bind(this),function(e){
            this.setState({signupError:e})
        }.bind(this))
    }
    signin(){
        ajax('/signin').then(function(user){
            global.user=user
        }.bind(this),function(e){
            this.setState({signinError:e})
        })
    }
    forgetPassword(){

    }
    render(){
        if(!this.props.user){
            return (
                <div className="form">
                    <SMSRequest/>
                    <TextField hintText="verification code you just received"
                        errorText={this.state.error}/>
                    <RaisedButton label="verify" primary={true}
                        onClick={this.verify.bind(this)}/>
                </div>
            )
        }else if(typeof(this.state.verified)!='undefined'){
            return (
                <div className="form">
                    <TextField ref="username" hintText="login name"
                        errorText={this.state.signupError}/>
                    <TextField ref="password"
                            type="password" hintText="password"/>
                    <TextField ref="password2"
                        type="password" hintText="password again"/>
                    <RaisedButton label="sign up" primary={true}
                        onClick={this.signup.bind(this)}/>
                </div>
            )
        }else{
            return (
                <div className="form">
                    <TextField ref="username" hintText="login name or phone number"
                        defaultValue={this.props.user.username}
                        errorText={this.state.signinError}/>
                    <TextField ref="password"
                            type="password" hintText="password"/>
                    <div className="commands">
                        <FlatButton label="forget password" secondary={true}/>
                        <FlatButton label="sign in" primary={true}
                            onClick={this.signin.bind(this)}/>
                    </div>
                </div>
            )
        }
    }
}

module.exports=Main
