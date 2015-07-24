var {React, Component, UI:{CommandBar, selectFile}}=require('.'),
    App=require('./db/app');

export default class Main extends Component{
    render(){
        return(
            <div>
                <textarea ref="cloudCode" defaultValue={App.current.cloudCode}
                    placeholder="Cloud code"
                    style={{position:'fixed', height: '100%', top:0,lineHeight:'2em',
                        margin:0,width:'100%', padding:10, paddingBottom:51,border:0}}/>
                <CommandBar className="footbar"
                    onSelect={this.onSelect.bind(this)}
                    items={["Back", "Upload", "Save"]}/>
            </div>
        )
    }

    onSelect(cmd){
		var self=this
        switch(cmd){
        case 'Upload':
			selectFile("text").then(function({data}){
				self.refs.cloudCode.getDOMNode().value=data	
			})
        break
        case 'Save':
			var value=this.refs.cloudCode.getDOMNode().value
			if(value==App.current.cloudCode)
				return;
			App.current.cloudCode=value
			App.upsert(App.current)
        break
        }
    }
}
