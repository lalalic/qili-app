var React=require('react'),
    {Component}=React,
    {Avatar,ClearFix}=require('material-ui'),
    {Service}=require('../db/service'),
    CommandBar=require('./command-bar'),
    List=require('./list'),
    User=require('../db/user'),
    Comment=require('../db/comment');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            entity:null
        }
        var {type}=props.params;

        this.db=Comment.of(type)
    }

    render(){
        var {_id}=this.props.params

        return (
            <div className="comment">

                <List ref="list"
                    model={this.db.find({parent:_id})}
                    template={Template}/>

                <CommandBar
                    className="footbar centerinput"
                    items={["Back",
                        (<textarea ref="comment"
                            placeholder="give some comment:140"
                            maxLength={140}/>),
                        "Save"]}
                    onSelect={this.onSelect.bind(this)}
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
                content:content,
                author:{_id:user._id,name:user.name,thumbnail:user.thumbnail},
                createdAt:new Date()
            };
        this.db.upsert(comment,function(updated){
            var{list, comment:commenter}=this.refs
            list.setState({data: new Array(...list.state.data,updated)})
            commenter.getDOMNode().value=""
        }.bind(this))
    }
    onSelect(command,e){
        switch(command){
        case "Save":
            this.save()
            break
        default:

        }
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
            left=(<Avatar src={model.author.thumbnail}/>)
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
