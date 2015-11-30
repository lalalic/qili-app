var {Service}=require('./service'),
	{EventEmitter}=require('events')

var server=null,
	__current=null,
	event=new EventEmitter();

export default class User extends Service.BuiltIn{
	/**
	 *  @returns {Promise}
	 */
	static signup(user){
		return this.ajax({
            method:'post',
            url:this.server+this._name,
            data:user
		}).then((data)=>setCurrent(Object.assign({},user,data)))
	}
	/**
	 *  @returns {Promise}
	 */
	static signin(user){
		var {username,password}=user
		return this.ajax({
    			url:`${this.server}login?username=${username}&password=${password}`,
    			method:'get'
    		}).then((user)=>setCurrent(user))
	}
	/**
	 *  @returns {Promise}
	 */
	static verify(){
		return this.localStorage.getItem('sessionToken').then((token)=>{
			if(!token)
				return null;
			return this.ajax({
				url:this.server+'me',
				method:'get',
				_sessionToken:token
			}).then((user)=>{return setCurrent(user)},(e)=>{User.logout();return e})
		})
	}

	static requestVerification(phone){
		return this.ajax({
			url:`${this.server}requestVerification?phone=${phone}`,
			method:'get'
		})
	}

	static verifyPhone(phone, code){
		return this.ajax({
			url:`${this.server}verifyPhone?phone=${phone}&code=${code}`,
			method:'get'
		})
	}

	/**
	 *  @returns {Promise}
	 */
	static requestPasswordReset(email){
		return this.ajax({
			url:`${this.server}requestPasswordReset?email=${email}`,
			method:'get'
		})
	}
	/**
	 *  @instance
	 */
    static logout(){
		return setCurrent()
	}


	static init(){
		if(this.isWorker()){//for worker
			this.setCurrent=(u)=>__current=u
			console.log("User.setCurrent set")
			return Promise.resolve()
		}else {
			return this.verify()
		}
	}

	static get _name(){
		return 'users'
	}

	static get current(){
		return __current
	}

	static get event(){
		return event
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
		event.emit('change')
		return __current
	})
}
