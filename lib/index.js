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
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJRaWxpQXBwIiwiZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMiLCJFTlRJVElFUyIsIlJFTU9WRV9FTlRJVElFUyIsIlVJIiwiRW1wdHkiLCJMb2FkaW5nIiwiQ29tbWVudCIsIkNvbW1hbmRCYXIiLCJQaG90byIsIk1lc3NhZ2VyIiwiZmlsZVNlbGVjdG9yIiwiQWNjb3VudCIsIlNldHRpbmciLCJQcm9maWxlIiwiVGV4dEZpZWxkeCIsImNvbXBhY3QiLCJvIiwia2V5cyIsInJlZHVjZSIsImEiLCJrIiwicmVkdWNlcnMiLCJjb21iaW5lQXJyYXlSZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJuZXh0IiwiZnVuY3Rpb25zIiwic2xpY2UiLCJjb21iaW5lZCIsImxhc3RUcnVuayIsImxlbmd0aCIsInR5cGUiLCJwdXNoIiwibWFwIiwiYiIsIndpdGhTYW1lS2V5UmVkdWNlcnMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImRhdGEiLCJwYXlsb2FkIiwiaWRzIiwiJHJlbW92ZSIsIl9yYXciLCJyIiwiZHMiLCJKU09OIiwicGFyc2UiLCJyZXZpdmVyIiwiY2FsbCIsInYiLCJleGVjIiwiRGF0ZSIsIlVUQyIsInByb3RvdHlwZSIsInRvRGF0ZSIsImQiLCJnZXRUaW1lIiwic2V0SG91cnMiLCJpc1NhbWVEYXRlIiwicmVsYXRpdmUiLCJNYXRoIiwiZmxvb3IiLCJyZWxhdGl2ZURhdGUiLCJkYXlzIiwiaXNGdXR1cmUiLCJmb3JtYXQiLCJ0bXBsIiwidmFsdWUiLCJ5IiwiZ2V0RnVsbFllYXIiLCJNIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJzIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaCIsInRvTG93ZXJDYXNlIiwic21hcnRGb3JtYXQiLCJyZVRvZGF5IiwicmVUaGlz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TTtBQUNUQyxNQUFFLEtBQUtDLFdBQUwsRUFETztBQUVUQyxNQUFFLEtBQUtDLFFBQUwsS0FBZ0IsQ0FGVDtBQUdUaEIsTUFBRSxLQUFLaUIsT0FBTCxFQUhPO0FBSVRDLE1BQUUsS0FBS0MsUUFBTCxFQUpPO0FBS1RDLE1BQUUsS0FBS0MsVUFBTCxFQUxPO0FBTVRDLE1BQUUsS0FBS0MsVUFBTDtBQU5PLEdBQVY7QUFRQSxTQUFPWixLQUFLYSxPQUFMLENBQWEsY0FBYixFQUE2QixVQUFTQyxLQUFULEVBQWVqRCxJQUFmLEVBQW9CO0FBQ3ZELFVBQU9vQyxNQUFNcEMsUUFBTSxHQUFOLEdBQVlBLEtBQUtrRCxXQUFMLEVBQVosR0FBaUNsRCxJQUF2QyxLQUFnRCxFQUF2RDtBQUNBLEdBRk0sQ0FBUDtBQUdBLEVBOUIyQjtBQStCNUJtRCxZQS9CNEIseUJBK0JrRDtBQUFBLE1BQWxFQyxPQUFrRSx1RUFBMUQsVUFBMEQ7QUFBQSxNQUE5Q0MsVUFBOEMsdUVBQW5DLFFBQW1DO0FBQUEsTUFBekJDLFVBQXlCLHVFQUFkLGFBQWM7O0FBQzdFLE1BQUlDLE1BQUksSUFBSW5DLElBQUosRUFBUjtBQUNBLFNBQU8sS0FBS2MsTUFBTCxDQUFZLEtBQUtQLFVBQUwsQ0FBZ0I0QixHQUFoQixJQUF1QkgsT0FBdkIsR0FDZCxLQUFLZCxXQUFMLE1BQW9CaUIsSUFBSWpCLFdBQUosRUFBcEIsR0FBd0NlLFVBQXhDLEdBQXFEQyxVQURuRCxDQUFQO0FBRUE7QUFuQzJCLENBQTdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtpbml0LE1vZGVsLFVzZXIsUm9sZSxGaWxlLExvZ30gZnJvbSBcIi4vZGJcIlxuZXhwb3J0IHtRaWxpQXBwfSBmcm9tIFwiLi9xaWxpQXBwXCJcblxuaW1wb3J0IEFjY291bnQgZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvdW50XCJcbmltcG9ydCBFbXB0eSBmcm9tIFwiLi9jb21wb25lbnRzL2VtcHR5XCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgQ29tbWVudCBmcm9tIFwiLi9jb21wb25lbnRzL2NvbW1lbnRcIlxuaW1wb3J0IENvbW1hbmRCYXIgIGZyb20gXCIuL2NvbXBvbmVudHMvY29tbWFuZC1iYXJcIlxuaW1wb3J0IFBob3RvICBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvXCJcbmltcG9ydCBNZXNzYWdlciAgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgZmlsZVNlbGVjdG9yICBmcm9tIFwiLi9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3JcIlxuaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQgU2V0dGluZyBmcm9tIFwiLi9zZXR0aW5nXCJcbmltcG9ydCBQcm9maWxlIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXG5pbXBvcnQgVGV4dEZpZWxkeCBmcm9tIFwiLi9jb21wb25lbnRzL3RleHQtZmllbGRcIlxuXG5cbmV4cG9ydCBjb25zdCBVST17XG4gICAgRW1wdHlcbiAgICAsTG9hZGluZ1xuICAgICxDb21tZW50XG4gICAgLENvbW1hbmRCYXJcbiAgICAsUGhvdG9cbiAgICAsTWVzc2FnZXJcblx0LGZpbGVTZWxlY3RvclxuXHQsQWNjb3VudFxuICAgICxTZXR0aW5nXG4gICAgLFByb2ZpbGVcbiAgICAsVGV4dEZpZWxkeFxufVxuZXhwb3J0IGNvbnN0IGNvbXBhY3Q9KG8sLi4ua2V5cyk9Pm8gPyBrZXlzLnJlZHVjZSgoYSxrKT0+KGFba109b1trXSxhKSx7fSkgOiB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoLi4ucmVkdWNlcnMpe1xuXHRjb25zdCBjb21iaW5lQXJyYXlSZWR1Y2VyPXJlZHVjZXJzPT4oc3RhdGUsYWN0aW9uKT0+cmVkdWNlcnMucmVkdWNlKChzdGF0ZSxuZXh0KT0+e1xuICAgICAgICByZXR1cm4gbmV4dChzdGF0ZSxhY3Rpb24pXG4gICAgfSwgc3RhdGUpXG5cblx0Y29uc3QgZnVuY3Rpb25zPXJlZHVjZXJzLnNsaWNlKDEpLnJlZHVjZSgoY29tYmluZWQsYSk9PntcbiAgICAgICAgY29uc3QgbGFzdFRydW5rPWNvbWJpbmVkW2NvbWJpbmVkLmxlbmd0aC0xXVxuICAgICAgICBjb25zdCB0eXBlPXR5cGVvZihsYXN0VHJ1bmtbMF0pXG4gICAgICAgIGlmKHR5cGUhPXR5cGVvZihhKSl7XG4gICAgICAgICAgICBjb21iaW5lZC5wdXNoKFthXSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsYXN0VHJ1bmsucHVzaChhKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21iaW5lZFxuICAgIH0sW1tyZWR1Y2Vyc1swXV1dKS5tYXAoYT0+e1xuICAgICAgICBpZih0eXBlb2YoYVswXSk9PSdvYmplY3QnKXtcblx0XHRcdC8vbWVyZ2Uge3VpOmF9LHt1aSxifSA9PT4ge3VpOiBbYSxiXX1cblx0XHRcdHJldHVybiBjb21iaW5lUmVkdWNlcnMoXG5cdFx0XHRcdGEucmVkdWNlKChjb21iaW5lZCxiKT0+e1xuXHRcdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdFx0Y29tYmluZWQsXG5cdFx0XHRcdFx0XHRiLFxuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXMoY29tYmluZWQpLnJlZHVjZSgod2l0aFNhbWVLZXlSZWR1Y2VycyxrZXkpPT57Ly9tZXJnZSB3aXRoIHNhbWUga2V5XG5cdFx0XHRcdFx0XHRcdGlmKGIuaGFzT3duUHJvcGVydHkoa2V5KSl7XG5cdFx0XHRcdFx0XHRcdFx0d2l0aFNhbWVLZXlSZWR1Y2Vyc1trZXldPWNvbWJpbmVBcnJheVJlZHVjZXIoW2NvbWJpbmVkW2tleV0sYltrZXldXSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gd2l0aFNhbWVLZXlSZWR1Y2Vyc1xuXHRcdFx0XHRcdFx0fSx7fSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdH0se30pXG5cdFx0XHQpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVBcnJheVJlZHVjZXIoYSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGNvbWJpbmVBcnJheVJlZHVjZXIoZnVuY3Rpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRU5USVRJRVMoZGF0YSl7XG5cdHJldHVybiB7dHlwZTonTk9STUFMSVpFRF9EQVRBJywgcGF5bG9hZDpkYXRhfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUkVNT1ZFX0VOVElUSUVTKHR5cGUsIC4uLmlkcyl7XG4gICAgcmV0dXJuIHt0eXBlOidOT1JNQUxJWkVEX0RBVEEnLCBwYXlsb2FkOntbdHlwZV06eyRyZW1vdmU6aWRzfX19XG59XG5cbjsoZnVuY3Rpb24oX3Jhdyl7XG4gICAgdmFyIHI9L14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KD86XFwuXFxkKik/KVokLyxkc1xuICAgIEpTT04ucGFyc2U9KGEscmV2aXZlcik9PntcbiAgICAgICAgcmV0dXJuIF9yYXcuY2FsbChKU09OLGEsKGssdik9PntcbiAgICAgICAgICAgIGlmKHR5cGVvZih2KT09J3N0cmluZycgJiYgdlt2Lmxlbmd0aC0xXT09J1onICYmIHZbMTBdPT0nVCcgJiYgKGRzPXIuZXhlYyh2KSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKCtkc1sxXSwgK2RzWzJdIC0gMSwgK2RzWzNdLCArZHNbNF0sICArZHNbNV0sICtkc1s2XSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJldml2ZXIgPyByZXZpdmVyKGssdikgOiB2XG4gICAgICAgIH0pXG4gICAgfVxufSkoSlNPTi5wYXJzZSk7XG5cblxuXG5PYmplY3QuYXNzaWduKERhdGUucHJvdG90eXBlLHtcblx0dG9EYXRlKCl7XG5cdFx0bGV0IGQ9bmV3IERhdGUodGhpcy5nZXRUaW1lKCkpXG5cdFx0ZC5zZXRIb3VycygwLDAsMCwwKVxuXHRcdHJldHVybiBkXG5cdH0sXG5cdGlzU2FtZURhdGUoZCl7XG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUoZCk9PTBcblx0fSxcblx0cmVsYXRpdmUoZCl7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoKHRoaXMudG9EYXRlKCkuZ2V0VGltZSgpLWQudG9EYXRlKCkuZ2V0VGltZSgpKS8oMjQqNjAqNjAqMTAwMCkpXG5cdH0sXG5cdHJlbGF0aXZlRGF0ZShkYXlzKXtcblx0XHRyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRUaW1lKCkrMjQqNjAqNjAqMTAwMCpkYXlzKVxuXHR9LFxuXHRpc0Z1dHVyZSgpe1xuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKG5ldyBEYXRlKCkpPjBcblx0fSxcblx0Zm9ybWF0KHRtcGw9XCJ5LU0tZFwiKXtcblx0XHRsZXQgdmFsdWU9e1xuXHRcdFx0eTp0aGlzLmdldEZ1bGxZZWFyKCksXG5cdFx0XHRNOnRoaXMuZ2V0TW9udGgoKSsxLFxuXHRcdFx0ZDp0aGlzLmdldERhdGUoKSxcblx0XHRcdGg6dGhpcy5nZXRIb3VycygpLFxuXHRcdFx0bTp0aGlzLmdldE1pbnV0ZXMoKSxcblx0XHRcdHM6dGhpcy5nZXRTZWNvbmRzKClcblx0XHR9XG5cdFx0cmV0dXJuIHRtcGwucmVwbGFjZSgvKFt5bWRoc10pKy9pZywgZnVuY3Rpb24obWF0Y2gsdHlwZSl7XG5cdFx0XHRyZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxuXHRcdH0pXG5cdH0sXG5cdHNtYXJ0Rm9ybWF0KHJlVG9kYXk9XCLku4rlpKkgSEg6bW1cIiwgcmVUaGlzWWVhcj1cIk1N5pyIRETml6VcIiwgcmVZZWFyc0Fnbz1cIllZWVnlubRNTeaciERE5pelXCIpe1xuXHRcdGxldCBub3c9bmV3IERhdGUoKVxuXHRcdHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLmlzU2FtZURhdGUobm93KSA/IHJlVG9kYXkgOlxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gcmVUaGlzWWVhciA6IHJlWWVhcnNBZ28pXG5cdH1cbn0pXG4iXX0=