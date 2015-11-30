import {React, Component, User, UI, init, Router} from "."
import {Styles, Snackbar, Utils} from 'material-ui'
import supportTap from 'react-tap-event-plugin'

var muiTheme=(new Styles.ThemeManager()).getCurrentTheme(),
    {render}=React;

export default class App extends Component{
    constructor(props){
        super(props)
        supportTap()
        this.state={
            __user:User.current,
            __960:window.innerWidth>960
        }

        var {init:initApp, service, appId}=this.props

        if(!appId)
            throw new Error("Please give application key")

        if(!service)
            throw new Error("Please give service url")


        init(service, appId, initApp, (e,type='Error')=>UI.Messager[type.toLowerCase()](e), UI.Loading)
            .then(()=>{
                    this.setState({__inited:true, __user:User.current})
                    User.event.on('change', ()=>this.setState({__user:User.current}))
                },
                (e)=>this.setState({__inited:true,__user:User.current,__initedError:e.message}))

        Utils.Events.on(window, 'resize', ()=>this.setState({__960:window.innerWidth>960}));
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
                content= (<UI.Loading text="Initializing..."/>)
        }else{
            var Account=require('./account');
            if(!user || !user.sessionToken)
                content=(<Account/>)
        }
        var floating, {__960}=this.state,
            __messager={autoHideDuration:2000, style:{position:"fixed"}},
            __Loading={size:40,left:80,top:5,style:{zIndex:99},loadingColor:"#FF9800"};
        if(!content){
            content=this.renderContent()
            if(__960){
                floating=this.findFloatingButton(content)
                if(floating){
                    this.getFloatingActionButtonPosition(floating)
                    this.getLoadingPosition(__loading, floating)
                }

                this.getMessagerPosition(__messager)
            }
        }
        return (
                <div className="withFootbar">
                    <div id="container">
                        {content}
                        <UI.Messager ref="messager" {...__messager}/>
                        <UI.Loading ref="loading" {...__loading} />
                    </div>
                </div>
            )
    }

    findFloatingButton(root){
        return null
    }

    getFloatingActionButtonPosition(floating){
        var style=floating.props.style,
            {left,right}=style,
            dl=(window.innerWidth-960)/2;
        left ? (style.left=left+dl) : (style.right=right+dl)
    }

    getLoadingPosition(props,floating){
        //size
        var {mini=false}=props,
            defaults=muiTheme.component.floatingActionButton;
        var size=mini ? defaults.miniSize : defaults.buttonSize

        var {position,top,bottom,left,right,zIndex=9}=floating.props.style
        Object.assign(props,{top,bottom,left,right,size})
        props.style.position=position
        props.style.zIndex=zIndex+1
    }

    getMessagerPosition(props){
        getFloatingActionButtonPosition({props:{style:props.style}})
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
