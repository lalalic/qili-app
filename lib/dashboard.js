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
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(newProps) {
			return this.props.app != newProps.app;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(Empty, { icon: _react2.default.createElement(_cloud2.default, null), text: 'Welcome' }),
				_react2.default.createElement(CommandBar, { className: 'footbar', onSelect: function onSelect(cmd) {
						return _this2.context.router.push(cmd.toLowerCase());
					},
					items: [{ action: "Data", icon: _dashboard2.default }, { action: "Cloud", icon: _cloud2.default }, { action: "Log", icon: _assignment2.default }, { action: "More", icon: _moreVert2.default, onSelect: function onSelect() {
							return _this2.refs.more.show();
						} }]
				}),
				_react2.default.createElement(Dashboard.MoreActions, { ref: 'more', app: this.props.app })
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
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return true;
		}
	}, {
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
						return _this4.context.router.push('app/' + _this4.props.app.name);
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
}(DialogCommand), _class.contextTypes = { router: _react2.default.PropTypes.object }, _temp);
exports.default = Dashboard;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU87SUFBWTtJQUFNO0lBQ2xCLFVBQXdCLFdBQXhCO0lBQVMsZ0JBQWUsV0FBZjs7SUFFSzs7Ozs7Ozs7Ozs7d0NBQ0ssVUFBUztBQUMzQixVQUFPLEtBQUssS0FBTCxDQUFXLEdBQVgsSUFBZ0IsU0FBUyxHQUFULENBREk7Ozs7MkJBSXZCOzs7QUFDSixVQUNMOzs7SUFDYSw4QkFBQyxLQUFELElBQU8sTUFBTSxvREFBTixFQUFnQixNQUFLLFNBQUwsRUFBdkIsQ0FEYjtJQUVDLDhCQUFDLFVBQUQsSUFBYSxXQUFVLFNBQVYsRUFBb0IsVUFBVTthQUFLLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBSSxXQUFKLEVBQXpCO01BQUw7QUFDMUMsWUFBTyxDQUNZLEVBQUMsUUFBTyxNQUFQLEVBQWUseUJBQWhCLEVBRFosRUFFWSxFQUFDLFFBQU8sT0FBUCxFQUFnQixxQkFBakIsRUFGWixFQUdZLEVBQUMsUUFBTyxLQUFQLEVBQWMsMEJBQWYsRUFIWixFQUlZLEVBQUMsUUFBTyxNQUFQLEVBQWUsd0JBQWhCLEVBQTJCLFVBQVM7Y0FBSSxPQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsSUFBZjtPQUFKLEVBSmhELENBQVA7S0FERCxDQUZEO0lBVWEsOEJBQUMsVUFBVSxXQUFYLElBQXVCLEtBQUksTUFBSixFQUFXLEtBQUssS0FBSyxLQUFMLENBQVcsR0FBWCxFQUF2QyxDQVZiO0lBREssQ0FESTs7OztRQUxTOzs7VUFzQmIsZUFBYSxFQUFDLFFBQU8sZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQXRCUixVQXdCYjs7Ozs7Ozs7Ozs7MENBQ2lCO0FBQ3RCLFVBQU8sSUFBUCxDQURzQjs7OztrQ0FJUjs7O0FBQ2QsVUFDQztBQUFDLFFBQUQ7O0lBQ0MsOEJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxTQUFaLEVBQXNCLE9BQU8sRUFBQyxXQUFVLE1BQVYsRUFBUjtBQUNoQyxlQUFVLHVEQUFWO0FBQ0EsVUFBSSxTQUFKO0FBQ0EsY0FBUzthQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsVUFBZ0MsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLElBQWY7TUFBcEMsRUFIVixDQUREO0lBTUMsOEJBQUMsS0FBSyxPQUFOLElBQWMsS0FBSyxDQUFMLEVBQVEsT0FBTyxJQUFQLEVBQXRCLENBTkQ7SUFRQyw4QkFBQyxLQUFLLElBQU47QUFDQyxrQkFBWSxzQkFBWjtBQUNBLG9CQUFlLElBQWY7QUFDQSxrQ0FBNkIsS0FBN0I7QUFDQSxpQkFBWTthQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsS0FBekI7TUFBSDtBQUNaLGVBQVUsK0RBQVY7QUFDQSxrQkFDQyxjQUFJLEdBQUosQ0FBUSxHQUFSLENBQVksYUFBRztBQUNkLGFBQ0MsOEJBQUMsS0FBSyxJQUFOLElBQVcsYUFBYSxFQUFFLElBQUYsRUFBUSxVQUFRLEVBQUUsR0FBRjtBQUN2QyxpQkFBVSwyQ0FBVjtBQUNBLGtCQUFXLGlFQUFYO0FBQ0EsZ0JBQVM7ZUFBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLFVBQWdDLENBQUMsY0FBSSxPQUFKLEdBQVksQ0FBWixDQUFELENBQWdCLElBQWhCO1FBQXBDLEVBSFYsQ0FERCxDQURjO01BQUgsQ0FEYjtLQU5ELENBUkQ7SUFERCxDQURjOzs7OztFQUxrQix1QkFtQzFCLGVBQWEsRUFBQyxRQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7a0JBM0RUIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1VJLCBVc2VyfSBmcm9tICcuJ1xuaW1wb3J0IHtBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2RiL2FwcCdcblxuaW1wb3J0IERhdGEgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGFzaGJvYXJkXCJcbmltcG9ydCBDbG91ZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWRcIlxuaW1wb3J0IExvZyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hc3NpZ25tZW50XCJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuaW1wb3J0IEljb25TZXR0aW5ncyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZXR0aW5nc1wiXG5pbXBvcnQgSWNvbkFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkLWNpcmNsZS1vdXRsaW5lXCJcbmltcG9ydCBJY29uSXRlbSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0XCJcblxuY29uc3Qge0NvbW1hbmRCYXIsIExpc3QsIEVtcHR5fT1VSVxuY29uc3Qge0NvbW1hbmQsIERpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXdQcm9wcyl7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFwcCE9bmV3UHJvcHMuYXBwXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuICAgICAgICAgICAgICAgIDxFbXB0eSBpY29uPXs8Q2xvdWQvPn0gdGV4dD1cIldlbGNvbWVcIi8+XG5cdFx0XHRcdDxDb21tYW5kQmFyICBjbGFzc05hbWU9XCJmb290YmFyXCIgb25TZWxlY3Q9e2NtZD0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGNtZC50b0xvd2VyQ2FzZSgpKX1cblx0XHRcdFx0XHRpdGVtcz17W1xuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkRhdGFcIiwgaWNvbjpEYXRhfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJDbG91ZFwiLCBpY29uOkNsb3VkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJMb2dcIiwgaWNvbjpMb2d9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIk1vcmVcIiwgaWNvbjpNb3JlLCBvblNlbGVjdDooKT0+dGhpcy5yZWZzLm1vcmUuc2hvdygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cblx0XHRcdFx0XHQvPlxuICAgICAgICAgICAgICAgIDxEYXNoYm9hcmQuTW9yZUFjdGlvbnMgcmVmPVwibW9yZVwiIGFwcD17dGhpcy5wcm9wcy5hcHB9Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcbiAgICB9XG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblx0XG5cdHN0YXRpYyBNb3JlQWN0aW9ucz1jbGFzcyAgZXh0ZW5kcyBEaWFsb2dDb21tYW5ke1xuXHRcdHNob3VsZENvbXBvbmVudFVwZGF0ZSgpe1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cblx0XHRyZW5kZXJDb250ZW50KCl7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8TGlzdD5cblx0XHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwiU2V0dGluZ1wiIHN0eWxlPXt7dGV4dEFsaWduOidsZWZ0J319XG5cdFx0XHRcdFx0XHRsZWZ0SWNvbj17PEljb25TZXR0aW5ncy8+fVxuXHRcdFx0XHRcdFx0a2V5PVwic2V0dGluZ1wiXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXsoKT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBhcHAvJHt0aGlzLnByb3BzLmFwcC5uYW1lfWApfS8+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PExpc3QuRGl2aWRlciBrZXk9ezF9IGluc2V0PXt0cnVlfS8+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0PExpc3QuSXRlbSBcblx0XHRcdFx0XHRcdHByaW1hcnlUZXh0PVwiY3JlYXRlIG1vcmUgcWlsaSBhcHBcIlxuXHRcdFx0XHRcdFx0aW5pdGlhbGx5T3Blbj17dHJ1ZX1cblx0XHRcdFx0XHRcdGF1dG9HZW5lcmF0ZU5lc3RlZEluZGljYXRvcj17ZmFsc2V9XG5cdFx0XHRcdFx0XHRvblRvdWNoVGFwPXthPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJhcHBcIil9XG5cdFx0XHRcdFx0XHRsZWZ0SWNvbj17PEljb25BZGQvPn1cblx0XHRcdFx0XHRcdG5lc3RlZEl0ZW1zPXtcblx0XHRcdFx0XHRcdFx0QXBwLmFsbC5tYXAoYT0+e1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXthLm5hbWV9IGtleT17YCR7YS5faWR9YH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0bGVmdEljb249ezxzcGFuLz59XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJpZ2h0SWNvbj17PEljb25JdGVtLz59XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGFwcC8keyhBcHAuY3VycmVudD1hKS5uYW1lfWApfS8+XG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvTGlzdD5cblx0XHRcdClcblx0XHR9XG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cdH1cbn0iXX0=