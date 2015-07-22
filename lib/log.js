var {React, Component, UI:{CommandBar, List, Messager}}=require('.'),
    App=require('./db/app'),
    {FontIcon}=require('material-ui');

export default class Main extends Component{
    constructor(p){
        super(p)
        this.state={level:null}
    }
    render(){
        var {level}=this.state
        return(
            <div>
                {/*<List model={App.getLog(level ? {level} : undefined)}
                    template={ALog}/>*/}

                <CommandBar className="footbar" style={{textAlign:'left'}}
                    onSelect={this.onSelect.bind(this)}
                    items={["Back", "Download", "Clean",
                        (<Level ref="level" label="Level"
                            self={()=>this.refs.level}
                            value={level}
                            onChange={(level)=>this.setState({level})} />)]}/>
            </div>
        )
    }

    onSelect(cmd){
        switch(cmd){
        case 'Download':
            App.downloadLog()
        break
        case 'Clean':
            App.cleanLog()
        break
        }
    }
}

class Level extends CommandBar.DialogCommand{
    renderContent(){
        var {onChange, value}=this.props,
            items="info,warning,error".split(",").map(function(a){
                return (<List.Item key={a} primaryText={a}
                            leftIcon={<FontIcon className={`mui-font-icon icon-${a}`}/>}
                            onClick={()=>onChange(a)}/>)
            })

        return (<List>{items}</List>)
    }
}

class ALog extends Component{
    render(){
        var {model}=this.props
        return (<List.Item primaryText={model.message}/>)
    }
}
