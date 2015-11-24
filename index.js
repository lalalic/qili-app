require('restmock');
require('./lib/css/index.less')
require('babel/polyfill')

var {init,User,QiliApp,React,Component,Router}=require('./lib/'),
    Application=require('./lib/db/app'),
	App=require('./lib/app'),
	{MenuItem, Styles, FloatingActionButton, Avatar}=require('material-ui'),
    {Route, RouteHandler,  DefaultRoute, HistoryLocation} = Router;

var muiTheme=(new Styles.ThemeManager()).getCurrentTheme()
class QiliConsole extends Component{
    constructor(props){
        super(props)
        this.state={app:Application.current}
    }
    
    componentDidMount(){
        Application.event.on('change',()=>this.setState({app:Application.current}))
    }

    getChildContext(){
        return {muiTheme}
    }
    render(){
        return (
            <QiliApp appId="qiliAdmin" init={()=>Application.init()}>
                <div className="withFootbar">
                    {this.state.app ? (<CurrentApp app={this.state.app}/>) : null}
                    <RouteHandler app={this.state.app}/>
                </div>
            </QiliApp>
        )
    }
}
QiliConsole.childContextTypes={muiTheme:React.PropTypes.object}

class CurrentApp extends Component{
    componentWillReceiveProps(next){
        var {_id:nextId}=next.app,
            {_id:oldId}=this.props.app
        if(nextId!=oldId)
            this.forceUpdate()
    }

    render(){
        var {app}=this.props,
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

QiliApp.render(
    <Route name="main" path="/" handler={QiliConsole}>
    	<Route name="app" path="app/:name?" handler={require('./lib/app')}/>
    	<Route name="cloud" path="cloud/" handler={require('./lib/cloud')}/>
    	<Route name="data" path="data/:name?" handler={require('./lib/data')}/>
        <Route name="log" path="log/:level?" handler={require('./lib/log')}/>
    	<DefaultRoute handler={require('./lib/dashboard')}/>
    </Route>
)
