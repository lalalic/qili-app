"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UI = exports.QiliApp = exports.Log = exports.File = exports.Role = exports.User = exports.Model = exports.init = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
exports.enhancedCombineReducers = enhancedCombineReducers;

require("babel-polyfill");

var _account = require("./components/account");

var _account2 = _interopRequireDefault(_account);

var _empty = require("./components/empty");

var _empty2 = _interopRequireDefault(_empty);

var _loading = require("./components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _comment = require("./components/comment");

var _comment2 = _interopRequireDefault(_comment);

var _commandBar = require("./components/command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _photo = require("./components/photo");

var _photo2 = _interopRequireDefault(_photo);

var _messager = require("./components/messager");

var _messager2 = _interopRequireDefault(_messager);

var _fileSelector = require("./components/file-selector");

var _fileSelector2 = _interopRequireDefault(_fileSelector);

var _redux = require("redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UI = exports.UI = {
	Empty: _empty2.default,
	Loading: _loading2.default,
	Comment: _comment2.default,
	CommandBar: _commandBar2.default,
	Photo: _photo2.default,
	Messager: _messager2.default,
	fileSelector: _fileSelector2.default,
	Account: _account2.default
};

function enhancedCombineReducers() {
	for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
		reducers[_key] = arguments[_key];
	}

	var combineArrayReducer = function combineArrayReducer(reducers) {
		return function (state, action) {
			return reducers.reduce(function (state, next) {
				return next(state, action);
			}, state);
		};
	};

	var functions = reducers.slice(1).reduce(function (combined, a) {
		var lastTrunk = combined[combined.length - 1];
		var type = _typeof(lastTrunk[0]);
		if (type != (typeof a === "undefined" ? "undefined" : _typeof(a))) {
			combined.push([a]);
		} else {
			lastTrunk.push(a);
		}
		return combined;
	}, [[reducers[0]]]).map(function (a) {
		if (_typeof(a[0]) == 'object') {
			//merge {ui:a},{ui,b} ==> {ui: [a,b]}
			return (0, _redux.combineReducers)(a.reduce(function (combined, b) {
				return Object.assign(combined, b, Object.keys(combined).reduce(function (withSameKeyReducers, key) {
					//merge with same key
					if (b.hasOwnProperty(key)) {
						withSameKeyReducers[key] = combineArrayReducer([combined[key], b[key]]);
					}
					return withSameKeyReducers;
				}, {}));
			}, {}));
		} else {
			return combineArrayReducer(a);
		}
	});
	return combineArrayReducer(functions);
}

;(function (_raw) {
	var r = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/,
	    ds;
	JSON.parse = function (a, reviver) {
		return _raw.call(JSON, a, function (k, v) {
			if (typeof v == 'string' && v[v.length - 1] == 'Z' && v[10] == 'T' && (ds = r.exec(v))) return new Date(Date.UTC(+ds[1], +ds[2] - 1, +ds[3], +ds[4], +ds[5], +ds[6]));
			return reviver ? reviver(k, v) : v;
		});
	};
})(JSON.parse);

Object.assign(Date.prototype, {
	toDate: function toDate() {
		var d = new Date(this.getTime());
		d.setHours(0, 0, 0, 0);
		return d;
	},
	isSameDate: function isSameDate(d) {
		return this.relative(d) == 0;
	},
	relative: function relative(d) {
		return Math.floor((this.toDate().getTime() - d.toDate().getTime()) / (24 * 60 * 60 * 1000));
	},
	relativeDate: function relativeDate(days) {
		return new Date(this.getTime() + 24 * 60 * 60 * 1000 * days);
	},
	isFuture: function isFuture() {
		return this.relative(new Date()) > 0;
	},
	format: function format() {
		var tmpl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "y-M-d";

		var value = {
			y: this.getFullYear(),
			M: this.getMonth() + 1,
			d: this.getDate(),
			h: this.getHours(),
			m: this.getMinutes(),
			s: this.getSeconds()
		};
		return tmpl.replace(/([ymdhs])+/ig, function (match, type) {
			return value[type != 'M' ? type.toLowerCase() : type] || "";
		});
	},
	smartFormat: function smartFormat() {
		var reToday = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "今天 HH:mm";
		var reThisYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "MM月DD日";
		var reYearsAgo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "YYYY年MM月DD日";

		var now = new Date();
		return this.format(this.isSameDate(now) ? reToday : this.getFullYear() == now.getFullYear() ? reThisYear : reYearsAgo);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJRaWxpQXBwIiwiZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMiLCJVSSIsIkVtcHR5IiwiTG9hZGluZyIsIkNvbW1lbnQiLCJDb21tYW5kQmFyIiwiUGhvdG8iLCJNZXNzYWdlciIsImZpbGVTZWxlY3RvciIsIkFjY291bnQiLCJyZWR1Y2VycyIsImNvbWJpbmVBcnJheVJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInJlZHVjZSIsIm5leHQiLCJmdW5jdGlvbnMiLCJzbGljZSIsImNvbWJpbmVkIiwiYSIsImxhc3RUcnVuayIsImxlbmd0aCIsInR5cGUiLCJwdXNoIiwibWFwIiwiYiIsIk9iamVjdCIsImFzc2lnbiIsImtleXMiLCJ3aXRoU2FtZUtleVJlZHVjZXJzIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJfcmF3IiwiciIsImRzIiwiSlNPTiIsInBhcnNlIiwicmV2aXZlciIsImNhbGwiLCJrIiwidiIsImV4ZWMiLCJEYXRlIiwiVVRDIiwicHJvdG90eXBlIiwidG9EYXRlIiwiZCIsImdldFRpbWUiLCJzZXRIb3VycyIsImlzU2FtZURhdGUiLCJyZWxhdGl2ZSIsIk1hdGgiLCJmbG9vciIsInJlbGF0aXZlRGF0ZSIsImRheXMiLCJpc0Z1dHVyZSIsImZvcm1hdCIsInRtcGwiLCJ2YWx1ZSIsInkiLCJnZXRGdWxsWWVhciIsIk0iLCJnZXRNb250aCIsImdldERhdGUiLCJoIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInMiLCJnZXRTZWNvbmRzIiwicmVwbGFjZSIsIm1hdGNoIiwidG9Mb3dlckNhc2UiLCJzbWFydEZvcm1hdCIsInJlVG9kYXkiLCJyZVRoaXNZZWFyIiwicmVZZWFyc0FnbyIsIm5vdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7YUFFUUEsSTs7Ozs7O2FBQUtDLEs7Ozs7OzthQUFNQyxJOzs7Ozs7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IjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5leHBvcnQge2luaXQsTW9kZWwsVXNlcixSb2xlLEZpbGUsTG9nfSBmcm9tIFwiLi9kYlwiXG5leHBvcnQge1FpbGlBcHB9IGZyb20gXCIuL3FpbGlBcHBcIlxuXG5pbXBvcnQgQWNjb3VudCBmcm9tIFwiLi9jb21wb25lbnRzL2FjY291bnRcIlxuaW1wb3J0IEVtcHR5IGZyb20gXCIuL2NvbXBvbmVudHMvZW1wdHlcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCBDb21tZW50IGZyb20gXCIuL2NvbXBvbmVudHMvY29tbWVudFwiXG5pbXBvcnQgQ29tbWFuZEJhciAgZnJvbSBcIi4vY29tcG9uZW50cy9jb21tYW5kLWJhclwiXG5pbXBvcnQgUGhvdG8gIGZyb20gXCIuL2NvbXBvbmVudHMvcGhvdG9cIlxuaW1wb3J0IE1lc3NhZ2VyICBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBmaWxlU2VsZWN0b3IgIGZyb20gXCIuL2NvbXBvbmVudHMvZmlsZS1zZWxlY3RvclwiXG5pbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcInJlZHV4XCJcblxuXG5leHBvcnQgY29uc3QgVUk9e1xuICAgIEVtcHR5XG4gICAgLExvYWRpbmdcbiAgICAsQ29tbWVudFxuICAgICxDb21tYW5kQmFyXG4gICAgLFBob3RvXG4gICAgLE1lc3NhZ2VyXG5cdCxmaWxlU2VsZWN0b3Jcblx0LEFjY291bnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKC4uLnJlZHVjZXJzKXtcblx0Y29uc3QgY29tYmluZUFycmF5UmVkdWNlcj1yZWR1Y2Vycz0+KHN0YXRlLGFjdGlvbik9PnJlZHVjZXJzLnJlZHVjZSgoc3RhdGUsbmV4dCk9Pm5leHQoc3RhdGUsYWN0aW9uKSwgc3RhdGUpXG5cdFxuXHRjb25zdCBmdW5jdGlvbnM9cmVkdWNlcnMuc2xpY2UoMSkucmVkdWNlKChjb21iaW5lZCxhKT0+e1xuICAgICAgICBjb25zdCBsYXN0VHJ1bms9Y29tYmluZWRbY29tYmluZWQubGVuZ3RoLTFdXG4gICAgICAgIGNvbnN0IHR5cGU9dHlwZW9mKGxhc3RUcnVua1swXSlcbiAgICAgICAgaWYodHlwZSE9dHlwZW9mKGEpKXtcbiAgICAgICAgICAgIGNvbWJpbmVkLnB1c2goW2FdKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxhc3RUcnVuay5wdXNoKGEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbWJpbmVkXG4gICAgfSxbW3JlZHVjZXJzWzBdXV0pLm1hcChhPT57XG4gICAgICAgIGlmKHR5cGVvZihhWzBdKT09J29iamVjdCcpe1xuXHRcdFx0Ly9tZXJnZSB7dWk6YX0se3VpLGJ9ID09PiB7dWk6IFthLGJdfVxuXHRcdFx0cmV0dXJuIGNvbWJpbmVSZWR1Y2Vycyhcblx0XHRcdFx0YS5yZWR1Y2UoKGNvbWJpbmVkLGIpPT57XG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdFx0XHRjb21iaW5lZCxcblx0XHRcdFx0XHRcdGIsXG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhjb21iaW5lZCkucmVkdWNlKCh3aXRoU2FtZUtleVJlZHVjZXJzLGtleSk9PnsvL21lcmdlIHdpdGggc2FtZSBrZXlcblx0XHRcdFx0XHRcdFx0aWYoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcblx0XHRcdFx0XHRcdFx0XHR3aXRoU2FtZUtleVJlZHVjZXJzW2tleV09Y29tYmluZUFycmF5UmVkdWNlcihbY29tYmluZWRba2V5XSxiW2tleV1dKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiB3aXRoU2FtZUtleVJlZHVjZXJzXG5cdFx0XHRcdFx0XHR9LHt9KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fSx7fSlcblx0XHRcdClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUFycmF5UmVkdWNlcihhKVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gY29tYmluZUFycmF5UmVkdWNlcihmdW5jdGlvbnMpXG59XG5cbjsoZnVuY3Rpb24oX3Jhdyl7XG4gICAgdmFyIHI9L14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KD86XFwuXFxkKik/KVokLyxkc1xuICAgIEpTT04ucGFyc2U9KGEscmV2aXZlcik9PntcbiAgICAgICAgcmV0dXJuIF9yYXcuY2FsbChKU09OLGEsKGssdik9PntcbiAgICAgICAgICAgIGlmKHR5cGVvZih2KT09J3N0cmluZycgJiYgdlt2Lmxlbmd0aC0xXT09J1onICYmIHZbMTBdPT0nVCcgJiYgKGRzPXIuZXhlYyh2KSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKCtkc1sxXSwgK2RzWzJdIC0gMSwgK2RzWzNdLCArZHNbNF0sICArZHNbNV0sICtkc1s2XSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJldml2ZXIgPyByZXZpdmVyKGssdikgOiB2XG4gICAgICAgIH0pXG4gICAgfVxufSkoSlNPTi5wYXJzZSk7XG5cblxuXG5PYmplY3QuYXNzaWduKERhdGUucHJvdG90eXBlLHtcblx0dG9EYXRlKCl7XG5cdFx0bGV0IGQ9bmV3IERhdGUodGhpcy5nZXRUaW1lKCkpXG5cdFx0ZC5zZXRIb3VycygwLDAsMCwwKVxuXHRcdHJldHVybiBkXG5cdH0sXG5cdGlzU2FtZURhdGUoZCl7XG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUoZCk9PTBcblx0fSxcblx0cmVsYXRpdmUoZCl7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoKHRoaXMudG9EYXRlKCkuZ2V0VGltZSgpLWQudG9EYXRlKCkuZ2V0VGltZSgpKS8oMjQqNjAqNjAqMTAwMCkpXG5cdH0sXG5cdHJlbGF0aXZlRGF0ZShkYXlzKXtcblx0XHRyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRUaW1lKCkrMjQqNjAqNjAqMTAwMCpkYXlzKVxuXHR9LFxuXHRpc0Z1dHVyZSgpe1xuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKG5ldyBEYXRlKCkpPjBcblx0fSxcblx0Zm9ybWF0KHRtcGw9XCJ5LU0tZFwiKXtcblx0XHRsZXQgdmFsdWU9e1xuXHRcdFx0eTp0aGlzLmdldEZ1bGxZZWFyKCksXG5cdFx0XHRNOnRoaXMuZ2V0TW9udGgoKSsxLFxuXHRcdFx0ZDp0aGlzLmdldERhdGUoKSxcblx0XHRcdGg6dGhpcy5nZXRIb3VycygpLFxuXHRcdFx0bTp0aGlzLmdldE1pbnV0ZXMoKSxcblx0XHRcdHM6dGhpcy5nZXRTZWNvbmRzKClcblx0XHR9XG5cdFx0cmV0dXJuIHRtcGwucmVwbGFjZSgvKFt5bWRoc10pKy9pZywgZnVuY3Rpb24obWF0Y2gsdHlwZSl7XG5cdFx0XHRyZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxuXHRcdH0pXG5cdH0sXG5cdHNtYXJ0Rm9ybWF0KHJlVG9kYXk9XCLku4rlpKkgSEg6bW1cIiwgcmVUaGlzWWVhcj1cIk1N5pyIRETml6VcIiwgcmVZZWFyc0Fnbz1cIllZWVnlubRNTeaciERE5pelXCIpe1xuXHRcdGxldCBub3c9bmV3IERhdGUoKVxuXHRcdHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLmlzU2FtZURhdGUobm93KSA/IHJlVG9kYXkgOlxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gcmVUaGlzWWVhciA6IHJlWWVhcnNBZ28pXG5cdH1cbn0pXG4iXX0=