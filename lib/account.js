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
			var username = user.username;
			var password = user.password;
			var password2 = user.password2;

			var usernameError = void 0,
			    passwordError = void 0,
			    password2Error = void 0;
			if (!username) usernameError = "user name is required";
			if (!password) passwordError = "password is required";

			if (password != password2) password2Error = "password doesn't match";

			if (usernameError || passwordError || password2Error) {
				dispatch({ domain: DOMAIN, type: "SIGNUP_UI", passwordError: passwordError, usernameError: usernameError, password2Error: password2Error });
				return Promise.reject();
			}

			return _user2.default.signup({ username: username, password: password }).then(function (a) {
				dispatch({ domain: DOMAIN, type: "signup.ok" });return a;
			}).catch(function (_ref) {
				var message = _ref.message;
				return dispatch({ domain: DOMAIN, type: "SIGNUP_UI", usernameError: message });
			});
		};
	},
	SIGNIN: function SIGNIN(user) {
		return function (dispatch) {
			var username = user.username;
			var password = user.password;

			var usernameError = void 0,
			    passwordError = void 0;
			if (!username) usernameError = "user name is required";
			if (!password) passwordError = "password is required";

			if (usernameError || passwordError) {
				dispatch({ domain: DOMAIN, type: "SIGNIN_UI", usernameError: usernameError, passwordError: passwordError });
				return Promise.reject();
			}

			return _user2.default.signin({ username: username, password: password }).then(function (a) {
				dispatch({ domain: DOMAIN, type: "signin.ok" });return a;
			}).catch(function (_ref2) {
				var message = _ref2.message;
				return dispatch({ domain: DOMAIN, type: "SIGNIN_UI", usernameError: message });
			});
		};
	},
	PHONE_VERIFY_REQUEST: function PHONE_VERIFY_REQUEST(phone) {
		_user2.default.requestVerification(phone);
		return { domain: DOMAIN, type: "PHONE_VERIFY_REQUEST" };
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
				dispatch({ domain: DOMAIN, type: "FORGET_PASSWORD_UI", contactError: "a phone number or email must be given to reset password" });
				return Promise.reject();
			}

			return _user2.default.requestPasswordReset(contact).then(function (a) {
				return alert('reset email/sms sent to ' + contact + ', please follow the instruction to reset your password');
			});
		};
	},

	SIGNUP_UI: { domain: DOMAIN, type: "SIGNUP_UI" },
	SIGNIN_UI: { domain: DOMAIN, type: "SIGNIN_UI" },
	FORGET_PASSWORD_UI: { domain: DOMAIN, type: "FORGET_PASSWORD_UI" },
	RESET_PASSWORD_UI: { domain: DOMAIN, type: "RESET_PASSWORD_UI" },
	PHONE_VERIFY_UI: { domain: DOMAIN, type: "PHONE_VERIFY_UI" }
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	if (action.domain == DOMAIN) {
		switch (action.type) {
			case 'signin.ok':
			case 'signup.ok':
				return {};
			case 'SIGNUP_UI':
			case 'SIGNIN_UI':
			case 'FORGET_PASSWORD_UI':
			case 'RESET_PASSWORD_UI':
			case 'PHONE_VERIFY_UI':
				return action;
		}
	}
	return state;
});

var Account = exports.Account = (0, _reactRedux.connect)(function (state) {
	return state.account;
})(function (_ref3) {
	var user = _ref3.user;
	var type = _ref3.type;
	var dispatch = _ref3.dispatch;

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
})(function (_ref4) {
	var phoneVerifiedError = _ref4.phoneVerifiedError;
	var dispatch = _ref4.dispatch;

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
	var usernameError = _ref5.usernameError;
	var passwordError = _ref5.passwordError;
	var password2Error = _ref5.password2Error;
	var dispatch = _ref5.dispatch;

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
	var user = _ref6.user;
	var usernameError = _ref6.usernameError;
	var passwordError = _ref6.passwordError;
	var dispatch = _ref6.dispatch;

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
	var contactError = _ref7.contactError;
	var dispatch = _ref7.dispatch;

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
	var resetError = _ref8.resetError;
	var dispatch = _ref8.dispatch;

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
		var _ref9;

		var _temp, _this, _ret;

		_classCallCheck(this, SMSRequest);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref9 = SMSRequest.__proto__ || Object.getPrototypeOf(SMSRequest)).call.apply(_ref9, [this].concat(args))), _this), _this.state = { phone: null, tick: null }, _temp), _possibleConstructorReturn(_this, _ret);
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

			var _state = this.state;
			var phone = _state.phone;
			var tick = _state.tick;
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
					onChange: function onChange(_ref10) {
						var value = _ref10.target.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiRE9NQUlOIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ1c2VybmFtZUVycm9yIiwicGFzc3dvcmRFcnJvciIsInBhc3N3b3JkMkVycm9yIiwiZGlzcGF0Y2giLCJkb21haW4iLCJ0eXBlIiwiUHJvbWlzZSIsInJlamVjdCIsInNpZ251cCIsInRoZW4iLCJhIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfVkVSSUZZX1JFUVVFU1QiLCJyZXF1ZXN0VmVyaWZpY2F0aW9uIiwicGhvbmUiLCJQSE9ORV9WRVJJRlkiLCJjb2RlIiwidmVyaWZ5UGhvbmUiLCJTSUdOVVBfVUkiLCJGT1JHRVRfUEFTU1dPUkQiLCJjb250YWN0IiwiY29udGFjdEVycm9yIiwicmVxdWVzdFBhc3N3b3JkUmVzZXQiLCJhbGVydCIsIlNJR05JTl9VSSIsIkZPUkdFVF9QQVNTV09SRF9VSSIsIlJFU0VUX1BBU1NXT1JEX1VJIiwiUEhPTkVfVkVSSUZZX1VJIiwiUkVEVUNFUiIsInN0YXRlIiwiYWN0aW9uIiwiQWNjb3VudCIsImFjY291bnQiLCJQaG9uZVZlcmlmaWNhdGlvbiIsInBob25lVmVyaWZpZWRFcnJvciIsImUiLCJrZXlDb2RlIiwiZ2V0VmFsdWUiLCJTaWdudXAiLCJ2YWx1ZXMiLCJTaWduaW4iLCJGb3JnZXRQYXNzd29yZCIsIlJlc2V0UGFzc3dvcmQiLCJyZXNldEVycm9yIiwib2xkUGFzc3dvcmQiLCJSRVNFVF9QQVNTV09SRCIsIlNNU1JlcXVlc3QiLCJ0aWNrIiwiaSIsImRvVGljayIsIl90Iiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwic2V0U3RhdGUiLCJwcm9wcyIsImJ1dHRvbiIsInJlZlBob25lIiwidmFsdWUiLCJ0YXJnZXQiLCJpc1Bob25lIiwidiIsInRlc3QiXSwibWFwcGluZ3Mi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QUFTVCxPQUFPcUIsb0JBQVAsQ0FBNEI0QyxTQUFTbkIsUUFBVCxFQUE1QixDQUFUO0FBQ0EsTUFKZ0IsR0FBUjtBQUtQOztBQUVELFVBQ0k7QUFBQTtBQUFBLE1BQUssV0FBVSxZQUFmO0FBQ0k7QUFDWCxVQUFLO0FBQUEsYUFBR21CLFdBQVNqRCxDQUFaO0FBQUEsTUFETTtBQUVYLGVBQVMsNEJBRkU7QUFHWCxlQUFVLENBQUMsQ0FBQ3dDLElBSEQ7QUFJSSxlQUFVO0FBQUEsVUFBVVUsS0FBVixVQUFFQyxNQUFGLENBQVVELEtBQVY7QUFBQSxhQUFvQixPQUFLSixRQUFMLENBQWMsRUFBQ3ZDLE9BQU8sT0FBSzZDLE9BQUwsQ0FBYUYsS0FBYixJQUFxQkEsS0FBckIsR0FBNkIsSUFBckMsRUFBZCxDQUFwQjtBQUFBLE1BSmQsR0FESjtBQU1LRjtBQU5MLElBREo7QUFVSDs7OzBCQUVJSyxDLEVBQUU7QUFDSCxVQUFRLHNCQUFELENBQXdCQyxJQUF4QixDQUE2QkQsQ0FBN0I7QUFBUDtBQUNIOzs7NkJBRU07QUFDVCxVQUFPLEtBQUsvQixLQUFMLENBQVdmLEtBQWxCO0FBQ0E7Ozs7OztrQkFHYWlCLE8iLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1RleHRGaWVsZCxGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9kYi91c2VyJ1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5jb25zdCBFTlRFUj0xM1xuY29uc3QgRE9NQUlOPVwidWkuYWNjb3VudFwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRTSUdOVVA6dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUscGFzc3dvcmQscGFzc3dvcmQyfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IscGFzc3dvcmQyRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYocGFzc3dvcmQhPXBhc3N3b3JkMilcblx0XHRcdHBhc3N3b3JkMkVycm9yPVwicGFzc3dvcmQgZG9lc24ndCBtYXRjaFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3J8fHBhc3N3b3JkMkVycm9yKXtcblx0XHRcdGRpc3BhdGNoKHtkb21haW46RE9NQUlOLHR5cGU6XCJTSUdOVVBfVUlcIiwgcGFzc3dvcmRFcnJvciwgdXNlcm5hbWVFcnJvcixwYXNzd29yZDJFcnJvcn0pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXHRcdH1cblxuXHRcdHJldHVybiBVc2VyLnNpZ251cCh7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LnRoZW4oYT0+e2Rpc3BhdGNoKHtkb21haW46RE9NQUlOLHR5cGU6XCJzaWdudXAub2tcIn0pO3JldHVybiBhfSlcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+ZGlzcGF0Y2goe2RvbWFpbjpET01BSU4sdHlwZTpcIlNJR05VUF9VSVwiLCB1c2VybmFtZUVycm9yOm1lc3NhZ2V9KSlcblx0fVxuXHQsU0lHTklOOnVzZXI9PmRpc3BhdGNoPT57XG5cdFx0Y29uc3Qge3VzZXJuYW1lLCBwYXNzd29yZH09dXNlclxuXHRcdGxldCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yXG5cdFx0aWYoIXVzZXJuYW1lKVxuXHRcdFx0dXNlcm5hbWVFcnJvcj1cInVzZXIgbmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYoIXBhc3N3b3JkKVxuXHRcdFx0cGFzc3dvcmRFcnJvcj1cInBhc3N3b3JkIGlzIHJlcXVpcmVkXCJcblxuXHRcdGlmKHVzZXJuYW1lRXJyb3IgfHwgcGFzc3dvcmRFcnJvcil7XG5cdFx0XHRkaXNwYXRjaCh7ZG9tYWluOkRPTUFJTix0eXBlOlwiU0lHTklOX1VJXCIsdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcn0pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXHRcdH1cblxuXHRcdHJldHVybiBVc2VyLnNpZ25pbih7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LnRoZW4oYT0+e2Rpc3BhdGNoKHtkb21haW46RE9NQUlOLHR5cGU6XCJzaWduaW4ub2tcIn0pO3JldHVybiBhfSlcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+ZGlzcGF0Y2goe2RvbWFpbjpET01BSU4sdHlwZTpcIlNJR05JTl9VSVwiLHVzZXJuYW1lRXJyb3I6bWVzc2FnZX0pKVxuXHR9XG5cdCxQSE9ORV9WRVJJRllfUkVRVUVTVDpwaG9uZT0+e1xuXHRcdFVzZXIucmVxdWVzdFZlcmlmaWNhdGlvbihwaG9uZSlcblx0XHRyZXR1cm4ge2RvbWFpbjpET01BSU4sdHlwZTpcIlBIT05FX1ZFUklGWV9SRVFVRVNUXCJ9XG5cdH1cblx0LFBIT05FX1ZFUklGWToocGhvbmUsY29kZSk9PmRpc3BhdGNoPT5Vc2VyLnZlcmlmeVBob25lKHBob25lLGNvZGUpLnRoZW4oYT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUF9VSSkpXG5cblx0LEZPUkdFVF9QQVNTV09SRDogY29udGFjdD0+ZGlzcGF0Y2g9Pntcblx0XHRpZighY29udGFjdCl7XG5cdFx0XHRkaXNwYXRjaCh7ZG9tYWluOkRPTUFJTix0eXBlOlwiRk9SR0VUX1BBU1NXT1JEX1VJXCIsY29udGFjdEVycm9yOlwiYSBwaG9uZSBudW1iZXIgb3IgZW1haWwgbXVzdCBiZSBnaXZlbiB0byByZXNldCBwYXNzd29yZFwifSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIFVzZXIucmVxdWVzdFBhc3N3b3JkUmVzZXQoY29udGFjdClcblx0XHRcdC50aGVuKGE9PmFsZXJ0KGByZXNldCBlbWFpbC9zbXMgc2VudCB0byAke2NvbnRhY3R9LCBwbGVhc2UgZm9sbG93IHRoZSBpbnN0cnVjdGlvbiB0byByZXNldCB5b3VyIHBhc3N3b3JkYCkpXG5cdH1cblxuXHQsU0lHTlVQX1VJOntkb21haW46RE9NQUlOLHR5cGU6XCJTSUdOVVBfVUlcIn1cblx0LFNJR05JTl9VSTp7ZG9tYWluOkRPTUFJTix0eXBlOlwiU0lHTklOX1VJXCJ9XG5cdCxGT1JHRVRfUEFTU1dPUkRfVUk6e2RvbWFpbjpET01BSU4sdHlwZTpcIkZPUkdFVF9QQVNTV09SRF9VSVwifVxuXHQsUkVTRVRfUEFTU1dPUkRfVUk6e2RvbWFpbjpET01BSU4sdHlwZTpcIlJFU0VUX1BBU1NXT1JEX1VJXCJ9XG5cdCxQSE9ORV9WRVJJRllfVUk6KHtkb21haW46RE9NQUlOLHR5cGU6XCJQSE9ORV9WRVJJRllfVUlcIn0pXG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcblx0W0RPTUFJTl06KHN0YXRlPXt9LGFjdGlvbik9Pntcblx0XHRpZihhY3Rpb24uZG9tYWluPT1ET01BSU4pe1xuXHRcdFx0c3dpdGNoKGFjdGlvbi50eXBlKXtcblx0XHRcdGNhc2UgJ3NpZ25pbi5vayc6XG5cdFx0XHRjYXNlICdzaWdudXAub2snOlxuXHRcdFx0XHRyZXR1cm4ge31cblx0XHRcdGNhc2UgJ1NJR05VUF9VSSc6XG5cdFx0XHRjYXNlICdTSUdOSU5fVUknOlxuXHRcdFx0Y2FzZSAnRk9SR0VUX1BBU1NXT1JEX1VJJzpcblx0XHRcdGNhc2UgJ1JFU0VUX1BBU1NXT1JEX1VJJzpcblx0XHRcdGNhc2UgJ1BIT05FX1ZFUklGWV9VSSc6XG5cdFx0XHRcdHJldHVybiBhY3Rpb25cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IEFjY291bnQ9Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoKHt1c2VyLHR5cGUsZGlzcGF0Y2h9KT0+e1xuXHRpZighdHlwZSl7XG5cdFx0aWYodXNlcilcblx0XHRcdHR5cGU9J1NJR05JTl9VSSdcblx0XHRlbHNlXG5cdFx0XHR0eXBlPSdQSE9ORV9WRVJJRllfVUknXG5cdH1cblxuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgJ1NJR05VUF9VSSc6XG5cdFx0cmV0dXJuICg8U2lnbnVwLz4pXG5cdGNhc2UgJ1NJR05JTl9VSSc6XG5cdFx0cmV0dXJuICg8U2lnbmluIHVzZXI9e3VzZXJ9Lz4pXG5cdGNhc2UgJ1BIT05FX1ZFUklGWV9VSSc6XG5cdFx0cmV0dXJuICg8UGhvbmVWZXJpZmljYXRpb24gLz4pXG5cdGNhc2UgJ0ZPUkdFVF9QQVNTV09SRF9VSSc6XG5cdFx0cmV0dXJuICg8Rm9yZ2V0UGFzc3dvcmQvPilcblx0Y2FzZSAnUkVTRVRfUEFTU1dPUkRfVUknOlxuXHRcdHJldHVybiAoPFJlc2V0UGFzc3dvcmQvPilcblx0fVxufSlcblxuY29uc3QgUGhvbmVWZXJpZmljYXRpb249Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7cGhvbmVWZXJpZmllZEVycm9yLGRpc3BhdGNofSk9Pntcblx0XHRsZXQgY29kZSxwaG9uZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJwaG9uZXZlcmlmeVwiPlxuXHRcdFx0XHQ8U01TUmVxdWVzdCByZWY9e2E9PnBob25lPWF9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+Y29kZT1hfSBoaW50VGV4dD1cInZlcmlmaWNhdGlvbiBjb2RlIHlvdSBqdXN0IHJlY2VpdmVkXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZKHBob25lLmdldFZhbHVlKCksY29kZS5nZXRWYWx1ZSgpKSl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17cGhvbmVWZXJpZmllZEVycm9yfS8+XG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInZlcmlmeVwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZKHBob25lLmdldFZhbHVlKCksY29kZS5nZXRWYWx1ZSgpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcbn0pO1xuXG5jb25zdCBTaWdudXA9Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvciwgcGFzc3dvcmQyRXJyb3IsIGRpc3BhdGNofSk9Pntcblx0XHRsZXQgdXNlcm5hbWUsIHBhc3N3b3JkLCBwYXNzd29yZDJcblx0XHRsZXQgdmFsdWVzPWE9Pih7XG5cdFx0XHR1c2VybmFtZTp1c2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkMjpwYXNzd29yZDIuZ2V0VmFsdWUoKVxuXHRcdH0pXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ251cFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+dXNlcm5hbWU9YX0gaGludFRleHQ9XCJsb2dpbiBuYW1lXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiIGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIiBlcnJvclRleHQ9e3Bhc3N3b3JkMkVycm9yfS8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxufSk7XG5cbmNvbnN0IFNpZ25pbj1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShcblx0KHt1c2VyLCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLGRpc3BhdGNofSk9Pntcblx0XHRsZXQgdXNlcm5hbWUsIHBhc3N3b3JkXG5cdFx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdFx0dXNlcm5hbWU6dXNlcm5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHR9KVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWduaW5cIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJsb2dpbiBuYW1lIG9yIHBob25lIG51bWJlclwiXG5cdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXt1c2VyICYmIHVzZXIudXNlcm5hbWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTklOKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOSU4odmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cblx0XHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJubyBhY2NvdW50XCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG59KTtcblxuY29uc3QgRm9yZ2V0UGFzc3dvcmQ9Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7Y29udGFjdEVycm9yLCBkaXNwYXRjaH0pPT57XG5cdFx0bGV0IGNvbnRhY3Rcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwiZm9yZ2V0UHdkXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5jb250YWN0PWF9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEKGNvbnRhY3QuZ2V0VmFsdWUoKSkpfX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17Y29udGFjdEVycm9yfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGhvbmUgbnVtYmVyIG9yIGVtYWlsXCIvPlxuXG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNlbmQgbWVcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRChjb250YWN0LmdldFZhbHVlKCkpKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG59KTtcblxuY29uc3QgUmVzZXRQYXNzd29yZD1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShcblx0KHtyZXNldEVycm9yLGRpc3BhdGNofSk9Pntcblx0XHRsZXQgb2xkUGFzc3dvcmQsIHBhc3N3b3JkLCBwYXNzd29yZDJcblx0XHRsZXQgdmFsdWVzPWE9Pih7XG5cdFx0XHRvbGRQYXNzd29yZDpvbGRQYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkMjpwYXNzd29yZDIuZ2V0VmFsdWUoKVxuXHRcdH0pXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInJlc2V0XCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5vbGRQYXNzd29yZD1hfSBoaW50VGV4dD1cIm9sZCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17cmVzZXRFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiLz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJyZXNldCBwYXNzd29yZFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcbn0pXG5cbmNsYXNzIFNNU1JlcXVlc3QgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtwaG9uZTpudWxsLHRpY2s6bnVsbH1cblxuICAgIHRpY2soKXtcbiAgICAgICAgbGV0IGk9NjAsIGRvVGljaztcbiAgICAgICAgdGhpcy5fdD1zZXRJbnRlcnZhbChkb1RpY2s9KCk9PntcbiAgICAgICAgICAgIGlmKGk9PTApe1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOiAwfSlcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazppLS19KVxuICAgICAgICB9LDEwMDApO1xuXG4gICAgICAgIGRvVGljaygpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgaWYodGhpcy5fdClcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3Bob25lLCB0aWNrfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGJ1dHRvbiwgcmVmUGhvbmVcblx0XHRpZihwaG9uZSl7XG4gICAgICAgICAgICBpZih0aWNrKVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2t9IGRpc2FibGVkPXt0cnVlfS8+KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2s9PT0wID8gXCJyZXNlbmRcIiA6IFwic2VuZFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50aWNrKClcblx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1JFUVVFU1QocmVmUGhvbmUuZ2V0VmFsdWUoKSkpXG5cdFx0XHRcdFx0XHRcdH19Lz4pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbXNyZXF1ZXN0XCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuXHRcdFx0XHRcdHJlZj17YT0+cmVmUGhvbmU9YX1cblx0XHRcdFx0XHRoaW50VGV4dD1cInBob25lIG51bWJlciAoZGVmYXVsdCArODYpXCJcblx0XHRcdFx0XHRkaXNhYmxlZD17ISF0aWNrfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT50aGlzLnNldFN0YXRlKHtwaG9uZTogdGhpcy5pc1Bob25lKHZhbHVlKT8gdmFsdWUgOiBudWxsfSl9Lz5cbiAgICAgICAgICAgICAgICB7YnV0dG9ufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblx0aXNQaG9uZSh2KXtcbiAgICAgICAgcmV0dXJuICgvXihcXCtcXGR7Mn0pP1xcZHsxMX0kL2cpLnRlc3QodilcbiAgICB9XG5cblx0Z2V0VmFsdWUoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5waG9uZVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY291bnRcbiJdfQ==