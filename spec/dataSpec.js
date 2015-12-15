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
        appId="test",
        SUCCESS=4;

    function failx(done){
        return (e)=>{
            fail(e.message||e)
            done()
        }
    }
    fit("init data service", done=>{
        expect(init).toBeTruthy()

        var user={username:'test',_id:'test',sessionToken:"adffsdfasdf"}

        spyOn(User,"init").and.callFake(function(){
            return User.signin(user)
        })

        spyOn(holder,'ajax').and.callFake(function(method, url, params, data, success){
            success(user)
            return Promise.as(user)
        })

        init(root,appId,()=>{
                expect(User.current).toBe(user)
            },
            (...o)=>holder._httpError(...o),
            holder._loadingHandler,
            (...o)=>holder.ajax(...o))
                .then(()=>{
                    expect(User.current).toBe(user)
                    done()
                },(e)=>{
                    fail(e.message)
                    done()
                })
    })


    describe("model service", function(){
        describe("online mode", function(){
            describe("local first",function(){
                fit("insert doc", done=>{
                    var book={name:`_book${uuid++}`}
                    spyOn(holder, "ajax").and.callFake(function(){
                        arguments[SUCCESS]({createdAt:new Date(), _id:"hello"})
                    })

                    Book.upsert(book,null,(doc)=>{
                        expect(doc.name).toBe(book.name)
                        expect(doc.createdAt).toBeDefined()
                        expect(doc._id).toBeDefined()

                        //check local db
                        Book.findOne({_id:doc._id},(localdoc)=>{
                            expect(localdoc).toBeTruthy()
                            expect(localdoc.name).toBe(doc.name)
                            done()
                        },failx(done))

                    }, failx(done))
                })

                fit("update doc", done=>{
                    var book={name:`_book${uuid++}`}
                    spyOn(holder, "ajax").and.callFake(function(){
                        arguments[SUCCESS]({createdAt:new Date(), _id:"hello"})
                    })

                    Book.upsert(book,null,(doc)=>{
                        doc.name="test"
                        spyOn(holder, "ajax").and.callFake(function(){
                            arguments[SUCCESS]({updatedAt:new Date()})
                        })
                        Book.upsert(doc, null,(doc)=>{
                            expect(doc.name).toBe("test")
                            expect(doc.updatedAt).toBeDefined()

                            Book.findOne({_id:doc._id},(localdoc)=>{
                                expect(localdoc).toBeTruthy()
                                expect(localdoc.name).toBe(doc.name)
                                done()
                            },failx(done))
                        })

                    }, failx(done))
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
