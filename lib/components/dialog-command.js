var React=require('react/addons'),
    {Component,addons:{classSet}}=React,
    Overlay=require('material-ui/lib/js/overlay');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        var {children}=this.props
        return (
            <Overlay
                show={this.state.open}
                autoLockScrolling={true}
                onTouchTap={this.dismiss.bind(this)} >
                <div className="content">
                    {children}
                </div>
            </Overlay>
        )
    }
    show(){
        this.setState({open:true})
    }

    dismiss(){
        this.setState({open:false})
    }
}
