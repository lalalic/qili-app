import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {compose, setDisplayName, wrapDisplayName} from "recompose"
import {withQuery} from "./relay/withQuery"

export const withInit=options=>BaseComponent=>{
	const Init=withQuery(options)(({children})=><Fragment>{children}</Fragment>)

	const WithInit=({children,...others})=>(
		<BaseComponent {...others}>
			<Init>
				{children}
			</Init>
		</BaseComponent>
	)

	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'WithInit'))(WithInit)
	}

	return WithInit
}

export default withInit
