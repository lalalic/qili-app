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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiTW9kZWwiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJRaWxpQXBwIiwiVUkiLCJFbXB0eSIsIkxvYWRpbmciLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIlBob3RvIiwiTWVzc2FnZXIiLCJmaWxlU2VsZWN0b3IiLCJBY2NvdW50IiwiX3JhdyIsInIiLCJkcyIsIkpTT04iLCJwYXJzZSIsImEiLCJyZXZpdmVyIiwiY2FsbCIsImsiLCJ2IiwibGVuZ3RoIiwiZXhlYyIsIkRhdGUiLCJVVEMiLCJPYmplY3QiLCJhc3NpZ24iLCJwcm90b3R5cGUiLCJ0b0RhdGUiLCJkIiwiZ2V0VGltZSIsInNldEhvdXJzIiwiaXNTYW1lRGF0ZSIsInJlbGF0aXZlIiwiTWF0aCIsImZsb29yIiwicmVsYXRpdmVEYXRlIiwiZGF5cyIsImlzRnV0dXJlIiwiZm9ybWF0IiwidG1wbCIsInZhbHVlIiwieSIsImdldEZ1bGxZZWFyIiwiTSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImgiLCJnZXRIb3VycyIsIm0iLCJnZXRNaW51dGVzIiwicyIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2giLCJ0eXBlIiwidG9Mb3dlckNhc2UiLCJzbWFydEZvcm1hdCIsInJlVG9kYXkiLCJyZVRoaXNZZWFyIiwicmVZZWFyc0FnbyIsIm5vdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O2FBRVFBLEk7Ozs7OzthQUFLQyxLOzs7Ozs7YUFBTUMsSTs7Ozs7O2FBQUtDLEk7Ozs7OzthQUFLQyxJOzs7Ozs7YUFBS0MsRzs7Ozs7Ozs7O2tCQUMxQkMsTzs7OztBQUhSOztBQUtBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLElBQU1DLGtCQUFHO0FBQ1pDLHVCQURZO0FBRVhDLDJCQUZXO0FBR1hDLDJCQUhXO0FBSVhDLGlDQUpXO0FBS1hDLHVCQUxXO0FB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QUdBLEVBOUIyQjtBQStCNUJFLFlBL0I0Qix5QkErQmtEO0FBQUEsTUFBbEVDLE9BQWtFLHVFQUExRCxVQUEwRDtBQUFBLE1BQTlDQyxVQUE4Qyx1RUFBbkMsUUFBbUM7QUFBQSxNQUF6QkMsVUFBeUIsdUVBQWQsYUFBYzs7QUFDN0UsTUFBSUMsTUFBSSxJQUFJdEMsSUFBSixFQUFSO0FBQ0EsU0FBTyxLQUFLZ0IsTUFBTCxDQUFZLEtBQUtQLFVBQUwsQ0FBZ0I2QixHQUFoQixJQUF1QkgsT0FBdkIsR0FDZCxLQUFLZixXQUFMLE1BQW9Ca0IsSUFBSWxCLFdBQUosRUFBcEIsR0FBd0NnQixVQUF4QyxHQUFxREMsVUFEbkQsQ0FBUDtBQUVBO0FBbkMyQixDQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnXG5cbmV4cG9ydCB7aW5pdCxNb2RlbCxVc2VyLFJvbGUsRmlsZSxMb2d9IGZyb20gXCIuL2RiXCJcbmV4cG9ydCB7UWlsaUFwcH0gZnJvbSBcIi4vcWlsaUFwcFwiXG5cbmltcG9ydCBBY2NvdW50IGZyb20gXCIuL2NvbXBvbmVudHMvYWNjb3VudFwiXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4vY29tcG9uZW50cy9lbXB0eVwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IENvbW1lbnQgZnJvbSBcIi4vY29tcG9uZW50cy9jb21tZW50XCJcbmltcG9ydCBDb21tYW5kQmFyICBmcm9tIFwiLi9jb21wb25lbnRzL2NvbW1hbmQtYmFyXCJcbmltcG9ydCBQaG90byAgZnJvbSBcIi4vY29tcG9uZW50cy9waG90b1wiXG5pbXBvcnQgTWVzc2FnZXIgIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IGZpbGVTZWxlY3RvciAgZnJvbSBcIi4vY29tcG9uZW50cy9maWxlLXNlbGVjdG9yXCJcblxuZXhwb3J0IGNvbnN0IFVJPXtcbiAgICBFbXB0eVxuICAgICxMb2FkaW5nXG4gICAgLENvbW1lbnRcbiAgICAsQ29tbWFuZEJhclxuICAgICxQaG90b1xuICAgICxNZXNzYWdlclxuXHQsZmlsZVNlbGVjdG9yXG5cdCxBY2NvdW50XG59XG5cbjsoZnVuY3Rpb24oX3Jhdyl7XG4gICAgdmFyIHI9L14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KD86XFwuXFxkKik/KVokLyxkc1xuICAgIEpTT04ucGFyc2U9KGEscmV2aXZlcik9PntcbiAgICAgICAgcmV0dXJuIF9yYXcuY2FsbChKU09OLGEsKGssdik9PntcbiAgICAgICAgICAgIGlmKHR5cGVvZih2KT09J3N0cmluZycgJiYgdlt2Lmxlbmd0aC0xXT09J1onICYmIHZbMTBdPT0nVCcgJiYgKGRzPXIuZXhlYyh2KSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKCtkc1sxXSwgK2RzWzJdIC0gMSwgK2RzWzNdLCArZHNbNF0sICArZHNbNV0sICtkc1s2XSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJldml2ZXIgPyByZXZpdmVyKGssdikgOiB2XG4gICAgICAgIH0pXG4gICAgfVxufSkoSlNPTi5wYXJzZSk7XG5cbk9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUse1xuXHR0b0RhdGUoKXtcblx0XHRsZXQgZD1uZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSlcblx0XHRkLnNldEhvdXJzKDAsMCwwLDApXG5cdFx0cmV0dXJuIGRcblx0fSxcblx0aXNTYW1lRGF0ZShkKXtcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShkKT09MFxuXHR9LFxuXHRyZWxhdGl2ZShkKXtcblx0XHRyZXR1cm4gTWF0aC5mbG9vcigodGhpcy50b0RhdGUoKS5nZXRUaW1lKCktZC50b0RhdGUoKS5nZXRUaW1lKCkpLygyNCo2MCo2MCoxMDAwKSlcblx0fSxcblx0cmVsYXRpdmVEYXRlKGRheXMpe1xuXHRcdHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSsyNCo2MCo2MCoxMDAwKmRheXMpXG5cdH0sXG5cdGlzRnV0dXJlKCl7XG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUobmV3IERhdGUoKSk+MFxuXHR9LFxuXHRmb3JtYXQodG1wbD1cInktTS1kXCIpe1xuXHRcdGxldCB2YWx1ZT17XG5cdFx0XHR5OnRoaXMuZ2V0RnVsbFllYXIoKSxcblx0XHRcdE06dGhpcy5nZXRNb250aCgpKzEsXG5cdFx0XHRkOnRoaXMuZ2V0RGF0ZSgpLFxuXHRcdFx0aDp0aGlzLmdldEhvdXJzKCksXG5cdFx0XHRtOnRoaXMuZ2V0TWludXRlcygpLFxuXHRcdFx0czp0aGlzLmdldFNlY29uZHMoKVxuXHRcdH1cblx0XHRyZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcblx0XHRcdHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXG5cdFx0fSlcblx0fSxcblx0c21hcnRGb3JtYXQocmVUb2RheT1cIuS7iuWkqSBISDptbVwiLCByZVRoaXNZZWFyPVwiTU3mnIhEROaXpVwiLCByZVllYXJzQWdvPVwiWVlZWeW5tE1N5pyIRETml6VcIil7XG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXG5cdFx0cmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMuaXNTYW1lRGF0ZShub3cpID8gcmVUb2RheSA6XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyByZVRoaXNZZWFyIDogcmVZZWFyc0Fnbylcblx0fVxufSlcbiJdfQ==