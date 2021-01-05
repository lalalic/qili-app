import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {requestSubscription} from "react-relay"

export const withSubscription=option=>BaseComponent=>{
	return class WithSubscription extends PureComponent{
		static contextTypes={
			client: PropTypes.object
		}

		constructor(){
			super(...arguments)
			this.state={}
		}

		render(){
			const {props,state:{data,unsubscribe,initData}}=this
			return <BaseComponent {...{...props,...data,unsubscribe,initData}}/>

		}

		componentDidMount(){
			const {context:{client:environment}, props}=this
			option=typeof(option)=="function" ? option(props) : option
			const {subscription, variables, init, initVariables=initVariables, updater, onNext, ...more}=option.subscription ? option : {subscription:option}
			let unmounted=false
			const {dispose:unsubscribe}=requestSubscription(
				environment,
				{
				subscription,
				variables,
				onNext:(data,...args)=>{
					inited.then(()=>{
						!unmounted && this.setState({data})
						onNext && onNext(data, ...args)
					})
				},
				...more,
			})

			const inited=init ? environment.send(init,initVariables) : Promise.resolve()
			inited.then(initData=>{
				this.setState({initData,unsubscribe})
			})

			this.componentWillUnmount=()=>unmounted=true
		}
	}
}

export default withSubscription
