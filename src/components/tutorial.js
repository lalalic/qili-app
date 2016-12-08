import React, {Component} from "react"

import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import MediaQuery from "react-responsive"

class Tutorial extends Component{
    static propTypes={
        onEnd: React.PropTypes.func
    }

    constructor(props){
        super(props)
        this.onScroll=this.onScroll
    }

    onScroll(e){
        if(this._scrollTimer)
			clearTimeout(this._scrollTimer)
		this._scrollTimer=setTimeout(e=>{
            
		},300)
    }

    componentDidMount(){
        React.findDOMNode(this).addEventListener("scroll",this.onScroll)
    }

    componentWillUnmount(){
        React.findDOMNode(this).removeEventListener("scroll",this.onScroll)
    }

    render(){
        var {slides=[], onEnd}=this.props, i=0
        var last
        if(onEnd){
            last=slides.pop()
            last=(
                <div className="page">
                    <img src={last}/>
                    <div style={{textAlign:"center"}}><button onClick={e=>onEnd()}>开始体验</button></div>
                </div>
            )
        }
        return (
            <div className="tutorial">
                {slides.map(slide=>(<div className="page" key={i++}><img src={slide}/></div>))}
                {last}
                <div style={{position:"fixed",textAlign:"center",width:"100%"}}>

                </div>
            </div>
        )
    }
}

export const Carousel=({slides=[], onEnd, landscape=false})=>(
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

export default Carousel