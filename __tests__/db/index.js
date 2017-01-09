jest.mock("../../src/db/service")
jest.mock("../../src/db/user")
const {init,User}=require("../../src/db")

describe("data service initialization", ()=>{
	beforeAll(()=>{
		User.on=jest.fn()
		User.current=null
		spyOn(User,'init').and.returnValue(Promise.resolve())
		spyOn(User,'isTutorialized').and.returnValue(Promise.resolve())
	})
	
	it("can't call success when no User.current",()=>{
		let mock=jest.fn()
		return init("http：//localhost/1/","testApp",mock)
			.then(a=>{
				expect(User.init).toHaveBeenCalled()
				expect(User.isTutorialized).toHaveBeenCalled()
				expect(mock).not.toHaveBeenCalled()
			})
	})

	it("must call success when User.current set",()=>{
		spyOn(User,'current').and.returnValue({})
		let mock=jest.fn()
		return init("http","testApp",mock)
			.then(a=>{
				expect(mock).toHaveBeenCalled()
			})
	})
})
