'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ACTION = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _reactRedux = require('react-redux');

var _user = require('./db/user');

var _user2 = _interopRequireDefault(_user);

var _textField = require('./components/text-field');

var _textField2 = _interopRequireDefault(_textField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

			if (usernameError || passwordError || password2Error) return _promise2.default.reject({ passwordError: passwordError, usernameError: usernameError, password2Error: password2Error });

			return _user2.default.signup({ username: username, password: password }).catch(function (_ref) {
				var message = _ref.message;
				return _promise2.default.reject({ usernameError: message });
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

			if (usernameError || passwordError) return _promise2.default.reject({ usernameError: usernameError, passwordError: passwordError });

			return _user2.default.signin({ username: username, password: password }).catch(function (_ref2) {
				var message = _ref2.message;
				return _promise2.default.reject({ usernameError: message });
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
			if (!contact) return _promise2.default.reject("a phone number or email must be given to reset password");

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
	(0, _inherits3.default)(Account, _Component);

	function Account() {
		var _ref3;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Account);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref3 = Account.__proto__ || (0, _getPrototypeOf2.default)(Account)).call.apply(_ref3, [this].concat(args))), _this), _this.state = { type: null }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(Account, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    user = _props.user,
			    dispatch = _props.dispatch,
			    others = (0, _objectWithoutProperties3.default)(_props, ['user', 'dispatch']);
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
					return _react2.default.createElement(Signin, (0, _extends3.default)({}, others, { username: user ? user.username : null }));
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
	(0, _inherits3.default)(PhoneVerification, _Component2);

	function PhoneVerification() {
		var _ref4;

		var _temp2, _this3, _ret2;

		(0, _classCallCheck3.default)(this, PhoneVerification);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref4 = PhoneVerification.__proto__ || (0, _getPrototypeOf2.default)(PhoneVerification)).call.apply(_ref4, [this].concat(args))), _this3), _this3.state = { phoneVerifiedError: null }, _temp2), (0, _possibleConstructorReturn3.default)(_this3, _ret2);
	}

	(0, _createClass3.default)(PhoneVerification, [{
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
	(0, _inherits3.default)(Signup, _Component3);

	function Signup() {
		var _ref5;

		var _temp3, _this5, _ret3;

		(0, _classCallCheck3.default)(this, Signup);

		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		return _ret3 = (_temp3 = (_this5 = (0, _possibleConstructorReturn3.default)(this, (_ref5 = Signup.__proto__ || (0, _getPrototypeOf2.default)(Signup)).call.apply(_ref5, [this].concat(args))), _this5), _this5.state = { usernameError: null, passwordError: null, password2Error: null }, _temp3), (0, _possibleConstructorReturn3.default)(_this5, _ret3);
	}

	(0, _createClass3.default)(Signup, [{
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
					return _this6.setState((0, _assign2.default)({}, { usernameError: null, passwordError: null, password2Error: null }, e));
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
	(0, _inherits3.default)(Signin, _Component4);

	function Signin() {
		var _ref6;

		var _temp4, _this7, _ret4;

		(0, _classCallCheck3.default)(this, Signin);

		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		return _ret4 = (_temp4 = (_this7 = (0, _possibleConstructorReturn3.default)(this, (_ref6 = Signin.__proto__ || (0, _getPrototypeOf2.default)(Signin)).call.apply(_ref6, [this].concat(args))), _this7), _this7.state = { usernameError: null, passwordError: null }, _temp4), (0, _possibleConstructorReturn3.default)(_this7, _ret4);
	}

	(0, _createClass3.default)(Signin, [{
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
					return _this8.setState((0, _assign2.default)({}, { usernameError: null, passwordError: null }, e));
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
	(0, _inherits3.default)(ForgetPassword, _Component5);

	function ForgetPassword() {
		var _ref7;

		var _temp5, _this9, _ret5;

		(0, _classCallCheck3.default)(this, ForgetPassword);

		for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			args[_key5] = arguments[_key5];
		}

		return _ret5 = (_temp5 = (_this9 = (0, _possibleConstructorReturn3.default)(this, (_ref7 = ForgetPassword.__proto__ || (0, _getPrototypeOf2.default)(ForgetPassword)).call.apply(_ref7, [this].concat(args))), _this9), _this9.state = { contactError: null }, _temp5), (0, _possibleConstructorReturn3.default)(_this9, _ret5);
	}

	(0, _createClass3.default)(ForgetPassword, [{
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
	(0, _inherits3.default)(ResetPassword, _Component6);

	function ResetPassword() {
		var _ref8;

		var _temp6, _this11, _ret6;

		(0, _classCallCheck3.default)(this, ResetPassword);

		for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
			args[_key6] = arguments[_key6];
		}

		return _ret6 = (_temp6 = (_this11 = (0, _possibleConstructorReturn3.default)(this, (_ref8 = ResetPassword.__proto__ || (0, _getPrototypeOf2.default)(ResetPassword)).call.apply(_ref8, [this].concat(args))), _this11), _this11.state = { resetError: null, passwordError: null, password2Error: null }, _temp6), (0, _possibleConstructorReturn3.default)(_this11, _ret6);
	}

	(0, _createClass3.default)(ResetPassword, [{
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
	(0, _inherits3.default)(SMSRequest, _Component7);

	function SMSRequest() {
		var _ref9;

		var _temp7, _this13, _ret7;

		(0, _classCallCheck3.default)(this, SMSRequest);

		for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
			args[_key7] = arguments[_key7];
		}

		return _ret7 = (_temp7 = (_this13 = (0, _possibleConstructorReturn3.default)(this, (_ref9 = SMSRequest.__proto__ || (0, _getPrototypeOf2.default)(SMSRequest)).call.apply(_ref9, [this].concat(args))), _this13), _this13.state = { phone: null, tick: null }, _temp7), (0, _possibleConstructorReturn3.default)(_this13, _ret7);
	}

	(0, _createClass3.default)(SMSRequest, [{
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

exports.default = (0, _assign2.default)((0, _reactRedux.connect)()(Account));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ1c2VybmFtZUVycm9yIiwicGFzc3dvcmRFcnJvciIsInBhc3N3b3JkMkVycm9yIiwicmVqZWN0Iiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfVkVSSUZZX1JFUVVFU1QiLCJyZXF1ZXN0VmVyaWZpY2F0aW9uIiwicGhvbmUiLCJQSE9ORV9WRVJJRlkiLCJjb2RlIiwidmVyaWZ5UGhvbmUiLCJGT1JHRVRfUEFTU1dPUkQiLCJjb250YWN0IiwicmVxdWVzdFBhc3N3b3JkUmVzZXQiLCJSRVNFVF9QQVNTV09SRCIsIm9sZFB3ZCIsIm5ld1B3ZCIsInJlc2V0UGFzc3dvcmQiLCJTSUdOVVBfVUkiLCJ0eXBlIiwiU0lHTklOX1VJIiwiRk9SR0VUX1BBU1NXT1JEX1VJIiwiUkVTRVRfUEFTU1dPUkRfVUkiLCJQSE9ORV9WRVJJRllfVUkiLCJBY2NvdW50Iiwic3RhdGUiLCJwcm9wcyIsImRpc3BhdGNoIiwib3RoZXJzIiwiYWN0aW9uIiwic2V0U3RhdGUiLCJQaG9uZVZlcmlmaWNhdGlvbiIsInBob25lVmVyaWZpZWRFcnJvciIsInNlbmQiLCJnZXRWYWx1ZSIsInRoZW4iLCJlIiwiYSIsImtleUNvZGUiLCJTaWdudXAiLCJTaWduaW4iLCJyZWZVc2VybmFtZSIsInJlZlBhc3N3b3JkIiwiRm9yZ2V0UGFzc3dvcmQiLCJjb250YWN0RXJyb3IiLCJhbGVydCIsIlJlc2V0UGFzc3dvcmQiLCJyZXNldEVycm9yIiwib2xkUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImVycm9yIiwiU01TUmVxdWVzdCIsInRpY2siLCJpIiwiZG9UaWNrIiwiX3QiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJidXR0b24iLCJyZWZQaG9uZSIsInZhbHVl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fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VGV4dEZpZWxkLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQgVXNlciBmcm9tICcuL2RiL3VzZXInXG5pbXBvcnQgVGV4dEZpZWxkeCBmcm9tIFwiLi9jb21wb25lbnRzL3RleHQtZmllbGRcIlxuXG5jb25zdCBFTlRFUj0xM1xuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0U0lHTlVQOnVzZXI9PmRpc3BhdGNoPT57XG5cdFx0Y29uc3Qge3VzZXJuYW1lLHBhc3N3b3JkLHBhc3N3b3JkMn09dXNlclxuXHRcdGxldCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLHBhc3N3b3JkMkVycm9yXG5cdFx0aWYoIXVzZXJuYW1lKVxuXHRcdFx0dXNlcm5hbWVFcnJvcj1cInVzZXIgbmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYoIXBhc3N3b3JkKVxuXHRcdFx0cGFzc3dvcmRFcnJvcj1cInBhc3N3b3JkIGlzIHJlcXVpcmVkXCJcblxuXHRcdGlmKHBhc3N3b3JkIT1wYXNzd29yZDIpXG5cdFx0XHRwYXNzd29yZDJFcnJvcj1cInBhc3N3b3JkIGRvZXNuJ3QgbWF0Y2hcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yfHxwYXNzd29yZDJFcnJvcilcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCh7cGFzc3dvcmRFcnJvciwgdXNlcm5hbWVFcnJvcixwYXNzd29yZDJFcnJvcn0pXG5cblx0XHRyZXR1cm4gVXNlci5zaWdudXAoe3VzZXJuYW1lLHBhc3N3b3JkfSlcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+UHJvbWlzZS5yZWplY3Qoe3VzZXJuYW1lRXJyb3I6bWVzc2FnZX0pKVxuXHR9XG5cdCxTSUdOSU46dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUsIHBhc3N3b3JkfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfSlcblxuXHRcdHJldHVybiBVc2VyLnNpZ25pbih7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5Qcm9taXNlLnJlamVjdCh7dXNlcm5hbWVFcnJvcjptZXNzYWdlfSkpXG5cdH1cblx0LFBIT05FX1ZFUklGWV9SRVFVRVNUOnBob25lPT5Vc2VyLnJlcXVlc3RWZXJpZmljYXRpb24ocGhvbmUpXG5cdFxuXHQsUEhPTkVfVkVSSUZZOihwaG9uZSxjb2RlKT0+ZGlzcGF0Y2g9PlVzZXIudmVyaWZ5UGhvbmUocGhvbmUsY29kZSlcblxuXHQsRk9SR0VUX1BBU1NXT1JEOiBjb250YWN0PT5kaXNwYXRjaD0+e1xuXHRcdGlmKCFjb250YWN0KVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwiYSBwaG9uZSBudW1iZXIgb3IgZW1haWwgbXVzdCBiZSBnaXZlbiB0byByZXNldCBwYXNzd29yZFwiKVxuXG5cdFx0cmV0dXJuIFVzZXIucmVxdWVzdFBhc3N3b3JkUmVzZXQoY29udGFjdClcblx0fVxuXHQsUkVTRVRfUEFTU1dPUkQ6IChvbGRQd2QsIG5ld1B3ZCk9PmRpc3BhdGNoPT5Vc2VyLnJlc2V0UGFzc3dvcmQob2xkUHdkLCBuZXdQd2QpIFxuXG5cdCxTSUdOVVBfVUk6e3R5cGU6YFNJR05VUF9VSWB9XG5cdCxTSUdOSU5fVUk6e3R5cGU6YFNJR05JTl9VSWB9XG5cdCxGT1JHRVRfUEFTU1dPUkRfVUk6e3R5cGU6YEZPUkdFVF9QQVNTV09SRF9VSWB9XG5cdCxSRVNFVF9QQVNTV09SRF9VSTp7dHlwZTpgUkVTRVRfUEFTU1dPUkRfVUlgfVxuXHQsUEhPTkVfVkVSSUZZX1VJOih7dHlwZTpgUEhPTkVfVkVSSUZZX1VJYH0pXG59XG5cbmNsYXNzIEFjY291bnQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXt0eXBlOm51bGx9XG5cdHJlbmRlcigpe1xuXHRcdGxldCB7dXNlcixkaXNwYXRjaCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRsZXQge3R5cGV9PXRoaXMuc3RhdGVcblx0XHRpZighdHlwZSl7XG5cdFx0XHRpZih1c2VyKVxuXHRcdFx0XHR0eXBlPSdTSUdOSU5fVUknXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHR5cGU9J1BIT05FX1ZFUklGWV9VSSdcblx0XHR9XG5cdFx0XG5cdFx0b3RoZXJzLmRpc3BhdGNoPWFjdGlvbj0+e1xuXHRcdFx0c3dpdGNoKGFjdGlvbi50eXBlKXtcblx0XHRcdGNhc2UgYFNJR05VUF9VSWA6XG5cdFx0XHRjYXNlIGBTSUdOSU5fVUlgOlxuXHRcdFx0Y2FzZSBgRk9SR0VUX1BBU1NXT1JEX1VJYDpcblx0XHRcdGNhc2UgYFJFU0VUX1BBU1NXT1JEX1VJYDpcblx0XHRcdGNhc2UgYFBIT05FX1ZFUklGWV9VSWA6XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3R5cGU6YWN0aW9uLnR5cGV9KVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGRpc3BhdGNoKGFjdGlvbilcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSAnU0lHTlVQX1VJJzpcblx0XHRcdHJldHVybiAoPFNpZ251cCB7Li4ub3RoZXJzfSAvPilcblx0XHRjYXNlICdTSUdOSU5fVUknOlxuXHRcdFx0cmV0dXJuICg8U2lnbmluIHsuLi5vdGhlcnN9IHVzZXJuYW1lPXt1c2VyID8gdXNlci51c2VybmFtZSA6IG51bGx9Lz4pXG5cdFx0Y2FzZSAnUEhPTkVfVkVSSUZZX1VJJzpcblx0XHRcdHJldHVybiAoPFBob25lVmVyaWZpY2F0aW9uIHsuLi5vdGhlcnN9Lz4pXG5cdFx0Y2FzZSAnRk9SR0VUX1BBU1NXT1JEX1VJJzpcblx0XHRcdHJldHVybiAoPEZvcmdldFBhc3N3b3JkIHsuLi5vdGhlcnN9Lz4pXG5cdFx0Y2FzZSAnUkVTRVRfUEFTU1dPUkRfVUknOlxuXHRcdFx0cmV0dXJuICg8UmVzZXRQYXNzd29yZCB7Li4ub3RoZXJzfS8+KVxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBQaG9uZVZlcmlmaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Bob25lVmVyaWZpZWRFcnJvcjpudWxsfVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7cGhvbmVWZXJpZmllZEVycm9yfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0XG5cdFx0bGV0IGNvZGUscGhvbmVcblx0XHRcblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRlkocGhvbmUuZ2V0VmFsdWUoKSxjb2RlLmdldFZhbHVlKCkpKVxuXHRcdFx0LnRoZW4oYT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUF9VSSksZT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmVWZXJpZmllZEVycm9yOmV9KSlcblx0XHRcdFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJwaG9uZXZlcmlmeVwiPlxuXHRcdFx0XHQ8U01TUmVxdWVzdCByZWY9e2E9PnBob25lPWF9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+Y29kZT1hfSBoaW50VGV4dD1cInZlcmlmaWNhdGlvbiBjb2RlIHlvdSBqdXN0IHJlY2VpdmVkXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17cGhvbmVWZXJpZmllZEVycm9yfS8+XG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInZlcmlmeVwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5jbGFzcyBTaWdudXAgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPSB7dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9XG5cdHJlbmRlcigpe1x0XG5cdFx0Y29uc3Qge3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IsIHBhc3N3b3JkMkVycm9yfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0XG5cdFx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmQyXG5cdFx0XG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQKHtcblx0XHRcdHVzZXJuYW1lOnVzZXJuYW1lLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQyOnBhc3N3b3JkMi5nZXRWYWx1ZSgpXG5cdFx0fSkpLmNhdGNoKGU9PnRoaXMuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSx7dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9LGUpKSlcblx0XHRcdFx0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ251cFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+dXNlcm5hbWU9YX0gXG5cdFx0XHRcdFx0aGludFRleHQ9XCJsb2dpbiBuYW1lXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiIGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIiBlcnJvclRleHQ9e3Bhc3N3b3JkMkVycm9yfS8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5jbGFzcyBTaWduaW4gZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3VzZXJuYW1lLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfT10aGlzLnN0YXRlXG5cdFx0bGV0IHJlZlVzZXJuYW1lLCByZWZQYXNzd29yZFxuXG5cdFx0bGV0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTih7XG5cdFx0XHR1c2VybmFtZTpyZWZVc2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cmVmUGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdH0pKS5jYXRjaChlPT50aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30se3VzZXJuYW1lRXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsfSxlKSkpXG5cdFx0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ25pblwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmVXNlcm5hbWU9YX1cblx0XHRcdFx0XHRoaW50VGV4dD1cImxvZ2luIG5hbWUgb3IgcGhvbmUgbnVtYmVyXCJcblx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e3VzZXJuYW1lfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXt1c2VybmFtZUVycm9yfS8+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZQYXNzd29yZD1hfVxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfSBlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9XG5cdFx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIGluXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnNlbmQoKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwibm8gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cbmNsYXNzIEZvcmdldFBhc3N3b3JkIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17Y29udGFjdEVycm9yOm51bGx9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtjb250YWN0RXJyb3J9PXRoaXMuc3RhdGVcblx0XHRsZXQgY29udGFjdFxuXHRcdGNvbnN0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRChjb250YWN0LmdldFZhbHVlKCkpKVxuXHRcdFx0LnRoZW4oYT0+e1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2NvbnRhY3RFcnJvcjpudWxsfSlcblx0XHRcdFx0XHRhbGVydChgcmVzZXQgZW1haWwvc21zIHNlbnQsIHBsZWFzZSBmb2xsb3cgdGhlIGluc3RydWN0aW9uIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmRgKVxuXHRcdFx0XHR9LCBlPT50aGlzLnNldFN0YXRlKHtjb250YWN0RXJyb3I6ZX0pKVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJmb3JnZXRQd2RcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvbnRhY3Q9YX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfSBcblx0XHRcdFx0XHRlcnJvclRleHQ9e2NvbnRhY3RFcnJvcn1cblx0XHRcdFx0XHRoaW50VGV4dD1cInBob25lIG51bWJlciBvciBlbWFpbFwiLz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzZW5kIG1lXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnNlbmQoKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdH1cbn1cblxuY2xhc3MgUmVzZXRQYXNzd29yZCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Jlc2V0RXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsLCBwYXNzd29yZDJFcnJvcjpudWxsfVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7cmVzZXRFcnJvcn09dGhpcy5zdGF0ZVxuXHRcdFxuXHRcdGxldCBvbGRQYXNzd29yZCwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXHRcdGNvbnN0IHNlbmQ9YT0+e1xuXHRcdFx0bGV0IG5ld1Bhc3N3b3JkPXBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdGlmKHBhc3N3b3JkMi5nZXRWYWx1ZSgpIT1uZXdQYXNzd29yZCl7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkMkVycm9yOlwicGFzc3dvcmQgbm90IG1hdGNoZWRcIn0pXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQob2xkUGFzc3dvcmQuZ2V0VmFsdWUoKSwgbmV3UGFzc3dvcmQpKVxuXHRcdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtyZXNldEVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH0pLFxuXHRcdFx0XHRcdGVycm9yPT50aGlzLnNldFN0YXRlKHtyZXNldEVycm9yOmVycm9yLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9KSlcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInJlc2V0XCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5vbGRQYXNzd29yZD1hfSBoaW50VGV4dD1cIm9sZCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Jlc2V0RXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtwYXNzd29yZEVycm9yfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXG5cdFx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cGFzc3dvcmQyPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bhc3N3b3JkMkVycm9yfVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIFxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwicmVzZXQgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHR9XG59XG5cbmNsYXNzIFNNU1JlcXVlc3QgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtwaG9uZTpudWxsLHRpY2s6bnVsbH1cblxuICAgIHRpY2soKXtcbiAgICAgICAgbGV0IGk9NjAsIGRvVGljaztcbiAgICAgICAgdGhpcy5fdD1zZXRJbnRlcnZhbChkb1RpY2s9KCk9PntcbiAgICAgICAgICAgIGlmKGk9PTApe1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOiAwfSlcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazppLS19KVxuICAgICAgICB9LDEwMDApO1xuXG4gICAgICAgIGRvVGljaygpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgaWYodGhpcy5fdClcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3Bob25lLCB0aWNrfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGJ1dHRvbiwgcmVmUGhvbmVcblx0XHRpZihwaG9uZSl7XG4gICAgICAgICAgICBpZih0aWNrKVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2t9IGRpc2FibGVkPXt0cnVlfS8+KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2s9PT0wID8gXCJyZXNlbmRcIiA6IFwic2VuZFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50aWNrKClcblx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1JFUVVFU1QocmVmUGhvbmUuZ2V0VmFsdWUoKSkpXG5cdFx0XHRcdFx0XHRcdH19Lz4pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbXNyZXF1ZXN0XCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuXHRcdFx0XHRcdHJlZj17YT0+cmVmUGhvbmU9YX1cblx0XHRcdFx0XHRoaW50VGV4dD1cInBob25lIG51bWJlciAoZGVmYXVsdCArODYpXCJcblx0XHRcdFx0XHRkaXNhYmxlZD17ISF0aWNrfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT50aGlzLnNldFN0YXRlKHtwaG9uZTogdGhpcy5pc1Bob25lKHZhbHVlKT8gdmFsdWUgOiBudWxsfSl9Lz5cbiAgICAgICAgICAgICAgICB7YnV0dG9ufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblx0aXNQaG9uZSh2KXtcbiAgICAgICAgcmV0dXJuICgvXihcXCtcXGR7Mn0pP1xcZHsxMX0kL2cpLnRlc3QodilcbiAgICB9XG5cblx0Z2V0VmFsdWUoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5waG9uZVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdCgpKEFjY291bnQpKVxuIl19