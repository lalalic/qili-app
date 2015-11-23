var React=require('react'),
    {Component}=React,
    {History}=require('react-router'),
    {SvgIcon,EnhancedButton}=require('material-ui'),
    RefreshIcon=require("material-ui/lib/svg-icons/navigation/refresh"),
    DefaultIcon=require("material-ui/lib/svg-icons/action/favorite-border"),
    HomeIcon=require("material-ui/lib/svg-icons/action/Home"),
    BackIcon=require("material-ui/lib/svg-icons/hardware/keyboard-arrow-left"),
    CommentIcon=require("material-ui/lib/svg-icons/communication/comment"),
    ShareIcon=require("material-ui/lib/svg-icons/social/share"),
    SaveIcon=require("material-ui/lib/svg-icons/content/save"),
    Overlay=require('material-ui/lib/overlay'),
    Messager=require('./messager'),
    {Before:BackIcon, Home:HomeIcon}=require('../icons/navigate'),
    enhancedBack=false;

var _current;

export default class Main extends Component{
    render(){
        enhanceBack(this.context.router)
        var {onSelect, className, primary, ...others}=this.props,
            i=0,
            commands=this.props.items.map((command)=>{
                if(typedOf(command, Command))
                    return command

                if(typedOf(command, DialogCommand))
                    throw new Error("Not support DialogCommand")

                if(React.isValidElement(command)){
                    return (
                        <div key={i++}>
                            {command}
                        </div>
                    )
                }

                if(typeof(command)=='string')
                    command={action:command}

                if((command.action).toLowerCase()=='back'){
                    if(History.length<2){
                        command.action='Home'
                        command.icon=HomeIcon
                    }else{
                        command.icon=BackIcon
                    }
                    command.onSelect=()=>this.context.router.goBack()
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
}
Main.contextTypes={router:React.PropTypes.func}


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

class Comment extends Command{
    render(){
        return (<Command label="Comment" onSelect={this.onSelect.bind(this)}
            icon={CommentIcon} {...this.props}/>)
    }

    onSelect(){
        var {type:{_name}, model:{_id}}=this.props
        this.context.router.transitionTo("comment",{type:_name,_id:_id})
    }
}
Main.Comment=Comment
Comment.contextTypes={router:React.PropTypes.func}

class Share extends Command{
    render(){
        return (<Command label="Share" onSelect={this.onSelect.bind(this)}
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
}
Main.Share=Share
Share.propTypes={
    message:React.PropTypes.object.isRequired
}

class DialogCommand extends Component{
    constructor(props){
        super(props)
        this.state={open:false}
    }
    render(){
        var children=this.renderContent()
        return (
            <Overlay
                className="dialog-command"
                show={this.state.open}
                autoLockScrolling={true}
                onTouchTap={this.dismiss.bind(this)} >
                <div className="layout">
                    <div className="content"
                        onTouchTap={(e)=>e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </Overlay>
        )
    }

    renderContent(){
        return null
    }

    show(){
        _current && _current.dismiss()
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
Main.DialogCommand=DialogCommand

function enhanceBack(router){
    if(enhancedBack || !router)
        return

    var goBack=router.goBack
    router.goBack=function(){
        if(History.length<2){
            this.transitionTo("/")
            return true
        }

        return goBack.apply(router)
    }
    enhancedBack=true
}

function typedOf(a, type){
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
