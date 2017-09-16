import React, {Component} from "react"

import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import MediaQuery from "react-responsive"
export const Tutorial=({slides=[], onEnd, landscape=false})=>(
	<div>
		<MediaQuery orientation="landscape">
		{match=>match && (landscape=true) && null}
		</MediaQuery>
		<AutoRotatingCarousel open={true}
			label="开始体验"
			landscape={landscape}
			mobile={typeof(cordova)!='undefined'}
			onStart={onEnd}>
			{
				slides.map((a,i)=>{
					if(React.isValidElement(a))
						return a

					if(typeof(a)=='string')
						a={media:a}

					if(typeof(a.media)=="string")
						a.media=<img src={a.media}/>

					return <Slide key={i} {...{title:"", subtitle:"",...a}}/>
				})
			}
		</AutoRotatingCarousel>
	</div>
)

export default Tutorial
