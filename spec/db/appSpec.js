
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, uuid} from './helper'
import {init, Model, User} from "../../lib/db"
import App from "../../lib/db/app"

describe("application service", function(){
    let appId=`testModel${uuid()}`
    beforeAll(done=>initWithUser(appId,done))

    describe("init", function(){
        it("can be inited with empty applications, and App.all, current is empty", done=>{
            var existingApps=[]
            spyOnXHR({results:existingApps})
            App.init().catch(failx(done))
                .then(()=>{
                    ajaxHaveBeenCalled()
                    expect(App.all).toBeDefined()
                    expect(App.all.length).toBe(existingApps.length)
                    expect(App.current).toBeFalsy()
                    done()
                })
        })
        it("should be inited with all my applications, and App.all, current is ready", done=>{
            var existingApps=[{_id:"1",name:"test"},{_id:"2",name:"man"}]
            spyOnXHR({results:existingApps})
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

    describe("management service", function(){
        beforeAll(done=>{
            var apps=[{_id:`${uuid()}`,name:`${uuid()}`},{_id:`${uuid()}`,name:`${uuid()}`}]
            spyOn(App.cols.remoteCol,"find").and.returnValue({
                fetch(success){
                    success(apps)
                }
            })
            App.init().then(()=>{
                expect(App.all.length).toBe(apps.length)
                expect(App.current).toBeDefined()
                done()
            },failx(done))
        })


        it("can add new app, and Application.all is updated accordingly", done=>{
            var count=App.all.length, now=new Date(), name=`${uuid()}app`
            spyOnXHR({created:now, _id:`${uuid()}`})
            App.upsert({name}).catch(failx(done))
                .then((doc)=>{
                    ajaxHaveBeenCalled()

                    expect(doc).toBeDefined()
                    expect(doc.name).toBe(name)
                    expect(doc.created).toBeDefined()
                    expect(doc._id).toBeDefined()

                    expect(App.all.length).toBe(count+1)
                    done()
                })
        })

        it("can update app, and Application.all is updated accordingly", done=>{
            var count=App.all.length,
                now=new Date(),
                name=`${uuid()}app`,
                last=App.current;
            spyOnXHR({updated:now})

            last.name=name
            App.upsert(last).catch(failx(done))
                .then((doc)=>{
                    ajaxHaveBeenCalled()

                    expect(doc).toBeDefined()
                    expect(doc.name).toBe(name)
                    expect(doc.updated).toBeDefined()
                    console.info(doc.updated)
                    expect(doc._id).toBe(last._id)

                    expect(App.all.length).toBe(count)
                    done()
                })
        })

        it("can remove app, and Application.all is updated accordingly", done=>{
            var count=App.all.length,
                now=new Date(),
                name=`${uuid()}app`,
                last=App.current;
            spyOnXHR(true)

            App.remove(last._id).catch(failx(done))
                .then(()=>{
                    ajaxHaveBeenCalled()

                    expect(App.all.length).toBe(count-1)

                    expect(App.current).toBeDefined()
                    expect(App.current._id).not.toBe(last._id)
                    done()
                })
        })
    })

    describe("schema service", function(){
        beforeAll(done=>{
            var apps=[{_id:`${uuid()}`,name:`${uuid()}`,apiKey:`${uuid()}key`},
                    {_id:`${uuid()}`,name:`${uuid()}`,apiKey:`${uuid()}key`}]
            spyOn(App.cols.remoteCol,"find").and.returnValue({
                fetch(success){
                    success(apps)
                }
            })
            App.init().then(()=>{
                expect(App.all.length).toBe(apps.length)
                expect(App.current).toBeDefined()
                done()
            },failx(done))
        })

        fit("can get schema of current app",done=>{
            var current=App.current,
                schema=[{name:"book",fields:[{name:"_id"},{name:"title"}]},
                    {name:"publisher",fields:[{name:"_id"},{name:"name"}]}]

            spyOnXHR({results:schema},(xhr,data)=>{
                expect(xhr.url).toMatch(new Reg(`appman=${current.apiKey}`,"ig"))
            })

            App.schema.catch(failx(done)).then((schema)=>{
                ajaxHaveBeenCalled()

                expect(Array.isArray(schema)).toBe(true)
                done()
            })
        })

        it("can get indexes of current app", done=>{
            done()
        })

        it("can set schema of current app", done=>{

        })
    })

    describe("log query service",function(){

    })

    describe("dev service", function(){

    })
})