require('babel/polyfill')

import React, {addons} from 'react/addons'
var {TestUtils}=addons, _now=Date.now()



module.exports={
    React,
    TestUtils,
    Component:React.Component,
    newPromise(a){
        return Object.assign(new Promise((resolve,reject)=>a={resolve,reject}),a)
    },
    uuid(){
        return _now++
    }
}
