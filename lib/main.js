var React=require('react'),
    {Component}=React,
    injectTapEventPlugin = require("react-tap-event-plugin"),

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
            user:User.current
        }
    }
    render(){
        var Account=require('./account');

        if(!this.state.user)
            return (<Account/>)

        if(this.state.user && !this.state.user.sessionToken)
            return (<Account user={this.state.user}/>)

        var leftNav;
        if(this.props.menuItems)
            leftNav=(<LeftNav ref="leftNav" docked={false}
                header={<h2>{this.props.title}</h2>}
                selectedIndex={this._getSelectedIndex()}
                onChange={this._onMenuAction.bind(this)}
                menuItems={this.props.menuItems}/>);

        var quickActions, quickActionButton;
        if(this.props.quickActions){
            quickActions=(<QuickAction
                ref="quickActions"
                onChange={this._onMenuAction.bind(this)}
                style={{position:'absolute',right:0,top:65}}
                actions={this.props.quickActions}/>);

            quickActionButton=(<IconButton style={{float:"right"}}
                onTouchTap={()=>this.refs.quickActions.toggle()}
                iconClassName="icon-android-more"/>);
        }

        return (
            <AppCanvas predefinedLayout={1}>
                <AppBar
                    zDepth={3}
                    onMenuIconButtonTouchTap={()=>this.refs.leftNav.toggle()}
                    showMenuIconButton={leftNav?true:false}
                    title={this.props.title}>
                    {quickActionButton}
                </AppBar>
                {leftNav}

                {quickActions}
                <RouteHandler/>
            </AppCanvas>
        )
    }
    _onMenuAction(e,key,menu){
        if(typeof(menu.route)!='undefined')
            this.context.router.transitionTo(menu.route)
    }
    _getSelectedIndex() {
        var menuItems=this.props.menuItems, currentItem;

        for (var i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
        }
    }
};
Main.defaultProps={title:"Qili"}
Main.contextTypes={router:React.PropTypes.func}
