'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (_ref) {
    var icon = _ref.icon;
    var _ref$text = _ref.text;
    var text = _ref$text === undefined ? 'Empty' : _ref$text;
    var children = _ref.children;

    var others = _objectWithoutProperties(_ref, ['icon', 'text', 'children']);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbImljb24iLCJ0ZXh0IiwiY2hpbGRyZW4iLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O2tCQUVlO0FBQUEsUUFBRUEsSUFBRixRQUFFQSxJQUFGO0FBQUEseUJBQVFDLElBQVI7QUFBQSxRQUFRQSxJQUFSLDZCQUFhLE9BQWI7QUFBQSxRQUFzQkMsUUFBdEIsUUFBc0JBLFFBQXRCOztBQUFBLFFBQW1DQyxNQUFuQzs7QUFBQSxXQUNYO0FBQUE7QUFBQSxtQkFBSyxXQUFVLE9BQWYsSUFBMkJBLE1BQTNCO0FBQ0tILFlBREw7QUFFSTtBQUFBO0FBQUE7QUFBSUUsd0JBQVVEO0FBQWQ7QUFGSixLQURXO0FBQUEsQyIsImZpbGUiOiJlbXB0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5cbmV4cG9ydCBkZWZhdWx0ICh7aWNvbiwgdGV4dD0nRW1wdHknLCBjaGlsZHJlbiwgLi4ub3RoZXJzfSk9PihcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImVtcHR5XCIgey4uLm90aGVyc30+XG4gICAgICAgIHtpY29ufVxuICAgICAgICA8cD57Y2hpbGRyZW58fHRleHR9PC9wPlxuICAgIDwvZGl2PlxuKVxuIl19