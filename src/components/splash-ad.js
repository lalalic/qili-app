import React, {Component,PropTypes} from "react"
import {lifecycle,compose} from "recompose"
import FullPage from "components/full-page"
import CountDown from "components/count-down"

export const SplashAD=props=>(
	<FullPage>
		<div className="sticky top right" style={{
			padding:5,
			backgroundColor:"black",
			opacity:0.7,
			color:"white",
		}}><CountDown n={3} {...props}/>s 跳过</div>
	</FullPage>
)

export default SplashAD