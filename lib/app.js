"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.App = exports.REDUCER = exports.ACTION = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

var _fileUpload = require("material-ui/svg-icons/file/file-upload");

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _fileDownload = require("material-ui/svg-icons/file/file-download");

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _save = require("material-ui/svg-icons/content/save");

var _save2 = _interopRequireDefault(_save);

var _delete = require("material-ui/svg-icons/action/delete");

var _delete2 = _interopRequireDefault(_delete);

var _ = require(".");

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ENTER = 13;
var DOMAIN = "ui.app";
var ACTION = exports.ACTION = {
	CREATE: function CREATE(name, uname) {
		var nameError = void 0,
		    unameError = void 0;
		if (!name) nameError = "name is required";
		if (nameError) {
			return function (dispatch) {
				dispatch({ domain: DOMAIN, type: "error", nameError: nameError });
				return Promise.reject();
			};
		}

		return function (dispatch) {
			return _app2.default.upsert({ name: name, uname: uname }).then(function (app) {
				dispatch({ domain: DOMAIN, type: "created" });
				return _app2.default.current = app;
			});
		};
	},
	CHANGE: function CHANGE(key, value) {
		var app = _app2.default.current;
		app[key] = value;
		return function (dispatch) {
			return _app2.default.upsert(app).then(function (app) {
				dispatch({ domain: DOMAIN, type: "updated" });
				return _app2.default.current = app;
			});
		};
	},
	REMOVE: function REMOVE(id) {
		return function (dispatch) {
			return _app2.default.remove(id).then(function (a) {
				return dispatch({ domain: DOMAIN, type: "removed" });
			});
		};
	},

	UPLOAD: function UPLOAD(a) {
		return function (displatch) {
			return _.UI.selectFile('raw').then(function (app) {
				return _app2.default.upload(app);
			}).then(function (app) {
				dispatch({ domain: DOMAIN, type: "uploaded" });
				return _app2.default.current = app;
			});
		};
	}
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var domain = _ref.domain;
	var type = _ref.type;
	var nameError = _ref.nameError;
	var unameError = _ref.unameError;

	if (domain == DOMAIN) {
		switch (type) {
			case 'error':
				return { nameError: nameError, unameError: unameError };
			case 'uploaded':
			case 'removed':
			case 'created':
			case 'updated':
				return {};
		}
	}
	return state;
});

var App = exports.App = (0, _reactRedux.connect)(function (state) {
	return _extends({ app: _app2.default.current }, state[DOMAIN]);
})(function (_ref2) {
	var app = _ref2.app;
	var router = _ref2.router;
	var dispatch = _ref2.dispatch;
	var nameError = _ref2.nameError;
	var unameError = _ref2.unameError;

	var removable = _app2.default.isRemovable(app);
	var commandBar = void 0;
	if (removable) commandBar = _react2.default.createElement(_.UI.CommandBar, { className: "footbar", primary: "Upload",
		items: [{ action: "Back" }, { action: "Upload",
			icon: _fileUpload2.default,
			onSelect: function onSelect(e) {
				return dispatch(ACTION.UPLOAD());
			}
		}, { action: "Remove",
			icon: _delete2.default,
			onSelect: function onSelect(e) {
				var name = prompt("Please make sure you know what you are doing by giving this app name");
				if (name == app.name) {
					dispatch(ACTION.REMOVE(app._id)).then(function (a) {
						return router.replace("/");
					});
				} else alert("name is not correct");
			}
		}]
	});else commandBar = _react2.default.createElement(_.UI.CommandBar, { className: "footbar", items: [{ action: "Back" }] });

	var changeName = function changeName(value) {
		return value != app.name && dispatch(ACTION.CHANGE("name", value)).then(function (_ref3) {
			var name = _ref3.name;
			return router.replace("app/" + name);
		});
	};
	var changeUName = function changeUName(value) {
		return value != app.uname && dispatch(ACTION.CHANGE("uname", value));
	};
	var refName = void 0,
	    refUname = void 0;
	return _react2.default.createElement(
		"div",
		{ className: "form" },
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return refName;
			},
			floatingLabelText: "application name",
			fullWidth: true,
			disabled: !removable,
			value: app.name,
			errorText: nameError,
			onChange: function onChange(_ref4) {
				var value = _ref4.target.value;
				return refName.value = value;
			},
			onKeyDown: function onKeyDown(e) {
				return e.keyCode == ENTER && changeName(e.target.value.trim());
			},
			onBlur: function onBlur(_ref5) {
				var value = _ref5.target.value;
				return changeName(value.trim());
			} }),
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return refUname;
			},
			floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
			fullWidth: true,
			disabled: !removable,
			value: app.uname,
			errorText: unameError,
			onChange: function onChange(_ref6) {
				var value = _ref6.target.value;
				return refUname.value = value;
			},
			onKeyDown: function onKeyDown(e) {
				return e.keyCode == ENTER && changeUName(e.target.value.trim());
			},
			onBlur: function onBlur(_ref7) {
				var value = _ref7.target.value;
				return changeUName(value.trim());
			} }),
		_react2.default.createElement(_materialUi.TextField, {
			floatingLabelText: "API key: value of http header 'x-application-id'",
			disabled: true,
			fullWidth: true,
			value: app.apiKey }),
		_react2.default.createElement(_materialUi.TextField, {
			floatingLabelText: "wechat url: use it to accept message from wechat",
			disabled: true,
			fullWidth: true,
			value: app.apiKey ? "http://qili2.com/1/" + app.apiKey + "/wechat" : "" }),
		commandBar
	);
});

var Creator = exports.Creator = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
})(function (_ref8) {
	var router = _ref8.router;
	var dispatch = _ref8.dispatch;
	var nameError = _ref8.nameError;

	var refName = void 0,
	    refUname = void 0;
	return _react2.default.createElement(
		"div",
		{ className: "form" },
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return refName = a;
			},
			floatingLabelText: "application name",
			errorText: nameError,
			fullWidth: true }),
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return refUname = a;
			},
			floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
			fullWidth: true }),
		_react2.default.createElement(_.UI.CommandBar, { className: "footbar",
			items: [{ action: "Back" }, { action: "Save", label: "保存", icon: _save2.default,
				onSelect: function onSelect(a) {
					return dispatch(ACTION.CREATE(refName.getValue(), refUname.getValue())).then(function (_ref9) {
						var name = _ref9.name;
						return router.replace({ pathname: "app/" + name });
					});
				}
			}]
		})
	);
});

exports.default = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJET01BSU4iLCJBQ1RJT04iLCJDUkVBVEUiLCJuYW1lIiwidW5hbWUiLCJuYW1lRXJyb3IiLCJ1bmFtZUVycm9yIiwiZGlzcGF0Y2giLCJkb21haW4iLCJ0eXBlIiwiUHJvbWlzZSIsInJlamVjdCIsInVwc2VydCIsInRoZW4iLCJjdXJyZW50IiwiYXBwIiwiQ0hBTkdFIiwia2V5IiwidmFsdWUiLCJSRU1PVkUiLCJyZW1vdmUiLCJpZCIsIlVQTE9BRCIsInNlbGVjdEZpbGUiLCJ1cGxvYWQiLCJSRURVQ0VSIiwic3RhdGUiLCJBcHAiLCJyb3V0ZXIiLCJyZW1vdmFibGUiLCJpc1JlbW92YWJsZSIsImNvbW1hbmRCYXIiLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJwcm9tcHQiLCJfaWQiLCJyZXBsYWNlIiwiYWxlcnQiLCJjaGFuZ2VOYW1lIiwiY2hhbmdlVU5hbWUiLCJyZWZOYW1lIiwicmVmVW5hbWUiLCJ0YXJnZXQiLCJlIiwia2V5Q29kZSIsInRyaW0iLCJhcGlLZXkiLCJDcmVhdG9yIiwiYSIsImxhYmVsIiwiZ2V0VmFsdWUiLCJwYXRobmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLFFBQU0sRUFBWjtBQUNBLElBQU1DLFNBQU8sUUFBYjtBQUNPLElBQU1DLDBCQUFPO0FBQ25CQyxTQUFRLGdCQUFDQyxJQUFELEVBQU9DLEtBQVAsRUFBZTtBQUN0QixNQUFJQyxrQkFBSjtBQUFBLE1BQWVDLG1CQUFmO0FBQ0EsTUFBRyxDQUFDSCxJQUFKLEVBQ0NFLFlBQVUsa0JBQVY7QUFDRCxNQUFHQSxTQUFILEVBQWE7QUFDWixVQUFPLG9CQUFVO0FBQ2hCRSxhQUFTLEVBQUNDLFFBQU9SLE1BQVIsRUFBZ0JTLE1BQUssT0FBckIsRUFBOEJKLG9C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RUFBZCxFQUFpQ1QsU0FBU1MsUUFBVCxFQUFqQyxDQUFULEVBQ1h0QyxJQURXLENBQ047QUFBQSxVQUFFVixJQUFGLFNBQUVBLElBQUY7QUFBQSxhQUFVeUIsT0FBT1MsT0FBUCxDQUFlLEVBQUNlLG1CQUFnQmpELElBQWpCLEVBQWYsQ0FBVjtBQUFBLE1BRE0sQ0FBSDtBQUFBO0FBRFYsSUFGSztBQURSO0FBVkQsRUFERDtBQXNCQSxDQXpCb0IsQ0FBZDs7a0JBMkJRd0IsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IERvd25sb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLWRvd25sb2FkXCJcbmltcG9ydCBTYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBSZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCJcblxuaW1wb3J0IHtVSX0gZnJvbSBcIi5cIlxuXG5pbXBvcnQgZGJBcHBsaWNhdGlvbiBmcm9tIFwiLi9kYi9hcHBcIlxuXG5jb25zdCBFTlRFUj0xM1xuY29uc3QgRE9NQUlOPVwidWkuYXBwXCJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRDUkVBVEU6IChuYW1lLCB1bmFtZSk9Pntcblx0XHRsZXQgbmFtZUVycm9yLCB1bmFtZUVycm9yXG5cdFx0aWYoIW5hbWUpXG5cdFx0XHRuYW1lRXJyb3I9XCJuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZihuYW1lRXJyb3Ipe1xuXHRcdFx0cmV0dXJuIGRpc3BhdGNoPT57XG5cdFx0XHRcdGRpc3BhdGNoKHtkb21haW46RE9NQUlOLCB0eXBlOlwiZXJyb3JcIiwgbmFtZUVycm9yfSlcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZGlzcGF0Y2g9PmRiQXBwbGljYXRpb24udXBzZXJ0KHtuYW1lLHVuYW1lfSlcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7ZG9tYWluOkRPTUFJTix0eXBlOlwiY3JlYXRlZFwifSlcblx0XHRcdFx0cmV0dXJuIGRiQXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRcdH0pXG5cdH1cblx0LENIQU5HRTogKGtleSx2YWx1ZSk9Pntcblx0XHRjb25zdCBhcHA9ZGJBcHBsaWNhdGlvbi5jdXJyZW50XG5cdFx0YXBwW2tleV09dmFsdWVcblx0XHRyZXR1cm4gZGlzcGF0Y2g9PmRiQXBwbGljYXRpb24udXBzZXJ0KGFwcClcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7ZG9tYWluOkRPTUFJTiwgdHlwZTpcInVwZGF0ZWRcIn0pXG5cdFx0XHRcdHJldHVybiBkYkFwcGxpY2F0aW9uLmN1cnJlbnQ9YXBwXG5cdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGlkPT5kaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi5yZW1vdmUoaWQpLnRoZW4oYT0+ZGlzcGF0Y2goe2RvbWFpbjpET01BSU4sIHR5cGU6XCJyZW1vdmVkXCJ9KSlcblxuXHQsVVBMT0FEOiBhPT5kaXNwbGF0Y2g9PlVJLnNlbGVjdEZpbGUoJ3JhdycpXG5cdFx0XHQudGhlbihhcHA9PmRiQXBwbGljYXRpb24udXBsb2FkKGFwcCkpXG5cdFx0XHQudGhlbihhcHA9Pntcblx0XHRcdFx0ZGlzcGF0Y2goe2RvbWFpbjpET01BSU4sIHR5cGU6XCJ1cGxvYWRlZFwifSlcblx0XHRcdFx0cmV0dXJuIGRiQXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRcdH0pXG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcblx0W0RPTUFJTl06IChzdGF0ZT17fSx7ZG9tYWluLCB0eXBlLCBuYW1lRXJyb3IsIHVuYW1lRXJyb3J9KT0+e1xuXHRcdGlmKGRvbWFpbj09RE9NQUlOKXtcblx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdGNhc2UgJ2Vycm9yJzpcblx0XHRcdFx0cmV0dXJuIHtuYW1lRXJyb3IsIHVuYW1lRXJyb3J9XG5cdFx0XHRjYXNlICd1cGxvYWRlZCc6XG5cdFx0XHRjYXNlICdyZW1vdmVkJzpcblx0XHRcdGNhc2UgJ2NyZWF0ZWQnOlxuXHRcdFx0Y2FzZSAndXBkYXRlZCc6XG5cdFx0XHRcdHJldHVybiB7fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RhdGVcblx0fVxufVxuXG5leHBvcnQgY29uc3QgQXBwPWNvbm5lY3Qoc3RhdGU9Pih7YXBwOmRiQXBwbGljYXRpb24uY3VycmVudCwgLi4uc3RhdGVbRE9NQUlOXX0pKShcbih7YXBwLCByb3V0ZXIsZGlzcGF0Y2gsIG5hbWVFcnJvciwgdW5hbWVFcnJvcn0pPT57XG5cdGxldCByZW1vdmFibGU9ZGJBcHBsaWNhdGlvbi5pc1JlbW92YWJsZShhcHApXG5cdGxldCBjb21tYW5kQmFyXG5cdGlmKHJlbW92YWJsZSlcblx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgcHJpbWFyeT1cIlVwbG9hZFwiXG5cdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cblx0XHRcdFx0XHQse2FjdGlvbjpcIlVwbG9hZFwiXG5cdFx0XHRcdFx0XHQsaWNvbjpVcGxvYWRcblx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEKCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCx7YWN0aW9uOlwiUmVtb3ZlXCJcblx0XHRcdFx0XHRcdCxpY29uOlJlbW92ZVxuXHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9Pntcblx0XHRcdFx0XHRcdFx0bGV0IG5hbWU9cHJvbXB0KFwiUGxlYXNlIG1ha2Ugc3VyZSB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcgYnkgZ2l2aW5nIHRoaXMgYXBwIG5hbWVcIilcblx0XHRcdFx0XHRcdFx0aWYobmFtZT09YXBwLm5hbWUpe1xuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5SRU1PVkUoYXBwLl9pZCkpXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbihhPT5yb3V0ZXIucmVwbGFjZShcIi9cIikpXG5cdFx0XHRcdFx0XHRcdH1lbHNlXG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoXCJuYW1lIGlzIG5vdCBjb3JyZWN0XCIpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfVxuXHRcdFx0Lz4pXG5cdGVsc2Vcblx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifV19Lz4pXG5cblx0Y29uc3QgY2hhbmdlTmFtZT12YWx1ZT0+dmFsdWUhPWFwcC5uYW1lICYmIGRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJuYW1lXCIsdmFsdWUpKS50aGVuKCh7bmFtZX0pPT5yb3V0ZXIucmVwbGFjZShgYXBwLyR7bmFtZX1gKSlcblx0Y29uc3QgY2hhbmdlVU5hbWU9dmFsdWU9PnZhbHVlIT1hcHAudW5hbWUgJiYgZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcInVuYW1lXCIsdmFsdWUpKVxuXHRsZXQgcmVmTmFtZSwgcmVmVW5hbWVcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZOYW1lfVxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLm5hbWV9XG5cdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZOYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09RU5URVIgJiYgY2hhbmdlTmFtZShlLnRhcmdldC52YWx1ZS50cmltKCkpfVxuXHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+Y2hhbmdlTmFtZSh2YWx1ZS50cmltKCkpfS8+XG5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVbmFtZX1cblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJnbG9iYWwgdW5pcXVlIHByb2R1Y3QgbmFtZTogYXBwLnFpbGkyLmNvbS97cHJvdWN0TmFtZX1cIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLnVuYW1lfVxuXHRcdFx0XHRlcnJvclRleHQ9e3VuYW1lRXJyb3J9XG5cdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZlVuYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09RU5URVIgJiYgY2hhbmdlVU5hbWUoZS50YXJnZXQudmFsdWUudHJpbSgpKX1cblx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZVVOYW1lKHZhbHVlLnRyaW0oKSl9Lz5cblxuXHRcdFx0PFRleHRGaWVsZFxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIkFQSSBrZXk6IHZhbHVlIG9mIGh0dHAgaGVhZGVyICd4LWFwcGxpY2F0aW9uLWlkJ1wiXG5cdFx0XHRcdGRpc2FibGVkPXt0cnVlfVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdHZhbHVlPXthcHAuYXBpS2V5fS8+XG5cblx0XHRcdDxUZXh0RmllbGRcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuXHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLmFwaUtleSA/IGBodHRwOi8vcWlsaTIuY29tLzEvJHthcHAuYXBpS2V5fS93ZWNoYXRgIDogXCJcIn0vPlxuXG5cdFx0XHR7Y29tbWFuZEJhcn1cblx0XHQ8L2Rpdj5cblx0KVxufSlcblxuZXhwb3J0IGNvbnN0IENyZWF0b3I9Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSkoXG4oe3JvdXRlcixkaXNwYXRjaCwgbmFtZUVycm9yfSk9Pntcblx0bGV0IHJlZk5hbWUscmVmVW5hbWVcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZOYW1lPWF9XG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG5cdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlVuYW1lPWF9XG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cdFx0XHRcdFx0LHthY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIGljb246U2F2ZVxuXHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUocmVmTmFtZS5nZXRWYWx1ZSgpLHJlZlVuYW1lLmdldFZhbHVlKCkpKVxuXHRcdFx0XHRcdFx0XHQudGhlbigoe25hbWV9KT0+cm91dGVyLnJlcGxhY2Uoe3BhdGhuYW1lOmBhcHAvJHtuYW1lfWB9KSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF19XG5cdFx0XHRcdC8+XG5cdFx0PC9kaXY+XG5cdClcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFwcFxuIl19