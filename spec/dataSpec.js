import {init, Model, User} from "../lib/db"
var XMLHttpRequest=window.XMLHttpRequest=require('fakexmlhttprequest')

class Book extends Model{
    static get _name(){return 'book'}
}

describe("Data retrive service", function(){
    var uuid=Date.now(),
        root="http://localhost/1/";

    function failx(done){
        return (e)=>{
            console.error(e.message||e)
            fail(e.message||e)
            done()
        }
    }

    function initWithUser(appId,done=()=>1,username="test",password="test",_id="test",sessionToken="test"){
        (function hack(_init,_send,_done){
            User.init=function(){
                console.info(`init user service...`)
                return User.signin({username,password})
            }

            XMLHttpRequest.prototype.send=function(){
                this.respond(200,{"Content-Type":'application/json'},
                    JSON.stringify({username,sessionToken,_id}))
            }

            done=function(){
                User.init=_init
                XMLHttpRequest.prototype.send=_send
                _done()
            }
        })(User.init, XMLHttpRequest.prototype.send,done);

        init(root,appId)
            .then(()=>{
                    expect(User.current).toBeDefined()
                    expect(User.current.sessionToken).toBe(sessionToken)
                    console.info(`init data service successfully with user: ${JSON.stringify(User.current)}`)
                    done()
                },failx(done))
    }


    describe("user service", function(){
        describe('init',function(){
            describe("with cached session token", function(){
                let appId=`testUser${uuid++}`
                beforeAll((done)=>initWithUser(appId,done))

                it("online",done=>{
                    spyOn(User,'ajax').and.returnValue(Promise.resolve(User.current))
                    init(root,appId)
                        .catch(failx(done))
                        .then(()=>{
                            expect(User.ajax).toHaveBeenCalled()
                        })
                })

                it("offline",done=>{
                    spyOn(User,'ajax')
                    init(root,appId)
                        .catch(failx(done))
                        .then(()=>{
                            expect(User.ajax).toHaveBeenCalled()
                        })
                })
            })

            describe('without sessionToken', function(){
                it("online",done=>{
                    init()
                })

                it("offline",done=>{
                    init()
                })
            })
        })
        describe("online mode", function(){
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



    xdescribe("model service", function(){
        let appId="test"+uuid,
            SUCCESS=4,
            DATA=3;
        beforeAll(done=>initWithUser(appId,done))

        describe("online mode", function(){
            describe("local first",function(){
                it("insert doc", done=>{
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


    describe("file service", function(){
        it("get token", done=>{
            done()
        })

        it("upload", done=>{
            done()
        })
    })
})
