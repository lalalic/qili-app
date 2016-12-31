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

var _checkUpdate = require('./components/check-update');

var _checkUpdate2 = _interopRequireDefault(_checkUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommandBar = _.UI.CommandBar;
var Empty = _.UI.Empty;
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
			items: [{ action: "Data", icon: _react2.default.createElement(_dashboard2.default, null) }, { action: "Cloud", icon: _react2.default.createElement(_cloud2.default, null) }, { action: "Log", icon: _react2.default.createElement(_assignment2.default, null) }, { action: "My", icon: _react2.default.createElement(
					_checkUpdate2.default,
					null,
					_react2.default.createElement(_accountBox2.default, null)
				) }]
		})
	);
};

Dashboard.contextTypes = { router: _react.PropTypes.object };

exports.default = Dashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiRGFzaGJvYXJkIiwicHJvcHMiLCJyb3V0ZXIiLCJwdXNoIiwiY21kIiwidG9Mb3dlckNhc2UiLCJhY3Rpb24iLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7SUFFT0EsVSxRQUFBQSxVO0lBQVlDLEssUUFBQUEsSztBQUVaLElBQU1DLGdDQUFVLFNBQVZBLFNBQVUsQ0FBQ0MsS0FBRDtBQUFBLEtBQVFDLE1BQVIsUUFBUUEsTUFBUjtBQUFBLFFBQ3RCO0FBQUE7QUFBQTtBQUNDLGdDQUFDLEtBQUQsSUFBTyxNQUFNLG9EQUFiLEVBQXVCLE1BQUssaUJBQTVCLEdBREQ7QUFFQyxnQ0FBQyxVQUFELElBQWEsV0FBVSxTQUF2QjtBQUNDLGFBQVU7QUFBQSxXQUFLQSxPQUFPQyxJQUFQLE9BQWdCQyxJQUFJQyxXQUFKLEVBQWhCLENBQUw7QUFBQSxJQURYO0FBRUMsVUFBTyxDQUNOLEVBQUNDLFFBQU8sTUFBUixFQUFnQkMsTUFBSyx3REFBckIsRUFETSxFQUVOLEVBQUNELFFBQU8sT0FBUixFQUFpQkMsTUFBSyxvREFBdEIsRUFGTSxFQUdOLEVBQUNELFFBQU8sS0FBUixFQUFlQyxNQUFLLHlEQUFwQixFQUhNLEVBSU4sRUFBQ0QsUUFBTyxJQUFSLEVBQWNDLE1BQUs7QUFBQTtBQUFBO0FBQWE7QUFBYixLQUFuQixFQUpNO0FBRlI7QUFGRCxFQURzQjtBQUFBLENBQWhCOztBQWVQUCxVQUFVUSxZQUFWLEdBQXVCLEVBQUNOLFFBQU8saUJBQVVPLE1BQWxCLEVBQXZCOztrQkFFZVQsUyIsImZpbGUiOiJkYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXG5pbXBvcnQge1VJfSBmcm9tICcuJ1xuXG5pbXBvcnQgRGF0YSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kYXNoYm9hcmRcIlxuaW1wb3J0IENsb3VkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZFwiXG5pbXBvcnQgTG9nIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Fzc2lnbm1lbnRcIlxuXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcblxuaW1wb3J0IENoZWNrVXBkYXRlIGZyb20gXCIuL2NvbXBvbmVudHMvY2hlY2stdXBkYXRlXCJcblxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5fT1VSVxuXG5leHBvcnQgY29uc3QgRGFzaGJvYXJkPShwcm9wcyx7cm91dGVyfSk9Pihcblx0PGRpdj5cblx0XHQ8RW1wdHkgaWNvbj17PENsb3VkLz59IHRleHQ9XCJXZWxjb21lIHRvIFFpbGlcIi8+XG5cdFx0PENvbW1hbmRCYXIgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0b25TZWxlY3Q9e2NtZD0+cm91dGVyLnB1c2goYC8ke2NtZC50b0xvd2VyQ2FzZSgpfWApfVxuXHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0e2FjdGlvbjpcIkRhdGFcIiwgaWNvbjo8RGF0YS8+fSxcblx0XHRcdFx0e2FjdGlvbjpcIkNsb3VkXCIsIGljb246PENsb3VkLz59LFxuXHRcdFx0XHR7YWN0aW9uOlwiTG9nXCIsIGljb246PExvZy8+fSxcblx0XHRcdFx0e2FjdGlvbjpcIk15XCIsIGljb246PENoZWNrVXBkYXRlPjxJY29uQWNjb3VudC8+PC9DaGVja1VwZGF0ZT59XG5cdFx0XHRcdF19XG5cdFx0XHQvPlxuXHQ8L2Rpdj5cbilcblxuRGFzaGJvYXJkLmNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxuIl19