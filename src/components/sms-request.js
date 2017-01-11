import React, {Component, PropTypes} from "react"
import {FlatButton,TextField} from "material-ui"
import {ACTION} from "../account"

export class SMSRequest extends Component{
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
								dispatch(ACTION.PHONE_CODE_REQUEST(this.refs.phone.getValue(),existence))
									.then(salt=>this.salt=salt)
									.catch(({message:error})=>this.setState({error}))
							}}/>)
        }

        return (
			<div>
				<div className="grid">
					<div>
						<TextField
							ref="phone"
							fullWidth={true}
							hintText="phone number (default +86)"
							disabled={!!tick}
							errorText={error}
							onChange={({target:{value}})=>this.setState({phone: this.isPhone(value)? value : null})}/>
					</div>
					<div>
						{button}
					</div>
				</div>
				
				<TextField ref="code" fullWidth={true} hintText="verification code you just received" />
			</div>
        )
    }

	isPhone(v){
        return (/^(\+\d{2})?\d{11}$/g).test(v)
    }

	get data(){
		return {
			phone:this.state.phone,
			code:this.refs.code.getValue(),
			salt:this.salt
		}	
	}
}

export default SMSRequest