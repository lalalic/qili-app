import React, {Component} from 'react'
import IconLogo from "../icons/logo"

export default ({icon=<IconLogo/>, text='Empty', children, ...others})=>(
    <div className="empty" {...others}>
        {icon}
        <p>{children||text}</p>
    </div>
)
