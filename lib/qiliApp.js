"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QiliApp = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require("react-router");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _materialUi = require("material-ui");

var _MuiThemeProvider = require("material-ui/styles/MuiThemeProvider");

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = require("material-ui/styles/getMuiTheme");

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _lightBaseTheme = require("material-ui/styles/baseThemes/lightBaseTheme");

var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

var _keyboardArrowLeft = require("material-ui/svg-icons/hardware/keyboard-arrow-left");

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _ = require(".");

var _db = require("./db");

var _messager = require("./components/messager");

var _messager2 = _interopRequireDefault(_messager);

var _loading = require("./components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactTapEventPlugin = require("react-tap-event-plugin");

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _account = require("./account");

var _account2 = _interopRequireDefault(_account);

var _tutorial = require("./components/tutorial");

var _tutorial2 = _interopRequireDefault(_tutorial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DOMAIN = exports.DOMAIN = "qiliApp";

var ACTION = exports.ACTION = {
	INIT_APP: function INIT_APP(error, tutorialized) {
		if (!!error) {
			return {
				type: "@@" + DOMAIN + "/initedError",
				payload: { user: _db.User.current, error: error }
			};
		} else {
			return {
				type: "@@" + DOMAIN + "/inited",
				payload: { tutorialized: tutorialized }
			};
		}
	},
	CHECK_VERSION: function CHECK_VERSION(homepage, currentVersion) {
		return function (dispatch) {
			require("http").get(homepage + "/app.apk.version", function (res) {
				res.on("data", function (data) {
					dispatch({ type: "@@" + DOMAIN + "/LASTEST_VERSION", payload: new Buffer(data).toString().trim() });
				});
			}).end();
		};
	},
	LOGOUT: function LOGOUT(A) {
		return _db.User.logout();
	},
	USER_CHANGED: function USER_CHANGED(user) {
		return {
			type: "@@" + DOMAIN + "/USER_CHANGED",
			payload: user
		};
	}, TUTORIALIZED: {
		type: "@@" + DOMAIN + "/TUTORIALIZED"
	}
};

var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/inited":
			return Object.assign({}, state, {
				inited: true,
				user: _db.User.current,
				tutorialized: payload.tutorialized
			});
			break;
		case "@@" + DOMAIN + "/initedError":
			return Object.assign({}, state, {
				initedError: payload.error
			});
			break;
		case "@@" + DOMAIN + "/USER_CHANGED":
			return Object.assign({}, state, {
				user: payload
			});
		case "@@" + DOMAIN + "/TUTORIALIZED":
			return Object.assign({}, state, { tutorialized: true });

		case "@@" + DOMAIN + "/LASTEST_VERSION":
			return Object.assign({}, state, { latestVersion: payload });
	}

	return state;
};

var QiliApp = exports.QiliApp = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
}, null, null, { pure: true, withRef: true })((_temp = _class = function (_Component) {
	_inherits(_class, _Component);

	function _class(props) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		(0, _reactTapEventPlugin2.default)();

		var _this$props = _this.props,
		    service = _this$props.service,
		    appId = _this$props.appId;


		if (!appId) throw new Error("Please give application key");

		if (!service) throw new Error("Please give service url");
		return _this;
	}

	_createClass(_class, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var _props = this.props,
			    initApp = _props.init,
			    service = _props.service,
			    appId = _props.appId,
			    title = _props.title,
			    project = _props.project,
			    dispatch = _props.dispatch;

			if (title) document.title = title;

			(0, _db.init)(service, appId, initApp, function (e) {
				var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Error';
				return _this2.refs.msg.show(e, type);
			}, this.refs.loading).then(function () {
				var tutorialized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				dispatch(ACTION.INIT_APP(null, !!tutorialized));
				_db.User.on('change', function (user) {
					return dispatch(ACTION.USER_CHANGED(user));
				});
			}, function (e) {
				return dispatch(ACTION.INIT_APP(e.message));
			}).then(function (a) {
				return dispatch(ACTION.CHECK_VERSION(project.homepage, project.version));
			});
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;
			return {
				showMessage: function showMessage() {
					self.showMessage.apply(self, arguments);
				},
				loading: function loading(open) {
					self.refs.loading[open ? "show" : "close"]();
				},

				is: {
					app: typeof cordova !== 'undefined'
				},
				project: this.props.project
			};
		}
	}, {
		key: "showMessage",
		value: function showMessage() {
			var _refs$msg;

			(_refs$msg = this.refs.msg).show.apply(_refs$msg, arguments);
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    theme = _props2.theme,
			    inited = _props2.inited,
			    initedError = _props2.initedError,
			    user = _props2.user,
			    lastUser = _props2.lastUser,
			    tutorialized = _props2.tutorialized,
			    dispatch = _props2.dispatch;

			var content = void 0;

			if (!inited) {
				if (initedError) content = "Initializing Error: " + initedError;else content = "initializing...";
			} else if (!user) {
				if (!tutorialized && Array.isArray(this.props.tutorial) && this.props.tutorial.length) return _react2.default.createElement(_tutorial2.default, { slides: this.props.tutorial, onEnd: function onEnd(e) {
						return dispatch(ACTION.TUTORIALIZED);
					} });

				content = _react2.default.createElement(_account2.default, null);
			} else if (!user.sessionToken) {
				content = _react2.default.createElement(_account2.default, { user: user });
			} else {
				content = this.renderContent();
			}

			return _react2.default.createElement(
				_MuiThemeProvider2.default,
				{ muiTheme: theme },
				_react2.default.createElement(
					"div",
					{ className: "withFootbar" },
					_react2.default.createElement(
						"div",
						{ id: "container", style: { overflowY: "scroll" } },
						content,
						_react2.default.createElement(_messager2.default, { ref: "msg", className: "sticky bottom left" }),
						_react2.default.createElement(_loading2.default, { ref: "loading", className: "sticky top right" })
					)
				)
			);
		}
	}, {
		key: "renderContent",
		value: function renderContent() {
			return this.props.children;
		}
	}], [{
		key: "render",
		value: function render(route) {
			for (var _len = arguments.length, middlewars = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				middlewars[_key - 2] = arguments[_key];
			}

			var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			var props = {};
			var container = document.getElementById('app');
			if (!container) {
				container = document.createElement('div');
				container.id = 'app';
				document.body.appendChild(container);
			}
			var style = document.createElement("style");
			document.getElementsByTagName("head")[0].appendChild(style);
			style.innerHTML = ".page{min-height:" + window.innerHeight + "px}";
			container.style.height = window.innerHeight + 'px';

			if (!props.history) props.history = _reactRouter.hashHistory;

			function routerRducer() {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var _ref2 = arguments[1];
				var type = _ref2.type,
				    payload = _ref2.payload;

				switch (type) {
					case '@@router/LOCATION_CHANGE':
						return payload;
				}
				return state;
			}

			var enhancedRoute = function enhancedRoute(root, dispatch) {
				var _root$props = root.props,
				    _onEnter = _root$props.onEnter,
				    _onChange = _root$props.onChange;

				return _react2.default.cloneElement(root, {
					onEnter: function onEnter(nextState) {
						dispatch({ type: "@@router/LOCATION_CHANGE", payload: nextState });
						_onEnter && _onEnter.bind(this).apply(undefined, arguments);
					},
					onChange: function onChange(state, nextState) {
						dispatch({ type: "@@router/LOCATION_CHANGE", payload: nextState });
						_onChange && _onChange.bind(this).apply(undefined, arguments);
					}
				});
			};

			function normalizeData() {
				var entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var _ref3 = arguments[1];
				var type = _ref3.type,
				    payload = _ref3.payload;

				switch (type) {
					case 'NORMALIZED_DATA':
						return Object.assign({}, entities, Object.keys(payload).reduce(function (merged, type) {
							if (typeof payload[type]['$remove'] == 'undefined') merged[type] = Object.assign({}, entities[type], payload[type]);else merged[type] = Object.assign({}, payload[type]['$remove'].reduce(function (all, a) {
								return delete all[a], all;
							}, entities[type]));

							return merged;
						}, {}));
				}
				return entities;
			}

			var allReducers = _.enhancedCombineReducers.apply(undefined, [_defineProperty({
				routing: routerRducer,
				entities: normalizeData
			}, DOMAIN, REDUCER)].concat(_toConsumableArray(reducers)));
			var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
			var store = (0, _redux.createStore)(allReducers, { qiliApp: {}, ui: {}, entities: {} }, composeEnhancers(_redux.applyMiddleware.apply(undefined, [_reduxThunk2.default].concat(middlewars))));

			return (0, _reactDom.render)(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(
					_reactRouter.Router,
					props,
					enhancedRoute(route, store.dispatch)
				)
			), container);
		}
	}]);

	return _class;
}(_react.Component), _class.defaultProps = {
	service: "http://qili2.com/1/",
	theme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default, {
		footbar: {
			height: 50
		},
		page: {
			width: window.innerWidth > 960 ? 960 : window.innerWidth,
			height: window.innerHeight
		}
	}),
	init: function init() {},

	tutorial: [],
	project: {}
}, _class.propsTypes = {
	service: _react.PropTypes.string.isRequired,
	appId: _react.PropTypes.string.isRequired,
	theme: _react.PropTypes.object.isRequired,
	init: _react.PropTypes.func,
	tutorial: _react.PropTypes.array,
	title: _react.PropTypes.string,
	project: _react.PropTypes.object
}, _class.childContextTypes = {
	showMessage: _react.PropTypes.func,
	loading: _react.PropTypes.func,
	is: _react.PropTypes.object,
	project: _react.PropTypes.object
}, _temp));

exports.default = Object.assign(QiliApp, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiQ0hFQ0tfVkVSU0lPTiIsImhvbWVwYWdlIiwiY3VycmVudFZlcnNpb24iLCJyZXF1aXJlIiwiZ2V0IiwicmVzIiwib24iLCJkaXNwYXRjaCIsIkJ1ZmZlciIsImRhdGEiLCJ0b1N0cmluZyIsInRyaW0iLCJlbmQiLCJMT0dPVVQiLCJsb2dvdXQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsImxhdGVzdFZlcnNpb24iLCJRaWxpQXBwIiwicHVyZSIsIndpdGhSZWYiLCJwcm9wcyIsInNlcnZpY2UiLCJhcHBJZCIsIkVycm9yIiwiaW5pdEFwcCIsImluaXQiLCJ0aXRsZSIsInByb2plY3QiLCJkb2N1bWVudCIsImUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwibWVzc2FnZSIsInZlcnNpb24iLCJzZWxmIiwic2hvd01lc3NhZ2UiLCJhcmd1bWVudHMiLCJvcGVuIiwiaXMiLCJhcHAiLCJjb3Jkb3ZhIiwidGhlbWUiLCJsYXN0VXNlciIsImNvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJ0dXRvcmlhbCIsImxlbmd0aCIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlIiwibWlkZGxld2FycyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5Iiwicm91dGVyUmR1Y2VyIiwiZW5oYW5jZWRSb3V0ZSIsInJvb3QiLCJvbkVudGVyIiwib25DaGFuZ2UiLCJjbG9uZUVsZW1lbnQiLCJuZXh0U3RhdGUiLCJiaW5kIiwibm9ybWFsaXplRGF0YSIsImVudGl0aWVzIiwia2V5cyIsInJlZHVjZSIsIm1lcmdlZCIsImFsbCIsImEiLCJhbGxSZWR1Y2VycyIsInJvdXRpbmciLCJjb21wb3NlRW5oYW5jZXJzIiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwic3RvcmUiLCJxaWxpQXBwIiwidWkiLCJkZWZhdWx0UHJvcHMiLCJmb290YmFyIiwicGFnZSIsIndpZHRoIiwiaW5uZXJXaWR0aCIsInByb3BzVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwib2JqZWN0IiwiZnVuYyIsImFycmF5IiwiY2hpbGRDb250ZXh0VHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRU8sSUFBTUEsMEJBQU8sU0FBYjs7QUFFQSxJQUFNQywwQkFBTztBQUNuQkMsU0FEbUIsb0JBQ1ZDLEtBRFUsRUFDSkMsWUFESSxFQUNTO0FBQzNCLE1BQUcsQ0FBQyxDQUFDRCxLQUFMLEVBQVc7QUFDVixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLGlCQURNO0FBRUxNLGFBQVEsRUFBQ0MsTUFBSyxTQUFLQyxPQUFYLEVBQW1CTCxZQUFuQjtBQUZILElBQVA7QUFJQSxHQUxELE1BS0s7QUFDSixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLFlBRE07QUFFTE0sYUFBUSxFQUFDRiwwQkFBRDtBQUZILElBQVA7QUFJQTtBQUNELEVBYmtCO0FBY2xCSyxnQkFBYyx1QkFB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QWdCeUIsZ0JBQWhCLEVBQXRCLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSxjb21wb3NlfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcblxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IE11aVRoZW1lUHJvdmlkZXIgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL011aVRoZW1lUHJvdmlkZXInXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gXCIuXCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXG5cdFx0XHRcdCxwYXlsb2FkOnt1c2VyOlVzZXIuY3VycmVudCxlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LENIRUNLX1ZFUlNJT046KGhvbWVwYWdlLGN1cnJlbnRWZXJzaW9uKT0+ZGlzcGF0Y2g9Pntcblx0XHRyZXF1aXJlKFwiaHR0cFwiKS5nZXQoYCR7aG9tZXBhZ2V9L2FwcC5hcGsudmVyc2lvbmAsIHJlcz0+e1xuXHRcdFx0cmVzLm9uKFwiZGF0YVwiLCBkYXRhPT57XG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9MQVNURVNUX1ZFUlNJT05gLCBwYXlsb2FkOm5ldyBCdWZmZXIoZGF0YSkudG9TdHJpbmcoKS50cmltKCl9KVxuXHRcdFx0fSlcblx0XHR9KS5lbmQoKVxuXHR9XG5cdCxMT0dPVVQ6IEE9PlVzZXIubG9nb3V0KClcblx0LFVTRVJfQ0hBTkdFRDp1c2VyPT4oe1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgXG5cdFx0LHBheWxvYWQ6dXNlclxuXHR9KSxUVVRPUklBTElaRUQ6KHtcbiAgICAgICAgdHlwZTpgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYFxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUse1xuXHRcdFx0aW5pdGVkOnRydWVcblx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0LHR1dG9yaWFsaXplZDpwYXlsb2FkLnR1dG9yaWFsaXplZFxuXHRcdH0pXG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZEVycm9yYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XG5cdFx0XHRpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0fSlcblx0YnJlYWtcblx0Y2FzZSBgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XG5cdFx0XHR1c2VyOnBheWxvYWRcblx0XHR9KVxuXHRjYXNlIGBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHt0dXRvcmlhbGl6ZWQ6dHJ1ZX0pXG5cblx0Y2FzZSBgQEAke0RPTUFJTn0vTEFTVEVTVF9WRVJTSU9OYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7bGF0ZXN0VmVyc2lvbjpwYXlsb2FkfSlcblx0fVxuXG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFxuXHRjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0XHRzdXBlcihwcm9wcylcblxuXHRcdFx0c3VwcG9ydFRhcCgpXG5cblx0XHRcdGNvbnN0IHtzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuXG5cdFx0XHRpZighYXBwSWQpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxuXG5cdFx0XHRpZighc2VydmljZSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcblx0XHR9XG5cblx0XHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdFx0dmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgcHJvamVjdCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRcdGlmKHRpdGxlKVxuXHRcdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxuXG5cdFx0XHRpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG5cdFx0XHRcdC50aGVuKCh0dXRvcmlhbGl6ZWQ9ZmFsc2UpPT57XG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXG5cdFx0XHRcdFx0XHRVc2VyLm9uKCdjaGFuZ2UnLCB1c2VyPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKHVzZXIpKSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxuXHRcdFx0XHQudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uQ0hFQ0tfVkVSU0lPTihwcm9qZWN0LmhvbWVwYWdlLCBwcm9qZWN0LnZlcnNpb24pKSlcblx0XHR9XG5cblx0XHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRcdGxldCBzZWxmPXRoaXNcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHNob3dNZXNzYWdlKCl7XG5cdFx0XHRcdFx0c2VsZi5zaG93TWVzc2FnZSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdH1cblx0XHRcdFx0LGxvYWRpbmcob3Blbil7XG5cdFx0XHRcdFx0c2VsZi5yZWZzLmxvYWRpbmdbb3BlbiA/IFwic2hvd1wiIDogXCJjbG9zZVwiXSgpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGlzOntcblx0XHRcdFx0XHRhcHA6IHR5cGVvZihjb3Jkb3ZhKSE9PSd1bmRlZmluZWQnXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHByb2plY3Q6IHRoaXMucHJvcHMucHJvamVjdFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNob3dNZXNzYWdlKCl7XG5cdFx0XHR0aGlzLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxuXHRcdH1cblxuXG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRjb25zdCB7dGhlbWUsIGluaXRlZCwgaW5pdGVkRXJyb3IsIHVzZXIsIGxhc3RVc2VyLCB0dXRvcmlhbGl6ZWQsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0XHRsZXQgY29udGVudFxuXG5cdFx0XHRpZighaW5pdGVkKXtcblx0XHRcdFx0aWYoaW5pdGVkRXJyb3IpXG5cdFx0XHRcdFx0Y29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRjb250ZW50PSBcImluaXRpYWxpemluZy4uLlwiXG5cdFx0XHR9ZWxzZSBpZighdXNlcil7XG5cdFx0XHRcdGlmKCF0dXRvcmlhbGl6ZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLnR1dG9yaWFsKSAmJiB0aGlzLnByb3BzLnR1dG9yaWFsLmxlbmd0aClcblx0XHRcdFx0XHRyZXR1cm4gKDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT5kaXNwYXRjaChBQ1RJT04uVFVUT1JJQUxJWkVEKX0vPilcblxuXHRcdFx0XHRjb250ZW50PSg8QWNjb3VudCAvPilcblx0XHRcdH1lbHNlIGlmKCF1c2VyLnNlc3Npb25Ub2tlbil7XG5cdFx0XHRcdGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9Lz4pXG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PE11aVRoZW1lUHJvdmlkZXIgbXVpVGhlbWU9e3RoZW1lfT5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuXHRcdFx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0XHRcdFx0PE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cblx0XHRcdFx0XHRcdFx0PExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvTXVpVGhlbWVQcm92aWRlcj5cblx0XHRcdClcblx0XHR9XG5cblx0XHRyZW5kZXJDb250ZW50KCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuXHRcdH1cblxuXHRcdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcblx0XHRcdHRoZW1lOmdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lLHtcblx0XHRcdFx0Zm9vdGJhcjp7XG5cdFx0XHRcdFx0aGVpZ2h0OiA1MFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRwYWdlOntcblx0XHRcdFx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGggPiA5NjAgPyA5NjAgOiB3aW5kb3cuaW5uZXJXaWR0aFxuXHRcdFx0XHRcdCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0XG5cdFx0XHRcdH1cblx0XHRcdH0pLFxuXHRcdFx0aW5pdCgpe30sXG5cdFx0XHR0dXRvcmlhbDpbXSxcblx0XHRcdHByb2plY3Q6e31cblx0XHR9XG5cblx0XHRzdGF0aWMgcHJvcHNUeXBlcz17XG5cdFx0XHRzZXJ2aWNlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0XHRhcHBJZDpQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0XHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHRcdFx0aW5pdDpQcm9wVHlwZXMuZnVuYyxcblx0XHRcdHR1dG9yaWFsOlByb3BUeXBlcy5hcnJheSxcblx0XHRcdHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFx0cHJvamVjdDogUHJvcFR5cGVzLm9iamVjdFxuXHRcdH1cblxuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0XHRzaG93TWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHRsb2FkaW5nOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRcdGlzOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdFx0cHJvamVjdDogUHJvcFR5cGVzLm9iamVjdFxuXHRcdH1cblxuXHRcdHN0YXRpYyByZW5kZXIocm91dGUsIHJlZHVjZXJzPVtdLCAuLi5taWRkbGV3YXJzKXtcblx0XHRcdGNvbnN0IHByb3BzPXt9XG5cdFx0XHRsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuXHRcdFx0aWYoIWNvbnRhaW5lcil7XG5cdFx0XHRcdGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0XHRjb250YWluZXIuaWQ9J2FwcCdcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG5cdFx0XHR9XG5cdFx0XHRsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cdFx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG5cdFx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXG5cblx0XHRcdGlmKCFwcm9wcy5oaXN0b3J5KVxuXHRcdFx0XHRwcm9wcy5oaXN0b3J5PWhhc2hIaXN0b3J5XG5cblx0XHRcdGZ1bmN0aW9uIHJvdXRlclJkdWNlcihzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSl7XG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdFx0Y2FzZSAnQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFJzpcblx0XHRcdFx0cmV0dXJuIHBheWxvYWRcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RhdGVcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZW5oYW5jZWRSb3V0ZT0ocm9vdCxkaXNwYXRjaCk9Pntcblx0XHRcdFx0Y29uc3Qge29uRW50ZXIsIG9uQ2hhbmdlfT1yb290LnByb3BzXG5cdFx0XHRcdHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQocm9vdCwge1xuXHRcdFx0XHRcdG9uRW50ZXIobmV4dFN0YXRlKXtcblx0XHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0XHRvbkVudGVyICYmIG9uRW50ZXIuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbkNoYW5nZShzdGF0ZSxuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcblx0XHRcdFx0XHRcdG9uQ2hhbmdlICYmIG9uQ2hhbmdlLmJpbmQodGhpcykoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gbm9ybWFsaXplRGF0YShlbnRpdGllcz17fSx7dHlwZSxwYXlsb2FkfSl7XG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdFx0Y2FzZSAnTk9STUFMSVpFRF9EQVRBJzpcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0XHRcdHt9LFxuXHRcdFx0XHRcdFx0ZW50aXRpZXMsXG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhwYXlsb2FkKS5yZWR1Y2UoKG1lcmdlZCx0eXBlKT0+e1xuXHRcdFx0XHRcdFx0XHRpZih0eXBlb2YocGF5bG9hZFt0eXBlXVsnJHJlbW92ZSddKT09J3VuZGVmaW5lZCcpXG5cdFx0XHRcdFx0XHRcdFx0bWVyZ2VkW3R5cGVdPU9iamVjdC5hc3NpZ24oe30sZW50aXRpZXNbdHlwZV0scGF5bG9hZFt0eXBlXSlcblx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LHBheWxvYWRbdHlwZV1bJyRyZW1vdmUnXS5yZWR1Y2UoKGFsbCxhKT0+KGRlbGV0ZSBhbGxbYV0sYWxsKSxlbnRpdGllc1t0eXBlXSkpXG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1lcmdlZFxuXHRcdFx0XHRcdFx0fSx7fSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGVudGl0aWVzXG5cdFx0XHR9XG5cblxuXHRcdFx0Y29uc3QgYWxsUmVkdWNlcnM9ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoe1xuXHRcdFx0XHRcdFx0cm91dGluZzpyb3V0ZXJSZHVjZXJcblx0XHRcdFx0XHRcdCxlbnRpdGllczpub3JtYWxpemVEYXRhXG5cdFx0XHRcdFx0XHQsW0RPTUFJTl06UkVEVUNFUlxuXHRcdFx0XHRcdH0sIC4uLnJlZHVjZXJzKVxuXHRcdFx0Y29uc3QgY29tcG9zZUVuaGFuY2VycyA9IHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18gfHwgY29tcG9zZTtcblx0XHRcdGNvbnN0IHN0b3JlPWNyZWF0ZVN0b3JlKGFsbFJlZHVjZXJzLCB7cWlsaUFwcDp7fSwgdWk6e30sIGVudGl0aWVzOnt9fSwgY29tcG9zZUVuaGFuY2VycyhhcHBseU1pZGRsZXdhcmUodGh1bmssLi4ubWlkZGxld2FycykpKVxuXG5cdFx0XHRyZXR1cm4gcmVuZGVyKChcblx0XHRcdFx0XHQ8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cblx0XHRcdFx0XHRcdDxSb3V0ZXIgey4uLnByb3BzfT5cblx0XHRcdFx0XHRcdFx0e2VuaGFuY2VkUm91dGUocm91dGUsc3RvcmUuZGlzcGF0Y2gpfVxuXHRcdFx0XHRcdFx0PC9Sb3V0ZXI+XG5cdFx0XHRcdFx0PC9Qcm92aWRlcj5cblx0XHRcdFx0KSxjb250YWluZXIpXG5cdFx0fVxuXHR9XG4pXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oUWlsaUFwcCx7RE9NQUlOLCBBQ1RJT04sUkVEVUNFUn0pXG4iXX0=