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
						return router.push("/app/" + (_app2.default.current = a).name);
					} });
			})
		}),
		_react2.default.createElement(CommandBar, { className: "footbar", items: [{ action: "Back" }] })
	);
};

exports.default = My;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9teS5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiTXkiLCJyb3V0ZXIiLCJwdXNoIiwiYWxsIiwibWFwIiwiYSIsIm5hbWUiLCJfaWQiLCJjdXJyZW50IiwiYWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRU9BLFUsUUFBQUEsVTtBQUVBLElBQU1DLGtCQUFHLFNBQUhBLEVBQUc7QUFBQSxLQUFFQyxNQUFGLFFBQUVBLE1BQUY7QUFBQSxRQUNmO0FBQUE7QUFBQTtBQUNDO0FBQ0MsZ0JBQVksaUJBRGI7QUFFQyxrQkFBZSxJQUZoQjtBQUdDLGdDQUE2QixLQUg5QjtBQUlDLGVBQVk7QUFBQSxXQUFHQSxPQUFPQyxJQUFQLENBQVksS0FBWixDQUFIO0FBQUEsSUFKYjtBQUtDLGFBQVUsK0RBTFg7QUFNQyxnQkFDQyxjQUFJQyxHQUFKLENBQVFDLEdBQVIsQ0FBWTtBQUFBLFdBQ1Ysc0RBQVUsYUFBYUMsRUFBRUMsSUFBekIsRUFBK0IsS0FBS0QsRUFBRUUsR0FBdEM7QUFDQyxlQUFVLDJDQURYO0FBRUMsZ0JBQVcsaUVBRlo7QUFHQyxjQUFTO0FBQUEsYUFBR04sT0FBT0MsSUFBUCxXQUFvQixDQUFDLGNBQUlNLE9BQUosR0FBWUgsQ0FBYixFQUFnQkMsSUFBcEMsQ0FBSDtBQUFBLE1BSFYsR0FEVTtBQUFBLElBQVo7QUFQRixJQUREO0FBZ0JDLGdDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCLEVBQWdDLE9BQU8sQ0FBQyxFQUFDRyxRQUFPLE1BQVIsRUFBRCxDQUF2QztBQWhCRCxFQURlO0FBQUEsQ0FBVDs7a0JBcUJRVCxFIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgSWNvbkFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkLWNpcmNsZS1vdXRsaW5lXCJcclxuaW1wb3J0IEljb25JdGVtIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHRcIlxyXG5cclxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvdW50XCJcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9kYi9hcHBcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwiLlwiXHJcblxyXG5jb25zdCB7Q29tbWFuZEJhcn09VUlcclxuXHJcbmV4cG9ydCBjb25zdCBNeT0oe3JvdXRlcn0pPT4oXHJcblx0PEFjY291bnQ+XHJcblx0XHQ8TGlzdEl0ZW1cclxuXHRcdFx0cHJpbWFyeVRleHQ9XCJDcmVhdGUgUWlMaSBhcHBcIlxyXG5cdFx0XHRpbml0aWFsbHlPcGVuPXt0cnVlfVxyXG5cdFx0XHRhdXRvR2VuZXJhdGVOZXN0ZWRJbmRpY2F0b3I9e2ZhbHNlfVxyXG5cdFx0XHRvblRvdWNoVGFwPXthPT5yb3V0ZXIucHVzaChcImFwcFwiKX1cclxuXHRcdFx0bGVmdEljb249ezxJY29uQWRkLz59XHJcblx0XHRcdG5lc3RlZEl0ZW1zPXtcclxuXHRcdFx0XHRBcHAuYWxsLm1hcChhPT4oXHJcblx0XHRcdFx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD17YS5uYW1lfSBrZXk9e2EuX2lkfVxyXG5cdFx0XHRcdFx0XHRcdGxlZnRJY29uPXs8c3Bhbi8+fVxyXG5cdFx0XHRcdFx0XHRcdHJpZ2h0SWNvbj17PEljb25JdGVtLz59XHJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+cm91dGVyLnB1c2goYC9hcHAvJHsoQXBwLmN1cnJlbnQ9YSkubmFtZX1gKX0vPlxyXG5cdFx0XHRcdCkpXHJcblx0XHRcdH1cclxuXHRcdC8+XHJcblx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifV19Lz5cclxuXHQ8L0FjY291bnQ+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15XHJcbiJdfQ==