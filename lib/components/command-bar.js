var React=require('react/addons'),
    {Component}=React,
    {History}=require('react-router'),
    {FontIcon,EnhancedButton}=require('material-ui'),
    DialogCommand=require('./dialog-command'),
    enhancedBack=false;

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
            commands=this.props.items.map(function(command){
                var dialog, onCommandSelect=onSelect;
                if(DialogCommand.is(command)){
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
                                onClick={(e)=>!this.closeDialogCommand(e) && onCommandSelect(command,e)}>
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
