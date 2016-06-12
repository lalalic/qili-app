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
    constructor(p){
        super(p)
        this.state={logs:null}
    }

    componentDidMount(){
        this.setState({logs:App.getLog(this._level())})
    }

    _level(props){
        var {level}=(props||this.props)['params']
		return levels[level]
    }

    componentWillReceiveProps(nextProps){
        if(this.props.app!=nextProps.app)
            return this.setState({logs:App.getLog(this._level())})

        var {level:nextLevel}=nextProps.params,
            {level}=this.props.params
        if(level!=nextLevel)
            this.setState({logs:App.getLog(this._level(nextProps))})
    }

    render(){
        var {level}=this.props.params
        level=level.charAt(0).toUpperCase()+level.substr(1)
        var Icon=Icons[level]
        return(
            <div>
                <List model={this.state.logs}
                    empty={<Empty icon={<Icon/>} text=""/>}
                    template={ALog}/>

                <CommandBar className="footbar" style={{textAlign:'left'}}
                    onSelect={(a)=>this.onSelect(a)}
                    primary={level}
                    items={[{action:"Back"},
                        {action:"Http", icon:Http},
                        {action:"Error", icon:Error},
                        {action:"Warning", icon:Warning},
                        {action:"All", icon:All}
                    ]}/>
            </div>
        )
    }

    onSelect(level){
        this.context.router.replace(`log/${level.toLowerCase()}`)
    }
}

Log.contextTypes={router:React.PropTypes.object}

class ALog extends Component{
    render(){
        var {model:log}=this.props
        return (<List.Item primaryText={`${levels[log.level+""]} on ${log.createdAt}`} secondaryText={log.message}/>)
    }
}
