'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _logo = require('../icons/logo');

var _logo2 = _interopRequireDefault(_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (_ref) {
    var _ref$icon = _ref.icon,
        icon = _ref$icon === undefined ? _react2.default.createElement(_logo2.default, null) : _ref$icon,
        _ref$text = _ref.text,
        text = _ref$text === undefined ? 'Empty' : _ref$text,
        children = _ref.children,
        others = _objectWithoutProperties(_ref, ['icon', 'text', 'children']);

    return _react2.default.createElement(
        'div',
        _extends({ className: 'empty' }, others),
        icon,
        _react2.default.createElement(
            'div',
            null,
            children || text
        )
    );
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbImljb24iLCJ0ZXh0IiwiY2hpbGRyZW4iLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7a0JBRWU7QUFBQSx5QkFBRUEsSUFBRjtBQUFBLFFBQUVBLElBQUYsNkJBQU8sbURBQVA7QUFBQSx5QkFBb0JDLElBQXBCO0FBQUEsUUFBb0JBLElBQXBCLDZCQUF5QixPQUF6QjtBQUFBLFFBQWtDQyxRQUFsQyxRQUFrQ0EsUUFBbEM7QUFBQSxRQUErQ0MsTUFBL0M7O0FBQUEsV0FDWDtBQUFBO0FBQUEsbUJBQUssV0FBVSxPQUFmLElBQTJCQSxNQUEzQjtBQUNLSCxZQURMO0FBRUk7QUFBQTtBQUFBO0FBQU1FLHdCQUFVRDtBQUFoQjtBQUZKLEtBRFc7QUFBQSxDIiwiZmlsZSI6ImVtcHR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCBJY29uTG9nbyBmcm9tIFwiLi4vaWNvbnMvbG9nb1wiXG5cbmV4cG9ydCBkZWZhdWx0ICh7aWNvbj08SWNvbkxvZ28vPiwgdGV4dD0nRW1wdHknLCBjaGlsZHJlbiwgLi4ub3RoZXJzfSk9PihcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImVtcHR5XCIgey4uLm90aGVyc30+XG4gICAgICAgIHtpY29ufVxuICAgICAgICA8ZGl2PntjaGlsZHJlbnx8dGV4dH08L2Rpdj5cbiAgICA8L2Rpdj5cbilcbiJdfQ==