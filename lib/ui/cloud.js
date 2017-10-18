"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Cloud = undefined;

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

var _fileUpload = require("material-ui/svg-icons/file/file-upload");

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _save = require("material-ui/svg-icons/content/save");

var _save2 = _interopRequireDefault(_save);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("codemirror/mode/javascript/javascript");

var Cloud = exports.Cloud = function (_Component) {
	_inherits(Cloud, _Component);

	function Cloud() {
		_classCallCheck(this, Cloud);

		var _this = _possibleConstructorReturn(this, (Cloud.__proto__ || Object.getPrototypeOf(Cloud)).apply(this, arguments));

		_this.state = { cloudCode: _this.props.cloudCode };
		return _this;
	}

	_createClass(Cloud, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {
			this.setState({ cloudCode: next.cloudCode });
		}
	}, {
		key: "update",
		value: function update() {
			var cloudCode = this.state.cloudCode;
			var _props = this.props,
			    mutate = _props.mutate,
			    showMessage = _props.showMessage;

			try {
				new Function("Cloud", cloudCode);
				mutate({ cloudCode: cloudCode });
			} catch (_ref) {
				var message = _ref.message;

				showMessage({ message: message, level: "error" });
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    mutate = _props2.mutate,
			    theme = _props2.theme;
			var cloudCode = this.state.cloudCode;


			return _react2.default.createElement(
				"div",
				null,
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
							container.style.height = theme.page.height - theme.footbar.height + "px";
						}
					}
				}),
				_react2.default.createElement(_commandBar2.default, { className: "footbar",
					items: [{ action: "Back" }, { action: "Save", icon: _react2.default.createElement(_save2.default, null),
						onSelect: function onSelect(e) {
							return _this2.update();
						}
					}] })
			);
		}
	}]);

	return Cloud;
}(_react.Component);

exports.default = (0, _recompose.compose)((0, _recompose2.withMutation)(function (_ref2) {
	var id = _ref2.id;
	return {
		variables: { id: id },
		patch4: id,
		mutation: _graphql || (_graphql = function _graphql() {
			return require("./__generated__/cloud_update_Mutation.graphql");
		})
	};
}), (0, _recompose.getContext)({
	showMessage: _react.PropTypes.func,
	theme: _react.PropTypes.object
}))(Cloud);