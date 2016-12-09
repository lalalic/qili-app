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
	theme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default),
	init: function init() {},

	tutorial: []
}, _class.propsTypes = {
	service: _react2.default.PropTypes.string.isRequired,
	appId: _react2.default.PropTypes.string.isRequired,
	theme: _react2.default.PropTypes.object.isRequired,
	init: _react2.default.PropTypes.func,
	tutorial: _react2.default.PropTypes.array,
	title: _react2.default.PropTypes.string
}, _class.childContextTypes = {
	showMessage: _react2.default.PropTypes.func,
	loading: _react2.default.PropTypes.func
}, _temp));

exports.default = (0, _assign2.default)(QiliApp, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiVVNFUl9DSEFOR0VEIiwiVFVUT1JJQUxJWkVEIiwiUkVEVUNFUiIsInN0YXRlIiwiaW5pdGVkIiwiaW5pdGVkRXJyb3IiLCJRaWxpQXBwIiwicHVyZSIsIndpdGhSZWYiLCJwcm9wcyIsInNlcnZpY2UiLCJhcHBJZCIsIkVycm9yIiwiaW5pdEFwcCIsImluaXQiLCJ0aXRsZSIsImRpc3BhdGNoIiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm9uIiwibWVzc2FnZSIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJ0aGVtZSIsImNvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJ0dXRvcmlhbCIsImxlbmd0aCIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlIiwibWlkZGxld2FycyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5Iiwicm91dGVyUmR1Y2VyIiwiZW5oYW5jZWRSb3V0ZSIsInJvb3QiLCJvbkVudGVyIiwib25DaGFuZ2UiLCJjbG9uZUVsZW1lbnQiLCJuZXh0U3RhdGUiLCJiaW5kIiwibm9ybWFsaXplRGF0YSIsImVudGl0aWVzIiwicmVkdWNlIiwibWVyZ2VkIiwiYWxsIiwiYSIsImFsbFJlZHVjZXJzIiwicm91dGluZyIsImNvbXBvc2VFbmhhbmNlcnMiLCJfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18iLCJzdG9yZSIsInFpbGlBcHAiLCJ1aSIsImRlZmF1bHRQcm9wcyIsInByb3BzVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwib2JqZWN0IiwiZnVuYyIsImFycmF5IiwiY2hpbGRDb250ZXh0VHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsMEJBQU8sU0FBYjs7QUFFQSxJQUFNQywwQkFBTztBQUNuQkMsU0FEbUIsb0JBQ1ZDLEtBRFUsRUFDSkMsWUFESSxFQUNTO0FBQzNCLE1BQUcsQ0FBQyxDQUFDRCxLQUFMLEVBQVc7QUFDVixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLGlCQURNO0FBRUxNLGFBQVEsRUFBQ0MsTUFBSyxTQUFLQyxPQUFYLEVBQW1CTCxZQUFuQjtBQUZILElBQVA7QUFJQSxHQUxELE1BS0s7QUFDSixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLFlBRE07QUFFTE0sYUFBUSxFQUFDRiwwQkFBRDtBQUZILElBQVA7QUFJQTtBQUNELEVBYmtCO0FBY2xCSyxlQUFhO0FBQUEsU0FBTztBQUNkSixnQkFBVUwsTUFBVixrQkFEYztBQUVuQk0sWUFBUUM7QUFGVyxHQUFQO0FBQUEsRUFkSyxFQWlCaEJHLGNBQWM7QUFDVkwsZUFBVUwsTUFBVjtBQURVO0FBakJFLENBQWI7O0FBc0JBLElBQU1XLDRCQUFRLFNBQVJBLE9BQVEsR0FBMkI7QUFBQSxLQUExQkMsS0FBMEIsdUVBQXBCLEVBQW9CO0FBQUE7QUFBQSxLQUFoQlAsSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUMvQyxTQUFPRCxJQUFQO0FBQ0EsY0FBVUwsTUFBVjtBQUNDLFVBQU8sc0JBQWMsRUFBZCxFQUFrQlksS0FBbEIsRUFBd0I7QUFDOUJDLFlBQU8sSUFEdUI7QUFFN0JOLFVBQUssU0FBS0MsT0FGbUI7QUFHN0JKLGtCQUFhRSxRQUFRRjtBQUhRLElBQXhCLENBQVA7QUFLRDtBQUNBLGNBQVVKLE1BQVY7QUFDQyxVQUFPLHNCQUFjLEVBQWQsRUFBaUJZLEtBQWpCLEVBQXVCO0FBQzdCRSxpQkFBWVIsUUFBUUg7QUFEUyxJQUF2QixDQUFQO0FBR0Q7QUFDQSxjQUFVSCxNQUFWO0FBQ0MsVUFBTyxzQkFBYyxFQUFkLEVBQWlCWSxLQUFqQixFQUF1QjtBQUM3QkMsWUFBTyxDQUFDLENBQUNQLE9BRG9CO0FBRTVCQyxVQUFLRDtBQUZ1QixJQUF2QixDQUFQO0FBSUQsY0FBVU4sTUFBVjtBQUNDLFVBQU8sc0JBQWMsRUFBZCxFQUFpQlksS0FBakIsRUFBdUIsRUFBQ1IsY0FBYSxJQUFkLEVBQXZCLENBQVA7QUFuQkQ7QUFxQkEsUUFBT1EsS0FBUDtBQUNBLENBdkJNOztBQXlCQSxJQUFNRyw0QkFBUSx5QkFBUTtBQUFBLFFBQU9ILE1BQU1aLE1BQU4sQ0FBUDtBQUFBLENBQVIsRUFBNkIsSUFBN0IsRUFBa0MsSUFBbEMsRUFBdUMsRUFBQ2dCLE1BQUssSUFBTixFQUFXQyxTQUFRLElBQW5CLEVBQXZDO0FBQUE7O0FBRW5CLGlCQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsb0lBQ1hBLEtBRFc7O0FBR2pCOztBQUhpQixvQkFLTSxNQUFLQSxLQUxYO0FBQUEsTUFLVkMsT0FMVSxlQUtWQSxPQUxVO0FBQUEsTUFLREMsS0FMQyxlQUtEQSxLQUxDOzs7QUFPakIsTUFBRyxDQUFDQSxLQUFKLEVBQ0MsTUFBTSxJQUFJQyxLQUFKLENBQVUsNkJBQVYsQ0FBTjs7QUFFRCxNQUFHLENBQUNGLE9BQUosRUFDQyxNQUFNLElBQUlFLEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBWGdCO0FBWWpCOztBQWRrQjtBQUFBO0FBQUEsc0NBZ0JBO0FBQUE7O0FBQUEsZ0JBQ2tDLEtBQUtILEtBRHZDO0FBQUEsT0FDUkksT0FEUSxVQUNiQyxJQURhO0FBQUEsT0FDQ0osT0FERCxVQUNDQSxPQUREO0FBQUEsT0FDVUMsS0FEVixVQUNVQSxLQURWO0FBQUEsT0FDaUJJLEtBRGpCLFVBQ2lCQSxLQURqQjtBQUFBLE9BQ3dCQyxRQUR4QixVQUN3QkEsUUFEeEI7O0FBRWxCLE9BQUdELEtBQUgsRUFDQ0UsU0FBU0YsS0FBVCxHQUFlQSxLQUFmOztBQUVELGlCQUFLTCxPQUFMLEVBQWNDLEtBQWQsRUFBcUJFLE9BQXJCLEVBQThCLFVBQUNLLENBQUQ7QUFBQSxRQUFHdEIsSUFBSCx1RUFBUSxPQUFSO0FBQUEsV0FBa0IsT0FBS3VCLElBQUwsQ0FBVUMsR0FBVixDQUFjQyxJQUFkLENBQW1CSCxDQUFuQixFQUFxQnRCLElBQXJCLENBQWxCO0FBQUEsSUFBOUIsRUFBNEUsS0FBS3VCLElBQUwsQ0FBVUcsT0FBdEYsRUFDRUMsSUFERixDQUNPLFlBQXNCO0FBQUEsUUFBckI1QixZQUFxQix1RUFBUixLQUFROztBQUMxQnFCLGFBQVN4QixPQUFPQyxRQUFQLENBQWdCLElBQWhCLEVBQXFCLENBQUMsQ0FBQ0UsWUFBdkIsQ0FBVDtBQUNBLGFBQUs2QixFQUFMLENBQVEsUUFBUixFQUFrQjtBQUFBLFlBQU1SLFNBQVN4QixPQUFPUSxZQUFQLENBQW9CRixJQUFwQixDQUFULENBQU47QUFBQSxLQUFsQjtBQUNBLElBSkgsRUFLRSxVQUFDb0IsQ0FBRDtBQUFBLFdBQUtGLFNBQVN4QixPQUFPQyxRQUFQLENBQWdCeUIsRUFBRU8sT0FBbEIsQ0FBVCxDQUFMO0FBQUEsSUFMRjtBQU1BO0FBM0JrQjtBQUFBO0FBQUEsb0NBNkJGO0FBQ2hCLE9BQUlDLE9BQUssSUFBVDtBQUNBLFVBQU87QUFDTkMsZUFETSx5QkFDTztBQUNaRCxVQUFLQyxXQUFMLGFBQW9CQyxTQUFwQjtBQUNBLEtBSEs7QUFJTE4sV0FKSyxtQkFJR08sSUFKSCxFQUlRO0FBQ2JILFVBQUtQLElBQUwsQ0FBVUcsT0FBVixDQUFrQk8sT0FBTyxNQUFQLEdBQWdCLE9BQWxDO0FBQ0E7QUFOSyxJQUFQO0FBUUE7QUF2Q2tCO0FBQUE7QUFBQSxnQ0F5Q047QUFBQTs7QUFDWixxQkFBS1YsSUFBTCxDQUFVQyxHQUFWLEVBQWNDLElBQWQsa0JBQXNCTyxTQUF0QjtBQUNBO0FBM0NrQjtBQUFBO0FBQUEsMkJBOENYO0FBQUEsaUJBQzBELEtBQUtuQixLQUQvRDtBQUFBLE9BQ0FxQixLQURBLFdBQ0FBLEtBREE7QUFBQSxPQUNPMUIsTUFEUCxXQUNPQSxNQURQO0FBQUEsT0FDZUMsV0FEZixXQUNlQSxXQURmO0FBQUEsT0FDNEJQLElBRDVCLFdBQzRCQSxJQUQ1QjtBQUFBLE9BQ2tDSCxZQURsQyxXQUNrQ0EsWUFEbEM7QUFBQSxPQUNnRHFCLFFBRGhELFdBQ2dEQSxRQURoRDs7QUFFUCxPQUFJZSxnQkFBSjs7QUFFQSxPQUFHLENBQUMzQixNQUFKLEVBQVc7QUFDVixRQUFHQyxXQUFILEVBQ0MwQixtQ0FBZ0MxQixXQUFoQyxDQURELEtBR0MwQixVQUFTLGlCQUFUO0FBQ0QsSUFMRCxNQUtNLElBQUcsQ0FBQ2pDLElBQUosRUFBUztBQUNkLFFBQUcsQ0FBQ0gsWUFBRCxJQUFpQnFDLE1BQU1DLE9BQU4sQ0FBYyxLQUFLeEIsS0FBTCxDQUFXeUIsUUFBekIsQ0FBakIsSUFBdUQsS0FBS3pCLEtBQUwsQ0FBV3lCLFFBQVgsQ0FBb0JDLE1BQTlFLEVBQ0MsT0FBUSxvREFBVSxRQUFRLEtBQUsxQixLQUFMLENBQVd5QixRQUE3QixFQUF1QyxPQUFPO0FBQUEsYUFBR2xCLFNBQVN4QixPQUFPUyxZQUFoQixDQUFIO0FBQUEsTUFBOUMsR0FBUjs7QUFFRDhCLGNBQVMsc0RBQVQ7QUFDQSxJQUxLLE1BS0EsSUFBRyxDQUFDakMsS0FBS3NDLFlBQVQsRUFBc0I7QUFDM0JMLGNBQVMsbURBQVMsTUFBTWpDLElBQWYsR0FBVDtBQUNBLElBRkssTUFFQTtBQUNMaUMsY0FBUSxLQUFLTSxhQUFMLEVBQVI7QUFDQTs7QUFFRCxVQUNDO0FBQUE7QUFBQSxNQUFrQixVQUFVUCxLQUE1QjtBQUNDO0FBQUE7QUFBQSxPQUFLLFdBQVUsYUFBZjtBQUNDO0FBQUE7QUFBQSxRQUFLLElBQUcsV0FBUixFQUFvQixPQUFPLEVBQUNRLFdBQVUsUUFBWCxFQUEzQjtBQUNFUCxhQURGO0FBRUMsMERBQVUsS0FBSSxLQUFkLEVBQW9CLFdBQVUsb0JBQTlCLEdBRkQ7QUFHQyx5REFBUyxLQUFJLFNBQWIsRUFBd0IsV0FBVSxrQkFBbEM7QUFIRDtBQUREO0FBREQsSUFERDtBQVdBO0FBN0VrQjtBQUFBO0FBQUEsa0NBK0VKO0FBQ2QsVUFBTyxLQUFLdEIsS0FBTCxDQUFXOEIsUUFBbEI7QUFDQTtBQWpGa0I7QUFBQTtBQUFBLHlCQTBHTEMsS0ExR0ssRUEwRzZCO0FBQUEscUNBQVhDLFVBQVc7QUFBWEEsY0FBVztBQUFBOztBQUFBLE9BQTNCQyxRQUEyQix1RUFBbEIsRUFBa0I7O0FBQy9DLE9BQU1qQyxRQUFNLEVBQVo7QUFDQSxPQUFJa0MsWUFBVTFCLFNBQVMyQixjQUFULENBQXdCLEtBQXhCLENBQWQ7QUFDQSxPQUFHLENBQUNELFNBQUosRUFBYztBQUNiQSxnQkFBVTFCLFNBQVM0QixhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQUYsY0FBVUcsRUFBVixHQUFhLEtBQWI7QUFDQTdCLGFBQVM4QixJQUFULENBQWNDLFdBQWQsQ0FBMEJMLFNBQTFCO0FBQ0E7QUFDRCxPQUFJTSxRQUFNaEMsU0FBUzRCLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBVjtBQUNBNUIsWUFBU2lDLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDRixXQUF6QyxDQUFxREMsS0FBckQ7QUFDQUEsU0FBTUUsU0FBTixHQUFnQixzQkFBb0JDLE9BQU9DLFdBQTNCLEdBQXVDLEtBQXZEO0FBQ0FWLGFBQVVNLEtBQVYsQ0FBZ0JLLE1BQWhCLEdBQXVCRixPQUFPQyxXQUFQLEdBQW1CLElBQTFDOztBQUVBLE9BQUcsQ0FBQzVDLE1BQU04QyxPQUFWLEVBQ0M5QyxNQUFNOEMsT0FBTjs7QUFFRCxZQUFTQyxZQUFULEdBQThDO0FBQUEsUUFBeEJyRCxLQUF3Qix1RUFBbEIsRUFBa0I7QUFBQTtBQUFBLFFBQWRQLElBQWMsU0FBZEEsSUFBYztBQUFBLFFBQVRDLE9BQVMsU0FBVEEsT0FBUzs7QUFDN0MsWUFBT0QsSUFBUDtBQUNBLFVBQUssMEJBQUw7QUFDQSxhQUFPQyxPQUFQO0FBRkE7QUFJQSxXQUFPTSxLQUFQO0FBQ0E7O0FBRUQsT0FBTXNELGdCQUFjLFNBQWRBLGFBQWMsQ0FBQ0MsSUFBRCxFQUFNMUMsUUFBTixFQUFpQjtBQUFBLHNCQUNWMEMsS0FBS2pELEtBREs7QUFBQSxRQUM3QmtELFFBRDZCLGVBQzdCQSxPQUQ2QjtBQUFBLFFBQ3BCQyxTQURvQixlQUNwQkEsUUFEb0I7O0FBRXBDLFdBQU8sZ0JBQU1DLFlBQU4sQ0FBbUJILElBQW5CLEVBQXlCO0FBQy9CQyxZQUQrQixtQkFDdkJHLFNBRHVCLEVBQ2I7QUFDakI5QyxlQUFTLEVBQUNwQixnQ0FBRCxFQUFpQ0MsU0FBUWlFLFNBQXpDLEVBQVQ7QUFDQUgsa0JBQVdBLFNBQVFJLElBQVIsQ0FBYSxJQUFiLG1CQUFzQm5DLFNBQXRCLENBQVg7QUFDQSxNQUo4QjtBQUsvQmdDLGFBTCtCLG9CQUt0QnpELEtBTHNCLEVBS2hCMkQsU0FMZ0IsRUFLTjtBQUN4QjlDLGVBQVMsRUFBQ3BCLGdDQUFELEVBQWlDQyxTQUFRaUUsU0FBekMsRUFBVDtBQUNBRixtQkFBWUEsVUFBU0csSUFBVCxDQUFjLElBQWQsbUJBQXVCbkMsU0FBdkIsQ0FBWjtBQUNBO0FBUjhCLEtBQXpCLENBQVA7QUFVQSxJQVpEOztBQWNBLFlBQVNvQyxhQUFULEdBQWtEO0FBQUEsUUFBM0JDLFFBQTJCLHVFQUFsQixFQUFrQjtBQUFBO0FBQUEsUUFBZHJFLElBQWMsU0FBZEEsSUFBYztBQUFBLFFBQVRDLE9BQVMsU0FBVEEsT0FBUzs7QUFDakQsWUFBT0QsSUFBUDtBQUNBLFVBQUssaUJBQUw7QUFDQyxhQUFPLHNCQUNOLEVBRE0sRUFFTnFFLFFBRk0sRUFHTixvQkFBWXBFLE9BQVosRUFBcUJxRSxNQUFyQixDQUE0QixVQUFDQyxNQUFELEVBQVF2RSxJQUFSLEVBQWU7QUFDMUMsV0FBRyxPQUFPQyxRQUFRRCxJQUFSLEVBQWMsU0FBZCxDQUFQLElBQWtDLFdBQXJDLEVBQ0N1RSxPQUFPdkUsSUFBUCxJQUFhLHNCQUFjLEVBQWQsRUFBaUJxRSxTQUFTckUsSUFBVCxDQUFqQixFQUFnQ0MsUUFBUUQsSUFBUixDQUFoQyxDQUFiLENBREQsS0FHQ3VFLE9BQU92RSxJQUFQLElBQWEsc0JBQWMsRUFBZCxFQUFpQkMsUUFBUUQsSUFBUixFQUFjLFNBQWQsRUFBeUJzRSxNQUF6QixDQUFnQyxVQUFDRSxHQUFELEVBQUtDLENBQUw7QUFBQSxlQUFVLE9BQU9ELElBQUlDLENBQUosQ0FBUCxFQUFjRCxHQUF4QjtBQUFBLFFBQWhDLEVBQTZESCxTQUFTckUsSUFBVCxDQUE3RCxDQUFqQixDQUFiOztBQUVELGNBQU91RSxNQUFQO0FBQ0EsT0FQRCxFQU9FLEVBUEYsQ0FITSxDQUFQO0FBRkQ7QUFlQSxXQUFPRixRQUFQO0FBQ0E7O0FBR0QsT0FBTUssY0FBWTtBQUNmQyxhQUFRZixZQURPO0FBRWRTLGNBQVNEO0FBRkssTUFHYnpFLE1BSGEsRUFHTFcsT0FISywyQ0FJVndDLFFBSlUsR0FBbEI7QUFLQSxPQUFNOEIsbUJBQW1CcEIsT0FBT3FCLG9DQUFQLGtCQUF6QjtBQUNBLE9BQU1DLFFBQU0sd0JBQVlKLFdBQVosRUFBeUIsRUFBQ0ssU0FBUSxFQUFULEVBQWFDLElBQUcsRUFBaEIsRUFBb0JYLFVBQVMsRUFBN0IsRUFBekIsRUFBMkRPLGlCQUFpQixzRUFBeUIvQixVQUF6QixFQUFqQixDQUEzRCxDQUFaOztBQUVBLFVBQU8sc0JBQ0w7QUFBQTtBQUFBLE1BQVUsT0FBT2lDLEtBQWpCO0FBQ0M7QUFBQTtBQUFZakUsVUFBWjtBQUNFZ0QsbUJBQWNqQixLQUFkLEVBQW9Ca0MsTUFBTTFELFFBQTFCO0FBREY7QUFERCxJQURLLEVBTUoyQixTQU5JLENBQVA7QUFPQTtBQW5Ma0I7QUFBQTtBQUFBLDRCQXFGWmtDLFlBckZZLEdBcUZDO0FBQ25CbkUsVUFBUSxxQkFEVztBQUVuQm9CLFFBQU0sb0RBRmE7QUFHbkJoQixLQUhtQixrQkFHYixDQUFFLENBSFc7O0FBSW5Cb0IsV0FBUztBQUpVLENBckZELFNBNEZaNEMsVUE1RlksR0E0RkQ7QUFDakJwRSxVQUFTLGdCQUFNcUUsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUJDLFVBRGY7QUFFakJ0RSxRQUFNLGdCQUFNb0UsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUJDLFVBRlo7QUFHakJuRCxRQUFPLGdCQUFNaUQsU0FBTixDQUFnQkcsTUFBaEIsQ0FBdUJELFVBSGI7QUFJakJuRSxPQUFLLGdCQUFNaUUsU0FBTixDQUFnQkksSUFKSjtBQUtqQmpELFdBQVMsZ0JBQU02QyxTQUFOLENBQWdCSyxLQUxSO0FBTWpCckUsUUFBTyxnQkFBTWdFLFNBQU4sQ0FBZ0JDO0FBTk4sQ0E1RkMsU0FxR1pLLGlCQXJHWSxHQXFHTTtBQUN4QjFELGNBQWEsZ0JBQU1vRCxTQUFOLENBQWdCSSxJQURMO0FBRXhCN0QsVUFBUyxnQkFBTXlELFNBQU4sQ0FBZ0JJO0FBRkQsQ0FyR04sU0FBZDs7a0JBdUxRLHNCQUFjN0UsT0FBZCxFQUFzQixFQUFDZixjQUFELEVBQVNDLGNBQVQsRUFBZ0JVLGdCQUFoQixFQUF0QixDIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxuXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLGNvbXBvc2V9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgTXVpVGhlbWVQcm92aWRlciBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlcidcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IHtlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcIi5cIlxuXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5cbmV4cG9ydCBjb25zdCBET01BSU49XCJxaWxpQXBwXCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdElOSVRfQVBQKGVycm9yLHR1dG9yaWFsaXplZCl7XG5cdFx0aWYoISFlcnJvcil7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmBcblx0XHRcdFx0LHBheWxvYWQ6e3VzZXI6VXNlci5jdXJyZW50LGVycm9yfVxuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkYFxuXHRcdFx0XHQscGF5bG9hZDp7dHV0b3JpYWxpemVkfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHQsVVNFUl9DSEFOR0VEOnVzZXI9Pih7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcblx0XHQscGF5bG9hZDp1c2VyXG5cdH0pLFRVVE9SSUFMSVpFRDooe1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXG5cdH0pXG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSx7XG5cdFx0XHRpbml0ZWQ6dHJ1ZVxuXHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XG5cdFx0XHQsdHV0b3JpYWxpemVkOnBheWxvYWQudHV0b3JpYWxpemVkXG5cdFx0fSlcblx0YnJlYWtcblx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtcblx0XHRcdGluaXRlZEVycm9yOnBheWxvYWQuZXJyb3Jcblx0XHR9KVxuXHRicmVha1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtcblx0XHRcdGluaXRlZDohIXBheWxvYWRcblx0XHRcdCx1c2VyOnBheWxvYWRcblx0XHR9KVxuXHRjYXNlIGBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHt0dXRvcmlhbGl6ZWQ6dHJ1ZX0pXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBRaWxpQXBwPWNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0sbnVsbCxudWxsLHtwdXJlOnRydWUsd2l0aFJlZjp0cnVlfSkoXG5cdGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRcdHN1cGVyKHByb3BzKVxuXG5cdFx0XHRzdXBwb3J0VGFwKClcblxuXHRcdFx0Y29uc3Qge3NlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cblx0XHRcdGlmKCFhcHBJZClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cblx0XHRcdGlmKCFzZXJ2aWNlKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuXHRcdH1cblxuXHRcdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0XHR2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWQsIHRpdGxlLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdFx0aWYodGl0bGUpXG5cdFx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cblx0XHRcdGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcblx0XHRcdFx0LnRoZW4oKHR1dG9yaWFsaXplZD1mYWxzZSk9Pntcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChudWxsLCEhdHV0b3JpYWxpemVkKSlcblx0XHRcdFx0XHRcdFVzZXIub24oJ2NoYW5nZScsIHVzZXI9PmRpc3BhdGNoKEFDVElPTi5VU0VSX0NIQU5HRUQodXNlcikpKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXG5cdFx0fVxuXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0XHRsZXQgc2VsZj10aGlzXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzaG93TWVzc2FnZSgpe1xuXHRcdFx0XHRcdHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCxsb2FkaW5nKG9wZW4pe1xuXHRcdFx0XHRcdHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2hvd01lc3NhZ2UoKXtcblx0XHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdFx0fVxuXG5cblx0XHRyZW5kZXIoKXtcblx0XHRcdGNvbnN0IHt0aGVtZSwgaW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgdHV0b3JpYWxpemVkLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdFx0bGV0IGNvbnRlbnRcblxuXHRcdFx0aWYoIWluaXRlZCl7XG5cdFx0XHRcdGlmKGluaXRlZEVycm9yKVxuXHRcdFx0XHRcdGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxuXHRcdFx0fWVsc2UgaWYoIXVzZXIpe1xuXHRcdFx0XHRpZighdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG5cdFx0XHRcdFx0cmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz4pXG5cblx0XHRcdFx0Y29udGVudD0oPEFjY291bnQgLz4pXG5cdFx0XHR9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuXHRcdFx0XHRjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfS8+KVxuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxNdWlUaGVtZVByb3ZpZGVyIG11aVRoZW1lPXt0aGVtZX0+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cblx0XHRcdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdFx0XHRcdDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG5cdFx0XHRcdFx0XHRcdDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L011aVRoZW1lUHJvdmlkZXI+XG5cdFx0XHQpXG5cdFx0fVxuXG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0XHR9XG5cblxuXG5cdFx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0XHRzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuXHRcdFx0dGhlbWU6Z2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUpLFxuXHRcdFx0aW5pdCgpe30sXG5cdFx0XHR0dXRvcmlhbDpbXVxuXHRcdH1cblxuXHRcdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdGFwcElkOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdHRoZW1lOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdFx0XHRpbml0OlJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdFx0dHV0b3JpYWw6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdFx0dGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0fVxuXG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRcdHNob3dNZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRcdGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdFx0fVxuXG5cdFx0c3RhdGljIHJlbmRlcihyb3V0ZSwgcmVkdWNlcnM9W10sIC4uLm1pZGRsZXdhcnMpe1xuXHRcdFx0Y29uc3QgcHJvcHM9e31cblx0XHRcdGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG5cdFx0XHRpZighY29udGFpbmVyKXtcblx0XHRcdFx0Y29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRcdGNvbnRhaW5lci5pZD0nYXBwJ1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcblx0XHRcdH1cblx0XHRcdGxldCBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcblx0XHRcdHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuXHRcdFx0aWYoIXByb3BzLmhpc3RvcnkpXG5cdFx0XHRcdHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuXHRcdFx0ZnVuY3Rpb24gcm91dGVyUmR1Y2VyKHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KXtcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0XHRjYXNlICdAQHJvdXRlci9MT0NBVElPTl9DSEFOR0UnOlxuXHRcdFx0XHRyZXR1cm4gcGF5bG9hZFxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBlbmhhbmNlZFJvdXRlPShyb290LGRpc3BhdGNoKT0+e1xuXHRcdFx0XHRjb25zdCB7b25FbnRlciwgb25DaGFuZ2V9PXJvb3QucHJvcHNcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChyb290LCB7XG5cdFx0XHRcdFx0b25FbnRlcihuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcblx0XHRcdFx0XHRcdG9uRW50ZXIgJiYgb25FbnRlci5iaW5kKHRoaXMpKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG9uQ2hhbmdlKHN0YXRlLG5leHRTdGF0ZSl7XG5cdFx0XHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFYCxwYXlsb2FkOm5leHRTdGF0ZX0pO1xuXHRcdFx0XHRcdFx0b25DaGFuZ2UgJiYgb25DaGFuZ2UuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBub3JtYWxpemVEYXRhKGVudGl0aWVzPXt9LHt0eXBlLHBheWxvYWR9KXtcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0XHRjYXNlICdOT1JNQUxJWkVEX0RBVEEnOlxuXHRcdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdFx0e30sXG5cdFx0XHRcdFx0XHRlbnRpdGllcyxcblx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKHBheWxvYWQpLnJlZHVjZSgobWVyZ2VkLHR5cGUpPT57XG5cdFx0XHRcdFx0XHRcdGlmKHR5cGVvZihwYXlsb2FkW3R5cGVdWyckcmVtb3ZlJ10pPT0ndW5kZWZpbmVkJylcblx0XHRcdFx0XHRcdFx0XHRtZXJnZWRbdHlwZV09T2JqZWN0LmFzc2lnbih7fSxlbnRpdGllc1t0eXBlXSxwYXlsb2FkW3R5cGVdKVxuXHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0bWVyZ2VkW3R5cGVdPU9iamVjdC5hc3NpZ24oe30scGF5bG9hZFt0eXBlXVsnJHJlbW92ZSddLnJlZHVjZSgoYWxsLGEpPT4oZGVsZXRlIGFsbFthXSxhbGwpLGVudGl0aWVzW3R5cGVdKSlcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbWVyZ2VkXG5cdFx0XHRcdFx0XHR9LHt9KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZW50aXRpZXNcblx0XHRcdH1cblxuXG5cdFx0XHRjb25zdCBhbGxSZWR1Y2Vycz1lbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XG5cdFx0XHRcdFx0XHRyb3V0aW5nOnJvdXRlclJkdWNlclxuXHRcdFx0XHRcdFx0LGVudGl0aWVzOm5vcm1hbGl6ZURhdGFcblx0XHRcdFx0XHRcdCxbRE9NQUlOXTpSRURVQ0VSXG5cdFx0XHRcdFx0fSwgLi4ucmVkdWNlcnMpXG5cdFx0XHRjb25zdCBjb21wb3NlRW5oYW5jZXJzID0gd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyB8fCBjb21wb3NlO1xuXHRcdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e319LCBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSh0aHVuaywuLi5taWRkbGV3YXJzKSkpXG5cblx0XHRcdHJldHVybiByZW5kZXIoKFxuXHRcdFx0XHRcdDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuXHRcdFx0XHRcdFx0PFJvdXRlciB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdFx0XHR7ZW5oYW5jZWRSb3V0ZShyb3V0ZSxzdG9yZS5kaXNwYXRjaCl9XG5cdFx0XHRcdFx0XHQ8L1JvdXRlcj5cblx0XHRcdFx0XHQ8L1Byb3ZpZGVyPlxuXHRcdFx0XHQpLGNvbnRhaW5lcilcblx0XHR9XG5cdH1cbilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihRaWxpQXBwLHtET01BSU4sIEFDVElPTixSRURVQ0VSfSlcbiJdfQ==