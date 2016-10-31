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
			return payload;
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
	return state.account;
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
	return state.account;
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
	return state.account;
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
	return state.account;
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
	return state.account;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsIkFDVElPTiIsIlNJR05VUCIsInVzZXJuYW1lIiwidXNlciIsInBhc3N3b3JkIiwicGFzc3dvcmQyIiwidXNlcm5hbWVFcnJvciIsInBhc3N3b3JkRXJyb3IiLCJwYXNzd29yZDJFcnJvciIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJQcm9taXNlIiwicmVqZWN0Iiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfVkVSSUZZX1JFUVVFU1QiLCJyZXF1ZXN0VmVyaWZpY2F0aW9uIiwicGhvbmUiLCJQSE9ORV9WRVJJRlkiLCJjb2RlIiwidmVyaWZ5UGhvbmUiLCJ0aGVuIiwiU0lHTlVQX1VJIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsImNvbnRhY3RFcnJvciIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiYWxlcnQiLCJTSUdOSU5fVUkiLCJGT1JHRVRfUEFTU1dPUkRfVUkiLCJSRVNFVF9QQVNTV09SRF9VSSIsIlBIT05FX1ZFUklGWV9VSSIsIlJFRFVDRVIiLCJzdGF0ZSIsIkFjY291bnQiLCJwcm9wcyIsIlBob25lVmVyaWZpY2F0aW9uIiwiYWNjb3VudCIsInBob25lVmVyaWZpZWRFcnJvciIsImEiLCJlIiwia2V5Q29kZSIsImdldFZhbHVlIiwiU2lnbnVwIiwidmFsdWVzIiwiU2lnbmluIiwiRm9yZ2V0UGFzc3dvcmQiLCJSZXNldFBhc3N3b3JkIiwicmVzZXRFcnJvciIsIm9sZFBhc3N3b3JkIiwiUkVTRVRfUEFTU1dPUkQiLCJTTVNSZXF1ZXN0IiwidGljayIsImkiLCJkb1RpY2siLCJfdCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInNldFN0YXRlIiwiYnV0dG9uIiwicmVmUGhvbmUiLCJ2YWx1ZSIsInRhcmdldCIsImlzUGhvbmUiLCJ2IiwidGVzdCIsIk9iamVj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O0FBQUEsTUFBSyxXQUFVLFlBQWY7QUFDSTtBQUNYLFVBQUs7QUFBQSxhQUFHa0IsV0FBU3JCLENBQVo7QUFBQSxNQURNO0FBRVgsZUFBUyw0QkFGRTtBQUdYLGVBQVUsQ0FBQyxDQUFDYSxJQUhEO0FBSUksZUFBVTtBQUFBLFVBQVVTLEtBQVYsVUFBRUMsTUFBRixDQUFVRCxLQUFWO0FBQUEsYUFBb0IsT0FBS0gsUUFBTCxDQUFjLEVBQUN6QyxPQUFPLE9BQUs4QyxPQUFMLENBQWFGLEtBQWIsSUFBcUJBLEtBQXJCLEdBQTZCLElBQXJDLEVBQWQsQ0FBcEI7QUFBQSxNQUpkLEdBREo7QUFNS0Y7QUFOTCxJQURKO0FBVUg7OzswQkFFSUssQyxFQUFFO0FBQ0gsVUFBUSxzQkFBRCxDQUF3QkMsSUFBeEIsQ0FBNkJELENBQTdCO0FBQVA7QUFDSDs7OzZCQUVNO0FBQ1QsVUFBTyxLQUFLL0IsS0FBTCxDQUFXaEIsS0FBbEI7QUFDQTs7Ozs7O2tCQUdhaUQsT0FBT0MsTUFBUCxDQUFjakMsT0FBZCxFQUFzQixFQUFDdEMsY0FBRCxFQUFTb0MsZ0JBQVQsRUFBdEIsQyIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VGV4dEZpZWxkLEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgVXNlciBmcm9tICcuL2RiL3VzZXInXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmNvbnN0IEVOVEVSPTEzXG5jb25zdCBET01BSU49XCJ1aS5hY2NvdW50XCJcbmNvbnN0IElOSVRfU1RBVEU9e31cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRTSUdOVVA6dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUscGFzc3dvcmQscGFzc3dvcmQyfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IscGFzc3dvcmQyRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYocGFzc3dvcmQhPXBhc3N3b3JkMilcblx0XHRcdHBhc3N3b3JkMkVycm9yPVwicGFzc3dvcmQgZG9lc24ndCBtYXRjaFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3J8fHBhc3N3b3JkMkVycm9yKXtcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOVVBfVUlgLCBwYXlsb2FkOntwYXNzd29yZEVycm9yLCB1c2VybmFtZUVycm9yLHBhc3N3b3JkMkVycm9yfX0pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXHRcdH1cblxuXHRcdHJldHVybiBVc2VyLnNpZ251cCh7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vU0lHTlVQX1VJYCwgcGF5bG9hZDp7dXNlcm5hbWVFcnJvcjptZXNzYWdlfX0pKVxuXHR9XG5cdCxTSUdOSU46dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUsIHBhc3N3b3JkfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yKXtcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgLHBheWxvYWQ6e3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3J9fSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIFVzZXIuc2lnbmluKHt1c2VybmFtZSxwYXNzd29yZH0pXG5cdFx0XHQuY2F0Y2goKHttZXNzYWdlfSk9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgLHBheWxvYWQ6e3VzZXJuYW1lRXJyb3I6bWVzc2FnZX19KSlcblx0fVxuXHQsUEhPTkVfVkVSSUZZX1JFUVVFU1Q6cGhvbmU9Pntcblx0XHRVc2VyLnJlcXVlc3RWZXJpZmljYXRpb24ocGhvbmUpXG5cdFx0cmV0dXJuIHt0eXBlOmBAQCR7RE9NQUlOfS9QSE9ORV9WRVJJRllfUkVRVUVTVGB9XG5cdH1cblx0LFBIT05FX1ZFUklGWToocGhvbmUsY29kZSk9PmRpc3BhdGNoPT5Vc2VyLnZlcmlmeVBob25lKHBob25lLGNvZGUpLnRoZW4oYT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUF9VSSkpXG5cblx0LEZPUkdFVF9QQVNTV09SRDogY29udGFjdD0+ZGlzcGF0Y2g9Pntcblx0XHRpZighY29udGFjdCl7XG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vRk9SR0VUX1BBU1NXT1JEX1VJYCxjb250YWN0RXJyb3I6XCJhIHBob25lIG51bWJlciBvciBlbWFpbCBtdXN0IGJlIGdpdmVuIHRvIHJlc2V0IHBhc3N3b3JkXCJ9KVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHR9XG5cblx0XHRyZXR1cm4gVXNlci5yZXF1ZXN0UGFzc3dvcmRSZXNldChjb250YWN0KVxuXHRcdFx0LnRoZW4oYT0+YWxlcnQoYHJlc2V0IGVtYWlsL3NtcyBzZW50IHRvICR7Y29udGFjdH0sIHBsZWFzZSBmb2xsb3cgdGhlIGluc3RydWN0aW9uIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmRgKSlcblx0fVxuXG5cdCxTSUdOVVBfVUk6e3R5cGU6YEBAe0RPTUFJTn0vU0lHTlVQX1VJYH1cblx0LFNJR05JTl9VSTp7dHlwZTpgQEAke0RPTUFJTn0vU0lHTklOX1VJYH1cblx0LEZPUkdFVF9QQVNTV09SRF9VSTp7dHlwZTpgQEAke0RPTUFJTn0vRk9SR0VUX1BBU1NXT1JEX1VJYH1cblx0LFJFU0VUX1BBU1NXT1JEX1VJOnt0eXBlOmBAQCR7RE9NQUlOfS9SRVNFVF9QQVNTV09SRF9VSWB9XG5cdCxQSE9ORV9WRVJJRllfVUk6KHt0eXBlOmBAQCR7RE9NQUlOfS9QSE9ORV9WRVJJRllfVUlgfSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuXHRbRE9NQUlOXTooc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vU0lHTlVQX1VJYDpcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgOlxuXHRcdGNhc2UgYEBAJHtET01BSU59L0ZPUkdFVF9QQVNTV09SRF9VSWA6XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vUkVTRVRfUEFTU1dPUkRfVUlgOlxuXHRcdGNhc2UgYEBAJHtET01BSU59L1BIT05FX1ZFUklGWV9VSWA6XG5cdFx0XHRyZXR1cm4gcGF5bG9hZFxuXHRcdGNhc2UgYEBAJHtET01BSU59L0NMRUFSYDpcblx0XHRcdHJldHVybiBJTklUX1NUQVRFXG5cdFx0fVxuXHRcdHJldHVybiBzdGF0ZVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCBBY2NvdW50PWNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0pKFxuY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRsZXQge3VzZXIsdHlwZSxkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGlmKCF0eXBlKXtcblx0XHRcdGlmKHVzZXIpXG5cdFx0XHRcdHR5cGU9J1NJR05JTl9VSSdcblx0XHRcdGVsc2Vcblx0XHRcdFx0dHlwZT0nUEhPTkVfVkVSSUZZX1VJJ1xuXHRcdH1cblxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlICdTSUdOVVBfVUknOlxuXHRcdFx0cmV0dXJuICg8U2lnbnVwLz4pXG5cdFx0Y2FzZSAnU0lHTklOX1VJJzpcblx0XHRcdHJldHVybiAoPFNpZ25pbiB1c2VyPXt1c2VyfS8+KVxuXHRcdGNhc2UgJ1BIT05FX1ZFUklGWV9VSSc6XG5cdFx0XHRyZXR1cm4gKDxQaG9uZVZlcmlmaWNhdGlvbiAvPilcblx0XHRjYXNlICdGT1JHRVRfUEFTU1dPUkRfVUknOlxuXHRcdFx0cmV0dXJuICg8Rm9yZ2V0UGFzc3dvcmQvPilcblx0XHRjYXNlICdSRVNFVF9QQVNTV09SRF9VSSc6XG5cdFx0XHRyZXR1cm4gKDxSZXNldFBhc3N3b3JkLz4pXG5cdFx0fVxuXHR9XG59KVxuXG5jb25zdCBQaG9uZVZlcmlmaWNhdGlvbj1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShcblx0KHtwaG9uZVZlcmlmaWVkRXJyb3IsZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCBjb2RlLHBob25lXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInBob25ldmVyaWZ5XCI+XG5cdFx0XHRcdDxTTVNSZXF1ZXN0IHJlZj17YT0+cGhvbmU9YX0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5jb2RlPWF9IGhpbnRUZXh0PVwidmVyaWZpY2F0aW9uIGNvZGUgeW91IGp1c3QgcmVjZWl2ZWRcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRlkocGhvbmUuZ2V0VmFsdWUoKSxjb2RlLmdldFZhbHVlKCkpKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtwaG9uZVZlcmlmaWVkRXJyb3J9Lz5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwidmVyaWZ5XCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRlkocGhvbmUuZ2V0VmFsdWUoKSxjb2RlLmdldFZhbHVlKCkpKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiYWxyZWFkeSBoYXZlIGFuIGFjY291bnRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxufSk7XG5cbmNvbnN0IFNpZ251cD1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShcblx0KHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLCBwYXNzd29yZDJFcnJvciwgZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCB1c2VybmFtZSwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXHRcdGxldCB2YWx1ZXM9YT0+KHtcblx0XHRcdHVzZXJuYW1lOnVzZXJuYW1lLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQyOnBhc3N3b3JkMi5nZXRWYWx1ZSgpXG5cdFx0fSlcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbnVwXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT51c2VybmFtZT1hfSBoaW50VGV4dD1cImxvZ2luIG5hbWVcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXt1c2VybmFtZUVycm9yfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIgZXJyb3JUZXh0PXtwYXNzd29yZEVycm9yfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkMj1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiIGVycm9yVGV4dD17cGFzc3dvcmQyRXJyb3J9Lz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiYWxyZWFkeSBoYXZlIGFuIGFjY291bnRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG59KTtcblxuY29uc3QgU2lnbmluPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFjY291bnQpKFxuXHQoe3VzZXIsIHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IsZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCB1c2VybmFtZSwgcGFzc3dvcmRcblx0XHRsZXQgdmFsdWVzPWE9Pih7XG5cdFx0XHR1c2VybmFtZTp1c2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdH0pXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ25pblwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+dXNlcm5hbWU9YX1cblx0XHRcdFx0XHRoaW50VGV4dD1cImxvZ2luIG5hbWUgb3IgcGhvbmUgbnVtYmVyXCJcblx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e3VzZXIgJiYgdXNlci51c2VybmFtZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOSU4odmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0gZXJyb3JUZXh0PXtwYXNzd29yZEVycm9yfVxuXHRcdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiBpblwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOKHZhbHVlcygpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cIm5vIGFjY291bnRcIlxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcbn0pO1xuXG5jb25zdCBGb3JnZXRQYXNzd29yZD1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShcblx0KHtjb250YWN0RXJyb3IsIGRpc3BhdGNofSk9Pntcblx0XHRsZXQgY29udGFjdFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJmb3JnZXRQd2RcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvbnRhY3Q9YX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkQoY29udGFjdC5nZXRWYWx1ZSgpKSl9fVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0gZXJyb3JUZXh0PXtjb250YWN0RXJyb3J9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJwaG9uZSBudW1iZXIgb3IgZW1haWxcIi8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2VuZCBtZVwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEKGNvbnRhY3QuZ2V0VmFsdWUoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcbn0pO1xuXG5jb25zdCBSZXNldFBhc3N3b3JkPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFjY291bnQpKFxuXHQoe3Jlc2V0RXJyb3IsZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCBvbGRQYXNzd29yZCwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXHRcdGxldCB2YWx1ZXM9YT0+KHtcblx0XHRcdG9sZFBhc3N3b3JkOm9sZFBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQyOnBhc3N3b3JkMi5nZXRWYWx1ZSgpXG5cdFx0fSlcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicmVzZXRcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9Pm9sZFBhc3N3b3JkPWF9IGhpbnRUZXh0PVwib2xkIHBhc3N3b3JkXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtyZXNldEVycm9yfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkMj1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkIGFnYWluXCIvPlxuXG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInJlc2V0IHBhc3N3b3JkXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxufSlcblxuY2xhc3MgU01TUmVxdWVzdCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Bob25lOm51bGwsdGljazpudWxsfVxuXG4gICAgdGljaygpe1xuICAgICAgICBsZXQgaT02MCwgZG9UaWNrO1xuICAgICAgICB0aGlzLl90PXNldEludGVydmFsKGRvVGljaz0oKT0+e1xuICAgICAgICAgICAgaWYoaT09MCl7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6IDB9KVxuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOmktLX0pXG4gICAgICAgIH0sMTAwMCk7XG5cbiAgICAgICAgZG9UaWNrKClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICBpZih0aGlzLl90KVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7cGhvbmUsIHRpY2t9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRsZXQgYnV0dG9uLCByZWZQaG9uZVxuXHRcdGlmKHBob25lKXtcbiAgICAgICAgICAgIGlmKHRpY2spXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGlja30gZGlzYWJsZWQ9e3RydWV9Lz4pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGljaz09PTAgPyBcInJlc2VuZFwiIDogXCJzZW5kXCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnRpY2soKVxuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfUkVRVUVTVChyZWZQaG9uZS5nZXRWYWx1ZSgpKSlcblx0XHRcdFx0XHRcdFx0fX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtc3JlcXVlc3RcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG5cdFx0XHRcdFx0cmVmPXthPT5yZWZQaG9uZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGhvbmUgbnVtYmVyIChkZWZhdWx0ICs4NilcIlxuXHRcdFx0XHRcdGRpc2FibGVkPXshIXRpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnRoaXMuc2V0U3RhdGUoe3Bob25lOiB0aGlzLmlzUGhvbmUodmFsdWUpPyB2YWx1ZSA6IG51bGx9KX0vPlxuICAgICAgICAgICAgICAgIHtidXR0b259XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuXHRpc1Bob25lKHYpe1xuICAgICAgICByZXR1cm4gKC9eKFxcK1xcZHsyfSk/XFxkezExfSQvZykudGVzdCh2KVxuICAgIH1cblxuXHRnZXRWYWx1ZSgpe1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLnBob25lXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihBY2NvdW50LHtBQ1RJT04sIFJFRFVDRVJ9KVxuIl19