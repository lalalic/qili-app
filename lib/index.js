'use strict';

var _db = require('./db');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');
require('../style/index.less');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBOztBQUNBOzs7Ozs7QUFMQSxRQUFRLGdCQUFSO0FBQ0EsUUFBUSxxQkFBUjs7QUFNQSxLQUFLLE1BQUwsR0FBWSxRQUFRLGlDQUFSLENBQVo7O0FBRUEsUUFBUSxLQUFSO0FBQ0EsUUFBUSxTQUFSO0FBQ0EsUUFBUSxjQUFSLEdBQXVCLFFBQVEsb0JBQVIsQ0FBdkI7QUFDQSxRQUFRLE1BQVIsR0FBZSxRQUFRLGNBQVIsQ0FBZjs7QUFFQSxRQUFRLElBQVI7QUFDQSxRQUFRLEtBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLEdBQVI7O0FBRUEsUUFBUSxPQUFSLEdBQWdCLFFBQVEsV0FBUixDQUFoQjs7QUFFQSxRQUFRLEVBQVIsR0FBVztBQUNQLFdBQU0sUUFBUSxvQkFBUixDQUFOO0FBQ0EsYUFBUSxRQUFRLHNCQUFSLENBQVI7QUFDQSxVQUFNLFFBQVEsbUJBQVIsQ0FBTjtBQUNBLGFBQVEsUUFBUSxzQkFBUixDQUFSO0FBQ0EsZ0JBQVksUUFBUSwwQkFBUixDQUFaO0FBQ0EsV0FBTyxRQUFRLG9CQUFSLENBQVA7QUFDQSxjQUFVLFFBQVEsdUJBQVIsQ0FBVjtBQUNILGtCQUFjLFFBQVEsNEJBQVIsQ0FBZDtDQVJELENBV0MsQ0FBQyxVQUFTLElBQVQsRUFBYztBQUNaLFFBQUksTUFBSSxJQUFLLElBQUosRUFBRCxDQUFhLE1BQWIsR0FBc0IsTUFBdEI7UUFDSixJQUFFLDhEQUFGO1FBQWlFLEVBRHJFLENBRFk7QUFHWixTQUFLLEtBQUwsR0FBVyxVQUFDLENBQUQsRUFBRyxPQUFILEVBQWE7QUFDcEIsZUFBTyxLQUFLLElBQUwsQ0FBVSxJQUFWLEVBQWUsQ0FBZixFQUFpQixVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDM0IsZ0JBQUcsT0FBTyxDQUFQLElBQVcsUUFBWCxJQUF1QixFQUFFLE1BQUYsSUFBVSxHQUFWLElBQWlCLEVBQUUsTUFBSSxDQUFKLENBQUYsSUFBVSxHQUFWLEtBQWtCLEtBQUcsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFILENBQTFELEVBQ0MsT0FBTyxJQUFJLElBQUosQ0FBUyxLQUFLLEdBQUwsQ0FBUyxDQUFDLEdBQUcsQ0FBSCxDQUFELEVBQVEsQ0FBQyxHQUFHLENBQUgsQ0FBRCxHQUFTLENBQVQsRUFBWSxDQUFDLEdBQUcsQ0FBSCxDQUFELEVBQVEsQ0FBQyxHQUFHLENBQUgsQ0FBRCxFQUFTLENBQUMsR0FBRyxDQUFILENBQUQsRUFBUSxDQUFDLEdBQUcsQ0FBSCxDQUFELENBQS9ELENBQVAsQ0FESjtBQUVBLG1CQUFPLFVBQVUsUUFBUSxDQUFSLEVBQVUsQ0FBVixDQUFWLEdBQXlCLENBQXpCLENBSG9CO1NBQVAsQ0FBeEIsQ0FEb0I7S0FBYixDQUhDO0NBQWQsQ0FBRCxDQVVFLEtBQUssS0FBTCxDQVZGOztBQVlELEtBQUssU0FBTCxDQUFlLFFBQWYsR0FBd0IsWUFBVTtBQUM5QixRQUFJLElBQUUsS0FBSyxRQUFMLEVBQUY7UUFBa0IsSUFBRSxLQUFLLFVBQUwsRUFBRjtRQUNsQixPQUFLLEtBQUcsQ0FBSCxTQUFXLFVBQUssQ0FBaEIsR0FBcUIsRUFBckIsQ0FGcUI7QUFHOUIsV0FBVSxLQUFLLFdBQUwsWUFBc0IsS0FBSyxRQUFMLEtBQWdCLENBQWhCLFVBQXFCLEtBQUssT0FBTCxLQUFpQixJQUF0RSxDQUg4QjtDQUFWIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnYmFiZWwtcG9seWZpbGwnKVxucmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5cblxuaW1wb3J0IHtpbml0LE1vZGVsLFVzZXIsUm9sZSxGaWxlLExvZ30gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcblxuRGF0ZS5IZWxwZXI9cmVxdWlyZSgnbWF0ZXJpYWwtdWkvbGliL3V0aWxzL2RhdGUtdGltZScpXG5cbmV4cG9ydHMuUmVhY3Q9UmVhY3RcbmV4cG9ydHMuQ29tcG9uZW50PUNvbXBvbmVudFxuZXhwb3J0cy5Bc3luY0NvbXBvbmVudD1yZXF1aXJlKCcuL2NvbXBvbmVudHMvYXN5bmMnKVxuZXhwb3J0cy5Sb3V0ZXI9cmVxdWlyZSgncmVhY3Qtcm91dGVyJylcblxuZXhwb3J0cy5pbml0PWluaXRcbmV4cG9ydHMuTW9kZWw9TW9kZWxcbmV4cG9ydHMuVXNlcj1Vc2VyXG5leHBvcnRzLlJvbGU9Um9sZVxuZXhwb3J0cy5GaWxlPUZpbGVcbmV4cG9ydHMuTG9nPUxvZ1xuXG5leHBvcnRzLlFpbGlBcHA9cmVxdWlyZSgnLi9xaWxpQXBwJylcblxuZXhwb3J0cy5VST17XG4gICAgRW1wdHk6cmVxdWlyZSgnLi9jb21wb25lbnRzL2VtcHR5JyksXG4gICAgTG9hZGluZzpyZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9hZGluZycpLFxuICAgIExpc3Q6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9saXN0JyksXG4gICAgQ29tbWVudDpyZXF1aXJlKCcuL2NvbXBvbmVudHMvY29tbWVudCcpLFxuICAgIENvbW1hbmRCYXI6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9jb21tYW5kLWJhcicpLFxuICAgIFBob3RvOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGhvdG8nKSxcbiAgICBNZXNzYWdlcjogcmVxdWlyZSgnLi9jb21wb25lbnRzL21lc3NhZ2VyJyksXG5cdGZpbGVTZWxlY3RvcjogcmVxdWlyZSgnLi9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3InKVxufVxuXG47KGZ1bmN0aW9uKF9yYXcpe1xuICAgIHZhciBsZW49KG5ldyBEYXRlKCkpLnRvSlNPTigpLmxlbmd0aCxcbiAgICAgICAgcj0vXihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pVChcXGR7Mn0pOihcXGR7Mn0pOihcXGR7Mn0oPzpcXC5cXGQqKT8pWiQvLGRzXG4gICAgSlNPTi5wYXJzZT0oYSxyZXZpdmVyKT0+e1xuICAgICAgICByZXR1cm4gX3Jhdy5jYWxsKEpTT04sYSwoayx2KT0+e1xuICAgICAgICAgICAgaWYodHlwZW9mKHYpPT0nc3RyaW5nJyAmJiB2Lmxlbmd0aD09bGVuICYmIHZbbGVuLTFdPT0nWicgJiYgKGRzPXIuZXhlYyh2KSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKCtkc1sxXSwgK2RzWzJdIC0gMSwgK2RzWzNdLCArZHNbNF0sICArZHNbNV0sICtkc1s2XSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJldml2ZXIgPyByZXZpdmVyKGssdikgOiB2XG4gICAgICAgIH0pXG4gICAgfVxufSkoSlNPTi5wYXJzZSk7XG5cbkRhdGUucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7XG4gICAgdmFyIGg9dGhpcy5nZXRIb3VycygpLG09dGhpcy5nZXRNaW51dGVzKCksXG4gICAgICAgIHRpbWU9aHx8bSA/IGAgJHtofToke219YCA6JydcbiAgICByZXR1cm4gYCR7dGhpcy5nZXRGdWxsWWVhcigpfS0ke3RoaXMuZ2V0TW9udGgoKSsxfS0ke3RoaXMuZ2V0RGF0ZSgpfSR7dGltZX1gXG59XG4iXX0=