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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiQ0hFQ0tfVkVSU0lPTiIsImhvbWVwYWdlIiwiY3VycmVudFZlcnNpb24iLCJyZXF1aXJlIiwiZ2V0IiwicmVzIiwib24iLCJkaXNwYXRjaCIsIkJ1ZmZlciIsImRhdGEiLCJ0b1N0cmluZyIsInRyaW0iLCJlbmQiLCJMT0dPVVQiLCJsb2dvdXQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsImxhdGVzdFZlcnNpb24iLCJRaWxpQXBwIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJwcm9qZWN0IiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm1lc3NhZ2UiLCJ2ZXJzaW9uIiwic2VsZiIsInNob3dNZXNzYWdlIiwiYXJndW1lbnRzIiwib3BlbiIsImlzIiwiYXBwIiwiY29yZG92YSIsInRoZW1lIiwibGFzdFVzZXIiLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXNzaW9uVG9rZW4iLCJyZW5kZXJDb250ZW50Iiwib3ZlcmZsb3dZIiwiY2hpbGRyZW4iLCJyb3V0ZSIsIm1pZGRsZXdhcnMiLCJjdXN0b21pemVkUmVkdWNlcnMiLCJjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInN0eWxlIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsImhlaWdodCIsImhpc3RvcnkiLCJlbmhhbmNlZFJvdXRlIiwicm9vdCIsIm9uRW50ZXIiLCJvbkNoYW5nZSIsImNsb25lRWxlbWVudCIsIm5leHRTdGF0ZSIsImJpbmQiLCJjb21wb3NlRW5oYW5jZXJzIiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwiZW5oYW5jZVJlZHVjZXJzIiwiSU5JVF9TVEFURSIsInN0b3JlIiwiY3VzdG9taXplZCIsInVpIiwicm91dGVyUmVkdWNlciIsIm5vcm1hbGl6ZURhdGEiLCJlbnRpdGllcyIsImtleXMiLCJyZWR1Y2UiLCJtZXJnZWQiLCJhbGwiLCJhIiwicm91dGluZyIsImNvbW1lbnQiLCJyZWR1Y2VyIiwicWlsaUFwcCIsImRlZmF1bHRQcm9wcyIsImZvb3RiYXIiLCJwYWdlIiwid2lkdGgiLCJpbm5lcldpZHRoIiwicHJvcHNUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsInB1cmUiLCJ3aXRoUmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLDBCQUFPLFNBQWI7O0FBRUEsSUFBTUMsMEJBQU87QUFDbkJDLFNBRG1CLG9CQUNWQyxLQURVLEVBQ0pDLFlBREksRUFDUztBQUMzQixNQUFHLENBQUMsQ0FBQ0QsS0FBTCxFQUFXO0FBQ1YsVUFBTztBQUNORSxpQkFBVUwsTUFBVixpQkFETTtBQUVMTSxhQUFRLEVBQUNDLE1BQUssU0FBS0MsT0FBWCxFQUFtQkwsWUFBbkI7QUFGSCxJQUFQO0FBSUEsR0FMRCxNQUtLO0FBQ0osVUFBTztBQUNORSxpQkFBVUwsTUFBVixZQURN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QU1qQmpGLFFBQU8saUJBQVU2RSxNQU5BO0FBT2pCNUUsVUFBUyxpQkFBVThFO0FBUEYsQztBQTFHTnRGLE8sQ0FvSEx5RixpQixHQUFrQjtBQUN4QnRFLGNBQWEsaUJBQVVvRSxJQURDO0FBRXhCekUsVUFBUyxpQkFBVXlFLElBRks7QUFHeEJqRSxLQUFJLGlCQUFVZ0UsTUFIVTtBQUl4QjlFLFVBQVMsaUJBQVU4RTtBQUpLLEM7a0JBNkZYM0YsT0FBT0MsTUFBUCxDQUFjLHlCQUFRO0FBQUEsUUFBT0YsTUFBTTNCLE1BQU4sQ0FBUDtBQUFBLENBQVIsRUFBNkIsSUFBN0IsRUFBa0MsSUFBbEMsRUFBdUMsRUFBQzJILE1BQUssSUFBTixFQUFXQyxTQUFRLElBQW5CLEVBQXZDLEVBQWlFM0YsT0FBakUsQ0FBZCxFQUF3RixFQUFDakMsY0FBRCxFQUFTQyxjQUFULEVBQWdCeUIsZ0JBQWhCLEVBQXhGLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxyXG5cclxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcblxyXG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsY29tcG9zZX0gZnJvbSBcInJlZHV4XCJcclxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xyXG5cclxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5pbXBvcnQgTXVpVGhlbWVQcm92aWRlciBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlcidcclxuaW1wb3J0IGdldE11aVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9nZXRNdWlUaGVtZSdcclxuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xyXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcclxuXHJcbmltcG9ydCB7ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gXCIuXCJcclxuXHJcbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXHJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcclxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcclxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcclxuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xyXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXHJcbmltcG9ydCBDb21tZW50IGZyb20gXCIuL2NvbXBvbmVudHMvY29tbWVudFwiXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xyXG5cdFx0aWYoISFlcnJvcil7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXHJcblx0XHRcdFx0LHBheWxvYWQ6e3VzZXI6VXNlci5jdXJyZW50LGVycm9yfVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRgXHJcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQsQ0hFQ0tfVkVSU0lPTjooaG9tZXBhZ2UsY3VycmVudFZlcnNpb24pPT5kaXNwYXRjaD0+e1xyXG5cdFx0cmVxdWlyZShcImh0dHBcIikuZ2V0KGAke2hvbWVwYWdlfS9hcHAuYXBrLnZlcnNpb25gLCByZXM9PntcclxuXHRcdFx0cmVzLm9uKFwiZGF0YVwiLCBkYXRhPT57XHJcblx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmAsIHBheWxvYWQ6bmV3IEJ1ZmZlcihkYXRhKS50b1N0cmluZygpLnRyaW0oKX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KS5lbmQoKVxyXG5cdH1cclxuXHQsTE9HT1VUOiBBPT5Vc2VyLmxvZ291dCgpXHJcblx0LFVTRVJfQ0hBTkdFRDp1c2VyPT4oe1xyXG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcclxuXHRcdCxwYXlsb2FkOnVzZXJcclxuXHR9KSxUVVRPUklBTElaRUQ6KHtcclxuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXHJcblx0fSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRgOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLHtcclxuXHRcdFx0aW5pdGVkOnRydWVcclxuXHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XHJcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcclxuXHRcdH0pXHJcblx0YnJlYWtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XHJcblx0XHRcdGluaXRlZEVycm9yOnBheWxvYWQuZXJyb3JcclxuXHRcdH0pXHJcblx0YnJlYWtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xyXG5cdFx0XHR1c2VyOnBheWxvYWRcclxuXHRcdH0pXHJcblx0Y2FzZSBgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYDpcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHt0dXRvcmlhbGl6ZWQ6dHJ1ZX0pXHJcblxyXG5cdGNhc2UgYEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7bGF0ZXN0VmVyc2lvbjpwYXlsb2FkfSlcclxuXHR9XHJcblxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUWlsaUFwcCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcblx0XHRzdXBlcihwcm9wcylcclxuXHJcblx0XHRjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcclxuXHJcblx0XHRpZighYXBwSWQpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxyXG5cclxuXHRcdGlmKCFzZXJ2aWNlKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIHByb2plY3QsIGRpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRpZih0aXRsZSlcclxuXHRcdFx0ZG9jdW1lbnQudGl0bGU9dGl0bGVcclxuXHJcblx0XHRpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXHJcblx0XHRcdC50aGVuKCh0dXRvcmlhbGl6ZWQ9ZmFsc2UpPT57XHJcblx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXHJcblx0XHRcdFx0XHRVc2VyLm9uKCdjaGFuZ2UnLCB1c2VyPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKHVzZXIpKSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxyXG5cdFx0XHQudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uQ0hFQ0tfVkVSU0lPTihwcm9qZWN0LmhvbWVwYWdlLCBwcm9qZWN0LnZlcnNpb24pKSlcclxuXHR9XHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0bGV0IHNlbGY9dGhpc1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2hvd01lc3NhZ2UoKXtcclxuXHRcdFx0XHRzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHQsbG9hZGluZyhvcGVuKXtcclxuXHRcdFx0XHRzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcclxuXHRcdFx0fSxcclxuXHRcdFx0aXM6e1xyXG5cdFx0XHRcdGFwcDogdHlwZW9mKGNvcmRvdmEpIT09J3VuZGVmaW5lZCdcclxuXHRcdFx0fSxcclxuXHRcdFx0cHJvamVjdDogdGhpcy5wcm9wcy5wcm9qZWN0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaG93TWVzc2FnZSgpe1xyXG5cdFx0dGhpcy5yZWZzLm1zZy5zaG93KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHt0aGVtZSwgaW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgbGFzdFVzZXIsIHR1dG9yaWFsaXplZCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGxldCBjb250ZW50XHJcblxyXG5cdFx0aWYoIWluaXRlZCl7XHJcblx0XHRcdGlmKGluaXRlZEVycm9yKVxyXG5cdFx0XHRcdGNvbnRlbnQ9IGBpbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0Y29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxyXG5cdFx0fWVsc2UgaWYoIXVzZXIpe1xyXG5cdFx0XHRpZighdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpe1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8TXVpVGhlbWVQcm92aWRlciBtdWlUaGVtZT17dGhlbWV9PlxyXG5cdFx0XHRcdFx0XHQ8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz5cclxuXHRcdFx0XHRcdDwvTXVpVGhlbWVQcm92aWRlcj5cclxuXHRcdFx0XHQpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnRlbnQ9KDxBY2NvdW50IGRpc3BhdGNoPXtkaXNwYXRjaH0vPilcclxuXHRcdH1lbHNlIGlmKCF1c2VyLnNlc3Npb25Ub2tlbil7XHJcblx0XHRcdGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPilcclxuXHRcdH1lbHNlIHtcclxuXHRcdFx0Y29udGVudD10aGlzLnJlbmRlckNvbnRlbnQoKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxNdWlUaGVtZVByb3ZpZGVyIG11aVRoZW1lPXt0aGVtZX0+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxyXG5cdFx0XHRcdFx0PGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cclxuXHRcdFx0XHRcdFx0e2NvbnRlbnR9XHJcblx0XHRcdFx0XHRcdDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XHJcblx0XHRcdFx0XHRcdDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L011aVRoZW1lUHJvdmlkZXI+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRyZW5kZXJDb250ZW50KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxyXG5cdH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHRzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxyXG5cdFx0dGhlbWU6Z2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUse1xyXG5cdFx0XHRmb290YmFyOntcclxuXHRcdFx0XHRoZWlnaHQ6IDUwXHJcblx0XHRcdH0sXHJcblx0XHRcdHBhZ2U6e1xyXG5cdFx0XHRcdHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCA+IDk2MCA/IDk2MCA6IHdpbmRvdy5pbm5lcldpZHRoXHJcblx0XHRcdFx0LGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHRcclxuXHRcdFx0fVxyXG5cdFx0fSksXHJcblx0XHRpbml0KCl7fSxcclxuXHRcdHR1dG9yaWFsOltdLFxyXG5cdFx0cHJvamVjdDp7fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIHByb3BzVHlwZXM9e1xyXG5cdFx0c2VydmljZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0YXBwSWQ6UHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG5cdFx0dGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuXHRcdGluaXQ6UHJvcFR5cGVzLmZ1bmMsXHJcblx0XHR0dXRvcmlhbDpQcm9wVHlwZXMuYXJyYXksXHJcblx0XHR0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XHJcblx0XHRzaG93TWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRsb2FkaW5nOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0cHJvamVjdDogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHJcblx0c3RhdGljIHJlbmRlcihyb3V0ZSwgY3VzdG9taXplZFJlZHVjZXJzPVtdLCAuLi5taWRkbGV3YXJzKXtcclxuXHRcdGNvbnN0IHByb3BzPXt9XHJcblx0XHRsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxyXG5cdFx0aWYoIWNvbnRhaW5lcil7XHJcblx0XHRcdGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG5cdFx0XHRjb250YWluZXIuaWQ9J2FwcCdcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXHJcblx0XHR9XHJcblx0XHRsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXHJcblx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXHJcblx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXHJcblxyXG5cdFx0aWYoIXByb3BzLmhpc3RvcnkpXHJcblx0XHRcdHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcclxuXHJcblx0XHRjb25zdCBlbmhhbmNlZFJvdXRlPShyb290LGRpc3BhdGNoKT0+e1xyXG5cdFx0XHRjb25zdCB7b25FbnRlciwgb25DaGFuZ2V9PXJvb3QucHJvcHNcclxuXHRcdFx0cmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChyb290LCB7XHJcblx0XHRcdFx0b25FbnRlcihuZXh0U3RhdGUpe1xyXG5cdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcclxuXHRcdFx0XHRcdG9uRW50ZXIgJiYgb25FbnRlci5iaW5kKHRoaXMpKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG9uQ2hhbmdlKHN0YXRlLG5leHRTdGF0ZSl7XHJcblx0XHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFYCxwYXlsb2FkOm5leHRTdGF0ZX0pO1xyXG5cdFx0XHRcdFx0b25DaGFuZ2UgJiYgb25DaGFuZ2UuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRjb25zdCBjb21wb3NlRW5oYW5jZXJzID0gd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyB8fCBjb21wb3NlO1xyXG5cdFx0Y29uc3Qge2VuaGFuY2VSZWR1Y2VycywgSU5JVF9TVEFURX09UWlsaUFwcFxyXG5cdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoZW5oYW5jZVJlZHVjZXJzKGN1c3RvbWl6ZWRSZWR1Y2VycyksIElOSVRfU1RBVEUsIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcclxuXHJcblx0XHRzdXBwb3J0VGFwKClcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyKChcclxuXHRcdFx0XHQ8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuXHRcdFx0XHRcdDxSb3V0ZXIgey4uLnByb3BzfT5cclxuXHRcdFx0XHRcdFx0e2VuaGFuY2VkUm91dGUocm91dGUsc3RvcmUuZGlzcGF0Y2gpfVxyXG5cdFx0XHRcdFx0PC9Sb3V0ZXI+XHJcblx0XHRcdFx0PC9Qcm92aWRlcj5cclxuXHRcdFx0KSxjb250YWluZXIpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXQgSU5JVF9TVEFURSgpe1xyXG5cdFx0cmV0dXJuIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e30sY29tbWVudDp7fSxyb3V0aW5nOnt9fVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgZW5oYW5jZVJlZHVjZXJzKGN1c3RvbWl6ZWQ9W3t1aTooc3RhdGU9e30pPT5zdGF0ZX1dKXtcclxuXHRcdGZ1bmN0aW9uIHJvdXRlclJlZHVjZXIoc3RhdGU9e30se3R5cGUscGF5bG9hZH0pe1xyXG5cdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdGNhc2UgJ0BAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRSc6XHJcblx0XHRcdHJldHVybiBwYXlsb2FkXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gbm9ybWFsaXplRGF0YShlbnRpdGllcz17fSx7dHlwZSxwYXlsb2FkfSl7XHJcblx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0Y2FzZSAnTk9STUFMSVpFRF9EQVRBJzpcclxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuXHRcdFx0XHRcdHt9LFxyXG5cdFx0XHRcdFx0ZW50aXRpZXMsXHJcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhwYXlsb2FkKS5yZWR1Y2UoKG1lcmdlZCx0eXBlKT0+e1xyXG5cdFx0XHRcdFx0XHRpZih0eXBlb2YocGF5bG9hZFt0eXBlXVsnJHJlbW92ZSddKT09J3VuZGVmaW5lZCcpXHJcblx0XHRcdFx0XHRcdFx0bWVyZ2VkW3R5cGVdPU9iamVjdC5hc3NpZ24oe30sZW50aXRpZXNbdHlwZV0scGF5bG9hZFt0eXBlXSlcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LHBheWxvYWRbdHlwZV1bJyRyZW1vdmUnXS5yZWR1Y2UoKGFsbCxhKT0+KGRlbGV0ZSBhbGxbYV0sYWxsKSxlbnRpdGllc1t0eXBlXSkpXHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbWVyZ2VkXHJcblx0XHRcdFx0XHR9LHt9KVxyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZW50aXRpZXNcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0cmV0dXJuIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcclxuXHRcdFx0XHRcdHJvdXRpbmc6cm91dGVyUmVkdWNlclxyXG5cdFx0XHRcdFx0LGVudGl0aWVzOm5vcm1hbGl6ZURhdGFcclxuXHRcdFx0XHRcdCxjb21tZW50OkNvbW1lbnQucmVkdWNlclxyXG5cdFx0XHRcdFx0LFtET01BSU5dOlJFRFVDRVJcclxuXHRcdFx0XHR9LCAuLi5jdXN0b21pemVkKVxyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKGNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0sbnVsbCxudWxsLHtwdXJlOnRydWUsd2l0aFJlZjp0cnVlfSkoUWlsaUFwcCkse0RPTUFJTiwgQUNUSU9OLFJFRFVDRVJ9KVxyXG4iXX0=