import React, {createFactory} from "react"
import PropTypes from "prop-types"
import {withContext, setDisplayName, wrapDisplayName} from "recompose"
import withQuery from "./withQuery"

export const withPagination=(options)=>BaseComponent=>{
    const factory=createFactory(
            withContext(
                {connectionConfig:PropTypes.any},
                ()=>({connectionConfig:options})
            )(BaseComponent))

    const WithPagination=withQuery(options)(props=>factory(props))

    if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withPagination'))(WithPagination)
	}

    return WithPagination
}


export default withPagination
