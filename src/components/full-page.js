import React, {Component} from "react"
import PropTypes from "prop-types"

export const FullPage=({style,children},{theme:{page,zIndex}})=>(
	<div style={{background:"white", ...style,...page,zIndex:zIndex.dialog, position:"absolute", left:0, top:0}}>
		{children}
	</div>
)

FullPage.contextTypes={
    theme: PropTypes.object
}

export default FullPage
