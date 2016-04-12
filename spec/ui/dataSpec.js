import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType,Any, findCommand} from '../components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root, clearCurrentUser} from "../db/helper"
import App from "../../lib/db/app"
import User from "../../lib/db/user"
import selector from "../../lib/components/file-selector"
import MyUI, {IndexItem, NameItem} from "../../lib/data"

describe("Data UI", ()=>{
    let DataUI=injectTheme(MyUI)

    beforeAll(function(done){
		clearCurrentUser()
        let appId=`data${uuid()}`
        initWithUser(appId).then(()=>{
            var apps=[{_id:`${uuid()}`,name:`${uuid()}`,apiKey:`${uuid()}key`},
                    {_id:`${uuid()}`,name:`${uuid()}`,apiKey:`${uuid()}key`}],
                schema=this.schema=[
                    {name:User._name,fields:["_id","username"]},
                    {name:"book",fields:["_id","title"]},
                    {name:"publisher",fields:["_id","name"]}];

            spyOn(App.cols.remoteCol,"find").and.returnValue({
                fetch(success){
                    success(apps)
                }
            })

            App.init().then(()=>{
                expect(App.all.length).toBe(apps.length)
                expect(App.current).toBeDefined()

                var current=App.current
                spyOnXHR({results:schema},(xhr,data)=>{
                    expect(xhr.url).toMatch(new RegExp(`appman=${current.apiKey}`,"ig"))
                    expect(xhr.url).toMatch(new RegExp(`${root}schema`))
                })

                App.schema.catch(failx(done)).then((returnedSchema)=>{
                    ajaxHaveBeenCalled()
                    expect(Array.isArray(returnedSchema)).toBe(true)
                    expect(returnedSchema.length).toBe(schema.length)
                    done()
                })
            },failx(done))
        },failx(done))
    })

    it("can create for default User._name collection",()=>{
        spyOn(App, "collectionData").and.returnValue(newPromise())
        spyOn(App, "collectionIndexes").and.returnValue(newPromise())

        let props={},
            ui=TestUtils.renderIntoDocument(<DataUI {...props}/>)
        expect(App.collectionData).toHaveBeenCalledWith(User._name)
    })

    it("can create with specified collection name",()=>{
        spyOn(App,"collectionData")
        let props={params:{name:"book"}},
            ui=TestUtils.renderIntoDocument(<DataUI {...props}/>)

        expect(App.collectionData).toHaveBeenCalledWith("book")
    })

    describe("rendered content", ()=>{
        beforeAll(function(done){
            var data=newPromise(),
                indexes=newPromise();
            spyOn(App, "collectionData").and.returnValue(data)
            spyOn(App, "collectionIndexes").and.returnValue(indexes)

            let props={},
                ui=this.ui=TestUtils.renderIntoDocument(<DataUI {...props}/>)

            data.resolve([{_id:`${uuid()}`,username:"test"},{_id:`${uuid()}`,username:"test2"}])
            indexes.resolve([{username:1}])
            setTimeout(done,500)
        })

        it("should show data and indexes of specified collection", function(){
            let indexItems=TestUtils.scryRenderedComponentsWithType(this.ui,IndexItem)
            expect(indexItems.length).toBe(1)

            let dataRows=TestUtils.scryRenderedDOMComponentsWithTag(this.ui,'tr')
            expect(dataRows.length).toBe(2+1)//header+data rows
        })

        it("should list all collections for selection", function(){
            let nameItems=TestUtils.scryRenderedComponentsWithType(this.ui, NameItem)
            expect(nameItems.length).toBe(this.schema.length)
        })

        it("can upload schema", function(done){
            let cmd=findCommand(this.ui, "Schema")
            expect(cmd).toBeTruthy()

            let newSchema=[{}]
            spyOn(App, "setSchema").and.returnValue(Promise.resolve())
            spyOn(selector,"selectJsonInJsFile").and.returnValue(Promise.resolve({data:newSchema,name:"unknown"}))
            TestUtils.Simulate.click(cmd)
            expect(selector.selectJsonInJsFile).toHaveBeenCalled()
            setTimeout(()=>{
                expect(App.setSchema).toHaveBeenCalledWith(newSchema)
                done()
            },200)
        })

        it("should NOT upload empty schema", function(done){
            let cmd=findCommand(this.ui, "Schema")
            expect(cmd).toBeTruthy()

            let newSchema=[]
            spyOn(App, "setSchema").and.returnValue(Promise.resolve())
            spyOn(selector,"selectJsonInJsFile").and.returnValue(Promise.resolve({data:newSchema,name:"unknown"}))
            TestUtils.Simulate.click(cmd)
            expect(selector.selectJsonInJsFile).toHaveBeenCalled()
            setTimeout(()=>{
                expect(App.setSchema).not.toHaveBeenCalled()
                done()
            },200)
        })

        it("can update data", function(done){
            App.collectionData.calls.reset()
            let cmd=findCommand(this.ui, "Data")
            expect(cmd).toBeTruthy()

            let data=[{}]
            spyOn(selector,"selectJsonInJsFile").and.returnValue(Promise.resolve({data,name:"books"}))
            TestUtils.Simulate.click(cmd)
            expect(selector.selectJsonInJsFile).toHaveBeenCalled()
            setTimeout(()=>{
                expect(App.collectionData).toHaveBeenCalledWith("books",data)
                done()
            },200)
        })

        it("should NOT update empty data", function(done){
            App.collectionData.calls.reset()
            let cmd=findCommand(this.ui, "Data")
            expect(cmd).toBeTruthy()

            let data=[]
            spyOn(selector,"selectJsonInJsFile").and.returnValue(Promise.resolve({data,name:"books"}))
            TestUtils.Simulate.click(cmd)
            expect(selector.selectJsonInJsFile).toHaveBeenCalled()
            setTimeout(()=>{
                expect(App.collectionData).not.toHaveBeenCalled()
                done()
            },200)
        })
    })




})
