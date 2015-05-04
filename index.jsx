var {init,Service}=require('./lib/db')
var React=require('react');
var Promise=require('apromise');
var Router= require('react-router'),
    {Route, NotFoundRoute, Link, State, DefaultRoute, RouteHandler, Navigation} = Router;
var mui=require('material-ui'),
    {FloatingActionButton, AppCanvas, LeftNav}=mui;

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={user:global.user}
    }
    render(){
        var Account=require('./lib/account.jsx');

        if(!this.state.user)
            return (<Account/>)

        if(this.state.user && !this.state.user.sessionToken)
            return (<Account user={this.state.user}/>)

        return (
            <AppCanvas predefinedLayout={1}>
                <LeftNav docked={false} menuItems={[
                        {route:'dashboard',text:'Dashboard'},
                        {route:'app',text:'Setting'},
                        {route:'cloudcode',text:'Cloud Code'},
                        {route:'db',text:'data'}
                        ]}/>
                <RouteHandler/>
            </AppCanvas>
        )
    }
};

var Dashboard=require('./lib/dashboard.jsx'),
    routes=(
    <Route name="main" path="/" handler={Main}>
        <Route name="dashboard" path="dashborad" handler={Dashboard}/>
        <Route name="app" path="app" handler={require('./lib/app.jsx')}/>
        <Route name="cloud" path="cloud" handler={require('./lib/cloud.jsx')}/>
        <Route name="data" path="data" handler={require('./lib/data.jsx')}/>

        <DefaultRoute handler={Dashboard}/>
        <NotFoundRoute handler={Dashboard}/>
    </Route>
);


class Application extends Service{
    
}

function onReady(){
    init("http://192.168.0.105:9080/1/","admin",function(){
        Router.run(routes, function(Handler, state){
            React.render(<Handler params={state.params} query={state.query}/>, document.body)
        })
    })
}

typeof(document.ondeviceready)!='undefined' ? document.ondeviceready(onReady) : onReady();
