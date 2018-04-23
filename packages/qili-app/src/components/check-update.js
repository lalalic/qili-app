import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Badge} from "material-ui"

export const CheckUpdate=({lastVersion,children},{project:{version}})=>{
	let hasUpdate=lastVersion && lastVersion!=version
	if(!hasUpdate)
		return typeof(children)=="string" ? <span>{children}</span> : children

	if(typeof(children)=="string"){
		return (<span>{children}<New/></span>)
	}else{
		return (
			<Badge badgeContent="."
				style={{padding:""}}
				badgeStyle={{
					right:-6,
					top:-6,
					width:12,
					height:12,
					backgroundColor:"red"
				}}>
				{children}
			</Badge>
		)
	}
}

CheckUpdate.contextTypes={
	project: PropTypes.object
}

const New=({text="New"})=>(
	<span style={{
		background:"red",
		color:"white",
		paddingRight:10,
		paddingLeft:10,
		borderRadius:10,
		marginLeft:3
		}}>
		{text}
	</span>
)

export default connect(state=>({lastVersion:state.qili.lastVersion}))(CheckUpdate)
