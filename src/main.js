require('../style/index.less')

import {init,User,QiliApp,React,Component, UI, Position} from '.'
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton} from 'material-ui'

import Application from './db/app'
import App from './app'
import Logo from './icons/logo'

const {Empty}=UI

class QiliConsole extends Component{
    constructor(props){
        super(props)
		const {dispatch}=this.props
        Application.on('change',app=>dispatch(APP_CHANGED(app)))
    }

	shouldComponentUpdate(nextProps, nextState){
		if(this.props.children.props.route.name=='app'
			&& nextProps.app!=this.props.app
			&& !this.context.router.isActive(`app/${nextProps.app.name}`)){
			this.context.router.push(`app/${nextProps.app.name}`)
			return false
		}
		return true
	}

    render(){
        const {app}=this.props
		let props={appId: "qiliAdmin", init:a=>Application.init(), service:"http://localhost:9080/1/"}
		if(!app){
			return (
				<QiliApp {...props}>
					<Empty icon={<Logo/>}>
						<Link to="app">click to create your first qili app</Link>
					</Empty>
				</QiliApp>
			)
		}


        return (
            <QiliApp {...props}>
				{this.props.children.props.route.contextual!==false
					&& (<CurrentApp key="context" name={app.name}/>)}

                {this.props.children}
            </QiliApp>
        )
    }

	static childContextTypes={
		app: React.PropTypes.object
	}

	getChildContext(){
		return {
			app: this.props.app
		}
	}


}

class CurrentApp extends Component{
    render(){
        var {name}=this.props
		return(
            <FloatingActionButton className="sticky top right"
                onClick={e=>this.change()}
				mini={true}
                style={{fontSize:"xx-small"}}>
                {name}
            </FloatingActionButton>
        )
    }
    change(){
        var {app}=this.context,
            apps=Application.all,
            len=apps.length;
        if(len<2)
            return;

        var index=apps.findIndex(a=>a._id==app._id)
			,target=apps[(index+1) % len]

        Application.current=target
    }

	static contextTypes={app: React.PropTypes.object}
}

import Dashboard from './dashboard'
import AppUI, {Creator} from './app'
import CloudUI from './cloud'
import DataUI from './data'
import LogUI from './log'
import MyUI from "./my"
import SettingUI from "./setting"
import ProfileUI from "./user-profile"

import Reducer from "./reducer"
import {connect} from "react-redux"
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const QiliConsoleApp=connect(({app})=>({app}))(QiliConsole)

module.exports=QiliApp.render(
    (<Route path="/" component={QiliConsoleApp}>
        <IndexRoute component={()=>"Hello"}/>

        <Route path="app/:name" name="app" component={AppUI}/>
		<Route path="app" contextual={false} component={Creator}/>

        <Route path="cloud" component={CloudUI}/>

        <Route path="data" component={DataUI}>
            <IndexRedirect to={`${User._name}`}/>
            <Route path=":name"/>
        </Route>

        <Route path="log" component={LogUI}>
            <IndexRedirect to="all"/>
            <Route path=":level"/>
        </Route>

		<Route path="my">
			<IndexRoute component={MyUI} contextual={false}/>
			<Route path="setting" component={SettingUI} />
			<Route path="profile" component={ProfileUI} contextual={false}/>
		</Route>


    </Route>),{
		createElement(Component, props){
			if(Component==QiliConsoleApp){
				let child=props.children
					,{route,params}=child.props

				if(route.name=="app")
					props.init=a=>Application.init(params.name)
			}
			return <Component {...props}/>
		}
	}
	,Reducer
	,thunk
	,createLogger()
)


/**
@Todo:
*Done: after adding new application
    application list doesn't reflect the change
    local storage without All fields, such as without application name, ..., because server returned only _id, createdAt, ...
*Done: after application deletion, UI should go to / even with error
*Done: error happens, UI should not be Empty
*Don't: use <Link/> rather than this.context.router.transitionTo
**Done: Never empty UI
**Done: FloatActionButton position when view width is 960

* too small-zoom size in mobile browser
* first focus on form, cloud UI
* background to upload to backend
    done: WebSQLDb is done
    *** sqlite
    done: *** after remove app, local cache should be removed too
** textfield can't be changed (which??)
*Done: login error, placeholder and value show together
* simple data mode:
    * remote upsert and remove directly
    * local cache for search
* Cannot read property 'componentDidEnter' of undefined
*Done: Date show as meaningful
* data list to show object field [object]=>{...}
*/
