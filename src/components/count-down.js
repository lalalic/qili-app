import React, {Component,PropTypes} from "react"

export class CountDown extends Component{
	static propTypes={
		n: PropTypes.number,
		onEnd: PropTypes.func.isRequired,
	}
	
	state={n:this.props.n||60}
	
	componentDidMount(){
		this.timer=setInterval(()=>{
			this.setState(({n})=>{
				n--
				if(n==0){
					clearInterval(this.timer)
					this.props.onEnd()
				}
				if(n>=0)
					return {n}
			})
		},1000)
	}
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	render(){
		return (<span>{this.state.n}</span>)
	}
}

export default CountDown