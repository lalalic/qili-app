var React=require('react/addons'),
    {Component}=React,
    {History}=require('react-router'),
    {FontIcon,EnhancedButton}=require('material-ui'),
    Overlay=require('material-ui/lib/overlay'),
    Messager=require('./messager'),
    enhancedBack=false;

export default class Main extends Component{
    constructor(props){
        super(props)
        this._dialog=null
    }

    closeDialogCommand(e){
        if(!this._dialog)
            return false;

        this._dialog.dismiss()
        this._dialog=null
        e.preventDefault()
        e.stopPropagation()
        return true
    }

    render(){
        enhanceBack(this.context.router)
        var {onSelect, className, ...others}=this.props
        var i=0,
            closeDialogCommand=this.closeDialogCommand.bind(this),
            commands=this.props.items.map(function(command){
                if(!command)
                    return null

                if(typedOf(command, Command))
                    return React.cloneElement(command,{closeDialogCommand:closeDialogCommand})

                var dialog, onCommandSelect=onSelect;
                if(typedOf(command, DialogCommand)){
                    dialog=command
                    var {onDismiss}=dialog.props

                    dialog=React.cloneElement(dialog,{onDismiss:function(){
                        this._dialog=null
                        onDismiss && onDismiss()
                    }.bind(this)})

                    command=dialog.props.label
                    onCommandSelect=function(){
                        this._dialog=dialog.props.self()
                        this._dialog.show()
                    }.bind(this)
                }

                switch(typeof(command)){
                case 'string':
                    var iconName=command.toLowerCase(),
                        label=command;
                    if(iconName=='back'){
                        if(History.length<2){
                            iconName='home'
                            label='Home'
                        }
                        onCommandSelect=function(){
                            this.context.router.goBack()
                        }.bind(this)
                    }

                    return (
                        <div key={command}>
                            <a style={{cursor:'default'}}
                                onClick={(e)=>!closeDialogCommand(e) && onCommandSelect(command,e)}>
                                <center><FontIcon className={`mui-font-icon icon-${iconName}`}/></center>
                                <center style={{fontSize:'smaller'}}>{label}</center>
                            </a>
                            {dialog}
                        </div>
                    )
                default:
                    return (
                        <div key={i++}>
                            {command}
                        </div>
                    )
                }
        }.bind(this))

        return (
            <div className={`commands ${className}`} {...others}>
                {commands}
            </div>
        )
    }
}
Main.contextTypes={router:React.PropTypes.func}


class Command extends Component{
}

class Comment extends Command{
    render(){
        var {closeDialogCommand}=this.props
        return (
                <div>
                    <a style={{cursor:'default'}}
                        onClick={(e)=>!closeDialogCommand(e) && this.onSelect()}>
                        <center><FontIcon className={`mui-font-icon icon-comment`}/></center>
                        <center style={{fontSize:'smaller'}}>Comment</center>
                    </a>
                </div>
            )
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
        var {closeDialogCommand}=this.props
        return (
                <div>
                    <a style={{cursor:'default'}}
                        onClick={(e)=>!closeDialogCommand(e) && this.onSelect()}>
                        <center><FontIcon className={`mui-font-icon icon-share`}/></center>
                        <center style={{fontSize:'smaller'}}>Share</center>
                    </a>
                </div>
            )
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
    message:React.PropTypes.func.isRequired
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
                <div className="content"
                    onTouchTap={(e)=>e.stopPropagation()}>
                    {children}
                </div>
            </Overlay>
        )
    }

    renderContent(){
        return null
    }

    show(){
        this.setState({open:true})
    }

    dismiss(){
        if(this.props.onDismiss)
            this.props.onDismiss()

        this.setState({open:false})
    }
}
Main.DialogCommand=DialogCommand
DialogCommand.propTypes={
    label:React.PropTypes.string.isRequired,
    self:React.PropTypes.func.isRequired
}


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
