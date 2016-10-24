"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.INIT_APP = INIT_APP;
function INIT_APP(error, __tutorialized) {
    if (!!error) {
        return {
            type: "initedError",
            user: user,
            error: error
        };
    } else {
        return {
            type: "inited",
            __tutorialized: __tutorialized
        };
    }
}

var USER_CHANGED = exports.USER_CHANGED = {
    type: "user.changed"
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vcWlsaUFwcC5qcyJdLCJuYW1lcyI6WyJJTklUX0FQUCIsImVycm9yIiwiX190dXRvcmlhbGl6ZWQiLCJ0eXBlIiwidXNlciIsIlVTRVJfQ0hBTkdFRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFBZ0JBLFEsR0FBQUEsUTtBQUFULFNBQVNBLFFBQVQsQ0FBa0JDLEtBQWxCLEVBQXdCQyxjQUF4QixFQUF1QztBQUMxQyxRQUFHLENBQUMsQ0FBQ0QsS0FBTCxFQUFXO0FBQ1AsZUFBTztBQUNIRSxrQkFBSyxhQURGO0FBRUZDLHNCQUZFO0FBR0ZIO0FBSEUsU0FBUDtBQUtILEtBTkQsTUFNSztBQUNELGVBQU87QUFDSEUsa0JBQUssUUFERjtBQUVGRDtBQUZFLFNBQVA7QUFJSDtBQUNKOztBQUVNLElBQUlHLHNDQUFhO0FBQ3BCRixVQUFLO0FBRGUsQ0FBakIiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBJTklUX0FQUChlcnJvcixfX3R1dG9yaWFsaXplZCl7XG4gICAgaWYoISFlcnJvcil7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOlwiaW5pdGVkRXJyb3JcIlxuICAgICAgICAgICAgLHVzZXJcbiAgICAgICAgICAgICxlcnJvclxuICAgICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOlwiaW5pdGVkXCJcbiAgICAgICAgICAgICxfX3R1dG9yaWFsaXplZFxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIFVTRVJfQ0hBTkdFRD17XG4gICAgdHlwZTpcInVzZXIuY2hhbmdlZFwiXG59XG4iXX0=