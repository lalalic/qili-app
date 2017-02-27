qili console
=========

qili console application to help you create application with qili server as backend, you can access it from http://app.qili2.com/console/.


qili application
=============
it also includes qili application framework to help you handle data and user login.
```javascript
import React, {Component} from "react"
import {QiliApp} from 'qiliApp'
export default class MyApp extends Component{
    render(){
        return (
            <QiliApp appId="xxxx" init={()=>{/*app init code*/}}>
				...
			</QiliApp>
        )
    }
}

//to start your application with react-router routes
MyApp.render(<Route path="/" handler={MyApp}></Route>)
```

# todo
1. flux refactor
2. route testing
