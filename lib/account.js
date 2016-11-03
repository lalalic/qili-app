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

var _reactRedux = require('react-redux');

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
			var username = user.username;
			var password = user.password;

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
	var type = _ref3.type;
	var payload = _ref3.payload;

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
			var _props = this.props;
			var type = _props.type;
			var user = _props.user;

			var others = _objectWithoutProperties(_props, ['type', 'user']);

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
};

var Signup = function Signup(_ref5) {
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
};

var Signin = function Signin(_ref6) {
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
};

var ForgetPassword = function ForgetPassword(_ref7) {
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
};

var ResetPassword = function ResetPassword(_ref8) {
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

			var _state = this.state;
			var phone = _state.phone;
			var tick = _state.tick;
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

exports.default = Object.assign((0, _reactRedux.connect)(function (state) {
	return state.ui;
})(Account), { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsIkFDVElPTiIsIlNJR05VUCIsInVzZXJuYW1lIiwidXNlciIsInBhc3N3b3JkIiwicGFzc3dvcmQyIiwidXNlcm5hbWVFcnJvciIsInBhc3N3b3JkRXJyb3IiLCJwYXNzd29yZDJFcnJvciIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJQcm9taXNlIiwicmVqZWN0Iiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfVkVSSUZZX1JFUVVFU1QiLCJyZXF1ZXN0VmVyaWZpY2F0aW9uIiwicGhvbmUiLCJQSE9ORV9WRVJJRlkiLCJjb2RlIiwidmVyaWZ5UGhvbmUiLCJ0aGVuIiwiU0lHTlVQX1VJIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsImNvbnRhY3RFcnJvciIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiYWxlcnQiLCJTSUdOSU5fVUkiLCJGT1JHRVRfUEFTU1dPUkRfVUkiLCJSRVNFVF9QQVNTV09SRF9VSSIsIlBIT05FX1ZFUklGWV9VSSIsIlJFRFVDRVIiLCJzdGF0ZSIsIk9iamVjdCIsImFzc2lnbiIsInNwbGl0IiwicG9wIiwiQWNjb3VudCIsInByb3BzIiwib3RoZXJzIiwiUGhvbmVWZXJpZmljYXRpb24iLCJwaG9uZVZlcmlmaWVkRXJyb3IiLCJhIiwiZSIsImtleUNvZGUiLCJnZXRWYWx1ZSIsIlNpZ251cCIsInZhbHVlcyIsIlNpZ25pbiIsIkZvcmdldFBhc3N3b3JkIiwiUmVzZXRQYXNzd29yZCIsInJlc2V0RXJyb3IiLCJvbGRQYXNzd29yZCIsIlJFU0VUX1BBU1NXT1JEIiwiU01TUmVxdWVzdCIsInRpY2siLCJpIiwiZG9UaWNrIiwiX3QiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzZXRTdGF0ZSIsImJ1dHRvbiIsInJlZlBob25lIiwidmFsdWUiLCJ0YXJn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SmQsR0FESjtBQU1LRjtBQU5MLElBREo7QUFVSDs7OzBCQUVJSyxDLEVBQUU7QUFDSCxVQUFRLHNCQUFELENBQXdCQyxJQUF4QixDQUE2QkQsQ0FBN0I7QUFBUDtBQUNIOzs7NkJBRU07QUFDVCxVQUFPLEtBQUtuQyxLQUFMLENBQVdoQixLQUFsQjtBQUNBOzs7Ozs7a0JBR2FpQixPQUFPQyxNQUFQLENBQWMseUJBQVE7QUFBQSxRQUFPRixNQUFNcUMsRUFBYjtBQUFBLENBQVIsRUFBeUJoQyxPQUF6QixDQUFkLEVBQWdELEVBQUM1QyxjQUFELEVBQVNFLGNBQVQsRUFBaUJvQyxnQkFBakIsRUFBaEQsQyIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VGV4dEZpZWxkLEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgVXNlciBmcm9tICcuL2RiL3VzZXInXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmNvbnN0IEVOVEVSPTEzXG5leHBvcnQgY29uc3QgRE9NQUlOPVwiXCJcbmNvbnN0IElOSVRfU1RBVEU9e31cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRTSUdOVVA6dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUscGFzc3dvcmQscGFzc3dvcmQyfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IscGFzc3dvcmQyRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYocGFzc3dvcmQhPXBhc3N3b3JkMilcblx0XHRcdHBhc3N3b3JkMkVycm9yPVwicGFzc3dvcmQgZG9lc24ndCBtYXRjaFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3J8fHBhc3N3b3JkMkVycm9yKXtcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOVVBfVUlgLCBwYXlsb2FkOntwYXNzd29yZEVycm9yLCB1c2VybmFtZUVycm9yLHBhc3N3b3JkMkVycm9yfX0pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXHRcdH1cblxuXHRcdHJldHVybiBVc2VyLnNpZ251cCh7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vU0lHTlVQX1VJYCwgcGF5bG9hZDp7dXNlcm5hbWVFcnJvcjptZXNzYWdlfX0pKVxuXHR9XG5cdCxTSUdOSU46dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUsIHBhc3N3b3JkfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yKXtcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgLHBheWxvYWQ6e3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3J9fSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIFVzZXIuc2lnbmluKHt1c2VybmFtZSxwYXNzd29yZH0pXG5cdFx0XHQuY2F0Y2goKHttZXNzYWdlfSk9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgLHBheWxvYWQ6e3VzZXJuYW1lRXJyb3I6bWVzc2FnZX19KSlcblx0fVxuXHQsUEhPTkVfVkVSSUZZX1JFUVVFU1Q6cGhvbmU9Pntcblx0XHRVc2VyLnJlcXVlc3RWZXJpZmljYXRpb24ocGhvbmUpXG5cdFx0cmV0dXJuIHt0eXBlOmBAQCR7RE9NQUlOfS9QSE9ORV9WRVJJRllfUkVRVUVTVGB9XG5cdH1cblx0LFBIT05FX1ZFUklGWToocGhvbmUsY29kZSk9PmRpc3BhdGNoPT5Vc2VyLnZlcmlmeVBob25lKHBob25lLGNvZGUpLnRoZW4oYT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUF9VSSkpXG5cblx0LEZPUkdFVF9QQVNTV09SRDogY29udGFjdD0+ZGlzcGF0Y2g9Pntcblx0XHRpZighY29udGFjdCl7XG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vRk9SR0VUX1BBU1NXT1JEX1VJYCxjb250YWN0RXJyb3I6XCJhIHBob25lIG51bWJlciBvciBlbWFpbCBtdXN0IGJlIGdpdmVuIHRvIHJlc2V0IHBhc3N3b3JkXCJ9KVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHR9XG5cblx0XHRyZXR1cm4gVXNlci5yZXF1ZXN0UGFzc3dvcmRSZXNldChjb250YWN0KVxuXHRcdFx0LnRoZW4oYT0+YWxlcnQoYHJlc2V0IGVtYWlsL3NtcyBzZW50IHRvICR7Y29udGFjdH0sIHBsZWFzZSBmb2xsb3cgdGhlIGluc3RydWN0aW9uIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmRgKSlcblx0fVxuXG5cdCxTSUdOVVBfVUk6e3R5cGU6YEBAe0RPTUFJTn0vU0lHTlVQX1VJYH1cblx0LFNJR05JTl9VSTp7dHlwZTpgQEAke0RPTUFJTn0vU0lHTklOX1VJYH1cblx0LEZPUkdFVF9QQVNTV09SRF9VSTp7dHlwZTpgQEAke0RPTUFJTn0vRk9SR0VUX1BBU1NXT1JEX1VJYH1cblx0LFJFU0VUX1BBU1NXT1JEX1VJOnt0eXBlOmBAQCR7RE9NQUlOfS9SRVNFVF9QQVNTV09SRF9VSWB9XG5cdCxQSE9ORV9WRVJJRllfVUk6KHt0eXBlOmBAQCR7RE9NQUlOfS9QSE9ORV9WRVJJRllfVUlgfSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vU0lHTlVQX1VJYDpcblx0Y2FzZSBgQEAke0RPTUFJTn0vU0lHTklOX1VJYDpcblx0Y2FzZSBgQEAke0RPTUFJTn0vRk9SR0VUX1BBU1NXT1JEX1VJYDpcblx0Y2FzZSBgQEAke0RPTUFJTn0vUkVTRVRfUEFTU1dPUkRfVUlgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS9QSE9ORV9WRVJJRllfVUlgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt0eXBlOnR5cGUuc3BsaXQoXCIvXCIpLnBvcCgpfSxwYXlsb2FkKVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5jbGFzcyBBY2NvdW50IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRyZW5kZXIoKXtcblx0XHRsZXQge3R5cGUsdXNlciwuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRpZighdHlwZSl7XG5cdFx0XHRpZih1c2VyKVxuXHRcdFx0XHR0eXBlPSdTSUdOSU5fVUknXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHR5cGU9J1BIT05FX1ZFUklGWV9VSSdcblx0XHR9XG5cblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSAnU0lHTlVQX1VJJzpcblx0XHRcdHJldHVybiAoPFNpZ251cCB7Li4ub3RoZXJzfSAvPilcblx0XHRjYXNlICdTSUdOSU5fVUknOlxuXHRcdFx0cmV0dXJuICg8U2lnbmluIHsuLi5vdGhlcnN9IHVzZXI9e3VzZXJ9Lz4pXG5cdFx0Y2FzZSAnUEhPTkVfVkVSSUZZX1VJJzpcblx0XHRcdHJldHVybiAoPFBob25lVmVyaWZpY2F0aW9uIHsuLi5vdGhlcnN9Lz4pXG5cdFx0Y2FzZSAnRk9SR0VUX1BBU1NXT1JEX1VJJzpcblx0XHRcdHJldHVybiAoPEZvcmdldFBhc3N3b3JkIHsuLi5vdGhlcnN9Lz4pXG5cdFx0Y2FzZSAnUkVTRVRfUEFTU1dPUkRfVUknOlxuXHRcdFx0cmV0dXJuICg8UmVzZXRQYXNzd29yZCB7Li4ub3RoZXJzfS8+KVxuXHRcdH1cblx0fVxufVxuXG5jb25zdCBQaG9uZVZlcmlmaWNhdGlvbj0oe3Bob25lVmVyaWZpZWRFcnJvcixkaXNwYXRjaH0pPT57XG5cdGxldCBjb2RlLHBob25lXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicGhvbmV2ZXJpZnlcIj5cblx0XHRcdDxTTVNSZXF1ZXN0IHJlZj17YT0+cGhvbmU9YX0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+XG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+Y29kZT1hfSBoaW50VGV4dD1cInZlcmlmaWNhdGlvbiBjb2RlIHlvdSBqdXN0IHJlY2VpdmVkXCJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRlkocGhvbmUuZ2V0VmFsdWUoKSxjb2RlLmdldFZhbHVlKCkpKX19XG5cdFx0XHRcdGVycm9yVGV4dD17cGhvbmVWZXJpZmllZEVycm9yfS8+XG5cdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwidmVyaWZ5XCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZKHBob25lLmdldFZhbHVlKCksY29kZS5nZXRWYWx1ZSgpKSl9Lz5cblx0XHRcdDwvY2VudGVyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuY29uc3QgU2lnbnVwPSh7dXNlcm5hbWVFcnJvciwgcGFzc3dvcmRFcnJvciwgcGFzc3dvcmQyRXJyb3IsIGRpc3BhdGNofSk9Pntcblx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmQyXG5cdGxldCB2YWx1ZXM9YT0+KHtcblx0XHR1c2VybmFtZTp1c2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHQscGFzc3dvcmQyOnBhc3N3b3JkMi5nZXRWYWx1ZSgpXG5cdH0pXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbnVwXCI+XG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+dXNlcm5hbWU9YX0gaGludFRleHQ9XCJsb2dpbiBuYW1lXCJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX19XG5cdFx0XHRcdGVycm9yVGV4dD17dXNlcm5hbWVFcnJvcn0vPlxuXG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX19XG5cdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIiBlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9Lz5cblxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkMj1hfVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05VUCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiIGVycm9yVGV4dD17cGFzc3dvcmQyRXJyb3J9Lz5cblxuXHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX0vPlxuXHRcdFx0PC9jZW50ZXI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiYWxyZWFkeSBoYXZlIGFuIGFjY291bnRcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQpXG59XG5cbmNvbnN0IFNpZ25pbj0oe3VzZXIsIHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IsZGlzcGF0Y2h9KT0+e1xuXHRsZXQgdXNlcm5hbWUsIHBhc3N3b3JkXG5cdGxldCB2YWx1ZXM9YT0+KHtcblx0XHR1c2VybmFtZTp1c2VybmFtZS5nZXRWYWx1ZSgpXG5cdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0fSlcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWduaW5cIj5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT51c2VybmFtZT1hfVxuXHRcdFx0XHRoaW50VGV4dD1cImxvZ2luIG5hbWUgb3IgcGhvbmUgbnVtYmVyXCJcblx0XHRcdFx0ZGVmYXVsdFZhbHVlPXt1c2VyICYmIHVzZXIudXNlcm5hbWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlNJR05JTih2YWx1ZXMoKSkpfX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGVycm9yVGV4dD17cGFzc3dvcmRFcnJvcn1cblx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU4odmFsdWVzKCkpKX0vPlxuXHRcdFx0PC9jZW50ZXI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwibm8gYWNjb3VudFwiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1VJKX0vPlxuXG5cdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5jb25zdCBGb3JnZXRQYXNzd29yZD0oe2NvbnRhY3RFcnJvciwgZGlzcGF0Y2h9KT0+e1xuXHRsZXQgY29udGFjdFxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cImZvcmdldFB3ZFwiPlxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvbnRhY3Q9YX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEKGNvbnRhY3QuZ2V0VmFsdWUoKSkpfX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfSBlcnJvclRleHQ9e2NvbnRhY3RFcnJvcn1cblx0XHRcdFx0aGludFRleHQ9XCJwaG9uZSBudW1iZXIgb3IgZW1haWxcIi8+XG5cblx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzZW5kIG1lXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEKGNvbnRhY3QuZ2V0VmFsdWUoKSkpfS8+XG5cdFx0XHQ8L2NlbnRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdClcbn1cblxuY29uc3QgUmVzZXRQYXNzd29yZD0oe3Jlc2V0RXJyb3IsZGlzcGF0Y2h9KT0+e1xuXHRsZXQgb2xkUGFzc3dvcmQsIHBhc3N3b3JkLCBwYXNzd29yZDJcblx0bGV0IHZhbHVlcz1hPT4oe1xuXHRcdG9sZFBhc3N3b3JkOm9sZFBhc3N3b3JkLmdldFZhbHVlKClcblx0XHQscGFzc3dvcmQ6cGFzc3dvcmQuZ2V0VmFsdWUoKVxuXHRcdCxwYXNzd29yZDI6cGFzc3dvcmQyLmdldFZhbHVlKClcblx0fSlcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJyZXNldFwiPlxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9Pm9sZFBhc3N3b3JkPWF9IGhpbnRUZXh0PVwib2xkIHBhc3N3b3JkXCJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0ZXJyb3JUZXh0PXtyZXNldEVycm9yfS8+XG5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZD1hfVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9fVxuXHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQyPWF9XG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX19XG5cdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XG5cblx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJyZXNldCBwYXNzd29yZFwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9Lz5cblx0XHRcdDwvY2VudGVyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TSUdOSU5fVUkpfS8+XG5cblx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5GT1JHRVRfUEFTU1dPUkRfVUkpfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQpXG59XG5cbmNsYXNzIFNNU1JlcXVlc3QgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtwaG9uZTpudWxsLHRpY2s6bnVsbH1cblxuICAgIHRpY2soKXtcbiAgICAgICAgbGV0IGk9NjAsIGRvVGljaztcbiAgICAgICAgdGhpcy5fdD1zZXRJbnRlcnZhbChkb1RpY2s9KCk9PntcbiAgICAgICAgICAgIGlmKGk9PTApe1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOiAwfSlcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazppLS19KVxuICAgICAgICB9LDEwMDApO1xuXG4gICAgICAgIGRvVGljaygpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgaWYodGhpcy5fdClcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3Bob25lLCB0aWNrfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGJ1dHRvbiwgcmVmUGhvbmVcblx0XHRpZihwaG9uZSl7XG4gICAgICAgICAgICBpZih0aWNrKVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2t9IGRpc2FibGVkPXt0cnVlfS8+KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2s9PT0wID8gXCJyZXNlbmRcIiA6IFwic2VuZFwifVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50aWNrKClcblx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZX1JFUVVFU1QocmVmUGhvbmUuZ2V0VmFsdWUoKSkpXG5cdFx0XHRcdFx0XHRcdH19Lz4pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbXNyZXF1ZXN0XCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuXHRcdFx0XHRcdHJlZj17YT0+cmVmUGhvbmU9YX1cblx0XHRcdFx0XHRoaW50VGV4dD1cInBob25lIG51bWJlciAoZGVmYXVsdCArODYpXCJcblx0XHRcdFx0XHRkaXNhYmxlZD17ISF0aWNrfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT50aGlzLnNldFN0YXRlKHtwaG9uZTogdGhpcy5pc1Bob25lKHZhbHVlKT8gdmFsdWUgOiBudWxsfSl9Lz5cbiAgICAgICAgICAgICAgICB7YnV0dG9ufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblx0aXNQaG9uZSh2KXtcbiAgICAgICAgcmV0dXJuICgvXihcXCtcXGR7Mn0pP1xcZHsxMX0kL2cpLnRlc3QodilcbiAgICB9XG5cblx0Z2V0VmFsdWUoKXtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5waG9uZVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdChzdGF0ZT0+c3RhdGUudWkpKEFjY291bnQpLHtET01BSU4sIEFDVElPTiwgUkVEVUNFUn0pXG4iXX0=