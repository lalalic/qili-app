var React=require('react/addons'),
    {Component,addons:{update}}=React,
    CommandBar=require("./components/command-bar"),
    {TextField}=require('material-ui'),
    App=require("./db/app");

export default class Main extends Component{
    constructor(props){
        super(props)
        this.app=App.current||{}
        this.state={app:this.app}
    }
    render(){
        var commands,
            error;

        if(typeof(this.app._id)=='undefined')
            commands=["Create"]
        else
            commands=["Upload", "Download"]

        if(this.state.error)
            error=<div>this.state.error</div>

        return (
            <div className="form">
                <TextField ref="name"
                    hintText="new application name"
                    defaultValue={this.app.name}
                    onChange={this._onNameChange.bind(this)}/>

                <TextField
                    hintText="API key"
                    disabled={true}
                    defaultValue={this.app.apiKey}/>

                {error}
                <CommandBar
                    style={{position:"fixed",bottom:0,left:0}}
                    items={commands}
                    onCommand={this._onCommand.bind(this)}
                    />
            </div>
        )
    }
    _onNameChange(){
        this.app.name=this.refs.name.getValue()
        if(this.app._id)
            this._save()
    }
    _save(){
        App.cols.upsert(this.app,function(app){
            this.app=update(this.app,{$merge:app})
            this.setState({app:this.app})
        }.bind(this),function(error){
            this.setState({error:error.getMessage()})
        }.bind(this))
    }
    _onCommand(command,e){
        switch(command){
        case "Create":
            this._save()
        break
        case "Upload":
        break
        case "Download":
        break
        }
    }
}
