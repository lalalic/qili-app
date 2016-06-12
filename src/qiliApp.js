import React, {Component} from "react"
import {init,User} from "./db"
import Messager from "./components/messager"
import Loading from "./components/loading"
import {Styles, Snackbar, Utils, FloatingActionButton} from 'material-ui'
import supportTap from 'react-tap-event-plugin'
import Account from './account'
import Tutorial from "./components/tutorial"
import ReactDOM, {render} from "react-dom"
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

export default class App extends Component{
    constructor(props){
        super(props)

        supportTap()
        var {init:initApp, service, appId}=this.props
        this.state={
            __user:User.current
        }

        if(!appId)
            throw new Error("Please give application key")

        if(!service)
            throw new Error("Please give service url")
    }
	
	inited(){
		console.log(`inited`)
	}

    componentDidMount(){
        var {init:initApp, service, appId}=this.props

        init(service, appId, initApp, (e,type='Error')=>this.refs.msg.show(e,type), this.refs.loading)
            .then((__tutorialized=true)=>{
                    this.setState({__inited:true, __user:User.current, __tutorialized})
                    User.on('change', ()=>this.setState({__user:User.current}))
					this.inited()
                },
                (e)=>this.setState({__inited:false,__user:User.current,__initedError:e.message}))
    }

    getChildContext(){
        return {muiTheme: getMuiTheme(lightBaseTheme)}
    }

    render(){
        var content,
            {__inited:inited, __initedError:initedError, __user:user, __tutorialized}=this.state

        if(!inited){
            if(initedError)
                content= `Initializing Error: ${initedError}`
            else
                content= "..."
        }else if(!user){
            if(!__tutorialized && Array.isArray(this.props.tutorial) && this.props.tutorial.length)
                return (<Tutorial slides={this.props.tutorial} onEnd={e=>this.setState({__tutorialized:true})}/>)

            content=(<Account />)
        }else if(!user.sessionToken){
            content=(<Account user={user}/>)
        }else {
            content=this.renderContent()
        }

        return (
                <div className="withFootbar">
                    <div id="container" style={{overflowY:"scroll"}}>
                        {content}

                        <Messager ref="msg" className="sticky bottom left"/>
                        <Loading ref="loading"  className="sticky top right"/>
                    </div>
                </div>
            )
    }

    renderContent(){
        //inherits should return component
    }

    static render(routes, props={}){
        var container=document.getElementById('app')
        if(!container){
            container=document.createElement('div')
            container.id='app'
            document.body.appendChild(container)
        }
		var style=document.createElement("style")
		document.getElementsByTagName("head")[0].appendChild(style)
		style.innerHTML=".page{min-height:"+window.innerHeight+"px}"
		container.style.height=window.innerHeight+'px'

        if(!props.history)
            props.history=hashHistory

        return render((
                <Router {...props}>
                    {routes}
                </Router>
            ),container)
    }
};
import {Router, Route, IndexRoute, hashHistory} from "react-router"

App.childContextTypes={muiTheme:React.PropTypes.object.isRequired}
App.contextTypes={router: React.PropTypes.object}

App.propsTypes={
    service: React.PropTypes.string.isRequired,
    appId:React.PropTypes.string.isRequired,
    init:React.PropTypes.func,
    tutorial:React.PropTypes.array
}
App.defaultProps=Object.assign({
    service:"http://qili2.com/1/",
    init(){},
    tutorial:[]
})

/**
*@Todo:
* positioning in big screen
    * FloatingActionButton : fixed position
    * Loading: cover FloatingActionButton
    * Messager: fixed bottom
*/
