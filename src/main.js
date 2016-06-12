require('../style/index.less')

import {init,User,QiliApp,React,Component, UI, Position} from '.'
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect} from "react-router"
import Application from './db/app'
import App from './app'
import {FloatingActionButton} from 'material-ui'


class QiliConsole extends QiliApp{
    constructor(props){
        super(props)
        Object.assign(this.state,{app:this.props.app})
        Application.on('change',app=>this.setState({app}))
    }

    renderContent(){
        var {app}=this.state
            ,{children:child}=this.props
            ,{route}=child.props
        return (
            <div>
                <CurrentApp app={app} onChange={target=>{
					if(route.name=="app")
						this.context.router.push(`app/${target.name}`)
					else
						Application.current=target
				}}/>
                {React.cloneElement(child,{app})}
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
        var {name:nextName}=nextProps.app||{},
            {name}=this.props.app||{};
        return nextName!=name
    }

    render(){
        var {app={name:""}, style={}, ...others}=this.props;
        if(!app._id)
            style.display="none"

        return(
            <FloatingActionButton className="sticky top right"
                onClick={e=>this.change()}
                style={style}
                {...others}>
                {app.name}
            </FloatingActionButton>
        )
    }
    change(){
        var {app, onChange=a=>a}=this.props,
            apps=Application.all,
            len=apps.length;
        if(len<2)
            return;

        var index=apps.findIndex(a=>a._id==app._id)
        onChange(apps[(index+1) % len])
    }
}

module.exports=QiliApp.render(
    (<Route path="/" component={QiliConsole}>
        <IndexRoute component={require('./dashboard')}/>

        <Route path="app" name="app" component={require('./app')}>
            <IndexRoute onEnter={(nextState, replace, callback)=>{
    				Application.current={}
    				callback()
    			}}/>

            <Route path=":name"/>
        </Route>

        <Route path="cloud" component={require('./cloud')}/>

        <Route path="data" component={require('./data')}>
            <IndexRedirect to={`${User._name}`}/>
            <Route path=":name"/>
        </Route>

        <Route path="log" component={require('./log')}>
            <IndexRedirect to="all"/>
            <Route path=":level"/>
        </Route>
        <Redirect from="log" to="log/all" />
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
