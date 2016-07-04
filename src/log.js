var {React, Component, UI:{CommandBar, List, Empty}}=require('.'),
    App=require('./db/app'),
    {FontIcon}=require('material-ui');

import Http from "material-ui/svg-icons/action/http"
import Error from "material-ui/svg-icons/alert/error"
import Warning from "material-ui/svg-icons/alert/warning"
import All from "material-ui/svg-icons/action/assignment"

const levels={
    	warning:2,
    	error:3,
    	http:9,
    	all:null,
        "9":"http",
        "3":"error",
        "2":"warning",
        "1":"info"
    }
const Icons={Http, Error, Warning, All}

export default class Log extends Component{
    state={logs:null}
    
	getData(level){
		this.setState({logs:App.getLog(levels[level])})
	}
	
    componentDidMount(){
        this.getData(this.props.params.level)
    }

    componentWillReceiveProps(nextProps, nextContext){
		if(this.context.app!=nextContext.app)
			this.getData(this.props.params.level)
		else if(this.props.params.level!=nextProps.params.levle)
			this.getData(nextProps.params.level)
    }

    render(){
        return(
            <div>
                <List model={this.state.logs} template={this.constructor.ALog}/>

                <CommandBar className="footbar"
                    onSelect={level=>this.context.router.push(`log/${level}`)}
                    primary={this.props.params.level}
                    items={[
						{action:"Back"},
                        {action:"http", icon:Http},
                        {action:"error", icon:Error},
                        {action:"warning", icon:Warning},
                        {action:"all", icon:All}
                    ]}/>
            </div>
        )
    }
	
	static contextTypes={
		router:React.PropTypes.object,
		app: React.PropTypes.object
	}
	
	static ALog=class extends Component{
		render(){
			var {model:log}=this.props
			return (<List.Item primaryText={`${levels[log.level+""]} on ${log.createdAt}`} secondaryText={log.message}/>)
		}
	}
}


