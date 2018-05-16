import React, {Component} from "react"
import PropTypes from "prop-types"
import CountDown from "./count-down"
import Logo from "./logo"

export const SplashAD=({url, children, ...props}, {theme:{page:{width,height}}})=>(
	<div style={{
		flex:"1 100%",
		display:"flex",
		flexDirection:"column",
		backgroundColor:"transparent",
		overflow:"hidden"
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
		<div style={{flex:"1 100%",overflow:"hidden"}}>
			{!url ? 
				<Logo style={{width:200,height:"100%",display:"block",margin:"auto"}}/> :
				<img src={url} style={{display:"block",margin:"auto",maxHeight:"100%",maxWidth:"100%"}}/>
			}
		</div>
		<div style={{
				flex:1,
				fontSize:"x-small",
				textAlign:"center"
			}}>----- QiLi2提供云服务 -----</div>
	</div>
)

SplashAD.contextTypes={
	theme: PropTypes.object
}

export default SplashAD