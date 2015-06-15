var React=require('react/addons'),
    {Component}=React,
    {IconButton, TextField}=require('material-ui'),
    {Service}=require('../db/service'),
    CommandBar=require('./command-bar'),
    User=require('../db/user');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            entity:null
        }
        var {type}=props.params,
            colName=type+'_comment';

        this.db=Service.addCollection(colName)
    }
    componentWillMount(){
        var {_id}=this.props.params

        this.db.findOne({_id:_id},function(comment){
            this.setState({entity:comment||{comments:[]}})
        }.bind(this))
    }
    render(){
        var {entity}=this.state,
            uiComments;

        if(entity){
            var i=0;
            uiComments=entity.comments.map(function(comment){
                <div key={i++}>
                    <h6><span>{comment.author.name}</span> on <i>{comment.createdAt}</i></h6>
                    <p>{comment.content}</p>
                </div>
            })
        }

        return (
            <div className="comment">
                {uiComments}
                <CommandBar
                    className="footbar"
                    items={["Back",
                        (<TextField ref="comment" hintText="give some comment:140" multiLine={true} maxLength={140}/>),
                        "Save"]}
                    onSelect={this.onSelect.bind(this)}
                    />
    		</div>
        )
    }
    onPost(){
        var content=this.refs.comment.getValue()
        if(!content || content.trim().length==0)
            return

        var user=User.current,
            comment={
                content:content,
                author:{_id:user._id,name:user.name},
                createdAt:new Date()
            };
        this.db.upsert(comment,function(){
            this.refs.comment.clearValue()
        })
    }
    onSelect(command,e){
        switch(command){
        case "Back":
            this.context.router.goBack()
            break
        case "Save":
            this.onPost()
            break
        default:

        }
    }
}
Main.contextTypes={router:React.PropTypes.func}
