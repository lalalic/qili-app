import React, {Component} from "react"
import {compose, branch, renderComponent} from "recompose"
import {connect} from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconAlert from 'material-ui/svg-icons/alert/error';
import {red100} from "material-ui/styles/colors"

import FullPage from "./full-page"

export const NoNetwork=({onClose})=>(
	<div style={{padding:20, fontSize:12}}>
		<h1>未能链接到互联网</h1>
		<p>您的设备未启用移动网络或无线局域网</p>
		<hr style={{border:"1px solid lightgray",margin:"5px 0px"}}/>
		<p>如需要连接到互联网，请参考以下几点:</p>
		<ul>
			<li>检查手机中的无线局域网设置，查看是否有可介入的无线局域网信号</li>
			<li>检查手机是否已接入移动网络，并且手机没有被停机</li>
		</ul>
		<p>如果您已介接无线局域网:</p>
		<ul>
			<li>请检查您所连接的无线局域网热点是否已接入互联网，或该热点是否已允许你的设备访问互联网</li>
		</ul>
	</div>
)

class NoNetworkBanner extends Component{
	state={detailed:false}
	render(){
		const {detailed}=this.state
		let noNetwork=null
		if(detailed){
			noNetwork=(
				<FullPage>
					<div style={{display:"flex",flexDirection:"row",  background:"black"}}>
						<div style={{flex:1}}>
							<IconButton onClick={e=>this.setState({detailed:false})}>
								<IconClose 
									color="white"/>
							</IconButton>
						</div>
						<div style={{
								flex:"1 100%",height:48,
								lineHeight:"48px",fontSize:"small",
								color:"white"
								}}>
							网络连接不可用
						</div>
					</div>
					<NoNetwork/>
				</FullPage>	
			)			
		}
		return  (
			<div>
				<div onClick={e=>this.setState({detailed:true})}
					style={{display:"flex",flexDirection:"row",  background:red100}}>
					<div style={{flex:1}}>
						<IconButton>
							<IconAlert/>
						</IconButton>
					</div>
					<div style={{flex:"1 100%",height:48,lineHeight:"48px",fontSize:"small"}}>
						网络连接不可用
					</div>
				</div>
				{noNetwork}
			</div>
		)
	}
}


export const withNotification=(Base=()=>null)=>compose(
	connect(({qili:{networkStatus}})=>({networkStatus})),
)(({networkStatus, ...props})=>(
	<div>
		{networkStatus=="offline" ? <NoNetworkBanner/> : null}
		<Base {...props}/>
	</div>
))

export const Notification=withNotification()

export const notSupport=(Base,OfflineUI=NoNetwork)=>compose(
	connect(({qili:{networkStatus}})=>({networkStatus})),
	branch(({networkStatus})=>networkStatus=="offline", renderComponent(OfflineUI))
)(Base)