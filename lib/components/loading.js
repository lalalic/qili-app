var React=require('react/addons'),
    {Component}=React,
    {FlatButton}=require('material-ui');

export default class Loading extends Component{
    render(){
        var {text, style}=this.props
        return (<div className="loading" style={{textAlign:'center'}}>{text || 'loading...'}</div>)
    }
}
