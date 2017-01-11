'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Account = exports.ACTION = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _reactRedux = require('react-redux');

var _user = require('./db/user');

var _user2 = _interopRequireDefault(_user);

var _textField = require('./components/text-field');

var _textField2 = _interopRequireDefault(_textField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTER = 13;

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

			if (usernameError || passwordError || password2Error) return Promise.reject({ passwordError: passwordError, usernameError: usernameError, password2Error: password2Error });

			return _user2.default.signup({ username: username, password: password }).catch(function (_ref) {
				var message = _ref.message;
				return Promise.reject({ usernameError: message });
			});
		};
	},
	SIGNIN: function SIGNIN(user) {
		return function (dispatch) {
			var username = user.username,
			    password = user.password;

			var usernameError = void 0,
			    passwordError = void 0;
			if (!username) usernameError = "user name is required";
			if (!password) passwordError = "password is required";

			if (usernameError || passwordError) return Promise.reject({ usernameError: usernameError, passwordError: passwordError });

			return _user2.default.signin({ username: username, password: password }).catch(function (_ref2) {
				var message = _ref2.message;
				return Promise.reject({ usernameError: message });
			});
		};
	},
	PHONE_VERIFY_REQUEST: function PHONE_VERIFY_REQUEST(phone, existence) {
		return function (dispatch) {
			return _user2.default.requestVerification(phone, existence);
		};
	},

	PHONE_VERIFY: function PHONE_VERIFY(phone, code) {
		return function (dispatch) {
			return _user2.default.verifyPhone(phone, code);
		};
	},

	FORGET_PASSWORD: function FORGET_PASSWORD(phone, code) {
		return function (dispatch) {
			if (!phone || !code) return Promise.reject("a phone number must be given to recover password");

			return _user2.default.requestPasswordReset(phone, code);
		};
	},
	RESET_PASSWORD: function RESET_PASSWORD(oldPwd, newPwd) {
		return function (dispatch) {
			return _user2.default.resetPassword(oldPwd, newPwd);
		};
	},

	SIGNUP_UI: { type: 'SIGNUP_UI' },
	SIGNIN_UI: { type: 'SIGNIN_UI' },
	FORGET_PASSWORD_UI: { type: 'FORGET_PASSWORD_UI' },
	RESET_PASSWORD_UI: { type: 'RESET_PASSWORD_UI' },
	PHONE_VERIFY_UI: { type: 'PHONE_VERIFY_UI' }
};

var Account = exports.Account = function (_Component) {
	_inherits(Account, _Component);

	function Account() {
		var _ref3;

		var _temp, _this, _ret;

		_classCallCheck(this, Account);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = Account.__proto__ || Object.getPrototypeOf(Account)).call.apply(_ref3, [this].concat(args))), _this), _this.state = { type: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Account, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    user = _props.user,
			    dispatch = _props.dispatch,
			    others = _objectWithoutProperties(_props, ['user', 'dispatch']);

			var type = this.state.type;

			if (!type) {
				if (user) type = 'SIGNIN_UI';else type = 'PHONE_VERIFY_UI';
			}

			others.dispatch = function (action) {
				switch (action.type) {
					case 'SIGNUP_UI':
					case 'SIGNIN_UI':
					case 'FORGET_PASSWORD_UI':
					case 'RESET_PASSWORD_UI':
					case 'PHONE_VERIFY_UI':
						_this2.setState({ type: action.type });
					default:
						return dispatch(action);
				}
			};

			switch (type) {
				case 'SIGNUP_UI':
					return _react2.default.createElement(Signup, others);
				case 'SIGNIN_UI':
					return _react2.default.createElement(Signin, _extends({}, others, { username: user ? user.username : null }));
				case 'PHONE_VERIFY_UI':
					return _react2.default.createElement(PhoneVerification, others);
				case 'FORGET_PASSWORD_UI':
					return _react2.default.createElement(ForgetPassword, others);
				case 'RESET_PASSWORD_UI':
					return _react2.default.createElement(ResetPassword, others);
			}
		}
	}]);

	return Account;
}(_react.Component);

var PhoneVerification = function (_Component2) {
	_inherits(PhoneVerification, _Component2);

	function PhoneVerification() {
		var _ref4;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, PhoneVerification);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref4 = PhoneVerification.__proto__ || Object.getPrototypeOf(PhoneVerification)).call.apply(_ref4, [this].concat(args))), _this3), _this3.state = { phoneVerifiedError: null }, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(PhoneVerification, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			var phoneVerifiedError = this.state.phoneVerifiedError;
			var dispatch = this.props.dispatch;


			var code = void 0,
			    phone = void 0;

			var send = function send(a) {
				return dispatch(ACTION.PHONE_VERIFY(phone.getValue(), code.getValue())).then(function (a) {
					return dispatch(ACTION.SIGNUP_UI);
				}, function (e) {
					return _this4.setState({ phoneVerifiedError: e });
				});
			};

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
						e.keyCode == ENTER && send();
					},
					errorText: phoneVerifiedError }),
				_react2.default.createElement(
					'center',
					null,
					_react2.default.createElement(_materialUi.RaisedButton, { label: 'verify', primary: true,
						onClick: function onClick(e) {
							return send();
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
		}
	}]);

	return PhoneVerification;
}(_react.Component);

var Signup = function (_Component3) {
	_inherits(Signup, _Component3);

	function Signup() {
		var _ref5;

		var _temp3, _this5, _ret3;

		_classCallCheck(this, Signup);

		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		return _ret3 = (_temp3 = (_this5 = _possibleConstructorReturn(this, (_ref5 = Signup.__proto__ || Object.getPrototypeOf(Signup)).call.apply(_ref5, [this].concat(args))), _this5), _this5.state = { usernameError: null, passwordError: null, password2Error: null }, _temp3), _possibleConstructorReturn(_this5, _ret3);
	}

	_createClass(Signup, [{
		key: 'render',
		value: function render() {
			var _this6 = this;

			var _state = this.state,
			    usernameError = _state.usernameError,
			    passwordError = _state.passwordError,
			    password2Error = _state.password2Error;
			var dispatch = this.props.dispatch;


			var username = void 0,
			    password = void 0,
			    password2 = void 0;

			var send = function send(a) {
				return dispatch(ACTION.SIGNUP({
					username: username.getValue(),
					password: password.getValue(),
					password2: password2.getValue()
				})).catch(function (e) {
					return _this6.setState(Object.assign({}, { usernameError: null, passwordError: null, password2Error: null }, e));
				});
			};

			return _react2.default.createElement(
				'div',
				{ className: 'form', key: 'signup' },
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return username = a;
					},
					hintText: 'login name',
					fullWidth: true,
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					errorText: usernameError }),
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return password = a;
					},
					fullWidth: true,
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					type: 'password', hintText: 'password', errorText: passwordError }),
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return password2 = a;
					},
					fullWidth: true,
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					type: 'password', hintText: 'password again', errorText: password2Error }),
				_react2.default.createElement(
					'center',
					null,
					_react2.default.createElement(_materialUi.RaisedButton, { label: 'sign up', primary: true,
						onClick: function onClick(e) {
							return send();
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
		}
	}]);

	return Signup;
}(_react.Component);

var Signin = function (_Component4) {
	_inherits(Signin, _Component4);

	function Signin() {
		var _ref6;

		var _temp4, _this7, _ret4;

		_classCallCheck(this, Signin);

		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		return _ret4 = (_temp4 = (_this7 = _possibleConstructorReturn(this, (_ref6 = Signin.__proto__ || Object.getPrototypeOf(Signin)).call.apply(_ref6, [this].concat(args))), _this7), _this7.state = { usernameError: null, passwordError: null }, _temp4), _possibleConstructorReturn(_this7, _ret4);
	}

	_createClass(Signin, [{
		key: 'render',
		value: function render() {
			var _this8 = this;

			var _props2 = this.props,
			    username = _props2.username,
			    dispatch = _props2.dispatch;
			var _state2 = this.state,
			    usernameError = _state2.usernameError,
			    passwordError = _state2.passwordError;

			var refUsername = void 0,
			    refPassword = void 0;

			var send = function send(a) {
				return dispatch(ACTION.SIGNIN({
					username: refUsername.getValue(),
					password: refPassword.getValue()
				})).catch(function (e) {
					return _this8.setState(Object.assign({}, { usernameError: null, passwordError: null }, e));
				});
			};

			return _react2.default.createElement(
				'div',
				{ className: 'form', key: 'signin' },
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return refUsername = a;
					},
					hintText: 'login name or phone number',
					defaultValue: username,
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					fullWidth: true,
					errorText: usernameError }),
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return refPassword = a;
					},
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					fullWidth: true, errorText: passwordError,
					type: 'password', hintText: 'password' }),
				_react2.default.createElement(
					'center',
					null,
					_react2.default.createElement(_materialUi.RaisedButton, { label: 'sign in', primary: true,
						onClick: function onClick(e) {
							return send();
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
		}
	}]);

	return Signin;
}(_react.Component);

var ForgetPassword = function (_Component5) {
	_inherits(ForgetPassword, _Component5);

	function ForgetPassword() {
		var _ref7;

		var _temp5, _this9, _ret5;

		_classCallCheck(this, ForgetPassword);

		for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			args[_key5] = arguments[_key5];
		}

		return _ret5 = (_temp5 = (_this9 = _possibleConstructorReturn(this, (_ref7 = ForgetPassword.__proto__ || Object.getPrototypeOf(ForgetPassword)).call.apply(_ref7, [this].concat(args))), _this9), _this9.state = { phoneVerifiedError: null }, _temp5), _possibleConstructorReturn(_this9, _ret5);
	}

	_createClass(ForgetPassword, [{
		key: 'render',
		value: function render() {
			var _this10 = this;

			var dispatch = this.props.dispatch;
			var phoneVerifiedError = this.state.phoneVerifiedError;

			var phone = void 0,
			    code = void 0;
			var send = function send(a) {
				return dispatch(ACTION.FORGET_PASSWORD(phone.getValue(), code.getValue())).then(function (a) {
					_this10.setState({ phoneVerifiedError: null });
					alert('a temp password sent to your phone, please sign in within 2 hours and reset password immediatly');
				}, function (e) {
					return _this10.setState({ phoneVerifiedError: e });
				});
			};

			return _react2.default.createElement(
				'div',
				{ className: 'form', key: 'forgetPwd' },
				_react2.default.createElement(SMSRequest, { ref: function ref(a) {
						return phone = a;
					}, dispatch: dispatch, existence: true }),
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return code = a;
					}, hintText: 'verification code you just received',
					fullWidth: true,
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					errorText: phoneVerifiedError }),
				_react2.default.createElement(
					'center',
					null,
					_react2.default.createElement(_materialUi.RaisedButton, { label: 'send me temp password', primary: true,
						onClick: function onClick(e) {
							return send();
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
		}
	}]);

	return ForgetPassword;
}(_react.Component);

var ResetPassword = function (_Component6) {
	_inherits(ResetPassword, _Component6);

	function ResetPassword() {
		var _ref8;

		var _temp6, _this11, _ret6;

		_classCallCheck(this, ResetPassword);

		for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
			args[_key6] = arguments[_key6];
		}

		return _ret6 = (_temp6 = (_this11 = _possibleConstructorReturn(this, (_ref8 = ResetPassword.__proto__ || Object.getPrototypeOf(ResetPassword)).call.apply(_ref8, [this].concat(args))), _this11), _this11.state = { resetError: null, passwordError: null, password2Error: null }, _temp6), _possibleConstructorReturn(_this11, _ret6);
	}

	_createClass(ResetPassword, [{
		key: 'render',
		value: function render() {
			var _this12 = this;

			var dispatch = this.props.dispatch;
			var resetError = this.state.resetError;


			var oldPassword = void 0,
			    password = void 0,
			    password2 = void 0;
			var send = function send(a) {
				var newPassword = password.getValue();
				if (password2.getValue() != newPassword) {
					_this12.setState({ password2Error: "password not matched" });
					return;
				}

				dispatch(ACTION.RESET_PASSWORD(oldPassword.getValue(), newPassword)).then(function (a) {
					return _this12.setState({ resetError: null, passwordError: null, password2Error: null });
				}, function (error) {
					return _this12.setState({ resetError: error, passwordError: null, password2Error: null });
				});
			};

			return _react2.default.createElement(
				'div',
				{ className: 'form', key: 'reset' },
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return oldPassword = a;
					}, hintText: 'old password',
					fullWidth: true,
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					errorText: resetError }),
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return password = a;
					},
					fullWidth: true,
					errorText: passwordError,
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					type: 'password', hintText: 'password' }),
				_react2.default.createElement(_textField2.default, { ref: function ref(a) {
						return password2 = a;
					},
					fullWidth: true,
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					errorText: password2Error,
					type: 'password',
					hintText: 'password again' }),
				_react2.default.createElement(
					'center',
					null,
					_react2.default.createElement(_materialUi.RaisedButton, { label: 'reset password', primary: true,
						onClick: function onClick(e) {
							return send();
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
		}
	}]);

	return ResetPassword;
}(_react.Component);

var SMSRequest = function (_Component7) {
	_inherits(SMSRequest, _Component7);

	function SMSRequest() {
		var _ref9;

		var _temp7, _this13, _ret7;

		_classCallCheck(this, SMSRequest);

		for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
			args[_key7] = arguments[_key7];
		}

		return _ret7 = (_temp7 = (_this13 = _possibleConstructorReturn(this, (_ref9 = SMSRequest.__proto__ || Object.getPrototypeOf(SMSRequest)).call.apply(_ref9, [this].concat(args))), _this13), _this13.state = { phone: null, tick: null, error: null }, _temp7), _possibleConstructorReturn(_this13, _ret7);
	}

	_createClass(SMSRequest, [{
		key: 'tick',
		value: function tick() {
			var _this14 = this;

			var i = 60,
			    doTick = void 0;
			this._t = setInterval(doTick = function doTick() {
				if (i == 0) {
					clearInterval(_this14._t);
					_this14.setState({ tick: 0 });
				} else _this14.setState({ tick: i-- });
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
			var _this15 = this;

			var _state3 = this.state,
			    phone = _state3.phone,
			    tick = _state3.tick,
			    error = _state3.error;
			var _props3 = this.props,
			    dispatch = _props3.dispatch,
			    _props3$existence = _props3.existence,
			    existence = _props3$existence === undefined ? false : _props3$existence;

			var button = void 0;
			if (phone) {
				if (tick) button = _react2.default.createElement(_materialUi.FlatButton, { label: tick, disabled: true });else button = _react2.default.createElement(_materialUi.FlatButton, { label: tick === 0 ? "resend" : "send",
					onClick: function onClick(e) {
						_this15.tick();
						dispatch(ACTION.PHONE_VERIFY_REQUEST(_this15.refs.phone.getValue(), existence)).catch(function (error) {
							return _this15.setState({ error: error });
						});
					} });
			}

			return _react2.default.createElement(
				'div',
				{ className: 'smsrequest' },
				_react2.default.createElement(_materialUi.TextField, {
					ref: 'phone',
					hintText: 'phone number (default +86)',
					disabled: !!tick,
					errorText: error,
					onChange: function onChange(_ref10) {
						var value = _ref10.target.value;
						return _this15.setState({ phone: _this15.isPhone(value) ? value : null });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ1c2VybmFtZUVycm9yIiwicGFzc3dvcmRFcnJvciIsInBhc3N3b3JkMkVycm9yIiwiUHJvbWlzZSIsInJlamVjdCIsInNpZ251cCIsImNhdGNoIiwibWVzc2FnZSIsIlNJR05JTiIsInNpZ25pbiIsIlBIT05FX1ZFUklGWV9SRVFVRVNUIiwicGhvbmUiLCJleGlzdGVuY2UiLCJyZXF1ZXN0VmVyaWZpY2F0aW9uIiwiUEhPTkVfVkVSSUZZIiwiY29kZSIsInZlcmlmeVBob25lIiwiRk9SR0VUX1BBU1NXT1JEIiwicmVxdWVzdFBhc3N3b3JkUmVzZXQiLCJSRVNFVF9QQVNTV09SRCIsIm9sZFB3ZCIsIm5ld1B3ZCIsInJlc2V0UGFzc3dvcmQiLCJTSUdOVVBfVUkiLCJ0eXBlIiwiU0lHTklOX1VJIiwiRk9SR0VUX1BBU1NXT1JEX1VJIiwiUkVTRVRfUEFTU1dPUkRfVUkiLCJQSE9ORV9WRVJJRllfVUkiLCJBY2NvdW50Iiwic3RhdGUiLCJwcm9wcyIsImRpc3BhdGNoIiwib3RoZXJzIiwiYWN0aW9uIiwic2V0U3RhdGUiLCJQaG9uZVZlcmlmaWNhdGlvbiIsInBob25lVmVyaWZpZWRFcnJvciIsInNlbmQiLCJnZXRWYWx1ZSIsInRoZW4iLCJlIiwiYSIsImtleUNvZGUiLCJTaWdudXAiLCJPYmplY3QiLCJhc3NpZ24iLCJTaWduaW4iLCJyZWZVc2VybmFtZSIsInJlZlBhc3N3b3JkIiwiRm9yZ2V0UGFzc3dvcmQiLCJhbGVydCIsIlJlc2V0UGFzc3dvcmQiLCJyZXNldEVycm9yIiwib2xkUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImVycm9yIiwiU01TUmVxdWVzdCIsInRpY2siLCJpIiwiZG9UaWNrIiwiX3QiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJidXR0b24iLCJy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Q0k7QUFDWCxVQUFJLE9BRE87QUFFWCxlQUFTLDRCQUZFO0FBR1gsZUFBVSxDQUFDLENBQUNFLElBSEQ7QUFJWCxnQkFBV0YsS0FKQTtBQUtJLGVBQVU7QUFBQSxVQUFVVSxLQUFWLFVBQUVDLE1BQUYsQ0FBVUQsS0FBVjtBQUFBLGFBQW9CLFFBQUsvQixRQUFMLENBQWMsRUFBQ3hCLE9BQU8sUUFBS3lELE9BQUwsQ0FBYUYsS0FBYixJQUFxQkEsS0FBckIsR0FBNkIsSUFBckMsRUFBZCxDQUFwQjtBQUFBLE1BTGQsR0FESjtBQU9LRjtBQVBMLElBREo7QUFXSDs7OzBCQUVJSyxDLEVBQUU7QUFDSCxVQUFRLHNCQUFELENBQXdCQyxJQUF4QixDQUE2QkQsQ0FBN0I7QUFBUDtBQUNIOzs7NkJBRU07QUFDVCxVQUFPLEtBQUt2QyxLQUFMLENBQVduQixLQUFsQjtBQUNBOzs7Ozs7a0JBR2FrQixPIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtUZXh0RmllbGQsIEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCBVc2VyIGZyb20gJy4vZGIvdXNlcidcbmltcG9ydCBUZXh0RmllbGR4IGZyb20gXCIuL2NvbXBvbmVudHMvdGV4dC1maWVsZFwiXG5cbmNvbnN0IEVOVEVSPTEzXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRTSUdOVVA6dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUscGFzc3dvcmQscGFzc3dvcmQyfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IscGFzc3dvcmQyRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYocGFzc3dvcmQhPXBhc3N3b3JkMilcblx0XHRcdHBhc3N3b3JkMkVycm9yPVwicGFzc3dvcmQgZG9lc24ndCBtYXRjaFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3J8fHBhc3N3b3JkMkVycm9yKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHtwYXNzd29yZEVycm9yLCB1c2VybmFtZUVycm9yLHBhc3N3b3JkMkVycm9yfSlcblxuXHRcdHJldHVybiBVc2VyLnNpZ251cCh7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5Qcm9taXNlLnJlamVjdCh7dXNlcm5hbWVFcnJvcjptZXNzYWdlfSkpXG5cdH1cblx0LFNJR05JTjp1c2VyPT5kaXNwYXRjaD0+e1xuXHRcdGNvbnN0IHt1c2VybmFtZSwgcGFzc3dvcmR9PXVzZXJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvclxuXHRcdGlmKCF1c2VybmFtZSlcblx0XHRcdHVzZXJuYW1lRXJyb3I9XCJ1c2VyIG5hbWUgaXMgcmVxdWlyZWRcIlxuXHRcdGlmKCFwYXNzd29yZClcblx0XHRcdHBhc3N3b3JkRXJyb3I9XCJwYXNzd29yZCBpcyByZXF1aXJlZFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3IpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3Qoe3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3J9KVxuXG5cdFx0cmV0dXJuIFVzZXIuc2lnbmluKHt1c2VybmFtZSxwYXNzd29yZH0pXG5cdFx0XHQuY2F0Y2goKHttZXNzYWdlfSk9PlByb21pc2UucmVqZWN0KHt1c2VybmFtZUVycm9yOm1lc3NhZ2V9KSlcblx0fVxuXHQsUEhPTkVfVkVSSUZZX1JFUVVFU1Q6KHBob25lLGV4aXN0ZW5jZSk9PmRpc3BhdGNoPT5Vc2VyLnJlcXVlc3RWZXJpZmljYXRpb24ocGhvbmUsZXhpc3RlbmNlKVxuXG5cdCxQSE9ORV9WRVJJRlk6KHBob25lLGNvZGUpPT5kaXNwYXRjaD0+VXNlci52ZXJpZnlQaG9uZShwaG9uZSxjb2RlKVxuXG5cdCxGT1JHRVRfUEFTU1dPUkQ6IChwaG9uZSxjb2RlKT0+ZGlzcGF0Y2g9Pntcblx0XHRpZighcGhvbmUgfHwgIWNvZGUpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJhIHBob25lIG51bWJlciBtdXN0IGJlIGdpdmVuIHRvIHJlY292ZXIgcGFzc3dvcmRcIilcblxuXHRcdHJldHVybiBVc2VyLnJlcXVlc3RQYXNzd29yZFJlc2V0KHBob25lLGNvZGUpXG5cdH1cblx0LFJFU0VUX1BBU1NXT1JEOiAob2xkUHdkLCBuZXdQd2QpPT5kaXNwYXRjaD0+VXNlci5yZXNldFBhc3N3b3JkKG9sZFB3ZCwgbmV3UHdkKVxuXG5cdCxTSUdOVVBfVUk6e3R5cGU6YFNJR05VUF9VSWB9XG5cdCxTSUdOSU5fVUk6e3R5cGU6YFNJR05JTl9VSWB9XG5cdCxGT1JHRVRfUEFTU1dPUkRfVUk6e3R5cGU6YEZPUkdFVF9QQVNTV09SRF9VSWB9XG5cdCxSRVNFVF9QQVNTV09SRF9VSTp7dHlwZTpgUkVTRVRfUEFTU1dPUkRfVUlgfVxuXHQsUEhPTkVfVkVSSUZZX1VJOih7dHlwZTpgUEhPTkVfVkVSSUZZX1VJYH0pXG59XG5cbmV4cG9ydCBjbGFzcyBBY2NvdW50IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17dHlwZTpudWxsfVxuXHRyZW5kZXIoKXtcblx0XHRsZXQge3VzZXIsZGlzcGF0Y2gsLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0bGV0IHt0eXBlfT10aGlzLnN0YXRlXG5cdFx0aWYoIXR5cGUpe1xuXHRcdFx0aWYodXNlcilcblx0XHRcdFx0dHlwZT0nU0lHTklOX1VJJ1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0eXBlPSdQSE9ORV9WRVJJRllfVUknXG5cdFx0fVxuXG5cdFx0b3RoZXJzLmRpc3BhdGNoPWFjdGlvbj0+e1xuXHRcdFx0c3dpdGNoKGFjdGlvbi50eXBlKXtcblx0XHRcdGNhc2UgYFNJR05VUF9VSWA6XG5cdFx0XHRjYXNlIGBTSUdOSU5fVUlgOlxuXHRcdFx0Y2FzZSBgRk9SR0VUX1BBU1NXT1JEX1VJYDpcblx0XHRcdGNhc2UgYFJFU0VUX1BBU1NXT1JEX1VJYDpcblx0XHRcdGNhc2UgYFBIT05FX1ZFUklGWV9VSWA6XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3R5cGU6YWN0aW9uLnR5cGV9KVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGRpc3BhdGNoKGFjdGlvbilcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSAnU0lHTlVQX1VJJzpcblx0XHRcdHJldHVybiAoPFNpZ251cCB7Li4ub3RoZXJzfSAvPilcblx0XHRjYXNlICdTSUdOSU5fVUknOlxuXHRcdFx0cmV0dXJuICg8U2lnbmluIHsuLi5vdGhlcnN9IHVzZXJuYW1lPXt1c2VyID8gdXNlci51c2VybmFtZSA6IG51bGx9Lz4pXG5cdFx0Y2FzZSAnUEhPTkVfVkVSSUZZX1VJJzpcblx0XHRcdHJldHVybiAoPFBob25lVmVyaWZpY2F0aW9uIHsuLi5vdGhlcnN9Lz4pXG5cdFx0Y2FzZSAnRk9SR0VUX1BBU1NXT1JEX1VJJzpcblx0XHRcdHJldHVybiAoPEZvcmdldFBhc3N3b3JkIHsuLi5vdGhlcnN9Lz4pXG5cdFx0Y2FzZSAnUkVTRVRfUEFTU1dPUkRfVUknOlxuXHRcdFx0cmV0dXJuICg8UmVzZXRQYXNzd29yZCB7Li4ub3RoZXJzfS8+KVxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBQaG9uZVZlcmlmaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Bob25lVmVyaWZpZWRFcnJvcjpudWxsfVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7cGhvbmVWZXJpZmllZEVycm9yfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cblx0XHRsZXQgY29kZSxwaG9uZVxuXG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZKHBob25lLmdldFZhbHVlKCksY29kZS5nZXRWYWx1ZSgpKSlcblx0XHRcdC50aGVuKGE9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVBfVUkpLGU9PnRoaXMuc2V0U3RhdGUoe3Bob25lVmVyaWZpZWRFcnJvcjplfSkpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicGhvbmV2ZXJpZnlcIj5cblx0XHRcdFx0PFNNU1JlcXVlc3QgcmVmPXthPT5waG9uZT1hfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvZGU9YX0gaGludFRleHQ9XCJ2ZXJpZmljYXRpb24gY29kZSB5b3UganVzdCByZWNlaXZlZFwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bob25lVmVyaWZpZWRFcnJvcn0vPlxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJ2ZXJpZnlcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgU2lnbnVwIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT0ge3VzZXJuYW1lRXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsLCBwYXNzd29yZDJFcnJvcjpudWxsfVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvciwgcGFzc3dvcmQyRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblxuXHRcdGxldCB1c2VybmFtZSwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQKHtcblx0XHRcdHVzZXJuYW1lOnVzZXJuYW1lLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQyOnBhc3N3b3JkMi5nZXRWYWx1ZSgpXG5cdFx0fSkpLmNhdGNoKGU9PnRoaXMuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSx7dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9LGUpKSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWdudXBcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJsb2dpbiBuYW1lXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiIGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIiBlcnJvclRleHQ9e3Bhc3N3b3JkMkVycm9yfS8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5jbGFzcyBTaWduaW4gZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3VzZXJuYW1lLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfT10aGlzLnN0YXRlXG5cdFx0bGV0IHJlZlVzZXJuYW1lLCByZWZQYXNzd29yZFxuXG5cdFx0bGV0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTih7XG5cdFx0XHR1c2VybmFtZTpyZWZVc2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cmVmUGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdH0pKS5jYXRjaChlPT50aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30se3VzZXJuYW1lRXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsfSxlKSkpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbmluXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVc2VybmFtZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwibG9naW4gbmFtZSBvciBwaG9uZSBudW1iZXJcIlxuXHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dXNlcm5hbWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cblx0XHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJubyBhY2NvdW50XCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgRm9yZ2V0UGFzc3dvcmQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtwaG9uZVZlcmlmaWVkRXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3Bob25lVmVyaWZpZWRFcnJvcn09dGhpcy5zdGF0ZVxuXHRcdGxldCBwaG9uZSxjb2RlXG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEKHBob25lLmdldFZhbHVlKCksY29kZS5nZXRWYWx1ZSgpKSlcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtwaG9uZVZlcmlmaWVkRXJyb3I6bnVsbH0pXG5cdFx0XHRcdFx0YWxlcnQoYGEgdGVtcCBwYXNzd29yZCBzZW50IHRvIHlvdXIgcGhvbmUsIHBsZWFzZSBzaWduIGluIHdpdGhpbiAyIGhvdXJzIGFuZCByZXNldCBwYXNzd29yZCBpbW1lZGlhdGx5YClcblx0XHRcdFx0fSwgZT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmVWZXJpZmllZEVycm9yOmV9KSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJmb3JnZXRQd2RcIj5cblx0XHRcdFx0PFNNU1JlcXVlc3QgcmVmPXthPT5waG9uZT1hfSBkaXNwYXRjaD17ZGlzcGF0Y2h9IGV4aXN0ZW5jZT17dHJ1ZX0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5jb2RlPWF9IGhpbnRUZXh0PVwidmVyaWZpY2F0aW9uIGNvZGUgeW91IGp1c3QgcmVjZWl2ZWRcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtwaG9uZVZlcmlmaWVkRXJyb3J9Lz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzZW5kIG1lIHRlbXAgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0fVxufVxuXG5jbGFzcyBSZXNldFBhc3N3b3JkIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17cmVzZXRFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyZXNldEVycm9yfT10aGlzLnN0YXRlXG5cblx0XHRsZXQgb2xkUGFzc3dvcmQsIHBhc3N3b3JkLCBwYXNzd29yZDJcblx0XHRjb25zdCBzZW5kPWE9Pntcblx0XHRcdGxldCBuZXdQYXNzd29yZD1wYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0XHRpZihwYXNzd29yZDIuZ2V0VmFsdWUoKSE9bmV3UGFzc3dvcmQpe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtwYXNzd29yZDJFcnJvcjpcInBhc3N3b3JkIG5vdCBtYXRjaGVkXCJ9KVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKG9sZFBhc3N3b3JkLmdldFZhbHVlKCksIG5ld1Bhc3N3b3JkKSlcblx0XHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7cmVzZXRFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9KSxcblx0XHRcdFx0XHRlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7cmVzZXRFcnJvcjplcnJvciwgcGFzc3dvcmRFcnJvcjpudWxsLCBwYXNzd29yZDJFcnJvcjpudWxsfSkpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInJlc2V0XCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5vbGRQYXNzd29yZD1hfSBoaW50VGV4dD1cIm9sZCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Jlc2V0RXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtwYXNzd29yZEVycm9yfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXG5cdFx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cGFzc3dvcmQyPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bhc3N3b3JkMkVycm9yfVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiXG5cdFx0XHRcdFx0aGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiLz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJyZXNldCBwYXNzd29yZFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdH1cbn1cblxuY2xhc3MgU01TUmVxdWVzdCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Bob25lOm51bGwsdGljazpudWxsLCBlcnJvcjpudWxsfVxuXG4gICAgdGljaygpe1xuICAgICAgICBsZXQgaT02MCwgZG9UaWNrO1xuICAgICAgICB0aGlzLl90PXNldEludGVydmFsKGRvVGljaz0oKT0+e1xuICAgICAgICAgICAgaWYoaT09MCl7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6IDB9KVxuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOmktLX0pXG4gICAgICAgIH0sMTAwMCk7XG5cbiAgICAgICAgZG9UaWNrKClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICBpZih0aGlzLl90KVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7cGhvbmUsIHRpY2ssZXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7ZGlzcGF0Y2gsZXhpc3RlbmNlPWZhbHNlfT10aGlzLnByb3BzXG5cdFx0bGV0IGJ1dHRvblxuXHRcdGlmKHBob25lKXtcbiAgICAgICAgICAgIGlmKHRpY2spXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGlja30gZGlzYWJsZWQ9e3RydWV9Lz4pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGljaz09PTAgPyBcInJlc2VuZFwiIDogXCJzZW5kXCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnRpY2soKVxuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfUkVRVUVTVCh0aGlzLnJlZnMucGhvbmUuZ2V0VmFsdWUoKSxleGlzdGVuY2UpKVxuXHRcdFx0XHRcdFx0XHRcdFx0LmNhdGNoKGVycm9yPT50aGlzLnNldFN0YXRlKHtlcnJvcn0pKVxuXHRcdFx0XHRcdFx0XHR9fS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic21zcmVxdWVzdFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcblx0XHRcdFx0XHRyZWY9XCJwaG9uZVwiXG5cdFx0XHRcdFx0aGludFRleHQ9XCJwaG9uZSBudW1iZXIgKGRlZmF1bHQgKzg2KVwiXG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyEhdGlja31cblx0XHRcdFx0XHRlcnJvclRleHQ9e2Vycm9yfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT50aGlzLnNldFN0YXRlKHtwaG9uZTogdGhpcy5pc1Bob25lKHZhbHVlKT8gdmFsdWUgOiBudWxsfSl9Lz5cbiAgICAgICAgICAgICAgICB7YnV0dG9ufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblx0aXNQaG9uZSh2KXtcbiAgICAgICAgcmV0dXJuICgvXihcXCtcXGR7Mn0pP1xcZHsxMX0kL2cpLnRlc3QodilcbiAgICB9XG5cblx0Z2V0VmFsdWUoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5waG9uZVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY291bnRcbiJdfQ==