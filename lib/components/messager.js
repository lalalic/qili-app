var React=require('react'),
    {Component}=React,
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
            {message, autoClose, level="information"}=this.state,
            right=message ? 10 : 10000;

        if(autoClose)
            setTimeout(()=>this.setState({message:null}), timeout)

        return (
            <span style={{position:'absolute',
                right:right,
                backgroundColor:'black',
                color:'white',
                margin:10,
                fontSize:'bigger',
                zIndex:99,padding:10}}>
                <span>{level}:</span> <span>{message}</span>
            </span>
        )
    }

    static show(message, autoClose=true, level="information"){
        if(!instance)
            instance=React.render(<Main/>, document.body.firstChild)

        instance.setState({message:message,autoClose:autoClose, level})
    }

    static warn(){
        var [a,b]=arguments
        this.show(a, b, "alert")
    }

    static info(){
        var [a,b]=arguments
        this.show(a, b, "information")
    }

    static error(){
        var [a,b]=arguments
        this.show(a, b, "error")
    }
}
