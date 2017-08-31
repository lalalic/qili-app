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

var _LinearProgress = require("material-ui/LinearProgress");

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

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
					_react2.default.createElement(_LinearProgress2.default, { mode: "indeterminate" })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiQ0hFQ0tfVkVSU0lPTiIsImhvbWVwYWdlIiwiY3VycmVudFZlcnNpb24iLCJyZXF1aXJlIiwiZ2V0IiwicmVzIiwib24iLCJkaXNwYXRjaCIsIkJ1ZmZlciIsImRhdGEiLCJ0b1N0cmluZyIsInRyaW0iLCJlbmQiLCJMT0dPVVQiLCJsb2dvdXQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsImxhdGVzdFZlcnNpb24iLCJRaWxpQXBwIiwicHJvcHMiLCJpbml0QXBwIiwiaW5pdCIsInNlcnZpY2UiLCJhcHBJZCIsInRpdGxlIiwicHJvamVjdCIsImRvY3VtZW50IiwiZSIsInJlZnMiLCJtc2ciLCJzaG93IiwibG9hZGluZyIsInRoZW4iLCJtZXNzYWdlIiwidmVyc2lvbiIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJpcyIsImFwcCIsImNvcmRvdmEiLCJ0aGVtZSIsImxhc3RVc2VyIiwiY29udGVudCIsInRleHRBbGlnbiIsIkFycmF5IiwiaXNBcnJheSIsInR1dG9yaWFsIiwibGVuZ3RoIiwic2Vzc2lvblRva2VuIiwicmVuZGVyQ29udGVudCIsIm92ZXJmbG93WSIsImNoaWxkcmVuIiwiY3VzdG9taXplZFFpbGlBcHAiLCJjdXN0b21pemVkUmVkdWNlciIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaGVpZ2h0IiwiY29tcG9zZUVuaGFuY2VycyIsIl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyIsImVuaGFuY2VSZWR1Y2VycyIsIklOSVRfU1RBVEUiLCJtaWRkbGV3YXJzIiwic3RvcmUiLCJjdXN0b21pemVkIiwidWkiLCJub3JtYWxpemVEYXRhIiwiZW50aXRpZXMiLCJrZXlzIiwicmVkdWNlIiwibWVyZ2VkIiwiYWxsIiwiYSIsImNvbW1lbnQiLCJyZWR1Y2VyIiwicWlsaUFwcCIsImRlZmF1bHRQcm9wcyIsImZvb3RiYXIiLCJwYWdlIiwid2lkdGgiLCJpbm5lcldpZHRoIiwicHJvcHNUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsInB1cmUiLCJ3aXRoUmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRU8sSUFBTUEsMEJBQU8sU0FBYjs7QUFFQSxJQUFNQywwQkFBTztBQUNuQkMsU0FEbUIsb0JBQ1ZDLEtBRFUsRUFDSkMsWUFESSxFQUNTO0FBQzNCLE1BQUcsQ0FBQyxDQUFDRCxLQUFMLEVBQVc7QUFDVixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLGlCQURNO0FBRUxNLGFBQVEsRUFBQ0MsTUFBSyxTQUFLQyxPQUFYLEVBQW1CTCxZQUFuQjtBQUZILElBQVA7QUFJQSxHQUxELE1BS0s7QUFDSixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLFlBRE07QUFFTE0sYUFBUSxFQUFDRiwwQkFBRDtBQUZILElBQVA7QUFJQTtBQUNELEVBYmtCO0FBY2xCSyxnQkFBYyx1QkFBQ0MsUUFBRCxFQUFVQyxjQUFWO0FBQUEs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VixDQUFpQkQsVUFIUDtBQUlqQnhFLE9BQUssaUJBQVUwRSxJQUpFO0FBS2pCL0MsV0FBUyxpQkFBVWdELEtBTEY7QUFNakJ4RSxRQUFPLGlCQUFVb0UsTUFOQTtBQU9qQm5FLFVBQVMsaUJBQVVxRTtBQVBGLEM7QUF6SE41RSxPLENBbUlMK0UsaUIsR0FBa0I7QUFDeEI3RCxjQUFhLGlCQUFVMkQsSUFEQztBQUV4QmhFLFVBQVMsaUJBQVVnRSxJQUZLO0FBR3hCeEQsS0FBSSxpQkFBVXVELE1BSFU7QUFJeEJyRSxVQUFTLGlCQUFVcUU7QUFKSyxDO2tCQWdFWGpGLE9BQU9DLE1BQVAsQ0FBYyx5QkFBUTtBQUFBLFFBQU9GLE1BQU0zQixNQUFOLENBQVA7QUFBQSxDQUFSLEVBQTZCLElBQTdCLEVBQWtDLElBQWxDLEVBQXVDLEVBQUNpSCxNQUFLLElBQU4sRUFBV0MsU0FBUSxJQUFuQixFQUF2QyxFQUFpRWpGLE9BQWpFLENBQWQsRUFBd0YsRUFBQ2pDLGNBQUQsRUFBU0MsY0FBVCxFQUFnQnlCLGdCQUFoQixFQUF4RixDIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcclxuXHJcbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSxjb21wb3NlfSBmcm9tIFwicmVkdXhcIlxyXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXHJcblxyXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXHJcbmltcG9ydCBMaW5lYXJQcm9ncmVzcyBmcm9tICdtYXRlcmlhbC11aS9MaW5lYXJQcm9ncmVzcydcclxuaW1wb3J0IE11aVRoZW1lUHJvdmlkZXIgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL011aVRoZW1lUHJvdmlkZXInXHJcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXHJcbmltcG9ydCBsaWdodEJhc2VUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvYmFzZVRoZW1lcy9saWdodEJhc2VUaGVtZSdcclxuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXHJcblxyXG5pbXBvcnQge2VuaGFuY2VkQ29tYmluZVJlZHVjZXJzfSBmcm9tIFwiLlwiXHJcblxyXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxyXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXHJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXHJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXHJcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcclxuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxyXG5pbXBvcnQgQ29tbWVudCBmcm9tIFwiLi9jb21wb25lbnRzL2NvbW1lbnRcIlxyXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4vY29tcG9uZW50cy9lbXB0eVwiXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xyXG5cdFx0aWYoISFlcnJvcil7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXHJcblx0XHRcdFx0LHBheWxvYWQ6e3VzZXI6VXNlci5jdXJyZW50LGVycm9yfVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRgXHJcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQsQ0hFQ0tfVkVSU0lPTjooaG9tZXBhZ2UsY3VycmVudFZlcnNpb24pPT5kaXNwYXRjaD0+e1xyXG5cdFx0cmVxdWlyZShcImh0dHBcIikuZ2V0KGAke2hvbWVwYWdlfS9hcHAuYXBrLnZlcnNpb25gLCByZXM9PntcclxuXHRcdFx0cmVzLm9uKFwiZGF0YVwiLCBkYXRhPT57XHJcblx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmAsIHBheWxvYWQ6bmV3IEJ1ZmZlcihkYXRhKS50b1N0cmluZygpLnRyaW0oKX0pXHJcblx0XHRcdH0pXHJcblx0XHR9KS5lbmQoKVxyXG5cdH1cclxuXHQsTE9HT1VUOiBBPT5Vc2VyLmxvZ291dCgpXHJcblx0LFVTRVJfQ0hBTkdFRDp1c2VyPT4oe1xyXG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcclxuXHRcdCxwYXlsb2FkOnVzZXJcclxuXHR9KSxUVVRPUklBTElaRUQ6KHtcclxuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXHJcblx0fSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRgOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLHtcclxuXHRcdFx0aW5pdGVkOnRydWVcclxuXHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XHJcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcclxuXHRcdH0pXHJcblx0YnJlYWtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XHJcblx0XHRcdGluaXRlZEVycm9yOnBheWxvYWQuZXJyb3JcclxuXHRcdH0pXHJcblx0YnJlYWtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xyXG5cdFx0XHR1c2VyOnBheWxvYWRcclxuXHRcdH0pXHJcblx0Y2FzZSBgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYDpcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHt0dXRvcmlhbGl6ZWQ6dHJ1ZX0pXHJcblxyXG5cdGNhc2UgYEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7bGF0ZXN0VmVyc2lvbjpwYXlsb2FkfSlcclxuXHR9XHJcblxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUWlsaUFwcCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0dmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgcHJvamVjdCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGlmKHRpdGxlKVxyXG5cdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxyXG5cclxuXHRcdGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcclxuXHRcdFx0LnRoZW4oKHR1dG9yaWFsaXplZD1mYWxzZSk9PntcclxuXHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChudWxsLCEhdHV0b3JpYWxpemVkKSlcclxuXHRcdFx0XHRcdFVzZXIub24oJ2NoYW5nZScsIHVzZXI9PmRpc3BhdGNoKEFDVElPTi5VU0VSX0NIQU5HRUQodXNlcikpKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0KGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXHJcblx0XHRcdC50aGVuKGE9PmRpc3BhdGNoKEFDVElPTi5DSEVDS19WRVJTSU9OKHByb2plY3QuaG9tZXBhZ2UsIHByb2plY3QudmVyc2lvbikpKVxyXG5cdH1cclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRsZXQgc2VsZj10aGlzXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzaG93TWVzc2FnZSgpe1xyXG5cdFx0XHRcdHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHR9XHJcblx0XHRcdCxsb2FkaW5nKG9wZW4pe1xyXG5cdFx0XHRcdHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpczp7XHJcblx0XHRcdFx0YXBwOiB0eXBlb2YoY29yZG92YSkhPT0ndW5kZWZpbmVkJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRwcm9qZWN0OiB0aGlzLnByb3BzLnByb2plY3RcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNob3dNZXNzYWdlKCl7XHJcblx0XHR0aGlzLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2FwcElkLCBzZXJ2aWNlLCB0aGVtZSwgaW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgbGFzdFVzZXIsIHR1dG9yaWFsaXplZCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGxldCBjb250ZW50XHJcblxyXG5cdFx0aWYoIWFwcElkKXtcclxuXHRcdFx0Y29udGVudD0oXHJcblx0XHRcdFx0PEVtcHR5IGljb249e251bGx9PlxyXG5cdFx0XHRcdFx0PG9sICBzdHlsZT17e3RleHRBbGlnbjpcImxlZnRcIn19PlxyXG5cdFx0XHRcdFx0XHQ8bGk+5ZyoYXBwLnFpbGkuY29t5LiK5Yib5bu65LiA5Liq5bqU55So77yM6I635Y+WQXBwSWQ8L2xpPlxyXG5cdFx0XHRcdFx0XHQ8bGk+5Yib5bu65LiA5LiqUmVhY3QgQ29tcG9uZW50XHJcblx0XHRcdFx0XHRcdFx0PHByZT5cclxuXHRcdFx0XHRcdFx0XHR7YFxyXG5cdGltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cdGltcG9ydCBRaWxpQXBwIGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5cdGNvbnN0IE15QXBwPSgpPT4oXHJcblx0XHQ8UWlsaUFwcCBhcHBJZD1cInh4eHhcIj5cclxuXHRcdFx0aGVsbG8gcWlsaSFcclxuXHRcdDwvUWlsaUFwcD5cclxuXHQpXHJcblxyXG5cdFFpbGlBcHAucmVuZGVyKDxNeUFwcC8+KVxyXG5cdFx0XHRcdFx0XHRcdGB9XHJcblx0XHRcdFx0XHRcdFx0PC9wcmU+XHJcblx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdDxsaT5IYXZlIGZ1bjwvbGk+XHJcblx0XHRcdFx0XHQ8L29sPlxyXG5cdFx0XHRcdDwvRW1wdHk+XHJcblx0XHRcdClcclxuXHRcdH1lbHNlIGlmKCFzZXJ2aWNlKVxyXG5cdFx0XHRjb250ZW50PSg8RW1wdHk+UGxlYXNlIGdpdmUgc2VydmljZSB1cmw8L0VtcHR5PilcclxuXHRcdGVsc2UgaWYoIWluaXRlZCl7XHJcblx0XHRcdGlmKGluaXRlZEVycm9yKVxyXG5cdFx0XHRcdGNvbnRlbnQ9KDxFbXB0eT57YOWIneWni+WMlumUmeivrzogJHtpbml0ZWRFcnJvcn1gfTwvRW1wdHk+KVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0Y29udGVudD0gKDxFbXB0eT48TGluZWFyUHJvZ3Jlc3MgbW9kZT1cImluZGV0ZXJtaW5hdGVcIi8+PC9FbXB0eT4pXHJcblx0XHR9ZWxzZSBpZighdXNlcil7XHJcblx0XHRcdGlmKCF0dXRvcmlhbGl6ZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLnR1dG9yaWFsKSAmJiB0aGlzLnByb3BzLnR1dG9yaWFsLmxlbmd0aCl7XHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdDxNdWlUaGVtZVByb3ZpZGVyIG11aVRoZW1lPXt0aGVtZX0+XHJcblx0XHRcdFx0XHRcdDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT5kaXNwYXRjaChBQ1RJT04uVFVUT1JJQUxJWkVEKX0vPlxyXG5cdFx0XHRcdFx0PC9NdWlUaGVtZVByb3ZpZGVyPlxyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29udGVudD0oPEFjY291bnQgZGlzcGF0Y2g9e2Rpc3BhdGNofS8+KVxyXG5cdFx0fWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcclxuXHRcdFx0Y29udGVudD0oPEFjY291bnQgdXNlcj17dXNlcn0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+KVxyXG5cdFx0fWVsc2Uge1xyXG5cdFx0XHRjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PE11aVRoZW1lUHJvdmlkZXIgbXVpVGhlbWU9e3RoZW1lfT5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxyXG5cdFx0XHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0XHRcdFx0PE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cclxuXHRcdFx0XHRcdFx0PExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvTXVpVGhlbWVQcm92aWRlcj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHJlbmRlckNvbnRlbnQoKXtcclxuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcclxuXHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXHJcblx0XHR0aGVtZTpnZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSx7XHJcblx0XHRcdGZvb3RiYXI6e1xyXG5cdFx0XHRcdGhlaWdodDogNTBcclxuXHRcdFx0fSxcclxuXHRcdFx0cGFnZTp7XHJcblx0XHRcdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoID4gOTYwID8gOTYwIDogd2luZG93LmlubmVyV2lkdGhcclxuXHRcdFx0XHQsaGVpZ2h0OndpbmRvdy5pbm5lckhlaWdodFxyXG5cdFx0XHR9XHJcblx0XHR9KSxcclxuXHRcdGluaXQoKXt9LFxyXG5cdFx0dHV0b3JpYWw6W10sXHJcblx0XHRwcm9qZWN0Ont9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcHJvcHNUeXBlcz17XHJcblx0XHRzZXJ2aWNlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHRhcHBJZDpQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG5cdFx0aW5pdDpQcm9wVHlwZXMuZnVuYyxcclxuXHRcdHR1dG9yaWFsOlByb3BUeXBlcy5hcnJheSxcclxuXHRcdHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0cHJvamVjdDogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcclxuXHRcdHNob3dNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGxvYWRpbmc6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXM6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRwcm9qZWN0OiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcmVuZGVyKGN1c3RvbWl6ZWRRaWxpQXBwLCBjdXN0b21pemVkUmVkdWNlciwgLi4ubWlkZGxld2Fycyl7XHJcblx0XHRsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxyXG5cdFx0aWYoIWNvbnRhaW5lcil7XHJcblx0XHRcdGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG5cdFx0XHRjb250YWluZXIuaWQ9J2FwcCdcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXHJcblx0XHR9XHJcblx0XHRsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXHJcblx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXHJcblx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXHJcblxyXG5cdFx0Y29uc3QgY29tcG9zZUVuaGFuY2VycyA9IHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18gfHwgY29tcG9zZTtcclxuXHRcdGNvbnN0IHtlbmhhbmNlUmVkdWNlcnMsIElOSVRfU1RBVEV9PVFpbGlBcHBcclxuXHRcdGNvbnN0IHN0b3JlPWNyZWF0ZVN0b3JlKGVuaGFuY2VSZWR1Y2VycyhjdXN0b21pemVkUmVkdWNlciksIElOSVRfU1RBVEUsIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcclxuXHJcblx0XHRzdXBwb3J0VGFwKClcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyKChcclxuXHRcdFx0XHQ8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuXHRcdFx0XHRcdHtjdXN0b21pemVkUWlsaUFwcH1cclxuXHRcdFx0XHQ8L1Byb3ZpZGVyPlxyXG5cdFx0XHQpLGNvbnRhaW5lcilcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgSU5JVF9TVEFURSgpe1xyXG5cdFx0cmV0dXJuIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e30sY29tbWVudDp7fX1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBlbmhhbmNlUmVkdWNlcnMoY3VzdG9taXplZD17dWk6KHN0YXRlPXt9KT0+c3RhdGV9KXtcclxuXHRcdGZ1bmN0aW9uIG5vcm1hbGl6ZURhdGEoZW50aXRpZXM9e30se3R5cGUscGF5bG9hZH0pe1xyXG5cdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdGNhc2UgJ05PUk1BTElaRURfREFUQSc6XHJcblx0XHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oXHJcblx0XHRcdFx0XHR7fSxcclxuXHRcdFx0XHRcdGVudGl0aWVzLFxyXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMocGF5bG9hZCkucmVkdWNlKChtZXJnZWQsdHlwZSk9PntcclxuXHRcdFx0XHRcdFx0aWYodHlwZW9mKHBheWxvYWRbdHlwZV1bJyRyZW1vdmUnXSk9PSd1bmRlZmluZWQnKVxyXG5cdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LGVudGl0aWVzW3R5cGVdLHBheWxvYWRbdHlwZV0pXHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRtZXJnZWRbdHlwZV09T2JqZWN0LmFzc2lnbih7fSxwYXlsb2FkW3R5cGVdWyckcmVtb3ZlJ10ucmVkdWNlKChhbGwsYSk9PihkZWxldGUgYWxsW2FdLGFsbCksZW50aXRpZXNbdHlwZV0pKVxyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1lcmdlZFxyXG5cdFx0XHRcdFx0fSx7fSlcclxuXHRcdFx0XHQpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGVudGl0aWVzXHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHJldHVybiBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XHJcblx0XHRcdFx0XHRlbnRpdGllczpub3JtYWxpemVEYXRhXHJcblx0XHRcdFx0XHQsY29tbWVudDpDb21tZW50LnJlZHVjZXJcclxuXHRcdFx0XHRcdCxbRE9NQUlOXTpSRURVQ0VSXHJcblx0XHRcdFx0fSwgY3VzdG9taXplZClcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihjb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFFpbGlBcHApLHtET01BSU4sIEFDVElPTixSRURVQ0VSfSlcclxuIl19