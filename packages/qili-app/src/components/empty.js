import React, {Component} from 'react'
import IconLogo from "./logo"

export default ({icon=<IconLogo/>, text='Empty', children, ...others})=>(
    <div className="empty" {...others}>
        {icon}
        <div>{children||text}</div>
    </div>
)