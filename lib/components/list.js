var React=require('react'),
    {Component}=React,
    Empty=require('./empty'),
    Loading=require('./loading'),
    {List,ListDivider,ListItem}=require('material-ui');

export default class Main extends List{
    constructor(props){
        super(props)
        this.state={data: Array.isArray(this.props.model) ? this.props.model : null}
    }

    componentDidMount(){
        var {model}=this.props;

        if(!model || Array.isArray(model))
            return;

        if(typeof(model.fetch)!='undefined'){
            model.fetch(function(data){
                this.setState({data:data})
            }.bind(this))
        }else if(typeof(model.then)!='undefined'){
            model.then(function(data){
                this.setState({data:data})
            }.bind(this))
        }
    };

    render(){
        var {children, template, pageSize, model, empty, loading={}, ...others}=this.props,
            {data}=this.state;

        if(data){
            children=data.map(function(a){
                return React.createElement(template,{model:a,key:a._id})
            })
        }

        if(!children || children.length==0){
            if(data===null)
                return (<Loading {...loading}/>)

            if(empty)
                return (<Empty {...empty}/>);

            return null;
        }

        return (
                <List {...others}>
                    {children}
                </List>
            )
    }
}

class Item extends Component{
    render(){
        var {model}=this.props;
        return (<ListItem key={model._id}>{model.name||model.title||model._id}</ListItem>)
    }
}

Main.Divider=ListDivider
Main.Item=ListItem

List.defaultProps={
    className:"list",
    containerHeight:window.innerHeight,
    elementHeight:100,
    model:null,
    pageSize:0,
    template:Item,
    empty: null,
    loading: null
}
