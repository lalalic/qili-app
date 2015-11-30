var React=require('react'),
    {Component}=React,
    {RefreshIndicator}=require('material-ui');

var instance
export default class Loading extends Component{
    constructor(props){
        super(props)
        instance=this
        this.state={
            status: 'hide'
        }
    }
    render(){
        return <RefreshIndicator {...this.props} {...this.state}/>
    }

    static show(){
        instance.setState({status:'loading'})
    }

    static close(){
        instance.setState({status:'hide'})
    }
}
