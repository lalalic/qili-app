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
                    hintText="new application name"
                    defaultValue={app.name}
                    onChange={this._onNameChange.bind(this)}/>

                <TextField
                    hintText="API key"
                    disabled={true}
                    defaultValue={app.apiKey}/>

                    <TextField
                        hintText="wechat url"
                        disabled={true}
                        defaultValue={app.apiKey ? `http://qili2.com/1/${app.apiKey}/wechat` : ""}/>

                    <TextField
                        hintText="wechat token"
                        disabled={true}
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
