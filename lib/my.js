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

var My = exports.My = function My(_ref) {
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

exports.default = My;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9teS5qcyJdLCJuYW1lcyI6WyJNeSIsInJvdXRlciIsInB1c2giLCJhbGwiLCJtYXAiLCJhIiwibmFtZSIsIl9pZCIsImN1cnJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFTyxJQUFNQSxrQkFBRyxTQUFIQSxFQUFHO0FBQUEsS0FBRUMsTUFBRixRQUFFQSxNQUFGO0FBQUEsUUFDZjtBQUFBO0FBQUE7QUFDQztBQUNDLGdCQUFZLGlCQURiO0FBRUMsa0JBQWUsSUFGaEI7QUFHQyxnQ0FBNkIsS0FIOUI7QUFJQyxlQUFZO0FBQUEsV0FBR0EsT0FBT0MsSUFBUCxDQUFZLEtBQVosQ0FBSDtBQUFBLElBSmI7QUFLQyxhQUFVLCtEQUxYO0FBTUMsZ0JBQ0MsY0FBSUMsR0FBSixDQUFRQyxHQUFSLENBQVk7QUFBQSxXQUNWLHNEQUFVLGFBQWFDLEVBQUVDLElBQXpCLEVBQStCLEtBQUtELEVBQUVFLEdBQXRDO0FBQ0MsZUFBVSwyQ0FEWDtBQUVDLGdCQUFXLGlFQUZaO0FBR0MsY0FBUztBQUFBLGFBQUdOLE9BQU9DLElBQVAsVUFBbUIsQ0FBQyxjQUFJTSxPQUFKLEdBQVlILENBQWIsRUFBZ0JDLElBQW5DLENBQUg7QUFBQSxNQUhWLEdBRFU7QUFBQSxJQUFaO0FBUEY7QUFERCxFQURlO0FBQUEsQ0FBVDs7a0JBb0JRTixFIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgSWNvbkFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkLWNpcmNsZS1vdXRsaW5lXCJcclxuaW1wb3J0IEljb25JdGVtIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHRcIlxyXG5cclxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvdW50XCJcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9kYi9hcHBcIlxyXG5cclxuZXhwb3J0IGNvbnN0IE15PSh7cm91dGVyfSk9PihcclxuXHQ8QWNjb3VudD5cclxuXHRcdDxMaXN0SXRlbVxyXG5cdFx0XHRwcmltYXJ5VGV4dD1cIkNyZWF0ZSBRaUxpIGFwcFwiXHJcblx0XHRcdGluaXRpYWxseU9wZW49e3RydWV9XHJcblx0XHRcdGF1dG9HZW5lcmF0ZU5lc3RlZEluZGljYXRvcj17ZmFsc2V9XHJcblx0XHRcdG9uVG91Y2hUYXA9e2E9PnJvdXRlci5wdXNoKFwiYXBwXCIpfVxyXG5cdFx0XHRsZWZ0SWNvbj17PEljb25BZGQvPn1cclxuXHRcdFx0bmVzdGVkSXRlbXM9e1xyXG5cdFx0XHRcdEFwcC5hbGwubWFwKGE9PihcclxuXHRcdFx0XHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PXthLm5hbWV9IGtleT17YS5faWR9XHJcblx0XHRcdFx0XHRcdFx0bGVmdEljb249ezxzcGFuLz59XHJcblx0XHRcdFx0XHRcdFx0cmlnaHRJY29uPXs8SWNvbkl0ZW0vPn1cclxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChgYXBwLyR7KEFwcC5jdXJyZW50PWEpLm5hbWV9YCl9Lz5cclxuXHRcdFx0XHQpKVxyXG5cdFx0XHR9XHJcblx0XHQvPlxyXG5cdDwvQWNjb3VudD5cclxuKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlcclxuIl19