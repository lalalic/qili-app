var React=require('react/addons'),
    {Component,addons:{classSet}}=React,
    Overlay=require('material-ui/lib/overlay');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={open:false}
    }
    render(){
        var children=this.renderContent()
        return (
            <Overlay
                className="dialog-command"
                show={this.state.open}
                autoLockScrolling={true}
                onTouchTap={this.dismiss.bind(this)} >
                <div className="content"
                    onTouchTap={(e)=>e.stopPropagation()}>
                    {children}
                </div>
            </Overlay>
        )
    }

    renderContent(){
        return null
    }

    show(){
        this.setState({open:true})
    }

    dismiss(){
        if(this.props.onDismiss)
            this.props.onDismiss()

        this.setState({open:false})
    }

    static is(a){
        if(typeof(a.type)=='undefined')
            return false;

        if(a.type==this)
            return true;
        var child=a.type
        while(child!=null && typeof(child.__proto__)!='undefined'){
            if(child.__proto__==this)
                return true;
            child=child.__proto__
        }
        return false
    }
}

Main.propTypes={
    self: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired
}
