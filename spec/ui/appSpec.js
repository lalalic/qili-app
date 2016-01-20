import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType,Any, findCommand} from '../components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "../db/helper"
import App from "../../lib/db/app"
import User from "../../lib/db/user"
import MyUI from "../../lib/app"

describe("App UI", function(){
    let AppUI=injectTheme(MyUI)

    it("can show current existing application",()=>{
        spyOn(App,"isRemovable").and.returnValue(true)
        let props={app:{_id:`app${uuid()}`, name:"test"}}
            ,ui=TestUtils.renderIntoDocument(<AppUI {...props}/>)
            ,cmdRemove=findCommand(ui, "Remove")
            ,cmdUpload=findCommand(ui, "Upload")
            ,cmdSave=findCommand(ui,"Save")

        expect(cmdSave).toBeFalsy()
        expect(cmdRemove).toBeTruthy()
        expect(cmdUpload).toBeTruthy()

    })

    it("can add new application", ()=>{
        let props={app:{}},
            ui=TestUtils.renderIntoDocument(<AppUI {...props}/>)
            ,cmdRemove=findCommand(ui, "Remove")
            ,cmdUpload=findCommand(ui, "Upload")
            ,cmdSave=findCommand(ui,"Save")

            expect(cmdSave).toBeTruthy()
            expect(cmdRemove).toBeFalsy()
            expect(cmdUpload).toBeFalsy()
    })

    it("can not remove built-in application", ()=>{
        spyOn(App,"isRemovable").and.returnValue(false)

        let props={app:{_id:`app${uuid()}`, name:"test"}},
            ui=TestUtils.renderIntoDocument(<AppUI {...props}/>)
            ,cmdRemove=findCommand(ui, "Remove")
            ,cmdUpload=findCommand(ui, "Upload")
            ,cmdSave=findCommand(ui,"Save")

            expect(cmdSave).toBeFalsy()
            expect(cmdRemove).toBeFalsy()
            expect(cmdUpload).toBeFalsy()

    })
})
