import React, {Component} from 'react'
import {Snackbar} from 'material-ui'
import Error from "material-ui/lib/svg-icons/alert/error"
import Warning from "material-ui/lib/svg-icons/alert/warning"
import Info from "material-ui/lib/svg-icons/action/info"

var Icons={Error, Warning, Info}, instance;

export default class Messager extends Component{
    constructor(props){
        super(props)
        this.state={
            message:"default",
            level:'Info'
        }
        instance=this
    }

    render(){
        return <Snackbar ref="bar" {...this.props} message={this.state.message}/>
    }

    show(message,level="Info"){
        if(!message) return;
        this.setState({message,level})
        this.refs.bar.show()
    }

    static warn(m){
        instance.show(m, "Warning")
    }

    static info(m){
        instance.show(m, "Info")
    }

    static error(m){
        instance.show(m, "Error")
    }
}
