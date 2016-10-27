'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dashboard = undefined;

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

var CommandBar = _.UI.CommandBar,
    Empty = _.UI.Empty;
var Dashboard = exports.Dashboard = function Dashboard(_ref) {
	var router = _ref.router;
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(Empty, { icon: _react2.default.createElement(_cloud2.default, null), text: 'Welcome to Qili' }),
		_react2.default.createElement(CommandBar, { className: 'footbar',
			onSelect: function onSelect(cmd) {
				return router.push('/' + cmd.toLowerCase());
			},
			items: [{ action: "Data", icon: _dashboard2.default }, { action: "Cloud", icon: _cloud2.default }, { action: "Log", icon: _assignment2.default }, { action: "My", icon: _accountBox2.default }]
		})
	);
};

exports.default = Dashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiRGFzaGJvYXJkIiwicm91dGVyIiwicHVzaCIsImNtZCIsInRvTG93ZXJDYXNlIiwiYWN0aW9uIiwiaWNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztJQUVPQSxVLFFBQUFBLFU7SUFBWUMsSyxRQUFBQSxLO0FBRVosSUFBTUMsZ0NBQVUsU0FBVkEsU0FBVTtBQUFBLEtBQUVDLE1BQUYsUUFBRUEsTUFBRjtBQUFBLFFBQ3RCO0FBQUE7QUFBQTtBQUNDLGdDQUFDLEtBQUQsSUFBTyxNQUFNLG9EQUFiLEVBQXVCLE1BQUssaUJBQTVCLEdBREQ7QUFFQyxnQ0FBQyxVQUFELElBQWEsV0FBVSxTQUF2QjtBQUNDLGFBQVU7QUFBQSxXQUFLQSxPQUFPQyxJQUFQLE9BQWdCQyxJQUFJQyxXQUFKLEVBQWhCLENBQUw7QUFBQSxJQURYO0FBRUMsVUFBTyxDQUNOLEVBQUNDLFFBQU8sTUFBUixFQUFnQkMseUJBQWhCLEVBRE0sRUFFTixFQUFDRCxRQUFPLE9BQVIsRUFBaUJDLHFCQUFqQixFQUZNLEVBR04sRUFBQ0QsUUFBTyxLQUFSLEVBQWVDLDBCQUFmLEVBSE0sRUFJTixFQUFDRCxRQUFPLElBQVIsRUFBY0MsMEJBQWQsRUFKTTtBQUZSO0FBRkQsRUFEc0I7QUFBQSxDQUFoQjs7a0JBZVFOLFMiLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtVSX0gZnJvbSAnLidcblxuaW1wb3J0IERhdGEgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGFzaGJvYXJkXCJcbmltcG9ydCBDbG91ZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWRcIlxuaW1wb3J0IExvZyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hc3NpZ25tZW50XCJcblxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXG5cbmNvbnN0IHtDb21tYW5kQmFyLCBFbXB0eX09VUlcblxuZXhwb3J0IGNvbnN0IERhc2hib2FyZD0oe3JvdXRlcn0pPT4oXG5cdDxkaXY+XG5cdFx0PEVtcHR5IGljb249ezxDbG91ZC8+fSB0ZXh0PVwiV2VsY29tZSB0byBRaWxpXCIvPlxuXHRcdDxDb21tYW5kQmFyICBjbGFzc05hbWU9XCJmb290YmFyXCIgXG5cdFx0XHRvblNlbGVjdD17Y21kPT5yb3V0ZXIucHVzaChgLyR7Y21kLnRvTG93ZXJDYXNlKCl9YCl9XG5cdFx0XHRpdGVtcz17W1xuXHRcdFx0XHR7YWN0aW9uOlwiRGF0YVwiLCBpY29uOkRhdGF9LFxuXHRcdFx0XHR7YWN0aW9uOlwiQ2xvdWRcIiwgaWNvbjpDbG91ZH0sXG5cdFx0XHRcdHthY3Rpb246XCJMb2dcIiwgaWNvbjpMb2d9LFxuXHRcdFx0XHR7YWN0aW9uOlwiTXlcIiwgaWNvbjpJY29uQWNjb3VudH1cblx0XHRcdFx0XX1cblx0XHRcdC8+XG5cdDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmRcbiJdfQ==