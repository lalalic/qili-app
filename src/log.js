import React,{Component} from "react"
import {List, ListItem} from 'material-ui'

import Http from "material-ui/svg-icons/action/http"
import Error from "material-ui/svg-icons/alert/error"
import Warning from "material-ui/svg-icons/alert/warning"
import All from "material-ui/svg-icons/action/assignment"

import {UI} from "."
import App from './db/app'

const {CommandBar, List, Empty}=UI
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
const DOMAIN="ui.log"
export const ACTION={

}

export const REDUCER={
    [DOMAIN]:(state={},action)=>{
        if(action.domain==DOMAIN){
            switch(action.type){
                
            }
        }
        return state
    }
}

export const Log=connect(state=>state[DOMAIN])(
    ({logs,router})=>(
        <div>
            <List>
                {logs.map(({level,createdAt,message})=>
                    (<ListItem primaryText={`${levels[level+""]} on ${createdAt}`} secondaryText={message}/>)
                )}
            </List>

            <CommandBar className="footbar"
                onSelect={level=>router.push(`log/${level}`)}
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
)
export default Log
