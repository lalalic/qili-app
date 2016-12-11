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
var TextFieldx = _.UI.TextFieldx;
var CommandBar = _.UI.CommandBar;
var fileSelector = _.UI.fileSelector;
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

			var _props = this.props;
			var name = _props.name;
			var uname = _props.uname;
			var apiKey = _props.apiKey;
			var dispatch = _props.dispatch;
			var _id = _props.params._id;
			var _state = this.state;
			var nameError = _state.nameError;
			var unameError = _state.unameError;
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
						var value = _ref3.target.value;
						var keyCode = _ref3.keyCode;
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
						var value = _ref6.target.value;
						var keyCode = _ref6.keyCode;
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
				_react2.default.createElement(CommandBar, { className: "footbar",
					items: [{ action: "Back" }, { action: "Save", label: "保存", icon: _react2.default.createElement(_save2.default, null),
						onSelect: function onSelect(a) {
							return dispatch(ACTION.CREATE(refName.getValue(), refUname.getValue())).then(function (_ref9) {
								var _id = _ref9._id;
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
exports.default = (0, _assign2.default)(App, { ACTION: ACTION });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJUZXh0RmllbGR4IiwiQ29tbWFuZEJhciIsImZpbGVTZWxlY3RvciIsIkFDVElPTiIsIkNSRUFURSIsIm5hbWUiLCJ1bmFtZSIsIm5hbWVFcnJvciIsInVuYW1lRXJyb3IiLCJyZWplY3QiLCJ1cHNlcnQiLCJ0aGVuIiwiZGlzcGF0Y2giLCJhcHAiLCJzY2hlbWEiLCJlbnRpdGllcyIsIlNFVF9DVVJSRU5UX0FQUCIsIkNIQU5HRSIsImtleSIsInZhbHVlIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsIlJFTU9WRSIsImlkIiwiX2lkIiwicmVtb3ZlIiwiZ2V0S2V5IiwiTkVYVF9BUFBMSUNBVElPTiIsIlVQTE9BRCIsInNlbGVjdCIsInVwbG9hZCIsIkFwcCIsIm5leHQiLCJpc0N1cnJlbnQiLCJTRVRfQ1VSUkVOVF9BUFBfQllfSUQiLCJwYXJhbXMiLCJwcm9wcyIsImFwaUtleSIsInJvdXRlciIsImNvbnRleHQiLCJyZW1vdmFibGUiLCJpc1JlbW92YWJsZSIsImNvbW1hbmRCYXIiLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJyZW1vdmluZyIsInByb21wdCIsInRyaW0iLCJyZXBsYWNlIiwiYWxlcnQiLCJjaGFuZ2VOYW1lIiwic2V0U3RhdGUiLCJlcnJvciIsImNoYW5nZVVOYW1lIiwicmVmTmFtZSIsInJlZlVuYW1lIiwiYSIsInRhcmdldCIsImtleUNvZGUiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJDcmVhdG9yIiwibGFiZWwiLCJnZXRWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBLElBQU1BLFFBQU0sRUFBWjtJQUNPQyxVLFFBQUFBLFU7SUFBWUMsVSxRQUFBQSxVO0lBQVlDLFks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anMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQgVXBsb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLXVwbG9hZFwiXG5pbXBvcnQgRG93bmxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtZG93bmxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuaW1wb3J0IFJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIlxuXG5pbXBvcnQge1VJLCBSRU1PVkVfRU5USVRJRVMsIEVOVElUSUVTfSBmcm9tIFwiLlwiXG5pbXBvcnQge0FDVElPTiBhcyBxaWxpQUNUSU9OfSBmcm9tIFwiLi9tYWluXCJcbmltcG9ydCB7Z2V0Q3VycmVudEFwcH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuXG5pbXBvcnQgZGJBcHBsaWNhdGlvbiBmcm9tIFwiLi9kYi9hcHBcIlxuXG5jb25zdCBFTlRFUj0xM1xuY29uc3Qge1RleHRGaWVsZHgsIENvbW1hbmRCYXIsIGZpbGVTZWxlY3Rvcn09VUlcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdENSRUFURTogKG5hbWUsIHVuYW1lKT0+ZGlzcGF0Y2g9Pntcblx0XHRsZXQgbmFtZUVycm9yLCB1bmFtZUVycm9yXG5cdFx0aWYoIW5hbWUpXG5cdFx0XHRuYW1lRXJyb3I9XCJuYW1lIGlzIHJlcXVpcmVkXCJcblx0XHRpZihuYW1lRXJyb3Ipe1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5hbWVFcnJvcilcblx0XHR9XG5cblx0XHRyZXR1cm4gZGJBcHBsaWNhdGlvbi51cHNlcnQoe25hbWUsdW5hbWV9KVxuXHRcdFx0LnRoZW4oYXBwPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShhcHAsZGJBcHBsaWNhdGlvbi5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdFx0ZGlzcGF0Y2gocWlsaUFDVElPTi5TRVRfQ1VSUkVOVF9BUFAoYXBwKSlcblx0XHRcdFx0cmV0dXJuIGFwcFxuXHRcdFx0fSlcblx0fVxuXHQsQ0hBTkdFOiAoa2V5LHZhbHVlKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGlmKGtleT09XCJuYW1lXCIgJiYgIXZhbHVlKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KFwibmFtZSBpcyByZXF1aXJlZFwiKVxuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBhcHA9Z2V0Q3VycmVudEFwcChzdGF0ZSlcblx0XHRhcHBba2V5XT12YWx1ZVxuXHRcdHJldHVybiBkYkFwcGxpY2F0aW9uLnVwc2VydChhcHApXG5cdFx0XHQudGhlbihhcHA9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShhcHAsZGJBcHBsaWNhdGlvbi5zY2hlbWEpLmVudGl0aWVzKSkpXG5cdH1cblx0LFJFTU9WRTogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0bGV0IGFwcD1nZXRDdXJyZW50QXBwKHN0YXRlKVxuXHRcdGxldCBpZD1hcHAuX2lkXG5cdFx0cmV0dXJuIGRiQXBwbGljYXRpb24ucmVtb3ZlKGlkKVxuXHRcdFx0LnRoZW4oYT0+e1xuXHRcdFx0XHRkaXNwYXRjaChSRU1PVkVfRU5USVRJRVMoZGJBcHBsaWNhdGlvbi5zY2hlbWEuZ2V0S2V5KCksaWQpKVxuXHRcdFx0XHRkaXNwYXRjaChxaWxpQUNUSU9OLk5FWFRfQVBQTElDQVRJT04oaWQpKVxuXHRcdFx0fSlcblx0fVxuXG5cdCxVUExPQUQ6IGE9PmRpc3BsYXRjaD0+ZmlsZVNlbGVjdG9yLnNlbGVjdCgpXG5cdFx0XHQudGhlbihhcHA9PmRiQXBwbGljYXRpb24udXBsb2FkKGFwcCkpXG59XG5cbmV4cG9ydCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtuYW1lRXJyb3I6bnVsbCwgdW5hbWVFcnJvcjpudWxsfVxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuXHRcdGlmKCFuZXh0LmlzQ3VycmVudClcblx0XHRcdG5leHQuZGlzcGF0Y2gocWlsaUFDVElPTi5TRVRfQ1VSUkVOVF9BUFBfQllfSUQobmV4dC5wYXJhbXMuX2lkKSlcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7bmFtZSx1bmFtZSxhcGlLZXksIGRpc3BhdGNoLCBwYXJhbXM6e19pZH19PXRoaXMucHJvcHNcblx0XHRjb25zdCB7bmFtZUVycm9yLCB1bmFtZUVycm9yfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cdFx0bGV0IHJlbW92YWJsZT1kYkFwcGxpY2F0aW9uLmlzUmVtb3ZhYmxlKF9pZClcblx0XHRsZXQgY29tbWFuZEJhclxuXHRcdGlmKHJlbW92YWJsZSlcblx0XHRcdGNvbW1hbmRCYXI9KDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBwcmltYXJ5PVwiVXBsb2FkXCJcblx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cblx0XHRcdFx0XHRcdCx7YWN0aW9uOlwiVXBsb2FkXCJcblx0XHRcdFx0XHRcdFx0LGljb246PFVwbG9hZC8+XG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEKCkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQse2FjdGlvbjpcIlJlbW92ZVwiXG5cdFx0XHRcdFx0XHRcdCxpY29uOjxSZW1vdmUvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+e1xuXHRcdFx0XHRcdFx0XHRcdGxldCByZW1vdmluZz1wcm9tcHQoXCJQbGVhc2UgbWFrZSBzdXJlIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZyBieSBnaXZpbmcgdGhpcyBhcHAgbmFtZVwiKS50cmltKClcblx0XHRcdFx0XHRcdFx0XHRpZihyZW1vdmluZyAmJiByZW1vdmluZz09bmFtZSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uUkVNT1ZFKCkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKGE9PnJvdXRlci5yZXBsYWNlKFwiL1wiKSlcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdFx0YWxlcnQoXCJuYW1lIGlzIG5vdCBjb3JyZWN0XCIpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdfVxuXHRcdFx0XHQvPilcblx0XHRlbHNlXG5cdFx0XHRjb21tYW5kQmFyPSg8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifV19Lz4pXG5cblx0XHRjb25zdCBjaGFuZ2VOYW1lPXZhbHVlPT52YWx1ZSE9bmFtZSAmJiBkaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwibmFtZVwiLHZhbHVlKSlcblx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjpudWxsfSksZXJyb3I9PnRoaXMuc2V0U3RhdGUoe25hbWVFcnJvcjplcnJvcn0pKVxuXHRcdFx0XG5cdFx0Y29uc3QgY2hhbmdlVU5hbWU9dmFsdWU9PnZhbHVlIT11bmFtZSAmJiBkaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwidW5hbWVcIix2YWx1ZSkpXG5cdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHt1bmFtZUVycm9yOm51bGx9KSxlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7dW5hbWVFcnJvcjplcnJvcn0pKVxuXHRcdFx0XG5cdFx0bGV0IHJlZk5hbWUsIHJlZlVuYW1lXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cblx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cblx0XHRcdFx0XHRkaXNhYmxlZD17IXJlbW92YWJsZX1cblx0XHRcdFx0XHR2YWx1ZT17bmFtZX1cblx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn1cblx0XHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZOYW1lLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17KHt0YXJnZXQ6e3ZhbHVlfSxrZXlDb2RlfSk9PmtleUNvZGU9PUVOVEVSICYmIGNoYW5nZU5hbWUodmFsdWUudHJpbSgpKX1cblx0XHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+Y2hhbmdlTmFtZSh2YWx1ZS50cmltKCkpfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZHggcmVmPXthPT5yZWZVbmFtZT1hfVxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyFyZW1vdmFibGV9XG5cdFx0XHRcdFx0dmFsdWU9e3VuYW1lfVxuXHRcdFx0XHRcdGVycm9yVGV4dD17dW5hbWVFcnJvcn1cblx0XHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZVbmFtZS52YWx1ZT12YWx1ZX1cblx0XHRcdFx0XHRvbktleURvd249eyh7dGFyZ2V0Ont2YWx1ZX0sa2V5Q29kZX0pPT5rZXlDb2RlPT1FTlRFUiAmJiBjaGFuZ2VVTmFtZSh2YWx1ZS50cmltKCkpfVxuXHRcdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5jaGFuZ2VVTmFtZSh2YWx1ZS50cmltKCkpfS8+XG5cblx0XHRcdFx0PFRleHRGaWVsZFxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcblx0XHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdFx0dmFsdWU9e2FwaUtleX0vPlxuXG5cdFx0XHRcdDxUZXh0RmllbGRcblx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIndlY2hhdCB1cmw6IHVzZSBpdCB0byBhY2NlcHQgbWVzc2FnZSBmcm9tIHdlY2hhdFwiXG5cdFx0XHRcdFx0ZGlzYWJsZWQ9e3RydWV9XG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdHZhbHVlPXtgaHR0cDovL3FpbGkyLmNvbS8xLyR7YXBpS2V5fS93ZWNoYXRgfS8+XG5cblx0XHRcdFx0e2NvbW1hbmRCYXJ9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRvciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e2Vycm9yOm51bGx9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtlcnJvcn09dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCByZWZOYW1lLHJlZlVuYW1lXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmTmFtZT1hfVxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtlcnJvcn1cblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmVW5hbWU9YX1cblx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cdFx0XHRcdFx0XHQse2FjdGlvbjpcIlNhdmVcIiwgbGFiZWw6XCLkv53lrZhcIiwgaWNvbjo8U2F2ZS8+XG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHJlZk5hbWUuZ2V0VmFsdWUoKSxyZWZVbmFtZS5nZXRWYWx1ZSgpKSlcblx0XHRcdFx0XHRcdFx0XHQudGhlbigoe19pZH0pPT5yb3V0ZXIucmVwbGFjZShgL2FwcC8ke19pZH1gKSwgZXJyb3I9PnRoaXMuc2V0U3RhdGUoe2Vycm9yfSkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjogUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihBcHAse0FDVElPTn0pXG4iXX0=