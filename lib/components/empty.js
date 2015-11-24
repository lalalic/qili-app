var React=require('react'),
    {Component}=React

export default class Empty extends Component{
    render(){
        let {icon, text}=this.props
        return (
            <div className="empty">
                {icon}
                <p>{text}</p>
            </div>
            )
    }
}

Empty.defaultProps={
    icon:null,
    text:'Empty'
}
