require('restmock')
require('babel/polyfill')

var {init,User,Main,React,Component,Router}=require('./lib/'),
    Application=require('./lib/db/app'),

    {Route, NotFoundRoute, Link, State, DefaultRoute} = Router;

class Entry extends Component{
    constructor(props){
        super(props)
        this.state={
            user:User.current,
            apps:Application.all,
            app: Application.current
        }
    }
    render(){
        var quickActions=[]
        Application.all.forEach(function(app){
            quickActions.push({route:"app",text:app.name})
        })
        quickActions.push({text:"logout", iconClassName:'icon-log-out'})

        return (<Main
                    title="Qili Admin"
                    quickActions={quickActions}
                    menuItems={[
                        {route:'app',text:'Setting'},
                        {route:'cloudcode',text:'Cloud Code'},
                        {route:'data',text:'data'}
                    ]}/>)
    }
}

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

function onReady(){
    init("http://192.168.0.105:9080/1/","admin",function(db){
        Application.init(db).then(function(){
            Router.run(routes, function(Handler, state){
                React.render(<Handler
                    params={state.params}
                    query={state.query}/>, document.body)
            })
        })
    })
}

typeof(document.ondeviceready)!='undefined' ? document.ondeviceready(onReady) : onReady();
