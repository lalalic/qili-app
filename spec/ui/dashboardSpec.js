import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from '../components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "../db/helper"
import App from "../../lib/db/app"
import User from "../../lib/db/user"
import List, {Item} from "../../lib/components/list"
import MyUI from "../../lib/dashboard"

describe("dasbhoard", function(){
    function findAndClick(text,items,spy){
        spy.calls.reset()
        let reg=new RegExp(text, "ig")
            ,item=items.filter((a)=>{
                    return a.getDOMNode().textContent.match(reg)
                })[0]
            ,all=[]

        TestUtils.findAllInRenderedTree(item, (a)=>a).forEach((a)=>{
            TestUtils.Simulate.click(a)
        })
        expect(spy).toHaveBeenCalled()
    }

    describe("with existingApps", ()=>{
        let appId=`testModel${uuid()}`
        beforeAll(done=>{
            var existingApps=[{_id:"1",name:"test"},{_id:"2",name:"man"}]
            spyOnXHR({results:existingApps})
            initWithUser(appId,()=>{
                App.init().catch(failx(done))
                    .then(()=>{
                        ajaxHaveBeenCalled()
                        expect(App.all).toBeDefined()
                        expect(App.all.length).toBe(existingApps.length)
                        expect(App.current).toBeDefined()
                        expect(App.current.name).toBe(existingApps[0].name)
                        done()
                    })
            })
        })

        it("can create with existingApps",function(){
            let props={}
                ,context={router:()=>{}}
                ,ui=render(MyUI, props, context)
                ,moreActions=TestUtils.scryRenderedComponentsWithType(ui, Item)

            expect(moreActions.length).toBe(1+1+2)//current+new+all

            
        })

        it("can navigate to current app, add new app, switch app",function(){
            let props={}
                ,transitionTo=jasmine.createSpy("transitionTo")
                ,router=Object.assign(()=>1, {transitionTo})
                ,context={router}
                ,ui=render(MyUI, props, context)
                ,moreActions=TestUtils.scryRenderedComponentsWithType(ui, Item)

            findAndClick("setting",moreActions, transitionTo)
            expect(transitionTo).toHaveBeenCalledWith("app",App.current)

            findAndClick("man",moreActions, transitionTo)
            expect(App.current.name).toBe("man")
            expect(transitionTo).toHaveBeenCalledWith("app",App.current)

            findAndClick("more",moreActions, transitionTo)
            expect(transitionTo).toHaveBeenCalledWith("app",{})
        })
    })

    describe("with no existing app", ()=>{
        let appId=`testModel${uuid()}`
        beforeAll(done=>{
            var existingApps=[]
            spyOnXHR({results:existingApps})
            initWithUser(appId,()=>{
                App.init().catch(failx(done))
                    .then(()=>{
                        ajaxHaveBeenCalled()
                        expect(App.all).toBeDefined()
                        expect(App.all.length).toBe(existingApps.length)
                        expect(App.current).toBe(undefined)
                        done()
                    })
            })
        })

        it("can create", function(){
            let props={}
                ,transitionTo=jasmine.createSpy("transitionTo")
                ,router=Object.assign(()=>1, {transitionTo})
                ,context={router}
                ,ui=render(MyUI, props, context)
                ,moreActions=TestUtils.scryRenderedComponentsWithType(ui, Item)

            expect(moreActions.length).toBe(1)
            findAndClick("first",moreActions, transitionTo)
            expect(transitionTo).toHaveBeenCalledWith("app",{})
        })
    })
})
