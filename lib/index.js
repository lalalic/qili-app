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
exports.immutable = require('immutable');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBOztBQUNBOzs7Ozs7QUFMQSxRQUFRLGdCQUFSO0FBQ0EsUUFBUSxxQkFBUjs7QUFNQSxLQUFLLE1BQUwsR0FBWSxRQUFRLGlDQUFSLENBQVo7O0FBRUEsUUFBUSxLQUFSO0FBQ0EsUUFBUSxTQUFSO0FBQ0EsUUFBUSxjQUFSLEdBQXVCLFFBQVEsb0JBQVIsQ0FBdkI7QUFDQSxRQUFRLE1BQVIsR0FBZSxRQUFRLGNBQVIsQ0FBZjtBQUNBLFFBQVEsU0FBUixHQUFrQixRQUFRLFdBQVIsQ0FBbEI7O0FBRUEsUUFBUSxJQUFSO0FBQ0EsUUFBUSxLQUFSO0FBQ0EsUUFBUSxJQUFSO0FBQ0EsUUFBUSxJQUFSO0FBQ0EsUUFBUSxJQUFSO0FBQ0EsUUFBUSxHQUFSOztBQUVBLFFBQVEsT0FBUixHQUFnQixRQUFRLFdBQVIsQ0FBaEI7O0FBRUEsUUFBUSxFQUFSLEdBQVc7QUFDUCxXQUFNLFFBQVEsb0JBQVIsQ0FBTjtBQUNBLGFBQVEsUUFBUSxzQkFBUixDQUFSO0FBQ0EsVUFBTSxRQUFRLG1CQUFSLENBQU47QUFDQSxhQUFRLFFBQVEsc0JBQVIsQ0FBUjtBQUNBLGdCQUFZLFFBQVEsMEJBQVIsQ0FBWjtBQUNBLFdBQU8sUUFBUSxvQkFBUixDQUFQO0FBQ0EsY0FBVSxRQUFRLHVCQUFSLENBQVY7QUFDSCxrQkFBYyxRQUFRLDRCQUFSLENBQWQ7Q0FSRCxDQVdDLENBQUMsVUFBUyxJQUFULEVBQWM7QUFDWixRQUFJLE1BQUksSUFBSyxJQUFKLEVBQUQsQ0FBYSxNQUFiLEdBQXNCLE1BQXRCO1FBQ0osSUFBRSw4REFBRjtRQUFpRSxFQURyRSxDQURZO0FBR1osU0FBSyxLQUFMLEdBQVcsVUFBQyxDQUFELEVBQUcsT0FBSCxFQUFhO0FBQ3BCLGVBQU8sS0FBSyxJQUFMLENBQVUsSUFBVixFQUFlLENBQWYsRUFBaUIsVUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFPO0FBQzNCLGdCQUFHLE9BQU8sQ0FBUCxJQUFXLFFBQVgsSUFBdUIsRUFBRSxNQUFGLElBQVUsR0FBVixJQUFpQixFQUFFLE1BQUksQ0FBSixDQUFGLElBQVUsR0FBVixLQUFrQixLQUFHLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBSCxDQUExRCxFQUNDLE9BQU8sSUFBSSxJQUFKLENBQVMsS0FBSyxHQUFMLENBQVMsQ0FBQyxHQUFHLENBQUgsQ0FBRCxFQUFRLENBQUMsR0FBRyxDQUFILENBQUQsR0FBUyxDQUFULEVBQVksQ0FBQyxHQUFHLENBQUgsQ0FBRCxFQUFRLENBQUMsR0FBRyxDQUFILENBQUQsRUFBUyxDQUFDLEdBQUcsQ0FBSCxDQUFELEVBQVEsQ0FBQyxHQUFHLENBQUgsQ0FBRCxDQUEvRCxDQUFQLENBREo7QUFFQSxtQkFBTyxVQUFVLFFBQVEsQ0FBUixFQUFVLENBQVYsQ0FBVixHQUF5QixDQUF6QixDQUhvQjtTQUFQLENBQXhCLENBRG9CO0tBQWIsQ0FIQztDQUFkLENBQUQsQ0FVRSxLQUFLLEtBQUwsQ0FWRjs7QUFZRCxLQUFLLFNBQUwsQ0FBZSxRQUFmLEdBQXdCLFlBQVU7QUFDOUIsUUFBSSxJQUFFLEtBQUssUUFBTCxFQUFGO1FBQWtCLElBQUUsS0FBSyxVQUFMLEVBQUY7UUFDbEIsT0FBSyxLQUFHLENBQUgsU0FBVyxVQUFLLENBQWhCLEdBQXFCLEVBQXJCLENBRnFCO0FBRzlCLFdBQVUsS0FBSyxXQUFMLFlBQXNCLEtBQUssUUFBTCxLQUFnQixDQUFoQixVQUFxQixLQUFLLE9BQUwsS0FBaUIsSUFBdEUsQ0FIOEI7Q0FBViIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ2JhYmVsLXBvbHlmaWxsJylcbnJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5cbmltcG9ydCB7aW5pdCxNb2RlbCxVc2VyLFJvbGUsRmlsZSxMb2d9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5cbkRhdGUuSGVscGVyPXJlcXVpcmUoJ21hdGVyaWFsLXVpL2xpYi91dGlscy9kYXRlLXRpbWUnKVxuXG5leHBvcnRzLlJlYWN0PVJlYWN0XG5leHBvcnRzLkNvbXBvbmVudD1Db21wb25lbnRcbmV4cG9ydHMuQXN5bmNDb21wb25lbnQ9cmVxdWlyZSgnLi9jb21wb25lbnRzL2FzeW5jJylcbmV4cG9ydHMuUm91dGVyPXJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpXG5leHBvcnRzLmltbXV0YWJsZT1yZXF1aXJlKCdpbW11dGFibGUnKVxuXG5leHBvcnRzLmluaXQ9aW5pdFxuZXhwb3J0cy5Nb2RlbD1Nb2RlbFxuZXhwb3J0cy5Vc2VyPVVzZXJcbmV4cG9ydHMuUm9sZT1Sb2xlXG5leHBvcnRzLkZpbGU9RmlsZVxuZXhwb3J0cy5Mb2c9TG9nXG5cbmV4cG9ydHMuUWlsaUFwcD1yZXF1aXJlKCcuL3FpbGlBcHAnKVxuXG5leHBvcnRzLlVJPXtcbiAgICBFbXB0eTpyZXF1aXJlKCcuL2NvbXBvbmVudHMvZW1wdHknKSxcbiAgICBMb2FkaW5nOnJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2FkaW5nJyksXG4gICAgTGlzdDogcmVxdWlyZSgnLi9jb21wb25lbnRzL2xpc3QnKSxcbiAgICBDb21tZW50OnJlcXVpcmUoJy4vY29tcG9uZW50cy9jb21tZW50JyksXG4gICAgQ29tbWFuZEJhcjogcmVxdWlyZSgnLi9jb21wb25lbnRzL2NvbW1hbmQtYmFyJyksXG4gICAgUGhvdG86IHJlcXVpcmUoJy4vY29tcG9uZW50cy9waG90bycpLFxuICAgIE1lc3NhZ2VyOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWVzc2FnZXInKSxcblx0ZmlsZVNlbGVjdG9yOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvZmlsZS1zZWxlY3RvcicpXG59XG5cbjsoZnVuY3Rpb24oX3Jhdyl7XG4gICAgdmFyIGxlbj0obmV3IERhdGUoKSkudG9KU09OKCkubGVuZ3RoLFxuICAgICAgICByPS9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopPylaJC8sZHNcbiAgICBKU09OLnBhcnNlPShhLHJldml2ZXIpPT57XG4gICAgICAgIHJldHVybiBfcmF3LmNhbGwoSlNPTixhLChrLHYpPT57XG4gICAgICAgICAgICBpZih0eXBlb2Yodik9PSdzdHJpbmcnICYmIHYubGVuZ3RoPT1sZW4gJiYgdltsZW4tMV09PSdaJyAmJiAoZHM9ci5leGVjKHYpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoK2RzWzFdLCArZHNbMl0gLSAxLCArZHNbM10sICtkc1s0XSwgICtkc1s1XSwgK2RzWzZdKSk7XG4gICAgICAgICAgICByZXR1cm4gcmV2aXZlciA/IHJldml2ZXIoayx2KSA6IHZcbiAgICAgICAgfSlcbiAgICB9XG59KShKU09OLnBhcnNlKTtcblxuRGF0ZS5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtcbiAgICB2YXIgaD10aGlzLmdldEhvdXJzKCksbT10aGlzLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgdGltZT1ofHxtID8gYCAke2h9OiR7bX1gIDonJ1xuICAgIHJldHVybiBgJHt0aGlzLmdldEZ1bGxZZWFyKCl9LSR7dGhpcy5nZXRNb250aCgpKzF9LSR7dGhpcy5nZXREYXRlKCl9JHt0aW1lfWBcbn1cbiJdfQ==