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
						return router.push("/app/" + a._id);
					} });
			})
		}),
		_react2.default.createElement(CommandBar, { className: "footbar", items: [{ action: "Back" }] })
	);
};
My.contextTypes = { router: _react.PropTypes.object };
exports.default = My;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9teS5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiTXkiLCJhcHBzIiwicm91dGVyIiwicHVzaCIsIm1hcCIsImEiLCJuYW1lIiwiX2lkIiwiYWN0aW9uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRU9BLFUsUUFBQUEsVTtBQUVBLElBQU1DLGtCQUFHLFNBQUhBLEVBQUc7QUFBQSxLQUFFQyxJQUFGLFFBQUVBLElBQUY7QUFBQSxLQUFTQyxNQUFULFNBQVNBLE1BQVQ7QUFBQSxRQUNmO0FBQUE7QUFBQTtBQUNDO0FBQ0MsZ0JBQVksaUJBRGI7QUFFQyxrQkFBZSxJQUZoQjtBQUdDLGdDQUE2QixLQUg5QjtBQUlDLGVBQVk7QUFBQSxXQUFHQSxPQUFPQyxJQUFQLENBQVksS0FBWixDQUFIO0FBQUEsSUFKYjtBQUtDLGFBQVUsK0RBTFg7QUFNQyxnQkFDQ0YsS0FBS0csR0FBTCxDQUFTO0FBQUEsV0FDUCxzREFBVSxhQUFhQyxFQUFFQyxJQUF6QixFQUErQixLQUFLRCxFQUFFRSxHQUF0QztBQUNDLGVBQVUsMkNBRFg7QUFFQyxnQkFBVyxpRUFGWjtBQUdDLGNBQVM7QUFBQSxhQUFHTCxPQUFPQyxJQUFQLFdBQW9CRSxFQUFFRSxHQUF0QixDQUFIO0FBQUEsTUFIVixHQURPO0FBQUEsSUFBVDtBQVBGLElBREQ7QUFnQkMsZ0NBQUMsVUFBRCxJQUFZLFdBQVUsU0FBdEIsRUFBZ0MsT0FBTyxDQUFDLEVBQUNDLFFBQU8sTUFBUixFQUFELENBQXZDO0FBaEJELEVBRGU7QUFBQSxDQUFUO0FBb0JQUixHQUFHUyxZQUFILEdBQWdCLEVBQUNQLFFBQU8saUJBQVVRLE1BQWxCLEVBQWhCO2tCQUNlVixFIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgSWNvbkFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkLWNpcmNsZS1vdXRsaW5lXCJcclxuaW1wb3J0IEljb25JdGVtIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHRcIlxyXG5cclxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvdW50XCJcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9kYi9hcHBcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwiLlwiXHJcblxyXG5jb25zdCB7Q29tbWFuZEJhcn09VUlcclxuXHJcbmV4cG9ydCBjb25zdCBNeT0oe2FwcHN9LHtyb3V0ZXJ9KT0+KFxyXG5cdDxBY2NvdW50PlxyXG5cdFx0PExpc3RJdGVtXHJcblx0XHRcdHByaW1hcnlUZXh0PVwiQ3JlYXRlIFFpTGkgYXBwXCJcclxuXHRcdFx0aW5pdGlhbGx5T3Blbj17dHJ1ZX1cclxuXHRcdFx0YXV0b0dlbmVyYXRlTmVzdGVkSW5kaWNhdG9yPXtmYWxzZX1cclxuXHRcdFx0b25Ub3VjaFRhcD17YT0+cm91dGVyLnB1c2goXCJhcHBcIil9XHJcblx0XHRcdGxlZnRJY29uPXs8SWNvbkFkZC8+fVxyXG5cdFx0XHRuZXN0ZWRJdGVtcz17XHJcblx0XHRcdFx0YXBwcy5tYXAoYT0+KFxyXG5cdFx0XHRcdFx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9e2EubmFtZX0ga2V5PXthLl9pZH1cclxuXHRcdFx0XHRcdFx0XHRsZWZ0SWNvbj17PHNwYW4vPn1cclxuXHRcdFx0XHRcdFx0XHRyaWdodEljb249ezxJY29uSXRlbS8+fVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnJvdXRlci5wdXNoKGAvYXBwLyR7YS5faWR9YCl9Lz5cclxuXHRcdFx0XHQpKVxyXG5cdFx0XHR9XHJcblx0XHQvPlxyXG5cdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn1dfS8+XHJcblx0PC9BY2NvdW50PlxyXG4pXHJcbk15LmNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XHJcbmV4cG9ydCBkZWZhdWx0IE15XHJcbiJdfQ==