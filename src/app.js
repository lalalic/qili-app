import {React, Component, UI} from "."
import {TextField} from 'material-ui'
import App from "./db/app"
import Upload from "material-ui/svg-icons/file/file-upload"
import Download from "material-ui/svg-icons/file/file-download"
import Save from "material-ui/svg-icons/content/save"
import Remove from "material-ui/svg-icons/action/delete"

export default class AppInfo extends Component{
    shouldComponentUpdate (newProps){
		if(this.removing)
			return false

		if(this.props.params.name!=newProps.params.name){
			App.current=newProps.params.name
			return true
		}

		if(this.props.app!=newProps.app)
			return true

		return false
    }

    componentWillUnmount(){
        if(!this.props.app._id)
            App.current=App.last
    }

    render(){
        var app=this.props.app,
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
                    disabled={!removable}
					value={app.name}
                    onBlur={e=>{
						app.name=e.target.value.trim()
                        if(app._id && app.name!=this.refs.name.props.value)
                            App.upsert(app).then(()=>this.context.router.replace(`app/${app.name}`))
                    }}/>

                <TextField ref="uname"
                    floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
                    fullWidth={true}
                    disabled={!removable}
                    value={app.uname}
                    onBlur={e=>{
						app.uname=e.target.value.trim()
                        if(app._id && this.refs.uname.props.value!=app.uname)
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
            App.upsert(app)
				.then(a=>this.context.router.replace(`app/${app.name}`))
        break
        case "Upload":
            UI.selectFile('raw').then(app=>App.upload(app))
        break
        case "Remove":
            var name=prompt("Please make sure you know what you are doing by giving this app name")
            if(name==app.name){
				this.removing=true
                App.remove(app._id)
					.then(a=>this.context.router.replace("/"))
            }
        break
        }
    }
}
AppInfo.contextTypes={router:React.PropTypes.object}
