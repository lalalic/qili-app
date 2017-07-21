var {Service}=require('./service')

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
	            data:{...user}
			}).then(user=>setCurrent(user))
	}
	/**
	 *  @returns {Promise}
	 */
	static signin(user){
		return this.ajax({
    			url:`${this.server}login`,
    			method:'post',
				data:{...user}
    		}).then(user=>setCurrent(user))
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
			}).then(
				user=>{
					return setCurrent(user)
				},
				e=>{
					//@Todo: should go on without network
					User.logout();
					return e
				})
		})
	}

	static requestPhoneCode(phone,existence){
		return this.ajax({
			url:`${this.server}requestPhoneCode`,
			method:'post',
			data:{phone,existence}
		}).then(({salt})=>salt)
	}

	/**
	 *  @returns {Promise}
	 */
	static requestPasswordReset(verifyPhone){
		return this.ajax({
				url:`${this.server}requestPasswordReset`,
				method:'post',
				data:{...verifyPhone}
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
		let all=[]
		if(__current){
			delete __current.sessionToken
			all.push(User.localStorage.setItem('lastUser',JSON.stringify(__current)))
		}
		
		all.push(User.localStorage.removeItem('currentUser'))
		all.push(User.localStorage.removeItem('sessionToken'))
		return Promise.all(all)
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
