"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getApp = exports.getCurrentApp = undefined;

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCurrentApp = exports.getCurrentApp = function getCurrentApp(state) {
    try {
        return state.entities[_app2.default._name][state.qiliAdmin.app];
    } catch (e) {
        return null;
    }
};

var getApp = exports.getApp = function getApp(state, id) {
    try {
        return state.entities[_app2.default._name][id];
    } catch (e) {
        return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJnZXRDdXJyZW50QXBwIiwic3RhdGUiLCJlbnRpdGllcyIsIl9uYW1lIiwicWlsaUFkbWluIiwiYXBwIiwiZSIsImdldEFwcCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUVPLElBQU1BLHdDQUFjLFNBQWRBLGFBQWMsUUFBTztBQUM5QixRQUFHO0FBQ0MsZUFBT0MsTUFBTUMsUUFBTixDQUFlLGNBQVlDLEtBQTNCLEVBQWtDRixNQUFNRyxTQUFOLENBQWdCQyxHQUFsRCxDQUFQO0FBQ0gsS0FGRCxDQUVDLE9BQU1DLENBQU4sRUFBUTtBQUNMLGVBQU8sSUFBUDtBQUNIO0FBQ0osQ0FOTTs7QUFRQSxJQUFNQywwQkFBTyxTQUFQQSxNQUFPLENBQUNOLEtBQUQsRUFBT08sRUFBUCxFQUFZO0FBQzVCLFFBQUc7QUFDQyxlQUFPUCxNQUFNQyxRQUFOLENBQWUsY0FBWUMsS0FBM0IsRUFBa0NLLEVBQWxDLENBQVA7QUFDSCxLQUZELENBRUMsT0FBTUYsQ0FBTixFQUFRO0FBQ0wsZUFBTyxJQUFQO0FBQ0g7QUFDSixDQU5NIiwiZmlsZSI6InNlbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL2RiL2FwcFwiXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudEFwcD1zdGF0ZT0+e1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV1bc3RhdGUucWlsaUFkbWluLmFwcF1cclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QXBwPShzdGF0ZSxpZCk9PntcclxuICAgIHRyeXtcclxuICAgICAgICByZXR1cm4gc3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdW2lkXVxyXG4gICAgfWNhdGNoKGUpe1xyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbn1cclxuIl19