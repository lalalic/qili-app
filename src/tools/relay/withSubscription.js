import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {requestSubscription} from "react-relay"
import {compose, createEagerFactory, setDisplayName, wrapDisplayName, getContext} from "recompose"

export const withSubscription=option=>BaseComponent=>{
	const factory=createEagerFactory(BaseComponent)
	const withSubscription=compose(
			getContext({client:PropTypes.object}),
		)(({client:environment,...others})=>{
			const {subscription, updater, ...more}=typeof(option)=="function" ? option(others) : option
			//////hack: make variables default undefined as undefined
			subscription().subscription.argumentDefinitions.forEach(def=>{
				if(def.defaultValue===null){
					def.defaultValue=undefined
				}
			})

            requestSubscription({
                environment,
				subscription,
                ...more,
            })

			return factory(others)
		})

	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withSubscription'))(WithSubscription)
	}
	return WithSubscription
}

export default withSubscription
