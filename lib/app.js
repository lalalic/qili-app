"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.App = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

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
var DOMAIN = exports.DOMAIN = "ui.app";
var ACTION = exports.ACTION = {
	CREATE: function CREATE(name, uname) {
		var nameError = void 0,
		    unameError = void 0;
		if (!name) nameError = "name is required";
		if (nameError) {
			return function (dispatch) {
				dispatch({ type: "@@" + DOMAIN + "/error", payload: { nameError: nameError } });
				return Promise.reject();
			};
		}

		return function (dispatch) {
			return _app2.default.upsert({ name: name, uname: uname }).then(function (app) {
				dispatch({ type: "@@" + DOMAIN + "/created" });
				return _app2.default.current = app;
			});
		};
	},
	CHANGE: function CHANGE(key, value) {
		var app = _app2.default.current;
		app[key] = value;
		return function (dispatch) {
			return _app2.default.upsert(app).then(function (app) {
				dispatch({ type: "@@" + DOMAIN + "/updated" });
				return _app2.default.current = app;
			});
		};
	},
	REMOVE: function REMOVE(id) {
		return function (dispatch) {
			return _app2.default.remove(id).then(function (a) {
				return dispatch({ type: "@@" + DOMAIN + "/removed" });
			});
		};
	},

	UPLOAD: function UPLOAD(a) {
		return function (displatch) {
			return _.UI.selectFile('raw').then(function (app) {
				return _app2.default.upload(app);
			}).then(function (app) {
				dispatch({ type: "@@" + DOMAIN + "/uploaded" });
				return _app2.default.current = app;
			});
		};
	}
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	console.log(DOMAIN + " reducer run");
	switch (type) {
		case "@@" + DOMAIN + "/error":
			return payload;
		case "@@" + DOMAIN + "/uploaded":
		case "@@" + DOMAIN + "/removed":
		case "@@" + DOMAIN + "/created":
		case "@@" + DOMAIN + "/updated":
			return {};
	}
	return state;
});

var App = exports.App = function App(_ref2, _ref3) {
	var app = _ref2.app,
	    dispatch = _ref2.dispatch,
	    nameError = _ref2.nameError,
	    unameError = _ref2.unameError;
	var router = _ref3.router;

	var removable = _app2.default.isRemovable(app);
	var commandBar = void 0;
	if (removable) commandBar = _react2.default.createElement(_.UI.CommandBar, { className: "footbar", primary: "Upload",
		items: [{ action: "Back" }, { action: "Upload",
			icon: _react2.default.createElement(_fileUpload2.default, null),
			onSelect: function onSelect(e) {
				return dispatch(ACTION.UPLOAD());
			}
		}, { action: "Remove",
			icon: _react2.default.createElement(_delete2.default, null),
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
		return value != app.name && dispatch(ACTION.CHANGE("name", value)).then(function (_ref4) {
			var name = _ref4.name;
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
			onChange: function onChange(_ref5) {
				var value = _ref5.target.value;
				return refName.value = value;
			},
			onKeyDown: function onKeyDown(e) {
				return e.keyCode == ENTER && changeName(e.target.value.trim());
			},
			onBlur: function onBlur(_ref6) {
				var value = _ref6.target.value;
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
			onChange: function onChange(_ref7) {
				var value = _ref7.target.value;
				return refUname.value = value;
			},
			onKeyDown: function onKeyDown(e) {
				return e.keyCode == ENTER && changeUName(e.target.value.trim());
			},
			onBlur: function onBlur(_ref8) {
				var value = _ref8.target.value;
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

App.contextTypes = { router: _react.PropTypes.object };

var Creator = exports.Creator = function Creator(_ref9, _ref10) {
	var dispatch = _ref9.dispatch,
	    nameError = _ref9.nameError;
	var router = _ref10.router;

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
			items: [{ action: "Back" }, { action: "Save", label: "保存", icon: _react2.default.createElement(_save2.default, null),
				onSelect: function onSelect(a) {
					return dispatch(ACTION.CREATE(refName.getValue(), refUname.getValue())).then(function (_ref11) {
						var name = _ref11.name;
						return router.replace({ pathname: "app/" + name });
					});
				}
			}]
		})
	);
};
Creator.contextTypes = { router: _react.PropTypes.object };

exports.default = Object.assign(App, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJET01BSU4iLCJBQ1RJT04iLCJDUkVBVEUiLCJuYW1lIiwidW5hbWUiLCJuYW1lRXJyb3IiLCJ1bmFtZUVycm9yIiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsIlByb21pc2UiLCJyZWplY3QiLCJ1cHNlcnQiLCJ0aGVuIiwiY3VycmVudCIsImFwcCIsIkNIQU5HRSIsImtleSIsInZhbHVlIiwiUkVNT1ZFIiwicmVtb3ZlIiwiaWQiLCJVUExPQUQiLCJzZWxlY3RGaWxlIiwidXBsb2FkIiwiUkVEVUNFUiIsInN0YXRlIiwiY29uc29sZSIsImxvZyIsIkFwcCIsInJvdXRlciIsInJlbW92YWJsZSIsImlzUmVtb3ZhYmxlIiwiY29tbWFuZEJhciIsImFjdGlvbiIsImljb24iLCJvblNlbGVjdCIsInByb21wdCIsIl9pZCIsInJlcGxhY2UiLCJhbGVydCIsImNoYW5nZU5hbWUiLCJjaGFuZ2VVTmFtZSIsInJlZk5hbWUiLCJyZWZVbmFtZSIsInRhcmdldCIsImUiLCJrZXlDb2RlIiwidHJpbSIsImFwaUtleSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkNyZWF0b3IiLCJhIiwibGFiZWwiLCJnZXRWYWx1ZSIsInBhdGhuYW1lIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLFFBQU0sRUFBWjtBQUNPLElBQU1DLDBCQUFPLFFBQWI7QUFDQSxJQUFNQywwQkFBTztBQUNuQkMsU0FBUSxnQkFBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWU7QUFDdEIsTUFBSUMsa0JBQUo7QUFBQSxNQUFlQyxtQkFBZjtBQUNBLE1BQUcsQ0FBQ0gsSUFBSixFQUNDRSxZQUFVLGtCQUFWO0FBQ0QsTUFBR0EsU0FBSCxFQUFhO0FBQ1osVUFBTyxvQkFB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LG1CQUFnQnJELElBQWpCLEVBQWYsQ0FBVjtBQUFBLE1BRE0sQ0FBSDtBQUFBO0FBRFYsSUFGSztBQURSO0FBVkQsRUFERDtBQXNCQSxDQXhCTTtBQXlCUGlELFFBQVFGLFlBQVIsR0FBcUIsRUFBQ3BCLFFBQVEsaUJBQVVxQixNQUFuQixFQUFyQjs7a0JBRWVNLE9BQU9DLE1BQVAsQ0FBYzdCLEdBQWQsRUFBa0IsRUFBQzdCLGNBQUQsRUFBU0MsY0FBVCxFQUFpQndCLGdCQUFqQixFQUFsQixDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBEb3dubG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS1kb3dubG9hZFwiXG5pbXBvcnQgU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5pbXBvcnQgUmVtb3ZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RlbGV0ZVwiXG5cbmltcG9ydCB7VUl9IGZyb20gXCIuXCJcblxuaW1wb3J0IGRiQXBwbGljYXRpb24gZnJvbSBcIi4vZGIvYXBwXCJcblxuY29uc3QgRU5URVI9MTNcbmV4cG9ydCBjb25zdCBET01BSU49XCJ1aS5hcHBcIlxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdENSRUFURTogKG5hbWUsIHVuYW1lKT0+e1xuXHRcdGxldCBuYW1lRXJyb3IsIHVuYW1lRXJyb3Jcblx0XHRpZighbmFtZSlcblx0XHRcdG5hbWVFcnJvcj1cIm5hbWUgaXMgcmVxdWlyZWRcIlxuXHRcdGlmKG5hbWVFcnJvcil7XG5cdFx0XHRyZXR1cm4gZGlzcGF0Y2g9Pntcblx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2Vycm9yYCwgcGF5bG9hZDp7bmFtZUVycm9yfX0pXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRpc3BhdGNoPT5kYkFwcGxpY2F0aW9uLnVwc2VydCh7bmFtZSx1bmFtZX0pXG5cdFx0XHQudGhlbihhcHA9Pntcblx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2NyZWF0ZWRgfSlcblx0XHRcdFx0cmV0dXJuIGRiQXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRcdH0pXG5cdH1cblx0LENIQU5HRTogKGtleSx2YWx1ZSk9Pntcblx0XHRjb25zdCBhcHA9ZGJBcHBsaWNhdGlvbi5jdXJyZW50XG5cdFx0YXBwW2tleV09dmFsdWVcblx0XHRyZXR1cm4gZGlzcGF0Y2g9PmRiQXBwbGljYXRpb24udXBzZXJ0KGFwcClcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vdXBkYXRlZGB9KVxuXHRcdFx0XHRyZXR1cm4gZGJBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxuXHRcdFx0fSlcblx0fVxuXHQsUkVNT1ZFOiBpZD0+ZGlzcGF0Y2g9PmRiQXBwbGljYXRpb24ucmVtb3ZlKGlkKS50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9yZW1vdmVkYH0pKVxuXG5cdCxVUExPQUQ6IGE9PmRpc3BsYXRjaD0+VUkuc2VsZWN0RmlsZSgncmF3Jylcblx0XHRcdC50aGVuKGFwcD0+ZGJBcHBsaWNhdGlvbi51cGxvYWQoYXBwKSlcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vdXBsb2FkZWRgfSlcblx0XHRcdFx0cmV0dXJuIGRiQXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRcdH0pXG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcblx0W0RPTUFJTl06KHN0YXRlPXt9LHt0eXBlLCBwYXlsb2FkfSk9Pntcblx0XHRjb25zb2xlLmxvZyhgJHtET01BSU59IHJlZHVjZXIgcnVuYClcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vZXJyb3JgOlxuXHRcdFx0cmV0dXJuIHBheWxvYWRcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS91cGxvYWRlZGA6XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vcmVtb3ZlZGA6XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vdXBkYXRlZGA6XG5cdFx0XHRyZXR1cm4ge31cblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IEFwcD0oe2FwcCwgZGlzcGF0Y2gsIG5hbWVFcnJvciwgdW5hbWVFcnJvcn0se3JvdXRlcn0pPT57XG5cdGxldCByZW1vdmFibGU9ZGJBcHBsaWNhdGlvbi5pc1JlbW92YWJsZShhcHApXG5cdGxldCBjb21tYW5kQmFyXG5cdGlmKHJlbW92YWJsZSlcblx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgcHJpbWFyeT1cIlVwbG9hZFwiXG5cdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cblx0XHRcdFx0XHQse2FjdGlvbjpcIlVwbG9hZFwiXG5cdFx0XHRcdFx0XHQsaWNvbjo8VXBsb2FkLz5cblx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEKCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCx7YWN0aW9uOlwiUmVtb3ZlXCJcblx0XHRcdFx0XHRcdCxpY29uOjxSZW1vdmUvPlxuXHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9Pntcblx0XHRcdFx0XHRcdFx0bGV0IG5hbWU9cHJvbXB0KFwiUGxlYXNlIG1ha2Ugc3VyZSB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcgYnkgZ2l2aW5nIHRoaXMgYXBwIG5hbWVcIilcblx0XHRcdFx0XHRcdFx0aWYobmFtZT09YXBwLm5hbWUpe1xuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5SRU1PVkUoYXBwLl9pZCkpXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbihhPT5yb3V0ZXIucmVwbGFjZShcIi9cIikpXG5cdFx0XHRcdFx0XHRcdH1lbHNlXG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoXCJuYW1lIGlzIG5vdCBjb3JyZWN0XCIpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfVxuXHRcdFx0Lz4pXG5cdGVsc2Vcblx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifV19Lz4pXG5cblx0Y29uc3QgY2hhbmdlTmFtZT12YWx1ZT0+dmFsdWUhPWFwcC5uYW1lICYmIGRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJuYW1lXCIsdmFsdWUpKS50aGVuKCh7bmFtZX0pPT5yb3V0ZXIucmVwbGFjZShgYXBwLyR7bmFtZX1gKSlcblx0Y29uc3QgY2hhbmdlVU5hbWU9dmFsdWU9PnZhbHVlIT1hcHAudW5hbWUgJiYgZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcInVuYW1lXCIsdmFsdWUpKVxuXHRsZXQgcmVmTmFtZSwgcmVmVW5hbWVcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZOYW1lfVxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLm5hbWV9XG5cdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZOYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09RU5URVIgJiYgY2hhbmdlTmFtZShlLnRhcmdldC52YWx1ZS50cmltKCkpfVxuXHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+Y2hhbmdlTmFtZSh2YWx1ZS50cmltKCkpfS8+XG5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVbmFtZX1cblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJnbG9iYWwgdW5pcXVlIHByb2R1Y3QgbmFtZTogYXBwLnFpbGkyLmNvbS97cHJvdWN0TmFtZX1cIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLnVuYW1lfVxuXHRcdFx0XHRlcnJvclRleHQ9e3VuYW1lRXJyb3J9XG5cdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZlVuYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09RU5URVIgJiYgY2hhbmdlVU5hbWUoZS50YXJnZXQudmFsdWUudHJpbSgpKX1cblx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZVVOYW1lKHZhbHVlLnRyaW0oKSl9Lz5cblxuXHRcdFx0PFRleHRGaWVsZFxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIkFQSSBrZXk6IHZhbHVlIG9mIGh0dHAgaGVhZGVyICd4LWFwcGxpY2F0aW9uLWlkJ1wiXG5cdFx0XHRcdGRpc2FibGVkPXt0cnVlfVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdHZhbHVlPXthcHAuYXBpS2V5fS8+XG5cblx0XHRcdDxUZXh0RmllbGRcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuXHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLmFwaUtleSA/IGBodHRwOi8vcWlsaTIuY29tLzEvJHthcHAuYXBpS2V5fS93ZWNoYXRgIDogXCJcIn0vPlxuXG5cdFx0XHR7Y29tbWFuZEJhcn1cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5BcHAuY29udGV4dFR5cGVzPXtyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3R9XG5cbmV4cG9ydCBjb25zdCBDcmVhdG9yPSh7ZGlzcGF0Y2gsIG5hbWVFcnJvcn0se3JvdXRlcn0pPT57XG5cdGxldCByZWZOYW1lLHJlZlVuYW1lXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmTmFtZT1hfVxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuXHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVbmFtZT1hfVxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxuXHRcdFx0XHRcdCx7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBpY29uOjxTYXZlLz5cblx0XHRcdFx0XHRcdCxvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHJlZk5hbWUuZ2V0VmFsdWUoKSxyZWZVbmFtZS5nZXRWYWx1ZSgpKSlcblx0XHRcdFx0XHRcdFx0LnRoZW4oKHtuYW1lfSk9PnJvdXRlci5yZXBsYWNlKHtwYXRobmFtZTpgYXBwLyR7bmFtZX1gfSkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfVxuXHRcdFx0XHQvPlxuXHRcdDwvZGl2PlxuXHQpXG59XG5DcmVhdG9yLmNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEFwcCx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxuIl19