import React, {Component} from "react"
import PropTypes from "prop-types"
import CountDown from "components/count-down"
import FullPage  from "components/full-page"

export const SplashAD=({url, children, ...props}, {theme:{page:{width,height}}})=>(
	<FullPage style={{
		backgroundColor:"transparent",
		backgroundImage: url ? `${url}?width=${width}&height=${height}` : undefined,
	}}>
		<div className="sticky top right" 
			onClick={props.onEnd}
			style={{
				minWidth:"5em",
				textAlign:"center",
				padding:5,
				backgroundColor:"black",
				opacity:0.3,
				color:"white",
				borderRadius:5,
			}}><CountDown n={3} {...props}/>s 跳过</div>
	</FullPage>
)

SplashAD.contextTypes={
	theme: PropTypes.object
}

export default SplashAD