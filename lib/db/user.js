var {Service}=require('./service'),
	{EventEmitter}=require('events')

var server=null,
	current=null,
	event=new EventEmitter()


function setCurrent(user){
	if(user && user._id){
		localStorage.setItem('currentUser',JSON.stringify(user))
		localStorage.setItem('sessionToken', user.sessionToken)
	}else{
		localStorage.removeItem('currentUser')
		localStorage.removeItem('sessionToken')
	}
	return current=user
}

export default class User extends Service.BuiltIn{
	/**
	 *  @returns {Promise}
	 */
	static signup(user){
		return this.ajax({
            method:'post',
            url:this.server+this._name,
            data:user
			}).then(function(data){
	                setCurrent(Object.assign({},user,data))
					event.emit('change')
					return current
	    		})
	}
	/**
	 *  @returns {Promise}
	 */
	static signin(user){
		var {username,password}=user
		return this.ajax({
    			url:`${this.server}login?username=${username}&password=${password}`,
    			method:'get'
    		}).then(function(user){
                setCurrent(user)
				event.emit('change')
				return current
    	})
	}
	/**
	 *  @returns {Promise}
	 */
	static verify(){
		//return Promise.as(setCurrent({username:'root', _id:'root', sessionToken:'root'}))
		if(!localStorage.getItem('sessionToken'))
			return Promise.resolve()

		return this.ajax({
			url:this.server+'me',
			method:'get',
			_sessionToken:localStorage.getItem('sessionToken')
		}).then(function(user){
			return setCurrent(user)
		},function(e){
			User.logout()
			return e
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
		setCurrent()
		event.emit('change')
	}


	static init(){
		return this.verify()
	}

	static get _name(){
		return 'users'
	}

	static get current(){
		return current
	}

	static get event(){
		return event
	}
}
