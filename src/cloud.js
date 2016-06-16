import React, {Component} from "react"
import {UI} from '.'
import App from './db/app'

import Upload from "material-ui/svg-icons/file/file-upload"
import Save from "material-ui/svg-icons/content/save"

const {CommandBar, fileSelector, Messager}=UI

export default class Cloud extends Component{
	
	state={cloudCode:this.props.app.cloudCode}

    render(){
        return(
            <div>
                <textarea ref="cloudCode"
                    value={this.state.cloudCode}
                    onBlur={e=>this.setState({cloudCode:e.target.value})}
                    placeholder="Cloud code"
                    style={{position:'absolute', height: '100%', top:0,lineHeight:'2em',
                        margin:0,width:'100%', padding:10, paddingBottom:51,border:0}}/>
                <CommandBar className="footbar"
                    onSelect={cmd=>this.onSelect(cmd)}
                    items={[
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
		var app=this.props.app
        switch(cmd){
        case 'Upload':
			fileSelector.selectTextFile().then(({data:cloudCode})=>{
                this.setState({cloudCode})
                this.onSelect('Save')
            })
        break
        case 'Save':
			let code=this.state.cloudCode
			if(code!=app.cloudCode){
				try{
					app.cloudCodecode=this.checkCode(value)
					App.upsert(app)
				}catch(e){
					Messager.show(e.message)
				}
			}
        break
        }
    }

    checkCode(code){
		new Function("Cloud",code)
    }
}
