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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJnZXRDdXJyZW50QXBwIiwic3RhdGUiLCJlbnRpdGllcyIsIl9uYW1lIiwicWlsaUFkbWluIiwiYXBwIiwiZSIsImdldEFwcCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUVPLElBQU1BLHdDQUFjLFNBQWRBLGFBQWMsUUFBTztBQUM5QixRQUFHO0FBQ0MsZUFBT0MsTUFBTUMsUUFBTixDQUFlLGNBQVlDLEtBQTNCLEVBQWtDRixNQUFNRyxTQUFOLENBQWdCQyxHQUFsRCxDQUFQO0FBQ0gsS0FGRCxDQUVDLE9BQU1DLENBQU4sRUFBUTtBQUNMLGVBQU8sSUFBUDtBQUNIO0FBQ0osQ0FOTTs7QUFRQSxJQUFNQywwQkFBTyxTQUFQQSxNQUFPLENBQUNOLEtBQUQsRUFBT08sRUFBUCxFQUFZO0FBQzVCLFFBQUc7QUFDQyxlQUFPUCxNQUFNQyxRQUFOLENBQWUsY0FBWUMsS0FBM0IsRUFBa0NLLEVBQWxDLENBQVA7QUFDSCxLQUZELENBRUMsT0FBTUYsQ0FBTixFQUFRO0FBQ0wsZUFBTyxJQUFQO0FBQ0g7QUFDSixDQU5NIiwiZmlsZSI6InNlbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gXCIuL2RiL2FwcFwiXG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50QXBwPXN0YXRlPT57XG4gICAgdHJ5e1xuICAgICAgICByZXR1cm4gc3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdW3N0YXRlLnFpbGlBZG1pbi5hcHBdXG4gICAgfWNhdGNoKGUpe1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldEFwcD0oc3RhdGUsaWQpPT57XG4gICAgdHJ5e1xuICAgICAgICByZXR1cm4gc3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdW2lkXVxuICAgIH1jYXRjaChlKXtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG59XG4iXX0=