"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Cloud = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _graphql;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _recompose = require("recompose");

var _recompose2 = require("../tools/recompose");

var _reactCodemirror = require("react-codemirror");

var _reactCodemirror2 = _interopRequireDefault(_reactCodemirror);

var _commandBar = require("../components/command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _file = require("../components/file");

var _file2 = _interopRequireDefault(_file);

var _Tabs = require("material-ui/Tabs");

var _fileUpload = require("material-ui/svg-icons/file/file-upload");

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _save = require("material-ui/svg-icons/content/save");

var _save2 = _interopRequireDefault(_save);

var _schema = require("./schema");

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("codemirror/mode/javascript/javascript");

var Cloud = exports.Cloud = function (_Component) {
	_inherits(Cloud, _Component);

	function Cloud() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Cloud);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cloud.__proto__ || Object.getPrototypeOf(Cloud)).call.apply(_ref, [this].concat(args))), _this), _this.state = { cloudCode: _this.props.app.cloudCode }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Cloud, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    mutate = _props.mutate,
			    height = _props.height,
			    app = _props.app;
			var cloudCode = this.state.cloudCode;


			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_Tabs.Tabs,
					null,
					_react2.default.createElement(
						_Tabs.Tab,
						{ label: "Code" },
						_react2.default.createElement(_reactCodemirror2.default, {
							value: cloudCode,
							preserveScrollPosition: true,
							onChange: function onChange(cloudCode) {
								return _this2.setState({ cloudCode: cloudCode });
							},
							options: {
								lineNumbers: true,
								mode: "javascript",
								dragDrop: true,
								allowDropFileTypes: [".js", ".json", ".jsx"]
							},
							ref: function ref(a) {
								if (a) {
									if (a.codeMirror.getValue() != cloudCode) {
										//why
										a.codeMirror.setValue(cloudCode);
									}
									var container = document.querySelector('.CodeMirror');
									container.style.height = height + "px";
								}
							}
						})
					),
					_react2.default.createElement(
						_Tabs.Tab,
						{ label: "Schema" },
						_react2.default.createElement(_schema2.default, { app: app })
					)
				),
				_react2.default.createElement(_commandBar2.default, { className: "footbar",
					items: [{ action: "Back" }, { action: "Save", icon: _react2.default.createElement(_save2.default, null),
						onSelect: function onSelect(e) {
							return _this2.update();
						}
					}] })
			);
		}
	}, {
		key: "update",
		value: function update() {
			var cloudCode = this.state.cloudCode;
			var _props2 = this.props,
			    mutate = _props2.mutate,
			    showMessage = _props2.showMessage;

			try {
				new Function("Cloud", cloudCode);
				mutate({ cloudCode: cloudCode });
			} catch (_ref2) {
				var message = _ref2.message;

				showMessage({ message: message, level: "error" });
			}
		}
	}]);

	return Cloud;
}(_react.Component);

exports.default = (0, _recompose.compose)((0, _recompose2.withMutation)(function (_ref3) {
	var id = _ref3.id;
	return {
		variables: { id: id },
		mutation: _graphql || (_graphql = function _graphql() {
			return require("./__generated__/cloud_update_Mutation.graphql");
		})
	};
}), (0, _recompose2.withFragment)({
	app: function app() {
		return require("./__generated__/cloud_app.graphql");
	}
}), (0, _recompose.getContext)({
	showMessage: _react.PropTypes.func,
	theme: _react.PropTypes.object
}), (0, _recompose.mapProps)(function (_ref4) {
	var app = _ref4.app,
	    theme = _ref4.theme,
	    others = _objectWithoutProperties(_ref4, ["app", "theme"]);

	return _extends({
		height: theme.page.height - theme.footbar.height - theme.appBar.height,
		app: app
	}, others);
}))(Cloud);