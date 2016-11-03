"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.App = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	var type = _ref.type;
	var payload = _ref.payload;

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
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {
			if (next.name != this.props.name && next.name != _app2.default.current.name) _app2.default.current = next.name;
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props;
			var app = _props.app;
			var dispatch = _props.dispatch;
			var nameError = _props.nameError;
			var unameError = _props.unameError;
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
					onKeyDown: function onKeyDown(e) {
						return e.keyCode == ENTER && changeName(e.target.value.trim());
					},
					onBlur: function onBlur(_ref4) {
						var value = _ref4.target.value;
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
					onChange: function onChange(_ref5) {
						var value = _ref5.target.value;
						return refUname.value = value;
					},
					onKeyDown: function onKeyDown(e) {
						return e.keyCode == ENTER && changeUName(e.target.value.trim());
					},
					onBlur: function onBlur(_ref6) {
						var value = _ref6.target.value;
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

var Creator = exports.Creator = function Creator(_ref7, _ref8) {
	var dispatch = _ref7.dispatch;
	var nameError = _ref7.nameError;
	var router = _ref8.router;

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
					return dispatch(ACTION.CREATE(refName.getValue(), refUname.getValue())).then(function (_ref9) {
						var name = _ref9.name;
						return router.replace("/app/" + name);
					});
				}
			}]
		})
	);
};
Creator.contextTypes = { router: _react.PropTypes.object };

exports.default = Object.assign(App, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJET01BSU4iLCJBQ1RJT04iLCJDUkVBVEUiLCJuYW1lIiwidW5hbWUiLCJuYW1lRXJyb3IiLCJ1bmFtZUVycm9yIiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsIlByb21pc2UiLCJyZWplY3QiLCJ1cHNlcnQiLCJ0aGVuIiwiY3VycmVudCIsImFwcCIsIkNIQU5HRSIsImtleSIsInZhbHVlIiwiUkVNT1ZFIiwicmVtb3ZlIiwiaWQiLCJVUExPQUQiLCJmaWxlU2VsZWN0b3IiLCJzZWxlY3QiLCJ1cGxvYWQiLCJJTklUX1NUQVRFIiwiUkVEVUNFUiIsInN0YXRlIiwiQXBwIiwibmV4dCIsInByb3BzIiwicm91dGVyIiwiY29udGV4dCIsInJlbW92YWJsZSIsImlzUmVtb3ZhYmxlIiwiY29tbWFuZEJhciIsImFjdGlvbiIsImljb24iLCJvblNlbGVjdCIsInByb21wdCIsIl9pZCIsInJlcGxhY2UiLCJhbGVydCIsImNoYW5nZU5hbWUiLCJjaGFuZ2VVTmFtZSIsInJlZk5hbWUiLCJyZWZVbmFtZSIsInRhcmdldCIsImUiLCJrZXlDb2RlIiwidHJpbSIsImFwaUtleSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIkNyZWF0b3IiLCJhIiwibGFiZWwiLCJnZXRWYWx1ZSIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFNLEVBQVo7QUFDTyxJQUFNQywwQkFBTyxRQUFiO0FBQ0EsSUFBTUMsMEJBQU87QUFDbkJDLFNBQVEsZ0JBQUNDLElBQUQsRUFBT0MsS0FBUCxFQUFlO0FBQ3RCLE1BQUlDLGtCQUFKO0FBQUEsTUFBZUMsbUJBQWY7QUFDQSxNQUFHLENBQUNILElBQUosRUFDQ0UsWUFBVSxrQkFBVjtBQUNELE1B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RUFBZ0JvQixPQUFNLElBQXRCLEVBQTRCbkIsTUFBSyxtREFBakM7QUFDQ0MsY0FBUztBQUFBLFlBQUdoQyxTQUFTTixPQUFPQyxNQUFQLENBQWM0QyxRQUFRWSxRQUFSLEVBQWQsRUFBaUNYLFNBQVNXLFFBQVQsRUFBakMsQ0FBVCxFQUNYN0MsSUFEVyxDQUNOO0FBQUEsVUFBRVYsSUFBRixTQUFFQSxJQUFGO0FBQUEsYUFBVTZCLE9BQU9VLE9BQVAsV0FBdUJ2QyxJQUF2QixDQUFWO0FBQUEsTUFETSxDQUFIO0FBQUE7QUFEVixJQUZLO0FBRFI7QUFWRCxFQUREO0FBc0JBLENBeEJNO0FBeUJQb0QsUUFBUUYsWUFBUixHQUFxQixFQUFDckIsUUFBUSxpQkFBVXNCLE1BQW5CLEVBQXJCOztrQkFFZUssT0FBT0MsTUFBUCxDQUFjL0IsR0FBZCxFQUFrQixFQUFDN0IsY0FBRCxFQUFTQyxjQUFULEVBQWlCMEIsZ0JBQWpCLEVBQWxCLEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IERvd25sb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLWRvd25sb2FkXCJcbmltcG9ydCBTYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBSZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCJcblxuaW1wb3J0IHtVSX0gZnJvbSBcIi5cIlxuXG5pbXBvcnQgZGJBcHBsaWNhdGlvbiBmcm9tIFwiLi9kYi9hcHBcIlxuXG5jb25zdCBFTlRFUj0xM1xuZXhwb3J0IGNvbnN0IERPTUFJTj1cInVpLmFwcFwiXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0Q1JFQVRFOiAobmFtZSwgdW5hbWUpPT57XG5cdFx0bGV0IG5hbWVFcnJvciwgdW5hbWVFcnJvclxuXHRcdGlmKCFuYW1lKVxuXHRcdFx0bmFtZUVycm9yPVwibmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYobmFtZUVycm9yKXtcblx0XHRcdHJldHVybiBkaXNwYXRjaD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZXJyb3JgLCBwYXlsb2FkOntuYW1lRXJyb3J9fSlcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZGlzcGF0Y2g9PmRiQXBwbGljYXRpb24udXBzZXJ0KHtuYW1lLHVuYW1lfSlcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGB9KVxuXHRcdFx0XHRyZXR1cm4gZGJBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxuXHRcdFx0fSlcblx0fVxuXHQsQ0hBTkdFOiAoa2V5LHZhbHVlKT0+e1xuXHRcdGNvbnN0IGFwcD1kYkFwcGxpY2F0aW9uLmN1cnJlbnRcblx0XHRhcHBba2V5XT12YWx1ZVxuXHRcdHJldHVybiBkaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi51cHNlcnQoYXBwKVxuXHRcdFx0LnRoZW4oYXBwPT57XG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGRhdGVkYH0pXG5cdFx0XHRcdHJldHVybiBkYkFwcGxpY2F0aW9uLmN1cnJlbnQ9YXBwXG5cdFx0XHR9KVxuXHR9XG5cdCxSRU1PVkU6IGlkPT5kaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi5yZW1vdmUoaWQpLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3JlbW92ZWRgfSkpXG5cblx0LFVQTE9BRDogYT0+ZGlzcGxhdGNoPT5VSS5maWxlU2VsZWN0b3Iuc2VsZWN0KClcblx0XHRcdC50aGVuKGFwcD0+ZGJBcHBsaWNhdGlvbi51cGxvYWQoYXBwKSlcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vdXBsb2FkZWRgfSlcblx0XHRcdFx0cmV0dXJuIGRiQXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRcdH0pXG59XG5jb25zdCBJTklUX1NUQVRFPXt9XG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSwgcGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vZXJyb3JgOlxuXHRcdHJldHVybiBwYXlsb2FkXG5cdGNhc2UgYEBAJHtET01BSU59L3VwbG9hZGVkYDpcblx0Y2FzZSBgQEAke0RPTUFJTn0vcmVtb3ZlZGA6XG5cdGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxuXHRjYXNlIGBAQCR7RE9NQUlOfS91cGRhdGVkYDpcblx0XHRyZXR1cm4gSU5JVF9TVEFURVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuXHRcdGlmKG5leHQubmFtZSE9dGhpcy5wcm9wcy5uYW1lICYmIG5leHQubmFtZSE9ZGJBcHBsaWNhdGlvbi5jdXJyZW50Lm5hbWUpXG5cdFx0XHRkYkFwcGxpY2F0aW9uLmN1cnJlbnQ9bmV4dC5uYW1lXG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2FwcCwgZGlzcGF0Y2gsIG5hbWVFcnJvciwgdW5hbWVFcnJvcn09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCByZW1vdmFibGU9ZGJBcHBsaWNhdGlvbi5pc1JlbW92YWJsZShhcHApXG5cdFx0bGV0IGNvbW1hbmRCYXJcblx0XHRpZihyZW1vdmFibGUpXG5cdFx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgcHJpbWFyeT1cIlVwbG9hZFwiXG5cdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxuXG5cdFx0XHRcdFx0XHQse2FjdGlvbjpcIlVwbG9hZFwiXG5cdFx0XHRcdFx0XHRcdCxpY29uOjxVcGxvYWQvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRCgpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJSZW1vdmVcIlxuXHRcdFx0XHRcdFx0XHQsaWNvbjo8UmVtb3ZlLz5cblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9Pntcblx0XHRcdFx0XHRcdFx0XHRsZXQgbmFtZT1wcm9tcHQoXCJQbGVhc2UgbWFrZSBzdXJlIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZyBieSBnaXZpbmcgdGhpcyBhcHAgbmFtZVwiKVxuXHRcdFx0XHRcdFx0XHRcdGlmKG5hbWU9PWFwcC5uYW1lKXtcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5SRU1PVkUoYXBwLl9pZCkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9PnJvdXRlci5yZXBsYWNlKFwiL1wiKSlcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0YWxlcnQoXCJuYW1lIGlzIG5vdCBjb3JyZWN0XCIpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdfVxuXHRcdFx0XHQvPilcblx0XHRlbHNlXG5cdFx0XHRjb21tYW5kQmFyPSg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifV19Lz4pXG5cblx0XHRjb25zdCBjaGFuZ2VOYW1lPXZhbHVlPT52YWx1ZSE9YXBwLm5hbWUgJiYgZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcIm5hbWVcIix2YWx1ZSkpLnRoZW4oKHtuYW1lfSk9PnJvdXRlci5yZXBsYWNlKGBhcHAvJHtuYW1lfWApKVxuXHRcdGNvbnN0IGNoYW5nZVVOYW1lPXZhbHVlPT52YWx1ZSE9YXBwLnVuYW1lICYmIGRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJ1bmFtZVwiLHZhbHVlKSlcblx0XHRsZXQgcmVmTmFtZSwgcmVmVW5hbWVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZOYW1lfVxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHRcdHZhbHVlPXthcHAubmFtZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZOYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+ZS5rZXlDb2RlPT1FTlRFUiAmJiBjaGFuZ2VOYW1lKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSl9XG5cdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZU5hbWUodmFsdWUudHJpbSgpKX0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVbmFtZX1cblx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHRcdHZhbHVlPXthcHAudW5hbWV9XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXt1bmFtZUVycm9yfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZlVuYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+ZS5rZXlDb2RlPT1FTlRFUiAmJiBjaGFuZ2VVTmFtZShlLnRhcmdldC52YWx1ZS50cmltKCkpfVxuXHRcdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5jaGFuZ2VVTmFtZSh2YWx1ZS50cmltKCkpfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZFxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcblx0XHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0dmFsdWU9e2FwcC5hcGlLZXl9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkXG5cdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuXHRcdFx0XHRcdGRpc2FibGVkPXt0cnVlfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHR2YWx1ZT17YXBwLmFwaUtleSA/IGBodHRwOi8vcWlsaTIuY29tLzEvJHthcHAuYXBpS2V5fS93ZWNoYXRgIDogXCJcIn0vPlxuXG5cdFx0XHRcdHtjb21tYW5kQmFyfVxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cbkFwcC5jb250ZXh0VHlwZXM9e3JvdXRlcjogUHJvcFR5cGVzLm9iamVjdH1cblxuZXhwb3J0IGNvbnN0IENyZWF0b3I9KHtkaXNwYXRjaCwgbmFtZUVycm9yfSx7cm91dGVyfSk9Pntcblx0bGV0IHJlZk5hbWUscmVmVW5hbWVcblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZOYW1lPWF9XG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG5cdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlVuYW1lPWF9XG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcblx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cdFx0XHRcdFx0LHthY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIGljb246PFNhdmUvPlxuXHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUocmVmTmFtZS5nZXRWYWx1ZSgpLHJlZlVuYW1lLmdldFZhbHVlKCkpKVxuXHRcdFx0XHRcdFx0XHQudGhlbigoe25hbWV9KT0+cm91dGVyLnJlcGxhY2UoYC9hcHAvJHtuYW1lfWApKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XX1cblx0XHRcdFx0Lz5cblx0XHQ8L2Rpdj5cblx0KVxufVxuQ3JlYXRvci5jb250ZXh0VHlwZXM9e3JvdXRlcjogUHJvcFR5cGVzLm9iamVjdH1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihBcHAse0RPTUFJTiwgQUNUSU9OLCBSRURVQ0VSfSlcbiJdfQ==