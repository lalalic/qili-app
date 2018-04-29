import React, {PureComponent,createFactory} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {requestSubscription} from "react-relay"
import {compose, setDisplayName, wrapDisplayName, getContext} from "recompose"
import hack from "./hack-null-default-undefined"

export const withSubscription=option=>BaseComponent=>{
	const factory=createFactory(BaseComponent)
	const withSubscription=compose(
			getContext({client:PropTypes.object}),
		)(({client:environment,...others})=>{
			const {subscription, updater, ...more}=typeof(option)=="function" ? option(others) : option

			requestSubscription({
                environment,
				subscription:hack(subscription),
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
