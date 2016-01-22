import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, uuid, root} from './helper'
import {init, User} from "../../lib/db"

describe("user service", function(){
    describe('init',function(){
        describe("online", function(){
            let username="sessionUser"
            it("should request server by ajax with sessionToken cache",done=>{
                let appId=`testUser${uuid()}`
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

            it("should not request server to verify user, and current user is null without sessionToken cache",done=>{
                spyOn(User,'ajax')
                init(root,`testUser${uuid()}`)
                    .catch(failx(done))
                    .then(()=>{
                        expect(User.ajax.calls.any()).toEqual(false)
                        done()
                    })
            })

            describe("key functions", function(){
                //@TODO
                it("can signin", function(){

                })

                it("can signup", function(){

                })

                it("can requestVerification", function(){

                })

                it("can verifyPhone", function(){

                })

                it("can request Password Reset", function(){
                    
                })

                it("can reset password", function(){

                })

                it("should emit user change event when signin, signup", function(){

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
