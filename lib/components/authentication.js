"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Authentication = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _materialUi = require("material-ui");

var _isValidEmail = require("is-valid-email");

var _isValidEmail2 = _interopRequireDefault(_isValidEmail);

var _recompose = require("recompose");

var _recompose2 = require("../tools/recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTER = 13;
var isPhone = function isPhone(v) {
	return (/^(\+\d{2})?\d{11}$/g.test(v)
	);
};

var Authentication = exports.Authentication = function (_Component) {
	_inherits(Authentication, _Component);

	function Authentication() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Authentication);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Authentication.__proto__ || Object.getPrototypeOf(Authentication)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			tick: null,
			error: null,
			exists: true,
			errName: null
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Authentication, [{
		key: "tick",
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
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			if (this._t) clearInterval(this._t);
		}
	}, {
		key: "requestCode",
		value: function requestCode() {
			var _this3 = this;

			var _props = this.props,
			    contact = _props.contact,
			    setToken = _props.setToken,
			    requestToken = _props.requestToken;

			if (contact) {
				this.setState({ error: null, errName: null, exists: true });
				setToken("");
				requestToken({ contact: contact }).then(function (exists) {
					_this3.tick();
					_this3.setState({ exists: exists });
				}).catch(function (e) {
					return _this3.setState({ error: e.message });
				});
			}
		}
	}, {
		key: "login",
		value: function login() {
			var _this4 = this;

			var _props2 = this.props,
			    contact = _props2.contact,
			    token = _props2.token,
			    name = _props2.name,
			    success = _props2.success,
			    onSuccess = _props2.onSuccess,
			    login = _props2.login;
			var exists = this.state.exists;

			if (contact && (name || exists) && token) {
				this.setState({ error: undefined });
				login({ contact: contact, token: token, name: name }).then(function (user) {
					return (onSuccess || success)(user);
				}).catch(function (e) {
					return _this4.setState({ error: e.message });
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this5 = this;

			var _props3 = this.props,
			    contact = _props3.contact,
			    setContact = _props3.setContact,
			    token = _props3.token,
			    setToken = _props3.setToken,
			    name = _props3.name,
			    setName = _props3.setName,
			    success = _props3.success,
			    onSuccess = _props3.onSuccess;
			var login = this.props.login;
			var _state = this.state,
			    tick = _state.tick,
			    error = _state.error,
			    errName = _state.errName,
			    exists = _state.exists;

			var btnRequest = void 0,
			    btnLogin = void 0,
			    inputName = void 0;
			if (contact) {
				if (tick) {
					btnRequest = _react2.default.createElement(_materialUi.FlatButton, { label: tick, disabled: true });
				} else {
					btnRequest = _react2.default.createElement(_materialUi.FlatButton, { label: tick === 0 ? "重新申请" : "申请验证码",
						onClick: this.requestCode.bind(this) });
				}

				if (!exists) {
					inputName = _react2.default.createElement(_materialUi.TextField, {
						fullWidth: true,
						floatingLabelText: "\u65B0\u7528\u6237\u540D\u79F0/\u6635\u79F0",
						errorText: errName,
						onChange: function onChange(_ref2) {
							var value = _ref2.target.value;

							setName(value);
						}
					});
				}

				if ((name || exists) && token) {
					btnLogin = _react2.default.createElement(_materialUi.FlatButton, {
						label: "\u767B\u5F55",
						primary: true,
						onClick: this.login.bind(this)
					});
				}
			}

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { display: "table", tableLayout: "fixed", width: "100%" } },
					_react2.default.createElement(
						"div",
						{ style: { display: "table-cell" } },
						_react2.default.createElement(_materialUi.TextField, {
							fullWidth: true,
							floatingLabelText: "\u624B\u673A\u53F7/Email",
							disabled: !!tick,
							errorText: contact && !token ? error : null,
							onChange: function onChange(_ref3) {
								var value = _ref3.target.value;
								return setContact(_this5.validate(value));
							},
							onKeyDown: function onKeyDown(e) {
								return e.keyCode == ENTER && _this5.requestCode();
							}
						})
					),
					_react2.default.createElement(
						"div",
						{ style: { display: "table-cell", textAlign: "right", width: !!btnRequest ? "8em" : 0 } },
						btnRequest
					)
				),
				_react2.default.createElement(_materialUi.TextField, {
					value: token,
					fullWidth: true,
					floatingLabelText: "\u9A8C\u8BC1\u7801",
					errorText: contact && token ? error : null,
					onChange: function onChange(_ref4) {
						var value = _ref4.target.value;
						return setToken(value);
					},
					onKeyDown: function onKeyDown(e) {
						return e.keyCode == ENTER && _this5.login();
					}
				}),
				inputName,
				_react2.default.createElement(
					"center",
					null,
					btnLogin
				)
			);
		}
	}, {
		key: "validate",
		value: function validate(v) {
			return (0, _isValidEmail2.default)(v) || isPhone(v) ? v : undefined;
		}
	}]);

	return Authentication;
}(_react.Component);

Authentication.propTypes = {
	onSuccess: _propTypes2.default.func
};
exports.default = (0, _recompose.compose)((0, _recompose.withState)("done", "success"), (0, _recompose.branch)(function (_ref5) {
	var done = _ref5.done;
	return done;
}, (0, _recompose.renderComponent)(function () {
	return _react2.default.createElement(
		"span",
		null,
		"\u6210\u529F"
	);
})), (0, _recompose.withState)("contact", "setContact"), (0, _recompose.withState)("token", "setToken", ""), (0, _recompose.withState)("name", "setName"), (0, _recompose2.withMutation)({
	name: "requestToken",
	promise: true,
	mutation: function mutation() {
		return require("./__generated__/authentication_requestToken_Mutation.graphql");
	}
}), (0, _recompose2.withMutation)({
	name: "login",
	promise: true,
	mutation: function mutation() {
		return require("./__generated__/authentication_login_Mutation.graphql");
	}
}))(Authentication);