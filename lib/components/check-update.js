"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CheckUpdate = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckUpdate = exports.CheckUpdate = function CheckUpdate(_ref, _ref2) {
	var lastVersion = _ref.lastVersion,
	    children = _ref.children;
	var version = _ref2.project.version;

	var hasUpdate = lastVersion && lastVersion != version;
	if (!hasUpdate) return typeof children == "string" ? _react2.default.createElement(
		"span",
		null,
		children
	) : children;

	if (typeof children == "string") {
		return _react2.default.createElement(
			"span",
			null,
			children,
			_react2.default.createElement(New, null)
		);
	} else {
		return _react2.default.createElement(
			_materialUi.Badge,
			{ badgeContent: ".",
				style: { padding: "" },
				badgeStyle: {
					right: -6,
					top: -6,
					width: 12,
					height: 12,
					backgroundColor: "red"
				} },
			children
		);
	}
};

CheckUpdate.contextTypes = {
	project: _react.PropTypes.object
};

var New = function New(_ref3) {
	var _ref3$text = _ref3.text,
	    text = _ref3$text === undefined ? "New" : _ref3$text;
	return _react2.default.createElement(
		"span",
		{ style: {
				background: "red",
				color: "white",
				paddingRight: 10,
				paddingLeft: 10,
				borderRadius: 10,
				marginLeft: 3
			} },
		text
	);
};

exports.default = (0, _reactRedux.connect)(function (state) {
	return { lastVersion: state.qili.lastVersion };
})(CheckUpdate);