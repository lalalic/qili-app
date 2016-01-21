import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from '../components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "../db/helper"
import App from "../../lib/db/app"
import User from "../../lib/db/user"
import selector from "../../lib/components/file-selector"
import MyUI from "../../lib/cloud"

describe("cloud ui", function(done){
    it("can create", ()=>{
        let cloudCode=`code${uuid()}`
            ,props={app:{cloudCode}}
            ,ui=render(MyUI,props)
            ,input=TestUtils.findRenderedDOMComponentWithTag(ui, 'textarea')
            ,cmdSave=findCommand(ui,"Save")
            ,cmdUpload=findCommand(ui,"Upload")

        expect(input.getDOMNode().value).toBe(cloudCode)
        expect(cmdSave).toBeTruthy()
        expect(cmdUpload).toBeTruthy()

        //change
        let changed=`code${uuid()}`
        input.getDOMNode().value=changed
        TestUtils.Simulate.change(input)
        expect(ui.state.cloudCode).toBe(changed)

        spyOn(App,"upsert")
        TestUtils.Simulate.click(cmdSave)
        expect(App.upsert).toHaveBeenCalledWith(jasmine.objectContaining({cloudCode:changed}))

        let fileContent=`code${uuid()}`
        App.upsert.calls.reset()
        spyOn(selector,"selectTextFile").and.returnValue(Promise.resolve(fileContent))
        TestUtils.Simulate.click(cmdUpload)
        expect(selector.selectTextFile).toHaveBeenCalled()
        setTimeout(()=>{
                expect(App.upsert)
                    .toHaveBeenCalledWith(jasmine.objectContaining({cloudCode:fileContent}))
                expect(ui.state.cloudCode).toBe(fileContent)
                done()
            }, 200)
    })
})
