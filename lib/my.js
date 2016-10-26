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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
						return router.push("app/" + (_app2.default.current = a).name);
					} });
			})
		})
	);
};

My.contextTypes = {
	router: _react.PropTypes.object
};

exports.default = My;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9teS5qcyJdLCJuYW1lcyI6WyJNeSIsInByb3BzIiwicm91dGVyIiwicHVzaCIsImFsbCIsIm1hcCIsImEiLCJuYW1lIiwiX2lkIiwiY3VycmVudCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVPLElBQU1BLGtCQUFHLFNBQUhBLEVBQUcsQ0FBQ0MsS0FBRDtBQUFBLEtBQVFDLE1BQVIsUUFBUUEsTUFBUjtBQUFBLFFBQ2Y7QUFBQTtBQUFBO0FBQ0M7QUFDQyxnQkFBWSxpQkFEYjtBQUVDLGtCQUFlLElBRmhCO0FBR0MsZ0NBQTZCLEtBSDlCO0FBSUMsZUFBWTtBQUFBLFdBQUdBLE9BQU9DLElBQVAsQ0FBWSxLQUFaLENBQUg7QUFBQSxJQUpiO0FBS0MsYUFBVSwrREFMWDtBQU1DLGdCQUNDLGNBQUlDLEdBQUosQ0FBUUMsR0FBUixDQUFZLGFBQUc7QUFDZCxXQUNDLHNEQUFVLGFBQWFDLEVBQUVDLElBQXpCLEVBQStCLEtBQUtELEVBQUVFLEdBQXRDO0FBQ0MsZUFBVSwyQ0FEWDtBQUVDLGdCQUFXLGlFQUZaO0FBR0MsY0FBUztBQUFBLGFBQUdOLE9BQU9DLElBQVAsVUFBbUIsQ0FBQyxjQUFJTSxPQUFKLEdBQVlILENBQWIsRUFBZ0JDLElBQW5DLENBQUg7QUFBQSxNQUhWLEdBREQ7QUFNQSxJQVBEO0FBUEY7QUFERCxFQURlO0FBQUEsQ0FBVDs7QUFzQlBQLEdBQUdVLFlBQUgsR0FBZ0I7QUFDZlIsU0FBTyxpQkFBVVM7QUFERixDQUFoQjs7a0JBSWVYLEUiLCJmaWxlIjoibXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtMaXN0LCBMaXN0SXRlbX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQtY2lyY2xlLW91dGxpbmVcIlxyXG5pbXBvcnQgSWNvbkl0ZW0gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodFwiXHJcblxyXG5pbXBvcnQgQWNjb3VudCBmcm9tIFwiLi9jb21wb25lbnRzL2FjY291bnRcIlxyXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXHJcblxyXG5leHBvcnQgY29uc3QgTXk9KHByb3BzLHtyb3V0ZXJ9KT0+KFxyXG5cdDxBY2NvdW50PlxyXG5cdFx0PExpc3RJdGVtIFxyXG5cdFx0XHRwcmltYXJ5VGV4dD1cIkNyZWF0ZSBRaUxpIGFwcFwiXHJcblx0XHRcdGluaXRpYWxseU9wZW49e3RydWV9XHJcblx0XHRcdGF1dG9HZW5lcmF0ZU5lc3RlZEluZGljYXRvcj17ZmFsc2V9XHJcblx0XHRcdG9uVG91Y2hUYXA9e2E9PnJvdXRlci5wdXNoKFwiYXBwXCIpfVxyXG5cdFx0XHRsZWZ0SWNvbj17PEljb25BZGQvPn1cclxuXHRcdFx0bmVzdGVkSXRlbXM9e1xyXG5cdFx0XHRcdEFwcC5hbGwubWFwKGE9PntcclxuXHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD17YS5uYW1lfSBrZXk9e2EuX2lkfVxyXG5cdFx0XHRcdFx0XHRcdGxlZnRJY29uPXs8c3Bhbi8+fVxyXG5cdFx0XHRcdFx0XHRcdHJpZ2h0SWNvbj17PEljb25JdGVtLz59XHJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+cm91dGVyLnB1c2goYGFwcC8keyhBcHAuY3VycmVudD1hKS5uYW1lfWApfS8+XHJcblx0XHRcdFx0XHQpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0Lz5cclxuXHQ8L0FjY291bnQ+XHJcbilcclxuXHJcbk15LmNvbnRleHRUeXBlcz17XHJcblx0cm91dGVyOlByb3BUeXBlcy5vYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXkiXX0=