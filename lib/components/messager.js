var React=require('react/addons'),
    {Component}=React,
    {Snackbar}=require('material-ui'),
    instance;

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            message:null,
            autoClose:true
        }
    }

    render(){
        var {timeout=2000}=this.props,
            {message, autoClose}=this.state,
            right=message ? 10 : 10000;

        if(autoClose)
            setTimeout(()=>this.setState({message:null}), timeout)

        return (
            <span style={{position:'fixed',right:right,
                backgroundColor:'black',color:'white',
                margin:10,
                fontSize:'bigger',
                zIndex:99,padding:10}}>
                <span>{message}</span>
            </span>
        )
    }

    static show(message, autoClose=true){
        if(!instance)
            instance=React.render(<Main/>, document.body)

        instance.setState({message:message,autoClose:autoClose})
    }
}
