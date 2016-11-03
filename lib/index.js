"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.compact = exports.UI = exports.QiliApp = exports.Log = exports.File = exports.Role = exports.User = exports.Model = exports.init = undefined;

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
var compact = exports.compact = function compact(o) {
	for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		keys[_key - 1] = arguments[_key];
	}

	return keys.reduce(function (a, k) {
		return o && (a[k] = o[k]), a;
	}, {});
};

function enhancedCombineReducers() {
	for (var _len2 = arguments.length, reducers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		reducers[_key2] = arguments[_key2];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJRaWxpQXBwIiwiZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMiLCJVSSIsIkVtcHR5IiwiTG9hZGluZyIsIkNvbW1lbnQiLCJDb21tYW5kQmFyIiwiUGhvdG8iLCJNZXNzYWdlciIsImZpbGVTZWxlY3RvciIsIkFjY291bnQiLCJjb21wYWN0IiwibyIsImtleXMiLCJyZWR1Y2UiLCJhIiwiayIsInJlZHVjZXJzIiwiY29tYmluZUFycmF5UmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwibmV4dCIsImZ1bmN0aW9ucyIsInNsaWNlIiwiY29tYmluZWQiLCJsYXN0VHJ1bmsiLCJsZW5ndGgiLCJ0eXBlIiwicHVzaCIsIm1hcCIsImIiLCJPYmplY3QiLCJhc3NpZ24iLCJ3aXRoU2FtZUtleVJlZHVjZXJzIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJfcmF3IiwiciIsImRzIiwiSlNPTiIsInBhcnNlIiwicmV2aXZlciIsImNhbGwiLCJ2IiwiZXhlYyIsIkRhdGUiLCJVVEMiLCJwcm90b3R5cGUiLCJ0b0RhdGUiLCJkIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiaXNTYW1lRGF0ZSIsInJlbGF0aXZlIiwiTWF0aCIsImZsb29yIiwicmVsYXRpdmVEYXRlIiwiZGF5cyIsImlzRnV0dXJlIiwiZm9ybWF0IiwidG1wbCIsInZhbHVlIiwieSIsImdldEZ1bGxZZWFyIiwiTSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImgiLCJnZXRIb3VycyIsIm0iLCJnZXRNaW51dGVzIiwicyIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2giLCJ0b0xvd2VyQ2FzZSIsInNtYXJ0Rm9ybWF0IiwicmVUb2RheSIsInJlVGhpc1llYXIiLCJyZVllYXJzQWdvIiwibm93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzthQUVRQSxJOzs7Ozs7YUFBS0MsSzs7Ozs7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LFVBQThDLHVFQUFuQyxRQUFtQztBQUFBLE1BQXpCQyxVQUF5Qix1RUFBZCxhQUFjOztBQUM3RSxNQUFJQyxNQUFJLElBQUluQyxJQUFKLEVBQVI7QUFDQSxTQUFPLEtBQUtjLE1BQUwsQ0FBWSxLQUFLUCxVQUFMLENBQWdCNEIsR0FBaEIsSUFBdUJILE9BQXZCLEdBQ2QsS0FBS2QsV0FBTCxNQUFvQmlCLElBQUlqQixXQUFKLEVBQXBCLEdBQXdDZSxVQUF4QyxHQUFxREMsVUFEbkQsQ0FBUDtBQUVBO0FBbkMyQixDQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnXG5cbmV4cG9ydCB7aW5pdCxNb2RlbCxVc2VyLFJvbGUsRmlsZSxMb2d9IGZyb20gXCIuL2RiXCJcbmV4cG9ydCB7UWlsaUFwcH0gZnJvbSBcIi4vcWlsaUFwcFwiXG5cbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3VudFwiXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4vY29tcG9uZW50cy9lbXB0eVwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IENvbW1lbnQgZnJvbSBcIi4vY29tcG9uZW50cy9jb21tZW50XCJcbmltcG9ydCBDb21tYW5kQmFyICBmcm9tIFwiLi9jb21wb25lbnRzL2NvbW1hbmQtYmFyXCJcbmltcG9ydCBQaG90byAgZnJvbSBcIi4vY29tcG9uZW50cy9waG90b1wiXG5pbXBvcnQgTWVzc2FnZXIgIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IGZpbGVTZWxlY3RvciAgZnJvbSBcIi4vY29tcG9uZW50cy9maWxlLXNlbGVjdG9yXCJcbmltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tIFwicmVkdXhcIlxuXG5cbmV4cG9ydCBjb25zdCBVST17XG4gICAgRW1wdHlcbiAgICAsTG9hZGluZ1xuICAgICxDb21tZW50XG4gICAgLENvbW1hbmRCYXJcbiAgICAsUGhvdG9cbiAgICAsTWVzc2FnZXJcblx0LGZpbGVTZWxlY3RvclxuXHQsQWNjb3VudFxufVxuZXhwb3J0IGNvbnN0IGNvbXBhY3Q9KG8sLi4ua2V5cyk9PmtleXMucmVkdWNlKChhLGspPT4obyAmJiAoYVtrXT1vW2tdKSxhKSx7fSlcblxuZXhwb3J0IGZ1bmN0aW9uIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKC4uLnJlZHVjZXJzKXtcblx0Y29uc3QgY29tYmluZUFycmF5UmVkdWNlcj1yZWR1Y2Vycz0+KHN0YXRlLGFjdGlvbik9PnJlZHVjZXJzLnJlZHVjZSgoc3RhdGUsbmV4dCk9PntcbiAgICAgICAgcmV0dXJuIG5leHQoc3RhdGUsYWN0aW9uKVxuICAgIH0sIHN0YXRlKVxuXG5cdGNvbnN0IGZ1bmN0aW9ucz1yZWR1Y2Vycy5zbGljZSgxKS5yZWR1Y2UoKGNvbWJpbmVkLGEpPT57XG4gICAgICAgIGNvbnN0IGxhc3RUcnVuaz1jb21iaW5lZFtjb21iaW5lZC5sZW5ndGgtMV1cbiAgICAgICAgY29uc3QgdHlwZT10eXBlb2YobGFzdFRydW5rWzBdKVxuICAgICAgICBpZih0eXBlIT10eXBlb2YoYSkpe1xuICAgICAgICAgICAgY29tYmluZWQucHVzaChbYV0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGFzdFRydW5rLnB1c2goYSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZWRcbiAgICB9LFtbcmVkdWNlcnNbMF1dXSkubWFwKGE9PntcbiAgICAgICAgaWYodHlwZW9mKGFbMF0pPT0nb2JqZWN0Jyl7XG5cdFx0XHQvL21lcmdlIHt1aTphfSx7dWksYn0gPT0+IHt1aTogW2EsYl19XG5cdFx0XHRyZXR1cm4gY29tYmluZVJlZHVjZXJzKFxuXHRcdFx0XHRhLnJlZHVjZSgoY29tYmluZWQsYik9Pntcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0XHRcdGNvbWJpbmVkLFxuXHRcdFx0XHRcdFx0Yixcblx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKGNvbWJpbmVkKS5yZWR1Y2UoKHdpdGhTYW1lS2V5UmVkdWNlcnMsa2V5KT0+ey8vbWVyZ2Ugd2l0aCBzYW1lIGtleVxuXHRcdFx0XHRcdFx0XHRpZihiLmhhc093blByb3BlcnR5KGtleSkpe1xuXHRcdFx0XHRcdFx0XHRcdHdpdGhTYW1lS2V5UmVkdWNlcnNba2V5XT1jb21iaW5lQXJyYXlSZWR1Y2VyKFtjb21iaW5lZFtrZXldLGJba2V5XV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHdpdGhTYW1lS2V5UmVkdWNlcnNcblx0XHRcdFx0XHRcdH0se30pXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9LHt9KVxuXHRcdFx0KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lQXJyYXlSZWR1Y2VyKGEpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBjb21iaW5lQXJyYXlSZWR1Y2VyKGZ1bmN0aW9ucylcbn1cblxuOyhmdW5jdGlvbihfcmF3KXtcbiAgICB2YXIgcj0vXihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pVChcXGR7Mn0pOihcXGR7Mn0pOihcXGR7Mn0oPzpcXC5cXGQqKT8pWiQvLGRzXG4gICAgSlNPTi5wYXJzZT0oYSxyZXZpdmVyKT0+e1xuICAgICAgICByZXR1cm4gX3Jhdy5jYWxsKEpTT04sYSwoayx2KT0+e1xuICAgICAgICAgICAgaWYodHlwZW9mKHYpPT0nc3RyaW5nJyAmJiB2W3YubGVuZ3RoLTFdPT0nWicgJiYgdlsxMF09PSdUJyAmJiAoZHM9ci5leGVjKHYpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoK2RzWzFdLCArZHNbMl0gLSAxLCArZHNbM10sICtkc1s0XSwgICtkc1s1XSwgK2RzWzZdKSk7XG4gICAgICAgICAgICByZXR1cm4gcmV2aXZlciA/IHJldml2ZXIoayx2KSA6IHZcbiAgICAgICAgfSlcbiAgICB9XG59KShKU09OLnBhcnNlKTtcblxuXG5cbk9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUse1xuXHR0b0RhdGUoKXtcblx0XHRsZXQgZD1uZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSlcblx0XHRkLnNldEhvdXJzKDAsMCwwLDApXG5cdFx0cmV0dXJuIGRcblx0fSxcblx0aXNTYW1lRGF0ZShkKXtcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShkKT09MFxuXHR9LFxuXHRyZWxhdGl2ZShkKXtcblx0XHRyZXR1cm4gTWF0aC5mbG9vcigodGhpcy50b0RhdGUoKS5nZXRUaW1lKCktZC50b0RhdGUoKS5nZXRUaW1lKCkpLygyNCo2MCo2MCoxMDAwKSlcblx0fSxcblx0cmVsYXRpdmVEYXRlKGRheXMpe1xuXHRcdHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSsyNCo2MCo2MCoxMDAwKmRheXMpXG5cdH0sXG5cdGlzRnV0dXJlKCl7XG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUobmV3IERhdGUoKSk+MFxuXHR9LFxuXHRmb3JtYXQodG1wbD1cInktTS1kXCIpe1xuXHRcdGxldCB2YWx1ZT17XG5cdFx0XHR5OnRoaXMuZ2V0RnVsbFllYXIoKSxcblx0XHRcdE06dGhpcy5nZXRNb250aCgpKzEsXG5cdFx0XHRkOnRoaXMuZ2V0RGF0ZSgpLFxuXHRcdFx0aDp0aGlzLmdldEhvdXJzKCksXG5cdFx0XHRtOnRoaXMuZ2V0TWludXRlcygpLFxuXHRcdFx0czp0aGlzLmdldFNlY29uZHMoKVxuXHRcdH1cblx0XHRyZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcblx0XHRcdHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXG5cdFx0fSlcblx0fSxcblx0c21hcnRGb3JtYXQocmVUb2RheT1cIuS7iuWkqSBISDptbVwiLCByZVRoaXNZZWFyPVwiTU3mnIhEROaXpVwiLCByZVllYXJzQWdvPVwiWVlZWeW5tE1N5pyIRETml6VcIil7XG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXG5cdFx0cmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMuaXNTYW1lRGF0ZShub3cpID8gcmVUb2RheSA6XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyByZVRoaXNZZWFyIDogcmVZZWFyc0Fnbylcblx0fVxufSlcbiJdfQ==