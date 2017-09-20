import React, {Component, PropTypes} from "react"
import {FlatButton,TextField} from "material-ui"
import {validate as isEmail} from "isemail"
import {compose, withState, withProps, branch,renderComponent,defaultProps} from "recompose"

import {graphql} from "react-relay"
import withMutation from "tools/withMutation"


function isPhone(v){
    return (/^(\+\d{2})?\d{11}$/g).test(v)
}

export class Authentication extends Component{
	static propTypes={
		onSuccess: PropTypes.func
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

	render(){
        const {contact, setContact, token, setToken, name, setName, success, onSuccess}=this.props
		const {requestToken, login}=this.props

		const {tick,error,errName,exists}=this.state
		let btnRequest, btnLogin, inputName
		if(contact){
            if(tick){
                btnRequest=(<FlatButton label={tick} disabled={true}/>)
            } else {
                btnRequest=(<FlatButton label={tick===0 ? "重新申请" : "申请验证码"}
							onClick={e=>{
								this.setState({error:null,errName:null,exists:true})
								setToken("")
								requestToken({contact})
                                    .then(exists=>{
										this.tick()
										this.setState({exists})
									})
                                    .catch(e=>this.setState({error:e.message}))
							}}/>)
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
							onClick={e=>{
								this.setState({error:undefined})
								login({contact, token, name})
									.then(user=>(onSuccess||success)(user))
									.catch(e=>this.setState({error:e.message}))
							}}
							/>)
			}
        }



        return (
			<div>
				<div style={{display:"table",tableLayout:"fixed",width:"100%"}}>
					<div style={{display:"table-cell"}}>
						<TextField
							fullWidth={true}
							floatingLabelText="手机号/Email"
							disabled={!!tick}
							errorText={contact&&!token ? error : null}
							onChange={({target:{value}})=>setContact(this.validate(value))}
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
                    />

				{inputName}

				<center>
                    {btnLogin}
                </center>
			</div>
        )
    }

    validate(v){
        return (isEmail(v) || isPhone(v)) ? v : undefined
    }
}

export default compose(
	withState("done","success"),
	branch(({done})=>done,renderComponent(()=><span>成功</span>)),
	withState("contact","setContact"),
	withState("token","setToken",""),
	withState("name","setName"),
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
					token
				}
			}
		`
	})
)(Authentication)
