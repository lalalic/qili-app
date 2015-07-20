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

export default class User extends Service.BuiltIn{
	/**
	 *  @returns {Promise}
	 */
	static signup(user){
		return this.ajax({
            method:'post',
            url:this.server+this._name,
            data:user}).then(function(data){
                return setCurrent(assign({},user,data))
    		})
	}
	/**
	 *  @returns {Promise}
	 */
	static signin(user){
		return this.ajax({
    			url:this.server+'/login',
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

		return this.ajax({
			url:this.server+'/me',
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
		return this.ajax({
			url:this.server+'/requestPasswordReset',
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
		return this.verify()
	}

	static get _name(){
		return 'users'
	}

	static get current(){
		return current
	}
}
