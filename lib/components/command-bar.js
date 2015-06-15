var React=require('react/addons'),
    {Component}=React,
    {FlatButton}=require('material-ui');

export default class CommandBar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var {onSelect, primary, className, ...others}=this.props
        var i=0,
            commands=this.props.items.map(function(command){
            switch(typeof(command)){
            case 'string':
                return (
                    <div key={command}>
                        <FlatButton
                            centerRipple={false}
    						disableFocusRipple={true}
                            disableTouchRipple={true}
                            primary={command==primary}
                            onClick={(e)=>onSelect(command,e)}
    						label={command}/>
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
            <div className={className ? className+" commands" : "commands"} {...others}>
                {commands}
            </div>
        )
    }
}
