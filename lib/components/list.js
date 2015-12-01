var React=require('react'),
    {Component}=React,
    Empty=require('./empty'),
    Loading=require('./loading'),
	AsyncComponent=require('./async'),
    {List,ListDivider,ListItem}=require('material-ui'),
    {Table}=require('reactable');

export default class Main extends AsyncComponent{
    render(){
        var {children=[], template, onItemClick, ...others}=this.props,
            {data}=this.state,i=0;

		(data||[]).forEach((a)=>children.push(React.createElement(template,
            {model:a,key:a._id||i++,onClick:()=>(onItemClick||()=>1)(a)}))
		)

		if(React.isValidElement(children) || (Array.isArray(children) && children.length)){
			return (
                <List {...others}>
                    {children}
                </List>
            )
		}

		return super.render() || null
    }
}

class Item extends Component{
    render(){
        var {model}=this.props;
        return (<ListItem key={model._id}>{model.name||model.title||model._id}</ListItem>)
    }
}

class AsyncTable extends AsyncComponent{
    render(){
        var {data}=this.state,
			{rowData=data, model, ...others}=this.props;

		if(rowData)
			return (<div><Table data={rowData} {...others}/></div>)//Table must be in a container

        return super.render(this)
    }
}

Main.Table=AsyncTable
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
