import React, {Component, PropTypes} from "react"
import {Avatar, List, ListItem} from "material-ui"
import {connect} from "react-redux"

import TextField from 'material-ui/TextField'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'

import {cyan50 as bg} from "material-ui/styles/colors"
import IconCamera from 'material-ui/svg-icons/image/photo-camera'
import IconSave from "material-ui/svg-icons/content/save"
import IconEmptyComment from "material-ui/svg-icons/editor/mode-comment"

import {select as selectImageFile} from "./file-selector"

import {Service} from '../db/service'
import CommandBar from './command-bar'
import User from '../db/user'
import Comment from '../db/comment'
import File from "../db/file"
import Empty from "./empty"

export const DOMAIN="COMMENT"
export const ACTION={
    FETCH: (type,_id)=>dispatch=>Comment.of(type).find({parent:_id})
            .fetch(data=>dispatch({type:`@@${DOMAIN}/fetched`,payload:{data,type,_id}}))

    ,CREATE: (type,id,content,props={})=>dispatch=>{
		content=content.trim()
		if(content.length<2)
			return Promise.reject()

        const user=User.current
        const comment={
                ...props,
                type,
                parent:id,
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
    state={comment:""}
    componentDidMount(){
        const {dispatch,params:{type,_id}}=this.props
        dispatch(ACTION.FETCH(type,_id))
    }
    componentWillUnmount(){
        this.props.dispatch({type:`@@${DOMAIN}/CLEAR`})
    }
    render(){
        const {data=[],template,dispatch,params:{type,_id},hint="说两句", system}=this.props
		const {muiTheme:{page: {height}}}=this.context
        const {comment}=this.state
		const create=()=>dispatch(ACTION.CREATE(type,_id, comment)).then(a=>this.setState({comment:""}))
        let save={
            action:"Save",
            label:"发布",
            icon: <IconSave/>,
            onSelect:create
        }
        let photo={
            action:"photo",
            label:"照片",
            icon: <IconCamera/>,
            onSelect:e=>selectImageFile()
                .then(url=>File.upload(url))
                .then(url=>dispatch(ACTION.CREATE(type,_id,url,{content_type:"photo"})))
        }

        let action=photo

        if(comment.trim())
            action=save

		return (
            <div className="comment" style={{minHeight:height, backgroundColor:bg}}>
                <div>
                    {data.map(a=>React.createElement(template, {comment:a,key:a._id, system}))}
                </div>

                <CommandBar
                    className="footbar centerinput"
                    primary="Save"
                    items={[
							{action:"Back"},
                            (<textarea placeholder={hint} value={comment}
								onKeyDown={({keyCode})=>keyCode==13 && create()}
                                onChange={e=>{
                                    this.setState({comment:e.target.value})
                                    e.preventDefault()
                                }}/>),
                            action
                        ]}
                    />
    		</div>
        )
    }

	static contextTypes={
		muiTheme: PropTypes.object
	}

    static defaultProps={
        systemThumbnail:null,
        template: ({comment, system={}})=>{
			let name, left, right, text
			const isOwner=comment.author._id==User.current._id
            if(comment.system){
                name=(<span style={{fontSize:'x-small'}}>{system.name}</span>)
				left=(<Avatar src={system.thumbnail}/>)
				right=(<span/>)
            }else if(isOwner){
				left=(<span/>)
				right=(<Avatar src={User.current.thumbnail}/>)
			}else{
				name=(<span style={{fontSize:'x-small'}}>{comment.author.name}</span>)
				left=(<Avatar src={comment.thumbnail}/>)
				right=(<span/>)
			}

			return (
				<div key={comment._id} className="acomment" style={{padding:5}}>
					<div style={{width:40,minHeight:40,verticalAlign:"top"}}>{left}</div>
					<div style={{padding:5,verticalAlign:"top"}}>
                        <div>{name}</div>
						<p className={`content ${!comment.system&&isOwner?"owner":""}`}>
                        {
                            ((content,type)=>{
                                switch(type){
                                case "photo":
                                    return <img src={content} style={{width:150}}/>
                                default:
                                    return <span>{content}</span>
                                }
                            })(comment.content,comment.content_type)
                        }
						</p>
					</div>
                    <div style={{width:40,minHeight:40,verticalAlign:"top"}}>{right}</div>
				</div>
			)
		}
	}
}

export class Inline extends Component{
	componentDidMount(){
        const {dispatch,kind:{_name},model:{_id}}=this.props
        dispatch(ACTION.FETCH(_name,_id))
    }
    componentWillUnmount(){
        this.props.dispatch({type:`@@${DOMAIN}/CLEAR`})
    }

	render(){
		const {data=[],template, emptyIcon, 
			dispatch,kind:{_name},model:{_id},
			commentable=true,
			hint="说两句", empty}=this.props

		let content=null
		if(data.length){
			content=(
				<div>
					{data.map(a=>React.createElement(template, {comment:a,key:a._id}))}
				</div>
			)
		}else{
			content=<Empty text={empty||"当前还没有评论哦"} icon={emptyIcon}/>
		}
		let editor=null
		if(commentable)
			editor=(<Editor type={_name} _id={_id} dispatch={dispatch} hint={hint}/>)
		return (
            <div className="comment inline">
				{editor}
				{content}
    		</div>
        )
	}

	static defaultProps={
		template:CommentUI.defaultProps.template,
		emptyIcon:<IconEmptyComment/>
	}
}


class Editor extends Component{
	state={
		comment:""
	}
	render(){
		const {comment}=this.state
        const {hint}=this.props
		let action=null
		if(comment){
			action=<IconButton onTouchTap={this.save.bind(this)}><IconSave/></IconButton>
		}else{
			action=<IconButton onTouchTap={this.photo.bind(this)}><IconCamera/></IconButton>
		}
		return (
			<Toolbar noGutter={true} className="grid"
				style={{backgroundColor:"transparent"}}>
				<ToolbarGroup style={{display:"table-cell",width:"100%"}}>
					<TextField value={comment}
						onChange={(e,comment)=>this.setState({comment})}
						onKeyDown={({keyCode})=>keyCode==13 && this.save()}
						hintText={hint}
						fullWidth={true}/>
				</ToolbarGroup>
				<ToolbarGroup style={{width:40}}>
					{action}
				</ToolbarGroup>
			</Toolbar>
		)
	}

	save(){
		const {type, _id,dispatch}=this.props
		const {comment}=this.state
		dispatch(ACTION.CREATE(type,_id, comment))
			.then(a=>this.setState({comment:""}))
	}

	photo(){
		const {type, _id,dispatch}=this.props
		const {comment}=this.state
		selectImageFile()
			.then(url=>File.upload(url))
			.then(url=>dispatch(ACTION.CREATE(type,_id,url,{content_type:"photo"})))
	}
}

export default Object.assign(connect(state=>state.comment)(CommentUI),{
	reducer,
	Inline: connect(state=>state.comment)(Inline)
})
