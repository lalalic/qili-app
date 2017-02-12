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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ2ZXJpZnlQaG9uZSIsInVzZXJuYW1lRXJyb3IiLCJwYXNzd29yZEVycm9yIiwicGFzc3dvcmQyRXJyb3IiLCJQcm9taXNlIiwicmVqZWN0Iiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfQ09ERV9SRVFVRVNUIiwicGhvbmUiLCJleGlzdGVuY2UiLCJyZXF1ZXN0UGhvbmVDb2RlIiwiRk9SR0VUX1BBU1NXT1JEIiwicmVxdWVzdFBhc3N3b3JkUmVzZXQiLCJSRVNFVF9QQVNTV09SRCIsIm9sZFB3ZCIsIm5ld1B3ZCIsInJlc2V0UGFzc3dvcmQiLCJTSUdOVVBfVUkiLCJ0eXBlIiwiU0lHTklOX1VJIiwiRk9SR0VUX1BBU1NXT1JEX1VJIiwiQWNjb3VudCIsInN0YXRlIiwicHJvcHMiLCJkaXNwYXRjaCIsIm90aGVycyIsImFjdGlvbiIsInNldFN0YXRlIiwiU2lnbnVwIiwic21zIiwic2VuZCIsImdldFZhbHVlIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsImUiLCJhIiwia2V5Q29kZSIsIlNpZ25pbiIsInJlZlVzZXJuYW1lIiwicmVmUGFzc3dvcmQiLCJGb3JnZXRQYXNzd29yZCIsInBob25lVmVyaWZpZWRFcnJvciIsInRoZW4iLCJhbGVydCIsIlJlc2V0UGFzc3dvcmQiLCJyZXNldEVycm9yIiwib2xkUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQU0sRUFBWjs7QUFFTyxJQUFNQywwQkFBTztBQUNuQkMsU0FBTztBQUFBLFNBQU0sb0JBQVU7QUFBQSxP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QztBQUNDLGdCQUFXLElBRFo7QUFFQyxnQkFBVyxzQkFBRztBQUFDRCxRQUFFRSxPQUFGLElBQVdoRCxLQUFYLElBQW9CeUMsTUFBcEI7QUFBMkIsTUFGM0M7QUFHQyxnQkFBV2dCLFVBSFosR0FERDtBQU1DLDJEQUFXLEtBQUs7QUFBQSxhQUFHcEQsV0FBUzBDLENBQVo7QUFBQSxNQUFoQjtBQUNDLGdCQUFXLElBRFo7QUFFQyxnQkFBV3RDLGFBRlo7QUFHQyxnQkFBVyxzQkFBRztBQUFDcUMsUUFBRUUsT0FBRixJQUFXaEQsS0FBWCxJQUFvQnlDLE1BQXBCO0FBQTJCLE1BSDNDO0FBSUMsV0FBSyxVQUpOLEVBSWlCLFVBQVMsVUFKMUIsR0FORDtBQVlDLHlEQUFZLEtBQUs7QUFBQSxhQUFHbkMsWUFBVXlDLENBQWI7QUFBQSxNQUFqQjtBQUNDLGdCQUFXLElBRFo7QUFFQyxnQkFBVyxzQkFBRztBQUFDRCxRQUFFRSxPQUFGLElBQVdoRCxLQUFYLElBQW9CeUMsTUFBcEI7QUFBMkIsTUFGM0M7QUFHQyxnQkFBVy9CLGNBSFo7QUFJQyxXQUFLLFVBSk47QUFLQyxlQUFTLGdCQUxWLEdBWkQ7QUFtQkM7QUFBQTtBQUFBO0FBQ0MsK0RBQWMsT0FBTSxnQkFBcEIsRUFBcUMsU0FBUyxJQUE5QztBQUNDLGVBQVM7QUFBQSxjQUFHK0IsTUFBSDtBQUFBLE9BRFY7QUFERDtBQW5CRCxJQUREO0FBMEJBOzs7Ozs7a0JBR2FULE8iLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1RleHRGaWVsZCwgRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuaW1wb3J0IFVzZXIgZnJvbSAnLi9kYi91c2VyJ1xuaW1wb3J0IFRleHRGaWVsZHggZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0LWZpZWxkXCJcbmltcG9ydCBTTVNSZXF1ZXN0IGZyb20gXCIuL2NvbXBvbmVudHMvc21zLXJlcXVlc3RcIlxuXG5jb25zdCBFTlRFUj0xM1xuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0U0lHTlVQOnVzZXI9PmRpc3BhdGNoPT57XG5cdFx0Y29uc3Qge3VzZXJuYW1lLHBhc3N3b3JkLHBhc3N3b3JkMix2ZXJpZnlQaG9uZX09dXNlclxuXHRcdGxldCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLHBhc3N3b3JkMkVycm9yXG5cdFx0aWYoIXVzZXJuYW1lKVxuXHRcdFx0dXNlcm5hbWVFcnJvcj1cInVzZXIgbmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYoIXBhc3N3b3JkKVxuXHRcdFx0cGFzc3dvcmRFcnJvcj1cInBhc3N3b3JkIGlzIHJlcXVpcmVkXCJcblxuXHRcdGlmKHBhc3N3b3JkIT1wYXNzd29yZDIpXG5cdFx0XHRwYXNzd29yZDJFcnJvcj1cInBhc3N3b3JkIGRvZXNuJ3QgbWF0Y2hcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yfHxwYXNzd29yZDJFcnJvcilcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCh7cGFzc3dvcmRFcnJvciwgdXNlcm5hbWVFcnJvcixwYXNzd29yZDJFcnJvcn0pXG5cblx0XHRyZXR1cm4gVXNlci5zaWdudXAoe3VzZXJuYW1lLHBhc3N3b3JkLHZlcmlmeVBob25lfSlcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+UHJvbWlzZS5yZWplY3Qoe3VzZXJuYW1lRXJyb3I6bWVzc2FnZX0pKVxuXHR9XG5cdCxTSUdOSU46dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUsIHBhc3N3b3JkfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfSlcblxuXHRcdHJldHVybiBVc2VyLnNpZ25pbih1c2VyKVxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5Qcm9taXNlLnJlamVjdCh7dXNlcm5hbWVFcnJvcjptZXNzYWdlfSkpXG5cdH1cblx0LFBIT05FX0NPREVfUkVRVUVTVDoocGhvbmUsZXhpc3RlbmNlKT0+ZGlzcGF0Y2g9PlVzZXIucmVxdWVzdFBob25lQ29kZShwaG9uZSxleGlzdGVuY2UpXG5cblx0LEZPUkdFVF9QQVNTV09SRDogdmVyaWZ5UGhvbmU9PmRpc3BhdGNoPT5Vc2VyLnJlcXVlc3RQYXNzd29yZFJlc2V0KHZlcmlmeVBob25lKVxuXG5cdCxSRVNFVF9QQVNTV09SRDogKG9sZFB3ZCwgbmV3UHdkKT0+ZGlzcGF0Y2g9PlVzZXIucmVzZXRQYXNzd29yZChvbGRQd2QsIG5ld1B3ZClcblxuXHQsU0lHTlVQX1VJOnt0eXBlOmBTSUdOVVBfVUlgfVxuXHQsU0lHTklOX1VJOnt0eXBlOmBTSUdOSU5fVUlgfVxuXHQsRk9SR0VUX1BBU1NXT1JEX1VJOnt0eXBlOmBGT1JHRVRfUEFTU1dPUkRfVUlgfVxufVxuXG5leHBvcnQgY2xhc3MgQWNjb3VudCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3R5cGU6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0bGV0IHt1c2VyLGRpc3BhdGNoLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGxldCB7dHlwZX09dGhpcy5zdGF0ZVxuXG5cdFx0aWYoIXR5cGUpXG5cdFx0XHR0eXBlPSdTSUdOSU5fVUknXG5cblx0XHRvdGhlcnMuZGlzcGF0Y2g9YWN0aW9uPT57XG5cdFx0XHRzd2l0Y2goYWN0aW9uLnR5cGUpe1xuXHRcdFx0Y2FzZSBgU0lHTlVQX1VJYDpcblx0XHRcdGNhc2UgYFNJR05JTl9VSWA6XG5cdFx0XHRjYXNlIGBGT1JHRVRfUEFTU1dPUkRfVUlgOlxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt0eXBlOmFjdGlvbi50eXBlfSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBkaXNwYXRjaChhY3Rpb24pXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ1NJR05VUF9VSSc6XG5cdFx0XHRyZXR1cm4gKDxTaWdudXAgey4uLm90aGVyc30gLz4pXG5cdFx0Y2FzZSAnU0lHTklOX1VJJzpcblx0XHRcdHJldHVybiAoPFNpZ25pbiB7Li4ub3RoZXJzfSB1c2VybmFtZT17dXNlciA/IHVzZXIudXNlcm5hbWUgOiBudWxsfS8+KVxuXHRcdGNhc2UgJ0ZPUkdFVF9QQVNTV09SRF9VSSc6XG5cdFx0XHRyZXR1cm4gKDxGb3JnZXRQYXNzd29yZCB7Li4ub3RoZXJzfS8+KVxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBTaWdudXAgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPSB7dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLCBwYXNzd29yZDJFcnJvcn09dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXG5cdFx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmQyLCBzbXNcblxuXHRcdGNvbnN0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh7XG5cdFx0XHR1c2VybmFtZTp1c2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkMjpwYXNzd29yZDIuZ2V0VmFsdWUoKVxuXHRcdFx0LHZlcmlmeVBob25lOnNtcy5kYXRhXG5cdFx0fSkpLmNhdGNoKGU9PnRoaXMuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSx7dXNlcm5hbWVFcnJvcjpudWxsLCBwYXNzd29yZEVycm9yOm51bGwsIHBhc3N3b3JkMkVycm9yOm51bGx9LGUpKSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWdudXBcIj5cblx0XHRcdFx0PFNNU1JlcXVlc3QgcmVmPXthPT5zbXM9YX0gZGlzcGF0Y2g9e2Rpc3BhdGNofSBleGlzdGVuY2U9e2ZhbHNlfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJsb2dpbiBuYW1lXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiIGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIiBlcnJvclRleHQ9e3Bhc3N3b3JkMkVycm9yfS8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5zZW5kKCl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5jbGFzcyBTaWduaW4gZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXt1c2VybmFtZUVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3VzZXJuYW1lLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfT10aGlzLnN0YXRlXG5cdFx0bGV0IHJlZlVzZXJuYW1lLCByZWZQYXNzd29yZFxuXG5cdFx0bGV0IHNlbmQ9YT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTih7XG5cdFx0XHR1c2VybmFtZTpyZWZVc2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cmVmUGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdH0pKS5jYXRjaChlPT50aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30se3VzZXJuYW1lRXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsfSxlKSkpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbmluXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVc2VybmFtZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwibG9naW4gbmFtZSBvciBwaG9uZSBudW1iZXJcIlxuXHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dXNlcm5hbWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBzZW5kKCl9fVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cblx0XHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJubyBhY2NvdW50XCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUF9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuY2xhc3MgRm9yZ2V0UGFzc3dvcmQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtwaG9uZVZlcmlmaWVkRXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3Bob25lVmVyaWZpZWRFcnJvcn09dGhpcy5zdGF0ZVxuXHRcdGxldCBzbXNcblx0XHRjb25zdCBzZW5kPWE9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkQoe3ZlcmlmeVBob25lOnNtcy5kYXRhfSkpXG5cdFx0XHQudGhlbihhPT57XG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7cGhvbmVWZXJpZmllZEVycm9yOm51bGx9KVxuXHRcdFx0XHRcdGFsZXJ0KGBhIHRlbXAgcGFzc3dvcmQgc2VudCB0byB5b3VyIHBob25lLCBwbGVhc2Ugc2lnbiBpbiB3aXRoaW4gMiBob3VycyBhbmQgcmVzZXQgcGFzc3dvcmQgaW1tZWRpYXRseWApXG5cdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSlcblx0XHRcdFx0fSwgZT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmVWZXJpZmllZEVycm9yOmV9KSlcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJmb3JnZXRQd2RcIj5cblx0XHRcdFx0PFNNU1JlcXVlc3QgcmVmPXthPT5zbXM9YX0gZGlzcGF0Y2g9e2Rpc3BhdGNofSBleGlzdGVuY2U9e3RydWV9Lz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzZW5kIG1lIHRlbXAgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgUmVzZXRQYXNzd29yZCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Jlc2V0RXJyb3I6bnVsbCwgcGFzc3dvcmRFcnJvcjpudWxsLCBwYXNzd29yZDJFcnJvcjpudWxsfVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7cmVzZXRFcnJvciwgcGFzc3dvcmRFcnJvciwgcGFzc3dvcmQyRXJyb3J9PXRoaXMuc3RhdGVcblxuXHRcdGxldCBvbGRQYXNzd29yZCwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXHRcdGNvbnN0IHNlbmQ9YT0+e1xuXHRcdFx0bGV0IG5ld1Bhc3N3b3JkPXBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdGlmKHBhc3N3b3JkMi5nZXRWYWx1ZSgpIT1uZXdQYXNzd29yZCl7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe3Bhc3N3b3JkMkVycm9yOlwicGFzc3dvcmQgbm90IG1hdGNoZWRcIn0pXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQob2xkUGFzc3dvcmQuZ2V0VmFsdWUoKSwgbmV3UGFzc3dvcmQpKVxuXHRcdFx0XHQudGhlbihhPT57XG5cdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtyZXNldEVycm9yOm51bGwsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH0pXG5cdFx0XHRcdFx0XHRhbGVydChcIuS/ruaUueaIkOWKn1wiKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXJyb3I9PnRoaXMuc2V0U3RhdGUoe3Jlc2V0RXJyb3I6ZXJyb3IsIHBhc3N3b3JkRXJyb3I6bnVsbCwgcGFzc3dvcmQyRXJyb3I6bnVsbH0pKVxuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJyZXNldFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+b2xkUGFzc3dvcmQ9YX0gaGludFRleHQ9XCJvbGQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtyZXNldEVycm9yfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnBhc3N3b3JkMj1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHNlbmQoKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtwYXNzd29yZDJFcnJvcn1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIlxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwicmVzZXQgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+c2VuZCgpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudFxuIl19