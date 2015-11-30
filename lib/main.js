import {React, Component, User, UI, init, Router} from "."
import {Styles, Snackbar} from 'material-ui'
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


        init(service, appId, initApp, (e)=>UI.Messager.error(e), UI.Loading)
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
        var content,
            {__inited:inited, _initedError:initedError, __user:user}=this.state

        if(!inited){
            if(initedError)
                content= (<UI.Empty text={`Initializing Error: ${initedError}`}/>)
            else
                content= (<UI.Loading text="Initializing..."/>)
        }else{
            var Account=require('./account');
            if(!user || !user.sessionToken)
                content=(<Account/>)
        }

        if(!content)
            content=this.renderContent()

        return (
                <div className="withFootbar">
                    <div id="container">
                        {content}
                        <UI.Messager autoHideDuration={1500}/>
                        <UI.Loading size={40} left={80} top={5} loadingColor={"#FF9800"} />
                    </div>
                </div>
            )
    }

    renderContent(){
        //inherits should return component
    }

    static render(routes){
        var history=App.history || Router.HashLocation
        var container=document.getElementById('app')
        if(!container){
            container=document.createElement('div')
            container.id='app'
            document.body.appendChild(container)
        }

        return Router.run(routes, history, (Handler, state)=>{
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
if(global.__test)
    App.defaultProps=global.__test
else
    App.defaultProps={
        service:"http://qili2.com/1/",
        init:()=>console.info("service inited")
    }
