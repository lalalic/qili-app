"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UI = exports.QiliApp = exports.Log = exports.File = exports.Role = exports.User = exports.Model = exports.init = undefined;

var _db = require("./db");

Object.defineProperty(exports, "init", {
    enumerable: true,
    get: function get() {
        return _db.init;
    }
});
Object.defineProperty(exports, "Model", {
    enumerable: true,
    get: function get() {
        return _db.Model;
    }
});
Object.defineProperty(exports, "User", {
    enumerable: true,
    get: function get() {
        return _db.User;
    }
});
Object.defineProperty(exports, "Role", {
    enumerable: true,
    get: function get() {
        return _db.Role;
    }
});
Object.defineProperty(exports, "File", {
    enumerable: true,
    get: function get() {
        return _db.File;
    }
});
Object.defineProperty(exports, "Log", {
    enumerable: true,
    get: function get() {
        return _db.Log;
    }
});

var _qiliApp = require("./qiliApp");

Object.defineProperty(exports, "QiliApp", {
    enumerable: true,
    get: function get() {
        return _qiliApp.QiliApp;
    }
});

require("babel-polyfill");

var UI = exports.UI = {
    Empty: require('./components/empty'),
    Loading: require('./components/loading'),
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
            if (typeof v == 'string' && v[v.length - 1] == 'Z' && v[10] == 'T' && (ds = r.exec(v))) return new Date(Date.UTC(+ds[1], +ds[2] - 1, +ds[3], +ds[4], +ds[5], +ds[6]));
            return reviver ? reviver(k, v) : v;
        });
    };
})(JSON.parse);

Date.prototype.toString = function () {
    var h = this.getHours(),
        m = this.getMinutes(),
        time = h || m ? " " + h + ":" + m : '';
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + time;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJRaWxpQXBwIiwiVUkiLCJFbXB0eSIsInJlcXVpcmUiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJQaG90byIsIk1lc3NhZ2VyIiwiZmlsZVNlbGVjdG9yIiwiQWNjb3VudCIsIl9yYXciLCJyIiwiZHMiLCJKU09OIiwicGFyc2UiLCJhIiwicmV2aXZlciIsImNhbGwiLCJrIiwidiIsImxlbmd0aCIsImV4ZWMiLCJEYXRlIiwiVVRDIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJoIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInRpbWUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O21CQUVRQSxJOzs7Ozs7bUJBQUtDLEs7Ozs7OzttQkFBTUMsSTs7Ozs7O21CQUFLQyxJOzs7Ozs7bUJBQUtDLEk7Ozs7OzttQkFBS0MsRzs7Ozs7Ozs7O3dCQUMxQkMsTzs7OztBQUhSOztBQUlPLElBQU1DLGtCQUFHO0FBQ1pDLFdBQU1DLFFBQVEsb0JBQVIsQ0FETTtBQUVaQyxhQUFRRCxRQUFRLHNCQUFSLENBRkk7QUFHWkUsYUFBUUYsUUFBUSxzQkFBUixDQUhJO0FBSVpHLGdCQUFZSCxRQUFRLDBCQUFSLENBSkE7QUFLWkksV0FBT0osUUFBUSxvQkFBUixDQUxLO0FBTVpLLGNBQVVMLFFBQVEsdUJBQVIsQ0FORTtBQU9mTSxrQkFBY04sUUFBUSw0QkFBUixDQVBDO0FBUWZPLGFBQVNQLFFBQVEsc0JBQVI7QUFSTSxDQUFULENBV04sQ0FBQyxVQUFTUSxJQUFULEVBQWM7QUFDWixRQUFJQyxJQUFFLDhEQUFOO0FBQUEsUUFBcUVDLEVBQXJFO0FBQ0FDLFNBQUtDLEtBQUwsR0FBVyxVQUFDQyxDQUFELEVBQUdDLE9BQUgsRUFBYTtBQUNwQixlQUFPTixLQUFLTyxJQUFMLENBQVVKLElBQVYsRUFBZUUsQ0FBZixFQUFpQixVQUFDRyxDQUFELEVBQUdDLENBQUgsRUFBTztBQUMzQixnQkFBRyxPQUFPQSxDQUFQLElBQVcsUUFBWCxJQUF1QkEsRUFBRUEsRUFBRUMsTUFBRixHQUFTLENBQVgsS0FBZSxHQUF0QyxJQUE2Q0QsRUFBRSxFQUFGLEtBQU8sR0FBcEQsS0FBNERQLEtBQUdELEVBQUVVLElBQUYsQ0FBT0YsQ0FBUCxDQUEvRCxDQUFILEVBQ0ksT0FBTyxJQUFJRyxJQUFKLENBQVNBLEtBQUtDLEdBQUwsQ0FBUyxDQUFDWCxHQUFHLENBQUgsQ0FBVixFQUFpQixDQUFDQSxHQUFHLENBQUgsQ0FBRCxHQUFTLENBQTFCLEVBQTZCLENBQUNBLEdBQUcsQ0FBSCxDQUE5QixFQUFxQyxDQUFDQSxHQUFHLENBQUgsQ0FBdEMsRUFBOEMsQ0FBQ0EsR0FBRyxDQUFILENBQS9DLEVBQXNELENBQUNBLEdBQUcsQ0FBSCxDQUF2RCxDQUFULENBQVA7QUFDSixtQkFBT0ksVUFBVUEsUUFBUUUsQ0FBUixFQUFVQyxDQUFWLENBQVYsR0FBeUJBLENBQWhDO0FBQ0gsU0FKTSxDQUFQO0FBS0gsS0FORDtBQU9ILENBVEEsRUFTRU4sS0FBS0MsS0FUUDs7QUFXRFEsS0FBS0UsU0FBTCxDQUFlQyxRQUFmLEdBQXdCLFlBQVU7QUFDOUIsUUFBSUMsSUFBRSxLQUFLQyxRQUFMLEVBQU47QUFBQSxRQUFzQkMsSUFBRSxLQUFLQyxVQUFMLEVBQXhCO0FBQUEsUUFDSUMsT0FBS0osS0FBR0UsQ0FBSCxTQUFXRixDQUFYLFNBQWdCRSxDQUFoQixHQUFxQixFQUQ5QjtBQUVBLFdBQVUsS0FBS0csV0FBTCxFQUFWLFVBQWdDLEtBQUtDLFFBQUwsS0FBZ0IsQ0FBaEQsVUFBcUQsS0FBS0MsT0FBTCxFQUFyRCxHQUFzRUgsSUFBdEU7QUFDSCxDQUpEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCdcblxuZXhwb3J0IHtpbml0LE1vZGVsLFVzZXIsUm9sZSxGaWxlLExvZ30gZnJvbSBcIi4vZGJcIlxuZXhwb3J0IHtRaWxpQXBwfSBmcm9tIFwiLi9xaWxpQXBwXCJcbmV4cG9ydCBjb25zdCBVST17XG4gICAgRW1wdHk6cmVxdWlyZSgnLi9jb21wb25lbnRzL2VtcHR5JyksXG4gICAgTG9hZGluZzpyZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9hZGluZycpLFxuICAgIENvbW1lbnQ6cmVxdWlyZSgnLi9jb21wb25lbnRzL2NvbW1lbnQnKSxcbiAgICBDb21tYW5kQmFyOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvY29tbWFuZC1iYXInKSxcbiAgICBQaG90bzogcmVxdWlyZSgnLi9jb21wb25lbnRzL3Bob3RvJyksXG4gICAgTWVzc2FnZXI6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tZXNzYWdlcicpLFxuXHRmaWxlU2VsZWN0b3I6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9maWxlLXNlbGVjdG9yJyksXG5cdEFjY291bnQ6IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYWNjb3VudFwiKVxufVxuXG47KGZ1bmN0aW9uKF9yYXcpe1xuICAgIHZhciByPS9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopPylaJC8sZHNcbiAgICBKU09OLnBhcnNlPShhLHJldml2ZXIpPT57XG4gICAgICAgIHJldHVybiBfcmF3LmNhbGwoSlNPTixhLChrLHYpPT57XG4gICAgICAgICAgICBpZih0eXBlb2Yodik9PSdzdHJpbmcnICYmIHZbdi5sZW5ndGgtMV09PSdaJyAmJiB2WzEwXT09J1QnICYmIChkcz1yLmV4ZWModikpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrZHNbMV0sICtkc1syXSAtIDEsICtkc1szXSwgK2RzWzRdLCAgK2RzWzVdLCArZHNbNl0pKTtcbiAgICAgICAgICAgIHJldHVybiByZXZpdmVyID8gcmV2aXZlcihrLHYpIDogdlxuICAgICAgICB9KVxuICAgIH1cbn0pKEpTT04ucGFyc2UpO1xuXG5EYXRlLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe1xuICAgIHZhciBoPXRoaXMuZ2V0SG91cnMoKSxtPXRoaXMuZ2V0TWludXRlcygpLFxuICAgICAgICB0aW1lPWh8fG0gPyBgICR7aH06JHttfWAgOicnXG4gICAgcmV0dXJuIGAke3RoaXMuZ2V0RnVsbFllYXIoKX0tJHt0aGlzLmdldE1vbnRoKCkrMX0tJHt0aGlzLmdldERhdGUoKX0ke3RpbWV9YFxufVxuIl19