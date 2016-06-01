import React, {Component} from 'react'

export default class Loading extends Component{
    constructor(p){
        super(p)
        this.state={status:this.props.status||"hide"}
    }
    render(){
        let {className, ...others}=this.props
        let {status}=this.state

        return <span className={`spinner ${status} ${className}`} {...others}/>
    }

    show(){
        this.setState({status:"loading"})
    }

    close(){
        this.setState({status:"hide"})
    }
}
