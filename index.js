require('./lib/css/index.less')
require('babel/polyfill')

import {init,User,QiliApp,React,Component,Router} from './lib/'
import Application from './lib/db/app'
import App from './lib/app'
import {FloatingActionButton} from 'material-ui'

class QiliConsole extends QiliApp{
    constructor(props){
        super(props)
        this.state={app:Application.current}
    }

    componentDidMount(){
        Application.event.on('change',()=>this.setState({app:Application.current}))
    }

    render(a){
        if(a=super.render())
            return a;
        var {app}=this.state
        return (
                <div className="withFootbar">
                    <div id="container">
                        <CurrentApp app={app}/>
                        <RouteHandler app={app}/>
                    </div>
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
        var {_id:nextId}=next.app,
            {_id:oldId}=this.props.app
        if(nextId!=oldId)
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
