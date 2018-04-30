import React, {Component} from "react"
import PropTypes from "prop-types"

export const FullPage=({style,children},{theme:{page,zIndex}})=>(
	<div
		style={{
			background:"white",
			position:"absolute",
			width:"100%",
			height:"100%",
			...style,
			zIndex:zIndex.dialog,
			top:0
		}}>
		{children}
	</div>
)

FullPage.contextTypes={
    theme: PropTypes.object
}

export default FullPage
