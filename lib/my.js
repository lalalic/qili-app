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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9teS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBR087OztBQUNMLFVBQ0MsOEJBQUMsS0FBSyxJQUFOO0FBQ0MsaUJBQVksaUJBQVo7QUFDQSxtQkFBZSxJQUFmO0FBQ0EsaUNBQTZCLEtBQTdCO0FBQ0EsZ0JBQVk7WUFBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLEtBQXpCO0tBQUg7QUFDWixjQUFVLDhCQUFDLE9BQUQsT0FBVjtBQUNBLGlCQUNDLGNBQUksR0FBSixDQUFRLEdBQVIsQ0FBWSxhQUFHO0FBQ2QsWUFDQyw4QkFBQyxLQUFLLElBQU4sSUFBVyxhQUFhLEVBQUUsSUFBRixFQUFRLFVBQVEsRUFBRSxHQUFGO0FBQ3ZDLGdCQUFVLDJDQUFWO0FBQ0EsaUJBQVcsOEJBQUMsUUFBRCxPQUFYO0FBQ0EsZUFBUztjQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsVUFBZ0MsQ0FBQyxjQUFJLE9BQUosR0FBWSxDQUFaLENBQUQsQ0FBZ0IsSUFBaEI7T0FBcEMsRUFIVixDQURELENBRGM7S0FBSCxDQURiO0lBTkQsQ0FERCxDQURLOzs7Ozs7O09Bb0JDLGVBQWE7QUFDbkIsU0FBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3VudFwiXHJcbmltcG9ydCBBcHAgZnJvbSBcIi4vZGIvYXBwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQWNjb3VudHtcclxuXHRtb3JlKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8TGlzdC5JdGVtIFxyXG5cdFx0XHRcdHByaW1hcnlUZXh0PVwiQ3JlYXRlIFFpTGkgYXBwXCJcclxuXHRcdFx0XHRpbml0aWFsbHlPcGVuPXt0cnVlfVxyXG5cdFx0XHRcdGF1dG9HZW5lcmF0ZU5lc3RlZEluZGljYXRvcj17ZmFsc2V9XHJcblx0XHRcdFx0b25Ub3VjaFRhcD17YT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwiYXBwXCIpfVxyXG5cdFx0XHRcdGxlZnRJY29uPXs8SWNvbkFkZC8+fVxyXG5cdFx0XHRcdG5lc3RlZEl0ZW1zPXtcclxuXHRcdFx0XHRcdEFwcC5hbGwubWFwKGE9PntcclxuXHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXthLm5hbWV9IGtleT17YCR7YS5faWR9YH1cclxuXHRcdFx0XHRcdFx0XHRcdGxlZnRJY29uPXs8c3Bhbi8+fVxyXG5cdFx0XHRcdFx0XHRcdFx0cmlnaHRJY29uPXs8SWNvbkl0ZW0vPn1cclxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGFwcC8keyhBcHAuY3VycmVudD1hKS5uYW1lfWApfS8+XHJcblx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQvPilcclxuXHR9XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufSJdfQ==