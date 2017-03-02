"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Main = exports.QiliConsole = exports.ACTION = undefined;

var _QiliApp$render;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _materialUi = require("material-ui");

var _normalizr = require("normalizr");

var _redux = require("redux");

var _ = require(".");

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

var _app3 = require("./app");

var _app4 = _interopRequireDefault(_app3);

var _logo = require("./icons/logo");

var _logo2 = _interopRequireDefault(_logo);

var _selector = require("./selector");

var _dashboard = require("./dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

var _cloud = require("./cloud");

var _cloud2 = _interopRequireDefault(_cloud);

var _data = require("./data");

var _data2 = _interopRequireDefault(_data);

var _log = require("./log");

var _log2 = _interopRequireDefault(_log);

var _my = require("./my");

var _my2 = _interopRequireDefault(_my);

var _setting = require("./setting");

var _setting2 = _interopRequireDefault(_setting);

var _userProfile = require("./user-profile");

var _userProfile2 = _interopRequireDefault(_userProfile);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');


var initApp = null;

var Empty = _.UI.Empty;


var DOMAIN = "qiliAdmin";

var ACTION = exports.ACTION = {
	SET_CURRENT_APP_BY_ID: function SET_CURRENT_APP_BY_ID(id) {
		return function (dispatch, getState) {
			var state = getState();
			var apps = state.entities[_app2.default._name];
			var found = apps[id];
			if (found) dispatch(ACTION.SET_CURRENT_APP(found));
		};
	},
	SET_CURRENT_APP: function SET_CURRENT_APP(app) {
		_app2.default.current = app;
		return { type: "SET_CURRENT_APP", payload: app };
	},
	APPS_FETCHED: function APPS_FETCHED(apps) {
		return function (dispatch) {
			if (apps.length) {
				dispatch((0, _.ENTITIES)((0, _normalizr.normalize)(apps, (0, _normalizr.arrayOf)(_app2.default.schema)).entities));
				var current = null;
				if (initApp) current = apps.find(function (a) {
					return a._id == initApp;
				});
				if (!current) current = apps[0];
				dispatch(ACTION.SET_CURRENT_APP(current));
			}
		};
	},
	NEXT_APPLICATION: function NEXT_APPLICATION(app) {
		return function (dispatch, getState) {
			var state = getState();
			var apps = state.entities[_app2.default._name];
			var ids = Object.keys(apps);
			var index = ids[(ids.indexOf(app) + 1) % ids.length];
			if (index) {
				var next = apps[index];
				dispatch(ACTION.SET_CURRENT_APP(next));
			}
		};
	}
};

var REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "SET_CURRENT_APP":
			return { app: payload._id };
	}
	return state;
};

var QiliConsole = exports.QiliConsole = function (_Component) {
	_inherits(QiliConsole, _Component);

	function QiliConsole() {
		var _ref2;

		var _temp, _this, _ret;

		_classCallCheck(this, QiliConsole);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = QiliConsole.__proto__ || Object.getPrototypeOf(QiliConsole)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { contextual: true }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(QiliConsole, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    _id = _props._id,
			    name = _props.name,
			    children = _props.children,
			    dispatch = _props.dispatch;
			var contextual = this.state.contextual;

			var props = {
				appId: "qiliAdmin",
				init: function init(a) {
					return _app2.default.init().then(function (apps) {
						return dispatch(ACTION.APPS_FETCHED(apps));
					});
				},
				project: require("../package.json")
			};
			if (!_id) {
				return _react2.default.createElement(
					_.QiliApp,
					props,
					_react2.default.createElement(_materialUi.AppBar, { title: "Start from your first qili Applicaiton!" }),
					_react2.default.createElement(_app3.Creator, { bFirst: true, dispatch: dispatch })
				);
			}

			return _react2.default.createElement(
				_.QiliApp,
				props,
				contextual ? _react2.default.createElement(
					_materialUi.FloatingActionButton,
					{ className: "sticky top right", mini: true,
						style: { fontSize: "xx-small" },
						onClick: function onClick(e) {
							return dispatch(ACTION.NEXT_APPLICATION(_id));
						} },
					name
				) : null,
				_react2.default.createElement(
					_reactRouter.Router,
					{ history: _reactRouter.hashHistory },
					_react2.default.createElement(
						_reactRouter.Route,
						{ path: "/",
							onEnter: function onEnter(_ref3) {
								var routes = _ref3.routes;
								return _this2.setState({ contextual: !!!routes.find(function (a) {
										return a.contextual === false;
									}) });
							},
							onChange: function onChange(prevState, _ref4) {
								var routes = _ref4.routes;
								return _this2.setState({ contextual: !!!routes.find(function (a) {
										return a.contextual === false;
									}) });
							} },
						_react2.default.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
						_react2.default.createElement(
							_reactRouter.Route,
							{ path: "app", contextual: false },
							_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)()(_app3.Creator) }),
							_react2.default.createElement(_reactRouter.Route, { path: ":_id",
								component: (0, _reactRedux.connect)(function (state, _ref5) {
									var _id = _ref5.params._id;

									var urlApp = (0, _selector.getApp)(state, _id);
									var current = (0, _selector.getCurrentApp)(state);
									var info = (0, _.compact)(urlApp, "name", "uname", "apiKey");
									info.isCurrent = urlApp == current;
									return info;
								})(_app4.default),
								onEnter: function onEnter(_ref6) {
									var _id = _ref6.params._id;
									return initApp = _id;
								}
							})
						),
						_react2.default.createElement(_reactRouter.Route, { path: "cloud", component: (0, _reactRedux.connect)(function (state) {
								return { cloudCode: (0, _selector.getCurrentApp)(state).cloudCode };
							})(_cloud2.default) }),
						_react2.default.createElement(
							_reactRouter.Route,
							{ path: "data",
								component: (0, _reactRedux.connect)(function (state) {
									return _extends({}, state.ui.data, { app: (0, _selector.getCurrentApp)(state)._id });
								})(_data2.default) },
							_react2.default.createElement(_reactRouter.IndexRedirect, { to: "" + _.User._name }),
							_react2.default.createElement(_reactRouter.Route, { path: ":name" })
						),
						_react2.default.createElement(
							_reactRouter.Route,
							{ path: "log",
								component: (0, _reactRedux.connect)(function (state) {
									return state.ui.log;
								})(_log2.default) },
							_react2.default.createElement(_reactRouter.IndexRedirect, { to: "all" }),
							_react2.default.createElement(_reactRouter.Route, { path: ":level" })
						),
						_react2.default.createElement(
							_reactRouter.Route,
							{ path: "my" },
							_react2.default.createElement(_reactRouter.IndexRoute, {
								component: (0, _reactRedux.connect)(function (state) {
									var apps = state.entities[_app2.default._name];
									return { apps: apps ? Object.keys(apps).map(function (k) {
											return apps[k];
										}) : [] };
								})(_my2.default),
								contextual: false }),
							_react2.default.createElement(_reactRouter.Route, { path: "setting", component: _setting2.default }),
							_react2.default.createElement(_reactRouter.Route, { path: "profile", component: _userProfile2.default, contextual: false })
						)
					)
				)
			);
		}
	}]);

	return QiliConsole;
}(_react.Component);

var StateQiliConsole = (0, _reactRedux.connect)(function (state) {
	return (0, _.compact)((0, _selector.getCurrentApp)(state), "_id", "name");
})(QiliConsole);

var Main = exports.Main = _.QiliApp.render(_react2.default.createElement(StateQiliConsole, null), (_QiliApp$render = {}, _defineProperty(_QiliApp$render, DOMAIN, REDUCER), _defineProperty(_QiliApp$render, "ui", (0, _redux.combineReducers)({
	log: _log2.default.REDUCER,
	cloud: _cloud2.default.REDUCER,
	data: _data2.default.REDUCER
})), _QiliApp$render));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJpbml0QXBwIiwiRW1wdHkiLCJET01BSU4iLCJBQ1RJT04iLCJTRVRfQ1VSUkVOVF9BUFBfQllfSUQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic3RhdGUiLCJhcHBzIiwiZW50aXRpZXMiLCJfbmFtZSIsImZvdW5kIiwiaWQiLCJTRVRfQ1VSUkVOVF9BUFAiLCJjdXJyZW50IiwiYXBwIiwidHlwZSIsInBheWxvYWQiLCJBUFBTX0ZFVENIRUQiLCJsZW5ndGgiLCJzY2hlbWEiLCJmaW5kIiwiYSIsIl9pZCIsIk5FWFRfQVBQTElDQVRJT04iLCJpZHMiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXgiLCJpbmRleE9mIiwibmV4dCIsIlJFRFVDRVIiLCJRaWxpQ29uc29sZSIsImNvbnRleHR1YWwiLCJwcm9wcyIsIm5hbWUiLCJjaGlsZHJlbiIsImFwcElkIiwiaW5pdCIsInRoZW4iLCJwcm9qZWN0IiwiZm9udFNpemUiLCJyb3V0ZXMiLCJzZXRTdGF0ZSIsInByZXZTdGF0ZSIsInBhcmFtcyIsInVybEFwcCIsImluZm8iLCJpc0N1cnJlbnQiLCJjbG91ZENvZGUiLCJ1aSIsImRhdGEiLCJsb2ciLCJtYXAiLCJrIiwiU3RhdGVRaWxpQ29uc29sZSIsIk1haW4iLCJyZW5kZXIiLCJjbG91ZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBdEJBQSxRQUFRLHFCQUFSOzs7QUF3QkEsSUFBSUMsVUFBUSxJQUFaOztJQUVPQyxLLFFBQUFBLEs7OztBQUVQLElBQU1DLFNBQU8sV0FBYjs7QUFFTyxJQUFNQywwQkFBTztBQUNuQkMsd0JBQXVCO0FBQUEs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T0FBS0QsTUFBTUUsUUFBTixDQUFlLGNBQVlDLEtBQTNCLENBQVQ7QUFDQSxnQkFBTyxFQUFDRixNQUFNQSxPQUFPa0IsT0FBT0MsSUFBUCxDQUFZbkIsSUFBWixFQUFrQjZDLEdBQWxCLENBQXNCO0FBQUEsa0JBQUc3QyxLQUFLOEMsQ0FBTCxDQUFIO0FBQUEsV0FBdEIsQ0FBUCxHQUEyQyxFQUFsRCxFQUFQO0FBQ0EsU0FIVSxlQURaO0FBS0Msb0JBQVksS0FMYixHQUREO0FBUUMsMkRBQU8sTUFBSyxTQUFaLEVBQXNCLDRCQUF0QixHQVJEO0FBU0MsMkRBQU8sTUFBSyxTQUFaLEVBQXNCLGdDQUF0QixFQUE0QyxZQUFZLEtBQXhEO0FBVEQ7QUF2Q0Q7QUFERDtBQVRRLElBREo7QUFpRUg7Ozs7OztBQUdMLElBQU1DLG1CQUFpQix5QkFBUTtBQUFBLFFBQU8sZUFBUSw2QkFBY2hELEtBQWQsQ0FBUixFQUE2QixLQUE3QixFQUFtQyxNQUFuQyxDQUFQO0FBQUEsQ0FBUixFQUEyRHlCLFdBQTNELENBQXZCOztBQUVPLElBQU13QixzQkFBSyxVQUFRQyxNQUFSLENBQWUsOEJBQUMsZ0JBQUQsT0FBZiwwREFDaEJ2RCxNQURnQixFQUNSNkIsT0FEUSwwQ0FFZCw0QkFBZ0I7QUFDbEJxQixNQUFJLGNBQU1yQixPQURRO0FBRWxCMkIsUUFBTSxnQkFBUTNCLE9BRkk7QUFHbEJvQixPQUFLLGVBQU9wQjtBQUhNLENBQWhCLENBRmMsb0JBQVgiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxyXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeSwgUmVkaXJlY3QsIEluZGV4UmVkaXJlY3QsIExpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBBcHBCYXIsIEljb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcclxuaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gXCJyZWR1eFwiXHJcblxyXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLCBVSSwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMsIGNvbXBhY3QsIEVOVElUSUVTfSBmcm9tICcuJ1xyXG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9kYi9hcHAnXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXHJcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcclxuaW1wb3J0IHtnZXRDdXJyZW50QXBwLCBnZXRBcHB9IGZyb20gXCIuL3NlbGVjdG9yXCJcclxuXHJcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQnXHJcbmltcG9ydCBBcHBVSSwge0NyZWF0b3J9IGZyb20gJy4vYXBwJ1xyXG5pbXBvcnQgQ2xvdWRVSSBmcm9tICcuL2Nsb3VkJ1xyXG5pbXBvcnQgRGF0YVVJIGZyb20gJy4vZGF0YSdcclxuaW1wb3J0IExvZ1VJIGZyb20gJy4vbG9nJ1xyXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXHJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcIi4vc2V0dGluZ1wiXHJcbmltcG9ydCBQcm9maWxlVUkgZnJvbSBcIi4vdXNlci1wcm9maWxlXCJcclxuXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmxldCBpbml0QXBwPW51bGxcclxuXHJcbmNvbnN0IHtFbXB0eX09VUlcclxuXHJcbmNvbnN0IERPTUFJTj1cInFpbGlBZG1pblwiXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRTRVRfQ1VSUkVOVF9BUFBfQllfSUQ6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRsZXQgc3RhdGU9Z2V0U3RhdGUoKVxyXG5cdFx0bGV0IGFwcHM9c3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdXHJcblx0XHRsZXQgZm91bmQ9YXBwc1tpZF1cclxuXHRcdGlmKGZvdW5kKVxyXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uU0VUX0NVUlJFTlRfQVBQKGZvdW5kKSlcclxuXHR9XHJcblx0LFNFVF9DVVJSRU5UX0FQUDphcHA9PntcclxuXHRcdEFwcGxpY2F0aW9uLmN1cnJlbnQ9YXBwXHJcblx0XHRyZXR1cm4ge3R5cGU6YFNFVF9DVVJSRU5UX0FQUGAscGF5bG9hZDphcHB9XHJcblx0fVxyXG5cdCxBUFBTX0ZFVENIRUQ6IGFwcHM9PmRpc3BhdGNoPT57XHJcblx0XHRpZihhcHBzLmxlbmd0aCl7XHJcblx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShhcHBzLGFycmF5T2YoQXBwbGljYXRpb24uc2NoZW1hKSkuZW50aXRpZXMpKVxyXG5cdFx0XHRsZXQgY3VycmVudD1udWxsXHJcblx0XHRcdGlmKGluaXRBcHApXHJcblx0XHRcdFx0Y3VycmVudD1hcHBzLmZpbmQoYT0+YS5faWQ9PWluaXRBcHApXHJcblx0XHRcdGlmKCFjdXJyZW50KVxyXG5cdFx0XHRcdGN1cnJlbnQ9YXBwc1swXVxyXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uU0VUX0NVUlJFTlRfQVBQKGN1cnJlbnQpKVxyXG5cdFx0fVxyXG5cdH1cclxuXHQsTkVYVF9BUFBMSUNBVElPTjogYXBwPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXHJcblx0XHRjb25zdCBhcHBzPXN0YXRlLmVudGl0aWVzW0FwcGxpY2F0aW9uLl9uYW1lXVxyXG5cdFx0bGV0IGlkcz1PYmplY3Qua2V5cyhhcHBzKVxyXG5cdFx0bGV0IGluZGV4PWlkc1soaWRzLmluZGV4T2YoYXBwKSsxKSVpZHMubGVuZ3RoXVxyXG5cdFx0aWYoaW5kZXgpe1xyXG5cdFx0XHRsZXQgbmV4dD1hcHBzW2luZGV4XVxyXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uU0VUX0NVUlJFTlRfQVBQKG5leHQpKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XHJcblx0c3dpdGNoKHR5cGUpe1xyXG5cdGNhc2UgYFNFVF9DVVJSRU5UX0FQUGA6XHJcblx0XHRyZXR1cm4ge2FwcDpwYXlsb2FkLl9pZH1cclxuXHR9XHJcblx0cmV0dXJuIHN0YXRlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17Y29udGV4dHVhbDp0cnVlfVxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge19pZCxuYW1lLCBjaGlsZHJlbiwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtjb250ZXh0dWFsfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgcHJvcHM9e1xyXG5cdFx0XHRhcHBJZDogXCJxaWxpQWRtaW5cIlxyXG5cdFx0XHQsaW5pdDphPT5BcHBsaWNhdGlvbi5pbml0KCkudGhlbihhcHBzPT5kaXNwYXRjaChBQ1RJT04uQVBQU19GRVRDSEVEKGFwcHMpKSlcclxuXHRcdFx0LHByb2plY3Q6IHJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIilcclxuXHRcdH1cclxuXHRcdGlmKCFfaWQpe1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxRaWxpQXBwIHsuLi5wcm9wc30+XHJcblx0XHRcdFx0XHQ8QXBwQmFyIHRpdGxlPVwiU3RhcnQgZnJvbSB5b3VyIGZpcnN0IHFpbGkgQXBwbGljYWl0b24hXCIvPlxyXG5cdFx0XHRcdFx0PENyZWF0b3IgYkZpcnN0PXt0cnVlfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cclxuXHRcdFx0XHQ8L1FpbGlBcHA+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFFpbGlBcHAgey4uLnByb3BzfT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjb250ZXh0dWFsID8gXHJcblx0XHRcdFx0XHQoPEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIiBtaW5pPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRzdHlsZT17e2ZvbnRTaXplOlwieHgtc21hbGxcIn19XHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ORVhUX0FQUExJQ0FUSU9OKF9pZCkpfT5cclxuXHRcdFx0XHRcdFx0e25hbWV9XHJcblx0XHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPikgOiBudWxsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdDxSb3V0ZXIgaGlzdG9yeT17aGFzaEhpc3Rvcnl9PlxyXG5cdFx0XHRcdFx0PFJvdXRlIHBhdGg9XCIvXCJcclxuXHRcdFx0XHRcdFx0b25FbnRlcj17KHtyb3V0ZXN9KT0+XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y29udGV4dHVhbDohISFyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSl9KVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsocHJldlN0YXRlLCB7cm91dGVzfSk9PlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2NvbnRleHR1YWw6ISEhcm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpfSlcclxuXHRcdFx0XHRcdFx0fT5cclxuXHJcblx0XHRcdFx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XHJcblxyXG5cdFx0XHRcdFx0XHQ8Um91dGUgcGF0aD1cImFwcFwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cclxuXHRcdFx0XHRcdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxyXG5cclxuXHRcdFx0XHRcdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIlxyXG5cdFx0XHRcdFx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KChzdGF0ZSx7cGFyYW1zOntfaWR9fSk9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IHVybEFwcD1nZXRBcHAoc3RhdGUsX2lkKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgY3VycmVudD1nZXRDdXJyZW50QXBwKHN0YXRlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgaW5mbz1jb21wYWN0KHVybEFwcCxcIm5hbWVcIixcInVuYW1lXCIsXCJhcGlLZXlcIilcclxuXHRcdFx0XHRcdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9dXJsQXBwPT1jdXJyZW50XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBpbmZvXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pKEFwcFVJKX1cclxuXHRcdFx0XHRcdFx0XHRcdG9uRW50ZXI9eyh7cGFyYW1zOntfaWR9fSk9PmluaXRBcHA9X2lkfVxyXG5cdFx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHRcdFx0XHRcdDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7Y2xvdWRDb2RlOmdldEN1cnJlbnRBcHAoc3RhdGUpLmNsb3VkQ29kZX0pKShDbG91ZFVJKX0vPlxyXG5cclxuXHRcdFx0XHRcdFx0PFJvdXRlIHBhdGg9XCJkYXRhXCJcclxuXHRcdFx0XHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7Li4uc3RhdGUudWkuZGF0YSxhcHA6Z2V0Q3VycmVudEFwcChzdGF0ZSkuX2lkfSkpKERhdGFVSSl9PlxyXG5cdFx0XHRcdFx0XHRcdDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cclxuXHRcdFx0XHRcdFx0XHQ8Um91dGUgcGF0aD1cIjpuYW1lXCIvPlxyXG5cdFx0XHRcdFx0XHQ8L1JvdXRlPlxyXG5cclxuXHRcdFx0XHRcdFx0PFJvdXRlIHBhdGg9XCJsb2dcIlxyXG5cdFx0XHRcdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+c3RhdGUudWkubG9nKShMb2dVSSl9PlxyXG5cdFx0XHRcdFx0XHRcdDxJbmRleFJlZGlyZWN0IHRvPVwiYWxsXCIvPlxyXG5cdFx0XHRcdFx0XHRcdDxSb3V0ZSBwYXRoPVwiOmxldmVsXCIvPlxyXG5cdFx0XHRcdFx0XHQ8L1JvdXRlPlxyXG5cclxuXHRcdFx0XHRcdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxJbmRleFJvdXRlXHJcblx0XHRcdFx0XHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGFwcHM9c3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB7YXBwczogYXBwcyA/IE9iamVjdC5rZXlzKGFwcHMpLm1hcChrPT5hcHBzW2tdKSA6IFtdfVx0XHJcblx0XHRcdFx0XHRcdFx0XHR9KShNeVVJKX1cclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHR1YWw9e2ZhbHNlfS8+XHJcblxyXG5cdFx0XHRcdFx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxyXG5cdFx0XHRcdFx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxyXG5cdFx0XHRcdFx0XHQ8L1JvdXRlPlxyXG5cdFx0XHRcdFx0PC9Sb3V0ZT5cclxuXHRcdFx0XHQ8L1JvdXRlcj5cclxuICAgICAgICAgICAgPC9RaWxpQXBwPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgU3RhdGVRaWxpQ29uc29sZT1jb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRBcHAoc3RhdGUpLFwiX2lkXCIsXCJuYW1lXCIpKShRaWxpQ29uc29sZSlcclxuXHJcbmV4cG9ydCBjb25zdCBNYWluPVFpbGlBcHAucmVuZGVyKDxTdGF0ZVFpbGlDb25zb2xlLz4se1xyXG5cdFtET01BSU5dOlJFRFVDRVIsXHJcblx0dWk6Y29tYmluZVJlZHVjZXJzKHtcclxuXHRcdGxvZzpMb2dVSS5SRURVQ0VSLFxyXG5cdFx0Y2xvdWQ6Q2xvdWRVSS5SRURVQ0VSLFxyXG5cdFx0ZGF0YTpEYXRhVUkuUkVEVUNFUlxyXG5cdH0pXHJcbn0pXHJcbiJdfQ==