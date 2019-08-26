import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {QueryRenderer} from "react-relay"
import {compose, setDisplayName, wrapDisplayName, getContext, setStatic} from "recompose"

import hack from "./hack-null-default-undefined"
import isNode from "../is-node"

class Wrapper extends PureComponent{
	componentWillMount(){
		this.props.handle()
	}
	render(){
		return React.Children.only(this.props.children)
	}
}
export const withQuery=option=>BaseComponent=>{
	const opt=function(props){
		try{
			return typeof(option)=="function" ? option(props) : option
		}catch(e){
			
		}
	}
	const WithQuery=compose(
			setStatic("withQuery", opt),
			getContext({
				client:PropTypes.object,
				store: PropTypes.object
			}),
		)(({client:environment,store,...others})=>{
			const {query, onSuccess, onError, ...more}=opt(others)||{}

			return <QueryRenderer {...{
				dataFrom:"STORE_THEN_NETWORK",
				render({error, props}){
					if(props){
						return (
							<Wrapper handle={()=>onSuccess && onSuccess(props,store.dispatch,store)}>
								<BaseComponent {...others} data={props}/>
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
				query:hack(query),
				...more,
				}}/>
		})

	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withQuery'))(WithQuery)
	}
	return WithQuery
}

export default withQuery
