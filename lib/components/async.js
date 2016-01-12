var React=require('react'),
    {Component}=React,
    Empty=require('./empty'),
    Loading=require('./loading');

import Error from "material-ui/lib/svg-icons/alert/error"

export default class Async extends Component{
	constructor(props){
        super(props)
        this.state={}
        var {model}=this.props

        if(this.__isAsyncModel(model)){
            this.state.loading=true
            this.__resolveModel(model)
        }else
            this.state.data=model
    }

    __isAsyncModel(model){
        var {fetch, then}=model||{}
        return fetch || then
    }

    __resolveModel(model){
        if(!model) return;

        if(typeof(model.fetch)!='undefined'){//minimongoo @Todo: remove and always with Promise
            model.fetch((data)=>this.setState({data,loadError:undefined,loading:undefined}),
                (e)=>this.setState({loadError:e.message,loading:undefined}))
        }else if(typeof(model.then)!='undefined'){//promise
            model.then((data)=>this.setState({data,loadError:undefined,loading:undefined}),
                (e)=>this.setState({loadError:e.message,loading:undefined}))
        }
    }

    componentWillReceiveProps(nextProps){
        var {model}=nextProps
        if(model!=this.props.model && model){
            if(this.__isAsyncModel(model)){
                this.setState({loading:true})
                this.__resolveModel(model)
            }else
                this.setState({data:model})
        }
    }

    isEmpty(){
        var {data}=this.state,
            {children=[]}=this.props;
        return !React.isValidElement(children)
            &&(Array.isArray(children) && children.length==0)
            && (data==null || (Array.isArray(data) && data.length==0))
    }

	render(){
        var {data,loadError,loading}=this.state,
            {empty:emptyEl,loading:loadingEl}=this.props,
            loadErrorEl;

        if(loadError)
            loadErrorEl=(<Empty text={loadError} icon={<Error/>}/>)

        if(this.isEmpty()){
            if(loadError)
                return loadErrorEl

            if(loading)
                return loadingEl
            else
                return emptyEl
        }else{
            return this.renderContent(loadError ? loadErrorEl : (loading ? loadingEl : undefined))
        }
	}

    renderContent(loadingOrError){
        return (<div>{loadingOrError}</div>)
    }
}

Async.defaultProps={
    loading:null,
    empty:null
}
