"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QiliApp = exports.notSupportOffline = exports.REDUCER = exports.ACTION = exports.DOMAIN = exports.THEME = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require("react-dom");

var _lodash = require("lodash.merge");

var _lodash2 = _interopRequireDefault(_lodash);

var _reduxPersist = require("redux-persist");

var _recompose = require("recompose");

var _recompose2 = require("./tools/recompose");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _MuiThemeProvider = require("material-ui/styles/MuiThemeProvider");

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = require("material-ui/styles/getMuiTheme");

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _lightBaseTheme = require("material-ui/styles/baseThemes/lightBaseTheme");

var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

var _CircularProgress = require("material-ui/CircularProgress");

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _Snackbar = require("material-ui/Snackbar");

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _cloudOff = require("material-ui/svg-icons/file/cloud-off");

var _cloudOff2 = _interopRequireDefault(_cloudOff);

var _reactTapEventPlugin = require("react-tap-event-plugin");

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _date = require("./tools/date");

var date = _interopRequireWildcard(_date);

var _performance = require("./components/performance");

var _performance2 = _interopRequireDefault(_performance);

var _file = require("./components/file");

var _file2 = _interopRequireDefault(_file);

var _authentication = require("./components/authentication");

var _authentication2 = _interopRequireDefault(_authentication);

var _tutorial = require("./components/tutorial");

var _tutorial2 = _interopRequireDefault(_tutorial);

var _empty = require("./components/empty");

var _empty2 = _interopRequireDefault(_empty);

var _splashAd = require("./components/splash-ad");

var _splashAd2 = _interopRequireDefault(_splashAd);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var THEME = exports.THEME = (0, _getMuiTheme2.default)(_lightBaseTheme2.default, {
	footbar: {
		height: 50
	},
	page: {
		width: window.innerWidth > 960 ? 960 : window.innerWidth,
		height: window.innerHeight
	}
});

var DOMAIN = exports.DOMAIN = "qili";

var ACTION = exports.ACTION = {
	CHECK_VERSION: function CHECK_VERSION(homepage, currentVersion) {
		return function (dispatch) {
			fetch(homepage + "/app.apk.version").then(function (res) {
				return res.text();
			}).then(function (version) {
				return dispatch({ type: "@@" + DOMAIN + "/LASTEST_VERSION", payload: ver });
			}).catch(function (e) {
				return e;
			});
		};
	},
	CURRENT_USER: function CURRENT_USER(user) {
		return {
			type: "@@" + DOMAIN + "/USER_CHANGED",
			payload: user
		};
	},
	TUTORIALIZED: { type: "@@" + DOMAIN + "/TUTORIALIZED" },
	LOGOUT: { type: "@@" + DOMAIN + "/LOGOUT" },
	LOADING: function LOADING(payload) {
		return { type: "@@" + DOMAIN + "/LOADING", payload: payload };
	},
	MESSAGE: function MESSAGE(payload) {
		return {
			type: "@@" + DOMAIN + "/MESSAGE",
			payload: typeof payload == "string" ? { message: payload } : payload
		};
	},
	AD_DONE: { type: "@@" + DOMAIN + "/ADDONE" },
	READY: { type: "@@" + DOMAIN + "/INITED" },
	REPORT: function REPORT(report) {
		return { type: "@@" + DOMAIN + "/OPTICS", payload: report };
	},
	ONLINE: function ONLINE() {
		return { type: "@@" + DOMAIN + "/ONLINE" };
	},
	OFFLINE: function OFFLINE() {
		return { type: "@@" + DOMAIN + "/OFFLINE" };
	}
};

var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { networkStatus: "online" };
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/OPTICS":
			return _extends({}, state, { optics: _extends({ toJSON: function toJSON() {
						return undefined;
					} }, payload) });
		case "@@" + DOMAIN + "/INITED":
			return _extends({}, state, { inited: { toJSON: function toJSON() {
						return undefined;
					} } });
		case "@@" + DOMAIN + "/ADDONE":
			return _extends({}, state, { AD: { toJSON: function toJSON() {
						return undefined;
					} } });
		case "@@" + DOMAIN + "/USER_CHANGED":
			return _extends({}, state, { user: payload });
		case "@@" + DOMAIN + "/TUTORIALIZED":
			return _extends({}, state, { tutorialized: true });
		case "@@" + DOMAIN + "/LOGOUT":
			return _extends({}, state, { user: _extends({}, state.user, { token: undefined }) });
		case "@@" + DOMAIN + "/LASTEST_VERSION":
			return _extends({}, state, { latestVersion: payload });
		case "@@" + DOMAIN + "/LOADING":
			return _extends({}, state, { loading: !!payload });
		case "@@" + DOMAIN + "/MESSAGE":
			return _extends({}, state, { message: payload });
		case "@@" + DOMAIN + "/OFFLINE":
			return _extends({}, state, { networkStatus: "offline" });
		case "@@" + DOMAIN + "/ONLINE":
			return _extends({}, state, { networkStatus: "online" });
	}

	return state;
};

var UI = function UI(_ref2) {
	var muiTheme = _ref2.muiTheme,
	    _ref2$children = _ref2.children,
	    children = _ref2$children === undefined ? "hello Qili!" : _ref2$children;
	return _react2.default.createElement(
		_MuiThemeProvider2.default,
		{ muiTheme: muiTheme },
		_react2.default.createElement(
			"div",
			{ className: "withFootbar" },
			_react2.default.createElement(
				"div",
				{ id: "container", style: { overflowY: "scroll" } },
				children
			)
		)
	);
};

var Loading = (0, _reactRedux.connect)(function (state) {
	return { loading: !!state[DOMAIN].loading };
})(function (_ref3) {
	var loading = _ref3.loading;
	return _react2.default.createElement(
		"div",
		{ className: "sticky top right", style: { zIndex: 1000 } },
		_react2.default.createElement(_CircularProgress2.default, { style: { display: loading ? undefined : "none" } })
	);
});

var Message = (0, _reactRedux.connect)(function (state) {
	return _extends({ level: "info" }, state[DOMAIN].message);
})(function (_ref4) {
	var level = _ref4.level,
	    message = _ref4.message,
	    dispatch = _ref4.dispatch,
	    _ref4$duration = _ref4.duration,
	    duration = _ref4$duration === undefined ? level == "info" ? 1000 : 3000 : _ref4$duration;
	return _react2.default.createElement(_Snackbar2.default, {
		open: !!message,
		contentStyle: { color: level == "info" ? "white" : "red" },
		message: message || "",
		autoHideDuration: duration,
		onRequestClose: function onRequestClose(e) {
			return dispatch(ACTION.MESSAGE());
		}
	});
});

var notSupportOffline = function notSupportOffline() {
	var NoSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
		return _react2.default.createElement(
			_empty2.default,
			{ icon: _react2.default.createElement(_cloudOff2.default, null) },
			"Not Support Offline"
		);
	};
	return function (BaseComponent) {
		var NetworkSensitive = (0, _reactRedux.connect)(function (state) {
			return { offline: state[DOMAIN].networkStatus == "offline" };
		})(function (_ref5) {
			var offline = _ref5.offline,
			    props = _objectWithoutProperties(_ref5, ["offline"]);

			return offline ? _react2.default.createElement(NoSupport, null) : _react2.default.createElement(BaseComponent, props);
		});

		return NetworkSensitive;
	};
};

exports.notSupportOffline = notSupportOffline;

var QiliApp = exports.QiliApp = function (_Component) {
	_inherits(QiliApp, _Component);

	function QiliApp() {
		_classCallCheck(this, QiliApp);

		return _possibleConstructorReturn(this, (QiliApp.__proto__ || Object.getPrototypeOf(QiliApp)).apply(this, arguments));
	}

	_createClass(QiliApp, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    theme = _props.theme,
			    store = _props.store,
			    children = _props.children,
			    isDev = _props.isDev;

			return _react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(
					UI,
					{ muiTheme: theme },
					children,
					_react2.default.createElement(Loading, null),
					_react2.default.createElement(Message, null),
					isDev ? _react2.default.createElement(_performance2.default, null) : null
				)
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props2 = this.props,
			    title = _props2.title,
			    checkVersion = _props2.checkVersion;

			if (title) {
				document.title = title;
			}
			checkVersion();
		}
	}]);

	return QiliApp;
}(_react.Component);

QiliApp.displayName = "QiliApp";
QiliApp.propsTypes = {
	theme: _propTypes2.default.object.isRequired,
	store: _propTypes2.default.object.isRequired,
	checkVersion: _propTypes2.default.func.isRequired,
	title: _propTypes2.default.string
};
exports.default = (0, _recompose.compose)((0, _recompose.setPropTypes)({
	appId: _propTypes2.default.string.isRequired,
	service: _propTypes2.default.string,
	store: _propTypes2.default.object,
	theme: _propTypes2.default.object,
	offlineTheme: _propTypes2.default.object,
	tutorial: _propTypes2.default.arrayOf(_propTypes2.default.string),
	project: _propTypes2.default.object,
	isDev: _propTypes2.default.bool
}), (0, _recompose.setStatic)("render", function (app) {
	var container = document.getElementById('app');
	if (!container) {
		container = document.createElement('div');
		container.id = 'app';
		document.body.appendChild(container);
	}

	var style = document.createElement("style");
	document.getElementsByTagName("head")[0].appendChild(style);

	function size() {
		style.innerHTML = ".page{min-height:" + window.innerHeight + "px}";
		container.style.height = window.innerHeight + 'px';
		THEME.page.height = window.innerHeight;
	}

	size();
	(0, _reactTapEventPlugin2.default)();
	window.addEventListener("resize", size);

	return (0, _reactDom.render)(app, container);
}), (0, _recompose.defaultProps)({
	service: "http://qili2.com/1/graphql",
	theme: THEME
}), (0, _recompose.branch)(function (_ref6) {
	var appId = _ref6.appId;
	return !appId;
}, (0, _recompose.renderComponent)(function (_ref7) {
	var theme = _ref7.theme;
	return _react2.default.createElement(
		UI,
		{ muiTheme: theme },
		_react2.default.createElement(
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
						"\n\t\timport React from \"react\"\n\t\timport QiliApp from \"qili-app\"\n\t\tconst MyApp=()=>(\n\t\t\t<QiliApp appId=\"xxxx\">\n\t\t\t\thello qili!\n\t\t\t</QiliApp>\n\t\t)\n\t\tQiliApp.render(<MyApp/>)\n\t\t\t\t\t\t"
					)
				),
				_react2.default.createElement(
					"li",
					null,
					"Have fun"
				)
			)
		)
	);
})), (0, _recompose.withProps)(function (_ref8) {
	var store = _ref8.store,
	    reducers = _ref8.reducers,
	    appId = _ref8.appId,
	    project = _ref8.project,
	    isDev = _ref8.isDev;

	_file2.default.root = appId;
	if (!store) {
		var composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _recompose.compose;
		store = (0, _redux.createStore)((0, _redux.combineReducers)(_extends(_defineProperty({}, DOMAIN, REDUCER), reducers)), composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default), (0, _reduxPersist.autoRehydrate)()));

		(0, _reduxPersist.persistStore)(store, { keyPrefix: appId + ":" }, function () {
			store.dispatch(window.navigator.onLine === false ? ACTION.OFFLINE() : ACTION.ONLINE());
			store.dispatch(ACTION.READY);
		});

		var dispatch = store.dispatch.bind(store);

		var props = {
			store: store,
			checkVersion: function checkVersion() {
				project && dispatch(ACTION.CHECK_VERSION(project.homepage, project.version));
			},
			tutorialize: function tutorialize() {
				dispatch(ACTION.TUTORIALIZED);
			},
			setUser: function setUser(user) {
				dispatch(ACTION.CURRENT_USER(user));
			},
			loading: function loading(a) {
				dispatch(ACTION.LOADING(a));
			},
			showMessage: function showMessage(m) {
				dispatch(ACTION.MESSAGE(m));
			},
			doneAD: function doneAD() {
				dispatch(ACTION.AD_DONE);
			},
			optics: function optics(report) {
				if (isDev) dispatch(ACTION.REPORT(report));
			},
			network: function network(status) {
				switch (status) {
					case "online":
						dispatch(ACTION.ONLINE());
						break;
					case "offline":
						dispatch(ACTION.OFFLINE());
						break;
					default:
						return store.getState().qili.networkStatus;

				}
			}
		};

		window.addEventListener('online', function () {
			return props.network("online");
		});
		window.addEventListener('offline', function () {
			return props.network("offline");
		});

		return props;
	}
}), (0, _recompose.withContext)({
	is: _propTypes2.default.object,
	project: _propTypes2.default.object,
	loading: _propTypes2.default.func,
	showMessage: _propTypes2.default.func,
	theme: _propTypes2.default.object,
	optics: _propTypes2.default.func
}, function (_ref9) {
	var project = _ref9.project,
	    loading = _ref9.loading,
	    showMessage = _ref9.showMessage,
	    theme = _ref9.theme,
	    optics = _ref9.optics;
	return {
		is: {
			app: typeof cordova !== "undefined"
		},
		project: project,
		loading: loading,
		showMessage: showMessage,
		theme: theme,
		optics: optics
	};
}), (0, _reactRedux.connect)(function (_ref10) {
	var _ref10$qili = _ref10.qili,
	    inited = _ref10$qili.inited,
	    AD = _ref10$qili.AD,
	    tutorialized = _ref10$qili.tutorialized;

	var props = {};
	if (inited != undefined) props.inited = inited;
	if (AD != undefined) props.AD = AD;
	if (tutorialized != undefined) props.tutorialized = tutorialized;
	return props;
}), (0, _recompose.branch)(function (_ref11) {
	var tutorialized = _ref11.tutorialized,
	    _ref11$tutorial = _ref11.tutorial,
	    tutorial = _ref11$tutorial === undefined ? [] : _ref11$tutorial;
	return !tutorialized && tutorial.length;
}, (0, _recompose.renderComponent)(function (_ref12) {
	var tutorial = _ref12.tutorial,
	    tutorialize = _ref12.tutorialize,
	    theme = _ref12.theme,
	    store = _ref12.store;
	return _react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(
			UI,
			{ muiTheme: theme },
			_react2.default.createElement(_tutorial2.default, { slides: tutorial, onEnd: tutorialize })
		)
	);
})), (0, _recompose.branch)(function (_ref13) {
	var AD = _ref13.AD,
	    adUrl = _ref13.adUrl;
	return !AD && adUrl;
}, (0, _recompose.renderComponent)(function (_ref14) {
	var doneAD = _ref14.doneAD,
	    adUrl = _ref14.adUrl;
	return _react2.default.createElement(_splashAd2.default, { url: adUrl, onEnd: doneAD });
})), (0, _recompose.branch)(function (_ref15) {
	var inited = _ref15.inited;
	return !inited;
}, _recompose.renderNothing), (0, _reactRedux.connect)(function (_ref16) {
	var user = _ref16.qili.user;
	return user !== undefined ? { user: user } : {};
}), (0, _recompose2.withGraphqlClient)(), (0, _recompose.branch)(function (_ref17) {
	var user = _ref17.user;
	return !user || !user.token;
}, (0, _recompose.renderComponent)(function (_ref18) {
	var theme = _ref18.theme,
	    store = _ref18.store,
	    setUser = _ref18.setUser;
	return _react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(
			UI,
			{ muiTheme: theme },
			_react2.default.createElement(
				"div",
				{ style: { margin: 10 } },
				_react2.default.createElement(_authentication2.default, { onSuccess: setUser })
			),
			_react2.default.createElement(Loading, null),
			_react2.default.createElement(Message, null)
		)
	);
})), (0, _recompose.mapProps)(function (_ref19) {
	var title = _ref19.title,
	    theme = _ref19.theme,
	    checkVersion = _ref19.checkVersion,
	    store = _ref19.store,
	    children = _ref19.children,
	    isDev = _ref19.isDev;
	return { title: title, theme: theme, checkVersion: checkVersion, store: store, children: children, isDev: isDev };
}), _recompose.pure)(QiliApp);