var React=require('react/addons'),
    {Component}=React,
    {FlatButton}=require('material-ui');

export default class Loading extends Component{
    render(){
        var {text}=this.props
        return (<div style={{textAlign:'center'}}>{text || 'loading...'}</div>)
    }
}
