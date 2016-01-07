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
            console.info('spiedXHR.send called')
            expected && expected(this,data);
            this.respond(status,headers,JSON.stringify(result), 200)
        })
    }

    function ajaxHaveBeenCalled(n=1){
        expect(XMLHttpRequest.prototype.send.calls.count()).toBe(n)
    }
    function initWithUser(appId,done=()=>1,username="test",password="test",
        _id="test",sessionToken="test"){
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


    fdescribe("user service", function(){
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

    describe("model service", function(){
        class Book extends Model{
            static get _name(){return 'book'}
        }

        let appId=`testModel${uuid++}`
        beforeAll(done=>initWithUser(appId,done))

        describe("online mode service", function(){
            describe("update data", function(){
                it("can create document on server, then cache locally",done=>{
                    spyOnXHR({createdAt:new Date(),_id:"a"},(xhr,data)=>{
                        data=JSON.parse(data)
                        expect(data._id).toBeUndefined()//server side _id
                        expect(xhr.method).toBe('post')
                    });


                    ([[{title:"a"}],//no base
                        [{title:"a"},null],//null base
                        [{title:"a"},a=>1],//success
                        [{title:"a"},null,a=>1]]).forEach((args)=>{
                        Book.upsert(...args).catch(failx(done)).then((doc)=>{
                            //input is updated
                            expect(args[0]).toBe(doc)

                            //value updated
                            expect(doc).toBeDefined()
                            expect(doc.title).toBe('a')
                            expect(doc._id).toBeDefined()
                            expect(doc.createdAt).toBeDefined()

                            //@TODO: cache updated : issue with//spyOn(Book.cols.localCol,'cacheOne').and.callThrough()

                            //expect(Book.cols.localCol.cacheOne).toHaveBeenCalled()
                            //Book.cols.localCol.cacheOne.calls.reset()
                            done()
                        })
                    })
                })

                it("can update document on server, then cache locally",done=>{
                    var book={title:"a",createdAt:new Date(), _id:"adfd"}

                    spyOnXHR({updatedAt:new Date()},(xhr,data)=>{
                        data=JSON.parse(data)
                        expect(data._id).toBe(book._id)
                        expect(xhr.method).toBe('put')
                    });

                    Book.upsert(book).catch(failx(done)).then((doc)=>{
                        //input is updated
                        expect(book).toBe(doc)

                        //value updated
                        expect(doc).toBeDefined()
                        expect(doc.title).toBe('a')
                        expect(doc._id).toBeDefined()
                        expect(doc.updatedAt).toBeDefined()

                        //@TODO: cache updated
                        done()
                    })
                })

                it("can remove document on server, then no local cache",done=>{
                    spyOnXHR(true,(xhr,data)=>{
                        expect(data).toBeFalsy()
                        expect(xhr.method).toBe('delete')
                    });

                    ([["a"],
                        ["a",null,a=>1],
                        ["a",a=>1],
                        ["a",a=>1,a=>1]]).forEach((args)=>{
                        Book.remove(...args).catch(failx(done)).then(()=>{
                            //@TODO:cache cleaned

                            done()
                        })
                    })
                })
            })

            describe("query service",function(){
                describe("find", function(){
                    it("should return docs array from remote server",done=>{
                        spyOnXHR({results:[{},{}]})
                        Book.find({},{interim:false}).fetch(docs=>{
                            ajaxHaveBeenCalled()
                            expect(Array.isArray(docs)).toBe(true)
                            done()
                        },failx(done))
                    })

                    it("find from local first, then from remote, call success twice when docs are different",(done)=>{
                        var localDocs=[{_id:"1"}],
                            remoteDocs=[{_id:"1"},{_id:"2"}],
                            count=0;

                        spyOnXHR({results:remoteDocs})

                        spyOn(Book.cols.localCol,'find').and.returnValue({
                            fetch(success,error){
                                success(localDocs)
                            }
                        })

                        Book.find({},{cacheFind:false}).fetch(docs=>{//don't cache find to make spy correct
                            count++
                            if(count==1){
                                //local
                                expect(Book.cols.localCol.find).toHaveBeenCalled()
                                expect(docs.length).toBe(localDocs.length)
                                ajaxHaveBeenCalled(0)
                            }else if(count==2){
                                //remote
                                ajaxHaveBeenCalled()
                                expect(docs.length).toBe(remoteDocs.length)
                                done()
                            }
                        },failx(done))
                    })

                    it("only calls success once when local results are same with remote results",(done)=>{
                        var localDocs=[{_id:"1"}],
                            remoteDocs=[{_id:"1"}],
                            count=0;

                        spyOnXHR({results:remoteDocs})

                        spyOn(Book.cols.localCol,'find').and.returnValue({
                            fetch(success,error){
                                success(localDocs)
                            }
                        })

                        Book.find({},{cacheFind:false}).fetch(docs=>{//don't cache find to make spy correct
                            count++
                            if(count==1){
                                //local
                                expect(Book.cols.localCol.find).toHaveBeenCalled()
                                expect(docs.length).toBe(localDocs.length)
                                ajaxHaveBeenCalled(0)

                                setTimeout(()=>{
                                    //remote
                                    ajaxHaveBeenCalled()
                                    done()
                                },1000)
                            }else if(count==2){
                                fail()
                                done()
                            }
                        },failx(done))
                    })

                    it("only calls success once when local results are empty",(done)=>{
                        var localDocs=[],
                            remoteDocs=[{_id:"1"}],
                            count=0;

                        spyOnXHR({results:remoteDocs})

                        spyOn(Book.cols.localCol,'find').and.returnValue({
                            fetch(success,error){
                                success(localDocs)
                            }
                        })

                        Book.find({},{cacheFind:false}).fetch(docs=>{//don't cache find to make spy correct
                            count++
                            if(count==1){
                                //local
                                expect(Book.cols.localCol.find).toHaveBeenCalled()
                                expect(docs.length).toBe(remoteDocs.length)
                                ajaxHaveBeenCalled()

                                setTimeout(done,1000)
                            }else if(count==2){
                                fail()
                                done()
                            }
                        },failx(done))
                    })
                })

                describe("findOne", function(){
                    it("should return one doc, or null remote server",done=>{
                        spyOn(Book.cols.remoteCol,'find').and.callThrough()
                        spyOnXHR({results:[{_id:"1"}]})//minimongo call find to server, so return array from server


                        Book.findOne({_id:"1"},{interim:false,cacheFindOne:false},doc=>{
                            expect(Book.cols.remoteCol.find).toHaveBeenCalled()
                            ajaxHaveBeenCalled()
                            expect(Array.isArray(doc)).toBe(false)
                            done()
                        },failx(done))
                    })

                    it("call success once with same doc from either server or local",done=>{
                        var localDoc={_id:"1"},
                            remoteDoc={_id:"1"},
                            count=0;

                        spyOn(Book.cols.remoteCol,'find').and.callThrough()
                        spyOnXHR({results:[remoteDoc]})

                        //@HACK: what if minimongo doesn't use findOne on localCol
                        spyOn(Book.cols.localCol,'findOne').and.callFake(function(a,b,success){
                            success(localDoc)
                        })

                        Book.findOne({_id:"1"},{cacheFindOne:false},doc=>{//don't cache find to make spy correct
                            count++
                            if(count==1){
                                ajaxHaveBeenCalled(0)
                                expect(doc).toBeTruthy()
                                expect(doc._id).toBe("1")
                                setTimeout(()=>{
                                    expect(Book.cols.localCol.findOne).toHaveBeenCalled()
                                    expect(Book.cols.remoteCol.find).toHaveBeenCalled()
                                    ajaxHaveBeenCalled()
                                    done()
                                },1000)
                            }else if(count==2){
                                fail()
                                done()
                            }
                        },failx(done))
                    })

                    it("only calls success once when local doc are empty",(done)=>{
                        var localDoc=null,
                            remoteDoc={_id:"1"},
                            count=0;

                        spyOn(Book.cols.remoteCol,'find').and.callThrough()
                        spyOnXHR({results:[remoteDoc]})

                        //@HACK: what if minimongo doesn't use findOne on localCol
                        spyOn(Book.cols.localCol,'findOne').and.callFake(function(a,b,success){
                            success(localDoc)
                        })

                        Book.findOne({_id:"1"},{cacheFindOne:false},doc=>{//don't cache find to make spy correct
                            count++
                            if(count==1){
                                expect(Book.cols.localCol.findOne).toHaveBeenCalled()
                                expect(Book.cols.remoteCol.find).toHaveBeenCalled()
                                ajaxHaveBeenCalled()
                                expect(doc).toBeTruthy()
                                expect(doc._id).toBe("1")
                                setTimeout(done,1000)
                            }else if(count==2){
                                fail()
                                done()
                            }
                        },failx(done))
                    })
                })
            })
        })

        xdescribe("offline mode", function(){

        })
    })


    describe("file service", function(){

    })
})
