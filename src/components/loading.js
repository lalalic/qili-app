import React, {Component} from 'react'

export default class Loading extends Component{
    state={hide:true}
    render(){
        const {hide}=this.state
        let {className, ...others}=this.props

        return <span className={`spinner ${className} ${hide ? "hide" : "loading"}`} {...others}/>
    }

    show(){
        this.setState({hide:false})
    }

    close(){
        this.setState({hide:true})
    }
}
