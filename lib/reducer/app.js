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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2VyL2FwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJzdGF0ZSIsIl9faW5pdGVkIiwiX191c2VyIiwiY3VycmVudCIsImFjdGlvbiIsInR5cGUiLCJfX3R1dG9yaWFsaXplZCIsIl9faW5pdGVkRXJyb3IiLCJlcnJvciIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBRXdCQSxHOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBU0EsR0FBVCxHQUFnRTtBQUFBLFFBQW5EQyxLQUFtRCx1RUFBN0MsRUFBQ0MsVUFBUyxLQUFWLEVBQWlCQyxRQUFPLGVBQUtDLE9BQTdCLEVBQTZDO0FBQUEsUUFBUEMsTUFBTzs7QUFDM0UsWUFBT0EsT0FBT0MsSUFBZDtBQUNBLGFBQUssUUFBTDtBQUNJLG1CQUFPO0FBQ0hKLDBCQUFTLElBRE47QUFFRkMsd0JBQU8sZUFBS0MsT0FGVjtBQUdGRyxnQ0FBZUYsT0FBT0U7QUFIcEIsYUFBUDtBQUtKO0FBQ0EsYUFBSyxhQUFMO0FBQ0ksbUJBQU87QUFDSEwsMEJBQVMsS0FETjtBQUVGQyx3QkFBTyxlQUFLQyxPQUZWO0FBR0ZJLCtCQUFjSCxPQUFPSTtBQUhuQixhQUFQO0FBS0o7QUFDQSxhQUFLLGNBQUw7QUFDSSxtQkFBT0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJWLEtBQWpCLEVBQXVCLEVBQUNFLFFBQU8sZUFBS0MsT0FBYixFQUF2QixDQUFQO0FBQ0o7QUFDSSxtQkFBT0gsS0FBUDtBQWxCSjtBQW9CSCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlciBmcm9tIFwiLi4vZGIvdXNlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcChzdGF0ZT17X19pbml0ZWQ6ZmFsc2UsIF9fdXNlcjpVc2VyLmN1cnJlbnR9LGFjdGlvbil7XG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKXtcbiAgICBjYXNlICdpbml0ZWQnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgX19pbml0ZWQ6dHJ1ZVxuICAgICAgICAgICAgLF9fdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgICAgICxfX3R1dG9yaWFsaXplZDphY3Rpb24uX190dXRvcmlhbGl6ZWRcbiAgICAgICAgfVxuICAgIGJyZWFrXG4gICAgY2FzZSAnaW5pdGVkRXJyb3InOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgX19pbml0ZWQ6ZmFsc2VcbiAgICAgICAgICAgICxfX3VzZXI6VXNlci5jdXJyZW50XG4gICAgICAgICAgICAsX19pbml0ZWRFcnJvcjphY3Rpb24uZXJyb3JcbiAgICAgICAgfVxuICAgIGJyZWFrXG4gICAgY2FzZSAndXNlci5jaGFuZ2VkJzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse19fdXNlcjpVc2VyLmN1cnJlbnR9KVxuICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbn1cbiJdfQ==