import React, {PropTypes,  Component} from "react"

import {connect} from "react-redux"
import {compose, mapProps} from "recompose"
import {withFragment} from "tools/recompose"


export const Schema=({schema})=>(<pre style={{margin:20}}>{schema}</pre>)

export default compose(
	withFragment(graphql`
		fragment schema_app on App{
			schema
		}
	`),
	mapProps(({app})=>({schema:app.schema}))
)(Schema)