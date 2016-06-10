'use strict';

require('babel-polyfill');

var _db = require('./db');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Date.Helper = require('moment');

exports.React = _react2.default;
exports.Component = _react.Component;
exports.AsyncComponent = require('./components/async');

exports.init = _db.init;
exports.Model = _db.Model;
exports.User = _db.User;
exports.Role = _db.Role;
exports.File = _db.File;
exports.Log = _db.Log;

exports.QiliApp = require('./qiliApp');

exports.UI = {
    Empty: require('./components/empty'),
    Loading: require('./components/loading'),
    List: require('./components/list'),
    Comment: require('./components/comment'),
    CommandBar: require('./components/command-bar'),
    Photo: require('./components/photo'),
    Messager: require('./components/messager'),
    fileSelector: require('./components/file-selector')
};(function (_raw) {
    var len = new Date().toJSON().length,
        r = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/,
        ds;
    JSON.parse = function (a, reviver) {
        return _raw.call(JSON, a, function (k, v) {
            if (typeof v == 'string' && v.length == len && v[len - 1] == 'Z' && (ds = r.exec(v))) return new Date(Date.UTC(+ds[1], +ds[2] - 1, +ds[3], +ds[4], +ds[5], +ds[6]));
            return reviver ? reviver(k, v) : v;
        });
    };
})(JSON.parse);

Date.prototype.toString = function () {
    var h = this.getHours(),
        m = this.getMinutes(),
        time = h || m ? ' ' + h + ':' + m : '';
    return this.getFullYear() + '-' + (this.getMonth() + 1) + '-' + this.getDate() + time;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUNBOzs7Ozs7QUFFQSxLQUFLLE1BQUwsR0FBWSxRQUFRLFFBQVIsQ0FBWjs7QUFFQSxRQUFRLEtBQVI7QUFDQSxRQUFRLFNBQVI7QUFDQSxRQUFRLGNBQVIsR0FBdUIsUUFBUSxvQkFBUixDQUF2Qjs7QUFFQSxRQUFRLElBQVI7QUFDQSxRQUFRLEtBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLEdBQVI7O0FBRUEsUUFBUSxPQUFSLEdBQWdCLFFBQVEsV0FBUixDQUFoQjs7QUFFQSxRQUFRLEVBQVIsR0FBVztBQUNQLFdBQU0sUUFBUSxvQkFBUixDQUFOO0FBQ0EsYUFBUSxRQUFRLHNCQUFSLENBQVI7QUFDQSxVQUFNLFFBQVEsbUJBQVIsQ0FBTjtBQUNBLGFBQVEsUUFBUSxzQkFBUixDQUFSO0FBQ0EsZ0JBQVksUUFBUSwwQkFBUixDQUFaO0FBQ0EsV0FBTyxRQUFRLG9CQUFSLENBQVA7QUFDQSxjQUFVLFFBQVEsdUJBQVIsQ0FBVjtBQUNILGtCQUFjLFFBQVEsNEJBQVIsQ0FBZDtDQVJELENBV0MsQ0FBQyxVQUFTLElBQVQsRUFBYztBQUNaLFFBQUksTUFBSSxJQUFLLElBQUosRUFBRCxDQUFhLE1BQWIsR0FBc0IsTUFBdEI7UUFDSixJQUFFLDhEQUFGO1FBQWlFLEVBRHJFLENBRFk7QUFHWixTQUFLLEtBQUwsR0FBVyxVQUFDLENBQUQsRUFBRyxPQUFILEVBQWE7QUFDcEIsZUFBTyxLQUFLLElBQUwsQ0FBVSxJQUFWLEVBQWUsQ0FBZixFQUFpQixVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDM0IsZ0JBQUcsT0FBTyxDQUFQLElBQVcsUUFBWCxJQUF1QixFQUFFLE1BQUYsSUFBVSxHQUFWLElBQWlCLEVBQUUsTUFBSSxDQUFKLENBQUYsSUFBVSxHQUFWLEtBQWtCLEtBQUcsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFILENBQTFELEVBQ0MsT0FBTyxJQUFJLElBQUosQ0FBUyxLQUFLLEdBQUwsQ0FBUyxDQUFDLEdBQUcsQ0FBSCxDQUFELEVBQVEsQ0FBQyxHQUFHLENBQUgsQ0FBRCxHQUFTLENBQVQsRUFBWSxDQUFDLEdBQUcsQ0FBSCxDQUFELEVBQVEsQ0FBQyxHQUFHLENBQUgsQ0FBRCxFQUFTLENBQUMsR0FBRyxDQUFILENBQUQsRUFBUSxDQUFDLEdBQUcsQ0FBSCxDQUFELENBQS9ELENBQVAsQ0FESjtBQUVBLG1CQUFPLFVBQVUsUUFBUSxDQUFSLEVBQVUsQ0FBVixDQUFWLEdBQXlCLENBQXpCLENBSG9CO1NBQVAsQ0FBeEIsQ0FEb0I7S0FBYixDQUhDO0NBQWQsQ0FBRCxDQVVFLEtBQUssS0FBTCxDQVZGOztBQVlELEtBQUssU0FBTCxDQUFlLFFBQWYsR0FBd0IsWUFBVTtBQUM5QixRQUFJLElBQUUsS0FBSyxRQUFMLEVBQUY7UUFBa0IsSUFBRSxLQUFLLFVBQUwsRUFBRjtRQUNsQixPQUFLLEtBQUcsQ0FBSCxTQUFXLFVBQUssQ0FBaEIsR0FBcUIsRUFBckIsQ0FGcUI7QUFHOUIsV0FBVSxLQUFLLFdBQUwsWUFBc0IsS0FBSyxRQUFMLEtBQWdCLENBQWhCLFVBQXFCLEtBQUssT0FBTCxLQUFpQixJQUF0RSxDQUg4QjtDQUFWIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCdcblxuaW1wb3J0IHtpbml0LE1vZGVsLFVzZXIsUm9sZSxGaWxlLExvZ30gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcblxuRGF0ZS5IZWxwZXI9cmVxdWlyZSgnbW9tZW50JylcblxuZXhwb3J0cy5SZWFjdD1SZWFjdFxuZXhwb3J0cy5Db21wb25lbnQ9Q29tcG9uZW50XG5leHBvcnRzLkFzeW5jQ29tcG9uZW50PXJlcXVpcmUoJy4vY29tcG9uZW50cy9hc3luYycpXG5cbmV4cG9ydHMuaW5pdD1pbml0XG5leHBvcnRzLk1vZGVsPU1vZGVsXG5leHBvcnRzLlVzZXI9VXNlclxuZXhwb3J0cy5Sb2xlPVJvbGVcbmV4cG9ydHMuRmlsZT1GaWxlXG5leHBvcnRzLkxvZz1Mb2dcblxuZXhwb3J0cy5RaWxpQXBwPXJlcXVpcmUoJy4vcWlsaUFwcCcpXG5cbmV4cG9ydHMuVUk9e1xuICAgIEVtcHR5OnJlcXVpcmUoJy4vY29tcG9uZW50cy9lbXB0eScpLFxuICAgIExvYWRpbmc6cmVxdWlyZSgnLi9jb21wb25lbnRzL2xvYWRpbmcnKSxcbiAgICBMaXN0OiByZXF1aXJlKCcuL2NvbXBvbmVudHMvbGlzdCcpLFxuICAgIENvbW1lbnQ6cmVxdWlyZSgnLi9jb21wb25lbnRzL2NvbW1lbnQnKSxcbiAgICBDb21tYW5kQmFyOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvY29tbWFuZC1iYXInKSxcbiAgICBQaG90bzogcmVxdWlyZSgnLi9jb21wb25lbnRzL3Bob3RvJyksXG4gICAgTWVzc2FnZXI6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tZXNzYWdlcicpLFxuXHRmaWxlU2VsZWN0b3I6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9maWxlLXNlbGVjdG9yJylcbn1cblxuOyhmdW5jdGlvbihfcmF3KXtcbiAgICB2YXIgbGVuPShuZXcgRGF0ZSgpKS50b0pTT04oKS5sZW5ndGgsXG4gICAgICAgIHI9L14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KD86XFwuXFxkKik/KVokLyxkc1xuICAgIEpTT04ucGFyc2U9KGEscmV2aXZlcik9PntcbiAgICAgICAgcmV0dXJuIF9yYXcuY2FsbChKU09OLGEsKGssdik9PntcbiAgICAgICAgICAgIGlmKHR5cGVvZih2KT09J3N0cmluZycgJiYgdi5sZW5ndGg9PWxlbiAmJiB2W2xlbi0xXT09J1onICYmIChkcz1yLmV4ZWModikpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrZHNbMV0sICtkc1syXSAtIDEsICtkc1szXSwgK2RzWzRdLCAgK2RzWzVdLCArZHNbNl0pKTtcbiAgICAgICAgICAgIHJldHVybiByZXZpdmVyID8gcmV2aXZlcihrLHYpIDogdlxuICAgICAgICB9KVxuICAgIH1cbn0pKEpTT04ucGFyc2UpO1xuXG5EYXRlLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe1xuICAgIHZhciBoPXRoaXMuZ2V0SG91cnMoKSxtPXRoaXMuZ2V0TWludXRlcygpLFxuICAgICAgICB0aW1lPWh8fG0gPyBgICR7aH06JHttfWAgOicnXG4gICAgcmV0dXJuIGAke3RoaXMuZ2V0RnVsbFllYXIoKX0tJHt0aGlzLmdldE1vbnRoKCkrMX0tJHt0aGlzLmdldERhdGUoKX0ke3RpbWV9YFxufVxuIl19