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
			var username = user.username,
			    password = user.password,
			    password2 = user.password2;

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
			var username = user.username,
			    password = user.password;

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
	var user = _ref3.user,
	    type = _ref3.type,
	    dispatch = _ref3.dispatch;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiQUNUSU9OIiwiU0lHTlVQIiwidXNlcm5hbWUiLCJ1c2VyIiwicGFzc3dvcmQiLCJwYXNzd29yZDIiLCJ1c2VybmFtZUVycm9yIiwicGFzc3dvcmRFcnJvciIsInBhc3N3b3JkMkVycm9yIiwiZGlzcGF0Y2giLCJ0eXBlIiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfVkVSSUZZX1JFUVVFU1QiLCJyZXF1ZXN0VmVyaWZpY2F0aW9uIiwicGhvbmUiLCJQSE9ORV9WRVJJRlkiLCJjb2RlIiwidmVyaWZ5UGhvbmUiLCJ0aGVuIiwiU0lHTlVQX1VJIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsImNvbnRhY3RFcnJvciIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiYWxlcnQiLCJTSUdOSU5fVUkiLCJGT1JHRVRfUEFTU1dPUkRfVUkiLCJSRVNFVF9QQVNTV09SRF9VSSIsIlBIT05FX1ZFUklGWV9VSSIsIlJFRFVDRVIiLCJhY2NvdW50Iiwic3RhdGUiLCJhY3Rpb24iLCJBY2NvdW50IiwiUGhvbmVWZXJpZmljYXRpb24iLCJwaG9uZVZlcmlmaWVkRXJyb3IiLCJhIiwiZSIsImtleUNvZGUiLCJnZXRWYWx1ZSIsIlNpZ251cCIsInZhbHVlcyIsIlNpZ25pbiIsIkZvcmdldFBhc3N3b3JkIiwiUmVzZXRQYXNzd29yZCIsInJlc2V0RXJyb3IiLCJvbGRQYXNzd29yZCIsIlJFU0VUX1BBU1NXT1JEIiwiU01TUmVxdWVzdCIsInRpY2siLCJpIiwiZG9UaWNrIiwiX3QiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzZXRTdGF0ZSIsInByb3BzIiwiYnV0dG9uIiwicmVmUGhvbmUiLCJ2YWx1ZSIsInRhcmdldCIsImlzUGhvbmUiLCJ2IiwidGVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNB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NUMsUUFGRyxHQUVPLEtBQUttRCxLQUZaLENBRUhuRCxRQUZHOztBQUdWLE9BQUlvRCxlQUFKO0FBQUEsT0FBWUMsaUJBQVo7QUFDQSxPQUFHNUMsS0FBSCxFQUFTO0FBQ0MsUUFBR21DLElBQUgsRUFDSVEsU0FBUSx3REFBWSxPQUFPUixJQUFuQixFQUF5QixVQUFVLElBQW5DLEdBQVIsQ0FESixLQUdJUSxTQUFRLHdEQUFZLE9BQU9SLFNBQU8sQ0FBUCxHQUFXLFFBQVgsR0FBc0IsTUFBekM7QUFDakIsY0FBUyxvQkFBRztBQUNYLGFBQUtBLElBQUw7QUFDQTVDLGVBQVNULE9BQU9nQixvQkFBUCxDQUE0QjhDLFNBQVNuQixRQUFULEVBQTVCLENBQVQ7QUFDQSxNQUpnQixHQUFSO0FBS1A7O0FBRUQsVUFDSTtBQUFBO0FBQUEsTUFBSyxXQUFVLFlBQWY7QUFDSTtBQUNYLFVBQUs7QUFBQSxhQUFHbUIsV0FBU3RCLENBQVo7QUFBQSxNQURNO0FBRVgsZUFBUyw0QkFGRTtBQUdYLGVBQVUsQ0FBQyxDQUFDYSxJQUhEO0FBSUksZUFBVTtBQUFBLFVBQVVVLEtBQVYsVUFBRUMsTUFBRixDQUFVRCxLQUFWO0FBQUEsYUFBb0IsT0FBS0osUUFBTCxDQUFjLEVBQUN6QyxPQUFPLE9BQUsrQyxPQUFMLENBQWFGLEtBQWIsSUFBcUJBLEtBQXJCLEdBQTZCLElBQXJDLEVBQWQsQ0FBcEI7QUFBQSxNQUpkLEdBREo7QUFNS0Y7QUFOTCxJQURKO0FBVUg7OzswQkFFSUssQyxFQUFFO0FBQ0gsVUFBUSxzQkFBRCxDQUF3QkMsSUFBeEIsQ0FBNkJELENBQTdCO0FBQVA7QUFDSDs7OzZCQUVNO0FBQ1QsVUFBTyxLQUFLL0IsS0FBTCxDQUFXakIsS0FBbEI7QUFDQTs7Ozs7O2tCQUdhbUIsTyIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VGV4dEZpZWxkLEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgVXNlciBmcm9tICcuL2RiL3VzZXInXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmNvbnN0IEVOVEVSPTEzXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRTSUdOVVA6dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUscGFzc3dvcmQscGFzc3dvcmQyfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IscGFzc3dvcmQyRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYocGFzc3dvcmQhPXBhc3N3b3JkMilcblx0XHRcdHBhc3N3b3JkMkVycm9yPVwicGFzc3dvcmQgZG9lc24ndCBtYXRjaFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3J8fHBhc3N3b3JkMkVycm9yKVxuXHRcdFx0cmV0dXJuIGRpc3BhdGNoKHt0eXBlOlwiU0lHTlVQX1VJXCIsIHBhc3N3b3JkRXJyb3IsIHVzZXJuYW1lRXJyb3IscGFzc3dvcmQyRXJyb3J9KVxuXG5cdFx0cmV0dXJuIFVzZXIuc2lnbnVwKHt1c2VybmFtZSxwYXNzd29yZH0pXG5cdFx0XHQuY2F0Y2goKHttZXNzYWdlfSk9PmRpc3BhdGNoKHt0eXBlOlwiU0lHTlVQX1VJXCIsIHVzZXJuYW1lRXJyb3I6bWVzc2FnZX0pKVxuXHR9XG5cdCxTSUdOSU46dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUsIHBhc3N3b3JkfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yKVxuXHRcdFx0cmV0dXJuIGRpc3BhdGNoKHt0eXBlOlwiU0lHTklOX1VJXCIsdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcn0pXG5cblx0XHRyZXR1cm4gVXNlci5zaWduaW4oe3VzZXJuYW1lLHBhc3N3b3JkfSlcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+ZGlzcGF0Y2goe3R5cGU6XCJTSUdOSU5fVUlcIix1c2VybmFtZUVycm9yOm1lc3NhZ2V9KSlcblx0fVxuXHQsUEhPTkVfVkVSSUZZX1JFUVVFU1Q6cGhvbmU9Pntcblx0XHRVc2VyLnJlcXVlc3RWZXJpZmljYXRpb24ocGhvbmUpXG5cdFx0cmV0dXJuIHt0eXBlOlwiUEhPTkVfVkVSSUZZX1JFUVVFU1RcIn1cblx0fVxuXHQsUEhPTkVfVkVSSUZZOihwaG9uZSxjb2RlKT0+ZGlzcGF0Y2g9PlVzZXIudmVyaWZ5UGhvbmUocGhvbmUsY29kZSkudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQX1VJKSlcblxuXHQsRk9SR0VUX1BBU1NXT1JEOiBjb250YWN0PT5kaXNwYXRjaD0+e1xuXHRcdGlmKCFjb250YWN0KVxuXHRcdFx0cmV0dXJuIGRpc3BhdGNoKHt0eXBlOlwiRk9SR0VUX1BBU1NXT1JEX1VJXCIsY29udGFjdEVycm9yOlwiYSBwaG9uZSBudW1iZXIgb3IgZW1haWwgbXVzdCBiZSBnaXZlbiB0byByZXNldCBwYXNzd29yZFwifSlcblxuXHRcdHJldHVybiBVc2VyLnJlcXVlc3RQYXNzd29yZFJlc2V0KGNvbnRhY3QpXG5cdFx0XHQudGhlbihhPT5hbGVydChgcmVzZXQgZW1haWwvc21zIHNlbnQgdG8gJHtjb250YWN0fSwgcGxlYXNlIGZvbGxvdyB0aGUgaW5zdHJ1Y3Rpb24gdG8gcmVzZXQgeW91ciBwYXNzd29yZGApKVxuXHR9XG5cblx0LFNJR05VUF9VSTp7dHlwZTpcIlNJR05VUF9VSVwifVxuXHQsU0lHTklOX1VJOnt0eXBlOlwiU0lHTklOX1VJXCJ9XG5cdCxGT1JHRVRfUEFTU1dPUkRfVUk6e3R5cGU6XCJGT1JHRVRfUEFTU1dPUkRfVUlcIn1cblx0LFJFU0VUX1BBU1NXT1JEX1VJOnt0eXBlOlwiUkVTRVRfUEFTU1dPUkRfVUlcIn1cblx0LFBIT05FX1ZFUklGWV9VSTooe3R5cGU6XCJQSE9ORV9WRVJJRllfVUlcIn0pXG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcblx0YWNjb3VudDooc3RhdGU9e30sYWN0aW9uKT0+e1xuXHRcdHN3aXRjaChhY3Rpb24udHlwZSl7XG5cdFx0Y2FzZSAnU0lHTlVQX1VJJzpcblx0XHRjYXNlICdTSUdOSU5fVUknOlxuXHRcdGNhc2UgJ0ZPUkdFVF9QQVNTV09SRF9VSSc6XG5cdFx0Y2FzZSAnUkVTRVRfUEFTU1dPUkRfVUknOlxuXHRcdGNhc2UgJ1BIT05FX1ZFUklGWV9VSSc6XG5cdFx0XHRyZXR1cm4gYWN0aW9uXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgY29uc3QgQWNjb3VudD1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KSgoe3VzZXIsdHlwZSwgZGlzcGF0Y2h9KT0+e1xuXHRpZighdHlwZSl7XG5cdFx0aWYodXNlcilcblx0XHRcdHR5cGU9J1NJR05JTl9VSSdcblx0XHRlbHNlXG5cdFx0XHR0eXBlPSdQSE9ORV9WRVJJRllfVUknXG5cdH1cblxuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgJ1NJR05VUF9VSSc6XG5cdFx0cmV0dXJuICg8U2lnbnVwLz4pXG5cdGNhc2UgJ1NJR05JTl9VSSc6XG5cdFx0cmV0dXJuICg8U2lnbmluIHVzZXI9e3VzZXJ9Lz4pXG5cdGNhc2UgJ1BIT05FX1ZFUklGWV9VSSc6XG5cdFx0cmV0dXJuICg8UGhvbmVWZXJpZmljYXRpb24gLz4pXG5cdGNhc2UgJ0ZPUkdFVF9QQVNTV09SRF9VSSc6XG5cdFx0cmV0dXJuICg8Rm9yZ2V0UGFzc3dvcmQvPilcblx0Y2FzZSAnUkVTRVRfUEFTU1dPUkRfVUknOlxuXHRcdHJldHVybiAoPFJlc2V0UGFzc3dvcmQvPilcblx0fVxufSlcblxuY29uc3QgUGhvbmVWZXJpZmljYXRpb249Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7cGhvbmVWZXJpZmllZEVycm9yLGRpc3BhdGNofSk9Pntcblx0XHRsZXQgY29kZSxwaG9uZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJwaG9uZXZlcmlmeVwiPlxuXHRcdFx0XHQ8U01TUmVxdWVzdCByZWY9e2E9PnBob25lPWF9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+Y29kZT1hfSBoaW50VGV4dD1cInZlcmlmaWNhdGlvbiBjb2RlIHlvdSBqdXN0IHJlY2VpdmVkXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZKHBob25lLmdldFZhbHVlKCksY29kZS5nZXRWYWx1ZSgpKSl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17cGhvbmVWZXJpZmllZEVycm9yfS8+XG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInZlcmlmeVwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZKHBob25lLmdldFZhbHVlKCksY29kZS5nZXRWYWx1ZSgpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcbn0pO1xuXG5jb25zdCBTaWdudXA9Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvciwgcGFzc3dvcmQyRXJyb3IsIGRpc3BhdGNofSk9Pntcblx0XHRsZXQgdXNlcm5hbWUsIHBhc3N3b3JkLCBwYXNzd29yZDJcblx0XHRsZXQgdmFsdWVzPWE9Pih7XG5cdFx0XHR1c2VybmFtZTp1c2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkMjpwYXNzd29yZDIuZ2V0VmFsdWUoKVxuXHRcdH0pXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ251cFwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+dXNlcm5hbWU9YX0gaGludFRleHQ9XCJsb2dpbiBuYW1lXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiIGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIiBlcnJvclRleHQ9e3Bhc3N3b3JkMkVycm9yfS8+XG5cblx0XHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9Lz5cblx0XHRcdFx0PC9jZW50ZXI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0KVxufSk7XG5cbmNvbnN0IFNpZ25pbj1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShcblx0KHt1c2VyLCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLGRpc3BhdGNofSk9Pntcblx0XHRsZXQgdXNlcm5hbWUsIHBhc3N3b3JkXG5cdFx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdFx0dXNlcm5hbWU6dXNlcm5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHR9KVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWduaW5cIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJsb2dpbiBuYW1lIG9yIHBob25lIG51bWJlclwiXG5cdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXt1c2VyICYmIHVzZXIudXNlcm5hbWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTklOKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOSU4odmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cblx0XHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfS8+XG5cdFx0XHRcdDwvY2VudGVyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJubyBhY2NvdW50XCJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG59KTtcblxuY29uc3QgRm9yZ2V0UGFzc3dvcmQ9Y29ubmVjdChzdGF0ZT0+c3RhdGUuYWNjb3VudCkoXG5cdCh7Y29udGFjdEVycm9yLCBkaXNwYXRjaH0pPT57XG5cdFx0bGV0IGNvbnRhY3Rcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwiZm9yZ2V0UHdkXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5jb250YWN0PWF9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEKGNvbnRhY3QuZ2V0VmFsdWUoKSkpfX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17Y29udGFjdEVycm9yfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGhvbmUgbnVtYmVyIG9yIGVtYWlsXCIvPlxuXG5cdFx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNlbmQgbWVcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRChjb250YWN0LmdldFZhbHVlKCkpKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfVUkpfS8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQpXG59KTtcblxuY29uc3QgUmVzZXRQYXNzd29yZD1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShcblx0KHtyZXNldEVycm9yLGRpc3BhdGNofSk9Pntcblx0XHRsZXQgb2xkUGFzc3dvcmQsIHBhc3N3b3JkLCBwYXNzd29yZDJcblx0XHRsZXQgdmFsdWVzPWE9Pih7XG5cdFx0XHRvbGRQYXNzd29yZDpvbGRQYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdFx0LHBhc3N3b3JkMjpwYXNzd29yZDIuZ2V0VmFsdWUoKVxuXHRcdH0pXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInJlc2V0XCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5vbGRQYXNzd29yZD1hfSBoaW50VGV4dD1cIm9sZCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdGVycm9yVGV4dD17cmVzZXRFcnJvcn0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiLz5cblxuXHRcdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJyZXNldCBwYXNzd29yZFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX0vPlxuXHRcdFx0XHQ8L2NlbnRlcj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdClcbn0pXG5cbmNsYXNzIFNNU1JlcXVlc3QgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtwaG9uZTpudWxsLHRpY2s6bnVsbH1cblxuICAgIHRpY2soKXtcbiAgICAgICAgbGV0IGk9NjAsIGRvVGljaztcbiAgICAgICAgdGhpcy5fdD1zZXRJbnRlcnZhbChkb1RpY2s9KCk9PntcbiAgICAgICAgICAgIGlmKGk9PTApe1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOiAwfSlcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazppLS19KVxuICAgICAgICB9LDEwMDApO1xuXG4gICAgICAgIGRvVGljaygpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgaWYodGhpcy5fdClcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3Bob25lLCB0aWNrfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGJ1dHRvbiwgcmVmUGhvbmVcblx0XHRpZihwaG9uZSl7XG4gICAgICAgICAgICBpZih0aWNrKVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2t9IGRpc2FibGVkPXt0cnVlfS8+KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2s9PT0wID8gXCJyZXNlbmRcIiA6IFwic2VuZFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50aWNrKClcblx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1JFUVVFU1QocmVmUGhvbmUuZ2V0VmFsdWUoKSkpXG5cdFx0XHRcdFx0XHRcdH19Lz4pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbXNyZXF1ZXN0XCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuXHRcdFx0XHRcdHJlZj17YT0+cmVmUGhvbmU9YX1cblx0XHRcdFx0XHRoaW50VGV4dD1cInBob25lIG51bWJlciAoZGVmYXVsdCArODYpXCJcblx0XHRcdFx0XHRkaXNhYmxlZD17ISF0aWNrfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT50aGlzLnNldFN0YXRlKHtwaG9uZTogdGhpcy5pc1Bob25lKHZhbHVlKT8gdmFsdWUgOiBudWxsfSl9Lz5cbiAgICAgICAgICAgICAgICB7YnV0dG9ufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblx0aXNQaG9uZSh2KXtcbiAgICAgICAgcmV0dXJuICgvXihcXCtcXGR7Mn0pP1xcZHsxMX0kL2cpLnRlc3QodilcbiAgICB9XG5cblx0Z2V0VmFsdWUoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5waG9uZVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY291bnRcbiJdfQ==