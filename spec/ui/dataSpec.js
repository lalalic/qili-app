import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType,Any} from '../components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "../db/helper"
import App from "../../lib/db/app"
import User from "../../lib/db/user"
import MyUI from "../../lib/data"

describe("Data UI", ()=>{
    let DataUI=injectTheme(MyUI)

    beforeAll((done)=>{
        let appId=`data${uuid()}`
        initWithUser(appId).then(()=>{
            var apps=[{_id:`${uuid()}`,name:`${uuid()}`,apiKey:`${uuid()}key`},
                    {_id:`${uuid()}`,name:`${uuid()}`,apiKey:`${uuid()}key`}],
                schema=[
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

    it("can create",()=>{
        spyOn(App, "collectionData").and.returnValue(newPromise())
        spyOn(App, "collectionIndexes").and.returnValue(newPromise())

        let props={},
            ui=TestUtils.renderIntoDocument(<DataUI {...props}/>)
    })

    describe("rendered content", ()=>{
        beforeAll((done)=>{
            var data=newPromise(),
                indexes=newPromise();
            spyOn(App, "collectionData").and.returnValue(data)
            spyOn(App, "collectionIndexes").and.returnValue(indexes)

            let props={},
                ui=TestUtils.renderIntoDocument(<DataUI {...props}/>)

            data.resolve([{_id:`${uuid()}`,username:"test"},{_id:`${uuid()}`,username:"test2"}])
            indexes.resolve({users:[{username:1}]})
            setTimeout(()=>{
                done()
            },100)
        })

        fit("should show data and indexes of specified collection", function(){

        })

        it("should list all collections for selection", function(){

        })

        it("can upload schema", ()=>{

        })

        it("can update data", ()=>{

        })
    })
})
