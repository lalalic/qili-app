var React=require('react'),
    {Component}=React,
    injectTapEventPlugin = require("react-tap-event-plugin"),

    Application=require('./db/app'),
    User=require('./db/user'),

    QuickAction=require('./components/quick-action'),

    Router= require('react-router'),
    {Route, NotFoundRoute, Link, State, DefaultRoute, RouteHandler, Navigation} = Router,
    {AppCanvas, AppBar, IconButton, LeftNav, MenuItem}=require('material-ui');

injectTapEventPlugin();

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            user:User.current,
            apps:Application.all,
            app: Application.current
        }
    }
    render(){
        var Account=require('./account');

        if(!this.state.user)
            return (<Account/>)

        if(this.state.user && !this.state.user.sessionToken)
            return (<Account user={this.state.user}/>)


        var quickActions=[]
        Application.all.forEach(function(app){
            quickActions.push({route:"app",text:app.name})
        })
        quickActions.push({text:"logout", iconClassName:'icon-log-out'})

        return (
            <AppCanvas predefinedLayout={1}>
                <AppBar
                    zDepth={0}
                    onMenuIconButtonTouchTap={()=>this.refs.leftNav.toggle()}
                    showMenuIconButton={true}
                    title={this.props.title}>
                    <IconButton style={{float:"right"}}
                        onTouchTap={()=>this.refs.quickActions.toggle()}
                        iconClassName="icon-android-more"/>
                </AppBar>
                <QuickAction
                    ref="quickActions"
                    style={{position:'absolute',right:0,top:65}}
                    actions={quickActions}/>
                <LeftNav ref="leftNav" docked={false}
                    header={<h2>{this.props.title}</h2>}
                    selectedIndex={this._getSelectedIndex()}
                    onChange={this._onLeftNav.bind(this)}
                    menuItems={Main.menuItems}/>

                <RouteHandler/>
            </AppCanvas>
        )
    }
    _onLeftNav(e,key,menu){
        this.context.router.transitionTo(menu.route)
    }
    _getSelectedIndex() {
        var menuItems=Main.menuItems, currentItem;

        for (var i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
        }
    }
};
Main.defaultProps={title:"Qili"}
Main.contextTypes={router:React.PropTypes.func}
Main.menuItems=[
    {route:'app',text:'Setting'},
    {route:'cloudcode',text:'Cloud Code'},
    {route:'db',text:'data'}
    ]
