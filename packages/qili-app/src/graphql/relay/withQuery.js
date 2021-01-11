import React, {PureComponent, Fragment} from "react"
import PropTypes from "prop-types"
import {QueryRenderer} from "react-relay"
import {fetchQuery} from "relay-runtime"

class Wrapper extends PureComponent{
	constructor(){
		super(...arguments)
		this.props.handle()
	}

	render(){
		return <Fragment>{this.props.children}</Fragment>
	}
}

export const withQuery=option=>BaseComponent=>{
	const opt=function(props){
		try{
			return typeof(option)=="function" ? option(props) : option
		}catch(e){
			
		}
	}

	class WithQuery extends PureComponent{
		static withQuery=opt
        static contextTypes={
            client:PropTypes.object,
            store: PropTypes.object
        }

        constructor(){
			super(...arguments)
			this.state={}
            const {client:environment}=this.context
			
			if(environment.SSRReady){
				const {query, variables}=opt(this.props)
				/** if it's for ssr, first to fire fetch and render nothing, and second render will create html */
				fetchQuery(environment, query, variables)
					.then(()=>{
						const {id,name}=query()
						environment.SSRReady({query:id||name,variables})
					})
			}
			this.fetch=this.fetch.bind(this)
		}
		
		fetch(vars){
			this.setState({vars})
		}

		render(){
			const {context:{client:environment,store},props:{...selfProps},state:{vars={}}}=this
			const {query, onSuccess, onError, variables, ...queryProps}=opt(this.props)||{}

			if(environment.SSRReady){
				return null
			}

			return <MyQueryRenderer {...{
				dataFrom:"STORE_THEN_NETWORK",
				render:({error, props})=>{
					if(props){
						return (
							<Wrapper handle={()=>onSuccess && onSuccess(props,store.dispatch,store)}>
								<BaseComponent {...{...selfProps,data:props, fetch:vars=>this.setState({vars}),...vars }}/>
							</Wrapper>
						)
					}else if(error){
						return (
							<Wrapper handle={()=>onError && onError(error,store.dispatch,store)}>
								<div className="message error">error: {error.toString()}</div>
							</Wrapper>
						)
					}else {
						return <div className="query loading"><span>loading...</span></div>
					}
				},
				environment,
				query,//hack(query),
				variables:{
					...variables,
					...vars,
				},
				...queryProps,
				}}/>
		}
	}
	return WithQuery
}

class MyQueryRenderer extends QueryRenderer{
	constructor(){
		super(...arguments)
		//@@Hack:  to remove queryFetcher cache, otherwise always loading at first render
		this.componentDidUpdate()
		try{
			super(...arguments)
		}catch(e){
			
		}
	}
}

export default withQuery
