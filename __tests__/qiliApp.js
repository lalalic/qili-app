import React from "react"
import QiliApp, * as qili from "qili"
import Tutorial from "components/tutorial"
import Empty from "components/empty"
import Authentication from "components/authentication"
import {mount} from "enzyme"
	
describe("qili application", function(){
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

        it("{tutorialized:true}", function(){
            let app=mount(<QiliApp {...props} tutorialized={true}/>)
            expect(app.find(Authentication).length).toBe(1)
        })
		
		it("{tutorialized:true,user:{name:'hello'}}", function(){
            let app=mount(<QiliApp {...props} {...{tutorialized:true,user:{name:'test'}}}/>)
            expect(app.find(Authentication).length).toBe(1)
        })

        it("{tutorialized:true,user:{token:'hello'}}", function(){
            let app=mount(<QiliApp {...props} {...{tutorialized:true,user:{token:'test'}}}/>)
            expect(app.find(qili.QiliApp).length).toBe(1)
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
