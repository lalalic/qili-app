var React=require('react'),
    {Component}=React,
    Empty=require('./empty'),
    Loading=require('./loading');

import Error from "material-ui/lib/svg-icons/alert/error"
export default class Async extends Component{
	constructor(props){
        super(props)
        this.state={data: undefined}
        var {model}=this.props

        if(this.__isAsyncModel(model))
            this.__resolveModel(model)
        else
            this.state.data=model
    }

    __isAsyncModel(model){
        var {fetch, then}=model||{}
        return fetch || then
    }

    __resolveModel(model){
        if(!model) return;

        if(typeof(model.fetch)!='undefined'){//minimongoo @Todo: remove and always with Promise
            model.fetch((data)=>this.setState({data,loadError:null}),
                (e)=>this.setState({loadError:e.message}))
        }else if(typeof(model.then)!='undefined'){//promise
            throw new Error("not support Promise since twice success may be called")
            model.then((data)=>this.setState({data,loadError:null}),
                (e)=>this.setState({loadError:e.message}))
        }
    }

    componentWillReceiveProps(nextProps){
        var {model}=nextProps
        if(model!=this.props.model && model){
            if(this.__isAsyncModel(model))
                this.__resolveModel(model)
            else
                this.setState({data:model})
        }
    }

	render(){
        if(this.state.loadError)
            return <Empty text={this.state.loadError} icon={<Error/>}/>

        var {empty}=this.props, {data}=this.state;

		 if(data===undefined)
            return null
		else if(data==null || (Array.isArray(data) && data.length==0))
            return empty
	}
}
