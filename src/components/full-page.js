import React, {Component} from "react"
import PropTypes from "prop-types"

export const FullPage=({style,children},{theme:{page,zIndex}})=>(
	<div 
		className="sticky full"
		style={{background:"white", ...style,...page,zIndex:zIndex.dialog, top:0}}>
		{children}
	</div>
)

FullPage.contextTypes={
    theme: PropTypes.object
}

export default FullPage
