require('../style/index.less')

import {init,User,QiliApp,React,Component, UI, Position} from '.'
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton} from 'material-ui'

import Application from './db/app'
import App from './app'
import Logo from './icons/logo'

const {Empty}=UI

class QiliConsole extends QiliApp{
    constructor(props){
        super(props)
        Object.assign(this.state,{app:null})
        Application.on('change',app=>this.setState({app}))
    }
	
	shouldComponentUpdate(nextProps, nextState){
		if(this.props.children.props.route.name=='app' 
			&& nextState.app!=this.state.app
			&& !this.context.router.isActive(`app/${nextState.app.name}`)){
			this.context.router.push(`app/${nextState.app.name}`)
			return false
		}
		return true
	}

    renderContent(){
        var {app}=this.state
		if(!app)
			return (<Empty icon={<Logo/>}><Link to="app">click to create your first qili app</Link></Empty>)
		
        return (
            <div>
				{this.props.children.props.route.contextual!==false 
					&& (<CurrentApp key="context" app={app} name={app.name}/>)}
					
                {React.cloneElement(this.props.children,{app})}
            </div>
        )
    }
};

Object.assign(QiliConsole.defaultProps,{
    appId:"qiliAdmin",
    init:()=>Application.init()
});

class CurrentApp extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.name!=this.props.name
    }

    render(){
        var {name, style={fontSize:"xx-small"}, ...others}=this.props;
        
		return(
            <FloatingActionButton className="sticky top right"
                onClick={e=>this.change()}
				mini={true}
                style={style}
                {...others}>
                {name}
            </FloatingActionButton>
        )
    }
    change(){
        var {app, onChange}=this.props,
            apps=Application.all,
            len=apps.length;
        if(len<2)
            return;

        var index=apps.findIndex(a=>a._id==app._id)
			,target=apps[(index+1) % len]
        onChange ? onChange(target) : (Application.current=target)
    }
}

import Dashboard from './dashboard'
import AppUI, {Creator} from './app'
import CloudUI from './cloud'
import DataUI from './data'
import LogUI from './log'

module.exports=QiliApp.render(
    (<Route path="/" component={QiliConsole}>
        <IndexRoute component={Dashboard}/>

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
		
    </Route>),{
		createElement(Component, props){
			if(Component==QiliConsole){
				let child=props.children
					,{route,params}=child.props

				if(route.name=="app")
					props.init=a=>Application.init(params.name)
			}
			return <Component {...props}/>
		}
	}
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
