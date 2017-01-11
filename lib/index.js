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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJkZWZhdWx0IiwiZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMiLCJFTlRJVElFUyIsIlJFTU9WRV9FTlRJVElFUyIsIlVJIiwiRW1wdHkiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJQaG90byIsIk1lc3NhZ2VyIiwiZmlsZVNlbGVjdG9yIiwiQWNjb3VudCIsIlNldHRpbmciLCJQcm9maWxlIiwiVGV4dEZpZWxkeCIsImNvbXBhY3QiLCJvIiwia2V5cyIsInJlZHVjZSIsImEiLCJrIiwicmVkdWNlcnMiLCJjb21iaW5lQXJyYXlSZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJuZXh0IiwiZnVuY3Rpb25zIiwic2xpY2UiLCJjb21iaW5lZCIsImxhc3RUcnVuayIsImxlbmd0aCIsInR5cGUiLCJwdXNoIiwibWFwIiwiYiIsIk9iamVjdCIsImFzc2lnbiIsIndpdGhTYW1lS2V5UmVkdWNlcnMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImRhdGEiLCJwYXlsb2FkIiwiaWRzIiwiJHJlbW92ZSIsIl9yYXciLCJyIiwiZHMiLCJKU09OIiwicGFyc2UiLCJyZXZpdmVyIiwiY2FsbCIsInYiLCJleGVjIiwiRGF0ZSIsIlVUQyIsInByb3RvdHlwZSIsInRvRGF0ZSIsImQiLCJnZXRUaW1lIiwic2V0SG91cnMiLCJpc1NhbWVEYXRlIiwicmVsYXRpdmUiLCJNYXRoIiwiZmxvb3IiLCJyZWxhdGl2ZURhdGUiLCJkYXlzIiwiaXNGdXR1cmUiLCJmb3JtYXQiLCJ0bXBsIiwidmFsdWUiLCJ5IiwiZ2V0RnVsbFllYXIiLCJNIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJzIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaCIsInRvTG93ZXJDYXNlIiwic21hcnRGb3JtYXQiLCJyZVRvZGF5IiwicmVUaGlzWWVhciIsInJlWWVhcnNBZ28iLCJub3ciLCJnZXRXZWVrIiwiZGF0ZSIsInNldERhdGUiLCJnZXREYXkiLCJ3ZWVrMSIsInJvdW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzthQUFRQSxJOzs7Ozs7YUFBS0MsSzs7Ozs7O2FBQU1DLEk7Ozs7OzthQUFLQyxJOzs7Ozs7YUFBS0MsSTs7Ozs7O2FBQUtDLEc7Ozs7Ozs7OzswQ0FDMUJDLE87OztRQStCUUMsdUIsR0FBQUEsdUI7UUFzQ0FDLFEsR0FBQUEsUTtRQUlBQyxlLEdBQUFBLGU7O0FBdkVoQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUdPLElBQU1DLGtCQUFHO0FBQ1pDLHVCQURZO0FBRVhDLDJCQUZXO0FBR1hDLDJCQUhXO0FBSVhDLGlDQUpXO0FBS1hDLHVCQUxXO0FBTVhDLDZCQU5XO0FBT2RDLHFDQVBjO0FBUWRDLDJCQVJjO0FBU1hDLDJCQVRXO0FBVVhDLCtCQVZXO0FBV1hDO0FBWFcsQ0FBVDtBQWFBLElBQU1DLDRCQUFRLFNBQVJBLE9BQVEsQ0FBQ0MsQ0FBRDtBQUFBLG1DQUFNQyxJQUFOO0FBQU1BLE1BQU47QUFBQTs7QUFBQSxRQUFhRCxJQUFJQyxLQUFLQyxNQUFMLENBQVksVUFBQ0MsQ0FBRCxFQUFHQyxDQUFIO0FBQUEsU0FBUUQsRUFBRUMsQ0FBRixJQUFLSixFQUFFSSxDQUFGLENBQUwsRUFBVUQsQ0FBbEI7QUFBQSxFQUFaLEVBQWlDLEVBQWpDLENBQUosR0FBMkMsRUFBeEQ7QUFBQSxDQUFkOztBQUVBLFNBQVNuQix1QkFBVCxHQUE2QztBQUFBLG9DQUFUcUIsUUFBUztBQUFUQSxVQUFTO0FBQUE7O0FBQ25ELEtBQU1DLHNCQUFvQixTQUFwQkEsbUJBQW9CO0FBQUEsU0FBVSxVQUFDQyxLQUFELEVBQU9DLE1BQVA7QUFBQSxVQUFnQkgsU0FBU0gsTUFBVCxDQUFnQixVQUFDSyxLQUFELEVBQU9FLElBQVAsRUFBYztBQUMzRSxXQUFPQSxLQUFLRixLQUFMLEVBQVdDLE1BQVgsQ0FBUDtBQUNILElBRmdELEVBRTlDRCxLQUY4QyxDQUFoQjtBQUFBLEdBQVY7QUFBQSxFQUExQjs7QUFJQSxLQUFNRyxZQUFVTCxTQUFTTSxLQUFULENBQWUsQ0FBZixFQUFrQlQsTUFBbEIsQ0FBeUIsVUFBQ1UsUUFBRCxFQUFVVCxDQUFWLEVBQWM7QUFDaEQsTUFBTVUsWUFBVUQsU0FBU0EsU0FBU0UsTUFBVCxHQUFnQixDQUF6QixDQUFoQjtBQUNBLE1BQU1DLGVBQVlGLFVBQVUsQ0FBVixDQUFaLENBQU47QUFDQSxNQUFHRSxnQkFBYVosQ0FBYix5Q0FBYUEsQ0FBYixFQUFILEVBQW1CO0FBQ2ZTLFlBQVNJLElBQVQsQ0FBYyxDQUFDYixDQUFELENBQWQ7QUFDSCxHQUZELE1BRUs7QUFDRFUsYUFBVUcsSUFBVixDQUFlYixDQUFmO0FBQ0g7QUFDRCxTQUFPUyxRQUFQO0FBQ0gsRUFUWSxFQVNYLENBQUMsQ0FBQ1AsU0FBUyxDQUFULENBQUQsQ0FBRCxDQVRXLEVBU01ZLEdBVE4sQ0FTVSxhQUFHO0FBQ3RCLE1BQUcsUUFBT2QsRUFBRSxDQUFGLENBQVAsS0FBYyxRQUFqQixFQUEwQjtBQUMvQjtBQUNBLFVBQU8sNEJBQ05BLEVBQUVELE1BQUYsQ0FBUyxVQUFDVSxRQUFELEVBQVVNLENBQVYsRUFBYztBQUN0QixXQUFPQyxPQUFPQyxNQUFQLENBQ05SLFFBRE0sRUFFTk0sQ0FGTSxFQUdOQyxPQUFPbEIsSUFBUCxDQUFZVyxRQUFaLEVBQXNCVixNQUF0QixDQUE2QixVQUFDbUIsbUJBQUQsRUFBcUJDLEdBQXJCLEVBQTJCO0FBQUM7QUFDeEQsU0FBR0osRUFBRUssY0FBRixDQUFpQkQsR0FBakIsQ0FBSCxFQUF5QjtBQUN4QkQsMEJBQW9CQyxHQUFwQixJQUF5QmhCLG9CQUFvQixDQUFDTSxTQUFTVSxHQUFULENBQUQsRUFBZUosRUFBRUksR0FBRixDQUFmLENBQXBCLENBQXpCO0FBQ0E7QUFDRCxZQUFPRCxtQkFBUDtBQUNBLEtBTEQsRUFLRSxFQUxGLENBSE0sQ0FBUDtBQVVBLElBWEQsRUFXRSxFQVhGLENBRE0sQ0FBUDtBQWNNLEdBaEJELE1BZ0JLO0FBQ0QsVUFBT2Ysb0JBQW9CSCxDQUFwQixDQUFQO0FBQ0g7QUFDSixFQTdCWSxDQUFoQjtBQThCRyxRQUFPRyxvQkFBb0JJLFNBQXBCLENBQVA7QUFDSDs7QUFFTSxTQUFTekIsUUFBVCxDQUFrQnVDLElBQWxCLEVBQXVCO0FBQzdCLFFBQU8sRUFBQ1QsTUFBSyxpQkFBTixFQUF5QlUsU0FBUUQsSUFBakMsRUFBUDtBQUNBOztBQUVNLFNBQVN0QyxlQUFULENBQXlCNkIsSUFBekIsRUFBc0M7QUFBQSxvQ0FBSlcsR0FBSTtBQUFKQSxLQUFJO0FBQUE7O0FBQ3pDLFFBQU8sRUFBQ1gsTUFBSyxpQkFBTixFQUF5QlUsNkJBQVVWLElBQVYsRUFBZ0IsRUFBQ1ksU0FBUUQsR0FBVCxFQUFoQixDQUF6QixFQUFQO0FBQ0g7O0FBRUQsQ0FBQyxDQUFDLFVBQVNFLElBQVQsRUFBYztBQUNaLEtBQUlDLElBQUUsa0VBQU47QUFBQSxLQUF5RUMsRUFBekU7QUFDQUMsTUFBS0MsS0FBTCxHQUFXLFVBQUM3QixDQUFELEVBQUc4QixPQUFILEVBQWE7QUFDcEIsU0FBT0wsS0FBS00sSUFBTCxDQUFVSCxJQUFWLEVBQWU1QixDQUFmLEVBQWlCLFVBQUNDLENBQUQsRUFBRytCLENBQUgsRUFBTztBQUMzQixPQUFHLE9BQU9BLENBQVAsSUFBVyxRQUFYLElBQXVCQSxFQUFFQSxFQUFFckIsTUFBRixHQUFTLENBQVgsS0FBZSxHQUF0QyxJQUE2Q3FCLEVBQUUsRUFBRixLQUFPLEdBQXBELEtBQTRETCxLQUFHRCxFQUFFTyxJQUFGLENBQU9ELENBQVAsQ0FBL0QsQ0FBSCxFQUE2RTtBQUN6RSxXQUFPLElBQUlFLElBQUosQ0FBU0EsS0FBS0MsR0FBTCxDQUFTLENBQUNSLEdBQUcsQ0FBSCxDQUFWLEVBQWlCLENBQUNBLEdBQUcsQ0FBSCxDQUFELEdBQVMsQ0FBMUIsRUFBNkIsQ0FBQ0EsR0FBRyxDQUFILENBQTlCLEVBQXFDLENBQUNBLEdBQUcsQ0FBSCxDQUF0QyxFQUE4QyxDQUFDQSxHQUFHLENBQUgsQ0FBL0MsRUFBc0QsQ0FBQ0EsR0FBRyxDQUFILENBQXZELEVBQThELENBQUNBLEdBQUcsQ0FBSCxDQUEvRCxDQUFULENBQVA7QUFDWjtBQUNRLFVBQU9HLFVBQVVBLFFBQVE3QixDQUFSLEVBQVUrQixDQUFWLENBQVYsR0FBeUJBLENBQWhDO0FBQ0gsR0FMTSxDQUFQO0FBTUgsRUFQRDtBQVFILENBVkEsRUFVRUosS0FBS0MsS0FWUDs7QUFZRGIsT0FBT0MsTUFBUCxDQUFjaUIsS0FBS0UsU0FBbkIsRUFBNkI7QUFDNUJDLE9BRDRCLG9CQUNwQjtBQUNQLE1BQUlDLElBQUUsSUFBSUosSUFBSixDQUFTLEtBQUtLLE9BQUwsRUFBVCxDQUFOO0FBQ0FELElBQUVFLFFBQUYsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakI7QUFDQSxTQUFPRixDQUFQO0FBQ0EsRUFMMkI7QUFNNUJHLFdBTjRCLHNCQU1qQkgsQ0FOaUIsRUFNZjtBQUNaLFNBQU8sS0FBS0ksUUFBTCxDQUFjSixDQUFkLEtBQWtCLENBQXpCO0FBQ0EsRUFSMkI7QUFTNUJJLFNBVDRCLG9CQVNuQkosQ0FUbUIsRUFTakI7QUFDVixTQUFPSyxLQUFLQyxLQUFMLENBQVcsQ0FBQyxLQUFLUCxNQUFMLEdBQWNFLE9BQWQsS0FBd0JELEVBQUVELE1BQUYsR0FBV0UsT0FBWCxFQUF6QixLQUFnRCxLQUFHLEVBQUgsR0FBTSxFQUFOLEdBQVMsSUFBekQsQ0FBWCxDQUFQO0FBQ0EsRUFYMkI7QUFZNUJNLGFBWjRCLHdCQVlmQyxJQVplLEVBWVY7QUFDakIsU0FBTyxJQUFJWixJQUFKLENBQVMsS0FBS0ssT0FBTCxLQUFlLEtBQUcsRUFBSCxHQUFNLEVBQU4sR0FBUyxJQUFULEdBQWNPLElBQXRDLENBQVA7QUFDQSxFQWQyQjtBQWU1QkMsU0FmNEIsc0JBZWxCO0FBQ1QsU0FBTyxLQUFLTCxRQUFMLENBQWMsSUFBSVIsSUFBSixFQUFkLElBQTBCLENBQWpDO0FBQ0EsRUFqQjJCO0FBa0I1QmMsT0FsQjRCLG9CQWtCUjtBQUFBLE1BQWJDLElBQWEsdUVBQVIsT0FBUTs7QUFDbkIsTUFBSUMsUUFBTTtBQUNUQyxNQUFFLEtBQUtDLFdBQUwsRUFETztBQUVUQyxNQUFFLEtBQUtDLFFBQUwsS0FBZ0IsQ0FGVDtBQUdUaEIsTUFBRSxLQUFLaUIsT0FBTCxFQUhPO0FBSVRDLE1BQUUsS0FBS0MsUUFBTCxFQUpPO0FBS1RDLE1BQUUsS0FBS0MsVUFBTCxFQUxPO0FBTVRDLE1BQUUsS0FBS0MsVUFBTDtBQU5PLEdBQVY7QUFRQSxTQUFPWixLQUFLYSxPQUFMLENBQWEsY0FBYixFQUE2QixVQUFTQyxLQUFULEVBQWVuRCxJQUFmLEVBQW9CO0FBQ3ZELFVBQU9zQyxNQUFNdEMsUUFBTSxHQUFOLEdBQVlBLEtBQUtvRCxXQUFMLEVBQVosR0FBaUNwRCxJQUF2QyxLQUFnRCxFQUF2RDtBQUNBLEdBRk0sQ0FBUDtBQUdBLEVBOUIyQjtBQStCNUJxRCxZQS9CNEIseUJBK0JrRDtBQUFBLE1BQWxFQyxPQUFrRSx1RUFBMUQsVUFBMEQ7QUFBQSxNQUE5Q0MsVUFBOEMsdUVBQW5DLFFBQW1DO0FBQUEsTUFBekJDLFVBQXlCLHVFQUFkLGFBQWM7O0FBQzdFLE1BQUlDLE1BQUksSUFBSW5DLElBQUosRUFBUjtBQUNBLFNBQU8sS0FBS2MsTUFBTCxDQUFZLEtBQUtQLFVBQUwsQ0FBZ0I0QixHQUFoQixJQUF1QkgsT0FBdkIsR0FDZCxLQUFLZCxXQUFMLE1BQW9CaUIsSUFBSWpCLFdBQUosRUFBcEIsR0FBd0NlLFVBQXhDLEdBQXFEQyxVQURuRCxDQUFQO0FBRUEsRUFuQzJCO0FBb0M1QkUsUUFwQzRCLHFCQW9DbkI7QUFDUixNQUFJQyxPQUFPLElBQUlyQyxJQUFKLENBQVMsS0FBS0ssT0FBTCxFQUFULENBQVg7QUFDQWdDLE9BQUsvQixRQUFMLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QixDQUF2QjtBQUNBO0FBQ0ErQixPQUFLQyxPQUFMLENBQWFELEtBQUtoQixPQUFMLEtBQWlCLENBQWpCLEdBQXFCLENBQUNnQixLQUFLRSxNQUFMLEtBQWdCLENBQWpCLElBQXNCLENBQXhEO0FBQ0E7QUFDQSxNQUFJQyxRQUFRLElBQUl4QyxJQUFKLENBQVNxQyxLQUFLbkIsV0FBTCxFQUFULEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLENBQVo7QUFDQTtBQUNBLFNBQU8sSUFBSVQsS0FBS2dDLEtBQUwsQ0FBVyxDQUFDLENBQUNKLEtBQUtoQyxPQUFMLEtBQWlCbUMsTUFBTW5DLE9BQU4sRUFBbEIsSUFBcUMsUUFBckMsR0FDakIsQ0FEaUIsR0FDYixDQUFDbUMsTUFBTUQsTUFBTixLQUFpQixDQUFsQixJQUF1QixDQURYLElBQ2dCLENBRDNCLENBQVg7QUFFQTtBQTlDMkIsQ0FBN0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge2luaXQsTW9kZWwsVXNlcixSb2xlLEZpbGUsTG9nfSBmcm9tIFwiLi9kYlwiXG5leHBvcnQge2RlZmF1bHQgYXMgUWlsaUFwcH0gZnJvbSBcIi4vcWlsaUFwcFwiXG5cbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3VudFwiXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4vY29tcG9uZW50cy9lbXB0eVwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IENvbW1lbnQgZnJvbSBcIi4vY29tcG9uZW50cy9jb21tZW50XCJcbmltcG9ydCBDb21tYW5kQmFyICBmcm9tIFwiLi9jb21wb25lbnRzL2NvbW1hbmQtYmFyXCJcbmltcG9ydCBQaG90byAgZnJvbSBcIi4vY29tcG9uZW50cy9waG90b1wiXG5pbXBvcnQgTWVzc2FnZXIgIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IGZpbGVTZWxlY3RvciAgZnJvbSBcIi4vY29tcG9uZW50cy9maWxlLXNlbGVjdG9yXCJcbmltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IFNldHRpbmcgZnJvbSBcIi4vc2V0dGluZ1wiXG5pbXBvcnQgUHJvZmlsZSBmcm9tIFwiLi91c2VyLXByb2ZpbGVcIlxuaW1wb3J0IFRleHRGaWVsZHggZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0LWZpZWxkXCJcblxuXG5leHBvcnQgY29uc3QgVUk9e1xuICAgIEVtcHR5XG4gICAgLExvYWRpbmdcbiAgICAsQ29tbWVudFxuICAgICxDb21tYW5kQmFyXG4gICAgLFBob3RvXG4gICAgLE1lc3NhZ2VyXG5cdCxmaWxlU2VsZWN0b3Jcblx0LEFjY291bnRcbiAgICAsU2V0dGluZ1xuICAgICxQcm9maWxlXG4gICAgLFRleHRGaWVsZHhcbn1cbmV4cG9ydCBjb25zdCBjb21wYWN0PShvLC4uLmtleXMpPT5vID8ga2V5cy5yZWR1Y2UoKGEsayk9PihhW2tdPW9ba10sYSkse30pIDoge31cblxuZXhwb3J0IGZ1bmN0aW9uIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKC4uLnJlZHVjZXJzKXtcblx0Y29uc3QgY29tYmluZUFycmF5UmVkdWNlcj1yZWR1Y2Vycz0+KHN0YXRlLGFjdGlvbik9PnJlZHVjZXJzLnJlZHVjZSgoc3RhdGUsbmV4dCk9PntcbiAgICAgICAgcmV0dXJuIG5leHQoc3RhdGUsYWN0aW9uKVxuICAgIH0sIHN0YXRlKVxuXG5cdGNvbnN0IGZ1bmN0aW9ucz1yZWR1Y2Vycy5zbGljZSgxKS5yZWR1Y2UoKGNvbWJpbmVkLGEpPT57XG4gICAgICAgIGNvbnN0IGxhc3RUcnVuaz1jb21iaW5lZFtjb21iaW5lZC5sZW5ndGgtMV1cbiAgICAgICAgY29uc3QgdHlwZT10eXBlb2YobGFzdFRydW5rWzBdKVxuICAgICAgICBpZih0eXBlIT10eXBlb2YoYSkpe1xuICAgICAgICAgICAgY29tYmluZWQucHVzaChbYV0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGFzdFRydW5rLnB1c2goYSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZWRcbiAgICB9LFtbcmVkdWNlcnNbMF1dXSkubWFwKGE9PntcbiAgICAgICAgaWYodHlwZW9mKGFbMF0pPT0nb2JqZWN0Jyl7XG5cdFx0XHQvL21lcmdlIHt1aTphfSx7dWksYn0gPT0+IHt1aTogW2EsYl19XG5cdFx0XHRyZXR1cm4gY29tYmluZVJlZHVjZXJzKFxuXHRcdFx0XHRhLnJlZHVjZSgoY29tYmluZWQsYik9Pntcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0XHRcdGNvbWJpbmVkLFxuXHRcdFx0XHRcdFx0Yixcblx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKGNvbWJpbmVkKS5yZWR1Y2UoKHdpdGhTYW1lS2V5UmVkdWNlcnMsa2V5KT0+ey8vbWVyZ2Ugd2l0aCBzYW1lIGtleVxuXHRcdFx0XHRcdFx0XHRpZihiLmhhc093blByb3BlcnR5KGtleSkpe1xuXHRcdFx0XHRcdFx0XHRcdHdpdGhTYW1lS2V5UmVkdWNlcnNba2V5XT1jb21iaW5lQXJyYXlSZWR1Y2VyKFtjb21iaW5lZFtrZXldLGJba2V5XV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHdpdGhTYW1lS2V5UmVkdWNlcnNcblx0XHRcdFx0XHRcdH0se30pXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9LHt9KVxuXHRcdFx0KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lQXJyYXlSZWR1Y2VyKGEpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBjb21iaW5lQXJyYXlSZWR1Y2VyKGZ1bmN0aW9ucylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVOVElUSUVTKGRhdGEpe1xuXHRyZXR1cm4ge3R5cGU6J05PUk1BTElaRURfREFUQScsIHBheWxvYWQ6ZGF0YX1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJFTU9WRV9FTlRJVElFUyh0eXBlLCAuLi5pZHMpe1xuICAgIHJldHVybiB7dHlwZTonTk9STUFMSVpFRF9EQVRBJywgcGF5bG9hZDp7W3R5cGVdOnskcmVtb3ZlOmlkc319fVxufVxuXG47KGZ1bmN0aW9uKF9yYXcpe1xuICAgIHZhciByPS9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KChcXGR7Mn0pKD86XFwuKFxcZCopKT8pWiQvLGRzXG4gICAgSlNPTi5wYXJzZT0oYSxyZXZpdmVyKT0+e1xuICAgICAgICByZXR1cm4gX3Jhdy5jYWxsKEpTT04sYSwoayx2KT0+e1xuICAgICAgICAgICAgaWYodHlwZW9mKHYpPT0nc3RyaW5nJyAmJiB2W3YubGVuZ3RoLTFdPT0nWicgJiYgdlsxMF09PSdUJyAmJiAoZHM9ci5leGVjKHYpKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKCtkc1sxXSwgK2RzWzJdIC0gMSwgK2RzWzNdLCArZHNbNF0sICArZHNbNV0sICtkc1s3XSwgK2RzWzhdKSk7XG5cdFx0XHR9XG4gICAgICAgICAgICByZXR1cm4gcmV2aXZlciA/IHJldml2ZXIoayx2KSA6IHZcbiAgICAgICAgfSlcbiAgICB9XG59KShKU09OLnBhcnNlKTtcblxuT2JqZWN0LmFzc2lnbihEYXRlLnByb3RvdHlwZSx7XG5cdHRvRGF0ZSgpe1xuXHRcdGxldCBkPW5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKVxuXHRcdGQuc2V0SG91cnMoMCwwLDAsMClcblx0XHRyZXR1cm4gZFxuXHR9LFxuXHRpc1NhbWVEYXRlKGQpe1xuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKGQpPT0wXG5cdH0sXG5cdHJlbGF0aXZlKGQpe1xuXHRcdHJldHVybiBNYXRoLmZsb29yKCh0aGlzLnRvRGF0ZSgpLmdldFRpbWUoKS1kLnRvRGF0ZSgpLmdldFRpbWUoKSkvKDI0KjYwKjYwKjEwMDApKVxuXHR9LFxuXHRyZWxhdGl2ZURhdGUoZGF5cyl7XG5cdFx0cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKzI0KjYwKjYwKjEwMDAqZGF5cylcblx0fSxcblx0aXNGdXR1cmUoKXtcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShuZXcgRGF0ZSgpKT4wXG5cdH0sXG5cdGZvcm1hdCh0bXBsPVwieS1NLWRcIil7XG5cdFx0bGV0IHZhbHVlPXtcblx0XHRcdHk6dGhpcy5nZXRGdWxsWWVhcigpLFxuXHRcdFx0TTp0aGlzLmdldE1vbnRoKCkrMSxcblx0XHRcdGQ6dGhpcy5nZXREYXRlKCksXG5cdFx0XHRoOnRoaXMuZ2V0SG91cnMoKSxcblx0XHRcdG06dGhpcy5nZXRNaW51dGVzKCksXG5cdFx0XHRzOnRoaXMuZ2V0U2Vjb25kcygpXG5cdFx0fVxuXHRcdHJldHVybiB0bXBsLnJlcGxhY2UoLyhbeW1kaHNdKSsvaWcsIGZ1bmN0aW9uKG1hdGNoLHR5cGUpe1xuXHRcdFx0cmV0dXJuIHZhbHVlW3R5cGUhPSdNJyA/IHR5cGUudG9Mb3dlckNhc2UoKSA6IHR5cGVdIHx8IFwiXCJcblx0XHR9KVxuXHR9LFxuXHRzbWFydEZvcm1hdChyZVRvZGF5PVwi5LuK5aSpIEhIOm1tXCIsIHJlVGhpc1llYXI9XCJNTeaciERE5pelXCIsIHJlWWVhcnNBZ289XCJZWVlZ5bm0TU3mnIhEROaXpVwiKXtcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5pc1NhbWVEYXRlKG5vdykgPyByZVRvZGF5IDpcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGdWxsWWVhcigpPT1ub3cuZ2V0RnVsbFllYXIoKSA/IHJlVGhpc1llYXIgOiByZVllYXJzQWdvKVxuXHR9LFxuXHRnZXRXZWVrKCl7XG5cdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSlcblx0XHRkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXHRcdC8vIFRodXJzZGF5IGluIGN1cnJlbnQgd2VlayBkZWNpZGVzIHRoZSB5ZWFyLlxuXHRcdGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIDMgLSAoZGF0ZS5nZXREYXkoKSArIDYpICUgNyk7XG5cdFx0Ly8gSmFudWFyeSA0IGlzIGFsd2F5cyBpbiB3ZWVrIDEuXG5cdFx0dmFyIHdlZWsxID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCA0KTtcblx0XHQvLyBBZGp1c3QgdG8gVGh1cnNkYXkgaW4gd2VlayAxIGFuZCBjb3VudCBudW1iZXIgb2Ygd2Vla3MgZnJvbSBkYXRlIHRvIHdlZWsxLlxuXHRcdHJldHVybiAxICsgTWF0aC5yb3VuZCgoKGRhdGUuZ2V0VGltZSgpIC0gd2VlazEuZ2V0VGltZSgpKSAvIDg2NDAwMDAwXG5cdFx0XHRcdFx0XHQtIDMgKyAod2VlazEuZ2V0RGF5KCkgKyA2KSAlIDcpIC8gNyk7XG5cdH1cbn0pXG4iXX0=