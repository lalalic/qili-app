"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require(".");

var _materialUi = require("material-ui");

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _settings = require("material-ui/svg-icons/action/settings");

var _settings2 = _interopRequireDefault(_settings);

var _addCircleOutline = require("material-ui/svg-icons/content/add-circle-outline");

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _.UI.List;
var Photo = _.UI.Photo;
var CommandBar = _.UI.CommandBar;

var Mine = function (_Component) {
	_inherits(Mine, _Component);

	function Mine() {
		_classCallCheck(this, Mine);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Mine).apply(this, arguments));
	}

	_createClass(Mine, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var user = _.User.current,
			    router = this.context.router,
			    avatar;
			if (user.photo) avatar = _.React.createElement(_materialUi.Avatar, { src: user.photo });else {
				avatar = _.React.createElement(Photo, {
					onPhoto: function onPhoto(url) {
						user.photo = url;_.User.upsert(user);
					},
					iconRatio: 2 / 3, width: 40, height: 40 });
			}

			return _.React.createElement(
				"div",
				null,
				_.React.createElement(
					List,
					null,
					_.React.createElement(List.Item, { primaryText: user.name || user.username,
						leftAvatar: avatar,
						rightIcon: _.React.createElement(_keyboardArrowRight2.default, null),
						onClick: function onClick(e) {
							return _this2.context.router.push('my/profile');
						}
					}),
					_.React.createElement(List.Divider, { inset: true }),
					this.more(),
					_.React.createElement(List.Divider, { inset: true }),
					_.React.createElement(List.Item, { primaryText: "设置",
						leftIcon: _.React.createElement(_settings2.default, null),
						rightIcon: _.React.createElement(_keyboardArrowRight2.default, null),
						onClick: function onClick(e) {
							return _this2.context.router.push('my/setting');
						}
					})
				)
			);
		}
	}, {
		key: "more",
		value: function more() {
			return this.apps();
		}
	}, {
		key: "apps",
		value: function apps() {
			var _this3 = this;

			return _.React.createElement(List.Item, {
				primaryText: "Create QiLi app",
				initiallyOpen: true,
				autoGenerateNestedIndicator: false,
				onTouchTap: function onTouchTap(a) {
					return _this3.context.router.push("app");
				},
				leftIcon: _.React.createElement(_addCircleOutline2.default, null),
				nestedItems: _app2.default.all.map(function (a) {
					return _.React.createElement(List.Item, { primaryText: a.name, key: "" + a._id,
						leftIcon: _.React.createElement("span", null),
						rightIcon: _.React.createElement(_keyboardArrowRight2.default, null),
						onClick: function onClick() {
							return _this3.context.router.push("app/" + (_app2.default.current = a).name);
						} });
				})
			});
		}
	}]);

	return Mine;
}(_.Component);

Mine.contextTypes = {
	router: _.React.PropTypes.object
};
exports.default = Mine;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9taW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBS0E7Ozs7Ozs7Ozs7OztJQUZPO0lBQU07SUFBTzs7SUFJQzs7Ozs7Ozs7Ozs7MkJBQ1Q7OztBQUNKLE9BQUksT0FBSyxPQUFLLE9BQUw7T0FDYixTQUFPLEtBQUssT0FBTCxDQUFhLE1BQWI7T0FDUCxNQUZJLENBREk7QUFJSixPQUFHLEtBQUssS0FBTCxFQUNDLFNBQU8sNENBQVEsS0FBSyxLQUFLLEtBQUwsRUFBYixDQUFQLENBREosS0FFSztBQUNELGFBQU8sc0JBQUMsS0FBRDtBQUNILGNBQVMsaUJBQUMsR0FBRCxFQUFPO0FBQUMsV0FBSyxLQUFMLEdBQVcsR0FBWCxDQUFELE1BQWdCLENBQUssTUFBTCxDQUFZLElBQVosRUFBaEI7TUFBUDtBQUNULGdCQUFXLElBQUUsQ0FBRixFQUFLLE9BQU8sRUFBUCxFQUFXLFFBQVEsRUFBUixFQUZ4QixDQUFQLENBREM7SUFGTDs7QUFRQSxVQUNJOzs7SUFDSTtBQUFDLFNBQUQ7O0tBQ0ksc0JBQUMsS0FBSyxJQUFOLElBQVcsYUFBYSxLQUFLLElBQUwsSUFBVyxLQUFLLFFBQUw7QUFDL0Isa0JBQVksTUFBWjtBQUNBLGlCQUFXLHlEQUFYO0FBQ2xCLGVBQVM7Y0FBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLFlBQXpCO09BQUg7TUFISyxDQURKO0tBT0ksc0JBQUMsS0FBSyxPQUFOLElBQWMsT0FBTyxJQUFQLEVBQWQsQ0FQSjtLQVNWLEtBQUssSUFBTCxFQVRVO0tBV0ksc0JBQUMsS0FBSyxPQUFOLElBQWMsT0FBTyxJQUFQLEVBQWQsQ0FYSjtLQWFJLHNCQUFDLEtBQUssSUFBTixJQUFXLGFBQVksSUFBWjtBQUNQLGdCQUFVLCtDQUFWO0FBQ2xCLGlCQUFXLHlEQUFYO0FBQ2tCLGVBQVM7Y0FBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLFlBQXpCO09BQUg7TUFIYixDQWJKO0tBREo7SUFESixDQVpJOzs7O3lCQXNDTDtBQUNMLFVBQU8sS0FBSyxJQUFMLEVBQVAsQ0FESzs7Ozt5QkFJQTs7O0FBQ0wsVUFDQyxzQkFBQyxLQUFLLElBQU47QUFDQyxpQkFBWSxpQkFBWjtBQUNBLG1CQUFlLElBQWY7QUFDQSxpQ0FBNkIsS0FBN0I7QUFDQSxnQkFBWTtZQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsS0FBekI7S0FBSDtBQUNaLGNBQVUsdURBQVY7QUFDQSxpQkFDQyxjQUFJLEdBQUosQ0FBUSxHQUFSLENBQVksYUFBRztBQUNkLFlBQ0Msc0JBQUMsS0FBSyxJQUFOLElBQVcsYUFBYSxFQUFFLElBQUYsRUFBUSxVQUFRLEVBQUUsR0FBRjtBQUN2QyxnQkFBVSxtQ0FBVjtBQUNBLGlCQUFXLHlEQUFYO0FBQ0EsZUFBUztjQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsVUFBZ0MsQ0FBQyxjQUFJLE9BQUosR0FBWSxDQUFaLENBQUQsQ0FBZ0IsSUFBaEI7T0FBcEMsRUFIVixDQURELENBRGM7S0FBSCxDQURiO0lBTkQsQ0FERCxDQURLOzs7O1FBM0NjOzs7S0FnRWIsZUFBYTtBQUNuQixTQUFPLFFBQU0sU0FBTixDQUFnQixNQUFoQjs7a0JBakVZIiwiZmlsZSI6Im1pbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJLCBVc2VyfSBmcm9tIFwiLlwiXHJcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IFJpZ2h0QXJyb3cgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgU2V0dGluZ0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZXR0aW5ncydcclxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZC1jaXJjbGUtb3V0bGluZVwiXHJcbmltcG9ydCBJY29uSXRlbSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0XCJcclxuXHJcbmNvbnN0IHtMaXN0LCBQaG90bywgQ29tbWFuZEJhcn09VUlcclxuXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9kYi9hcHAnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaW5lIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgdmFyIHVzZXI9VXNlci5jdXJyZW50XHJcblx0XHRcdCxyb3V0ZXI9dGhpcy5jb250ZXh0LnJvdXRlclxyXG5cdFx0XHQsYXZhdGFyXHJcbiAgICAgICAgaWYodXNlci5waG90bylcclxuICAgICAgICAgICAgYXZhdGFyPTxBdmF0YXIgc3JjPXt1c2VyLnBob3RvfS8+XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF2YXRhcj08UGhvdG9cclxuICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT57dXNlci5waG90bz11cmw7VXNlci51cHNlcnQodXNlcil9fVxyXG4gICAgICAgICAgICAgICAgaWNvblJhdGlvPXsyLzN9IHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0vPlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxMaXN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e3VzZXIubmFtZXx8dXNlci51c2VybmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17YXZhdGFyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodEljb249ezxSaWdodEFycm93Lz59IFxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ215L3Byb2ZpbGUnKX1cdFxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5EaXZpZGVyIGluc2V0PXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdFx0e3RoaXMubW9yZSgpfVxyXG5cdFx0XHRcdFx0XHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuRGl2aWRlciBpbnNldD17dHJ1ZX0vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi6K6+572uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEljb249ezxTZXR0aW5nSWNvbi8+fVxyXG5cdFx0XHRcdFx0XHRyaWdodEljb249ezxSaWdodEFycm93Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnbXkvc2V0dGluZycpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9MaXN0PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblx0XHJcblx0XHJcblx0bW9yZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYXBwcygpXHJcblx0fVxyXG5cdFxyXG5cdGFwcHMoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxMaXN0Lkl0ZW0gXHJcblx0XHRcdFx0cHJpbWFyeVRleHQ9XCJDcmVhdGUgUWlMaSBhcHBcIlxyXG5cdFx0XHRcdGluaXRpYWxseU9wZW49e3RydWV9XHJcblx0XHRcdFx0YXV0b0dlbmVyYXRlTmVzdGVkSW5kaWNhdG9yPXtmYWxzZX1cclxuXHRcdFx0XHRvblRvdWNoVGFwPXthPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJhcHBcIil9XHJcblx0XHRcdFx0bGVmdEljb249ezxJY29uQWRkLz59XHJcblx0XHRcdFx0bmVzdGVkSXRlbXM9e1xyXG5cdFx0XHRcdFx0QXBwLmFsbC5tYXAoYT0+e1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e2EubmFtZX0ga2V5PXtgJHthLl9pZH1gfVxyXG5cdFx0XHRcdFx0XHRcdFx0bGVmdEljb249ezxzcGFuLz59XHJcblx0XHRcdFx0XHRcdFx0XHRyaWdodEljb249ezxJY29uSXRlbS8+fVxyXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgYXBwLyR7KEFwcC5jdXJyZW50PWEpLm5hbWV9YCl9Lz5cclxuXHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdC8+KVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==