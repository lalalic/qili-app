'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.reducer = exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _user = require('./db/user');

var _user2 = _interopRequireDefault(_user);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTER = 13;

/*
export default class Account extends Component{
    constructor(props){
        super(props)
        this.state={user:this.props.user}
    }

    verifyPhone(){
        var phone=this.refs.phone.state.phone,
            code=this.refs.code.getValue();
        if(!phone.length || !code.length){
            Messager.show("phone must be specified")
            return
        }
        User.verifyPhone(phone, code)
            .then(()=>this.setState({phoneVerified:true}))
            .catch(e=>this.setState({phoneVerifiedError:e.message}))
    }
    signup(){
        var{username,password,password2}=this.refs
        username=username.getValue()
        password=password.getValue()
        password2=password2.getValue()
        if(!username.length || !password.length ||!password2.length){
            Messager.show("user name, password cannot be empty")
            return
        }

        if(password!=password2){
            Messager.show("password not verified")
            return
        }
        User.signup({username,password})
            .catch((e)=>this.setState({signupError:e.message}))
    }
    signin(){
        var{username,password}=this.refs
        username=username.getValue()
        password=password.getValue()
        if(!username.length || !password.length){
            Messager.show("user name, password cannot be empty")
            return
        }
        User.signin({username,password})
            .catch((e)=>{
                this.setState({signinError:e.message})
            })
    }
    forgetPassword(){
        let contact=this.refs.contact.getValue()
        if(!contact.length){
            Messager.show("You have to give phone number or email to get new password")
            return
        }
        User.requestPasswordReset(contact)
    }

    resetPassword(){

    }

    render(){
        var {user, phoneVerified, forgetPwd, resetPassword}=this.state
        if(!user){
            if(phoneVerified){
                return this._renderSignup()
            }else{
                return this._renderBeforeSignup()
            }
        }else {
            if(forgetPwd){
                return this._renderForgetPassword()
            }else if(resetPassword){
                //return this._renderResetPassword()
            }else{
                return this._renderSignin()
            }
        }
    }

    _renderBeforeSignup(){
        var {user, phoneVerified, forgetPwd}=this.state
        return (
            <div className="form" key="beforesignup">
                <SMSRequest ref="phone"/>
                <TextField ref="code" hintText="verification code you just received"
                    fullWidth={true}
                    onKeyDown={e=>{e.keyCode==ENTER && this.verifyPhone()}}
                    errorText={this.state.phoneVerifiedError}/>
                <center>
                    <RaisedButton label="verify" primary={true}
                        onClick={()=>this.verifyPhone()}/>
                </center>
                <div className="commands">
                    <FlatButton label="already have an account"
                        onClick={()=>this.setState({user:User.current||{}})}/>

                    <FlatButton label="forget password"
                        onClick={()=>this.setState({user:User.current||{},forgetPwd:true})}/>
                </div>
            </div>
        )
    }


    _renderSignin(){
        var {user, phoneVerified, forgetPwd}=this.state
        return (
            <div className="form" key="signin">
                <TextField ref="username"
                    hintText="login name or phone number"
                    onKeyDown={e=>{e.keyCode==ENTER && this.signin()}}
                    fullWidth={true}
                    errorText={this.state.signinError}/>
                <TextField ref="password"
                        onKeyDown={e=>{e.keyCode==ENTER && this.signin()}}
                        fullWidth={true}
                        type="password" hintText="password"/>
                <center>
                    <RaisedButton label="sign in" primary={true}
                        onClick={this.signin.bind(this)}/>
                </center>
                <div className="commands">
                    <FlatButton label="no account"
                            onClick={()=>this.setState({user:undefined})}/>

                    <FlatButton label="forget password"
                        onClick={()=>this.setState({user:User.current||{},forgetPwd:true})}/>

                </div>
            </div>
        )
    }

    _renderForgetPassword(){
        var {user, phoneVerified, forgetPwd}=this.state
        return (
            <div className="form" key="forgetPwd">
                <TextField ref="contact"
                    onKeyDown={e=>{e.keyCode==ENTER && this.forgetPassword()}}
                    fullWidth={true} hintText="phone number or email"/>

                <center>
                    <RaisedButton label="send me" primary={true}
                        onClick={this.forgetPassword.bind(this)}/>
                </center>
                <div className="commands">
                    <FlatButton label="sign in"
                        onClick={()=>this.setState({user:User.current||{}, forgetPwd:undefined})}/>

                    <FlatButton label="sign up"
                        onClick={()=>this.setState({user:undefined,forgetPwd:undefined})}/>
                </div>
            </div>
        )
    }

    _renderResetPassword(){
        return (
            <div className="form" key="reset">
                <TextField ref="oldPassword" hintText="old password"
                    fullWidth={true}
                    onKeyDown={e=>{e.keyCode==ENTER && this.resetPassword()}}
                    errorText={this.state.resetError}/>

                <TextField ref="password"
                    fullWidth={true}
                    onKeyDown={e=>{e.keyCode==ENTER && this.resetPassword()}}
                    type="password" hintText="password"/>

                <TextField ref="password2"
                    fullWidth={true}
                    onKeyDown={e=>{e.keyCode==ENTER && this.resetPassword()}}
                    type="password" hintText="password again"/>

                <center>
                    <RaisedButton label="reset password" primary={true}
                        onClick={this.resetPassword.bind(this)}/>
                </center>
                <div className="commands">
                    <FlatButton label="sign in"
                        onClick={()=>this.setState({user:User.current||{}, forgetPwd:undefined})}/>

                    <FlatButton label="forget password"
                        onClick={()=>this.setState({user:User.current||{},forgetPwd:true})}/>
                </div>
            </div>
        )
    }
}

*/

var ACTION = exports.ACTION = {
	SIGNUP: function SIGNUP(user) {
		return function (dispatch) {
			var username = user.username,
			    password = user.password,
			    password2 = user.password2;

			var usernameError = void 0,
			    passwordError = void 0,
			    password2Error = void 0;
			if (!username) usernameError = "user name is required";
			if (!password) passwordError = "password is required";

			if (password != password2) password2Error = "password doesn't match";

			if (usernameError || passwordError || password2Error) return dispatch({ type: "SIGNUP_UI", passwordError: passwordError, usernameError: usernameError, password2Error: password2Error });

			return _user2.default.signup({ username: username, password: password }).catch(function (e) {
				return dispatch({ type: "SIGNUP_UI", usernameError: e.message });
			});
		};
	},
	SIGNIN: function SIGNIN(user) {
		({ type: "SIGNIN", user: user });
	},
	PHONE_VERIFY_REQUEST: function PHONE_VERIFY_REQUEST(phone) {
		_user2.default.requestVerification(phone);
		return { type: "PHONE_VERIFY_REQUEST" };
	},
	PHONE_VERIFY: function PHONE_VERIFY(phone, code) {
		return function (dispatch) {
			return _user2.default.verifyPhone(phone, code).then(function (a) {
				return dispatch(ACTION.SIGNUP_UI);
			});
		};
	},

	SIGNUP_UI: { type: "SIGNUP_UI" },
	SIGNIN_UI: { type: "SIGNIN_UI" },
	FORGET_PASSWORD_UI: { type: "FORGET_PASSWORD_UI" },
	RESET_PASSWORD_UI: { type: "RESET_PASSWORD_UI" },
	PHONE_VERIFY_UI: { type: "PHONE_VERIFY_UI" }
};

var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case 'SIGNUP':
			return {};
		case 'SIGNIN':
			return { user: user };

		case 'SIGNUP_UI':
		case 'SIGNIN_UI':
		case 'FORGET_PASSWORD_UI':
		case 'RESET_PASSWORD_UI':
		case 'PHONE_VERIFY_UI':
			return action;
		default:
			return state;
	}
};

var Account = (0, _reactRedux.connect)(function (state) {
	return state.account;
})(function (_ref) {
	var user = _ref.user,
	    type = _ref.type,
	    dispatch = _ref.dispatch;

	if (!type) {
		if (user) type = 'SIGNIN_UI';else type = 'PHONE_VERIFY_UI';
	}

	switch (type) {
		case 'SIGNUP_UI':
			return _react2.default.createElement(Signup, null);
		case 'SIGNIN_UI':
			return _react2.default.createElement(Signin, { user: user });
		case 'PHONE_VERIFY_UI':
			return _react2.default.createElement(PhoneVerification, null);
		case 'FORGET_PASSWORD_UI':
			return _react2.default.createElement(ForgetPassword, null);
		case 'RESET_PASSWORD_UI':
			return _react2.default.createElement(ResetPassword, null);
	}
});

var PhoneVerification = (0, _reactRedux.connect)(function (state) {
	return state.account;
})(function (_ref2) {
	var phoneVerifiedError = _ref2.phoneVerifiedError,
	    dispatch = _ref2.dispatch;

	var code = void 0,
	    phone = void 0;
	return _react2.default.createElement(
		'div',
		{ className: 'form', key: 'phoneverify' },
		_react2.default.createElement(SMSRequest, { ref: function ref(a) {
				return phone = a;
			}, dispatch: dispatch }),
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return code = a;
			}, hintText: 'verification code you just received',
			fullWidth: true,
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.PHONE_VERIFY(phone.getValue(), code.getValue()));
			},
			errorText: phoneVerifiedError }),
		_react2.default.createElement(
			'center',
			null,
			_react2.default.createElement(_materialUi.RaisedButton, { label: 'verify', primary: true,
				onClick: function onClick(e) {
					return dispatch(ACTION.PHONE_VERIFY(phone.getValue(), code.getValue()));
				} })
		),
		_react2.default.createElement(
			'div',
			{ className: 'commands' },
			_react2.default.createElement(_materialUi.FlatButton, { label: 'already have an account',
				onClick: function onClick(e) {
					return dispatch(ACTION.SIGNIN_UI);
				} }),
			_react2.default.createElement(_materialUi.FlatButton, { label: 'forget password',
				onClick: function onClick(e) {
					return dispatch(ACTION.FORGET_PASSWORD_UI);
				} })
		)
	);
});

var Signup = (0, _reactRedux.connect)(function (state) {
	return state.account;
})(function (_ref3) {
	var usernameError = _ref3.usernameError,
	    passwordError = _ref3.passwordError,
	    password2Error = _ref3.password2Error,
	    dispatch = _ref3.dispatch;

	var username = void 0,
	    password = void 0,
	    password2 = void 0;
	var values = function values(a) {
		return {
			username: username.getValue(),
			password: password.getValue(),
			password2: password2.getValue()
		};
	};
	return _react2.default.createElement(
		'div',
		{ className: 'form', key: 'signup' },
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return username = a;
			}, hintText: 'login name',
			fullWidth: true,
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.SIGNUP(values()));
			},
			errorText: usernameError }),
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return password = a;
			},
			fullWidth: true,
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.SIGNUP(values()));
			},
			type: 'password', hintText: 'password', errorText: passwordError }),
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return password2 = a;
			},
			fullWidth: true,
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.SIGNUP(values()));
			},
			type: 'password', hintText: 'password again', errorText: password2Error }),
		_react2.default.createElement(
			'center',
			null,
			_react2.default.createElement(_materialUi.RaisedButton, { label: 'sign up', primary: true,
				onClick: function onClick(e) {
					return dispatch(ACTION.SIGNUP(values()));
				} })
		),
		_react2.default.createElement(
			'div',
			{ className: 'commands' },
			_react2.default.createElement(_materialUi.FlatButton, { label: 'already have an account',
				onClick: function onClick(e) {
					return dispatch(ACTION.SIGNIN_UI);
				} }),
			_react2.default.createElement(_materialUi.FlatButton, { label: 'forget password',
				onClick: function onClick(e) {
					return dispatch(ACTION.FORGET_PASSWORD_UI);
				} })
		)
	);
});

var Signin = (0, _reactRedux.connect)(function (state) {
	return state.account;
})(function (_ref4) {
	var user = _ref4.user,
	    signinError = _ref4.signinError,
	    phoneVerified = _ref4.phoneVerified,
	    forgetPwd = _ref4.forgetPwd,
	    dispatch = _ref4.dispatch;

	var username = void 0,
	    password = void 0;
	var values = function values(a) {
		return {
			username: username.getValue(),
			password: password.getValue()
		};
	};
	return _react2.default.createElement(
		'div',
		{ className: 'form', key: 'signin' },
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return username = a;
			},
			hintText: 'login name or phone number',
			defaultValue: user && user.username,
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.SIGNIN(values()));
			},
			fullWidth: true,
			errorText: signinError }),
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return password = a;
			},
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.SIGNIN(values()));
			},
			fullWidth: true,
			type: 'password', hintText: 'password' }),
		_react2.default.createElement(
			'center',
			null,
			_react2.default.createElement(_materialUi.RaisedButton, { label: 'sign in', primary: true,
				onClick: function onClick(e) {
					return dispatch(ACTION.SIGNIN(values()));
				} })
		),
		_react2.default.createElement(
			'div',
			{ className: 'commands' },
			_react2.default.createElement(_materialUi.FlatButton, { label: 'no account',
				onClick: function onClick(e) {
					return dispatch(ACTION.PHONE_VERIFY_UI);
				} }),
			_react2.default.createElement(_materialUi.FlatButton, { label: 'forget password',
				onClick: function onClick(e) {
					return dispatch(ACTION.FORGET_PASSWORD_UI);
				} })
		)
	);
});

var ForgetPassword = (0, _reactRedux.connect)(function (state) {
	return state.account;
})(function (_ref5) {
	var dispatch = _ref5.dispatch;

	var contact = void 0;
	return _react2.default.createElement(
		'div',
		{ className: 'form', key: 'forgetPwd' },
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return contact = a;
			},
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.FORGET_PASSWORD(contact.getValue()));
			},
			fullWidth: true, hintText: 'phone number or email' }),
		_react2.default.createElement(
			'center',
			null,
			_react2.default.createElement(_materialUi.RaisedButton, { label: 'send me', primary: true,
				onClick: function onClick(e) {
					return dispatch(ACTION.FORGET_PASSWORD(contact.getValue()));
				} })
		),
		_react2.default.createElement(
			'div',
			{ className: 'commands' },
			_react2.default.createElement(_materialUi.FlatButton, { label: 'sign in',
				onClick: function onClick(e) {
					return dispatch(ACTION.SIGNIN_UI);
				} }),
			_react2.default.createElement(_materialUi.FlatButton, { label: 'sign up',
				onClick: function onClick(e) {
					return dispatch(ACTION.PHONE_VERIFY_UI);
				} })
		)
	);
});

var ResetPassword = (0, _reactRedux.connect)(function (state) {
	return state.account;
})(function (_ref6) {
	var resetError = _ref6.resetError,
	    dispatch = _ref6.dispatch;

	var oldPassword = void 0,
	    password = void 0,
	    password2 = void 0;
	var values = function values(a) {
		return {
			oldPassword: oldPassword.getValue(),
			password: password.getValue(),
			password2: password2.getValue()
		};
	};
	return _react2.default.createElement(
		'div',
		{ className: 'form', key: 'reset' },
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return oldPassword = a;
			}, hintText: 'old password',
			fullWidth: true,
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.RESET_PASSWORD(values()));
			},
			errorText: resetError }),
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return password = a;
			},
			fullWidth: true,
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.RESET_PASSWORD(values()));
			},
			type: 'password', hintText: 'password' }),
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return password2 = a;
			},
			fullWidth: true,
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.RESET_PASSWORD(values()));
			},
			type: 'password', hintText: 'password again' }),
		_react2.default.createElement(
			'center',
			null,
			_react2.default.createElement(_materialUi.RaisedButton, { label: 'reset password', primary: true,
				onClick: function onClick(e) {
					return dispatch(ACTION.RESET_PASSWORD(values()));
				} })
		),
		_react2.default.createElement(
			'div',
			{ className: 'commands' },
			_react2.default.createElement(_materialUi.FlatButton, { label: 'sign in',
				onClick: function onClick(e) {
					return dispatch(ACTION.SIGNIN_UI);
				} }),
			_react2.default.createElement(_materialUi.FlatButton, { label: 'forget password',
				onClick: function onClick(e) {
					return dispatch(ACTION.FORGET_PASSWORD_UI);
				} })
		)
	);
});

var SMSRequest = function (_Component) {
	_inherits(SMSRequest, _Component);

	function SMSRequest() {
		var _ref7;

		var _temp, _this, _ret;

		_classCallCheck(this, SMSRequest);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref7 = SMSRequest.__proto__ || Object.getPrototypeOf(SMSRequest)).call.apply(_ref7, [this].concat(args))), _this), _this.state = { phone: null, tick: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(SMSRequest, [{
		key: 'tick',
		value: function tick() {
			var _this2 = this;

			var i = 60,
			    doTick = void 0;
			this._t = setInterval(doTick = function doTick() {
				if (i == 0) {
					clearInterval(_this2._t);
					_this2.setState({ tick: 0 });
				} else _this2.setState({ tick: i-- });
			}, 1000);

			doTick();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this._t) clearInterval(this._t);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _state = this.state,
			    phone = _state.phone,
			    tick = _state.tick;
			var dispatch = this.props.dispatch;

			var button = void 0,
			    refPhone = void 0;
			if (phone) {
				if (tick) button = _react2.default.createElement(_materialUi.FlatButton, { label: tick, disabled: true });else button = _react2.default.createElement(_materialUi.FlatButton, { label: tick === 0 ? "resend" : "send",
					onClick: function onClick(e) {
						_this3.tick();
						dispatch(ACTION.PHONE_VERIFY_REQUEST(refPhone.getValue()));
					} });
			}

			return _react2.default.createElement(
				'div',
				{ className: 'smsrequest' },
				_react2.default.createElement(_materialUi.TextField, {
					ref: function ref(a) {
						return refPhone = a;
					},
					hintText: 'phone number (default +86)',
					disabled: !!tick,
					onChange: function onChange(_ref8) {
						var value = _ref8.target.value;
						return _this3.setState({ phone: _this3.isPhone(value) ? value : null });
					} }),
				button
			);
		}
	}, {
		key: 'isPhone',
		value: function isPhone(v) {
			return (/^(\+\d{2})?\d{11}$/g.test(v)
			);
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			return this.state.phone;
		}
	}]);

	return SMSRequest;
}(_react.Component);

exports.default = Account;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ1c2VybmFtZUVycm9yIiwicGFzc3dvcmRFcnJvciIsInBhc3N3b3JkMkVycm9yIiwiZGlzcGF0Y2giLCJ0eXBlIiwic2lnbnVwIiwiY2F0Y2giLCJlIiwibWVzc2FnZSIsIlNJR05JTiIsIlBIT05FX1ZFUklGWV9SRVFVRVNUIiwicmVxdWVzdFZlcmlmaWNhdGlvbiIsInBob25lIiwiUEhPTkVfVkVSSUZZIiwiY29kZSIsInZlcmlmeVBob25lIiwidGhlbiIsIlNJR05VUF9VSSIsIlNJR05JTl9VSSIsIkZPUkdFVF9QQVNTV09SRF9VSSIsIlJFU0VUX1BBU1NXT1JEX1VJIiwiUEhPTkVfVkVSSUZZX1VJIiwicmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwiQWNjb3VudCIsImFjY291bnQiLCJQaG9uZVZlcmlmaWNhdGlvbiIsInBob25lVmVyaWZpZWRFcnJvciIsImEiLCJrZXlDb2RlIiwiZ2V0VmFsdWUiLCJTaWdudXAiLCJ2YWx1ZXMiLCJTaWduaW4iLCJzaWduaW5FcnJvciIsInBob25lVmVyaWZpZWQiLCJmb3JnZXRQd2QiLCJGb3JnZXRQYXNzd29yZCIsImNvbnRhY3QiLCJGT1JHRVRfUEFTU1dPUkQiLCJSZXNldFBhc3N3b3JkIiwicmVzZXRFcnJvciIsIm9sZFBhc3N3b3JkIiwiUkVTRVRfUEFTU1dPUkQiLCJTTVNSZXF1ZXN0IiwidGljayIsImkiLCJkb1RpY2siLCJfdCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInNldFN0YXRlIiwicHJvcHMiLCJidXR0b24iLCJyZWZQaG9uZSIsInZhbHVlIiwidGFyZ2V0IiwiaXNQaG9uZSIsInYiLCJ0ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFF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LGVBQVU7QUFBQSxVQUFVVSxLQUFWLFNBQUVDLE1BQUYsQ0FBVUQsS0FBVjtBQUFBLGFBQW9CLE9BQUtKLFFBQUwsQ0FBYyxFQUFDeEMsT0FBTyxPQUFLOEMsT0FBTCxDQUFhRixLQUFiLElBQXFCQSxLQUFyQixHQUE2QixJQUFyQyxFQUFkLENBQXBCO0FBQUEsTUFKZCxHQURKO0FBTUtGO0FBTkwsSUFESjtBQVVIOzs7MEJBRUlLLEMsRUFBRTtBQUNILFVBQVEsc0JBQUQsQ0FBd0JDLElBQXhCLENBQTZCRCxDQUE3QjtBQUFQO0FBQ0g7Ozs2QkFFTTtBQUNULFVBQU8sS0FBS3BDLEtBQUwsQ0FBV1gsS0FBbEI7QUFDQTs7Ozs7O2tCQUVhYSxPIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtUZXh0RmllbGQsRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBVc2VyIGZyb20gJy4vZGIvdXNlcidcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuY29uc3QgRU5URVI9MTNcblxuLypcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY291bnQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17dXNlcjp0aGlzLnByb3BzLnVzZXJ9XG4gICAgfVxuXG4gICAgdmVyaWZ5UGhvbmUoKXtcbiAgICAgICAgdmFyIHBob25lPXRoaXMucmVmcy5waG9uZS5zdGF0ZS5waG9uZSxcbiAgICAgICAgICAgIGNvZGU9dGhpcy5yZWZzLmNvZGUuZ2V0VmFsdWUoKTtcbiAgICAgICAgaWYoIXBob25lLmxlbmd0aCB8fCAhY29kZS5sZW5ndGgpe1xuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcInBob25lIG11c3QgYmUgc3BlY2lmaWVkXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBVc2VyLnZlcmlmeVBob25lKHBob25lLCBjb2RlKVxuICAgICAgICAgICAgLnRoZW4oKCk9PnRoaXMuc2V0U3RhdGUoe3Bob25lVmVyaWZpZWQ6dHJ1ZX0pKVxuICAgICAgICAgICAgLmNhdGNoKGU9PnRoaXMuc2V0U3RhdGUoe3Bob25lVmVyaWZpZWRFcnJvcjplLm1lc3NhZ2V9KSlcbiAgICB9XG4gICAgc2lnbnVwKCl7XG4gICAgICAgIHZhcnt1c2VybmFtZSxwYXNzd29yZCxwYXNzd29yZDJ9PXRoaXMucmVmc1xuICAgICAgICB1c2VybmFtZT11c2VybmFtZS5nZXRWYWx1ZSgpXG4gICAgICAgIHBhc3N3b3JkPXBhc3N3b3JkLmdldFZhbHVlKClcbiAgICAgICAgcGFzc3dvcmQyPXBhc3N3b3JkMi5nZXRWYWx1ZSgpXG4gICAgICAgIGlmKCF1c2VybmFtZS5sZW5ndGggfHwgIXBhc3N3b3JkLmxlbmd0aCB8fCFwYXNzd29yZDIubGVuZ3RoKXtcbiAgICAgICAgICAgIE1lc3NhZ2VyLnNob3coXCJ1c2VyIG5hbWUsIHBhc3N3b3JkIGNhbm5vdCBiZSBlbXB0eVwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZihwYXNzd29yZCE9cGFzc3dvcmQyKXtcbiAgICAgICAgICAgIE1lc3NhZ2VyLnNob3coXCJwYXNzd29yZCBub3QgdmVyaWZpZWRcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFVzZXIuc2lnbnVwKHt1c2VybmFtZSxwYXNzd29yZH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpPT50aGlzLnNldFN0YXRlKHtzaWdudXBFcnJvcjplLm1lc3NhZ2V9KSlcbiAgICB9XG4gICAgc2lnbmluKCl7XG4gICAgICAgIHZhcnt1c2VybmFtZSxwYXNzd29yZH09dGhpcy5yZWZzXG4gICAgICAgIHVzZXJuYW1lPXVzZXJuYW1lLmdldFZhbHVlKClcbiAgICAgICAgcGFzc3dvcmQ9cGFzc3dvcmQuZ2V0VmFsdWUoKVxuICAgICAgICBpZighdXNlcm5hbWUubGVuZ3RoIHx8ICFwYXNzd29yZC5sZW5ndGgpe1xuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcInVzZXIgbmFtZSwgcGFzc3dvcmQgY2Fubm90IGJlIGVtcHR5XCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBVc2VyLnNpZ25pbih7dXNlcm5hbWUscGFzc3dvcmR9KVxuICAgICAgICAgICAgLmNhdGNoKChlKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NpZ25pbkVycm9yOmUubWVzc2FnZX0pXG4gICAgICAgICAgICB9KVxuICAgIH1cbiAgICBmb3JnZXRQYXNzd29yZCgpe1xuICAgICAgICBsZXQgY29udGFjdD10aGlzLnJlZnMuY29udGFjdC5nZXRWYWx1ZSgpXG4gICAgICAgIGlmKCFjb250YWN0Lmxlbmd0aCl7XG4gICAgICAgICAgICBNZXNzYWdlci5zaG93KFwiWW91IGhhdmUgdG8gZ2l2ZSBwaG9uZSBudW1iZXIgb3IgZW1haWwgdG8gZ2V0IG5ldyBwYXNzd29yZFwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgVXNlci5yZXF1ZXN0UGFzc3dvcmRSZXNldChjb250YWN0KVxuICAgIH1cblxuICAgIHJlc2V0UGFzc3dvcmQoKXtcblxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3VzZXIsIHBob25lVmVyaWZpZWQsIGZvcmdldFB3ZCwgcmVzZXRQYXNzd29yZH09dGhpcy5zdGF0ZVxuICAgICAgICBpZighdXNlcil7XG4gICAgICAgICAgICBpZihwaG9uZVZlcmlmaWVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2lnbnVwKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJCZWZvcmVTaWdudXAoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBpZihmb3JnZXRQd2Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGb3JnZXRQYXNzd29yZCgpXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXNldFBhc3N3b3JkKXtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLl9yZW5kZXJSZXNldFBhc3N3b3JkKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTaWduaW4oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3JlbmRlckJlZm9yZVNpZ251cCgpe1xuICAgICAgICB2YXIge3VzZXIsIHBob25lVmVyaWZpZWQsIGZvcmdldFB3ZH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwiYmVmb3Jlc2lnbnVwXCI+XG4gICAgICAgICAgICAgICAgPFNNU1JlcXVlc3QgcmVmPVwicGhvbmVcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJjb2RlXCIgaGludFRleHQ9XCJ2ZXJpZmljYXRpb24gY29kZSB5b3UganVzdCByZWNlaXZlZFwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnZlcmlmeVBob25lKCl9fVxuICAgICAgICAgICAgICAgICAgICBlcnJvclRleHQ9e3RoaXMuc3RhdGUucGhvbmVWZXJpZmllZEVycm9yfS8+XG4gICAgICAgICAgICAgICAgPGNlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBsYWJlbD1cInZlcmlmeVwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy52ZXJpZnlQaG9uZSgpfS8+XG4gICAgICAgICAgICAgICAgPC9jZW50ZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e319KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sZm9yZ2V0UHdkOnRydWV9KX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblxuICAgIF9yZW5kZXJTaWduaW4oKXtcbiAgICAgICAgdmFyIHt1c2VyLCBwaG9uZVZlcmlmaWVkLCBmb3JnZXRQd2R9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ25pblwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwidXNlcm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBoaW50VGV4dD1cImxvZ2luIG5hbWUgb3IgcGhvbmUgbnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnNpZ25pbigpfX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBlcnJvclRleHQ9e3RoaXMuc3RhdGUuc2lnbmluRXJyb3J9Lz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgdGhpcy5zaWduaW4oKX19XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIGluXCIgcHJpbWFyeT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2lnbmluLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgICAgICA8L2NlbnRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwibm8gYWNjb3VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3VzZXI6dW5kZWZpbmVkfSl9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LGZvcmdldFB3ZDp0cnVlfSl9Lz5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfcmVuZGVyRm9yZ2V0UGFzc3dvcmQoKXtcbiAgICAgICAgdmFyIHt1c2VyLCBwaG9uZVZlcmlmaWVkLCBmb3JnZXRQd2R9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cImZvcmdldFB3ZFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwiY29udGFjdFwiXG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgdGhpcy5mb3JnZXRQYXNzd29yZCgpfX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfSBoaW50VGV4dD1cInBob25lIG51bWJlciBvciBlbWFpbFwiLz5cblxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzZW5kIG1lXCIgcHJpbWFyeT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZm9yZ2V0UGFzc3dvcmQuYmluZCh0aGlzKX0vPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sIGZvcmdldFB3ZDp1bmRlZmluZWR9KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjp1bmRlZmluZWQsZm9yZ2V0UHdkOnVuZGVmaW5lZH0pfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9yZW5kZXJSZXNldFBhc3N3b3JkKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJyZXNldFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwib2xkUGFzc3dvcmRcIiBoaW50VGV4dD1cIm9sZCBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnJlc2V0UGFzc3dvcmQoKX19XG4gICAgICAgICAgICAgICAgICAgIGVycm9yVGV4dD17dGhpcy5zdGF0ZS5yZXNldEVycm9yfS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHRoaXMucmVzZXRQYXNzd29yZCgpfX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwicGFzc3dvcmQyXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHRoaXMucmVzZXRQYXNzd29yZCgpfX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiLz5cblxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJyZXNldCBwYXNzd29yZFwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnJlc2V0UGFzc3dvcmQuYmluZCh0aGlzKX0vPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sIGZvcmdldFB3ZDp1bmRlZmluZWR9KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sZm9yZ2V0UHdkOnRydWV9KX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbiovXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRTSUdOVVA6dXNlcj0+e1xuXHRcdHJldHVybiBkaXNwYXRjaD0+e1xuXHRcdFx0Y29uc3Qge3VzZXJuYW1lLHBhc3N3b3JkLHBhc3N3b3JkMn09dXNlclxuXHRcdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IscGFzc3dvcmQyRXJyb3Jcblx0XHRcdGlmKCF1c2VybmFtZSlcblx0XHRcdFx0dXNlcm5hbWVFcnJvcj1cInVzZXIgbmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRcdHBhc3N3b3JkRXJyb3I9XCJwYXNzd29yZCBpcyByZXF1aXJlZFwiXG5cdFx0XHRcblx0XHRcdGlmKHBhc3N3b3JkIT1wYXNzd29yZDIpXG5cdFx0XHRcdHBhc3N3b3JkMkVycm9yPVwicGFzc3dvcmQgZG9lc24ndCBtYXRjaFwiXG5cdFx0XHRcblx0XHRcdGlmKHVzZXJuYW1lRXJyb3IgfHwgcGFzc3dvcmRFcnJvcnx8cGFzc3dvcmQyRXJyb3IpXG5cdFx0XHRcdHJldHVybiBkaXNwYXRjaCh7dHlwZTpcIlNJR05VUF9VSVwiLCBwYXNzd29yZEVycm9yLCB1c2VybmFtZUVycm9yLHBhc3N3b3JkMkVycm9yfSlcblx0XHRcdFxuXHRcdFx0cmV0dXJuIFVzZXIuc2lnbnVwKHt1c2VybmFtZSxwYXNzd29yZH0pXG5cdFx0XHRcdC5jYXRjaChlPT5kaXNwYXRjaCh7dHlwZTpcIlNJR05VUF9VSVwiLCB1c2VybmFtZUVycm9yOmUubWVzc2FnZX0pKVxuXHRcdH1cblx0fVxuXHQsU0lHTklOOnVzZXI9Pntcblx0XHQoe3R5cGU6XCJTSUdOSU5cIix1c2VyfSlcdFxuXHR9XG5cdCxQSE9ORV9WRVJJRllfUkVRVUVTVDpwaG9uZT0+e1xuXHRcdFVzZXIucmVxdWVzdFZlcmlmaWNhdGlvbihwaG9uZSlcblx0XHRyZXR1cm4ge3R5cGU6XCJQSE9ORV9WRVJJRllfUkVRVUVTVFwifVxuXHR9XG5cdCxQSE9ORV9WRVJJRlk6KHBob25lLGNvZGUpPT57XG5cdFx0cmV0dXJuIGRpc3BhdGNoPT5Vc2VyLnZlcmlmeVBob25lKHBob25lLGNvZGUpXG5cdFx0XHQudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQX1VJKSlcblx0fVxuXHRcblx0LFNJR05VUF9VSTp7dHlwZTpcIlNJR05VUF9VSVwifVxuXHQsU0lHTklOX1VJOnt0eXBlOlwiU0lHTklOX1VJXCJ9XG5cdCxGT1JHRVRfUEFTU1dPUkRfVUk6e3R5cGU6XCJGT1JHRVRfUEFTU1dPUkRfVUlcIn1cblx0LFJFU0VUX1BBU1NXT1JEX1VJOnt0eXBlOlwiUkVTRVRfUEFTU1dPUkRfVUlcIn1cblx0LFBIT05FX1ZFUklGWV9VSTooe3R5cGU6XCJQSE9ORV9WRVJJRllfVUlcIn0pXG59XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17fSxhY3Rpb24pPT57XG5cdHN3aXRjaChhY3Rpb24udHlwZSl7XG5cdGNhc2UgJ1NJR05VUCc6XG5cdFx0cmV0dXJuIHt9XG5cdGNhc2UgJ1NJR05JTic6XG5cdFx0cmV0dXJuIHt1c2VyfVxuXG5cdGNhc2UgJ1NJR05VUF9VSSc6XG5cdGNhc2UgJ1NJR05JTl9VSSc6XG5cdGNhc2UgJ0ZPUkdFVF9QQVNTV09SRF9VSSc6XG5cdGNhc2UgJ1JFU0VUX1BBU1NXT1JEX1VJJzpcblx0Y2FzZSAnUEhPTkVfVkVSSUZZX1VJJzpcblx0XHRyZXR1cm4gYWN0aW9uXG5cdGRlZmF1bHQ6XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuY29uc3QgQWNjb3VudD1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KSgoe3VzZXIsdHlwZSwgZGlzcGF0Y2h9KT0+e1xuXHRpZighdHlwZSl7XG5cdFx0aWYodXNlcilcblx0XHRcdHR5cGU9J1NJR05JTl9VSSdcblx0XHRlbHNlXG5cdFx0XHR0eXBlPSdQSE9ORV9WRVJJRllfVUknXG5cdH1cblx0XHRcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdTSUdOVVBfVUknOlxuXHRcdHJldHVybiAoPFNpZ251cC8+KVxuXHRjYXNlICdTSUdOSU5fVUknOlxuXHRcdHJldHVybiAoPFNpZ25pbiB1c2VyPXt1c2VyfS8+KVxuXHRjYXNlICdQSE9ORV9WRVJJRllfVUknOlxuXHRcdHJldHVybiAoPFBob25lVmVyaWZpY2F0aW9uIC8+KVxuXHRjYXNlICdGT1JHRVRfUEFTU1dPUkRfVUknOlxuXHRcdHJldHVybiAoPEZvcmdldFBhc3N3b3JkLz4pXG5cdGNhc2UgJ1JFU0VUX1BBU1NXT1JEX1VJJzpcblx0XHRyZXR1cm4gKDxSZXNldFBhc3N3b3JkLz4pXG5cdH1cbn0pXG5cbmNvbnN0IFBob25lVmVyaWZpY2F0aW9uPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFjY291bnQpKFxuXHQoe3Bob25lVmVyaWZpZWRFcnJvcixkaXNwYXRjaH0pPT57XG5cdFx0bGV0IGNvZGUscGhvbmVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicGhvbmV2ZXJpZnlcIj5cblx0XHRcdFx0PFNNU1JlcXVlc3QgcmVmPXthPT5waG9uZT1hfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvZGU9YX0gaGludFRleHQ9XCJ2ZXJpZmljYXRpb24gY29kZSB5b3UganVzdCByZWNlaXZlZFwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWShwaG9uZS5nZXRWYWx1ZSgpLGNvZGUuZ2V0VmFsdWUoKSkpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bob25lVmVyaWZpZWRFcnJvcn0vPlxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJ2ZXJpZnlcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWShwaG9uZS5nZXRWYWx1ZSgpLGNvZGUuZ2V0VmFsdWUoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG59KTtcblxuY29uc3QgU2lnbnVwPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFjY291bnQpKFxuXHQoe3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IsIHBhc3N3b3JkMkVycm9yLCBkaXNwYXRjaH0pPT57XG5cdFx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmQyXG5cdFx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdFx0dXNlcm5hbWU6dXNlcm5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcblx0XHR9KVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWdudXBcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9IGhpbnRUZXh0PVwibG9naW4gbmFtZVwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIiBlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQyPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkIGFnYWluXCIgZXJyb3JUZXh0PXtwYXNzd29yZDJFcnJvcn0vPlxuXG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcbn0pO1xuXG5jb25zdCBTaWduaW49Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7dXNlciwgc2lnbmluRXJyb3IsIHBob25lVmVyaWZpZWQsIGZvcmdldFB3ZCxkaXNwYXRjaH0pPT57XG5cdFx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZFxuXHRcdGxldCB2YWx1ZXM9YT0+KHtcblx0XHRcdHVzZXJuYW1lOnVzZXJuYW1lLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0fSlcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbmluXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT51c2VybmFtZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwibG9naW4gbmFtZSBvciBwaG9uZSBudW1iZXJcIlxuXHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dXNlciAmJiB1c2VyLnVzZXJuYW1lfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtzaWduaW5FcnJvcn0vPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJubyBhY2NvdW50XCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG59KTtcblxuY29uc3QgRm9yZ2V0UGFzc3dvcmQ9Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7ZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCBjb250YWN0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cImZvcmdldFB3ZFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+Y29udGFjdD1hfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRChjb250YWN0LmdldFZhbHVlKCkpKX19XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfSBoaW50VGV4dD1cInBob25lIG51bWJlciBvciBlbWFpbFwiLz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzZW5kIG1lXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkQoY29udGFjdC5nZXRWYWx1ZSgpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxufSk7XG5cbmNvbnN0IFJlc2V0UGFzc3dvcmQ9Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7cmVzZXRFcnJvcixkaXNwYXRjaH0pPT57XG5cdFx0bGV0IG9sZFBhc3N3b3JkLCBwYXNzd29yZCwgcGFzc3dvcmQyXG5cdFx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdFx0b2xkUGFzc3dvcmQ6b2xkUGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcblx0XHR9KVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJyZXNldFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+b2xkUGFzc3dvcmQ9YX0gaGludFRleHQ9XCJvbGQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Jlc2V0RXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQyPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwicmVzZXQgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG59KVxuXG5jbGFzcyBTTVNSZXF1ZXN0IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17cGhvbmU6bnVsbCx0aWNrOm51bGx9XG5cbiAgICB0aWNrKCl7XG4gICAgICAgIGxldCBpPTYwLCBkb1RpY2s7XG4gICAgICAgIHRoaXMuX3Q9c2V0SW50ZXJ2YWwoZG9UaWNrPSgpPT57XG4gICAgICAgICAgICBpZihpPT0wKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazogMH0pXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6aS0tfSlcbiAgICAgICAgfSwxMDAwKTtcblxuICAgICAgICBkb1RpY2soKVxuICAgIH1cblx0XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgaWYodGhpcy5fdClcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3Bob25lLCB0aWNrfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGJ1dHRvbiwgcmVmUGhvbmVcblx0XHRpZihwaG9uZSl7XG4gICAgICAgICAgICBpZih0aWNrKVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2t9IGRpc2FibGVkPXt0cnVlfS8+KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2s9PT0wID8gXCJyZXNlbmRcIiA6IFwic2VuZFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50aWNrKClcblx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1JFUVVFU1QocmVmUGhvbmUuZ2V0VmFsdWUoKSkpXG5cdFx0XHRcdFx0XHRcdH19Lz4pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbXNyZXF1ZXN0XCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuXHRcdFx0XHRcdHJlZj17YT0+cmVmUGhvbmU9YX1cblx0XHRcdFx0XHRoaW50VGV4dD1cInBob25lIG51bWJlciAoZGVmYXVsdCArODYpXCJcblx0XHRcdFx0XHRkaXNhYmxlZD17ISF0aWNrfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT50aGlzLnNldFN0YXRlKHtwaG9uZTogdGhpcy5pc1Bob25lKHZhbHVlKT8gdmFsdWUgOiBudWxsfSl9Lz5cbiAgICAgICAgICAgICAgICB7YnV0dG9ufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cdFxuXHRpc1Bob25lKHYpe1xuICAgICAgICByZXR1cm4gKC9eKFxcK1xcZHsyfSk/XFxkezExfSQvZykudGVzdCh2KVxuICAgIH1cblx0XG5cdGdldFZhbHVlKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUucGhvbmVcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudCJdfQ==