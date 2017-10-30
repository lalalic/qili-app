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
		try{
			this.setState({value})
		}catch(e){
			console.error(e)
		}
    }

    set errorText(errorText){
		try{
			this.refs.main.setState({errorText})
		}catch(e){
			console.error(e)
		}
    }

    getValue(){
        return this.refs.main.getValue()
    }

    render(){
        return <TextField ref="main" {...this.props} value={this.state.value}/>
    }
}
