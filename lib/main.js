"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Main = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _materialUi = require("material-ui");

var _ = require(".");

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

var _app3 = require("./app");

var _app4 = _interopRequireDefault(_app3);

var _logo = require("./icons/logo");

var _logo2 = _interopRequireDefault(_logo);

var _dashboard = require("./dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

var _cloud = require("./cloud");

var _cloud2 = _interopRequireDefault(_cloud);

var _data = require("./data");

var _data2 = _interopRequireDefault(_data);

var _log = require("./log");

var _log2 = _interopRequireDefault(_log);

var _my = require("./my");

var _my2 = _interopRequireDefault(_my);

var _setting = require("./setting");

var _setting2 = _interopRequireDefault(_setting);

var _userProfile = require("./user-profile");

var _userProfile2 = _interopRequireDefault(_userProfile);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('../style/index.less');
var Empty = _.UI.Empty;


var DOMAIN = "main";

var ACTION = {
	APP_CHANGED: function APP_CHANGED(app) {
		return { type: "@@" + DOMAIN + "/APP_CHANGED", payload: { app: app } };
	}
};

var REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/APP_CHANGED":
			return { app: payload.app };
	}
	return state;
});

var QiliConsole = (0, _reactRedux.connect)(function (state) {
	return { app: state[DOMAIN].app };
})((_temp = _class = function (_Component) {
	_inherits(_class, _Component);

	function _class(props) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		_app2.default.on('change', function (app) {
			var _this$props = _this.props,
			    dispatch = _this$props.dispatch,
			    routes = _this$props.routes,
			    params = _this$props.params,
			    router = _this$props.router;

			dispatch(ACTION.APP_CHANGED(app));
			if (routes[1] && routes[1].name == 'app' && params.name != app.name) router.replace("/app/" + app.name);
		});
		return _this;
	}

	_createClass(_class, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    app = _props.app,
			    initAppName = _props.initAppName,
			    children = _props.children;

			var props = {
				appId: "qiliAdmin",
				init: function init(a) {
					return _app2.default.init(initAppName);
				},
				service: "http://localhost:9080/1/"
			};
			if (!app) {
				return _react2.default.createElement(
					_.QiliApp,
					props,
					_react2.default.createElement(
						Empty,
						{ icon: _react2.default.createElement(_logo2.default, null) },
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: "app" },
							"click to create your first qili app"
						)
					)
				);
			}

			return _react2.default.createElement(
				_.QiliApp,
				props,
				_react2.default.createElement(CurrentApp, { name: app.name, app: app, open: !!app && this.contextual() }),
				children
			);
		}
	}, {
		key: "contextual",
		value: function contextual() {
			var routes = this.props.routes;

			return !!!routes.find(function (a) {
				return a.contextual === false;
			});
		}
	}]);

	return _class;
}(_react.Component), _class.defaultProps = {
	initAppName: null
}, _temp));

var CurrentApp = function CurrentApp(_ref2) {
	var name = _ref2.name,
	    app = _ref2.app,
	    open = _ref2.open;
	return _react2.default.createElement(
		_materialUi.FloatingActionButton,
		{ className: "sticky top right", mini: true,
			style: { fontSize: "xx-small", display: open ? undefined : "none" },
			onClick: function onClick(e) {
				var apps = _app2.default.all,
				    len = apps.length;
				if (len > 1) {
					var index = apps.findIndex(function (a) {
						return a._id == app._id;
					});
					var target = apps[(index + 1) % len];

					_app2.default.current = target;
				}
			} },
		name
	);
};

var Main = exports.Main = _.QiliApp.render(_react2.default.createElement(
	_reactRouter.Route,
	{ path: "/", component: QiliConsole },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: "app/:name", name: "app", component: _app4.default,
		onEnter: function onEnter(_ref3) {
			var name = _ref3.params.name;

			if (!_app2.default.current) {
				QiliConsole.WrappedComponent.defaultProps.initAppName = name;
			}
		}
	}),
	_react2.default.createElement(_reactRouter.Route, { path: "app", contextual: false, component: _app3.Creator }),
	_react2.default.createElement(_reactRouter.Route, { path: "cloud", component: _cloud2.default }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "data", component: _data2.default },
		_react2.default.createElement(_reactRouter.IndexRedirect, { to: "" + _.User._name }),
		_react2.default.createElement(_reactRouter.Route, { path: ":name" })
	),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "log", component: _log2.default },
		_react2.default.createElement(_reactRouter.IndexRedirect, { to: "all" }),
		_react2.default.createElement(_reactRouter.Route, { path: ":level" })
	),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "my" },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _my2.default, contextual: false }),
		_react2.default.createElement(_reactRouter.Route, { path: "setting", component: _setting2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: "profile", component: _userProfile2.default, contextual: false })
	)
), Object.assign({}, REDUCER, _app4.default.REDUCER, _log2.default.REDUCER, _cloud2.default.REDUCER, _userProfile2.default.REDUCER, _data2.default.REDUCER));

/**
@Todo:
*Done: after adding new application
    application list doesn't reflect the change
    local storage without All fields, such as without application name, ..., because server returned only _id, createdAt, ...
*Done: after application deletion, UI should go to / even with error
*Done: error happens, UI should not be Empty
*Don't: use <Link/> rather than this.context.router.transitionTo
**Done: Never empty UI
**Done: FloatActionButton position when view width is 960

* too small-zoom size in mobile browser
* first focus on form, cloud UI
* background to upload to backend
    done: WebSQLDb is done
    *** sqlite
    done: *** after remove app, local cache should be removed too
** textfield can't be changed (which??)
*Done: login error, placeholder and value show together
* simple data mode:
    * remote upsert and remove directly
    * local cache for search
* Cannot read property 'componentDidEnter' of undefined
*Done: Date show as meaningful
* data list to show object field [object]=>{...}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwidHlwZSIsInBheWxvYWQiLCJhcHAiLCJSRURVQ0VSIiwic3RhdGUiLCJRaWxpQ29uc29sZSIsInByb3BzIiwib24iLCJkaXNwYXRjaCIsInJvdXRlcyIsInBhcmFtcyIsInJvdXRlciIsIm5hbWUiLCJyZXBsYWNlIiwiaW5pdEFwcE5hbWUiLCJjaGlsZHJlbiIsImFwcElkIiwiaW5pdCIsInNlcnZpY2UiLCJjb250ZXh0dWFsIiwiZmluZCIsImEiLCJkZWZhdWx0UHJvcHMiLCJDdXJyZW50QXBwIiwib3BlbiIsImZvbnRTaXplIiwiZGlzcGxheSIsInVuZGVmaW5lZCIsImFwcHMiLCJhbGwiLCJsZW4iLCJsZW5ndGgiLCJpbmRleCIsImZpbmRJbmRleCIsIl9pZCIsInRhcmdldCIsImN1cnJlbnQiLCJNYWluIiwicmVuZGVyIiwiV3JhcHBlZENvbXBvbmVudCIsIl9uYW1lIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBc0ZBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQXZHQUEsUUFBUSxxQkFBUjtJQVVPQyxLLFFBQUFBLEs7OztBQUVQLElBQU1DLFNBQU8sTUFBYjs7QUFFQSxJQUFNQyxTQUFPO0FBQ1pDLGNBQVksMEJBQUs7QUFDaEIsU0FBTyxFQUFDQyxhQUFVSCxNQUFWLGlCQUFELEVBQWdDSSxTQUFRLEVBQUNDLFFBQUQsRUFBeEMsRUFBUDtBQUNBO0FBSFcsQ0FBYjs7QUFNQSxJQUFNQyw4QkFDSk4sTUFESSxFQUNLLFlBQTJCO0FBQUEsS0FBMUJPLEtBQTBCLHVFQUFwQixFQUFvQjtBQUFBO0FBQUEsS0FB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QUREO0FBRUMsc0RBQU8sTUFBSyxTQUFaLEVBQXNCLDRCQUF0QixHQUZEO0FBR0Msc0RBQU8sTUFBSyxTQUFaLEVBQXNCLGdDQUF0QixFQUE0QyxZQUFZLEtBQXhEO0FBSEQ7QUF4QkcsQ0FEYSxFQWlDaEJDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCdkMsT0FBakIsRUFBeUIsY0FBTUEsT0FBL0IsRUFBdUMsY0FBTUEsT0FBN0MsRUFBcUQsZ0JBQVFBLE9BQTdELEVBQXFFLHNCQUFVQSxPQUEvRSxFQUF1RixlQUFPQSxPQUE5RixDQWpDZ0IsQ0FBWDs7QUFxQ1AiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCwgVUksIFBvc2l0aW9ufSBmcm9tICcuJ1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jb25zdCBET01BSU49XCJtYWluXCJcblxuY29uc3QgQUNUSU9OPXtcblx0QVBQX0NIQU5HRUQ6YXBwPT57XG5cdFx0cmV0dXJuIHt0eXBlOmBAQCR7RE9NQUlOfS9BUFBfQ0hBTkdFRGAscGF5bG9hZDp7YXBwfX1cblx0fVxufVxuXG5jb25zdCBSRURVQ0VSPXtcblx0W0RPTUFJTl06IChzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vQVBQX0NIQU5HRURgOlxuXHRcdFx0cmV0dXJuIHthcHA6cGF5bG9hZC5hcHB9XG5cdFx0fVxuXHRcdHJldHVybiBzdGF0ZVxuXHR9XG59XG5cbmNvbnN0IFFpbGlDb25zb2xlPWNvbm5lY3Qoc3RhdGU9Pih7YXBwOnN0YXRlW0RPTUFJTl0uYXBwfSkpKFxuY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblx0XHRBcHBsaWNhdGlvbi5vbignY2hhbmdlJyxhcHA9Pntcblx0XHRcdGNvbnN0IHtkaXNwYXRjaCxyb3V0ZXMscGFyYW1zLHJvdXRlcn09dGhpcy5wcm9wc1xuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkFQUF9DSEFOR0VEKGFwcCkpXG5cdFx0XHRpZihyb3V0ZXNbMV0gJiYgcm91dGVzWzFdLm5hbWU9PSdhcHAnICYmIHBhcmFtcy5uYW1lIT1hcHAubmFtZSlcblx0XHRcdFx0cm91dGVyLnJlcGxhY2UoYC9hcHAvJHthcHAubmFtZX1gKVxuXHRcdH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHthcHAsIGluaXRBcHBOYW1lLCBjaGlsZHJlbn09dGhpcy5wcm9wc1xuXHRcdGxldCBwcm9wcz17XG5cdFx0XHRhcHBJZDogXCJxaWxpQWRtaW5cIlxuXHRcdFx0LCBpbml0OmE9PkFwcGxpY2F0aW9uLmluaXQoaW5pdEFwcE5hbWUpXG5cdFx0XHQsIHNlcnZpY2U6XCJodHRwOi8vbG9jYWxob3N0OjkwODAvMS9cIlxuXHRcdH1cblx0XHRpZighYXBwKXtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxRaWxpQXBwIHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0PEVtcHR5IGljb249ezxMb2dvLz59PlxuXHRcdFx0XHRcdFx0PExpbmsgdG89XCJhcHBcIj5jbGljayB0byBjcmVhdGUgeW91ciBmaXJzdCBxaWxpIGFwcDwvTGluaz5cblx0XHRcdFx0XHQ8L0VtcHR5PlxuXHRcdFx0XHQ8L1FpbGlBcHA+XG5cdFx0XHQpXG5cdFx0fVxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxRaWxpQXBwIHsuLi5wcm9wc30+XG5cdFx0XHRcdDxDdXJyZW50QXBwIG5hbWU9e2FwcC5uYW1lfSBhcHA9e2FwcH0gb3Blbj17ISFhcHAgJiYgdGhpcy5jb250ZXh0dWFsKCl9Lz5cblx0XHRcdFx0e2NoaWxkcmVufVxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG4gICAgfVxuXG5cdGNvbnRleHR1YWwoKXtcblx0XHRjb25zdCB7cm91dGVzfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuICEhIXJvdXRlcy5maW5kKGE9PmEuY29udGV4dHVhbD09PWZhbHNlKVxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aW5pdEFwcE5hbWU6bnVsbFxuXHR9XG59KVxuXG5jb25zdCBDdXJyZW50QXBwPSh7bmFtZSwgYXBwLCBvcGVufSk9Pihcblx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIiBtaW5pPXt0cnVlfVxuXHRcdHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwiLCBkaXNwbGF5Om9wZW4gPyB1bmRlZmluZWQgOiBcIm5vbmVcIiB9fVxuXHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdGxldCBhcHBzPUFwcGxpY2F0aW9uLmFsbCwgbGVuPWFwcHMubGVuZ3RoXG5cdFx0XHRpZihsZW4+MSl7XG5cdFx0XHRcdGxldCBpbmRleD1hcHBzLmZpbmRJbmRleChhPT5hLl9pZD09YXBwLl9pZClcblx0XHRcdFx0bGV0IHRhcmdldD1hcHBzWyhpbmRleCsxKSAlIGxlbl1cblxuXHRcdFx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PXRhcmdldFxuXHRcdFx0fVxuXHRcdH19PlxuXHRcdHtuYW1lfVxuXHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuKVxuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkJ1xuaW1wb3J0IEFwcFVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9hcHAnXG5pbXBvcnQgQ2xvdWRVSSBmcm9tICcuL2Nsb3VkJ1xuaW1wb3J0IERhdGFVSSBmcm9tICcuL2RhdGEnXG5pbXBvcnQgTG9nVUkgZnJvbSAnLi9sb2cnXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gXCIuL3NldHRpbmdcIlxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwiLi91c2VyLXByb2ZpbGVcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmV4cG9ydCBjb25zdCBNYWluPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e1FpbGlDb25zb2xlfT5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFwcC86bmFtZVwiIG5hbWU9XCJhcHBcIiBjb21wb25lbnQ9e0FwcFVJfVxuXHRcdFx0b25FbnRlcj17KHtwYXJhbXM6e25hbWV9fSk9Pntcblx0XHRcdFx0aWYoIUFwcGxpY2F0aW9uLmN1cnJlbnQpe1xuXHRcdFx0XHRcdFFpbGlDb25zb2xlLldyYXBwZWRDb21wb25lbnQuZGVmYXVsdFByb3BzLmluaXRBcHBOYW1lPW5hbWVcblx0XHRcdFx0fVxuXHRcdFx0fX1cblx0XHRcdC8+XG5cdFx0PFJvdXRlIHBhdGg9XCJhcHBcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtDcmVhdG9yfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjbG91ZFwiIGNvbXBvbmVudD17Q2xvdWRVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiIGNvbXBvbmVudD17RGF0YVVJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOm5hbWVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJsb2dcIiBjb21wb25lbnQ9e0xvZ1VJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiYWxsXCIvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bGV2ZWxcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e015VUl9IGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdDwvUm91dGU+XG5cblxuICAgIDwvUm91dGU+KVxuXHQsT2JqZWN0LmFzc2lnbih7fSxSRURVQ0VSLEFwcFVJLlJFRFVDRVIsTG9nVUkuUkVEVUNFUixDbG91ZFVJLlJFRFVDRVIsUHJvZmlsZVVJLlJFRFVDRVIsRGF0YVVJLlJFRFVDRVIpXG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=