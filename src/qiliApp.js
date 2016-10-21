import React, {Component} from "react"
import ReactDOM, {render} from "react-dom"

import {Router, Route, IndexRoute, hashHistory} from "react-router"

import {Styles, Snackbar, Utils, FloatingActionButton} from 'material-ui'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"

import {init,User} from "./db"
import Messager from "./components/messager"
import Loading from "./components/loading"
import supportTap from 'react-tap-event-plugin'
import Account from './account'
import Tutorial from "./components/tutorial"


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

    componentDidMount(){
        var {init:initApp, service, appId, title}=this.props
		if(title)
			document.title=title

        init(service, appId, initApp, (e,type='Error')=>this.refs.msg.show(e,type), this.refs.loading)
            .then((__tutorialized=true)=>{
                    this.setState({__inited:true, __user:User.current, __tutorialized})
                    User.on('change', ()=>this.setState({__user:User.current}))
                },
                (e)=>this.setState({__inited:false,__user:User.current,__initedError:e.message}))
    }

    getChildContext(){
        let self=this
        return {
            muiTheme: getMuiTheme(lightBaseTheme)
            ,showMessage(){
                self.showMessage(...arguments)
            }
            ,loading(open){
                self.refs.loading[open ? "show" : "close"]()
            }
        }
    }
	
	showMessage(){
		this.refs.msg.show(...arguments)
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
		return this.props.children
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

	static defaultProps={
		service:"http://qili2.com/1/",
		init(){},
		tutorial:[]
	}

	static propsTypes={
		service: React.PropTypes.string.isRequired,
		appId:React.PropTypes.string.isRequired,
		init:React.PropTypes.func,
		tutorial:React.PropTypes.array,
		title: React.PropTypes.string
	}

	static childContextTypes={
		muiTheme:React.PropTypes.object.isRequired,
        showMessage: React.PropTypes.func,
        loading: React.PropTypes.func
	}

	static contextTypes={
		router: React.PropTypes.object
	}
}
