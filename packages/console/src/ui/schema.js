import React from "react"

import {compose, mapProps} from "recompose"
import {withFragment} from "qili-app/graphql"


export const Schema=({schema, style})=>(
	<textarea
		readOnly="readonly"
		style={{
			padding:20,
			width:"100%",
			height:"100%",
			border:0,
			...style
		}}
		onFocus={({target})=>target.select()}
		value={schema}/>
)

export default compose(
	withFragment({app:graphql`
		fragment schema_app on App{
			schema
		}
	`}),
	mapProps(({app,style})=>({schema:app.schema,style}))
)(Schema)
