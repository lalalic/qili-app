import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType,Any, testTextField, findCommand} from '../components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "../db/helper"
import App from "../../lib/db/app"
import User from "../../lib/db/user"
import MyUI from "../../lib/app"
import {TextField} from "material-ui"

describe("App UI", function(){
    let AppUI=injectTheme(MyUI)

    it("can show current existing application",()=>{
        spyOn(App,"isRemovable").and.returnValue(true)
        let props={app:{_id:`app${uuid()}`, name:"test", uname:"uname", apiKey:"adfasdf"}}
            ,render=TestUtils.renderIntoDocument(<AppUI {...props}/>)
            ,ui=TestUtils.findRenderedComponentWithType(render,MyUI)
            ,cmdRemove=findCommand(ui, "Remove")
            ,cmdUpload=findCommand(ui, "Upload")
            ,cmdSave=findCommand(ui,"Save")
            ,textFields=TestUtils.scryRenderedComponentsWithType(ui,TextField)

        expect(cmdSave).toBeFalsy()
        expect(cmdRemove).toBeTruthy()
        expect(cmdUpload).toBeTruthy()

        expect(textFields.length).toBe(4)
        expect(textFields[0].getValue()).toBe(props.app.name)
        expect(textFields[1].getValue()).toBe(props.app.uname)
        expect(textFields[2].getValue()).toBe(props.app.apiKey)
        expect(textFields[3].getValue()).toMatch(new RegExp(`${props.app.apiKey}/wechat`,"ig"))
        expect(textFields[0].props.disabled).toBe(false)
        expect(textFields[1].props.disabled).toBe(false)

        spyOn(App,'upsert').and.returnValue(newPromise())
        spyOn(ui,'setState')
        testTextField(textFields[0],"name", `name${uuid()}`, ui.setState, "app", App.upsert)
        testTextField(textFields[1],"uname", `uname${uuid()}`,ui.setState,  "app", App.upsert)
    })

    it("can add new application", ()=>{
        spyOn(App,"isRemovable").and.returnValue(true)
        let props={app:{}}
            ,render=TestUtils.renderIntoDocument(<AppUI {...props}/>)
            ,ui=TestUtils.findRenderedComponentWithType(render,MyUI)
            ,cmdRemove=findCommand(ui, "Remove")
            ,cmdUpload=findCommand(ui, "Upload")
            ,cmdSave=findCommand(ui,"Save")
            ,textFields=TestUtils.scryRenderedComponentsWithType(ui,TextField)

            expect(cmdSave).toBeTruthy()
            expect(cmdRemove).toBeFalsy()
            expect(cmdUpload).toBeFalsy()

            expect(textFields[0].getValue()).toBe("")
            expect(textFields[1].getValue()).toBe("")
            expect(textFields[2].getValue()).toBe("")
            expect(textFields[3].getValue()).toBe("")
            expect(textFields[0].props.disabled).toBe(false)
            expect(textFields[1].props.disabled).toBe(false)


            let newName="test1"
            spyOn(App,'upsert').and.callFake((app)=>{
                expect(app.name).toBe(newName)
                return newPromise()
            })
            spyOn(ui,'setState').and.callFake(({app})=>{
                expect(app.name).toBe(newName)
            })
            let inName=textFields[0],
                input=TestUtils.findRenderedDOMComponentWithTag(inName,'input')
            input.getDOMNode().value=newName
            TestUtils.Simulate.change(input)
            expect(ui.setState).toHaveBeenCalled()
            TestUtils.Simulate.blur(input)
            expect(App.upsert).not.toHaveBeenCalled()

            TestUtils.Simulate.click(cmdSave)
            expect(App.upsert).toHaveBeenCalled()
    })

    it("can not remove built-in application", ()=>{
        spyOn(App,"isRemovable").and.returnValue(false)

        let props={app:{_id:`app${uuid()}`, name:"test", uname:"test"}}
            ,render=TestUtils.renderIntoDocument(<AppUI {...props}/>)
            ,ui=TestUtils.findRenderedComponentWithType(render,MyUI)
            ,cmdRemove=findCommand(ui, "Remove")
            ,cmdUpload=findCommand(ui, "Upload")
            ,cmdSave=findCommand(ui,"Save")
            ,textFields=TestUtils.scryRenderedComponentsWithType(ui,TextField)

            expect(cmdSave).toBeFalsy()
            expect(cmdRemove).toBeFalsy()
            expect(cmdUpload).toBeFalsy()

            expect(textFields[0].props.disabled).toBe(true)
            expect(textFields[1].props.disabled).toBe(true)
    })

    describe("refreshing page", function(){
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

        it("should reset current app if params.name is not same with current app",()=>{
            let props={app:{_id:`1`, name:"test"}, params:{name:"man"}}
                ,render=TestUtils.renderIntoDocument(<AppUI {...props}/>)
                ,ui=TestUtils.findRenderedComponentWithType(render,MyUI)
            expect(ui.state.app.name).toBe("man")
            expect(App.current.name).toBe("man")
        })

        it("should use current app if params.name is same with current app",()=>{
            let props={app:{_id:`1`, name:"test"}, params:{name:"test"}}
                ,render=TestUtils.renderIntoDocument(<AppUI {...props}/>)
                ,ui=TestUtils.findRenderedComponentWithType(render,MyUI)
            expect(ui.state.app.name).toBe("test")
        })

        it("should throw error if params.name not exist",()=>{
            try{
                let props={app:{_id:`1`, name:"test"}, params:{name:"not existing"}}
                    ,render=TestUtils.renderIntoDocument(<AppUI {...props}/>)
                    ,ui=TestUtils.findRenderedComponentWithType(render,MyUI)
                fail()
            }catch(e){
                expect(e.message).toBeDefined()
            }
        })
    })
})
