qili console
=========

qili console application to help you create application with qili server as backend, you can access it from http://app.qili2.com/console/.


qili application
=============
it also includes qili application framework to help you handle data and user login.
```
import {QiliApp}=require('qiliApp')
export default class MyApp extends QiliApp{
    render(){
        var content=super.render()
        if(content)
            return content

        /* from here your code: User.current already set
        return (
            <div className="withFootbar">
                <div id="container">
                    start your app
                </div>
            </div>
        )
    }
}
Object.assign(MyApp.defaultProps,{
    appId:"required qili application key",
    init: //optional function to initialize your application after user login
})  

//to start your application with react-router routes
MyApp.render(<Route path="/" handler={MyApp}></Route>)
```

flux refactor
=============
(Action) -> Dispatcher -> Store -> Controller-view -> (Action)

global dispatcher

store {
    dispatcher.register(function(action){
        switch(action.type){
        case xxx:
        break
        case xxx:
        break    
        }
    })
}

controller-view {
    componentDidMount(){
        store.addChangeListener(this._onChange)
    }
    componentWillUnmount(){
        store.removeChangeListener(this._onChange)
    }

    render(){
        return (
            ...
            <button onClick={e=>this.add(a)}>//trigger
            )
    }

    add(a){//Action
        dispatcher.dispatch({
            type: xxx,
            data: a
            })
    }
}
