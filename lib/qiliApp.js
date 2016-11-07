"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QiliApp = exports.REDUCER = exports.ACTION = exports.currentUser = exports.DOMAIN = undefined;

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

var currentUser = exports.currentUser = function currentUser(state) {
	return state[DOMAIN].user;
};

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

var AccountContainer = (0, _reactRedux.connect)(function (state) {
	return state.account;
})(_account2.default);

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
			var _props2 = this.props,
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

				content = _react2.default.createElement(AccountContainer, null);
			} else if (!user.sessionToken) {
				content = _react2.default.createElement(AccountContainer, { user: user });
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

			var _ref4;

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

			var allReducers = _.enhancedCombineReducers.apply(undefined, [(_ref4 = {
				routing: routerRducer,
				entities: normalizeData
			}, (0, _defineProperty3.default)(_ref4, DOMAIN, REDUCER), (0, _defineProperty3.default)(_ref4, "account", _account2.default.REDUCER), _ref4)].concat((0, _toConsumableArray3.default)(reducers)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiY3VycmVudFVzZXIiLCJzdGF0ZSIsInVzZXIiLCJBQ1RJT04iLCJJTklUX0FQUCIsImVycm9yIiwidHV0b3JpYWxpemVkIiwidHlwZSIsInBheWxvYWQiLCJjdXJyZW50IiwiVVNFUl9DSEFOR0VEIiwiVFVUT1JJQUxJWkVEIiwiUkVEVUNFUiIsImluaXRlZCIsImluaXRlZEVycm9yIiwiQWNjb3VudENvbnRhaW5lciIsImFjY291bnQiLCJRaWxpQXBwIiwicHVyZSIsIndpdGhSZWYiLCJwcm9wcyIsInNlcnZpY2UiLCJhcHBJZCIsIkVycm9yIiwiaW5pdEFwcCIsImluaXQiLCJ0aXRsZSIsImRpc3BhdGNoIiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm9uIiwibWVzc2FnZSIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXNzaW9uVG9rZW4iLCJyZW5kZXJDb250ZW50Iiwib3ZlcmZsb3dZIiwiY2hpbGRyZW4iLCJyb3V0ZSIsIm1pZGRsZXdhcnMiLCJyZWR1Y2VycyIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaGVpZ2h0IiwiaGlzdG9yeSIsInJvdXRlclJkdWNlciIsImVuaGFuY2VkUm91dGUiLCJyb290Iiwib25FbnRlciIsIm9uQ2hhbmdlIiwiY2xvbmVFbGVtZW50IiwibmV4dFN0YXRlIiwiYmluZCIsIm5vcm1hbGl6ZURhdGEiLCJlbnRpdGllcyIsInJlZHVjZSIsIm1lcmdlZCIsImFsbCIsImEiLCJhbGxSZWR1Y2VycyIsInJvdXRpbmciLCJjb21wb3NlRW5oYW5jZXJzIiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwic3RvcmUiLCJxaWxpQXBwIiwidWkiLCJkZWZhdWx0UHJvcHMiLCJwcm9wc1R5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJhcnJheSIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFTLG9EQUFmOztBQUVPLElBQU1DLDBCQUFPLFNBQWI7O0FBRUEsSUFBTUMsb0NBQVksU0FBWkEsV0FBWTtBQUFBLFFBQU9DLE1BQU1GLE1BQU4sRUFBY0csSUFBckI7QUFBQSxDQUFsQjs7QUFFQSxJQUFNQywwQkFBTztBQUNuQkMsU0FEbUIsb0JBQ1ZDLEtBRFUsRUFDSkMsWUFESSxFQUNTO0FBQzNCLE1BQUcsQ0FBQyxDQUFDRCxLQUFMLEVBQVc7QUFDVixVQUFPO0FBQ05FLGlCQUFVUixNQUFWLGlCQURNO0FBRUxTLGFBQVEsRUFBQ04sTUFBSyxTQUFLTyxPQUFYLEVBQW1CSixZQUFuQjtBQUZILElBQVA7QUFJQSxHQUxELE1BS0s7QUFDSixVQUFPO0FBQ05FLGlCQUFVUixNQUFWLFlBRE07QUFFTFMsYUFBUSxFQUFDRiwwQkFBRDtBQUZILElBQVA7QUFJQTtBQUNELEVBYmtCO0FBY2xCSSxlQUFhO0FBQUEsU0FBTztBQUNkSCxnQkFBVVIsTUFBVixrQkFEYztBQUVuQlMsWUFBUU47QUFGVyxHQUFQO0FBQUEsRUFkSyxFQWlCaEJTLGNBQWM7QUFDVkosZUFB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QUFhQyxJQUFHLEVBQWhCLEVBQW9CWCxVQUFTLEVBQTdCLEVBQXpCLEVBQTJETyxpQkFBaUIsc0VBQXlCL0IsVUFBekIsRUFBakIsQ0FBM0QsQ0FBWjs7QUFFQSxVQUFPLHNCQUNMO0FBQUE7QUFBQSxNQUFVLE9BQU9pQyxLQUFqQjtBQUNDO0FBQUE7QUFBWWhFLFVBQVo7QUFDRStDLG1CQUFjakIsS0FBZCxFQUFvQmtDLE1BQU16RCxRQUExQjtBQURGO0FBREQsSUFESyxFQU1KMEIsU0FOSSxDQUFQO0FBT0E7QUFsTGtCO0FBQUE7QUFBQSw0QkFvRlprQyxZQXBGWSxHQW9GQztBQUNuQmxFLFVBQVEscUJBRFc7QUFFbkJJLEtBRm1CLGtCQUViLENBQUUsQ0FGVzs7QUFHbkJtQixXQUFTO0FBSFUsQ0FwRkQsU0EwRlo0QyxVQTFGWSxHQTBGRDtBQUNqQm5FLFVBQVMsZ0JBQU1vRSxTQUFOLENBQWdCQyxNQUFoQixDQUF1QkMsVUFEZjtBQUVqQnJFLFFBQU0sZ0JBQU1tRSxTQUFOLENBQWdCQyxNQUFoQixDQUF1QkMsVUFGWjtBQUdqQmxFLE9BQUssZ0JBQU1nRSxTQUFOLENBQWdCRyxJQUhKO0FBSWpCaEQsV0FBUyxnQkFBTTZDLFNBQU4sQ0FBZ0JJLEtBSlI7QUFLakJuRSxRQUFPLGdCQUFNK0QsU0FBTixDQUFnQkM7QUFMTixDQTFGQyxTQWtHWkksaUJBbEdZLEdBa0dNO0FBQ3hCaEcsV0FBUyxnQkFBTTJGLFNBQU4sQ0FBZ0JNLE1BQWhCLENBQXVCSixVQURSO0FBRXhCckQsY0FBYSxnQkFBTW1ELFNBQU4sQ0FBZ0JHLElBRkw7QUFHeEIzRCxVQUFTLGdCQUFNd0QsU0FBTixDQUFnQkc7QUFIRCxDQWxHTixTQUFkOztrQkFzTFEsc0JBQWMzRSxPQUFkLEVBQXNCLEVBQUNsQixjQUFELEVBQVNJLGNBQVQsRUFBZ0JTLGdCQUFoQixFQUF0QixDIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxuXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLGNvbXBvc2V9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gXCIuXCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG5jb25zdCBtdWlUaGVtZT1nZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSlcblxuZXhwb3J0IGNvbnN0IERPTUFJTj1cInFpbGlBcHBcIlxuXG5leHBvcnQgY29uc3QgY3VycmVudFVzZXI9c3RhdGU9PnN0YXRlW0RPTUFJTl0udXNlclxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsdHV0b3JpYWxpemVkKXtcblx0XHRpZighIWVycm9yKXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZEVycm9yYFxuXHRcdFx0XHQscGF5bG9hZDp7dXNlcjpVc2VyLmN1cnJlbnQsZXJyb3J9XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRgXG5cdFx0XHRcdCxwYXlsb2FkOnt0dXRvcmlhbGl6ZWR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdCxVU0VSX0NIQU5HRUQ6dXNlcj0+KHtcbiAgICAgICAgdHlwZTpgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYFxuXHRcdCxwYXlsb2FkOnVzZXJcblx0fSksVFVUT1JJQUxJWkVEOih7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGBcblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLHtcblx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHQsdXNlcjpVc2VyLmN1cnJlbnRcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcblx0XHR9KVxuXHRicmVha1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xuXHRcdFx0aW5pdGVkRXJyb3I6cGF5bG9hZC5lcnJvclxuXHRcdH0pXG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xuXHRcdFx0aW5pdGVkOiEhcGF5bG9hZFxuXHRcdFx0LHVzZXI6cGF5bG9hZFxuXHRcdH0pXG5cdGNhc2UgYEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3R1dG9yaWFsaXplZDp0cnVlfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY29uc3QgQWNjb3VudENvbnRhaW5lcj1jb25uZWN0KHN0YXRlPT5zdGF0ZS5hY2NvdW50KShBY2NvdW50KVxuXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFxuXHRjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0XHRzdXBlcihwcm9wcylcblxuXHRcdFx0c3VwcG9ydFRhcCgpXG5cblx0XHRcdGNvbnN0IHtzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuXG5cdFx0XHRpZighYXBwSWQpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxuXG5cdFx0XHRpZighc2VydmljZSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcblx0XHR9XG5cblx0XHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdFx0dmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRcdGlmKHRpdGxlKVxuXHRcdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxuXG5cdFx0XHRpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG5cdFx0XHRcdC50aGVuKCh0dXRvcmlhbGl6ZWQ9dHJ1ZSk9Pntcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChudWxsLCEhdHV0b3JpYWxpemVkKSlcblx0XHRcdFx0XHRcdFVzZXIub24oJ2NoYW5nZScsIHVzZXI9PmRpc3BhdGNoKEFDVElPTi5VU0VSX0NIQU5HRUQodXNlcikpKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXG5cdFx0fVxuXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0XHRsZXQgc2VsZj10aGlzXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRtdWlUaGVtZVxuXHRcdFx0XHQsc2hvd01lc3NhZ2UoKXtcblx0XHRcdFx0XHRzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0fVxuXHRcdFx0XHQsbG9hZGluZyhvcGVuKXtcblx0XHRcdFx0XHRzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNob3dNZXNzYWdlKCl7XG5cdFx0XHR0aGlzLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxuXHRcdH1cblxuXG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRjb25zdCB7aW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgdHV0b3JpYWxpemVkLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdFx0bGV0IGNvbnRlbnRcblxuXHRcdFx0aWYoIWluaXRlZCl7XG5cdFx0XHRcdGlmKGluaXRlZEVycm9yKVxuXHRcdFx0XHRcdGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxuXHRcdFx0fWVsc2UgaWYoIXVzZXIpe1xuXHRcdFx0XHRpZighdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG5cdFx0XHRcdFx0cmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz4pXG5cblx0XHRcdFx0Y29udGVudD0oPEFjY291bnRDb250YWluZXIgLz4pXG5cdFx0XHR9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuXHRcdFx0XHRjb250ZW50PSg8QWNjb3VudENvbnRhaW5lciB1c2VyPXt1c2VyfS8+KVxuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cblx0XHRcdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdFx0XHRcdDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG5cdFx0XHRcdFx0XHRcdDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpXG5cdFx0fVxuXG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0XHR9XG5cblxuXG5cdFx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0XHRzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuXHRcdFx0aW5pdCgpe30sXG5cdFx0XHR0dXRvcmlhbDpbXVxuXHRcdH1cblxuXHRcdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdGFwcElkOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHR0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0XHR0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0XHRtdWlUaGVtZTpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdFx0XHRzaG93TWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHRsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHRcdH1cblxuXHRcdHN0YXRpYyByZW5kZXIocm91dGUsIHJlZHVjZXJzPVtdLCAuLi5taWRkbGV3YXJzKXtcblx0XHRcdGNvbnN0IHByb3BzPXt9XG5cdFx0XHRsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuXHRcdFx0aWYoIWNvbnRhaW5lcil7XG5cdFx0XHRcdGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0XHRjb250YWluZXIuaWQ9J2FwcCdcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG5cdFx0XHR9XG5cdFx0XHRsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cdFx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG5cdFx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXG5cblx0XHRcdGlmKCFwcm9wcy5oaXN0b3J5KVxuXHRcdFx0XHRwcm9wcy5oaXN0b3J5PWhhc2hIaXN0b3J5XG5cblx0XHRcdGZ1bmN0aW9uIHJvdXRlclJkdWNlcihzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSl7XG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdFx0Y2FzZSAnQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFJzpcblx0XHRcdFx0cmV0dXJuIHBheWxvYWRcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RhdGVcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZW5oYW5jZWRSb3V0ZT0ocm9vdCxkaXNwYXRjaCk9Pntcblx0XHRcdFx0Y29uc3Qge29uRW50ZXIsIG9uQ2hhbmdlfT1yb290LnByb3BzXG5cdFx0XHRcdHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQocm9vdCwge1xuXHRcdFx0XHRcdG9uRW50ZXIobmV4dFN0YXRlKXtcblx0XHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0XHRvbkVudGVyICYmIG9uRW50ZXIuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbkNoYW5nZShzdGF0ZSxuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcblx0XHRcdFx0XHRcdG9uQ2hhbmdlICYmIG9uQ2hhbmdlLmJpbmQodGhpcykoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gbm9ybWFsaXplRGF0YShlbnRpdGllcz17fSx7dHlwZSxwYXlsb2FkfSl7XG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdFx0Y2FzZSAnTk9STUFMSVpFRF9EQVRBJzpcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0XHRcdHt9LFxuXHRcdFx0XHRcdFx0ZW50aXRpZXMsXG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhwYXlsb2FkKS5yZWR1Y2UoKG1lcmdlZCx0eXBlKT0+e1xuXHRcdFx0XHRcdFx0XHRpZih0eXBlb2YocGF5bG9hZFt0eXBlXVsnJHJlbW92ZSddKT09J3VuZGVmaW5lZCcpXG5cdFx0XHRcdFx0XHRcdFx0bWVyZ2VkW3R5cGVdPU9iamVjdC5hc3NpZ24oe30sZW50aXRpZXNbdHlwZV0scGF5bG9hZFt0eXBlXSlcblx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LHBheWxvYWRbdHlwZV1bJyRyZW1vdmUnXS5yZWR1Y2UoKGFsbCxhKT0+KGRlbGV0ZSBhbGxbYV0sYWxsKSxlbnRpdGllc1t0eXBlXSkpXG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG1lcmdlZFxuXHRcdFx0XHRcdFx0fSx7fSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGVudGl0aWVzXG5cdFx0XHR9XG5cblxuXHRcdFx0Y29uc3QgYWxsUmVkdWNlcnM9ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoe1xuXHRcdFx0XHRcdFx0cm91dGluZzpyb3V0ZXJSZHVjZXJcblx0XHRcdFx0XHRcdCxlbnRpdGllczpub3JtYWxpemVEYXRhXG5cdFx0XHRcdFx0XHQsW0RPTUFJTl06UkVEVUNFUlxuXHRcdFx0XHRcdFx0LGFjY291bnQ6QWNjb3VudC5SRURVQ0VSXG5cdFx0XHRcdFx0fSwgLi4ucmVkdWNlcnMpXG5cdFx0XHRjb25zdCBjb21wb3NlRW5oYW5jZXJzID0gd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyB8fCBjb21wb3NlO1xuXHRcdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e319LCBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSh0aHVuaywuLi5taWRkbGV3YXJzKSkpXG5cblx0XHRcdHJldHVybiByZW5kZXIoKFxuXHRcdFx0XHRcdDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuXHRcdFx0XHRcdFx0PFJvdXRlciB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdFx0XHR7ZW5oYW5jZWRSb3V0ZShyb3V0ZSxzdG9yZS5kaXNwYXRjaCl9XG5cdFx0XHRcdFx0XHQ8L1JvdXRlcj5cblx0XHRcdFx0XHQ8L1Byb3ZpZGVyPlxuXHRcdFx0XHQpLGNvbnRhaW5lcilcblx0XHR9XG5cdH1cbilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihRaWxpQXBwLHtET01BSU4sIEFDVElPTixSRURVQ0VSfSlcbiJdfQ==