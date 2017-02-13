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
		return _interopRequireDefault(_qiliApp).default;
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function REMOVE_ENTITIES(type) {
	for (var _len3 = arguments.length, ids = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
		ids[_key3 - 1] = arguments[_key3];
	}

	return { type: 'NORMALIZED_DATA', payload: _defineProperty({}, type, { $remove: ids }) };
}

;(function (_raw) {
	var r = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):((\d{2})(?:\.(\d*))?)Z$/,
	    ds;
	JSON.parse = function (a, reviver) {
		return _raw.call(JSON, a, function (k, v) {
			if (typeof v == 'string' && v[v.length - 1] == 'Z' && v[10] == 'T' && (ds = r.exec(v))) {
				return new Date(Date.UTC(+ds[1], +ds[2] - 1, +ds[3], +ds[4], +ds[5], +ds[7], +ds[8]));
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJkZWZhdWx0IiwiZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMiLCJFTlRJVElFUyIsIlJFTU9WRV9FTlRJVElFUyIsIlVJIiwiRW1wdHkiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJQaG90byIsIk1lc3NhZ2VyIiwiZmlsZVNlbGVjdG9yIiwiQWNjb3VudCIsIlNldHRpbmciLCJQcm9maWxlIiwiVGV4dEZpZWxkeCIsImNvbXBhY3QiLCJvIiwia2V5cyIsInJlZHVjZSIsImEiLCJrIiwicmVkdWNlcnMiLCJjb21iaW5lQXJyYXlSZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJuZXh0IiwiZnVuY3Rpb25zIiwic2xpY2UiLCJjb21iaW5lZCIsImxhc3RUcnVuayIsImxlbmd0aCIsInR5cGUiLCJwdXNoIiwibWFwIiwiYiIsIk9iamVjdCIsImFzc2lnbiIsIndpdGhTYW1lS2V5UmVkdWNlcnMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImRhdGEiLCJwYXlsb2FkIiwiaWRzIiwiJHJlbW92ZSIsIl9yYXciLCJyIiwiZHMiLCJKU09OIiwicGFyc2UiLCJyZXZpdmVyIiwiY2FsbCIsInYiLCJleGVjIiwiRGF0ZSIsIlVUQyIsInByb3RvdHlwZSIsInRvRGF0ZSIsImQiLCJnZXRUaW1lIiwic2V0SG91cnMiLCJpc1NhbWVEYXRlIiwicmVsYXRpdmUiLCJNYXRoIiwiZmxvb3IiLCJyZWxhdGl2ZURhdGUiLCJkYXlzIiwiaXNGdXR1cmUiLCJmb3JtYXQiLCJ0bXBsIiwidmFsdWUiLCJ5IiwiZ2V0RnVsbFllYXIiLCJNIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJzIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaCIsInRvTG93ZXJDYXNlIiwic21hcnRGb3JtYXQiLCJyZVRvZGF5IiwicmVUaGlzWWVhciIsInJlWWVhcnNBZ28iLCJub3ciLCJnZXRXZWVrIiwiZGF0ZSIsInNldERhdGUiLCJnZXREYXkiLCJ3ZWVrMSIsInJvdW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzthQUFRQSxJOzs7Ozs7YUFBS0MsSzs7Ozs7O2FBQU1DLEk7Ozs7OzthQUFLQyxJOzs7Ozs7YUFBS0MsSTs7Ozs7O2FBQUtDLEc7Ozs7Ozs7OzswQ0FDMUJDLE87OztRQStCUUMsdUIsR0FBQUEsdUI7UUFzQ0FDLFEsR0FBQUEsUTtRQUlBQyxlLEdBQUFBLGU7O0FBdkVoQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUdPLElBQU1DLGtCQUFHO0FBQ1pDLHVCQURZO0FBRVhDLDJCQUZXO0FBR1hDLDJCQUhXO0FBSVhDLGlDQUpXO0FBS1hDLHVCQUxXO0FBTVhDLDZCQU5XO0FBT2RDLHFDQVBjO0FBUWRDLDJCQVJjO0FBU1hDLDJCQVRXO0FBVVhDLCtCQVZXO0FBV1hDO0FBWFcsQ0FBVDtBQWFBLElBQU1DLDRCQUFRLFNBQVJBLE9BQVEsQ0FBQ0MsQ0FBRDtBQUFBLG1DQUFNQyxJQUFOO0FBQU1BLE1BQU47QUFBQTs7QUFBQSxRQUFhRCxJQUFJQyxLQUFLQyxNQUFMLENBQVksVUFBQ0MsQ0FBRCxFQUFHQyxDQUFIO0FBQUEsU0FBUUQsRUFBRUMsQ0FBRixJQUFLSixFQUFFSSxDQUFGLENBQUwsRUFBVUQsQ0FBbEI7QUFBQSxFQUFaLEVBQWlDLEVBQWpDLENBQUosR0FBMkMsRUFBeEQ7QUFBQSxDQUFkOztBQUVBLFNBQVNuQix1QkFBVCxHQUE2QztBQUFBLG9DQUFUcUIsUUFBUztBQUFUQSxVQUFTO0FBQUE7O0FBQ25ELEtBQU1DLHNCQUFvQixTQUFwQkEsbUJBQW9CO0FBQUEsU0FBVSxVQUFDQyxLQUFELEVBQU9DLE1BQVA7QUFBQSxVQUFnQkgsU0FBU0gsTUFB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QUFvQixDQUFwQixFQUF1QixDQUF2QjtBQUNBO0FBQ0ErQixPQUFLQyxPQUFMLENBQWFELEtBQUtoQixPQUFMLEtBQWlCLENBQWpCLEdBQXFCLENBQUNnQixLQUFLRSxNQUFMLEtBQWdCLENBQWpCLElBQXNCLENBQXhEO0FBQ0E7QUFDQSxNQUFJQyxRQUFRLElBQUl4QyxJQUFKLENBQVNxQyxLQUFLbkIsV0FBTCxFQUFULEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLENBQVo7QUFDQTtBQUNBLFNBQU8sSUFBSVQsS0FBS2dDLEtBQUwsQ0FBVyxDQUFDLENBQUNKLEtBQUtoQyxPQUFMLEtBQWlCbUMsTUFBTW5DLE9BQU4sRUFBbEIsSUFBcUMsUUFBckMsR0FDakIsQ0FEaUIsR0FDYixDQUFDbUMsTUFBTUQsTUFBTixLQUFpQixDQUFsQixJQUF1QixDQURYLElBQ2dCLENBRDNCLENBQVg7QUFFQTtBQTlDMkIsQ0FBN0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge2luaXQsTW9kZWwsVXNlcixSb2xlLEZpbGUsTG9nfSBmcm9tIFwiLi9kYlwiXHJcbmV4cG9ydCB7ZGVmYXVsdCBhcyBRaWxpQXBwfSBmcm9tIFwiLi9xaWxpQXBwXCJcclxuXHJcbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3VudFwiXHJcbmltcG9ydCBFbXB0eSBmcm9tIFwiLi9jb21wb25lbnRzL2VtcHR5XCJcclxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcclxuaW1wb3J0IENvbW1lbnQgZnJvbSBcIi4vY29tcG9uZW50cy9jb21tZW50XCJcclxuaW1wb3J0IENvbW1hbmRCYXIgIGZyb20gXCIuL2NvbXBvbmVudHMvY29tbWFuZC1iYXJcIlxyXG5pbXBvcnQgUGhvdG8gIGZyb20gXCIuL2NvbXBvbmVudHMvcGhvdG9cIlxyXG5pbXBvcnQgTWVzc2FnZXIgIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxyXG5pbXBvcnQgZmlsZVNlbGVjdG9yICBmcm9tIFwiLi9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3JcIlxyXG5pbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcInJlZHV4XCJcclxuaW1wb3J0IFNldHRpbmcgZnJvbSBcIi4vc2V0dGluZ1wiXHJcbmltcG9ydCBQcm9maWxlIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXHJcbmltcG9ydCBUZXh0RmllbGR4IGZyb20gXCIuL2NvbXBvbmVudHMvdGV4dC1maWVsZFwiXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IFVJPXtcclxuICAgIEVtcHR5XHJcbiAgICAsTG9hZGluZ1xyXG4gICAgLENvbW1lbnRcclxuICAgICxDb21tYW5kQmFyXHJcbiAgICAsUGhvdG9cclxuICAgICxNZXNzYWdlclxyXG5cdCxmaWxlU2VsZWN0b3JcclxuXHQsQWNjb3VudFxyXG4gICAgLFNldHRpbmdcclxuICAgICxQcm9maWxlXHJcbiAgICAsVGV4dEZpZWxkeFxyXG59XHJcbmV4cG9ydCBjb25zdCBjb21wYWN0PShvLC4uLmtleXMpPT5vID8ga2V5cy5yZWR1Y2UoKGEsayk9PihhW2tdPW9ba10sYSkse30pIDoge31cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmhhbmNlZENvbWJpbmVSZWR1Y2VycyguLi5yZWR1Y2Vycyl7XHJcblx0Y29uc3QgY29tYmluZUFycmF5UmVkdWNlcj1yZWR1Y2Vycz0+KHN0YXRlLGFjdGlvbik9PnJlZHVjZXJzLnJlZHVjZSgoc3RhdGUsbmV4dCk9PntcclxuICAgICAgICByZXR1cm4gbmV4dChzdGF0ZSxhY3Rpb24pXHJcbiAgICB9LCBzdGF0ZSlcclxuXHJcblx0Y29uc3QgZnVuY3Rpb25zPXJlZHVjZXJzLnNsaWNlKDEpLnJlZHVjZSgoY29tYmluZWQsYSk9PntcclxuICAgICAgICBjb25zdCBsYXN0VHJ1bms9Y29tYmluZWRbY29tYmluZWQubGVuZ3RoLTFdXHJcbiAgICAgICAgY29uc3QgdHlwZT10eXBlb2YobGFzdFRydW5rWzBdKVxyXG4gICAgICAgIGlmKHR5cGUhPXR5cGVvZihhKSl7XHJcbiAgICAgICAgICAgIGNvbWJpbmVkLnB1c2goW2FdKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsYXN0VHJ1bmsucHVzaChhKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tYmluZWRcclxuICAgIH0sW1tyZWR1Y2Vyc1swXV1dKS5tYXAoYT0+e1xyXG4gICAgICAgIGlmKHR5cGVvZihhWzBdKT09J29iamVjdCcpe1xyXG5cdFx0XHQvL21lcmdlIHt1aTphfSx7dWksYn0gPT0+IHt1aTogW2EsYl19XHJcblx0XHRcdHJldHVybiBjb21iaW5lUmVkdWNlcnMoXHJcblx0XHRcdFx0YS5yZWR1Y2UoKGNvbWJpbmVkLGIpPT57XHJcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuXHRcdFx0XHRcdFx0Y29tYmluZWQsXHJcblx0XHRcdFx0XHRcdGIsXHJcblx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKGNvbWJpbmVkKS5yZWR1Y2UoKHdpdGhTYW1lS2V5UmVkdWNlcnMsa2V5KT0+ey8vbWVyZ2Ugd2l0aCBzYW1lIGtleVxyXG5cdFx0XHRcdFx0XHRcdGlmKGIuaGFzT3duUHJvcGVydHkoa2V5KSl7XHJcblx0XHRcdFx0XHRcdFx0XHR3aXRoU2FtZUtleVJlZHVjZXJzW2tleV09Y29tYmluZUFycmF5UmVkdWNlcihbY29tYmluZWRba2V5XSxiW2tleV1dKVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gd2l0aFNhbWVLZXlSZWR1Y2Vyc1xyXG5cdFx0XHRcdFx0XHR9LHt9KVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdH0se30pXHJcblx0XHRcdClcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVBcnJheVJlZHVjZXIoYSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGNvbWJpbmVBcnJheVJlZHVjZXIoZnVuY3Rpb25zKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRU5USVRJRVMoZGF0YSl7XHJcblx0cmV0dXJuIHt0eXBlOidOT1JNQUxJWkVEX0RBVEEnLCBwYXlsb2FkOmRhdGF9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSRU1PVkVfRU5USVRJRVModHlwZSwgLi4uaWRzKXtcclxuICAgIHJldHVybiB7dHlwZTonTk9STUFMSVpFRF9EQVRBJywgcGF5bG9hZDp7W3R5cGVdOnskcmVtb3ZlOmlkc319fVxyXG59XHJcblxyXG47KGZ1bmN0aW9uKF9yYXcpe1xyXG4gICAgdmFyIHI9L14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooKFxcZHsyfSkoPzpcXC4oXFxkKikpPylaJC8sZHNcclxuICAgIEpTT04ucGFyc2U9KGEscmV2aXZlcik9PntcclxuICAgICAgICByZXR1cm4gX3Jhdy5jYWxsKEpTT04sYSwoayx2KT0+e1xyXG4gICAgICAgICAgICBpZih0eXBlb2Yodik9PSdzdHJpbmcnICYmIHZbdi5sZW5ndGgtMV09PSdaJyAmJiB2WzEwXT09J1QnICYmIChkcz1yLmV4ZWModikpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQygrZHNbMV0sICtkc1syXSAtIDEsICtkc1szXSwgK2RzWzRdLCAgK2RzWzVdLCArZHNbN10sICtkc1s4XSkpO1xyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIHJldHVybiByZXZpdmVyID8gcmV2aXZlcihrLHYpIDogdlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0pKEpTT04ucGFyc2UpO1xyXG5cclxuT2JqZWN0LmFzc2lnbihEYXRlLnByb3RvdHlwZSx7XHJcblx0dG9EYXRlKCl7XHJcblx0XHRsZXQgZD1uZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSlcclxuXHRcdGQuc2V0SG91cnMoMCwwLDAsMClcclxuXHRcdHJldHVybiBkXHJcblx0fSxcclxuXHRpc1NhbWVEYXRlKGQpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUoZCk9PTBcclxuXHR9LFxyXG5cdHJlbGF0aXZlKGQpe1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoKHRoaXMudG9EYXRlKCkuZ2V0VGltZSgpLWQudG9EYXRlKCkuZ2V0VGltZSgpKS8oMjQqNjAqNjAqMTAwMCkpXHJcblx0fSxcclxuXHRyZWxhdGl2ZURhdGUoZGF5cyl7XHJcblx0XHRyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRUaW1lKCkrMjQqNjAqNjAqMTAwMCpkYXlzKVxyXG5cdH0sXHJcblx0aXNGdXR1cmUoKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKG5ldyBEYXRlKCkpPjBcclxuXHR9LFxyXG5cdGZvcm1hdCh0bXBsPVwieS1NLWRcIil7XHJcblx0XHRsZXQgdmFsdWU9e1xyXG5cdFx0XHR5OnRoaXMuZ2V0RnVsbFllYXIoKSxcclxuXHRcdFx0TTp0aGlzLmdldE1vbnRoKCkrMSxcclxuXHRcdFx0ZDp0aGlzLmdldERhdGUoKSxcclxuXHRcdFx0aDp0aGlzLmdldEhvdXJzKCksXHJcblx0XHRcdG06dGhpcy5nZXRNaW51dGVzKCksXHJcblx0XHRcdHM6dGhpcy5nZXRTZWNvbmRzKClcclxuXHRcdH1cclxuXHRcdHJldHVybiB0bXBsLnJlcGxhY2UoLyhbeW1kaHNdKSsvaWcsIGZ1bmN0aW9uKG1hdGNoLHR5cGUpe1xyXG5cdFx0XHRyZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxyXG5cdFx0fSlcclxuXHR9LFxyXG5cdHNtYXJ0Rm9ybWF0KHJlVG9kYXk9XCLku4rlpKkgSEg6bW1cIiwgcmVUaGlzWWVhcj1cIk1N5pyIRETml6VcIiwgcmVZZWFyc0Fnbz1cIllZWVnlubRNTeaciERE5pelXCIpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5pc1NhbWVEYXRlKG5vdykgPyByZVRvZGF5IDpcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gcmVUaGlzWWVhciA6IHJlWWVhcnNBZ28pXHJcblx0fSxcclxuXHRnZXRXZWVrKCl7XHJcblx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKVxyXG5cdFx0ZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuXHRcdC8vIFRodXJzZGF5IGluIGN1cnJlbnQgd2VlayBkZWNpZGVzIHRoZSB5ZWFyLlxyXG5cdFx0ZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgMyAtIChkYXRlLmdldERheSgpICsgNikgJSA3KTtcclxuXHRcdC8vIEphbnVhcnkgNCBpcyBhbHdheXMgaW4gd2VlayAxLlxyXG5cdFx0dmFyIHdlZWsxID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCA0KTtcclxuXHRcdC8vIEFkanVzdCB0byBUaHVyc2RheSBpbiB3ZWVrIDEgYW5kIGNvdW50IG51bWJlciBvZiB3ZWVrcyBmcm9tIGRhdGUgdG8gd2VlazEuXHJcblx0XHRyZXR1cm4gMSArIE1hdGgucm91bmQoKChkYXRlLmdldFRpbWUoKSAtIHdlZWsxLmdldFRpbWUoKSkgLyA4NjQwMDAwMFxyXG5cdFx0XHRcdFx0XHQtIDMgKyAod2VlazEuZ2V0RGF5KCkgKyA2KSAlIDcpIC8gNyk7XHJcblx0fVxyXG59KVxyXG4iXX0=