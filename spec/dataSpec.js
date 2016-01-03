import {init, Model, User} from "../lib/db"

class Book extends Model{
    static get _name(){return 'book'}
}

describe("Data retrive service", function(){
    var uuid=Date.now(),
        holder={
            ajax:()=>1,
            success:()=>1,
            _httpError(e, code){

            },
            _loadingHandler:{
                show(){

                },
                close(){

                }
            }
        },
        root="http://localhost/1/",
        appId="test"+uuid,
        SUCCESS=4,
        DATA=3;

    function failx(done){
        return (e)=>{
            console.error(e.message||e)
            fail(e.message||e)
            done()
        }
    }
    fit("init data service",done=>{
        console.info(`start init data service....`)
        expect(init).toBeTruthy()

        var user={username:'test',_id:'test',sessionToken:"adffsdfasdf"}

        spyOn(User,"init").and.callFake(function(){
            console.info(`init user service...`)
            return User.signin(user)
        })

        spyOn(holder,'ajax').and.callFake(function(method, url, params, data, success){
            console.info(`fake ajax for user service to return current user`)
            success(user)
            return Promise.resolve(user)
        })

        init(root,appId,()=>{
                expect(User.current).toBe(user)
                console.info(`init data service successfully with user: ${JSON.stringify(User.current)}`)
            },
            (...o)=>holder._httpError(...o),
            holder._loadingHandler,
            (...o)=>holder.ajax(...o))
                .then(()=>{
                    console.info(`inited data service, and promise returned with user: ${JSON.stringify(User.current)}`)
                    expect(User.current).toBe(user)
                    done()
                },failx(done))
    })


    describe("model service", function(){
        describe("online mode", function(){
            describe("local first",function(){
                fit("insert doc", done=>{
                    console.info(`start inserting doc`)
                    var book={name:`_book${uuid++}`},
                        title="hello",
                        i=0,
                        id;
                    new Promise((resolve, reject)=>{
                        spyOn(holder, "ajax").and.callFake(function(a,b,c,data){
                            console.info(`${a} ${b} with ${JSON.stringify(data)}`)
                            arguments[SUCCESS](Object.assign(data,{createdAt:new Date(), title}))
                            console.info(`handled ajax`)
                            i++
                        })
                        var _raw=Book.cols.upload
                        spyOn(Book.cols,'upload').and.callFake(function(s,e){
                            _raw.call(Book.cols,(...o)=>{
                                s && s(...o)
                                resolve()
                            },(...o)=>{
                                e && e(...o)
                                reject()
                            })
                        })

                        Book.upsert(book, null,(doc)=>{
                            id=doc._id
                            expect(doc.name).toBe(book.name)
                            expect(doc.createdAt).toBeDefined()
                            expect(doc._id).toBeDefined()
                            console.info(`book upserted with ${JSON.stringify(doc)}`)
                            resolve(doc)
                        }, reject)
                    }).then(()=>{
                        expect(id).toBeTruthy()
                        //check local db
                        Book.cols.localCol.findOne({_id:id},(localdoc)=>{
                            expect(i).toBe(1)
                            console.info(JSON.stringify(localdoc))
                            expect(localdoc).toBeTruthy()
                            expect(localdoc.name).toBe(book.name)
                            expect(localdoc.title).toBe(title)
                            done()
                        },failx(done))
                    })
                })

                it("insert doc without base", done=>{
                    var book={name:`_book${uuid++}`}, now=new Date()
                    spyOn(holder, "ajax").and.callFake(function(){
                        arguments[SUCCESS]({createdAt:now, _id:"hello"})
                    })

                    Book.upsert(book,(doc)=>{
                        expect(doc.name).toBe(book.name)
                        expect(doc._id).toBeDefined()

                        //check local db
                        Book.cols.localCol.findOne({_id:doc._id},(localdoc)=>{
                            expect(localdoc).toBeTruthy()
                            expect(localdoc.name).toBe(doc.name)
                            expect(doc.createdAt.getTime()).toBe(now.getTime())
                            done()
                        },failx(done))

                    }, failx(done))
                })

                it("update doc", done=>{
                    var book={name:`_book${uuid++}`}, i=0
                    spyOn(holder, "ajax").and.callFake(function(){
                        switch(i){
                        case 0:
                            arguments[SUCCESS]({createdAt:new Date(), _id:"hello"})
                            break
                        case 1:
                            arguments[SUCCESS]({updatedAt:new Date()})
                            break
                        }
                        i++
                    })

                    Book.upsert(book,(doc)=>{//create
                        expect(doc.name).toBe(book.name)
                        doc.name="test"
                        Book.upsert(doc,(doc)=>{//update
                            expect(doc.name).toBe("test")
                            expect(doc.updatedAt).toBeDefined()

                            Book.cols.localCol.findOne({_id:doc._id},(localdoc)=>{
                                expect(localdoc).toBeTruthy()
                                expect(localdoc.name).toBe(doc.name)
                                done()
                            },failx(done))
                        })

                    }, failx(done))
                })

                it("remove doc", done=>{
                    var book={name:`_book${uuid++}`}, i=0
                    spyOn(holder, "ajax").and.callFake(function(m,u,ps, data ){
                        switch(i){
                        case 0:
                            arguments[SUCCESS]({createdAt:new Date(), _id:"hello"})
                            break
                        case 1:
                            arguments[SUCCESS]()
                            break
                        }
                        i++
                    })

                    Book.upsert(book,(doc)=>{//create
                        expect(doc.name).toBe(book.name)

                        Book.remove(doc,()=>{//update


                            Book.cols.localCol.findOne({_id:doc._id},(localdoc)=>{
                                //expect(localdoc).toBeUndefined()
                                done()
                            },failx(done))
                        })

                    }, failx(done))
                })

                it("find docs", done=>{
                    var book={name:`_book${uuid++}`}, i=0
                    spyOn(holder, "ajax").and.callFake(function(){
                        if(i<2)
                            arguments[SUCCESS]({createdAt:new Date(), _id:"hello"})
                        else {
                            ;
                        }
                        i++
                    })

                    Book.upsert(book1,(doc)=>{
                        expect(doc.name).toBe(book1.name)
                        expect(doc.createdAt).toBeDefined()
                        expect(doc._id).toBeDefined()

                        var book2={name:`_book${uuid++}`}
                        Book.upsert(book2,(doc)=>{
                            expect(doc.name).toBe(book2.name)
                            expect(doc.createdAt).toBeDefined()
                            expect(doc._id).toBeDefined()

                            //check local db
                            Book.localCol.findOne({},(docs)=>{
                                expect(Array.isArray(docs)).toBe(true)
                                expect(docs.length).toBe(2)
                                done()
                            },failx(done))

                        }, failx(done))
                    })
                })

                it("find one doc", done=>{
                    done()
                })
            })

            describe("remote first",function(){
                it("insert doc()", done=>{
                    done()
                })

                it("update doc", done=>{
                    done()
                })

                it("remove doc", done=>{
                    done()
                })


                it("find docs", done=>{
                    done()
                })

                it("find one doc", done=>{
                    done()
                })
            })
        })

        describe("offline mode", function(){
            describe("local first",function(){
                it("insert doc", done=>{
                    done()
                })

                it("update doc", done=>{
                    done()
                })

                it("remove doc", done=>{
                    done()
                })

                it("find docs", done=>{
                    done()
                })

                it("find one doc", done=>{
                    done()
                })
            })

            describe("remote first",function(){
                it("insert doc()", done=>{
                    done()
                })

                it("update doc", done=>{
                    done()
                })

                it("remove doc", done=>{
                    done()
                })


                it("find docs", done=>{
                    done()
                })

                it("find one doc", done=>{
                    done()
                })
            })
        })
    })
    describe("user service", function(){
        describe("online mode", function(){
            it('init', done=>{

            })
            it("login",done=>{
                done()
            })

            it("signup", done=>{
                done()
            })

            it("verify session", done=>{
                done()
            })
        })

        describe("offline mode", function(){
            it('init', done=>{

            })
            it("login",done=>{
                done()
            })

            it("signup", done=>{
                done()
            })

            it("verify session", done=>{
                done()
            })
        })
    })

    describe("file service", function(){
        it("get token", done=>{
            done()
        })

        it("upload", done=>{
            done()
        })
    })
})
