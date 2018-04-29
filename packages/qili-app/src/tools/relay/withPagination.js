import React, {Component,createFactory} from "react"
import PropTypes from "prop-types"
import {compose, withContext, setDisplayName, wrapDisplayName, getContext} from "recompose"
import withQuery from "./withQuery"
import withFragment from "./withFragment"

export const withPagination=(options)=>BaseComponent=>{
    const factory=createFactory(
            withContext(
                {pagination:PropTypes.any},
                ()=>({pagination:options})
            )(BaseComponent))

    const WithPagination=withQuery(options)(props=>factory(props))

    if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withPagination'))(WithPagination)
	}

    return WithPagination
}


export default withPagination
