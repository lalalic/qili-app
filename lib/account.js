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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ENTER = 13;
var DOMAIN = exports.DOMAIN = "ui.account";
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
	}
	return state;
});

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

exports.default = Object.assign((0, _reactRedux.connect)(function (state) {
	return state.ui;
})(Account), { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbIkVOVEVSIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsIkFDVElPTiIsIlNJR05VUCIsInVzZXJuYW1lIiwidXNlciIsInBhc3N3b3JkIiwicGFzc3dvcmQyIiwidXNlcm5hbWVFcnJvciIsInBhc3N3b3JkRXJyb3IiLCJwYXNzd29yZDJFcnJvciIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJQcm9taXNlIiwicmVqZWN0Iiwic2lnbnVwIiwiY2F0Y2giLCJtZXNzYWdlIiwiU0lHTklOIiwic2lnbmluIiwiUEhPTkVfVkVSSUZZX1JFUVVFU1QiLCJyZXF1ZXN0VmVyaWZpY2F0aW9uIiwicGhvbmUiLCJQSE9ORV9WRVJJRlkiLCJjb2RlIiwidmVyaWZ5UGhvbmUiLCJ0aGVuIiwiU0lHTlVQX1VJIiwiRk9SR0VUX1BBU1NXT1JEIiwiY29udGFjdCIsImNvbnRhY3RFcnJvciIsInJlcXVlc3RQYXNzd29yZFJlc2V0IiwiYWxlcnQiLCJTSUdOSU5fVUkiLCJGT1JHRVRfUEFTU1dPUkRfVUkiLCJSRVNFVF9QQVNTV09SRF9VSSIsIlBIT05FX1ZFUklGWV9VSSIsIlJFRFVDRVIiLCJzdGF0ZSIsIk9iamVjdCIsImFzc2lnbiIsInNwbGl0IiwicG9wIiwiQWNjb3VudCIsInByb3BzIiwib3RoZXJzIiwiUGhvbmVWZXJpZmljYXRpb24iLCJwaG9uZVZlcmlmaWVkRXJyb3IiLCJhIiwiZSIsImtleUNvZGUiLCJnZXRWYWx1ZSIsIlNpZ251cCIsInZhbHVlcyIsIlNpZ25pbiIsIkZvcmdldFBhc3N3b3JkIiwiUmVzZXRQYXNzd29yZCIsInJlc2V0RXJyb3IiLCJvbGRQYXNzd29yZCIsIlJFU0VUX1BBU1NXT1JEIiwiU01TUmVxdWVzdCIsInRpY2siLCJpIiwiZG9UaWNrIiwiX3QiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzZXRTdGF0ZSIsImJ1dHRvbiIsInJlZlBob25lIiwidmFsdWUiLCJ0YXJnZXQiLCJpc1Bob25lIiwidiIsInRlc3QiLCJ1aSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBTSxFQUFaO0FBQ08sSUFBTUMsMEJBQU8sWUFBYjtBQUNQLElBQU1DLGFBQVcsRUFBakI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsU0FBTztBQUFBLFNBQU0sb0JBQVU7QUFBQSxPQUNmQyxRQURlLEdBQ2NDLElBRGQsQ0FDZkQsUUFEZTtBQUFBLE9BQ05FLFFBRE0sR0FDY0QsSUFEZCxDQUNOQyxRQURNO0FBQUEsT0FDR0MsU0FESCxHQUNjRixJQURkLENBQ0dFLFNBREg7O0FBRXRCLE9BQUlDLHNCQUFKO0FBQUEsT0FBbUJDLHNCQUFuQjtBQUFBLE9BQWlDQyx1QkFBakM7QUFDQSxPQUFHLENBQUNOLFFBQUosRUFDQ0ksZ0JBQWMsdUJBQWQ7QUFDRCxPQUFHLENBQUNGLFFBQUosRUFDQ0csZ0JBQWMsc0JBQWQ7O0FBRUQsT0FBR0gsWUFBVUMsU0FBYixFQUNDRyxpQkFBZSx3QkFBZjs7QUFFRCxPQUFHRixpQkFBaUJDLGFBQWpCLElBQWdDQyxjQUFuQyxFQUFrRDtBQUNqREMsYUFBUyxFQUFDQyxhQUFVWixNQUFWLGVBQUQsRUFBK0JhLFNBQVEsRUFBQ0osNEJBQUQsRUFBZ0JELDRCQUFoQixFQUE4QkUsOEJBQTlCLEVBQXZDLEVBQVQ7QUFDQSxXQUFPSSxRQUFRQyxNQUFSLEVBQVA7QUFDQTs7QUFFRCxVQUFPLGVBQUtDLE1BQUwsQ0FBWSxFQUFDWixrQkFBRCxFQUFVRSxrQkFBVixFQUFaLEVBQ0xXLEtBREssQ0FDQztBQUFBLFFBQUVDLE9BQUYsUUFBRUEsT0FBRjtBQUFBLFdBQWFQLFNBQVMsRUFBQ0MsYUFBVVosTUFBVixlQUFELEVBQStCYSxTQUFRLEVBQUNMLGVBQWNVLE9BQWYsRUFBdkMsRUFBVCxDQUFiO0FBQUEsSUFERCxDQUFQO0FBRUEsR0FsQk07QUFBQSxFQURZO0FBb0JsQkMsU0FBTztBQUFBLFNBQU0sb0JBQVU7QUFBQSxPQUNoQmYsUUFEZ0IsR0FDSUMsSUFESixDQUNoQkQsUUFEZ0I7QUFBQSxPQUNORSxRQURNLEdBQ0lELElBREosQ0FDTkMsUUFETTs7QUFFdkIsT0FBSUUsc0JBQUo7QUFBQSxPQUFtQkMsc0JBQW5CO0FBQ0EsT0FBRyxDQUFDTCxRQUFKLEVBQ0NJLGdCQUFjLHVCQUFkO0FBQ0QsT0FBRyxDQUFDRixRQUFKLEVBQ0NHLGdCQUFjLHNCQUFkOztBQUVELE9BQUdELGlCQUFpQkMsYUFBcEIsRUFBa0M7QUFDakNFLGFBQVMsRUFBQ0MsYUFBVVosTUFBVixlQUFELEVBQThCYSxTQUFRLEVBQUNMLDRCQUFELEVBQWdCQyw0QkFBaEIsRUFBdEMsRUFBVDtBQUNBLFdBQU9LLFFBQVFDLE1BQVIsRUFBUDtBQUNBOztBQUVELFVBQU8sZUFBS0ssTUFBTCxDQUFZLEVBQUNoQixrQkFBRCxFQUFVRSxrQkFBVixFQUFaLEVBQ0xXLEtBREssQ0FDQztBQUFBLFFBQUVDLE9BQUYsU0FBRUEsT0FBRjtBQUFBLFdBQWFQLFNBQVMsRUFBQ0MsYUFBVVosTUFBVixlQUFELEVBQThCYSxTQUFRLEVBQUNMLGVBQWNVLE9BQWYsRUFBdEMsRUFBVCxDQUFiO0FBQUEsSUFERCxDQUFQO0FBRUEsR0FmTztBQUFBLEVBcEJXO0FBb0NsQkcsdUJBQXFCLHFDQUFPO0FBQzVCLGlCQUFLQyxtQkFBTCxDQUF5QkMsS0FBekI7QUFDQSxTQUFPLEVBQUNYLGFBQVVaLE1BQVYsMEJBQUQsRUFBUDtBQUNBLEVBdkNrQjtBQXdDbEJ3QixlQUFhLHNCQUFDRCxLQUFELEVBQU9FLElBQVA7QUFBQSxTQUFjO0FBQUEsVUFBVSxlQUFLQyxXQUFMLENBQWlCSCxLQUFqQixFQUF1QkUsSUFBdkIsRUFBNkJFLElBQTdCLENBQWtDO0FBQUEsV0FBR2hCLFNBQVNULE9BQU8wQixTQUFoQixDQUFIO0FBQUEsSUFBbEMsQ0FBVjtBQUFBLEdBQWQ7QUFBQSxFQXhDSzs7QUEwQ2xCQyxrQkFBaUI7QUFBQSxTQUFTLG9CQUFVO0FBQ3BDLE9BQUcsQ0FBQ0MsT0FBSixFQUFZO0FBQ1huQixhQUFTLEVBQUNDLGFBQVVaLE1BQVYsd0JBQUQsRUFBdUMrQixjQUFhLHlEQUFwRCxFQUFUO0FBQ0EsV0FBT2pCLFFBQVFDLE1BQVIsRUFBUDtBQUNBOztBQUVELFVBQU8sZUFBS2lCLG9CQUFMLENBQTBCRixPQUExQixFQUNMSCxJQURLLENBQ0E7QUFBQSxXQUFHTSxtQ0FBaUNILE9BQWpDLDREQUFIO0FBQUEsSUFEQSxDQUFQO0FBRUEsR0FSaUI7QUFBQSxFQTFDQzs7QUFvRGxCRixZQUFVLEVBQUNoQiw0QkFBRCxFQXBEUTtBQXFEbEJzQixZQUFVLEVBQUN0QixhQUFVWixNQUFWLGVBQUQsRUFyRFE7QUFzRGxCbUMscUJBQW1CLEVBQUN2QixhQUFVWixNQUFWLHdCQUFELEVBdEREO0FBdURsQm9DLG9CQUFrQixFQUFDeEIsYUFBVVosTUFBVix1QkFBRCxFQXZEQTtBQXdEbEJxQyxrQkFBaUIsRUFBQ3pCLGFBQVVaLE1BQVYscUJBQUQ7QUF4REMsQ0FBYjs7QUEyREEsSUFBTXNDLGdEQUNYdEMsTUFEVyxFQUNILFlBQW1DO0FBQUEsS0FBbEN1QyxLQUFrQyx1RUFBNUJ0QyxVQUE0QjtBQUFBO0FBQUEsS0FBaEJXLElBQWdCLFNBQWhCQSxJQUFnQjtBQUFBLEtBQVhDLE9BQVcsU0FBWEEsT0FBVzs7QUFDM0MsU0FBT0QsSUFBUDtBQUNBLGNBQVVaLE1BQVY7QUFDQSxjQUFVQSxNQUFWO0FBQ0EsY0FBVUEsTUFBVjtBQUNBLGNBQVVBLE1BQVY7QUFDQSxjQUFVQSxNQUFWO0FBQ0MsVUFBT3dDLE9BQU9DLE1BQVAsQ0FBYyxFQUFDN0IsTUFBS0EsS0FBSzhCLEtBQUwsQ0FBVyxHQUFYLEVBQWdCQyxHQUFoQixFQUFOLEVBQWQsRUFBMkM5QixPQUEzQyxDQUFQO0FBTkQ7QUFRQSxRQUFPMEIsS0FBUDtBQUNBLENBWFcsQ0FBTjs7SUFjREssTzs7Ozs7Ozs7Ozs7MkJBQ0c7QUFBQSxnQkFDbUIsS0FBS0MsS0FEeEI7QUFBQSxPQUNGakMsSUFERSxVQUNGQSxJQURFO0FBQUEsT0FDR1AsSUFESCxVQUNHQSxJQURIO0FBQUEsT0FDV3lDLE1BRFg7O0FBRVAsT0FBRyxDQUFDbEMsSUFBSixFQUFTO0FBQ1IsUUFBR1AsSUFBSCxFQUNDTyxPQUFLLFdBQUwsQ0FERCxLQUdDQSxPQUFLLGlCQUFMO0FBQ0Q7O0FBRUQsV0FBT0EsSUFBUDtBQUNBLFNBQUssV0FBTDtBQUNDLFlBQVEsOEJBQUMsTUFBRCxFQUFZa0MsTUFBWixDQUFSO0FBQ0QsU0FBSyxXQUFMO0FBQ0MsWUFBUSw4QkFBQyxNQUFELGVBQVlBLE1BQVosSUFBb0IsTUFBTXpDLElBQTFCLElBQVI7QUFDRCxTQUFLLGlCQUFMO0FBQ0MsWUFBUSw4QkFBQyxpQkFBRCxFQUF1QnlDLE1BQXZCLENBQVI7QUFDRCxTQUFLLG9CQUFMO0FBQ0MsWUFBUSw4QkFBQyxjQUFELEVBQW9CQSxNQUFwQixDQUFSO0FBQ0QsU0FBSyxtQkFBTDtBQUNDLFlBQVEsOEJBQUMsYUFBRCxFQUFtQkEsTUFBbkIsQ0FBUjtBQVZEO0FBWUE7Ozs7OztBQUdGLElBQU1DLG9CQUFrQixTQUFsQkEsaUJBQWtCLFFBQWlDO0FBQUEsS0FBL0JDLGtCQUErQixTQUEvQkEsa0JBQStCO0FBQUEsS0FBWnJDLFFBQVksU0FBWkEsUUFBWTs7QUFDeEQsS0FBSWMsYUFBSjtBQUFBLEtBQVNGLGNBQVQ7QUFDQSxRQUNDO0FBQUE7QUFBQSxJQUFLLFdBQVUsTUFBZixFQUFzQixLQUFJLGFBQTFCO0FBQ0MsZ0NBQUMsVUFBRCxJQUFZLEtBQUs7QUFBQSxXQUFHQSxRQUFNMEIsQ0FBVDtBQUFBLElBQWpCLEVBQTZCLFVBQVV0QyxRQUF2QyxHQUREO0FBRUMseURBQVcsS0FBSztBQUFBLFdBQUdjLE9BQUt3QixDQUFSO0FBQUEsSUFBaEIsRUFBMkIsVUFBUyxxQ0FBcEM7QUFDQyxjQUFXLElBRFo7QUFFQyxjQUFXLHNCQUFHO0FBQUNDLE1BQUVDLE9BQUYsSUFBV3BELEtBQVgsSUFBb0JZLFNBQVNULE9BQU9zQixZQUFQLENBQW9CRCxNQUFNNkIsUUFBTixFQUFwQixFQUFxQzNCLEtBQUsyQixRQUFMLEVBQXJDLENBQVQsQ0FBcEI7QUFBb0YsSUFGcEc7QUFHQyxjQUFXSixrQkFIWixHQUZEO0FBTUM7QUFBQTtBQUFBO0FBQ0MsNkRBQWMsT0FBTSxRQUFwQixFQUE2QixTQUFTLElBQXRDO0FBQ0MsYUFBUztBQUFBLFlBQUdyQyxTQUFTVCxPQUFPc0IsWUFBUCxDQUFvQkQsTUFBTTZCLFFBQU4sRUFBcEIsRUFBcUMzQixLQUFLMkIsUUFBTCxFQUFyQyxDQUFULENBQUg7QUFBQSxLQURWO0FBREQsR0FORDtBQVVDO0FBQUE7QUFBQSxLQUFLLFdBQVUsVUFBZjtBQUNDLDJEQUFZLE9BQU0seUJBQWxCO0FBQ0MsYUFBUztBQUFBLFlBQUd6QyxTQUFTVCxPQUFPZ0MsU0FBaEIsQ0FBSDtBQUFBLEtBRFYsR0FERDtBQUlDLDJEQUFZLE9BQU0saUJBQWxCO0FBQ0MsYUFBUztBQUFBLFlBQUd2QixTQUFTVCxPQUFPaUMsa0JBQWhCLENBQUg7QUFBQSxLQURWO0FBSkQ7QUFWRCxFQUREO0FBb0JBLENBdEJEOztBQXdCQSxJQUFNa0IsU0FBTyxTQUFQQSxNQUFPLFFBQTREO0FBQUEsS0FBMUQ3QyxhQUEwRCxTQUExREEsYUFBMEQ7QUFBQSxLQUEzQ0MsYUFBMkMsU0FBM0NBLGFBQTJDO0FBQUEsS0FBNUJDLGNBQTRCLFNBQTVCQSxjQUE0QjtBQUFBLEtBQVpDLFFBQVksU0FBWkEsUUFBWTs7QUFDeEUsS0FBSVAsaUJBQUo7QUFBQSxLQUFjRSxpQkFBZDtBQUFBLEtBQXdCQyxrQkFBeEI7QUFDQSxLQUFJK0MsU0FBTyxTQUFQQSxNQUFPO0FBQUEsU0FBSTtBQUNkbEQsYUFBU0EsU0FBU2dELFFBQVQsRUFESztBQUViOUMsYUFBU0EsU0FBUzhDLFFBQVQsRUFGSTtBQUdiN0MsY0FBVUEsVUFBVTZDLFFBQVY7QUFIRyxHQUFKO0FBQUEsRUFBWDtBQUtBLFFBQ0M7QUFBQTtBQUFBLElBQUssV0FBVSxNQUFmLEVBQXNCLEtBQUksUUFBMUI7QUFDQyx5REFBVyxLQUFLO0FBQUEsV0FBR2hELFdBQVM2QyxDQUFaO0FBQUEsSUFBaEIsRUFBK0IsVUFBUyxZQUF4QztBQUNDLGNBQVcsSUFEWjtBQUVDLGNBQVcsc0JBQUc7QUFBQ0MsTUFBRUMsT0FBRixJQUFXcEQsS0FBWCxJQUFvQlksU0FBU1QsT0FBT0MsTUFBUCxDQUFjbUQsUUFBZCxDQUFULENBQXBCO0FBQXNELElBRnRFO0FBR0MsY0FBVzlDLGFBSFosR0FERDtBQU1DLHlEQUFXLEtBQUs7QUFBQSxXQUFHRixXQUFTMkMsQ0FBWjtBQUFBLElBQWhCO0FBQ0MsY0FBVyxJQURaO0FBRUMsY0FBVyxzQkFBRztBQUFDQyxNQUFFQyxPQUFGLElBQVdwRCxLQUFYLElBQW9CWSxTQUFTVCxPQUFPQyxNQUFQLENBQWNtRCxRQUFkLENBQVQsQ0FBcEI7QUFBc0QsSUFGdEU7QUFHQyxTQUFLLFVBSE4sRUFHaUIsVUFBUyxVQUgxQixFQUdxQyxXQUFXN0MsYUFIaEQsR0FORDtBQVdDLHlEQUFXLEtBQUs7QUFBQSxXQUFHRixZQUFVMEMsQ0FBYjtBQUFBLElBQWhCO0FBQ0MsY0FBVyxJQURaO0FBRUMsY0FBVyxzQkFBRztBQUFDQyxNQUFFQyxPQUFGLElBQVdwRCxLQUFYLElBQW9CWSxTQUFTVCxPQUFPQyxNQUFQLENBQWNtRCxRQUFkLENBQVQsQ0FBcEI7QUFBc0QsSUFGdEU7QUFHQyxTQUFLLFVBSE4sRUFHaUIsVUFBUyxnQkFIMUIsRUFHMkMsV0FBVzVDLGNBSHRELEdBWEQ7QUFnQkM7QUFBQTtBQUFBO0FBQ0MsNkRBQWMsT0FBTSxTQUFwQixFQUE4QixTQUFTLElBQXZDO0FBQ0MsYUFBUztBQUFBLFlBQUdDLFNBQVNULE9BQU9DLE1BQVAsQ0FBY21ELFFBQWQsQ0FBVCxDQUFIO0FBQUEsS0FEVjtBQURELEdBaEJEO0FBb0JDO0FBQUE7QUFBQSxLQUFLLFdBQVUsVUFBZjtBQUNDLDJEQUFZLE9BQU0seUJBQWxCO0FBQ0MsYUFBUztBQUFBLFlBQUczQyxTQUFTVCxPQUFPZ0MsU0FBaEIsQ0FBSDtBQUFBLEtBRFYsR0FERDtBQUlDLDJEQUFZLE9BQU0saUJBQWxCO0FBQ0MsYUFBUztBQUFBLFlBQUd2QixTQUFTVCxPQUFPaUMsa0JBQWhCLENBQUg7QUFBQSxLQURWO0FBSkQ7QUFwQkQsRUFERDtBQThCQSxDQXJDRDs7QUF1Q0EsSUFBTW9CLFNBQU8sU0FBUEEsTUFBTyxRQUFpRDtBQUFBLEtBQS9DbEQsSUFBK0MsU0FBL0NBLElBQStDO0FBQUEsS0FBekNHLGFBQXlDLFNBQXpDQSxhQUF5QztBQUFBLEtBQTFCQyxhQUEwQixTQUExQkEsYUFBMEI7QUFBQSxLQUFaRSxRQUFZLFNBQVpBLFFBQVk7O0FBQzdELEtBQUlQLGlCQUFKO0FBQUEsS0FBY0UsaUJBQWQ7QUFDQSxLQUFJZ0QsU0FBTyxTQUFQQSxNQUFPO0FBQUEsU0FBSTtBQUNkbEQsYUFBU0EsU0FBU2dELFFBQVQsRUFESztBQUViOUMsYUFBU0EsU0FBUzhDLFFBQVQ7QUFGSSxHQUFKO0FBQUEsRUFBWDtBQUlBLFFBQ0M7QUFBQTtBQUFBLElBQUssV0FBVSxNQUFmLEVBQXNCLEtBQUksUUFBMUI7QUFDQyx5REFBVyxLQUFLO0FBQUEsV0FBR2hELFdBQVM2QyxDQUFaO0FBQUEsSUFBaEI7QUFDQyxhQUFTLDRCQURWO0FBRUMsaUJBQWM1QyxRQUFRQSxLQUFLRCxRQUY1QjtBQUdDLGNBQVcsc0JBQUc7QUFBQzhDLE1BQUVDLE9BQUYsSUFBV3BELEtBQVgsSUFBb0JZLFNBQVNULE9BQU9pQixNQUFQLENBQWNtQyxRQUFkLENBQVQsQ0FBcEI7QUFBc0QsSUFIdEU7QUFJQyxjQUFXLElBSlo7QUFLQyxjQUFXOUMsYUFMWixHQUREO0FBT0MseURBQVcsS0FBSztBQUFBLFdBQUdGLFdBQVMyQyxDQUFaO0FBQUEsSUFBaEI7QUFDRSxjQUFXLHNCQUFHO0FBQUNDLE1BQUVDLE9BQUYsSUFBV3BELEtBQVgsSUFBb0JZLFNBQVNULE9BQU9pQixNQUFQLENBQWNtQyxRQUFkLENBQVQsQ0FBcEI7QUFBc0QsSUFEdkU7QUFFRSxjQUFXLElBRmIsRUFFbUIsV0FBVzdDLGFBRjlCO0FBR0UsU0FBSyxVQUhQLEVBR2tCLFVBQVMsVUFIM0IsR0FQRDtBQVdDO0FBQUE7QUFBQTtBQUNDLDZEQUFjLE9BQU0sU0FBcEIsRUFBOEIsU0FBUyxJQUF2QztBQUNDLGFBQVM7QUFBQSxZQUFHRSxTQUFTVCxPQUFPaUIsTUFBUCxDQUFjbUMsUUFBZCxDQUFULENBQUg7QUFBQSxLQURWO0FBREQsR0FYRDtBQWVDO0FBQUE7QUFBQSxLQUFLLFdBQVUsVUFBZjtBQUNDLDJEQUFZLE9BQU0sWUFBbEI7QUFDRSxhQUFTO0FBQUEsWUFBRzNDLFNBQVNULE9BQU9tQyxlQUFoQixDQUFIO0FBQUEsS0FEWCxHQUREO0FBSUMsMkRBQVksT0FBTSxpQkFBbEI7QUFDQyxhQUFTO0FBQUEsWUFBRzFCLFNBQVNULE9BQU9pQyxrQkFBaEIsQ0FBSDtBQUFBLEtBRFY7QUFKRDtBQWZELEVBREQ7QUEwQkEsQ0FoQ0Q7O0FBa0NBLElBQU1xQixpQkFBZSxTQUFmQSxjQUFlLFFBQTRCO0FBQUEsS0FBMUJ6QixZQUEwQixTQUExQkEsWUFBMEI7QUFBQSxLQUFacEIsUUFBWSxTQUFaQSxRQUFZOztBQUNoRCxLQUFJbUIsZ0JBQUo7QUFDQSxRQUNDO0FBQUE7QUFBQSxJQUFLLFdBQVUsTUFBZixFQUFzQixLQUFJLFdBQTFCO0FBQ0MseURBQVcsS0FBSztBQUFBLFdBQUdBLFVBQVFtQixDQUFYO0FBQUEsSUFBaEI7QUFDQyxjQUFXLHNCQUFHO0FBQUNDLE1BQUVDLE9BQUYsSUFBV3BELEtBQVgsSUFBb0JZLFNBQVNULE9BQU8yQixlQUFQLENBQXVCQyxRQUFRc0IsUUFBUixFQUF2QixDQUFULENBQXBCO0FBQXlFLElBRHpGO0FBRUMsY0FBVyxJQUZaLEVBRWtCLFdBQVdyQixZQUY3QjtBQUdDLGFBQVMsdUJBSFYsR0FERDtBQU1DO0FBQUE7QUFBQTtBQUNDLDZEQUFjLE9BQU0sU0FBcEIsRUFBOEIsU0FBUyxJQUF2QztBQUNDLGFBQVM7QUFBQSxZQUFHcEIsU0FBU1QsT0FBTzJCLGVBQVAsQ0FBdUJDLFFBQVFzQixRQUFSLEVBQXZCLENBQVQsQ0FBSDtBQUFBLEtBRFY7QUFERCxHQU5EO0FBVUM7QUFBQTtBQUFBLEtBQUssV0FBVSxVQUFmO0FBQ0MsMkRBQVksT0FBTSxTQUFsQjtBQUNDLGFBQVM7QUFBQSxZQUFHekMsU0FBU1QsT0FBT2dDLFNBQWhCLENBQUg7QUFBQSxLQURWLEdBREQ7QUFJQywyREFBWSxPQUFNLFNBQWxCO0FBQ0MsYUFBUztBQUFBLFlBQUd2QixTQUFTVCxPQUFPbUMsZUFBaEIsQ0FBSDtBQUFBLEtBRFY7QUFKRDtBQVZELEVBREQ7QUFvQkEsQ0F0QkQ7O0FBd0JBLElBQU1vQixnQkFBYyxTQUFkQSxhQUFjLFFBQXlCO0FBQUEsS0FBdkJDLFVBQXVCLFNBQXZCQSxVQUF1QjtBQUFBLEtBQVovQyxRQUFZLFNBQVpBLFFBQVk7O0FBQzVDLEtBQUlnRCxvQkFBSjtBQUFBLEtBQWlCckQsaUJBQWpCO0FBQUEsS0FBMkJDLGtCQUEzQjtBQUNBLEtBQUkrQyxTQUFPLFNBQVBBLE1BQU87QUFBQSxTQUFJO0FBQ2RLLGdCQUFZQSxZQUFZUCxRQUFaLEVBREU7QUFFYjlDLGFBQVNBLFNBQVM4QyxRQUFULEVBRkk7QUFHYjdDLGNBQVVBLFVBQVU2QyxRQUFWO0FBSEcsR0FBSjtBQUFBLEVBQVg7QUFLQSxRQUNDO0FBQUE7QUFBQSxJQUFLLFdBQVUsTUFBZixFQUFzQixLQUFJLE9BQTFCO0FBQ0MseURBQVcsS0FBSztBQUFBLFdBQUdPLGNBQVlWLENBQWY7QUFBQSxJQUFoQixFQUFrQyxVQUFTLGNBQTNDO0FBQ0MsY0FBVyxJQURaO0FBRUMsY0FBVyxzQkFBRztBQUFDQyxNQUFFQyxPQUFGLElBQVdwRCxLQUFYLElBQW9CWSxTQUFTVCxPQUFPMEQsY0FBUCxDQUFzQk4sUUFBdEIsQ0FBVCxDQUFwQjtBQUE4RCxJQUY5RTtBQUdDLGNBQVdJLFVBSFosR0FERDtBQU1DLHlEQUFXLEtBQUs7QUFBQSxXQUFHcEQsV0FBUzJDLENBQVo7QUFBQSxJQUFoQjtBQUNDLGNBQVcsSUFEWjtBQUVDLGNBQVcsc0JBQUc7QUFBQ0MsTUFBRUMsT0FBRixJQUFXcEQsS0FBWCxJQUFvQlksU0FBU1QsT0FBTzBELGNBQVAsQ0FBc0JOLFFBQXRCLENBQVQsQ0FBcEI7QUFBOEQsSUFGOUU7QUFHQyxTQUFLLFVBSE4sRUFHaUIsVUFBUyxVQUgxQixHQU5EO0FBV0MseURBQVcsS0FBSztBQUFBLFdBQUcvQyxZQUFVMEMsQ0FBYjtBQUFBLElBQWhCO0FBQ0MsY0FBVyxJQURaO0FBRUMsY0FBVyxzQkFBRztBQUFDQyxNQUFFQyxPQUFGLElBQVdwRCxLQUFYLElBQW9CWSxTQUFTVCxPQUFPMEQsY0FBUCxDQUFzQk4sUUFBdEIsQ0FBVCxDQUFwQjtBQUE4RCxJQUY5RTtBQUdDLFNBQUssVUFITixFQUdpQixVQUFTLGdCQUgxQixHQVhEO0FBZ0JDO0FBQUE7QUFBQTtBQUNDLDZEQUFjLE9BQU0sZ0JBQXBCLEVBQXFDLFNBQVMsSUFBOUM7QUFDQyxhQUFTO0FBQUEsWUFBRzNDLFNBQVNULE9BQU8wRCxjQUFQLENBQXNCTixRQUF0QixDQUFULENBQUg7QUFBQSxLQURWO0FBREQsR0FoQkQ7QUFvQkM7QUFBQTtBQUFBLEtBQUssV0FBVSxVQUFmO0FBQ0MsMkRBQVksT0FBTSxTQUFsQjtBQUNDLGFBQVM7QUFBQSxZQUFHM0MsU0FBU1QsT0FBT2dDLFNBQWhCLENBQUg7QUFBQSxLQURWLEdBREQ7QUFJQywyREFBWSxPQUFNLGlCQUFsQjtBQUNDLGFBQVM7QUFBQSxZQUFHdkIsU0FBU1QsT0FBT2lDLGtCQUFoQixDQUFIO0FBQUEsS0FEVjtBQUpEO0FBcEJELEVBREQ7QUE4QkEsQ0FyQ0Q7O0lBdUNNMEIsVTs7Ozs7Ozs7Ozs7Ozs7aU1BQ0x0QixLLEdBQU0sRUFBQ2hCLE9BQU0sSUFBUCxFQUFZdUMsTUFBSyxJQUFqQixFOzs7Ozt5QkFFRztBQUFBOztBQUNGLE9BQUlDLElBQUUsRUFBTjtBQUFBLE9BQVVDLGVBQVY7QUFDQSxRQUFLQyxFQUFMLEdBQVFDLFlBQVlGLFNBQU8sa0JBQUk7QUFDM0IsUUFBR0QsS0FBRyxDQUFOLEVBQVE7QUFDSkksbUJBQWMsT0FBS0YsRUFBbkI7QUFDQSxZQUFLRyxRQUFMLENBQWMsRUFBQ04sTUFBTSxDQUFQLEVBQWQ7QUFDSCxLQUhELE1BSUksT0FBS00sUUFBTCxDQUFjLEVBQUNOLE1BQUtDLEdBQU4sRUFBZDtBQUNQLElBTk8sRUFNTixJQU5NLENBQVI7O0FBUUFDO0FBQ0g7Ozt5Q0FFcUI7QUFDbEIsT0FBRyxLQUFLQyxFQUFSLEVBQ0lFLGNBQWMsS0FBS0YsRUFBbkI7QUFDUDs7OzJCQUVPO0FBQUE7O0FBQUEsZ0JBQ2dCLEtBQUsxQixLQURyQjtBQUFBLE9BQ0doQixLQURILFVBQ0dBLEtBREg7QUFBQSxPQUNVdUMsSUFEVixVQUNVQSxJQURWO0FBQUEsT0FFSG5ELFFBRkcsR0FFTyxLQUFLa0MsS0FGWixDQUVIbEMsUUFGRzs7QUFHVixPQUFJMEQsZUFBSjtBQUFBLE9BQVlDLGlCQUFaO0FBQ0EsT0FBRy9DLEtBQUgsRUFBUztBQUNDLFFBQUd1QyxJQUFILEVBQ0lPLFNBQVEsd0RBQVksT0FBT1AsSUFBbkIsRUFBeUIsVUFBVSxJQUFuQyxHQUFSLENBREosS0FHSU8sU0FBUSx3REFBWSxPQUFPUCxTQUFPLENBQVAsR0FBVyxRQUFYLEdBQXNCLE1BQXpDO0FBQ2pCLGNBQVMsb0JBQUc7QUFDWCxhQUFLQSxJQUFMO0FBQ0FuRCxlQUFTVCxPQUFPbUIsb0JBQVAsQ0FBNEJpRCxTQUFTbEIsUUFBVCxFQUE1QixDQUFUO0FBQ0EsTUFKZ0IsR0FBUjtBQUtQOztBQUVELFVBQ0k7QUFBQTtBQUFBLE1BQUssV0FBVSxZQUFmO0FBQ0k7QUFDWCxVQUFLO0FBQUEsYUFBR2tCLFdBQVNyQixDQUFaO0FBQUEsTUFETTtBQUVYLGVBQVMsNEJBRkU7QUFHWCxlQUFVLENBQUMsQ0FBQ2EsSUFIRDtBQUlJLGVBQVU7QUFBQSxVQUFVUyxLQUFWLFVBQUVDLE1BQUYsQ0FBVUQsS0FBVjtBQUFBLGFBQW9CLE9BQUtILFFBQUwsQ0FBYyxFQUFDN0MsT0FBTyxPQUFLa0QsT0FBTCxDQUFhRixLQUFiLElBQXFCQSxLQUFyQixHQUE2QixJQUFyQyxFQUFkLENBQXBCO0FBQUEsTUFKZCxHQURKO0FBTUtGO0FBTkwsSUFESjtBQVVIOzs7MEJBRUlLLEMsRUFBRTtBQUNILFVBQVEsc0JBQUQsQ0FBd0JDLElBQXhCLENBQTZCRCxDQUE3QjtBQUFQO0FBQ0g7Ozs2QkFFTTtBQUNULFVBQU8sS0FBS25DLEtBQUwsQ0FBV2hCLEtBQWxCO0FBQ0E7Ozs7OztrQkFHYWlCLE9BQU9DLE1BQVAsQ0FBYyx5QkFBUTtBQUFBLFFBQU9GLE1BQU1xQyxFQUFiO0FBQUEsQ0FBUixFQUF5QmhDLE9BQXpCLENBQWQsRUFBZ0QsRUFBQzVDLGNBQUQsRUFBU0UsY0FBVCxFQUFpQm9DLGdCQUFqQixFQUFoRCxDIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtUZXh0RmllbGQsRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBVc2VyIGZyb20gJy4vZGIvdXNlcidcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuY29uc3QgRU5URVI9MTNcbmV4cG9ydCBjb25zdCBET01BSU49XCJ1aS5hY2NvdW50XCJcbmNvbnN0IElOSVRfU1RBVEU9e31cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRTSUdOVVA6dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUscGFzc3dvcmQscGFzc3dvcmQyfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IscGFzc3dvcmQyRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYocGFzc3dvcmQhPXBhc3N3b3JkMilcblx0XHRcdHBhc3N3b3JkMkVycm9yPVwicGFzc3dvcmQgZG9lc24ndCBtYXRjaFwiXG5cblx0XHRpZih1c2VybmFtZUVycm9yIHx8IHBhc3N3b3JkRXJyb3J8fHBhc3N3b3JkMkVycm9yKXtcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOVVBfVUlgLCBwYXlsb2FkOntwYXNzd29yZEVycm9yLCB1c2VybmFtZUVycm9yLHBhc3N3b3JkMkVycm9yfX0pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXHRcdH1cblxuXHRcdHJldHVybiBVc2VyLnNpZ251cCh7dXNlcm5hbWUscGFzc3dvcmR9KVxuXHRcdFx0LmNhdGNoKCh7bWVzc2FnZX0pPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vU0lHTlVQX1VJYCwgcGF5bG9hZDp7dXNlcm5hbWVFcnJvcjptZXNzYWdlfX0pKVxuXHR9XG5cdCxTSUdOSU46dXNlcj0+ZGlzcGF0Y2g9Pntcblx0XHRjb25zdCB7dXNlcm5hbWUsIHBhc3N3b3JkfT11c2VyXG5cdFx0bGV0IHVzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3Jcblx0XHRpZighdXNlcm5hbWUpXG5cdFx0XHR1c2VybmFtZUVycm9yPVwidXNlciBuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZighcGFzc3dvcmQpXG5cdFx0XHRwYXNzd29yZEVycm9yPVwicGFzc3dvcmQgaXMgcmVxdWlyZWRcIlxuXG5cdFx0aWYodXNlcm5hbWVFcnJvciB8fCBwYXNzd29yZEVycm9yKXtcblx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgLHBheWxvYWQ6e3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3J9fSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIFVzZXIuc2lnbmluKHt1c2VybmFtZSxwYXNzd29yZH0pXG5cdFx0XHQuY2F0Y2goKHttZXNzYWdlfSk9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgLHBheWxvYWQ6e3VzZXJuYW1lRXJyb3I6bWVzc2FnZX19KSlcblx0fVxuXHQsUEhPTkVfVkVSSUZZX1JFUVVFU1Q6cGhvbmU9Pntcblx0XHRVc2VyLnJlcXVlc3RWZXJpZmljYXRpb24ocGhvbmUpXG5cdFx0cmV0dXJuIHt0eXBlOmBAQCR7RE9NQUlOfS9QSE9ORV9WRVJJRllfUkVRVUVTVGB9XG5cdH1cblx0LFBIT05FX1ZFUklGWToocGhvbmUsY29kZSk9PmRpc3BhdGNoPT5Vc2VyLnZlcmlmeVBob25lKHBob25lLGNvZGUpLnRoZW4oYT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05VUF9VSSkpXG5cblx0LEZPUkdFVF9QQVNTV09SRDogY29udGFjdD0+ZGlzcGF0Y2g9Pntcblx0XHRpZighY29udGFjdCl7XG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vRk9SR0VUX1BBU1NXT1JEX1VJYCxjb250YWN0RXJyb3I6XCJhIHBob25lIG51bWJlciBvciBlbWFpbCBtdXN0IGJlIGdpdmVuIHRvIHJlc2V0IHBhc3N3b3JkXCJ9KVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHR9XG5cblx0XHRyZXR1cm4gVXNlci5yZXF1ZXN0UGFzc3dvcmRSZXNldChjb250YWN0KVxuXHRcdFx0LnRoZW4oYT0+YWxlcnQoYHJlc2V0IGVtYWlsL3NtcyBzZW50IHRvICR7Y29udGFjdH0sIHBsZWFzZSBmb2xsb3cgdGhlIGluc3RydWN0aW9uIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmRgKSlcblx0fVxuXG5cdCxTSUdOVVBfVUk6e3R5cGU6YEBAe0RPTUFJTn0vU0lHTlVQX1VJYH1cblx0LFNJR05JTl9VSTp7dHlwZTpgQEAke0RPTUFJTn0vU0lHTklOX1VJYH1cblx0LEZPUkdFVF9QQVNTV09SRF9VSTp7dHlwZTpgQEAke0RPTUFJTn0vRk9SR0VUX1BBU1NXT1JEX1VJYH1cblx0LFJFU0VUX1BBU1NXT1JEX1VJOnt0eXBlOmBAQCR7RE9NQUlOfS9SRVNFVF9QQVNTV09SRF9VSWB9XG5cdCxQSE9ORV9WRVJJRllfVUk6KHt0eXBlOmBAQCR7RE9NQUlOfS9QSE9ORV9WRVJJRllfVUlgfSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuXHRbRE9NQUlOXTooc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vU0lHTlVQX1VJYDpcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9TSUdOSU5fVUlgOlxuXHRcdGNhc2UgYEBAJHtET01BSU59L0ZPUkdFVF9QQVNTV09SRF9VSWA6XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vUkVTRVRfUEFTU1dPUkRfVUlgOlxuXHRcdGNhc2UgYEBAJHtET01BSU59L1BIT05FX1ZFUklGWV9VSWA6XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7dHlwZTp0eXBlLnNwbGl0KFwiL1wiKS5wb3AoKX0scGF5bG9hZClcblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuY2xhc3MgQWNjb3VudCBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0bGV0IHt0eXBlLHVzZXIsLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0aWYoIXR5cGUpe1xuXHRcdFx0aWYodXNlcilcblx0XHRcdFx0dHlwZT0nU0lHTklOX1VJJ1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0eXBlPSdQSE9ORV9WRVJJRllfVUknXG5cdFx0fVxuXG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ1NJR05VUF9VSSc6XG5cdFx0XHRyZXR1cm4gKDxTaWdudXAgey4uLm90aGVyc30gLz4pXG5cdFx0Y2FzZSAnU0lHTklOX1VJJzpcblx0XHRcdHJldHVybiAoPFNpZ25pbiB7Li4ub3RoZXJzfSB1c2VyPXt1c2VyfS8+KVxuXHRcdGNhc2UgJ1BIT05FX1ZFUklGWV9VSSc6XG5cdFx0XHRyZXR1cm4gKDxQaG9uZVZlcmlmaWNhdGlvbiB7Li4ub3RoZXJzfS8+KVxuXHRcdGNhc2UgJ0ZPUkdFVF9QQVNTV09SRF9VSSc6XG5cdFx0XHRyZXR1cm4gKDxGb3JnZXRQYXNzd29yZCB7Li4ub3RoZXJzfS8+KVxuXHRcdGNhc2UgJ1JFU0VUX1BBU1NXT1JEX1VJJzpcblx0XHRcdHJldHVybiAoPFJlc2V0UGFzc3dvcmQgey4uLm90aGVyc30vPilcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgUGhvbmVWZXJpZmljYXRpb249KHtwaG9uZVZlcmlmaWVkRXJyb3IsZGlzcGF0Y2h9KT0+e1xuXHRsZXQgY29kZSxwaG9uZVxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInBob25ldmVyaWZ5XCI+XG5cdFx0XHQ8U01TUmVxdWVzdCByZWY9e2E9PnBob25lPWF9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPlxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PmNvZGU9YX0gaGludFRleHQ9XCJ2ZXJpZmljYXRpb24gY29kZSB5b3UganVzdCByZWNlaXZlZFwiXG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUEhPTkVfVkVSSUZZKHBob25lLmdldFZhbHVlKCksY29kZS5nZXRWYWx1ZSgpKSl9fVxuXHRcdFx0XHRlcnJvclRleHQ9e3Bob25lVmVyaWZpZWRFcnJvcn0vPlxuXHRcdFx0PGNlbnRlcj5cblx0XHRcdFx0PFJhaXNlZEJ1dHRvbiBsYWJlbD1cInZlcmlmeVwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWShwaG9uZS5nZXRWYWx1ZSgpLGNvZGUuZ2V0VmFsdWUoKSkpfS8+XG5cdFx0XHQ8L2NlbnRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQpXG59XG5cbmNvbnN0IFNpZ251cD0oe3VzZXJuYW1lRXJyb3IsIHBhc3N3b3JkRXJyb3IsIHBhc3N3b3JkMkVycm9yLCBkaXNwYXRjaH0pPT57XG5cdGxldCB1c2VybmFtZSwgcGFzc3dvcmQsIHBhc3N3b3JkMlxuXHRsZXQgdmFsdWVzPWE9Pih7XG5cdFx0dXNlcm5hbWU6dXNlcm5hbWUuZ2V0VmFsdWUoKVxuXHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0LHBhc3N3b3JkMjpwYXNzd29yZDIuZ2V0VmFsdWUoKVxuXHR9KVxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ251cFwiPlxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnVzZXJuYW1lPWF9IGhpbnRUZXh0PVwibG9naW4gbmFtZVwiXG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9fVxuXHRcdFx0XHRlcnJvclRleHQ9e3VzZXJuYW1lRXJyb3J9Lz5cblxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkPWF9XG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9fVxuXHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIgZXJyb3JUZXh0PXtwYXNzd29yZEVycm9yfS8+XG5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5wYXNzd29yZDI9YX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOVVAodmFsdWVzKCkpKX19XG5cdFx0XHRcdHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIiBlcnJvclRleHQ9e3Bhc3N3b3JkMkVycm9yfS8+XG5cblx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTlVQKHZhbHVlcygpKSl9Lz5cblx0XHRcdDwvY2VudGVyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0KVxufVxuXG5jb25zdCBTaWduaW49KHt1c2VyLCB1c2VybmFtZUVycm9yLCBwYXNzd29yZEVycm9yLGRpc3BhdGNofSk9Pntcblx0bGV0IHVzZXJuYW1lLCBwYXNzd29yZFxuXHRsZXQgdmFsdWVzPWE9Pih7XG5cdFx0dXNlcm5hbWU6dXNlcm5hbWUuZ2V0VmFsdWUoKVxuXHRcdCxwYXNzd29yZDpwYXNzd29yZC5nZXRWYWx1ZSgpXG5cdH0pXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbmluXCI+XG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+dXNlcm5hbWU9YX1cblx0XHRcdFx0aGludFRleHQ9XCJsb2dpbiBuYW1lIG9yIHBob25lIG51bWJlclwiXG5cdFx0XHRcdGRlZmF1bHRWYWx1ZT17dXNlciAmJiB1c2VyLnVzZXJuYW1lfVxuXHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOSU4odmFsdWVzKCkpKX19XG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0ZXJyb3JUZXh0PXt1c2VybmFtZUVycm9yfS8+XG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5TSUdOSU4odmFsdWVzKCkpKX19XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfSBlcnJvclRleHQ9e3Bhc3N3b3JkRXJyb3J9XG5cdFx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblx0XHRcdDxjZW50ZXI+XG5cdFx0XHRcdDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIGluXCIgcHJpbWFyeT17dHJ1ZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOKHZhbHVlcygpKSl9Lz5cblx0XHRcdDwvY2VudGVyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuXHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cIm5vIGFjY291bnRcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9VSSl9Lz5cblxuXHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRF9VSSl9Lz5cblxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuY29uc3QgRm9yZ2V0UGFzc3dvcmQ9KHtjb250YWN0RXJyb3IsIGRpc3BhdGNofSk9Pntcblx0bGV0IGNvbnRhY3Rcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJmb3JnZXRQd2RcIj5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5jb250YWN0PWF9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRChjb250YWN0LmdldFZhbHVlKCkpKX19XG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0gZXJyb3JUZXh0PXtjb250YWN0RXJyb3J9XG5cdFx0XHRcdGhpbnRUZXh0PVwicGhvbmUgbnVtYmVyIG9yIGVtYWlsXCIvPlxuXG5cdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2VuZCBtZVwiIHByaW1hcnk9e3RydWV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkZPUkdFVF9QQVNTV09SRChjb250YWN0LmdldFZhbHVlKCkpKX0vPlxuXHRcdFx0PC9jZW50ZXI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG5cdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNJR05JTl9VSSl9Lz5cblxuXHRcdFx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5QSE9ORV9WRVJJRllfVUkpfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQpXG59XG5cbmNvbnN0IFJlc2V0UGFzc3dvcmQ9KHtyZXNldEVycm9yLGRpc3BhdGNofSk9Pntcblx0bGV0IG9sZFBhc3N3b3JkLCBwYXNzd29yZCwgcGFzc3dvcmQyXG5cdGxldCB2YWx1ZXM9YT0+KHtcblx0XHRvbGRQYXNzd29yZDpvbGRQYXNzd29yZC5nZXRWYWx1ZSgpXG5cdFx0LHBhc3N3b3JkOnBhc3N3b3JkLmdldFZhbHVlKClcblx0XHQscGFzc3dvcmQyOnBhc3N3b3JkMi5nZXRWYWx1ZSgpXG5cdH0pXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicmVzZXRcIj5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5vbGRQYXNzd29yZD1hfSBoaW50VGV4dD1cIm9sZCBwYXNzd29yZFwiXG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiBkaXNwYXRjaChBQ1RJT04uUkVTRVRfUEFTU1dPUkQodmFsdWVzKCkpKX19XG5cdFx0XHRcdGVycm9yVGV4dD17cmVzZXRFcnJvcn0vPlxuXG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cGFzc3dvcmQ9YX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIGRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfX1cblx0XHRcdFx0dHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnBhc3N3b3JkMj1hfVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgZGlzcGF0Y2goQUNUSU9OLlJFU0VUX1BBU1NXT1JEKHZhbHVlcygpKSl9fVxuXHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkIGFnYWluXCIvPlxuXG5cdFx0XHQ8Y2VudGVyPlxuXHRcdFx0XHQ8UmFpc2VkQnV0dG9uIGxhYmVsPVwicmVzZXQgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRVNFVF9QQVNTV09SRCh2YWx1ZXMoKSkpfS8+XG5cdFx0XHQ8L2NlbnRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cblx0XHRcdFx0PEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU0lHTklOX1VJKX0vPlxuXG5cdFx0XHRcdDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRk9SR0VUX1BBU1NXT1JEX1VJKX0vPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0KVxufVxuXG5jbGFzcyBTTVNSZXF1ZXN0IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17cGhvbmU6bnVsbCx0aWNrOm51bGx9XG5cbiAgICB0aWNrKCl7XG4gICAgICAgIGxldCBpPTYwLCBkb1RpY2s7XG4gICAgICAgIHRoaXMuX3Q9c2V0SW50ZXJ2YWwoZG9UaWNrPSgpPT57XG4gICAgICAgICAgICBpZihpPT0wKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazogMH0pXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6aS0tfSlcbiAgICAgICAgfSwxMDAwKTtcblxuICAgICAgICBkb1RpY2soKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGlmKHRoaXMuX3QpXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtwaG9uZSwgdGlja309dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGxldCBidXR0b24sIHJlZlBob25lXG5cdFx0aWYocGhvbmUpe1xuICAgICAgICAgICAgaWYodGljaylcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aWNrfSBkaXNhYmxlZD17dHJ1ZX0vPilcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aWNrPT09MCA/IFwicmVzZW5kXCIgOiBcInNlbmRcIn1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudGljaygpXG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlBIT05FX1ZFUklGWV9SRVFVRVNUKHJlZlBob25lLmdldFZhbHVlKCkpKVxuXHRcdFx0XHRcdFx0XHR9fS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic21zcmVxdWVzdFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcblx0XHRcdFx0XHRyZWY9e2E9PnJlZlBob25lPWF9XG5cdFx0XHRcdFx0aGludFRleHQ9XCJwaG9uZSBudW1iZXIgKGRlZmF1bHQgKzg2KVwiXG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyEhdGlja31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmU6IHRoaXMuaXNQaG9uZSh2YWx1ZSk/IHZhbHVlIDogbnVsbH0pfS8+XG4gICAgICAgICAgICAgICAge2J1dHRvbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG5cdGlzUGhvbmUodil7XG4gICAgICAgIHJldHVybiAoL14oXFwrXFxkezJ9KT9cXGR7MTF9JC9nKS50ZXN0KHYpXG4gICAgfVxuXG5cdGdldFZhbHVlKCl7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUucGhvbmVcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKGNvbm5lY3Qoc3RhdGU9PnN0YXRlLnVpKShBY2NvdW50KSx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxuIl19