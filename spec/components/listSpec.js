var {React, addons:{TestUtils}}= require('react/addons'),
    List=require('../../lib/components/list')

describe("List", function(){
    describe("async mode", function(){
        it("can accept promise as model", done=>{
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
