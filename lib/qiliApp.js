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
				if (!tutorialized && Array.isArray(this.props.tutorial) && this.props.tutorial.length) return _react2.default.createElement(_tutorial2.default, { slides: this.props.tutorial, onEnd: function onEnd(e) {
						return dispatch(ACTION.TUTORIALIZED);
					} });

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiQ0hFQ0tfVkVSU0lPTiIsImhvbWVwYWdlIiwiY3VycmVudFZlcnNpb24iLCJyZXF1aXJlIiwiZ2V0IiwicmVzIiwib24iLCJkaXNwYXRjaCIsIkJ1ZmZlciIsImRhdGEiLCJ0b1N0cmluZyIsInRyaW0iLCJlbmQiLCJMT0dPVVQiLCJsb2dvdXQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsImxhdGVzdFZlcnNpb24iLCJRaWxpQXBwIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJwcm9qZWN0IiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm1lc3NhZ2UiLCJ2ZXJzaW9uIiwic2VsZiIsInNob3dNZXNzYWdlIiwiYXJndW1lbnRzIiwib3BlbiIsImlzIiwiYXBwIiwiY29yZG92YSIsInRoZW1lIiwibGFzdFVzZXIiLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXNzaW9uVG9rZW4iLCJyZW5kZXJDb250ZW50Iiwib3ZlcmZsb3dZIiwiY2hpbGRyZW4iLCJyb3V0ZSIsIm1pZGRsZXdhcnMiLCJyZWR1Y2VycyIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaGVpZ2h0IiwiaGlzdG9yeSIsInJvdXRlclJkdWNlciIsImVuaGFuY2VkUm91dGUiLCJyb290Iiwib25FbnRlciIsIm9uQ2hhbmdlIiwiY2xvbmVFbGVtZW50IiwibmV4dFN0YXRlIiwiYmluZCIsIm5vcm1hbGl6ZURhdGEiLCJlbnRpdGllcyIsImtleXMiLCJyZWR1Y2UiLCJtZXJnZWQiLCJhbGwiLCJhIiwiYWxsUmVkdWNlcnMiLCJyb3V0aW5nIiwiY29tbWVudCIsInJlZHVjZXIiLCJjb21wb3NlRW5oYW5jZXJzIiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwic3RvcmUiLCJxaWxpQXBwIiwidWkiLCJkZWZhdWx0UHJvcHMiLCJmb290YmFyIiwicGFnZSIsIndpZHRoIiwiaW5uZXJXaWR0aCIsInByb3BzVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwib2JqZWN0IiwiZnVuYyIsImFycmF5IiwiY2hpbGRDb250ZXh0VHlwZXMiLCJwdXJlIiwid2l0aFJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSwwQkFBTyxTQUFiOztBQUVBLElBQU1DLDBCQUFPO0FBQ25CQyxTQURtQixvQkFDVkMsS0FEVSxFQUNKQyxZQURJLEVBQ1M7QUFDM0IsTUFBRyxDQUFDLENBQUNELEtBQUwsRUFBVztBQUNWLFVBQU87QUFDTkUsaUJBQVVMLE1BQVYsaUJBRE07QUFFTE0sYUFBUSxFQUFDQyxNQUFLLFNBQUtDLE9BQVgsRUFBbUJMLFlBQW5CO0FBRkgsSUFBUDtBQUlBLEdBTEQsTUFLSztBQUNKLFVBQU87QUFDTkUsaUJBQVVMLE1BQVYsWUFETTtBQUVMTSxhQUFRLEVBQUNGLDBCQUFEO0FBRkgsSUFBUDtBQUlBO0FBQ0QsRUFia0I7QUFjbEJLLGdCQUFjLHVCQUFDQyxRQUFELEVBQVVDLGNBQVY7QUFBQSxTQUEyQixvQkFBVTtBQUNuREMsV0FBUSxNQUFSLEVBQWdCQyxHQUFoQixDQUF1QkgsUUFBdkIsdUJBQW1ELGVBQUs7QUFDdkRJLFFBQUlDLEVBQUosQ0FBTyxNQUFQLEVBQWUsZ0JBQU07QUFDcEJDLGNBQVMsRUFBQ1gsYUFBVUwsTUFBVixxQkFBRCxFQUFxQ00sU0FBUSxJQUFJVyxNQUFKLENBQVdDLElBQVgsRUFBaUJDLFFBQWpCLEdBQTRCQyxJQUE1QixFQUE3QyxFQUFUO0FBQ0EsS0FGRDtBQUdBLElBSkQsRUFJR0MsR0FKSDtBQUtBLEdBTmM7QUFBQSxFQWRJO0FBcUJsQkMsU0FBUTtBQUFBLFNBQUcsU0FBS0MsTUFBTCxFQUFIO0FBQUEsRUFyQlU7QUFzQmxCQyxlQUFhO0FBQUEsU0FBTztBQUNkbkIsZ0JBQVVMLE1BQVYsa0JBRGM7QUFFbkJNLFlBQVFDO0FBRlcsR0FBUDtBQUFBLEVBdEJLLEVBeUJoQmtCLGNBQWM7QUFDVnBCLGVBQVVMLE1BQVY7QUFEVTtBQXpCRSxDQUFiOztBQThCQSxJQUFNMEIsNEJBQVEsU0FBUkEsT0FBUSxHQUEyQjtBQUFBLEtBQTFCQyxLQUEwQix1RUFBcEIsRUFBb0I7QUFBQTtBQUFBLEtBQWhCdEIsSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUMvQyxTQUFPRCxJQUFQO0FBQ0EsY0FBVUwsTUFBVjtBQUNDLFVBQU80QixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkYsS0FBbEIsRUFBd0I7QUFDOUJHLFlBQU8sSUFEdUI7QUFFN0J2QixVQUFLLFNBQUtDLE9BRm1CO0FBRzdCSixrQkFBYUUsUUFBUUY7QUFIUSxJQUF4QixDQUFQO0FBS0Q7QUFDQSxjQUFVSixNQUFWO0FBQ0MsVUFBTzRCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCRixLQUFqQixFQUF1QjtBQUM3QkksaUJBQVl6QixRQUFRSDtBQURTLElBQXZCLENBQVA7QUFHRDtBQUNBLGNBQVVILE1BQVY7QUFDQyxVQUFPNEIsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJGLEtBQWpCLEVBQXVCO0FBQzdCcEIsVUFBS0Q7QUFEd0IsSUFBdkIsQ0FBUDtBQUdELGNBQVVOLE1BQVY7QUFDQyxVQUFPNEIsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJGLEtBQWpCLEVBQXVCLEVBQUN2QixjQUFhLElBQWQsRUFBdkIsQ0FBUDs7QUFFRCxjQUFVSixNQUFWO0FBQ0MsVUFBTzRCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCRixLQUFqQixFQUF1QixFQUFDSyxlQUFjMUIsT0FBZixFQUF2QixDQUFQO0FBckJEOztBQXdCQSxRQUFPcUIsS0FBUDtBQUNBLENBMUJNOztJQTRCTU0sTyxXQUFBQSxPOzs7QUFDWixrQkFBWUMsS0FBWixFQUFrQjtBQUFBOztBQUFBLGdIQUNYQSxLQURXOztBQUFBLG9CQUdNLE1BQUtBLEtBSFg7QUFBQSxNQUdWQyxPQUhVLGVBR1ZBLE9BSFU7QUFBQSxNQUdEQyxLQUhDLGVBR0RBLEtBSEM7OztBQUtqQixNQUFHLENBQUNBLEtBQUosRUFDQyxNQUFNLElBQUlDLEtBQUosQ0FBVSw2QkFBVixDQUFOOztBQUVELE1BQUcsQ0FBQ0YsT0FBSixFQUNDLE1BQU0sSUFBSUUsS0FBSixDQUFVLHlCQUFWLENBQU47QUFUZ0I7QUFVakI7Ozs7c0NBRWtCO0FBQUE7O0FBQUEsZ0JBQzJDLEtBQUtILEtBRGhEO0FBQUEsT0FDUkksT0FEUSxVQUNiQyxJQURhO0FBQUEsT0FDQ0osT0FERCxVQUNDQSxPQUREO0FBQUEsT0FDVUMsS0FEVixVQUNVQSxLQURWO0FBQUEsT0FDaUJJLEtBRGpCLFVBQ2lCQSxLQURqQjtBQUFBLE9BQ3dCQyxPQUR4QixVQUN3QkEsT0FEeEI7QUFBQSxPQUNpQ3pCLFFBRGpDLFVBQ2lDQSxRQURqQzs7QUFFbEIsT0FBR3dCLEtBQUgsRUFDQ0UsU0FBU0YsS0FBVCxHQUFlQSxLQUFmOztBQUVELGlCQUFLTCxPQUFMLEVBQWNDLEtBQWQsRUFBcUJFLE9BQXJCLEVBQThCLFVBQUNLLENBQUQ7QUFBQSxRQUFHdEMsSUFBSCx1RUFBUSxPQUFSO0FBQUEsV0FBa0IsT0FBS3VDLElBQUwsQ0FBVUMsR0FBVixDQUFjQyxJQUFkLENBQW1CSCxDQUFuQixFQUFxQnRDLElBQXJCLENBQWxCO0FBQUEsSUFBOUIsRUFBNEUsS0FBS3VDLElBQUwsQ0FBVUcsT0FBdEYsRUFDRUMsSUFERixDQUNPLFlBQXNCO0FBQUEsUUFBckI1QyxZQUFxQix1RUFBUixLQUFROztBQUMxQlksYUFBU2YsT0FBT0MsUUFBUCxDQUFnQixJQUFoQixFQUFxQixDQUFDLENBQUNFLFlBQXZCLENBQVQ7QUFDQSxhQUFLVyxFQUFMLENBQVEsUUFBUixFQUFrQjtBQUFBLFlBQU1DLFNBQVNmLE9BQU91QixZQUFQLENBQW9CakIsSUFBcEIsQ0FBVCxDQUFOO0FBQUEsS0FBbEI7QUFDQSxJQUpILEVBS0UsVUFBQ29DLENBQUQ7QUFBQSxXQUFLM0IsU0FBU2YsT0FBT0MsUUFBUCxDQUFnQnlDLEVBQUVNLE9BQWxCLENBQVQsQ0FBTDtBQUFBLElBTEYsRUFNRUQsSUFORixDQU1PO0FBQUEsV0FBR2hDLFNBQVNmLE9BQU9RLGFBQVAsQ0FBcUJnQyxRQUFRL0IsUUFBN0IsRUFBdUMrQixRQUFRUyxPQUEvQyxDQUFULENBQUg7QUFBQSxJQU5QO0FBT0E7OztvQ0FFZ0I7QUFDaEIsT0FBSUMsT0FBSyxJQUFUO0FBQ0EsVUFBTztBQUNOQyxlQURNLHlCQUNPO0FBQ1pELFVBQUtDLFdBQUwsYUFBb0JDLFNBQXBCO0FBQ0EsS0FISztBQUlMTixXQUpLLG1CQUlHTyxJQUpILEVBSVE7QUFDYkgsVUFBS1AsSUFBTCxDQUFVRyxPQUFWLENBQWtCTyxPQUFPLE1BQVAsR0FBZ0IsT0FBbEM7QUFDQSxLQU5LOztBQU9OQyxRQUFHO0FBQ0ZDLFVBQUssT0FBT0MsT0FBUCxLQUFrQjtBQURyQixLQVBHO0FBVU5oQixhQUFTLEtBQUtQLEtBQUwsQ0FBV087QUFWZCxJQUFQO0FBWUE7OztnQ0FFWTtBQUFBOztBQUNaLHFCQUFLRyxJQUFMLENBQVVDLEdBQVYsRUFBY0MsSUFBZCxrQkFBc0JPLFNBQXRCO0FBQ0E7OzsyQkFHTztBQUFBLGlCQUNvRSxLQUFLbkIsS0FEekU7QUFBQSxPQUNBd0IsS0FEQSxXQUNBQSxLQURBO0FBQUEsT0FDTzVCLE1BRFAsV0FDT0EsTUFEUDtBQUFBLE9BQ2VDLFdBRGYsV0FDZUEsV0FEZjtBQUFBLE9BQzRCeEIsSUFENUIsV0FDNEJBLElBRDVCO0FBQUEsT0FDa0NvRCxRQURsQyxXQUNrQ0EsUUFEbEM7QUFBQSxPQUM0Q3ZELFlBRDVDLFdBQzRDQSxZQUQ1QztBQUFBLE9BQzBEWSxRQUQxRCxXQUMwREEsUUFEMUQ7O0FBRVAsT0FBSTRDLGdCQUFKOztBQUVBLE9BQUcsQ0FBQzlCLE1BQUosRUFBVztBQUNWLFFBQUdDLFdBQUgsRUFDQzZCLG1DQUFnQzdCLFdBQWhDLENBREQsS0FHQzZCLFVBQVMsaUJBQVQ7QUFDRCxJQUxELE1BS00sSUFBRyxDQUFDckQsSUFBSixFQUFTO0FBQ2QsUUFBRyxDQUFDSCxZQUFELElBQWlCeUQsTUFBTUMsT0FBTixDQUFjLEtBQUs1QixLQUFMLENBQVc2QixRQUF6QixDQUFqQixJQUF1RCxLQUFLN0IsS0FBTCxDQUFXNkIsUUFBWCxDQUFvQkMsTUFBOUUsRUFDQyxPQUFRLG9EQUFVLFFBQVEsS0FBSzlCLEtBQUwsQ0FBVzZCLFFBQTdCLEVBQXVDLE9BQU87QUFBQSxhQUFHL0MsU0FBU2YsT0FBT3dCLFlBQWhCLENBQUg7QUFBQSxNQUE5QyxHQUFSOztBQUVEbUMsY0FBUyxtREFBUyxVQUFVNUMsUUFBbkIsR0FBVDtBQUNBLElBTEssTUFLQSxJQUFHLENBQUNULEtBQUswRCxZQUFULEVBQXNCO0FBQzNCTCxjQUFTLG1EQUFTLE1BQU1yRCxJQUFmLEVBQXFCLFVBQVVTLFFBQS9CLEdBQVQ7QUFDQSxJQUZLLE1BRUE7QUFDTDRDLGNBQVEsS0FBS00sYUFBTCxFQUFSO0FBQ0E7O0FBRUQsVUFDQztBQUFBO0FBQUEsTUFBa0IsVUFBVVIsS0FBNUI7QUFDQztBQUFBO0FBQUEsT0FBSyxXQUFVLGFBQWY7QUFDQztBQUFBO0FBQUEsUUFBSyxJQUFHLFdBQVIsRUFBb0IsT0FBTyxFQUFDUyxXQUFVLFFBQVgsRUFBM0I7QUFDRVAsYUFERjtBQUVDLDBEQUFVLEtBQUksS0FBZCxFQUFvQixXQUFVLG9CQUE5QixHQUZEO0FBR0MseURBQVMsS0FBSSxTQUFiLEVBQXdCLFdBQVUsa0JBQWxDO0FBSEQ7QUFERDtBQURELElBREQ7QUFXQTs7O2tDQUVjO0FBQ2QsVUFBTyxLQUFLMUIsS0FBTCxDQUFXa0MsUUFBbEI7QUFDQTs7O3lCQW1DYUMsSyxFQUFrQztBQUFBLHFDQUFYQyxVQUFXO0FBQVhBLGNBQVc7QUFBQTs7QUFBQSxPQUEzQkMsUUFBMkIsdUVBQWxCLEVBQWtCOztBQUMvQyxPQUFNckMsUUFBTSxFQUFaO0FBQ0EsT0FBSXNDLFlBQVU5QixTQUFTK0IsY0FBVCxDQUF3QixLQUF4QixDQUFkO0FBQ0EsT0FBRyxDQUFDRCxTQUFKLEVBQWM7QUFDYkEsZ0JBQVU5QixTQUFTZ0MsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0FGLGNBQVVHLEVBQVYsR0FBYSxLQUFiO0FBQ0FqQyxhQUFTa0MsSUFBVCxDQUFjQyxXQUFkLENBQTBCTCxTQUExQjtBQUNBO0FBQ0QsT0FBSU0sUUFBTXBDLFNBQVNnQyxhQUFULENBQXVCLE9BQXZCLENBQVY7QUFDQWhDLFlBQVNxQyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxFQUF5Q0YsV0FBekMsQ0FBcURDLEtBQXJEO0FBQ0FBLFNBQU1FLFNBQU4sR0FBZ0Isc0JBQW9CQyxPQUFPQyxXQUEzQixHQUF1QyxLQUF2RDtBQUNBVixhQUFVTSxLQUFWLENBQWdCSyxNQUFoQixHQUF1QkYsT0FBT0MsV0FBUCxHQUFtQixJQUExQzs7QUFFQSxPQUFHLENBQUNoRCxNQUFNa0QsT0FBVixFQUNDbEQsTUFBTWtELE9BQU47O0FBRUQsWUFBU0MsWUFBVCxHQUE4QztBQUFBLFFBQXhCMUQsS0FBd0IsdUVBQWxCLEVBQWtCO0FBQUE7QUFBQSxRQUFkdEIsSUFBYyxTQUFkQSxJQUFjO0FBQUEsUUFBVEMsT0FBUyxTQUFUQSxPQUFTOztBQUM3QyxZQUFPRCxJQUFQO0FBQ0EsVUFBSywwQkFBTDtBQUNBLGFBQU9DLE9BQVA7QUFGQTtBQUlBLFdBQU9xQixLQUFQO0FBQ0E7O0FBRUQsT0FBTTJELGdCQUFjLFNBQWRBLGFBQWMsQ0FBQ0MsSUFBRCxFQUFNdkUsUUFBTixFQUFpQjtBQUFBLHNCQUNWdUUsS0FBS3JELEtBREs7QUFBQSxRQUM3QnNELFFBRDZCLGVBQzdCQSxPQUQ2QjtBQUFBLFFBQ3BCQyxTQURvQixlQUNwQkEsUUFEb0I7O0FBRXBDLFdBQU8sZ0JBQU1DLFlBQU4sQ0FBbUJILElBQW5CLEVBQXlCO0FBQy9CQyxZQUQrQixtQkFDdkJHLFNBRHVCLEVBQ2I7QUFDakIzRSxlQUFTLEVBQUNYLGdDQUFELEVBQWlDQyxTQUFRcUYsU0FBekMsRUFBVDtBQUNBSCxrQkFBV0EsU0FBUUksSUFBUixDQUFhLElBQWIsbUJBQXNCdkMsU0FBdEIsQ0FBWDtBQUNBLE1BSjhCO0FBSy9Cb0MsYUFMK0Isb0JBS3RCOUQsS0FMc0IsRUFLaEJnRSxTQUxnQixFQUtOO0FBQ3hCM0UsZUFBUyxFQUFDWCxnQ0FBRCxFQUFpQ0MsU0FBUXFGLFNBQXpDLEVBQVQ7QUFDQUYsbUJBQVlBLFVBQVNHLElBQVQsQ0FBYyxJQUFkLG1CQUF1QnZDLFNBQXZCLENBQVo7QUFDQTtBQVI4QixLQUF6QixDQUFQO0FBVUEsSUFaRDs7QUFjQSxZQUFTd0MsYUFBVCxHQUFrRDtBQUFBLFFBQTNCQyxRQUEyQix1RUFBbEIsRUFBa0I7QUFBQTtBQUFBLFFBQWR6RixJQUFjLFNBQWRBLElBQWM7QUFBQSxRQUFUQyxPQUFTLFNBQVRBLE9BQVM7O0FBQ2pELFlBQU9ELElBQVA7QUFDQSxVQUFLLGlCQUFMO0FBQ0MsYUFBT3VCLE9BQU9DLE1BQVAsQ0FDTixFQURNLEVBRU5pRSxRQUZNLEVBR05sRSxPQUFPbUUsSUFBUCxDQUFZekYsT0FBWixFQUFxQjBGLE1BQXJCLENBQTRCLFVBQUNDLE1BQUQsRUFBUTVGLElBQVIsRUFBZTtBQUMxQyxXQUFHLE9BQU9DLFFBQVFELElBQVIsRUFBYyxTQUFkLENBQVAsSUFBa0MsV0FBckMsRUFDQzRGLE9BQU81RixJQUFQLElBQWF1QixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQmlFLFNBQVN6RixJQUFULENBQWpCLEVBQWdDQyxRQUFRRCxJQUFSLENBQWhDLENBQWIsQ0FERCxLQUdDNEYsT0FBTzVGLElBQVAsSUFBYXVCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCdkIsUUFBUUQsSUFBUixFQUFjLFNBQWQsRUFBeUIyRixNQUF6QixDQUFnQyxVQUFDRSxHQUFELEVBQUtDLENBQUw7QUFBQSxlQUFVLE9BQU9ELElBQUlDLENBQUosQ0FBUCxFQUFjRCxHQUF4QjtBQUFBLFFBQWhDLEVBQTZESixTQUFTekYsSUFBVCxDQUE3RCxDQUFqQixDQUFiOztBQUVELGNBQU80RixNQUFQO0FBQ0EsT0FQRCxFQU9FLEVBUEYsQ0FITSxDQUFQO0FBRkQ7QUFlQSxXQUFPSCxRQUFQO0FBQ0E7O0FBR0QsT0FBTU0sY0FBWTtBQUNmQyxhQUFRaEIsWUFETztBQUVkUyxjQUFTRCxhQUZLO0FBR2RTLGFBQVEsa0JBQVFDO0FBSEYsTUFJYnZHLE1BSmEsRUFJTDBCLE9BSkssNkJBS1Y2QyxRQUxVLEdBQWxCO0FBTUEsT0FBTWlDLG1CQUFtQnZCLE9BQU93QixvQ0FBUCxrQkFBekI7QUFDQSxPQUFNQyxRQUFNLHdCQUFZTixXQUFaLEVBQXlCLEVBQUNPLFNBQVEsRUFBVCxFQUFhQyxJQUFHLEVBQWhCLEVBQW9CZCxVQUFTLEVBQTdCLEVBQWdDUSxTQUFRLEVBQXhDLEVBQXpCLEVBQXNFRSxpQkFBaUIsc0VBQXlCbEMsVUFBekIsRUFBakIsQ0FBdEUsQ0FBWjs7QUFFQTs7QUFFQSxVQUFPLHNCQUNMO0FBQUE7QUFBQSxNQUFVLE9BQU9vQyxLQUFqQjtBQUNDO0FBQUE7QUFBWXhFLFVBQVo7QUFDRW9ELG1CQUFjakIsS0FBZCxFQUFvQnFDLE1BQU0xRixRQUExQjtBQURGO0FBREQsSUFESyxFQU1Kd0QsU0FOSSxDQUFQO0FBT0E7Ozs7OztBQWxNV3ZDLE8sQ0FxRkw0RSxZLEdBQWE7QUFDbkIxRSxVQUFRLHFCQURXO0FBRW5CdUIsUUFBTSxxREFBMkI7QUFDaENvRCxXQUFRO0FBQ1AzQixXQUFRO0FBREQsR0FEd0I7QUFJaEM0QixRQUFLO0FBQ0pDLFVBQU8vQixPQUFPZ0MsVUFBUCxHQUFvQixHQUFwQixHQUEwQixHQUExQixHQUFnQ2hDLE9BQU9nQyxVQUQxQztBQUVIOUIsV0FBT0YsT0FBT0M7QUFGWDtBQUoyQixFQUEzQixDQUZhO0FBV25CM0MsS0FYbUIsa0JBV2IsQ0FBRSxDQVhXOztBQVluQndCLFdBQVMsRUFaVTtBQWFuQnRCLFVBQVE7QUFiVyxDO0FBckZSUixPLENBcUdMaUYsVSxHQUFXO0FBQ2pCL0UsVUFBUyxpQkFBVWdGLE1BQVYsQ0FBaUJDLFVBRFQ7QUFFakJoRixRQUFNLGlCQUFVK0UsTUFBVixDQUFpQkMsVUFGTjtBQUdqQjFELFFBQU8saUJBQVUyRCxNQUFWLENBQWlCRCxVQUhQO0FBSWpCN0UsT0FBSyxpQkFBVStFLElBSkU7QUFLakJ2RCxXQUFTLGlCQUFVd0QsS0FMRjtBQU1qQi9FLFFBQU8saUJBQVUyRSxNQU5BO0FBT2pCMUUsVUFBUyxpQkFBVTRFO0FBUEYsQztBQXJHTnBGLE8sQ0ErR0x1RixpQixHQUFrQjtBQUN4QnBFLGNBQWEsaUJBQVVrRSxJQURDO0FBRXhCdkUsVUFBUyxpQkFBVXVFLElBRks7QUFHeEIvRCxLQUFJLGlCQUFVOEQsTUFIVTtBQUl4QjVFLFVBQVMsaUJBQVU0RTtBQUpLLEM7a0JBdUZYekYsT0FBT0MsTUFBUCxDQUFjLHlCQUFRO0FBQUEsUUFBT0YsTUFBTTNCLE1BQU4sQ0FBUDtBQUFBLENBQVIsRUFBNkIsSUFBN0IsRUFBa0MsSUFBbEMsRUFBdUMsRUFBQ3lILE1BQUssSUFBTixFQUFXQyxTQUFRLElBQW5CLEVBQXZDLEVBQWlFekYsT0FBakUsQ0FBZCxFQUF3RixFQUFDakMsY0FBRCxFQUFTQyxjQUFULEVBQWdCeUIsZ0JBQWhCLEVBQXhGLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxyXG5cclxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcblxyXG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsY29tcG9zZX0gZnJvbSBcInJlZHV4XCJcclxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xyXG5cclxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5pbXBvcnQgTXVpVGhlbWVQcm92aWRlciBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlcidcclxuaW1wb3J0IGdldE11aVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9nZXRNdWlUaGVtZSdcclxuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xyXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcclxuXHJcbmltcG9ydCB7ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gXCIuXCJcclxuXHJcbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXHJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcclxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcclxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcclxuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xyXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXHJcbmltcG9ydCBDb21tZW50IGZyb20gXCIuL2NvbXBvbmVudHMvY29tbWVudFwiXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xyXG5cdFx0aWYoISFlcnJvcil7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXHJcblx0XHRcdFx0LHBheWxvYWQ6e3VzZXI6VXNlci5jdXJyZW50LGVycm9yfVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRgXHJcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQsQ0hFQ0tfVkVSU0lPTjooaG9tZXBhZ2UsY3VycmVudFZlcnNpb24pPT5kaXNwYXRjaD0+e1xyXG5cdFx0cmVxdWlyZShcImh0dHBcIikuZ2V0KGAke2hvbWVwYWdlfS9hcHAuYXBrLnZlcnNpb25gLCByZXM9PntcclxuXHRcdFx0cmVzLm9uKFwiZGF0YVwiLCBkYXRhPT57XHJcblx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmAsIHBheWxvYWQ6bmV3IEJ1ZmZlcihkYXRhKS50b1N0cmluZygpLnRyaW0oKX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KS5lbmQoKVxyXG5cdH1cclxuXHQsTE9HT1VUOiBBPT5Vc2VyLmxvZ291dCgpXHJcblx0LFVTRVJfQ0hBTkdFRDp1c2VyPT4oe1xyXG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcclxuXHRcdCxwYXlsb2FkOnVzZXJcclxuXHR9KSxUVVRPUklBTElaRUQ6KHtcclxuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXHJcblx0fSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRgOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLHtcclxuXHRcdFx0aW5pdGVkOnRydWVcclxuXHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XHJcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcclxuXHRcdH0pXHJcblx0YnJlYWtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XHJcblx0XHRcdGluaXRlZEVycm9yOnBheWxvYWQuZXJyb3JcclxuXHRcdH0pXHJcblx0YnJlYWtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xyXG5cdFx0XHR1c2VyOnBheWxvYWRcclxuXHRcdH0pXHJcblx0Y2FzZSBgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYDpcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHt0dXRvcmlhbGl6ZWQ6dHJ1ZX0pXHJcblxyXG5cdGNhc2UgYEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7bGF0ZXN0VmVyc2lvbjpwYXlsb2FkfSlcclxuXHR9XHJcblxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUWlsaUFwcCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcblx0XHRzdXBlcihwcm9wcylcclxuXHJcblx0XHRjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcclxuXHJcblx0XHRpZighYXBwSWQpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxyXG5cclxuXHRcdGlmKCFzZXJ2aWNlKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIHByb2plY3QsIGRpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRpZih0aXRsZSlcclxuXHRcdFx0ZG9jdW1lbnQudGl0bGU9dGl0bGVcclxuXHJcblx0XHRpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXHJcblx0XHRcdC50aGVuKCh0dXRvcmlhbGl6ZWQ9ZmFsc2UpPT57XHJcblx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXHJcblx0XHRcdFx0XHRVc2VyLm9uKCdjaGFuZ2UnLCB1c2VyPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKHVzZXIpKSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxyXG5cdFx0XHQudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uQ0hFQ0tfVkVSU0lPTihwcm9qZWN0LmhvbWVwYWdlLCBwcm9qZWN0LnZlcnNpb24pKSlcclxuXHR9XHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0bGV0IHNlbGY9dGhpc1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2hvd01lc3NhZ2UoKXtcclxuXHRcdFx0XHRzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHQsbG9hZGluZyhvcGVuKXtcclxuXHRcdFx0XHRzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcclxuXHRcdFx0fSxcclxuXHRcdFx0aXM6e1xyXG5cdFx0XHRcdGFwcDogdHlwZW9mKGNvcmRvdmEpIT09J3VuZGVmaW5lZCdcclxuXHRcdFx0fSxcclxuXHRcdFx0cHJvamVjdDogdGhpcy5wcm9wcy5wcm9qZWN0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaG93TWVzc2FnZSgpe1xyXG5cdFx0dGhpcy5yZWZzLm1zZy5zaG93KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHt0aGVtZSwgaW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgbGFzdFVzZXIsIHR1dG9yaWFsaXplZCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGxldCBjb250ZW50XHJcblxyXG5cdFx0aWYoIWluaXRlZCl7XHJcblx0XHRcdGlmKGluaXRlZEVycm9yKVxyXG5cdFx0XHRcdGNvbnRlbnQ9IGBpbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0Y29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxyXG5cdFx0fWVsc2UgaWYoIXVzZXIpe1xyXG5cdFx0XHRpZighdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXHJcblx0XHRcdFx0cmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz4pXHJcblxyXG5cdFx0XHRjb250ZW50PSg8QWNjb3VudCBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz4pXHJcblx0XHR9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xyXG5cdFx0XHRjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz4pXHJcblx0XHR9ZWxzZSB7XHJcblx0XHRcdGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8TXVpVGhlbWVQcm92aWRlciBtdWlUaGVtZT17dGhlbWV9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XHJcblx0XHRcdFx0XHRcdHtjb250ZW50fVxyXG5cdFx0XHRcdFx0XHQ8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxyXG5cdFx0XHRcdFx0XHQ8TG9hZGluZyByZWY9XCJsb2FkaW5nXCIgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIi8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9NdWlUaGVtZVByb3ZpZGVyPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyQ29udGVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG5cdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcclxuXHRcdHRoZW1lOmdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lLHtcclxuXHRcdFx0Zm9vdGJhcjp7XHJcblx0XHRcdFx0aGVpZ2h0OiA1MFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwYWdlOntcclxuXHRcdFx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGggPiA5NjAgPyA5NjAgOiB3aW5kb3cuaW5uZXJXaWR0aFxyXG5cdFx0XHRcdCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0XHJcblx0XHRcdH1cclxuXHRcdH0pLFxyXG5cdFx0aW5pdCgpe30sXHJcblx0XHR0dXRvcmlhbDpbXSxcclxuXHRcdHByb2plY3Q6e31cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBwcm9wc1R5cGVzPXtcclxuXHRcdHNlcnZpY2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdGFwcElkOlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdHRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcblx0XHRpbml0OlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0dHV0b3JpYWw6UHJvcFR5cGVzLmFycmF5LFxyXG5cdFx0dGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRwcm9qZWN0OiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xyXG5cdFx0c2hvd01lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0bG9hZGluZzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpczogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyByZW5kZXIocm91dGUsIHJlZHVjZXJzPVtdLCAuLi5taWRkbGV3YXJzKXtcclxuXHRcdGNvbnN0IHByb3BzPXt9XHJcblx0XHRsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxyXG5cdFx0aWYoIWNvbnRhaW5lcil7XHJcblx0XHRcdGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG5cdFx0XHRjb250YWluZXIuaWQ9J2FwcCdcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXHJcblx0XHR9XHJcblx0XHRsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXHJcblx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXHJcblx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXHJcblxyXG5cdFx0aWYoIXByb3BzLmhpc3RvcnkpXHJcblx0XHRcdHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcclxuXHJcblx0XHRmdW5jdGlvbiByb3V0ZXJSZHVjZXIoc3RhdGU9e30se3R5cGUscGF5bG9hZH0pe1xyXG5cdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdGNhc2UgJ0BAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRSc6XHJcblx0XHRcdHJldHVybiBwYXlsb2FkXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgZW5oYW5jZWRSb3V0ZT0ocm9vdCxkaXNwYXRjaCk9PntcclxuXHRcdFx0Y29uc3Qge29uRW50ZXIsIG9uQ2hhbmdlfT1yb290LnByb3BzXHJcblx0XHRcdHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQocm9vdCwge1xyXG5cdFx0XHRcdG9uRW50ZXIobmV4dFN0YXRlKXtcclxuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XHJcblx0XHRcdFx0XHRvbkVudGVyICYmIG9uRW50ZXIuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRvbkNoYW5nZShzdGF0ZSxuZXh0U3RhdGUpe1xyXG5cdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcclxuXHRcdFx0XHRcdG9uQ2hhbmdlICYmIG9uQ2hhbmdlLmJpbmQodGhpcykoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBub3JtYWxpemVEYXRhKGVudGl0aWVzPXt9LHt0eXBlLHBheWxvYWR9KXtcclxuXHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRjYXNlICdOT1JNQUxJWkVEX0RBVEEnOlxyXG5cdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxyXG5cdFx0XHRcdFx0e30sXHJcblx0XHRcdFx0XHRlbnRpdGllcyxcclxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHBheWxvYWQpLnJlZHVjZSgobWVyZ2VkLHR5cGUpPT57XHJcblx0XHRcdFx0XHRcdGlmKHR5cGVvZihwYXlsb2FkW3R5cGVdWyckcmVtb3ZlJ10pPT0ndW5kZWZpbmVkJylcclxuXHRcdFx0XHRcdFx0XHRtZXJnZWRbdHlwZV09T2JqZWN0LmFzc2lnbih7fSxlbnRpdGllc1t0eXBlXSxwYXlsb2FkW3R5cGVdKVxyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0bWVyZ2VkW3R5cGVdPU9iamVjdC5hc3NpZ24oe30scGF5bG9hZFt0eXBlXVsnJHJlbW92ZSddLnJlZHVjZSgoYWxsLGEpPT4oZGVsZXRlIGFsbFthXSxhbGwpLGVudGl0aWVzW3R5cGVdKSlcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBtZXJnZWRcclxuXHRcdFx0XHRcdH0se30pXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBlbnRpdGllc1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRjb25zdCBhbGxSZWR1Y2Vycz1lbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XHJcblx0XHRcdFx0XHRyb3V0aW5nOnJvdXRlclJkdWNlclxyXG5cdFx0XHRcdFx0LGVudGl0aWVzOm5vcm1hbGl6ZURhdGFcclxuXHRcdFx0XHRcdCxjb21tZW50OkNvbW1lbnQucmVkdWNlclxyXG5cdFx0XHRcdFx0LFtET01BSU5dOlJFRFVDRVJcclxuXHRcdFx0XHR9LCAuLi5yZWR1Y2VycylcclxuXHRcdGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XHJcblx0XHRjb25zdCBzdG9yZT1jcmVhdGVTdG9yZShhbGxSZWR1Y2Vycywge3FpbGlBcHA6e30sIHVpOnt9LCBlbnRpdGllczp7fSxjb21tZW50Ont9fSwgY29tcG9zZUVuaGFuY2VycyhhcHBseU1pZGRsZXdhcmUodGh1bmssLi4ubWlkZGxld2FycykpKVxyXG5cclxuXHRcdHN1cHBvcnRUYXAoKVxyXG5cclxuXHRcdHJldHVybiByZW5kZXIoKFxyXG5cdFx0XHRcdDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG5cdFx0XHRcdFx0PFJvdXRlciB7Li4ucHJvcHN9PlxyXG5cdFx0XHRcdFx0XHR7ZW5oYW5jZWRSb3V0ZShyb3V0ZSxzdG9yZS5kaXNwYXRjaCl9XHJcblx0XHRcdFx0XHQ8L1JvdXRlcj5cclxuXHRcdFx0XHQ8L1Byb3ZpZGVyPlxyXG5cdFx0XHQpLGNvbnRhaW5lcilcclxuXHR9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKGNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0sbnVsbCxudWxsLHtwdXJlOnRydWUsd2l0aFJlZjp0cnVlfSkoUWlsaUFwcCkse0RPTUFJTiwgQUNUSU9OLFJFRFVDRVJ9KVxyXG4iXX0=