import React from 'react'
import {Styles} from 'material-ui'
import RawLight from 'material-ui/lib/styles/raw-themes/light-raw-theme'

import Empty from './components/empty'
import Loading from './components/loading'
import {init, User} from './db'

var muiTheme=Styles.ThemeManager.getMuiTheme(RawLight)

export default class Frame extends React.Component{
    constructor(props){
        super(props)
        require("react-tap-event-plugin")();

        this.state={
            user:User.current,
            inited: false
        }

        var {init:initApp, service, appId}=this.props

        init(service, appId, initApp)
            .then(()=>{
                    this.setState({inited:true, user:User.current})
                    User.event.on('change', ()=>this.setState({user:User.current}))
                },
                (e)=>this.setState({inited:true,user:User.current,initedError:e.message}))
    }

    getChildContext(){
        return {muiTheme}
    }

    render(){
        var {inited, initedError}=this.state
        if(!inited){
            if(initedError)
                return (<Empty text={`Initializing Error: ${initedError}`}/>)
            return  (<Loading text="Initializing..."/>)
        }

        var Account=require('./account');

        if(!this.state.user || !this.state.user.sessionToken)
            return (<Account/>)

        return React.Children.only(this.props.children)
    }

}

Frame.Light=Frame
Frame.propsTypes={
    service: React.PropTypes.string.isRequired,
    appId:React.PropTypes.string.isRequired,
    init:React.PropTypes.func
}
Frame.defaultProps={
    service:"http://qili2.com/1/",
    appId:null,
    init:()=>console.info("service inited")
}
Frame.childContextTypes={muiTheme:React.PropTypes.object}
