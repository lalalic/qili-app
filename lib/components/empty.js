var React=require('react/addons'),
    {Component}=React,
    {FlatButton,FontIcon}=require('material-ui');

export default class Empty extends Component{
    render(){
        var {iconClassName, text}=this.props,
            icon;

        if(iconClassName)
            icon=(<FontIcon className={iconClassName}/>)

        return (
            <div className="empty">
                {icon}
                <p>{text}</p>
            </div>
            )
    }
}

Empty.defaultProps={
    iconClassName:null,
    text:'Empty'
}
