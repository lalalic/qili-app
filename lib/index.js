'use strict';

require('babel-polyfill');

var _db = require('./db');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    fileSelector: require('./components/file-selector'),
    Account: require("./components/account")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUNBOzs7Ozs7QUFFQSxRQUFRLEtBQVI7QUFDQSxRQUFRLFNBQVI7QUFDQSxRQUFRLGNBQVIsR0FBdUIsUUFBUSxvQkFBUixDQUF2Qjs7QUFFQSxRQUFRLElBQVI7QUFDQSxRQUFRLEtBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLEdBQVI7O0FBRUEsUUFBUSxPQUFSLEdBQWdCLFFBQVEsV0FBUixDQUFoQjs7QUFFQSxRQUFRLEVBQVIsR0FBVztBQUNQLFdBQU0sUUFBUSxvQkFBUixDQUFOO0FBQ0EsYUFBUSxRQUFRLHNCQUFSLENBQVI7QUFDQSxVQUFNLFFBQVEsbUJBQVIsQ0FBTjtBQUNBLGFBQVEsUUFBUSxzQkFBUixDQUFSO0FBQ0EsZ0JBQVksUUFBUSwwQkFBUixDQUFaO0FBQ0EsV0FBTyxRQUFRLG9CQUFSLENBQVA7QUFDQSxjQUFVLFFBQVEsdUJBQVIsQ0FBVjtBQUNILGtCQUFjLFFBQVEsNEJBQVIsQ0FBZDtBQUNBLGFBQVMsUUFBUSxzQkFBUixDQUFUO0NBVEQsQ0FZQyxDQUFDLFVBQVMsSUFBVCxFQUFjO0FBQ1osUUFBSSxNQUFJLElBQUssSUFBSixFQUFELENBQWEsTUFBYixHQUFzQixNQUF0QjtRQUNKLElBQUUsOERBQUY7UUFBaUUsRUFEckUsQ0FEWTtBQUdaLFNBQUssS0FBTCxHQUFXLFVBQUMsQ0FBRCxFQUFHLE9BQUgsRUFBYTtBQUNwQixlQUFPLEtBQUssSUFBTCxDQUFVLElBQVYsRUFBZSxDQUFmLEVBQWlCLFVBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTztBQUMzQixnQkFBRyxPQUFPLENBQVAsSUFBVyxRQUFYLElBQXVCLEVBQUUsTUFBRixJQUFVLEdBQVYsSUFBaUIsRUFBRSxNQUFJLENBQUosQ0FBRixJQUFVLEdBQVYsS0FBa0IsS0FBRyxFQUFFLElBQUYsQ0FBTyxDQUFQLENBQUgsQ0FBMUQsRUFDQyxPQUFPLElBQUksSUFBSixDQUFTLEtBQUssR0FBTCxDQUFTLENBQUMsR0FBRyxDQUFILENBQUQsRUFBUSxDQUFDLEdBQUcsQ0FBSCxDQUFELEdBQVMsQ0FBVCxFQUFZLENBQUMsR0FBRyxDQUFILENBQUQsRUFBUSxDQUFDLEdBQUcsQ0FBSCxDQUFELEVBQVMsQ0FBQyxHQUFHLENBQUgsQ0FBRCxFQUFRLENBQUMsR0FBRyxDQUFILENBQUQsQ0FBL0QsQ0FBUCxDQURKO0FBRUEsbUJBQU8sVUFBVSxRQUFRLENBQVIsRUFBVSxDQUFWLENBQVYsR0FBeUIsQ0FBekIsQ0FIb0I7U0FBUCxDQUF4QixDQURvQjtLQUFiLENBSEM7Q0FBZCxDQUFELENBVUUsS0FBSyxLQUFMLENBVkY7O0FBWUQsS0FBSyxTQUFMLENBQWUsUUFBZixHQUF3QixZQUFVO0FBQzlCLFFBQUksSUFBRSxLQUFLLFFBQUwsRUFBRjtRQUFrQixJQUFFLEtBQUssVUFBTCxFQUFGO1FBQ2xCLE9BQUssS0FBRyxDQUFILFNBQVcsVUFBSyxDQUFoQixHQUFxQixFQUFyQixDQUZxQjtBQUc5QixXQUFVLEtBQUssV0FBTCxZQUFzQixLQUFLLFFBQUwsS0FBZ0IsQ0FBaEIsVUFBcUIsS0FBSyxPQUFMLEtBQWlCLElBQXRFLENBSDhCO0NBQVYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5pbXBvcnQge2luaXQsTW9kZWwsVXNlcixSb2xlLEZpbGUsTG9nfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnRzLlJlYWN0PVJlYWN0XG5leHBvcnRzLkNvbXBvbmVudD1Db21wb25lbnRcbmV4cG9ydHMuQXN5bmNDb21wb25lbnQ9cmVxdWlyZSgnLi9jb21wb25lbnRzL2FzeW5jJylcblxuZXhwb3J0cy5pbml0PWluaXRcbmV4cG9ydHMuTW9kZWw9TW9kZWxcbmV4cG9ydHMuVXNlcj1Vc2VyXG5leHBvcnRzLlJvbGU9Um9sZVxuZXhwb3J0cy5GaWxlPUZpbGVcbmV4cG9ydHMuTG9nPUxvZ1xuXG5leHBvcnRzLlFpbGlBcHA9cmVxdWlyZSgnLi9xaWxpQXBwJylcblxuZXhwb3J0cy5VST17XG4gICAgRW1wdHk6cmVxdWlyZSgnLi9jb21wb25lbnRzL2VtcHR5JyksXG4gICAgTG9hZGluZzpyZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9hZGluZycpLFxuICAgIExpc3Q6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9saXN0JyksXG4gICAgQ29tbWVudDpyZXF1aXJlKCcuL2NvbXBvbmVudHMvY29tbWVudCcpLFxuICAgIENvbW1hbmRCYXI6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9jb21tYW5kLWJhcicpLFxuICAgIFBob3RvOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvcGhvdG8nKSxcbiAgICBNZXNzYWdlcjogcmVxdWlyZSgnLi9jb21wb25lbnRzL21lc3NhZ2VyJyksXG5cdGZpbGVTZWxlY3RvcjogcmVxdWlyZSgnLi9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3InKSxcblx0QWNjb3VudDogcmVxdWlyZShcIi4vY29tcG9uZW50cy9hY2NvdW50XCIpXG59XG5cbjsoZnVuY3Rpb24oX3Jhdyl7XG4gICAgdmFyIGxlbj0obmV3IERhdGUoKSkudG9KU09OKCkubGVuZ3RoLFxuICAgICAgICByPS9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopPylaJC8sZHNcbiAgICBKU09OLnBhcnNlPShhLHJldml2ZXIpPT57XG4gICAgICAgIHJldHVybiBfcmF3LmNhbGwoSlNPTixhLChrLHYpPT57XG4gICAgICAgICAgICBpZih0eXBlb2Yodik9PSdzdHJpbmcnICYmIHYubGVuZ3RoPT1sZW4gJiYgdltsZW4tMV09PSdaJyAmJiAoZHM9ci5leGVjKHYpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoK2RzWzFdLCArZHNbMl0gLSAxLCArZHNbM10sICtkc1s0XSwgICtkc1s1XSwgK2RzWzZdKSk7XG4gICAgICAgICAgICByZXR1cm4gcmV2aXZlciA/IHJldml2ZXIoayx2KSA6IHZcbiAgICAgICAgfSlcbiAgICB9XG59KShKU09OLnBhcnNlKTtcblxuRGF0ZS5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtcbiAgICB2YXIgaD10aGlzLmdldEhvdXJzKCksbT10aGlzLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgdGltZT1ofHxtID8gYCAke2h9OiR7bX1gIDonJ1xuICAgIHJldHVybiBgJHt0aGlzLmdldEZ1bGxZZWFyKCl9LSR7dGhpcy5nZXRNb250aCgpKzF9LSR7dGhpcy5nZXREYXRlKCl9JHt0aW1lfWBcbn1cbiJdfQ==