import React, {Component, PropTypes} from "react"
import {FlatButton,TextField} from "material-ui"
import {validate as isEmail} from "isemail"
import {gql,graphql, compose} from "react-apollo"

function isPhone(v){
    return (/^(\+\d{2})?\d{11}$/g).test(v)
}

export class Authentication extends Component{
    static defaultProps={

    }
    static propTypes={
        requestToken: PropTypes.func,
        login: PropTypes.func
    }
	state={
        address:null,
        token:null,
        tick:null,
        error:null
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
        const {address, token, tick,error}=this.state
		const {requestToken, login}=this.props
		let btnRequest, btnLogin
		if(address){
            if(tick){
                btnRequest=(<FlatButton label={tick} disabled={true}/>)
            } else {
                btnRequest=(<FlatButton label={tick===0 ? "重新申请" : "申请验证码"}
							onClick={e=>{
								this.tick()
                                this.setState({error:undefined})
								requestToken({variables:{emailOrPhone:address}})
                                    .catch(e=>this.setState({error:e.message}))
							}}/>)
            }
            if(token){
                btnLogin=(<FlatButton
                            label="登录"
                            primary={true}
                            onClick={e=>{
                                clearInterval(this._t)
                                this.setState({error:undefined})
                                login({variables:{emailOrPhone:address,token}})
                                    .catch(e=>this.setState({error:e.message}))
                            }}
                            />)
            }
        }



        return (
			<div>
				<div className="grid">
					<div>
						<TextField
							fullWidth={true}
							floatingLabelText="手机号/Email"
							disabled={!!tick}
							errorText={address&&!token ? error : null}
							onChange={({target:{value}})=>this.setState({address: this.validate(value)})}
                            />
					</div>
					<div>
						{btnRequest}
					</div>
				</div>

				<TextField
                    fullWidth={true}
                    floatingLabelText="验证码"
                    errorText={address&&token ? error : null}
                    onChange={({target:{value:token}})=>this.setState({token})}
                    />

                <center>
                    {btnLogin}
                </center>
			</div>
        )
    }

    validate(v){
        return (isEmail(v) || isPhone(v)) ? v : null
    }
}

export default compose(
    graphql(gql`
        mutation ($emailOrPhone: String!){
            requestToken(emailOrPhone:$emailOrPhone)
        }
    `,{name: "requestToken"}),
    graphql(gql`
        mutation ($emailOrPhone: String!, $token: String!){
            login(emailOrPhone: $emailOrPhone, token: $token){
                _id
                username
                token
            }
        }
    `,{name:"login"})
)(Authentication)
