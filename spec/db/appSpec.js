
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, uuid,root} from './helper'
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

        it("can get collection array data of current app",done=>{
            let books=[{_id:`book${uuid()}`, title:"a"},{_id:`book${uuid()}`, title:"b"}]
            spyOnXHR({results:books})
            App.collectionData("books").catch(failx(done)).then((books)=>{
                expect(Array.isArray(books)).toBe(true)
                expect(books.length).toBe(2)
                done()
            })
        })

        it("can get schema of current app, and promise resolved with []",done=>{
            var current=App.current,
                schema=[{name:"book",fields:["_id","title"]},
                    {name:"publisher",fields:["_id","name"]}]

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
        })

        it("can get indexes of current app,and promise resolved by {user:[{},{}]}", done=>{
            var current=App.current,
                indexes={
                    users:[{username:1, $option:{unique:true}},{email:1, $option:{unique:true, sparse:true}}],
            	    roles:[{name:1, $option:{unique:true}}],
                    apps:[{'author._id':1,'name':1, $option:{unique:true}}]
                }

            spyOnXHR(indexes,(xhr,data)=>{
                expect(xhr.url).toMatch(new RegExp(`appman=${current.apiKey}`,"ig"))
                expect(xhr.url).toMatch(new RegExp(`${root}schemas/indexes`),'ig')
            })

            App.indexes.catch(failx(done)).then((returnedIndexes)=>{
                ajaxHaveBeenCalled()
                expect(returnedIndexes).toBeDefined()
                expect(returnedIndexes.users).toBeDefined()
                expect(returnedIndexes.apps).toBeDefined()
                done()
            })
        })

        it("can get collection index array by collectionIndexes(name)", done=>{
            var current=App.current,
                indexes={
                    users:[{username:1, $option:{unique:true}},{email:1, $option:{unique:true, sparse:true}}],
            	    roles:[{name:1, $option:{unique:true}}],
                    apps:[{'author._id':1,'name':1, $option:{unique:true}}]
                }

            spyOnXHR(indexes,(xhr,data)=>{
                expect(xhr.url).toMatch(new RegExp(`appman=${current.apiKey}`,"ig"))
                expect(xhr.url).toMatch(new RegExp(`${root}schemas/indexes`),'ig')
            })

            App.collectionIndexes("users").catch(failx(done)).then((data)=>{
                expect(Array.isArray(data)).toBe(true)
                expect(data.length).toBe(indexes.users.length)
                done()
            })
        })

        it("can set schema of current app", done=>{
            var current=App.current
            spyOnXHR(null,(xhr,data)=>{
                expect(xhr.url).toMatch(new RegExp(`appman=${current.apiKey}`,"ig"))
                expect(xhr.url).toMatch(new RegExp(`${root}schemas`),'ig')
                expect(xhr.method).toBe('post')
            })

            App.setSchema({users:[{name:1}]}).catch(failx(done)).then((a)=>{
                ajaxHaveBeenCalled()
                expect(a).toBeDefined()
                done()
            })
        })

        it("can upload model data for current app", done=>{
            var current=App.current
            spyOnXHR(null,(xhr,data)=>{
                expect(xhr.method).toBe('post')
                expect(xhr.url).toMatch(new RegExp(`${root}classes/books`),'ig')
                expect(xhr.requestHeaders['X-Application-Id']).toBe(current.apiKey)
            })

            let books=[{name:"book1"},{name:"book2"}]
            App.collectionData("books",books)
                .catch(failx(done))
                .then(()=>{
                    ajaxHaveBeenCalled(books.length)
                    done()
                })
        })

        it("can get all logs array", done=>{
            var current=App.current,logs=[{},{}]
            spyOnXHR({results:logs}, (xhr, data)=>{
                expect(xhr.url).toMatch(new RegExp(`appman=${current.apiKey}`,"ig"))
                expect(xhr.url).toMatch(new RegExp(`${root}schemas/logs`,'ig'))
            })
            App.getLog().then(data=>{
                    ajaxHaveBeenCalled()
                    expect(Array.isArray(data)).toBe(true)
                    expect(data.length).toBe(logs.length)
                    done()
                },failx(done))
        })
    })

    describe("dev service", function(){

    })
})
