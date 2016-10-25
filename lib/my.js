"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _account = require("./components/account");

var _account2 = _interopRequireDefault(_account);

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Account) {
	_inherits(_class, _Account);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "more",
		value: function more() {
			var _this2 = this;

			return _react2.default.createElement(List.Item, {
				primaryText: "Create QiLi app",
				initiallyOpen: true,
				autoGenerateNestedIndicator: false,
				onTouchTap: function onTouchTap(a) {
					return _this2.context.router.push("app");
				},
				leftIcon: _react2.default.createElement(IconAdd, null),
				nestedItems: _app2.default.all.map(function (a) {
					return _react2.default.createElement(List.Item, { primaryText: a.name, key: "" + a._id,
						leftIcon: _react2.default.createElement("span", null),
						rightIcon: _react2.default.createElement(IconItem, null),
						onClick: function onClick() {
							return _this2.context.router.push("app/" + (_app2.default.current = a).name);
						} });
				})
			});
		}
	}]);

	return _class;
}(_account2.default);

_class.contextTypes = {
	router: _react2.default.PropTypes.object
};
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9teS5qcyJdLCJuYW1lcyI6WyJjb250ZXh0Iiwicm91dGVyIiwicHVzaCIsImFsbCIsIm1hcCIsImEiLCJuYW1lIiwiX2lkIiwiY3VycmVudCIsImNvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQUdPO0FBQUE7O0FBQ0wsVUFDQyw4QkFBQyxJQUFELENBQU0sSUFBTjtBQUNDLGlCQUFZLGlCQURiO0FBRUMsbUJBQWUsSUFGaEI7QUFHQyxpQ0FBNkIsS0FIOUI7QUFJQyxnQkFBWTtBQUFBLFlBQUcsT0FBS0EsT0FBTCxDQUFhQyxNQUFiLENBQW9CQyxJQUFwQixDQUF5QixLQUF6QixDQUFIO0FBQUEsS0FKYjtBQUtDLGNBQVUsOEJBQUMsT0FBRCxPQUxYO0FBTUMsaUJBQ0MsY0FBSUMsR0FBSixDQUFRQyxHQUFSLENBQVksYUFBRztBQUNkLFlBQ0MsOEJBQUMsSUFBRCxDQUFNLElBQU4sSUFBVyxhQUFhQyxFQUFFQyxJQUExQixFQUFnQyxVQUFRRCxFQUFFRSxHQUExQztBQUNDLGdCQUFVLDJDQURYO0FBRUMsaUJBQVcsOEJBQUMsUUFBRCxPQUZaO0FBR0MsZUFBUztBQUFBLGNBQUksT0FBS1AsT0FBTCxDQUFhQyxNQUFiLENBQW9CQyxJQUFwQixVQUFnQyxDQUFDLGNBQUlNLE9BQUosR0FBWUgsQ0FBYixFQUFnQkMsSUFBaEQsQ0FBSjtBQUFBLE9BSFYsR0FERDtBQU1BLEtBUEQ7QUFQRixLQUREO0FBa0JBOzs7Ozs7T0FDTUcsWSxHQUFhO0FBQ25CUixTQUFPLGdCQUFNUyxTQUFOLENBQWdCQztBQURKLEMiLCJmaWxlIjoibXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvdW50XCJcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9kYi9hcHBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBBY2NvdW50e1xyXG5cdG1vcmUoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxMaXN0Lkl0ZW0gXHJcblx0XHRcdFx0cHJpbWFyeVRleHQ9XCJDcmVhdGUgUWlMaSBhcHBcIlxyXG5cdFx0XHRcdGluaXRpYWxseU9wZW49e3RydWV9XHJcblx0XHRcdFx0YXV0b0dlbmVyYXRlTmVzdGVkSW5kaWNhdG9yPXtmYWxzZX1cclxuXHRcdFx0XHRvblRvdWNoVGFwPXthPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJhcHBcIil9XHJcblx0XHRcdFx0bGVmdEljb249ezxJY29uQWRkLz59XHJcblx0XHRcdFx0bmVzdGVkSXRlbXM9e1xyXG5cdFx0XHRcdFx0QXBwLmFsbC5tYXAoYT0+e1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e2EubmFtZX0ga2V5PXtgJHthLl9pZH1gfVxyXG5cdFx0XHRcdFx0XHRcdFx0bGVmdEljb249ezxzcGFuLz59XHJcblx0XHRcdFx0XHRcdFx0XHRyaWdodEljb249ezxJY29uSXRlbS8+fVxyXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgYXBwLyR7KEFwcC5jdXJyZW50PWEpLm5hbWV9YCl9Lz5cclxuXHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdC8+KVxyXG5cdH1cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59Il19