'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

var _dashboard = require('material-ui/svg-icons/action/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _cloud = require('material-ui/svg-icons/file/cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _assignment = require('material-ui/svg-icons/action/assignment');

var _assignment2 = _interopRequireDefault(_assignment);

var _accountBox = require('material-ui/svg-icons/action/account-box');

var _accountBox2 = _interopRequireDefault(_accountBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _.UI.CommandBar;
var Empty = _.UI.Empty;

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
				_react2.default.createElement(CommandBar, { className: 'footbar',
					onSelect: function onSelect(cmd) {
						return _this2.context.router.push(cmd.toLowerCase());
					},
					items: [{ action: "Data", icon: _dashboard2.default }, { action: "Cloud", icon: _cloud2.default }, { action: "Log", icon: _assignment2.default }, { action: "My", icon: _accountBox2.default }]
				})
			);
		}
	}]);

	return Dashboard;
}(_react.Component);

Dashboard.contextTypes = { router: _react2.default.PropTypes.object };
exports.default = Dashboard;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFTztJQUFZOztJQUVFOzs7Ozs7Ozs7OzsyQkFDVDs7O0FBQ0osVUFDTDs7O0lBQ2EsOEJBQUMsS0FBRCxJQUFPLE1BQU0sb0RBQU4sRUFBZ0IsTUFBSyxpQkFBTCxFQUF2QixDQURiO0lBRUMsOEJBQUMsVUFBRCxJQUFhLFdBQVUsU0FBVjtBQUNaLGVBQVU7YUFBSyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLElBQUksV0FBSixFQUF6QjtNQUFMO0FBQ1YsWUFBTyxDQUNZLEVBQUMsUUFBTyxNQUFQLEVBQWUseUJBQWhCLEVBRFosRUFFWSxFQUFDLFFBQU8sT0FBUCxFQUFnQixxQkFBakIsRUFGWixFQUdZLEVBQUMsUUFBTyxLQUFQLEVBQWMsMEJBQWYsRUFIWixFQUlOLEVBQUMsUUFBTyxJQUFQLEVBQWEsMEJBQWQsRUFKTSxDQUFQO0tBRkQsQ0FGRDtJQURLLENBREk7Ozs7UUFEUzs7O1VBa0JiLGVBQWEsRUFBQyxRQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7a0JBbEJSIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1VJfSBmcm9tICcuJ1xuXG5pbXBvcnQgRGF0YSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kYXNoYm9hcmRcIlxuaW1wb3J0IENsb3VkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZFwiXG5pbXBvcnQgTG9nIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Fzc2lnbm1lbnRcIlxuXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcblxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5fT1VSVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuICAgICAgICAgICAgICAgIDxFbXB0eSBpY29uPXs8Q2xvdWQvPn0gdGV4dD1cIldlbGNvbWUgdG8gUWlsaVwiLz5cblx0XHRcdFx0PENvbW1hbmRCYXIgIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBcblx0XHRcdFx0XHRvblNlbGVjdD17Y21kPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goY21kLnRvTG93ZXJDYXNlKCkpfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiRGF0YVwiLCBpY29uOkRhdGF9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkNsb3VkXCIsIGljb246Q2xvdWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkxvZ1wiLCBpY29uOkxvZ30sXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiTXlcIiwgaWNvbjpJY29uQWNjb3VudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcbiAgICB9XG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblx0XG59Il19