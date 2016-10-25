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

var ENTER = 13;

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

			if (usernameError || passwordError || password2Error) return dispatch({ type: "SIGNUP_UI", passwordError: passwordError, usernameError: usernameError, password2Error: password2Error });

			return _user2.default.signup({ username: username, password: password }).catch(function (_ref) {
				var message = _ref.message;
				return dispatch({ type: "SIGNUP_UI", usernameError: message });
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

			if (usernameError || passwordError) return dispatch({ type: "SIGNIN_UI", usernameError: usernameError, passwordError: passwordError });

			return _user2.default.signin({ username: username, password: password }).catch(function (_ref2) {
				var message = _ref2.message;
				return dispatch({ type: "SIGNIN_UI", usernameError: message });
			});
		};
	},
	PHONE_VERIFY_REQUEST: function PHONE_VERIFY_REQUEST(phone) {
		_user2.default.requestVerification(phone);
		return { type: "PHONE_VERIFY_REQUEST" };
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
			if (!contact) return dispatch({ type: "FORGET_PASSWORD_UI", contactError: "a phone number or email must be given to reset password" });

			return _user2.default.requestPasswordReset(contact).then(function (a) {
				return alert('reset email/sms sent to ' + contact + ', please follow the instruction to reset your password');
			});
		};
	},

	SIGNUP_UI: { type: "SIGNUP_UI" },
	SIGNIN_UI: { type: "SIGNIN_UI" },
	FORGET_PASSWORD_UI: { type: "FORGET_PASSWORD_UI" },
	RESET_PASSWORD_UI: { type: "RESET_PASSWORD_UI" },
	PHONE_VERIFY_UI: { type: "PHONE_VERIFY_UI" }
};

var REDUCER = exports.REDUCER = {
	account: function account() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var action = arguments[1];

		switch (action.type) {
			case 'SIGNUP':
				return {};
			case 'SIGNIN':
				return { user: user };

			case 'SIGNUP_UI':
			case 'SIGNIN_UI':
			case 'FORGET_PASSWORD_UI':
			case 'RESET_PASSWORD_UI':
			case 'PHONE_VERIFY_UI':
				return action;
			default:
				return state;
		}
	}
};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ1c2VybmFtZUVycm9yIiwicGFzc3dvcmRFcnJvciIsInBhc3N3b3JkMkVycm9yIiwiZGlzcGF0Y2giLCJ0eXBlIiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfVkVSSUZZX1JFUVVFU1QiLCJyZXF1ZXN0VmVyaWZpY2F0aW9uIiwicGhvbmUiLCJQSE9ORV9WRVJJRlkiLCJjb2RlIiwidmVyaWZ5UGhvbmUiLCJ0aGVuIiwiU0lHTlVQX1VJIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsImNvbnRhY3RFcnJvciIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiYWxlcnQiLCJTSUdOSU5fVUkiLCJGT1JHRVRfUEFTU1dPUkRfVUkiLCJSRVNFVF9QQVNTV09SRF9VSSIsIlBIT05FX1ZFUklGWV9VSSIsIlJFRFVDRVIiLCJhY2NvdW50Iiwic3RhdGUiLCJhY3Rpb24iLCJBY2NvdW50IiwiUGhvbmVWZXJpZmljYXRpb24iLCJwaG9uZVZlcmlmaWVkRXJyb3IiLCJhIiwiZSIsImtleUNvZGUiLCJnZXRWYWx1ZSIsIlNpZ251cCIsInZhbHVlcyIsIlNpZ25pbiIsIkZvcmdldFBhc3N3b3JkIiwiUmVzZXRQYXNzd29yZCIsInJlc2V0RXJyb3IiLCJvbGRQYXNzd29yZCIsIlJFU0VUX1BBU1NXT1JEIiwiU01TUmVxdWVzdCIsInRpY2siLCJpIiwiZG9UaWNrIiwiX3QiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzZXRTdGF0ZSIsInByb3BzIiwiYnV0dG9uIiwicmVmUGhvbmUiLCJ2YWx1ZSIsInRhcmdldCIsImlzUGhvbmUiLCJ2IiwidGVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNB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IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtUZXh0RmllbGQsRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBVc2VyIGZyb20gJy4vZGIvdXNlcidcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuY29uc3QgRU5URVI9MTNcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdFNJR05VUDp1c2VyPT5kaXNwYXRjaD0+e1xuXHRcdGNvbnN0IHt1c2VybmFtZSxwYXNzd29yZCxwYXNzd29yZDJ9PXVzZXJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcixwYXNzd29yZDJFcnJvclxuXHRcdGlmKCF1c2VybmFtZSlcblx0XHRcdHVzZXJuYW1lRXJyb3I9XCJ1c2VyIG5hbWUgaXMgcmVxdWlyZWRcIlxuXHRcdGlmKCFwYXNzd29yZClcblx0XHRcdHBhc3N3b3JkRXJyb3I9XCJwYXNzd29yZCBpcyByZXF1aXJlZFwiXG5cblx0XHRpZihwYXNzd29yZCE9cGFzc3dvcmQyKVxuXHRcdFx0cGFzc3dvcmQyRXJyb3I9XCJwYXNzd29yZCBkb2Vzbid0IG1hdGNoXCJcblxuXHRcdGlmKHVzZXJuYW1lRXJyb3IgfHwgcGFzc3dvcmRFcnJvcnx8cGFzc3dvcmQyRXJyb3IpXG5cdFx0XHRyZXR1cm4gZGlzcGF0Y2goe3R5cGU6XCJTSUdOVVBfVUlcIiwgcGFzc3dvcmRFcnJvciwgdXNlcm5hbWVFcnJvcixwYXNzd29yZDJFcnJvcn0pXG5cblx0XHRyZXR1cm4gVXNlci5zaWdudXAoe3VzZXJuYW1lLHBhc3N3b3JkfSlcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+ZGlzcGF0Y2goe3R5cGU6XCJTSUdOVVBfVUlcIiwgdXNlcm5hbWVFcnJvcjptZXNzYWdlfSkpXG5cdH1cblx0LFNJR05JTjp1c2VyPT5kaXNwYXRjaD0+e1xuXHRcdGNvbnN0IHt1c2VybmFtZSwgcGFzc3dvcmR9PXVzZXJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvclxuXHRcdGlmKCF1c2VybmFtZSlcblx0XHRcdHVzZXJuYW1lRXJyb3I9XCJ1c2VyIG5hbWUgaXMgcmVxdWlyZWRcIlxuXHRcdGlmKCFwYXNzd29yZClcblx0XHRcdHBhc3N3b3JkRXJyb3I9XCJwYXNzd29yZCBpcyByZXF1aXJlZFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3IpXG5cdFx0XHRyZXR1cm4gZGlzcGF0Y2goe3R5cGU6XCJTSUdOSU5fVUlcIix1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yfSlcblxuXHRcdHJldHVybiBVc2VyLnNpZ25pbih7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5kaXNwYXRjaCh7dHlwZTpcIlNJR05JTl9VSVwiLHVzZXJuYW1lRXJyb3I6bWVzc2FnZX0pKVxuXHR9XG5cdCxQSE9ORV9WRVJJRllfUkVRVUVTVDpwaG9uZT0+e1xuXHRcdFVzZXIucmVxdWVzdFZlcmlmaWNhdGlvbihwaG9uZSlcblx0XHRyZXR1cm4ge3R5cGU6XCJQSE9ORV9WRVJJRllfUkVRVUVTVFwifVxuXHR9XG5cdCxQSE9ORV9WRVJJRlk6KHBob25lLGNvZGUpPT5kaXNwYXRjaD0+VXNlci52ZXJpZnlQaG9uZShwaG9uZSxjb2RlKS50aGVuKGE9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVBfVUkpKVxuXG5cdCxGT1JHRVRfUEFTU1dPUkQ6IGNvbnRhY3Q9PmRpc3BhdGNoPT57XG5cdFx0aWYoIWNvbnRhY3QpXG5cdFx0XHRyZXR1cm4gZGlzcGF0Y2goe3R5cGU6XCJGT1JHRVRfUEFTU1dPUkRfVUlcIixjb250YWN0RXJyb3I6XCJhIHBob25lIG51bWJlciBvciBlbWFpbCBtdXN0IGJlIGdpdmVuIHRvIHJlc2V0IHBhc3N3b3JkXCJ9KVxuXG5cdFx0cmV0dXJuIFVzZXIucmVxdWVzdFBhc3N3b3JkUmVzZXQoY29udGFjdClcblx0XHRcdC50aGVuKGE9PmFsZXJ0KGByZXNldCBlbWFpbC9zbXMgc2VudCB0byAke2NvbnRhY3R9LCBwbGVhc2UgZm9sbG93IHRoZSBpbnN0cnVjdGlvbiB0byByZXNldCB5b3VyIHBhc3N3b3JkYCkpXG5cdH1cblxuXHQsU0lHTlVQX1VJOnt0eXBlOlwiU0lHTlVQX1VJXCJ9XG5cdCxTSUdOSU5fVUk6e3R5cGU6XCJTSUdOSU5fVUlcIn1cblx0LEZPUkdFVF9QQVNTV09SRF9VSTp7dHlwZTpcIkZPUkdFVF9QQVNTV09SRF9VSVwifVxuXHQsUkVTRVRfUEFTU1dPUkRfVUk6e3R5cGU6XCJSRVNFVF9QQVNTV09SRF9VSVwifVxuXHQsUEhPTkVfVkVSSUZZX1VJOih7dHlwZTpcIlBIT05FX1ZFUklGWV9VSVwifSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuXHRhY2NvdW50OihzdGF0ZT17fSxhY3Rpb24pPT57XG5cdFx0c3dpdGNoKGFjdGlvbi50eXBlKXtcblx0XHRjYXNlICdTSUdOVVAnOlxuXHRcdFx0cmV0dXJuIHt9XG5cdFx0Y2FzZSAnU0lHTklOJzpcblx0XHRcdHJldHVybiB7dXNlcn1cblxuXHRcdGNhc2UgJ1NJR05VUF9VSSc6XG5cdFx0Y2FzZSAnU0lHTklOX1VJJzpcblx0XHRjYXNlICdGT1JHRVRfUEFTU1dPUkRfVUknOlxuXHRcdGNhc2UgJ1JFU0VUX1BBU1NXT1JEX1VJJzpcblx0XHRjYXNlICdQSE9ORV9WRVJJRllfVUknOlxuXHRcdFx0cmV0dXJuIGFjdGlvblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IEFjY291bnQ9Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoKHt1c2VyLHR5cGUsIGRpc3BhdGNofSk9Pntcblx0aWYoIXR5cGUpe1xuXHRcdGlmKHVzZXIpXG5cdFx0XHR0eXBlPSdTSUdOSU5fVUknXG5cdFx0ZWxzZVxuXHRcdFx0dHlwZT0nUEhPTkVfVkVSSUZZX1VJJ1xuXHR9XG5cblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdTSUdOVVBfVUknOlxuXHRcdHJldHVybiAoPFNpZ251cC8+KVxuXHRjYXNlICdTSUdOSU5fVUknOlxuXHRcdHJldHVybiAoPFNpZ25pbiB1c2VyPXt1c2VyfS8+KVxuXHRjYXNlICdQSE9ORV9WRVJJRllfVUknOlxuXHRcdHJldHVybiAoPFBob25lVmVyaWZpY2F0aW9uIC8+KVxuXHRjYXNlICdGT1JHRVRfUEFTU1dPUkRfVUknOlxuXHRcdHJldHVybiAoPEZvcmdldFBhc3N3b3JkLz4pXG5cdGNhc2UgJ1JFU0VUX1BBU1NXT1JEX1VJJzpcblx0XHRyZXR1cm4gKDxSZXNldFBhc3N3b3JkLz4pXG5cdH1cbn0pXG5cbmNvbnN0IFBob25lVmVyaWZpY2F0aW9uPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFjY291bnQpKFxuXHQoe3Bob25lVmVyaWZpZWRFcnJvcixkaXNwYXRjaH0pPT57XG5cdFx0bGV0IGNvZGUscGhvbmVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicGhvbmV2ZXJpZnlcIj5cblx0XHRcdFx0PFNNU1JlcXVlc3QgcmVmPXthPT5waG9uZT1hfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvZGU9YX0gaGludFRleHQ9XCJ2ZXJpZmljYXRpb24gY29kZSB5b3UganVzdCByZWNlaXZlZFwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWShwaG9uZS5nZXRWYWx1ZSgpLGNvZGUuZ2V0VmFsdWUoKSkpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Bob25lVmVyaWZpZWRFcnJvcn0vPlxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJ2ZXJpZnlcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWShwaG9uZS5nZXRWYWx1ZSgpLGNvZGUuZ2V0VmFsdWUoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG59KTtcblxuY29uc3QgU2lnbnVwPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFjY291bnQpKFxuXHQoe3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IsIHBhc3N3b3JkMkVycm9yLCBkaXNwYXRjaH0pPT57XG5cdFx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmQyXG5cdFx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdFx0dXNlcm5hbWU6dXNlcm5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcblx0XHR9KVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWdudXBcIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9IGhpbnRUZXh0PVwibG9naW4gbmFtZVwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIiBlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQyPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkIGFnYWluXCIgZXJyb3JUZXh0PXtwYXNzd29yZDJFcnJvcn0vPlxuXG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcbn0pO1xuXG5jb25zdCBTaWduaW49Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7dXNlciwgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcixkaXNwYXRjaH0pPT57XG5cdFx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZFxuXHRcdGxldCB2YWx1ZXM9YT0+KHtcblx0XHRcdHVzZXJuYW1lOnVzZXJuYW1lLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0fSlcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbmluXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT51c2VybmFtZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwibG9naW4gbmFtZSBvciBwaG9uZSBudW1iZXJcIlxuXHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17dXNlciAmJiB1c2VyLnVzZXJuYW1lfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXt1c2VybmFtZUVycm9yfS8+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTklOKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfSBlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9XG5cdFx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIGluXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU4odmFsdWVzKCkpKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwibm8gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxufSk7XG5cbmNvbnN0IEZvcmdldFBhc3N3b3JkPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFjY291bnQpKFxuXHQoe2NvbnRhY3RFcnJvciwgZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCBjb250YWN0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cImZvcmdldFB3ZFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+Y29udGFjdD1hfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRChjb250YWN0LmdldFZhbHVlKCkpKX19XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfSBlcnJvclRleHQ9e2NvbnRhY3RFcnJvcn1cblx0XHRcdFx0XHRoaW50VGV4dD1cInBob25lIG51bWJlciBvciBlbWFpbFwiLz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzZW5kIG1lXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkQoY29udGFjdC5nZXRWYWx1ZSgpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxufSk7XG5cbmNvbnN0IFJlc2V0UGFzc3dvcmQ9Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7cmVzZXRFcnJvcixkaXNwYXRjaH0pPT57XG5cdFx0bGV0IG9sZFBhc3N3b3JkLCBwYXNzd29yZCwgcGFzc3dvcmQyXG5cdFx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdFx0b2xkUGFzc3dvcmQ6b2xkUGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcblx0XHR9KVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJyZXNldFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+b2xkUGFzc3dvcmQ9YX0gaGludFRleHQ9XCJvbGQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3Jlc2V0RXJyb3J9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQyPWF9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwicmVzZXQgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG59KVxuXG5jbGFzcyBTTVNSZXF1ZXN0IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17cGhvbmU6bnVsbCx0aWNrOm51bGx9XG5cbiAgICB0aWNrKCl7XG4gICAgICAgIGxldCBpPTYwLCBkb1RpY2s7XG4gICAgICAgIHRoaXMuX3Q9c2V0SW50ZXJ2YWwoZG9UaWNrPSgpPT57XG4gICAgICAgICAgICBpZihpPT0wKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazogMH0pXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6aS0tfSlcbiAgICAgICAgfSwxMDAwKTtcblxuICAgICAgICBkb1RpY2soKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGlmKHRoaXMuX3QpXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtwaG9uZSwgdGlja309dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGxldCBidXR0b24sIHJlZlBob25lXG5cdFx0aWYocGhvbmUpe1xuICAgICAgICAgICAgaWYodGljaylcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aWNrfSBkaXNhYmxlZD17dHJ1ZX0vPilcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aWNrPT09MCA/IFwicmVzZW5kXCIgOiBcInNlbmRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudGljaygpXG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9SRVFVRVNUKHJlZlBob25lLmdldFZhbHVlKCkpKVxuXHRcdFx0XHRcdFx0XHR9fS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic21zcmVxdWVzdFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcblx0XHRcdFx0XHRyZWY9e2E9PnJlZlBob25lPWF9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJwaG9uZSBudW1iZXIgKGRlZmF1bHQgKzg2KVwiXG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyEhdGlja31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmU6IHRoaXMuaXNQaG9uZSh2YWx1ZSk/IHZhbHVlIDogbnVsbH0pfS8+XG4gICAgICAgICAgICAgICAge2J1dHRvbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG5cdGlzUGhvbmUodil7XG4gICAgICAgIHJldHVybiAoL14oXFwrXFxkezJ9KT9cXGR7MTF9JC9nKS50ZXN0KHYpXG4gICAgfVxuXG5cdGdldFZhbHVlKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUucGhvbmVcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50XG4iXX0=