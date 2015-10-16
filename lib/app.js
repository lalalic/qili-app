var React=require('react'),
    {Component,addons:{update}}=React,
    CommandBar=require("./components/command-bar"),
    {TextField}=require('material-ui'),
    {UI:{Icons:{File:{Upload, Download, Save}}}}=require('.'),
    App=require("./db/app");

export default class Main extends Component{
    constructor(props){
        super(props)
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

                <TextField
                    floatingLabelText="product name: publish app.qili2.com/{prouctName}"
                    style={{width:"100%"}}
                    defaultValue={app.url}/>

                <TextField
                    floatingLabelText="code url: {url}/index.［html｜js]<==app.qili2.com/{prouctName}"
                    style={{width:"100%"}}
                    defaultValue={app.clientCodeUrl}/>

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
        case "Create":
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
