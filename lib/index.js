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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJRaWxpQXBwIiwiVUkiLCJFbXB0eSIsInJlcXVpcmUiLCJMb2FkaW5nIiwiTGlzdCIsIkNvbW1lbnQiLCJDb21tYW5kQmFyIiwiUGhvdG8iLCJNZXNzYWdlciIsImZpbGVTZWxlY3RvciIsIkFjY291bnQiLCJfcmF3IiwiciIsImRzIiwiSlNPTiIsInBhcnNlIiwiYSIsInJldml2ZXIiLCJjYWxsIiwiayIsInYiLCJsZW5ndGgiLCJleGVjIiwiRGF0ZSIsIlVUQyIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJ0aW1lIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzttQkFFUUEsSTs7Ozs7O21CQUFLQyxLOzs7Ozs7bUJBQU1DLEk7Ozs7OzttQkFBS0MsSTs7Ozs7O21CQUFLQyxJOzs7Ozs7bUJBQUtDLEc7Ozs7Ozs7Ozt3QkFDMUJDLE87Ozs7QUFIUjs7QUFJTyxJQUFNQyxrQkFBRztBQUNaQyxXQUFNQyxRQUFRLG9CQUFSLENBRE07QUFFWkMsYUFBUUQsUUFBUSxzQkFBUixDQUZJO0FBR1pFLFVBQU1GLFFBQVEsbUJBQVIsQ0FITTtBQUlaRyxhQUFRSCxRQUFRLHNCQUFSLENBSkk7QUFLWkksZ0JBQVlKLFFBQVEsMEJBQVIsQ0FMQTtBQU1aSyxXQUFPTCxRQUFRLG9CQUFSLENBTks7QUFPWk0sY0FBVU4sUUFBUSx1QkFBUixDQVBFO0FBUWZPLGtCQUFjUCxRQUFRLDRCQUFSLENBUkM7QUFTZlEsYUFBU1IsUUFBUSxzQkFBUjtBQVRNLENBQVQsQ0FZTixDQUFDLFVBQVNTLElBQVQsRUFBYztBQUNaLFFBQUlDLElBQUUsOERBQU47QUFBQSxRQUFxRUMsRUFBckU7QUFDQUMsU0FBS0MsS0FBTCxHQUFXLFVBQUNDLENBQUQsRUFBR0MsT0FBSCxFQUFhO0FBQ3BCLGVBQU9OLEtBQUtPLElBQUwsQ0FBVUosSUFBVixFQUFlRSxDQUFmLEVBQWlCLFVBQUNHLENBQUQsRUFBR0MsQ0FBSCxFQUFPO0FBQzNCLGdCQUFHLE9BQU9BLENBQVAsSUFBVyxRQUFYLElBQXVCQSxFQUFFQSxFQUFFQyxNQUFGLEdBQVMsQ0FBWCxLQUFlLEdBQXRDLElBQTZDRCxFQUFFLEVBQUYsS0FBTyxHQUFwRCxLQUE0RFAsS0FBR0QsRUFBRVUsSUFBRixDQUFPRixDQUFQLENBQS9ELENBQUgsRUFDSSxPQUFPLElBQUlHLElBQUosQ0FBU0EsS0FBS0MsR0FBTCxDQUFTLENBQUNYLEdBQUcsQ0FBSCxDQUFWLEVBQWlCLENBQUNBLEdBQUcsQ0FBSCxDQUFELEdBQVMsQ0FBMUIsRUFBNkIsQ0FBQ0EsR0FBRyxDQUFILENBQTlCLEVBQXFDLENBQUNBLEdBQUcsQ0FBSCxDQUF0QyxFQUE4QyxDQUFDQSxHQUFHLENBQUgsQ0FBL0MsRUFBc0QsQ0FBQ0EsR0FBRyxDQUFILENBQXZELENBQVQsQ0FBUDtBQUNKLG1CQUFPSSxVQUFVQSxRQUFRRSxDQUFSLEVBQVVDLENBQVYsQ0FBVixHQUF5QkEsQ0FBaEM7QUFDSCxTQUpNLENBQVA7QUFLSCxLQU5EO0FBT0gsQ0FUQSxFQVNFTixLQUFLQyxLQVRQOztBQVdEUSxLQUFLRSxTQUFMLENBQWVDLFFBQWYsR0FBd0IsWUFBVTtBQUM5QixRQUFJQyxJQUFFLEtBQUtDLFFBQUwsRUFBTjtBQUFBLFFBQXNCQyxJQUFFLEtBQUtDLFVBQUwsRUFBeEI7QUFBQSxRQUNJQyxPQUFLSixLQUFHRSxDQUFILFNBQVdGLENBQVgsU0FBZ0JFLENBQWhCLEdBQXFCLEVBRDlCO0FBRUEsV0FBVSxLQUFLRyxXQUFMLEVBQVYsVUFBZ0MsS0FBS0MsUUFBTCxLQUFnQixDQUFoRCxVQUFxRCxLQUFLQyxPQUFMLEVBQXJELEdBQXNFSCxJQUF0RTtBQUNILENBSkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5leHBvcnQge2luaXQsTW9kZWwsVXNlcixSb2xlLEZpbGUsTG9nfSBmcm9tIFwiLi9kYlwiXG5leHBvcnQge1FpbGlBcHB9IGZyb20gXCIuL3FpbGlBcHBcIlxuZXhwb3J0IGNvbnN0IFVJPXtcbiAgICBFbXB0eTpyZXF1aXJlKCcuL2NvbXBvbmVudHMvZW1wdHknKSxcbiAgICBMb2FkaW5nOnJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2FkaW5nJyksXG4gICAgTGlzdDogcmVxdWlyZSgnLi9jb21wb25lbnRzL2xpc3QnKSxcbiAgICBDb21tZW50OnJlcXVpcmUoJy4vY29tcG9uZW50cy9jb21tZW50JyksXG4gICAgQ29tbWFuZEJhcjogcmVxdWlyZSgnLi9jb21wb25lbnRzL2NvbW1hbmQtYmFyJyksXG4gICAgUGhvdG86IHJlcXVpcmUoJy4vY29tcG9uZW50cy9waG90bycpLFxuICAgIE1lc3NhZ2VyOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWVzc2FnZXInKSxcblx0ZmlsZVNlbGVjdG9yOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvZmlsZS1zZWxlY3RvcicpLFxuXHRBY2NvdW50OiByZXF1aXJlKFwiLi9jb21wb25lbnRzL2FjY291bnRcIilcbn1cblxuOyhmdW5jdGlvbihfcmF3KXtcbiAgICB2YXIgcj0vXihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pVChcXGR7Mn0pOihcXGR7Mn0pOihcXGR7Mn0oPzpcXC5cXGQqKT8pWiQvLGRzXG4gICAgSlNPTi5wYXJzZT0oYSxyZXZpdmVyKT0+e1xuICAgICAgICByZXR1cm4gX3Jhdy5jYWxsKEpTT04sYSwoayx2KT0+e1xuICAgICAgICAgICAgaWYodHlwZW9mKHYpPT0nc3RyaW5nJyAmJiB2W3YubGVuZ3RoLTFdPT0nWicgJiYgdlsxMF09PSdUJyAmJiAoZHM9ci5leGVjKHYpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoK2RzWzFdLCArZHNbMl0gLSAxLCArZHNbM10sICtkc1s0XSwgICtkc1s1XSwgK2RzWzZdKSk7XG4gICAgICAgICAgICByZXR1cm4gcmV2aXZlciA/IHJldml2ZXIoayx2KSA6IHZcbiAgICAgICAgfSlcbiAgICB9XG59KShKU09OLnBhcnNlKTtcblxuRGF0ZS5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtcbiAgICB2YXIgaD10aGlzLmdldEhvdXJzKCksbT10aGlzLmdldE1pbnV0ZXMoKSxcbiAgICAgICAgdGltZT1ofHxtID8gYCAke2h9OiR7bX1gIDonJ1xuICAgIHJldHVybiBgJHt0aGlzLmdldEZ1bGxZZWFyKCl9LSR7dGhpcy5nZXRNb250aCgpKzF9LSR7dGhpcy5nZXREYXRlKCl9JHt0aW1lfWBcbn1cbiJdfQ==