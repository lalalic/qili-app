var React=require('react'),
    {Component,addons:{update}}=React,
    CommandBar=require("./components/command-bar"),
    {TextField}=require('material-ui'),
    {UI:{Icons:{File:{Upload, Download, Save}}}}=require('.'),
    App=require("./db/app");

export default class Main extends Component{
    constructor(props){
        super(props)
        var {name}=this.props.params
        if(name){
            var target=App.all.filter((a)=>a.name==name)[0]
            if(target){
                if(target!==App.current)
                    App.current=target
            }else{
                //return to home?
            }
        }else if(App.current){//new
            if(App.current._id)
                App.current={}
        } else {
            App.current={}
        }
        this.state={app:App.current}
    }
    componentWillUnmount(){
        if(!App.current._id)
            App.current=App.last
    }

    render(){
        var app=this.state.app,
            commands;

        if(typeof(app._id)=='undefined')
            commands=[{action:"Save", icon:Save}]
        else
            commands=[{action:"Upload", icon:Upload}, {action:"Download",icon:Download}]

        commands.unshift({action:"Back"})

        return (
            <div className="form">
                <TextField ref="name"
                    floatingLabelText="application name"
                    style={{width:"100%"}}
                    defaultValue={app.name}
                    onChange={this._onNameChange.bind(this)}/>

                <TextField
                    floatingLabelText="global unique product name: app.qili2.com/{prouctName}"
                    style={{width:"100%"}}
                    defaultValue={app.url}/>

                <TextField
                    floatingLabelText="code url: {url:a html file}<==app.qili2.com/{prouctName}"
                    style={{width:"100%"}}
                    defaultValue={app.clientCodeUrl}/>

                <TextField
                    floatingLabelText="API key: value of http header 'x-application-id'"
                    disabled={true}
                    style={{width:"100%"}}
                    defaultValue={app.apiKey}/>

                <TextField
                    floatingLabelText="wechat url: use it to accept message from wechat"
                    disabled={true}
                    style={{width:"100%"}}
                    defaultValue={app.apiKey ? `http://qili2.com/1/${app.apiKey}/wechat` : ""}/>

                <TextField
                    floatingLabelText="token: use it as third-party token, such as wechat token"
                    disabled={true}
                    style={{width:"100%"}}
                    defaultValue={app.token}/>

                <CommandBar className="footbar"
                    items={commands}
                    onSelect={this.onSelect.bind(this)}
                    />
            </div>
        )
    }
    _onNameChange(){
        var app=App.current
        app.name=this.refs.name.getValue()
        if(app._id)
            App.upsert(app)
    }
    onSelect(command,e){
        switch(command){
        case "Save":
            App.upsert(App.current,function(){
                this.setState({app:App.current})
            }.bind(this))
        break
        case "Upload":
            App.upload()
        break
        case "Download":
            App.donwload()
        break
        }
    }
}
