var React=require('react/addons'),
    {Component,addons:{update}}=React,
    CommandBar=require("./components/command-bar"),
    {TextField}=require('material-ui'),
    App=require("./db/app");

export default class Main extends Component{
    componentWillUnmount(){
        if(!App.current._id)
            App.current=App.last
    }

    render(){
        var app=App.current,
            commands;

        if(typeof(app._id)=='undefined')
            commands=["Save"]
        else
            commands=["Upload", "Download"]

        commands.unshift("Back")

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
                this.forceUpdate()
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
