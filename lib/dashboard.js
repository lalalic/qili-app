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
var Dashboard = exports.Dashboard = function Dashboard(props, _ref) {
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
Dashboard.contextTypes = { router: _react.PropTypes.object };

exports.default = Dashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiRGFzaGJvYXJkIiwicHJvcHMiLCJyb3V0ZXIiLCJwdXNoIiwiY21kIiwidG9Mb3dlckNhc2UiLCJhY3Rpb24iLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0lBRU9BLFUsUUFBQUEsVTtJQUFZQyxLLFFBQUFBLEs7QUFFWixJQUFNQyxnQ0FBVSxTQUFWQSxTQUFVLENBQUNDLEtBQUQ7QUFBQSxLQUFRQyxNQUFSLFFBQVFBLE1BQVI7QUFBQSxRQUN0QjtBQUFBO0FBQUE7QUFDQyxnQ0FBQyxLQUFELElBQU8sTUFBTSxvREFBYixFQUF1QixNQUFLLGlCQUE1QixHQUREO0FBRUMsZ0NBQUMsVUFBRCxJQUFhLFdBQVUsU0FBdkI7QUFDQyxhQUFVO0FBQUEsV0FBS0EsT0FBT0MsSUFBUCxPQUFnQkMsSUFBSUMsV0FBSixFQUFoQixDQUFMO0FBQUEsSUFEWDtBQUVDLFVBQU8sQ0FDTixFQUFDQyxRQUFPLE1BQVIsRUFBZ0JDLE1BQUssd0RBQXJCLEVBRE0sRUFFTixFQUFDRCxRQUFPLE9BQVIsRUFBaUJDLE1BQUssb0RBQXRCLEVBRk0sRUFHTixFQUFDRCxRQUFPLEtBQVIsRUFBZUMsTUFBSyx5REFBcEIsRUFITSxFQUlOLEVBQUNELFFBQU8sSUFBUixFQUFjQyxNQUFLLHlEQUFuQixFQUpNO0FBRlI7QUFGRCxFQURzQjtBQUFBLENBQWhCO0FBY1BQLFVBQVVRLFlBQVYsR0FBdUIsRUFBQ04sUUFBTyxpQkFBVU8sTUFBbEIsRUFBdkI7O2tCQUVlVCxTIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VUl9IGZyb20gJy4nXG5cbmltcG9ydCBEYXRhIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Rhc2hib2FyZFwiXG5pbXBvcnQgQ2xvdWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkXCJcbmltcG9ydCBMb2cgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYXNzaWdubWVudFwiXG5cbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuXG5jb25zdCB7Q29tbWFuZEJhciwgRW1wdHl9PVVJXG5cbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQ9KHByb3BzLHtyb3V0ZXJ9KT0+KFxuXHQ8ZGl2PlxuXHRcdDxFbXB0eSBpY29uPXs8Q2xvdWQvPn0gdGV4dD1cIldlbGNvbWUgdG8gUWlsaVwiLz5cblx0XHQ8Q29tbWFuZEJhciAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRvblNlbGVjdD17Y21kPT5yb3V0ZXIucHVzaChgLyR7Y21kLnRvTG93ZXJDYXNlKCl9YCl9XG5cdFx0XHRpdGVtcz17W1xuXHRcdFx0XHR7YWN0aW9uOlwiRGF0YVwiLCBpY29uOjxEYXRhLz59LFxuXHRcdFx0XHR7YWN0aW9uOlwiQ2xvdWRcIiwgaWNvbjo8Q2xvdWQvPn0sXG5cdFx0XHRcdHthY3Rpb246XCJMb2dcIiwgaWNvbjo8TG9nLz59LFxuXHRcdFx0XHR7YWN0aW9uOlwiTXlcIiwgaWNvbjo8SWNvbkFjY291bnQvPn1cblx0XHRcdFx0XX1cblx0XHRcdC8+XG5cdDwvZGl2PlxuKVxuRGFzaGJvYXJkLmNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxuIl19