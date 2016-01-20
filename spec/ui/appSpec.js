import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType,Any, findCommand} from '../components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "../db/helper"
import App from "../../lib/db/app"
import User from "../../lib/db/user"
import MyUI from "../../lib/app"
import {TextField} from "material-ui"

describe("App UI", function(){
    let AppUI=injectTheme(MyUI)

    fit("can show current existing application",()=>{
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

        spyOn(App,'upsert')
        spyOn(ui,'setState').and.callThrough()
        let inName=textFields[0],
            input=TestUtils.findRenderedDOMComponentWithTag(inName,'input')
        input.value=("test1")
        TestUtils.Simulate.change(input)
        expect(ui.setState).toHaveBeenCalled()
        expect(ui.state.app.name).toBe("test1")
        debugger
        TestUtils.Simulate.blur(input)
        expect(App.upsert).toHaveBeenCalled()
    })

    it("can add new application", ()=>{
        let props={app:{}},
            ui=TestUtils.renderIntoDocument(<AppUI {...props}/>)
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
    })

    it("can not remove built-in application", ()=>{
        spyOn(App,"isRemovable").and.returnValue(false)

        let props={app:{_id:`app${uuid()}`, name:"test"}},
            ui=TestUtils.renderIntoDocument(<AppUI {...props}/>)
            ,cmdRemove=findCommand(ui, "Remove")
            ,cmdUpload=findCommand(ui, "Upload")
            ,cmdSave=findCommand(ui,"Save")
            ,textFields=TestUtils.scryRenderedComponentsWithType(ui,TextField)

            expect(cmdSave).toBeFalsy()
            expect(cmdRemove).toBeFalsy()
            expect(cmdUpload).toBeFalsy()

    })
})
