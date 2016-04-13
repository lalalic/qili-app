import {React, Component, UI} from "."
import {TextField} from 'material-ui'
import App from "./db/app"
import Upload from "material-ui/lib/svg-icons/file/file-upload"
import Download from "material-ui/lib/svg-icons/file/file-download"
import Save from "material-ui/lib/svg-icons/content/save"
import Remove from "material-ui/lib/svg-icons/action/delete"

export default class AppInfo extends Component{
    constructor(props){
        super(props)
        var {app, params={}}=this.props,
            {name}=params
        if(app.name==name)
            ;
        else if(name){
            app=App.all.filter((a)=>a.name==name)[0]
            if(app)
                App.current=app
            else
                throw new Error("you should not be here")
        }
        this.state={app}
    }
    componentWillUnmount(){
        if(!this.props.app._id)
            App.current=App.last
    }

    componentWillReceiveProps(newProps){
        if(this.state.app!=newProps.app)
            this.setState({app:newProps.app})
    }

    render(){
        var app=this.state.app,
            removable=App.isRemovable(app),
            commands;

        if(typeof(app._id)=='undefined')
            commands=[{action:"Save", icon:Save}]
        else if(!removable)
            commands=[]
        else
            commands=[
                {action:"Upload", icon:Upload},
                {action:"Remove",icon:Remove}
            ]

        commands.unshift({action:"Back"})

        return (
            <div className="form">
                <TextField ref="name"
                    floatingLabelText="application name"
                    fullWidth={true}
                    defaultValue={app.name}
                    value={app.name}
                    disabled={!removable}
                    onChange={(e)=>this.setState({app:Object.assign(app,{name:e.target.value})})}
                    onBlur={()=>{
                        if(app._id && app.name!=this.refs.name.props.defaultValue)
                            App.upsert(app).then(()=>this.context.router.replaceWith("app",app))
                    }}/>

                <TextField ref="uname"
                    floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
                    fullWidth={true}
                    value={app.uname}
                    rawValue={app.uname}
                    disabled={!removable}
                    onChange={(e)=>this.setState({app:Object.assign(app,{uname:e.target.value})})}
                    onBlur={()=>{
                        if(app._id && this.refs.uname.props.rawValue!=app.uname)
                            App.upsert(app)
                    }}/>

                <TextField
                    floatingLabelText="API key: value of http header 'x-application-id'"
                    disabled={true}
                    fullWidth={true}
                    value={app.apiKey}/>

                <TextField
                    floatingLabelText="wechat url: use it to accept message from wechat"
                    disabled={true}
                    fullWidth={true}
                    value={app.apiKey ? `http://qili2.com/1/${app.apiKey}/wechat` : ""}/>

                <UI.CommandBar className="footbar" primary="Upload"
                    items={commands}
                    onSelect={this.onSelect.bind(this)}
                    />
            </div>
        )
    }
    onSelect(command,e){
        let app=this.props.app
        switch(command){
        case "Save":
            App.upsert(app,()=>this.setState({app}))
        break
        case "Upload":
            UI.selectFile('raw').then((app)=>App.upload(app))
        break
        case "Remove":
            var name=prompt("Please make sure you know what you are doing by giving this app name")
            if(name==app.name){
                App.remove(app._id,()=>this.context.router.replaceWith("/"))

            }
        break
        }
    }
}
AppInfo.contextTypes={router:React.PropTypes.func}
