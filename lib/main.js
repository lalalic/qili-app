"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql, _graphql2, _graphql3, _graphql4;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require("react-router");

var _materialUi = require("material-ui");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _recompose2 = require("./tools/recompose");

var _logo = require("./icons/logo");

var _logo2 = _interopRequireDefault(_logo);

var _index = require("./index.js");

var qili = _interopRequireWildcard(_index);

var _commandBar = require("./components/command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _checkUpdate = require("./components/check-update");

var _checkUpdate2 = _interopRequireDefault(_checkUpdate);

var _home = require("material-ui/svg-icons/action/home");

var _home2 = _interopRequireDefault(_home);

var _dashboard = require("material-ui/svg-icons/action/dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

var _cloud = require("material-ui/svg-icons/file/cloud");

var _cloud2 = _interopRequireDefault(_cloud);

var _assignment = require("material-ui/svg-icons/action/assignment");

var _assignment2 = _interopRequireDefault(_assignment);

var _accountBox = require("material-ui/svg-icons/action/account-box");

var _accountBox2 = _interopRequireDefault(_accountBox);

var _insertLink = require("material-ui/svg-icons/editor/insert-link");

var _insertLink2 = _interopRequireDefault(_insertLink);

var _userProfile = require("./ui/user-profile");

var _userProfile2 = _interopRequireDefault(_userProfile);

var _dashboard3 = require("./ui/dashboard");

var _dashboard4 = _interopRequireDefault(_dashboard3);

var _my = require("./ui/my");

var _my2 = _interopRequireDefault(_my);

var _setting = require("./ui/setting");

var _setting2 = _interopRequireDefault(_setting);

var _app2 = require("./ui/app");

var _app3 = _interopRequireDefault(_app2);

var _comment = require("./components/comment");

var _comment2 = _interopRequireDefault(_comment);

var _cloud3 = require("./ui/cloud");

var _cloud4 = _interopRequireDefault(_cloud3);

var _schema = require("./ui/schema");

var _schema2 = _interopRequireDefault(_schema);

var _log = require("./ui/log");

var _log2 = _interopRequireDefault(_log);

var _offline = require("./tools/offline");

var _offline2 = _interopRequireDefault(_offline);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DOMAIN = qili.DOMAIN,
    REDUCER = qili.REDUCER,
    notSupportOffline = qili.notSupportOffline;
var ACTION = exports.ACTION = {
	CURRENT_APP: function CURRENT_APP(payload) {
		return {
			type: "@@" + DOMAIN + "/CURRENT_APP",
			payload: payload
		};
	}
};

var reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	state = REDUCER(state, { type: type, payload: payload });
	switch (type) {
		case "@@" + DOMAIN + "/CURRENT_APP":
			return _extends({}, state, { current: payload });
	}
	return state;
};

var QiliAdminOffline = function (_Offline) {
	_inherits(QiliAdminOffline, _Offline);

	function QiliAdminOffline() {
		_classCallCheck(this, QiliAdminOffline);

		return _possibleConstructorReturn(this, (QiliAdminOffline.__proto__ || Object.getPrototypeOf(QiliAdminOffline)).apply(this, arguments));
	}

	_createClass(QiliAdminOffline, [{
		key: "onSetUser",
		value: function onSetUser(_id, record, _ref2) {
			var _this2 = this;

			var app = _ref2.app,
			    apps = _ref2.apps;

			_get(QiliAdminOffline.prototype.__proto__ || Object.getPrototypeOf(QiliAdminOffline.prototype), "onSetUser", this).call(this, _id, record);
			if (app) {
				this.onSet(app, { author: _id, id: app });
			}

			if (apps) {
				apps.forEach(function (a) {
					return _this2.onSet(a, { author: _id, id: a });
				});
			}
		}
	}, {
		key: "onSetLog",
		value: function onSetLog() {}
	}]);

	return QiliAdminOffline;
}(_offline2.default);

var QiliAdmin = (0, _recompose.compose)((0, _recompose.withProps)(function () {
	return {
		project: require("../package.json"),
		appId: "qiliAdmin",
		reducers: _defineProperty({}, DOMAIN, reducer),
		supportOffline: new QiliAdminOffline("qiliAdmin", require("imports-loader?Cloud=../src/tools/offline/schema!../cloud").makeSchema(require("../schema.graphql"), {
			User: {
				apps: async function apps(parent, _ref3, _ref4) {
					var app = _ref4.app,
					    _id = _ref4.user._id;

					_objectDestructuringEmpty(_ref3);

					return await app.findEntity("apps", { author: _id });
				},
				app: async function app(_, _ref5, _ref6) {
					var _id = _ref5._id;
					var _app = _ref6.app,
					    user = _ref6.user;

					return await _app.get1Entity("apps", { _id: _id, author: user._id });
				}
			},

			App: {
				cloudCode: function cloudCode(_ref7) {
					var _cloudCode = _ref7.cloudCode;
					return _cloudCode || "/**Not support offline**/";
				},
				schema: function schema() {
					return "Not support offline";
				}
			}
		}))
	};
}), (0, _recompose2.withInit)({
	query: function query() {
		return require("./__generated__/main_prefetch_Query.graphql");
	},
	onSuccess: function onSuccess(response, dispatch) {
		var _response$me = response.me,
		    apps = _response$me.apps,
		    token = _response$me.token,
		    name = _response$me.name;

		dispatch(qili.ACTION.CURRENT_USER({ name: name, token: token }));
		if (apps && apps.length > 0) {
			dispatch(ACTION.CURRENT_APP(apps[0].id));
		}
	}
}))(qili.default);

var Current = (0, _recompose.compose)((0, _reactRedux.connect)(function (_ref8) {
	var current = _ref8.qili.current;
	return { id: current };
}), (0, _recompose.branch)(function (_ref9) {
	var id = _ref9.id;
	return !id;
}, _recompose.renderNothing), (0, _recompose.getContext)({ client: _propTypes2.default.object }), (0, _recompose.withProps)(function (_ref10) {
	var dispatch = _ref10.dispatch,
	    client = _ref10.client,
	    id = _ref10.id;
	return {
		name: client.get(id).name,
		switchApp: function switchApp() {
			var apps = client.getAll("App");
			var i = apps.findIndex(function (a) {
				return a.id == id;
			});
			dispatch(ACTION.CURRENT_APP(apps.length ? apps[(i + 1) % apps.length].id : null));
		}
	};
}))(function (_ref11) {
	var name = _ref11.name,
	    switchApp = _ref11.switchApp;
	return _react2.default.createElement(
		_materialUi.FloatingActionButton,
		{ className: "sticky top right", mini: true,
			style: { fontSize: "xx-small" },
			onClick: switchApp },
		name
	);
});

var withCurrent = function withCurrent() {
	return function (BaseComponent) {
		var factory = (0, _recompose.createEagerFactory)(BaseComponent);
		var WithCurrent = function WithCurrent(props) {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(Current, null),
				factory(props)
			);
		};
		return WithCurrent;
	};
};

var Navigator = function Navigator() {
	return _react2.default.createElement(_commandBar2.default, { className: "footbar",
		items: [{ link: "/", action: "dashboard", label: "Home", icon: _react2.default.createElement(_home2.default, null) }, { link: "/cloud", action: "cloud", label: "Cloud", icon: _react2.default.createElement(_cloud2.default, null) }, { link: "/log", action: "log", label: "Log", icon: _react2.default.createElement(_assignment2.default, null) }, { link: "/my", action: "my", label: "My", icon: _react2.default.createElement(
				_checkUpdate2.default,
				null,
				_react2.default.createElement(_accountBox2.default, null)
			) }]
	});
};

var withNavigator = function withNavigator() {
	return function (BaseComponent) {
		var factory = (0, _recompose.createEagerFactory)(BaseComponent);
		var WithNavigator = function WithNavigator(props) {
			return _react2.default.createElement(
				"div",
				null,
				factory(props),
				_react2.default.createElement(Navigator, null)
			);
		};
		return WithNavigator;
	};
};

var router = _react2.default.createElement(
	_reactRouter.Router,
	{ history: _reactRouter.hashHistory },
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "/", component: (0, _recompose.compose)((0, _reactRedux.connect)(function (state) {
				return { hasApp: !!state.qili.current };
			}), (0, _recompose.branch)(function (_ref12) {
				var hasApp = _ref12.hasApp;
				return !hasApp;
			}, (0, _recompose.renderComponent)((0, _recompose.compose)((0, _recompose.withProps)(function (_ref13) {
				var dispatch = _ref13.dispatch;
				return {
					toApp: function toApp(id) {
						return dispatch(ACTION.CURRENT_APP(id));
					}
				};
			}))(function (props) {
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						"center",
						{ style: { height: 50, color: "lightgray", margin: 20 } },
						"start from creating your first App!"
					),
					_react2.default.createElement(_app3.default.Creator, _extends({}, props, { style: { margin: "0px 100px" } }))
				);
			}))))(function (_ref14) {
				var children = _ref14.children;
				return _react2.default.createElement(
					"div",
					null,
					children
				);
			}) },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _recompose.compose)(withCurrent(), withNavigator(), notSupportOffline())(_dashboard4.default) }),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: "my" },
			_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _recompose.compose)(withNavigator(), (0, _recompose2.withQuery)({
					spread: false,
					query: function query() {
						return require("./__generated__/main_my_apps_Query.graphql");
					}
				}), (0, _recompose.withProps)(function (_ref15) {
					var me = _ref15.me;
					return { data: me };
				}), (0, _recompose.getContext)({ router: _propTypes2.default.object }), (0, _recompose.mapProps)(function (_ref16) {
					var router = _ref16.router,
					    others = _objectWithoutProperties(_ref16, ["router"]);

					return _extends({}, others, {
						toCreate: function toCreate() {
							return router.push("/app");
						},
						toApp: function toApp(a) {
							return router.push("/app/" + a.id);
						},
						toSetting: function toSetting() {
							return router.push('/my/setting');
						},
						toProfile: function toProfile() {
							return router.push('/my/profile');
						}
					});
				}))(_my2.default) }),
			_react2.default.createElement(_reactRouter.Route, { path: "setting", component: withNavigator()(_setting2.default) }),
			_react2.default.createElement(_reactRouter.Route, { path: "profile", component: (0, _recompose.compose)((0, _recompose2.withQuery)({
					query: function query() {
						return require("./__generated__/main_userProfile_me_Query.graphql");
					}
				}), (0, _recompose.withProps)(function (_ref17) {
					var me = _ref17.me;
					return _extends({}, me, {
						birthday: me && me.birthday ? new Date(me.birthday) : undefined
					});
				}))(_userProfile2.default) })
		),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: "app" },
			_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _recompose.compose)((0, _recompose.getContext)({ router: _propTypes2.default.object }), (0, _recompose.mapProps)(function (_ref18) {
					var router = _ref18.router,
					    others = _objectWithoutProperties(_ref18, ["router"]);

					return _extends({
						toApp: function toApp(id) {
							return router.replace("/app/" + id);
						}
					}, others);
				}))(_app3.default.Creator) }),
			_react2.default.createElement(_reactRouter.Route, { path: ":id", component: (0, _recompose.compose)((0, _recompose2.withQuery)(function (_ref19) {
					var id = _ref19.params.id;
					return {
						variables: {
							id: id
						},
						query: _graphql || (_graphql = function _graphql() {
							return require("./__generated__/main_app_update_Query.graphql");
						})
					};
				}), (0, _reactRedux.connect)(function (_ref20) {
					var current = _ref20.qili.current;
					return { current: current };
				}), (0, _recompose.getContext)({
					client: _propTypes2.default.object,
					router: _propTypes2.default.object
				}), (0, _recompose.withProps)(function (_ref21) {
					var me = _ref21.me,
					    client = _ref21.client,
					    current = _ref21.current,
					    dispatch = _ref21.dispatch,
					    router = _ref21.router,
					    id = _ref21.params.id;
					return {
						data: me.app,
						switchApp: function switchApp() {
							var apps = client.getAll("App");
							dispatch(ACTION.CURRENT_APP(apps.length ? apps[0].id : null));
						},

						client: undefined,
						current: undefined,
						toComment: function toComment() {
							return router.push("/comment/" + id);
						}
					};
				}))(_app3.default) })
		),
		_react2.default.createElement(_reactRouter.Route, { path: "comment/:id", component: (0, _recompose.compose)(withCurrent(), (0, _recompose2.withPagination)(function (_ref22) {
				var parent = _ref22.params.id;
				return {
					variables: { parent: parent },
					query: _graphql2 || (_graphql2 = function _graphql2() {
						return require("./__generated__/main_comment_Query.graphql");
					})
				};
			}), (0, _recompose2.withFragment)({ data: function data() {
					return require("./__generated__/main_appComments.graphql");
				} }), (0, _recompose.withProps)(function (_ref23) {
				var parent = _ref23.params.id;
				return {
					parent: parent,
					connection: "main_app_comments"
				};
			}))(_comment2.default) }),
		_react2.default.createElement(_reactRouter.Route, { path: "cloud", component: (0, _recompose.compose)(withCurrent(), (0, _reactRedux.connect)(function (_ref24) {
				var current = _ref24.qili.current;
				return {
					id: current
				};
			}), (0, _recompose2.withQuery)(function (_ref25) {
				var id = _ref25.id;
				return {
					variables: { id: id },
					query: _graphql3 || (_graphql3 = function _graphql3() {
						return require("./__generated__/main_cloud_Query.graphql");
					})
				};
			}), (0, _recompose.mapProps)(function (_ref26) {
				var data = _ref26.data,
				    others = _objectWithoutProperties(_ref26, ["data"]);

				return _extends({
					app: data.me.app
				}, others);
			}))(_cloud4.default) }),
		_react2.default.createElement(_reactRouter.Route, { path: "log", component: (0, _recompose.compose)(withCurrent(), withNavigator(), notSupportOffline(), (0, _reactRedux.connect)(function (_ref27) {
				var current = _ref27.qili.current;
				return {
					id: current
				};
			}), (0, _recompose2.withPagination)(function (_ref28) {
				var id = _ref28.id,
				    status = _ref28.status;
				return {
					variables: { id: id, status: status },
					query: _graphql4 || (_graphql4 = function _graphql4() {
						return require("./__generated__/main_log_Query.graphql");
					})
				};
			}), (0, _recompose.withProps)(function (_ref29) {
				var data = _ref29.data;
				return { logApp: data.me.app };
			}), (0, _recompose2.withFragment)({
				logApp: function logApp() {
					return require("./__generated__/main_logApp.graphql");
				}
			}), (0, _recompose.mapProps)(function (_ref30) {
				var logApp = _ref30.logApp,
				    data = _ref30.data,
				    relay = _ref30.relay;
				return {
					data: logApp.logs.edges.map(function (a) {
						return a.node;
					}),
					loadMore: function loadMore(ok) {
						if (relay.hasMore() && !relay.isLoading()) {
							relay.loadMore(10, function (e) {
								ok();
								if (e) {
									console.error(e);
								}
							});
						}
					}
				};
			}))(_log2.default) })
	)
);

qili.default.render(_react2.default.createElement(
	QiliAdmin,
	null,
	router
));