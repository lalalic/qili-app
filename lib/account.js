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
			if (!username) usernameError = "user name is required";
			if (!password) passwordError = "password is required";

			if (password != password2) password2Error = "password doesn't match";

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
			if (!username) usernameError = "user name is required";
			if (!password) passwordError = "password is required";

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
			    refPassword = void 0,
			    sms = void 0;

			var send = function send(a) {
				return dispatch(ACTION.SIGNIN({
					username: refUsername.getValue(),
					password: refPassword.getValue(),
					verifyPhone: sms.data
				})).catch(function (e) {
					return _this6.setState(Object.assign({}, { usernameError: null, passwordError: null }, e));
				});
			};

			return _react2.default.createElement(
				'div',
				{ className: 'form', key: 'signin' },
				_react2.default.createElement(_smsRequest2.default, { ref: function ref(a) {
						return sms = a;
					}, dispatch: dispatch, existence: true }),
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
							return dispatch(ACTION.SIGNUP_UI);
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
					_this10.setState({ password2Error: "password not matched" });
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
				)
			);
		}
	}]);

	return ResetPassword;
}(_react.Component);

exports.default = Account;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ2ZXJpZnlQaG9uZSIsInVzZXJuYW1lRXJyb3IiLCJwYXNzd29yZEVycm9yIiwicGFzc3dvcmQyRXJyb3IiLCJQcm9taXNlIiwicmVqZWN0Iiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfQ09ERV9SRVFVRVNUIiwicGhvbmUiLCJleGlzdGVuY2UiLCJyZXF1ZXN0UGhvbmVDb2RlIiwiRk9SR0VUX1BBU1NXT1JEIiwicmVxdWVzdFBhc3N3b3JkUmVzZXQiLCJSRVNFVF9QQVNTV09SRCIsIm9sZFB3ZCIsIm5ld1B3ZCIsInJlc2V0UGFzc3dvcmQiLCJTSUdOVVBfVUkiLCJ0eXBlIiwiU0lHTklOX1VJIiwiRk9SR0VUX1BBU1NXT1JEX1VJIiwiQWNjb3VudCIsInN0YXRlIiwicHJvcHMiLCJkaXNwYXRjaCIsIm90aGVycyIsImFjdGlvbiIsInNldFN0YXRlIiwiU2lnbnVwIiwic21zIiwic2VuZCIsImdldFZhbHVlIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsImUiLCJhIiwia2V5Q29kZSIsIlNpZ25pbiIsInJlZlVzZXJuYW1lIiwicmVmUGFzc3dvcmQiLCJGb3JnZXRQYXNzd29yZCIsInBob25lVmVyaWZpZWRFcnJvciIsInRoZW4iLCJhbGVydCIsIlJlc2V0UGFzc3dvcmQiLCJyZXNldEVycm9yIiwib2xkUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQU0sRUFBWjs7QUFFTyxJQUFNQywwQkFBTztBQUNuQkMsU0FBTztBQUFBLFNBQU0sb0JBQVU7QUFBQSxP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QUFBLEtBTEY7QUFNQSxJQWJEOztBQWVBLFVBQ0M7QUFBQTtBQUFBLE1BQUssV0FBVSxNQUFmLEVBQXNCLEtBQUksT0FBMUI7QUFDQywyREFBVyxLQUFLO0FBQUEsYUFBR2dELGNBQVlYLENBQWY7QUFBQSxNQUFoQixFQUFrQyxVQUFTLGNBQTNDO0FBQ0MsZ0JBQVcsSUFEWjtBQUVDLGdCQUFXLHNCQUFHO0FBQUNELFFBQUVFLE9BQUYsSUFBV2hELEtBQVgsSUFBb0J5QyxNQUFwQjtBQUEyQixNQUYzQztBQUdDLGdCQUFXZ0IsVUFIWixHQUREO0FBTUMsMkRBQVcsS0FBSztBQUFBLGFBQUdwRCxXQUFTMEMsQ0FBWjtBQUFBLE1BQWhCO0FBQ0MsZ0JBQVcsSUFEWjtBQUVDLGdCQUFXdEMsYUFGWjtBQUdDLGdCQUFXLHNCQUFHO0FBQUNxQyxRQUFFRSxPQUFGLElBQVdoRCxLQUFYLElBQW9CeUMsTUFBcEI7QUFBMkIsTUFIM0M7QUFJQyxXQUFLLFVBSk4sRUFJaUIsVUFBUyxVQUoxQixHQU5EO0FBWUMseURBQVksS0FBSztBQUFBLGFBQUduQyxZQUFVeUMsQ0FBYjtBQUFBLE1BQWpCO0FBQ0MsZ0JBQVcsSUFEWjtBQUVDLGdCQUFXLHNCQUFHO0FBQUNELFFBQUVFLE9BQUYsSUFBV2hELEtBQVgsSUFBb0J5QyxNQUFwQjtBQUEyQixNQUYzQztBQUdDLGdCQUFXL0IsY0FIWjtBQUlDLFdBQUssVUFKTjtBQUtDLGVBQVMsZ0JBTFYsR0FaRDtBQW1CQztBQUFBO0FBQUE7QUFDQywrREFBYyxPQUFNLGdCQUFwQixFQUFxQyxTQUFTLElBQTlDO0FBQ0MsZUFBUztBQUFBLGNBQUcrQixNQUFIO0FBQUEsT0FEVjtBQUREO0FBbkJELElBREQ7QUEwQkE7Ozs7OztrQkFHYVQsTyIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHtUZXh0RmllbGQsIEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBVc2VyIGZyb20gJy4vZGIvdXNlcidcclxuaW1wb3J0IFRleHRGaWVsZHggZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IFNNU1JlcXVlc3QgZnJvbSBcIi4vY29tcG9uZW50cy9zbXMtcmVxdWVzdFwiXHJcblxyXG5jb25zdCBFTlRFUj0xM1xyXG5cclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0U0lHTlVQOnVzZXI9PmRpc3BhdGNoPT57XHJcblx0XHRjb25zdCB7dXNlcm5hbWUscGFzc3dvcmQscGFzc3dvcmQyLHZlcmlmeVBob25lfT11c2VyXHJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcixwYXNzd29yZDJFcnJvclxyXG5cdFx0aWYoIXVzZXJuYW1lKVxyXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcclxuXHRcdGlmKCFwYXNzd29yZClcclxuXHRcdFx0cGFzc3dvcmRFcnJvcj1cInBhc3N3b3JkIGlzIHJlcXVpcmVkXCJcclxuXHJcblx0XHRpZihwYXNzd29yZCE9cGFzc3dvcmQyKVxyXG5cdFx0XHRwYXNzd29yZDJFcnJvcj1cInBhc3N3b3JkIGRvZXNuJ3QgbWF0Y2hcIlxyXG5cclxuXHRcdGlmKHVzZXJuYW1lRXJyb3IgfHwgcGFzc3dvcmRFcnJvcnx8cGFzc3dvcmQyRXJyb3IpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCh7cGFzc3dvcmRFcnJvciwgdXNlcm5hbWVFcnJvcixwYXNzd29yZDJFcnJvcn0pXHJcblxyXG5cdFx0cmV0dXJuIFVzZXIuc2lnbnVwKHt1c2VybmFtZSxwYXNzd29yZCx2ZXJpZnlQaG9uZX0pXHJcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+UHJvbWlzZS5yZWplY3Qoe3VzZXJuYW1lRXJyb3I6bWVzc2FnZX0pKVxyXG5cdH1cclxuXHQsU0lHTklOOnVzZXI9PmRpc3BhdGNoPT57XHJcblx0XHRjb25zdCB7dXNlcm5hbWUsIHBhc3N3b3JkfT11c2VyXHJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvclxyXG5cdFx0aWYoIXVzZXJuYW1lKVxyXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcclxuXHRcdGlmKCFwYXNzd29yZClcclxuXHRcdFx0cGFzc3dvcmRFcnJvcj1cInBhc3N3b3JkIGlzIHJlcXVpcmVkXCJcclxuXHJcblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3IpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCh7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcn0pXHJcblxyXG5cdFx0cmV0dXJuIFVzZXIuc2lnbmluKHVzZXIpXHJcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+UHJvbWlzZS5yZWplY3Qoe3VzZXJuYW1lRXJyb3I6bWVzc2FnZX0pKVxyXG5cdH1cclxuXHQsUEhPTkVfQ09ERV9SRVFVRVNUOihwaG9uZSxleGlzdGVuY2UpPT5kaXNwYXRjaD0+VXNlci5yZXF1ZXN0UGhvbmVDb2RlKHBob25lLGV4aXN0ZW5jZSlcclxuXHJcblx0LEZPUkdFVF9QQVNTV09SRDogdmVyaWZ5UGhvbmU9PmRpc3BhdGNoPT5Vc2VyLnJlcXVlc3RQYXNzd29yZFJlc2V0KHZlcmlmeVBob25lKVxyXG5cclxuXHQsUkVTRVRfUEFTU1dPUkQ6IChvbGRQd2QsIG5ld1B3ZCk9PmRpc3BhdGNoPT5Vc2VyLnJlc2V0UGFzc3dvcmQob2xkUHdkLCBuZXdQd2QpXHJcblxyXG5cdCxTSUdOVVBfVUk6e3R5cGU6YFNJR05VUF9VSWB9XHJcblx0LFNJR05JTl9VSTp7dHlwZTpgU0lHTklOX1VJYH1cclxuXHQsRk9SR0VUX1BBU1NXT1JEX1VJOnt0eXBlOmBGT1JHRVRfUEFTU1dPUkRfVUlgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWNjb3VudCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17dHlwZTpudWxsfVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IHt1c2VyLGRpc3BhdGNoLC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG5cdFx0bGV0IHt0eXBlfT10aGlzLnN0YXRlXHJcblx0XHRcclxuXHRcdGlmKCF0eXBlKVxyXG5cdFx0XHR0eXBlPSdTSUdOSU5fVUknXHJcblxyXG5cdFx0b3RoZXJzLmRpc3BhdGNoPWFjdGlvbj0+e1xyXG5cdFx0XHRzd2l0Y2goYWN0aW9uLnR5cGUpe1xyXG5cdFx0XHRjYXNlIGBTSUdOVVBfVUlgOlxyXG5cdFx0XHRjYXNlIGBTSUdOSU5fVUlgOlxyXG5cdFx0XHRjYXNlIGBGT1JHRVRfUEFTU1dPUkRfVUlgOlxyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3R5cGU6YWN0aW9uLnR5cGV9KVxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiBkaXNwYXRjaChhY3Rpb24pXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRjYXNlICdTSUdOVVBfVUknOlxyXG5cdFx0XHRyZXR1cm4gKDxTaWdudXAgey4uLm90aGVyc30gLz4pXHJcblx0XHRjYXNlICdTSUdOSU5fVUknOlxyXG5cdFx0XHRyZXR1cm4gKDxTaWduaW4gey4uLm90aGVyc30gdXNlcm5hbWU9e3VzZXIgPyB1c2VyLnVzZXJuYW1lIDogbnVsbH0vPilcclxuXHRcdGNhc2UgJ0ZPUkdFVF9QQVNTV09SRF9VSSc6XHJcblx0XHRcdHJldHVybiAoPEZvcmdldFBhc3N3b3JkIHsuLi5vdGhlcnN9Lz4pXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBTaWdudXAgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9IHt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLCBwYXNzd29yZDJFcnJvcn09dGhpcy5zdGF0ZVxyXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXHJcblxyXG5cdFx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmQyLCBzbXNcclxuXHJcblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVAoe1xyXG5cdFx0XHR1c2VybmFtZTp1c2VybmFtZS5nZXRWYWx1ZSgpXHJcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXHJcblx0XHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcclxuXHRcdFx0LHZlcmlmeVBob25lOnNtcy5kYXRhXHJcblx0XHR9KSkuY2F0Y2goZT0+dGhpcy5zZXRTdGF0ZShPYmplY3QuYXNzaWduKHt9LHt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH0sZSkpKVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ251cFwiPlxyXG5cdFx0XHRcdDxTTVNSZXF1ZXN0IHJlZj17YT0+c21zPWF9IGRpc3BhdGNoPXtkaXNwYXRjaH0gZXhpc3RlbmNlPXtmYWxzZX0vPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT51c2VybmFtZT1hfVxyXG5cdFx0XHRcdFx0aGludFRleHQ9XCJsb2dpbiBuYW1lXCJcclxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cclxuXHRcdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxyXG5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cclxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgc2VuZCgpfX1cclxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIiBlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9Lz5cclxuXHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkMj1hfVxyXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxyXG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiIGVycm9yVGV4dD17cGFzc3dvcmQyRXJyb3J9Lz5cclxuXHJcblx0XHRcdFx0PGNlbnRlcj5cclxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCIgcHJpbWFyeT17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XHJcblx0XHRcdFx0PC9jZW50ZXI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxyXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XHJcblxyXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNpZ25pbiBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGx9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7dXNlcm5hbWUsIGRpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcn09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IHJlZlVzZXJuYW1lLCByZWZQYXNzd29yZCwgc21zXHJcblxyXG5cdFx0bGV0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTih7XHJcblx0XHRcdHVzZXJuYW1lOnJlZlVzZXJuYW1lLmdldFZhbHVlKClcclxuXHRcdFx0LHBhc3N3b3JkOnJlZlBhc3N3b3JkLmdldFZhbHVlKClcclxuXHRcdFx0LHZlcmlmeVBob25lOnNtcy5kYXRhXHJcblx0XHR9KSkuY2F0Y2goZT0+dGhpcy5zZXRTdGF0ZShPYmplY3QuYXNzaWduKHt9LHt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbH0sZSkpKVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ25pblwiPlxyXG5cdFx0XHRcdDxTTVNSZXF1ZXN0IHJlZj17YT0+c21zPWF9IGRpc3BhdGNoPXtkaXNwYXRjaH0gZXhpc3RlbmNlPXt0cnVlfS8+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlVzZXJuYW1lPWF9XHJcblx0XHRcdFx0XHRoaW50VGV4dD1cImxvZ2luIG5hbWUgb3IgcGhvbmUgbnVtYmVyXCJcclxuXHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dXNlcm5hbWV9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmUGFzc3dvcmQ9YX1cclxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxyXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cclxuXHRcdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cclxuXHRcdFx0XHQ8Y2VudGVyPlxyXG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cclxuXHRcdFx0XHQ8L2NlbnRlcj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XHJcblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cIm5vIGFjY291bnRcIlxyXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVBfVUkpfS8+XHJcblxyXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxyXG5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBGb3JnZXRQYXNzd29yZCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17cGhvbmVWZXJpZmllZEVycm9yOm51bGx9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtwaG9uZVZlcmlmaWVkRXJyb3J9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBzbXNcclxuXHRcdGNvbnN0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRCh7dmVyaWZ5UGhvbmU6c21zLmRhdGF9KSlcclxuXHRcdFx0LnRoZW4oYT0+e1xyXG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cGhvbmVWZXJpZmllZEVycm9yOm51bGx9KVxyXG5cdFx0XHRcdFx0YWxlcnQoYGEgdGVtcCBwYXNzd29yZCBzZW50IHRvIHlvdXIgcGhvbmUsIHBsZWFzZSBzaWduIGluIHdpdGhpbiAyIGhvdXJzIGFuZCByZXNldCBwYXNzd29yZCBpbW1lZGlhdGx5YClcclxuXHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpXHJcblx0XHRcdFx0fSwgZT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmVWZXJpZmllZEVycm9yOmV9KSlcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJmb3JnZXRQd2RcIj5cclxuXHRcdFx0XHQ8U01TUmVxdWVzdCByZWY9e2E9PnNtcz1hfSBkaXNwYXRjaD17ZGlzcGF0Y2h9IGV4aXN0ZW5jZT17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHQ8Y2VudGVyPlxyXG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNlbmQgbWUgdGVtcCBwYXNzd29yZFwiIHByaW1hcnk9e3RydWV9XHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnNlbmQoKX0vPlxyXG5cdFx0XHRcdDwvY2VudGVyPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cclxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XHJcblxyXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCJcclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUF9VSSl9Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNldFBhc3N3b3JkIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtyZXNldEVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3Jlc2V0RXJyb3IsIHBhc3N3b3JkRXJyb3IsIHBhc3N3b3JkMkVycm9yfT10aGlzLnN0YXRlXHJcblxyXG5cdFx0bGV0IG9sZFBhc3N3b3JkLCBwYXNzd29yZCwgcGFzc3dvcmQyXHJcblx0XHRjb25zdCBzZW5kPWE9PntcclxuXHRcdFx0bGV0IG5ld1Bhc3N3b3JkPXBhc3N3b3JkLmdldFZhbHVlKClcclxuXHRcdFx0aWYocGFzc3dvcmQyLmdldFZhbHVlKCkhPW5ld1Bhc3N3b3JkKXtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtwYXNzd29yZDJFcnJvcjpcInBhc3N3b3JkIG5vdCBtYXRjaGVkXCJ9KVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQob2xkUGFzc3dvcmQuZ2V0VmFsdWUoKSwgbmV3UGFzc3dvcmQpKVxyXG5cdFx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cmVzZXRFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9KVxyXG5cdFx0XHRcdFx0XHRhbGVydChcIuS/ruaUueaIkOWKn1wiKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGVycm9yPT50aGlzLnNldFN0YXRlKHtyZXNldEVycm9yOmVycm9yLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9KSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJyZXNldFwiPlxyXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5vbGRQYXNzd29yZD1hfSBoaW50VGV4dD1cIm9sZCBwYXNzd29yZFwiXHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHRlcnJvclRleHQ9e3Jlc2V0RXJyb3J9Lz5cclxuXHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9XHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XHJcblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxyXG5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnBhc3N3b3JkMj1hfVxyXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxyXG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtwYXNzd29yZDJFcnJvcn1cclxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiXHJcblx0XHRcdFx0XHRoaW50VGV4dD1cInBhc3N3b3JkIGFnYWluXCIvPlxyXG5cclxuXHRcdFx0XHQ8Y2VudGVyPlxyXG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInJlc2V0IHBhc3N3b3JkXCIgcHJpbWFyeT17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XHJcblx0XHRcdFx0PC9jZW50ZXI+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50XHJcbiJdfQ==