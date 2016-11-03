"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.App = exports.REDUCER = exports.ACTION = undefined;

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
var DOMAIN = "ui.app";
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

var REDUCER = exports.REDUCER = function REDUCER() {
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
};

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

exports.default = Object.assign(App, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJET01BSU4iLCJBQ1RJT04iLCJDUkVBVEUiLCJuYW1lIiwidW5hbWUiLCJuYW1lRXJyb3IiLCJ1bmFtZUVycm9yIiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsIlByb21pc2UiLCJyZWplY3QiLCJ1cHNlcnQiLCJ0aGVuIiwiY3VycmVudCIsImFwcCIsIkNIQU5HRSIsImtleSIsInZhbHVlIiwiUkVNT1ZFIiwicmVtb3ZlIiwiaWQiLCJVUExPQUQiLCJzZWxlY3RGaWxlIiwidXBsb2FkIiwiUkVEVUNFUiIsInN0YXRlIiwiY29uc29sZSIsImxvZyIsIkFwcCIsInJvdXRlciIsInJlbW92YWJsZSIsImlzUmVtb3ZhYmxlIiwiY29tbWFuZEJhciIsImFjdGlvbiIsImljb24iLCJvblNlbGVjdCIsInByb21wdCIsIl9pZCIsInJlcGxhY2UiLCJhbGVydCIsImNoYW5nZU5hbWUiLCJjaGFuZ2VVTmFtZSIsInJlZk5hbWUiLCJyZWZVbmFtZSIsInRhcmdldCIsImUiLCJrZXlDb2RlIiwidHJpbSIsImFwaUtleSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkNyZWF0b3IiLCJhIiwibGFiZWwiLCJnZXRWYWx1ZSIsInBhdGhuYW1lIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOzs7Ozs7QUFFQSxJQUFNQSxRQUFNLEVBQVo7QUFDQSxJQUFNQyxTQUFPLFFBQWI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsU0FBUSxnQkFBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWU7QUFDdEIsTUFBSUMsa0JBQUo7QUFBQSxNQUFlQyxtQkFBZjtBQUNBLE1BQUcsQ0FBQ0gsSUFBSixFQUNDRSxZQUFVLGtCQUFWO0FBQ0QsTUFBR0EsU0FBSCxFQUFhO0FBQ1osVUFBTyxvQkFBVTtB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QUFqQixFQUFmLENBQVY7QUFBQSxNQURNLENBQUg7QUFBQTtBQURWLElBRks7QUFEUjtBQVZELEVBREQ7QUFzQkEsQ0F4Qk07QUF5QlBpRCxRQUFRRixZQUFSLEdBQXFCLEVBQUNwQixRQUFRLGlCQUFVcUIsTUFBbkIsRUFBckI7O2tCQUVlTSxPQUFPQyxNQUFQLENBQWM3QixHQUFkLEVBQWtCLEVBQUM1QixjQUFELEVBQVN3QixnQkFBVCxFQUFsQixDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBEb3dubG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS1kb3dubG9hZFwiXG5pbXBvcnQgU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5pbXBvcnQgUmVtb3ZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RlbGV0ZVwiXG5cbmltcG9ydCB7VUl9IGZyb20gXCIuXCJcblxuaW1wb3J0IGRiQXBwbGljYXRpb24gZnJvbSBcIi4vZGIvYXBwXCJcblxuY29uc3QgRU5URVI9MTNcbmNvbnN0IERPTUFJTj1cInVpLmFwcFwiXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0Q1JFQVRFOiAobmFtZSwgdW5hbWUpPT57XG5cdFx0bGV0IG5hbWVFcnJvciwgdW5hbWVFcnJvclxuXHRcdGlmKCFuYW1lKVxuXHRcdFx0bmFtZUVycm9yPVwibmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYobmFtZUVycm9yKXtcblx0XHRcdHJldHVybiBkaXNwYXRjaD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZXJyb3JgLCBwYXlsb2FkOntuYW1lRXJyb3J9fSlcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZGlzcGF0Y2g9PmRiQXBwbGljYXRpb24udXBzZXJ0KHtuYW1lLHVuYW1lfSlcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGB9KVxuXHRcdFx0XHRyZXR1cm4gZGJBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxuXHRcdFx0fSlcblx0fVxuXHQsQ0hBTkdFOiAoa2V5LHZhbHVlKT0+e1xuXHRcdGNvbnN0IGFwcD1kYkFwcGxpY2F0aW9uLmN1cnJlbnRcblx0XHRhcHBba2V5XT12YWx1ZVxuXHRcdHJldHVybiBkaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi51cHNlcnQoYXBwKVxuXHRcdFx0LnRoZW4oYXBwPT57XG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGRhdGVkYH0pXG5cdFx0XHRcdHJldHVybiBkYkFwcGxpY2F0aW9uLmN1cnJlbnQ9YXBwXG5cdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGlkPT5kaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi5yZW1vdmUoaWQpLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3JlbW92ZWRgfSkpXG5cblx0LFVQTE9BRDogYT0+ZGlzcGxhdGNoPT5VSS5zZWxlY3RGaWxlKCdyYXcnKVxuXHRcdFx0LnRoZW4oYXBwPT5kYkFwcGxpY2F0aW9uLnVwbG9hZChhcHApKVxuXHRcdFx0LnRoZW4oYXBwPT57XG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGxvYWRlZGB9KVxuXHRcdFx0XHRyZXR1cm4gZGJBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxuXHRcdFx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLCBwYXlsb2FkfSk9Pntcblx0Y29uc29sZS5sb2coYCR7RE9NQUlOfSByZWR1Y2VyIHJ1bmApXG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vZXJyb3JgOlxuXHRcdHJldHVybiBwYXlsb2FkXG5cdGNhc2UgYEBAJHtET01BSU59L3VwbG9hZGVkYDpcblx0Y2FzZSBgQEAke0RPTUFJTn0vcmVtb3ZlZGA6XG5cdGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS91cGRhdGVkYDpcblx0XHRyZXR1cm4ge31cblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IEFwcD0oe2FwcCwgZGlzcGF0Y2gsIG5hbWVFcnJvciwgdW5hbWVFcnJvcn0se3JvdXRlcn0pPT57XG5cdGxldCByZW1vdmFibGU9ZGJBcHBsaWNhdGlvbi5pc1JlbW92YWJsZShhcHApXG5cdGxldCBjb21tYW5kQmFyXG5cdGlmKHJlbW92YWJsZSlcblx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgcHJpbWFyeT1cIlVwbG9hZFwiXG5cdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cblx0XHRcdFx0XHQse2FjdGlvbjpcIlVwbG9hZFwiXG5cdFx0XHRcdFx0XHQsaWNvbjo8VXBsb2FkLz5cblx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEKCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCx7YWN0aW9uOlwiUmVtb3ZlXCJcblx0XHRcdFx0XHRcdCxpY29uOjxSZW1vdmUvPlxuXHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9Pntcblx0XHRcdFx0XHRcdFx0bGV0IG5hbWU9cHJvbXB0KFwiUGxlYXNlIG1ha2Ugc3VyZSB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcgYnkgZ2l2aW5nIHRoaXMgYXBwIG5hbWVcIilcblx0XHRcdFx0XHRcdFx0aWYobmFtZT09YXBwLm5hbWUpe1xuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5SRU1PVkUoYXBwLl9pZCkpXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbihhPT5yb3V0ZXIucmVwbGFjZShcIi9cIikpXG5cdFx0XHRcdFx0XHRcdH1lbHNlXG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoXCJuYW1lIGlzIG5vdCBjb3JyZWN0XCIpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfVxuXHRcdFx0Lz4pXG5cdGVsc2Vcblx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifV19Lz4pXG5cblx0Y29uc3QgY2hhbmdlTmFtZT12YWx1ZT0+dmFsdWUhPWFwcC5uYW1lICYmIGRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJuYW1lXCIsdmFsdWUpKS50aGVuKCh7bmFtZX0pPT5yb3V0ZXIucmVwbGFjZShgYXBwLyR7bmFtZX1gKSlcblx0Y29uc3QgY2hhbmdlVU5hbWU9dmFsdWU9PnZhbHVlIT1hcHAudW5hbWUgJiYgZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcInVuYW1lXCIsdmFsdWUpKVxuXHRsZXQgcmVmTmFtZSwgcmVmVW5hbWVcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZOYW1lfVxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLm5hbWV9XG5cdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZOYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09RU5URVIgJiYgY2hhbmdlTmFtZShlLnRhcmdldC52YWx1ZS50cmltKCkpfVxuXHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+Y2hhbmdlTmFtZSh2YWx1ZS50cmltKCkpfS8+XG5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVbmFtZX1cblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJnbG9iYWwgdW5pcXVlIHByb2R1Y3QgbmFtZTogYXBwLnFpbGkyLmNvbS97cHJvdWN0TmFtZX1cIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLnVuYW1lfVxuXHRcdFx0XHRlcnJvclRleHQ9e3VuYW1lRXJyb3J9XG5cdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZlVuYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09RU5URVIgJiYgY2hhbmdlVU5hbWUoZS50YXJnZXQudmFsdWUudHJpbSgpKX1cblx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZVVOYW1lKHZhbHVlLnRyaW0oKSl9Lz5cblxuXHRcdFx0PFRleHRGaWVsZFxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIkFQSSBrZXk6IHZhbHVlIG9mIGh0dHAgaGVhZGVyICd4LWFwcGxpY2F0aW9uLWlkJ1wiXG5cdFx0XHRcdGRpc2FibGVkPXt0cnVlfVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdHZhbHVlPXthcHAuYXBpS2V5fS8+XG5cblx0XHRcdDxUZXh0RmllbGRcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuXHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLmFwaUtleSA/IGBodHRwOi8vcWlsaTIuY29tLzEvJHthcHAuYXBpS2V5fS93ZWNoYXRgIDogXCJcIn0vPlxuXG5cdFx0XHR7Y29tbWFuZEJhcn1cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5BcHAuY29udGV4dFR5cGVzPXtyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3R9XG5cbmV4cG9ydCBjb25zdCBDcmVhdG9yPSh7ZGlzcGF0Y2gsIG5hbWVFcnJvcn0se3JvdXRlcn0pPT57XG5cdGxldCByZWZOYW1lLHJlZlVuYW1lXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmTmFtZT1hfVxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuXHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVbmFtZT1hfVxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxuXHRcdFx0XHRcdCx7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBpY29uOjxTYXZlLz5cblx0XHRcdFx0XHRcdCxvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHJlZk5hbWUuZ2V0VmFsdWUoKSxyZWZVbmFtZS5nZXRWYWx1ZSgpKSlcblx0XHRcdFx0XHRcdFx0LnRoZW4oKHtuYW1lfSk9PnJvdXRlci5yZXBsYWNlKHtwYXRobmFtZTpgYXBwLyR7bmFtZX1gfSkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfVxuXHRcdFx0XHQvPlxuXHRcdDwvZGl2PlxuXHQpXG59XG5DcmVhdG9yLmNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEFwcCx7QUNUSU9OLCBSRURVQ0VSfSlcbiJdfQ==