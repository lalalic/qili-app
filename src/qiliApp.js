import React, {Component} from "react"
import {init,User} from "./db"
import Router from "react-router"
import Messager from "./components/messager"
import Loading from "./components/loading"
import {Styles, Snackbar, Utils, FloatingActionButton} from 'material-ui'
import supportTap from 'react-tap-event-plugin'
import Account from './account'

var muiTheme=(new Styles.ThemeManager()).getCurrentTheme(),
    {render, traverseChildren}=React

muiTheme.component.floatingActionButton.style={
    position:'fixed',top:10,right:10, opacity:0.7, zIndex:9
}

export default class App extends Component{
    constructor(props){
        super(props)
        supportTap()
        var {init:initApp, service, appId, width}=this.props
        this.state={
            __user:User.current,
            __wide:window.innerWidth>width
        }

        if(!appId)
            throw new Error("Please give application key")

        if(!service)
            throw new Error("Please give service url")

        Utils.Events.on(window, 'resize', ()=>this.setState({__wide:window.innerWidth>width}));
    }

    componentDidMount(){
        var {init:initApp, service, appId}=this.props
        init(service, appId, initApp, (e,type='Error')=>this.refs.msg.show(e,type), this.refs.loading)
            .then(()=>{
                    this.setState({__inited:true, __user:User.current})
                    User.on('change', ()=>this.setState({__user:User.current}))
                },
                (e)=>this.setState({__inited:false,__user:User.current,__initedError:e.message}))
    }

    getChildContext(){
        return {muiTheme}
    }

    _right(x){
        var {__wide}=this.state,
            {width}=this.props
        return __wide ? (window.innerWidth-width)/2+x : x
    }

    _rightAsLeft(x){
        var {__wide}=this.state,
            {width}=this.props
        return __wide ? (window.innerWidth+width)/2-x : window.innerWidth-x
    }

    render(){
        var content,
            {__inited:inited, __initedError:initedError, __user:user}=this.state

        if(!inited){
            if(initedError)
                content= `Initializing Error: ${initedError}`
            else
                content= "Initializing..."
        }else if(!user || !user.sessionToken){
            content=(<Account/>)
        }else {
            content=this.renderContent()
        }

        return (
                <div className="withFootbar">
                    <div id="container">
                        {content}
                        <Messager ref="msg" style={{position:"fixed", right: this._right(10), left:undefined}} />
                        <Loading ref="loading" top={10} left={10}/>
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
    init:React.PropTypes.func,
    width:React.PropTypes.number
}
App.defaultProps=Object.assign({
    service:"http://qili2.com/1/",
    init(){},
    width:960
},global.__test)

/**
*@Todo:
* positioning in big screen
    * FloatingActionButton : fixed position
    * Loading: cover FloatingActionButton
    * Messager: fixed bottom
*/
