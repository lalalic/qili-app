import React from "react"
import {connect} from "react-redux"
import {withState} from "recompose"

import {Dialog} from 'material-ui'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import IconArrowLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left"


export const Performance=withState("open","setOpen",false)(
({report,open, setOpen, total=parseInt(report["/"]/1000),threshold=2})=>(
	<div style={{backgroundColor:"white"}}>
		<div className="sticky top right _2">
			<FloatingActionButton secondary={total>=threshold} 
				onClick={()=>setOpen(true)}
				mini={true} 
				backgroundColor="lightgray"
				>
				<IconArrowLeft/>
			</FloatingActionButton>
		</div>
		<Dialog open={open} onRequestClose={()=>setOpen(false)} 
			contentStyle={{width:"100%"}}>
			<table style={{width:"100%",border:1}} >
				<caption>total:{total}ms</caption>
				<tbody>
					<tr><th>path</th><th>start(us)</th><th>used time(us)</th></tr>
				{
					Object.keys(report)
					.filter(a=>(a!=="/"&&a!=="toJSON"))
					.map(k=>report[k].map(({at,by},i)=><tr key={`${k}_${i}`}><td>{k}</td><td>{at}</td><td>{by}</td></tr>))
					.reduce((collected,a)=>{
						a.forEach(b=>collected.push(b))
						return collected
					},[])
				}
				</tbody>
			</table>
		</Dialog>
	</div>
))

export default connect(state=>({report:state.qili.optics}))(
	({report})=> report&&report["/"] ? <Performance report={report}/> : null
)