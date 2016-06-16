import React, {Component} from "react"

export default class Tutorial extends Component{
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
