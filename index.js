require('./lib/css/index.less')
require('babel/polyfill')

import {init,User,QiliApp,React,Component,Router, UI} from './lib/'
import Application from './lib/db/app'
import App from './lib/app'
import {FloatingActionButton} from 'material-ui'

class QiliConsole extends QiliApp{
    constructor(props){
        super(props)
        this.state={app:Application.current}
        Application.event.on('change',()=>this.setState({app:Application.current}))
    }

    renderContent(){
        var {app}=this.state
        return (
            <div>
                <CurrentApp  app={app}/>
                <RouteHandler app={app}/>
            </div>
        )
    }
}
Object.assign(QiliConsole.defaultProps,{
    appId:"qiliAdmin",
    init:()=>Application.init()
})

class CurrentApp extends Component{
    componentWillReceiveProps(next){
        if(this.props.app!=next.app)
            this.forceUpdate()
    }

    render(){
        var {app={name:""}}=this.props,
            style={position:'fixed',top:10,right:10, opacity:0.7, zIndex:9};
        if(!app || !app._id)
            style.display="none"

        return(
            <FloatingActionButton
                onClick={this.change.bind(this)}
                style={style}>
                {app.name}
            </FloatingActionButton>
        )
    }
    change(){
        var {app}=this.props,
            apps=Application.all,
            len=apps.length;
        if(len<2)
            return;

        var index=-1
        apps.find((a)=>(index++,a._id==app._id))
        Application.current=apps[(index+1) % len]
    }
}


var {Route, RouteHandler,  DefaultRoute} = Router;
module.exports=QiliApp.render(
    <Route path="/" handler={QiliConsole}>
    	<Route name="app" path="app/:name?" handler={require('./lib/app')}/>
    	<Route name="cloud" path="cloud/" handler={require('./lib/cloud')}/>
    	<Route name="data" path="data/:name?" handler={require('./lib/data')}/>
        <Route name="log" path="log/:level?" handler={require('./lib/log')}/>
    	<DefaultRoute handler={require('./lib/dashboard')}/>
    </Route>
)


/**
@Todo:
* after adding new application
    application list doesn't reflect the change
    local storage without All fields, such as without application name, ..., because server returned only _id, createdAt, ...
* after application deletion, UI should go to / even with error
* error happens, UI should not be Empty
* use <Link/> rather than this.context.router.transitionTo
** Never empty UI
** FloatActionButton position when view width is 960
* too small-zoom size in mobile browser
* first focus on form, cloud UI
* background to upload to backend
    done: WebSQLDb is done
    * sqlite
    done: *** after remove app, local cache should be removed too
*/
