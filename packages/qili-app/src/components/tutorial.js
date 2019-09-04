import React, {Fragment,Component} from "react"

import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import MediaQuery from "react-responsive"

export class Tutorial extends Component{
	constructor(){
		super(...arguments)
		this.state={ready:true}
	}

	componentDidMount(){
		this.setState({ready:true})
	}

	render(){
		const {ready}=this.state
		if(!ready){
			return null
		}
		var {slides=[], onEnd, landscape=false, ...props}=this.props
		return (
			<Fragment>
				<MediaQuery orientation="landscape">
				{match=>match && (landscape=true) && null}
				</MediaQuery>
				<AutoRotatingCarousel open={true}
					label="开始体验"
					landscape={landscape}
					mobile={typeof(cordova)!='undefined'}
					onStart={onEnd}
					{...props}
					>
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
			</Fragment>
		)
	}
}

export default Tutorial
