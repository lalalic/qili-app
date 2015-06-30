var React=require('react/addons'),
    {Component}=React,
    {History}=require('react-router'),
    {FontIcon,EnhancedButton}=require('material-ui'),
    enhancedBack=false;

function enhanceBack(router){
    if(enhancedBack || !router)
        return

    var goBack=router.goBack
    router.goBack=function(){
        var done=goBack.apply(router)
        if(!done)
            this.transitionTo("/")
        return true
    }
    enhancedBack=true
}

export default class Main extends Component{
    constructor(props){
        super(props)
    }

    render(){
        enhanceBack(this.context.router)
        var {onSelect, primary, className, ...others}=this.props
        var i=0,
            commands=this.props.items.map(function(command){
                switch(typeof(command)){
                case 'string':
                    var iconName=command.toLowerCase(),
                        label=command;
                    if(iconName=='back' && History.length<2){
                        iconName='home'
                        label='Home'
                    }

                    return (
                        <div key={command}>
                            <a style={{cursor:'default'}} onClick={(e)=>onSelect(command,e)}>
                                <center><FontIcon className={`mui-font-icon icon-${iconName}`}/></center>
                                <center style={{fontSize:'smaller'}}>{label}</center>
                            </a>
                        </div>
                    )
                default:
                    return (
                        <div key={i++}>
                            {command}
                        </div>
                    )
                }
        })

        return (
            <div className={`commands ${className}`} {...others}>
                {commands}
            </div>
        )
    }
}
Main.contextTypes={router:React.PropTypes.func}
