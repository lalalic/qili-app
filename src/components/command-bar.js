import React, {Component} from 'react'
import {SvgIcon,EnhancedButton} from 'material-ui'
import RefreshIcon from "material-ui/svg-icons/navigation/refresh"
import DefaultIcon from "material-ui/svg-icons/action/favorite-border"
import HomeIcon from "material-ui/svg-icons/action/home"
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import CommentIcon from "material-ui/svg-icons/communication/comment"
import ShareIcon from "material-ui/svg-icons/social/share"
import SaveIcon from "material-ui/svg-icons/content/save"
import Messager from './messager'

var enhancedBack=false;
var _current;

export default class CommandBar extends Component{
    render(){
        this.enhanceBack()
        var {onSelect, className, primary, items=[],...others}=this.props,
            i=0,
            commands=items.map((command)=>{
                if(typedOf(command, Command))
                    return command

                if(typedOf(command, DialogCommand))
                    throw new Error("Please use common command to trigger DialogCommand")

                if(React.isValidElement(command)){
                    return (
                        <div key={i++}>
                            {command}
                        </div>
                    )
                }

                if(typeof(command)=='string')
                    command={action:command}

                if(command.action.toLowerCase()=='back'){
                    command.icon=BackIcon
                    command.onSelect=()=>{this.context.router.goBack()}
                }

                if(command.action.toLowerCase()=='refresh' && !command.icon)
                    command.icon=RefreshIcon

                if(command.action.toLowerCase()=='save' && !command.icon)
                    command.icon=SaveIcon

                return (
                    <Command key={command.action} primary={command.action==primary} onSelect={onSelect} {...command}/>
                )
            })

        return (
            <div className={`commands ${className}`} {...others}>
                {commands}
            </div>
        )
    }

    enhanceBack(){
        var router=this.context.router
        if(enhancedBack || !router)
            return
        enhancedBack=true
    }

    historyLength(){
        return 2
    }
}
CommandBar.contextTypes={router:React.PropTypes.object}


class Command extends Component{
    render(){
        var {primary, onSelect, action, label, icon:Icon=DefaultIcon, children}=this.props
        var props={}
        if(primary)
            props.className="primary"
        return (
            <div {...props}>
                <a style={{cursor:'default'}}
                    onClick={(e)=>onSelect(action,e)}>
                    <center><Icon/></center>
                    <center style={{fontSize:'smaller'}}>{label||action}</center>
                </a>
                {children}
            </div>
        )
    }
}
CommandBar.Command=Command

class Comment extends Command{
    render(){
        return (<Command label="Comment" onSelect={()=>this.onSelect()}
            icon={CommentIcon} {...this.props}/>)
    }

    onSelect(){
        var {type:{_name}, model:{_id}}=this.props
        this.context.router.push(`comment/${_name}/${_id}`)
    }
}
CommandBar.Comment=Comment
Comment.contextTypes={router:React.PropTypes.object}
Comment.propTypes={
    type:React.PropTypes.func.isRequired,
    model:React.PropTypes.object.isRequired
}

class Share extends Command{
    render(){
        return (<Command label="Share" onSelect={this.onSelect.bind(this)}
            icon={ShareIcon} {...this.props}/>)
    }

    onSelect(){
        var {message}=this.props
        debugger
        if(typeof(message)=='function')
            message=message()
        WeChat.share(message,null,function(reason){
            Messager.error(reason)
        })
    }
}
CommandBar.Share=Share
Share.propTypes={
    message:React.PropTypes.oneOfType(React.PropTypes.object,React.PropTypes.func)
}

class DialogCommand extends Component{
    constructor(props){
        super(props)
        this.state={open:false}
    }
    render(){
        var {open}=this.state
        return (
            <div
                className={`page overlay dialog-command ${open ? "" : "hide"}`}
                onTouchTap={()=>this.dismiss()} >
                <div className="layout">
                    <div className="content"
                        onTouchTap={(e)=>{e.stopPropagation()}}>
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        )
    }

    renderContent(){
        var {children}=this.props
        return children
    }

    componentWillUnmount(){
        if(_current=this)
            _current=null
    }

    show(){
        _current && (_current!=this) && _current.dismiss()
        this.setState({open:true})
        _current=this
    }

    dismiss(){
        if(this.props.onDismiss)
            this.props.onDismiss()

        this.setState({open:false})
        _current=null
    }
}
CommandBar.DialogCommand=DialogCommand

function typedOf(a, type){
    return a instanceof type

    if(typeof(a.type)=='undefined')
        return false;

    if(a.type==type)
        return true;
    var child=a.type
    while(child!=null && typeof(child.__proto__)!='undefined'){
        if(child.__proto__==type)
            return true;
        child=child.__proto__
    }
    return false
}
