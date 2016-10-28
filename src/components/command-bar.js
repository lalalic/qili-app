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

var _current;

export default class CommandBar extends Component{
    render(){
        var {onSelect, className, primary, items=[],...others}=this.props,
            i=0,
            commands=items.map((command)=>{
                if(command instanceof CommandBar.Command)
                    return command

                if(command instanceof CommandBar.DialogCommand)
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
                    command.icon=<BackIcon/>
                    command.onSelect=()=>{this.context.router.goBack()}
                }

                if(command.action.toLowerCase()=='refresh' && !command.icon)
                    command.icon=<RefreshIcon/>

                if(command.action.toLowerCase()=='save' && !command.icon)
                    command.icon=<SaveIcon/>

                return (
                    <CommandBar.Command key={command.action}
                        primary={command.action==primary}
                        onSelect={onSelect} {...command}/>
                )
            })

        return (
            <div className={`commands ${className}`} {...others}>
                {commands}
            </div>
        )
    }
    static contextTypes={router:React.PropTypes.object}

    static DialogCommand=class extends Component{
        constructor(props){
            super(props)
            this.state={open:false}
        }
        render(){
            var {open}=this.state
            return (
                <div
                    className={`page dialog-command ${open ? "" : "hide"}`}
                    onTouchTap={()=>this.dismiss()} >
                    <div className="page overlay"/>
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

    static Command=class extends Component{
        render(){
            var {primary, onSelect, action, label, icon:Icon=(<DefaultIcon/>), children}=this.props
            var props={}
            if(primary)
                props.className="primary"
            return (
                <div {...props}>
                    <a style={{cursor:'default'}}
                        onClick={(e)=>onSelect(action,e)}>
                        <center>{React.isValidElement(Icon) ? Icon : (<Icon/>)}</center>
                        <center style={{fontSize:'smaller'}}>{label||action}</center>
                    </a>
                    {children}
                </div>
            )
        }
    }

    static Comment=class extends Component{
        render(){
            return (<CommandBar.Command label="Comment" onSelect={()=>this.onSelect()}
                icon={CommentIcon} {...this.props}/>)
        }

        onSelect(){
            var {type:{_name}, model:{_id}}=this.props
            this.context.router.push(`comment/${_name}/${_id}`)
        }

        static contextTypes={router:React.PropTypes.object}
        static propTypes={
            type:React.PropTypes.func.isRequired,
            model:React.PropTypes.object.isRequired
        }
    }
    static Share=class extends Component{
        render(){
            return (<CommandBar.Command label="Share" onSelect={this.onSelect.bind(this)}
                icon={ShareIcon} {...this.props}/>)
        }

        onSelect(){
            var {message}=this.props
            if(typeof(message)=='function')
                message=message()
            WeChat.share(message,null,function(reason){
                Messager.error(reason)
            })
        }
        static propTypes={message:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.func])}
    }
}
