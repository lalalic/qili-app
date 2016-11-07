"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.App = exports.ACTION = exports.DOMAIN = undefined;

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

var _main = require("./main");

var _selector = require("./selector");

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENTER = 13;
var DOMAIN = exports.DOMAIN = "ui.app";
var ACTION = exports.ACTION = {
	CREATE: function CREATE(name, uname) {
		return function (dispatch) {
			var nameError = void 0,
			    unameError = void 0;
			if (!name) nameError = "name is required";
			if (nameError) {
				return _promise2.default.reject(nameError);
			}

			return _app2.default.upsert({ name: name, uname: uname }).then(function (app) {
				dispatch(_main.ACTION.SET_CURRENT_APP(app));
				return app;
			});
		};
	},
	CHANGE: function CHANGE(key, value) {
		return function (dispatch, getState) {
			var app = (0, _selector.getCurrentApp)(getState());
			app[key] = value;
			return function (dispatch) {
				return _app2.default.upsert(app);
			};
		};
	},
	REMOVE: function REMOVE(id) {
		return function (dispatch) {
			return _app2.default.remove(id);
		};
	},

	UPLOAD: function UPLOAD(a) {
		return function (displatch) {
			return _.UI.fileSelector.select().then(function (app) {
				return _app2.default.upload(app);
			}).then(function (app) {
				dispatch(_main.ACTION.SET_CURRENT_APP(app));
				return app;
			});
		};
	}
};

var App = exports.App = function (_Component) {
	(0, _inherits3.default)(App, _Component);

	function App() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = App.__proto__ || (0, _getPrototypeOf2.default)(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = { nameError: null, unameError: null }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(App, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var name = _props.name;
			var uname = _props.uname;
			var apiKey = _props.apiKey;
			var dispatch = _props.dispatch;
			var _state = this.state;
			var nameError = _state.nameError;
			var unameError = _state.unameError;
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
						var removing = prompt("Please make sure you know what you are doing by giving this app name");
						if (removing == name) {
							dispatch(ACTION.REMOVE()).then(function (a) {
								return router.replace("/");
							});
						} else alert("name is not correct");
					}
				}]
			});else commandBar = _react2.default.createElement(_.UI.CommandBar, { className: "footbar", items: [{ action: "Back" }] });

			var changeName = function changeName(value) {
				return value != app.name && dispatch(ACTION.CHANGE("name", value)).then(function (a) {
					return _this2.setState({ nameError: null });
				}, function (error) {
					return _this2.setState(error);
				});
			};
			var changeUName = function changeUName(value) {
				return value != app.uname && dispatch(ACTION.CHANGE("uname", value)).then(function (a) {
					return _this2.setState({ unameError: null });
				}, function (error) {
					return _this2.setState(error);
				});
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
					value: name,
					errorText: nameError,
					onChange: function onChange(_ref2) {
						var value = _ref2.target.value;
						return refName.value = value;
					},
					onKeyDown: function onKeyDown(_ref3) {
						var value = _ref3.target.value;
						var keyCode = _ref3.keyCode;
						return keyCode == ENTER && changeName(value.trim());
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
					value: uname,
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
					value: apiKey }),
				_react2.default.createElement(_materialUi.TextField, {
					floatingLabelText: "wechat url: use it to accept message from wechat",
					disabled: true,
					fullWidth: true,
					value: "http://qili2.com/1/" + apiKey + "/wechat" }),
				commandBar
			);
		}
	}]);
	return App;
}(_react.Component);

App.contextTypes = { router: _react.PropTypes.object };

var Creator = exports.Creator = function (_Component2) {
	(0, _inherits3.default)(Creator, _Component2);

	function Creator() {
		var _ref7;

		var _temp2, _this3, _ret2;

		(0, _classCallCheck3.default)(this, Creator);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref7 = Creator.__proto__ || (0, _getPrototypeOf2.default)(Creator)).call.apply(_ref7, [this].concat(args))), _this3), _this3.state = { error: null }, _temp2), (0, _possibleConstructorReturn3.default)(_this3, _ret2);
	}

	(0, _createClass3.default)(Creator, [{
		key: "render",
		value: function render() {
			var _this4 = this;

			var dispatch = this.props.dispatch;
			var error = this.state.error;
			var router = this.context.router;

			var refName = void 0,
			    refUname = void 0;
			return _react2.default.createElement(
				"div",
				{ className: "form" },
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return refName = a;
					},
					floatingLabelText: "application name",
					errorText: error,
					fullWidth: true }),
				_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
						return refUname = a;
					},
					floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
					fullWidth: true }),
				_react2.default.createElement(_.UI.CommandBar, { className: "footbar",
					items: [{ action: "Back" }, { action: "Save", label: "保存", icon: _react2.default.createElement(_save2.default, null),
						onSelect: function onSelect(a) {
							return dispatch(ACTION.CREATE(refName.getValue(), refUname.getValue())).then(function (_ref8) {
								var _id = _ref8._id;
								return router.replace("/app/" + _id);
							}, function (error) {
								return _this4.setState({ error: error });
							});
						}
					}]
				})
			);
		}
	}]);
	return Creator;
}(_react.Component);

Creator.contextTypes = { router: _react.PropTypes.object };
exports.default = (0, _assign2.default)(App, { DOMAIN: DOMAIN, ACTION: ACTION });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJET01BSU4iLCJBQ1RJT04iLCJDUkVBVEUiLCJuYW1lIiwidW5hbWUiLCJuYW1lRXJyb3IiLCJ1bmFtZUVycm9yIiwicmVqZWN0IiwidXBzZXJ0IiwidGhlbiIsImRpc3BhdGNoIiwiU0VUX0NVUlJFTlRfQVBQIiwiYXBwIiwiQ0hBTkdFIiwia2V5IiwidmFsdWUiLCJnZXRTdGF0ZSIsIlJFTU9WRSIsInJlbW92ZSIsImlkIiwiVVBMT0FEIiwiZmlsZVNlbGVjdG9yIiwic2VsZWN0IiwidXBsb2FkIiwiQXBwIiwic3RhdGUiLCJwcm9wcyIsImFwaUtleSIsInJvdXRlciIsImNvbnRleHQiLCJyZW1vdmFibGUiLCJpc1JlbW92YWJsZSIsImNvbW1hbmRCYXIiLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJyZW1vdmluZyIsInByb21wdCIsInJlcGxhY2UiLCJhbGVydCIsImNoYW5nZU5hbWUiLCJzZXRTdGF0ZSIsImVycm9yIiwiY2hhbmdlVU5hbWUiLCJyZWZOYW1lIiwicmVmVW5hbWUiLCJ0YXJnZXQiLCJrZXlDb2RlIiwidHJpbSIsImUiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJDcmVhdG9yIiwiYSIsImxhYmVsIiwiZ2V0VmFsdWUiLCJfaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7QUFFQSxJQUFNQSxRQUFNLEVBQVo7QUFDTyxJQUFNQywwQkFBTyxRQUFiO0FBQ0EsSUFBTUMsMEJBQU87QUFDbkJDLFNBQVEsZ0JBQUNDLElBQUQsRUFBT0MsS0FBUDtBQUFBLFNBQWUsb0JBQVU7QUFDaEMsT0FBSUMsa0JBQUo7QUFBQSxPQUFlQyxtQkFBZjtBQUNBLE9BQUcsQ0FBQ0gsSUFBSixFQUNDRSxZQUFVLGtC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QUFRLGlCQUFVdUIsTUFBbkIsRTtrQkFHTixzQkFBYzNCLEdBQWQsRUFBa0IsRUFBQ3hCLGNBQUQsRUFBU0MsY0FBVCxFQUFsQixDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBEb3dubG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS1kb3dubG9hZFwiXG5pbXBvcnQgU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5pbXBvcnQgUmVtb3ZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RlbGV0ZVwiXG5cbmltcG9ydCB7VUl9IGZyb20gXCIuXCJcbmltcG9ydCB7QUNUSU9OIGFzIHFpbGlBQ1RJT059IGZyb20gXCIuL21haW5cIlxuaW1wb3J0IHtnZXRDdXJyZW50QXBwfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmltcG9ydCBkYkFwcGxpY2F0aW9uIGZyb20gXCIuL2RiL2FwcFwiXG5cbmNvbnN0IEVOVEVSPTEzXG5leHBvcnQgY29uc3QgRE9NQUlOPVwidWkuYXBwXCJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRDUkVBVEU6IChuYW1lLCB1bmFtZSk9PmRpc3BhdGNoPT57XG5cdFx0bGV0IG5hbWVFcnJvciwgdW5hbWVFcnJvclxuXHRcdGlmKCFuYW1lKVxuXHRcdFx0bmFtZUVycm9yPVwibmFtZSBpcyByZXF1aXJlZFwiXG5cdFx0aWYobmFtZUVycm9yKXtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuYW1lRXJyb3IpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRiQXBwbGljYXRpb24udXBzZXJ0KHtuYW1lLHVuYW1lfSlcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaChxaWxpQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChhcHApKVxuXHRcdFx0XHRyZXR1cm4gYXBwXG5cdFx0XHR9KVxuXHR9XG5cdCxDSEFOR0U6IChrZXksdmFsdWUpPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3QgYXBwPWdldEN1cnJlbnRBcHAoZ2V0U3RhdGUoKSlcblx0XHRhcHBba2V5XT12YWx1ZVxuXHRcdHJldHVybiBkaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi51cHNlcnQoYXBwKVxuXHR9XG5cdCxSRU1PVkU6IGlkPT5kaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi5yZW1vdmUoaWQpXG5cblx0LFVQTE9BRDogYT0+ZGlzcGxhdGNoPT5VSS5maWxlU2VsZWN0b3Iuc2VsZWN0KClcblx0XHRcdC50aGVuKGFwcD0+ZGJBcHBsaWNhdGlvbi51cGxvYWQoYXBwKSlcblx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRkaXNwYXRjaChxaWxpQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChhcHApKVxuXHRcdFx0XHRyZXR1cm4gYXBwXG5cdFx0XHR9KVxufVxuXG5leHBvcnQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17bmFtZUVycm9yOm51bGwsIHVuYW1lRXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWUsdW5hbWUsYXBpS2V5LCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtuYW1lRXJyb3IsIHVuYW1lRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRsZXQgcmVtb3ZhYmxlPWRiQXBwbGljYXRpb24uaXNSZW1vdmFibGUoYXBwKVxuXHRcdGxldCBjb21tYW5kQmFyXG5cdFx0aWYocmVtb3ZhYmxlKVxuXHRcdFx0Y29tbWFuZEJhcj0oPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHByaW1hcnk9XCJVcGxvYWRcIlxuXHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn1cblxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJVcGxvYWRcIlxuXHRcdFx0XHRcdFx0XHQsaWNvbjo8VXBsb2FkLz5cblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUExPQUQoKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCx7YWN0aW9uOlwiUmVtb3ZlXCJcblx0XHRcdFx0XHRcdFx0LGljb246PFJlbW92ZS8+XG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT57XG5cdFx0XHRcdFx0XHRcdFx0bGV0IHJlbW92aW5nPXByb21wdChcIlBsZWFzZSBtYWtlIHN1cmUgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nIGJ5IGdpdmluZyB0aGlzIGFwcCBuYW1lXCIpXG5cdFx0XHRcdFx0XHRcdFx0aWYocmVtb3Zpbmc9PW5hbWUpe1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlJFTU9WRSgpKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbihhPT5yb3V0ZXIucmVwbGFjZShcIi9cIikpXG5cdFx0XHRcdFx0XHRcdFx0fWVsc2Vcblx0XHRcdFx0XHRcdFx0XHRcdGFsZXJ0KFwibmFtZSBpcyBub3QgY29ycmVjdFwiKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XX1cblx0XHRcdFx0Lz4pXG5cdFx0ZWxzZVxuXHRcdFx0Y29tbWFuZEJhcj0oPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn1dfS8+KVxuXG5cdFx0Y29uc3QgY2hhbmdlTmFtZT12YWx1ZT0+dmFsdWUhPWFwcC5uYW1lICYmIGRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJuYW1lXCIsdmFsdWUpKVxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOm51bGx9KSxlcnJvcj0+dGhpcy5zZXRTdGF0ZShlcnJvcikpXG5cdFx0Y29uc3QgY2hhbmdlVU5hbWU9dmFsdWU9PnZhbHVlIT1hcHAudW5hbWUgJiYgZGlzcGF0Y2goQUNUSU9OLkNIQU5HRShcInVuYW1lXCIsdmFsdWUpKVxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7dW5hbWVFcnJvcjpudWxsfSksZXJyb3I9PnRoaXMuc2V0U3RhdGUoZXJyb3IpKVxuXHRcdGxldCByZWZOYW1lLCByZWZVbmFtZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZk5hbWV9XG5cdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJhcHBsaWNhdGlvbiBuYW1lXCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyFyZW1vdmFibGV9XG5cdFx0XHRcdFx0dmFsdWU9e25hbWV9XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtuYW1lRXJyb3J9XG5cdFx0XHRcdFx0b25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+cmVmTmFtZS52YWx1ZT12YWx1ZX1cblx0XHRcdFx0XHRvbktleURvd249eyh7dGFyZ2V0Ont2YWx1ZX0sa2V5Q29kZX0pPT5rZXlDb2RlPT1FTlRFUiAmJiBjaGFuZ2VOYW1lKHZhbHVlLnRyaW0oKSl9XG5cdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZU5hbWUodmFsdWUudHJpbSgpKX0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVbmFtZX1cblx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHRcdHZhbHVlPXt1bmFtZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e3VuYW1lRXJyb3J9XG5cdFx0XHRcdFx0b25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+cmVmVW5hbWUudmFsdWU9dmFsdWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT5lLmtleUNvZGU9PUVOVEVSICYmIGNoYW5nZVVOYW1lKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSl9XG5cdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZVVOYW1lKHZhbHVlLnRyaW0oKSl9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkXG5cdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJBUEkga2V5OiB2YWx1ZSBvZiBodHRwIGhlYWRlciAneC1hcHBsaWNhdGlvbi1pZCdcIlxuXHRcdFx0XHRcdGRpc2FibGVkPXt0cnVlfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHR2YWx1ZT17YXBpS2V5fS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZFxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwid2VjaGF0IHVybDogdXNlIGl0IHRvIGFjY2VwdCBtZXNzYWdlIGZyb20gd2VjaGF0XCJcblx0XHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0dmFsdWU9e2BodHRwOi8vcWlsaTIuY29tLzEvJHthcGlLZXl9L3dlY2hhdGB9Lz5cblxuXHRcdFx0XHR7Y29tbWFuZEJhcn1cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBjbGFzcyBDcmVhdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17ZXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge2Vycm9yfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cdFx0bGV0IHJlZk5hbWUscmVmVW5hbWVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZOYW1lPWF9XG5cdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJhcHBsaWNhdGlvbiBuYW1lXCJcblx0XHRcdFx0XHRlcnJvclRleHQ9e2Vycm9yfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZVbmFtZT1hfVxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn1cblx0XHRcdFx0XHRcdCx7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBpY29uOjxTYXZlLz5cblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUocmVmTmFtZS5nZXRWYWx1ZSgpLHJlZlVuYW1lLmdldFZhbHVlKCkpKVxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKCh7X2lkfSk9PnJvdXRlci5yZXBsYWNlKGAvYXBwLyR7X2lkfWApLCBlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7ZXJyb3J9KSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEFwcCx7RE9NQUlOLCBBQ1RJT059KVxuIl19