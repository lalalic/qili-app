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
    var r = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/,
        ds;
    JSON.parse = function (a, reviver) {
        return _raw.call(JSON, a, function (k, v) {
            if (typeof v == 'string' && v[v.length - 1] == 'Z' && v[8] == 'T' && (ds = r.exec(v))) return new Date(Date.UTC(+ds[1], +ds[2] - 1, +ds[3], +ds[4], +ds[5], +ds[6]));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUNBOzs7Ozs7QUFFQSxRQUFRLEtBQVI7QUFDQSxRQUFRLFNBQVI7QUFDQSxRQUFRLGNBQVIsR0FBdUIsUUFBUSxvQkFBUixDQUF2Qjs7QUFFQSxRQUFRLElBQVI7QUFDQSxRQUFRLEtBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLEdBQVI7O0FBRUEsUUFBUSxPQUFSLEdBQWdCLFFBQVEsV0FBUixDQUFoQjs7QUFFQSxRQUFRLEVBQVIsR0FBVztBQUNQLFdBQU0sUUFBUSxvQkFBUixDQUFOO0FBQ0EsYUFBUSxRQUFRLHNCQUFSLENBQVI7QUFDQSxVQUFNLFFBQVEsbUJBQVIsQ0FBTjtBQUNBLGFBQVEsUUFBUSxzQkFBUixDQUFSO0FBQ0EsZ0JBQVksUUFBUSwwQkFBUixDQUFaO0FBQ0EsV0FBTyxRQUFRLG9CQUFSLENBQVA7QUFDQSxjQUFVLFFBQVEsdUJBQVIsQ0FBVjtBQUNILGtCQUFjLFFBQVEsNEJBQVIsQ0FBZDtBQUNBLGFBQVMsUUFBUSxzQkFBUixDQUFUO0NBVEQsQ0FZQyxDQUFDLFVBQVMsSUFBVCxFQUFjO0FBQ1osUUFBSSxJQUFFLDhEQUFGO1FBQWlFLEVBQXJFLENBRFk7QUFFWixTQUFLLEtBQUwsR0FBVyxVQUFDLENBQUQsRUFBRyxPQUFILEVBQWE7QUFDcEIsZUFBTyxLQUFLLElBQUwsQ0FBVSxJQUFWLEVBQWUsQ0FBZixFQUFpQixVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDM0IsZ0JBQUcsT0FBTyxDQUFQLElBQVcsUUFBWCxJQUF1QixFQUFFLEVBQUUsTUFBRixHQUFTLENBQVQsQ0FBRixJQUFlLEdBQWYsSUFBc0IsRUFBRSxDQUFGLEtBQU0sR0FBTixLQUFjLEtBQUcsRUFBRSxJQUFGLENBQU8sQ0FBUCxDQUFILENBQTNELEVBQ0MsT0FBTyxJQUFJLElBQUosQ0FBUyxLQUFLLEdBQUwsQ0FBUyxDQUFDLEdBQUcsQ0FBSCxDQUFELEVBQVEsQ0FBQyxHQUFHLENBQUgsQ0FBRCxHQUFTLENBQVQsRUFBWSxDQUFDLEdBQUcsQ0FBSCxDQUFELEVBQVEsQ0FBQyxHQUFHLENBQUgsQ0FBRCxFQUFTLENBQUMsR0FBRyxDQUFILENBQUQsRUFBUSxDQUFDLEdBQUcsQ0FBSCxDQUFELENBQS9ELENBQVAsQ0FESjtBQUVBLG1CQUFPLFVBQVUsUUFBUSxDQUFSLEVBQVUsQ0FBVixDQUFWLEdBQXlCLENBQXpCLENBSG9CO1NBQVAsQ0FBeEIsQ0FEb0I7S0FBYixDQUZDO0NBQWQsQ0FBRCxDQVNFLEtBQUssS0FBTCxDQVRGOztBQVdELEtBQUssU0FBTCxDQUFlLFFBQWYsR0FBd0IsWUFBVTtBQUM5QixRQUFJLElBQUUsS0FBSyxRQUFMLEVBQUY7UUFBa0IsSUFBRSxLQUFLLFVBQUwsRUFBRjtRQUNsQixPQUFLLEtBQUcsQ0FBSCxTQUFXLFVBQUssQ0FBaEIsR0FBcUIsRUFBckIsQ0FGcUI7QUFHOUIsV0FBVSxLQUFLLFdBQUwsWUFBc0IsS0FBSyxRQUFMLEtBQWdCLENBQWhCLFVBQXFCLEtBQUssT0FBTCxLQUFpQixJQUF0RSxDQUg4QjtDQUFWIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCdcblxuaW1wb3J0IHtpbml0LE1vZGVsLFVzZXIsUm9sZSxGaWxlLExvZ30gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcblxuZXhwb3J0cy5SZWFjdD1SZWFjdFxuZXhwb3J0cy5Db21wb25lbnQ9Q29tcG9uZW50XG5leHBvcnRzLkFzeW5jQ29tcG9uZW50PXJlcXVpcmUoJy4vY29tcG9uZW50cy9hc3luYycpXG5cbmV4cG9ydHMuaW5pdD1pbml0XG5leHBvcnRzLk1vZGVsPU1vZGVsXG5leHBvcnRzLlVzZXI9VXNlclxuZXhwb3J0cy5Sb2xlPVJvbGVcbmV4cG9ydHMuRmlsZT1GaWxlXG5leHBvcnRzLkxvZz1Mb2dcblxuZXhwb3J0cy5RaWxpQXBwPXJlcXVpcmUoJy4vcWlsaUFwcCcpXG5cbmV4cG9ydHMuVUk9e1xuICAgIEVtcHR5OnJlcXVpcmUoJy4vY29tcG9uZW50cy9lbXB0eScpLFxuICAgIExvYWRpbmc6cmVxdWlyZSgnLi9jb21wb25lbnRzL2xvYWRpbmcnKSxcbiAgICBMaXN0OiByZXF1aXJlKCcuL2NvbXBvbmVudHMvbGlzdCcpLFxuICAgIENvbW1lbnQ6cmVxdWlyZSgnLi9jb21wb25lbnRzL2NvbW1lbnQnKSxcbiAgICBDb21tYW5kQmFyOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvY29tbWFuZC1iYXInKSxcbiAgICBQaG90bzogcmVxdWlyZSgnLi9jb21wb25lbnRzL3Bob3RvJyksXG4gICAgTWVzc2FnZXI6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tZXNzYWdlcicpLFxuXHRmaWxlU2VsZWN0b3I6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9maWxlLXNlbGVjdG9yJyksXG5cdEFjY291bnQ6IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYWNjb3VudFwiKVxufVxuXG47KGZ1bmN0aW9uKF9yYXcpe1xuICAgIHZhciByPS9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopPylaJC8sZHNcbiAgICBKU09OLnBhcnNlPShhLHJldml2ZXIpPT57XG4gICAgICAgIHJldHVybiBfcmF3LmNhbGwoSlNPTixhLChrLHYpPT57XG4gICAgICAgICAgICBpZih0eXBlb2Yodik9PSdzdHJpbmcnICYmIHZbdi5sZW5ndGgtMV09PSdaJyAmJiB2WzhdPT0nVCcgJiYgKGRzPXIuZXhlYyh2KSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKCtkc1sxXSwgK2RzWzJdIC0gMSwgK2RzWzNdLCArZHNbNF0sICArZHNbNV0sICtkc1s2XSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJldml2ZXIgPyByZXZpdmVyKGssdikgOiB2XG4gICAgICAgIH0pXG4gICAgfVxufSkoSlNPTi5wYXJzZSk7XG5cbkRhdGUucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7XG4gICAgdmFyIGg9dGhpcy5nZXRIb3VycygpLG09dGhpcy5nZXRNaW51dGVzKCksXG4gICAgICAgIHRpbWU9aHx8bSA/IGAgJHtofToke219YCA6JydcbiAgICByZXR1cm4gYCR7dGhpcy5nZXRGdWxsWWVhcigpfS0ke3RoaXMuZ2V0TW9udGgoKSsxfS0ke3RoaXMuZ2V0RGF0ZSgpfSR7dGltZX1gXG59XG4iXX0=