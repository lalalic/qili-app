"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.App = exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
				return Promise.reject(nameError);
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
			if (key == "name" && !value) return Promise.reject("name is required");
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
	_inherits(App, _Component);

	function App() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = { nameError: null, unameError: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(App, [{
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
	_inherits(Creator, _Component2);

	function Creator() {
		var _ref8;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, Creator);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref8 = Creator.__proto__ || Object.getPrototypeOf(Creator)).call.apply(_ref8, [this].concat(args))), _this3), _this3.state = { error: null }, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(Creator, [{
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
exports.default = Object.assign(App, { ACTION: ACTION });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiRU5URVIiLCJUZXh0RmllbGR4IiwiQ29tbWFuZEJhciIsImZpbGVTZWxlY3RvciIsIkFDVElPTiIsIkNSRUFURSIsIm5hbWUiLCJ1bmFtZSIsIm5hbWVFcnJvciIsInVuYW1lRXJyb3IiLCJQcm9taXNlIiwicmVqZWN0IiwidXBzZXJ0IiwidGhlbiIsImRpc3BhdGNoIiwiYXBwIiwic2NoZW1hIiwiZW50aXRpZXMiLCJTRVRfQ1VSUkVOVF9BUFAiLCJDSEFOR0UiLCJrZXkiLCJ2YWx1ZSIsImdldFN0YXRlIiwic3RhdGUiLCJSRU1PVkUiLCJpZCIsIl9pZCIsInJlbW92ZSIsImdldEtleSIsIk5FWFRfQVBQTElDQVRJT04iLCJVUExPQUQiLCJzZWxlY3QiLCJ1cGxvYWQiLCJBcHAiLCJuZXh0IiwiaXNDdXJyZW50IiwiU0VUX0NVUlJFTlRfQVBQX0JZX0lEIiwicGFyYW1zIiwicHJvcHMiLCJhcGlLZXkiLCJyb3V0ZXIiLCJjb250ZXh0IiwicmVtb3ZhYmxlIiwiaXNSZW1vdmFibGUiLCJjb21tYW5kQmFyIiwiYWN0aW9uIiwiaWNvbiIsIm9uU2VsZWN0IiwicmVtb3ZpbmciLCJwcm9tcHQiLCJ0cmltIiwicmVwbGFjZSIsImFsZXJ0IiwiY2hhbmdlTmFtZSIsInNldFN0YXRlIiwiZXJyb3IiLCJjaGFuZ2VVTmFtZSIsInJlZk5hbWUiLCJyZWZVbmFtZSIsImEiLCJ0YXJnZXQiLCJrZXlDb2RlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiQ3JlYXRvciIsImJGaXJzdCIsImxhYmVsIiwiZ2V0VmFsdWUiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBTSxFQUFaO0lBQ09DLFUsUUFBQUEsVTtJQUFZQyxV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QixRQUFRLGlCQUFVdUIsTUFBbkIsRTtrQkFHTkssT0FBT0MsTUFBUCxDQUFjcEMsR0FBZCxFQUFrQixFQUFDN0IsY0FBRCxFQUFsQixDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdtYXRlcmlhbC11aSdcclxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxyXG5cclxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxyXG5pbXBvcnQgRG93bmxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtZG93bmxvYWRcIlxyXG5pbXBvcnQgU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXHJcbmltcG9ydCBSZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCJcclxuXHJcbmltcG9ydCB7VUksIFJFTU9WRV9FTlRJVElFUywgRU5USVRJRVN9IGZyb20gXCIuXCJcclxuaW1wb3J0IHtBQ1RJT04gYXMgcWlsaUFDVElPTn0gZnJvbSBcIi4vbWFpblwiXHJcbmltcG9ydCB7Z2V0Q3VycmVudEFwcH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxyXG5cclxuaW1wb3J0IGRiQXBwbGljYXRpb24gZnJvbSBcIi4vZGIvYXBwXCJcclxuXHJcbmNvbnN0IEVOVEVSPTEzXHJcbmNvbnN0IHtUZXh0RmllbGR4LCBDb21tYW5kQmFyLCBmaWxlU2VsZWN0b3J9PVVJXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRDUkVBVEU6IChuYW1lLCB1bmFtZSk9PmRpc3BhdGNoPT57XHJcblx0XHRsZXQgbmFtZUVycm9yLCB1bmFtZUVycm9yXHJcblx0XHRpZighbmFtZSlcclxuXHRcdFx0bmFtZUVycm9yPVwibmFtZSBpcyByZXF1aXJlZFwiXHJcblx0XHRpZihuYW1lRXJyb3Ipe1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmFtZUVycm9yKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBkYkFwcGxpY2F0aW9uLnVwc2VydCh7bmFtZSx1bmFtZX0pXHJcblx0XHRcdC50aGVuKGFwcD0+e1xyXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShhcHAsZGJBcHBsaWNhdGlvbi5zY2hlbWEpLmVudGl0aWVzKSlcclxuXHRcdFx0XHRkaXNwYXRjaChxaWxpQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChhcHApKVxyXG5cdFx0XHRcdHJldHVybiBhcHBcclxuXHRcdFx0fSlcclxuXHR9XHJcblx0LENIQU5HRTogKGtleSx2YWx1ZSk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGlmKGtleT09XCJuYW1lXCIgJiYgIXZhbHVlKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJuYW1lIGlzIHJlcXVpcmVkXCIpXHJcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXHJcblx0XHRjb25zdCBhcHA9Z2V0Q3VycmVudEFwcChzdGF0ZSlcclxuXHRcdGFwcFtrZXldPXZhbHVlXHJcblx0XHRyZXR1cm4gZGJBcHBsaWNhdGlvbi51cHNlcnQoYXBwKVxyXG5cdFx0XHQudGhlbihhcHA9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShhcHAsZGJBcHBsaWNhdGlvbi5zY2hlbWEpLmVudGl0aWVzKSkpXHJcblx0fVxyXG5cdCxSRU1PVkU6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXHJcblx0XHRsZXQgYXBwPWdldEN1cnJlbnRBcHAoc3RhdGUpXHJcblx0XHRsZXQgaWQ9YXBwLl9pZFxyXG5cdFx0cmV0dXJuIGRiQXBwbGljYXRpb24ucmVtb3ZlKGlkKVxyXG5cdFx0XHQudGhlbihhPT57XHJcblx0XHRcdFx0ZGlzcGF0Y2goUkVNT1ZFX0VOVElUSUVTKGRiQXBwbGljYXRpb24uc2NoZW1hLmdldEtleSgpLGlkKSlcclxuXHRcdFx0XHRkaXNwYXRjaChxaWxpQUNUSU9OLk5FWFRfQVBQTElDQVRJT04oaWQpKVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHJcblx0LFVQTE9BRDogYT0+ZGlzcGxhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0KClcclxuXHRcdFx0LnRoZW4oYXBwPT5kYkFwcGxpY2F0aW9uLnVwbG9hZChhcHApKVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtuYW1lRXJyb3I6bnVsbCwgdW5hbWVFcnJvcjpudWxsfVxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XHJcblx0XHRpZighbmV4dC5pc0N1cnJlbnQpXHJcblx0XHRcdG5leHQuZGlzcGF0Y2gocWlsaUFDVElPTi5TRVRfQ1VSUkVOVF9BUFBfQllfSUQobmV4dC5wYXJhbXMuX2lkKSlcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7bmFtZSx1bmFtZSxhcGlLZXksIGRpc3BhdGNoLCBwYXJhbXM6e19pZH19PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtuYW1lRXJyb3IsIHVuYW1lRXJyb3J9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxyXG5cdFx0bGV0IHJlbW92YWJsZT1kYkFwcGxpY2F0aW9uLmlzUmVtb3ZhYmxlKF9pZClcclxuXHRcdGxldCBjb21tYW5kQmFyXHJcblx0XHRpZihyZW1vdmFibGUpXHJcblx0XHRcdGNvbW1hbmRCYXI9KDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBwcmltYXJ5PVwiVXBsb2FkXCJcclxuXHRcdFx0XHRpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxyXG5cclxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJVcGxvYWRcIlxyXG5cdFx0XHRcdFx0XHRcdCxpY29uOjxVcGxvYWQvPlxyXG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEKCkpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJSZW1vdmVcIlxyXG5cdFx0XHRcdFx0XHRcdCxpY29uOjxSZW1vdmUvPlxyXG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT57XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgcmVtb3Zpbmc9cHJvbXB0KFwiUGxlYXNlIG1ha2Ugc3VyZSB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcgYnkgZ2l2aW5nIHRoaXMgYXBwIG5hbWVcIikudHJpbSgpXHJcblx0XHRcdFx0XHRcdFx0XHRpZihyZW1vdmluZyAmJiByZW1vdmluZz09bmFtZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5SRU1PVkUoKSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQudGhlbihhPT5yb3V0ZXIucmVwbGFjZShcIi9cIikpXHJcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRhbGVydChcIm5hbWUgaXMgbm90IGNvcnJlY3RcIilcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF19XHJcblx0XHRcdFx0Lz4pXHJcblx0XHRlbHNlXHJcblx0XHRcdGNvbW1hbmRCYXI9KDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9XX0vPilcclxuXHJcblx0XHRjb25zdCBjaGFuZ2VOYW1lPXZhbHVlPT52YWx1ZSE9bmFtZSAmJiBkaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwibmFtZVwiLHZhbHVlKSlcclxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOm51bGx9KSxlcnJvcj0+dGhpcy5zZXRTdGF0ZSh7bmFtZUVycm9yOmVycm9yfSkpXHJcblx0XHRcdFxyXG5cdFx0Y29uc3QgY2hhbmdlVU5hbWU9dmFsdWU9PnZhbHVlIT11bmFtZSAmJiBkaXNwYXRjaChBQ1RJT04uQ0hBTkdFKFwidW5hbWVcIix2YWx1ZSkpXHJcblx0XHRcdC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe3VuYW1lRXJyb3I6bnVsbH0pLGVycm9yPT50aGlzLnNldFN0YXRlKHt1bmFtZUVycm9yOmVycm9yfSkpXHJcblx0XHRcdFxyXG5cdFx0bGV0IHJlZk5hbWUsIHJlZlVuYW1lXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZk5hbWU9YX1cclxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRkaXNhYmxlZD17IXJlbW92YWJsZX1cclxuXHRcdFx0XHRcdHZhbHVlPXtuYW1lfVxyXG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtuYW1lRXJyb3J9XHJcblx0XHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZOYW1lLnZhbHVlPXZhbHVlfVxyXG5cdFx0XHRcdFx0b25LZXlEb3duPXsoe3RhcmdldDp7dmFsdWV9LGtleUNvZGV9KT0+a2V5Q29kZT09RU5URVIgJiYgY2hhbmdlTmFtZSh2YWx1ZS50cmltKCkpfVxyXG5cdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PmNoYW5nZU5hbWUodmFsdWUudHJpbSgpKX0vPlxyXG5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkeCByZWY9e2E9PnJlZlVuYW1lPWF9XHJcblx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXHJcblx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRkaXNhYmxlZD17IXJlbW92YWJsZX1cclxuXHRcdFx0XHRcdHZhbHVlPXt1bmFtZX1cclxuXHRcdFx0XHRcdGVycm9yVGV4dD17dW5hbWVFcnJvcn1cclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZlVuYW1lLnZhbHVlPXZhbHVlfVxyXG5cdFx0XHRcdFx0b25LZXlEb3duPXsoe3RhcmdldDp7dmFsdWV9LGtleUNvZGV9KT0+a2V5Q29kZT09RU5URVIgJiYgY2hhbmdlVU5hbWUodmFsdWUudHJpbSgpKX1cclxuXHRcdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5jaGFuZ2VVTmFtZSh2YWx1ZS50cmltKCkpfS8+XHJcblxyXG5cdFx0XHRcdDxUZXh0RmllbGRcclxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcclxuXHRcdFx0XHRcdGRpc2FibGVkPXt0cnVlfVxyXG5cdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0dmFsdWU9e2FwaUtleX0vPlxyXG5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkXHJcblx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIndlY2hhdCB1cmw6IHVzZSBpdCB0byBhY2NlcHQgbWVzc2FnZSBmcm9tIHdlY2hhdFwiXHJcblx0XHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX1cclxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdHZhbHVlPXtgaHR0cDovL3FpbGkyLmNvbS8xLyR7YXBpS2V5fS93ZWNoYXRgfS8+XHJcblxyXG5cdFx0XHRcdHtjb21tYW5kQmFyfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3JlYXRvciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17ZXJyb3I6bnVsbH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkaXNwYXRjaCwgYkZpcnN0fT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7ZXJyb3J9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxyXG5cdFx0bGV0IHJlZk5hbWUscmVmVW5hbWVcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxyXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZOYW1lPWF9XHJcblx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxyXG5cdFx0XHRcdFx0ZXJyb3JUZXh0PXtlcnJvcn1cclxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmVW5hbWU9YX1cclxuXHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcclxuXHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuXHRcdFx0XHRcdGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XHJcblx0XHRcdFx0XHRcdCx7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBpY29uOjxTYXZlLz5cclxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6YT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURShyZWZOYW1lLmdldFZhbHVlKCkscmVmVW5hbWUuZ2V0VmFsdWUoKSkpXHJcblx0XHRcdFx0XHRcdFx0XHQudGhlbigoe19pZH0pPT5yb3V0ZXIucmVwbGFjZSghYkZpcnN0ID8gYC9hcHAvJHtfaWR9YCA6IFwiL1wiKSwgZXJyb3I9PnRoaXMuc2V0U3RhdGUoe2Vycm9yfSkpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF19XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEFwcCx7QUNUSU9OfSlcclxuIl19