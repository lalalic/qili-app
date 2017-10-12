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
	static propTypes={
		data: PropTypes.arrayOf(PropTypes.object),
		commentText: PropTypes.func,
		commentPhoto: PropTypes.func,
		loadMore: PropTypes.func
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
        let {data, commentText, commentPhoto, template,loadMore,hint="说两句", system}=this.props
		const {comment}=this.state
        const {muiTheme:{page: {height}}}=this.context
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
            onSelect:e=>file.selectImageFile()
                .then(url=>file.upload(url))
                .then(url=>commentPhoto({url}))
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
				<div>
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
				</div>
			)
		}
	}
}

export default compose(
	withProps(({mutate})=>({
		commentText({content}){
			return mutate({content})
		},
		commentPhoto({url}){
			return mutate({content:url, type:"photo"})
		}
	})),
	withProps(({relay})=>({
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
	})),
)(Comment)
