jest.mock("../../src/db/user")
jest.mock("../../src/db/service")

const {init,User}=require("../../src/db")

describe("data service", ()=>{
    describe("init", ()=>{
        beforeEach(()=>{
            User.init=jest.fn(a=>Promise.resolve())
        })
        fit("can't call success when no User.current",()=>{
            let mock=jest.fn()

            return init("http","testApp",mock)
                .then(a=>{
                    expect(mock).not.toHaveBeenCalled()
                })
        })

        it("must call success when User.current set",()=>{
            let mock=jest.fn()
            User.current={}
            return init("http","testApp",mock)
                .then(a=>{
                    expect(mock).toHaveBeenCalled()
                })
        })

    })

    describe("model",()=>{

    })
})
