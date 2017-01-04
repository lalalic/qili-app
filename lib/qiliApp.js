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
				entities: normalizeData,
				comment: _comment2.default.reducer
			}, DOMAIN, REDUCER)].concat(_toConsumableArray(reducers)));
			var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
			var store = (0, _redux.createStore)(allReducers, { qiliApp: {}, ui: {}, entities: {}, comment: {} }, composeEnhancers(_redux.applyMiddleware.apply(undefined, [_reduxThunk2.default].concat(middlewars))));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiQ0hFQ0tfVkVSU0lPTiIsImhvbWVwYWdlIiwiY3VycmVudFZlcnNpb24iLCJyZXF1aXJlIiwiZ2V0IiwicmVzIiwib24iLCJkaXNwYXRjaCIsIkJ1ZmZlciIsImRhdGEiLCJ0b1N0cmluZyIsInRyaW0iLCJlbmQiLCJMT0dPVVQiLCJsb2dvdXQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsImxhdGVzdFZlcnNpb24iLCJRaWxpQXBwIiwicHVyZSIsIndpdGhSZWYiLCJwcm9wcyIsInNlcnZpY2UiLCJhcHBJZCIsIkVycm9yIiwiaW5pdEFwcCIsImluaXQiLCJ0aXRsZSIsInByb2plY3QiLCJkb2N1bWVudCIsImUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwibWVzc2FnZSIsInZlcnNpb24iLCJzZWxmIiwic2hvd01lc3NhZ2UiLCJhcmd1bWVudHMiLCJvcGVuIiwiaXMiLCJhcHAiLCJjb3Jkb3ZhIiwidGhlbWUiLCJsYXN0VXNlciIsImNvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJ0dXRvcmlhbCIsImxlbmd0aCIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlIiwibWlkZGxld2FycyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5Iiwicm91dGVyUmR1Y2VyIiwiZW5oYW5jZWRSb3V0ZSIsInJvb3QiLCJvbkVudGVyIiwib25DaGFuZ2UiLCJjbG9uZUVsZW1lbnQiLCJuZXh0U3RhdGUiLCJiaW5kIiwibm9ybWFsaXplRGF0YSIsImVudGl0aWVzIiwia2V5cyIsInJlZHVjZSIsIm1lcmdlZCIsImFsbCIsImEiLCJhbGxSZWR1Y2VycyIsInJvdXRpbmciLCJjb21tZW50IiwicmVkdWNlciIsImNvbXBvc2VFbmhhbmNlcnMiLCJfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18iLCJzdG9yZSIsInFpbGlBcHAiLCJ1aSIsImRlZmF1bHRQcm9wcyIsImZvb3RiYXIiLCJwYWdlIiwid2lkdGgiLCJpbm5lcldpZHRoIiwicHJvcHNUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLDBCQUFPLFNBQWI7O0FBRUEsSUFBTUMsMEJBQU87QUFDbkJDLFNBRG1CLG9CQUNWQyxLQURVLEVBQ0pDLFlBREksRUFDUztBQUMzQixNQUFHLENBQUMsQ0FBQ0QsS0FBTCxFQUFXO0FBQ1YsVUFBTztBQUNORSxpQkFBVUwsTUFBVixpQkFETTtBQUVMTSxhQUFRLEVBQUNDLE1BQUssU0FBS0MsT0FBWCxFQUFtQkwsWUFBbkI7QUFGSCxJQUFQO0FBSUEsR0FMRCxNQUtLO0FBQ0osVUFBTztBQUNORSxpQkFBVUwsTUFBVixZQURNO0FBRUxNLGFBQVEsRUFBQ0YsMEJBQUQ7QUFGSCxJQUFQO0FBSUE7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LFNBQWQ7O2tCQXVNUTNGLE9BQU9DLE1BQVAsQ0FBY0ksT0FBZCxFQUFzQixFQUFDakMsY0FBRCxFQUFTQyxjQUFULEVBQWdCeUIsZ0JBQWhCLEVBQXRCLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxyXG5cclxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcblxyXG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsY29tcG9zZX0gZnJvbSBcInJlZHV4XCJcclxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xyXG5cclxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5pbXBvcnQgTXVpVGhlbWVQcm92aWRlciBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlcidcclxuaW1wb3J0IGdldE11aVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9nZXRNdWlUaGVtZSdcclxuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xyXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcclxuXHJcbmltcG9ydCB7ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gXCIuXCJcclxuXHJcbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXHJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcclxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcclxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcclxuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xyXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXHJcbmltcG9ydCBDb21tZW50IGZyb20gXCIuL2NvbXBvbmVudHMvY29tbWVudFwiXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xyXG5cdFx0aWYoISFlcnJvcil7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXHJcblx0XHRcdFx0LHBheWxvYWQ6e3VzZXI6VXNlci5jdXJyZW50LGVycm9yfVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRgXHJcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQsQ0hFQ0tfVkVSU0lPTjooaG9tZXBhZ2UsY3VycmVudFZlcnNpb24pPT5kaXNwYXRjaD0+e1xyXG5cdFx0cmVxdWlyZShcImh0dHBcIikuZ2V0KGAke2hvbWVwYWdlfS9hcHAuYXBrLnZlcnNpb25gLCByZXM9PntcclxuXHRcdFx0cmVzLm9uKFwiZGF0YVwiLCBkYXRhPT57XHJcblx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmAsIHBheWxvYWQ6bmV3IEJ1ZmZlcihkYXRhKS50b1N0cmluZygpLnRyaW0oKX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KS5lbmQoKVxyXG5cdH1cclxuXHQsTE9HT1VUOiBBPT5Vc2VyLmxvZ291dCgpXHJcblx0LFVTRVJfQ0hBTkdFRDp1c2VyPT4oe1xyXG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcclxuXHRcdCxwYXlsb2FkOnVzZXJcclxuXHR9KSxUVVRPUklBTElaRUQ6KHtcclxuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXHJcblx0fSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRgOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLHtcclxuXHRcdFx0aW5pdGVkOnRydWVcclxuXHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XHJcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcclxuXHRcdH0pXHJcblx0YnJlYWtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XHJcblx0XHRcdGluaXRlZEVycm9yOnBheWxvYWQuZXJyb3JcclxuXHRcdH0pXHJcblx0YnJlYWtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xyXG5cdFx0XHR1c2VyOnBheWxvYWRcclxuXHRcdH0pXHJcblx0Y2FzZSBgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYDpcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHt0dXRvcmlhbGl6ZWQ6dHJ1ZX0pXHJcblxyXG5cdGNhc2UgYEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7bGF0ZXN0VmVyc2lvbjpwYXlsb2FkfSlcclxuXHR9XHJcblxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFxyXG5cdGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdFx0Y29uc3RydWN0b3IocHJvcHMpe1xyXG5cdFx0XHRzdXBlcihwcm9wcylcclxuXHJcblx0XHRcdHN1cHBvcnRUYXAoKVxyXG5cclxuXHRcdFx0Y29uc3Qge3NlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXHJcblxyXG5cdFx0XHRpZighYXBwSWQpXHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXHJcblxyXG5cdFx0XHRpZighc2VydmljZSlcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRcdHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIHByb2plY3QsIGRpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRcdGlmKHRpdGxlKVxyXG5cdFx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXHJcblxyXG5cdFx0XHRpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXHJcblx0XHRcdFx0LnRoZW4oKHR1dG9yaWFsaXplZD1mYWxzZSk9PntcclxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKG51bGwsISF0dXRvcmlhbGl6ZWQpKVxyXG5cdFx0XHRcdFx0XHRVc2VyLm9uKCdjaGFuZ2UnLCB1c2VyPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKHVzZXIpKSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQoZSk9PmRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChlLm1lc3NhZ2UpKSlcclxuXHRcdFx0XHQudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uQ0hFQ0tfVkVSU0lPTihwcm9qZWN0LmhvbWVwYWdlLCBwcm9qZWN0LnZlcnNpb24pKSlcclxuXHRcdH1cclxuXHJcblx0XHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdFx0bGV0IHNlbGY9dGhpc1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNob3dNZXNzYWdlKCl7XHJcblx0XHRcdFx0XHRzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0LGxvYWRpbmcob3Blbil7XHJcblx0XHRcdFx0XHRzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGlzOntcclxuXHRcdFx0XHRcdGFwcDogdHlwZW9mKGNvcmRvdmEpIT09J3VuZGVmaW5lZCdcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHByb2plY3Q6IHRoaXMucHJvcHMucHJvamVjdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd01lc3NhZ2UoKXtcclxuXHRcdFx0dGhpcy5yZWZzLm1zZy5zaG93KC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0cmVuZGVyKCl7XHJcblx0XHRcdGNvbnN0IHt0aGVtZSwgaW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgbGFzdFVzZXIsIHR1dG9yaWFsaXplZCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdFx0bGV0IGNvbnRlbnRcclxuXHJcblx0XHRcdGlmKCFpbml0ZWQpe1xyXG5cdFx0XHRcdGlmKGluaXRlZEVycm9yKVxyXG5cdFx0XHRcdFx0Y29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0Y29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxyXG5cdFx0XHR9ZWxzZSBpZighdXNlcil7XHJcblx0XHRcdFx0aWYoIXR1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKVxyXG5cdFx0XHRcdFx0cmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz4pXHJcblxyXG5cdFx0XHRcdGNvbnRlbnQ9KDxBY2NvdW50IC8+KVxyXG5cdFx0XHR9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xyXG5cdFx0XHRcdGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9Lz4pXHJcblx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHRjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PE11aVRoZW1lUHJvdmlkZXIgbXVpVGhlbWU9e3RoZW1lfT5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cclxuXHRcdFx0XHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0XHRcdFx0XHQ8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxyXG5cdFx0XHRcdFx0XHRcdDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L011aVRoZW1lUHJvdmlkZXI+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHJcblx0XHRyZW5kZXJDb250ZW50KCl7XHJcblx0XHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXHJcblx0XHRcdHRoZW1lOmdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lLHtcclxuXHRcdFx0XHRmb290YmFyOntcclxuXHRcdFx0XHRcdGhlaWdodDogNTBcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHBhZ2U6e1xyXG5cdFx0XHRcdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoID4gOTYwID8gOTYwIDogd2luZG93LmlubmVyV2lkdGhcclxuXHRcdFx0XHRcdCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSxcclxuXHRcdFx0aW5pdCgpe30sXHJcblx0XHRcdHR1dG9yaWFsOltdLFxyXG5cdFx0XHRwcm9qZWN0Ont9XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIHByb3BzVHlwZXM9e1xyXG5cdFx0XHRzZXJ2aWNlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHRcdGFwcElkOlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdFx0dGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuXHRcdFx0aW5pdDpQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFx0dHV0b3JpYWw6UHJvcFR5cGVzLmFycmF5LFxyXG5cdFx0XHR0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdFx0cHJvamVjdDogUHJvcFR5cGVzLm9iamVjdFxyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XHJcblx0XHRcdHNob3dNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFx0bG9hZGluZzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRcdGlzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0XHRwcm9qZWN0OiBQcm9wVHlwZXMub2JqZWN0XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIHJlbmRlcihyb3V0ZSwgcmVkdWNlcnM9W10sIC4uLm1pZGRsZXdhcnMpe1xyXG5cdFx0XHRjb25zdCBwcm9wcz17fVxyXG5cdFx0XHRsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxyXG5cdFx0XHRpZighY29udGFpbmVyKXtcclxuXHRcdFx0XHRjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuXHRcdFx0XHRjb250YWluZXIuaWQ9J2FwcCdcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcclxuXHRcdFx0c3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxyXG5cdFx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXHJcblxyXG5cdFx0XHRpZighcHJvcHMuaGlzdG9yeSlcclxuXHRcdFx0XHRwcm9wcy5oaXN0b3J5PWhhc2hIaXN0b3J5XHJcblxyXG5cdFx0XHRmdW5jdGlvbiByb3V0ZXJSZHVjZXIoc3RhdGU9e30se3R5cGUscGF5bG9hZH0pe1xyXG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0XHRjYXNlICdAQHJvdXRlci9MT0NBVElPTl9DSEFOR0UnOlxyXG5cdFx0XHRcdHJldHVybiBwYXlsb2FkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBlbmhhbmNlZFJvdXRlPShyb290LGRpc3BhdGNoKT0+e1xyXG5cdFx0XHRcdGNvbnN0IHtvbkVudGVyLCBvbkNoYW5nZX09cm9vdC5wcm9wc1xyXG5cdFx0XHRcdHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQocm9vdCwge1xyXG5cdFx0XHRcdFx0b25FbnRlcihuZXh0U3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFYCxwYXlsb2FkOm5leHRTdGF0ZX0pO1xyXG5cdFx0XHRcdFx0XHRvbkVudGVyICYmIG9uRW50ZXIuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b25DaGFuZ2Uoc3RhdGUsbmV4dFN0YXRlKXtcclxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcclxuXHRcdFx0XHRcdFx0b25DaGFuZ2UgJiYgb25DaGFuZ2UuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gbm9ybWFsaXplRGF0YShlbnRpdGllcz17fSx7dHlwZSxwYXlsb2FkfSl7XHJcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdGNhc2UgJ05PUk1BTElaRURfREFUQSc6XHJcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuXHRcdFx0XHRcdFx0e30sXHJcblx0XHRcdFx0XHRcdGVudGl0aWVzLFxyXG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhwYXlsb2FkKS5yZWR1Y2UoKG1lcmdlZCx0eXBlKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGlmKHR5cGVvZihwYXlsb2FkW3R5cGVdWyckcmVtb3ZlJ10pPT0ndW5kZWZpbmVkJylcclxuXHRcdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LGVudGl0aWVzW3R5cGVdLHBheWxvYWRbdHlwZV0pXHJcblx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0bWVyZ2VkW3R5cGVdPU9iamVjdC5hc3NpZ24oe30scGF5bG9hZFt0eXBlXVsnJHJlbW92ZSddLnJlZHVjZSgoYWxsLGEpPT4oZGVsZXRlIGFsbFthXSxhbGwpLGVudGl0aWVzW3R5cGVdKSlcclxuXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1lcmdlZFxyXG5cdFx0XHRcdFx0XHR9LHt9KVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZW50aXRpZXNcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdGNvbnN0IGFsbFJlZHVjZXJzPWVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcclxuXHRcdFx0XHRcdFx0cm91dGluZzpyb3V0ZXJSZHVjZXJcclxuXHRcdFx0XHRcdFx0LGVudGl0aWVzOm5vcm1hbGl6ZURhdGFcclxuXHRcdFx0XHRcdFx0LGNvbW1lbnQ6Q29tbWVudC5yZWR1Y2VyXHJcblx0XHRcdFx0XHRcdCxbRE9NQUlOXTpSRURVQ0VSXHJcblx0XHRcdFx0XHR9LCAuLi5yZWR1Y2VycylcclxuXHRcdFx0Y29uc3QgY29tcG9zZUVuaGFuY2VycyA9IHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18gfHwgY29tcG9zZTtcclxuXHRcdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e30sY29tbWVudDp7fX0sIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcclxuXHJcblx0XHRcdHJldHVybiByZW5kZXIoKFxyXG5cdFx0XHRcdFx0PFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcblx0XHRcdFx0XHRcdDxSb3V0ZXIgey4uLnByb3BzfT5cclxuXHRcdFx0XHRcdFx0XHR7ZW5oYW5jZWRSb3V0ZShyb3V0ZSxzdG9yZS5kaXNwYXRjaCl9XHJcblx0XHRcdFx0XHRcdDwvUm91dGVyPlxyXG5cdFx0XHRcdFx0PC9Qcm92aWRlcj5cclxuXHRcdFx0XHQpLGNvbnRhaW5lcilcclxuXHRcdH1cclxuXHR9XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oUWlsaUFwcCx7RE9NQUlOLCBBQ1RJT04sUkVEVUNFUn0pXHJcbiJdfQ==