var {React, Component, UI:{CommandBar}}=require('.'),
    App=require('./db/app');

export default class Main extends Component{
    render(){
        return(
            <div>
                <textarea defaultValue={App.current.cloudCode}
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
        switch(cmd){
        case 'Upload':

        break
        case 'Save':

        break
        }
    }
}
