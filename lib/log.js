var {React, Component, UI:{CommandBar, List, Messager, Icons: {Message: {Http, Error, Warning, All}}}}=require('.'),
    App=require('./db/app'),
    {FontIcon}=require('material-ui');

var levels={
	warning:2,
	error:3,
	http:9,
	all:null,
    "9":"http",
    "3":"error",
    "2":"warning",
    "1":"info"
}
export default class Main extends Component{
    componentWillReceiveProps(newProps){
        if(this.props.app!=newProps.app)
            this.forceUpdate()
    }
   render(){
        var {level}=this.props.params
		    level=level ? levels[level] : null
        return(
            <div>
                <List model={App.getLog(level ? {level} : undefined)} template={ALog}/>

                <CommandBar className="footbar" style={{textAlign:'left'}}
                    onSelect={(cmd)=>this.context.router.replaceWith("log",cmd=='All' ? null : {level:cmd.toLowerCase()})}
                    items={[{action:"Back"},
                        {action:"Http", icon:Http},
                        {action:"Error", icon:Error},
                        {action:"Warning", icon:Warning},
                        {action:"All", icon:All}
                    ]}/>
            </div>
        )
    }
}

Main.contextTypes={router: React.PropTypes.func}

{/*
(<Level ref="level" label="Level"
	self={()=>this.refs.level}
	value={level}
	onChange={(level)=>this.setState({level})} />)
*/}

class Level extends CommandBar.DialogCommand{
    renderContent(){
        var {onChange, value}=this.props,
            items="info,warning,error,http".split(",").map(function(a){
                return (<List.Item key={a} primaryText={a}
                            leftIcon={<FontIcon className={`mui-font-icon icon-${a}`}/>}
                            onClick={()=>onChange(a)}/>)
            })

        return (<List>{items}</List>)
    }
}

class ALog extends Component{
    render(){
        var {model:log}=this.props
        return (<List.Item primaryText={`${levels[log.level+""]} on ${log.createdAt}`} secondaryText={log.message}/>)
    }
}
