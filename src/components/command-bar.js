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
    enhancedBack=false;

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

                if((command.action).toLowerCase()=='back'){
                    if(this.historyLength()<2){
                        command.action='Home'
                        command.icon=HomeIcon
                    }else{
                        command.icon=BackIcon
                    }
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

        ;(function(goBack, histories){
            router.goBack=function(){
                if(histories()<2){
                    this.transitionTo("/")
                    return true
                }

                return goBack.call(this,...arguments)
            }
        })(router.goBack, this.historyLength);
        enhancedBack=true
    }

    historyLength(){
        return History.length
    }
}
CommandBar.contextTypes={router:React.PropTypes.func}


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
        this.context.router.transitionTo("comment",{type:_name,_id:_id})
    }
}
CommandBar.Comment=Comment
Comment.contextTypes={router:React.PropTypes.func}
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
        var children=this.renderContent()
        return (
            <Overlay
                className="dialog-command"
                show={this.state.open}
                autoLockScrolling={true}
                onTouchTap={()=>this.dismiss()} >
                <div className="layout">
                    <div className="content"
                        onTouchTap={(e)=>{e.stopPropagation()}}>
                        {children}
                    </div>
                </div>
            </Overlay>
        )
    }

    renderContent(){
        var {children}=this.props
        return children
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
