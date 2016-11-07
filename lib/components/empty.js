'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var icon = _ref.icon,
        _ref$text = _ref.text,
        text = _ref$text === undefined ? 'Empty' : _ref$text,
        children = _ref.children,
        others = (0, _objectWithoutProperties3.default)(_ref, ['icon', 'text', 'children']);
    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: 'empty' }, others),
        icon,
        _react2.default.createElement(
            'p',
            null,
            children || text
        )
    );
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbImljb24iLCJ0ZXh0IiwiY2hpbGRyZW4iLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztrQkFFZTtBQUFBLFFBQUVBLElBQUYsUUFBRUEsSUFBRjtBQUFBLHlCQUFRQyxJQUFSO0FBQUEsUUFBUUEsSUFBUiw2QkFBYSxPQUFiO0FBQUEsUUFBc0JDLFFBQXRCLFFBQXNCQSxRQUF0QjtBQUFBLFFBQW1DQyxNQUFuQztBQUFBLFdBQ1g7QUFBQTtBQUFBLGlDQUFLLFdBQVUsT0FBZixJQUEyQkEsTUFBM0I7QUFDS0gsWUFETDtBQUVJO0FBQUE7QUFBQTtBQUFJRSx3QkFBVUQ7QUFBZDtBQUZKLEtBRFc7QUFBQSxDIiwiZmlsZSI6ImVtcHR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgKHtpY29uLCB0ZXh0PSdFbXB0eScsIGNoaWxkcmVuLCAuLi5vdGhlcnN9KT0+KFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1wdHlcIiB7Li4ub3RoZXJzfT5cbiAgICAgICAge2ljb259XG4gICAgICAgIDxwPntjaGlsZHJlbnx8dGV4dH08L3A+XG4gICAgPC9kaXY+XG4pXG4iXX0=