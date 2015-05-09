var {Service}=require('./service')
var Promise=require('apromise')

var server=null,
	current=null

function setCurrent(user){
	if(user && user._id){
		localStorage.setItem('currentUser',JSON.stringify(currentUser.toJSON()))
		localStorage.setItem('sessionToken', user.sessionToken)
	}else{
		localStorage.removeItem('currentUser')
		localStorage.removeItem('sessionToken')
	}
	return current=user
}

export default class User extends Service{
	/**
	 *  @returns {Promise}
	 */
	static signup(user){
		return Service.ajax({
            method:'post',
            url:server+'/users',
            data:user}).then(function(data){
                return setCurrent(assign({},user,data))
    		})
	}
	/**
	 *  @returns {Promise}
	 */
	static signin(user){
		return Service.ajax({
    			url:server+'/login',
    			method:'get',
    			data:user
    		}).then(function(user){
                return setCurrent(user)
    	})
	}
	/**
	 *  @returns {Promise}
	 */
	static verify(){
		if(!localStorage.getItem('sessionToken'))
			return Promise.as()

		return Service.ajax({
			url:server+'/me',
			method:'get'
		}).then(function(user){
			return setCurrent(user)
		},function(e){
			User.logout()
			return e
		})
	}
	/**
	 *  @returns {Promise}
	 */
	static requestPasswordReset(email){
		return Service.ajax({
			url:server+'/requestPasswordReset',
			method:'POST',
			data:{email:email}.toJSON()
		})
	}
	/**
	 *  @instance
	 */
    static logout(){
		setCurrent()
		location.reload()
	}

	static requestVerification(){
		
	}

	static init(){
		server=this.getServer()
		return this.verify()
	}
}

Object.defineProperties(User,{
	current:{
		get(){
			return current
		}
	}
})
