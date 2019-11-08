import React from "react"
import Pull2Refresh from "qili-app/components/pull-to-refresh"

import {compose, mapProps} from "recompose"
import {withFragment} from "qili-app/graphql"

const Log=({logs, loadMore})=>(
    <Pull2Refresh onMore={loadMore}>
		<div style={{margin:5}}>
			<table className="logs">
				<thead>
					<tr>
						<th>Started At</th>
						<th>Type</th>
						<th>Operation</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
			{
				logs.map(({id,type,operation,status,startedAt})=>{
					return (
						<tr key={id} className={status ? "error" : ""}>
							<td>{new Date(startedAt).smartFormat()}</td>						
							<td>{type}</td>
							<td>{operation}</td>
							<td>{status ? `${status} errors`: 'successful'}</td>
						</tr>
					)
				})
			}
				</tbody>
			</table>
		</div>
    </Pull2Refresh>
)



export default compose(
    withFragment(graphql`
		fragment log_app on App {
			logs(status:$status, first:$count, after:$cursor)@connection(key:"app_logs"){
				edges{
					node{
						id
						startedAt
						type
						operation
						status
						time
					}
					cursor
				}
				pageInfo{
					hasPreviousPage
					startCursor
				}
			}
		}
	`),
	mapProps(({data,loadMore})=>({
		logs:data.logs.edges.map(a=>a.node),
		loadMore
	})),
)(Log)
