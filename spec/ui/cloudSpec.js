import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from '../components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "../db/helper"
import App from "../../lib/db/app"
import User from "../../lib/db/user"
import selector from "../../lib/components/file-selector"
import MyUI from "../../lib/cloud"

describe("cloud ui", function(){

    beforeAll(function(){
        let cloudCode=this.cloudCode=`code${uuid()}`
            ,props={app:{cloudCode}}
            ,ui=this.ui=render(MyUI,props)
            ,input=this.input=TestUtils.findRenderedDOMComponentWithTag(ui, 'textarea')
            ,cmdSave=this.cmdSave=findCommand(ui,"Save")
            ,cmdUpload=this.cmdUpload=findCommand(ui,"Upload")
    })

    it("can create", function(){
        let {cloudCode, ui, input, cmdSave, cmdUpload}=this
        expect(input.getDOMNode().value).toBe(cloudCode)
        expect(cmdSave).toBeTruthy()
        expect(cmdUpload).toBeTruthy()
    })

    it("can change code", function(){
        let {cloudCode, ui, input, cmdSave, cmdUpload}=this

        //change
        let changed=`code${uuid()}`
        input.getDOMNode().value=changed
        TestUtils.Simulate.change(input)
        expect(ui.state.cloudCode).toBe(changed)

        spyOn(App,"upsert")
        TestUtils.Simulate.click(cmdSave)
        expect(App.upsert).toHaveBeenCalledWith(jasmine.objectContaining({cloudCode:changed}))
    })

    it("can load from file", function(done){
        let {cloudCode, ui, input, cmdSave, cmdUpload}=this

        let fileContent=`code${uuid()}`
        spyOn(App,"upsert")
        spyOn(selector,"selectTextFile").and.returnValue(Promise.resolve({data:fileContent}))
        TestUtils.Simulate.click(cmdUpload)
        expect(selector.selectTextFile).toHaveBeenCalled()
        setTimeout(()=>{
                expect(ui.state.cloudCode).toBe(fileContent)
                expect(App.upsert)
                    .toHaveBeenCalledWith(jasmine.objectContaining({cloudCode:fileContent}))
                done()
            }, 200)
    })

    it("should check code when saving", ()=>{
        //@TODO
    })
})
