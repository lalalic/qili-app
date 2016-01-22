import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from '../components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root, clearCurrentUser} from "../db/helper"
import App from "../../lib/db/app"
import User from "../../lib/db/user"
import MyUI, {SMSRequest} from "../../lib/account"
import {TextField,RaisedButton,FlatButton} from "material-ui"

describe("account ui", function(){
    function changeTextFieldValue(inName,newName, expector){
        let input=TestUtils.findRenderedDOMComponentWithTag(inName, 'input')
        input.getDOMNode().value=newName
        TestUtils.Simulate.change(input)
        expector ? expector() : expect(inName.getValue()).toBe(newName)
    }

    function clickWithSpy(ui, spy){
        spy.calls.reset()
        let all=TestUtils.findAllInRenderedTree(ui,(a)=>TestUtils.isDOMComponent(a))
        all.forEach(a=>{
            if(spy.calls.count()==0)
                TestUtils.Simulate.click(a)
        })
    }

    it("should signin when current user without sessionToke",()=>{
        let props={}
            ,ui=render(MyUI, props)
        spyOn(MyUI.prototype, "_renderSignin").and.returnValue(null)
        ui.setState({user:{}})
        expect(MyUI.prototype._renderSignin).toHaveBeenCalled()
    })

    it("should signup when current user is undefined",()=>{
        let props={}
            ,ui=render(MyUI, props)
        spyOn(MyUI.prototype, "_renderBeforeSignup").and.returnValue(null)
        ui.setState({user:null})
        expect(MyUI.prototype._renderBeforeSignup).toHaveBeenCalled()
    })


    describe("signin", function(){
        beforeAll(function(){
            let props={}
                ,ui=this.ui=render(MyUI, props)
            ui.setState({user:{username:"test"}})

            expect(TestUtils.isCompositeComponentWithType(this.inName=ui.refs.username,TextField)).toBe(true)
            expect(TestUtils.isCompositeComponentWithType(this.inPassword=ui.refs.password,TextField)).toBe(true)
        })
        it("can create", function(){
            let {ui, inName, inPassword}=this
        })

        it("should allow username be input", function(){
            let {ui, inName, inPassword}=this
            changeTextFieldValue(inName,`name${uuid()}`)
            changeTextFieldValue(inName,`${uuid()}name`)
        })

        it("should allow password be input", function(){
            let {ui, inName, inPassword}=this
            changeTextFieldValue(inPassword,`pwd${uuid()}`)
            changeTextFieldValue(inPassword,`password${uuid()}`)
        })

        describe("commit", function(){
            beforeEach(function(){
                let {ui, inName, inPassword}=this
                spyOn(User,"signin").and.returnValue(this.signined=newPromise())
                let username=`name${uuid()}`
                    ,password=`password${uuid()}`
                let cmdSignin=TestUtils.findRenderedComponentWithType(ui,RaisedButton)
                changeTextFieldValue(inName,username)
                changeTextFieldValue(inPassword,password)
                clickWithSpy(cmdSignin,User.signin)
                expect(User.signin).toHaveBeenCalledWith({username,password})
            })

            it("should request to server when click signin", function(){
                let {signined}=this
                signined.resolve()
            })

            it("should show error with server failure",function(done){
                let {ui,signined}=this
                    ,signinError=`error${uuid()}`

                spyOn(ui,"setState")
                signined.reject(new Error(signinError))
                setTimeout(a=>{
                    expect(ui.setState).toHaveBeenCalledWith({signinError})
                    done()
                },200)
            })
        })


    })

    describe("signup", ()=>{
        beforeEach(function(){
            let props={}
                ,ui=this.ui=render(MyUI, props)
            ui.setState({user:null})
            expect(ui.refs.phone).toBeDefined()
        })
        it("can create", function(){
            let {ui}=this
        })

        describe("verification", function(){
            beforeEach(function(){
                let {phone: requestor}=this.ui.refs
                    ,{phone}=requestor.refs
                expect(this.inPhone=phone).toBeTruthy()
                expect(this.requestor=requestor).toBeTruthy()
            })

            it("should allow change phone", function(){
                let {inPhone}=this
                changeTextFieldValue(inPhone,"12346787234234")
                changeTextFieldValue(inPhone,"12346787234245")
            })

            it("should show send button when phone number is correct",function(){
                spyOn(SMSRequest, "isPhone").and.returnValue(true)
                let {requestor, inPhone}=this
                    ,num=`${uuid()}`
                changeTextFieldValue(inPhone,num)
                expect(requestor.state.phone).toBe(num)
                let btn=TestUtils.findRenderedComponentWithType(requestor,FlatButton)
                expect(btn.props.label).toBe("send")
            })

            it("should show send button when phone number is correct",function(){
                spyOn(SMSRequest, "isPhone").and.returnValue(false)
                let {requestor, inPhone}=this
                    ,num=`${uuid()}`
                changeTextFieldValue(inPhone,num, ()=>1)
                expect(requestor.state.phone).not.toBe(num)
                expect(TestUtils.scryRenderedComponentsWithType(requestor,FlatButton).length).toBe(0)
            })

            describe("commit", function(){
                beforeEach(function(){
                    jasmine.clock().install()
                    spyOn(SMSRequest, "isPhone").and.returnValue(true)
                    spyOn(User,"requestVerification")
                    let {requestor, inPhone}=this
                        ,num=`${uuid()}`
                    changeTextFieldValue(inPhone,num)
                    let btn=TestUtils.findRenderedComponentWithType(requestor,FlatButton)
                    expect(btn.props.label).toBe("send")
                    clickWithSpy(btn, User.requestVerification)
                    expect(User.requestVerification).toHaveBeenCalledWith(num)
                })

                afterEach(()=>{
                    jasmine.clock().uninstall()
                })
                it("should request mobile number to send verification code", function(){

                })

                it("should countdown 60s to allow next code request", function(){
                    let {requestor}=this
                        ,tick=requestor.state.tick
                    expect(tick).toBe(1)
                    jasmine.clock().tick(3000)
                    expect(requestor.state.tick).toBe(tick+3)
                    let btn=TestUtils.findRenderedComponentWithType(requestor,FlatButton)
                    expect(btn.props.disabled).toBe(true)
                    expect(btn.props.label).not.toBe("send")
                    jasmine.clock().tick(60*1000)
                    expect(requestor.state.tick).toBe(0)

                    btn=TestUtils.findRenderedComponentWithType(requestor,FlatButton)
                    expect(btn.props.label).toBe("resend")
                    expect(btn.props.disabled).toBeUndefined()
                })

            })

            describe("verifying code", function(){
                beforeEach(function(){
                    let {ui}=this
                        ,inCode=ui.refs.code
                        ,code=`${uuid()}`
                    changeTextFieldValue(inCode,code)

                    let {phone: requestor}=ui.refs
                        ,{phone: inPhone}=requestor.refs
                        ,phone=`${uuid()}`
                    spyOn(SMSRequest, "isPhone").and.returnValue(true)
                    changeTextFieldValue(inPhone,phone)

                    let btnVerify=TestUtils.findAllInRenderedTree(ui, (a)=>{
                            return TestUtils.isCompositeComponentWithType(a, RaisedButton)
                                && a.props.label=="verify"
                        })[0]
                    let verified=this.verified=newPromise()
                    spyOn(User,"verifyPhone").and.returnValue(verified)
                    clickWithSpy(btnVerify, User.verifyPhone)
                    expect(User.verifyPhone).toHaveBeenCalledWith(phone,code)
                })

                it("should show signup form after verification", function(done){
                    spyOn(this.ui, "_renderSignup").and.returnValue(null)
                    this.verified.resolve()
                    setTimeout(a=>{
                        expect(this.ui._renderSignup).toHaveBeenCalled()
                        done()
                    },200)
                })

                it("should show error with server verification failure", function(done){
                    let phoneVerifiedError=`error${uuid()}`
                    this.verified.reject(new Error(phoneVerifiedError))
                    setTimeout(a=>{
                        expect(this.ui.refs.code.props.errorText).toBe(phoneVerifiedError)
                        done()
                    },200)
                })
            })

        })

        describe("acount info", function(){
            beforeEach(function(){
                this.ui.setState({phoneVerified:true})
                expect(this.ui.refs.password2).toBeDefined()
            })
            it("should allow username input",function(){
                let inName=this.ui.refs.username
                changeTextFieldValue(inName,`name${uuid()}`)
            })

            it("should allow password, and password verification input", function(){
                let {inPassword, inPassword2}=this.ui.refs
                //@TODO
                //changeTextFieldValue(inPassword,`name${uuid()}`)
                //changeTextFieldValue(inPassword2,`name${uuid()}`)
            })

            describe("commit", function(){
                beforeEach(function(){
                    let btn=TestUtils.findRenderedComponentWithType(this.ui,RaisedButton)
                    expect(btn.props.label).toBe("sign up")

                    let {username:inName, password:inPassword, password2:inPassword2}=this.ui.refs
                        ,newName=`name${uuid()}`
                        ,pwd=`pwd${uuid()}`
                        ,pwd2=pwd
                    changeTextFieldValue(inName,newName)
                    inPassword.setValue(pwd)
                    inPassword2.setValue(pwd2)

                    this.signuped=newPromise()
                    spyOn(User, "signup").and.returnValue(this.signuped)
                    clickWithSpy(btn,User.signup)
                    expect(User.signup).toHaveBeenCalledWith({username:newName,password:pwd})
                })

                it("should request to server when click signup, and trigger User change",function(){
                    this.signuped.resolve()
                })

                it("should show error with server failure",function(done){
                    let error=`error${uuid()}`
                    this.signuped.reject(new Error(error))
                    setTimeout(a=>{
                        expect(this.ui.refs.username.props.errorText).toBe(error)
                        done()
                    },200)
                })
            })


        })
    })

    describe("forget password", function(){
        beforeEach(function(){
            let props={}
                ,ui=this.ui=render(MyUI, props)
            ui.setState({user:{},forgetPwd:true})
            expect(ui.refs.contact).toBeDefined()
        })

        it("can create", function(){

        })

        it("should allow input email",function(){
            changeTextFieldValue(this.ui.refs.contact,`${uuid()}`)
        })


        it("should request to server when click button", function(){
            let btn=TestUtils.findRenderedComponentWithType(this.ui,RaisedButton)
                ,contact=`${uuid()}`
            changeTextFieldValue(this.ui.refs.contact,contact)

            spyOn(User,"requestPasswordReset")
            clickWithSpy(btn, User.requestPasswordReset)
            expect(User.requestPasswordReset).toHaveBeenCalledWith(contact)
        })

        describe("commit", function(){
            //@TODO
            it("should show error with server failure",function(){

            })

            it("should show reset password", function(){

            })
        })


    })

    describe("reset password", function(){
        //@TODO
        it("needs old password, new, and confirmation",function(){

        })

        describe("commit", function(){
            it("should show error with server failure",function(){

            })

            it("should call to server User.resetPassword", function(){

            })
        })
    })
})
