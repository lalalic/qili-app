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
            'p',
            null,
            children || text
        )
    );
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbImljb24iLCJ0ZXh0IiwiY2hpbGRyZW4iLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7a0JBRWU7QUFBQSx5QkFBRUEsSUFBRjtBQUFBLFFBQUVBLElBQUYsNkJBQU8sbURBQVA7QUFBQSx5QkFBb0JDLElBQXBCO0FBQUEsUUFBb0JBLElBQXBCLDZCQUF5QixPQUF6QjtBQUFBLFFBQWtDQyxRQUFsQyxRQUFrQ0EsUUFBbEM7QUFBQSxRQUErQ0MsTUFBL0M7O0FBQUEsV0FDWDtBQUFBO0FBQUEsbUJBQUssV0FBVSxPQUFmLElBQTJCQSxNQUEzQjtBQUNLSCxZQURMO0FBRUk7QUFBQTtBQUFBO0FBQUlFLHdCQUFVRDtBQUFkO0FBRkosS0FEVztBQUFBLEMiLCJmaWxlIjoiZW1wdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEljb25Mb2dvIGZyb20gXCIuLi9pY29ucy9sb2dvXCJcblxuZXhwb3J0IGRlZmF1bHQgKHtpY29uPTxJY29uTG9nby8+LCB0ZXh0PSdFbXB0eScsIGNoaWxkcmVuLCAuLi5vdGhlcnN9KT0+KFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1wdHlcIiB7Li4ub3RoZXJzfT5cbiAgICAgICAge2ljb259XG4gICAgICAgIDxwPntjaGlsZHJlbnx8dGV4dH08L3A+XG4gICAgPC9kaXY+XG4pXG4iXX0=