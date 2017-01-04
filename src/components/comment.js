import React, {Component, PropTypes} from "react"
import {Avatar, List, ListItem} from "material-ui"
import {connect} from "react-redux"

import {cyan50 as bg} from "material-ui/styles/colors"

import {Service} from '../db/service'
import CommandBar from './command-bar'
import User from '../db/user'
import Comment from '../db/comment'

const DOMAIN="COMMENT"
const ACTION={
    FETCH: (type,_id)=>dispatch=>Comment.of(type).find({parent:_id})
            .fetch(data=>dispatch({type:`@@${DOMAIN}/fetched`,payload:{data,type,_id}}))

    ,CREATE: (type,_id,content)=>dispatch=>{
		content=content.trim()
		if(content.length<2)
			return Promise.reject()
		
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

export const reducer=(state={}, {type, payload})=>{
    switch(type){
    case `@@${DOMAIN}/CLEAR`:
        return {}
    case `@@${DOMAIN}/fetched`:
        return {...state, ...payload}
    case `@@${DOMAIN}/created`:
        return {...state, data:[...(state.data||[]),payload]}
    }
    return state
}

export class CommentUI extends Component{
    componentDidMount(){
        const {dispatch,params:{type,_id}}=this.props
        dispatch(ACTION.FETCH(type,_id))
    }
    componentWillUnmount(){
        this.props.dispatch({type:`@@${DOMAIN}/CLEAR`})
    }
    render(){
        const {data=[],template,dispatch,params:{type,_id}}=this.props
		const {muiTheme:{page: {height}}}=this.context
        let refComment
		return (
            <div className="comment" style={{minHeight:height, backgroundColor:bg}}>
                <List>
                    {data.map(a=>React.createElement(template, {comment:a,key:a._id}))}
                </List>

                <CommandBar
                    className="footbar centerinput"
                    items={[
							{action:"Back", label:"."},
                            (<textarea ref={a=>refComment=a} placeholder="说两句"/>),
                            {
								action:"Save", 
								label:"发布", 
								onSelect:e=>dispatch(ACTION.CREATE(type,_id, refComment.value))
							}
                        ]}
                    />
    		</div>
        )
    }
	
	static contextTypes={
		muiTheme: PropTypes.object
	}

    static defaultProps={
        template: ({comment})=>{
			let name, left, right, text
			const isOwner=comment.author._id==User.current._id;
			if(isOwner){
				left=(<span/>)
				right=(<Avatar src={User.current.thumbnail}/>)
			}else{
				name=(<span style={{fontSize:'x-small'}}>{comment.author.name}</span>)
				left=(<Avatar src={comment.thumbnail}/>)
				right=(<span/>)
			}

			return (
				<ListItem
					key={comment._id}
					style={{paddingTop:10,paddingLeft:62, marginBottom:30}}
					leftAvatar={left}
					rightAvatar={right}
					disabled={true}>
					{name}

					<div style={{paddingRight:5}}>
						<p className={`content ${isOwner?"owner":""}`}>
							<span>{comment.content}</span>
						</p>
					</div>
				</ListItem>
			)
		}
	}
}

export default Object.assign(connect(state=>state.comment)(CommentUI),{reducer})
