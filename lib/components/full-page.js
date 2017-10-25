"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FullPage = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FullPage = exports.FullPage = function FullPage(_ref, _ref2) {
	var style = _ref.style,
	    children = _ref.children;
	var _ref2$muiTheme = _ref2.muiTheme,
	    page = _ref2$muiTheme.page,
	    zIndex = _ref2$muiTheme.zIndex;
	return _react2.default.createElement(
		"div",
		{ style: _extends({}, style, page, { zIndex: zIndex.dialog, position: "absolute", left: 0, top: 0, background: "white" }) },
		children
	);
};

FullPage.contextTypes = {
	muiTheme: _react.PropTypes.object
};

exports.default = FullPage;