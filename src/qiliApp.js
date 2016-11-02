import React, {Component} from "react"
import ReactDOM, {render} from "react-dom"

import {Router, Route, IndexRoute, hashHistory} from "react-router"

import {createStore, applyMiddleware,compose} from "redux"
import {Provider, connect} from "react-redux"
import thunk from 'redux-thunk'

import {Styles, Snackbar, Utils, FloatingActionButton} from 'material-ui'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import BackIcon from "material-ui/svg-icons/hardware/keyboard-arrow-left"

import {enhancedCombineReducers} from "."

import {init,User} from "./db"
import Messager from "./components/messager"
import Loading from "./components/loading"
import supportTap from 'react-tap-event-plugin'
import Account from './account'
import Tutorial from "./components/tutorial"

const muiTheme=getMuiTheme(lightBaseTheme)

const DOMAIN="qiliApp"

const INIT_STATE={
	inited:false
	,user:null
	,tutorialized:false
}
export const ACTION={
	INIT_APP(error,tutorialized){
		if(!!error){
			return {
				type:`@@${DOMAIN}/initedError`
				,payload:{user:User.current,error}
			}
		}else{
			return {
				type:`@@${DOMAIN}/inited`
				,payload:{tutorialized}
			}
		}
	}
	,USER_CHANGED:{
        type:`@@${DOMAIN}/USER_CHANGED`
	},TUTORIALIZED:{
        type:`@@${DOMAIN}/TUTORIALIZED`
	}
}

export const REDUCER={
    [DOMAIN]:(state={},{type,payload})=>{
		switch(type){
		case `@@${DOMAIN}/inited`:
			return {
				inited:true
				,user:User.current
				,tutorialized:payload.tutorialized
			}
		break
		case `@@${DOMAIN}/initedError`:
			return {
				inited:false
				,user:User.current
				,initedError:payload.error
			}
		break
		case `@@${DOMAIN}/USER_CHANGED`:
			return {
				inited:!!User.current
				,user:User.current
				,tutorialized:state.tutorialized
			}
		case `@@${DOMAIN}/TUTORIALIZED`:
			return Object.assign({},state,{tutorialized:true})
		}
        return state
    }
}

const AccountContainer=connect(state=>state.ui)(Account)

export const QiliApp=connect(state=>state[DOMAIN],null,null,{pure:true,withRef:true})(
class extends Component{
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

            content=(<AccountContainer />)
        }else if(!user.sessionToken){
            content=(<AccountContainer user={user}/>)
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

    static render(route, reducers=[], ...middlewars){
		const props={}
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
			return (<Component router={history} {...props}/>)
		}

		function routerRducer(state={},{type,payload}){
			switch(type){
			case '@@router/LOCATION_CHANGE':
			return payload
			}
			return state
		}

		const enhancedRoute=(root,dispatch)=>{
			const {onEnter, onChange}=root.props
			return React.cloneElement(root, {
				onEnter(nextState){
					dispatch({type:`@@router/LOCATION_CHANGE`,payload:nextState});
					onEnter && onEnter.bind(this)(...arguments)
				},
				onChange(state,nextState){
					dispatch({type:`@@router/LOCATION_CHANGE`,payload:nextState});
					onChange && onChange.bind(this)(...arguments)
				}
			})
		}


		const allReducers=enhancedCombineReducers({routing:routerRducer},REDUCER,Account.REDUCER, ...reducers)
		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		const store=createStore(allReducers, {qiliApp:{}, ui:{}, entities:{}}, composeEnhancers(applyMiddleware(thunk,...middlewars)))

        return render((
                <Provider store={store}>
                    <Router createElement={defaultCreateElement} {...props}>
						{enhancedRoute(route,store.dispatch)}
                    </Router>
                </Provider>
            ),container)
    }
})

export default Object.assign(QiliApp,{ACTION,REDUCER})
