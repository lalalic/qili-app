'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Account = exports.REDUCER = exports.ACTION = undefined;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ENTER = 13;
var DOMAIN = "ui.account";
var INIT_STATE = {};
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

			if (usernameError || passwordError || password2Error) {
				dispatch({ type: '@@' + DOMAIN + '/SIGNUP_UI', payload: { passwordError: passwordError, usernameError: usernameError, password2Error: password2Error } });
				return Promise.reject();
			}

			return _user2.default.signup({ username: username, password: password }).catch(function (_ref) {
				var message = _ref.message;
				return dispatch({ type: '@@' + DOMAIN + '/SIGNUP_UI', payload: { usernameError: message } });
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

			if (usernameError || passwordError) {
				dispatch({ type: '@@' + DOMAIN + '/SIGNIN_UI', payload: { usernameError: usernameError, passwordError: passwordError } });
				return Promise.reject();
			}

			return _user2.default.signin({ username: username, password: password }).catch(function (_ref2) {
				var message = _ref2.message;
				return dispatch({ type: '@@' + DOMAIN + '/SIGNIN_UI', payload: { usernameError: message } });
			});
		};
	},
	PHONE_VERIFY_REQUEST: function PHONE_VERIFY_REQUEST(phone) {
		_user2.default.requestVerification(phone);
		return { type: '@@' + DOMAIN + '/PHONE_VERIFY_REQUEST' };
	},
	PHONE_VERIFY: function PHONE_VERIFY(phone, code) {
		return function (dispatch) {
			return _user2.default.verifyPhone(phone, code).then(function (a) {
				return dispatch(ACTION.SIGNUP_UI);
			});
		};
	},

	FORGET_PASSWORD: function FORGET_PASSWORD(contact) {
		return function (dispatch) {
			if (!contact) {
				dispatch({ type: '@@' + DOMAIN + '/FORGET_PASSWORD_UI', contactError: "a phone number or email must be given to reset password" });
				return Promise.reject();
			}

			return _user2.default.requestPasswordReset(contact).then(function (a) {
				return alert('reset email/sms sent to ' + contact + ', please follow the instruction to reset your password');
			});
		};
	},

	SIGNUP_UI: { type: '@@{DOMAIN}/SIGNUP_UI' },
	SIGNIN_UI: { type: '@@' + DOMAIN + '/SIGNIN_UI' },
	FORGET_PASSWORD_UI: { type: '@@' + DOMAIN + '/FORGET_PASSWORD_UI' },
	RESET_PASSWORD_UI: { type: '@@' + DOMAIN + '/RESET_PASSWORD_UI' },
	PHONE_VERIFY_UI: { type: '@@' + DOMAIN + '/PHONE_VERIFY_UI' }
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
	var _ref3 = arguments[1];
	var type = _ref3.type,
	    payload = _ref3.payload;

	switch (type) {
		case '@@' + DOMAIN + '/SIGNUP_UI':
		case '@@' + DOMAIN + '/SIGNIN_UI':
		case '@@' + DOMAIN + '/FORGET_PASSWORD_UI':
		case '@@' + DOMAIN + '/RESET_PASSWORD_UI':
		case '@@' + DOMAIN + '/PHONE_VERIFY_UI':
			return Object.assign({ type: type.split("/").pop() }, payload);
		case '@@' + DOMAIN + '/CLEAR':
			return INIT_STATE;
	}
	return state;
});

var Account = exports.Account = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
})(function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.props.dispatch({ type: '@@' + DOMAIN + '/CLEAR' });
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    user = _props.user,
			    type = _props.type,
			    dispatch = _props.dispatch;

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
		}
	}]);

	return _class;
}(_react.Component));

var PhoneVerification = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
})(function (_ref4) {
	var phoneVerifiedError = _ref4.phoneVerifiedError,
	    dispatch = _ref4.dispatch;

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
	return state[DOMAIN];
})(function (_ref5) {
	var usernameError = _ref5.usernameError,
	    passwordError = _ref5.passwordError,
	    password2Error = _ref5.password2Error,
	    dispatch = _ref5.dispatch;

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
	return state[DOMAIN];
})(function (_ref6) {
	var user = _ref6.user,
	    usernameError = _ref6.usernameError,
	    passwordError = _ref6.passwordError,
	    dispatch = _ref6.dispatch;

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
			errorText: usernameError }),
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return password = a;
			},
			onKeyDown: function onKeyDown(e) {
				e.keyCode == ENTER && dispatch(ACTION.SIGNIN(values()));
			},
			fullWidth: true, errorText: passwordError,
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
	return state[DOMAIN];
})(function (_ref7) {
	var contactError = _ref7.contactError,
	    dispatch = _ref7.dispatch;

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
			fullWidth: true, errorText: contactError,
			hintText: 'phone number or email' }),
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
	return state[DOMAIN];
})(function (_ref8) {
	var resetError = _ref8.resetError,
	    dispatch = _ref8.dispatch;

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

var SMSRequest = function (_Component2) {
	_inherits(SMSRequest, _Component2);

	function SMSRequest() {
		var _ref9;

		var _temp, _this2, _ret;

		_classCallCheck(this, SMSRequest);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref9 = SMSRequest.__proto__ || Object.getPrototypeOf(SMSRequest)).call.apply(_ref9, [this].concat(args))), _this2), _this2.state = { phone: null, tick: null }, _temp), _possibleConstructorReturn(_this2, _ret);
	}

	_createClass(SMSRequest, [{
		key: 'tick',
		value: function tick() {
			var _this3 = this;

			var i = 60,
			    doTick = void 0;
			this._t = setInterval(doTick = function doTick() {
				if (i == 0) {
					clearInterval(_this3._t);
					_this3.setState({ tick: 0 });
				} else _this3.setState({ tick: i-- });
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
			var _this4 = this;

			var _state = this.state,
			    phone = _state.phone,
			    tick = _state.tick;
			var dispatch = this.props.dispatch;

			var button = void 0,
			    refPhone = void 0;
			if (phone) {
				if (tick) button = _react2.default.createElement(_materialUi.FlatButton, { label: tick, disabled: true });else button = _react2.default.createElement(_materialUi.FlatButton, { label: tick === 0 ? "resend" : "send",
					onClick: function onClick(e) {
						_this4.tick();
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
						return _this4.setState({ phone: _this4.isPhone(value) ? value : null });
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

exports.default = Object.assign(Account, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsIkFDVElPTiIsIlNJR05VUCIsInVzZXJuYW1lIiwidXNlciIsInBhc3N3b3JkIiwicGFzc3dvcmQyIiwidXNlcm5hbWVFcnJvciIsInBhc3N3b3JkRXJyb3IiLCJwYXNzd29yZDJFcnJvciIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJQcm9taXNlIiwicmVqZWN0Iiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfVkVSSUZZX1JFUVVFU1QiLCJyZXF1ZXN0VmVyaWZpY2F0aW9uIiwicGhvbmUiLCJQSE9ORV9WRVJJRlkiLCJjb2RlIiwidmVyaWZ5UGhvbmUiLCJ0aGVuIiwiU0lHTlVQX1VJIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsImNvbnRhY3RFcnJvciIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiYWxlcnQiLCJTSUdOSU5fVUkiLCJGT1JHRVRfUEFTU1dPUkRfVUkiLCJSRVNFVF9QQVNTV09SRF9VSSIsIlBIT05FX1ZFUklGWV9VSSIsIlJFRFVDRVIiLCJzdGF0ZSIsIk9iamVjdCIsImFzc2lnbiIsInNwbGl0IiwicG9wIiwiQWNjb3VudCIsInByb3BzIiwiUGhvbmVWZXJpZmljYXRpb24iLCJwaG9uZVZlcmlmaWVkRXJyb3IiLCJhIiwiZSIsImtleUNvZGUiLCJnZXRWYWx1ZSIsIlNpZ251cCIsInZhbHVlcyIsIlNpZ25pbiIsIkZvcmdldFBhc3N3b3JkIiwiUmVzZXRQYXNzd29yZCIsInJlc2V0RXJyb3IiLCJvbGRQYXNzd29yZCIsIlJFU0VUX1BBU1NXT1JEIiwiU01TUmVxdWVzdCIsInRpY2siLCJpIiwiZG9UaWNrIiwiX3QiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzZXRTdGF0ZSIsImJ1dHRvbiIsInJlZlBob25lIiwidmFsdWUiLCJ0YXJnZXQiLCJpc1Bo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QztBQUNqQixjQUFTLG9CQUFHO0FBQ1gsYUFBS0EsSUFBTDtBQUNBbEQsZUFBU1QsT0FBT21CLG9CQUFQLENBQTRCZ0QsU0FBU2xCLFFBQVQsRUFBNUIsQ0FBVDtBQUNBLE1BSmdCLEdBQVI7QUFLUDs7QUFFRCxVQUNJO0FBQUE7QUFBQSxNQUFLLFdBQVUsWUFBZjtBQUNJO0FBQ1gsVUFBSztBQUFBLGFBQUdrQixXQUFTckIsQ0FBWjtBQUFBLE1BRE07QUFFWCxlQUFTLDRCQUZFO0FBR1gsZUFBVSxDQUFDLENBQUNhLElBSEQ7QUFJSSxlQUFVO0FBQUEsVUFBVVMsS0FBVixVQUFFQyxNQUFGLENBQVVELEtBQVY7QUFBQSxhQUFvQixPQUFLSCxRQUFMLENBQWMsRUFBQzVDLE9BQU8sT0FBS2lELE9BQUwsQ0FBYUYsS0FBYixJQUFxQkEsS0FBckIsR0FBNkIsSUFBckMsRUFBZCxDQUFwQjtBQUFBLE1BSmQsR0FESjtBQU1LRjtBQU5MLElBREo7QUFVSDs7OzBCQUVJSyxDLEVBQUU7QUFDSCxVQUFRLHNCQUFELENBQXdCQyxJQUF4QixDQUE2QkQsQ0FBN0I7QUFBUDtBQUNIOzs7NkJBRU07QUFDVCxVQUFPLEtBQUtsQyxLQUFMLENBQVdoQixLQUFsQjtBQUNBOzs7Ozs7a0JBR2FpQixPQUFPQyxNQUFQLENBQWNHLE9BQWQsRUFBc0IsRUFBQzFDLGNBQUQsRUFBU29DLGdCQUFULEVBQXRCLEMiLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1RleHRGaWVsZCxGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9kYi91c2VyJ1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5jb25zdCBFTlRFUj0xM1xuY29uc3QgRE9NQUlOPVwidWkuYWNjb3VudFwiXG5jb25zdCBJTklUX1NUQVRFPXt9XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0U0lHTlVQOnVzZXI9PmRpc3BhdGNoPT57XG5cdFx0Y29uc3Qge3VzZXJuYW1lLHBhc3N3b3JkLHBhc3N3b3JkMn09dXNlclxuXHRcdGxldCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLHBhc3N3b3JkMkVycm9yXG5cdFx0aWYoIXVzZXJuYW1lKVxuXHRcdFx0dXNlcm5hbWVFcnJvcj1cInVzZXIgbmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYoIXBhc3N3b3JkKVxuXHRcdFx0cGFzc3dvcmRFcnJvcj1cInBhc3N3b3JkIGlzIHJlcXVpcmVkXCJcblxuXHRcdGlmKHBhc3N3b3JkIT1wYXNzd29yZDIpXG5cdFx0XHRwYXNzd29yZDJFcnJvcj1cInBhc3N3b3JkIGRvZXNuJ3QgbWF0Y2hcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yfHxwYXNzd29yZDJFcnJvcil7XG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vU0lHTlVQX1VJYCwgcGF5bG9hZDp7cGFzc3dvcmRFcnJvciwgdXNlcm5hbWVFcnJvcixwYXNzd29yZDJFcnJvcn19KVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHR9XG5cblx0XHRyZXR1cm4gVXNlci5zaWdudXAoe3VzZXJuYW1lLHBhc3N3b3JkfSlcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L1NJR05VUF9VSWAsIHBheWxvYWQ6e3VzZXJuYW1lRXJyb3I6bWVzc2FnZX19KSlcblx0fVxuXHQsU0lHTklOOnVzZXI9PmRpc3BhdGNoPT57XG5cdFx0Y29uc3Qge3VzZXJuYW1lLCBwYXNzd29yZH09dXNlclxuXHRcdGxldCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yXG5cdFx0aWYoIXVzZXJuYW1lKVxuXHRcdFx0dXNlcm5hbWVFcnJvcj1cInVzZXIgbmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYoIXBhc3N3b3JkKVxuXHRcdFx0cGFzc3dvcmRFcnJvcj1cInBhc3N3b3JkIGlzIHJlcXVpcmVkXCJcblxuXHRcdGlmKHVzZXJuYW1lRXJyb3IgfHwgcGFzc3dvcmRFcnJvcil7XG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vU0lHTklOX1VJYCxwYXlsb2FkOnt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfX0pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXHRcdH1cblxuXHRcdHJldHVybiBVc2VyLnNpZ25pbih7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vU0lHTklOX1VJYCxwYXlsb2FkOnt1c2VybmFtZUVycm9yOm1lc3NhZ2V9fSkpXG5cdH1cblx0LFBIT05FX1ZFUklGWV9SRVFVRVNUOnBob25lPT57XG5cdFx0VXNlci5yZXF1ZXN0VmVyaWZpY2F0aW9uKHBob25lKVxuXHRcdHJldHVybiB7dHlwZTpgQEAke0RPTUFJTn0vUEhPTkVfVkVSSUZZX1JFUVVFU1RgfVxuXHR9XG5cdCxQSE9ORV9WRVJJRlk6KHBob25lLGNvZGUpPT5kaXNwYXRjaD0+VXNlci52ZXJpZnlQaG9uZShwaG9uZSxjb2RlKS50aGVuKGE9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVBfVUkpKVxuXG5cdCxGT1JHRVRfUEFTU1dPUkQ6IGNvbnRhY3Q9PmRpc3BhdGNoPT57XG5cdFx0aWYoIWNvbnRhY3Qpe1xuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0ZPUkdFVF9QQVNTV09SRF9VSWAsY29udGFjdEVycm9yOlwiYSBwaG9uZSBudW1iZXIgb3IgZW1haWwgbXVzdCBiZSBnaXZlbiB0byByZXNldCBwYXNzd29yZFwifSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIFVzZXIucmVxdWVzdFBhc3N3b3JkUmVzZXQoY29udGFjdClcblx0XHRcdC50aGVuKGE9PmFsZXJ0KGByZXNldCBlbWFpbC9zbXMgc2VudCB0byAke2NvbnRhY3R9LCBwbGVhc2UgZm9sbG93IHRoZSBpbnN0cnVjdGlvbiB0byByZXNldCB5b3VyIHBhc3N3b3JkYCkpXG5cdH1cblxuXHQsU0lHTlVQX1VJOnt0eXBlOmBAQHtET01BSU59L1NJR05VUF9VSWB9XG5cdCxTSUdOSU5fVUk6e3R5cGU6YEBAJHtET01BSU59L1NJR05JTl9VSWB9XG5cdCxGT1JHRVRfUEFTU1dPUkRfVUk6e3R5cGU6YEBAJHtET01BSU59L0ZPUkdFVF9QQVNTV09SRF9VSWB9XG5cdCxSRVNFVF9QQVNTV09SRF9VSTp7dHlwZTpgQEAke0RPTUFJTn0vUkVTRVRfUEFTU1dPUkRfVUlgfVxuXHQsUEhPTkVfVkVSSUZZX1VJOih7dHlwZTpgQEAke0RPTUFJTn0vUEhPTkVfVkVSSUZZX1VJYH0pXG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcblx0W0RPTUFJTl06KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgYEBAJHtET01BSU59L1NJR05VUF9VSWA6XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vU0lHTklOX1VJYDpcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9GT1JHRVRfUEFTU1dPUkRfVUlgOlxuXHRcdGNhc2UgYEBAJHtET01BSU59L1JFU0VUX1BBU1NXT1JEX1VJYDpcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9QSE9ORV9WRVJJRllfVUlgOlxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe3R5cGU6dHlwZS5zcGxpdChcIi9cIikucG9wKCl9LHBheWxvYWQpXG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vQ0xFQVJgOlxuXHRcdFx0cmV0dXJuIElOSVRfU1RBVEVcblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IEFjY291bnQ9Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSkoXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9DTEVBUmB9KVxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGxldCB7dXNlcix0eXBlLGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0aWYoIXR5cGUpe1xuXHRcdFx0aWYodXNlcilcblx0XHRcdFx0dHlwZT0nU0lHTklOX1VJJ1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0eXBlPSdQSE9ORV9WRVJJRllfVUknXG5cdFx0fVxuXG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ1NJR05VUF9VSSc6XG5cdFx0XHRyZXR1cm4gKDxTaWdudXAvPilcblx0XHRjYXNlICdTSUdOSU5fVUknOlxuXHRcdFx0cmV0dXJuICg8U2lnbmluIHVzZXI9e3VzZXJ9Lz4pXG5cdFx0Y2FzZSAnUEhPTkVfVkVSSUZZX1VJJzpcblx0XHRcdHJldHVybiAoPFBob25lVmVyaWZpY2F0aW9uIC8+KVxuXHRcdGNhc2UgJ0ZPUkdFVF9QQVNTV09SRF9VSSc6XG5cdFx0XHRyZXR1cm4gKDxGb3JnZXRQYXNzd29yZC8+KVxuXHRcdGNhc2UgJ1JFU0VUX1BBU1NXT1JEX1VJJzpcblx0XHRcdHJldHVybiAoPFJlc2V0UGFzc3dvcmQvPilcblx0XHR9XG5cdH1cbn0pXG5cbmNvbnN0IFBob25lVmVyaWZpY2F0aW9uPWNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0pKFxuXHQoe3Bob25lVmVyaWZpZWRFcnJvcixkaXNwYXRjaH0pPT57XG5cdFx0bGV0IGNvZGUscGhvbmVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicGhvbmV2ZXJpZnlcIj5cblx0XHRcdFx0PFNNU1JlcXVlc3QgcmVmPXthPT5waG9uZT1hfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvZGU9YX0gaGludFRleHQ9XCJ2ZXJpZmljYXRpb24gY29kZSB5b3UganVzdCByZWNlaXZlZFwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWShwaG9uZS5nZXRWYWx1ZSgpLGNvZGUuZ2V0VmFsdWUoKSkpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bob25lVmVyaWZpZWRFcnJvcn0vPlxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJ2ZXJpZnlcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWShwaG9uZS5nZXRWYWx1ZSgpLGNvZGUuZ2V0VmFsdWUoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG59KTtcblxuY29uc3QgU2lnbnVwPWNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0pKFxuXHQoe3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IsIHBhc3N3b3JkMkVycm9yLCBkaXNwYXRjaH0pPT57XG5cdFx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmQyXG5cdFx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdFx0dXNlcm5hbWU6dXNlcm5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcblx0XHR9KVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWdudXBcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9IGhpbnRUZXh0PVwibG9naW4gbmFtZVwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIiBlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQyPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkIGFnYWluXCIgZXJyb3JUZXh0PXtwYXNzd29yZDJFcnJvcn0vPlxuXG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcbn0pO1xuXG5jb25zdCBTaWduaW49Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSkoXG5cdCh7dXNlciwgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcixkaXNwYXRjaH0pPT57XG5cdFx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZFxuXHRcdGxldCB2YWx1ZXM9YT0+KHtcblx0XHRcdHVzZXJuYW1lOnVzZXJuYW1lLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0fSlcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbmluXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT51c2VybmFtZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwibG9naW4gbmFtZSBvciBwaG9uZSBudW1iZXJcIlxuXHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dXNlciAmJiB1c2VyLnVzZXJuYW1lfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXt1c2VybmFtZUVycm9yfS8+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTklOKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfSBlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9XG5cdFx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIGluXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU4odmFsdWVzKCkpKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwibm8gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxufSk7XG5cbmNvbnN0IEZvcmdldFBhc3N3b3JkPWNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0pKFxuXHQoe2NvbnRhY3RFcnJvciwgZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCBjb250YWN0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cImZvcmdldFB3ZFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+Y29udGFjdD1hfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRChjb250YWN0LmdldFZhbHVlKCkpKX19XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfSBlcnJvclRleHQ9e2NvbnRhY3RFcnJvcn1cblx0XHRcdFx0XHRoaW50VGV4dD1cInBob25lIG51bWJlciBvciBlbWFpbFwiLz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzZW5kIG1lXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkQoY29udGFjdC5nZXRWYWx1ZSgpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxufSk7XG5cbmNvbnN0IFJlc2V0UGFzc3dvcmQ9Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSkoXG5cdCh7cmVzZXRFcnJvcixkaXNwYXRjaH0pPT57XG5cdFx0bGV0IG9sZFBhc3N3b3JkLCBwYXNzd29yZCwgcGFzc3dvcmQyXG5cdFx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdFx0b2xkUGFzc3dvcmQ6b2xkUGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcblx0XHR9KVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJyZXNldFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+b2xkUGFzc3dvcmQ9YX0gaGludFRleHQ9XCJvbGQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Jlc2V0RXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQyPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwicmVzZXQgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG59KVxuXG5jbGFzcyBTTVNSZXF1ZXN0IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17cGhvbmU6bnVsbCx0aWNrOm51bGx9XG5cbiAgICB0aWNrKCl7XG4gICAgICAgIGxldCBpPTYwLCBkb1RpY2s7XG4gICAgICAgIHRoaXMuX3Q9c2V0SW50ZXJ2YWwoZG9UaWNrPSgpPT57XG4gICAgICAgICAgICBpZihpPT0wKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazogMH0pXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6aS0tfSlcbiAgICAgICAgfSwxMDAwKTtcblxuICAgICAgICBkb1RpY2soKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGlmKHRoaXMuX3QpXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtwaG9uZSwgdGlja309dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGxldCBidXR0b24sIHJlZlBob25lXG5cdFx0aWYocGhvbmUpe1xuICAgICAgICAgICAgaWYodGljaylcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aWNrfSBkaXNhYmxlZD17dHJ1ZX0vPilcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aWNrPT09MCA/IFwicmVzZW5kXCIgOiBcInNlbmRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudGljaygpXG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9SRVFVRVNUKHJlZlBob25lLmdldFZhbHVlKCkpKVxuXHRcdFx0XHRcdFx0XHR9fS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic21zcmVxdWVzdFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcblx0XHRcdFx0XHRyZWY9e2E9PnJlZlBob25lPWF9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJwaG9uZSBudW1iZXIgKGRlZmF1bHQgKzg2KVwiXG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyEhdGlja31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmU6IHRoaXMuaXNQaG9uZSh2YWx1ZSk/IHZhbHVlIDogbnVsbH0pfS8+XG4gICAgICAgICAgICAgICAge2J1dHRvbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG5cdGlzUGhvbmUodil7XG4gICAgICAgIHJldHVybiAoL14oXFwrXFxkezJ9KT9cXGR7MTF9JC9nKS50ZXN0KHYpXG4gICAgfVxuXG5cdGdldFZhbHVlKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUucGhvbmVcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEFjY291bnQse0FDVElPTiwgUkVEVUNFUn0pXG4iXX0=