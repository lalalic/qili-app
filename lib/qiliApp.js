"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QiliApp = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _comment = require("./components/comment");

var _comment2 = _interopRequireDefault(_comment);

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

var QiliApp = exports.QiliApp = function (_Component) {
	_inherits(QiliApp, _Component);

	function QiliApp(props) {
		_classCallCheck(this, QiliApp);

		var _this = _possibleConstructorReturn(this, (QiliApp.__proto__ || Object.getPrototypeOf(QiliApp)).call(this, props));

		var _this$props = _this.props,
		    service = _this$props.service,
		    appId = _this$props.appId;


		if (!appId) throw new Error("Please give application key");

		if (!service) throw new Error("Please give service url");
		return _this;
	}

	_createClass(QiliApp, [{
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
				if (initedError) content = "initializing Error: " + initedError;else content = "initializing...";
			} else if (!user) {
				if (!tutorialized && Array.isArray(this.props.tutorial) && this.props.tutorial.length) {
					return _react2.default.createElement(
						_MuiThemeProvider2.default,
						{ muiTheme: theme },
						_react2.default.createElement(_tutorial2.default, { slides: this.props.tutorial, onEnd: function onEnd(e) {
								return dispatch(ACTION.TUTORIALIZED);
							} })
					);
				}

				content = _react2.default.createElement(_account2.default, { dispatch: dispatch });
			} else if (!user.sessionToken) {
				content = _react2.default.createElement(_account2.default, { user: user, dispatch: dispatch });
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

			var customizedReducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

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

			var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
			var enhanceReducers = QiliApp.enhanceReducers,
			    INIT_STATE = QiliApp.INIT_STATE;

			var store = (0, _redux.createStore)(enhanceReducers(customizedReducers), INIT_STATE, composeEnhancers(_redux.applyMiddleware.apply(undefined, [_reduxThunk2.default].concat(middlewars))));

			(0, _reactTapEventPlugin2.default)();

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
	}, {
		key: "enhanceReducers",
		value: function enhanceReducers() {
			var customized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{ ui: function ui() {
					var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
					return state;
				} }];

			function routerReducer() {
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

			return _.enhancedCombineReducers.apply(undefined, [_defineProperty({
				routing: routerReducer,
				entities: normalizeData,
				comment: _comment2.default.reducer
			}, DOMAIN, REDUCER)].concat(_toConsumableArray(customized)));
		}
	}, {
		key: "INIT_STATE",
		get: function get() {
			return { qiliApp: {}, ui: {}, entities: {}, comment: {}, routing: {} };
		}
	}]);

	return QiliApp;
}(_react.Component);

QiliApp.defaultProps = {
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
};
QiliApp.propsTypes = {
	service: _react.PropTypes.string.isRequired,
	appId: _react.PropTypes.string.isRequired,
	theme: _react.PropTypes.object.isRequired,
	init: _react.PropTypes.func,
	tutorial: _react.PropTypes.array,
	title: _react.PropTypes.string,
	project: _react.PropTypes.object
};
QiliApp.childContextTypes = {
	showMessage: _react.PropTypes.func,
	loading: _react.PropTypes.func,
	is: _react.PropTypes.object,
	project: _react.PropTypes.object
};
exports.default = Object.assign((0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
}, null, null, { pure: true, withRef: true })(QiliApp), { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiQ0hFQ0tfVkVSU0lPTiIsImhvbWVwYWdlIiwiY3VycmVudFZlcnNpb24iLCJyZXF1aXJlIiwiZ2V0IiwicmVzIiwib24iLCJkaXNwYXRjaCIsIkJ1ZmZlciIsImRhdGEiLCJ0b1N0cmluZyIsInRyaW0iLCJlbmQiLCJMT0dPVVQiLCJsb2dvdXQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsImxhdGVzdFZlcnNpb24iLCJRaWxpQXBwIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJwcm9qZWN0IiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm1lc3NhZ2UiLCJ2ZXJzaW9uIiwic2VsZiIsInNob3dNZXNzYWdlIiwiYXJndW1lbnRzIiwib3BlbiIsImlzIiwiYXBwIiwiY29yZG92YSIsInRoZW1lIiwibGFzdFVzZXIiLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXNzaW9uVG9rZW4iLCJyZW5kZXJDb250ZW50Iiwib3ZlcmZsb3dZIiwiY2hpbGRyZW4iLCJyb3V0ZSIsIm1pZGRsZXdhcnMiLCJjdXN0b21pemVkUmVkdWNlcnMiLCJjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInN0eWxlIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsImhlaWdodCIsImhpc3RvcnkiLCJlbmhhbmNlZFJvdXRlIiwicm9vdCIsIm9uRW50ZXIiLCJvbkNoYW5nZSIsImNsb25lRWxlbWVudCIsIm5leHRTdGF0ZSIsImJpbmQiLCJjb21wb3NlRW5oYW5jZXJzIiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwiZW5oYW5jZVJlZHVjZXJzIiwiSU5JVF9TVEFURSIsInN0b3JlIiwiY3VzdG9taXplZCIsInVpIiwicm91dGVyUmVkdWNlciIsIm5vcm1hbGl6ZURhdGEiLCJlbnRpdGllcyIsImtleXMiLCJyZWR1Y2UiLCJtZXJnZWQiLCJhbGwiLCJhIiwicm91dGluZyIsImNvbW1lbnQiLCJyZWR1Y2VyIiwicWlsaUFwcCIsImRlZmF1bHRQcm9wcyIsImZvb3RiYXIiLCJwYWdlIiwid2lkdGgiLCJpbm5lcldpZHRoIiwicHJvcHNUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsInB1cmUiLCJ3aXRoUmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLDBCQUFPLFNBQWI7O0FBRUEsSUFBTUMsMEJBQU87QUFDbkJDLFNBRG1CLG9CQUNWQyxLQURVLEVBQ0pDLFlBREksRUFDUztBQUMzQixNQUFHLENBQUMsQ0FBQ0QsS0FBTCxFQUFXO0FBQ1YsVUFBTztBQUNORSxpQkFBVUwsTUFBVixpQkFETTtBQUVMTSxhQUFRLEVBQUNDLE1BQUssU0FBS0MsT0FBWCxFQUFtQkwsWUFBbkI7QUFGSCxJQUFQO0FBSUEsR0FMRCxNQUtLO0FBQ0osVUFBTztBQUNORSxpQkFBVUwsTUFBVixZQURN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QU1qQmpGLFFBQU8saUJBQVU2RSxNQU5BO0FBT2pCNUUsVUFBUyxpQkFBVThFO0FBUEYsQztBQTFHTnRGLE8sQ0FvSEx5RixpQixHQUFrQjtBQUN4QnRFLGNBQWEsaUJBQVVvRSxJQURDO0FBRXhCekUsVUFBUyxpQkFBVXlFLElBRks7QUFHeEJqRSxLQUFJLGlCQUFVZ0UsTUFIVTtBQUl4QjlFLFVBQVMsaUJBQVU4RTtBQUpLLEM7a0JBNkZYM0YsT0FBT0MsTUFBUCxDQUFjLHlCQUFRO0FBQUEsUUFBT0YsTUFBTTNCLE1BQU4sQ0FBUDtBQUFBLENBQVIsRUFBNkIsSUFBN0IsRUFBa0MsSUFBbEMsRUFBdUMsRUFBQzJILE1BQUssSUFBTixFQUFXQyxTQUFRLElBQW5CLEVBQXZDLEVBQWlFM0YsT0FBakUsQ0FBZCxFQUF3RixFQUFDakMsY0FBRCxFQUFTQyxjQUFULEVBQWdCeUIsZ0JBQWhCLEVBQXhGLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSxjb21wb3NlfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcblxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IE11aVRoZW1lUHJvdmlkZXIgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL011aVRoZW1lUHJvdmlkZXInXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gXCIuXCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuaW1wb3J0IENvbW1lbnQgZnJvbSBcIi4vY29tcG9uZW50cy9jb21tZW50XCJcblxuZXhwb3J0IGNvbnN0IERPTUFJTj1cInFpbGlBcHBcIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsdHV0b3JpYWxpemVkKXtcblx0XHRpZighIWVycm9yKXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZEVycm9yYFxuXHRcdFx0XHQscGF5bG9hZDp7dXNlcjpVc2VyLmN1cnJlbnQsZXJyb3J9XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRgXG5cdFx0XHRcdCxwYXlsb2FkOnt0dXRvcmlhbGl6ZWR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdCxDSEVDS19WRVJTSU9OOihob21lcGFnZSxjdXJyZW50VmVyc2lvbik9PmRpc3BhdGNoPT57XG5cdFx0cmVxdWlyZShcImh0dHBcIikuZ2V0KGAke2hvbWVwYWdlfS9hcHAuYXBrLnZlcnNpb25gLCByZXM9Pntcblx0XHRcdHJlcy5vbihcImRhdGFcIiwgZGF0YT0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vTEFTVEVTVF9WRVJTSU9OYCwgcGF5bG9hZDpuZXcgQnVmZmVyKGRhdGEpLnRvU3RyaW5nKCkudHJpbSgpfSlcblx0XHRcdH0pXG5cdFx0fSkuZW5kKClcblx0fVxuXHQsTE9HT1VUOiBBPT5Vc2VyLmxvZ291dCgpXG5cdCxVU0VSX0NIQU5HRUQ6dXNlcj0+KHtcbiAgICAgICAgdHlwZTpgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYFxuXHRcdCxwYXlsb2FkOnVzZXJcblx0fSksVFVUT1JJQUxJWkVEOih7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGBcblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLHtcblx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHQsdXNlcjpVc2VyLmN1cnJlbnRcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcblx0XHR9KVxuXHRicmVha1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xuXHRcdFx0aW5pdGVkRXJyb3I6cGF5bG9hZC5lcnJvclxuXHRcdH0pXG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xuXHRcdFx0dXNlcjpwYXlsb2FkXG5cdFx0fSlcblx0Y2FzZSBgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dHV0b3JpYWxpemVkOnRydWV9KVxuXG5cdGNhc2UgYEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2xhdGVzdFZlcnNpb246cGF5bG9hZH0pXG5cdH1cblxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIFFpbGlBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcylcblxuXHRcdGNvbnN0IHtzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuXG5cdFx0aWYoIWFwcElkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cblx0XHRpZighc2VydmljZSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIHByb2plY3QsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0aWYodGl0bGUpXG5cdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxuXG5cdFx0aW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuXHRcdFx0LnRoZW4oKHR1dG9yaWFsaXplZD1mYWxzZSk9Pntcblx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXG5cdFx0XHRcdFx0VXNlci5vbignY2hhbmdlJywgdXNlcj0+ZGlzcGF0Y2goQUNUSU9OLlVTRVJfQ0hBTkdFRCh1c2VyKSkpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxuXHRcdFx0LnRoZW4oYT0+ZGlzcGF0Y2goQUNUSU9OLkNIRUNLX1ZFUlNJT04ocHJvamVjdC5ob21lcGFnZSwgcHJvamVjdC52ZXJzaW9uKSkpXG5cdH1cblxuXHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRsZXQgc2VsZj10aGlzXG5cdFx0cmV0dXJuIHtcblx0XHRcdHNob3dNZXNzYWdlKCl7XG5cdFx0XHRcdHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxuXHRcdFx0fVxuXHRcdFx0LGxvYWRpbmcob3Blbil7XG5cdFx0XHRcdHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxuXHRcdFx0fSxcblx0XHRcdGlzOntcblx0XHRcdFx0YXBwOiB0eXBlb2YoY29yZG92YSkhPT0ndW5kZWZpbmVkJ1xuXHRcdFx0fSxcblx0XHRcdHByb2plY3Q6IHRoaXMucHJvcHMucHJvamVjdFxuXHRcdH1cblx0fVxuXG5cdHNob3dNZXNzYWdlKCl7XG5cdFx0dGhpcy5yZWZzLm1zZy5zaG93KC4uLmFyZ3VtZW50cylcblx0fVxuXG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3RoZW1lLCBpbml0ZWQsIGluaXRlZEVycm9yLCB1c2VyLCBsYXN0VXNlciwgdHV0b3JpYWxpemVkLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGxldCBjb250ZW50XG5cblx0XHRpZighaW5pdGVkKXtcblx0XHRcdGlmKGluaXRlZEVycm9yKVxuXHRcdFx0XHRjb250ZW50PSBgaW5pdGlhbGl6aW5nIEVycm9yOiAke2luaXRlZEVycm9yfWBcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxuXHRcdH1lbHNlIGlmKCF1c2VyKXtcblx0XHRcdGlmKCF0dXRvcmlhbGl6ZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLnR1dG9yaWFsKSAmJiB0aGlzLnByb3BzLnR1dG9yaWFsLmxlbmd0aCl7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PE11aVRoZW1lUHJvdmlkZXIgbXVpVGhlbWU9e3RoZW1lfT5cblx0XHRcdFx0XHRcdDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT5kaXNwYXRjaChBQ1RJT04uVFVUT1JJQUxJWkVEKX0vPlxuXHRcdFx0XHRcdDwvTXVpVGhlbWVQcm92aWRlcj5cblx0XHRcdFx0KVxuXHRcdFx0fVxuXG5cdFx0XHRjb250ZW50PSg8QWNjb3VudCBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz4pXG5cdFx0fWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcblx0XHRcdGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPilcblx0XHR9ZWxzZSB7XG5cdFx0XHRjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxNdWlUaGVtZVByb3ZpZGVyIG11aVRoZW1lPXt0aGVtZX0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuXHRcdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdFx0XHQ8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuXHRcdFx0XHRcdFx0PExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvTXVpVGhlbWVQcm92aWRlcj5cblx0XHQpXG5cdH1cblxuXHRyZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0dGhlbWU6Z2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUse1xuXHRcdFx0Zm9vdGJhcjp7XG5cdFx0XHRcdGhlaWdodDogNTBcblx0XHRcdH0sXG5cdFx0XHRwYWdlOntcblx0XHRcdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoID4gOTYwID8gOTYwIDogd2luZG93LmlubmVyV2lkdGhcblx0XHRcdFx0LGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHRcblx0XHRcdH1cblx0XHR9KSxcblx0XHRpbml0KCl7fSxcblx0XHR0dXRvcmlhbDpbXSxcblx0XHRwcm9qZWN0Ont9XG5cdH1cblxuXHRzdGF0aWMgcHJvcHNUeXBlcz17XG5cdFx0c2VydmljZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGFwcElkOlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHRcdGluaXQ6UHJvcFR5cGVzLmZ1bmMsXG5cdFx0dHV0b3JpYWw6UHJvcFR5cGVzLmFycmF5LFxuXHRcdHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0c2hvd01lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGxvYWRpbmc6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGlzOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdHN0YXRpYyByZW5kZXIocm91dGUsIGN1c3RvbWl6ZWRSZWR1Y2Vycz1bXSwgLi4ubWlkZGxld2Fycyl7XG5cdFx0Y29uc3QgcHJvcHM9e31cblx0XHRsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuXHRcdGlmKCFjb250YWluZXIpe1xuXHRcdFx0Y29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRjb250YWluZXIuaWQ9J2FwcCdcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuXHRcdH1cblx0XHRsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuXHRcdHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcblx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXG5cblx0XHRpZighcHJvcHMuaGlzdG9yeSlcblx0XHRcdHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuXHRcdGNvbnN0IGVuaGFuY2VkUm91dGU9KHJvb3QsZGlzcGF0Y2gpPT57XG5cdFx0XHRjb25zdCB7b25FbnRlciwgb25DaGFuZ2V9PXJvb3QucHJvcHNcblx0XHRcdHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQocm9vdCwge1xuXHRcdFx0XHRvbkVudGVyKG5leHRTdGF0ZSl7XG5cdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcblx0XHRcdFx0XHRvbkVudGVyICYmIG9uRW50ZXIuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9uQ2hhbmdlKHN0YXRlLG5leHRTdGF0ZSl7XG5cdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcblx0XHRcdFx0XHRvbkNoYW5nZSAmJiBvbkNoYW5nZS5iaW5kKHRoaXMpKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0XG5cdFx0Y29uc3QgY29tcG9zZUVuaGFuY2VycyA9IHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18gfHwgY29tcG9zZTtcblx0XHRjb25zdCB7ZW5oYW5jZVJlZHVjZXJzLCBJTklUX1NUQVRFfT1RaWxpQXBwXG5cdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoZW5oYW5jZVJlZHVjZXJzKGN1c3RvbWl6ZWRSZWR1Y2VycyksIElOSVRfU1RBVEUsIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcblxuXHRcdHN1cHBvcnRUYXAoKVxuXG5cdFx0cmV0dXJuIHJlbmRlcigoXG5cdFx0XHRcdDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuXHRcdFx0XHRcdDxSb3V0ZXIgey4uLnByb3BzfT5cblx0XHRcdFx0XHRcdHtlbmhhbmNlZFJvdXRlKHJvdXRlLHN0b3JlLmRpc3BhdGNoKX1cblx0XHRcdFx0XHQ8L1JvdXRlcj5cblx0XHRcdFx0PC9Qcm92aWRlcj5cblx0XHRcdCksY29udGFpbmVyKVxuXHR9XG5cdFxuXHRzdGF0aWMgZ2V0IElOSVRfU1RBVEUoKXtcblx0XHRyZXR1cm4ge3FpbGlBcHA6e30sIHVpOnt9LCBlbnRpdGllczp7fSxjb21tZW50Ont9LHJvdXRpbmc6e319XG5cdH1cblx0XG5cdHN0YXRpYyBlbmhhbmNlUmVkdWNlcnMoY3VzdG9taXplZD1be3VpOihzdGF0ZT17fSk9PnN0YXRlfV0pe1xuXHRcdGZ1bmN0aW9uIHJvdXRlclJlZHVjZXIoc3RhdGU9e30se3R5cGUscGF5bG9hZH0pe1xuXHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0Y2FzZSAnQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFJzpcblx0XHRcdHJldHVybiBwYXlsb2FkXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBub3JtYWxpemVEYXRhKGVudGl0aWVzPXt9LHt0eXBlLHBheWxvYWR9KXtcblx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdGNhc2UgJ05PUk1BTElaRURfREFUQSc6XG5cdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdHt9LFxuXHRcdFx0XHRcdGVudGl0aWVzLFxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHBheWxvYWQpLnJlZHVjZSgobWVyZ2VkLHR5cGUpPT57XG5cdFx0XHRcdFx0XHRpZih0eXBlb2YocGF5bG9hZFt0eXBlXVsnJHJlbW92ZSddKT09J3VuZGVmaW5lZCcpXG5cdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LGVudGl0aWVzW3R5cGVdLHBheWxvYWRbdHlwZV0pXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LHBheWxvYWRbdHlwZV1bJyRyZW1vdmUnXS5yZWR1Y2UoKGFsbCxhKT0+KGRlbGV0ZSBhbGxbYV0sYWxsKSxlbnRpdGllc1t0eXBlXSkpXG5cblx0XHRcdFx0XHRcdHJldHVybiBtZXJnZWRcblx0XHRcdFx0XHR9LHt9KVxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZW50aXRpZXNcblx0XHR9XG5cblxuXHRcdHJldHVybiBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XG5cdFx0XHRcdFx0cm91dGluZzpyb3V0ZXJSZWR1Y2VyXG5cdFx0XHRcdFx0LGVudGl0aWVzOm5vcm1hbGl6ZURhdGFcblx0XHRcdFx0XHQsY29tbWVudDpDb21tZW50LnJlZHVjZXJcblx0XHRcdFx0XHQsW0RPTUFJTl06UkVEVUNFUlxuXHRcdFx0XHR9LCAuLi5jdXN0b21pemVkKVxuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKGNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0sbnVsbCxudWxsLHtwdXJlOnRydWUsd2l0aFJlZjp0cnVlfSkoUWlsaUFwcCkse0RPTUFJTiwgQUNUSU9OLFJFRFVDRVJ9KVxuIl19