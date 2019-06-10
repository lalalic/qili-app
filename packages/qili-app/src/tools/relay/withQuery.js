import React, {PureComponent,createFactory} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {QueryRenderer} from "react-relay"
import {compose, setDisplayName, wrapDisplayName, getContext} from "recompose"

import Empty from "../../components/empty"
import IconError from "material-ui/svg-icons/alert/error"

import hack from "./hack-null-default-undefined"

class Wrapper extends PureComponent{
	componentWillMount(){
		this.props.handle()
	}
	render(){
		return React.Children.only(this.props.children)
	}
}
export const withQuery=option=>BaseComponent=>{
	const factory=createFactory(QueryRenderer)
	const WithQuery=compose(
			getContext({
				client:PropTypes.object,
				store: PropTypes.object
			}),
		)(({client:environment,store,...others})=>{
			const {query, onSuccess, onError, ...more}=typeof(option)=="function" ? option(others) : option

			return factory({
				render({error, props}){
					if(props){
						return (
							<Wrapper handle={()=>onSuccess && onSuccess(props,store.dispatch,store)}>
								<BaseComponent {...others} {...props} data={props}/>
							</Wrapper>
						)
					}else if(error){
						return (
							<Wrapper handle={()=>onError && onError(error,store.dispatch,store)}>
								<Empty icon={<IconError color="red"/>}>error: {error.toString()}</Empty>
							</Wrapper>
						)
					}else {
						return <div className="query loading"><span>loading...</span></div>
					}
				},
				environment,
				query:hack(query),
				...more,
				})
		})

	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withQuery'))(WithQuery)
	}
	return WithQuery
}

export default withQuery
