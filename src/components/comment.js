import React, {Component} from "react"
import {Service} from '../db/service'
import CommandBar from './command-bar'
import List from './list'
import User from '../db/user'
import Comment from '../db/comment'

export default class Main extends Component{
    constructor(props){
        super(props)
        var {type, _id}=props.params;
        this.state={type,_id}
        this.db=Comment.of(type)
        this._data=this.db.find({parent:_id})
    }

    componentWillReceiveProps(props){
        var {type, _id}=props.params;
        if(type==this.state.type && _id==this.state._id)
            return;
        if(type!=this.state.type)
            this.db=Comment.of(type);
        this._data=this.db.find({parent:_id})
        this.setState({type,_id})
    }

    render(){
        var {params:{_id}, template=Template}=this.props

        return (
            <div className="comment">

                <List ref="list"
                    model={this._data}
                    template={template}/>

                <CommandBar
                    className="footbar centerinput"
                    items={[
                            "Back",
                            (<textarea ref="comment"
                                placeholder="give some comment:140"
                                maxLength={140}/>),
                            {action:"Save", onSelect:()=>this.save()}
                        ]}
                    />
    		</div>
        )
    }
    save(){
        var {value:content=""}=this.refs.comment.getDOMNode()
        if(content.trim().length==0)
            return

        var user=User.current,
            comment={
                type:this.state.type,
                parent:this.state._id,
                thumbnail:user.thumbnail,
                content:content
            };
        this.db.upsert(comment,(updated)=>{
            var{list, comment:commenter}=this.refs
            list.setState({data: new Array(...list.state.data,updated)})
            commenter.getDOMNode().value=""
        })
    }
}

class Template extends Component{
    render(){
        var {model}=this.props,
            name, left, right, text,
            isOwner=model.author._id==User.current._id;
        if(isOwner){
            left=(<span/>)
            right=(<Avatar src={User.current.thumbnail}/>)
        }else{
            name=(<span style={{fontSize:'x-small'}}>{model.author.name}</span>)
            left=(<Avatar src={model.thumbnail}/>)
            right=(<span/>)
        }

        return (
            <List.Item
                key={model._id}
                style={{paddingTop:10,paddingLeft:62}}
                leftAvatar={left}
                rightAvatar={right}
                disableTouchTap={true}>
                {name}

                <ClearFix style={{paddingRight:5}}>
                    <p className={`content ${isOwner?"owner":""}`}>
                        <span>{model.content}</span>
                    </p>
                </ClearFix>
            </List.Item>
        )
    }
}

Main.defaultProps={
    template:Template
}
