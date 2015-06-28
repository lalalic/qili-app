var React=require('react/addons'),
    {Component}=React,
    {SnackBar}=require('material-ui'),
    instance;

export default class Messager extends Component{
    constructor(props){
        super(props)
        this.state={
            message:null,
            autoClose:true
        }
    }

    render(){
        var {message, autoClose}=this.state
        if(autoClose)
            setTimeout(()=>this.refs.snack.dismiss(), 2000)

        return (
            <SnackBar
                ref="snack"
                message={message}
                />
        )
    }

    static show(message, autoClose=true){
        if(!instance){
            instance=React.render(<Messager/>, document.body)
        }

        instance.setState({message:message,autoClose:autoClose})
    }
}
