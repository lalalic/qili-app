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
	PHONE_VERIFY_REQUEST: function PHONE_VERIFY_REQUEST(phone) {
		return _user2.default.requestVerification(phone);
	},

	PHONE_VERIFY: function PHONE_VERIFY(phone, code) {
		return function (dispatch) {
			return _user2.default.verifyPhone(phone, code);
		};
	},

	FORGET_PASSWORD: function FORGET_PASSWORD(contact) {
		return function (dispatch) {
			if (!contact) return Promise.reject("a phone number or email must be given to reset password");

			return _user2.default.requestPasswordReset(contact);
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

		return _ret5 = (_temp5 = (_this9 = _possibleConstructorReturn(this, (_ref7 = ForgetPassword.__proto__ || Object.getPrototypeOf(ForgetPassword)).call.apply(_ref7, [this].concat(args))), _this9), _this9.state = { contactError: null }, _temp5), _possibleConstructorReturn(_this9, _ret5);
	}

	_createClass(ForgetPassword, [{
		key: 'render',
		value: function render() {
			var _this10 = this;

			var dispatch = this.props.dispatch;
			var contactError = this.state.contactError;

			var contact = void 0;
			var send = function send(a) {
				return dispatch(ACTION.FORGET_PASSWORD(contact.getValue())).then(function (a) {
					_this10.setState({ contactError: null });
					alert('reset email/sms sent, please follow the instruction to reset your password');
				}, function (e) {
					return _this10.setState({ contactError: e });
				});
			};
			return _react2.default.createElement(
				'div',
				{ className: 'form', key: 'forgetPwd' },
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return contact = a;
					},
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					fullWidth: true,
					errorText: contactError,
					hintText: 'phone number or email' }),
				_react2.default.createElement(
					'center',
					null,
					_react2.default.createElement(_materialUi.RaisedButton, { label: 'send me', primary: true,
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

		return _ret7 = (_temp7 = (_this13 = _possibleConstructorReturn(this, (_ref9 = SMSRequest.__proto__ || Object.getPrototypeOf(SMSRequest)).call.apply(_ref9, [this].concat(args))), _this13), _this13.state = { phone: null, tick: null }, _temp7), _possibleConstructorReturn(_this13, _ret7);
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
			    tick = _state3.tick;
			var dispatch = this.props.dispatch;

			var button = void 0,
			    refPhone = void 0;
			if (phone) {
				if (tick) button = _react2.default.createElement(_materialUi.FlatButton, { label: tick, disabled: true });else button = _react2.default.createElement(_materialUi.FlatButton, { label: tick === 0 ? "resend" : "send",
					onClick: function onClick(e) {
						_this15.tick();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ1c2VybmFtZUVycm9yIiwicGFzc3dvcmRFcnJvciIsInBhc3N3b3JkMkVycm9yIiwiUHJvbWlzZSIsInJlamVjdCIsInNpZ251cCIsImNhdGNoIiwibWVzc2FnZSIsIlNJR05JTiIsInNpZ25pbiIsIlBIT05FX1ZFUklGWV9SRVFVRVNUIiwicmVxdWVzdFZlcmlmaWNhdGlvbiIsInBob25lIiwiUEhPTkVfVkVSSUZZIiwiY29kZSIsInZlcmlmeVBob25lIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiUkVTRVRfUEFTU1dPUkQiLCJvbGRQd2QiLCJuZXdQd2QiLCJyZXNldFBhc3N3b3JkIiwiU0lHTlVQX1VJIiwidHlwZSIsIlNJR05JTl9VSSIsIkZPUkdFVF9QQVNTV09SRF9VSSIsIlJFU0VUX1BBU1NXT1JEX1VJIiwiUEhPTkVfVkVSSUZZX1VJIiwiQWNjb3VudCIsInN0YXRlIiwicHJvcHMiLCJkaXNwYXRjaCIsIm90aGVycyIsImFjdGlvbiIsInNldFN0YXRlIiwiUGhvbmVWZXJpZmljYXRpb24iLCJwaG9uZVZlcmlmaWVkRXJyb3IiLCJzZW5kIiwiZ2V0VmFsdWUiLCJ0aGVuIiwiZSIsImEiLCJrZXlDb2RlIiwiU2lnbnVwIiwiT2JqZWN0IiwiYXNzaWduIiwiU2lnbmluIiwicmVmVXNlcm5hbWUiLCJyZWZQYXNzd29yZCIsIkZvcmdldFBhc3N3b3JkIiwiY29udGFjdEVycm9yIiwiYWxlcnQiLCJSZXNldFBhc3N3b3JkIiwicmVzZXRFcnJvciIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJlcnJvciIsIlNNU1JlcXVlc3QiLCJ0aWNrIiwiaSIsImRvVGljayIsIl90Iiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFs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bnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHtUZXh0RmllbGQsIEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBVc2VyIGZyb20gJy4vZGIvdXNlcidcclxuaW1wb3J0IFRleHRGaWVsZHggZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0LWZpZWxkXCJcclxuXHJcbmNvbnN0IEVOVEVSPTEzXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRTSUdOVVA6dXNlcj0+ZGlzcGF0Y2g9PntcclxuXHRcdGNvbnN0IHt1c2VybmFtZSxwYXNzd29yZCxwYXNzd29yZDJ9PXVzZXJcclxuXHRcdGxldCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLHBhc3N3b3JkMkVycm9yXHJcblx0XHRpZighdXNlcm5hbWUpXHJcblx0XHRcdHVzZXJuYW1lRXJyb3I9XCJ1c2VyIG5hbWUgaXMgcmVxdWlyZWRcIlxyXG5cdFx0aWYoIXBhc3N3b3JkKVxyXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxyXG5cclxuXHRcdGlmKHBhc3N3b3JkIT1wYXNzd29yZDIpXHJcblx0XHRcdHBhc3N3b3JkMkVycm9yPVwicGFzc3dvcmQgZG9lc24ndCBtYXRjaFwiXHJcblxyXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yfHxwYXNzd29yZDJFcnJvcilcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHtwYXNzd29yZEVycm9yLCB1c2VybmFtZUVycm9yLHBhc3N3b3JkMkVycm9yfSlcclxuXHJcblx0XHRyZXR1cm4gVXNlci5zaWdudXAoe3VzZXJuYW1lLHBhc3N3b3JkfSlcclxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5Qcm9taXNlLnJlamVjdCh7dXNlcm5hbWVFcnJvcjptZXNzYWdlfSkpXHJcblx0fVxyXG5cdCxTSUdOSU46dXNlcj0+ZGlzcGF0Y2g9PntcclxuXHRcdGNvbnN0IHt1c2VybmFtZSwgcGFzc3dvcmR9PXVzZXJcclxuXHRcdGxldCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yXHJcblx0XHRpZighdXNlcm5hbWUpXHJcblx0XHRcdHVzZXJuYW1lRXJyb3I9XCJ1c2VyIG5hbWUgaXMgcmVxdWlyZWRcIlxyXG5cdFx0aWYoIXBhc3N3b3JkKVxyXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxyXG5cclxuXHRcdGlmKHVzZXJuYW1lRXJyb3IgfHwgcGFzc3dvcmRFcnJvcilcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfSlcclxuXHJcblx0XHRyZXR1cm4gVXNlci5zaWduaW4oe3VzZXJuYW1lLHBhc3N3b3JkfSlcclxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5Qcm9taXNlLnJlamVjdCh7dXNlcm5hbWVFcnJvcjptZXNzYWdlfSkpXHJcblx0fVxyXG5cdCxQSE9ORV9WRVJJRllfUkVRVUVTVDpwaG9uZT0+VXNlci5yZXF1ZXN0VmVyaWZpY2F0aW9uKHBob25lKVxyXG5cclxuXHQsUEhPTkVfVkVSSUZZOihwaG9uZSxjb2RlKT0+ZGlzcGF0Y2g9PlVzZXIudmVyaWZ5UGhvbmUocGhvbmUsY29kZSlcclxuXHJcblx0LEZPUkdFVF9QQVNTV09SRDogY29udGFjdD0+ZGlzcGF0Y2g9PntcclxuXHRcdGlmKCFjb250YWN0KVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJhIHBob25lIG51bWJlciBvciBlbWFpbCBtdXN0IGJlIGdpdmVuIHRvIHJlc2V0IHBhc3N3b3JkXCIpXHJcblxyXG5cdFx0cmV0dXJuIFVzZXIucmVxdWVzdFBhc3N3b3JkUmVzZXQoY29udGFjdClcclxuXHR9XHJcblx0LFJFU0VUX1BBU1NXT1JEOiAob2xkUHdkLCBuZXdQd2QpPT5kaXNwYXRjaD0+VXNlci5yZXNldFBhc3N3b3JkKG9sZFB3ZCwgbmV3UHdkKVxyXG5cclxuXHQsU0lHTlVQX1VJOnt0eXBlOmBTSUdOVVBfVUlgfVxyXG5cdCxTSUdOSU5fVUk6e3R5cGU6YFNJR05JTl9VSWB9XHJcblx0LEZPUkdFVF9QQVNTV09SRF9VSTp7dHlwZTpgRk9SR0VUX1BBU1NXT1JEX1VJYH1cclxuXHQsUkVTRVRfUEFTU1dPUkRfVUk6e3R5cGU6YFJFU0VUX1BBU1NXT1JEX1VJYH1cclxuXHQsUEhPTkVfVkVSSUZZX1VJOih7dHlwZTpgUEhPTkVfVkVSSUZZX1VJYH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2NvdW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXt0eXBlOm51bGx9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRsZXQge3VzZXIsZGlzcGF0Y2gsLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRsZXQge3R5cGV9PXRoaXMuc3RhdGVcclxuXHRcdGlmKCF0eXBlKXtcclxuXHRcdFx0aWYodXNlcilcclxuXHRcdFx0XHR0eXBlPSdTSUdOSU5fVUknXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0eXBlPSdQSE9ORV9WRVJJRllfVUknXHJcblx0XHR9XHJcblxyXG5cdFx0b3RoZXJzLmRpc3BhdGNoPWFjdGlvbj0+e1xyXG5cdFx0XHRzd2l0Y2goYWN0aW9uLnR5cGUpe1xyXG5cdFx0XHRjYXNlIGBTSUdOVVBfVUlgOlxyXG5cdFx0XHRjYXNlIGBTSUdOSU5fVUlgOlxyXG5cdFx0XHRjYXNlIGBGT1JHRVRfUEFTU1dPUkRfVUlgOlxyXG5cdFx0XHRjYXNlIGBSRVNFVF9QQVNTV09SRF9VSWA6XHJcblx0XHRcdGNhc2UgYFBIT05FX1ZFUklGWV9VSWA6XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dHlwZTphY3Rpb24udHlwZX0pXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIGRpc3BhdGNoKGFjdGlvbilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgJ1NJR05VUF9VSSc6XHJcblx0XHRcdHJldHVybiAoPFNpZ251cCB7Li4ub3RoZXJzfSAvPilcclxuXHRcdGNhc2UgJ1NJR05JTl9VSSc6XHJcblx0XHRcdHJldHVybiAoPFNpZ25pbiB7Li4ub3RoZXJzfSB1c2VybmFtZT17dXNlciA/IHVzZXIudXNlcm5hbWUgOiBudWxsfS8+KVxyXG5cdFx0Y2FzZSAnUEhPTkVfVkVSSUZZX1VJJzpcclxuXHRcdFx0cmV0dXJuICg8UGhvbmVWZXJpZmljYXRpb24gey4uLm90aGVyc30vPilcclxuXHRcdGNhc2UgJ0ZPUkdFVF9QQVNTV09SRF9VSSc6XHJcblx0XHRcdHJldHVybiAoPEZvcmdldFBhc3N3b3JkIHsuLi5vdGhlcnN9Lz4pXHJcblx0XHRjYXNlICdSRVNFVF9QQVNTV09SRF9VSSc6XHJcblx0XHRcdHJldHVybiAoPFJlc2V0UGFzc3dvcmQgey4uLm90aGVyc30vPilcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFBob25lVmVyaWZpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtwaG9uZVZlcmlmaWVkRXJyb3I6bnVsbH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtwaG9uZVZlcmlmaWVkRXJyb3J9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cclxuXHRcdGxldCBjb2RlLHBob25lXHJcblxyXG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZKHBob25lLmdldFZhbHVlKCksY29kZS5nZXRWYWx1ZSgpKSlcclxuXHRcdFx0LnRoZW4oYT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUF9VSSksZT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmVWZXJpZmllZEVycm9yOmV9KSlcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJwaG9uZXZlcmlmeVwiPlxyXG5cdFx0XHRcdDxTTVNSZXF1ZXN0IHJlZj17YT0+cGhvbmU9YX0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+XHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvZGU9YX0gaGludFRleHQ9XCJ2ZXJpZmljYXRpb24gY29kZSB5b3UganVzdCByZWNlaXZlZFwiXHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bob25lVmVyaWZpZWRFcnJvcn0vPlxyXG5cdFx0XHRcdDxjZW50ZXI+XHJcblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwidmVyaWZ5XCIgcHJpbWFyeT17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XHJcblx0XHRcdFx0PC9jZW50ZXI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxyXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XHJcblxyXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNpZ251cCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT0ge3VzZXJuYW1lRXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsLCBwYXNzd29yZDJFcnJvcjpudWxsfVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IsIHBhc3N3b3JkMkVycm9yfT10aGlzLnN0YXRlXHJcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHJcblx0XHRsZXQgdXNlcm5hbWUsIHBhc3N3b3JkLCBwYXNzd29yZDJcclxuXHJcblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVAoe1xyXG5cdFx0XHR1c2VybmFtZTp1c2VybmFtZS5nZXRWYWx1ZSgpXHJcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXHJcblx0XHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcclxuXHRcdH0pKS5jYXRjaChlPT50aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30se3VzZXJuYW1lRXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsLCBwYXNzd29yZDJFcnJvcjpudWxsfSxlKSkpXHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbnVwXCI+XHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9XHJcblx0XHRcdFx0XHRoaW50VGV4dD1cImxvZ2luIG5hbWVcIlxyXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxyXG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXt1c2VybmFtZUVycm9yfS8+XHJcblxyXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxyXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxyXG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiIGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn0vPlxyXG5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQyPWF9XHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkIGFnYWluXCIgZXJyb3JUZXh0PXtwYXNzd29yZDJFcnJvcn0vPlxyXG5cclxuXHRcdFx0XHQ8Y2VudGVyPlxyXG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIiBwcmltYXJ5PXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cclxuXHRcdFx0XHQ8L2NlbnRlcj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XHJcblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cclxuXHJcblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgU2lnbmluIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHt1c2VybmFtZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgcmVmVXNlcm5hbWUsIHJlZlBhc3N3b3JkXHJcblxyXG5cdFx0bGV0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTih7XHJcblx0XHRcdHVzZXJuYW1lOnJlZlVzZXJuYW1lLmdldFZhbHVlKClcclxuXHRcdFx0LHBhc3N3b3JkOnJlZlBhc3N3b3JkLmdldFZhbHVlKClcclxuXHRcdH0pKS5jYXRjaChlPT50aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30se3VzZXJuYW1lRXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsfSxlKSkpXHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbmluXCI+XHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlVzZXJuYW1lPWF9XHJcblx0XHRcdFx0XHRoaW50VGV4dD1cImxvZ2luIG5hbWUgb3IgcGhvbmUgbnVtYmVyXCJcclxuXHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dXNlcm5hbWV9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmUGFzc3dvcmQ9YX1cclxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxyXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cclxuXHRcdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cclxuXHRcdFx0XHQ8Y2VudGVyPlxyXG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cclxuXHRcdFx0XHQ8L2NlbnRlcj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XHJcblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cIm5vIGFjY291bnRcIlxyXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfVUkpfS8+XHJcblxyXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxyXG5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBGb3JnZXRQYXNzd29yZCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17Y29udGFjdEVycm9yOm51bGx9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtjb250YWN0RXJyb3J9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBjb250YWN0XHJcblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkQoY29udGFjdC5nZXRWYWx1ZSgpKSlcclxuXHRcdFx0LnRoZW4oYT0+e1xyXG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y29udGFjdEVycm9yOm51bGx9KVxyXG5cdFx0XHRcdFx0YWxlcnQoYHJlc2V0IGVtYWlsL3NtcyBzZW50LCBwbGVhc2UgZm9sbG93IHRoZSBpbnN0cnVjdGlvbiB0byByZXNldCB5b3VyIHBhc3N3b3JkYClcclxuXHRcdFx0XHR9LCBlPT50aGlzLnNldFN0YXRlKHtjb250YWN0RXJyb3I6ZX0pKVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwiZm9yZ2V0UHdkXCI+XHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvbnRhY3Q9YX1cclxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cclxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdGVycm9yVGV4dD17Y29udGFjdEVycm9yfVxyXG5cdFx0XHRcdFx0aGludFRleHQ9XCJwaG9uZSBudW1iZXIgb3IgZW1haWxcIi8+XHJcblxyXG5cdFx0XHRcdDxjZW50ZXI+XHJcblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2VuZCBtZVwiIHByaW1hcnk9e3RydWV9XHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnNlbmQoKX0vPlxyXG5cdFx0XHRcdDwvY2VudGVyPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cclxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XHJcblxyXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCJcclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFJlc2V0UGFzc3dvcmQgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e3Jlc2V0RXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsLCBwYXNzd29yZDJFcnJvcjpudWxsfVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7cmVzZXRFcnJvcn09dGhpcy5zdGF0ZVxyXG5cclxuXHRcdGxldCBvbGRQYXNzd29yZCwgcGFzc3dvcmQsIHBhc3N3b3JkMlxyXG5cdFx0Y29uc3Qgc2VuZD1hPT57XHJcblx0XHRcdGxldCBuZXdQYXNzd29yZD1wYXNzd29yZC5nZXRWYWx1ZSgpXHJcblx0XHRcdGlmKHBhc3N3b3JkMi5nZXRWYWx1ZSgpIT1uZXdQYXNzd29yZCl7XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQyRXJyb3I6XCJwYXNzd29yZCBub3QgbWF0Y2hlZFwifSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKG9sZFBhc3N3b3JkLmdldFZhbHVlKCksIG5ld1Bhc3N3b3JkKSlcclxuXHRcdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtyZXNldEVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH0pLFxyXG5cdFx0XHRcdFx0ZXJyb3I9PnRoaXMuc2V0U3RhdGUoe3Jlc2V0RXJyb3I6ZXJyb3IsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH0pKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInJlc2V0XCI+XHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9Pm9sZFBhc3N3b3JkPWF9IGhpbnRUZXh0PVwib2xkIHBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cclxuXHRcdFx0XHRcdGVycm9yVGV4dD17cmVzZXRFcnJvcn0vPlxyXG5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cclxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cclxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cclxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XHJcblxyXG5cdFx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cGFzc3dvcmQyPWF9XHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bhc3N3b3JkMkVycm9yfVxyXG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XHJcblxyXG5cdFx0XHRcdDxjZW50ZXI+XHJcblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwicmVzZXQgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cclxuXHRcdFx0XHQ8L2NlbnRlcj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XHJcblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxyXG5cclxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNNU1JlcXVlc3QgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e3Bob25lOm51bGwsdGljazpudWxsfVxyXG5cclxuICAgIHRpY2soKXtcclxuICAgICAgICBsZXQgaT02MCwgZG9UaWNrO1xyXG4gICAgICAgIHRoaXMuX3Q9c2V0SW50ZXJ2YWwoZG9UaWNrPSgpPT57XHJcbiAgICAgICAgICAgIGlmKGk9PTApe1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazogMH0pXHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOmktLX0pXHJcbiAgICAgICAgfSwxMDAwKTtcclxuXHJcbiAgICAgICAgZG9UaWNrKClcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIGlmKHRoaXMuX3QpXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7cGhvbmUsIHRpY2t9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IGJ1dHRvbiwgcmVmUGhvbmVcclxuXHRcdGlmKHBob25lKXtcclxuICAgICAgICAgICAgaWYodGljaylcclxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2t9IGRpc2FibGVkPXt0cnVlfS8+KVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aWNrPT09MCA/IFwicmVzZW5kXCIgOiBcInNlbmRcIn1cclxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnRpY2soKVxyXG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9SRVFVRVNUKHJlZlBob25lLmdldFZhbHVlKCkpKVxyXG5cdFx0XHRcdFx0XHRcdH19Lz4pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtc3JlcXVlc3RcIj5cclxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcclxuXHRcdFx0XHRcdHJlZj17YT0+cmVmUGhvbmU9YX1cclxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGhvbmUgbnVtYmVyIChkZWZhdWx0ICs4NilcIlxyXG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyEhdGlja31cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT50aGlzLnNldFN0YXRlKHtwaG9uZTogdGhpcy5pc1Bob25lKHZhbHVlKT8gdmFsdWUgOiBudWxsfSl9Lz5cclxuICAgICAgICAgICAgICAgIHtidXR0b259XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblx0aXNQaG9uZSh2KXtcclxuICAgICAgICByZXR1cm4gKC9eKFxcK1xcZHsyfSk/XFxkezExfSQvZykudGVzdCh2KVxyXG4gICAgfVxyXG5cclxuXHRnZXRWYWx1ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUucGhvbmVcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjY291bnRcclxuIl19