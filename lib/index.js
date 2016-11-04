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
exports.ENTITIES = ENTITIES;

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

function ENTITIES(data) {
	return { type: 'NORMALIZED_DATA', payload: data };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJRaWxpQXBwIiwiZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMiLCJFTlRJVElFUyIsIlVJIiwiRW1wdHkiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJQaG90byIsIk1lc3NhZ2VyIiwiZmlsZVNlbGVjdG9yIiwiQWNjb3VudCIsImNvbXBhY3QiLCJvIiwia2V5cyIsInJlZHVjZSIsImEiLCJrIiwicmVkdWNlcnMiLCJjb21iaW5lQXJyYXlSZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJuZXh0IiwiZnVuY3Rpb25zIiwic2xpY2UiLCJjb21iaW5lZCIsImxhc3RUcnVuayIsImxlbmd0aCIsInR5cGUiLCJwdXNoIiwibWFwIiwiYiIsIk9iamVjdCIsImFzc2lnbiIsIndpdGhTYW1lS2V5UmVkdWNlcnMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImRhdGEiLCJwYXlsb2FkIiwiX3JhdyIsInIiLCJkcyIsIkpTT04iLCJwYXJzZSIsInJldml2ZXIiLCJjYWxsIiwidiIsImV4ZWMiLCJEYXRlIiwiVVRDIiwicHJvdG90eXBlIiwidG9EYXRlIiwiZCIsImdldFRpbWUiLCJzZXRIb3VycyIsImlzU2FtZURhdGUiLCJyZWxhdGl2ZSIsIk1hdGgiLCJmbG9vciIsInJlbGF0aXZlRGF0ZSIsImRheXMiLCJpc0Z1dHVyZSIsImZvcm1hdCIsInRtcGwiLCJ2YWx1ZSIsInkiLCJnZXRGdWxsWWVhciIsIk0iLCJnZXRNb250aCIsImdldERhdGUiLCJoIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInMiLCJnZXRTZWNvbmRzIiwicmVwbGFjZSIsIm1hdGNoIiwidG9Mb3dlckNhc2UiLCJzbWFydEZvcm1hdCIsInJlVG9kYXkiLCJyZVRoaXNZZWFyIiwicmVZZWFyc0FnbyIsIm5vdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7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QVlBLEtBQUtrRCxXQUFMLEVBQVosR0FBaUNsRCxJQUF2QyxLQUFnRCxFQUF2RDtBQUNBLEdBRk0sQ0FBUDtBQUdBLEVBOUIyQjtBQStCNUJtRCxZQS9CNEIseUJBK0JrRDtBQUFBLE1BQWxFQyxPQUFrRSx1RUFBMUQsVUFBMEQ7QUFBQSxNQUE5Q0MsVUFBOEMsdUVBQW5DLFFBQW1DO0FBQUEsTUFBekJDLFVBQXlCLHVFQUFkLGFBQWM7O0FBQzdFLE1BQUlDLE1BQUksSUFBSW5DLElBQUosRUFBUjtBQUNBLFNBQU8sS0FBS2MsTUFBTCxDQUFZLEtBQUtQLFVBQUwsQ0FBZ0I0QixHQUFoQixJQUF1QkgsT0FBdkIsR0FDZCxLQUFLZCxXQUFMLE1BQW9CaUIsSUFBSWpCLFdBQUosRUFBcEIsR0FBd0NlLFVBQXhDLEdBQXFEQyxVQURuRCxDQUFQO0FBRUE7QUFuQzJCLENBQTdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCdcblxuZXhwb3J0IHtpbml0LE1vZGVsLFVzZXIsUm9sZSxGaWxlLExvZ30gZnJvbSBcIi4vZGJcIlxuZXhwb3J0IHtRaWxpQXBwfSBmcm9tIFwiLi9xaWxpQXBwXCJcblxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvdW50XCJcbmltcG9ydCBFbXB0eSBmcm9tIFwiLi9jb21wb25lbnRzL2VtcHR5XCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgQ29tbWVudCBmcm9tIFwiLi9jb21wb25lbnRzL2NvbW1lbnRcIlxuaW1wb3J0IENvbW1hbmRCYXIgIGZyb20gXCIuL2NvbXBvbmVudHMvY29tbWFuZC1iYXJcIlxuaW1wb3J0IFBob3RvICBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvXCJcbmltcG9ydCBNZXNzYWdlciAgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgZmlsZVNlbGVjdG9yICBmcm9tIFwiLi9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3JcIlxuaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gXCJyZWR1eFwiXG5cblxuZXhwb3J0IGNvbnN0IFVJPXtcbiAgICBFbXB0eVxuICAgICxMb2FkaW5nXG4gICAgLENvbW1lbnRcbiAgICAsQ29tbWFuZEJhclxuICAgICxQaG90b1xuICAgICxNZXNzYWdlclxuXHQsZmlsZVNlbGVjdG9yXG5cdCxBY2NvdW50XG59XG5leHBvcnQgY29uc3QgY29tcGFjdD0obywuLi5rZXlzKT0+a2V5cy5yZWR1Y2UoKGEsayk9PihvICYmIChhW2tdPW9ba10pLGEpLHt9KVxuXG5leHBvcnQgZnVuY3Rpb24gZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoLi4ucmVkdWNlcnMpe1xuXHRjb25zdCBjb21iaW5lQXJyYXlSZWR1Y2VyPXJlZHVjZXJzPT4oc3RhdGUsYWN0aW9uKT0+cmVkdWNlcnMucmVkdWNlKChzdGF0ZSxuZXh0KT0+e1xuICAgICAgICByZXR1cm4gbmV4dChzdGF0ZSxhY3Rpb24pXG4gICAgfSwgc3RhdGUpXG5cblx0Y29uc3QgZnVuY3Rpb25zPXJlZHVjZXJzLnNsaWNlKDEpLnJlZHVjZSgoY29tYmluZWQsYSk9PntcbiAgICAgICAgY29uc3QgbGFzdFRydW5rPWNvbWJpbmVkW2NvbWJpbmVkLmxlbmd0aC0xXVxuICAgICAgICBjb25zdCB0eXBlPXR5cGVvZihsYXN0VHJ1bmtbMF0pXG4gICAgICAgIGlmKHR5cGUhPXR5cGVvZihhKSl7XG4gICAgICAgICAgICBjb21iaW5lZC5wdXNoKFthXSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsYXN0VHJ1bmsucHVzaChhKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21iaW5lZFxuICAgIH0sW1tyZWR1Y2Vyc1swXV1dKS5tYXAoYT0+e1xuICAgICAgICBpZih0eXBlb2YoYVswXSk9PSdvYmplY3QnKXtcblx0XHRcdC8vbWVyZ2Uge3VpOmF9LHt1aSxifSA9PT4ge3VpOiBbYSxiXX1cblx0XHRcdHJldHVybiBjb21iaW5lUmVkdWNlcnMoXG5cdFx0XHRcdGEucmVkdWNlKChjb21iaW5lZCxiKT0+e1xuXHRcdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdFx0Y29tYmluZWQsXG5cdFx0XHRcdFx0XHRiLFxuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXMoY29tYmluZWQpLnJlZHVjZSgod2l0aFNhbWVLZXlSZWR1Y2VycyxrZXkpPT57Ly9tZXJnZSB3aXRoIHNhbWUga2V5XG5cdFx0XHRcdFx0XHRcdGlmKGIuaGFzT3duUHJvcGVydHkoa2V5KSl7XG5cdFx0XHRcdFx0XHRcdFx0d2l0aFNhbWVLZXlSZWR1Y2Vyc1trZXldPWNvbWJpbmVBcnJheVJlZHVjZXIoW2NvbWJpbmVkW2tleV0sYltrZXldXSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gd2l0aFNhbWVLZXlSZWR1Y2Vyc1xuXHRcdFx0XHRcdFx0fSx7fSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdH0se30pXG5cdFx0XHQpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVBcnJheVJlZHVjZXIoYSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGNvbWJpbmVBcnJheVJlZHVjZXIoZnVuY3Rpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRU5USVRJRVMoZGF0YSl7XG5cdHJldHVybiB7dHlwZTonTk9STUFMSVpFRF9EQVRBJywgcGF5bG9hZDpkYXRhfVxufVxuXG47KGZ1bmN0aW9uKF9yYXcpe1xuICAgIHZhciByPS9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopPylaJC8sZHNcbiAgICBKU09OLnBhcnNlPShhLHJldml2ZXIpPT57XG4gICAgICAgIHJldHVybiBfcmF3LmNhbGwoSlNPTixhLChrLHYpPT57XG4gICAgICAgICAgICBpZih0eXBlb2Yodik9PSdzdHJpbmcnICYmIHZbdi5sZW5ndGgtMV09PSdaJyAmJiB2WzEwXT09J1QnICYmIChkcz1yLmV4ZWModikpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrZHNbMV0sICtkc1syXSAtIDEsICtkc1szXSwgK2RzWzRdLCAgK2RzWzVdLCArZHNbNl0pKTtcbiAgICAgICAgICAgIHJldHVybiByZXZpdmVyID8gcmV2aXZlcihrLHYpIDogdlxuICAgICAgICB9KVxuICAgIH1cbn0pKEpTT04ucGFyc2UpO1xuXG5cblxuT2JqZWN0LmFzc2lnbihEYXRlLnByb3RvdHlwZSx7XG5cdHRvRGF0ZSgpe1xuXHRcdGxldCBkPW5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKVxuXHRcdGQuc2V0SG91cnMoMCwwLDAsMClcblx0XHRyZXR1cm4gZFxuXHR9LFxuXHRpc1NhbWVEYXRlKGQpe1xuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKGQpPT0wXG5cdH0sXG5cdHJlbGF0aXZlKGQpe1xuXHRcdHJldHVybiBNYXRoLmZsb29yKCh0aGlzLnRvRGF0ZSgpLmdldFRpbWUoKS1kLnRvRGF0ZSgpLmdldFRpbWUoKSkvKDI0KjYwKjYwKjEwMDApKVxuXHR9LFxuXHRyZWxhdGl2ZURhdGUoZGF5cyl7XG5cdFx0cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKzI0KjYwKjYwKjEwMDAqZGF5cylcblx0fSxcblx0aXNGdXR1cmUoKXtcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShuZXcgRGF0ZSgpKT4wXG5cdH0sXG5cdGZvcm1hdCh0bXBsPVwieS1NLWRcIil7XG5cdFx0bGV0IHZhbHVlPXtcblx0XHRcdHk6dGhpcy5nZXRGdWxsWWVhcigpLFxuXHRcdFx0TTp0aGlzLmdldE1vbnRoKCkrMSxcblx0XHRcdGQ6dGhpcy5nZXREYXRlKCksXG5cdFx0XHRoOnRoaXMuZ2V0SG91cnMoKSxcblx0XHRcdG06dGhpcy5nZXRNaW51dGVzKCksXG5cdFx0XHRzOnRoaXMuZ2V0U2Vjb25kcygpXG5cdFx0fVxuXHRcdHJldHVybiB0bXBsLnJlcGxhY2UoLyhbeW1kaHNdKSsvaWcsIGZ1bmN0aW9uKG1hdGNoLHR5cGUpe1xuXHRcdFx0cmV0dXJuIHZhbHVlW3R5cGUhPSdNJyA/IHR5cGUudG9Mb3dlckNhc2UoKSA6IHR5cGVdIHx8IFwiXCJcblx0XHR9KVxuXHR9LFxuXHRzbWFydEZvcm1hdChyZVRvZGF5PVwi5LuK5aSpIEhIOm1tXCIsIHJlVGhpc1llYXI9XCJNTeaciERE5pelXCIsIHJlWWVhcnNBZ289XCJZWVlZ5bm0TU3mnIhEROaXpVwiKXtcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5pc1NhbWVEYXRlKG5vdykgPyByZVRvZGF5IDpcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGdWxsWWVhcigpPT1ub3cuZ2V0RnVsbFllYXIoKSA/IHJlVGhpc1llYXIgOiByZVllYXJzQWdvKVxuXHR9XG59KVxuIl19