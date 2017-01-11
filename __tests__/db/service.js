jest.mock("../../src/db/user")

const {init,User, Model}=require("../../src")//must import from src to extend JSON.parse for date


const service="http://localhost/1/"
jasmine.DEFAULT_TIMEOUT_INTERVAL=100

function http(url=""){
	let xhr={
		url,
		reply(value,header={"Content-Type":'application/json'},status=200){
			spyOn(XMLHttpRequest.prototype,"send").and.callFake(function(){
				if(this.method==xhr.method && this.url==(xhr.url+xhr.path))
					this.respond(status,header,typeof(value)=="object" ? JSON.stringify(value) : value)
				else
					console.dir(this)
			})
		}
	}

	"post,get,patch,put,delete".split(",")
		.forEach(a=>xhr[a]=(path="")=>{
			xhr.path=path
			xhr.method=a
			return xhr
		})

	return xhr
}

describe("model service", function(){
	class Book extends Model{
		static get _name(){return 'book'}
	}

	beforeAll(()=>{
		global.XMLHttpRequest=require('fakexmlhttprequest')
		User.on=jest.fn()
		User.current=null
		spyOn(User,'current').and.returnValue({username:"tester"})
		spyOn(User,'init').and.returnValue(Promise.resolve())
		spyOn(User,'isTutorialized').and.returnValue(Promise.resolve(true))
		spyOn(Book,'emit')
	})

	beforeEach(()=>init(service,"testApp",null,jest.fn(),{show:jest.fn(),close:jest.fn()}).then(()=>Book.init()))

	describe("create/update/patch/remove", function(){
		it("can create Book({name:'cat'})", function(){
			expect(User.init).toHaveBeenCalled()

			let created={_id:"uouou", createdAt: new Date(1)}
			http(service)
				.post('classes/book')
				.reply(created)

			return Book.upsert({name:'cat'})
				.then(book=>{
					expect(book.name).toBe("cat")
					expect(book._id).toBe(created._id)
					expect(book.createdAt.getTime()).toBe(created.createdAt.getTime())
					expect(Book.emit.calls.mostRecent().args[0]).toBe("upserted")
				})
		})

		it("can create Book.upsert({name:'cat'}, null, success)", function(){
			expect(User.init).toHaveBeenCalled()

			let created={_id:"uouou", createdAt: new Date(1)}
			http(service)
				.post('classes/book')
				.reply(created)

			let success=jest.fn()
			return Book.upsert({name:'cat'}, null, success)
				.then(book=>{
					expect(book.name).toBe("cat")
					expect(book._id).toBe(created._id)
					expect(book.createdAt.getTime()).toBe(created.createdAt.getTime())
					expect(success).toHaveBeenCalled()
					expect(Book.emit.calls.mostRecent().args[0]).toBe("upserted")
				})
		})

		it("can patch update Book.upsert({_id,name:'cat',title:'we love cat'}, {_id,title:'we love cat and dog'}, success)", function(){
			expect(User.init).toHaveBeenCalled()

			let changed={modifiedAt: new Date(1)}
			let _id="uouou"
			http(service)
				.patch(`classes/book/${_id}`)
				.reply(changed)

			let success=jest.fn()
			return Book.upsert({_id,name:'cat',title:'we love cat'}, {_id,title:'we love cat and dog'}, success)
				.then(book=>{
					expect(book.name).toBe("cat")
					expect(book._id).toBe(_id)
					expect(book.modifiedAt.getTime()).toBe(changed.modifiedAt.getTime())
					expect(book.title).toBe('we love cat')
					expect(success).toHaveBeenCalled()
					expect(Book.emit.calls.mostRecent().args[0]).toBe("upserted")
				})
		})

		it("can post update Book.upsert({_id,name:'cat',title:'we love cat'}, success)", function(){
			expect(User.init).toHaveBeenCalled()

			let changed={modifiedAt: new Date(1)}
			let _id="uouou"
			http(service)
				.post(`classes/book`)
				.reply(changed)

			let success=jest.fn()
			return Book.upsert({_id,name:'cat',title:'we love cat'}, success)
				.then(book=>{
					expect(book.name).toBe("cat")
					expect(book._id).toBe(_id)
					expect(book.modifiedAt.getTime()).toBe(changed.modifiedAt.getTime())
					expect(book.title).toBe('we love cat')
					expect(success).toHaveBeenCalled()
					expect(Book.emit.calls.mostRecent().args[0]).toBe("upserted")
				})
		})

		it("can remove _id",function(){
			expect(User.init).toHaveBeenCalled()

			let _id="uouou"
			http(service)
				.delete(`classes/book/${_id}`)
				.reply("true")

			let success=jest.fn()
			return Book.remove(_id, success)
				.then(()=>{
					expect(success).toHaveBeenCalled()
					expect(Book.emit.calls.mostRecent().args[0]).toBe("removed")
				})
		})

		it("can't remove {_id}, and throw error",function(){
			expect(User.init).toHaveBeenCalled()

			let _id="uouou"
			http(service)
				.delete(`classes/book/${_id}`)
				.reply("true")

			return Book.remove({_id})
				.then(()=>{
					throw new Error("can't remove with object")
				}, e=>{
					expect(e).toBeDefined()
				})
		})
	})

	describe("find()",function(){
		it("should return book array from remote server",function(){
			let results=[{_id:"1"},{_id:"2"}]
			http(service)
				.get(`classes/book`)
				.reply({results})

			return new Promise((resolve,reject)=>Book.find({},{interim:false}).fetch(docs=>{
				try{
					expect(Array.isArray(docs)).toBe(true)
					expect(docs).toMatchObject(results)
					resolve(docs)
				}catch(e){
					reject(e)
				}
			}, reject))
		})

		it("find from local first, then from remote, call success twice when docs are different",function(){
			var localDocs=[{_id:"1"}],
				remoteDocs=[{_id:"1"},{_id:"2"}],
				count=0;
			http(service)
				.get('classes/book')
				.reply({results:remoteDocs})

			spyOn(Book.cols.localCol,'find').and.returnValue({
				fetch(success,error){
					success(localDocs)
				}
			})

			return new Promise((resolve,reject)=>Book.find({},{cacheFind:false}).fetch(docs=>{//don't cache find to make spy correct
				try{
					count++
					if(count==1){
						//local
						expect(Book.cols.localCol.find).toHaveBeenCalled()
						expect(docs.length).toBe(localDocs.length)
					}else if(count==2){
						//remote
						expect(docs.length).toBe(remoteDocs.length)
						resolve()
					}
				}catch(e){
					reject(e)
				}
			},reject))
		})

		it("only calls success once when local results are same with remote results",function(){
			var localDocs=[{_id:"1"}],
				remoteDocs=[{_id:"1"}],
				count=0;

			http(service)
				.get('classes/book')
				.reply({results:remoteDocs})

			spyOn(Book.cols.localCol,'find').and.returnValue({
				fetch(success,error){
					success(localDocs)
				}
			})

			return new Promise((resolve,reject)=>Book.find({},{cacheFind:false}).fetch(docs=>{//don't cache find to make spy correct
				try{
					count++
					if(count==1){
						//local
						expect(XMLHttpRequest.prototype.send).not.toHaveBeenCalled()
						expect(Book.cols.localCol.find).toHaveBeenCalled()
						expect(docs.length).toBe(localDocs.length)
						setTimeout(()=>{
							expect(XMLHttpRequest.prototype.send).toHaveBeenCalled()
							count==2 ? reject() : resolve()
						},50)
					}else if(count==2){
						reject()
					}
				}catch(e){
					reject(e)
				}
			},reject))
		})

		it("only calls success once when local results are empty",()=>{
			var localDocs=[],
				remoteDocs=[{_id:"1"}],
				count=0;

			http(service)
				.get('classes/book')
				.reply({results:remoteDocs})

			spyOn(Book.cols.localCol,'find').and.returnValue({
				fetch(success,error){
					success(localDocs)
				}
			})

			return new Promise((resolve, reject)=>Book.find({},{cacheFind:false}).fetch(docs=>{//don't cache find to make spy correct
				try{
					count++
					if(count==1){
						//local
						expect(XMLHttpRequest.prototype.send).toHaveBeenCalled()
						expect(Book.cols.localCol.find).toHaveBeenCalled()
						expect(docs.length).toBe(remoteDocs.length)

						setTimeout(a=>{
							count==2 ? reject() : resolve()
						},50)
					}else if(count==2){
						reject()
					}
				}catch(e){
					reject(e)
				}

			},reject))
		})
	})

	describe("findOne", function(){
		it("should return one doc, or null remote server",function(){
			spyOn(Book.cols.remoteCol,'find').and.callThrough()
			http(service)
				.get(`classes/book?limit=1&query={"_id":"1"}`)
				.reply({results:[{_id:"1"}]})//minimongo call find to server, so return array from server


			return new Promise((resolve, reject)=>Book.findOne({_id:"1"},{interim:false,cacheFindOne:false},doc=>{
				try{
					expect(Book.cols.remoteCol.find).toHaveBeenCalled()
					expect(XMLHttpRequest.prototype.send).toHaveBeenCalled()
					expect(Array.isArray(doc)).toBe(false)
					resolve()
				}catch(e){
					reject(e)
				}
			},reject))
		})

		it("call success once with same doc from either server or local",function(){
			var localDoc={_id:"1"},
				remoteDoc={_id:"1"},
				count=0;

			spyOn(Book.cols.remoteCol,'find').and.callThrough()
			http(service)
				.get('classes/book?limit=1&query={"_id":"1"}')
				.reply({results:[remoteDoc]})

			//@HACK: what if minimongo doesn't use findOne on localCol
			spyOn(Book.cols.localCol,'findOne').and.callFake(function(a,b,success){
				success(localDoc)
			})

			return new Promise((resolve, reject)=>Book.findOne({_id:"1"},{cacheFindOne:false},doc=>{//don't cache find to make spy correct
				try{
					count++
					if(count==1){
						expect(XMLHttpRequest.prototype.send).not.toHaveBeenCalled()
						expect(doc).toBeTruthy()
						expect(doc._id).toBe("1")
						setTimeout(()=>{
							expect(Book.cols.localCol.findOne).toHaveBeenCalled()
							expect(Book.cols.remoteCol.find).toHaveBeenCalled()
							expect(XMLHttpRequest.prototype.send).toHaveBeenCalled()
							count==1 ? resolve() : reject()
						},50)
					}else if(count==2){
						reject()
					}
				}catch(e){
					reject(e)
				}
			},reject))
		})

		it("only calls success once when local doc are empty",function(){
			var localDoc=null,
				remoteDoc={_id:"1"},
				count=0;

			spyOn(Book.cols.remoteCol,'find').and.callThrough()
			http(service)
				.get('classes/book?limit=1&query={"_id":"1"}')
				.reply({results:[remoteDoc]})

			//@HACK: what if minimongo doesn't use findOne on localCol
			spyOn(Book.cols.localCol,'findOne').and.callFake(function(a,b,success){
				success(localDoc)
			})

			return new Promise((resolve,reject)=>Book.findOne({_id:"1"},{cacheFindOne:false},doc=>{//don't cache find to make spy correct
				try{
					count++
					if(count==1){
						expect(Book.cols.localCol.findOne).toHaveBeenCalled()
						expect(Book.cols.remoteCol.find).toHaveBeenCalled()
						expect(XMLHttpRequest.prototype.send).toHaveBeenCalled()
						expect(doc).toBeTruthy()
						expect(doc._id).toBe("1")
						setTimeout(()=>{
							count==1 ? resolve() : reject()
						},50)
					}else if(count==2){
						reject()
					}
				}catch(e){
					reject(e)
				}
			},reject))
		})
	})
})
