var React=require('react'),
    {Component}=React,

    {init}=require('./lib/db/index'),
    Application=require('./lib/db/app'),
    User=require('./lib/db/user'),

    Promise=require('apromise'),

    Router= require('react-router'),
    {Route, NotFoundRoute, Link, State, DefaultRoute, RouteHandler, Navigation} = Router,

    {FloatingActionButton, AppCanvas, LeftNav, DropDownMenu}=require('material-ui');

class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            user:User.current,
            apps:Application.all,
            app: Application.current
        }
    }
    render(){
        var Account=require('./lib/account');

        if(!this.state.user)
            return (<Account/>)

        if(this.state.user && !this.state.user.sessionToken)
            return (<Account user={this.state.user}/>)

        var quickActions=[{text:"logout"}]
        Application.all.forEach(function(app){
            quickApps.push({text:app.name})
        })


        return (
            <AppCanvas predefinedLayout={1}>
                <LeftNav docked={false} menuItems={[
                        {route:'dashboard',text:'Dashboard'},
                        {route:'app',text:'Setting'},
                        {route:'cloudcode',text:'Cloud Code'},
                        {route:'db',text:'data'}
                        ]}/>
                <DropDownMenu menuItems={quickActions}/>
                <RouteHandler/>
            </AppCanvas>
        )
    }
};

var Dashboard=require('./lib/dashboard'),
    routes=(
    <Route name="main" path="/" handler={Main}>
        <Route name="dashboard" path="dashborad" handler={Dashboard}/>
        <Route name="app" path="app" handler={require('./lib/app')}/>
        <Route name="cloud" path="cloud" handler={require('./lib/cloud')}/>
        <Route name="data" path="data" handler={require('./lib/data')}/>

        <DefaultRoute handler={Dashboard}/>
        <NotFoundRoute handler={Dashboard}/>
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
