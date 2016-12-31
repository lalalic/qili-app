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
    var icon = _ref.icon,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbImljb24iLCJ0ZXh0IiwiY2hpbGRyZW4iLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O2tCQUVlO0FBQUEsUUFBRUEsSUFBRixRQUFFQSxJQUFGO0FBQUEseUJBQVFDLElBQVI7QUFBQSxRQUFRQSxJQUFSLDZCQUFhLE9BQWI7QUFBQSxRQUFzQkMsUUFBdEIsUUFBc0JBLFFBQXRCO0FBQUEsUUFBbUNDLE1BQW5DOztBQUFBLFdBQ1g7QUFBQTtBQUFBLG1CQUFLLFdBQVUsT0FBZixJQUEyQkEsTUFBM0I7QUFDS0gsWUFETDtBQUVJO0FBQUE7QUFBQTtBQUFJRSx3QkFBVUQ7QUFBZDtBQUZKLEtBRFc7QUFBQSxDIiwiZmlsZSI6ImVtcHR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgKHtpY29uLCB0ZXh0PSdFbXB0eScsIGNoaWxkcmVuLCAuLi5vdGhlcnN9KT0+KFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1wdHlcIiB7Li4ub3RoZXJzfT5cbiAgICAgICAge2ljb259XG4gICAgICAgIDxwPntjaGlsZHJlbnx8dGV4dH08L3A+XG4gICAgPC9kaXY+XG4pXG4iXX0=