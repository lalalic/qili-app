"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.App = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _graphql, _graphql2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _recompose = require("recompose");

var _recompose2 = require("../tools/recompose");

var _reactRedux = require("react-redux");

var _materialUi = require("material-ui");

var _fileUpload = require("material-ui/svg-icons/file/file-upload");

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _fileDownload = require("material-ui/svg-icons/file/file-download");

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _save = require("material-ui/svg-icons/content/save");

var _save2 = _interopRequireDefault(_save);

var _delete = require("material-ui/svg-icons/action/delete");

var _delete2 = _interopRequireDefault(_delete);

var _modeComment = require("material-ui/svg-icons/editor/mode-comment");

var _modeComment2 = _interopRequireDefault(_modeComment);

var _commandBar = require("../components/command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _file = require("../components/file");

var _file2 = _interopRequireDefault(_file);

var _main = require("../main");

var Admin = _interopRequireWildcard(_main);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTER = 13;

var App = exports.App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = { nameError: null, unameError: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(App, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    id = _props.id,
			    name = _props.name,
			    uname = _props.uname,
			    apiKey = _props.apiKey,
			    isDev = _props.isDev,
			    update = _props.update,
			    remove = _props.remove,
			    toComment = _props.toComment,
			    removable = _props.removable;
			var _state = this.state,
			    nameError = _state.nameError,
			    unameError = _state.unameError;

			var commandBar = void 0;
			if (removable) commandBar = _react2.default.createElement(_commandBar2.default, { className: "footbar", primary: "Upload",
				items: [{ action: "Back" }, { action: "Remove",
					icon: _react2.default.createElement(_delete2.default, null),
					onSelect: remove
				}, {
					action: "Comment",
					icon: _react2.default.createElement(_modeComment2.default, null),
					onSelect: toComment
				}]
			});else commandBar = _react2.default.createElement(_commandBar2.default, { className: "footbar", items: [{ action: "Back" }] });

			var changeName = function changeName(value) {
				return value != name && update({ name: value }).then(function (a) {
					return _this2.setState({ nameError: null });
				}, function (error) {
					return _this2.setState({ nameError: error });
				});
			};

			var changeUName = function changeUName(value) {
				return value != uname && update({ uname: value }).then(function (a) {
					return _this2.setState({ unameError: null });
				}, function (error) {
					return _this2.setState({ unameError: error });
				});
			};

			return _react2.default.createElement(
				"div",
				{ className: "form" },
				_react2.default.createElement(_materialUi.TextField, {
					floatingLabelText: "application name",
					fullWidth: true,
					disabled: !removable,
					defaultValue: name,
					errorText: nameError,
					onKeyDown: function onKeyDown(_ref2) {
						var value = _ref2.target.value,
						    keyCode = _ref2.keyCode;
						return keyCode == ENTER && changeName(value.trim());
					},
					onBlur: function onBlur(_ref3) {
						var value = _ref3.target.value;
						return changeName(value.trim());
					} }),
				_react2.default.createElement(_materialUi.TextField, {
					floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
					fullWidth: true,
					disabled: !removable,
					defaultValue: uname,
					errorText: unameError,
					onKeyDown: function onKeyDown(_ref4) {
						var value = _ref4.target.value,
						    keyCode = _ref4.keyCode;
						return keyCode == ENTER && changeUName(value.trim());
					},
					onBlur: function onBlur(_ref5) {
						var value = _ref5.target.value;
						return changeUName(value.trim());
					} }),
				_react2.default.createElement(_materialUi.TextField, {
					floatingLabelText: "API key: value of http header 'x-application-id'",
					disabled: true,
					fullWidth: true,
					value: apiKey || "" }),
				_react2.default.createElement(_materialUi.TextField, {
					floatingLabelText: "wechat url: use it to accept message from wechat",
					disabled: true,
					fullWidth: true,
					value: "http://qili2.com/1/" + apiKey + "/wechat" }),
				_react2.default.createElement(
					"div",
					{ style: { margin: 50 } },
					_react2.default.createElement(_materialUi.Toggle, {
						label: "It's in development",
						toggled: isDev,
						onToggle: function onToggle(e, isDev) {
							return update({ isDev: isDev });
						}
					})
				),
				commandBar
			);
		}
	}]);

	return App;
}(_react.Component);

var Creator = exports.Creator = function (_Component2) {
	_inherits(Creator, _Component2);

	function Creator() {
		var _ref6;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, Creator);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref6 = Creator.__proto__ || Object.getPrototypeOf(Creator)).call.apply(_ref6, [this].concat(args))), _this3), _this3.state = { error: null }, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(Creator, [{
		key: "render",
		value: function render() {
			var _this4 = this;

			var _props2 = this.props,
			    toApp = _props2.toApp,
			    create = _props2.create;
			var error = this.state.error;

			var refName = void 0,
			    refUname = void 0;
			return _react2.default.createElement(
				"div",
				{ className: "form" },
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return refName = a;
					},
					floatingLabelText: "application name",
					errorText: error,
					fullWidth: true }),
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return refUname = a;
					},
					floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
					fullWidth: true }),
				_react2.default.createElement(_commandBar2.default, { className: "footbar",
					items: [{ action: "Back" }, { action: "Save", label: "保存", icon: _react2.default.createElement(_save2.default, null),
						onSelect: function onSelect(a) {
							return create({ name: refName.getValue(), uname: refUname.getValue() }).then(function (_ref7) {
								var id = _ref7.id;
								return toApp(id);
							}, function (error) {
								return _this4.setState({ error: error });
							});
						}
					}]
				})
			);
		}
	}]);

	return Creator;
}(_react.Component);

exports.default = (0, _recompose.compose)((0, _recompose.setStatic)("Creator", (0, _recompose.compose)((0, _recompose2.withMutation)({
	name: "create",
	promise: true,
	mutation: function mutation() {
		return require("./__generated__/app_create_Mutation.graphql");
	}
}))(Creator)), (0, _recompose.getContext)({
	router: _react.PropTypes.object,
	showMessage: _react.PropTypes.func
}), (0, _recompose2.withFragment)({
	data: function data() {
		return require("./__generated__/app.graphql");
	}
}), (0, _recompose.withProps)(function (_ref8) {
	var data = _ref8.data;
	return _extends({}, data);
}), (0, _recompose2.withMutation)(function (_ref9) {
	var id = _ref9.id;
	return {
		promise: true,
		name: "update",
		patch4: id,
		variables: { id: id },
		mutation: _graphql || (_graphql = function _graphql() {
			return require("./__generated__/app_update_Mutation.graphql");
		})
	};
}), (0, _recompose2.withMutation)(function (_ref10) {
	var id = _ref10.id;
	return {
		promise: true,
		name: "doRemove",
		variables: { id: id },
		mutation: _graphql2 || (_graphql2 = function _graphql2() {
			return require("./__generated__/app_remove_Mutation.graphql");
		})
	};
}), (0, _reactRedux.connect)(function (state) {
	return {
		removable: state.current != "qiliAdmin"
	};
}, function (dispatch, _ref11) {
	var doRemove = _ref11.doRemove,
	    doUpload = _ref11.doUpload,
	    name = _ref11.name,
	    router = _ref11.router,
	    showMessage = _ref11.showMessage,
	    switchApp = _ref11.switchApp,
	    id = _ref11.params.id;
	return {
		syncCurrent: function syncCurrent(newAppID) {
			if (newAppID != id) dispatch(Admin.ACTION.CURRENT_APP(newAppID));
		},
		remove: function remove() {
			var removing = prompt("Please make sure you know what you are doing by giving this app name").trim();
			if (removing && removing == name) {
				doRemove();
				router.replace("/");
				switchApp();
			} else {
				showMessage({
					message: "name is not correct, cancel removing",
					level: "warning"
				});
			}
		}
	};
}))(App);