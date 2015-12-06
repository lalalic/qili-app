import {React, Component, UI} from "."
import {TextField} from 'material-ui'
import App from "./db/app"
import Upload from "material-ui/lib/svg-icons/file/file-upload"
import Download from "material-ui/lib/svg-icons/file/file-download"
import Save from "material-ui/lib/svg-icons/content/save"
import Remove from "material-ui/lib/svg-icons/action/delete"

export default class AppInfo extends Component{
    componentWillUnmount(){
        if(!this.props.app._id)
            App.current=App.last
    }

    componentWillReceiveProps(newProps){
        if(this.props.app!=newProps.app)
            this.forceUpdate()
    }

    render(){
        var app=this.props.app,
            commands;

        if(typeof(app._id)=='undefined')
            commands=[{action:"Save", icon:Save}]
        else if(!App.isRemovable(app))
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
                    value={app.name}
                    onBlur={()=>this.change('name')}/>

                <TextField ref="uname"
                    floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
                    fullWidth={true}
                    value={app.uname}
                    onBlur={()=>this.change('uname')}/>

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
    change(key){
        let app=this.props.app,
            value=this.refs[key].getValue().trim()

        if(app[key]==value || (!app[key] && value.length==0) )
            return;

        app[key]=value
        app._id && App.upsert(app)
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
