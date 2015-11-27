import {React, Component, User, UI, init, Router} from "."
import {Styles} from 'material-ui'
import supportTap from 'react-tap-event-plugin'

var muiTheme=(new Styles.ThemeManager()).getCurrentTheme(),
    {render}=React;

export default class App extends Component{
    constructor(props){
        super(props)
        supportTap()
        this.state={
            __user:User.current
        }

        var {init:initApp, service, appId}=this.props

        if(!appId)
            throw new Error("Please give application key")

        if(!service)
            throw new Error("Please give service url")


        init(service, appId, initApp)
            .then(()=>{
                    this.setState({__inited:true, __user:User.current})
                    User.event.on('change', ()=>this.setState({__user:User.current}))
                },
                (e)=>this.setState({__inited:true,__user:User.current,__initedError:e.message}))
    }

    getChildContext(){
        return {muiTheme}
    }

    render(){
        var {__inited:inited, _initedError:initedError, __user:user}=this.state
        if(!inited){
            if(initedError)
                return (<UI.Empty text={`Initializing Error: ${initedError}`}/>)
            return  (<UI.Loading text="Initializing..."/>)
        }

        var Account=require('./account');

        if(!user || !user.sessionToken)
            return (<Account/>)
    }

    static render(routes){
        var history=App.history || Router.HashLocation
        return Router.run(routes, history, (Handler, state)=>{
            var container=document.getElementById('app')
            if(!container){
                container=document.createElement('div')
                container.id='app'
                document.body.appendChild(container)
            }
            container.style.height=window.innerHeight+'px'
            render(<Handler params={state.params} query={state.query}/>, container)
        })
    }
};

App.childContextTypes={muiTheme:React.PropTypes.object}

App.propsTypes={
    service: React.PropTypes.string.isRequired,
    appId:React.PropTypes.string.isRequired,
    init:React.PropTypes.func
}
App.defaultProps={
    service:"http://qili2.com/1/",
    init:()=>console.info("service inited")
}
