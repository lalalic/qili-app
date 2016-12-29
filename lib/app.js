"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.App = exports.ACTION = undefined;

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

var _normalizr = require("normalizr");

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
var TextFieldx = _.UI.TextFieldx,
    CommandBar = _.UI.CommandBar,
    fileSelector = _.UI.fileSelector;
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
				dispatch((0, _.ENTITIES)((0, _normalizr.normalize)(app, _app2.default.schema).entities));
				dispatch(_main.ACTION.SET_CURRENT_APP(app));
				return app;
			});
		};
	},
	CHANGE: function CHANGE(key, value) {
		return function (dispatch, getState) {
			if (key == "name" && !value) return _promise2.default.reject("name is required");
			var state = getState();
			var app = (0, _selector.getCurrentApp)(state);
			app[key] = value;
			return _app2.default.upsert(app).then(function (app) {
				return dispatch((0, _.ENTITIES)((0, _normalizr.normalize)(app, _app2.default.schema).entities));
			});
		};
	},
	REMOVE: function REMOVE(id) {
		return function (dispatch, getState) {
			var state = getState();
			var app = (0, _selector.getCurrentApp)(state);
			var id = app._id;
			return _app2.default.remove(id).then(function (a) {
				dispatch((0, _.REMOVE_ENTITIES)(_app2.default.schema.getKey(), id));
				dispatch(_main.ACTION.NEXT_APPLICATION(id));
			});
		};
	},

	UPLOAD: function UPLOAD(a) {
		return function (displatch) {
			return fileSelector.select().then(function (app) {
				return _app2.default.upload(app);
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
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {
			if (!next.isCurrent) next.dispatch(_main.ACTION.SET_CURRENT_APP_BY_ID(next.params._id));
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    name = _props.name,
			    uname = _props.uname,
			    apiKey = _props.apiKey,
			    dispatch = _props.dispatch,
			    _id = _props.params._id;
			var _state = this.state,
			    nameError = _state.nameError,
			    unameError = _state.unameError;
			var router = this.context.router;

			var removable = _app2.default.isRemovable(_id);
			var commandBar = void 0;
			if (removable) commandBar = _react2.default.createElement(CommandBar, { className: "footbar", primary: "Upload",
				items: [{ action: "Back" }, { action: "Upload",
					icon: _react2.default.createElement(_fileUpload2.default, null),
					onSelect: function onSelect(e) {
						return dispatch(ACTION.UPLOAD());
					}
				}, { action: "Remove",
					icon: _react2.default.createElement(_delete2.default, null),
					onSelect: function onSelect(e) {
						var removing = prompt("Please make sure you know what you are doing by giving this app name").trim();
						if (removing && removing == name) {
							dispatch(ACTION.REMOVE()).then(function (a) {
								return router.replace("/");
							});
						} else alert("name is not correct");
					}
				}]
			});else commandBar = _react2.default.createElement(CommandBar, { className: "footbar", items: [{ action: "Back" }] });

			var changeName = function changeName(value) {
				return value != name && dispatch(ACTION.CHANGE("name", value)).then(function (a) {
					return _this2.setState({ nameError: null });
				}, function (error) {
					return _this2.setState({ nameError: error });
				});
			};

			var changeUName = function changeUName(value) {
				return value != uname && dispatch(ACTION.CHANGE("uname", value)).then(function (a) {
					return _this2.setState({ unameError: null });
				}, function (error) {
					return _this2.setState({ unameError: error });
				});
			};

			var refName = void 0,
			    refUname = void 0;
			return _react2.default.createElement(
				"div",
				{ className: "form" },
				_react2.default.createElement(TextFieldx, { ref: function ref(a) {
						return refName = a;
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
						var value = _ref3.target.value,
						    keyCode = _ref3.keyCode;
						return keyCode == ENTER && changeName(value.trim());
					},
					onBlur: function onBlur(_ref4) {
						var value = _ref4.target.value;
						return changeName(value.trim());
					} }),
				_react2.default.createElement(TextFieldx, { ref: function ref(a) {
						return refUname = a;
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
					onKeyDown: function onKeyDown(_ref6) {
						var value = _ref6.target.value,
						    keyCode = _ref6.keyCode;
						return keyCode == ENTER && changeUName(value.trim());
					},
					onBlur: function onBlur(_ref7) {
						var value = _ref7.target.value;
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
		var _ref8;

		var _temp2, _this3, _ret2;

		(0, _classCallCheck3.default)(this, Creator);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = (0, _possibleConstructorReturn3.default)(this, (_ref8 = Creator.__proto__ || (0, _getPrototypeOf2.default)(Creator)).call.apply(_ref8, [this].concat(args))), _this3), _this3.state = { error: null }, _temp2), (0, _possibleConstructorReturn3.default)(_this3, _ret2);
	}

	(0, _createClass3.default)(Creator, [{
		key: "render",
		value: function render() {
			var _this4 = this;

			var _props2 = this.props,
			    dispatch = _props2.dispatch,
			    bFirst = _props2.bFirst;
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
				_react2.default.createElement(CommandBar, { className: "footbar",
					items: [{ action: "Back" }, { action: "Save", label: "保存", icon: _react2.default.createElement(_save2.default, null),
						onSelect: function onSelect(a) {
							return dispatch(ACTION.CREATE(refName.getValue(), refUname.getValue())).then(function (_ref9) {
								var _id = _ref9._id;
								return router.replace(!bFirst ? "/app/" + _id : "/");
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
exports.default = (0, _assign2.default)(App, { ACTION: ACTION });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJUZXh0RmllbGR4IiwiQ29tbWFuZEJhciIsImZpbGVTZWxlY3RvciIsIkFDVElPTiIsIkNSRUFURSIsIm5hbWUiLCJ1bmFtZSIsIm5hbWVFcnJvciIsInVuYW1lRXJyb3IiLCJyZWplY3QiLCJ1cHNlcnQiLCJ0aGVuIiwiZGlzcGF0Y2giLCJhcHAiLCJzY2hlbWEiLCJlbnRpdGllcyIsIlNFVF9DVVJSRU5UX0FQUCIsIkNIQU5HRSIsImtleSIsInZhbHVlIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsIlJFTU9WRSIsImlkIiwiX2lkIiwicmVtb3ZlIiwiZ2V0S2V5IiwiTkVYVF9BUFBMSUNBVElPTiIsIlVQTE9BRCIsInNlbGVjdCIsInVwbG9hZCIsIkFwcCIsIm5leHQiLCJpc0N1cnJlbnQiLCJTRVRfQ1VSUkVOVF9BUFBfQllfSUQiLCJwYXJhbXMiLCJwcm9wcyIsImFwaUtleSIsInJvdXRlciIsImNvbnRleHQiLCJyZW1vdmFibGUiLCJpc1JlbW92YWJsZSIsImNvbW1hbmRCYXIiLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJyZW1vdmluZyIsInByb21wdCIsInRyaW0iLCJyZXBsYWNlIiwiYWxlcnQiLCJjaGFuZ2VOYW1lIiwic2V0U3RhdGUiLCJlcnJvciIsImNoYW5nZVVOYW1lIiwicmVmTmFtZSIsInJlZlVuYW1lIiwiYSIsInRhcmdldCIsImtleUNvZGUiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJDcmVhdG9yIiwiYkZpcnN0IiwibGFiZWwiLCJnZXRWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBLElBQU1BLFFBQU0sRUFBWjtJQUNPQyxVLFFBQUFBLFU7SUFBWUMsVSxRQUFBQSxV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QVV1QixNQUFuQixFO2tCQUdOLHNCQUFjOUIsR0FBZCxFQUFrQixFQUFDNUIsY0FBRCxFQUFsQixDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBEb3dubG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS1kb3dubG9hZFwiXG5pbXBvcnQgU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5pbXBvcnQgUmVtb3ZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RlbGV0ZVwiXG5cbmltcG9ydCB7VUksIFJFTU9WRV9FTlRJVElFUywgRU5USVRJRVN9IGZyb20gXCIuXCJcbmltcG9ydCB7QUNUSU9OIGFzIHFpbGlBQ1RJT059IGZyb20gXCIuL21haW5cIlxuaW1wb3J0IHtnZXRDdXJyZW50QXBwfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmltcG9ydCBkYkFwcGxpY2F0aW9uIGZyb20gXCIuL2RiL2FwcFwiXG5cbmNvbnN0IEVOVEVSPTEzXG5jb25zdCB7VGV4dEZpZWxkeCwgQ29tbWFuZEJhciwgZmlsZVNlbGVjdG9yfT1VSVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0Q1JFQVRFOiAobmFtZSwgdW5hbWUpPT5kaXNwYXRjaD0+e1xuXHRcdGxldCBuYW1lRXJyb3IsIHVuYW1lRXJyb3Jcblx0XHRpZighbmFtZSlcblx0XHRcdG5hbWVFcnJvcj1cIm5hbWUgaXMgcmVxdWlyZWRcIlxuXHRcdGlmKG5hbWVFcnJvcil7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmFtZUVycm9yKVxuXHRcdH1cblxuXHRcdHJldHVybiBkYkFwcGxpY2F0aW9uLnVwc2VydCh7bmFtZSx1bmFtZX0pXG5cdFx0XHQudGhlbihhcHA9Pntcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGFwcCxkYkFwcGxpY2F0aW9uLnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0XHRkaXNwYXRjaChxaWxpQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChhcHApKVxuXHRcdFx0XHRyZXR1cm4gYXBwXG5cdFx0XHR9KVxuXHR9XG5cdCxDSEFOR0U6IChrZXksdmFsdWUpPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0aWYoa2V5PT1cIm5hbWVcIiAmJiAhdmFsdWUpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJuYW1lIGlzIHJlcXVpcmVkXCIpXG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGFwcD1nZXRDdXJyZW50QXBwKHN0YXRlKVxuXHRcdGFwcFtrZXldPXZhbHVlXG5cdFx0cmV0dXJuIGRiQXBwbGljYXRpb24udXBzZXJ0KGFwcClcblx0XHRcdC50aGVuKGFwcD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGFwcCxkYkFwcGxpY2F0aW9uLnNjaGVtYSkuZW50aXRpZXMpKSlcblx0fVxuXHQsUkVNT1ZFOiBpZD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRsZXQgYXBwPWdldEN1cnJlbnRBcHAoc3RhdGUpXG5cdFx0bGV0IGlkPWFwcC5faWRcblx0XHRyZXR1cm4gZGJBcHBsaWNhdGlvbi5yZW1vdmUoaWQpXG5cdFx0XHQudGhlbihhPT57XG5cdFx0XHRcdGRpc3BhdGNoKFJFTU9WRV9FTlRJVElFUyhkYkFwcGxpY2F0aW9uLnNjaGVtYS5nZXRLZXkoKSxpZCkpXG5cdFx0XHRcdGRpc3BhdGNoKHFpbGlBQ1RJT04uTkVYVF9BUFBMSUNBVElPTihpZCkpXG5cdFx0XHR9KVxuXHR9XG5cblx0LFVQTE9BRDogYT0+ZGlzcGxhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0KClcblx0XHRcdC50aGVuKGFwcD0+ZGJBcHBsaWNhdGlvbi51cGxvYWQoYXBwKSlcbn1cblxuZXhwb3J0IGNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e25hbWVFcnJvcjpudWxsLCB1bmFtZUVycm9yOm51bGx9XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XG5cdFx0aWYoIW5leHQuaXNDdXJyZW50KVxuXHRcdFx0bmV4dC5kaXNwYXRjaChxaWxpQUNUSU9OLlNFVF9DVVJSRU5UX0FQUF9CWV9JRChuZXh0LnBhcmFtcy5faWQpKVxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtuYW1lLHVuYW1lLGFwaUtleSwgZGlzcGF0Y2gsIHBhcmFtczp7X2lkfX09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtuYW1lRXJyb3IsIHVuYW1lRXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRsZXQgcmVtb3ZhYmxlPWRiQXBwbGljYXRpb24uaXNSZW1vdmFibGUoX2lkKVxuXHRcdGxldCBjb21tYW5kQmFyXG5cdFx0aWYocmVtb3ZhYmxlKVxuXHRcdFx0Y29tbWFuZEJhcj0oPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHByaW1hcnk9XCJVcGxvYWRcIlxuXHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn1cblxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJVcGxvYWRcIlxuXHRcdFx0XHRcdFx0XHQsaWNvbjo8VXBsb2FkLz5cblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUExPQUQoKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCx7YWN0aW9uOlwiUmVtb3ZlXCJcblx0XHRcdFx0XHRcdFx0LGljb246PFJlbW92ZS8+XG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT57XG5cdFx0XHRcdFx0XHRcdFx0bGV0IHJlbW92aW5nPXByb21wdChcIlBsZWFzZSBtYWtlIHN1cmUgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nIGJ5IGdpdmluZyB0aGlzIGFwcCBuYW1lXCIpLnRyaW0oKVxuXHRcdFx0XHRcdFx0XHRcdGlmKHJlbW92aW5nICYmIHJlbW92aW5nPT1uYW1lKXtcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5SRU1PVkUoKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4oYT0+cm91dGVyLnJlcGxhY2UoXCIvXCIpKVxuXHRcdFx0XHRcdFx0XHRcdH1lbHNlXG5cdFx0XHRcdFx0XHRcdFx0XHRhbGVydChcIm5hbWUgaXMgbm90IGNvcnJlY3RcIilcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF19XG5cdFx0XHRcdC8+KVxuXHRcdGVsc2Vcblx0XHRcdGNvbW1hbmRCYXI9KDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9XX0vPilcblxuXHRcdGNvbnN0IGNoYW5nZU5hbWU9dmFsdWU9PnZhbHVlIT1uYW1lICYmIGRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJuYW1lXCIsdmFsdWUpKVxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOm51bGx9KSxlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOmVycm9yfSkpXG5cdFx0XHRcblx0XHRjb25zdCBjaGFuZ2VVTmFtZT12YWx1ZT0+dmFsdWUhPXVuYW1lICYmIGRpc3BhdGNoKEFDVElPTi5DSEFOR0UoXCJ1bmFtZVwiLHZhbHVlKSlcblx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe3VuYW1lRXJyb3I6bnVsbH0pLGVycm9yPT50aGlzLnNldFN0YXRlKHt1bmFtZUVycm9yOmVycm9yfSkpXG5cdFx0XHRcblx0XHRsZXQgcmVmTmFtZSwgcmVmVW5hbWVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG5cdFx0XHRcdDxUZXh0RmllbGR4IHJlZj17YT0+cmVmTmFtZT1hfVxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHRcdHZhbHVlPXtuYW1lfVxuXHRcdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZk5hbWUudmFsdWU9dmFsdWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXsoe3RhcmdldDp7dmFsdWV9LGtleUNvZGV9KT0+a2V5Q29kZT09RU5URVIgJiYgY2hhbmdlTmFtZSh2YWx1ZS50cmltKCkpfVxuXHRcdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5jaGFuZ2VOYW1lKHZhbHVlLnRyaW0oKSl9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZlVuYW1lPWF9XG5cdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJnbG9iYWwgdW5pcXVlIHByb2R1Y3QgbmFtZTogYXBwLnFpbGkyLmNvbS97cHJvdWN0TmFtZX1cIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRkaXNhYmxlZD17IXJlbW92YWJsZX1cblx0XHRcdFx0XHR2YWx1ZT17dW5hbWV9XG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXt1bmFtZUVycm9yfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZlVuYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PUVOVEVSICYmIGNoYW5nZVVOYW1lKHZhbHVlLnRyaW0oKSl9XG5cdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZVVOYW1lKHZhbHVlLnRyaW0oKSl9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkXG5cdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJBUEkga2V5OiB2YWx1ZSBvZiBodHRwIGhlYWRlciAneC1hcHBsaWNhdGlvbi1pZCdcIlxuXHRcdFx0XHRcdGRpc2FibGVkPXt0cnVlfVxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHR2YWx1ZT17YXBpS2V5fS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZFxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwid2VjaGF0IHVybDogdXNlIGl0IHRvIGFjY2VwdCBtZXNzYWdlIGZyb20gd2VjaGF0XCJcblx0XHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0dmFsdWU9e2BodHRwOi8vcWlsaTIuY29tLzEvJHthcGlLZXl9L3dlY2hhdGB9Lz5cblxuXHRcdFx0XHR7Y29tbWFuZEJhcn1cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBjbGFzcyBDcmVhdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17ZXJyb3I6bnVsbH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNoLCBiRmlyc3R9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7ZXJyb3J9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRsZXQgcmVmTmFtZSxyZWZVbmFtZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuXHRcdFx0XHRcdGVycm9yVGV4dD17ZXJyb3J9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZlVuYW1lPWF9XG5cdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCJnbG9iYWwgdW5pcXVlIHByb2R1Y3QgbmFtZTogYXBwLnFpbGkyLmNvbS97cHJvdWN0TmFtZX1cIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIGljb246PFNhdmUvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURShyZWZOYW1lLmdldFZhbHVlKCkscmVmVW5hbWUuZ2V0VmFsdWUoKSkpXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4oKHtfaWR9KT0+cm91dGVyLnJlcGxhY2UoIWJGaXJzdCA/IGAvYXBwLyR7X2lkfWAgOiBcIi9cIiksIGVycm9yPT50aGlzLnNldFN0YXRlKHtlcnJvcn0pKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF19XG5cdFx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3R9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQXBwLHtBQ1RJT059KVxuIl19