import React from "react"
import QiliApp, * as qili from "qili"
import Tutorial from "components/tutorial"
import Empty from "components/empty"
import Authentication from "components/authentication"
import SplashAD from "components/splash-ad"

import {mount} from "enzyme"
	
describe("qili application", function(){
	beforeAll(()=>{
		console.warn=jest.fn()
		console.error=jest.fn()
	})
	
	it("has render function", ()=>{
		expect(QiliApp.render).toBeDefined()
	})

    describe("component", function(){
        const props={
            appId: "test",
        }
		
		it("no appid", ()=>{
			let app=mount(<QiliApp/>)
			expect(app.find(Empty).length).toBe(1)
		})

        it("{tutorialized:false,tutorial:[...]}", function(){
			let app=mount(<QiliApp {...props} tutorialized={false} tutorial={["a.jpg"]}/>)
			expect(app.find(Tutorial).length).toBe(1)
        })
		
		describe("tutorialized, AD branch", ()=>{
			it("{tutorialized:true,adUrl}", function(){
				let app=mount(<QiliApp {...props} {...{tutorialized:true,adUrl:"http://"}}/>)
				expect(app.find(SplashAD).length).toBe(1)
				app=mount(<QiliApp {...props} {...{tutorialized:true, adUrl:"http://", user:{token:'test'}}}/>)
				expect(app.find(SplashAD).length).toBe(1)
				app=mount(<QiliApp {...props} {...{tutorialized:true,AD:true, adUrl:"http://"}}/>)
				expect(app.find(SplashAD).length).toBe(0)
			})
		})
		
		
		
		describe("inited",()=>{
			it("{tutorialized:true, inited:false}", function(){
				let app=mount(<QiliApp {...props} tutorialized={true} inited={false}/>)
				expect(app.find(Authentication).length).toBe(0)
			})
			
			it("{tutorialized:true, inited:undefined}", function(){
				let app=mount(<QiliApp {...props} tutorialized={true}/>)
				expect(app.find(Authentication).length).toBe(0)
			})
			
			it("{tutorialized:true, inited:true}", function(){
				let app=mount(<QiliApp {...props} tutorialized={true} inited={true}/>)
				expect(app.find(Authentication).length).toBe(1)
			})
			
			it("{tutorialized:true,user:{name:'hello'}, inited:true}", function(){
				let app=mount(<QiliApp {...props} {...{tutorialized:true,user:{name:'test'}}} inited={true}/>)
				expect(app.find(Authentication).length).toBe(1)
			})

			it("{tutorialized:true,user:{token:'hello'}, inited:true}", function(){
				let app=mount(<QiliApp {...props} {...{tutorialized:true,user:{token:'test'}}} inited={true}/>)
				expect(app.find(qili.QiliApp).length).toBe(1)
			})
		})
    })

    describe("actions",function(){
		const {REDUCER, ACTION}=qili
		const user={token:"xxx"}
        it("LOGOUT",()=>{
            expect(REDUCER({user},ACTION.LOGOUT).user.token).not.toBeDefined()
        })

        it("CURRENT_USER",()=>{
            expect(REDUCER({},ACTION.CURRENT_USER(user)).user.token).toBe(user.token)
        })

        it("TUTORIALIZED",()=>{
            expect(REDUCER({},ACTION.TUTORIALIZED).tutorialized).toBe(true)
        })
    })

})
