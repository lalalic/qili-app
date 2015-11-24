var React=require('react'),
    {Component}=React,
    Empty=require('./empty'),
    Loading=require('./loading');

import Error from "material-ui/lib/svg-icons/alert/error"
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
            model.fetch((data)=>this.setState({data,loadError:null}),
                (e)=>this.setState({loadError:e.message}))
        }else if(typeof(model.then)!='undefined'){
            model.then((data)=>this.setState({data,loadError:null}),
                (e)=>this.setState({loadError:e.message}))
        }
    }

    componentWillReceiveProps(next){
        if(next.model==this.props.model)
            return;

        this.componentDidMount(next)
    }
    
	render(){
        if(this.state.loadError)
            return <Empty text={this.state.loadError} icon={<Error/>}/>

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
