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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ1c2VybmFtZUVycm9yIiwicGFzc3dvcmRFcnJvciIsInBhc3N3b3JkMkVycm9yIiwiUHJvbWlzZSIsInJlamVjdCIsInNpZ251cCIsImNhdGNoIiwibWVzc2FnZSIsIlNJR05JTiIsInNpZ25pbiIsIlBIT05FX1ZFUklGWV9SRVFVRVNUIiwicmVxdWVzdFZlcmlmaWNhdGlvbiIsInBob25lIiwiUEhPTkVfVkVSSUZZIiwiY29kZSIsInZlcmlmeVBob25lIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiUkVTRVRfUEFTU1dPUkQiLCJvbGRQd2QiLCJuZXdQd2QiLCJyZXNldFBhc3N3b3JkIiwiU0lHTlVQX1VJIiwidHlwZSIsIlNJR05JTl9VSSIsIkZPUkdFVF9QQVNTV09SRF9VSSIsIlJFU0VUX1BBU1NXT1JEX1VJIiwiUEhPTkVfVkVSSUZZX1VJIiwiQWNjb3VudCIsInN0YXRlIiwicHJvcHMiLCJkaXNwYXRjaCIsIm90aGVycyIsImFjdGlvbiIsInNldFN0YXRlIiwiUGhvbmVWZXJpZmljYXRpb24iLCJwaG9uZVZlcmlmaWVkRXJyb3IiLCJzZW5kIiwiZ2V0VmFsdWUiLCJ0aGVuIiwiZSIsImEiLCJrZXlDb2RlIiwiU2lnbnVwIiwiT2JqZWN0IiwiYXNzaWduIiwiU2lnbmluIiwicmVmVXNlcm5hbWUiLCJyZWZQYXNzd29yZCIsIkZvcmdldFBhc3N3b3JkIiwiY29udGFjdEVycm9yIiwiYWxlcnQiLCJSZXNldFBhc3N3b3JkIiwicmVzZXRFcnJvciIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJlcnJvciIsIlNNU1JlcXVlc3QiLCJ0aWNrIiwiaSIsImRvVGljayIsIl90Iiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFs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bnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VGV4dEZpZWxkLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQgVXNlciBmcm9tICcuL2RiL3VzZXInXG5pbXBvcnQgVGV4dEZpZWxkeCBmcm9tIFwiLi9jb21wb25lbnRzL3RleHQtZmllbGRcIlxuXG5jb25zdCBFTlRFUj0xM1xuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0U0lHTlVQOnVzZXI9PmRpc3BhdGNoPT57XG5cdFx0Y29uc3Qge3VzZXJuYW1lLHBhc3N3b3JkLHBhc3N3b3JkMn09dXNlclxuXHRcdGxldCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLHBhc3N3b3JkMkVycm9yXG5cdFx0aWYoIXVzZXJuYW1lKVxuXHRcdFx0dXNlcm5hbWVFcnJvcj1cInVzZXIgbmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYoIXBhc3N3b3JkKVxuXHRcdFx0cGFzc3dvcmRFcnJvcj1cInBhc3N3b3JkIGlzIHJlcXVpcmVkXCJcblxuXHRcdGlmKHBhc3N3b3JkIT1wYXNzd29yZDIpXG5cdFx0XHRwYXNzd29yZDJFcnJvcj1cInBhc3N3b3JkIGRvZXNuJ3QgbWF0Y2hcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yfHxwYXNzd29yZDJFcnJvcilcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCh7cGFzc3dvcmRFcnJvciwgdXNlcm5hbWVFcnJvcixwYXNzd29yZDJFcnJvcn0pXG5cblx0XHRyZXR1cm4gVXNlci5zaWdudXAoe3VzZXJuYW1lLHBhc3N3b3JkfSlcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+UHJvbWlzZS5yZWplY3Qoe3VzZXJuYW1lRXJyb3I6bWVzc2FnZX0pKVxuXHR9XG5cdCxTSUdOSU46dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUsIHBhc3N3b3JkfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfSlcblxuXHRcdHJldHVybiBVc2VyLnNpZ25pbih7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5Qcm9taXNlLnJlamVjdCh7dXNlcm5hbWVFcnJvcjptZXNzYWdlfSkpXG5cdH1cblx0LFBIT05FX1ZFUklGWV9SRVFVRVNUOnBob25lPT5Vc2VyLnJlcXVlc3RWZXJpZmljYXRpb24ocGhvbmUpXG5cblx0LFBIT05FX1ZFUklGWToocGhvbmUsY29kZSk9PmRpc3BhdGNoPT5Vc2VyLnZlcmlmeVBob25lKHBob25lLGNvZGUpXG5cblx0LEZPUkdFVF9QQVNTV09SRDogY29udGFjdD0+ZGlzcGF0Y2g9Pntcblx0XHRpZighY29udGFjdClcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChcImEgcGhvbmUgbnVtYmVyIG9yIGVtYWlsIG11c3QgYmUgZ2l2ZW4gdG8gcmVzZXQgcGFzc3dvcmRcIilcblxuXHRcdHJldHVybiBVc2VyLnJlcXVlc3RQYXNzd29yZFJlc2V0KGNvbnRhY3QpXG5cdH1cblx0LFJFU0VUX1BBU1NXT1JEOiAob2xkUHdkLCBuZXdQd2QpPT5kaXNwYXRjaD0+VXNlci5yZXNldFBhc3N3b3JkKG9sZFB3ZCwgbmV3UHdkKVxuXG5cdCxTSUdOVVBfVUk6e3R5cGU6YFNJR05VUF9VSWB9XG5cdCxTSUdOSU5fVUk6e3R5cGU6YFNJR05JTl9VSWB9XG5cdCxGT1JHRVRfUEFTU1dPUkRfVUk6e3R5cGU6YEZPUkdFVF9QQVNTV09SRF9VSWB9XG5cdCxSRVNFVF9QQVNTV09SRF9VSTp7dHlwZTpgUkVTRVRfUEFTU1dPUkRfVUlgfVxuXHQsUEhPTkVfVkVSSUZZX1VJOih7dHlwZTpgUEhPTkVfVkVSSUZZX1VJYH0pXG59XG5cbmV4cG9ydCBjbGFzcyBBY2NvdW50IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17dHlwZTpudWxsfVxuXHRyZW5kZXIoKXtcblx0XHRsZXQge3VzZXIsZGlzcGF0Y2gsLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0bGV0IHt0eXBlfT10aGlzLnN0YXRlXG5cdFx0aWYoIXR5cGUpe1xuXHRcdFx0aWYodXNlcilcblx0XHRcdFx0dHlwZT0nU0lHTklOX1VJJ1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0eXBlPSdQSE9ORV9WRVJJRllfVUknXG5cdFx0fVxuXG5cdFx0b3RoZXJzLmRpc3BhdGNoPWFjdGlvbj0+e1xuXHRcdFx0c3dpdGNoKGFjdGlvbi50eXBlKXtcblx0XHRcdGNhc2UgYFNJR05VUF9VSWA6XG5cdFx0XHRjYXNlIGBTSUdOSU5fVUlgOlxuXHRcdFx0Y2FzZSBgRk9SR0VUX1BBU1NXT1JEX1VJYDpcblx0XHRcdGNhc2UgYFJFU0VUX1BBU1NXT1JEX1VJYDpcblx0XHRcdGNhc2UgYFBIT05FX1ZFUklGWV9VSWA6XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3R5cGU6YWN0aW9uLnR5cGV9KVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGRpc3BhdGNoKGFjdGlvbilcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSAnU0lHTlVQX1VJJzpcblx0XHRcdHJldHVybiAoPFNpZ251cCB7Li4ub3RoZXJzfSAvPilcblx0XHRjYXNlICdTSUdOSU5fVUknOlxuXHRcdFx0cmV0dXJuICg8U2lnbmluIHsuLi5vdGhlcnN9IHVzZXJuYW1lPXt1c2VyID8gdXNlci51c2VybmFtZSA6IG51bGx9Lz4pXG5cdFx0Y2FzZSAnUEhPTkVfVkVSSUZZX1VJJzpcblx0XHRcdHJldHVybiAoPFBob25lVmVyaWZpY2F0aW9uIHsuLi5vdGhlcnN9Lz4pXG5cdFx0Y2FzZSAnRk9SR0VUX1BBU1NXT1JEX1VJJzpcblx0XHRcdHJldHVybiAoPEZvcmdldFBhc3N3b3JkIHsuLi5vdGhlcnN9Lz4pXG5cdFx0Y2FzZSAnUkVTRVRfUEFTU1dPUkRfVUknOlxuXHRcdFx0cmV0dXJuICg8UmVzZXRQYXNzd29yZCB7Li4ub3RoZXJzfS8+KVxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBQaG9uZVZlcmlmaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Bob25lVmVyaWZpZWRFcnJvcjpudWxsfVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7cGhvbmVWZXJpZmllZEVycm9yfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cblx0XHRsZXQgY29kZSxwaG9uZVxuXG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZKHBob25lLmdldFZhbHVlKCksY29kZS5nZXRWYWx1ZSgpKSlcblx0XHRcdC50aGVuKGE9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVBfVUkpLGU9PnRoaXMuc2V0U3RhdGUoe3Bob25lVmVyaWZpZWRFcnJvcjplfSkpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicGhvbmV2ZXJpZnlcIj5cblx0XHRcdFx0PFNNU1JlcXVlc3QgcmVmPXthPT5waG9uZT1hfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvZGU9YX0gaGludFRleHQ9XCJ2ZXJpZmljYXRpb24gY29kZSB5b3UganVzdCByZWNlaXZlZFwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bob25lVmVyaWZpZWRFcnJvcn0vPlxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJ2ZXJpZnlcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgU2lnbnVwIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT0ge3VzZXJuYW1lRXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsLCBwYXNzd29yZDJFcnJvcjpudWxsfVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvciwgcGFzc3dvcmQyRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblxuXHRcdGxldCB1c2VybmFtZSwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQKHtcblx0XHRcdHVzZXJuYW1lOnVzZXJuYW1lLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQyOnBhc3N3b3JkMi5nZXRWYWx1ZSgpXG5cdFx0fSkpLmNhdGNoKGU9PnRoaXMuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSx7dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9LGUpKSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWdudXBcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJsb2dpbiBuYW1lXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiIGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIiBlcnJvclRleHQ9e3Bhc3N3b3JkMkVycm9yfS8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5jbGFzcyBTaWduaW4gZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3VzZXJuYW1lLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfT10aGlzLnN0YXRlXG5cdFx0bGV0IHJlZlVzZXJuYW1lLCByZWZQYXNzd29yZFxuXG5cdFx0bGV0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTih7XG5cdFx0XHR1c2VybmFtZTpyZWZVc2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cmVmUGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdH0pKS5jYXRjaChlPT50aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30se3VzZXJuYW1lRXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsfSxlKSkpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbmluXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVc2VybmFtZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwibG9naW4gbmFtZSBvciBwaG9uZSBudW1iZXJcIlxuXHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dXNlcm5hbWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cblx0XHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJubyBhY2NvdW50XCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgRm9yZ2V0UGFzc3dvcmQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtjb250YWN0RXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge2NvbnRhY3RFcnJvcn09dGhpcy5zdGF0ZVxuXHRcdGxldCBjb250YWN0XG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEKGNvbnRhY3QuZ2V0VmFsdWUoKSkpXG5cdFx0XHQudGhlbihhPT57XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y29udGFjdEVycm9yOm51bGx9KVxuXHRcdFx0XHRcdGFsZXJ0KGByZXNldCBlbWFpbC9zbXMgc2VudCwgcGxlYXNlIGZvbGxvdyB0aGUgaW5zdHJ1Y3Rpb24gdG8gcmVzZXQgeW91ciBwYXNzd29yZGApXG5cdFx0XHRcdH0sIGU9PnRoaXMuc2V0U3RhdGUoe2NvbnRhY3RFcnJvcjplfSkpXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cImZvcmdldFB3ZFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+Y29udGFjdD1hfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtjb250YWN0RXJyb3J9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJwaG9uZSBudW1iZXIgb3IgZW1haWxcIi8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2VuZCBtZVwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG59XG5cbmNsYXNzIFJlc2V0UGFzc3dvcmQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtyZXNldEVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3Jlc2V0RXJyb3J9PXRoaXMuc3RhdGVcblxuXHRcdGxldCBvbGRQYXNzd29yZCwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXHRcdGNvbnN0IHNlbmQ9YT0+e1xuXHRcdFx0bGV0IG5ld1Bhc3N3b3JkPXBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdGlmKHBhc3N3b3JkMi5nZXRWYWx1ZSgpIT1uZXdQYXNzd29yZCl7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkMkVycm9yOlwicGFzc3dvcmQgbm90IG1hdGNoZWRcIn0pXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQob2xkUGFzc3dvcmQuZ2V0VmFsdWUoKSwgbmV3UGFzc3dvcmQpKVxuXHRcdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtyZXNldEVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH0pLFxuXHRcdFx0XHRcdGVycm9yPT50aGlzLnNldFN0YXRlKHtyZXNldEVycm9yOmVycm9yLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9KSlcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicmVzZXRcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9Pm9sZFBhc3N3b3JkPWF9IGhpbnRUZXh0PVwib2xkIHBhc3N3b3JkXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17cmVzZXRFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cblx0XHRcdFx0PFRleHRGaWVsZHggcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17cGFzc3dvcmQyRXJyb3J9XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCJcblx0XHRcdFx0XHRoaW50VGV4dD1cInBhc3N3b3JkIGFnYWluXCIvPlxuXG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInJlc2V0IHBhc3N3b3JkXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnNlbmQoKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0fVxufVxuXG5jbGFzcyBTTVNSZXF1ZXN0IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17cGhvbmU6bnVsbCx0aWNrOm51bGx9XG5cbiAgICB0aWNrKCl7XG4gICAgICAgIGxldCBpPTYwLCBkb1RpY2s7XG4gICAgICAgIHRoaXMuX3Q9c2V0SW50ZXJ2YWwoZG9UaWNrPSgpPT57XG4gICAgICAgICAgICBpZihpPT0wKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazogMH0pXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6aS0tfSlcbiAgICAgICAgfSwxMDAwKTtcblxuICAgICAgICBkb1RpY2soKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGlmKHRoaXMuX3QpXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtwaG9uZSwgdGlja309dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGxldCBidXR0b24sIHJlZlBob25lXG5cdFx0aWYocGhvbmUpe1xuICAgICAgICAgICAgaWYodGljaylcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aWNrfSBkaXNhYmxlZD17dHJ1ZX0vPilcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aWNrPT09MCA/IFwicmVzZW5kXCIgOiBcInNlbmRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudGljaygpXG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9SRVFVRVNUKHJlZlBob25lLmdldFZhbHVlKCkpKVxuXHRcdFx0XHRcdFx0XHR9fS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic21zcmVxdWVzdFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcblx0XHRcdFx0XHRyZWY9e2E9PnJlZlBob25lPWF9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJwaG9uZSBudW1iZXIgKGRlZmF1bHQgKzg2KVwiXG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyEhdGlja31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmU6IHRoaXMuaXNQaG9uZSh2YWx1ZSk/IHZhbHVlIDogbnVsbH0pfS8+XG4gICAgICAgICAgICAgICAge2J1dHRvbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG5cdGlzUGhvbmUodil7XG4gICAgICAgIHJldHVybiAoL14oXFwrXFxkezJ9KT9cXGR7MTF9JC9nKS50ZXN0KHYpXG4gICAgfVxuXG5cdGdldFZhbHVlKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUucGhvbmVcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50XG4iXX0=