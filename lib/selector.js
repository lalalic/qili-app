"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrentApp = undefined;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJnZXRDdXJyZW50QXBwIiwic3RhdGUiLCJlbnRpdGllcyIsIl9uYW1lIiwicWlsaUFkbWluIiwiYXBwIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFFTyxJQUFNQSx3Q0FBYyxTQUFkQSxhQUFjLFFBQU87QUFDOUIsUUFBRztBQUNDLGVBQU9DLE1BQU1DLFFBQU4sQ0FBZSxjQUFZQyxLQUEzQixFQUFrQ0YsTUFBTUcsU0FBTixDQUFnQkMsR0FBbEQsQ0FBUDtBQUNILEtBRkQsQ0FFQyxPQUFNQyxDQUFOLEVBQVE7QUFDTCxlQUFPLElBQVA7QUFDSDtBQUNKLENBTk0iLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBwbGljYXRpb24gZnJvbSBcIi4vZGIvYXBwXCJcblxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRBcHA9c3RhdGU9PntcbiAgICB0cnl7XG4gICAgICAgIHJldHVybiBzdGF0ZS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV1bc3RhdGUucWlsaUFkbWluLmFwcF1cbiAgICB9Y2F0Y2goZSl7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxufVxuIl19