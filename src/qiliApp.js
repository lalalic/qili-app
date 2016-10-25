import React, {Component} from "react"
import ReactDOM, {render} from "react-dom"

import {Router, Route, IndexRoute, hashHistory} from "react-router"

import {createStore,combineReducers, applyMiddleware} from "redux"
import {Provider, connect} from "react-redux"

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

import {INIT_APP, USER_CHANGED} from "./action/qiliApp"
import QILI_APP from "./reducer/qiliApp"

const muiTheme=getMuiTheme(lightBaseTheme)

class App extends Component{
    constructor(props){
        super(props)

        supportTap()

        const {service, appId}=this.props

        if(!appId)
            throw new Error("Please give application key")

        if(!service)
            throw new Error("Please give service url")
    }

    componentDidMount(){
        var {init:initApp, service, appId, title, dispatch}=this.props
		if(title)
			document.title=title

        init(service, appId, initApp, (e,type='Error')=>this.refs.msg.show(e,type), this.refs.loading)
            .then((__tutorialized=true)=>{
                    dispatch(ACTION.INIT_APP(null,!!__tutorialized))
                    User.on('change', ()=>dispatch(ACTION.USER_CHANGED))
                },
                (e)=>dispatch(ACTION.INIT_APP(e.message)))
    }

    getChildContext(){
        let self=this
        return {
            muiTheme
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
            {__inited:inited, __initedError:initedError, __user:user, __tutorialized}=this.props

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

    static render(routes, props={}, reducers={}, ...middlewars){
        let container=document.getElementById('app')
        if(!container){
            container=document.createElement('div')
            container.id='app'
            document.body.appendChild(container)
        }
		let style=document.createElement("style")
		document.getElementsByTagName("head")[0].appendChild(style)
		style.innerHTML=".page{min-height:"+window.innerHeight+"px}"
		container.style.height=window.innerHeight+'px'

        if(!props.history)
            props.history=hashHistory

        return render((
                <Provider store={createStore(combineReducers(Object.assign({__:REDUCER},reducers)), applyMiddleware(...middlewars))}>
                    <Router {...props}>
                        {routes}
                    </Router>
                </Provider>
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

const REDUCER=(state={__inited:false, __user:User.current},action)=>{
    switch(action.type){
    case 'inited':
        return {
            __inited:true
            ,__user:User.current
            ,__tutorialized:action.__tutorialized
        }
    break
    case 'initedError':
        return {
            __inited:false
            ,__user:User.current
            ,__initedError:action.error
        }
    break
    case 'user.changed':
        return Object.assign({},state,{__user:User.current})
    default:
        return state
    }
}

const ACTION={
	INIT_APP(error,__tutorialized){
		if(!!error){
			return {
				type:"initedError"
				,user
				,error
			}
		}else{
			return {
				type:"inited"
				,__tutorialized
			}
		}
	}
	,USER_CHANGED:{
		type:"user.changed"
	}
}

export default connect(state=>state.__)(App)
