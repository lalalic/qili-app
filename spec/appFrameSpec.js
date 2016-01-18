import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType,Any} from './components/helper'
import {initWithUser,failx} from './db/helper'
import QiliApp from '../lib/main'
import init, {User} from '../lib/db'
import Account from "../lib/account"
import Loading from "../lib/components/loading"
import Messager from "../lib/components/messager"

describe("qiliApp frame", ()=>{
    let appId=`app${uuid()}`
    it("create",()=>{
        let props={appId},
            render=TestUtils.renderIntoDocument(<QiliApp {...props}/>)
    })

    it("render state",(done)=>{
        let props={appId},
            render=TestUtils.renderIntoDocument(<QiliApp {...props}/>)

        setTimeout(()=>{
                expect(User.current).toBeFalsy()
                var {__inited,__initedError,__user}=render.state
                expect(__inited).toBe(true)
                expect(__initedError).toBeFalsy()
                expect(__user).toBeFalsy()
                TestUtils.findRenderedComponentWithType(render,Account)

                render.setState({__inited:false})
                var container=TestUtils.findRenderedDOMComponentWithClass(render,"withFootbar")
                expect(container.getDOMNode().textContent).toMatch(/Initializing/i)

                var error=`error${uuid()}`
                render.setState({__inited:false,__initedError:error})
                var text=container.getDOMNode().textContent
                expect(text).toMatch(/Initializing/i)
                expect(text).toMatch(new RegExp(error,"i"))

                var content=(<Any/>)
                spyOn(render,"renderContent").and.returnValue(content)
                render.setState({__inited:true,__initedError:undefined,__user:{username:"test",sessionToken:"asdf"}})
                expect(render.renderContent).toHaveBeenCalled()
                TestUtils.findRenderedComponentWithType(render,Any)

                container=TestUtils.findRenderedDOMComponentWithClass(render,"withFootbar")
                expect(container.getDOMNode().textContent).not.toMatch(/Initializing/i)

                done()
            },100)
    })

    it("should adapt UI size",()=>{
        //@TODO: render to <div id="app"/>, elegant loading, and messager
    })

    it("should shortcut render with routes",()=>{
        //@TODO
    })

    it("should request login when current change to null",(done)=>{
        let props={appId},
            render=TestUtils.renderIntoDocument(<QiliApp {...props}/>)

        setTimeout(()=>{
            var content=(<Any/>)
            spyOn(render,"renderContent").and.returnValue(content)
            render.setState({__inited:true,__initedError:undefined,__user:{username:"test",sessionToken:"asdf"}})
            expect(render.renderContent).toHaveBeenCalled()
            TestUtils.findRenderedComponentWithType(render,Any)

            var len=render.renderContent.calls.count()
            expect(User.current).toBeFalsy()
            User.emit('change')
            expect(User.current).toBe(null)
            expect(render.renderContent.calls.count()).toBe(len)
            TestUtils.findRenderedComponentWithType(render,Account)

            done()
        },100)
    })
})
