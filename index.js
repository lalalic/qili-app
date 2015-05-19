var React=require('react/addons'),
    {Component}=React,
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

class Messager extends Component{
    constructor(props){
        super(props)
        this.state={message:null, type:null}
    }

    render(){
        return (<div className={"messager "+(this.state.type||"")}>{this.state.message}</div>)
    }
}

function onReady(){
    var messager=React.render(<Messager/>, document.body)

    init("http://192.168.0.105:9080/1/","admin",function(db){
        Application.init(db).then(function(){
            Router.run(routes, function(Handler, state){
                React.render(<Handler
                    params={state.params}
                    query={state.query}/>, document.body)
            })
        })
    }, function(error){
        messager.setState({message:"Server Error:"+error,type:'error'})
    })
}

typeof(document.ondeviceready)!='undefined' ? document.ondeviceready(onReady) : onReady();
