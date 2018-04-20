# qili-app

qili-app can help you create graphql client application with qili server as backend at http://app.qili2.com

## install
```bash
npm install qili-app
```

## features
* graphql
* persisted query
* react-relay
* hybrid app and web page
* authentication and authorization out-of-box ready
* offline supported
* cloud code

## API

### State
* DOMAIN
* ACTION
* REDUCER

### Components
* QiliApp: auto handle network/authentication/AD/splash/tutorial/...
* OfflineUI
* Offline
* Comment
* Empty
* Setting
* Profile
* My
* File
* Photo
* CheckUpdate
* Account
* InfoForm
* wechat


### Graphql Hoc Components
* withQuery(props=>({query:graphql`...`}))
* withFragment(props=>({fragment:graphql`...`}))
* withPagination(props=>({query:graphql`...`, fragment: graphql`...`}))
* withMutation(props=>({mutation:graphqql`...`}))
* withInit(props=>({query:graphql`...`, onSuccess, onError}))

### Cloud API
* merge: tool to merge resolvers
* static: to make app support web page 
* wechat: to make wechat api
* buildPagination for type
* buildComment for type
* isDev: to support graphql id only or graphql
* typeDefs
* resolver
* persistedQuery to make server support graphql id for security and performance
* makeSchema: only for client offline
## License
MIT

## Example
* hello world
```javascript
import React from "react"
import {QiliApp} from 'qili-app'

QiliApp.render(
	<QiliApp appId="xxxx">
		Hello world
	</QiliApp>
)
```
	
* More formal application with initialization when user login/signup
```js
	import React from "react"
	import {QiliApp, withInit} from 'qili-app'
	import {compose, withProps} from "recompose"
	import {Router, hashHistory, IndexRoute} from "react-router"
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
```