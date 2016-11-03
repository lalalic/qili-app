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
var My = exports.My = function My(props, _ref) {
	var router = _ref.router;
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
			nestedItems: _app2.default.all.map(function (a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9teS5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiTXkiLCJwcm9wcyIsInJvdXRlciIsInB1c2giLCJhbGwiLCJtYXAiLCJhIiwibmFtZSIsIl9pZCIsImN1cnJlbnQiLCJhY3Rpb24iLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7SUFFT0EsVSxRQUFBQSxVO0FBRUEsSUFBTUMsa0JBQUcsU0FBSEEsRUFBRyxDQUFDQyxLQUFEO0FBQUEsS0FBUUMsTUFBUixRQUFRQSxNQUFSO0FBQUEsUUFDZjtBQUFBO0FBQUE7QUFDQztBQUNDLGdCQUFZLGlCQURiO0FBRUMsa0JBQWUsSUFGaEI7QUFHQyxnQ0FBNkIsS0FIOUI7QUFJQyxlQUFZO0FBQUEsV0FBR0EsT0FBT0MsSUFBUCxDQUFZLEtBQVosQ0FBSDtBQUFBLElBSmI7QUFLQyxhQUFVLCtEQUxYO0FBTUMsZ0JBQ0MsY0FBSUMsR0FBSixDQUFRQyxHQUFSLENBQVk7QUFBQSxXQUNWLHNEQUFVLGFBQWFDLEVBQUVDLElBQXpCLEVBQStCLEtBQUtELEVBQUVFLEdBQXRDO0FBQ0MsZUFBVSwyQ0FEWDtBQUVDLGdCQUFXLGlFQUZaO0FBR0MsY0FBUztBQUFBLGFBQUdOLE9BQU9DLElBQVAsV0FBb0IsQ0FBQyxjQUFJTSxPQUFKLEdBQVlILENBQWIsRUFBZ0JDLElBQXBDLENBQUg7QUFBQSxNQUhWLEdBRFU7QUFBQSxJQUFaO0FBUEYsSUFERDtBQWdCQyxnQ0FBQyxVQUFELElBQVksV0FBVSxTQUF0QixFQUFnQyxPQUFPLENBQUMsRUFBQ0csUUFBTyxNQUFSLEVBQUQsQ0FBdkM7QUFoQkQsRUFEZTtBQUFBLENBQVQ7QUFvQlBWLEdBQUdXLFlBQUgsR0FBZ0IsRUFBQ1QsUUFBTyxpQkFBVVUsTUFBbEIsRUFBaEI7a0JBQ2VaLEUiLCJmaWxlIjoibXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtMaXN0LCBMaXN0SXRlbX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQtY2lyY2xlLW91dGxpbmVcIlxyXG5pbXBvcnQgSWNvbkl0ZW0gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodFwiXHJcblxyXG5pbXBvcnQgQWNjb3VudCBmcm9tIFwiLi9jb21wb25lbnRzL2FjY291bnRcIlxyXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCIuXCJcclxuXHJcbmNvbnN0IHtDb21tYW5kQmFyfT1VSVxyXG5cclxuZXhwb3J0IGNvbnN0IE15PShwcm9wcyx7cm91dGVyfSk9PihcclxuXHQ8QWNjb3VudD5cclxuXHRcdDxMaXN0SXRlbVxyXG5cdFx0XHRwcmltYXJ5VGV4dD1cIkNyZWF0ZSBRaUxpIGFwcFwiXHJcblx0XHRcdGluaXRpYWxseU9wZW49e3RydWV9XHJcblx0XHRcdGF1dG9HZW5lcmF0ZU5lc3RlZEluZGljYXRvcj17ZmFsc2V9XHJcblx0XHRcdG9uVG91Y2hUYXA9e2E9PnJvdXRlci5wdXNoKFwiYXBwXCIpfVxyXG5cdFx0XHRsZWZ0SWNvbj17PEljb25BZGQvPn1cclxuXHRcdFx0bmVzdGVkSXRlbXM9e1xyXG5cdFx0XHRcdEFwcC5hbGwubWFwKGE9PihcclxuXHRcdFx0XHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PXthLm5hbWV9IGtleT17YS5faWR9XHJcblx0XHRcdFx0XHRcdFx0bGVmdEljb249ezxzcGFuLz59XHJcblx0XHRcdFx0XHRcdFx0cmlnaHRJY29uPXs8SWNvbkl0ZW0vPn1cclxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChgL2FwcC8keyhBcHAuY3VycmVudD1hKS5uYW1lfWApfS8+XHJcblx0XHRcdFx0KSlcclxuXHRcdFx0fVxyXG5cdFx0Lz5cclxuXHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9XX0vPlxyXG5cdDwvQWNjb3VudD5cclxuKVxyXG5NeS5jb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxyXG5leHBvcnQgZGVmYXVsdCBNeVxyXG4iXX0=