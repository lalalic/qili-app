var React=require('react'),
    {Component}=React,
    {RefreshIndicator}=require('material-ui');

export default class Loading extends Component{
    constructor(p){
        super(p)
        this.state={}
    }
    render(){
        return <RefreshIndicator {...this.props} {...this.state}/>
    }

    show(){
        this.setState({status:"loading"})
    }

    close(){
        this.setState({status:"hide"})
    }
}

Loading.defaultProps={size:40,loadingColor:"#FF9800"}
