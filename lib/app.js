"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.App = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

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
var DOMAIN = exports.DOMAIN = "ui.app";
var ACTION = exports.ACTION = {
	CREATE: function CREATE(name, uname) {
		var nameError = void 0,
		    unameError = void 0;
		if (!name) nameError = "name is required";
		if (nameError) {
			return function (dispatch) {
				dispatch({ type: "@@" + DOMAIN + "/error", payload: { nameError: nameError } });
				return _promise2.default.reject();
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
			return _.UI.fileSelector.select().then(function (app) {
				return _app2.default.upload(app);
			}).then(function (app) {
				dispatch({ type: "@@" + DOMAIN + "/uploaded" });
				return _app2.default.current = app;
			});
		};
	}
};
var INIT_STATE = {};
var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
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
			return INIT_STATE;
	}
	return state;
};

var App = exports.App = function (_Component) {
	(0, _inherits3.default)(App, _Component);

	function App() {
		(0, _classCallCheck3.default)(this, App);
		return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
	}

	(0, _createClass3.default)(App, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {
			if (next.name != this.props.name && next.name != _app2.default.current.name) _app2.default.current = next.name;
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    app = _props.app,
			    dispatch = _props.dispatch,
			    nameError = _props.nameError,
			    unameError = _props.unameError;
			var router = this.context.router;

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
				return value != app.name && dispatch(ACTION.CHANGE("name", value)).then(function (_ref2) {
					var name = _ref2.name;
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
					onChange: function onChange(_ref3) {
						var value = _ref3.target.value;
						return refName.value = value;
					},
					onKeyDown: function onKeyDown(_ref4) {
						var value = _ref4.target.value,
						    keyCode = _ref4.keyCode;
						return keyCode == ENTER && changeName(value.trim());
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
		}
	}]);
	return App;
}(_react.Component);

App.contextTypes = { router: _react.PropTypes.object };

var Creator = exports.Creator = function Creator(_ref8, _ref9) {
	var dispatch = _ref8.dispatch,
	    nameError = _ref8.nameError;
	var router = _ref9.router;

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
					return dispatch(ACTION.CREATE(refName.getValue(), refUname.getValue())).then(function (_ref10) {
						var name = _ref10.name;
						return router.replace("/app/" + name);
					});
				}
			}]
		})
	);
};
Creator.contextTypes = { router: _react.PropTypes.object };

exports.default = (0, _assign2.default)(App, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJET01BSU4iLCJBQ1RJT04iLCJDUkVBVEUiLCJuYW1lIiwidW5hbWUiLCJuYW1lRXJyb3IiLCJ1bmFtZUVycm9yIiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsInJlamVjdCIsInVwc2VydCIsInRoZW4iLCJjdXJyZW50IiwiYXBwIiwiQ0hBTkdFIiwia2V5IiwidmFsdWUiLCJSRU1PVkUiLCJyZW1vdmUiLCJpZCIsIlVQTE9BRCIsImZpbGVTZWxlY3RvciIsInNlbGVjdCIsInVwbG9hZCIsIklOSVRfU1RBVEUiLCJSRURVQ0VSIiwic3RhdGUiLCJBcHAiLCJuZXh0IiwicHJvcHMiLCJyb3V0ZXIiLCJjb250ZXh0IiwicmVtb3ZhYmxlIiwiaXNSZW1vdmFibGUiLCJjb21tYW5kQmFyIiwiYWN0aW9uIiwiaWNvbiIsIm9uU2VsZWN0IiwicHJvbXB0IiwiX2lkIiwicmVwbGFjZSIsImFsZXJ0IiwiY2hhbmdlTmFtZSIsImNoYW5nZVVOYW1lIiwicmVmTmFtZSIsInJlZlVuYW1lIiwidGFyZ2V0Iiwia2V5Q29kZSIsInRyaW0iLCJlIiwiYXBpS2V5IiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiQ3JlYXRvciIsImEiLCJsYWJlbCIsImdldFZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsUUFBTSxFQUFaO0FBQ08sSUFBTUMsMEJBQU8sUUFBYjtBQUNBLElBQU1DLDBCQUFPO0FBQ25CQyxTQUFRLGdCQUFDQyxJQUFELEVBQU9DLEtBQVAsRUFBZTtBQUN0QixNQUFJQyxrQkFBSjtBQUFBLE1BQWVDLG1CQUFmO0FBQ0EsTUFBRyxDQUFDSCxJQUFKLEVBQ0NFLFlBQVUsa0JBQVY7QUFDRCxNQUFHQSxTQUFILEVBQWE7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TSxFQUVMLEVBQUNBLFFBQU8sTUFBUixFQUFnQm9CLE9BQU0sSUFBdEIsRUFBNEJuQixNQUFLLG1EQUFqQztBQUNDQyxjQUFTO0FBQUEsWUFBRy9CLFNBQVNOLE9BQU9DLE1BQVAsQ0FBYzJDLFFBQVFZLFFBQVIsRUFBZCxFQUFpQ1gsU0FBU1csUUFBVCxFQUFqQyxDQUFULEVBQ1g3QyxJQURXLENBQ047QUFBQSxVQUFFVCxJQUFGLFVBQUVBLElBQUY7QUFBQSxhQUFVNEIsT0FBT1UsT0FBUCxXQUF1QnRDLElBQXZCLENBQVY7QUFBQSxNQURNLENBQUg7QUFBQTtBQURWLElBRks7QUFEUjtBQVZELEVBREQ7QUFzQkEsQ0F4Qk07QUF5QlBtRCxRQUFRRixZQUFSLEdBQXFCLEVBQUNyQixRQUFRLGlCQUFVc0IsTUFBbkIsRUFBckI7O2tCQUVlLHNCQUFjekIsR0FBZCxFQUFrQixFQUFDNUIsY0FBRCxFQUFTQyxjQUFULEVBQWlCeUIsZ0JBQWpCLEVBQWxCLEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IERvd25sb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLWRvd25sb2FkXCJcbmltcG9ydCBTYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBSZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCJcblxuaW1wb3J0IHtVSX0gZnJvbSBcIi5cIlxuXG5pbXBvcnQgZGJBcHBsaWNhdGlvbiBmcm9tIFwiLi9kYi9hcHBcIlxuXG5jb25zdCBFTlRFUj0xM1xuZXhwb3J0IGNvbnN0IERPTUFJTj1cInVpLmFwcFwiXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0Q1JFQVRFOiAobmFtZSwgdW5hbWUpPT57XG5cdFx0bGV0IG5hbWVFcnJvciwgdW5hbWVFcnJvclxuXHRcdGlmKCFuYW1lKVxuXHRcdFx0bmFtZUVycm9yPVwibmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYobmFtZUVycm9yKXtcblx0XHRcdHJldHVybiBkaXNwYXRjaD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZXJyb3JgLCBwYXlsb2FkOntuYW1lRXJyb3J9fSlcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZGlzcGF0Y2g9PmRiQXBwbGljYXRpb24udXBzZXJ0KHtuYW1lLHVuYW1lfSlcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGB9KVxuXHRcdFx0XHRyZXR1cm4gZGJBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxuXHRcdFx0fSlcblx0fVxuXHQsQ0hBTkdFOiAoa2V5LHZhbHVlKT0+e1xuXHRcdGNvbnN0IGFwcD1kYkFwcGxpY2F0aW9uLmN1cnJlbnRcblx0XHRhcHBba2V5XT12YWx1ZVxuXHRcdHJldHVybiBkaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi51cHNlcnQoYXBwKVxuXHRcdFx0LnRoZW4oYXBwPT57XG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGRhdGVkYH0pXG5cdFx0XHRcdHJldHVybiBkYkFwcGxpY2F0aW9uLmN1cnJlbnQ9YXBwXG5cdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGlkPT5kaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi5yZW1vdmUoaWQpLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3JlbW92ZWRgfSkpXG5cblx0LFVQTE9BRDogYT0+ZGlzcGxhdGNoPT5VSS5maWxlU2VsZWN0b3Iuc2VsZWN0KClcblx0XHRcdC50aGVuKGFwcD0+ZGJBcHBsaWNhdGlvbi51cGxvYWQoYXBwKSlcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vdXBsb2FkZWRgfSlcblx0XHRcdFx0cmV0dXJuIGRiQXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRcdH0pXG59XG5jb25zdCBJTklUX1NUQVRFPXt9XG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSwgcGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vZXJyb3JgOlxuXHRcdHJldHVybiBwYXlsb2FkXG5cdGNhc2UgYEBAJHtET01BSU59L3VwbG9hZGVkYDpcblx0Y2FzZSBgQEAke0RPTUFJTn0vcmVtb3ZlZGA6XG5cdGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS91cGRhdGVkYDpcblx0XHRyZXR1cm4gSU5JVF9TVEFURVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuXHRcdGlmKG5leHQubmFtZSE9dGhpcy5wcm9wcy5uYW1lICYmIG5leHQubmFtZSE9ZGJBcHBsaWNhdGlvbi5jdXJyZW50Lm5hbWUpXG5cdFx0XHRkYkFwcGxpY2F0aW9uLmN1cnJlbnQ9bmV4dC5uYW1lXG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2FwcCwgZGlzcGF0Y2gsIG5hbWVFcnJvciwgdW5hbWVFcnJvcn09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCByZW1vdmFibGU9ZGJBcHBsaWNhdGlvbi5pc1JlbW92YWJsZShhcHApXG5cdFx0bGV0IGNvbW1hbmRCYXJcblx0XHRpZihyZW1vdmFibGUpXG5cdFx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgcHJpbWFyeT1cIlVwbG9hZFwiXG5cdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxuXG5cdFx0XHRcdFx0XHQse2FjdGlvbjpcIlVwbG9hZFwiXG5cdFx0XHRcdFx0XHRcdCxpY29uOjxVcGxvYWQvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRCgpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJSZW1vdmVcIlxuXHRcdFx0XHRcdFx0XHQsaWNvbjo8UmVtb3ZlLz5cblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9Pntcblx0XHRcdFx0XHRcdFx0XHRsZXQgbmFtZT1wcm9tcHQoXCJQbGVhc2UgbWFrZSBzdXJlIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZyBieSBnaXZpbmcgdGhpcyBhcHAgbmFtZVwiKVxuXHRcdFx0XHRcdFx0XHRcdGlmKG5hbWU9PWFwcC5uYW1lKXtcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5SRU1PVkUoYXBwLl9pZCkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9PnJvdXRlci5yZXBsYWNlKFwiL1wiKSlcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0YWxlcnQoXCJuYW1lIGlzIG5vdCBjb3JyZWN0XCIpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdfVxuXHRcdFx0XHQvPilcblx0XHRlbHNlXG5cdFx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifV19Lz4pXG5cblx0XHRjb25zdCBjaGFuZ2VOYW1lPXZhbHVlPT52YWx1ZSE9YXBwLm5hbWUgJiYgZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcIm5hbWVcIix2YWx1ZSkpLnRoZW4oKHtuYW1lfSk9PnJvdXRlci5yZXBsYWNlKGBhcHAvJHtuYW1lfWApKVxuXHRcdGNvbnN0IGNoYW5nZVVOYW1lPXZhbHVlPT52YWx1ZSE9YXBwLnVuYW1lICYmIGRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJ1bmFtZVwiLHZhbHVlKSlcblx0XHRsZXQgcmVmTmFtZSwgcmVmVW5hbWVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZOYW1lfVxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHRcdHZhbHVlPXthcHAubmFtZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZOYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PUVOVEVSICYmIGNoYW5nZU5hbWUodmFsdWUudHJpbSgpKX1cblx0XHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+Y2hhbmdlTmFtZSh2YWx1ZS50cmltKCkpfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlVuYW1lfVxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyFyZW1vdmFibGV9XG5cdFx0XHRcdFx0dmFsdWU9e2FwcC51bmFtZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VuYW1lRXJyb3J9XG5cdFx0XHRcdFx0b25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+cmVmVW5hbWUudmFsdWU9dmFsdWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT5lLmtleUNvZGU9PUVOVEVSICYmIGNoYW5nZVVOYW1lKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSl9XG5cdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZVVOYW1lKHZhbHVlLnRyaW0oKSl9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkXG5cdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJBUEkga2V5OiB2YWx1ZSBvZiBodHRwIGhlYWRlciAneC1hcHBsaWNhdGlvbi1pZCdcIlxuXHRcdFx0XHRcdGRpc2FibGVkPXt0cnVlfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHR2YWx1ZT17YXBwLmFwaUtleX0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGRcblx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIndlY2hhdCB1cmw6IHVzZSBpdCB0byBhY2NlcHQgbWVzc2FnZSBmcm9tIHdlY2hhdFwiXG5cdFx0XHRcdFx0ZGlzYWJsZWQ9e3RydWV9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdHZhbHVlPXthcHAuYXBpS2V5ID8gYGh0dHA6Ly9xaWxpMi5jb20vMS8ke2FwcC5hcGlLZXl9L3dlY2hhdGAgOiBcIlwifS8+XG5cblx0XHRcdFx0e2NvbW1hbmRCYXJ9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuQXBwLmNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxuXG5leHBvcnQgY29uc3QgQ3JlYXRvcj0oe2Rpc3BhdGNoLCBuYW1lRXJyb3J9LHtyb3V0ZXJ9KT0+e1xuXHRsZXQgcmVmTmFtZSxyZWZVbmFtZVxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJhcHBsaWNhdGlvbiBuYW1lXCJcblx0XHRcdFx0ZXJyb3JUZXh0PXtuYW1lRXJyb3J9XG5cdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmVW5hbWU9YX1cblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJnbG9iYWwgdW5pcXVlIHByb2R1Y3QgbmFtZTogYXBwLnFpbGkyLmNvbS97cHJvdWN0TmFtZX1cIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0PFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn1cblx0XHRcdFx0XHQse2FjdGlvbjpcIlNhdmVcIiwgbGFiZWw6XCLkv53lrZhcIiwgaWNvbjo8U2F2ZS8+XG5cdFx0XHRcdFx0XHQsb25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURShyZWZOYW1lLmdldFZhbHVlKCkscmVmVW5hbWUuZ2V0VmFsdWUoKSkpXG5cdFx0XHRcdFx0XHRcdC50aGVuKCh7bmFtZX0pPT5yb3V0ZXIucmVwbGFjZShgL2FwcC8ke25hbWV9YCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfVxuXHRcdFx0XHQvPlxuXHRcdDwvZGl2PlxuXHQpXG59XG5DcmVhdG9yLmNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEFwcCx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxuIl19