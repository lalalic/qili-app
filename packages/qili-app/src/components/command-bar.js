import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {ACTION} from "../state"

import {SvgIcon,EnhancedButton,Paper} from 'material-ui'

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
                        <CommandBar.Command
                            key={command.action}
                            primary={command.action==primary}
                            onSelect={onSelect} {...command}/>
                    )
                })
            }
            </div>
        )
    }
    static contextTypes={router:PropTypes.object}

    static Command=class extends Component{
        render(){
            const {primary, onSelect, action, label, icon=(<DefaultIcon/>), link, children, style={}}=this.props
            let props={style}
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
                const {Link}=require("react-router")
				return (
					<div {...props} >
						<Link
                            style={{cursor:'default'}}
                            to={link}
                            activeClassName="primary"
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
                dispatch(ACTION.MESSAGE({message:reason}))
            })
        }
        static propTypes={message:PropTypes.oneOfType([PropTypes.object,PropTypes.func])}
    })
}


const Span=props=>(<span {...props}/>)
