var React=require('react/addons'),
    {Component}=React,
    {FlatButton}=require('material-ui');

export default class CommandBar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var {onCommand, primary}=this.props
        var commands=this.props.items.map(function(command){
            return (
                <div key={command}>
                    <FlatButton centerRipple={false}
						disableFocusRipple={true}
                        disableTouchRipple={true}
                        primary={command==primary}
                        onTouchTap={(e)=>(typeof(e.resolved)=='undefined')&&(e.resolved=1,onCommand(command,e))}
						label={command}/>
                </div>
            )
        })

        return (
            <div className="commands" style={this.props.style}>
                {commands}
            </div>
        )
    }
}
