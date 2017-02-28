'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ResetPassword = exports.Account = exports.ACTION = undefined;

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

var _smsRequest = require('./components/sms-request');

var _smsRequest2 = _interopRequireDefault(_smsRequest);

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
			    password2 = user.password2,
			    verifyPhone = user.verifyPhone;

			var usernameError = void 0,
			    passwordError = void 0,
			    password2Error = void 0;
			if (!username) usernameError = "帐号必须有";
			if (!password) passwordError = "密码必须有";

			if (password != password2) password2Error = "2次密码不相同";

			if (usernameError || passwordError || password2Error) return Promise.reject({ passwordError: passwordError, usernameError: usernameError, password2Error: password2Error });

			return _user2.default.signup({ username: username, password: password, verifyPhone: verifyPhone }).catch(function (_ref) {
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
			if (!username) usernameError = "帐号必须有";
			if (!password) passwordError = "密码必须有";

			if (usernameError || passwordError) return Promise.reject({ usernameError: usernameError, passwordError: passwordError });

			return _user2.default.signin(user).catch(function (_ref2) {
				var message = _ref2.message;
				return Promise.reject({ usernameError: message });
			});
		};
	},
	PHONE_CODE_REQUEST: function PHONE_CODE_REQUEST(phone, existence) {
		return function (dispatch) {
			return _user2.default.requestPhoneCode(phone, existence);
		};
	},

	FORGET_PASSWORD: function FORGET_PASSWORD(verifyPhone) {
		return function (dispatch) {
			return _user2.default.requestPasswordReset(verifyPhone);
		};
	},

	RESET_PASSWORD: function RESET_PASSWORD(oldPwd, newPwd) {
		return function (dispatch) {
			return _user2.default.resetPassword(oldPwd, newPwd);
		};
	},

	SIGNUP_UI: { type: 'SIGNUP_UI' },
	SIGNIN_UI: { type: 'SIGNIN_UI' },
	FORGET_PASSWORD_UI: { type: 'FORGET_PASSWORD_UI' }
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


			if (!type) type = 'SIGNIN_UI';

			others.dispatch = function (action) {
				switch (action.type) {
					case 'SIGNUP_UI':
					case 'SIGNIN_UI':
					case 'FORGET_PASSWORD_UI':
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
				case 'FORGET_PASSWORD_UI':
					return _react2.default.createElement(ForgetPassword, others);
			}
		}
	}]);

	return Account;
}(_react.Component);

var Signup = function (_Component2) {
	_inherits(Signup, _Component2);

	function Signup() {
		var _ref4;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, Signup);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref4 = Signup.__proto__ || Object.getPrototypeOf(Signup)).call.apply(_ref4, [this].concat(args))), _this3), _this3.state = { usernameError: null, passwordError: null, password2Error: null }, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(Signup, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _state = this.state,
			    usernameError = _state.usernameError,
			    passwordError = _state.passwordError,
			    password2Error = _state.password2Error;
			var dispatch = this.props.dispatch;


			var username = void 0,
			    password = void 0,
			    password2 = void 0,
			    sms = void 0;

			var send = function send(a) {
				return dispatch(ACTION.SIGNUP({
					username: username.getValue(),
					password: password.getValue(),
					password2: password2.getValue(),
					verifyPhone: sms.data
				})).catch(function (e) {
					return _this4.setState(Object.assign({}, { usernameError: null, passwordError: null, password2Error: null }, e));
				});
			};

			return _react2.default.createElement(
				'div',
				{ className: 'form', key: 'signup' },
				_react2.default.createElement(_smsRequest2.default, { ref: function ref(a) {
						return sms = a;
					}, dispatch: dispatch, existence: false }),
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return username = a;
					},
					hintText: '\u5E10\u53F7',
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
					type: 'password', hintText: '\u5BC6\u7801', errorText: passwordError }),
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return password2 = a;
					},
					fullWidth: true,
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					type: 'password', hintText: '\u5BC6\u7801\u786E\u8BA4', errorText: password2Error }),
				_react2.default.createElement(
					'center',
					null,
					_react2.default.createElement(_materialUi.RaisedButton, { label: '\u521B\u5EFA\u5E10\u53F7', primary: true,
						onClick: function onClick(e) {
							return send();
						} })
				),
				_react2.default.createElement(
					'div',
					{ className: 'commands' },
					_react2.default.createElement(_materialUi.FlatButton, { label: '\u5DF2\u7ECF\u6709\u5E10\u53F7\u4E86',
						onClick: function onClick(e) {
							return dispatch(ACTION.SIGNIN_UI);
						} }),
					_react2.default.createElement(_materialUi.FlatButton, { label: '\u5FD8\u8BB0\u5BC6\u7801',
						onClick: function onClick(e) {
							return dispatch(ACTION.FORGET_PASSWORD_UI);
						} })
				)
			);
		}
	}]);

	return Signup;
}(_react.Component);

var Signin = function (_Component3) {
	_inherits(Signin, _Component3);

	function Signin() {
		var _ref5;

		var _temp3, _this5, _ret3;

		_classCallCheck(this, Signin);

		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		return _ret3 = (_temp3 = (_this5 = _possibleConstructorReturn(this, (_ref5 = Signin.__proto__ || Object.getPrototypeOf(Signin)).call.apply(_ref5, [this].concat(args))), _this5), _this5.state = { usernameError: null, passwordError: null }, _temp3), _possibleConstructorReturn(_this5, _ret3);
	}

	_createClass(Signin, [{
		key: 'render',
		value: function render() {
			var _this6 = this;

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
					return _this6.setState(Object.assign({}, { usernameError: null, passwordError: null }, e));
				});
			};

			return _react2.default.createElement(
				'div',
				{ className: 'form', key: 'signin' },
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return refUsername = a;
					},
					hintText: '\u5E10\u53F7',
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
					type: 'password', hintText: '\u5BC6\u7801' }),
				_react2.default.createElement(
					'center',
					null,
					_react2.default.createElement(_materialUi.RaisedButton, { label: '\u767B\u5F55', primary: true,
						onClick: function onClick(e) {
							return send();
						} })
				),
				_react2.default.createElement(
					'div',
					{ className: 'commands' },
					_react2.default.createElement(_materialUi.FlatButton, { label: '\u6CA1\u6709\u5E10\u53F7',
						onClick: function onClick(e) {
							return dispatch(ACTION.SIGNUP_UI);
						} }),
					_react2.default.createElement(_materialUi.FlatButton, { label: '\u5BC6\u7801\u5FD8\u8BB0\u4E86',
						onClick: function onClick(e) {
							return dispatch(ACTION.FORGET_PASSWORD_UI);
						} })
				)
			);
		}
	}]);

	return Signin;
}(_react.Component);

var ForgetPassword = function (_Component4) {
	_inherits(ForgetPassword, _Component4);

	function ForgetPassword() {
		var _ref6;

		var _temp4, _this7, _ret4;

		_classCallCheck(this, ForgetPassword);

		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		return _ret4 = (_temp4 = (_this7 = _possibleConstructorReturn(this, (_ref6 = ForgetPassword.__proto__ || Object.getPrototypeOf(ForgetPassword)).call.apply(_ref6, [this].concat(args))), _this7), _this7.state = { phoneVerifiedError: null }, _temp4), _possibleConstructorReturn(_this7, _ret4);
	}

	_createClass(ForgetPassword, [{
		key: 'render',
		value: function render() {
			var _this8 = this;

			var dispatch = this.props.dispatch;
			var phoneVerifiedError = this.state.phoneVerifiedError;

			var sms = void 0;
			var send = function send(a) {
				return dispatch(ACTION.FORGET_PASSWORD({ verifyPhone: sms.data })).then(function (a) {
					_this8.setState({ phoneVerifiedError: null });
					alert('a temp password sent to your phone, please sign in within 2 hours and reset password immediatly');
					dispatch(ACTION.SIGNIN_UI);
				}, function (e) {
					return _this8.setState({ phoneVerifiedError: e });
				});
			};

			return _react2.default.createElement(
				'div',
				{ className: 'form', key: 'forgetPwd' },
				_react2.default.createElement(_smsRequest2.default, { ref: function ref(a) {
						return sms = a;
					}, dispatch: dispatch, existence: true }),
				_react2.default.createElement(
					'center',
					null,
					_react2.default.createElement(_materialUi.RaisedButton, { label: '\u53D1\u9001\u4E00\u4E2A\u4E34\u65F6\u5BC6\u7801', primary: true,
						onClick: function onClick(e) {
							return send();
						} })
				),
				_react2.default.createElement(
					'div',
					{ className: 'commands' },
					_react2.default.createElement(_materialUi.FlatButton, { label: '\u767B\u5F55',
						onClick: function onClick(e) {
							return dispatch(ACTION.SIGNIN_UI);
						} }),
					_react2.default.createElement(_materialUi.FlatButton, { label: '\u521B\u5EFA\u5E10\u53F7',
						onClick: function onClick(e) {
							return dispatch(ACTION.SIGNUP_UI);
						} })
				)
			);
		}
	}]);

	return ForgetPassword;
}(_react.Component);

var ResetPassword = exports.ResetPassword = function (_Component5) {
	_inherits(ResetPassword, _Component5);

	function ResetPassword() {
		var _ref7;

		var _temp5, _this9, _ret5;

		_classCallCheck(this, ResetPassword);

		for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
			args[_key5] = arguments[_key5];
		}

		return _ret5 = (_temp5 = (_this9 = _possibleConstructorReturn(this, (_ref7 = ResetPassword.__proto__ || Object.getPrototypeOf(ResetPassword)).call.apply(_ref7, [this].concat(args))), _this9), _this9.state = { resetError: null, passwordError: null, password2Error: null }, _temp5), _possibleConstructorReturn(_this9, _ret5);
	}

	_createClass(ResetPassword, [{
		key: 'render',
		value: function render() {
			var _this10 = this;

			var dispatch = this.props.dispatch;
			var _state3 = this.state,
			    resetError = _state3.resetError,
			    passwordError = _state3.passwordError,
			    password2Error = _state3.password2Error;


			var oldPassword = void 0,
			    password = void 0,
			    password2 = void 0;
			var send = function send(a) {
				var newPassword = password.getValue();
				if (password2.getValue() != newPassword) {
					_this10.setState({ password2Error: "密码确认错误" });
					return;
				}

				dispatch(ACTION.RESET_PASSWORD(oldPassword.getValue(), newPassword)).then(function (a) {
					_this10.setState({ resetError: null, passwordError: null, password2Error: null });
					alert("修改成功");
				}, function (error) {
					return _this10.setState({ resetError: error, passwordError: null, password2Error: null });
				});
			};

			return _react2.default.createElement(
				'div',
				{ className: 'form', key: 'reset' },
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return oldPassword = a;
					}, hintText: '\u8001\u5BC6\u7801',
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
					type: 'password', hintText: '\u5BC6\u7801' }),
				_react2.default.createElement(_textField2.default, { ref: function ref(a) {
						return password2 = a;
					},
					fullWidth: true,
					onKeyDown: function onKeyDown(e) {
						e.keyCode == ENTER && send();
					},
					errorText: password2Error,
					type: 'password',
					hintText: '\u5BC6\u7801\u786E\u8BA4' }),
				_react2.default.createElement(
					'center',
					null,
					_react2.default.createElement(_materialUi.RaisedButton, { label: '\u4FDD\u5B58', primary: true,
						onClick: function onClick(e) {
							return send();
						} })
				)
			);
		}
	}]);

	return ResetPassword;
}(_react.Component);

exports.default = Account;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ2ZXJpZnlQaG9uZSIsInVzZXJuYW1lRXJyb3IiLCJwYXNzd29yZEVycm9yIiwicGFzc3dvcmQyRXJyb3IiLCJQcm9taXNlIiwicmVqZWN0Iiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfQ09ERV9SRVFVRVNUIiwicGhvbmUiLCJleGlzdGVuY2UiLCJyZXF1ZXN0UGhvbmVDb2RlIiwiRk9SR0VUX1BBU1NXT1JEIiwicmVxdWVzdFBhc3N3b3JkUmVzZXQiLCJSRVNFVF9QQVNTV09SRCIsIm9sZFB3ZCIsIm5ld1B3ZCIsInJlc2V0UGFzc3dvcmQiLCJTSUdOVVBfVUkiLCJ0eXBlIiwiU0lHTklOX1VJIiwiRk9SR0VUX1BBU1NXT1JEX1VJIiwiQWNjb3VudCIsInN0YXRlIiwicHJvcHMiLCJkaXNwYXRjaCIsIm90aGVycyIsImFjdGlvbiIsInNldFN0YXRlIiwiU2lnbnVwIiwic21zIiwic2VuZCIsImdldFZhbHVlIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsImUiLCJhIiwia2V5Q29kZSIsIlNpZ25pbiIsInJlZlVzZXJuYW1lIiwicmVmUGFzc3dvcmQiLCJGb3JnZXRQYXNzd29yZCIsInBob25lVmVyaWZpZWRFcnJvciIsInRoZW4iLCJhbGVydCIsIlJlc2V0UGFzc3dvcmQiLCJyZXNldEVycm9yIiwib2xkUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQU0sRUFBWjs7QUFFTyxJQUFNQywwQkFBTztBQUNuQkMsU0FBTztBQUFBLFNBQU0sb0JBQVU7QUFBQSxP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QUNDLGdCQUFXLElBRFo7QUFFQyxnQkFBVyxzQkFBRztBQUFDRCxRQUFFRSxPQUFGLElBQVdoRCxLQUFYLElBQW9CeUMsTUFBcEI7QUFBMkIsTUFGM0M7QUFHQyxnQkFBV2dCLFVBSFosR0FERDtBQU1DLDJEQUFXLEtBQUs7QUFBQSxhQUFHcEQsV0FBUzBDLENBQVo7QUFBQSxNQUFoQjtBQUNDLGdCQUFXLElBRFo7QUFFQyxnQkFBV3RDLGFBRlo7QUFHQyxnQkFBVyxzQkFBRztBQUFDcUMsUUFBRUUsT0FBRixJQUFXaEQsS0FBWCxJQUFvQnlDLE1BQXBCO0FBQTJCLE1BSDNDO0FBSUMsV0FBSyxVQUpOLEVBSWlCLFVBQVMsY0FKMUIsR0FORDtBQVlDLHlEQUFZLEtBQUs7QUFBQSxhQUFHbkMsWUFBVXlDLENBQWI7QUFBQSxNQUFqQjtBQUNDLGdCQUFXLElBRFo7QUFFQyxnQkFBVyxzQkFBRztBQUFDRCxRQUFFRSxPQUFGLElBQVdoRCxLQUFYLElBQW9CeUMsTUFBcEI7QUFBMkIsTUFGM0M7QUFHQyxnQkFBVy9CLGNBSFo7QUFJQyxXQUFLLFVBSk47QUFLQyxlQUFTLDBCQUxWLEdBWkQ7QUFtQkM7QUFBQTtBQUFBO0FBQ0MsK0RBQWMsT0FBTSxjQUFwQixFQUF5QixTQUFTLElBQWxDO0FBQ0MsZUFBUztBQUFBLGNBQUcrQixNQUFIO0FBQUEsT0FEVjtBQUREO0FBbkJELElBREQ7QUEwQkE7Ozs7OztrQkFHYVQsTyIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHtUZXh0RmllbGQsIEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBVc2VyIGZyb20gJy4vZGIvdXNlcidcclxuaW1wb3J0IFRleHRGaWVsZHggZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IFNNU1JlcXVlc3QgZnJvbSBcIi4vY29tcG9uZW50cy9zbXMtcmVxdWVzdFwiXHJcblxyXG5jb25zdCBFTlRFUj0xM1xyXG5cclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0U0lHTlVQOnVzZXI9PmRpc3BhdGNoPT57XHJcblx0XHRjb25zdCB7dXNlcm5hbWUscGFzc3dvcmQscGFzc3dvcmQyLHZlcmlmeVBob25lfT11c2VyXHJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcixwYXNzd29yZDJFcnJvclxyXG5cdFx0aWYoIXVzZXJuYW1lKVxyXG5cdFx0XHR1c2VybmFtZUVycm9yPVwi5biQ5Y+35b+F6aG75pyJXCJcclxuXHRcdGlmKCFwYXNzd29yZClcclxuXHRcdFx0cGFzc3dvcmRFcnJvcj1cIuWvhueggeW/hemhu+aciVwiXHJcblxyXG5cdFx0aWYocGFzc3dvcmQhPXBhc3N3b3JkMilcclxuXHRcdFx0cGFzc3dvcmQyRXJyb3I9XCIy5qyh5a+G56CB5LiN55u45ZCMXCJcclxuXHJcblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3J8fHBhc3N3b3JkMkVycm9yKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3Qoe3Bhc3N3b3JkRXJyb3IsIHVzZXJuYW1lRXJyb3IscGFzc3dvcmQyRXJyb3J9KVxyXG5cclxuXHRcdHJldHVybiBVc2VyLnNpZ251cCh7dXNlcm5hbWUscGFzc3dvcmQsdmVyaWZ5UGhvbmV9KVxyXG5cdFx0XHQuY2F0Y2goKHttZXNzYWdlfSk9PlByb21pc2UucmVqZWN0KHt1c2VybmFtZUVycm9yOm1lc3NhZ2V9KSlcclxuXHR9XHJcblx0LFNJR05JTjp1c2VyPT5kaXNwYXRjaD0+e1xyXG5cdFx0Y29uc3Qge3VzZXJuYW1lLCBwYXNzd29yZH09dXNlclxyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3JcclxuXHRcdGlmKCF1c2VybmFtZSlcclxuXHRcdFx0dXNlcm5hbWVFcnJvcj1cIuW4kOWPt+W/hemhu+aciVwiXHJcblx0XHRpZighcGFzc3dvcmQpXHJcblx0XHRcdHBhc3N3b3JkRXJyb3I9XCLlr4bnoIHlv4XpobvmnIlcIlxyXG5cclxuXHRcdGlmKHVzZXJuYW1lRXJyb3IgfHwgcGFzc3dvcmRFcnJvcilcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfSlcclxuXHJcblx0XHRyZXR1cm4gVXNlci5zaWduaW4odXNlcilcclxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5Qcm9taXNlLnJlamVjdCh7dXNlcm5hbWVFcnJvcjptZXNzYWdlfSkpXHJcblx0fVxyXG5cdCxQSE9ORV9DT0RFX1JFUVVFU1Q6KHBob25lLGV4aXN0ZW5jZSk9PmRpc3BhdGNoPT5Vc2VyLnJlcXVlc3RQaG9uZUNvZGUocGhvbmUsZXhpc3RlbmNlKVxyXG5cclxuXHQsRk9SR0VUX1BBU1NXT1JEOiB2ZXJpZnlQaG9uZT0+ZGlzcGF0Y2g9PlVzZXIucmVxdWVzdFBhc3N3b3JkUmVzZXQodmVyaWZ5UGhvbmUpXHJcblxyXG5cdCxSRVNFVF9QQVNTV09SRDogKG9sZFB3ZCwgbmV3UHdkKT0+ZGlzcGF0Y2g9PlVzZXIucmVzZXRQYXNzd29yZChvbGRQd2QsIG5ld1B3ZClcclxuXHJcblx0LFNJR05VUF9VSTp7dHlwZTpgU0lHTlVQX1VJYH1cclxuXHQsU0lHTklOX1VJOnt0eXBlOmBTSUdOSU5fVUlgfVxyXG5cdCxGT1JHRVRfUEFTU1dPUkRfVUk6e3R5cGU6YEZPUkdFVF9QQVNTV09SRF9VSWB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2NvdW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXt0eXBlOm51bGx9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRsZXQge3VzZXIsZGlzcGF0Y2gsLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRsZXQge3R5cGV9PXRoaXMuc3RhdGVcclxuXHJcblx0XHRpZighdHlwZSlcclxuXHRcdFx0dHlwZT0nU0lHTklOX1VJJ1xyXG5cclxuXHRcdG90aGVycy5kaXNwYXRjaD1hY3Rpb249PntcclxuXHRcdFx0c3dpdGNoKGFjdGlvbi50eXBlKXtcclxuXHRcdFx0Y2FzZSBgU0lHTlVQX1VJYDpcclxuXHRcdFx0Y2FzZSBgU0lHTklOX1VJYDpcclxuXHRcdFx0Y2FzZSBgRk9SR0VUX1BBU1NXT1JEX1VJYDpcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt0eXBlOmFjdGlvbi50eXBlfSlcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gZGlzcGF0Y2goYWN0aW9uKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAnU0lHTlVQX1VJJzpcclxuXHRcdFx0cmV0dXJuICg8U2lnbnVwIHsuLi5vdGhlcnN9IC8+KVxyXG5cdFx0Y2FzZSAnU0lHTklOX1VJJzpcclxuXHRcdFx0cmV0dXJuICg8U2lnbmluIHsuLi5vdGhlcnN9IHVzZXJuYW1lPXt1c2VyID8gdXNlci51c2VybmFtZSA6IG51bGx9Lz4pXHJcblx0XHRjYXNlICdGT1JHRVRfUEFTU1dPUkRfVUknOlxyXG5cdFx0XHRyZXR1cm4gKDxGb3JnZXRQYXNzd29yZCB7Li4ub3RoZXJzfS8+KVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgU2lnbnVwIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPSB7dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvciwgcGFzc3dvcmQyRXJyb3J9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cclxuXHRcdGxldCB1c2VybmFtZSwgcGFzc3dvcmQsIHBhc3N3b3JkMiwgc21zXHJcblxyXG5cdFx0Y29uc3Qgc2VuZD1hPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQKHtcclxuXHRcdFx0dXNlcm5hbWU6dXNlcm5hbWUuZ2V0VmFsdWUoKVxyXG5cdFx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxyXG5cdFx0XHQscGFzc3dvcmQyOnBhc3N3b3JkMi5nZXRWYWx1ZSgpXHJcblx0XHRcdCx2ZXJpZnlQaG9uZTpzbXMuZGF0YVxyXG5cdFx0fSkpLmNhdGNoKGU9PnRoaXMuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSx7dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9LGUpKSlcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWdudXBcIj5cclxuXHRcdFx0XHQ8U01TUmVxdWVzdCByZWY9e2E9PnNtcz1hfSBkaXNwYXRjaD17ZGlzcGF0Y2h9IGV4aXN0ZW5jZT17ZmFsc2V9Lz5cclxuXHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9XHJcblx0XHRcdFx0XHRoaW50VGV4dD1cIuW4kOWPt1wiXHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cclxuXHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cIuWvhueggVwiIGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn0vPlxyXG5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQyPWF9XHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cIuWvhueggeehruiupFwiIGVycm9yVGV4dD17cGFzc3dvcmQyRXJyb3J9Lz5cclxuXHJcblx0XHRcdFx0PGNlbnRlcj5cclxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCLliJvlu7rluJDlj7dcIiBwcmltYXJ5PXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cclxuXHRcdFx0XHQ8L2NlbnRlcj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XHJcblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cIuW3sue7j+acieW4kOWPt+S6hlwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XHJcblxyXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCLlv5jorrDlr4bnoIFcIlxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNpZ25pbiBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGx9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7dXNlcm5hbWUsIGRpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcn09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IHJlZlVzZXJuYW1lLCByZWZQYXNzd29yZFxyXG5cclxuXHRcdGxldCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU4oe1xyXG5cdFx0XHR1c2VybmFtZTpyZWZVc2VybmFtZS5nZXRWYWx1ZSgpXHJcblx0XHRcdCxwYXNzd29yZDpyZWZQYXNzd29yZC5nZXRWYWx1ZSgpXHJcblx0XHR9KSkuY2F0Y2goZT0+dGhpcy5zZXRTdGF0ZShPYmplY3QuYXNzaWduKHt9LHt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbH0sZSkpKVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ25pblwiPlxyXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVc2VybmFtZT1hfVxyXG5cdFx0XHRcdFx0aGludFRleHQ9XCLluJDlj7dcIlxyXG5cdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXt1c2VybmFtZX1cclxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cclxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxyXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZQYXNzd29yZD1hfVxyXG5cdFx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0gZXJyb3JUZXh0PXtwYXNzd29yZEVycm9yfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cIuWvhueggVwiLz5cclxuXHRcdFx0XHQ8Y2VudGVyPlxyXG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cIueZu+W9lVwiIHByaW1hcnk9e3RydWV9XHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnNlbmQoKX0vPlxyXG5cdFx0XHRcdDwvY2VudGVyPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cclxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwi5rKh5pyJ5biQ5Y+3XCJcclxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQX1VJKX0vPlxyXG5cclxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwi5a+G56CB5b+Y6K6w5LqGXCJcclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cclxuXHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgRm9yZ2V0UGFzc3dvcmQgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e3Bob25lVmVyaWZpZWRFcnJvcjpudWxsfVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7cGhvbmVWZXJpZmllZEVycm9yfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgc21zXHJcblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkQoe3ZlcmlmeVBob25lOnNtcy5kYXRhfSkpXHJcblx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Bob25lVmVyaWZpZWRFcnJvcjpudWxsfSlcclxuXHRcdFx0XHRcdGFsZXJ0KGBhIHRlbXAgcGFzc3dvcmQgc2VudCB0byB5b3VyIHBob25lLCBwbGVhc2Ugc2lnbiBpbiB3aXRoaW4gMiBob3VycyBhbmQgcmVzZXQgcGFzc3dvcmQgaW1tZWRpYXRseWApXHJcblx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKVxyXG5cdFx0XHRcdH0sIGU9PnRoaXMuc2V0U3RhdGUoe3Bob25lVmVyaWZpZWRFcnJvcjplfSkpXHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwiZm9yZ2V0UHdkXCI+XHJcblx0XHRcdFx0PFNNU1JlcXVlc3QgcmVmPXthPT5zbXM9YX0gZGlzcGF0Y2g9e2Rpc3BhdGNofSBleGlzdGVuY2U9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0PGNlbnRlcj5cclxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCLlj5HpgIHkuIDkuKrkuLTml7blr4bnoIFcIiBwcmltYXJ5PXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cclxuXHRcdFx0XHQ8L2NlbnRlcj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XHJcblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cIueZu+W9lVwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XHJcblxyXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCLliJvlu7rluJDlj7dcIlxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQX1VJKX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmQgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e3Jlc2V0RXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsLCBwYXNzd29yZDJFcnJvcjpudWxsfVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7cmVzZXRFcnJvciwgcGFzc3dvcmRFcnJvciwgcGFzc3dvcmQyRXJyb3J9PXRoaXMuc3RhdGVcclxuXHJcblx0XHRsZXQgb2xkUGFzc3dvcmQsIHBhc3N3b3JkLCBwYXNzd29yZDJcclxuXHRcdGNvbnN0IHNlbmQ9YT0+e1xyXG5cdFx0XHRsZXQgbmV3UGFzc3dvcmQ9cGFzc3dvcmQuZ2V0VmFsdWUoKVxyXG5cdFx0XHRpZihwYXNzd29yZDIuZ2V0VmFsdWUoKSE9bmV3UGFzc3dvcmQpe1xyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkMkVycm9yOlwi5a+G56CB56Gu6K6k6ZSZ6K+vXCJ9KVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQob2xkUGFzc3dvcmQuZ2V0VmFsdWUoKSwgbmV3UGFzc3dvcmQpKVxyXG5cdFx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cmVzZXRFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9KVxyXG5cdFx0XHRcdFx0XHRhbGVydChcIuS/ruaUueaIkOWKn1wiKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGVycm9yPT50aGlzLnNldFN0YXRlKHtyZXNldEVycm9yOmVycm9yLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9KSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJyZXNldFwiPlxyXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5vbGRQYXNzd29yZD1hfSBoaW50VGV4dD1cIuiAgeWvhueggVwiXHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHRlcnJvclRleHQ9e3Jlc2V0RXJyb3J9Lz5cclxuXHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cIuWvhueggVwiLz5cclxuXHJcblx0XHRcdFx0PFRleHRGaWVsZHggcmVmPXthPT5wYXNzd29yZDI9YX1cclxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cclxuXHRcdFx0XHRcdGVycm9yVGV4dD17cGFzc3dvcmQyRXJyb3J9XHJcblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0aGludFRleHQ9XCLlr4bnoIHnoa7orqRcIi8+XHJcblxyXG5cdFx0XHRcdDxjZW50ZXI+XHJcblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwi5L+d5a2YXCIgcHJpbWFyeT17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XHJcblx0XHRcdFx0PC9jZW50ZXI+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50XHJcbiJdfQ==