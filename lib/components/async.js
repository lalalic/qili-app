var React=require('react'),
    {Component}=React,
    Empty=require('./empty'),
    Loading=require('./loading');
	
export default class Main extends Component{
	constructor(props){
        super(props)
        this.state={data: undefined}
    }

    componentDidMount(props){
        var {model}=props||this.props;

        if(!model)
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
    }

    componentWillReceiveProps(next){
        if(next.model==this.props.model)
            return;

        this.componentDidMount(next)
    }
	render(){
		var {empty, loading={}}=this.props,
            {data}=this.state;
		
		 if(data===undefined)
            return (<Loading {...loading}/>)
		else if(data==null || (Array.isArray(data) && data.length==0)){
			if(empty)
                return (<Empty {...empty}/>)
			return null
		}
	}
}