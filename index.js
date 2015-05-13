var React=require('react/addons'),
    {init}=require('./lib/db/index'),
    Application=require('./lib/db/app'),

    Router= require('react-router'),
    {Route, NotFoundRoute, Link, State, DefaultRoute} = Router,
    Main=require("./lib/main");

Main.defaultProps.title="Qili Admin"

var Dashboard=require('./lib/dashboard'),
    routes=(
    <Route name="main" path="/" handler={Main}>
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
