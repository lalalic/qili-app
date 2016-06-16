import React, {Component} from 'react'

export default class Empty extends Component{
    render(){
        let {icon, text, ...others}=this.props
        return (
            <div className="empty" {...others}>
                {icon}
                <p>{this.props.children||text}</p>
            </div>
            )
    }
	static defaultProps={icon:null,text:'Empty'}
}
