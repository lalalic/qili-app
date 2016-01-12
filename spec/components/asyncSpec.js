import {React, Component, TestUtils, newPromise,uuid} from './Helper'
import Async from '../../lib/components/async'

class Empty extends Component{
    constructor(){super(...arguments)}
    render(){
        return null
    }
}
class Loading extends Empty{
    constructor(){super(...arguments)}
}
class Error extends Empty{
    constructor(){super(...arguments)}
}

function expectHasType(el,type,n=1){
    expect(TestUtils.findRenderedComponentWithType(el,type)).toBeTruthy()
    //expect(TestUtils.findAllInRenderedTree(el,(a)=>TestUtils.isElementOfType(a,type)).length).toBe(n)
}

describe("<Async/>", function(){
    it("renderable with different props", ()=>{
        [{},{model:newPromise},{model:{fetch(){}}}].forEach((props)=>{
            let render=TestUtils.renderIntoDocument(<Async {...props}/>)
            expect(render).toBeTruthy()
        })
    })



    describe("Async model",  function(){
        it("error,loading,empty when data is empty",()=>{
            let loading=(<Loading/>),
                empty=(<Empty/>),
                errorMsg=`error${uuid()}`,
                render=TestUtils.renderIntoDocument(<Async {...{loading,empty}}/>);

            spyOn(render,'renderError').and.returnValue(<Error/>)


            expectHasType(render,Async)

            render.setState({loading:true,data:undefined,loadError:undefined})
            expect(render.state.loading).toBe(true)
            expectHasType(render,Loading)

            render.setState({loading:undefined,data:undefined,loadError:errorMsg})
            expect(render.state.loadError).toBe(errorMsg)
            expectHasType(render,Error)

            render.setState({loading:undefined,data:[],loadError:undefined})
            expectHasType(render,Empty)

            render.setState({loading:undefined,data:null,loadError:undefined})
            expectHasType(render,Empty)
        })

        fit("should be loading with unresolved promise, and thenable", (done)=>{
            let loading=(<Loading/>),
                empty=(<Empty/>),
                errorMsg=`error${uuid()}`,
                model=newPromise(),
                render=TestUtils.renderIntoDocument(<Async {...{loading,empty,model}}/>);

            spyOn(render,'renderError').and.returnValue(<Error/>)
            spyOn(render,'render').and.callThrough()

            expect(render.state.loading).toBe(true)

            model.resolve()
        })

        it("should show error with rejected promise, and error thenable", ()=>{

        })
    })

    describe("sync mode", function(){

    })
})
