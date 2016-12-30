"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.compact = exports.UI = exports.QiliApp = exports.Log = exports.File = exports.Role = exports.User = exports.Model = exports.init = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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
exports.REMOVE_ENTITIES = REMOVE_ENTITIES;

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

var _setting = require("./setting");

var _setting2 = _interopRequireDefault(_setting);

var _userProfile = require("./user-profile");

var _userProfile2 = _interopRequireDefault(_userProfile);

var _textField = require("./components/text-field");

var _textField2 = _interopRequireDefault(_textField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UI = exports.UI = {
	Empty: _empty2.default,
	Loading: _loading2.default,
	Comment: _comment2.default,
	CommandBar: _commandBar2.default,
	Photo: _photo2.default,
	Messager: _messager2.default,
	fileSelector: _fileSelector2.default,
	Account: _account2.default,
	Setting: _setting2.default,
	Profile: _userProfile2.default,
	TextFieldx: _textField2.default
};
var compact = exports.compact = function compact(o) {
	for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		keys[_key - 1] = arguments[_key];
	}

	return o ? keys.reduce(function (a, k) {
		return a[k] = o[k], a;
	}, {}) : {};
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
		var type = (0, _typeof3.default)(lastTrunk[0]);
		if (type != (typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a))) {
			combined.push([a]);
		} else {
			lastTrunk.push(a);
		}
		return combined;
	}, [[reducers[0]]]).map(function (a) {
		if ((0, _typeof3.default)(a[0]) == 'object') {
			//merge {ui:a},{ui,b} ==> {ui: [a,b]}
			return (0, _redux.combineReducers)(a.reduce(function (combined, b) {
				return (0, _assign2.default)(combined, b, (0, _keys2.default)(combined).reduce(function (withSameKeyReducers, key) {
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

function REMOVE_ENTITIES(type) {
	for (var _len3 = arguments.length, ids = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
		ids[_key3 - 1] = arguments[_key3];
	}

	return { type: 'NORMALIZED_DATA', payload: (0, _defineProperty3.default)({}, type, { $remove: ids }) };
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

(0, _assign2.default)(Date.prototype, {
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
	},
	getWeek: function getWeek() {
		var date = new Date(this.getTime());
		date.setHours(0, 0, 0, 0);
		// Thursday in current week decides the year.
		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
		// January 4 is always in week 1.
		var week1 = new Date(date.getFullYear(), 0, 4);
		// Adjust to Thursday in week 1 and count number of weeks from date to week1.
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJRaWxpQXBwIiwiZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMiLCJFTlRJVElFUyIsIlJFTU9WRV9FTlRJVElFUyIsIlVJIiwiRW1wdHkiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJQaG90byIsIk1lc3NhZ2VyIiwiZmlsZVNlbGVjdG9yIiwiQWNjb3VudCIsIlNldHRpbmciLCJQcm9maWxlIiwiVGV4dEZpZWxkeCIsImNvbXBhY3QiLCJvIiwia2V5cyIsInJlZHVjZSIsImEiLCJrIiwicmVkdWNlcnMiLCJjb21iaW5lQXJyYXlSZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJuZXh0IiwiZnVuY3Rpb25zIiwic2xpY2UiLCJjb21iaW5lZCIsImxhc3RUcnVuayIsImxlbmd0aCIsInR5cGUiLCJwdXNoIiwibWFwIiwiYiIsIndpdGhTYW1lS2V5UmVkdWNlcnMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImRhdGEiLCJwYXlsb2FkIiwiaWRzIiwiJHJlbW92ZSIsIl9yYXciLCJyIiwiZHMiLCJKU09OIiwicGFyc2UiLCJyZXZpdmVyIiwiY2FsbCIsInYiLCJleGVjIiwiRGF0ZSIsIlVUQyIsInByb3RvdHlwZSIsInRvRGF0ZSIsImQiLCJnZXRUaW1lIiwic2V0SG91cnMiLCJpc1NhbWVEYXRlIiwicmVsYXRpdmUiLCJNYXRoIiwiZmxvb3IiLCJyZWxhdGl2ZURhdGUiLCJkYXlzIiwiaXNGdXR1cmUiLCJmb3JtYXQiLCJ0bXBsIiwidmFsdWUiLCJ5IiwiZ2V0RnVsbFllYXIiLCJNIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJzIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaCIsInRvTG93ZXJDYXNlIiwic21hcnRGb3JtYXQiLCJyZVRvZGF5IiwicmVUaGlzWWVhciIsInJlWWVhcnNBZ28iLCJub3ciLCJnZXRXZWVrIiwiZGF0ZSIsInNldERhdGUiLCJnZXREYXkiLCJ3ZWVrMSIsInJvdW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBQVFBLEk7Ozs7OzthQUFLQyxLOzs7Ozs7YUFBTUMsSTs7Ozs7O2FBQUtDLEk7Ozs7OzthQUFLQyxJOzs7Ozs7YUFBS0MsRzs7Ozs7Ozs7O2tCQUMxQkMsTzs7O1FBK0JRQyx1QixHQUFBQSx1QjtRQXNDQUMsUSxHQUFBQSxRO1FBSUFDLGUsR0FBQUEsZTs7QUF2RWhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdPLElBQU1DLGtCQUFHO0FBQ1pDLHVCQURZO0FBRVhDLDJCQUZXO0FBR1hDLDJCQUhXO0FBSVhDLGlDQUpXO0FBS1hDLHVCQUxXO0FBTVhDLDZCQU5XO0FBT2RDLHFDQVBjO0FBUWRDLDJCQVJjO0FBU1hDLDJCQVRXO0FBVVhDLCtCQVZXO0FBV1hDO0FBWFcsQ0FBVDtBQWFBLElBQU1DLDRCQUFRLFNBQVJBLE9BQVEsQ0FBQ0MsQ0FBRDtBQUFBLG1DQUFNQyxJQUFOO0FBQU1BLE1BQU47QUFBQTs7QUFBQSxRQUFhRCxJQUFJQyxLQUFLQyxNQUFMLENBQVksVUFBQ0MsQ0FBRCxFQUFHQyxDQUFIO0FBQUEsU0FBUUQsRUFBRUMsQ0FBRixJQUFLSixFQUFFSSxDQUFGLENBQUwsRUFBVUQsQ0FBbEI7QUFBQSxFQUFaLEVBQWlDLEVBQWpDLENBQUosR0FBMkMsRUFBeEQ7QUFBQSxDQUFkOztBQUVBLFNBQVNuQix1QkFBVCxHQUE2QztBQUFBLG9DQUFUcUIsUUFBUztBQUFUQSxVQUFTO0FBQUE7O0FBQ25ELEtBQU1DLHNCQUFvQixTQUFwQkEsbUJBQW9CO0FBQUEsU0FBVSxVQUFDQyxLQUFELEVBQU9DLE1BQVA7QUFBQSxVQUFnQkgsU0FBU0gsTUFBVCxDQUFn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QixDQUFDZ0IsS0FBS0UsTUFBTCxLQUFnQixDQUFqQixJQUFzQixDQUF4RDtBQUNBO0FBQ0EsTUFBSUMsUUFBUSxJQUFJeEMsSUFBSixDQUFTcUMsS0FBS25CLFdBQUwsRUFBVCxFQUE2QixDQUE3QixFQUFnQyxDQUFoQyxDQUFaO0FBQ0E7QUFDQSxTQUFPLElBQUlULEtBQUtnQyxLQUFMLENBQVcsQ0FBQyxDQUFDSixLQUFLaEMsT0FBTCxLQUFpQm1DLE1BQU1uQyxPQUFOLEVBQWxCLElBQXFDLFFBQXJDLEdBQ2pCLENBRGlCLEdBQ2IsQ0FBQ21DLE1BQU1ELE1BQU4sS0FBaUIsQ0FBbEIsSUFBdUIsQ0FEWCxJQUNnQixDQUQzQixDQUFYO0FBRUE7QUE5QzJCLENBQTdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtpbml0LE1vZGVsLFVzZXIsUm9sZSxGaWxlLExvZ30gZnJvbSBcIi4vZGJcIlxuZXhwb3J0IHtRaWxpQXBwfSBmcm9tIFwiLi9xaWxpQXBwXCJcblxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvdW50XCJcbmltcG9ydCBFbXB0eSBmcm9tIFwiLi9jb21wb25lbnRzL2VtcHR5XCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgQ29tbWVudCBmcm9tIFwiLi9jb21wb25lbnRzL2NvbW1lbnRcIlxuaW1wb3J0IENvbW1hbmRCYXIgIGZyb20gXCIuL2NvbXBvbmVudHMvY29tbWFuZC1iYXJcIlxuaW1wb3J0IFBob3RvICBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvXCJcbmltcG9ydCBNZXNzYWdlciAgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgZmlsZVNlbGVjdG9yICBmcm9tIFwiLi9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3JcIlxuaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQgU2V0dGluZyBmcm9tIFwiLi9zZXR0aW5nXCJcbmltcG9ydCBQcm9maWxlIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXG5pbXBvcnQgVGV4dEZpZWxkeCBmcm9tIFwiLi9jb21wb25lbnRzL3RleHQtZmllbGRcIlxuXG5cbmV4cG9ydCBjb25zdCBVST17XG4gICAgRW1wdHlcbiAgICAsTG9hZGluZ1xuICAgICxDb21tZW50XG4gICAgLENvbW1hbmRCYXJcbiAgICAsUGhvdG9cbiAgICAsTWVzc2FnZXJcblx0LGZpbGVTZWxlY3RvclxuXHQsQWNjb3VudFxuICAgICxTZXR0aW5nXG4gICAgLFByb2ZpbGVcbiAgICAsVGV4dEZpZWxkeFxufVxuZXhwb3J0IGNvbnN0IGNvbXBhY3Q9KG8sLi4ua2V5cyk9Pm8gPyBrZXlzLnJlZHVjZSgoYSxrKT0+KGFba109b1trXSxhKSx7fSkgOiB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoLi4ucmVkdWNlcnMpe1xuXHRjb25zdCBjb21iaW5lQXJyYXlSZWR1Y2VyPXJlZHVjZXJzPT4oc3RhdGUsYWN0aW9uKT0+cmVkdWNlcnMucmVkdWNlKChzdGF0ZSxuZXh0KT0+e1xuICAgICAgICByZXR1cm4gbmV4dChzdGF0ZSxhY3Rpb24pXG4gICAgfSwgc3RhdGUpXG5cblx0Y29uc3QgZnVuY3Rpb25zPXJlZHVjZXJzLnNsaWNlKDEpLnJlZHVjZSgoY29tYmluZWQsYSk9PntcbiAgICAgICAgY29uc3QgbGFzdFRydW5rPWNvbWJpbmVkW2NvbWJpbmVkLmxlbmd0aC0xXVxuICAgICAgICBjb25zdCB0eXBlPXR5cGVvZihsYXN0VHJ1bmtbMF0pXG4gICAgICAgIGlmKHR5cGUhPXR5cGVvZihhKSl7XG4gICAgICAgICAgICBjb21iaW5lZC5wdXNoKFthXSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsYXN0VHJ1bmsucHVzaChhKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21iaW5lZFxuICAgIH0sW1tyZWR1Y2Vyc1swXV1dKS5tYXAoYT0+e1xuICAgICAgICBpZih0eXBlb2YoYVswXSk9PSdvYmplY3QnKXtcblx0XHRcdC8vbWVyZ2Uge3VpOmF9LHt1aSxifSA9PT4ge3VpOiBbYSxiXX1cblx0XHRcdHJldHVybiBjb21iaW5lUmVkdWNlcnMoXG5cdFx0XHRcdGEucmVkdWNlKChjb21iaW5lZCxiKT0+e1xuXHRcdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdFx0Y29tYmluZWQsXG5cdFx0XHRcdFx0XHRiLFxuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXMoY29tYmluZWQpLnJlZHVjZSgod2l0aFNhbWVLZXlSZWR1Y2VycyxrZXkpPT57Ly9tZXJnZSB3aXRoIHNhbWUga2V5XG5cdFx0XHRcdFx0XHRcdGlmKGIuaGFzT3duUHJvcGVydHkoa2V5KSl7XG5cdFx0XHRcdFx0XHRcdFx0d2l0aFNhbWVLZXlSZWR1Y2Vyc1trZXldPWNvbWJpbmVBcnJheVJlZHVjZXIoW2NvbWJpbmVkW2tleV0sYltrZXldXSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gd2l0aFNhbWVLZXlSZWR1Y2Vyc1xuXHRcdFx0XHRcdFx0fSx7fSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdH0se30pXG5cdFx0XHQpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVBcnJheVJlZHVjZXIoYSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGNvbWJpbmVBcnJheVJlZHVjZXIoZnVuY3Rpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRU5USVRJRVMoZGF0YSl7XG5cdHJldHVybiB7dHlwZTonTk9STUFMSVpFRF9EQVRBJywgcGF5bG9hZDpkYXRhfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUkVNT1ZFX0VOVElUSUVTKHR5cGUsIC4uLmlkcyl7XG4gICAgcmV0dXJuIHt0eXBlOidOT1JNQUxJWkVEX0RBVEEnLCBwYXlsb2FkOntbdHlwZV06eyRyZW1vdmU6aWRzfX19XG59XG5cbjsoZnVuY3Rpb24oX3Jhdyl7XG4gICAgdmFyIHI9L14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KD86XFwuXFxkKik/KVokLyxkc1xuICAgIEpTT04ucGFyc2U9KGEscmV2aXZlcik9PntcbiAgICAgICAgcmV0dXJuIF9yYXcuY2FsbChKU09OLGEsKGssdik9PntcbiAgICAgICAgICAgIGlmKHR5cGVvZih2KT09J3N0cmluZycgJiYgdlt2Lmxlbmd0aC0xXT09J1onICYmIHZbMTBdPT0nVCcgJiYgKGRzPXIuZXhlYyh2KSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKCtkc1sxXSwgK2RzWzJdIC0gMSwgK2RzWzNdLCArZHNbNF0sICArZHNbNV0sICtkc1s2XSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJldml2ZXIgPyByZXZpdmVyKGssdikgOiB2XG4gICAgICAgIH0pXG4gICAgfVxufSkoSlNPTi5wYXJzZSk7XG5cbk9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUse1xuXHR0b0RhdGUoKXtcblx0XHRsZXQgZD1uZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSlcblx0XHRkLnNldEhvdXJzKDAsMCwwLDApXG5cdFx0cmV0dXJuIGRcblx0fSxcblx0aXNTYW1lRGF0ZShkKXtcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShkKT09MFxuXHR9LFxuXHRyZWxhdGl2ZShkKXtcblx0XHRyZXR1cm4gTWF0aC5mbG9vcigodGhpcy50b0RhdGUoKS5nZXRUaW1lKCktZC50b0RhdGUoKS5nZXRUaW1lKCkpLygyNCo2MCo2MCoxMDAwKSlcblx0fSxcblx0cmVsYXRpdmVEYXRlKGRheXMpe1xuXHRcdHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSsyNCo2MCo2MCoxMDAwKmRheXMpXG5cdH0sXG5cdGlzRnV0dXJlKCl7XG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUobmV3IERhdGUoKSk+MFxuXHR9LFxuXHRmb3JtYXQodG1wbD1cInktTS1kXCIpe1xuXHRcdGxldCB2YWx1ZT17XG5cdFx0XHR5OnRoaXMuZ2V0RnVsbFllYXIoKSxcblx0XHRcdE06dGhpcy5nZXRNb250aCgpKzEsXG5cdFx0XHRkOnRoaXMuZ2V0RGF0ZSgpLFxuXHRcdFx0aDp0aGlzLmdldEhvdXJzKCksXG5cdFx0XHRtOnRoaXMuZ2V0TWludXRlcygpLFxuXHRcdFx0czp0aGlzLmdldFNlY29uZHMoKVxuXHRcdH1cblx0XHRyZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcblx0XHRcdHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXG5cdFx0fSlcblx0fSxcblx0c21hcnRGb3JtYXQocmVUb2RheT1cIuS7iuWkqSBISDptbVwiLCByZVRoaXNZZWFyPVwiTU3mnIhEROaXpVwiLCByZVllYXJzQWdvPVwiWVlZWeW5tE1N5pyIRETml6VcIil7XG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXG5cdFx0cmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMuaXNTYW1lRGF0ZShub3cpID8gcmVUb2RheSA6XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyByZVRoaXNZZWFyIDogcmVZZWFyc0Fnbylcblx0fSxcblx0Z2V0V2Vlaygpe1xuXHRcdHZhciBkYXRlID0gbmV3IERhdGUodGhpcy5nZXRUaW1lKCkpXG5cdFx0ZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblx0XHQvLyBUaHVyc2RheSBpbiBjdXJyZW50IHdlZWsgZGVjaWRlcyB0aGUgeWVhci5cblx0XHRkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAzIC0gKGRhdGUuZ2V0RGF5KCkgKyA2KSAlIDcpO1xuXHRcdC8vIEphbnVhcnkgNCBpcyBhbHdheXMgaW4gd2VlayAxLlxuXHRcdHZhciB3ZWVrMSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgNCk7XG5cdFx0Ly8gQWRqdXN0IHRvIFRodXJzZGF5IGluIHdlZWsgMSBhbmQgY291bnQgbnVtYmVyIG9mIHdlZWtzIGZyb20gZGF0ZSB0byB3ZWVrMS5cblx0XHRyZXR1cm4gMSArIE1hdGgucm91bmQoKChkYXRlLmdldFRpbWUoKSAtIHdlZWsxLmdldFRpbWUoKSkgLyA4NjQwMDAwMFxuXHRcdFx0XHRcdFx0LSAzICsgKHdlZWsxLmdldERheSgpICsgNikgJSA3KSAvIDcpO1xuXHR9XG59KVxuIl19