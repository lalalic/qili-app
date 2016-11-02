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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
												return (0, _redux.combineReducers)(Object.assign.apply(Object, [{}].concat(_toConsumableArray(a))));
								} else {
												return function (state, action) {
																return a.reduce(function (state, next) {
																				return next(state, action);
																}, state);
												};
								}
				});
				return function (state, action) {
								return functions.reduce(function (state, next) {
												return next(state, action);
								}, state);
				};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJRaWxpQXBwIiwiZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMiLCJVSSIsIkVtcHR5IiwiTG9hZGluZyIsIkNvbW1lbnQiLCJDb21tYW5kQmFyIiwiUGhvdG8iLCJNZXNzYWdlciIsImZpbGVTZWxlY3RvciIsIkFjY291bnQiLCJyZWR1Y2VycyIsImZ1bmN0aW9ucyIsInNsaWNlIiwicmVkdWNlIiwiY29tYmluZWQiLCJhIiwibGFzdFRydW5rIiwibGVuZ3RoIiwidHlwZSIsInB1c2giLCJtYXAiLCJPYmplY3QiLCJhc3NpZ24iLCJzdGF0ZSIsImFjdGlvbiIsIm5leHQiLCJfcmF3IiwiciIsImRzIiwiSlNPTiIsInBhcnNlIiwicmV2aXZlciIsImNhbGwiLCJrIiwidiIsImV4ZWMiLCJEYXRlIiwiVVRDIiwicHJvdG90eXBlIiwidG9EYXRlIiwiZCIsImdldFRpbWUiLCJzZXRIb3VycyIsImlzU2FtZURhdGUiLCJyZWxhdGl2ZSIsIk1hdGgiLCJmbG9vciIsInJlbGF0aXZlRGF0ZSIsImRheXMiLCJpc0Z1dHVyZSIsImZvcm1hdCIsInRtcGwiLCJ2YWx1ZSIsInkiLCJnZXRGdWxsWWVhciIsIk0iLCJnZXRNb250aCIsImdldERhdGUiLCJoIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInMiLCJnZXRTZWNvbmRzIiwicmVwbGFjZSIsIm1hdGNoIiwidG9Mb3dlckNhc2UiLCJzbWFydEZvcm1hdCIsInJlVG9kYXkiLCJyZVRoaXNZZWFyIiwicmVZZWFyc0FnbyIsIm5vdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7bUJBRVFBLEk7Ozs7OzttQkFBS0MsSzs7Ozs7O21CQUFNQyxJOzs7Ozs7bUJBQUtDLEk7Ozs7OzttQkFBS0MsSTs7Ozs7O21CQUFLQyxHOzs7Ozs7Ozs7d0JBQzFCQyxPOzs7UUF3QlFDLHVCLEdBQUFBLHVC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S1RDLGVBQUUsS0FBS0MsVUFBTCxFQUxPO0FBTVRDLGVBQUUsS0FBS0MsVUFBTDtBQU5PLFNBQVY7QUFRQSxlQUFPWixLQUFLYSxPQUFMLENBQWEsY0FBYixFQUE2QixVQUFTQyxLQUFULEVBQWUvQyxJQUFmLEVBQW9CO0FBQ3ZELG1CQUFPa0MsTUFBTWxDLFFBQU0sR0FBTixHQUFZQSxLQUFLZ0QsV0FBTCxFQUFaLEdBQWlDaEQsSUFBdkMsS0FBZ0QsRUFBdkQ7QUFDQSxTQUZNLENBQVA7QUFHQSxLQTlCMkI7QUErQjVCaUQsZUEvQjRCLHlCQStCa0Q7QUFBQSxZQUFsRUMsT0FBa0UsdUVBQTFELFVBQTBEO0FBQUEsWUFBOUNDLFVBQThDLHVFQUFuQyxRQUFtQztBQUFBLFlBQXpCQyxVQUF5Qix1RUFBZCxhQUFjOztBQUM3RSxZQUFJQyxNQUFJLElBQUluQyxJQUFKLEVBQVI7QUFDQSxlQUFPLEtBQUtjLE1BQUwsQ0FBWSxLQUFLUCxVQUFMLENBQWdCNEIsR0FBaEIsSUFBdUJILE9BQXZCLEdBQ2QsS0FBS2QsV0FBTCxNQUFvQmlCLElBQUlqQixXQUFKLEVBQXBCLEdBQXdDZSxVQUF4QyxHQUFxREMsVUFEbkQsQ0FBUDtBQUVBO0FBbkMyQixDQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnXG5cbmV4cG9ydCB7aW5pdCxNb2RlbCxVc2VyLFJvbGUsRmlsZSxMb2d9IGZyb20gXCIuL2RiXCJcbmV4cG9ydCB7UWlsaUFwcH0gZnJvbSBcIi4vcWlsaUFwcFwiXG5cbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3VudFwiXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4vY29tcG9uZW50cy9lbXB0eVwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IENvbW1lbnQgZnJvbSBcIi4vY29tcG9uZW50cy9jb21tZW50XCJcbmltcG9ydCBDb21tYW5kQmFyICBmcm9tIFwiLi9jb21wb25lbnRzL2NvbW1hbmQtYmFyXCJcbmltcG9ydCBQaG90byAgZnJvbSBcIi4vY29tcG9uZW50cy9waG90b1wiXG5pbXBvcnQgTWVzc2FnZXIgIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IGZpbGVTZWxlY3RvciAgZnJvbSBcIi4vY29tcG9uZW50cy9maWxlLXNlbGVjdG9yXCJcbmltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tIFwicmVkdXhcIlxuXG5cbmV4cG9ydCBjb25zdCBVST17XG4gICAgRW1wdHlcbiAgICAsTG9hZGluZ1xuICAgICxDb21tZW50XG4gICAgLENvbW1hbmRCYXJcbiAgICAsUGhvdG9cbiAgICAsTWVzc2FnZXJcblx0LGZpbGVTZWxlY3RvclxuXHQsQWNjb3VudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoLi4ucmVkdWNlcnMpe1xuICAgIGNvbnN0IGZ1bmN0aW9ucz1yZWR1Y2Vycy5zbGljZSgxKS5yZWR1Y2UoKGNvbWJpbmVkLGEpPT57XG4gICAgICAgIGNvbnN0IGxhc3RUcnVuaz1jb21iaW5lZFtjb21iaW5lZC5sZW5ndGgtMV1cbiAgICAgICAgY29uc3QgdHlwZT10eXBlb2YobGFzdFRydW5rWzBdKVxuICAgICAgICBpZih0eXBlIT10eXBlb2YoYSkpe1xuICAgICAgICAgICAgY29tYmluZWQucHVzaChbYV0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGFzdFRydW5rLnB1c2goYSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZWRcbiAgICB9LFtbcmVkdWNlcnNbMF1dXSkubWFwKGE9PntcbiAgICAgICAgaWYodHlwZW9mKGFbMF0pPT0nb2JqZWN0Jyl7XG4gICAgICAgICAgICByZXR1cm4gY29tYmluZVJlZHVjZXJzKE9iamVjdC5hc3NpZ24oe30sLi4uYSkpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIChzdGF0ZSxhY3Rpb24pPT5hLnJlZHVjZSgoc3RhdGUsbmV4dCk9Pm5leHQoc3RhdGUsYWN0aW9uKSwgc3RhdGUpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiAoc3RhdGUsYWN0aW9uKT0+ZnVuY3Rpb25zLnJlZHVjZSgoc3RhdGUsbmV4dCk9Pm5leHQoc3RhdGUsYWN0aW9uKSxzdGF0ZSlcbn1cblxuOyhmdW5jdGlvbihfcmF3KXtcbiAgICB2YXIgcj0vXihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pVChcXGR7Mn0pOihcXGR7Mn0pOihcXGR7Mn0oPzpcXC5cXGQqKT8pWiQvLGRzXG4gICAgSlNPTi5wYXJzZT0oYSxyZXZpdmVyKT0+e1xuICAgICAgICByZXR1cm4gX3Jhdy5jYWxsKEpTT04sYSwoayx2KT0+e1xuICAgICAgICAgICAgaWYodHlwZW9mKHYpPT0nc3RyaW5nJyAmJiB2W3YubGVuZ3RoLTFdPT0nWicgJiYgdlsxMF09PSdUJyAmJiAoZHM9ci5leGVjKHYpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoK2RzWzFdLCArZHNbMl0gLSAxLCArZHNbM10sICtkc1s0XSwgICtkc1s1XSwgK2RzWzZdKSk7XG4gICAgICAgICAgICByZXR1cm4gcmV2aXZlciA/IHJldml2ZXIoayx2KSA6IHZcbiAgICAgICAgfSlcbiAgICB9XG59KShKU09OLnBhcnNlKTtcblxuXG5cbk9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUse1xuXHR0b0RhdGUoKXtcblx0XHRsZXQgZD1uZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSlcblx0XHRkLnNldEhvdXJzKDAsMCwwLDApXG5cdFx0cmV0dXJuIGRcblx0fSxcblx0aXNTYW1lRGF0ZShkKXtcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShkKT09MFxuXHR9LFxuXHRyZWxhdGl2ZShkKXtcblx0XHRyZXR1cm4gTWF0aC5mbG9vcigodGhpcy50b0RhdGUoKS5nZXRUaW1lKCktZC50b0RhdGUoKS5nZXRUaW1lKCkpLygyNCo2MCo2MCoxMDAwKSlcblx0fSxcblx0cmVsYXRpdmVEYXRlKGRheXMpe1xuXHRcdHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSsyNCo2MCo2MCoxMDAwKmRheXMpXG5cdH0sXG5cdGlzRnV0dXJlKCl7XG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUobmV3IERhdGUoKSk+MFxuXHR9LFxuXHRmb3JtYXQodG1wbD1cInktTS1kXCIpe1xuXHRcdGxldCB2YWx1ZT17XG5cdFx0XHR5OnRoaXMuZ2V0RnVsbFllYXIoKSxcblx0XHRcdE06dGhpcy5nZXRNb250aCgpKzEsXG5cdFx0XHRkOnRoaXMuZ2V0RGF0ZSgpLFxuXHRcdFx0aDp0aGlzLmdldEhvdXJzKCksXG5cdFx0XHRtOnRoaXMuZ2V0TWludXRlcygpLFxuXHRcdFx0czp0aGlzLmdldFNlY29uZHMoKVxuXHRcdH1cblx0XHRyZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcblx0XHRcdHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXG5cdFx0fSlcblx0fSxcblx0c21hcnRGb3JtYXQocmVUb2RheT1cIuS7iuWkqSBISDptbVwiLCByZVRoaXNZZWFyPVwiTU3mnIhEROaXpVwiLCByZVllYXJzQWdvPVwiWVlZWeW5tE1N5pyIRETml6VcIil7XG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXG5cdFx0cmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMuaXNTYW1lRGF0ZShub3cpID8gcmVUb2RheSA6XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyByZVRoaXNZZWFyIDogcmVZZWFyc0Fnbylcblx0fVxufSlcbiJdfQ==