"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Setting = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require("recompose");

var _reactRedux = require("react-redux");

var _materialUi = require("material-ui");

var _modeEdit = require("material-ui/svg-icons/editor/mode-edit");

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _bugReport = require("material-ui/svg-icons/action/bug-report");

var _bugReport2 = _interopRequireDefault(_bugReport);

var _systemUpdateAlt = require("material-ui/svg-icons/action/system-update-alt");

var _systemUpdateAlt2 = _interopRequireDefault(_systemUpdateAlt);

var _infoOutline = require("material-ui/svg-icons/action/info-outline");

var _infoOutline2 = _interopRequireDefault(_infoOutline);

var _android = require("material-ui/svg-icons/action/android");

var _android2 = _interopRequireDefault(_android);

var _checkUpdate = require("../components/check-update");

var _checkUpdate2 = _interopRequireDefault(_checkUpdate);

var _commandBar = require("../components/command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Setting = exports.Setting = function Setting(_ref) {
	var latestVersion = _ref.latestVersion,
	    app = _ref.is.app,
	    _ref$project = _ref.project,
	    _ref$project$homepage = _ref$project.homepage,
	    homepage = _ref$project$homepage === undefined ? "." : _ref$project$homepage,
	    version = _ref$project.version;
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			_materialUi.List,
			null,
			app && _react2.default.createElement(_materialUi.ListItem, { primaryText: "\u53BB\u8BC4\u4EF7", leftIcon: _react2.default.createElement(_modeEdit2.default, null) }),
			_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5EFA\u8BAE", leftIcon: _react2.default.createElement(_bugReport2.default, null) }),
			_react2.default.createElement(_materialUi.ListItem, { primaryText: app ? "" + (latestVersion && version != latestVersion ? _react2.default.createElement(
					_checkUpdate2.default,
					null,
					"\u5F53\u524D",
					lastVersion,
					",\u66F4\u65B0\u5230",
					version
				) : "已是最新v" + version) : "\u4E0B\u8F7DApp [V" + version + "]", leftIcon: _react2.default.createElement(_android2.default, null),
				onClick: function onClick(e) {
					if (app && (!latestVersion || version == latestVersion)) return;
					var a = document.createElement("a");
					a.href = homepage + "/app.apk";
					a.download = "app.apk";
					a.style.position = "absolute";
					a.top = -1000;
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
				}
			}),
			_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5173\u4E8E", leftIcon: _react2.default.createElement(_infoOutline2.default, null) })
		),
		_react2.default.createElement(_commandBar2.default, { className: "footbar", items: [{ action: "back" }] })
	);
};

exports.default = (0, _recompose.compose)((0, _recompose.getContext)({
	is: _propTypes2.default.object,
	project: _propTypes2.default.object
}), (0, _reactRedux.connect)(function (state) {
	return { latestVersion: state.qili.latestVersion };
}))(Setting);