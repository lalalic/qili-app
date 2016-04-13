import React, {Component} from 'react'
import {Snackbar} from 'material-ui'
import Error from "material-ui/lib/svg-icons/alert/error"
import Warning from "material-ui/lib/svg-icons/alert/warning"
import Info from "material-ui/lib/svg-icons/action/info"

var Icons={Error, Warning, Info};

export default class Messager extends Component{
    constructor(props){
        super(props)
        this.state={
            message:"default",
            level:'Info'
        }
    }

    render(){
        return <Snackbar ref="bar" {...this.props} message={this.state.message}/>
    }

    show(message,level="Info"){
        if(!message) return;
        this.setState({message,level})
        this.refs.bar.show()
    }
}

Messager.defaultProps={autoHideDuration:2000, style:{position:"fixed",right:10, bottom:0}}
