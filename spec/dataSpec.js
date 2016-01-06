require('babel/polyfill')

import {init, Model, User} from "../lib/db"
var XMLHttpRequest=window.XMLHttpRequest=require('fakexmlhttprequest')

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

    function spyOnXHR(result,expected,headers={"Content-Type":'application/json'},status=200){
        spyOn(XMLHttpRequest.prototype,"send").and.callFake(function(data){
            console.info(`run spied xhr.send : ${this}`)
            expected && expected(this,data)
            this.respond(status,headers,JSON.stringify(result))
        })
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

        return init(root,appId).catch(failx(done)).then(()=>{
                    expect(User.current).toBeDefined()
                    expect(User.current.sessionToken).toBe(sessionToken)
                    console.info(`init data service successfully with user: ${JSON.stringify(User.current)}`)
                    done()
                })
    }


    describe("user service", function(){
        describe('init',function(){
            describe("online", function(){
                let username="sessionUser"
                it("should request server by ajax with sessionToken cache",done=>{
                    let appId=`testUser${uuid++}`
                    initWithUser(appId,a=>1).catch(failx(done)).then(()=>{
                        expect(User.current).toBeDefined()
                        spyOn(User,'ajax').and.returnValue(Promise.resolve(User.current))
                        init(root,appId)
                            .catch(failx(done))
                            .then(()=>{
                                expect(User.ajax).toHaveBeenCalled()
                                done()
                            })
                    })
                })

                it("should not request server, and current user is null without sessionToken cache",done=>{
                    spyOn(User,'ajax')
                    init(root,`testUser${uuid++}`)
                        .catch(failx(done))
                        .then(()=>{
                            expect(User.ajax.calls.any()).toEqual(false)
                            done()
                        })
                })
            })

            xdescribe('offline', function(){
                it("offline, should not request server, and current user is null",()=>{

                })

                it("offline: not call server, but User.current set",()=>{

                })
            })
        })
    })



    xdescribe("model service", function(){
        class Book extends Model{
            static get _name(){return 'book'}
        }

        let appId=`testModel${uuid++}`,
            SUCCESS=4,
            DATA=3;
        beforeAll(done=>initWithUser(appId,done))

        describe("online mode", function(){
            fit("can create document on server, then cache locally",done=>{
                spyOnXHR({createdAt:new Date(),_id:"a"},(xhr,data)=>{
                    data=JSON.parse(data)
                    expect(data._id).toBeUndefined()//server side _id
                    expect(xhr.method).toBe('post')
                });

                ([[{title:"a"}],
                    [{title:"a"},null],
                    [{title:"a"},a=>1],
                    [{title:"a"},null,a=>1]]).forEach((args)=>{
                    Book.upsert(...args).catch(failx(done)).then((doc)=>{
                        expect(doc).toBeDefined()
                        expect(doc.title).toBe('a')
                        expect(doc._id).toBeDefined()
                        expect(doc.createdAt).toBeDefined()
                        //input is updated
                        expect(args[0]).toBe(doc)
                        done()
                    })
                })
            })

            fit("can update document on server, then cache locally",done=>{
                var book={title:"a",createdAt:new Date(), _id:"adfd"}

                spyOnXHR({updatedAt:new Date()},(xhr,data)=>{
                    data=JSON.parse(data)
                    expect(data._id).toBe(book._id)
                    expect(xhr.method).toBe('put')
                });

                Book.upsert(book).catch(failx(done)).then((doc)=>{
                    expect(doc).toBeDefined()
                    expect(doc.title).toBe('a')
                    expect(doc._id).toBeDefined()
                    expect(doc.updatedAt).toBeDefined()
                    //input is updated
                    expect(book).toBe(doc)
                    done()
                })
            })

            fit("can remove document on server, then no local cache",done=>{
                spyOnXHR(true,(xhr,data)=>{
                    expect(data).toBeFalsy()
                    expect(xhr.method).toBe('delete')
                });

                ([["a"],
                    ["a",null,a=>1],
                    ["a",a=>1],
                    ["a",a=>1,a=>1]]).forEach((args)=>{
                    Book.remove(...args).catch(failx(done)).then(done)
                })
            })

            it("can query documents",done=>{

            })
        })

        xdescribe("offline mode", function(){
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
