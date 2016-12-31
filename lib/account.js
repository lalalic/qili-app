'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ACTION = undefined;

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

var Account = function (_Component) {
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

exports.default = Object.assign((0, _reactRedux.connect)()(Account));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ1c2VybmFtZUVycm9yIiwicGFzc3dvcmRFcnJvciIsInBhc3N3b3JkMkVycm9yIiwiUHJvbWlzZSIsInJlamVjdCIsInNpZ251cCIsImNhdGNoIiwibWVzc2FnZSIsIlNJR05JTiIsInNpZ25pbiIsIlBIT05FX1ZFUklGWV9SRVFVRVNUIiwicmVxdWVzdFZlcmlmaWNhdGlvbiIsInBob25lIiwiUEhPTkVfVkVSSUZZIiwiY29kZSIsInZlcmlmeVBob25lIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiUkVTRVRfUEFTU1dPUkQiLCJvbGRQd2QiLCJuZXdQd2QiLCJyZXNldFBhc3N3b3JkIiwiU0lHTlVQX1VJIiwidHlwZSIsIlNJR05JTl9VSSIsIkZPUkdFVF9QQVNTV09SRF9VSSIsIlJFU0VUX1BBU1NXT1JEX1VJIiwiUEhPTkVfVkVSSUZZX1VJIiwiQWNjb3VudCIsInN0YXRlIiwicHJvcHMiLCJkaXNwYXRjaCIsIm90aGVycyIsImFjdGlvbiIsInNldFN0YXRlIiwiUGhvbmVWZXJpZmljYXRpb24iLCJwaG9uZVZlcmlmaWVkRXJyb3IiLCJzZW5kIiwiZ2V0VmFsdWUiLCJ0aGVuIiwiZSIsImEiLCJrZXlDb2RlIiwiU2lnbnVwIiwiT2JqZWN0IiwiYXNzaWduIiwiU2lnbmluIiwicmVmVXNlcm5hbWUiLCJyZWZQYXNzd29yZCIsIkZvcmdldFBhc3N3b3JkIiwiY29udGFjdEVycm9yIiwiYWxlcnQiLCJSZXNldFBhc3N3b3JkIiwicmVzZXRFcnJvciIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJlcnJvciIsIlNNU1JlcXVlc3QiLCJ0aWNrIiwiaSIsImRvVGljayIsIl90Iiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFs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ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtUZXh0RmllbGQsIEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCBVc2VyIGZyb20gJy4vZGIvdXNlcidcbmltcG9ydCBUZXh0RmllbGR4IGZyb20gXCIuL2NvbXBvbmVudHMvdGV4dC1maWVsZFwiXG5cbmNvbnN0IEVOVEVSPTEzXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRTSUdOVVA6dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUscGFzc3dvcmQscGFzc3dvcmQyfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IscGFzc3dvcmQyRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYocGFzc3dvcmQhPXBhc3N3b3JkMilcblx0XHRcdHBhc3N3b3JkMkVycm9yPVwicGFzc3dvcmQgZG9lc24ndCBtYXRjaFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3J8fHBhc3N3b3JkMkVycm9yKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHtwYXNzd29yZEVycm9yLCB1c2VybmFtZUVycm9yLHBhc3N3b3JkMkVycm9yfSlcblxuXHRcdHJldHVybiBVc2VyLnNpZ251cCh7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5Qcm9taXNlLnJlamVjdCh7dXNlcm5hbWVFcnJvcjptZXNzYWdlfSkpXG5cdH1cblx0LFNJR05JTjp1c2VyPT5kaXNwYXRjaD0+e1xuXHRcdGNvbnN0IHt1c2VybmFtZSwgcGFzc3dvcmR9PXVzZXJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvclxuXHRcdGlmKCF1c2VybmFtZSlcblx0XHRcdHVzZXJuYW1lRXJyb3I9XCJ1c2VyIG5hbWUgaXMgcmVxdWlyZWRcIlxuXHRcdGlmKCFwYXNzd29yZClcblx0XHRcdHBhc3N3b3JkRXJyb3I9XCJwYXNzd29yZCBpcyByZXF1aXJlZFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3IpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3Qoe3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3J9KVxuXG5cdFx0cmV0dXJuIFVzZXIuc2lnbmluKHt1c2VybmFtZSxwYXNzd29yZH0pXG5cdFx0XHQuY2F0Y2goKHttZXNzYWdlfSk9PlByb21pc2UucmVqZWN0KHt1c2VybmFtZUVycm9yOm1lc3NhZ2V9KSlcblx0fVxuXHQsUEhPTkVfVkVSSUZZX1JFUVVFU1Q6cGhvbmU9PlVzZXIucmVxdWVzdFZlcmlmaWNhdGlvbihwaG9uZSlcblx0XG5cdCxQSE9ORV9WRVJJRlk6KHBob25lLGNvZGUpPT5kaXNwYXRjaD0+VXNlci52ZXJpZnlQaG9uZShwaG9uZSxjb2RlKVxuXG5cdCxGT1JHRVRfUEFTU1dPUkQ6IGNvbnRhY3Q9PmRpc3BhdGNoPT57XG5cdFx0aWYoIWNvbnRhY3QpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJhIHBob25lIG51bWJlciBvciBlbWFpbCBtdXN0IGJlIGdpdmVuIHRvIHJlc2V0IHBhc3N3b3JkXCIpXG5cblx0XHRyZXR1cm4gVXNlci5yZXF1ZXN0UGFzc3dvcmRSZXNldChjb250YWN0KVxuXHR9XG5cdCxSRVNFVF9QQVNTV09SRDogKG9sZFB3ZCwgbmV3UHdkKT0+ZGlzcGF0Y2g9PlVzZXIucmVzZXRQYXNzd29yZChvbGRQd2QsIG5ld1B3ZCkgXG5cblx0LFNJR05VUF9VSTp7dHlwZTpgU0lHTlVQX1VJYH1cblx0LFNJR05JTl9VSTp7dHlwZTpgU0lHTklOX1VJYH1cblx0LEZPUkdFVF9QQVNTV09SRF9VSTp7dHlwZTpgRk9SR0VUX1BBU1NXT1JEX1VJYH1cblx0LFJFU0VUX1BBU1NXT1JEX1VJOnt0eXBlOmBSRVNFVF9QQVNTV09SRF9VSWB9XG5cdCxQSE9ORV9WRVJJRllfVUk6KHt0eXBlOmBQSE9ORV9WRVJJRllfVUlgfSlcbn1cblxuY2xhc3MgQWNjb3VudCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3R5cGU6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHt1c2VyLGRpc3BhdGNoLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGxldCB7dHlwZX09dGhpcy5zdGF0ZVxuXHRcdGlmKCF0eXBlKXtcblx0XHRcdGlmKHVzZXIpXG5cdFx0XHRcdHR5cGU9J1NJR05JTl9VSSdcblx0XHRcdGVsc2Vcblx0XHRcdFx0dHlwZT0nUEhPTkVfVkVSSUZZX1VJJ1xuXHRcdH1cblx0XHRcblx0XHRvdGhlcnMuZGlzcGF0Y2g9YWN0aW9uPT57XG5cdFx0XHRzd2l0Y2goYWN0aW9uLnR5cGUpe1xuXHRcdFx0Y2FzZSBgU0lHTlVQX1VJYDpcblx0XHRcdGNhc2UgYFNJR05JTl9VSWA6XG5cdFx0XHRjYXNlIGBGT1JHRVRfUEFTU1dPUkRfVUlgOlxuXHRcdFx0Y2FzZSBgUkVTRVRfUEFTU1dPUkRfVUlgOlxuXHRcdFx0Y2FzZSBgUEhPTkVfVkVSSUZZX1VJYDpcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7dHlwZTphY3Rpb24udHlwZX0pXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gZGlzcGF0Y2goYWN0aW9uKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlICdTSUdOVVBfVUknOlxuXHRcdFx0cmV0dXJuICg8U2lnbnVwIHsuLi5vdGhlcnN9IC8+KVxuXHRcdGNhc2UgJ1NJR05JTl9VSSc6XG5cdFx0XHRyZXR1cm4gKDxTaWduaW4gey4uLm90aGVyc30gdXNlcm5hbWU9e3VzZXIgPyB1c2VyLnVzZXJuYW1lIDogbnVsbH0vPilcblx0XHRjYXNlICdQSE9ORV9WRVJJRllfVUknOlxuXHRcdFx0cmV0dXJuICg8UGhvbmVWZXJpZmljYXRpb24gey4uLm90aGVyc30vPilcblx0XHRjYXNlICdGT1JHRVRfUEFTU1dPUkRfVUknOlxuXHRcdFx0cmV0dXJuICg8Rm9yZ2V0UGFzc3dvcmQgey4uLm90aGVyc30vPilcblx0XHRjYXNlICdSRVNFVF9QQVNTV09SRF9VSSc6XG5cdFx0XHRyZXR1cm4gKDxSZXNldFBhc3N3b3JkIHsuLi5vdGhlcnN9Lz4pXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIFBob25lVmVyaWZpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17cGhvbmVWZXJpZmllZEVycm9yOm51bGx9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtwaG9uZVZlcmlmaWVkRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRcblx0XHRsZXQgY29kZSxwaG9uZVxuXHRcdFxuXHRcdGNvbnN0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWShwaG9uZS5nZXRWYWx1ZSgpLGNvZGUuZ2V0VmFsdWUoKSkpXG5cdFx0XHQudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQX1VJKSxlPT50aGlzLnNldFN0YXRlKHtwaG9uZVZlcmlmaWVkRXJyb3I6ZX0pKVxuXHRcdFx0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInBob25ldmVyaWZ5XCI+XG5cdFx0XHRcdDxTTVNSZXF1ZXN0IHJlZj17YT0+cGhvbmU9YX0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5jb2RlPWF9IGhpbnRUZXh0PVwidmVyaWZpY2F0aW9uIGNvZGUgeW91IGp1c3QgcmVjZWl2ZWRcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtwaG9uZVZlcmlmaWVkRXJyb3J9Lz5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwidmVyaWZ5XCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnNlbmQoKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiYWxyZWFkeSBoYXZlIGFuIGFjY291bnRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cbmNsYXNzIFNpZ251cCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9IHt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XHRcblx0XHRjb25zdCB7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvciwgcGFzc3dvcmQyRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRcblx0XHRsZXQgdXNlcm5hbWUsIHBhc3N3b3JkLCBwYXNzd29yZDJcblx0XHRcblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVAoe1xuXHRcdFx0dXNlcm5hbWU6dXNlcm5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcblx0XHR9KSkuY2F0Y2goZT0+dGhpcy5zZXRTdGF0ZShPYmplY3QuYXNzaWduKHt9LHt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH0sZSkpKVxuXHRcdFx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbnVwXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT51c2VybmFtZT1hfSBcblx0XHRcdFx0XHRoaW50VGV4dD1cImxvZ2luIG5hbWVcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXt1c2VybmFtZUVycm9yfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIgZXJyb3JUZXh0PXtwYXNzd29yZEVycm9yfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkMj1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiIGVycm9yVGV4dD17cGFzc3dvcmQyRXJyb3J9Lz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnNlbmQoKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiYWxyZWFkeSBoYXZlIGFuIGFjY291bnRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cbmNsYXNzIFNpZ25pbiBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3VzZXJuYW1lRXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsfVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7dXNlcm5hbWUsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRsZXQgcmVmVXNlcm5hbWUsIHJlZlBhc3N3b3JkXG5cblx0XHRsZXQgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOKHtcblx0XHRcdHVzZXJuYW1lOnJlZlVzZXJuYW1lLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpyZWZQYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0fSkpLmNhdGNoKGU9PnRoaXMuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSx7dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGx9LGUpKSlcblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbmluXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVc2VybmFtZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwibG9naW4gbmFtZSBvciBwaG9uZSBudW1iZXJcIlxuXHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dXNlcm5hbWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cblx0XHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJubyBhY2NvdW50XCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgRm9yZ2V0UGFzc3dvcmQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtjb250YWN0RXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge2NvbnRhY3RFcnJvcn09dGhpcy5zdGF0ZVxuXHRcdGxldCBjb250YWN0XG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEKGNvbnRhY3QuZ2V0VmFsdWUoKSkpXG5cdFx0XHQudGhlbihhPT57XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y29udGFjdEVycm9yOm51bGx9KVxuXHRcdFx0XHRcdGFsZXJ0KGByZXNldCBlbWFpbC9zbXMgc2VudCwgcGxlYXNlIGZvbGxvdyB0aGUgaW5zdHJ1Y3Rpb24gdG8gcmVzZXQgeW91ciBwYXNzd29yZGApXG5cdFx0XHRcdH0sIGU9PnRoaXMuc2V0U3RhdGUoe2NvbnRhY3RFcnJvcjplfSkpXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cImZvcmdldFB3ZFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+Y29udGFjdD1hfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IFxuXHRcdFx0XHRcdGVycm9yVGV4dD17Y29udGFjdEVycm9yfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGhvbmUgbnVtYmVyIG9yIGVtYWlsXCIvPlxuXG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNlbmQgbWVcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0fVxufVxuXG5jbGFzcyBSZXNldFBhc3N3b3JkIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17cmVzZXRFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyZXNldEVycm9yfT10aGlzLnN0YXRlXG5cdFx0XG5cdFx0bGV0IG9sZFBhc3N3b3JkLCBwYXNzd29yZCwgcGFzc3dvcmQyXG5cdFx0Y29uc3Qgc2VuZD1hPT57XG5cdFx0XHRsZXQgbmV3UGFzc3dvcmQ9cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdFx0aWYocGFzc3dvcmQyLmdldFZhbHVlKCkhPW5ld1Bhc3N3b3JkKXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQyRXJyb3I6XCJwYXNzd29yZCBub3QgbWF0Y2hlZFwifSlcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRChvbGRQYXNzd29yZC5nZXRWYWx1ZSgpLCBuZXdQYXNzd29yZCkpXG5cdFx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe3Jlc2V0RXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsLCBwYXNzd29yZDJFcnJvcjpudWxsfSksXG5cdFx0XHRcdFx0ZXJyb3I9PnRoaXMuc2V0U3RhdGUoe3Jlc2V0RXJyb3I6ZXJyb3IsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH0pKVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicmVzZXRcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9Pm9sZFBhc3N3b3JkPWF9IGhpbnRUZXh0PVwib2xkIHBhc3N3b3JkXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17cmVzZXRFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cblx0XHRcdFx0PFRleHRGaWVsZHggcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17cGFzc3dvcmQyRXJyb3J9XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgXG5cdFx0XHRcdFx0aGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiLz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJyZXNldCBwYXNzd29yZFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdH1cbn1cblxuY2xhc3MgU01TUmVxdWVzdCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Bob25lOm51bGwsdGljazpudWxsfVxuXG4gICAgdGljaygpe1xuICAgICAgICBsZXQgaT02MCwgZG9UaWNrO1xuICAgICAgICB0aGlzLl90PXNldEludGVydmFsKGRvVGljaz0oKT0+e1xuICAgICAgICAgICAgaWYoaT09MCl7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6IDB9KVxuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOmktLX0pXG4gICAgICAgIH0sMTAwMCk7XG5cbiAgICAgICAgZG9UaWNrKClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICBpZih0aGlzLl90KVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7cGhvbmUsIHRpY2t9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRsZXQgYnV0dG9uLCByZWZQaG9uZVxuXHRcdGlmKHBob25lKXtcbiAgICAgICAgICAgIGlmKHRpY2spXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGlja30gZGlzYWJsZWQ9e3RydWV9Lz4pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGljaz09PTAgPyBcInJlc2VuZFwiIDogXCJzZW5kXCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnRpY2soKVxuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfUkVRVUVTVChyZWZQaG9uZS5nZXRWYWx1ZSgpKSlcblx0XHRcdFx0XHRcdFx0fX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtc3JlcXVlc3RcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG5cdFx0XHRcdFx0cmVmPXthPT5yZWZQaG9uZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGhvbmUgbnVtYmVyIChkZWZhdWx0ICs4NilcIlxuXHRcdFx0XHRcdGRpc2FibGVkPXshIXRpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnRoaXMuc2V0U3RhdGUoe3Bob25lOiB0aGlzLmlzUGhvbmUodmFsdWUpPyB2YWx1ZSA6IG51bGx9KX0vPlxuICAgICAgICAgICAgICAgIHtidXR0b259XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuXHRpc1Bob25lKHYpe1xuICAgICAgICByZXR1cm4gKC9eKFxcK1xcZHsyfSk/XFxkezExfSQvZykudGVzdCh2KVxuICAgIH1cblxuXHRnZXRWYWx1ZSgpe1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLnBob25lXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihjb25uZWN0KCkoQWNjb3VudCkpXG4iXX0=