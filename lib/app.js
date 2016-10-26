"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.REDUCER = exports.Creator = undefined;

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

var ENTER = 13;

var App = function App(_ref) {
	var app = _ref.app,
	    router = _ref.router,
	    dispatch = _ref.dispatch,
	    nameError = _ref.nameError,
	    unameError = _ref.unameError;

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
		return value != app.name && dispatch(ACTION.CHANGE("name", value)).then(function (_ref2) {
			var name = _ref2.name;
			return router.replace("app/" + name);
		});
	};
	var changeUName = function changeUName(value) {
		return value != app.uname && dispatch(ACTION.CHANGE("uname", value));
	};
	return _react2.default.createElement(
		"div",
		{ className: "form" },
		_react2.default.createElement(_materialUi.TextField, {
			floatingLabelText: "application name",
			fullWidth: true,
			disabled: !removable,
			defaultValue: app.name,
			errorText: nameError,
			onKeyDown: function onKeyDown(e) {
				return e.keyCode == ENTER && changeName(e.target.value.trim());
			},
			onBlur: function onBlur(_ref3) {
				var value = _ref3.target.value;
				return changeName(value.trim());
			} }),
		_react2.default.createElement(_materialUi.TextField, {
			floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
			fullWidth: true,
			disabled: !removable,
			defaultValue: app.uname,
			errorText: unameError,
			onKeyDown: function onKeyDown(e) {
				return e.keyCode == ENTER && changeUName(e.target.value.trim());
			},
			onBlur: function onBlur(_ref4) {
				var value = _ref4.target.value;
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
};

exports.default = (0, _reactRedux.connect)(function (state) {
	return _extends({ app: state.qiliConsole.app }, state.appUI);
})(App);
var Creator = exports.Creator = (0, _reactRedux.connect)(function (state) {
	return state.appUI;
})(function (_ref5) {
	var router = _ref5.router,
	    dispatch = _ref5.dispatch,
	    nameError = _ref5.nameError;

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
		_react2.default.createElement(_materialUi.TextField, {
			floatingLabelText: "API key: value of http header 'x-application-id'",
			disabled: true,
			fullWidth: true }),
		_react2.default.createElement(_materialUi.TextField, {
			floatingLabelText: "wechat url: use it to accept message from wechat",
			disabled: true,
			fullWidth: true }),
		_react2.default.createElement(_.UI.CommandBar, { className: "footbar",
			items: [{ action: "Back" }, { action: "Save", label: "保存", icon: _save2.default,
				onSelect: function onSelect(a) {
					return dispatch(ACTION.CREATE(refName.getValue(), refUname.getValue())).then(function (_ref6) {
						var name = _ref6.name;
						return router.replace({ pathname: "app/" + name });
					});
				}
			}]
		})
	);
});

var ACTION = {
	CREATE: function CREATE(name, uname) {
		var nameError = void 0,
		    unameError = void 0;
		if (!name) nameError = "name is required";
		if (nameError || unameError) return function (dispatch) {
			dispatch({ type: "error", nameError: nameError, unameError: unameError });
			return Promise.reject();
		};

		return function (dispatch) {
			return _app2.default.upsert({ name: name, uname: uname }).then(function (app) {
				return _app2.default.current = app;
			});
		};
	},
	CHANGE: function CHANGE(key, value) {
		var app = _app2.default.current;
		app[key] = value;
		return function (dispatch) {
			return _app2.default.upsert(app).then(function (app) {
				return _app2.default.current = app;
			});
		};
	},
	REMOVE: function REMOVE(id) {
		return function (dispatch) {
			return _app2.default.remove(id);
		};
	},

	UPLOAD: function UPLOAD(a) {
		return function (displatch) {
			return _.UI.selectFile('raw').then(function (app) {
				return _app2.default.upload(app);
			}).then(function (app) {
				return _app2.default.current = app;
			});
		};
	}
};

var REDUCER = exports.REDUCER = {
	appUI: function appUI() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var _ref7 = arguments[1];
		var type = _ref7.type,
		    nameError = _ref7.nameError,
		    unameError = _ref7.unameError;

		switch (type) {
			case 'error':
				return { nameError: nameError, unameError: unameError };
			default:
				return state;
		}
	}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJBcHAiLCJhcHAiLCJyb3V0ZXIiLCJkaXNwYXRjaCIsIm5hbWVFcnJvciIsInVuYW1lRXJyb3IiLCJyZW1vdmFibGUiLCJpc1JlbW92YWJsZSIsImNvbW1hbmRCYXIiLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJBQ1RJT04iLCJVUExPQUQiLCJuYW1lIiwicHJvbXB0IiwiUkVNT1ZFIiwiX2lkIiwidGhlbiIsInJlcGxhY2UiLCJhbGVydCIsImNoYW5nZU5hbWUiLCJ2YWx1ZSIsIkNIQU5HRSIsImNoYW5nZVVOYW1lIiwidW5hbWUiLCJlIiwia2V5Q29kZSIsInRhcmdldCIsInRyaW0iLCJhcGlLZXkiLCJzdGF0ZSIsInFpbGlDb25zb2xlIiwiYXBwVUkiLCJDcmVhdG9yIiwicmVmTmFtZSIsInJlZlVuYW1lIiwiYSIsImxhYmVsIiwiQ1JFQVRFIiwiZ2V0VmFsdWUiLCJwYXRobmFtZSIsInR5cGUiLCJQcm9taXNlIiwicmVqZWN0IiwidXBzZXJ0IiwiY3VycmVudCIsImtleSIsInJlbW92ZSIsImlkIiwic2VsZWN0RmlsZSIsInVwbG9hZCIsIlJFRFVDRVIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsUUFBTSxFQUFaOztBQUVBLElBQU1DLE1BQUksU0FBSkEsR0FBSSxPQUFpRDtBQUFBLEtBQS9DQyxHQUErQyxRQUEvQ0EsR0FBK0M7QUFBQSxLQUExQ0MsTUFBMEMsUUFBMUNBLE1BQTBDO0FBQUEsS0FBbkNDLFFBQW1DLFFBQW5DQSxRQUFtQztBQUFBLEtBQXpCQyxTQUF5QixRQUF6QkEsU0FBeUI7QUFBQSxLQUFkQyxVQUFjLFFBQWRBLFVBQWM7O0FBQzFELEtBQUlDLFlBQVUsY0FBY0MsV0FBZCxDQUEwQk4sR0FBMUIsQ0FBZDtBQUNBLEtBQUlP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QUFBLEdBQUo7QUFBQSxFQXBCRzs7QUFzQlhwQyxTQUFRO0FBQUEsU0FBRztBQUFBLFVBQVcsS0FBR3FDLFVBQUgsQ0FBYyxLQUFkLEVBQ3BCaEMsSUFEb0IsQ0FDZjtBQUFBLFdBQUssY0FBY2lDLE1BQWQsQ0FBcUJsRCxHQUFyQixDQUFMO0FBQUEsSUFEZSxFQUVwQmlCLElBRm9CLENBRWY7QUFBQSxXQUFLLGNBQWM0QixPQUFkLEdBQXNCN0MsR0FBM0I7QUFBQSxJQUZlLENBQVg7QUFBQSxHQUFIO0FBQUE7QUF0QkcsQ0FBYjs7QUEyQk8sSUFBTW1ELDRCQUFRO0FBQ3BCbkIsUUFBTyxpQkFBeUM7QUFBQSxNQUF4Q0YsS0FBd0MsdUVBQWxDLEVBQWtDO0FBQUE7QUFBQSxNQUE5QlcsSUFBOEIsU0FBOUJBLElBQThCO0FBQUEsTUFBekJ0QyxTQUF5QixTQUF6QkEsU0FBeUI7QUFBQSxNQUFkQyxVQUFjLFNBQWRBLFVBQWM7O0FBQy9DLFVBQU9xQyxJQUFQO0FBQ0EsUUFBSyxPQUFMO0FBQ0MsV0FBTyxFQUFDdEMsb0JBQUQsRUFBWUMsc0JBQVosRUFBUDtBQUNEO0FBQ0MsV0FBTzBCLEtBQVA7QUFKRDtBQU1BO0FBUm1CLENBQWQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBEb3dubG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS1kb3dubG9hZFwiXG5pbXBvcnQgU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5pbXBvcnQgUmVtb3ZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RlbGV0ZVwiXG5cbmltcG9ydCB7VUl9IGZyb20gXCIuXCJcblxuaW1wb3J0IGRiQXBwbGljYXRpb24gZnJvbSBcIi4vZGIvYXBwXCJcblxuY29uc3QgRU5URVI9MTNcblxuY29uc3QgQXBwPSh7YXBwLCByb3V0ZXIsZGlzcGF0Y2gsIG5hbWVFcnJvciwgdW5hbWVFcnJvcn0pPT57XG5cdGxldCByZW1vdmFibGU9ZGJBcHBsaWNhdGlvbi5pc1JlbW92YWJsZShhcHApXG5cdGxldCBjb21tYW5kQmFyXG5cdGlmKHJlbW92YWJsZSlcblx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgcHJpbWFyeT1cIlVwbG9hZFwiXG5cdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0LHthY3Rpb246XCJVcGxvYWRcIlxuXHRcdFx0XHRcdFx0LGljb246VXBsb2FkXG5cdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRCgpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQse2FjdGlvbjpcIlJlbW92ZVwiXG5cdFx0XHRcdFx0XHQsaWNvbjpSZW1vdmVcblx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT57XG5cdFx0XHRcdFx0XHRcdGxldCBuYW1lPXByb21wdChcIlBsZWFzZSBtYWtlIHN1cmUgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nIGJ5IGdpdmluZyB0aGlzIGFwcCBuYW1lXCIpXG5cdFx0XHRcdFx0XHRcdGlmKG5hbWU9PWFwcC5uYW1lKXtcblx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uUkVNT1ZFKGFwcC5faWQpKVxuXHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4oYT0+cm91dGVyLnJlcGxhY2UoXCIvXCIpKVxuXHRcdFx0XHRcdFx0XHR9ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdGFsZXJ0KFwibmFtZSBpcyBub3QgY29ycmVjdFwiKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XX1cblx0XHRcdC8+KVxuXHRlbHNlXG5cdFx0Y29tbWFuZEJhcj0oPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn1dfS8+KVxuXG5cdGNvbnN0IGNoYW5nZU5hbWU9dmFsdWU9PnZhbHVlIT1hcHAubmFtZSAmJiBkaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwibmFtZVwiLHZhbHVlKSkudGhlbigoe25hbWV9KT0+cm91dGVyLnJlcGxhY2UoYGFwcC8ke25hbWV9YCkpXG5cdGNvbnN0IGNoYW5nZVVOYW1lPXZhbHVlPT52YWx1ZSE9YXBwLnVuYW1lICYmIGRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJ1bmFtZVwiLHZhbHVlKSlcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdDxUZXh0RmllbGQgXG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0ZGlzYWJsZWQ9eyFyZW1vdmFibGV9XG5cdFx0XHRcdGRlZmF1bHRWYWx1ZT17YXBwLm5hbWV9XG5cdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09RU5URVIgJiYgY2hhbmdlTmFtZShlLnRhcmdldC52YWx1ZS50cmltKCkpfVxuXHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+Y2hhbmdlTmFtZSh2YWx1ZS50cmltKCkpfS8+XG5cblx0XHRcdDxUZXh0RmllbGQgXG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRkaXNhYmxlZD17IXJlbW92YWJsZX1cblx0XHRcdFx0ZGVmYXVsdFZhbHVlPXthcHAudW5hbWV9XG5cdFx0XHRcdGVycm9yVGV4dD17dW5hbWVFcnJvcn1cblx0XHRcdFx0b25LZXlEb3duPXtlPT5lLmtleUNvZGU9PUVOVEVSICYmIGNoYW5nZVVOYW1lKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSl9XG5cdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5jaGFuZ2VVTmFtZSh2YWx1ZS50cmltKCkpfS8+XG5cblx0XHRcdDxUZXh0RmllbGRcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJBUEkga2V5OiB2YWx1ZSBvZiBodHRwIGhlYWRlciAneC1hcHBsaWNhdGlvbi1pZCdcIlxuXHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLmFwaUtleX0vPlxuXG5cdFx0XHQ8VGV4dEZpZWxkXG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwid2VjaGF0IHVybDogdXNlIGl0IHRvIGFjY2VwdCBtZXNzYWdlIGZyb20gd2VjaGF0XCJcblx0XHRcdFx0ZGlzYWJsZWQ9e3RydWV9XG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0dmFsdWU9e2FwcC5hcGlLZXkgPyBgaHR0cDovL3FpbGkyLmNvbS8xLyR7YXBwLmFwaUtleX0vd2VjaGF0YCA6IFwiXCJ9Lz5cblxuXHRcdFx0e2NvbW1hbmRCYXJ9XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZT0+KHthcHA6c3RhdGUucWlsaUNvbnNvbGUuYXBwLCAuLi5zdGF0ZS5hcHBVSX0pKShBcHApXG5cbmV4cG9ydCBjb25zdCBDcmVhdG9yPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFwcFVJKSgoe3JvdXRlcixkaXNwYXRjaCwgbmFtZUVycm9yfSk9Pntcblx0bGV0IHJlZk5hbWUscmVmVW5hbWVcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZOYW1lPWF9XG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG5cdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlVuYW1lPWF9XG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdDxUZXh0RmllbGRcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJBUEkga2V5OiB2YWx1ZSBvZiBodHRwIGhlYWRlciAneC1hcHBsaWNhdGlvbi1pZCdcIlxuXHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdDxUZXh0RmllbGRcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuXHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cdFx0XHRcdFx0LHthY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIGljb246U2F2ZVxuXHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUocmVmTmFtZS5nZXRWYWx1ZSgpLHJlZlVuYW1lLmdldFZhbHVlKCkpKVxuXHRcdFx0XHRcdFx0XHQudGhlbigoe25hbWV9KT0+cm91dGVyLnJlcGxhY2Uoe3BhdGhuYW1lOmBhcHAvJHtuYW1lfWB9KSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF19XG5cdFx0XHRcdC8+XG5cdFx0PC9kaXY+XG5cdClcbn0pXG5cblxuY29uc3QgQUNUSU9OPXtcblx0Q1JFQVRFOiAobmFtZSwgdW5hbWUpPT57XG5cdFx0bGV0IG5hbWVFcnJvciwgdW5hbWVFcnJvclxuXHRcdGlmKCFuYW1lKVxuXHRcdFx0bmFtZUVycm9yPVwibmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYobmFtZUVycm9yIHx8IHVuYW1lRXJyb3IpXG5cdFx0XHRyZXR1cm4gZGlzcGF0Y2g9Pntcblx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6XCJlcnJvclwiLCBuYW1lRXJyb3IsIHVuYW1lRXJyb3J9KVxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXHRcdFx0fVxuXHRcdFxuXHRcdHJldHVybiBkaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi51cHNlcnQoe25hbWUsdW5hbWV9KVxuXHRcdFx0LnRoZW4oYXBwPT5kYkFwcGxpY2F0aW9uLmN1cnJlbnQ9YXBwKVxuXHR9XG5cdCxDSEFOR0U6IChrZXksdmFsdWUpPT57XG5cdFx0Y29uc3QgYXBwPWRiQXBwbGljYXRpb24uY3VycmVudFxuXHRcdGFwcFtrZXldPXZhbHVlXG5cdFx0cmV0dXJuIGRpc3BhdGNoPT5kYkFwcGxpY2F0aW9uLnVwc2VydChhcHApXG5cdFx0XHQudGhlbihhcHA9PmRiQXBwbGljYXRpb24uY3VycmVudD1hcHApXG5cdH1cblx0LFJFTU9WRTogaWQ9PmRpc3BhdGNoPT5kYkFwcGxpY2F0aW9uLnJlbW92ZShpZClcblx0XG5cdCxVUExPQUQ6IGE9PmRpc3BsYXRjaD0+VUkuc2VsZWN0RmlsZSgncmF3Jylcblx0XHRcdC50aGVuKGFwcD0+ZGJBcHBsaWNhdGlvbi51cGxvYWQoYXBwKSlcblx0XHRcdC50aGVuKGFwcD0+ZGJBcHBsaWNhdGlvbi5jdXJyZW50PWFwcClcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuXHRhcHBVSTogKHN0YXRlPXt9LHt0eXBlLG5hbWVFcnJvciwgdW5hbWVFcnJvcn0pPT57XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ2Vycm9yJzpcblx0XHRcdHJldHVybiB7bmFtZUVycm9yLCB1bmFtZUVycm9yfVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9XG5cdH1cbn0iXX0=