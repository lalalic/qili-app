var {React, Component, UI:{CommandBar, List, Messager}}=require('.'),
    App=require('./db/app'),
    {FontIcon}=require('material-ui');

import Http from "material-ui/lib/svg-icons/action/http"
import Error from "material-ui/lib/svg-icons/alert/error"
import Warning from "material-ui/lib/svg-icons/alert/warning"
import All from "material-ui/lib/svg-icons/action/assignment"

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
export default class Log extends Component{
    componentWillReceiveProps(newProps){
        if(this.props.app!=newProps.app)
            this.forceUpdate()
    }
   render(){
        var {level}=this.props.params
		    level=level ? levels[level] : null
        return(
            <div>
                <List model={App.getLog(level)} template={ALog}/>

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

Log.contextTypes={router: React.PropTypes.func}

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
