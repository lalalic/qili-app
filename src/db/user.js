var {Service}=require('./service')
import {dispatcher} from ".."

var server=null,
	__current=null;

export default class User extends Service.BuiltIn{
	/**
	 *  @returns {Promise}
	 */
	static signup(user){
		return this.ajax({
            method:'post',
            url:`${this.server}signup`,
            data:user
		}).then((data)=>setCurrent(Object.assign({},user,data)))
	}
	/**
	 *  @returns {Promise}
	 */
	static signin(user){
		var {username,password}=user
		return this.ajax({
    			url:`${this.server}login`,
    			method:'post',
				data:{username,password}
    		}).then((user)=>setCurrent(user))
	}
	/**
	 *  @returns {Promise}
	 */
	static verify(){
		return this.localStorage.getItem('sessionToken').then(token=>{
			if(!token)
				return null;
			return this.ajax({
				url:this.server+'me',
				method:'get',
				_sessionToken:token
			}).then((user)=>{return setCurrent(user)},
				(e)=>{
					//@Todo: should go on without network
					User.logout();
					return e
				})
		})
	}

	static requestVerification(phone,checkUnique=false){
		return this.ajax({
			url:`${this.server}requestVerification`,
			method:'post',
			data:{phone,checkUnique}
		}).then(({salt})=>User.localStorage.setItem("__salt",salt))
	}

	static verifyPhone(phone, code){
		return User.localStorage.getItem("__salt")
			.then(salt=>this.ajax({
				url:`${this.server}verifyPhone`,
				method:'post',
				data:{phone,code,salt}
			})).then(done=>User.localStorage.removeItem("__salt"))
	}

	/**
	 *  @returns {Promise}
	 */
	static requestPasswordReset(email){
		return this.ajax({
			url:`${this.server}requestPasswordReset?email=${email}`,
			method:'post'
		})
	}

	static resetPassword(oldPassword,newPassword){
		return this.ajax({
			url:`${this.server}resetPassword`,
			method:'post',
			data:{oldPassword,newPassword}
		}).then(user=>setCurrent(user))
	}
	/**
	 *  @instance
	 */
    static logout(){
		delete __current.sessionToken
		return Promise.all([
			User.localStorage.setItem('lastUser',JSON.stringify(__current)),
			User.localStorage.removeItem('currentUser'),
			User.localStorage.removeItem('sessionToken')
		])
		.then(a=>document.location.reload())
	}


	static init(){
		this.super("init")()
		return this.verify()
	}

	static get _name(){
		return 'users'
	}

	static get current(){
		return __current
	}

	static get currentAsAuthor(){
		return {_id:__current._id, username:__current.username}
	}
	
	static isTutorialized(){
		return User.localStorage.getItem("__tutorialized")
			.then(a=>{
				if(!a){
					User.localStorage.setItem("__tutorialized","true")
					return false
				}
				return a
			})
	}
}

function setCurrent(user){
	return Promise.all((user && user._id) ?
		[User.localStorage.setItem('currentUser',JSON.stringify(user)),
		User.localStorage.setItem('sessionToken', user.sessionToken)] :
		[User.localStorage.removeItem('currentUser'),
		User.localStorage.removeItem('sessionToken')])
	.then(()=>{
		__current=user
		User.emit('change',__current)
		return __current
	})
}
