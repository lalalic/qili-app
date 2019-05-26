## How to develop
* Apply for QiliApp on https://app.qili2.com, and get appId
* set appId in src/index.js
* service default is at https://api.qili2.com/1/graphql, you can cuctomize it to your own domain, check dist/nginx.conf
* Define graphql schema in cloud/index.js on Cloud.typeDefs
* npm run cloud
* submit cloud/__generated.js content on https://app.qili2.com for your QiliApp
* copy graphql schema on app.qili2.com, and save to schema.graphql
