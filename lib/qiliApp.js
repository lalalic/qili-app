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

var muiTheme = (0, _getMuiTheme2.default)(_lightBaseTheme2.default);

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
	var type = _ref.type;
	var payload = _ref.payload;

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

		var _this$props = _this.props;
		var service = _this$props.service;
		var appId = _this$props.appId;


		if (!appId) throw new Error("Please give application key");

		if (!service) throw new Error("Please give service url");
		return _this;
	}

	(0, _createClass3.default)(_class, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var _props = this.props;
			var initApp = _props.init;
			var service = _props.service;
			var appId = _props.appId;
			var title = _props.title;
			var dispatch = _props.dispatch;

			if (title) document.title = title;

			(0, _db.init)(service, appId, initApp, function (e) {
				var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Error';
				return _this2.refs.msg.show(e, type);
			}, this.refs.loading).then(function () {
				var tutorialized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				dispatch(ACTION.INIT_APP(null, !!tutorialized));
				_db.User.on('change', function (user) {
					return dispatch(ACTION.USER_CHANGED(user));
				});
			}, function (e) {
				return dispatch(ACTION.INIT_APP(e.message));
			});
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;
			return {
				muiTheme: muiTheme,
				showMessage: function showMessage() {
					self.showMessage.apply(self, arguments);
				},
				loading: function loading(open) {
					self.refs.loading[open ? "show" : "close"]();
				}
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
			var _props2 = this.props;
			var inited = _props2.inited;
			var initedError = _props2.initedError;
			var user = _props2.user;
			var tutorialized = _props2.tutorialized;
			var dispatch = _props2.dispatch;

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
				"div",
				{ className: "withFootbar" },
				_react2.default.createElement(
					"div",
					{ id: "container", style: { overflowY: "scroll" } },
					content,
					_react2.default.createElement(_messager2.default, { ref: "msg", className: "sticky bottom left" }),
					_react2.default.createElement(_loading2.default, { ref: "loading", className: "sticky top right" })
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
				var type = _ref2.type;
				var payload = _ref2.payload;

				switch (type) {
					case '@@router/LOCATION_CHANGE':
						return payload;
				}
				return state;
			}

			var enhancedRoute = function enhancedRoute(root, dispatch) {
				var _root$props = root.props;
				var _onEnter = _root$props.onEnter;
				var _onChange = _root$props.onChange;

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
				var type = _ref3.type;
				var payload = _ref3.payload;

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
	init: function init() {},

	tutorial: []
}, _class.propsTypes = {
	service: _react2.default.PropTypes.string.isRequired,
	appId: _react2.default.PropTypes.string.isRequired,
	init: _react2.default.PropTypes.func,
	tutorial: _react2.default.PropTypes.array,
	title: _react2.default.PropTypes.string
}, _class.childContextTypes = {
	muiTheme: _react2.default.PropTypes.object.isRequired,
	showMessage: _react2.default.PropTypes.func,
	loading: _react2.default.PropTypes.func
}, _temp));

exports.default = (0, _assign2.default)(QiliApp, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiQUNUSU9OIiwiSU5JVF9BUFAiLCJlcnJvciIsInR1dG9yaWFsaXplZCIsInR5cGUiLCJwYXlsb2FkIiwidXNlciIsImN1cnJlbnQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsIlFpbGlBcHAiLCJwdXJlIiwid2l0aFJlZiIsInByb3BzIiwic2VydmljZSIsImFwcElkIiwiRXJyb3IiLCJpbml0QXBwIiwiaW5pdCIsInRpdGxlIiwiZGlzcGF0Y2giLCJkb2N1bWVudCIsImUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwib24iLCJtZXNzYWdlIiwic2VsZiIsInNob3dNZXNzYWdlIiwiYXJndW1lbnRzIiwib3BlbiIsImNvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJ0dXRvcmlhbCIsImxlbmd0aCIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlIiwibWlkZGxld2FycyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5Iiwicm91dGVyUmR1Y2VyIiwiZW5oYW5jZWRSb3V0ZSIsInJvb3QiLCJvbkVudGVyIiwib25DaGFuZ2UiLCJjbG9uZUVsZW1lbnQiLCJuZXh0U3RhdGUiLCJiaW5kIiwibm9ybWFsaXplRGF0YSIsImVudGl0aWVzIiwicmVkdWNlIiwibWVyZ2VkIiwiYWxsIiwiYSIsImFsbFJlZHVjZXJzIiwicm91dGluZyIsImNvbXBvc2VFbmhhbmNlcnMiLCJfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18iLCJzdG9yZSIsInFpbGlBcHAiLCJ1aSIsImRlZmF1bHRQcm9wcyIsInByb3BzVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiZnVuYyIsImFycmF5IiwiY2hpbGRDb250ZXh0VHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVMsb0RBQWY7O0FBRU8sSUFBTUMsMEJBQU8sU0FBYjs7QUFFQSxJQUFNQywwQkFBTztBQUNuQkMsU0FEbUIsb0JBQ1ZDLEtBRFUsRUFDSkMsWUFESSxFQUNTO0FBQzNCLE1BQUcsQ0FBQyxDQUFDRCxLQUFMLEVBQVc7QUFDVixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLGlCQURNO0FBRUxNLGFBQVEsRUFBQ0MsTUFBSyxTQUFLQyxPQUFYLEVBQW1CTCxZQUFuQjtBQUZILElBQVA7QUFJQSxHQUxELE1BS0s7QUFDSixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLFlBRE07QUFFTE0sYUFBUSxFQUFDRiwwQkFBRDtBQUZILElBQVA7QUFJQTtBQUNELEVBYmtCO0FBY2xCSyxlQUFhO0FBQUEsU0FBTztBQUNkSixnQkFBVUwsTUFBVixrQkFEYztBQUVuQk0sWUFBUUM7QUFGVyxHQUFQO0FBQUEsRUFkSyxFQWlCaEJHLGNBQWM7QUFDVkwsZUFBVUwsTUFBVjtBQURVO0FBakJFLENBQWI7O0FBc0JBLElBQU1XLDRCQUFRLFNBQVJBLE9BQVEsR0FBMkI7QUFBQSxLQUExQkMsS0FBMEIsdUVBQXBCLEVBQW9CO0FBQUE7QUFBQSxLQUFoQlAsSUFBZ0IsUUFB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QUFqTGtCO0FBQUE7QUFBQSw0QkFvRlprQyxZQXBGWSxHQW9GQztBQUNuQmxFLFVBQVEscUJBRFc7QUFFbkJJLEtBRm1CLGtCQUViLENBQUUsQ0FGVzs7QUFHbkJtQixXQUFTO0FBSFUsQ0FwRkQsU0EwRlo0QyxVQTFGWSxHQTBGRDtBQUNqQm5FLFVBQVMsZ0JBQU1vRSxTQUFOLENBQWdCQyxNQUFoQixDQUF1QkMsVUFEZjtBQUVqQnJFLFFBQU0sZ0JBQU1tRSxTQUFOLENBQWdCQyxNQUFoQixDQUF1QkMsVUFGWjtBQUdqQmxFLE9BQUssZ0JBQU1nRSxTQUFOLENBQWdCRyxJQUhKO0FBSWpCaEQsV0FBUyxnQkFBTTZDLFNBQU4sQ0FBZ0JJLEtBSlI7QUFLakJuRSxRQUFPLGdCQUFNK0QsU0FBTixDQUFnQkM7QUFMTixDQTFGQyxTQWtHWkksaUJBbEdZLEdBa0dNO0FBQ3hCN0YsV0FBUyxnQkFBTXdGLFNBQU4sQ0FBZ0JNLE1BQWhCLENBQXVCSixVQURSO0FBRXhCckQsY0FBYSxnQkFBTW1ELFNBQU4sQ0FBZ0JHLElBRkw7QUFHeEIzRCxVQUFTLGdCQUFNd0QsU0FBTixDQUFnQkc7QUFIRCxDQWxHTixTQUFkOztrQkFxTFEsc0JBQWMzRSxPQUFkLEVBQXNCLEVBQUNmLGNBQUQsRUFBU0MsY0FBVCxFQUFnQlUsZ0JBQWhCLEVBQXRCLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSwge3JlbmRlcn0gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsY29tcG9zZX0gZnJvbSBcInJlZHV4XCJcbmltcG9ydCB7UHJvdmlkZXIsIGNvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXG5cbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IHtlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcIi5cIlxuXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5cbmNvbnN0IG11aVRoZW1lPWdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lKVxuXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXG5cdFx0XHRcdCxwYXlsb2FkOnt1c2VyOlVzZXIuY3VycmVudCxlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LFVTRVJfQ0hBTkdFRDp1c2VyPT4oe1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgXG5cdFx0LHBheWxvYWQ6dXNlclxuXHR9KSxUVVRPUklBTElaRUQ6KHtcbiAgICAgICAgdHlwZTpgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYFxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUse1xuXHRcdFx0aW5pdGVkOnRydWVcblx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0LHR1dG9yaWFsaXplZDpwYXlsb2FkLnR1dG9yaWFsaXplZFxuXHRcdH0pXG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZEVycm9yYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XG5cdFx0XHRpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0fSlcblx0YnJlYWtcblx0Y2FzZSBgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XG5cdFx0XHRpbml0ZWQ6ISFwYXlsb2FkXG5cdFx0XHQsdXNlcjpwYXlsb2FkXG5cdFx0fSlcblx0Y2FzZSBgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dHV0b3JpYWxpemVkOnRydWV9KVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFxuXHRjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0XHRzdXBlcihwcm9wcylcblxuXHRcdFx0c3VwcG9ydFRhcCgpXG5cblx0XHRcdGNvbnN0IHtzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuXG5cdFx0XHRpZighYXBwSWQpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxuXG5cdFx0XHRpZighc2VydmljZSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcblx0XHR9XG5cblx0XHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdFx0dmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRcdGlmKHRpdGxlKVxuXHRcdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxuXG5cdFx0XHRpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG5cdFx0XHRcdC50aGVuKCh0dXRvcmlhbGl6ZWQ9dHJ1ZSk9Pntcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChudWxsLCEhdHV0b3JpYWxpemVkKSlcblx0XHRcdFx0XHRcdFVzZXIub24oJ2NoYW5nZScsIHVzZXI9PmRpc3BhdGNoKEFDVElPTi5VU0VSX0NIQU5HRUQodXNlcikpKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXG5cdFx0fVxuXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0XHRsZXQgc2VsZj10aGlzXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRtdWlUaGVtZVxuXHRcdFx0XHQsc2hvd01lc3NhZ2UoKXtcblx0XHRcdFx0XHRzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0fVxuXHRcdFx0XHQsbG9hZGluZyhvcGVuKXtcblx0XHRcdFx0XHRzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNob3dNZXNzYWdlKCl7XG5cdFx0XHR0aGlzLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxuXHRcdH1cblxuXG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRjb25zdCB7aW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgdHV0b3JpYWxpemVkLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdFx0bGV0IGNvbnRlbnRcblxuXHRcdFx0aWYoIWluaXRlZCl7XG5cdFx0XHRcdGlmKGluaXRlZEVycm9yKVxuXHRcdFx0XHRcdGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxuXHRcdFx0fWVsc2UgaWYoIXVzZXIpe1xuXHRcdFx0XHRpZighdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG5cdFx0XHRcdFx0cmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz4pXG5cblx0XHRcdFx0Y29udGVudD0oPEFjY291bnQgLz4pXG5cdFx0XHR9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuXHRcdFx0XHRjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfS8+KVxuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cblx0XHRcdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdFx0XHRcdDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG5cdFx0XHRcdFx0XHRcdDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpXG5cdFx0fVxuXG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0XHR9XG5cblxuXG5cdFx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0XHRzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuXHRcdFx0aW5pdCgpe30sXG5cdFx0XHR0dXRvcmlhbDpbXVxuXHRcdH1cblxuXHRcdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdGFwcElkOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHR0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0XHR0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0XHRtdWlUaGVtZTpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdFx0XHRzaG93TWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHRsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHRcdH1cblxuXHRcdHN0YXRpYyByZW5kZXIocm91dGUsIHJlZHVjZXJzPVtdLCAuLi5taWRkbGV3YXJzKXtcblx0XHRcdGNvbnN0IHByb3BzPXt9XG5cdFx0XHRsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuXHRcdFx0aWYoIWNvbnRhaW5lcil7XG5cdFx0XHRcdGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0XHRjb250YWluZXIuaWQ9J2FwcCdcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG5cdFx0XHR9XG5cdFx0XHRsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cdFx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG5cdFx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXG5cblx0XHRcdGlmKCFwcm9wcy5oaXN0b3J5KVxuXHRcdFx0XHRwcm9wcy5oaXN0b3J5PWhhc2hIaXN0b3J5XG5cblx0XHRcdGZ1bmN0aW9uIHJvdXRlclJkdWNlcihzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSl7XG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdFx0Y2FzZSAnQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFJzpcblx0XHRcdFx0cmV0dXJuIHBheWxvYWRcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RhdGVcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZW5oYW5jZWRSb3V0ZT0ocm9vdCxkaXNwYXRjaCk9Pntcblx0XHRcdFx0Y29uc3Qge29uRW50ZXIsIG9uQ2hhbmdlfT1yb290LnByb3BzXG5cdFx0XHRcdHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQocm9vdCwge1xuXHRcdFx0XHRcdG9uRW50ZXIobmV4dFN0YXRlKXtcblx0XHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0XHRvbkVudGVyICYmIG9uRW50ZXIuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbkNoYW5nZShzdGF0ZSxuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcblx0XHRcdFx0XHRcdG9uQ2hhbmdlICYmIG9uQ2hhbmdlLmJpbmQodGhpcykoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gbm9ybWFsaXplRGF0YShlbnRpdGllcz17fSx7dHlwZSxwYXlsb2FkfSl7XG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdFx0Y2FzZSAnTk9STUFMSVpFRF9EQVRBJzpcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0XHRcdHt9LFxuXHRcdFx0XHRcdFx0ZW50aXRpZXMsXG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhwYXlsb2FkKS5yZWR1Y2UoKG1lcmdlZCx0eXBlKT0+e1xuXHRcdFx0XHRcdFx0XHRpZih0eXBlb2YocGF5bG9hZFt0eXBlXVsnJHJlbW92ZSddKT09J3VuZGVmaW5lZCcpXG5cdFx0XHRcdFx0XHRcdFx0bWVyZ2VkW3R5cGVdPU9iamVjdC5hc3NpZ24oe30sZW50aXRpZXNbdHlwZV0scGF5bG9hZFt0eXBlXSlcblx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LHBheWxvYWRbdHlwZV1bJyRyZW1vdmUnXS5yZWR1Y2UoKGFsbCxhKT0+KGRlbGV0ZSBhbGxbYV0sYWxsKSxlbnRpdGllc1t0eXBlXSkpXG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1lcmdlZFxuXHRcdFx0XHRcdFx0fSx7fSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGVudGl0aWVzXG5cdFx0XHR9XG5cblxuXHRcdFx0Y29uc3QgYWxsUmVkdWNlcnM9ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoe1xuXHRcdFx0XHRcdFx0cm91dGluZzpyb3V0ZXJSZHVjZXJcblx0XHRcdFx0XHRcdCxlbnRpdGllczpub3JtYWxpemVEYXRhXG5cdFx0XHRcdFx0XHQsW0RPTUFJTl06UkVEVUNFUlxuXHRcdFx0XHRcdH0sIC4uLnJlZHVjZXJzKVxuXHRcdFx0Y29uc3QgY29tcG9zZUVuaGFuY2VycyA9IHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18gfHwgY29tcG9zZTtcblx0XHRcdGNvbnN0IHN0b3JlPWNyZWF0ZVN0b3JlKGFsbFJlZHVjZXJzLCB7cWlsaUFwcDp7fSwgdWk6e30sIGVudGl0aWVzOnt9fSwgY29tcG9zZUVuaGFuY2VycyhhcHBseU1pZGRsZXdhcmUodGh1bmssLi4ubWlkZGxld2FycykpKVxuXG5cdFx0XHRyZXR1cm4gcmVuZGVyKChcblx0XHRcdFx0XHQ8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cblx0XHRcdFx0XHRcdDxSb3V0ZXIgey4uLnByb3BzfT5cblx0XHRcdFx0XHRcdFx0e2VuaGFuY2VkUm91dGUocm91dGUsc3RvcmUuZGlzcGF0Y2gpfVxuXHRcdFx0XHRcdFx0PC9Sb3V0ZXI+XG5cdFx0XHRcdFx0PC9Qcm92aWRlcj5cblx0XHRcdFx0KSxjb250YWluZXIpXG5cdFx0fVxuXHR9XG4pXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oUWlsaUFwcCx7RE9NQUlOLCBBQ1RJT04sUkVEVUNFUn0pXG4iXX0=