import React, {addons} from 'react/addons'
var {TestUtils}=addons, _now=Date.now()



module.exports={
    React,
    TestUtils,

    newPromise(a){
        return Object.assign(new Promise((resolve,reject)=>a={resolve,reject}),a)
    },
    uuid(){
        return _now++
    }
}
