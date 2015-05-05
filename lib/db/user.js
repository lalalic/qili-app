var {Service}=require('./index');
class User extends Service{
    /**
	 *  @returns {Promise}
	 */
	static signup(user){
		return Service.ajax({
            method:'post',
            url:server+'/users',
            data:user}).then(function(data){
                currentUser=assign({},user,data)
    			localStorage.setItem('currentUser',JSON.stringify(currentUser.toJSON()))
    			return currentUser
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
                currentUser=user
    			localStorage.setItem('currentUser',JSON.stringify(currentUser.toJSON()))
    			return currentUser
    	})
	}
	/**
	 *  @returns {Promise}
	 */
	static verify(){
		if(!localStorage.getItem('sessionToken'))
			return

		return Service.ajax({
			url:server+'/me',
			method:'get'
		}).then(function(user){
			currentUser=user
			localStorage.setItem('currentUser',JSON.stringify(currentUser.toJSON()))
            return currentUser
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
		currentUser=null
		sessionToken=null
        localStorage.removeItem('currentUser')
		localStorage.removeItem('JSESSIONID')
		location.reload()
	}

	static init(){

	}
}

exports=User
