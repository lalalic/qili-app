import React from "react"
import PropTypes from "prop-types"
import {requestSubscription} from "react-relay"
import {compose, setDisplayName, wrapDisplayName, getContext} from "recompose"
import hack from "./hack-null-default-undefined"

export const withSubscription=option=>BaseComponent=>{
	const WithSubscription=compose(
			getContext({client:PropTypes.object}),
		)(({client:environment,...others})=>{
			const {subscription, updater, ...more}=typeof(option)=="function" ? option(others) : option

			requestSubscription({
                environment,
				subscription:hack(subscription),
                ...more,
            })

			return <BaseComponent {...others}/>
		})

	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withSubscription'))(WithSubscription)
	}
	return WithSubscription
}

export default withSubscription
