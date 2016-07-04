'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _class, _temp;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

var _materialUi = require('material-ui');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _dashboard = require('material-ui/svg-icons/action/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _cloud = require('material-ui/svg-icons/file/cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _assignment = require('material-ui/svg-icons/action/assignment');

var _assignment2 = _interopRequireDefault(_assignment);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _settings = require('material-ui/svg-icons/action/settings');

var _settings2 = _interopRequireDefault(_settings);

var _addCircleOutline = require('material-ui/svg-icons/content/add-circle-outline');

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _keyboardArrowRight = require('material-ui/svg-icons/hardware/keyboard-arrow-right');

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _.UI.CommandBar;
var List = _.UI.List;
var Empty = _.UI.Empty;
var Command = CommandBar.Command;
var DialogCommand = CommandBar.DialogCommand;

var Dashboard = function (_Component) {
	_inherits(Dashboard, _Component);

	function Dashboard() {
		_classCallCheck(this, Dashboard);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).apply(this, arguments));
	}

	_createClass(Dashboard, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(Empty, { icon: _react2.default.createElement(_cloud2.default, null), text: 'Welcome to Qili' }),
				_react2.default.createElement(CommandBar, { className: 'footbar', onSelect: function onSelect(cmd) {
						return _this2.context.router.push(cmd.toLowerCase());
					},
					items: [{ action: "Data", icon: _dashboard2.default }, { action: "Cloud", icon: _cloud2.default }, { action: "Log", icon: _assignment2.default }, { action: "More", icon: _moreVert2.default, onSelect: function onSelect() {
							return _this2.refs.more.show();
						} }]
				}),
				_react2.default.createElement(Dashboard.MoreActions, { ref: 'more' })
			);
		}
	}]);

	return Dashboard;
}(_react.Component);

Dashboard.contextTypes = { router: _react2.default.PropTypes.object };
Dashboard.MoreActions = (_temp = _class = function (_DialogCommand) {
	_inherits(_class, _DialogCommand);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'renderContent',
		value: function renderContent() {
			var _this4 = this;

			return _react2.default.createElement(
				List,
				null,
				_react2.default.createElement(List.Item, { primaryText: 'Setting', style: { textAlign: 'left' },
					leftIcon: _react2.default.createElement(_settings2.default, null),
					key: 'setting',
					onClick: function onClick() {
						return _this4.context.router.push('app/' + _this4.context.app.name);
					} }),
				_react2.default.createElement(List.Divider, { key: 1, inset: true }),
				_react2.default.createElement(List.Item, {
					primaryText: 'create more qili app',
					initiallyOpen: true,
					autoGenerateNestedIndicator: false,
					onTouchTap: function onTouchTap(a) {
						return _this4.context.router.push("app");
					},
					leftIcon: _react2.default.createElement(_addCircleOutline2.default, null),
					nestedItems: _app2.default.all.map(function (a) {
						return _react2.default.createElement(List.Item, { primaryText: a.name, key: '' + a._id,
							leftIcon: _react2.default.createElement('span', null),
							rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
							onClick: function onClick() {
								return _this4.context.router.push('app/' + (_app2.default.current = a).name);
							} });
					})
				})
			);
		}
	}]);

	return _class;
}(DialogCommand), _class.contextTypes = {
	router: _react2.default.PropTypes.object,
	app: _react2.default.PropTypes.object
}, _temp);
exports.default = Dashboard;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU87SUFBWTtJQUFNO0lBQ2xCLFVBQXdCLFdBQXhCO0lBQVMsZ0JBQWUsV0FBZjs7SUFFSzs7Ozs7Ozs7Ozs7MkJBQ1Q7OztBQUNKLFVBQ0w7OztJQUNhLDhCQUFDLEtBQUQsSUFBTyxNQUFNLG9EQUFOLEVBQWdCLE1BQUssaUJBQUwsRUFBdkIsQ0FEYjtJQUVDLDhCQUFDLFVBQUQsSUFBYSxXQUFVLFNBQVYsRUFBb0IsVUFBVTthQUFLLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBSSxXQUFKLEVBQXpCO01BQUw7QUFDMUMsWUFBTyxDQUNZLEVBQUMsUUFBTyxNQUFQLEVBQWUseUJBQWhCLEVBRFosRUFFWSxFQUFDLFFBQU8sT0FBUCxFQUFnQixxQkFBakIsRUFGWixFQUdZLEVBQUMsUUFBTyxLQUFQLEVBQWMsMEJBQWYsRUFIWixFQUlZLEVBQUMsUUFBTyxNQUFQLEVBQWUsd0JBQWhCLEVBQTJCLFVBQVM7Y0FBSSxPQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsSUFBZjtPQUFKLEVBSmhELENBQVA7S0FERCxDQUZEO0lBVWEsOEJBQUMsVUFBVSxXQUFYLElBQXVCLEtBQUksTUFBSixFQUF2QixDQVZiO0lBREssQ0FESTs7OztRQURTOzs7VUFrQmIsZUFBYSxFQUFDLFFBQU8sZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQWxCUixVQW9CYjs7Ozs7Ozs7Ozs7a0NBQ1M7OztBQUNkLFVBQ0M7QUFBQyxRQUFEOztJQUNDLDhCQUFDLEtBQUssSUFBTixJQUFXLGFBQVksU0FBWixFQUFzQixPQUFPLEVBQUMsV0FBVSxNQUFWLEVBQVI7QUFDaEMsZUFBVSx1REFBVjtBQUNBLFVBQUksU0FBSjtBQUNBLGNBQVM7YUFBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLFVBQWdDLE9BQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUIsSUFBakI7TUFBcEMsRUFIVixDQUREO0lBTUMsOEJBQUMsS0FBSyxPQUFOLElBQWMsS0FBSyxDQUFMLEVBQVEsT0FBTyxJQUFQLEVBQXRCLENBTkQ7SUFRQyw4QkFBQyxLQUFLLElBQU47QUFDQyxrQkFBWSxzQkFBWjtBQUNBLG9CQUFlLElBQWY7QUFDQSxrQ0FBNkIsS0FBN0I7QUFDQSxpQkFBWTthQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsS0FBekI7TUFBSDtBQUNaLGVBQVUsK0RBQVY7QUFDQSxrQkFDQyxjQUFJLEdBQUosQ0FBUSxHQUFSLENBQVksYUFBRztBQUNkLGFBQ0MsOEJBQUMsS0FBSyxJQUFOLElBQVcsYUFBYSxFQUFFLElBQUYsRUFBUSxVQUFRLEVBQUUsR0FBRjtBQUN2QyxpQkFBVSwyQ0FBVjtBQUNBLGtCQUFXLGlFQUFYO0FBQ0EsZ0JBQVM7ZUFBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLFVBQWdDLENBQUMsY0FBSSxPQUFKLEdBQVksQ0FBWixDQUFELENBQWdCLElBQWhCO1FBQXBDLEVBSFYsQ0FERCxDQURjO01BQUgsQ0FEYjtLQU5ELENBUkQ7SUFERCxDQURjOzs7OztFQURrQix1QkErQjFCLGVBQWE7QUFDbkIsU0FBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1AsTUFBSyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCOztrQkFyRGEiLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VUksIFVzZXJ9IGZyb20gJy4nXG5pbXBvcnQge0F2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgQXBwIGZyb20gJy4vZGIvYXBwJ1xuXG5pbXBvcnQgRGF0YSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kYXNoYm9hcmRcIlxuaW1wb3J0IENsb3VkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZFwiXG5pbXBvcnQgTG9nIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Fzc2lnbm1lbnRcIlxuaW1wb3J0IE1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5pbXBvcnQgSWNvblNldHRpbmdzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3NldHRpbmdzXCJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQtY2lyY2xlLW91dGxpbmVcIlxuaW1wb3J0IEljb25JdGVtIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHRcIlxuXG5jb25zdCB7Q29tbWFuZEJhciwgTGlzdCwgRW1wdHl9PVVJXG5jb25zdCB7Q29tbWFuZCwgRGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuICAgICAgICAgICAgICAgIDxFbXB0eSBpY29uPXs8Q2xvdWQvPn0gdGV4dD1cIldlbGNvbWUgdG8gUWlsaVwiLz5cblx0XHRcdFx0PENvbW1hbmRCYXIgIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBvblNlbGVjdD17Y21kPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goY21kLnRvTG93ZXJDYXNlKCkpfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiRGF0YVwiLCBpY29uOkRhdGF9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkNsb3VkXCIsIGljb246Q2xvdWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkxvZ1wiLCBpY29uOkxvZ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiTW9yZVwiLCBpY29uOk1vcmUsIG9uU2VsZWN0OigpPT50aGlzLnJlZnMubW9yZS5zaG93KCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuXHRcdFx0XHRcdC8+XG4gICAgICAgICAgICAgICAgPERhc2hib2FyZC5Nb3JlQWN0aW9ucyByZWY9XCJtb3JlXCIvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuICAgIH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXHRcblx0c3RhdGljIE1vcmVBY3Rpb25zPWNsYXNzICBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PExpc3Q+XG5cdFx0XHRcdFx0PExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIlNldHRpbmdcIiBzdHlsZT17e3RleHRBbGlnbjonbGVmdCd9fVxuXHRcdFx0XHRcdFx0bGVmdEljb249ezxJY29uU2V0dGluZ3MvPn1cblx0XHRcdFx0XHRcdGtleT1cInNldHRpbmdcIlxuXHRcdFx0XHRcdFx0b25DbGljaz17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgYXBwLyR7dGhpcy5jb250ZXh0LmFwcC5uYW1lfWApfS8+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PExpc3QuRGl2aWRlciBrZXk9ezF9IGluc2V0PXt0cnVlfS8+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PExpc3QuSXRlbSBcblx0XHRcdFx0XHRcdHByaW1hcnlUZXh0PVwiY3JlYXRlIG1vcmUgcWlsaSBhcHBcIlxuXHRcdFx0XHRcdFx0aW5pdGlhbGx5T3Blbj17dHJ1ZX1cblx0XHRcdFx0XHRcdGF1dG9HZW5lcmF0ZU5lc3RlZEluZGljYXRvcj17ZmFsc2V9XG5cdFx0XHRcdFx0XHRvblRvdWNoVGFwPXthPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJhcHBcIil9XG5cdFx0XHRcdFx0XHRsZWZ0SWNvbj17PEljb25BZGQvPn1cblx0XHRcdFx0XHRcdG5lc3RlZEl0ZW1zPXtcblx0XHRcdFx0XHRcdFx0QXBwLmFsbC5tYXAoYT0+e1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXthLm5hbWV9IGtleT17YCR7YS5faWR9YH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0bGVmdEljb249ezxzcGFuLz59XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJpZ2h0SWNvbj17PEljb25JdGVtLz59XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGFwcC8keyhBcHAuY3VycmVudD1hKS5uYW1lfWApfS8+XG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvTGlzdD5cblx0XHRcdClcblx0XHR9XG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0XHRcdGFwcDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHRcdH1cblx0fVxufSJdfQ==