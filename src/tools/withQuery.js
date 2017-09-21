import React, {PureComponent, PropTypes} from "react"
import {connect} from "react-redux"
import {QueryRenderer} from "react-relay"
import {createEagerFactory, setDisplayName, wrapDisplayName, getContext} from "recompose"
import spreadResponse from "tools/spread-response"

class Wrapper extends PureComponent{
	componentWillMount(){
		this.props.handle()
	}
	render(){
		return React.Children.only(this.props.children)
	}
}
export const withQuery=option=>BaseComponent=>{
	const factory=createEagerFactory(QueryRenderer)
	const EargerElement=connect()(({environment,dispatch,...others})=>{
		const {spread,query, onSuccess, onError, ...more}=typeof(option)=="function" ? option(others) : option
		//////hack: make variables default undefined as undefined
		query().query.argumentDefinitions.forEach(def=>{
			if(def.defaultValue===null){
				def.defaultValue=undefined
			}
		})

		return factory({
			render({error, props}){
				if(props){
					return (
						<Wrapper handle={()=>onSuccess && onSuccess(props,dispatch)}>
							<BaseComponent {...others} {...props} {...spreadResponse(props, spread, others)}/>
						</Wrapper>
					)
				}else if(error){
					return (
						<Wrapper handle={()=>onError && onError(error,dispatch)}>
							<div>error: {error.toString()}</div>
						</Wrapper>
					)
				}else {
					return <div>loading...</div>
				}
			},
			environment,
			query,
			...more,
			})
	})
	const WithQuery=getContext({environment:PropTypes.object})(EargerElement)

	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withQuery'))(WithQuery)
	}
	return WithQuery
}

export default withQuery
