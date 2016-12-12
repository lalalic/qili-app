"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FullPage = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FullPage = exports.FullPage = function FullPage(_ref, _ref2) {
	var style = _ref.style;
	var children = _ref.children;
	var _ref2$muiTheme = _ref2.muiTheme;
	var page = _ref2$muiTheme.page;
	var zIndex = _ref2$muiTheme.zIndex;
	return _react2.default.createElement(
		"div",
		{ style: (0, _extends3.default)({}, style, page, { zIndex: zIndex.dialog, position: "absolute", left: 0, top: 0, background: "white" }) },
		children
	);
};

FullPage.contextTypes = {
	muiTheme: _react.PropTypes.object
};

exports.default = FullPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2Z1bGwtcGFnZS5qcyJdLCJuYW1lcyI6WyJGdWxsUGFnZSIsInN0eWxlIiwiY2hpbGRyZW4iLCJtdWlUaGVtZSIsInBhZ2UiLCJ6SW5kZXgiLCJkaWFsb2ciLCJwb3NpdGlvbiIsImxlZnQiLCJ0b3AiLCJiYWNrZ3JvdW5kIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxJQUFNQSw4QkFBUyxTQUFUQSxRQUFTO0FBQUEsS0FBRUMsS0FBRixRQUFFQSxLQUFGO0FBQUEsS0FBUUMsUUFBUixRQUFRQSxRQUFSO0FBQUEsNEJBQW1CQyxRQUFuQjtBQUFBLEtBQTZCQyxJQUE3QixrQkFBNkJBLElBQTdCO0FBQUEsS0FBa0NDLE1BQWxDLGtCQUFrQ0EsTUFBbEM7QUFBQSxRQUNyQjtBQUFBO0FBQUEsSUFBSyxrQ0FBV0osS0FBWCxFQUFvQkcsSUFBcEIsSUFBeUJDLFFBQU9BLE9BQU9DLE1BQXZDLEVBQStDQyxVQUFTLFVBQXhELEVBQW9FQyxNQUFLLENBQXpFLEVBQTRFQyxLQUFJLENBQWhGLEVBQW1GQyxZQUFXLE9BQTlGLEdBQUw7QUFDRVI7QUFERixFQURxQjtBQUFBLENBQWY7O0FBTVBGLFNBQVNXLFlBQVQsR0FBc0I7QUFDbEJSLFdBQVUsaUJBQVVTO0FBREYsQ0FBdEI7O2tCQUllWixRIiwiZmlsZSI6ImZ1bGwtcGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuXG5leHBvcnQgY29uc3QgRnVsbFBhZ2U9KHtzdHlsZSxjaGlsZHJlbn0se211aVRoZW1lOntwYWdlLHpJbmRleH19KT0+KFxuXHQ8ZGl2IHN0eWxlPXt7Li4uc3R5bGUsLi4ucGFnZSx6SW5kZXg6ekluZGV4LmRpYWxvZywgcG9zaXRpb246XCJhYnNvbHV0ZVwiLCBsZWZ0OjAsIHRvcDowLCBiYWNrZ3JvdW5kOlwid2hpdGVcIn19PlxuXHRcdHtjaGlsZHJlbn1cblx0PC9kaXY+XG4pXG5cbkZ1bGxQYWdlLmNvbnRleHRUeXBlcz17XG4gICAgbXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3Rcbn1cblxuZXhwb3J0IGRlZmF1bHQgRnVsbFBhZ2VcbiJdfQ==