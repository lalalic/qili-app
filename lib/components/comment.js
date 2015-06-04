var React=require('react/addons'),
    {Component}=React,
    {IconButton}=require('material-ui');

export default class Main extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="toolbar">
    			<textarea
    				ref="comment"
    			 	placeholder="give some comment:140"
    				maxLength={140}
    				rows={2}
    				/>
    			<div>
    				<div>
    					<IconButton centerRipple={false}
    						disableFocusRipple={true} disableTouchRipple={true}
    						onClick={this.onPost.bind(this)}
    						primary={true}
    						label="Post"
    						iconClassName={"icon-post"}/>
    				</div>
    				<div>
    					<IconButton centerRipple={false}
    						disableFocusRipple={true} disableTouchRipple={true}
    						onClick={this.onCancel.bind(this)}
    						secondary={true}
    						label="Cancel"
    						iconClassName={"icon-cancel"}/>
    				</div>
    			</div>
    		</div>
        )
    }
    onPost(){

    }
    onCancel(){
        
    }
}
