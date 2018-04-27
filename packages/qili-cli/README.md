#qili-cli
QiliApp command line

##install
```sh
npm install qili-cli -g
```

##commands

###init
a quick start to initialize QiliApp project

###persist
to collect all relay graphql query, and save in persist-query.js. you can use it for server side persisted query for security and performance, then client side just send query id between server and client.

###publish
to publish cloud code to server

###log
to get logs of this QiliApp on server

###dev
to set development mode on server side, so you can use graphql to query.