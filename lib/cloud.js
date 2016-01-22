var {React, Component, UI:{CommandBar, fileSelector}}=require('.'),
    App=require('./db/app');

import Upload from "material-ui/lib/svg-icons/file/file-upload"
import Save from "material-ui/lib/svg-icons/content/save"

export default class Cloud extends Component{
    constructor(props){
        super(...arguments)
        this.state={cloudCode:this.props.app.cloudCode}
    }
    render(){
        return(
            <div>
                <textarea ref="cloudCode"
                    value={this.state.cloudCode}
                    onChange={(e)=>this.setState({cloudCode:e.target.value})}
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
            this.setState({cloudCode:newProps.app.cloudCode})
    }

    onSelect(cmd){
		var self=this, app=this.props.app
        switch(cmd){
        case 'Upload':
			fileSelector.selectTextFile().then(({data:cloudCode})=>{
                this.setState({cloudCode})
                this.onSelect('Save')
            })
        break
        case 'Save':
			var value=this.state.cloudCode
			if(value==app.cloudCode)
				return;
			app.cloudCode=this.checkCode(value)
			App.upsert(app)
        break
        }
    }

    checkCode(code){
        //@TODO
        return code
    }
}
