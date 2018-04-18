import React, {Component} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose, mapProps} from "recompose"
import {withFragment} from "../tools/recompose"


export const Schema=({schema, style})=>(
	<textarea
		readOnly="readonly"
		style={{
			padding:20,
			width:"100%",
			border:0,
			...style
		}}
		onFocus={({target})=>target.select()}
		value={schema}/>
)

export default compose(
	withFragment(graphql`
		fragment schema_app on App{
			schema
		}
	`),
	mapProps(({app,style})=>({schema:app.schema,style}))
)(Schema)
