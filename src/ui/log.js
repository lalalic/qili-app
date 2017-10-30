import React, {Component} from "react"
import PropTypes from "prop-types"
import Pull2Refresh from "pull-to-refresh2"

import {compose} from "recompose"
import {withFragment} from "tools/recompose"

const Log=({data:logs, loadMore})=>(
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
						<tr key={id}>
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
        fragment log on Log@relay(plural: true){
            id
			startedAt
            type
            operation
			status
			time
			variables
			report
        }
    `),
)(Log)
