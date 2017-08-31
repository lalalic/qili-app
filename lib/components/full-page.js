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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2Z1bGwtcGFnZS5qcyJdLCJuYW1lcyI6WyJGdWxsUGFnZSIsInN0eWxlIiwiY2hpbGRyZW4iLCJtdWlUaGVtZSIsInBhZ2UiLCJ6SW5kZXgiLCJkaWFsb2ciLCJwb3NpdGlvbiIsImxlZnQiLCJ0b3AiLCJiYWNrZ3JvdW5kIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRU8sSUFBTUEsOEJBQVMsU0FBVEEsUUFBUztBQUFBLEtBQUVDLEtBQUYsUUFBRUEsS0FBRjtBQUFBLEtBQVFDLFFBQVIsUUFBUUEsUUFBUjtBQUFBLDRCQUFtQkMsUUFBbkI7QUFBQSxLQUE2QkMsSUFBN0Isa0JBQTZCQSxJQUE3QjtBQUFBLEtBQWtDQyxNQUFsQyxrQkFBa0NBLE1BQWxDO0FBQUEsUUFDckI7QUFBQTtBQUFBLElBQUssb0JBQVdKLEtBQVgsRUFBb0JHLElBQXBCLElBQXlCQyxRQUFPQSxPQUFPQyxNQUF2QyxFQUErQ0MsVUFBUyxVQUF4RCxFQUFvRUMsTUFBSyxDQUF6RSxFQUE0RUMsS0FBSSxDQUFoRixFQUFtRkMsWUFBVyxPQUE5RixHQUFMO0FBQ0VSO0FBREYsRUFEcUI7QUFBQSxDQUFmOztBQU1QRixTQUFTVyxZQUFULEdBQXNCO0FBQ2xCUixXQUFVLGlCQUFVUztBQURGLENBQXRCOztrQkFJZVosUSIsImZpbGUiOiJmdWxsLXBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmV4cG9ydCBjb25zdCBGdWxsUGFnZT0oe3N0eWxlLGNoaWxkcmVufSx7bXVpVGhlbWU6e3BhZ2UsekluZGV4fX0pPT4oXHJcblx0PGRpdiBzdHlsZT17ey4uLnN0eWxlLC4uLnBhZ2UsekluZGV4OnpJbmRleC5kaWFsb2csIHBvc2l0aW9uOlwiYWJzb2x1dGVcIiwgbGVmdDowLCB0b3A6MCwgYmFja2dyb3VuZDpcIndoaXRlXCJ9fT5cclxuXHRcdHtjaGlsZHJlbn1cclxuXHQ8L2Rpdj5cclxuKVxyXG5cclxuRnVsbFBhZ2UuY29udGV4dFR5cGVzPXtcclxuICAgIG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZ1bGxQYWdlXHJcbiJdfQ==