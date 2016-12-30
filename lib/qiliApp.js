"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QiliApp = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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
					return dispatch({ type: "@@" + DOMAIN + "/LASTEST_VERSION", payload: data.trim() });
				});
			}).end();
		};
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
			return (0, _assign2.default)({}, state, {
				inited: true,
				user: _db.User.current,
				tutorialized: payload.tutorialized
			});
			break;
		case "@@" + DOMAIN + "/initedError":
			return (0, _assign2.default)({}, state, {
				initedError: payload.error
			});
			break;
		case "@@" + DOMAIN + "/USER_CHANGED":
			return (0, _assign2.default)({}, state, {
				inited: !!payload,
				user: payload
			});
		case "@@" + DOMAIN + "/TUTORIALIZED":
			return (0, _assign2.default)({}, state, { tutorialized: true });

		case "@@" + DOMAIN + "/LASTEST_VERSION":
			return (0, _assign2.default)({}, state, { latestVersion: payload });
	}

	return state;
};

var QiliApp = exports.QiliApp = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
}, null, null, { pure: true, withRef: true })((_temp = _class = function (_Component) {
	(0, _inherits3.default)(_class, _Component);

	function _class(props) {
		(0, _classCallCheck3.default)(this, _class);

		var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));

		(0, _reactTapEventPlugin2.default)();

		var _this$props = _this.props,
		    service = _this$props.service,
		    appId = _this$props.appId;


		if (!appId) throw new Error("Please give application key");

		if (!service) throw new Error("Please give service url");
		return _this;
	}

	(0, _createClass3.default)(_class, [{
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
						return (0, _assign2.default)({}, entities, (0, _keys2.default)(payload).reduce(function (merged, type) {
							if (typeof payload[type]['$remove'] == 'undefined') merged[type] = (0, _assign2.default)({}, entities[type], payload[type]);else merged[type] = (0, _assign2.default)({}, payload[type]['$remove'].reduce(function (all, a) {
								return delete all[a], all;
							}, entities[type]));

							return merged;
						}, {}));
				}
				return entities;
			}

			var allReducers = _.enhancedCombineReducers.apply(undefined, [(0, _defineProperty3.default)({
				routing: routerRducer,
				entities: normalizeData
			}, DOMAIN, REDUCER)].concat((0, _toConsumableArray3.default)(reducers)));
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

exports.default = (0, _assign2.default)(QiliApp, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiQ0hFQ0tfVkVSU0lPTiIsImhvbWVwYWdlIiwiY3VycmVudFZlcnNpb24iLCJyZXF1aXJlIiwiZ2V0IiwicmVzIiwib24iLCJkaXNwYXRjaCIsImRhdGEiLCJ0cmltIiwiZW5kIiwiVVNFUl9DSEFOR0VEIiwiVFVUT1JJQUxJWkVEIiwiUkVEVUNFUiIsInN0YXRlIiwiaW5pdGVkIiwiaW5pdGVkRXJyb3IiLCJsYXRlc3RWZXJzaW9uIiwiUWlsaUFwcCIsInB1cmUiLCJ3aXRoUmVmIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJwcm9qZWN0IiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm1lc3NhZ2UiLCJ2ZXJzaW9uIiwic2VsZiIsInNob3dNZXNzYWdlIiwiYXJndW1lbnRzIiwib3BlbiIsImlzIiwiYXBwIiwiY29yZG92YSIsInRoZW1lIiwiY29udGVudCIsIkFycmF5IiwiaXNBcnJheSIsInR1dG9yaWFsIiwibGVuZ3RoIiwic2Vzc2lvblRva2VuIiwicmVuZGVyQ29udGVudCIsIm92ZXJmbG93WSIsImNoaWxkcmVuIiwicm91dGUiLCJtaWRkbGV3YXJzIiwicmVkdWNlcnMiLCJjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInN0eWxlIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsImhlaWdodCIsImhpc3RvcnkiLCJyb3V0ZXJSZHVjZXIiLCJlbmhhbmNlZFJvdXRlIiwicm9vdCIsIm9uRW50ZXIiLCJvbkNoYW5nZSIsImNsb25lRWxlbWVudCIsIm5leHRTdGF0ZSIsImJpbmQiLCJub3JtYWxpemVEYXRhIiwiZW50aXRpZXMiLCJyZWR1Y2UiLCJtZXJnZWQiLCJhbGwiLCJhIiwiYWxsUmVkdWNlcnMiLCJyb3V0aW5nIiwiY29tcG9zZUVuaGFuY2VycyIsIl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyIsInN0b3JlIiwicWlsaUFwcCIsInVpIiwiZGVmYXVsdFByb3BzIiwiZm9vdGJhciIsInBhZ2UiLCJ3aWR0aCIsImlubmVyV2lkdGgiLCJwcm9wc1R5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm9iamVjdCIsImZ1bmMiLCJhcnJheSIsImNoaWxkQ29udGV4dFR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLElBQU1BLDBCQUFPLFNBQWI7O0FBRUEsSUFBTUMsMEJBQU87QUFDbkJDLFNBRG1CLG9CQUNWQyxLQURVLEVBQ0pDLFlBREksRUFDUztBQUMzQixNQUFHLENBQUMsQ0FBQ0QsS0FBTCxFQUFXO0FBQ1YsVUFBTztBQUNORSxpQkFBVUwsTUFBVixpQkFETTtBQUVMTSxhQUFRLEVBQUNDLE1BQUssU0FBS0MsT0FBWCxFQUFtQkwsWUFBbkI7QUFGSCxJQUFQO0FBSUEsR0FMRCxNQUtLO0FBQ0osVUFBTztBQUNORSxpQkFBVUwsTUFBVixZQURNO0FBRUxNLGFBQVEsRUFBQ0YsMEJBQUQ7QUFGSCxJQUFQO0FBSUE7QUFDRCxFQWJrQjtBQWNsQkssZ0JBQWMsdUJBQUNDLFFBQUQsRUFBVUMsY0FBVjtBQUFBLFNBQTJCLG9CQUFVO0FBQ25EQyxXQUFRLE1B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QVE7QUFERCxHQUR3QjtBQUloQ3lCLFFBQUs7QUFDSkMsVUFBTzVCLE9BQU82QixVQUFQLEdBQW9CLEdBQXBCLEdBQTBCLEdBQTFCLEdBQWdDN0IsT0FBTzZCLFVBRDFDO0FBRUgzQixXQUFPRixPQUFPQztBQUZYO0FBSjJCLEVBQTNCLENBRmE7QUFXbkIxQyxLQVhtQixrQkFXYixDQUFFLENBWFc7O0FBWW5CdUIsV0FBUyxFQVpVO0FBYW5CckIsVUFBUTtBQWJXLENBeEZELFNBd0dacUUsVUF4R1ksR0F3R0Q7QUFDakIzRSxVQUFTLGlCQUFVNEUsTUFBVixDQUFpQkMsVUFEVDtBQUVqQjVFLFFBQU0saUJBQVUyRSxNQUFWLENBQWlCQyxVQUZOO0FBR2pCdEQsUUFBTyxpQkFBVXVELE1BQVYsQ0FBaUJELFVBSFA7QUFJakJ6RSxPQUFLLGlCQUFVMkUsSUFKRTtBQUtqQnBELFdBQVMsaUJBQVVxRCxLQUxGO0FBTWpCM0UsUUFBTyxpQkFBVXVFLE1BTkE7QUFPakJ0RSxVQUFTLGlCQUFVd0U7QUFQRixDQXhHQyxTQWtIWkcsaUJBbEhZLEdBa0hNO0FBQ3hCaEUsY0FBYSxpQkFBVThELElBREM7QUFFeEJuRSxVQUFTLGlCQUFVbUUsSUFGSztBQUd4QjNELEtBQUksaUJBQVUwRCxNQUhVO0FBSXhCeEUsVUFBUyxpQkFBVXdFO0FBSkssQ0FsSE4sU0FBZDs7a0JBc01RLHNCQUFjbEYsT0FBZCxFQUFzQixFQUFDM0IsY0FBRCxFQUFTQyxjQUFULEVBQWdCcUIsZ0JBQWhCLEVBQXRCLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSxjb21wb3NlfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcblxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IE11aVRoZW1lUHJvdmlkZXIgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL011aVRoZW1lUHJvdmlkZXInXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gXCIuXCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXG5cdFx0XHRcdCxwYXlsb2FkOnt1c2VyOlVzZXIuY3VycmVudCxlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LENIRUNLX1ZFUlNJT046KGhvbWVwYWdlLGN1cnJlbnRWZXJzaW9uKT0+ZGlzcGF0Y2g9PnsgXG5cdFx0cmVxdWlyZShcImh0dHBcIikuZ2V0KGAke2hvbWVwYWdlfS9hcHAuYXBrLnZlcnNpb25gLCByZXM9Pntcblx0XHRcdHJlcy5vbihcImRhdGFcIiwgZGF0YT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmAsIHBheWxvYWQ6ZGF0YS50cmltKCl9KSlcblx0XHR9KS5lbmQoKVxuXHR9XG5cdCxVU0VSX0NIQU5HRUQ6dXNlcj0+KHtcbiAgICAgICAgdHlwZTpgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYFxuXHRcdCxwYXlsb2FkOnVzZXJcblx0fSksVFVUT1JJQUxJWkVEOih7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGBcblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLHtcblx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHQsdXNlcjpVc2VyLmN1cnJlbnRcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcblx0XHR9KVxuXHRicmVha1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xuXHRcdFx0aW5pdGVkRXJyb3I6cGF5bG9hZC5lcnJvclxuXHRcdH0pXG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xuXHRcdFx0aW5pdGVkOiEhcGF5bG9hZFxuXHRcdFx0LHVzZXI6cGF5bG9hZFxuXHRcdH0pXG5cdGNhc2UgYEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3R1dG9yaWFsaXplZDp0cnVlfSlcblx0XHRcblx0Y2FzZSBgQEAke0RPTUFJTn0vTEFTVEVTVF9WRVJTSU9OYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7bGF0ZXN0VmVyc2lvbjpwYXlsb2FkfSlcblx0fVxuXHRcblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBRaWxpQXBwPWNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0sbnVsbCxudWxsLHtwdXJlOnRydWUsd2l0aFJlZjp0cnVlfSkoXG5cdGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRcdHN1cGVyKHByb3BzKVxuXG5cdFx0XHRzdXBwb3J0VGFwKClcblxuXHRcdFx0Y29uc3Qge3NlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cblx0XHRcdGlmKCFhcHBJZClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cblx0XHRcdGlmKCFzZXJ2aWNlKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuXHRcdH1cblxuXHRcdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0XHR2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWQsIHRpdGxlLCBwcm9qZWN0LCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdFx0aWYodGl0bGUpXG5cdFx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cblx0XHRcdGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcblx0XHRcdFx0LnRoZW4oKHR1dG9yaWFsaXplZD1mYWxzZSk9Pntcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChudWxsLCEhdHV0b3JpYWxpemVkKSlcblx0XHRcdFx0XHRcdFVzZXIub24oJ2NoYW5nZScsIHVzZXI9PmRpc3BhdGNoKEFDVElPTi5VU0VSX0NIQU5HRUQodXNlcikpKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXG5cdFx0XHRcdC50aGVuKGE9PmRpc3BhdGNoKEFDVElPTi5DSEVDS19WRVJTSU9OKHByb2plY3QuaG9tZXBhZ2UsIHByb2plY3QudmVyc2lvbikpKVxuXHRcdH1cblxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdFx0bGV0IHNlbGY9dGhpc1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c2hvd01lc3NhZ2UoKXtcblx0XHRcdFx0XHRzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0fVxuXHRcdFx0XHQsbG9hZGluZyhvcGVuKXtcblx0XHRcdFx0XHRzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcblx0XHRcdFx0fSxcblx0XHRcdFx0aXM6e1xuXHRcdFx0XHRcdGFwcDogdHlwZW9mKGNvcmRvdmEpIT09J3VuZGVmaW5lZCdcblx0XHRcdFx0fSxcblx0XHRcdFx0cHJvamVjdDogdGhpcy5wcm9wcy5wcm9qZWN0XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2hvd01lc3NhZ2UoKXtcblx0XHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdFx0fVxuXG5cblx0XHRyZW5kZXIoKXtcblx0XHRcdGNvbnN0IHt0aGVtZSwgaW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgdHV0b3JpYWxpemVkLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdFx0bGV0IGNvbnRlbnRcblxuXHRcdFx0aWYoIWluaXRlZCl7XG5cdFx0XHRcdGlmKGluaXRlZEVycm9yKVxuXHRcdFx0XHRcdGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxuXHRcdFx0fWVsc2UgaWYoIXVzZXIpe1xuXHRcdFx0XHRpZighdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG5cdFx0XHRcdFx0cmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz4pXG5cblx0XHRcdFx0Y29udGVudD0oPEFjY291bnQgLz4pXG5cdFx0XHR9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuXHRcdFx0XHRjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfS8+KVxuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxNdWlUaGVtZVByb3ZpZGVyIG11aVRoZW1lPXt0aGVtZX0+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cblx0XHRcdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdFx0XHRcdDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG5cdFx0XHRcdFx0XHRcdDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L011aVRoZW1lUHJvdmlkZXI+XG5cdFx0XHQpXG5cdFx0fVxuXG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0XHR9XG5cblx0XHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0XHR0aGVtZTpnZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSx7XG5cdFx0XHRcdGZvb3RiYXI6e1xuXHRcdFx0XHRcdGhlaWdodDogNTBcblx0XHRcdFx0fSxcblx0XHRcdFx0cGFnZTp7XG5cdFx0XHRcdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoID4gOTYwID8gOTYwIDogd2luZG93LmlubmVyV2lkdGhcblx0XHRcdFx0XHQsaGVpZ2h0OndpbmRvdy5pbm5lckhlaWdodFxuXHRcdFx0XHR9XG5cdFx0XHR9KSxcblx0XHRcdGluaXQoKXt9LFxuXHRcdFx0dHV0b3JpYWw6W10sXG5cdFx0XHRwcm9qZWN0Ont9XG5cdFx0fVxuXG5cdFx0c3RhdGljIHByb3BzVHlwZXM9e1xuXHRcdFx0c2VydmljZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdFx0YXBwSWQ6UHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdFx0dGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0XHRcdGluaXQ6UHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHR0dXRvcmlhbDpQcm9wVHlwZXMuYXJyYXksXG5cdFx0XHR0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3Rcblx0XHR9XG5cblx0XHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdFx0c2hvd01lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLFxuXHRcdFx0bG9hZGluZzogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHRpczogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRcdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3Rcblx0XHR9XG5cblx0XHRzdGF0aWMgcmVuZGVyKHJvdXRlLCByZWR1Y2Vycz1bXSwgLi4ubWlkZGxld2Fycyl7XG5cdFx0XHRjb25zdCBwcm9wcz17fVxuXHRcdFx0bGV0IGNvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcblx0XHRcdGlmKCFjb250YWluZXIpe1xuXHRcdFx0XHRjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRcdFx0Y29udGFpbmVyLmlkPSdhcHAnXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuXHRcdFx0fVxuXHRcdFx0bGV0IHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuXHRcdFx0c3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxuXHRcdFx0Y29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG5cdFx0XHRpZighcHJvcHMuaGlzdG9yeSlcblx0XHRcdFx0cHJvcHMuaGlzdG9yeT1oYXNoSGlzdG9yeVxuXG5cdFx0XHRmdW5jdGlvbiByb3V0ZXJSZHVjZXIoc3RhdGU9e30se3R5cGUscGF5bG9hZH0pe1xuXHRcdFx0XHRzd2l0Y2godHlwZSl7XG5cdFx0XHRcdGNhc2UgJ0BAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRSc6XG5cdFx0XHRcdHJldHVybiBwYXlsb2FkXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGVuaGFuY2VkUm91dGU9KHJvb3QsZGlzcGF0Y2gpPT57XG5cdFx0XHRcdGNvbnN0IHtvbkVudGVyLCBvbkNoYW5nZX09cm9vdC5wcm9wc1xuXHRcdFx0XHRyZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHJvb3QsIHtcblx0XHRcdFx0XHRvbkVudGVyKG5leHRTdGF0ZSl7XG5cdFx0XHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFYCxwYXlsb2FkOm5leHRTdGF0ZX0pO1xuXHRcdFx0XHRcdFx0b25FbnRlciAmJiBvbkVudGVyLmJpbmQodGhpcykoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0b25DaGFuZ2Uoc3RhdGUsbmV4dFN0YXRlKXtcblx0XHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0XHRvbkNoYW5nZSAmJiBvbkNoYW5nZS5iaW5kKHRoaXMpKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIG5vcm1hbGl6ZURhdGEoZW50aXRpZXM9e30se3R5cGUscGF5bG9hZH0pe1xuXHRcdFx0XHRzd2l0Y2godHlwZSl7XG5cdFx0XHRcdGNhc2UgJ05PUk1BTElaRURfREFUQSc6XG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRcdGVudGl0aWVzLFxuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXMocGF5bG9hZCkucmVkdWNlKChtZXJnZWQsdHlwZSk9Pntcblx0XHRcdFx0XHRcdFx0aWYodHlwZW9mKHBheWxvYWRbdHlwZV1bJyRyZW1vdmUnXSk9PSd1bmRlZmluZWQnKVxuXHRcdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LGVudGl0aWVzW3R5cGVdLHBheWxvYWRbdHlwZV0pXG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRtZXJnZWRbdHlwZV09T2JqZWN0LmFzc2lnbih7fSxwYXlsb2FkW3R5cGVdWyckcmVtb3ZlJ10ucmVkdWNlKChhbGwsYSk9PihkZWxldGUgYWxsW2FdLGFsbCksZW50aXRpZXNbdHlwZV0pKVxuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtZXJnZWRcblx0XHRcdFx0XHRcdH0se30pXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBlbnRpdGllc1xuXHRcdFx0fVxuXG5cblx0XHRcdGNvbnN0IGFsbFJlZHVjZXJzPWVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcblx0XHRcdFx0XHRcdHJvdXRpbmc6cm91dGVyUmR1Y2VyXG5cdFx0XHRcdFx0XHQsZW50aXRpZXM6bm9ybWFsaXplRGF0YVxuXHRcdFx0XHRcdFx0LFtET01BSU5dOlJFRFVDRVJcblx0XHRcdFx0XHR9LCAuLi5yZWR1Y2Vycylcblx0XHRcdGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XG5cdFx0XHRjb25zdCBzdG9yZT1jcmVhdGVTdG9yZShhbGxSZWR1Y2Vycywge3FpbGlBcHA6e30sIHVpOnt9LCBlbnRpdGllczp7fX0sIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcblxuXHRcdFx0cmV0dXJuIHJlbmRlcigoXG5cdFx0XHRcdFx0PFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG5cdFx0XHRcdFx0XHQ8Um91dGVyIHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0XHRcdHtlbmhhbmNlZFJvdXRlKHJvdXRlLHN0b3JlLmRpc3BhdGNoKX1cblx0XHRcdFx0XHRcdDwvUm91dGVyPlxuXHRcdFx0XHRcdDwvUHJvdmlkZXI+XG5cdFx0XHRcdCksY29udGFpbmVyKVxuXHRcdH1cblx0fVxuKVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFFpbGlBcHAse0RPTUFJTiwgQUNUSU9OLFJFRFVDRVJ9KVxuIl19