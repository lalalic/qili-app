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

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _materialUi = require("material-ui");

var _CircularProgress = require("material-ui/CircularProgress");

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

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

var _empty = require("./components/empty");

var _empty2 = _interopRequireDefault(_empty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

	function QiliApp() {
		_classCallCheck(this, QiliApp);

		return _possibleConstructorReturn(this, (QiliApp.__proto__ || Object.getPrototypeOf(QiliApp)).apply(this, arguments));
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
			    appId = _props2.appId,
			    service = _props2.service,
			    theme = _props2.theme,
			    inited = _props2.inited,
			    initedError = _props2.initedError,
			    user = _props2.user,
			    lastUser = _props2.lastUser,
			    tutorialized = _props2.tutorialized,
			    dispatch = _props2.dispatch;

			var content = void 0;

			if (!appId) {
				content = _react2.default.createElement(
					_empty2.default,
					{ icon: null },
					_react2.default.createElement(
						"ol",
						{ style: { textAlign: "left" } },
						_react2.default.createElement(
							"li",
							null,
							"\u5728app.qili.com\u4E0A\u521B\u5EFA\u4E00\u4E2A\u5E94\u7528\uFF0C\u83B7\u53D6AppId"
						),
						_react2.default.createElement(
							"li",
							null,
							"\u521B\u5EFA\u4E00\u4E2AReact Component",
							_react2.default.createElement(
								"pre",
								null,
								"\n\timport React from \"react\"\n\timport QiliApp from \"qili-app\"\n\n\tconst MyApp=()=>(\n\t\t<QiliApp appId=\"xxxx\">\n\t\t\thello qili!\n\t\t</QiliApp>\n\t)\n\n\tQiliApp.render(<MyApp/>)\n\t\t\t\t\t\t\t"
							)
						),
						_react2.default.createElement(
							"li",
							null,
							"Have fun"
						)
					)
				);
			} else if (!service) content = _react2.default.createElement(
				_empty2.default,
				null,
				"Please give service url"
			);else if (!inited) {
				if (initedError) content = _react2.default.createElement(
					_empty2.default,
					null,
					"\u521D\u59CB\u5316\u9519\u8BEF: " + initedError
				);else content = _react2.default.createElement(
					_empty2.default,
					null,
					_react2.default.createElement(_CircularProgress2.default, { size: 60, thickness: 7 })
				);
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
		value: function render(customizedQiliApp, customizedReducer) {
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

			var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
			var enhanceReducers = QiliApp.enhanceReducers,
			    INIT_STATE = QiliApp.INIT_STATE;

			for (var _len = arguments.length, middlewars = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				middlewars[_key - 2] = arguments[_key];
			}

			var store = (0, _redux.createStore)(enhanceReducers(customizedReducer), INIT_STATE, composeEnhancers(_redux.applyMiddleware.apply(undefined, [_reduxThunk2.default].concat(middlewars))));

			(0, _reactTapEventPlugin2.default)();

			return (0, _reactDom.render)(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				customizedQiliApp
			), container);
		}
	}, {
		key: "enhanceReducers",
		value: function enhanceReducers() {
			var customized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { ui: function ui() {
					var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
					return state;
				} };

			function normalizeData() {
				var entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var _ref2 = arguments[1];
				var type = _ref2.type,
				    payload = _ref2.payload;

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

			return (0, _.enhancedCombineReducers)(_defineProperty({
				entities: normalizeData,
				comment: _comment2.default.reducer
			}, DOMAIN, REDUCER), customized);
		}
	}, {
		key: "INIT_STATE",
		get: function get() {
			return { qiliApp: {}, ui: {}, entities: {}, comment: {} };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiQ0hFQ0tfVkVSU0lPTiIsImhvbWVwYWdlIiwiY3VycmVudFZlcnNpb24iLCJyZXF1aXJlIiwiZ2V0IiwicmVzIiwib24iLCJkaXNwYXRjaCIsIkJ1ZmZlciIsImRhdGEiLCJ0b1N0cmluZyIsInRyaW0iLCJlbmQiLCJMT0dPVVQiLCJsb2dvdXQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsImxhdGVzdFZlcnNpb24iLCJRaWxpQXBwIiwicHJvcHMiLCJpbml0QXBwIiwiaW5pdCIsInNlcnZpY2UiLCJhcHBJZCIsInRpdGxlIiwicHJvamVjdCIsImRvY3VtZW50IiwiZSIsInJlZnMiLCJtc2ciLCJzaG93IiwibG9hZGluZyIsInRoZW4iLCJtZXNzYWdlIiwidmVyc2lvbiIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJpcyIsImFwcCIsImNvcmRvdmEiLCJ0aGVtZSIsImxhc3RVc2VyIiwiY29udGVudCIsInRleHRBbGlnbiIsIkFycmF5IiwiaXNBcnJheSIsInR1dG9yaWFsIiwibGVuZ3RoIiwic2Vzc2lvblRva2VuIiwicmVuZGVyQ29udGVudCIsIm92ZXJmbG93WSIsImNoaWxkcmVuIiwiY3VzdG9taXplZFFpbGlBcHAiLCJjdXN0b21pemVkUmVkdWNlciIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaGVpZ2h0IiwiY29tcG9zZUVuaGFuY2VycyIsIl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyIsImVuaGFuY2VSZWR1Y2VycyIsIklOSVRfU1RBVEUiLCJtaWRkbGV3YXJzIiwic3RvcmUiLCJjdXN0b21pemVkIiwidWkiLCJub3JtYWxpemVEYXRhIiwiZW50aXRpZXMiLCJrZXlzIiwicmVkdWNlIiwibWVyZ2VkIiwiYWxsIiwiYSIsImNvbW1lbnQiLCJyZWR1Y2VyIiwicWlsaUFwcCIsImRlZmF1bHRQcm9wcyIsImZvb3RiYXIiLCJwYWdlIiwid2lkdGgiLCJpbm5lcldpZHRoIiwicHJvcHNUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsInB1cmUiLCJ3aXRoUmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRU8sSUFBTUEsMEJBQU8sU0FBYjs7QUFFQSxJQUFNQywwQkFBTztBQUNuQkMsU0FEbUIsb0JBQ1ZDLEtBRFUsRUFDSkMsWUFESSxFQUNTO0FBQzNCLE1BQUcsQ0FBQyxDQUFDRCxLQUFMLEVBQVc7QUFDVixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLGlCQURNO0FBRUxNLGFBQVEsRUFBQ0MsTUFBSyxTQUFLQyxPQUFYLEVBQW1CTCxZQUFuQjtBQUZILElBQVA7QUFJQSxHQUxELE1BS0s7QUFDSixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLFlBRE07QUFFTE0sYUFBUSxFQUFDRiwwQkFBRDtBQUZILElBQVA7QUFJQTtBQUNELEVBYmtCO0FBY2xCSyxnQkFBYyx1QkFBQ0MsUUFBRCxFQUFVQyxjQUFWO0FBQUEs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LFFBQU8saUJBQVVvRCxNQUFWLENBQWlCRCxVQUhQO0FBSWpCeEUsT0FBSyxpQkFBVTBFLElBSkU7QUFLakIvQyxXQUFTLGlCQUFVZ0QsS0FMRjtBQU1qQnhFLFFBQU8saUJBQVVvRSxNQU5BO0FBT2pCbkUsVUFBUyxpQkFBVXFFO0FBUEYsQztBQXpITjVFLE8sQ0FtSUwrRSxpQixHQUFrQjtBQUN4QjdELGNBQWEsaUJBQVUyRCxJQURDO0FBRXhCaEUsVUFBUyxpQkFBVWdFLElBRks7QUFHeEJ4RCxLQUFJLGlCQUFVdUQsTUFIVTtBQUl4QnJFLFVBQVMsaUJBQVVxRTtBQUpLLEM7a0JBZ0VYakYsT0FBT0MsTUFBUCxDQUFjLHlCQUFRO0FBQUEsUUFBT0YsTUFBTTNCLE1BQU4sQ0FBUDtBQUFBLENBQVIsRUFBNkIsSUFBN0IsRUFBa0MsSUFBbEMsRUFBdUMsRUFBQ2lILE1BQUssSUFBTixFQUFXQyxTQUFRLElBQW5CLEVBQXZDLEVBQWlFakYsT0FBakUsQ0FBZCxFQUF3RixFQUFDakMsY0FBRCxFQUFTQyxjQUFULEVBQWdCeUIsZ0JBQWhCLEVBQXhGLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxyXG5cclxuaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLGNvbXBvc2V9IGZyb20gXCJyZWR1eFwiXHJcbmltcG9ydCB7UHJvdmlkZXIsIGNvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcclxuXHJcbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcclxuaW1wb3J0IENpcmN1bGFyUHJvZ3Jlc3MgZnJvbSAnbWF0ZXJpYWwtdWkvQ2lyY3VsYXJQcm9ncmVzcydcclxuaW1wb3J0IE11aVRoZW1lUHJvdmlkZXIgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL011aVRoZW1lUHJvdmlkZXInXHJcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXHJcbmltcG9ydCBsaWdodEJhc2VUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvYmFzZVRoZW1lcy9saWdodEJhc2VUaGVtZSdcclxuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXHJcblxyXG5pbXBvcnQge2VuaGFuY2VkQ29tYmluZVJlZHVjZXJzfSBmcm9tIFwiLlwiXHJcblxyXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxyXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXHJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXHJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXHJcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcclxuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxyXG5pbXBvcnQgQ29tbWVudCBmcm9tIFwiLi9jb21wb25lbnRzL2NvbW1lbnRcIlxyXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4vY29tcG9uZW50cy9lbXB0eVwiXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xyXG5cdFx0aWYoISFlcnJvcil7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXHJcblx0XHRcdFx0LHBheWxvYWQ6e3VzZXI6VXNlci5jdXJyZW50LGVycm9yfVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRgXHJcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQsQ0hFQ0tfVkVSU0lPTjooaG9tZXBhZ2UsY3VycmVudFZlcnNpb24pPT5kaXNwYXRjaD0+e1xyXG5cdFx0cmVxdWlyZShcImh0dHBcIikuZ2V0KGAke2hvbWVwYWdlfS9hcHAuYXBrLnZlcnNpb25gLCByZXM9PntcclxuXHRcdFx0cmVzLm9uKFwiZGF0YVwiLCBkYXRhPT57XHJcblx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmAsIHBheWxvYWQ6bmV3IEJ1ZmZlcihkYXRhKS50b1N0cmluZygpLnRyaW0oKX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KS5lbmQoKVxyXG5cdH1cclxuXHQsTE9HT1VUOiBBPT5Vc2VyLmxvZ291dCgpXHJcblx0LFVTRVJfQ0hBTkdFRDp1c2VyPT4oe1xyXG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcclxuXHRcdCxwYXlsb2FkOnVzZXJcclxuXHR9KSxUVVRPUklBTElaRUQ6KHtcclxuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXHJcblx0fSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRgOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLHtcclxuXHRcdFx0aW5pdGVkOnRydWVcclxuXHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XHJcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcclxuXHRcdH0pXHJcblx0YnJlYWtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XHJcblx0XHRcdGluaXRlZEVycm9yOnBheWxvYWQuZXJyb3JcclxuXHRcdH0pXHJcblx0YnJlYWtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xyXG5cdFx0XHR1c2VyOnBheWxvYWRcclxuXHRcdH0pXHJcblx0Y2FzZSBgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYDpcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHt0dXRvcmlhbGl6ZWQ6dHJ1ZX0pXHJcblxyXG5cdGNhc2UgYEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7bGF0ZXN0VmVyc2lvbjpwYXlsb2FkfSlcclxuXHR9XHJcblxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUWlsaUFwcCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0dmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgcHJvamVjdCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGlmKHRpdGxlKVxyXG5cdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxyXG5cclxuXHRcdGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcclxuXHRcdFx0LnRoZW4oKHR1dG9yaWFsaXplZD1mYWxzZSk9PntcclxuXHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChudWxsLCEhdHV0b3JpYWxpemVkKSlcclxuXHRcdFx0XHRcdFVzZXIub24oJ2NoYW5nZScsIHVzZXI9PmRpc3BhdGNoKEFDVElPTi5VU0VSX0NIQU5HRUQodXNlcikpKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0KGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXHJcblx0XHRcdC50aGVuKGE9PmRpc3BhdGNoKEFDVElPTi5DSEVDS19WRVJTSU9OKHByb2plY3QuaG9tZXBhZ2UsIHByb2plY3QudmVyc2lvbikpKVxyXG5cdH1cclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRsZXQgc2VsZj10aGlzXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzaG93TWVzc2FnZSgpe1xyXG5cdFx0XHRcdHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHR9XHJcblx0XHRcdCxsb2FkaW5nKG9wZW4pe1xyXG5cdFx0XHRcdHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpczp7XHJcblx0XHRcdFx0YXBwOiB0eXBlb2YoY29yZG92YSkhPT0ndW5kZWZpbmVkJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRwcm9qZWN0OiB0aGlzLnByb3BzLnByb2plY3RcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNob3dNZXNzYWdlKCl7XHJcblx0XHR0aGlzLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2FwcElkLCBzZXJ2aWNlLCB0aGVtZSwgaW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgbGFzdFVzZXIsIHR1dG9yaWFsaXplZCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGxldCBjb250ZW50XHJcblx0XHRcclxuXHRcdGlmKCFhcHBJZCl7XHJcblx0XHRcdGNvbnRlbnQ9KFxyXG5cdFx0XHRcdDxFbXB0eSBpY29uPXtudWxsfT5cclxuXHRcdFx0XHRcdDxvbCAgc3R5bGU9e3t0ZXh0QWxpZ246XCJsZWZ0XCJ9fT5cclxuXHRcdFx0XHRcdFx0PGxpPuWcqGFwcC5xaWxpLmNvbeS4iuWIm+W7uuS4gOS4quW6lOeUqO+8jOiOt+WPlkFwcElkPC9saT5cclxuXHRcdFx0XHRcdFx0PGxpPuWIm+W7uuS4gOS4qlJlYWN0IENvbXBvbmVudFxyXG5cdFx0XHRcdFx0XHRcdDxwcmU+XHJcblx0XHRcdFx0XHRcdFx0e2BcclxuXHRpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuXHRpbXBvcnQgUWlsaUFwcCBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuXHRjb25zdCBNeUFwcD0oKT0+KFxyXG5cdFx0PFFpbGlBcHAgYXBwSWQ9XCJ4eHh4XCI+XHJcblx0XHRcdGhlbGxvIHFpbGkhXHJcblx0XHQ8L1FpbGlBcHA+XHJcblx0KVxyXG5cclxuXHRRaWxpQXBwLnJlbmRlcig8TXlBcHAvPilcclxuXHRcdFx0XHRcdFx0XHRgfVxyXG5cdFx0XHRcdFx0XHRcdDwvcHJlPlxyXG5cdFx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdFx0XHQ8bGk+SGF2ZSBmdW48L2xpPlxyXG5cdFx0XHRcdFx0PC9vbD5cclxuXHRcdFx0XHQ8L0VtcHR5PlxyXG5cdFx0XHQpXHJcblx0XHR9ZWxzZSBpZighc2VydmljZSlcclxuXHRcdFx0Y29udGVudD0oPEVtcHR5PlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsPC9FbXB0eT4pXHJcblx0XHRlbHNlIGlmKCFpbml0ZWQpe1xyXG5cdFx0XHRpZihpbml0ZWRFcnJvcilcclxuXHRcdFx0XHRjb250ZW50PSg8RW1wdHk+e2DliJ3lp4vljJbplJnor686ICR7aW5pdGVkRXJyb3J9YH08L0VtcHR5PilcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGNvbnRlbnQ9ICg8RW1wdHk+PENpcmN1bGFyUHJvZ3Jlc3Mgc2l6ZT17NjB9IHRoaWNrbmVzcz17N30gLz48L0VtcHR5PilcclxuXHRcdH1lbHNlIGlmKCF1c2VyKXtcclxuXHRcdFx0aWYoIXR1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKXtcclxuXHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0PE11aVRoZW1lUHJvdmlkZXIgbXVpVGhlbWU9e3RoZW1lfT5cclxuXHRcdFx0XHRcdFx0PFR1dG9yaWFsIHNsaWRlcz17dGhpcy5wcm9wcy50dXRvcmlhbH0gb25FbmQ9e2U9PmRpc3BhdGNoKEFDVElPTi5UVVRPUklBTElaRUQpfS8+XHJcblx0XHRcdFx0XHQ8L011aVRoZW1lUHJvdmlkZXI+XHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb250ZW50PSg8QWNjb3VudCBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz4pXHJcblx0XHR9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xyXG5cdFx0XHRjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz4pXHJcblx0XHR9ZWxzZSB7XHJcblx0XHRcdGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8TXVpVGhlbWVQcm92aWRlciBtdWlUaGVtZT17dGhlbWV9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XHJcblx0XHRcdFx0XHRcdHtjb250ZW50fVxyXG5cdFx0XHRcdFx0XHQ8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxyXG5cdFx0XHRcdFx0XHQ8TG9hZGluZyByZWY9XCJsb2FkaW5nXCIgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIi8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9NdWlUaGVtZVByb3ZpZGVyPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyQ29udGVudCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG5cdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcclxuXHRcdHRoZW1lOmdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lLHtcclxuXHRcdFx0Zm9vdGJhcjp7XHJcblx0XHRcdFx0aGVpZ2h0OiA1MFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwYWdlOntcclxuXHRcdFx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGggPiA5NjAgPyA5NjAgOiB3aW5kb3cuaW5uZXJXaWR0aFxyXG5cdFx0XHRcdCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0XHJcblx0XHRcdH1cclxuXHRcdH0pLFxyXG5cdFx0aW5pdCgpe30sXHJcblx0XHR0dXRvcmlhbDpbXSxcclxuXHRcdHByb2plY3Q6e31cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBwcm9wc1R5cGVzPXtcclxuXHRcdHNlcnZpY2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdGFwcElkOlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuXHRcdHRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcblx0XHRpbml0OlByb3BUeXBlcy5mdW5jLFxyXG5cdFx0dHV0b3JpYWw6UHJvcFR5cGVzLmFycmF5LFxyXG5cdFx0dGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRwcm9qZWN0OiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xyXG5cdFx0c2hvd01lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0bG9hZGluZzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpczogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyByZW5kZXIoY3VzdG9taXplZFFpbGlBcHAsIGN1c3RvbWl6ZWRSZWR1Y2VyLCAuLi5taWRkbGV3YXJzKXtcclxuXHRcdGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXHJcblx0XHRpZighY29udGFpbmVyKXtcclxuXHRcdFx0Y29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcblx0XHRcdGNvbnRhaW5lci5pZD0nYXBwJ1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcclxuXHRcdH1cclxuXHRcdGxldCBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcclxuXHRcdHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcclxuXHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcclxuXHRcdFxyXG5cdFx0Y29uc3QgY29tcG9zZUVuaGFuY2VycyA9IHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18gfHwgY29tcG9zZTtcclxuXHRcdGNvbnN0IHtlbmhhbmNlUmVkdWNlcnMsIElOSVRfU1RBVEV9PVFpbGlBcHBcclxuXHRcdGNvbnN0IHN0b3JlPWNyZWF0ZVN0b3JlKGVuaGFuY2VSZWR1Y2VycyhjdXN0b21pemVkUmVkdWNlciksIElOSVRfU1RBVEUsIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcclxuXHRcdFxyXG5cdFx0c3VwcG9ydFRhcCgpXHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcigoXHJcblx0XHRcdFx0PFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcblx0XHRcdFx0XHR7Y3VzdG9taXplZFFpbGlBcHB9XHJcblx0XHRcdFx0PC9Qcm92aWRlcj5cclxuXHRcdFx0KSxjb250YWluZXIpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXQgSU5JVF9TVEFURSgpe1xyXG5cdFx0cmV0dXJuIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e30sY29tbWVudDp7fX1cclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGVuaGFuY2VSZWR1Y2VycyhjdXN0b21pemVkPXt1aTooc3RhdGU9e30pPT5zdGF0ZX0pe1xyXG5cdFx0ZnVuY3Rpb24gbm9ybWFsaXplRGF0YShlbnRpdGllcz17fSx7dHlwZSxwYXlsb2FkfSl7XHJcblx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0Y2FzZSAnTk9STUFMSVpFRF9EQVRBJzpcclxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuXHRcdFx0XHRcdHt9LFxyXG5cdFx0XHRcdFx0ZW50aXRpZXMsXHJcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhwYXlsb2FkKS5yZWR1Y2UoKG1lcmdlZCx0eXBlKT0+e1xyXG5cdFx0XHRcdFx0XHRpZih0eXBlb2YocGF5bG9hZFt0eXBlXVsnJHJlbW92ZSddKT09J3VuZGVmaW5lZCcpXHJcblx0XHRcdFx0XHRcdFx0bWVyZ2VkW3R5cGVdPU9iamVjdC5hc3NpZ24oe30sZW50aXRpZXNbdHlwZV0scGF5bG9hZFt0eXBlXSlcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LHBheWxvYWRbdHlwZV1bJyRyZW1vdmUnXS5yZWR1Y2UoKGFsbCxhKT0+KGRlbGV0ZSBhbGxbYV0sYWxsKSxlbnRpdGllc1t0eXBlXSkpXHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbWVyZ2VkXHJcblx0XHRcdFx0XHR9LHt9KVxyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZW50aXRpZXNcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0cmV0dXJuIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcclxuXHRcdFx0XHRcdGVudGl0aWVzOm5vcm1hbGl6ZURhdGFcclxuXHRcdFx0XHRcdCxjb21tZW50OkNvbW1lbnQucmVkdWNlclxyXG5cdFx0XHRcdFx0LFtET01BSU5dOlJFRFVDRVJcclxuXHRcdFx0XHR9LCBjdXN0b21pemVkKVxyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKGNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0sbnVsbCxudWxsLHtwdXJlOnRydWUsd2l0aFJlZjp0cnVlfSkoUWlsaUFwcCkse0RPTUFJTiwgQUNUSU9OLFJFRFVDRVJ9KVxyXG4iXX0=