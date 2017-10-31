import React, {Component, PropTypes} from "react"

export const FullPage=({style,children},{theme:{page,zIndex}})=>(
	<div style={{...style,...page,zIndex:zIndex.dialog, position:"absolute", left:0, top:0, background:"white"}}>
		{children}
	</div>
)

FullPage.contextTypes={
    theme: PropTypes.object
}

export default FullPage
