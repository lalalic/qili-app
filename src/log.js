import React,{Component} from "react"
import {List, ListItem} from 'material-ui'
import {connect} from "react-redux"

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
const DOMAIN="ui.log"

export const ACTION={
	FETCH:level=>dispatch=>dbApplication.getLog(LEVEL[level]).then(logs=>dispatch(ACTION.FETCHED(logs)))
	,FETCHED: logs=>({type:`@@${DOMAIN}/fetched`,payload:logs})
}

export const REDUCER={
    [DOMAIN]:(state={logs:[]},{type,payload})=>{
		switch(type){
		case `@@${DOMAIN}/fetched`:
		return {logs:payload}
		
		}
        return state
    }
}

export const Log=connect(state=>state[DOMAIN])(
class extends Component{
	componentDidMount(){
		const {dispatch,params:{level}}=this.props
		dispatch(ACTION.FETCH(level))
	}
	
	componentWillReceiveProps(next){
		if(next.params.level!==this.props.params.level)
			next.dispatch(ACTION.FETCH(next.params.level))
	}
	render(){
		const {logs,router,params:{level},dispatch}=this.props
		return (
			<div>
				<List>
					{logs.map(({_id,level,createdAt,message})=>
						(<ListItem key={_id} primaryText={`${LEVEL[level+""]} on ${createdAt}`} secondaryText={JSON.stringify(message)}/>)
					)}
				</List>

				<CommandBar className="footbar" dispath={dispatch}
					onSelect={level=>router.replace(`/log/${level}`)}
					primary={level}
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
})
export default Object.assign(Log,{ACTION,REDUCER})
