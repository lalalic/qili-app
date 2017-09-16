import React, {Component} from "react"
import {TextField} from "material-ui"

export default class TextFieldx extends Component{
    constructor(props){
        super(props)
        this.state={
            value:this.props.value
        }
    }

    set value(value){
        this.setState({value})
    }

    set errorText(errorText){
        this.refs.main.setState({errorText})
    }

    getValue(){
        return this.refs.main.getValue()
    }

    render(){
        return <TextField ref="main" {...this.props} value={this.state.value}/>
    }
}
