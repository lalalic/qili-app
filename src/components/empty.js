import React, {Component} from 'react'

export default ({icon, text='Empty', children, ...others})=>(
    <div className="empty" {...others}>
        {icon}
        <p>{children||text}</p>
    </div>
)
