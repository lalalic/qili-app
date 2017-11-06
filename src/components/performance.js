import React from "react"
import {connect} from "react-redux"

import FloatingActionButton from 'material-ui/FloatingActionButton'
import IconArrowLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left"


export const Performance=({report})=>(
	<div style={{position:"absolute",top:0,right:0,backgroundColor:"white",opacity:0.8}}>
		<div >
			<FloatingActionButton secordary={true} mini={true} style={{backgroundColor:"transparent"}}>
				<IconArrowLeft/>
			</FloatingActionButton>
		</div>
		<table style={{width:"80%"}}>
			<caption>total:{parseInt(report["/"]/1000)}ms</caption>
			<tbody>
				<tr><th>path</th><th>start</th><th>used time</th></tr>
			{
				Object.keys(report)
				.filter(a=>a!=="/")
				.map(k=>(({at,by})=><tr key={k}><td>{k}</td><td>{at}</td><td>{by}</td></tr>)(report[k]))
			}
			</tbody>
		</table>
	</div>
)

export default connect(state=>({report:state.qili.optics}))(
	({report})=> report&&report["/"] ? <Performance report={report}/> : null
)