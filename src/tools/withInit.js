import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose, createEagerFactory, setDisplayName, wrapDisplayName,} from "recompose"
import {withQuery} from "tools/recompose"

export const withInit=options=>BaseComponent=>{
	let factory=createEagerFactory(BaseComponent)
	
	const WithInit=({children,...others})=>{
		const Init=withQuery(options)(()=><div>{children}</div>)
		others.children=(<Init/>)
		return factory(others)
	}
	
	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'WithInit'))(WithInit)
	}
	
	return WithInit
}

export default withInit


