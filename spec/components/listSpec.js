import React, {addons} from 'react/addons'
import List from '../../lib/components/list'
var {TestUtils}=addons

describe("List", function(){
    describe("async mode", function(){
        fit("can accept promise as model", done=>{
            var resolve, reject,
                data=new Promise((a,b)=>{resolve=a;reject=b})

            let render=TestUtils.renderIntoDocument(<List model={data}/>)
            //Loading
            //
            done()
        })

        it("can accept {fetch} as model", done=>{
            done()
        })
    })

    describe("sync mode", function(){

    })
})
