import React, {Component} from "react"
import {Avatar, List, ListItem} from "material-ui"
import {connect} from "react-redux"

import {Service} from '../db/service'
import CommandBar from './command-bar'
import User from '../db/user'
import Comment from '../db/comment'

const DOMAIN="COMMENT"
const INIT_STATE={}
export const ACTION={
    FETCH: (type,_id)=>dispatch=>Comment.of(type).find({parent:_id})
            .fetch(data=>dispatch({type:`@@${DOMAIN}/fetched`,data,type,_id}))

    ,CREATE: (type,_id,content)=>diapatch=>{
        const user=User.current
        const comment={
                type,
                parent:_id,
                thumbnail:user.thumbnail,
                content:content
            }
        return Comment.of(type).upsert(comment)
            .then(a=>dispatch({type:`@@${DOMAIN}/created`,payload:a}))
    }
}

export const REDUCER={
    [DOMAIN]: (state=INIT_STATE, {type, payload})=>{
        switch(type){
        case `@@${DOMAIN}/CLEAR`:
            return INIT_STATE
        case `@@${DOMAIN}/fetched`:
            return payload
        case `@@${DOMAIN}/created`:
            const {type,_id,data}=state
            return {type,_id, data:new Array(...data,payload)}
        }
        return state
    }
}

export const CommentUI=connect()(
class extends Component{
    componentDidMount(){
        const {dispatch,params:{type,_id}}=this.props
        dispatch(ACTION.FETCH(type,_id))
    }
    componentWillUnmount(){
        this.props.dispatch({type:`@@${DOMAIN}/CLEAR`})
    }
    render(){
        const {data,template,dispatch,params:{type,_id}}=this.props
        let refComment
		return (
            <div className="comment">
                <List>
                    {data.maps(a=><template model={a}/>)}
                </List>

                <CommandBar
                    className="footbar centerinput"
                    items={[
                            "Back",
                            (<textarea ref={a=>refComment=a}
                                placeholder="give some comment:140"
                                maxLength={140}/>),
                            {action:"Save", onSelect:e=>(e=refComment.value.trim())&&dispatch(ACTION.CREATE(type,_id, e)).then(a=>refComment.value="")}
                        ]}
                    />
    		</div>
        )
    }
})

CommentUI.defaultProps={
    template: ({model})=>{
        let name, left, right, text
        const isOwner=model.author._id==User.current._id;
        if(isOwner){
            left=(<span/>)
            right=(<Avatar src={User.current.thumbnail}/>)
        }else{
            name=(<span style={{fontSize:'x-small'}}>{model.author.name}</span>)
            left=(<Avatar src={model.thumbnail}/>)
            right=(<span/>)
        }

        return (
            <ListItem
                key={model._id}
                style={{paddingTop:10,paddingLeft:62}}
                leftAvatar={left}
                rightAvatar={right}
                disableTouchTap={true}>
                {name}

                <div style={{paddingRight:5}}>
                    <p className={`content ${isOwner?"owner":""}`}>
                        <span>{model.content}</span>
                    </p>
                </div>
            </ListItem>
        )
    }
}

export default Object.assign(CommentUI,{ACTION,REDUCER})
