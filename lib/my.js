"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _settings = require("material-ui/svg-icons/action/settings");

var _settings2 = _interopRequireDefault(_settings);

var _addCircleOutline = require("material-ui/svg-icons/content/add-circle-outline");

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _list = require("./components/list");

var _list2 = _interopRequireDefault(_list);

var _photo = require("./components/photo");

var _photo2 = _interopRequireDefault(_photo);

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

var _user = require("./db/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

			var user = _user2.default.current,
			    router = this.context.router,
			    avatar;
			if (user.photo) avatar = _react2.default.createElement(_materialUi.Avatar, { src: user.photo });else {
				avatar = _react2.default.createElement(_photo2.default, {
					onPhoto: function onPhoto(url) {
						user.photo = url;_user2.default.upsert(user);
					},
					iconRatio: 2 / 3, width: 40, height: 40 });
			}

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_list2.default,
					null,
					_react2.default.createElement(_list2.default.Item, { primaryText: user.name || user.username,
						leftAvatar: avatar,
						rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
						onClick: function onClick(e) {
							return _this2.context.router.push('my/profile');
						}
					}),
					_react2.default.createElement(_list2.default.Divider, { inset: true }),
					this.more(),
					_react2.default.createElement(_list2.default.Divider, { inset: true }),
					_react2.default.createElement(_list2.default.Item, { primaryText: "设置",
						leftIcon: _react2.default.createElement(_settings2.default, null),
						rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
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

			return _react2.default.createElement(_list2.default.Item, {
				primaryText: "Create QiLi app",
				initiallyOpen: true,
				autoGenerateNestedIndicator: false,
				onTouchTap: function onTouchTap(a) {
					return _this3.context.router.push("app");
				},
				leftIcon: _react2.default.createElement(_addCircleOutline2.default, null),
				nestedItems: _app2.default.all.map(function (a) {
					return _react2.default.createElement(_list2.default.Item, { primaryText: a.name, key: "" + a._id,
						leftIcon: _react2.default.createElement("span", null),
						rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
						onClick: function onClick() {
							return _this3.context.router.push("app/" + (_app2.default.current = a).name);
						} });
				})
			});
		}
	}]);

	return Mine;
}(_react.Component);

Mine.contextTypes = {
	router: _react2.default.PropTypes.object
};
exports.default = Mine;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9teS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7MkJBQ1Q7OztBQUNKLE9BQUksT0FBSyxlQUFLLE9BQUw7T0FDYixTQUFPLEtBQUssT0FBTCxDQUFhLE1BQWI7T0FDUCxNQUZJLENBREk7QUFJSixPQUFHLEtBQUssS0FBTCxFQUNDLFNBQU8sb0RBQVEsS0FBSyxLQUFLLEtBQUwsRUFBYixDQUFQLENBREosS0FFSztBQUNELGFBQU87QUFDSCxjQUFTLGlCQUFDLEdBQUQsRUFBTztBQUFDLFdBQUssS0FBTCxHQUFXLEdBQVgsQ0FBRCxjQUFnQixDQUFLLE1BQUwsQ0FBWSxJQUFaLEVBQWhCO01BQVA7QUFDVCxnQkFBVyxJQUFFLENBQUYsRUFBSyxPQUFPLEVBQVAsRUFBVyxRQUFRLEVBQVIsRUFGeEIsQ0FBUCxDQURDO0lBRkw7O0FBUUEsVUFDSTs7O0lBQ0k7OztLQUNJLDZDQUFNLElBQU4sSUFBVyxhQUFhLEtBQUssSUFBTCxJQUFXLEtBQUssUUFBTDtBQUMvQixrQkFBWSxNQUFaO0FBQ0EsaUJBQVcsaUVBQVg7QUFDbEIsZUFBUztjQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsWUFBekI7T0FBSDtNQUhLLENBREo7S0FPSSw2Q0FBTSxPQUFOLElBQWMsT0FBTyxJQUFQLEVBQWQsQ0FQSjtLQVNWLEtBQUssSUFBTCxFQVRVO0tBV0ksNkNBQU0sT0FBTixJQUFjLE9BQU8sSUFBUCxFQUFkLENBWEo7S0FhSSw2Q0FBTSxJQUFOLElBQVcsYUFBWSxJQUFaO0FBQ1AsZ0JBQVUsdURBQVY7QUFDbEIsaUJBQVcsaUVBQVg7QUFDa0IsZUFBUztjQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsWUFBekI7T0FBSDtNQUhiLENBYko7S0FESjtJQURKLENBWkk7Ozs7eUJBc0NMO0FBQ0wsVUFBTyxLQUFLLElBQUwsRUFBUCxDQURLOzs7O3lCQUlBOzs7QUFDTCxVQUNDLDZDQUFNLElBQU47QUFDQyxpQkFBWSxpQkFBWjtBQUNBLG1CQUFlLElBQWY7QUFDQSxpQ0FBNkIsS0FBN0I7QUFDQSxnQkFBWTtZQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsS0FBekI7S0FBSDtBQUNaLGNBQVUsK0RBQVY7QUFDQSxpQkFDQyxjQUFJLEdBQUosQ0FBUSxHQUFSLENBQVksYUFBRztBQUNkLFlBQ0MsNkNBQU0sSUFBTixJQUFXLGFBQWEsRUFBRSxJQUFGLEVBQVEsVUFBUSxFQUFFLEdBQUY7QUFDdkMsZ0JBQVUsMkNBQVY7QUFDQSxpQkFBVyxpRUFBWDtBQUNBLGVBQVM7Y0FBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLFVBQWdDLENBQUMsY0FBSSxPQUFKLEdBQVksQ0FBWixDQUFELENBQWdCLElBQWhCO09BQXBDLEVBSFYsQ0FERCxDQURjO0tBQUgsQ0FEYjtJQU5ELENBREQsQ0FESzs7OztRQTNDYzs7O0tBZ0ViLGVBQWE7QUFDbkIsU0FBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCOztrQkFqRVkiLCJmaWxlIjoibXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgUmlnaHRBcnJvdyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHQnXHJcbmltcG9ydCBTZXR0aW5nSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3NldHRpbmdzJ1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkLWNpcmNsZS1vdXRsaW5lXCJcclxuaW1wb3J0IEljb25JdGVtIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHRcIlxyXG5cclxuaW1wb3J0IExpc3QgZnJvbSBcIi4vY29tcG9uZW50cy9saXN0XCJcclxuaW1wb3J0IFBob3RvIGZyb20gXCIuL2NvbXBvbmVudHMvcGhvdG9cIlxyXG5pbXBvcnQgQXBwIGZyb20gJy4vZGIvYXBwJ1xyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi9kYi91c2VyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmUgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXIgdXNlcj1Vc2VyLmN1cnJlbnRcclxuXHRcdFx0LHJvdXRlcj10aGlzLmNvbnRleHQucm91dGVyXHJcblx0XHRcdCxhdmF0YXJcclxuICAgICAgICBpZih1c2VyLnBob3RvKVxyXG4gICAgICAgICAgICBhdmF0YXI9PEF2YXRhciBzcmM9e3VzZXIucGhvdG99Lz5cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXZhdGFyPTxQaG90b1xyXG4gICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9Pnt1c2VyLnBob3RvPXVybDtVc2VyLnVwc2VydCh1c2VyKX19XHJcbiAgICAgICAgICAgICAgICBpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfS8+XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPExpc3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD17dXNlci5uYW1lfHx1c2VyLnVzZXJuYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXthdmF0YXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn0gXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnbXkvcHJvZmlsZScpfVx0XHJcblx0XHRcdFx0XHRcdC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0XHR7dGhpcy5tb3JlKCl9XHJcblx0XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5EaXZpZGVyIGluc2V0PXt0cnVlfS8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLorr7nva5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PFNldHRpbmdJY29uLz59XHJcblx0XHRcdFx0XHRcdHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdteS9zZXR0aW5nJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0xpc3Q+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHRcclxuXHRcclxuXHRtb3JlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5hcHBzKClcclxuXHR9XHJcblx0XHJcblx0YXBwcygpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PExpc3QuSXRlbSBcclxuXHRcdFx0XHRwcmltYXJ5VGV4dD1cIkNyZWF0ZSBRaUxpIGFwcFwiXHJcblx0XHRcdFx0aW5pdGlhbGx5T3Blbj17dHJ1ZX1cclxuXHRcdFx0XHRhdXRvR2VuZXJhdGVOZXN0ZWRJbmRpY2F0b3I9e2ZhbHNlfVxyXG5cdFx0XHRcdG9uVG91Y2hUYXA9e2E9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImFwcFwiKX1cclxuXHRcdFx0XHRsZWZ0SWNvbj17PEljb25BZGQvPn1cclxuXHRcdFx0XHRuZXN0ZWRJdGVtcz17XHJcblx0XHRcdFx0XHRBcHAuYWxsLm1hcChhPT57XHJcblx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0PExpc3QuSXRlbSBwcmltYXJ5VGV4dD17YS5uYW1lfSBrZXk9e2Ake2EuX2lkfWB9XHJcblx0XHRcdFx0XHRcdFx0XHRsZWZ0SWNvbj17PHNwYW4vPn1cclxuXHRcdFx0XHRcdFx0XHRcdHJpZ2h0SWNvbj17PEljb25JdGVtLz59XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBhcHAvJHsoQXBwLmN1cnJlbnQ9YSkubmFtZX1gKX0vPlxyXG5cdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0Lz4pXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuIl19