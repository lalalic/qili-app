qili console
=========

qili console application to help you create application with qili server as backend, you can access it from http://app.qili2.com/console/.


qili application
=============
it also includes qili application framework to help you handle data and user login.
```javascript
import React, {Component} from "react"
import QiliApp from 'qili-app'
export default class MyApp extends Component{
    render(){
        return (
            <QiliApp appId="xxxx">
				...
			</QiliApp>
        )
    }
}

//to start your application with react-router routes
QiliApp.render(<MyApp/>)
```
graphql Hoc Components
===
	* withQuery(props=>({query:graphql`...`}))
	
	* withFragment(props=>({fragment:graphql`...`}))
	
	* withPagination(props=>({query:graphql`...`, fragment: graphql`...`}))
	
	* withInit(props=>({query:graphql`...`, onSuccess, onError}))
	
example
===

<pre>
	const MyApp=compose(
		withProps(()=>({
			project: require("../package.json"),
			appId:"xxx"
		})),
		withInit({
			query:graphql`
				query src_prefetch_Query{
					me{
						id
						token
						book{
							id
							name
							photo
						}
					}
				}
			`,
			onSuccess(response,dispatch){
				
			},
			onError(error,dispatch){
				
			}
		}),
	)(QiliApp)

	QiliApp.render(
		<MyApp>
			<Router history={hashHistory}>
				<IndexRoute component={()=><div>hello</div>}/>
			</Router>
		</MyApp>
	)
</pre>