import React, {Component, PropTypes} from "react"
import {compose,withProps} from "recompose"
import {graphql, withMutation, withFragment} from "tools/recompose"

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

import file from "components/file"
import CommandBar from 'components/command-bar'
import Empty from "components/empty"

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
        let {data, currentUserId, createText, createPhoto, template,loadMore,hint="说两句", system}=this.props
		const {comment}=this.state
        const {muiTheme:{page: {height}}}=this.context
        const create=()=>createText({content:this.state.comment}).then(a=>this.setState({comment:""}))
        data=data||[]

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
            onSelect:e=>file.selectImageFile()
                .then(url=>file.upload(url))
                .then(url=>createPhoto({url}))
        }

        let action=photo

        if(comment.trim())
            action=save

		let elEnd=null
		if(data.length && this.first){
			elEnd=(<div ref={el=>this.end=el}/>)
		}

		return (
            <div className="comment" style={{minHeight:height, backgroundColor:bg}}>
                <PullToRefresh onRefresh={loadMore}>
                    {data.reduce((state,a,i)=>{
							let createdAt=new Date(a.createdAt)
							let {comments,last}=state
							let props={comment:a,key:i, system, currentUserId}
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
        systemThumbnail:null,
        template: ({comment, system={}, time, currentUserId})=>{
			let name, left, right, text
			const isOwner=comment.author._id==currentUserId
            if(comment.system){
                name=(<span style={{fontSize:'x-small'}}>{system.name}</span>)
				left=(<Avatar src={system.thumbnail}/>)
				right=(<span/>)
            }else if(isOwner){
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
				<div>
					{timing}
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
				</div>
			)
		}
	}
}

export default compose(
	withMutation(({id})=>({
		name: "createText",
		promise:true,
		variables:{id},
		mutation:graphql`
			mutation comment_update_Mutation($id:ID!, $content:String!){
				comment(host:$id, content:$content){
					id
					createdAt
				}
			}
		`
	})),
	withFragment(graphql`
        fragment comment on App{
            comments(last:$count, before: $cursor)@connection(key:"comment_comments"){
                edges{
					node{
						content
						createdAt
						author{
							id
							name
							photo
						}
					}
                }
                pageInfo{
                    hasPreviousPage
                    startCursor
                }
            }
        }
    `),
	withProps(({data, relay})=>({
		data:data.comments.edges.map(({node})=>node),
		loadMore(ok){
			if(relay.hasMore() && !relay.isLoading()){
				relay.loadMore(10, e=>{
					ok()
					if(e){
						console.error(e)
					}
				})
			}
		}
	}))
)(Comment)
