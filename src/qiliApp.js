import React, {Component} from "react"
import ReactDOM, {render} from "react-dom"

import {Router, Route, IndexRoute, hashHistory} from "react-router"

import {createStore,combineReducers, applyMiddleware,compose} from "redux"
import {Provider, connect} from "react-redux"

import {Styles, Snackbar, Utils, FloatingActionButton} from 'material-ui'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"

import {init,User} from "./db"
import Messager from "./components/messager"
import Loading from "./components/loading"
import supportTap from 'react-tap-event-plugin'
import Account, {REDUCER as accountReducer} from './account'
import Tutorial from "./components/tutorial"

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
            .then((tutorialized=true)=>{
                    dispatch(ACTION.INIT_APP(null,!!tutorialized))
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
        const {inited, initedError, user, tutorialized, dispatch}=this.props
		let content
        
        if(!inited){
            if(initedError)
                content= `Initializing Error: ${initedError}`
            else
                content= "initializing..."
        }else if(!user){
            if(!tutorialized && Array.isArray(this.props.tutorial) && this.props.tutorial.length)
                return (<Tutorial slides={this.props.tutorial} onEnd={e=>dispatch(ACTION.TUTORIALIZED)}/>)

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
		
		const defaultCreateElement=(Component,props)=>{
			const {history,params}=props
			return (<Component router={history} {...params} {...props}/>)
		}

		const allReducers=combineReducers(Object.assign({},REDUCER,reducers))
		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		
        return render((
                <Provider store={createStore(allReducers, composeEnhancers(applyMiddleware(...middlewars)))}>
                    <Router createElement={defaultCreateElement} {...props}>
                        {routes}
                    </Router>
                </Provider>
            ),container)
    }
}

export const REDUCER={
    __:(state={inited:false, user:User.current},action)=>{
        switch(action.type){
        case 'inited':
            return {
                inited:true
                ,user:User.current
                ,tutorialized:action.tutorialized
            }
        break
        case 'initedError':
            return {
                inited:false
                ,user:User.current
                ,initedError:action.error
            }
        break
        case 'USER_CHANGED':
            return {
                inited:!!User.current
                ,user:User.current
                ,tutorialized:state.tutorialized
            }
		case 'TUTORIALIZED':
			state.tutorialized=true
			return state
        default:
            return state
        }
    },
	account: accountReducer
}

export const ACTION={
	INIT_APP(error,tutorialized){
		if(!!error){
			return {
				type:"initedError"
				,user
				,error
			}
		}else{
			return {
				type:"inited"
				,tutorialized
			}
		}
	}
	,USER_CHANGED:{
		type:"USER_CHANGED"
	},TUTORIALIZED:{
		type:"TUTORIALIZED"
	}
}

export const QiliApp=connect(state=>state.__)(App)

export default QiliApp
