import {React, Component, User, UI, init, Router} from "."

export default class QiliApp extends Component{
    constructor(props){
        super(props)
        require("react-tap-event-plugin")();
        this.state={
            user:User.current
        }

        var {init:initApp, service, appId}=this.props

        init(service, appId, initApp)
            .then(()=>{
                    this.setState({inited:true, user:User.current})
                    User.event.on('change', ()=>this.setState({user:User.current}))
                },
                (e)=>this.setState({inited:true,user:User.current,initedError:e.message}))
    }

    render(){
        var {inited, initedError}=this.state
        if(!inited){
            if(initedError)
                return (<UI.Empty text={`Initializing Error: ${initedError}`}/>)
            return  (<UI.Loading text="Initializing..."/>)
        }

        var Account=require('./account');

        if(!this.state.user || !this.state.user.sessionToken)
            return (<Account/>)

        return React.Children.only(this.props.children)
    }

    static render(routes){
        Router.run(routes, (!window.cordova ? Router.HistoryLocation : undefined), function(Handler, state){
            var container=document.getElementById('app')
            if(!container){
                container=document.createElement('div')
                container.id='app'
                document.body.appendChild(container)
            }
            container.style.height=window.innerHeight+'px'
            React.render(<Handler params={state.params} query={state.query}/>, container)
        })
    }
};

QiliApp.propsTypes={
    service: React.PropTypes.string.isRequired,
    appId:React.PropTypes.string.isRequired,
    init:React.PropTypes.func
}
QiliApp.defaultProps={
    service:"http://qili2.com/1/",
    appId:null,
    init:()=>console.info("service inited")
}
QiliApp.contextTypes={router:React.PropTypes.func}
