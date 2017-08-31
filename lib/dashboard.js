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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiRGFzaGJvYXJkIiwicHJvcHMiLCJyb3V0ZXIiLCJwdXNoIiwiY21kIiwidG9Mb3dlckNhc2UiLCJhY3Rpb24iLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7SUFFT0EsVSxRQUFBQSxVO0lBQVlDLEssUUFBQUEsSztBQUVaLElBQU1DLGdDQUFVLFNBQVZBLFNBQVUsQ0FBQ0MsS0FBRDtBQUFBLEtBQVFDLE1BQVIsUUFBUUEsTUFBUjtBQUFBLFFBQ3RCO0FBQUE7QUFBQTtBQUNDLGdDQUFDLEtBQUQsSUFBTyxNQUFNLG9EQUFiLEVBQXVCLE1BQUssaUJBQTVCLEdBREQ7QUFFQyxnQ0FBQyxVQUFELElBQWEsV0FBVSxTQUF2QjtBQUNDLGFBQVU7QUFBQSxXQUFLQSxPQUFPQyxJQUFQLE9BQWdCQyxJQUFJQyxXQUFKLEVBQWhCLENBQUw7QUFBQSxJQURYO0FBRUMsVUFBTyxDQUNOLEVBQUNDLFFBQU8sTUFBUixFQUFnQkMsTUFBSyx3REFBckIsRUFETSxFQUVOLEVBQUNELFFBQU8sT0FBUixFQUFpQkMsTUFBSyxvREFBdEIsRUFGTSxFQUdOLEVBQUNELFFBQU8sS0FBUixFQUFlQyxNQUFLLHlEQUFwQixFQUhNLEVBSU4sRUFBQ0QsUUFBTyxJQUFSLEVBQWNDLE1BQUs7QUFBQTtBQUFBO0FBQWE7QUFBYixLQUFuQixFQUpNO0FBRlI7QUFGRCxFQURzQjtBQUFBLENBQWhCOztBQWVQUCxVQUFVUSxZQUFWLEdBQXVCLEVBQUNOLFFBQU8saUJBQVVPLE1BQWxCLEVBQXZCOztrQkFFZVQsUyIsImZpbGUiOiJkYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUl9IGZyb20gJy4nXHJcblxyXG5pbXBvcnQgRGF0YSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kYXNoYm9hcmRcIlxyXG5pbXBvcnQgQ2xvdWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkXCJcclxuaW1wb3J0IExvZyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hc3NpZ25tZW50XCJcclxuXHJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xyXG5cclxuaW1wb3J0IENoZWNrVXBkYXRlIGZyb20gXCIuL2NvbXBvbmVudHMvY2hlY2stdXBkYXRlXCJcclxuXHJcbmNvbnN0IHtDb21tYW5kQmFyLCBFbXB0eX09VUlcclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmQ9KHByb3BzLHtyb3V0ZXJ9KT0+KFxyXG5cdDxkaXY+XHJcblx0XHQ8RW1wdHkgaWNvbj17PENsb3VkLz59IHRleHQ9XCJXZWxjb21lIHRvIFFpbGlcIi8+XHJcblx0XHQ8Q29tbWFuZEJhciAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcblx0XHRcdG9uU2VsZWN0PXtjbWQ9PnJvdXRlci5wdXNoKGAvJHtjbWQudG9Mb3dlckNhc2UoKX1gKX1cclxuXHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHR7YWN0aW9uOlwiRGF0YVwiLCBpY29uOjxEYXRhLz59LFxyXG5cdFx0XHRcdHthY3Rpb246XCJDbG91ZFwiLCBpY29uOjxDbG91ZC8+fSxcclxuXHRcdFx0XHR7YWN0aW9uOlwiTG9nXCIsIGljb246PExvZy8+fSxcclxuXHRcdFx0XHR7YWN0aW9uOlwiTXlcIiwgaWNvbjo8Q2hlY2tVcGRhdGU+PEljb25BY2NvdW50Lz48L0NoZWNrVXBkYXRlPn1cclxuXHRcdFx0XHRdfVxyXG5cdFx0XHQvPlxyXG5cdDwvZGl2PlxyXG4pXHJcblxyXG5EYXNoYm9hcmQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxyXG4iXX0=