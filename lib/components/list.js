var React=require('react/addons'),
    {Component}=React,
    Empty=require('./empty'),
    InfiniteList=require('react-infinite');

export default class List extends Component{
    constructor(props){
        super(props)
        this.state={data: Array.isArray(this.props.model) ? this.props.model : null}
    }

    componentWillMount(){
        if(!this.props.model)
            return;

        if(Array.isArray(this.props.model))
            return;

        this.props.model.find()
            .fetch(function(data){
                this.setState({data:data})
            }.bind(this))
    };

    render(){
        var {children, template, pageSize, model, ...others}=this.props,
            {data}=this.state;

        if(data){
            children=data.map(function(a){
                return React.createElement(template,{model:a,key:a._id})
            })
        }

        if(!children || children.length==0)
            return null;

        if(pageSize)
            return (
                <InfiniteList {...others}>
                    {children}
                </InfiniteList>
            )
        else
            return (
                <div {...others}>
                    {children}
                </div>
            )
    }
}

class Item extends Component{
    render(){
        var {model}=this.props;
        return (<div className="li" key={model._id}>{model.name||model.title||model._id}</div>)
    }
}

List.defaultProps={
    className:"list",
    containerHeight:window.innerHeight,
    elementHeight:100,
    model:null,
    pageSize:0,
    template:Item
}
