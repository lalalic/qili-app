import React, {Component} from 'react'
import {connect} from "react-redux"
import * as QiliApp from "qili"

import {SvgIcon,EnhancedButton,Paper} from 'material-ui'
import {Link} from "react-router"

import RefreshIcon from "material-ui/svg-icons/navigation/refresh"
import DefaultIcon from "material-ui/svg-icons/action/favorite-border"
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import CommentIcon from "material-ui/svg-icons/communication/comment"
import ShareIcon from "material-ui/svg-icons/social/share"
import SaveIcon from "material-ui/svg-icons/content/save"

var _current;

export default class CommandBar extends Component{
    render(){
        const {onSelect=a=>a, className, primary, items=[],dispatch, ...others}=this.props
        return (
            <div className={`commands ${className}`} {...others}>
            {
                items.map((command,i)=>{
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
                        if(!command.label)
                            command.label="后退"
                        command.onSelect=()=>{this.context.router.goBack()}
                    }

                    if(command.action.toLowerCase()=='refresh' && !command.icon){
                        if(!command.label)
                            command.label="更新"
                        command.icon=<RefreshIcon/>
                    }

                    if(command.action.toLowerCase()=='save' && !command.icon){
                        command.icon=<SaveIcon/>
                        if(!command.label)
                            command.label="保存"
                    }


                    return (
                        <CommandBar.Command key={command.action}
                            primary={command.action==primary}
                            onSelect={onSelect} {...command}/>
                    )
                })
            }
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
            const {primary, onSelect, action, label, icon=(<DefaultIcon/>), link, children}=this.props
            var props={}
            if(!link){
				if(primary)
					props.className="primary"

				return (
					<div {...props}>
						<span style={{cursor:'default'}}
							onClick={e=>onSelect(action,e)}>
							<center>{icon}</center>
							<center style={{fontSize:'smaller'}}>{label||action}</center>
						</span>
						{children}
					</div>
				)
			}else{
				return (
					<div {...props}>
						<Link style={{cursor:'default'}} to={link} activeClassName="primary"
							onlyActiveOnIndex={true}
							onClick={e=>onSelect(action,e)}>
							<center>{icon}</center>
							<center style={{fontSize:'smaller'}}>{label||action}</center>
						</Link>
						{children}
					</div>
				)
			}
        }
    }

    static Comment=({toComment, ...props})=>(
		<CommandBar.Command
			label="评论"
			onSelect={toComment}
			icon={<CommentIcon/>}
			{...props}/>
	)
	
    static Share=connect()(class extends Component{
        render(){
            return (<CommandBar.Command
				label="朋友圈"
				onSelect={this.onSelect.bind(this)}
                icon={<ShareIcon/>}
				{...this.props}/>)
        }

        onSelect(){
            var {message, dispatch}=this.props
            if(typeof(message)=='function')
                message=message()
            WeChat.share(message,null,function(reason){
                dispatch(QiliApp.ACTION.MESSAGE({message:reason}))
            })
        }
        static propTypes={message:React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.func])}
    })
}


const Span=props=>(<span {...props}/>)
