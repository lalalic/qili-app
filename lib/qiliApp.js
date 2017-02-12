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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiQ0hFQ0tfVkVSU0lPTiIsImhvbWVwYWdlIiwiY3VycmVudFZlcnNpb24iLCJyZXF1aXJlIiwiZ2V0IiwicmVzIiwib24iLCJkaXNwYXRjaCIsIkJ1ZmZlciIsImRhdGEiLCJ0b1N0cmluZyIsInRyaW0iLCJlbmQiLCJMT0dPVVQiLCJsb2dvdXQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsImxhdGVzdFZlcnNpb24iLCJRaWxpQXBwIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJwcm9qZWN0IiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm1lc3NhZ2UiLCJ2ZXJzaW9uIiwic2VsZiIsInNob3dNZXNzYWdlIiwiYXJndW1lbnRzIiwib3BlbiIsImlzIiwiYXBwIiwiY29yZG92YSIsInRoZW1lIiwibGFzdFVzZXIiLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXNzaW9uVG9rZW4iLCJyZW5kZXJDb250ZW50Iiwib3ZlcmZsb3dZIiwiY2hpbGRyZW4iLCJyb3V0ZSIsIm1pZGRsZXdhcnMiLCJyZWR1Y2VycyIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaGVpZ2h0IiwiaGlzdG9yeSIsInJvdXRlclJkdWNlciIsImVuaGFuY2VkUm91dGUiLCJyb290Iiwib25FbnRlciIsIm9uQ2hhbmdlIiwiY2xvbmVFbGVtZW50IiwibmV4dFN0YXRlIiwiYmluZCIsIm5vcm1hbGl6ZURhdGEiLCJlbnRpdGllcyIsImtleXMiLCJyZWR1Y2UiLCJtZXJnZWQiLCJhbGwiLCJhIiwiYWxsUmVkdWNlcnMiLCJyb3V0aW5nIiwiY29tbWVudCIsInJlZHVjZXIiLCJjb21wb3NlRW5oYW5jZXJzIiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwic3RvcmUiLCJxaWxpQXBwIiwidWkiLCJkZWZhdWx0UHJvcHMiLCJmb290YmFyIiwicGFnZSIsIndpZHRoIiwiaW5uZXJXaWR0aCIsInByb3BzVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwib2JqZWN0IiwiZnVuYyIsImFycmF5IiwiY2hpbGRDb250ZXh0VHlwZXMiLCJwdXJlIiwid2l0aFJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSwwQkFBTyxTQUFiOztBQUVBLElBQU1DLDBCQUFPO0FBQ25CQyxTQURtQixvQkFDVkMsS0FEVSxFQUNKQyxZQURJLEVBQ1M7QUFDM0IsTUFBRyxDQUFDLENBQUNELEtBQUwsRUFBVztBQUNWLFVBQU87QUFDTkUsaUJBQVVMLE1BQVYsaUJBRE07QUFFTE0sYUFBUSxFQUFDQyxNQUFLLFNBQUtDLE9BQVgsRUFBbUJMLFlBQW5CO0FBRkgsSUFBUDtBQUlBLEdBTEQsTUFLSztBQUNKLFVBQU87QUFDTkUsaUJBQVVMLE1BQVYsWUFETTtBQUVMTSxhQUFRLEVBQUNGLDBCQUFEO0FBRkgsSUFBUDtBQUlBO0FB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RixPQUFqRSxDQUFkLEVBQXdGLEVBQUNqQyxjQUFELEVBQVNDLGNBQVQsRUFBZ0J5QixnQkFBaEIsRUFBeEYsQyIsImZpbGUiOiJxaWxpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxuXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLGNvbXBvc2V9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgTXVpVGhlbWVQcm92aWRlciBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlcidcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IHtlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcIi5cIlxuXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5pbXBvcnQgQ29tbWVudCBmcm9tIFwiLi9jb21wb25lbnRzL2NvbW1lbnRcIlxuXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXG5cdFx0XHRcdCxwYXlsb2FkOnt1c2VyOlVzZXIuY3VycmVudCxlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LENIRUNLX1ZFUlNJT046KGhvbWVwYWdlLGN1cnJlbnRWZXJzaW9uKT0+ZGlzcGF0Y2g9Pntcblx0XHRyZXF1aXJlKFwiaHR0cFwiKS5nZXQoYCR7aG9tZXBhZ2V9L2FwcC5hcGsudmVyc2lvbmAsIHJlcz0+e1xuXHRcdFx0cmVzLm9uKFwiZGF0YVwiLCBkYXRhPT57XG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9MQVNURVNUX1ZFUlNJT05gLCBwYXlsb2FkOm5ldyBCdWZmZXIoZGF0YSkudG9TdHJpbmcoKS50cmltKCl9KVxuXHRcdFx0fSlcblx0XHR9KS5lbmQoKVxuXHR9XG5cdCxMT0dPVVQ6IEE9PlVzZXIubG9nb3V0KClcblx0LFVTRVJfQ0hBTkdFRDp1c2VyPT4oe1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgXG5cdFx0LHBheWxvYWQ6dXNlclxuXHR9KSxUVVRPUklBTElaRUQ6KHtcbiAgICAgICAgdHlwZTpgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYFxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUse1xuXHRcdFx0aW5pdGVkOnRydWVcblx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0LHR1dG9yaWFsaXplZDpwYXlsb2FkLnR1dG9yaWFsaXplZFxuXHRcdH0pXG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZEVycm9yYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XG5cdFx0XHRpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0fSlcblx0YnJlYWtcblx0Y2FzZSBgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XG5cdFx0XHR1c2VyOnBheWxvYWRcblx0XHR9KVxuXHRjYXNlIGBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHt0dXRvcmlhbGl6ZWQ6dHJ1ZX0pXG5cblx0Y2FzZSBgQEAke0RPTUFJTn0vTEFTVEVTVF9WRVJTSU9OYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7bGF0ZXN0VmVyc2lvbjpwYXlsb2FkfSlcblx0fVxuXG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY2xhc3MgUWlsaUFwcCBleHRlbmRzIENvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKVxuXG5cdFx0Y29uc3Qge3NlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cblx0XHRpZighYXBwSWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuXHRcdGlmKCFzZXJ2aWNlKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0dmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgcHJvamVjdCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRpZih0aXRsZSlcblx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cblx0XHRpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG5cdFx0XHQudGhlbigodHV0b3JpYWxpemVkPWZhbHNlKT0+e1xuXHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChudWxsLCEhdHV0b3JpYWxpemVkKSlcblx0XHRcdFx0XHRVc2VyLm9uKCdjaGFuZ2UnLCB1c2VyPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKHVzZXIpKSlcblx0XHRcdFx0fSxcblx0XHRcdFx0KGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXG5cdFx0XHQudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uQ0hFQ0tfVkVSU0lPTihwcm9qZWN0LmhvbWVwYWdlLCBwcm9qZWN0LnZlcnNpb24pKSlcblx0fVxuXG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdGxldCBzZWxmPXRoaXNcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2hvd01lc3NhZ2UoKXtcblx0XHRcdFx0c2VsZi5zaG93TWVzc2FnZSguLi5hcmd1bWVudHMpXG5cdFx0XHR9XG5cdFx0XHQsbG9hZGluZyhvcGVuKXtcblx0XHRcdFx0c2VsZi5yZWZzLmxvYWRpbmdbb3BlbiA/IFwic2hvd1wiIDogXCJjbG9zZVwiXSgpXG5cdFx0XHR9LFxuXHRcdFx0aXM6e1xuXHRcdFx0XHRhcHA6IHR5cGVvZihjb3Jkb3ZhKSE9PSd1bmRlZmluZWQnXG5cdFx0XHR9LFxuXHRcdFx0cHJvamVjdDogdGhpcy5wcm9wcy5wcm9qZWN0XG5cdFx0fVxuXHR9XG5cblx0c2hvd01lc3NhZ2UoKXtcblx0XHR0aGlzLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxuXHR9XG5cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7dGhlbWUsIGluaXRlZCwgaW5pdGVkRXJyb3IsIHVzZXIsIGxhc3RVc2VyLCB0dXRvcmlhbGl6ZWQsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGNvbnRlbnRcblxuXHRcdGlmKCFpbml0ZWQpe1xuXHRcdFx0aWYoaW5pdGVkRXJyb3IpXG5cdFx0XHRcdGNvbnRlbnQ9IGBpbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjb250ZW50PSBcImluaXRpYWxpemluZy4uLlwiXG5cdFx0fWVsc2UgaWYoIXVzZXIpe1xuXHRcdFx0aWYoIXR1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKXtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8TXVpVGhlbWVQcm92aWRlciBtdWlUaGVtZT17dGhlbWV9PlxuXHRcdFx0XHRcdFx0PFR1dG9yaWFsIHNsaWRlcz17dGhpcy5wcm9wcy50dXRvcmlhbH0gb25FbmQ9e2U9PmRpc3BhdGNoKEFDVElPTi5UVVRPUklBTElaRUQpfS8+XG5cdFx0XHRcdFx0PC9NdWlUaGVtZVByb3ZpZGVyPlxuXHRcdFx0XHQpXG5cdFx0XHR9XG5cblx0XHRcdGNvbnRlbnQ9KDxBY2NvdW50IGRpc3BhdGNoPXtkaXNwYXRjaH0vPilcblx0XHR9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuXHRcdFx0Y29udGVudD0oPEFjY291bnQgdXNlcj17dXNlcn0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+KVxuXHRcdH1lbHNlIHtcblx0XHRcdGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PE11aVRoZW1lUHJvdmlkZXIgbXVpVGhlbWU9e3RoZW1lfT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuXHRcdFx0XHRcdDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XG5cdFx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0XHRcdDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG5cdFx0XHRcdFx0XHQ8TG9hZGluZyByZWY9XCJsb2FkaW5nXCIgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIi8+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9NdWlUaGVtZVByb3ZpZGVyPlxuXHRcdClcblx0fVxuXG5cdHJlbmRlckNvbnRlbnQoKXtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcblx0XHR0aGVtZTpnZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSx7XG5cdFx0XHRmb290YmFyOntcblx0XHRcdFx0aGVpZ2h0OiA1MFxuXHRcdFx0fSxcblx0XHRcdHBhZ2U6e1xuXHRcdFx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGggPiA5NjAgPyA5NjAgOiB3aW5kb3cuaW5uZXJXaWR0aFxuXHRcdFx0XHQsaGVpZ2h0OndpbmRvdy5pbm5lckhlaWdodFxuXHRcdFx0fVxuXHRcdH0pLFxuXHRcdGluaXQoKXt9LFxuXHRcdHR1dG9yaWFsOltdLFxuXHRcdHByb2plY3Q6e31cblx0fVxuXG5cdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRzZXJ2aWNlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0YXBwSWQ6UHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdHRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdFx0aW5pdDpQcm9wVHlwZXMuZnVuYyxcblx0XHR0dXRvcmlhbDpQcm9wVHlwZXMuYXJyYXksXG5cdFx0dGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0cHJvamVjdDogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRzaG93TWVzc2FnZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0bG9hZGluZzogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aXM6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0cHJvamVjdDogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cblx0c3RhdGljIHJlbmRlcihyb3V0ZSwgcmVkdWNlcnM9W10sIC4uLm1pZGRsZXdhcnMpe1xuXHRcdGNvbnN0IHByb3BzPXt9XG5cdFx0bGV0IGNvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcblx0XHRpZighY29udGFpbmVyKXtcblx0XHRcdGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0Y29udGFpbmVyLmlkPSdhcHAnXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcblx0XHR9XG5cdFx0bGV0IHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcblx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG5cdFx0Y29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG5cdFx0aWYoIXByb3BzLmhpc3RvcnkpXG5cdFx0XHRwcm9wcy5oaXN0b3J5PWhhc2hIaXN0b3J5XG5cblx0XHRmdW5jdGlvbiByb3V0ZXJSZHVjZXIoc3RhdGU9e30se3R5cGUscGF5bG9hZH0pe1xuXHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0Y2FzZSAnQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFJzpcblx0XHRcdHJldHVybiBwYXlsb2FkXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9XG5cblx0XHRjb25zdCBlbmhhbmNlZFJvdXRlPShyb290LGRpc3BhdGNoKT0+e1xuXHRcdFx0Y29uc3Qge29uRW50ZXIsIG9uQ2hhbmdlfT1yb290LnByb3BzXG5cdFx0XHRyZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHJvb3QsIHtcblx0XHRcdFx0b25FbnRlcihuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0b25FbnRlciAmJiBvbkVudGVyLmJpbmQodGhpcykoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkNoYW5nZShzdGF0ZSxuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0b25DaGFuZ2UgJiYgb25DaGFuZ2UuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gbm9ybWFsaXplRGF0YShlbnRpdGllcz17fSx7dHlwZSxwYXlsb2FkfSl7XG5cdFx0XHRzd2l0Y2godHlwZSl7XG5cdFx0XHRjYXNlICdOT1JNQUxJWkVEX0RBVEEnOlxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRlbnRpdGllcyxcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhwYXlsb2FkKS5yZWR1Y2UoKG1lcmdlZCx0eXBlKT0+e1xuXHRcdFx0XHRcdFx0aWYodHlwZW9mKHBheWxvYWRbdHlwZV1bJyRyZW1vdmUnXSk9PSd1bmRlZmluZWQnKVxuXHRcdFx0XHRcdFx0XHRtZXJnZWRbdHlwZV09T2JqZWN0LmFzc2lnbih7fSxlbnRpdGllc1t0eXBlXSxwYXlsb2FkW3R5cGVdKVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRtZXJnZWRbdHlwZV09T2JqZWN0LmFzc2lnbih7fSxwYXlsb2FkW3R5cGVdWyckcmVtb3ZlJ10ucmVkdWNlKChhbGwsYSk9PihkZWxldGUgYWxsW2FdLGFsbCksZW50aXRpZXNbdHlwZV0pKVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gbWVyZ2VkXG5cdFx0XHRcdFx0fSx7fSlcblx0XHRcdFx0KVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVudGl0aWVzXG5cdFx0fVxuXG5cblx0XHRjb25zdCBhbGxSZWR1Y2Vycz1lbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XG5cdFx0XHRcdFx0cm91dGluZzpyb3V0ZXJSZHVjZXJcblx0XHRcdFx0XHQsZW50aXRpZXM6bm9ybWFsaXplRGF0YVxuXHRcdFx0XHRcdCxjb21tZW50OkNvbW1lbnQucmVkdWNlclxuXHRcdFx0XHRcdCxbRE9NQUlOXTpSRURVQ0VSXG5cdFx0XHRcdH0sIC4uLnJlZHVjZXJzKVxuXHRcdGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XG5cdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e30sY29tbWVudDp7fX0sIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcblxuXHRcdHN1cHBvcnRUYXAoKVxuXG5cdFx0cmV0dXJuIHJlbmRlcigoXG5cdFx0XHRcdDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuXHRcdFx0XHRcdDxSb3V0ZXIgey4uLnByb3BzfT5cblx0XHRcdFx0XHRcdHtlbmhhbmNlZFJvdXRlKHJvdXRlLHN0b3JlLmRpc3BhdGNoKX1cblx0XHRcdFx0XHQ8L1JvdXRlcj5cblx0XHRcdFx0PC9Qcm92aWRlcj5cblx0XHRcdCksY29udGFpbmVyKVxuXHR9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihjb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFFpbGlBcHApLHtET01BSU4sIEFDVElPTixSRURVQ0VSfSlcbiJdfQ==