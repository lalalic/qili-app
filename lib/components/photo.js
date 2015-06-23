var React=require('react/addons'),
    {Component}=React,
    {FlatButton}=require('material-ui');

export default class Photo extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <img {...this.props}/>
        )
    }
}
