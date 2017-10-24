"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ACTION = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql, _graphql2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

var _userProfile = require("./ui/user-profile");

var _userProfile2 = _interopRequireDefault(_userProfile);

var _dashboard = require("./ui/dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

var _my = require("./ui/my");

var _my2 = _interopRequireDefault(_my);

var _setting = require("./ui/setting");

var _setting2 = _interopRequireDefault(_setting);

var _app = require("./ui/app");

var _app2 = _interopRequireDefault(_app);

var _comment = require("./components/comment");

var _comment2 = _interopRequireDefault(_comment);

var _cloud = require("./ui/cloud");

var _cloud2 = _interopRequireDefault(_cloud);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('../style/index.less');
var DOMAIN = qili.DOMAIN,
    REDUCER = qili.REDUCER;
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

var QiliAdmin = (0, _recompose.compose)((0, _recompose.withProps)(function () {
	return {
		project: require("../package.json"),
		appId: "qiliAdmin",
		reducers: _defineProperty({}, DOMAIN, reducer)
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

var Current = (0, _recompose.compose)((0, _reactRedux.connect)(function (_ref2) {
	var current = _ref2.qili.current;
	return { id: current };
}), (0, _recompose.branch)(function (_ref3) {
	var id = _ref3.id;
	return !id;
}, _recompose.renderNothing), (0, _recompose.getContext)({ client: _react.PropTypes.object }), (0, _recompose.withProps)(function (_ref4) {
	var dispatch = _ref4.dispatch,
	    client = _ref4.client,
	    id = _ref4.id;
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
}))(function (_ref5) {
	var name = _ref5.name,
	    switchApp = _ref5.switchApp;
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

var router = _react2.default.createElement(
	_reactRouter.Router,
	{ history: _reactRouter.hashHistory },
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "/", component: (0, _recompose.compose)((0, _reactRedux.connect)(function (state) {
				return { hasApp: !!state.qili.current };
			}), (0, _recompose.branch)(function (_ref6) {
				var hasApp = _ref6.hasApp;
				return !hasApp;
			}, (0, _recompose.renderComponent)((0, _recompose.compose)((0, _recompose.withProps)(function (_ref7) {
				var dispatch = _ref7.dispatch;
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
					_react2.default.createElement(_app2.default.Creator, _extends({}, props, { style: { margin: "0px 100px" } }))
				);
			}))))(function (_ref8) {
				var children = _ref8.children;
				return _react2.default.createElement(
					"div",
					null,
					children
				);
			}) },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: withCurrent()(_dashboard2.default) }),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: "my" },
			_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _recompose.compose)((0, _recompose2.withQuery)({
					spread: false,
					query: function query() {
						return require("./__generated__/main_my_apps_Query.graphql");
					}
				}), (0, _recompose.withProps)(function (_ref9) {
					var me = _ref9.me;
					return { data: me };
				}), (0, _recompose.withContext)({ router: _react.PropTypes.object }), (0, _recompose.mapProps)(function (_ref10) {
					var router = _ref10.router,
					    others = _objectWithoutProperties(_ref10, ["router"]);

					return _extends({}, others, {
						toApp: function toApp(a) {
							return router.push("/app/" + a.id);
						},
						toSetting: function toSetting() {
							return router.push('/setting');
						},
						toProfile: function toProfile() {
							return router.push('/profile');
						}
					});
				}))(_my2.default) }),
			_react2.default.createElement(_reactRouter.Route, { path: "setting", component: _setting2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: "profile", component: (0, _recompose.compose)((0, _recompose2.withQuery)({
					query: function query() {
						return require("./__generated__/main_userProfile_me_Query.graphql");
					}
				}), (0, _recompose.withProps)(function (_ref11) {
					var me = _ref11.me;
					return _extends({}, me, {
						birthday: me && me.birthday ? new Date(me.birthday) : undefined
					});
				}))(_userProfile2.default) })
		),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: "app" },
			_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _recompose.compose)((0, _recompose.getContext)({ router: _react.PropTypes.object }), (0, _recompose.mapProps)(function (_ref12) {
					var router = _ref12.router,
					    others = _objectWithoutProperties(_ref12, ["router"]);

					return _extends({
						toApp: function toApp(id) {
							return router.replace("/app/" + id);
						}
					}, others);
				}))(_app2.default.Creator) }),
			_react2.default.createElement(_reactRouter.Route, { path: ":id", component: (0, _recompose.compose)((0, _recompose2.withQuery)(function (_ref13) {
					var id = _ref13.params.id;
					return {
						variables: {
							id: id
						},
						query: _graphql || (_graphql = function _graphql() {
							return require("./__generated__/main_app_update_Query.graphql");
						})
					};
				}), (0, _reactRedux.connect)(function (_ref14) {
					var current = _ref14.qili.current;
					return { current: current };
				}), (0, _recompose.getContext)({
					client: _react.PropTypes.object,
					router: _react.PropTypes.object
				}), (0, _recompose.withProps)(function (_ref15) {
					var me = _ref15.me,
					    client = _ref15.client,
					    current = _ref15.current,
					    dispatch = _ref15.dispatch,
					    router = _ref15.router,
					    id = _ref15.params.id;
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
				}))(_app2.default) })
		),
		_react2.default.createElement(_reactRouter.Route, { path: "comment/:id", component: (0, _recompose.compose)((0, _recompose2.withPagination)(function (_ref16) {
				var parent = _ref16.params.id;
				return {
					variables: { parent: parent },
					query: _graphql2 || (_graphql2 = function _graphql2() {
						return require("./__generated__/main_comment_Query.graphql");
					})
				};
			}), (0, _recompose2.withFragment)({ data: function data() {
					return require("./__generated__/main_appComments.graphql");
				} }), (0, _recompose.withProps)(function (_ref17) {
				var parent = _ref17.params.id;
				return {
					parent: parent,
					connection: "main_app_comments"
				};
			}), withCurrent())(_comment2.default) }),
		_react2.default.createElement(_reactRouter.Route, { path: "cloud", component: (0, _recompose.compose)((0, _recompose.getContext)({ client: _react.PropTypes.object }), (0, _reactRedux.connect)(function (_ref18, _ref19) {
				var current = _ref18.qili.current;
				var client = _ref19.client;
				return {
					id: current,
					cloudCode: client.get(current).cloudCode || "//your cloud code to extend server"
				};
			}), withCurrent())(_cloud2.default) })
	)
);

/**
			<Route path="data"
				component={connect(state=>({...state.ui.data,app:getCurrentApp(state)._id}))(DataUI)}>
				<IndexRedirect to={`${User._name}`}/>
				<Route path=":name"/>
			</Route>

			<Route path="log"
				component={connect(state=>state.ui.log)(LogUI)}>
				<IndexRedirect to="all"/>
				<Route path=":level"/>
			</Route>
* */

qili.default.render(_react2.default.createElement(
	QiliAdmin,
	null,
	router
));