import {React, TestUtils, newPromise,uuid} from './Helper'
import Async from '../../lib/components/async'
describe("<Async/>", function(){
    it("renderable with different props", ()=>{
        [{},{model:newPromise},{model:{fetch(){}}}].forEach((props)=>{
            let render=TestUtils.renderIntoDocument(<Async {...props}/>)
            expect(render).toBeTruthy()
        })
    })

    describe("Async model",  function(){
        it("should be loading with unresolved promise, and thenable", ()=>{
            let loading=(<div className={`loading${uuid()}`}/>),
                fetchableP=newPromise(),
                fetchable={
                    fetch(success, error){
                        fetchableP.then(success,error)
                    }
                };
            [{loading, model:newPromise()}, {loading, model:fetchable}].forEach((props)=>{
                let render=TestUtils.renderIntoDocument(<Async {...props}/>);
                (function(coms){//Loading
                    expect(render.state.loading).toBe(true)
                    TestUtils.findAllInRenderedTree(render,(a)=>coms.push(a))
                    expect(coms.length).toBe(2)//0:async, 1:loading
                    expect(coms[1].props.className).toMatch(/^loading/)
                })([]);
            })
        })

        fit("should show error with rejected promise, and error thenable", ()=>{
            let loading=(<div className={`loading${uuid()}`}/>),
                model=newPromise(),
                fetchableP=newPromise(),
                fetchable={
                    fetch(success, error){
                        fetchableP.then(success,error)
                    }
                },
                errorMsg=`error ${uuid()}`;
            model.reject(new Error(errorMsg));
            fetchableP.reject(new Error(errorMsg));

            [{loading, model:model}, {loading, model:fetchable}].forEach((props)=>{
                let render=TestUtils.renderIntoDocument(<Async {...props}/>);
                let {model}=props;

                (function(coms){
                    expect(render.state.loadError).toBe(errorMsg)
                    TestUtils.findAllInRenderedTree(render,(a)=>coms.push(a))
                    expect(coms.length).toBe(2)//0:async, 1:error
                    expect(coms[1].props.text).toBe(errorMsg)
                })([]);

            })
        })
    })

    describe("sync mode", function(){

    })
})
