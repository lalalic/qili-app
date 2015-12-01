import {React, Component, User, UI, init, Router} from "."
import {Styles, Snackbar, Utils, FloatingActionButton} from 'material-ui'
import supportTap from 'react-tap-event-plugin'

var muiTheme=(new Styles.ThemeManager()).getCurrentTheme(),
    {render, traverseChildren}=React;

export default class App extends Component{
    constructor(props){
        super(props)
        supportTap()
        this.state={
            __user:User.current,
            __960:false//window.innerWidth>960
        }

        var {init:initApp, service, appId}=this.props

        if(!appId)
            throw new Error("Please give application key")

        if(!service)
            throw new Error("Please give service url")
    }

    componentDidMount(){
        var {init:initApp, service, appId}=this.props
        init(service, appId, initApp, (e,type='Error')=>this.refs.msg.show(e,type),this.refs.loading)
            .then(()=>{
                    this.setState({__inited:true, __user:User.current})
                    User.event.on('change', ()=>this.setState({__user:User.current}))
                },
                (e)=>this.setState({__inited:true,__user:User.current,__initedError:e.message}))

        //Utils.Events.on(window, 'resize', ()=>this.setState({__960:window.innerWidth>960}));
    }

    getChildContext(){
        return {muiTheme}
    }

    render(){
        var content,
            {__inited:inited, _initedError:initedError, __user:user}=this.state

        if(!inited){
            if(initedError)
                content= (<UI.Empty text={`Initializing Error: ${initedError}`}/>)
            else
                content= (<UI.Loading status="loading"/>)
        }else{
            var Account=require('./account');
            if(!user || !user.sessionToken)
                content=(<Account/>)
        }
        var floating, {__960}=this.state,
            __messager={},
            __loading={};
        if(!content){
            content=this.renderContent()
            if(__960){
                floating=this.__findFloatingButton(content)
                if(floating){
                    this.__resolveFloatingActionButtonPosition(floating)
                    this.__resolveLoadingPosition(__loading, floating)
                }

                this.__resolveMessagerPosition(__messager)
            }
        }
        return (
                <div className="withFootbar">
                    <div id="container">
                        {content}
                        <UI.Messager ref="msg" {...__messager}/>
                        <UI.Loading ref="loading" status="loading" {...__loading} />
                    </div>
                </div>
            )
    }

    __findFloatingButton(root){
        return null
    }

    __resolveFloatingActionButtonPosition(floating){
        var style=floating.props.style,
            {left,right}=style,
            dl=(window.innerWidth-960)/2;
        left ? (style.left=left+dl) : (style.right=right+dl)
    }

    __resolveLoadingPosition(props,floating){
        //size
        var {mini=false}=props,
            defaults=muiTheme.component.floatingActionButton;
        var size=mini ? defaults.miniSize : defaults.buttonSize

        var {position,top,bottom,left,right,zIndex=9}=floating.props.style
        Object.assign(props,{top,bottom,left,right,size})
        props.style.position=position
        props.style.zIndex=zIndex+1
    }

    __resolveMessagerPosition(props){
        this.__resolveFloatingActionButtonPosition({props:{style:props.style}})
    }

    renderContent(){
        //inherits should return component
    }

    static render(routes){
        var history=App.history || Router.HashLocation
        var container=document.getElementById('app')
        if(!container){
            container=document.createElement('div')
            container.id='app'
            document.body.appendChild(container)
        }

        return Router.run(routes, history, (Handler, state)=>{
            container.style.height=window.innerHeight+'px'
            render(<Handler params={state.params} query={state.query}/>, container)
        })
    }
};

App.childContextTypes={muiTheme:React.PropTypes.object}

App.propsTypes={
    service: React.PropTypes.string.isRequired,
    appId:React.PropTypes.string.isRequired,
    init:React.PropTypes.func
}
if(global.__test)
    App.defaultProps=global.__test
else
    App.defaultProps={
        service:"http://qili2.com/1/",
        init:()=>console.info("service inited")
    }

/**
*@Todo:
* positioning in big screen
    * FloatingActionButton : fixed position
    * Loading: cover FloatingActionButton
    * Messager: fixed bottom
*/
