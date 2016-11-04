'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _user = require('./db/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTER = 13;
var DOMAIN = exports.DOMAIN = "";
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

var REDUCER = exports.REDUCER = function REDUCER() {
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
	}
	return state;
};

var Account = function (_Component) {
	_inherits(Account, _Component);

	function Account() {
		_classCallCheck(this, Account);

		return _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).apply(this, arguments));
	}

	_createClass(Account, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    type = _props.type,
			    user = _props.user,
			    others = _objectWithoutProperties(_props, ['type', 'user']);

			if (!type) {
				if (user) type = 'SIGNIN_UI';else type = 'PHONE_VERIFY_UI';
			}

			switch (type) {
				case 'SIGNUP_UI':
					return _react2.default.createElement(Signup, others);
				case 'SIGNIN_UI':
					return _react2.default.createElement(Signin, _extends({}, others, { user: user }));
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

var PhoneVerification = function PhoneVerification(_ref4) {
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
};

var Signup = function Signup(_ref5) {
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
};

var Signin = function Signin(_ref6) {
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
};

var ForgetPassword = function ForgetPassword(_ref7) {
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
};

var ResetPassword = function ResetPassword(_ref8) {
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
};

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

exports.default = Object.assign(Account, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsIkFDVElPTiIsIlNJR05VUCIsInVzZXJuYW1lIiwidXNlciIsInBhc3N3b3JkIiwicGFzc3dvcmQyIiwidXNlcm5hbWVFcnJvciIsInBhc3N3b3JkRXJyb3IiLCJwYXNzd29yZDJFcnJvciIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJQcm9taXNlIiwicmVqZWN0Iiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfVkVSSUZZX1JFUVVFU1QiLCJyZXF1ZXN0VmVyaWZpY2F0aW9uIiwicGhvbmUiLCJQSE9ORV9WRVJJRlkiLCJjb2RlIiwidmVyaWZ5UGhvbmUiLCJ0aGVuIiwiU0lHTlVQX1VJIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsImNvbnRhY3RFcnJvciIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiYWxlcnQiLCJTSUdOSU5fVUkiLCJGT1JHRVRfUEFTU1dPUkRfVUkiLCJSRVNFVF9QQVNTV09SRF9VSSIsIlBIT05FX1ZFUklGWV9VSSIsIlJFRFVDRVIiLCJzdGF0ZSIsIk9iamVjdCIsImFzc2lnbiIsInNwbGl0IiwicG9wIiwiQWNjb3VudCIsInByb3BzIiwib3RoZXJzIiwiUGhvbmVWZXJpZmljYXRpb24iLCJwaG9uZVZlcmlmaWVkRXJyb3IiLCJhIiwiZSIsImtleUNvZGUiLCJnZXRWYWx1ZSIsIlNpZ251cCIsInZhbHVlcyIsIlNpZ25pbiIsIkZvcmdldFBhc3N3b3JkIiwiUmVzZXRQYXNzd29yZCIsInJlc2V0RXJyb3IiLCJvbGRQYXNzd29yZCIsIlJFU0VUX1BBU1NXT1JEIiwiU01TUmVxdWVzdCIsInRpY2siLCJpIiwiZG9UaWNrIiwiX3QiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzZXRTdGF0ZSIsImJ1dHRvbiIsInJlZlBob25lIiwidmFsdWUiLCJ0YXJn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RjtBQU5MLElBREo7QUFVSDs7OzBCQUVJSyxDLEVBQUU7QUFDSCxVQUFRLHNCQUFELENBQXdCQyxJQUF4QixDQUE2QkQsQ0FBN0I7QUFBUDtBQUNIOzs7NkJBRU07QUFDVCxVQUFPLEtBQUtuQyxLQUFMLENBQVdoQixLQUFsQjtBQUNBOzs7Ozs7a0JBR2FpQixPQUFPQyxNQUFQLENBQWNHLE9BQWQsRUFBc0IsRUFBQzVDLGNBQUQsRUFBU0UsY0FBVCxFQUFpQm9DLGdCQUFqQixFQUF0QixDIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtUZXh0RmllbGQsRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBVc2VyIGZyb20gJy4vZGIvdXNlcidcblxuY29uc3QgRU5URVI9MTNcbmV4cG9ydCBjb25zdCBET01BSU49XCJcIlxuY29uc3QgSU5JVF9TVEFURT17fVxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdFNJR05VUDp1c2VyPT5kaXNwYXRjaD0+e1xuXHRcdGNvbnN0IHt1c2VybmFtZSxwYXNzd29yZCxwYXNzd29yZDJ9PXVzZXJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcixwYXNzd29yZDJFcnJvclxuXHRcdGlmKCF1c2VybmFtZSlcblx0XHRcdHVzZXJuYW1lRXJyb3I9XCJ1c2VyIG5hbWUgaXMgcmVxdWlyZWRcIlxuXHRcdGlmKCFwYXNzd29yZClcblx0XHRcdHBhc3N3b3JkRXJyb3I9XCJwYXNzd29yZCBpcyByZXF1aXJlZFwiXG5cblx0XHRpZihwYXNzd29yZCE9cGFzc3dvcmQyKVxuXHRcdFx0cGFzc3dvcmQyRXJyb3I9XCJwYXNzd29yZCBkb2Vzbid0IG1hdGNoXCJcblxuXHRcdGlmKHVzZXJuYW1lRXJyb3IgfHwgcGFzc3dvcmRFcnJvcnx8cGFzc3dvcmQyRXJyb3Ipe1xuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L1NJR05VUF9VSWAsIHBheWxvYWQ6e3Bhc3N3b3JkRXJyb3IsIHVzZXJuYW1lRXJyb3IscGFzc3dvcmQyRXJyb3J9fSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIFVzZXIuc2lnbnVwKHt1c2VybmFtZSxwYXNzd29yZH0pXG5cdFx0XHQuY2F0Y2goKHttZXNzYWdlfSk9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOVVBfVUlgLCBwYXlsb2FkOnt1c2VybmFtZUVycm9yOm1lc3NhZ2V9fSkpXG5cdH1cblx0LFNJR05JTjp1c2VyPT5kaXNwYXRjaD0+e1xuXHRcdGNvbnN0IHt1c2VybmFtZSwgcGFzc3dvcmR9PXVzZXJcblx0XHRsZXQgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvclxuXHRcdGlmKCF1c2VybmFtZSlcblx0XHRcdHVzZXJuYW1lRXJyb3I9XCJ1c2VyIG5hbWUgaXMgcmVxdWlyZWRcIlxuXHRcdGlmKCFwYXNzd29yZClcblx0XHRcdHBhc3N3b3JkRXJyb3I9XCJwYXNzd29yZCBpcyByZXF1aXJlZFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3Ipe1xuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L1NJR05JTl9VSWAscGF5bG9hZDp7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcn19KVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHR9XG5cblx0XHRyZXR1cm4gVXNlci5zaWduaW4oe3VzZXJuYW1lLHBhc3N3b3JkfSlcblx0XHRcdC5jYXRjaCgoe21lc3NhZ2V9KT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L1NJR05JTl9VSWAscGF5bG9hZDp7dXNlcm5hbWVFcnJvcjptZXNzYWdlfX0pKVxuXHR9XG5cdCxQSE9ORV9WRVJJRllfUkVRVUVTVDpwaG9uZT0+e1xuXHRcdFVzZXIucmVxdWVzdFZlcmlmaWNhdGlvbihwaG9uZSlcblx0XHRyZXR1cm4ge3R5cGU6YEBAJHtET01BSU59L1BIT05FX1ZFUklGWV9SRVFVRVNUYH1cblx0fVxuXHQsUEhPTkVfVkVSSUZZOihwaG9uZSxjb2RlKT0+ZGlzcGF0Y2g9PlVzZXIudmVyaWZ5UGhvbmUocGhvbmUsY29kZSkudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQX1VJKSlcblxuXHQsRk9SR0VUX1BBU1NXT1JEOiBjb250YWN0PT5kaXNwYXRjaD0+e1xuXHRcdGlmKCFjb250YWN0KXtcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9GT1JHRVRfUEFTU1dPUkRfVUlgLGNvbnRhY3RFcnJvcjpcImEgcGhvbmUgbnVtYmVyIG9yIGVtYWlsIG11c3QgYmUgZ2l2ZW4gdG8gcmVzZXQgcGFzc3dvcmRcIn0pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXHRcdH1cblxuXHRcdHJldHVybiBVc2VyLnJlcXVlc3RQYXNzd29yZFJlc2V0KGNvbnRhY3QpXG5cdFx0XHQudGhlbihhPT5hbGVydChgcmVzZXQgZW1haWwvc21zIHNlbnQgdG8gJHtjb250YWN0fSwgcGxlYXNlIGZvbGxvdyB0aGUgaW5zdHJ1Y3Rpb24gdG8gcmVzZXQgeW91ciBwYXNzd29yZGApKVxuXHR9XG5cblx0LFNJR05VUF9VSTp7dHlwZTpgQEB7RE9NQUlOfS9TSUdOVVBfVUlgfVxuXHQsU0lHTklOX1VJOnt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgfVxuXHQsRk9SR0VUX1BBU1NXT1JEX1VJOnt0eXBlOmBAQCR7RE9NQUlOfS9GT1JHRVRfUEFTU1dPUkRfVUlgfVxuXHQsUkVTRVRfUEFTU1dPUkRfVUk6e3R5cGU6YEBAJHtET01BSU59L1JFU0VUX1BBU1NXT1JEX1VJYH1cblx0LFBIT05FX1ZFUklGWV9VSTooe3R5cGU6YEBAJHtET01BSU59L1BIT05FX1ZFUklGWV9VSWB9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9TSUdOVVBfVUlgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS9GT1JHRVRfUEFTU1dPUkRfVUlgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS9SRVNFVF9QQVNTV09SRF9VSWA6XG5cdGNhc2UgYEBAJHtET01BSU59L1BIT05FX1ZFUklGWV9VSWA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe3R5cGU6dHlwZS5zcGxpdChcIi9cIikucG9wKCl9LHBheWxvYWQpXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmNsYXNzIEFjY291bnQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdGxldCB7dHlwZSx1c2VyLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGlmKCF0eXBlKXtcblx0XHRcdGlmKHVzZXIpXG5cdFx0XHRcdHR5cGU9J1NJR05JTl9VSSdcblx0XHRcdGVsc2Vcblx0XHRcdFx0dHlwZT0nUEhPTkVfVkVSSUZZX1VJJ1xuXHRcdH1cblxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlICdTSUdOVVBfVUknOlxuXHRcdFx0cmV0dXJuICg8U2lnbnVwIHsuLi5vdGhlcnN9IC8+KVxuXHRcdGNhc2UgJ1NJR05JTl9VSSc6XG5cdFx0XHRyZXR1cm4gKDxTaWduaW4gey4uLm90aGVyc30gdXNlcj17dXNlcn0vPilcblx0XHRjYXNlICdQSE9ORV9WRVJJRllfVUknOlxuXHRcdFx0cmV0dXJuICg8UGhvbmVWZXJpZmljYXRpb24gey4uLm90aGVyc30vPilcblx0XHRjYXNlICdGT1JHRVRfUEFTU1dPUkRfVUknOlxuXHRcdFx0cmV0dXJuICg8Rm9yZ2V0UGFzc3dvcmQgey4uLm90aGVyc30vPilcblx0XHRjYXNlICdSRVNFVF9QQVNTV09SRF9VSSc6XG5cdFx0XHRyZXR1cm4gKDxSZXNldFBhc3N3b3JkIHsuLi5vdGhlcnN9Lz4pXG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IFBob25lVmVyaWZpY2F0aW9uPSh7cGhvbmVWZXJpZmllZEVycm9yLGRpc3BhdGNofSk9Pntcblx0bGV0IGNvZGUscGhvbmVcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJwaG9uZXZlcmlmeVwiPlxuXHRcdFx0PFNNU1JlcXVlc3QgcmVmPXthPT5waG9uZT1hfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5jb2RlPWF9IGhpbnRUZXh0PVwidmVyaWZpY2F0aW9uIGNvZGUgeW91IGp1c3QgcmVjZWl2ZWRcIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWShwaG9uZS5nZXRWYWx1ZSgpLGNvZGUuZ2V0VmFsdWUoKSkpfX1cblx0XHRcdFx0ZXJyb3JUZXh0PXtwaG9uZVZlcmlmaWVkRXJyb3J9Lz5cblx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJ2ZXJpZnlcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRlkocGhvbmUuZ2V0VmFsdWUoKSxjb2RlLmdldFZhbHVlKCkpKX0vPlxuXHRcdFx0PC9jZW50ZXI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiYWxyZWFkeSBoYXZlIGFuIGFjY291bnRcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5jb25zdCBTaWdudXA9KHt1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLCBwYXNzd29yZDJFcnJvciwgZGlzcGF0Y2h9KT0+e1xuXHRsZXQgdXNlcm5hbWUsIHBhc3N3b3JkLCBwYXNzd29yZDJcblx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdHVzZXJuYW1lOnVzZXJuYW1lLmdldFZhbHVlKClcblx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcblx0fSlcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWdudXBcIj5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT51c2VybmFtZT1hfSBoaW50VGV4dD1cImxvZ2luIG5hbWVcIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0ZXJyb3JUZXh0PXt1c2VybmFtZUVycm9yfS8+XG5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiIGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn0vPlxuXG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQyPWF9XG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9fVxuXHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkIGFnYWluXCIgZXJyb3JUZXh0PXtwYXNzd29yZDJFcnJvcn0vPlxuXG5cdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfS8+XG5cdFx0XHQ8L2NlbnRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdClcbn1cblxuY29uc3QgU2lnbmluPSh7dXNlciwgdXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvcixkaXNwYXRjaH0pPT57XG5cdGxldCB1c2VybmFtZSwgcGFzc3dvcmRcblx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdHVzZXJuYW1lOnVzZXJuYW1lLmdldFZhbHVlKClcblx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHR9KVxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ25pblwiPlxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9XG5cdFx0XHRcdGhpbnRUZXh0PVwibG9naW4gbmFtZSBvciBwaG9uZSBudW1iZXJcIlxuXHRcdFx0XHRkZWZhdWx0VmFsdWU9e3VzZXIgJiYgdXNlci51c2VybmFtZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTklOKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTklOKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0gZXJyb3JUZXh0PXtwYXNzd29yZEVycm9yfVxuXHRcdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiBpblwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfS8+XG5cdFx0XHQ8L2NlbnRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJubyBhY2NvdW50XCJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfVUkpfS8+XG5cblx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQpXG59XG5cbmNvbnN0IEZvcmdldFBhc3N3b3JkPSh7Y29udGFjdEVycm9yLCBkaXNwYXRjaH0pPT57XG5cdGxldCBjb250YWN0XG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwiZm9yZ2V0UHdkXCI+XG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+Y29udGFjdD1hfVxuXHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkQoY29udGFjdC5nZXRWYWx1ZSgpKSl9fVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17Y29udGFjdEVycm9yfVxuXHRcdFx0XHRoaW50VGV4dD1cInBob25lIG51bWJlciBvciBlbWFpbFwiLz5cblxuXHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNlbmQgbWVcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkQoY29udGFjdC5nZXRWYWx1ZSgpKSl9Lz5cblx0XHRcdDwvY2VudGVyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1VJKX0vPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0KVxufVxuXG5jb25zdCBSZXNldFBhc3N3b3JkPSh7cmVzZXRFcnJvcixkaXNwYXRjaH0pPT57XG5cdGxldCBvbGRQYXNzd29yZCwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXHRsZXQgdmFsdWVzPWE9Pih7XG5cdFx0b2xkUGFzc3dvcmQ6b2xkUGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0LHBhc3N3b3JkMjpwYXNzd29yZDIuZ2V0VmFsdWUoKVxuXHR9KVxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInJlc2V0XCI+XG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+b2xkUGFzc3dvcmQ9YX0gaGludFRleHQ9XCJvbGQgcGFzc3dvcmRcIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRlcnJvclRleHQ9e3Jlc2V0RXJyb3J9Lz5cblxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX19XG5cdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiLz5cblxuXHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInJlc2V0IHBhc3N3b3JkXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX0vPlxuXHRcdFx0PC9jZW50ZXI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdClcbn1cblxuY2xhc3MgU01TUmVxdWVzdCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e3Bob25lOm51bGwsdGljazpudWxsfVxuXG4gICAgdGljaygpe1xuICAgICAgICBsZXQgaT02MCwgZG9UaWNrO1xuICAgICAgICB0aGlzLl90PXNldEludGVydmFsKGRvVGljaz0oKT0+e1xuICAgICAgICAgICAgaWYoaT09MCl7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6IDB9KVxuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOmktLX0pXG4gICAgICAgIH0sMTAwMCk7XG5cbiAgICAgICAgZG9UaWNrKClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICBpZih0aGlzLl90KVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7cGhvbmUsIHRpY2t9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRsZXQgYnV0dG9uLCByZWZQaG9uZVxuXHRcdGlmKHBob25lKXtcbiAgICAgICAgICAgIGlmKHRpY2spXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGlja30gZGlzYWJsZWQ9e3RydWV9Lz4pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGljaz09PTAgPyBcInJlc2VuZFwiIDogXCJzZW5kXCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnRpY2soKVxuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfUkVRVUVTVChyZWZQaG9uZS5nZXRWYWx1ZSgpKSlcblx0XHRcdFx0XHRcdFx0fX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtc3JlcXVlc3RcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG5cdFx0XHRcdFx0cmVmPXthPT5yZWZQaG9uZT1hfVxuXHRcdFx0XHRcdGhpbnRUZXh0PVwicGhvbmUgbnVtYmVyIChkZWZhdWx0ICs4NilcIlxuXHRcdFx0XHRcdGRpc2FibGVkPXshIXRpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnRoaXMuc2V0U3RhdGUoe3Bob25lOiB0aGlzLmlzUGhvbmUodmFsdWUpPyB2YWx1ZSA6IG51bGx9KX0vPlxuICAgICAgICAgICAgICAgIHtidXR0b259XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuXHRpc1Bob25lKHYpe1xuICAgICAgICByZXR1cm4gKC9eKFxcK1xcZHsyfSk/XFxkezExfSQvZykudGVzdCh2KVxuICAgIH1cblxuXHRnZXRWYWx1ZSgpe1xuXHRcdHJldHVybiB0aGlzLnN0YXRlLnBob25lXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihBY2NvdW50LHtET01BSU4sIEFDVElPTiwgUkVEVUNFUn0pXG4iXX0=