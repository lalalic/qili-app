import {React, Component, UI} from "."
import {TextField} from 'material-ui'
import dbApplication from "./db/app"
import Upload from "material-ui/svg-icons/file/file-upload"
import Download from "material-ui/svg-icons/file/file-download"
import Save from "material-ui/svg-icons/content/save"
import Remove from "material-ui/svg-icons/action/delete"

export default class AppInfo extends Component{
	state={}
	
    shouldComponentUpdate (newProps){
		if(this.state.frozen)
			return false
		
		return this.props.app!=newProps.app
    }
	
	componentWillReceiveProps(nextProps){
		if(this.props.params.name!=nextProps.params.name)
			dbApplication.current=nextProps.params.name
	}

    render(){
        var app=this.props.app, 
			removable=dbApplication.isRemovable(app)
			
        return (
            <div className="form">
                <TextField ref="name"
                    floatingLabelText="application name"
                    fullWidth={true}
                    disabled={!removable}
					value={app.name}
                    onBlur={e=>{
						app.name=e.target.value.trim()
                        if(app.name!=this.refs.name.props.value)
                            dbApplication.upsert(app).then(()=>this.context.router.replace(`app/${app.name}`))
                    }}/>

                <TextField ref="uname"
                    floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
                    fullWidth={true}
                    disabled={!removable}
                    value={app.uname}
                    onBlur={e=>{
						app.uname=e.target.value.trim()
                        if(this.refs.uname.props.value!=app.uname)
                            dbApplication.upsert(app)
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

				{
					removable && 
					(<UI.CommandBar className="footbar" primary="Upload"
						items={[{action:"Upload", icon:Upload},{action:"Remove",icon:Remove}]}
						onSelect={cmd=>this.onSelect(cmd)}
						/>)
				}
            </div>
        )
    }
    onSelect(command,e){
        let app=this.props.app
        switch(command){
        case "Upload":
            UI.selectFile('raw').then(app=>dbApplication.upload(app))
        break
        case "Remove":
            var name=prompt("Please make sure you know what you are doing by giving this app name")
            if(name==app.name){
				this.setState({frozen:true})
                dbApplication.remove(app._id)
					.then(a=>this.context.router.replace("/"))
            }
        break
        }
    }
	static contextTypes={router:React.PropTypes.object}
	
	static Creator=class extends Component{
		shouldComponentUpdate(nextProps){
			return false
		}
		render(){
			return (
            <div className="form">
                <TextField ref="name"
                    floatingLabelText="application name"
                    fullWidth={true}/>

                <TextField ref="uname"
                    floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
                    fullWidth={true}/>

                <TextField
                    floatingLabelText="API key: value of http header 'x-application-id'"
                    disabled={true}
                    fullWidth={true}/>

                <TextField
                    floatingLabelText="wechat url: use it to accept message from wechat"
                    disabled={true}
                    fullWidth={true}/>

                <UI.CommandBar className="footbar"
                    items={[{action:"Save", label:"保存", icon:Save}]}
					onSelect={cmd=>this.onSelect(cmd)}
                    />
            </div>
			)
		}
		onSelect(action){
			switch(action){
			case 'Save':
				let {name, uname}=this.refs
				name=name.getValue()
				uname=uname.getValue()
				dbApplication.upsert({name, uname})
					.then(app=>{
						dbApplication.current=app
						this.context.router.replace({pathname:`app/${name}`})
					})
			}
		}
		static contextTypes={router:React.PropTypes.object}
	}
}
