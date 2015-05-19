var React=require('react'),
    {Component}=React,
    Loading=require('./components/loading'),
    Empty=require('./components/empty'),
    App=require("./db/app"),
    User=require("./db/user"),
    {Tabs, Tab, FloatingActionButton}=require('material-ui'),
    {Table,Tr}=require('reactable');

class Data extends Component{
    constructor(props){
        super(props)
        this.state={data:null}
    }
    componentDidMount(){
        App.getData(this.props.collection)
            .then(function(data){
                this.setState({data:data})
            }.bind(this))
    }
    render(){
        if(this.state.data===null)
            return (<Loading/>)

        if(this.state.data.length==0)
            return (<Empty/>)

        return (<Table data={this.state.data}/>)
    }
}

class Schema extends Component{
    constructor(props){
        super(props)
        this.state={schema:null}
    }
    componentDidMount(){
        App.getSchema(this.props.collection)
            .then(function(schema){
                this.setState({schema:schema})
            })
    }
    render(){
        if(this.schema===null)
            return (<Loading/>)

        if(this.schema.fields==null || this.schema.fields.length==0)
            return (<Empty/>)

        return (<Table data={this.state.schema.fields}/>)
    }
}

class Names extends Component{
    constructor(props){
        super(props)
        this.state={schemas:null}
    }
    componentDidMount(){
        App.getSchema().then(function(schema){
            this.setState({schemas:schema})
        }.bind(this))
    }
    render(){
        if(!this.state.schemas)
            return <Loading/>

        var i=0, names=this.state.schemas.map(function(schema){
            return (<option key={i++} value={schema.name}>{schema.name}</option>)
        })
        return (
            <select>
                {names}
            </select>
        )
    }
}


export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={col:User._name}
    }
    render(){
        return (
            <Tabs>
                <Tab label={<Names onChange={this._onChangeCollection.bind(this)}/>}>
                    <Data collection={this.state.col}/>
                </Tab>
                <Tab label="Schema">
                    <Schema collection={this.state.col}/>
                </Tab>
            </Tabs>
        )
    }
    _onChangeCollection(newCol){
        this.setState({col:newCol})
    }
}
