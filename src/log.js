import React,{Component, PropTypes} from "react"
import {List, ListItem} from 'material-ui'

import Http from "material-ui/svg-icons/action/http"
import Error from "material-ui/svg-icons/alert/error"
import Warning from "material-ui/svg-icons/alert/warning"
import All from "material-ui/svg-icons/action/assignment"

import {UI} from "."
import dbApplication from './db/app'

const {CommandBar, Empty}=UI

const LEVEL={
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
export const DOMAIN="ui.log"
const INIT_STATE={logs:[]}
export const ACTION={
	FETCH:level=>dispatch=>dbApplication.getLog(LEVEL[level]).then(logs=>dispatch(ACTION.FETCHED(logs)))
	,FETCHED: logs=>({type:`@@${DOMAIN}/fetched`,payload:logs})
}

export const REDUCER=(state=INIT_STATE,{type,payload})=>{
	switch(type){
	case `@@${DOMAIN}/fetched`:
	return {logs:payload}
    case `@@${DOMAIN}/CLEAR`:
    return INIT_STATE
	}
    return state
}

export class Log extends Component{
	componentDidMount(){
		const {dispatch,params:{level}}=this.props
		dispatch(ACTION.FETCH(level))
	}

	componentWillReceiveProps(next){
		if(next.params.level!==this.props.params.level)
			next.dispatch(ACTION.FETCH(next.params.level))
	}
    componentWillUnmount(){
        this.props.dispatch({type:`@@${DOMAIN}/CLEAR`})
    }
	render(){
		const {logs,params:{level},dispatch}=this.props
        const {router}=this.context
		return (
			<div>
				<List>
					{logs.map(({_id,level,createdAt,message})=>
						(<ListItem key={_id} primaryText={`${LEVEL[level+""]} on ${createdAt}`} secondaryText={JSON.stringify(message)}/>)
					)}
				</List>

				<CommandBar className="footbar" dispatch={dispatch}
					onSelect={level=>router.replace(`/log/${level}`)}
					primary={level}
					items={[
						{action:"Back"},
						{action:"http", icon:<Http/>},
						{action:"error", icon:<Error/>},
						{action:"warning", icon:<Warning/>},
						{action:"all", icon:<All/>}
					]}/>
			</div>
		)
	}
}
Log.contextTypes={router:PropTypes.object}

export default Object.assign(Log,{DOMAIN,ACTION,REDUCER})
