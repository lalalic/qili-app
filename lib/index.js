'use strict';

var _db = require('./db');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');

Date.Helper = require('material-ui/lib/utils/date-time');

exports.React = _react2.default;
exports.Component = _react.Component;
exports.AsyncComponent = require('./components/async');
exports.Router = require('react-router');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOztBQUNBOzs7Ozs7QUFIQSxRQUFRLGdCQUFSOztBQUtBLEtBQUssTUFBTCxHQUFZLFFBQVEsaUNBQVIsQ0FBWjs7QUFFQSxRQUFRLEtBQVI7QUFDQSxRQUFRLFNBQVI7QUFDQSxRQUFRLGNBQVIsR0FBdUIsUUFBUSxvQkFBUixDQUF2QjtBQUNBLFFBQVEsTUFBUixHQUFlLFFBQVEsY0FBUixDQUFmOztBQUVBLFFBQVEsSUFBUjtBQUNBLFFBQVEsS0FBUjtBQUNBLFFBQVEsSUFBUjtBQUNBLFFBQVEsSUFBUjtBQUNBLFFBQVEsSUFBUjtBQUNBLFFBQVEsR0FBUjs7QUFFQSxRQUFRLE9BQVIsR0FBZ0IsUUFBUSxXQUFSLENBQWhCOztBQUVBLFFBQVEsRUFBUixHQUFXO0FBQ1AsV0FBTSxRQUFRLG9CQUFSLENBQU47QUFDQSxhQUFRLFFBQVEsc0JBQVIsQ0FBUjtBQUNBLFVBQU0sUUFBUSxtQkFBUixDQUFOO0FBQ0EsYUFBUSxRQUFRLHNCQUFSLENBQVI7QUFDQSxnQkFBWSxRQUFRLDBCQUFSLENBQVo7QUFDQSxXQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNBLGNBQVUsUUFBUSx1QkFBUixDQUFWO0FBQ0gsa0JBQWMsUUFBUSw0QkFBUixDQUFkO0NBUkQsQ0FXQyxDQUFDLFVBQVMsSUFBVCxFQUFjO0FBQ1osUUFBSSxNQUFJLElBQUssSUFBSixFQUFELENBQWEsTUFBYixHQUFzQixNQUF0QjtRQUNKLElBQUUsOERBQUY7UUFBaUUsRUFEckUsQ0FEWTtBQUdaLFNBQUssS0FBTCxHQUFXLFVBQUMsQ0FBRCxFQUFHLE9BQUgsRUFBYTtBQUNwQixlQUFPLEtBQUssSUFBTCxDQUFVLElBQVYsRUFBZSxDQUFmLEVBQWlCLFVBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTztBQUMzQixnQkFBRyxPQUFPLENBQVAsSUFBVyxRQUFYLElBQXVCLEVBQUUsTUFBRixJQUFVLEdBQVYsSUFBaUIsRUFBRSxNQUFJLENBQUosQ0FBRixJQUFVLEdBQVYsS0FBa0IsS0FBRyxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQUgsQ0FBMUQsRUFDQyxPQUFPLElBQUksSUFBSixDQUFTLEtBQUssR0FBTCxDQUFTLENBQUMsR0FBRyxDQUFILENBQUQsRUFBUSxDQUFDLEdBQUcsQ0FBSCxDQUFELEdBQVMsQ0FBVCxFQUFZLENBQUMsR0FBRyxDQUFILENBQUQsRUFBUSxDQUFDLEdBQUcsQ0FBSCxDQUFELEVBQVMsQ0FBQyxHQUFHLENBQUgsQ0FBRCxFQUFRLENBQUMsR0FBRyxDQUFILENBQUQsQ0FBL0QsQ0FBUCxDQURKO0FBRUEsbUJBQU8sVUFBVSxRQUFRLENBQVIsRUFBVSxDQUFWLENBQVYsR0FBeUIsQ0FBekIsQ0FIb0I7U0FBUCxDQUF4QixDQURvQjtLQUFiLENBSEM7Q0FBZCxDQUFELENBVUUsS0FBSyxLQUFMLENBVkY7O0FBWUQsS0FBSyxTQUFMLENBQWUsUUFBZixHQUF3QixZQUFVO0FBQzlCLFFBQUksSUFBRSxLQUFLLFFBQUwsRUFBRjtRQUFrQixJQUFFLEtBQUssVUFBTCxFQUFGO1FBQ2xCLE9BQUssS0FBRyxDQUFILFNBQVcsVUFBSyxDQUFoQixHQUFxQixFQUFyQixDQUZxQjtBQUc5QixXQUFVLEtBQUssV0FBTCxZQUFzQixLQUFLLFFBQUwsS0FBZ0IsQ0FBaEIsVUFBcUIsS0FBSyxPQUFMLEtBQWlCLElBQXRFLENBSDhCO0NBQVYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdiYWJlbC1wb2x5ZmlsbCcpXG5cbmltcG9ydCB7aW5pdCxNb2RlbCxVc2VyLFJvbGUsRmlsZSxMb2d9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5cbkRhdGUuSGVscGVyPXJlcXVpcmUoJ21hdGVyaWFsLXVpL2xpYi91dGlscy9kYXRlLXRpbWUnKVxuXG5leHBvcnRzLlJlYWN0PVJlYWN0XG5leHBvcnRzLkNvbXBvbmVudD1Db21wb25lbnRcbmV4cG9ydHMuQXN5bmNDb21wb25lbnQ9cmVxdWlyZSgnLi9jb21wb25lbnRzL2FzeW5jJylcbmV4cG9ydHMuUm91dGVyPXJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpXG5cbmV4cG9ydHMuaW5pdD1pbml0XG5leHBvcnRzLk1vZGVsPU1vZGVsXG5leHBvcnRzLlVzZXI9VXNlclxuZXhwb3J0cy5Sb2xlPVJvbGVcbmV4cG9ydHMuRmlsZT1GaWxlXG5leHBvcnRzLkxvZz1Mb2dcblxuZXhwb3J0cy5RaWxpQXBwPXJlcXVpcmUoJy4vcWlsaUFwcCcpXG5cbmV4cG9ydHMuVUk9e1xuICAgIEVtcHR5OnJlcXVpcmUoJy4vY29tcG9uZW50cy9lbXB0eScpLFxuICAgIExvYWRpbmc6cmVxdWlyZSgnLi9jb21wb25lbnRzL2xvYWRpbmcnKSxcbiAgICBMaXN0OiByZXF1aXJlKCcuL2NvbXBvbmVudHMvbGlzdCcpLFxuICAgIENvbW1lbnQ6cmVxdWlyZSgnLi9jb21wb25lbnRzL2NvbW1lbnQnKSxcbiAgICBDb21tYW5kQmFyOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvY29tbWFuZC1iYXInKSxcbiAgICBQaG90bzogcmVxdWlyZSgnLi9jb21wb25lbnRzL3Bob3RvJyksXG4gICAgTWVzc2FnZXI6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tZXNzYWdlcicpLFxuXHRmaWxlU2VsZWN0b3I6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9maWxlLXNlbGVjdG9yJylcbn1cblxuOyhmdW5jdGlvbihfcmF3KXtcbiAgICB2YXIgbGVuPShuZXcgRGF0ZSgpKS50b0pTT04oKS5sZW5ndGgsXG4gICAgICAgIHI9L14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KD86XFwuXFxkKik/KVokLyxkc1xuICAgIEpTT04ucGFyc2U9KGEscmV2aXZlcik9PntcbiAgICAgICAgcmV0dXJuIF9yYXcuY2FsbChKU09OLGEsKGssdik9PntcbiAgICAgICAgICAgIGlmKHR5cGVvZih2KT09J3N0cmluZycgJiYgdi5sZW5ndGg9PWxlbiAmJiB2W2xlbi0xXT09J1onICYmIChkcz1yLmV4ZWModikpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrZHNbMV0sICtkc1syXSAtIDEsICtkc1szXSwgK2RzWzRdLCAgK2RzWzVdLCArZHNbNl0pKTtcbiAgICAgICAgICAgIHJldHVybiByZXZpdmVyID8gcmV2aXZlcihrLHYpIDogdlxuICAgICAgICB9KVxuICAgIH1cbn0pKEpTT04ucGFyc2UpO1xuXG5EYXRlLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe1xuICAgIHZhciBoPXRoaXMuZ2V0SG91cnMoKSxtPXRoaXMuZ2V0TWludXRlcygpLFxuICAgICAgICB0aW1lPWh8fG0gPyBgICR7aH06JHttfWAgOicnXG4gICAgcmV0dXJuIGAke3RoaXMuZ2V0RnVsbFllYXIoKX0tJHt0aGlzLmdldE1vbnRoKCkrMX0tJHt0aGlzLmdldERhdGUoKX0ke3RpbWV9YFxufVxuIl19