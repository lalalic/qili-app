import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'

export default class Loading extends Component{
    render(){
        let {className, ...others}=this.props

        return <span className={`spinner hide ${className}`} {...others}/>
    }

    show(){
        const classes=findDOMNode(this).classList
        classes.remove("hide")
        classes.add("loading")
    }

    close(){
        const classes=findDOMNode(this).classList
        classes.remove("loading")
        classes.add("hide")
    }
}
