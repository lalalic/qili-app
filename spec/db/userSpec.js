import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, uuid, root,clearCurrentUser} from './helper'
import {newPromise} from "../components/helper"
import {init, User} from "../../lib/db"

describe("user service", function(){

    describe('init',function(){
        describe("online", function(){
            let username="sessionUser"
            it("should request server by ajax with sessionToken cache",done=>{
                let appId=`testUser${uuid()}`
                initWithUser(appId,a=>1).catch(failx(done)).then(()=>{
                    expect(User.current).toBeDefined()
                    spyOn(User,'verify').and.callThrough()
                    spyOn(User,'ajax').and.returnValue(Promise.resolve(User.current))
                    init(root,appId)
                        .catch(failx(done))
                        .then(()=>{
                            expect(User.verify).toHaveBeenCalled()
                            expect(User.ajax).toHaveBeenCalledWith(
                                jasmine.objectContaining({method:'get',url:jasmine.stringMatching(new RegExp("/me"))}))
                            done()
                        })
                })
            })

            it("should not request server to verify user, and current user is null without sessionToken cache",done=>{
                spyOn(User,'ajax')
                init(root,`testUser${uuid()}`)
                    .catch(failx(done))
                    .then(()=>{
                        expect(User.ajax).not.toHaveBeenCalled()
                        done()
                    })
            })

            describe("key functions", function(){
                beforeEach(()=>clearCurrentUser())

                it("can signin", function(done){
                    let username=`name${uuid()}`
                        ,password=`pwd${uuid()}`
                        ,sessionToken=`token${uuid()}`
                        ,xhr
                        ,signined=newPromise()
                    spyOn(User,'ajax').and.returnValue(signined)
                    spyOn(User,'emit')
                    User.signin({username, password})
                    expect(User.ajax).toHaveBeenCalledWith({method:'get',url:jasmine.stringMatching(new RegExp(`${root}login`))})
                    expect(User.ajax).toHaveBeenCalledWith({method:'get',url:jasmine.stringMatching(new RegExp(username))})
                    expect(User.ajax).toHaveBeenCalledWith({method:'get',url:jasmine.stringMatching(new RegExp(password))})
                    signined.resolve({username,password,sessionToken})
                    setTimeout(a=>{
                        expect(User.current).toEqual(jasmine.objectContaining({username,sessionToken}))
                        expect(User.emit).toHaveBeenCalledWith('change',User.current)
                        done()
                    },200)
                })

                it("can signup", function(done){
                    let username=`name${uuid()}`
                        ,password=`pwd${uuid()}`
                        ,sessionToken=`token${uuid()}`
                        ,xhr
                        ,signedup=newPromise()
                    spyOn(User,'ajax').and.returnValue(signedup)
                    spyOn(User,'emit')
                    User.signup({username, password})
                    expect(User.ajax).toHaveBeenCalledWith({method:'post',url:`${root}users`,data:{username,password}})
                    signedup.resolve({username,password,sessionToken})
                    setTimeout(a=>{
                        expect(User.current).toEqual(jasmine.objectContaining({username,sessionToken}))
                        expect(User.emit).toHaveBeenCalledWith('change', User.current)
                        done()
                    },200)
                })

                it("can requestVerification", function(){
                    let phone=`${uuid()}`
                    spyOn(User,'ajax').and.returnValue(newPromise())
                    User.requestVerification(phone)
                    expect(User.ajax).toHaveBeenCalledWith(
                        jasmine.objectContaining({
                            method:'get',
                            url:jasmine.stringMatching(new RegExp(`requestVerification`))
                        }))
                })

                it("can verifyPhone", function(){
                    let phone=`${uuid()}`
                        ,code=`code${uuid()}`
                    spyOn(User,'ajax').and.returnValue(newPromise())
                    User.verifyPhone(phone)
                    expect(User.ajax).toHaveBeenCalledWith(
                        jasmine.objectContaining({
                            method:'get',
                            url:jasmine.stringMatching(new RegExp(`verifyPhone`))
                        }))
                })

                it("can request Password Reset", function(){
                    let phone=`${uuid()}`
                    spyOn(User,'ajax').and.returnValue(newPromise())
                    User.requestPasswordReset(phone)
                    expect(User.ajax).toHaveBeenCalledWith(
                        jasmine.objectContaining({
                            method:'get',
                            url:jasmine.stringMatching(new RegExp(`requestPasswordReset`))
                        }))
                })

                it("can reset password", function(){
                    // TODO:
                })
            })
        })

        xdescribe('offline', function(){
            it("offline, should not request server, and current user is null",()=>{
                fail("not supported")
            })

            it("offline: not call server, but User.current set",()=>{
                fail("not supported")
            })
        })
    })
})
