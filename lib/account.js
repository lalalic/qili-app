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

			return _user2.default.signup({ username: username, password: password }).then(function (a) {
				dispatch({ type: '@@' + DOMAIN + '/signup.ok' });return a;
			}).catch(function (_ref) {
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

			return _user2.default.signin({ username: username, password: password }).then(function (a) {
				dispatch({ type: '@@' + DOMAIN + '/signin.ok' });return a;
			}).catch(function (_ref2) {
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
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref3 = arguments[1];
	var type = _ref3.type,
	    payload = _ref3.payload;

	switch (type) {
		case '@@' + DOMAIN + '/signin.ok':
		case '@@' + DOMAIN + '/signup.ok':
			return {};
		case '@@' + DOMAIN + '/SIGNUP_UI':
		case '@@' + DOMAIN + '/SIGNIN_UI':
		case '@@' + DOMAIN + '/FORGET_PASSWORD_UI':
		case '@@' + DOMAIN + '/RESET_PASSWORD_UI':
		case '@@' + DOMAIN + '/PHONE_VERIFY_UI':
			return payload;
	}
	return state;
});

var Account = exports.Account = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
})(function (_ref4) {
	var user = _ref4.user,
	    type = _ref4.type,
	    dispatch = _ref4.dispatch;

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
});

var PhoneVerification = (0, _reactRedux.connect)(function (state) {
	return state.account;
})(function (_ref5) {
	var phoneVerifiedError = _ref5.phoneVerifiedError,
	    dispatch = _ref5.dispatch;

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
})(function (_ref6) {
	var usernameError = _ref6.usernameError,
	    passwordError = _ref6.passwordError,
	    password2Error = _ref6.password2Error,
	    dispatch = _ref6.dispatch;

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
})(function (_ref7) {
	var user = _ref7.user,
	    usernameError = _ref7.usernameError,
	    passwordError = _ref7.passwordError,
	    dispatch = _ref7.dispatch;

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
})(function (_ref8) {
	var contactError = _ref8.contactError,
	    dispatch = _ref8.dispatch;

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
})(function (_ref9) {
	var resetError = _ref9.resetError,
	    dispatch = _ref9.dispatch;

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

var SMSRequest = function (_Component) {
	_inherits(SMSRequest, _Component);

	function SMSRequest() {
		var _ref10;

		var _temp, _this, _ret;

		_classCallCheck(this, SMSRequest);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref10 = SMSRequest.__proto__ || Object.getPrototypeOf(SMSRequest)).call.apply(_ref10, [this].concat(args))), _this), _this.state = { phone: null, tick: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(SMSRequest, [{
		key: 'tick',
		value: function tick() {
			var _this2 = this;

			var i = 60,
			    doTick = void 0;
			this._t = setInterval(doTick = function doTick() {
				if (i == 0) {
					clearInterval(_this2._t);
					_this2.setState({ tick: 0 });
				} else _this2.setState({ tick: i-- });
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
			var _this3 = this;

			var _state = this.state,
			    phone = _state.phone,
			    tick = _state.tick;
			var dispatch = this.props.dispatch;

			var button = void 0,
			    refPhone = void 0;
			if (phone) {
				if (tick) button = _react2.default.createElement(_materialUi.FlatButton, { label: tick, disabled: true });else button = _react2.default.createElement(_materialUi.FlatButton, { label: tick === 0 ? "resend" : "send",
					onClick: function onClick(e) {
						_this3.tick();
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
					onChange: function onChange(_ref11) {
						var value = _ref11.target.value;
						return _this3.setState({ phone: _this3.isPhone(value) ? value : null });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiRE9NQUlOIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ1c2VybmFtZUVycm9yIiwicGFzc3dvcmRFcnJvciIsInBhc3N3b3JkMkVycm9yIiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsIlByb21pc2UiLCJyZWplY3QiLCJzaWdudXAiLCJ0aGVuIiwiYSIsImNhdGNoIiwibWVzc2FnZSIsIlNJR05JTiIsInNpZ25pbiIsIlBIT05FX1ZFUklGWV9SRVFVRVNUIiwicmVxdWVzdFZlcmlmaWNhdGlvbiIsInBob25lIiwiUEhPTkVfVkVSSUZZIiwiY29kZSIsInZlcmlmeVBob25lIiwiU0lHTlVQX1VJIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsImNvbnRhY3RFcnJvciIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiYWxlcnQiLCJTSUdOSU5fVUkiLCJGT1JHRVRfUEFTU1dPUkRfVUkiLCJSRVNFVF9QQVNTV09SRF9VSSIsIlBIT05FX1ZFUklGWV9VSSIsIlJFRFVDRVIiLCJzdGF0ZSIsIkFjY291bnQiLCJQaG9uZVZlcmlmaWNhdGlvbiIsImFjY291bnQiLCJwaG9uZVZlcmlmaWVkRXJyb3IiLCJlIiwia2V5Q29kZSIsImdldFZhbHVlIiwiU2lnbnVwIiwidmFsdWVzIiwiU2lnbmluIiwiRm9yZ2V0UGFzc3dvcmQiLCJSZXNldFBhc3N3b3JkIiwicmVzZXRFcnJvciIsIm9sZFBhc3N3b3JkIiwiUkVTRVRfUEFTU1dPUkQiLCJTTVNSZXF1ZXN0IiwidGljayIsImkiLCJkb1RpY2siLCJfdCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInNldFN0YXRlIiwicHJvcHMiLCJidXR0b24iLCJyZWZQaG9uZSIsInZhbHVlIiwidGFyZ2V0IiwiaXNQaG9uZSIsInYiLCJ0ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7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QUFDSTtBQUNYLFVBQUs7QUFBQSxhQUFHbUIsV0FBU2hELENBQVo7QUFBQSxNQURNO0FBRVgsZUFBUyw0QkFGRTtBQUdYLGVBQVUsQ0FBQyxDQUFDdUMsSUFIRDtBQUlJLGVBQVU7QUFBQSxVQUFVVSxLQUFWLFVBQUVDLE1BQUYsQ0FBVUQsS0FBVjtBQUFBLGFBQW9CLE9BQUtKLFFBQUwsQ0FBYyxFQUFDdEMsT0FBTyxPQUFLNEMsT0FBTCxDQUFhRixLQUFiLElBQXFCQSxLQUFyQixHQUE2QixJQUFyQyxFQUFkLENBQXBCO0FBQUEsTUFKZCxHQURKO0FBTUtGO0FBTkwsSUFESjtBQVVIOzs7MEJBRUlLLEMsRUFBRTtBQUNILFVBQVEsc0JBQUQsQ0FBd0JDLElBQXhCLENBQTZCRCxDQUE3QjtBQUFQO0FBQ0g7Ozs2QkFFTTtBQUNULFVBQU8sS0FBSzlCLEtBQUwsQ0FBV2YsS0FBbEI7QUFDQTs7Ozs7O2tCQUdhZ0IsTyIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VGV4dEZpZWxkLEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgVXNlciBmcm9tICcuL2RiL3VzZXInXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmNvbnN0IEVOVEVSPTEzXG5jb25zdCBET01BSU49XCJ1aS5hY2NvdW50XCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdFNJR05VUDp1c2VyPT5kaXNwYXRjaD0+e1xuXHRcdGNvbnN0IHt1c2VybmFtZSxwYXNzd29yZCxwYXNzd29yZDJ9PXVzZXJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcixwYXNzd29yZDJFcnJvclxuXHRcdGlmKCF1c2VybmFtZSlcblx0XHRcdHVzZXJuYW1lRXJyb3I9XCJ1c2VyIG5hbWUgaXMgcmVxdWlyZWRcIlxuXHRcdGlmKCFwYXNzd29yZClcblx0XHRcdHBhc3N3b3JkRXJyb3I9XCJwYXNzd29yZCBpcyByZXF1aXJlZFwiXG5cblx0XHRpZihwYXNzd29yZCE9cGFzc3dvcmQyKVxuXHRcdFx0cGFzc3dvcmQyRXJyb3I9XCJwYXNzd29yZCBkb2Vzbid0IG1hdGNoXCJcblxuXHRcdGlmKHVzZXJuYW1lRXJyb3IgfHwgcGFzc3dvcmRFcnJvcnx8cGFzc3dvcmQyRXJyb3Ipe1xuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L1NJR05VUF9VSWAsIHBheWxvYWQ6e3Bhc3N3b3JkRXJyb3IsIHVzZXJuYW1lRXJyb3IscGFzc3dvcmQyRXJyb3J9fSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIFVzZXIuc2lnbnVwKHt1c2VybmFtZSxwYXNzd29yZH0pXG5cdFx0XHQudGhlbihhPT57ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3NpZ251cC5va2B9KTtyZXR1cm4gYX0pXG5cdFx0XHQuY2F0Y2goKHttZXNzYWdlfSk9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOVVBfVUlgLCBwYXlsb2FkOnt1c2VybmFtZUVycm9yOm1lc3NhZ2V9fSkpXG5cdH1cblx0LFNJR05JTjp1c2VyPT5kaXNwYXRjaD0+e1xuXHRcdGNvbnN0IHt1c2VybmFtZSwgcGFzc3dvcmR9PXVzZXJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvclxuXHRcdGlmKCF1c2VybmFtZSlcblx0XHRcdHVzZXJuYW1lRXJyb3I9XCJ1c2VyIG5hbWUgaXMgcmVxdWlyZWRcIlxuXHRcdGlmKCFwYXNzd29yZClcblx0XHRcdHBhc3N3b3JkRXJyb3I9XCJwYXNzd29yZCBpcyByZXF1aXJlZFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3Ipe1xuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L1NJR05JTl9VSWAscGF5bG9hZDp7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcn19KVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHR9XG5cblx0XHRyZXR1cm4gVXNlci5zaWduaW4oe3VzZXJuYW1lLHBhc3N3b3JkfSlcblx0XHRcdC50aGVuKGE9PntkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vc2lnbmluLm9rYH0pO3JldHVybiBhfSlcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L1NJR05JTl9VSWAscGF5bG9hZDp7dXNlcm5hbWVFcnJvcjptZXNzYWdlfX0pKVxuXHR9XG5cdCxQSE9ORV9WRVJJRllfUkVRVUVTVDpwaG9uZT0+e1xuXHRcdFVzZXIucmVxdWVzdFZlcmlmaWNhdGlvbihwaG9uZSlcblx0XHRyZXR1cm4ge3R5cGU6YEBAJHtET01BSU59L1BIT05FX1ZFUklGWV9SRVFVRVNUYH1cblx0fVxuXHQsUEhPTkVfVkVSSUZZOihwaG9uZSxjb2RlKT0+ZGlzcGF0Y2g9PlVzZXIudmVyaWZ5UGhvbmUocGhvbmUsY29kZSkudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQX1VJKSlcblxuXHQsRk9SR0VUX1BBU1NXT1JEOiBjb250YWN0PT5kaXNwYXRjaD0+e1xuXHRcdGlmKCFjb250YWN0KXtcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9GT1JHRVRfUEFTU1dPUkRfVUlgLGNvbnRhY3RFcnJvcjpcImEgcGhvbmUgbnVtYmVyIG9yIGVtYWlsIG11c3QgYmUgZ2l2ZW4gdG8gcmVzZXQgcGFzc3dvcmRcIn0pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXHRcdH1cblxuXHRcdHJldHVybiBVc2VyLnJlcXVlc3RQYXNzd29yZFJlc2V0KGNvbnRhY3QpXG5cdFx0XHQudGhlbihhPT5hbGVydChgcmVzZXQgZW1haWwvc21zIHNlbnQgdG8gJHtjb250YWN0fSwgcGxlYXNlIGZvbGxvdyB0aGUgaW5zdHJ1Y3Rpb24gdG8gcmVzZXQgeW91ciBwYXNzd29yZGApKVxuXHR9XG5cblx0LFNJR05VUF9VSTp7dHlwZTpgQEB7RE9NQUlOfS9TSUdOVVBfVUlgfVxuXHQsU0lHTklOX1VJOnt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgfVxuXHQsRk9SR0VUX1BBU1NXT1JEX1VJOnt0eXBlOmBAQCR7RE9NQUlOfS9GT1JHRVRfUEFTU1dPUkRfVUlgfVxuXHQsUkVTRVRfUEFTU1dPUkRfVUk6e3R5cGU6YEBAJHtET01BSU59L1JFU0VUX1BBU1NXT1JEX1VJYH1cblx0LFBIT05FX1ZFUklGWV9VSTooe3R5cGU6YEBAJHtET01BSU59L1BIT05FX1ZFUklGWV9VSWB9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj17XG5cdFtET01BSU5dOihzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vc2lnbmluLm9rYDpcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9zaWdudXAub2tgOlxuXHRcdFx0cmV0dXJuIHt9XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vU0lHTlVQX1VJYDpcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgOlxuXHRcdGNhc2UgYEBAJHtET01BSU59L0ZPUkdFVF9QQVNTV09SRF9VSWA6XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vUkVTRVRfUEFTU1dPUkRfVUlgOlxuXHRcdGNhc2UgYEBAJHtET01BSU59L1BIT05FX1ZFUklGWV9VSWA6XG5cdFx0XHRyZXR1cm4gcGF5bG9hZFxuXHRcdH1cblx0XHRyZXR1cm4gc3RhdGVcblx0fVxufVxuXG5leHBvcnQgY29uc3QgQWNjb3VudD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dKSgoe3VzZXIsdHlwZSxkaXNwYXRjaH0pPT57XG5cdGlmKCF0eXBlKXtcblx0XHRpZih1c2VyKVxuXHRcdFx0dHlwZT0nU0lHTklOX1VJJ1xuXHRcdGVsc2Vcblx0XHRcdHR5cGU9J1BIT05FX1ZFUklGWV9VSSdcblx0fVxuXG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSAnU0lHTlVQX1VJJzpcblx0XHRyZXR1cm4gKDxTaWdudXAvPilcblx0Y2FzZSAnU0lHTklOX1VJJzpcblx0XHRyZXR1cm4gKDxTaWduaW4gdXNlcj17dXNlcn0vPilcblx0Y2FzZSAnUEhPTkVfVkVSSUZZX1VJJzpcblx0XHRyZXR1cm4gKDxQaG9uZVZlcmlmaWNhdGlvbiAvPilcblx0Y2FzZSAnRk9SR0VUX1BBU1NXT1JEX1VJJzpcblx0XHRyZXR1cm4gKDxGb3JnZXRQYXNzd29yZC8+KVxuXHRjYXNlICdSRVNFVF9QQVNTV09SRF9VSSc6XG5cdFx0cmV0dXJuICg8UmVzZXRQYXNzd29yZC8+KVxuXHR9XG59KVxuXG5jb25zdCBQaG9uZVZlcmlmaWNhdGlvbj1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShcblx0KHtwaG9uZVZlcmlmaWVkRXJyb3IsZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCBjb2RlLHBob25lXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInBob25ldmVyaWZ5XCI+XG5cdFx0XHRcdDxTTVNSZXF1ZXN0IHJlZj17YT0+cGhvbmU9YX0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5jb2RlPWF9IGhpbnRUZXh0PVwidmVyaWZpY2F0aW9uIGNvZGUgeW91IGp1c3QgcmVjZWl2ZWRcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRlkocGhvbmUuZ2V0VmFsdWUoKSxjb2RlLmdldFZhbHVlKCkpKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtwaG9uZVZlcmlmaWVkRXJyb3J9Lz5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwidmVyaWZ5XCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRlkocGhvbmUuZ2V0VmFsdWUoKSxjb2RlLmdldFZhbHVlKCkpKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiYWxyZWFkeSBoYXZlIGFuIGFjY291bnRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxufSk7XG5cbmNvbnN0IFNpZ251cD1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShcblx0KHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLCBwYXNzd29yZDJFcnJvciwgZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCB1c2VybmFtZSwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXHRcdGxldCB2YWx1ZXM9YT0+KHtcblx0XHRcdHVzZXJuYW1lOnVzZXJuYW1lLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQyOnBhc3N3b3JkMi5nZXRWYWx1ZSgpXG5cdFx0fSlcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbnVwXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT51c2VybmFtZT1hfSBoaW50VGV4dD1cImxvZ2luIG5hbWVcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXt1c2VybmFtZUVycm9yfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIgZXJyb3JUZXh0PXtwYXNzd29yZEVycm9yfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkMj1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiIGVycm9yVGV4dD17cGFzc3dvcmQyRXJyb3J9Lz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiYWxyZWFkeSBoYXZlIGFuIGFjY291bnRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG59KTtcblxuY29uc3QgU2lnbmluPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFjY291bnQpKFxuXHQoe3VzZXIsIHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IsZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCB1c2VybmFtZSwgcGFzc3dvcmRcblx0XHRsZXQgdmFsdWVzPWE9Pih7XG5cdFx0XHR1c2VybmFtZTp1c2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdH0pXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ25pblwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+dXNlcm5hbWU9YX1cblx0XHRcdFx0XHRoaW50VGV4dD1cImxvZ2luIG5hbWUgb3IgcGhvbmUgbnVtYmVyXCJcblx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e3VzZXIgJiYgdXNlci51c2VybmFtZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOSU4odmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0gZXJyb3JUZXh0PXtwYXNzd29yZEVycm9yfVxuXHRcdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiBpblwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOKHZhbHVlcygpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cIm5vIGFjY291bnRcIlxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcbn0pO1xuXG5jb25zdCBGb3JnZXRQYXNzd29yZD1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShcblx0KHtjb250YWN0RXJyb3IsIGRpc3BhdGNofSk9Pntcblx0XHRsZXQgY29udGFjdFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJmb3JnZXRQd2RcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvbnRhY3Q9YX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkQoY29udGFjdC5nZXRWYWx1ZSgpKSl9fVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0gZXJyb3JUZXh0PXtjb250YWN0RXJyb3J9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJwaG9uZSBudW1iZXIgb3IgZW1haWxcIi8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2VuZCBtZVwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEKGNvbnRhY3QuZ2V0VmFsdWUoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcbn0pO1xuXG5jb25zdCBSZXNldFBhc3N3b3JkPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFjY291bnQpKFxuXHQoe3Jlc2V0RXJyb3IsZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCBvbGRQYXNzd29yZCwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXHRcdGxldCB2YWx1ZXM9YT0+KHtcblx0XHRcdG9sZFBhc3N3b3JkOm9sZFBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQyOnBhc3N3b3JkMi5nZXRWYWx1ZSgpXG5cdFx0fSlcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicmVzZXRcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9Pm9sZFBhc3N3b3JkPWF9IGhpbnRUZXh0PVwib2xkIHBhc3N3b3JkXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtyZXNldEVycm9yfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkMj1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkIGFnYWluXCIvPlxuXG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInJlc2V0IHBhc3N3b3JkXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxufSlcblxuY2xhc3MgU01TUmVxdWVzdCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Bob25lOm51bGwsdGljazpudWxsfVxuXG4gICAgdGljaygpe1xuICAgICAgICBsZXQgaT02MCwgZG9UaWNrO1xuICAgICAgICB0aGlzLl90PXNldEludGVydmFsKGRvVGljaz0oKT0+e1xuICAgICAgICAgICAgaWYoaT09MCl7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6IDB9KVxuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOmktLX0pXG4gICAgICAgIH0sMTAwMCk7XG5cbiAgICAgICAgZG9UaWNrKClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICBpZih0aGlzLl90KVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7cGhvbmUsIHRpY2t9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRsZXQgYnV0dG9uLCByZWZQaG9uZVxuXHRcdGlmKHBob25lKXtcbiAgICAgICAgICAgIGlmKHRpY2spXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGlja30gZGlzYWJsZWQ9e3RydWV9Lz4pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGljaz09PTAgPyBcInJlc2VuZFwiIDogXCJzZW5kXCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnRpY2soKVxuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfUkVRVUVTVChyZWZQaG9uZS5nZXRWYWx1ZSgpKSlcblx0XHRcdFx0XHRcdFx0fX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtc3JlcXVlc3RcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG5cdFx0XHRcdFx0cmVmPXthPT5yZWZQaG9uZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGhvbmUgbnVtYmVyIChkZWZhdWx0ICs4NilcIlxuXHRcdFx0XHRcdGRpc2FibGVkPXshIXRpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnRoaXMuc2V0U3RhdGUoe3Bob25lOiB0aGlzLmlzUGhvbmUodmFsdWUpPyB2YWx1ZSA6IG51bGx9KX0vPlxuICAgICAgICAgICAgICAgIHtidXR0b259XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuXHRpc1Bob25lKHYpe1xuICAgICAgICByZXR1cm4gKC9eKFxcK1xcZHsyfSk/XFxkezExfSQvZykudGVzdCh2KVxuICAgIH1cblxuXHRnZXRWYWx1ZSgpe1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLnBob25lXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudFxuIl19