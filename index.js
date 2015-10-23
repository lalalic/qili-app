//require('restmock');
require('./lib/css/index.less')
require('babel/polyfill')

var {init,User,Main,React,Component,Router}=require('./lib/'),
    Application=require('./lib/db/app'),
	App=require('./lib/app'),
	{MenuItem,Styles:{ThemeManager}, FloatingActionButton, Avatar}=require('material-ui'),
	themeManager=new ThemeManager(),
    {Route, RouteHandler, NotFoundRoute, Link, State, DefaultRoute, HistoryLocation} = Router;

class Entry extends Component{
    constructor(props){
        super(props)
        this.state={app:Application.current}
    }
    componentDidMount(){
        Application.event.on('change',this.__onCurrentAppchange=()=>this.setState({app:Application.current}))
    }

    componentWillUnmount(){
        Application.event.removeListener('change',this.__onCurrentAppchange)
    }
	getChildContext(){
        return {muiTheme:themeManager.getCurrentTheme()}
    }
    render(){
        var floatAction
        if(this.state.app)
            floatAction=(<CurrentApp app={this.state.app}/>)

        return (
            <Main.Light>
                <div className="withFootbar">
                    {floatAction}
                    <RouteHandler app={this.state.app}/>
                </div>
            </Main.Light>
        )
    }
}
Entry.childContextTypes={muiTheme:React.PropTypes.object}

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
	var Dashboard=require('./lib/dashboard'),
		routes=(
			<Route name="main" path="/" handler={Entry}>
				<Route name="dashboard" handler={Dashboard}/>
				<Route name="app" path="app/:name?" handler={require('./lib/app')}/>
				<Route name="cloud" path="cloud/" handler={require('./lib/cloud')}/>
				<Route name="data" path="data/:name?" handler={require('./lib/data')}/>
                <Route name="log" path="log/:level?" handler={require('./lib/log')}/>
				<DefaultRoute handler={Dashboard}/>
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
})();
