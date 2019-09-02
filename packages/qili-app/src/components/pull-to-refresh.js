import React, {Component} from "react"
import Hammer from "react-hammerjs"

import RefreshIndicator from 'material-ui/RefreshIndicator'
import IconArrowDown from "material-ui/svg-icons/navigation/arrow-downward"
import IconArrowUp from "material-ui/svg-icons/navigation/arrow-upward"


const Loading=({show, label})=>(
	<center style={{display: show ? "block" : "none"}}>
		<RefreshIndicator
			  size={20}
			  top={0}
			  left={0}
			  status="loading"
			  style={{display:"inline-block",position:"relative"}}
			/>
		<span>{label}</span>
	</center>
)

const Refreshing=({phase,offset})=>(
	<center style={{
		display:  phase ? "block" : "none", 
		background:"transparent",
		height: phase=="refreshing" ? 0 : "auto"
		}}>
		{(function(){
			switch(phase){
			case "pulling":
				return <IconArrowDown color="lightgray" style={{height:offset}}/>
			case "rebounding":
				return <IconArrowUp color="lightgray"/>
			case "refreshing":
				return <RefreshIndicator
					  size={30}
					  top={15}
					  left={0}
					  status="loading"
					  style={{display:"inline-block",position:"relative"}}
					/>
			}
		})()}
	</center>
)
export class PullToRefresh extends Component{
	static defaultProps={
		resistance:2.5, 
		distanceToRefresh:30, 
		label:"",
		onRefresh: ok=>ok()
	}
	
	state={
		status:null
	}
	componentDidUpdate(){
		if(this.state.status=="loading"){
			let host=this.content.parentElement
			host.scrollTop=host.scrollHeight-host.clientHeight
		}
	}
	componentWillUnmount(){
		this.unmounted=true
	}
	render(){
		const {onRefresh, children, onMore, resistance, distanceToRefresh, label}=this.props
		const {status, offset}=this.state
		let loading=null
		if(onMore){
			loading=<Loading label={label} show={"pushing,loading".split(",").includes(this.state.status)}/>
		}
		return (
			<div ref={node=>this.content=node}>
				<Refreshing phase={status} offset={offset}/>
				<Hammer 
					onPanStart={e=>{
						let host=this.content.parentElement
						this.y0=parseInt(host.scrollTop)
						this.scrollHeight=parseInt(host.scrollHeight-host.clientHeight)
					}}
					onPan={e=>{
						const {deltaY}=e
						let top=this.y0-deltaY
						if(top<0){
							let offset=-top/resistance
							this.content.style.transform = 
							this.content.style.webkitTransform = `translate3d( 0, ${offset}px, 0 )`
							this.setState({status: offset<distanceToRefresh ? "pulling" : "rebounding",offset})
						}else{
							let offset=(this.scrollHeight-top)/resistance
							if(top>this.scrollHeight){
								this.content.style.transform = 
								this.content.style.webkitTransform = `translate3d( 0, ${offset}px, 0 )`
								this.setState({status:"pushing",offset})
							}else{
								this.content.parentElement.scrollTop=top
								this.setState({status:"scrolling",offset})
							}
						}
					}}
					onPanEnd={e=>{
						let reset=e=>!this.unmounted && this.setState({status:null,offset:undefined})
						this.content.style.transform = this.content.style.webkitTransform = ``
						switch(status){
						case "pulling":
						case "rebounding":
							this.setState({status:"refreshing"})
							onRefresh(reset)
						break
						case "pushing":
							if(onMore){
								this.setState({status:"loading"})
								onMore(reset)
							}else{
								this.setState({status:null,offset:undefined})
							}
						break
						default:
							this.setState({status:null})
						}	
					}}
					onPanCancel={e=>this.setState({status:null,offset:undefined})}
					direction="DIRECTION_VERTICAL">
					<div>
						{children}
					</div>
				</Hammer>
				{loading}
			</div>
		)
	}
}

export default PullToRefresh