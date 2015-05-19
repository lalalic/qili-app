var React=require('react/addons'),
    {Component}=React;

export default class Messager extends Component{
    constructor(props){
        super(props)
        this.state={message:null, type:null}
    }

    render(){
        return (<div className={"messager "+(this.state.type||"")}>{this.state.message}</div>)
    }
}
