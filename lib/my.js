"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.My = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _addCircleOutline = require("material-ui/svg-icons/content/add-circle-outline");

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _account = require("./components/account");

var _account2 = _interopRequireDefault(_account);

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommandBar = _.UI.CommandBar;
var My = exports.My = function My(_ref, _ref2) {
	var apps = _ref.apps;
	var router = _ref2.router;
	return _react2.default.createElement(
		_account2.default,
		null,
		_react2.default.createElement(_materialUi.ListItem, {
			primaryText: "Create QiLi app",
			initiallyOpen: true,
			autoGenerateNestedIndicator: false,
			onTouchTap: function onTouchTap(a) {
				return router.push("app");
			},
			leftIcon: _react2.default.createElement(_addCircleOutline2.default, null),
			nestedItems: apps.map(function (a) {
				return _react2.default.createElement(_materialUi.ListItem, { primaryText: a.name, key: a._id,
					leftIcon: _react2.default.createElement("span", null),
					rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
					onClick: function onClick(e) {
						return router.push("/app/" + (_app2.default.current = a).name);
					} });
			})
		}),
		_react2.default.createElement(CommandBar, { className: "footbar", items: [{ action: "Back" }] })
	);
};
My.contextTypes = { router: _react.PropTypes.object };
exports.default = My;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9teS5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiTXkiLCJhcHBzIiwicm91dGVyIiwicHVzaCIsIm1hcCIsImEiLCJuYW1lIiwiX2lkIiwiY3VycmVudCIsImFjdGlvbiIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztJQUVPQSxVLFFBQUFBLFU7QUFFQSxJQUFNQyxrQkFBRyxTQUFIQSxFQUFHO0FBQUEsS0FBRUMsSUFBRixRQUFFQSxJQUFGO0FBQUEsS0FBU0MsTUFBVCxTQUFTQSxNQUFUO0FBQUEsUUFDZjtBQUFBO0FBQUE7QUFDQztBQUNDLGdCQUFZLGlCQURiO0FBRUMsa0JBQWUsSUFGaEI7QUFHQyxnQ0FBNkIsS0FIOUI7QUFJQyxlQUFZO0FBQUEsV0FBR0EsT0FBT0MsSUFBUCxDQUFZLEtBQVosQ0FBSDtBQUFBLElBSmI7QUFLQyxhQUFVLCtEQUxYO0FBTUMsZ0JBQ0NGLEtBQUtHLEdBQUwsQ0FBUztBQUFBLFdBQ1Asc0RBQVUsYUFBYUMsRUFBRUMsSUFBekIsRUFBK0IsS0FBS0QsRUFBRUUsR0FBdEM7QUFDQyxlQUFVLDJDQURYO0FBRUMsZ0JBQVcsaUVBRlo7QUFHQyxjQUFTO0FBQUEsYUFBR0wsT0FBT0MsSUFBUCxXQUFvQixDQUFDLGNBQUlLLE9BQUosR0FBWUgsQ0FBYixFQUFnQkMsSUFBcEMsQ0FBSDtBQUFBLE1BSFYsR0FETztBQUFBLElBQVQ7QUFQRixJQUREO0FBZ0JDLGdDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCLEVBQWdDLE9BQU8sQ0FBQyxFQUFDRyxRQUFPLE1BQVIsRUFBRCxDQUF2QztBQWhCRCxFQURlO0FBQUEsQ0FBVDtBQW9CUFQsR0FBR1UsWUFBSCxHQUFnQixFQUFDUixRQUFPLGlCQUFVUyxNQUFsQixFQUFoQjtrQkFDZVgsRSIsImZpbGUiOiJteS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0xpc3QsIExpc3RJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZC1jaXJjbGUtb3V0bGluZVwiXHJcbmltcG9ydCBJY29uSXRlbSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0XCJcclxuXHJcbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3VudFwiXHJcbmltcG9ydCBBcHAgZnJvbSBcIi4vZGIvYXBwXCJcclxuaW1wb3J0IHtVSX0gZnJvbSBcIi5cIlxyXG5cclxuY29uc3Qge0NvbW1hbmRCYXJ9PVVJXHJcblxyXG5leHBvcnQgY29uc3QgTXk9KHthcHBzfSx7cm91dGVyfSk9PihcclxuXHQ8QWNjb3VudD5cclxuXHRcdDxMaXN0SXRlbVxyXG5cdFx0XHRwcmltYXJ5VGV4dD1cIkNyZWF0ZSBRaUxpIGFwcFwiXHJcblx0XHRcdGluaXRpYWxseU9wZW49e3RydWV9XHJcblx0XHRcdGF1dG9HZW5lcmF0ZU5lc3RlZEluZGljYXRvcj17ZmFsc2V9XHJcblx0XHRcdG9uVG91Y2hUYXA9e2E9PnJvdXRlci5wdXNoKFwiYXBwXCIpfVxyXG5cdFx0XHRsZWZ0SWNvbj17PEljb25BZGQvPn1cclxuXHRcdFx0bmVzdGVkSXRlbXM9e1xyXG5cdFx0XHRcdGFwcHMubWFwKGE9PihcclxuXHRcdFx0XHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PXthLm5hbWV9IGtleT17YS5faWR9XHJcblx0XHRcdFx0XHRcdFx0bGVmdEljb249ezxzcGFuLz59XHJcblx0XHRcdFx0XHRcdFx0cmlnaHRJY29uPXs8SWNvbkl0ZW0vPn1cclxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChgL2FwcC8keyhBcHAuY3VycmVudD1hKS5uYW1lfWApfS8+XHJcblx0XHRcdFx0KSlcclxuXHRcdFx0fVxyXG5cdFx0Lz5cclxuXHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9XX0vPlxyXG5cdDwvQWNjb3VudD5cclxuKVxyXG5NeS5jb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxyXG5leHBvcnQgZGVmYXVsdCBNeVxyXG4iXX0=