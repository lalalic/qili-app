import {React, Component, TestUtils, newPromise,uuid,expectHasType} from './helper'
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
class AError extends Empty{
    constructor(){super(...arguments)}
}

describe("<Async/>", function(){
    it("renderable with different props", ()=>{
        [{},{model:newPromise},{model:{fetch(){}}}].forEach((props)=>{
            let render=TestUtils.renderIntoDocument(<Async {...props}/>)
            expect(render).toBeTruthy()
        })
    })

    it("test empty", ()=>{
        let render=TestUtils.renderIntoDocument(<Async/>)
        expect(render.isEmpty()).toBeTruthy()

        render.setState({data:null})
        expect(render.isEmpty()).toBeTruthy()

        render.setState({data:[]})
        expect(render.isEmpty()).toBeTruthy()

        render=TestUtils.renderIntoDocument(<Async {...{children:[]}}/>)
        expect(render.isEmpty()).toBeTruthy()

        render.setState({data:null})
        expect(render.isEmpty()).toBeTruthy()

        render.setState({data:[]})
        expect(render.isEmpty()).toBeTruthy()

        render=TestUtils.renderIntoDocument(<Async></Async>)
        expect(render.isEmpty()).toBeTruthy()

        render.setState({data:null})
        expect(render.isEmpty()).toBeTruthy()

        render.setState({data:[]})
        expect(render.isEmpty()).toBeTruthy()
    })

    it("test not empty", ()=>{
        let render=TestUtils.renderIntoDocument(<Async><div/></Async>)
        expect(render.isEmpty()).toBeFalsy()

        render.setState({data:[]})
        expect(render.isEmpty()).toBeFalsy()

        render.setState({data:null})
        expect(render.isEmpty()).toBeFalsy()

        render=TestUtils.renderIntoDocument(<Async/>)
        render.setState({data:{}})
        expect(render.isEmpty()).toBeFalsy()

        render.setState({data:[{}]})
        expect(render.isEmpty()).toBeFalsy()
    })

    it("only error,loading,empty when state data is empty",()=>{
        let loading=(<Loading/>),
            empty=(<Empty/>),
            errorMsg=`error${uuid()}`,
            render=TestUtils.renderIntoDocument(<Async {...{loading,empty}}/>);

        spyOn(render,'renderError').and.returnValue(<AError/>)

        render.setState({loading:true,data:undefined,loadError:undefined})
        expect(render.state.loading).toBe(true)
        expectHasType(render,Loading).toBeDefined()

        render.setState({loading:undefined,data:undefined,loadError:errorMsg})
        expect(render.state.loadError).toBe(errorMsg)
        expectHasType(render,AError).toBeDefined()

        render.setState({loading:undefined,data:[],loadError:undefined})
        expectHasType(render,Empty).toBeDefined()

        render.setState({loading:undefined,data:null,loadError:undefined})
        expectHasType(render,Empty).toBeDefined()
    })



    describe("Async model",  function(){
        it("support Promise, resolve with data",(done)=>{
            let model=newPromise()
            let render=TestUtils.renderIntoDocument(<Async {...{model}}/>);
            expect(render.state.loading).toBe(true)

            spyOn(render,'setState')
            let data={name:"hello"}
            model.resolve(data)
            setTimeout(()=>{
                    expect(render.setState).toHaveBeenCalledWith({data,loading:undefined,loadError:undefined})
                    done()
                },100)
        })

        it("support Promise, reject with data",(done)=>{
            let model=newPromise()
            let render=TestUtils.renderIntoDocument(<Async {...{model}}/>);
            expect(render.state.loading).toBe(true)

            spyOn(render,'setState')
            let error=`error${uuid()}`
            model.reject(new Error(error))
            setTimeout(()=>{
                    expect(render.setState).toHaveBeenCalledWith({loading:undefined,loadError:error})
                    done()
                },100)
        })

        it("support fetchable, resolve with data",(done)=>{
            let p=newPromise(),
                model={fetch(success,error){
                    p.then(success,error)
                }}
            let render=TestUtils.renderIntoDocument(<Async {...{model}}/>);
            expect(render.state.loading).toBe(true)

            spyOn(render,'setState')
            let data={name:"hello"}
            p.resolve(data)
            setTimeout(()=>{
                    expect(render.setState).toHaveBeenCalledWith({data,loading:undefined,loadError:undefined})
                    done()
                },100)
        })

        it("support fetchable, reject with data",(done)=>{
            let p=newPromise(),
                model={fetch(success,error){
                    p.then(success,error)
                }}
            let render=TestUtils.renderIntoDocument(<Async {...{model}}/>);
            expect(render.state.loading).toBe(true)

            spyOn(render,'setState')
            let error=`error${uuid()}`
            p.reject(new Error(error))
            setTimeout(()=>{
                    expect(render.setState).toHaveBeenCalledWith({loading:undefined,loadError:error})
                    done()
                },100)
        })

        it("should show error,loading when data is not empty during loading, or loaded with error", ()=>{
            let loading=(<Loading/>),
                empty=(<Empty/>),
                error=(<AError/>),
                errorMsg=`error${uuid()}`,
                model=newPromise();

            let render=TestUtils.renderIntoDocument(<Async {...{loading,empty,model}}/>);
            expect(render.state.loading).toBe(true)

            spyOn(render,'renderError').and.returnValue(error)
            spyOn(render,'render').and.callThrough()
            spyOn(render,"renderContent").and.returnValue(null)

            render.setState({data:[{name:"sdfd"}]})
            expect(render.state.loading).toBe(true)
            expect(render.renderContent).toHaveBeenCalledWith(loading)

            render.renderContent.calls.reset()
            render.setState({loadError:errorMsg,loading:undefined})
            expect(render.renderContent).toHaveBeenCalledWith(error)
        })
    })

})
