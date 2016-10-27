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

var App = exports.App = (0, _reactRedux.connect)(function (state) {
	return _extends({ app: _app2.default.current }, state[DOMAIN]);
})(function (_ref2) {
	var app = _ref2.app,
	    router = _ref2.router,
	    dispatch = _ref2.dispatch,
	    nameError = _ref2.nameError,
	    unameError = _ref2.unameError;

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
	var router = _ref8.router,
	    dispatch = _ref8.dispatch,
	    nameError = _ref8.nameError;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJET01BSU4iLCJBQ1RJT04iLCJDUkVBVEUiLCJuYW1lIiwidW5hbWUiLCJuYW1lRXJyb3IiLCJ1bmFtZUVycm9yIiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsIlByb21pc2UiLCJyZWplY3QiLCJ1cHNlcnQiLCJ0aGVuIiwiY3VycmVudCIsImFwcCIsIkNIQU5HRSIsImtleSIsInZhbHVlIiwiUkVNT1ZFIiwicmVtb3ZlIiwiaWQiLCJVUExPQUQiLCJzZWxlY3RGaWxlIiwidXBsb2FkIiwiUkVEVUNFUiIsInN0YXRlIiwiQXBwIiwicm91dGVyIiwicmVtb3ZhYmxlIiwiaXNSZW1vdmFibGUiLCJjb21tYW5kQmFyIiwiYWN0aW9uIiwiaWNvbiIsIm9uU2VsZWN0IiwicHJvbXB0IiwiX2lkIiwicmVwbGFjZSIsImFsZXJ0IiwiY2hhbmdlTmFtZSIsImNoYW5nZVVOYW1lIiwicmVmTmFtZSIsInJlZlVuYW1lIiwidGFyZ2V0IiwiZSIsImtleUNvZGUiLCJ0cmltIiwiYXBpS2V5IiwiQ3JlYXRvciIsImEiLCJsYWJlbCIsImdldFZhbHVlIiwicGF0aG5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFNLEVBQVo7QUFDQSxJQUFNQyxTQUFPLFFBQWI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsU0FBUSxnQkFBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWU7QUFDdEIsTUFBSUMsa0JBQUo7QUFBQSxNQUFlQyxtQkFBZjtBQUNBLE1BQUcsQ0FBQ0gsSUFBSixFQUNDRSxZQUFVLGtCQUFWO0FBQ0QsTUFBR0EsU0FBSCxFQUFhO0FBQ1osVUFBTyxvQkFBVTtBQUNoQkUsYUFBUyxFQUFDQyxhQUFVUixNQUFWLFdBQUQsRUFBMkJTLFNBQVEsRUFBQ0osb0JB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LElBRks7QUFEUjtBQVZELEVBREQ7QUFzQkEsQ0F6Qm9CLENBQWQ7O2tCQTJCUXdCLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBEb3dubG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS1kb3dubG9hZFwiXG5pbXBvcnQgU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5pbXBvcnQgUmVtb3ZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RlbGV0ZVwiXG5cbmltcG9ydCB7VUl9IGZyb20gXCIuXCJcblxuaW1wb3J0IGRiQXBwbGljYXRpb24gZnJvbSBcIi4vZGIvYXBwXCJcblxuY29uc3QgRU5URVI9MTNcbmNvbnN0IERPTUFJTj1cInVpLmFwcFwiXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0Q1JFQVRFOiAobmFtZSwgdW5hbWUpPT57XG5cdFx0bGV0IG5hbWVFcnJvciwgdW5hbWVFcnJvclxuXHRcdGlmKCFuYW1lKVxuXHRcdFx0bmFtZUVycm9yPVwibmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYobmFtZUVycm9yKXtcblx0XHRcdHJldHVybiBkaXNwYXRjaD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZXJyb3JgLCBwYXlsb2FkOntuYW1lRXJyb3J9fSlcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZGlzcGF0Y2g9PmRiQXBwbGljYXRpb24udXBzZXJ0KHtuYW1lLHVuYW1lfSlcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGB9KVxuXHRcdFx0XHRyZXR1cm4gZGJBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxuXHRcdFx0fSlcblx0fVxuXHQsQ0hBTkdFOiAoa2V5LHZhbHVlKT0+e1xuXHRcdGNvbnN0IGFwcD1kYkFwcGxpY2F0aW9uLmN1cnJlbnRcblx0XHRhcHBba2V5XT12YWx1ZVxuXHRcdHJldHVybiBkaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi51cHNlcnQoYXBwKVxuXHRcdFx0LnRoZW4oYXBwPT57XG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGRhdGVkYH0pXG5cdFx0XHRcdHJldHVybiBkYkFwcGxpY2F0aW9uLmN1cnJlbnQ9YXBwXG5cdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGlkPT5kaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi5yZW1vdmUoaWQpLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3JlbW92ZWRgfSkpXG5cblx0LFVQTE9BRDogYT0+ZGlzcGxhdGNoPT5VSS5zZWxlY3RGaWxlKCdyYXcnKVxuXHRcdFx0LnRoZW4oYXBwPT5kYkFwcGxpY2F0aW9uLnVwbG9hZChhcHApKVxuXHRcdFx0LnRoZW4oYXBwPT57XG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGxvYWRlZGB9KVxuXHRcdFx0XHRyZXR1cm4gZGJBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxuXHRcdFx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuXHRbRE9NQUlOXTogKHN0YXRlPXt9LHt0eXBlLCBwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vZXJyb3JgOlxuXHRcdFx0cmV0dXJuIHBheWxvYWRcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS91cGxvYWRlZGA6XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vcmVtb3ZlZGA6XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vdXBkYXRlZGA6XG5cdFx0XHRyZXR1cm4ge31cblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IEFwcD1jb25uZWN0KHN0YXRlPT4oe2FwcDpkYkFwcGxpY2F0aW9uLmN1cnJlbnQsIC4uLnN0YXRlW0RPTUFJTl19KSkoXG4oe2FwcCwgcm91dGVyLGRpc3BhdGNoLCBuYW1lRXJyb3IsIHVuYW1lRXJyb3J9KT0+e1xuXHRsZXQgcmVtb3ZhYmxlPWRiQXBwbGljYXRpb24uaXNSZW1vdmFibGUoYXBwKVxuXHRsZXQgY29tbWFuZEJhclxuXHRpZihyZW1vdmFibGUpXG5cdFx0Y29tbWFuZEJhcj0oPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHByaW1hcnk9XCJVcGxvYWRcIlxuXHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxuXG5cdFx0XHRcdFx0LHthY3Rpb246XCJVcGxvYWRcIlxuXHRcdFx0XHRcdFx0LGljb246VXBsb2FkXG5cdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRCgpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQse2FjdGlvbjpcIlJlbW92ZVwiXG5cdFx0XHRcdFx0XHQsaWNvbjpSZW1vdmVcblx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT57XG5cdFx0XHRcdFx0XHRcdGxldCBuYW1lPXByb21wdChcIlBsZWFzZSBtYWtlIHN1cmUgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nIGJ5IGdpdmluZyB0aGlzIGFwcCBuYW1lXCIpXG5cdFx0XHRcdFx0XHRcdGlmKG5hbWU9PWFwcC5uYW1lKXtcblx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uUkVNT1ZFKGFwcC5faWQpKVxuXHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4oYT0+cm91dGVyLnJlcGxhY2UoXCIvXCIpKVxuXHRcdFx0XHRcdFx0XHR9ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdGFsZXJ0KFwibmFtZSBpcyBub3QgY29ycmVjdFwiKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XX1cblx0XHRcdC8+KVxuXHRlbHNlXG5cdFx0Y29tbWFuZEJhcj0oPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn1dfS8+KVxuXG5cdGNvbnN0IGNoYW5nZU5hbWU9dmFsdWU9PnZhbHVlIT1hcHAubmFtZSAmJiBkaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwibmFtZVwiLHZhbHVlKSkudGhlbigoe25hbWV9KT0+cm91dGVyLnJlcGxhY2UoYGFwcC8ke25hbWV9YCkpXG5cdGNvbnN0IGNoYW5nZVVOYW1lPXZhbHVlPT52YWx1ZSE9YXBwLnVuYW1lICYmIGRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJ1bmFtZVwiLHZhbHVlKSlcblx0bGV0IHJlZk5hbWUsIHJlZlVuYW1lXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmTmFtZX1cblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJhcHBsaWNhdGlvbiBuYW1lXCJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRkaXNhYmxlZD17IXJlbW92YWJsZX1cblx0XHRcdFx0dmFsdWU9e2FwcC5uYW1lfVxuXHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0b25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+cmVmTmFtZS52YWx1ZT12YWx1ZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT5lLmtleUNvZGU9PUVOVEVSICYmIGNoYW5nZU5hbWUoZS50YXJnZXQudmFsdWUudHJpbSgpKX1cblx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZU5hbWUodmFsdWUudHJpbSgpKX0vPlxuXG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmVW5hbWV9XG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRkaXNhYmxlZD17IXJlbW92YWJsZX1cblx0XHRcdFx0dmFsdWU9e2FwcC51bmFtZX1cblx0XHRcdFx0ZXJyb3JUZXh0PXt1bmFtZUVycm9yfVxuXHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZVbmFtZS52YWx1ZT12YWx1ZX1cblx0XHRcdFx0b25LZXlEb3duPXtlPT5lLmtleUNvZGU9PUVOVEVSICYmIGNoYW5nZVVOYW1lKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSl9XG5cdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5jaGFuZ2VVTmFtZSh2YWx1ZS50cmltKCkpfS8+XG5cblx0XHRcdDxUZXh0RmllbGRcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJBUEkga2V5OiB2YWx1ZSBvZiBodHRwIGhlYWRlciAneC1hcHBsaWNhdGlvbi1pZCdcIlxuXHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHR2YWx1ZT17YXBwLmFwaUtleX0vPlxuXG5cdFx0XHQ8VGV4dEZpZWxkXG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwid2VjaGF0IHVybDogdXNlIGl0IHRvIGFjY2VwdCBtZXNzYWdlIGZyb20gd2VjaGF0XCJcblx0XHRcdFx0ZGlzYWJsZWQ9e3RydWV9XG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0dmFsdWU9e2FwcC5hcGlLZXkgPyBgaHR0cDovL3FpbGkyLmNvbS8xLyR7YXBwLmFwaUtleX0vd2VjaGF0YCA6IFwiXCJ9Lz5cblxuXHRcdFx0e2NvbW1hbmRCYXJ9XG5cdFx0PC9kaXY+XG5cdClcbn0pXG5cbmV4cG9ydCBjb25zdCBDcmVhdG9yPWNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0pKFxuKHtyb3V0ZXIsZGlzcGF0Y2gsIG5hbWVFcnJvcn0pPT57XG5cdGxldCByZWZOYW1lLHJlZlVuYW1lXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmTmFtZT1hfVxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuXHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVbmFtZT1hfVxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxuXHRcdFx0XHRcdCx7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBpY29uOlNhdmVcblx0XHRcdFx0XHRcdCxvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHJlZk5hbWUuZ2V0VmFsdWUoKSxyZWZVbmFtZS5nZXRWYWx1ZSgpKSlcblx0XHRcdFx0XHRcdFx0LnRoZW4oKHtuYW1lfSk9PnJvdXRlci5yZXBsYWNlKHtwYXRobmFtZTpgYXBwLyR7bmFtZX1gfSkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfVxuXHRcdFx0XHQvPlxuXHRcdDwvZGl2PlxuXHQpXG59KVxuXG5leHBvcnQgZGVmYXVsdCBBcHBcbiJdfQ==