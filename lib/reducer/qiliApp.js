'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = app;

var _user = require('../db/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function app() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { __inited: false, __user: _user2.default.current };
    var action = arguments[1];

    switch (action.type) {
        case 'inited':
            return {
                __inited: true,
                __user: _user2.default.current,
                __tutorialized: action.__tutorialized
            };
            break;
        case 'initedError':
            return {
                __inited: false,
                __user: _user2.default.current,
                __initedError: action.error
            };
            break;
        case 'user.changed':
            return Object.assign({}, state, { __user: _user2.default.current });
        default:
            return state;
    }
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2VyL3FpbGlBcHAuanMiXSwibmFtZXMiOlsiYXBwIiwic3RhdGUiLCJfX2luaXRlZCIsIl9fdXNlciIsImN1cnJlbnQiLCJhY3Rpb24iLCJ0eXBlIiwiX190dXRvcmlhbGl6ZWQiLCJfX2luaXRlZEVycm9yIiwiZXJyb3IiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUV3QkEsRzs7QUFGeEI7Ozs7OztBQUVlLFNBQVNBLEdBQVQsR0FBZ0U7QUFBQSxRQUFuREMsS0FBbUQsdUVBQTdDLEVBQUNDLFVBQVMsS0FBVixFQUFpQkMsUUFBTyxlQUFLQyxPQUE3QixFQUE2QztBQUFBLFFBQVBDLE1BQU87O0FBQzNFLFlBQU9BLE9BQU9DLElBQWQ7QUFDQSxhQUFLLFFBQUw7QUFDSSxtQkFBTztBQUNISiwwQkFBUyxJQUROO0FBRUZDLHdCQUFPLGVBQUtDLE9BRlY7QUFHRkcsZ0NBQWVGLE9BQU9FO0FBSHBCLGFBQVA7QUFLSjtBQUNBLGFBQUssYUFBTDtBQUNJLG1CQUFPO0FBQ0hMLDBCQUFTLEtBRE47QUFFRkMsd0JBQU8sZUFBS0MsT0FGVjtBQUdGSSwrQkFBY0gsT0FBT0k7QUFIbkIsYUFBUDtBQUtKO0FBQ0EsYUFBSyxjQUFMO0FBQ0ksbUJBQU9DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCVixLQUFqQixFQUF1QixFQUFDRSxRQUFPLGVBQUtDLE9BQWIsRUFBdkIsQ0FBUDtBQUNKO0FBQ0ksbUJBQU9ILEtBQVA7QUFsQko7QUFvQkgiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2VyIGZyb20gXCIuLi9kYi91c2VyXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwKHN0YXRlPXtfX2luaXRlZDpmYWxzZSwgX191c2VyOlVzZXIuY3VycmVudH0sYWN0aW9uKXtcbiAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgIGNhc2UgJ2luaXRlZCc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBfX2luaXRlZDp0cnVlXG4gICAgICAgICAgICAsX191c2VyOlVzZXIuY3VycmVudFxuICAgICAgICAgICAgLF9fdHV0b3JpYWxpemVkOmFjdGlvbi5fX3R1dG9yaWFsaXplZFxuICAgICAgICB9XG4gICAgYnJlYWtcbiAgICBjYXNlICdpbml0ZWRFcnJvcic6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBfX2luaXRlZDpmYWxzZVxuICAgICAgICAgICAgLF9fdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgICAgICxfX2luaXRlZEVycm9yOmFjdGlvbi5lcnJvclxuICAgICAgICB9XG4gICAgYnJlYWtcbiAgICBjYXNlICd1c2VyLmNoYW5nZWQnOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7X191c2VyOlVzZXIuY3VycmVudH0pXG4gICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuIl19