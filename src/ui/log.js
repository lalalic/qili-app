import React, {Component} from "react"
import PropTypes from "prop-types"
import Pull2Refresh from "pull-to-refresh2"

import {compose} from "recompose"
import {withFragment} from "tools/recompose"

const Log=({logs, loadMore})=>(
    <Pull2Refresh onMore={loadMore}>
        {
            logs.map(log=>{
                return <div/>
            })
        }
    </Pull2Refresh>
)



export default compose(
    withFragment(graphql`
        fragment log on Log{
            id
            type
            operation    
        }
    `),
)(Log)
