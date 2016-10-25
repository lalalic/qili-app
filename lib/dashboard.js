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

var CommandBar = _.UI.CommandBar,
    Empty = _.UI.Empty;

var Dashboard = function (_Component) {
	_inherits(Dashboard, _Component);

	function Dashboard() {
		_classCallCheck(this, Dashboard);

		return _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiRGFzaGJvYXJkIiwiY29udGV4dCIsInJvdXRlciIsInB1c2giLCJjbWQiLCJ0b0xvd2VyQ2FzZSIsImFjdGlvbiIsImljb24iLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRU9BLFUsUUFBQUEsVTtJQUFZQyxLLFFBQUFBLEs7O0lBRUVDLFM7Ozs7Ozs7Ozs7OzJCQUNUO0FBQUE7O0FBQ0osVUFDTDtBQUFBO0FBQUE7QUFDYSxrQ0FBQyxLQUFELElBQU8sTUFBTSxvREFBYixFQUF1QixNQUFLLGlCQUE1QixHQURiO0FBRUMsa0NBQUMsVUFBRCxJQUFhLFdBQVUsU0FBdkI7QUFDQyxlQUFVO0FBQUEsYUFBSyxPQUFLQyxPQUFMLENBQWFDLE1BQWIsQ0FBb0JDLElBQXBCLENBQXlCQyxJQUFJQyxXQUFKLEVBQXpCLENBQUw7QUFBQSxNQURYO0FBRUMsWUFBTyxDQUNZLEVBQUNDLFFBQU8sTUFBUixFQUFnQkMseUJBQWhCLEVBRFosRUFFWSxFQUFDRCxRQUFPLE9BQVIsRUFBaUJDLHFCQUFqQixFQUZaLEVBR1ksRUFBQ0QsUUFBTyxLQUFSLEVBQWVDLDBCQUFmLEVBSFosRUFJTixFQUFDRCxRQUFPLElBQVIsRUFBY0MsMEJBQWQsRUFKTTtBQUZSO0FBRkQsSUFESztBQWNIOzs7Ozs7QUFoQmdCUCxTLENBa0JiUSxZLEdBQWEsRUFBQ04sUUFBTyxnQkFBTU8sU0FBTixDQUFnQkMsTUFBeEIsRTtrQkFsQkFWLFMiLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VUl9IGZyb20gJy4nXG5cbmltcG9ydCBEYXRhIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Rhc2hib2FyZFwiXG5pbXBvcnQgQ2xvdWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkXCJcbmltcG9ydCBMb2cgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYXNzaWdubWVudFwiXG5cbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuXG5jb25zdCB7Q29tbWFuZEJhciwgRW1wdHl9PVVJXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhc2hib2FyZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxkaXY+XG4gICAgICAgICAgICAgICAgPEVtcHR5IGljb249ezxDbG91ZC8+fSB0ZXh0PVwiV2VsY29tZSB0byBRaWxpXCIvPlxuXHRcdFx0XHQ8Q29tbWFuZEJhciAgY2xhc3NOYW1lPVwiZm9vdGJhclwiIFxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChjbWQudG9Mb3dlckNhc2UoKSl9XG5cdFx0XHRcdFx0aXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJEYXRhXCIsIGljb246RGF0YX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiQ2xvdWRcIiwgaWNvbjpDbG91ZH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiTG9nXCIsIGljb246TG9nfSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCJNeVwiLCBpY29uOkljb25BY2NvdW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuICAgIH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXHRcbn0iXX0=