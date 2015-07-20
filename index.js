require('restmock')
require('babel/polyfill')

var {init,User,Main,React,Component,Router}=require('./lib/'),
    Application=require('./lib/db/app'),
	App=require('./lib/app'),
	{MenuItem,Styles:{ThemeManager}, FloatingActionButton, Avatar}=require('material-ui'),
	themeManager=new ThemeManager(),
    {Route, NotFoundRoute, Link, State, DefaultRoute, HistoryLocation} = Router;

class Entry extends Component{
	getChildContext(){
        return {muiTheme:themeManager.getCurrentTheme()}
    }
    render(){
        var floatAction,main
        if(Application.current){
            floatAction=(<CurrentApp onChange={()=>this.forceUpdate()}/>)
            main=(<RouteHandler/>)
        }else{
            main=(<App/>)
        }

        return (
            <Main.Light>
                <div className="withFootbar">
                    {floatAction}
                    {main}
                </div>
            </Main.Light>
        )
    }
}
Entry.childContextTypes={muiTheme:React.PropTypes.object}

class CurrentApp extends Component{
    render(){
        return(
            <FloatingActionButton
                onClick={this.change.bind(this)}
                style={{position:'fixed',top:10,right:10}}>
                {Application.current.name}
            </FloatingActionButton>
        )
    }
    change(){
        var current=Application.current,
            apps=Application.all,
            len=apps.length;
        if(len<2)
            return;

        var index=apps.indexOf(current)
        Application.current=apps[index+1 % len]
        var {onChange}=this.props
        onChange()
    }
}
CurrentApp.PropTypes={
    onChange: React.PropTypes.func.isRequired
}

;(function onReady(){
	var Dashboard=require('./lib/dashboard'),
		routes=(
			<Route name="main" path="/" handler={Entry}>
				<Route name="dashboard" handler={Dashboard}/>
				<Route name="app" handler={require('./lib/app')}/>
				<Route name="cloud" handler={require('./lib/cloud')}/>
				<Route name="data" handler={require('./lib/data')}/>

				<DefaultRoute handler={Dashboard}/>
			</Route>
		);

    init("http://192.168.0.105:9080/1/","admin",function(db){
        Application.init(db).then(function(){
            Router.run(routes, (!window.cordova ? HistoryLocation : undefined), function(Handler, state){
                React.render(<Handler params={state.params} query={state.query}/>, document.body)
            })
        })
    })
})();
