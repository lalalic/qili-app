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
			items: [{ action: "Data", icon: _react2.default.createElement(_dashboard2.default, null) }, { action: "Cloud", icon: _react2.default.createElement(_cloud2.default, null) }, { action: "Log", icon: _react2.default.createElement(_assignment2.default, null) }, { action: "My", icon: _react2.default.createElement(_accountBox2.default, null) }]
		})
	);
};

exports.default = Dashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiRGFzaGJvYXJkIiwicm91dGVyIiwicHVzaCIsImNtZCIsInRvTG93ZXJDYXNlIiwiYWN0aW9uIiwiaWNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztJQUVPQSxVLFFBQUFBLFU7SUFBWUMsSyxRQUFBQSxLO0FBRVosSUFBTUMsZ0NBQVUsU0FBVkEsU0FBVTtBQUFBLEtBQUVDLE1BQUYsUUFBRUEsTUFBRjtBQUFBLFFBQ3RCO0FBQUE7QUFBQTtBQUNDLGdDQUFDLEtBQUQsSUFBTyxNQUFNLG9EQUFiLEVBQXVCLE1BQUssaUJBQTVCLEdBREQ7QUFFQyxnQ0FBQyxVQUFELElBQWEsV0FBVSxTQUF2QjtBQUNDLGFBQVU7QUFBQSxXQUFLQSxPQUFPQyxJQUFQLE9BQWdCQyxJQUFJQyxXQUFKLEVBQWhCLENBQUw7QUFBQSxJQURYO0FBRUMsVUFBTyxDQUNOLEVBQUNDLFFBQU8sTUFBUixFQUFnQkMsTUFBSyx3REFBckIsRUFETSxFQUVOLEVBQUNELFFBQU8sT0FBUixFQUFpQkMsTUFBSyxvREFBdEIsRUFGTSxFQUdOLEVBQUNELFFBQU8sS0FBUixFQUFlQyxNQUFLLHlEQUFwQixFQUhNLEVBSU4sRUFBQ0QsUUFBTyxJQUFSLEVBQWNDLE1BQUsseURBQW5CLEVBSk07QUFGUjtBQUZELEVBRHNCO0FBQUEsQ0FBaEI7O2tCQWVRTixTIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VUl9IGZyb20gJy4nXG5cbmltcG9ydCBEYXRhIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Rhc2hib2FyZFwiXG5pbXBvcnQgQ2xvdWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkXCJcbmltcG9ydCBMb2cgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYXNzaWdubWVudFwiXG5cbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuXG5jb25zdCB7Q29tbWFuZEJhciwgRW1wdHl9PVVJXG5cbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQ9KHtyb3V0ZXJ9KT0+KFxuXHQ8ZGl2PlxuXHRcdDxFbXB0eSBpY29uPXs8Q2xvdWQvPn0gdGV4dD1cIldlbGNvbWUgdG8gUWlsaVwiLz5cblx0XHQ8Q29tbWFuZEJhciAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRvblNlbGVjdD17Y21kPT5yb3V0ZXIucHVzaChgLyR7Y21kLnRvTG93ZXJDYXNlKCl9YCl9XG5cdFx0XHRpdGVtcz17W1xuXHRcdFx0XHR7YWN0aW9uOlwiRGF0YVwiLCBpY29uOjxEYXRhLz59LFxuXHRcdFx0XHR7YWN0aW9uOlwiQ2xvdWRcIiwgaWNvbjo8Q2xvdWQvPn0sXG5cdFx0XHRcdHthY3Rpb246XCJMb2dcIiwgaWNvbjo8TG9nLz59LFxuXHRcdFx0XHR7YWN0aW9uOlwiTXlcIiwgaWNvbjo8SWNvbkFjY291bnQvPn1cblx0XHRcdFx0XX1cblx0XHRcdC8+XG5cdDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmRcbiJdfQ==