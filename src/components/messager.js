import React, {Component} from 'react'




export default class Messager extends Component{
    state={
        message:"default",
        level:'Info',
        open: !!this.props.open || false
    }

    render(){
        let {className, autoHideDuration, ...others}=this.props
        let {open}=this.state
        return <div className={`snackbar ${className} ${open ? "" : "hide"}`} {...others}>{this.state.message}</div>
    }

    componentDidUpdate(){
        var {open}=this.state
        if(open){
            this.__timer=setTimeout(a=>{
                this.setState({open:false})
                this.__timer && clearTimeout(this.__timer)
                delete this.__timer
            },this.props.autoHideDuration)
        }
    }

    show(message,level="Info"){
        if(!message) return;
        this.__timer && clearTimeout(this.__timer)
        delete this.__timer
        this.setState({message,level, open:true})
    }
}

Messager.defaultProps={autoHideDuration:2000}
