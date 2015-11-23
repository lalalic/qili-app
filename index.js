require('restmock');
require('./lib/css/index.less')
require('babel/polyfill')

var {init,User,Main,React,Component,Router:_Router, UI:{Loading, Empty}}=require('./lib/'),
    Application=require('./lib/db/app'),
	App=require('./lib/app'),
	{MenuItem,Styles:{ThemeManager}, FloatingActionButton, Avatar}=require('material-ui'),
	muiTheme=ThemeManager.getMuiTheme(require('material-ui/lib/styles/raw-themes/light-raw-theme')),
    {Router, Route, IndexRoute, HistoryLocation} = _Router;

class QiliConsole extends Component{
    constructor(props){
        super(props)
        this.state={app:Application.current, inited:false}
        init("http://qili2.com/1/","qiliAdmin",
            (db)=>Application.init(db)
                .then(()=>this.setState({inited:true}),(e)=>this.setState({inited:true,initedError:e.message})))
    }
    componentDidMount(){
        Application.event.on('change',this.__onCurrentAppchange=()=>this.setState({app:Application.current}))
    }

    componentWillUnmount(){
        Application.event.removeListener('change',this.__onCurrentAppchange)
    }
	getChildContext(){
        return {muiTheme}
    }

    render(){
        var {inited, initedError}=this.state
        if(!inited){
            if(initedError)
                return (<Empty text={`Initializing Error: ${initedError}`}/>)
            return  (<Loading/>)
        }

        var floatAction
        if(this.state.app)
            floatAction=(<CurrentApp app={this.state.app}/>)

        var Dashboard=require('./lib/dashboard')
        return (
            <Main.Light>
                <div className="withFootbar">
                    {floatAction}
                    <Router app={this.state.app}
                        history={(!window.cordova ? HistoryLocation : undefined)}>
                        <IndexRoute component={Dashboard}/>
                        <Route name="dashboard" component={Dashboard}/>
                        <Route name="app" path="app/:name?" component={require('./lib/app')}/>
                        <Route name="cloud" path="cloud/" component={require('./lib/cloud')}/>
                        <Route name="data" path="data/:name?" component={require('./lib/data')}/>
                        <Route name="log" path="log/:level?" component={require('./lib/log')}/>
                    </Router>
                </div>
            </Main.Light>
        )
    }
}
QiliConsole.childContextTypes={muiTheme:React.PropTypes.object}
QiliConsole.contextTypes={router:React.PropTypes.func}

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


;(function onReady(){
    var container=document.getElementById('app')
    container.style.height=window.innerHeight+'px'
    require('react-dom').render(<QiliConsole/>,container)
    /*
	var Dashboard=require('./lib/dashboard'),
		routes=(
			<Route name="main" path="/" handler={Entry}>
				<Route name="dashboard" handler={Dashboard}/>
				<Route name="app" path="app/:name?" handler={require('./lib/app')}/>
				<Route name="cloud" path="cloud/" handler={require('./lib/cloud')}/>
				<Route name="data" path="data/:name?" handler={require('./lib/data')}/>
                <Route name="log" path="log/:level?" handler={require('./lib/log')}/>
				<IndexRoute handler={Dashboard}/>
			</Route>
		);

    init("http://qili2.com/1/","qiliAdmin",function(db){
        Application.init(db).then(function(){
            Router.run(routes, (!window.cordova ? HistoryLocation : undefined), function(Handler, state){
                var container=document.getElementById('app')
                container.style.height=window.innerHeight+'px'
                React.render(<Handler params={state.params} query={state.query}/>, container)
            })
        })
    })
    */
})();
