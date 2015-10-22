var {React, Component, UI:{CommandBar, selectFile, Icons:{File:{Upload, Save}}}}=require('.'),
    App=require('./db/app');

export default class Main extends Component{
    render(){
        return(
            <div>
                <textarea ref="cloudCode" defaultValue={this.props.app.cloudCode}
                    placeholder="Cloud code"
                    style={{position:'absolute', height: '100%', top:0,lineHeight:'2em',
                        margin:0,width:'100%', padding:10, paddingBottom:51,border:0}}/>
                <CommandBar className="footbar"
                    onSelect={this.onSelect.bind(this)}
                    items={[
                        {action:"Back"},
                        {action:"Upload", icon:Upload},
                        {action:"Save",icon:Save}]}/>
            </div>
        )
    }

    componentWillReceiveProps(newProps){
        if(this.props.app!=newProps.app)
            this.forceUpdate()
    }

    onSelect(cmd){
		var self=this, app=this.props.app
        switch(cmd){
        case 'Upload':
			selectFile("text").then(function({data}){
				self.refs.cloudCode.getDOMNode().value=data
			})
        break
        case 'Save':
			var value=this.refs.cloudCode.getDOMNode().value
			if(value==app.cloudCode)
				return;
			app.cloudCode=value
			App.upsert(app)
        break
        }
    }
}
