import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {compose,mapProps,getContext} from "recompose"
import {withMutation} from "../tools/recompose"

import {Avatar, List, ListItem} from "material-ui"
import {connect} from "react-redux"

import TextField from 'material-ui/TextField'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import {cyan50 as bg} from "material-ui/styles/colors"
import IconCamera from 'material-ui/svg-icons/image/photo-camera'
import IconSave from "material-ui/svg-icons/content/save"
import IconEmptyComment from "material-ui/svg-icons/editor/mode-comment"
import PullToRefresh from "pull-to-refresh2"

import file from "./file"
import CommandBar from './command-bar'
import Empty from "./empty"

import {createPaginationContainer} from "react-relay"

function smartFormat(d){
	let now=new Date()
	switch(d.relative(now)){
	case 0:
		return d.format("HH:mm")
	case -1:
		return d.format("昨天 HH:mm")
	default:
		if(now.getFullYear()==d.getFullYear())
			return d.format("MM月DD日 HH:mm")
		else
			return d.format("YYYY年MM月DD日 HH:mm")
	}
}

export class Comment extends Component{
	static propTypes={
		data: PropTypes.arrayOf(PropTypes.object).isRequired,
		commentText: PropTypes.func,
		commentPhoto: PropTypes.func,
		loadMore: PropTypes.func,
		minHeight: PropTypes.number,
	}
	first=true
    state={comment:""}
    componentDidMount(){
		if(this.end && this.first){
			this.end.scrollIntoView({ behavior: "smooth" })
			this.first=false
		}
    }
	componentDidUpdate(prevProps, prevState){
		if(this.end && this.first){
			this.end.scrollIntoView({ behavior: "smooth" })
			this.first=false
		}
	}
    render(){
        const {data, commentText, commentPhoto, template,loadMore,hint="说两句", system,minHeight}=this.props
		const {comment}=this.state
        const create=()=>commentText({content:comment}).then(a=>this.setState({comment:""}))

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
            onSelect:commentPhoto
        }

        let action=photo

        if(comment.trim())
            action=save

		return (
            <div className="comment" style={{minHeight, backgroundColor:bg}}>
                <PullToRefresh onRefresh={loadMore}>
                    {data.reduce((state,a,i)=>{
							let createdAt=new Date(a.createdAt)
							let {comments,last}=state
							let props={comment:a,key:i, system}
							if(!last || (createdAt.getTime()-last.getTime())>1000*60){
								props.time=createdAt
							}
							comments.push(React.createElement(template, props))
							state.last=createdAt
							return state
						},{comments:[]}).comments
					}
                </PullToRefresh>


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
        template: ({comment, system={}, time})=>{
			let name, left, right, text
            if(comment.system){
                name=(<span style={{fontSize:'x-small'}}>{system.name}</span>)
				left=(<Avatar src={system.thumbnail}/>)
				right=(<span/>)
            }else if(comment.isOwner){
				left=(<span/>)
				right=(<Avatar src={comment.author.thumbnail}/>)
			}else{
				name=(<span style={{fontSize:'x-small'}}>{comment.author.name}</span>)
				left=(<Avatar src={comment.author.thumbnail}/>)
				right=(<span/>)
			}

			let timing=null
			if(time){
				timing=(
					<center>
						<span style={{backgroundColor:"lightgray",fontSize:'x-small',padding:2,borderRadius:2}}>
							{smartFormat(time)}
						</span>
					</center>)
			}

			return (
				<Fragment>
					{timing}
					<div key={comment._id} className="acomment" style={{padding:5}}>
						<div style={{width:40,minHeight:40,verticalAlign:"top"}}>{left}</div>
						<div style={{padding:5,verticalAlign:"top"}}>
							<div>{name}</div>
							<p className={`content ${!comment.system&&comment.isOwner?"owner":""}`}>
							{
								((content,type)=>{
									switch(type){
									case "photo":
										return <img src={content} style={{width:150}}/>
									default:
										return <span>{content}</span>
									}
								})(comment.content,comment.type)
							}
							</p>
						</div>
						<div style={{width:40,minHeight:40,verticalAlign:"top"}}>{right}</div>
					</div>
				</Fragment>
			)
		}
	}
}

export default compose(
	withMutation(({parent,connection},data,client)=>({
		promise:true,
		variables:{parent},
		mutation:graphql`
			mutation comment_create_Mutation($parent:ID!, $content:String!, $type: CommentType, $id:ObjectID){
				comment:comment_create(parent:$parent, content:$content, type:$type, _id:$id){
					id
					content
					type
					createdAt
					author{
						id
						name
						photo
					}
					isOwner
				}
			}
		`,
		updater(store,data){
			client.connection(store,connection,{parent})
				.append(data.comment)
		},

	})),
	file.withGetToken,
	getContext({muiTheme:PropTypes.object}),
	mapProps(({muiTheme,minHeight,mutate,data,relay,hint,system,template,getToken})=>({
		hint,system,template,
		data:data ? data.comments.edges.map(({node})=>node) : [],
		commentText({content}){
			return mutate({content})
		},
		commentPhoto(){
			return file.selectImageFile()
                .then(data=>getToken()
					.then(({id,token})=>
						file.upload(data,{id:parent,key:`comments:${id}/a.jpg`},token)
						.then(url=>mutate({content:url, type:"photo",id}))
					)
				)
		},
		loadMore(ok){
			if(relay.hasMore() && !relay.isLoading()){
				relay.loadMore(10, e=>{
					ok()
					if(e){
						console.error(e)
					}
				})
			}
		},
		minHeight: minHeight||muiTheme.page.height,
	})),
)(Comment)
