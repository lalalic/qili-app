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

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require("redux-logger");

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('../style/index.less');
var Empty = _.UI.Empty;


var DOMAIN = "qiliConsole";

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
	_inherits(_QiliConsole, _Component);

	function _QiliConsole(props) {
		_classCallCheck(this, _QiliConsole);

		var _this = _possibleConstructorReturn(this, (_QiliConsole.__proto__ || Object.getPrototypeOf(_QiliConsole)).call(this, props));

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

	_createClass(_QiliConsole, [{
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
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			return {
				app: this.props.app
			};
		}
	}]);

	return _QiliConsole;
}(_react.Component), _class.childContextTypes = {
	app: _react2.default.PropTypes.object
}, _class.defaultProps = {
	initAppName: null
}, _class.contextTypes = {
	router: _react.PropTypes.object
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
), {}, Object.assign({}, REDUCER, _app3.REDUCER, _log.REDUCER), _reduxThunk2.default, (0, _reduxLogger2.default)());

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwidHlwZSIsInBheWxvYWQiLCJhcHAiLCJSRURVQ0VSIiwic3RhdGUiLCJRaWxpQ29uc29sZSIsInByb3BzIiwib24iLCJkaXNwYXRjaCIsInJvdXRlcyIsInBhcmFtcyIsInJvdXRlciIsIm5hbWUiLCJyZXBsYWNlIiwiaW5pdEFwcE5hbWUiLCJjaGlsZHJlbiIsImFwcElkIiwiaW5pdCIsInNlcnZpY2UiLCJjb250ZXh0dWFsIiwiZmluZCIsImEiLCJjaGlsZENvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRUeXBlcyIsIkN1cnJlbnRBcHAiLCJvcGVuIiwiZm9udFNpemUiLCJkaXNwbGF5IiwidW5kZWZpbmVkIiwiYXBwcyIsImFsbCIsImxlbiIsImxlbmd0aCIsImluZGV4IiwiZmluZEluZGV4IiwiX2lkIiwidGFyZ2V0IiwiY3VycmVudCIsIk1haW4iLCJyZW5kZXIiLCJXcmFwcGVkQ29tcG9uZW50IiwiX25hbWUiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFvR0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQXZIQUEsUUFBUSxxQkFBUjtJQVVPQyxLLFFBQUFBLEs7OztBQUVQLElBQU1DLFNBQU8sYUFBYjs7QUFFQSxJQUFNQyxTQUFPO0FBQ1pDLGNBQVksMEJBQUs7QUFDaEIsU0FBTyxFQUFDQyxhQUFVSCxNQUFWLGlCQUFELEVBQWdDSSxTQUFRLEVBQUNDLFFBQUQsRUFBeEMsRUFBUDtBQUNBO0FBSFcsQ0FBYjs7QUFNQSxJ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QUFBQSxJQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkI7QUFDSSw4REFBZSxTQUFPLE9BQUtnQyxLQUEzQixHQURKO0FBRUksc0RBQU8sTUFBSyxPQUFaO0FBRkosRUFkSDtBQW1CRztBQUFBO0FBQUEsSUFBTyxNQUFLLEtBQVosRUFBa0Isd0JBQWxCO0FBQ0ksOERBQWUsSUFBRyxLQUFsQixHQURKO0FBRUksc0RBQU8sTUFBSyxRQUFaO0FBRkosRUFuQkg7QUF3Qkg7QUFBQTtBQUFBLElBQU8sTUFBSyxJQUFaO0FBQ0MsMkRBQVksdUJBQVosRUFBNkIsWUFBWSxLQUF6QyxHQUREO0FBRUMsc0RBQU8sTUFBSyxTQUFaLEVBQXNCLDRCQUF0QixHQUZEO0FBR0Msc0RBQU8sTUFBSyxTQUFaLEVBQXNCLGdDQUF0QixFQUE0QyxZQUFZLEtBQXhEO0FBSEQ7QUF4QkcsQ0FEYSxFQWdDSixFQWhDSSxFQWlDaEJDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCM0MsT0FBakIsOEJBakNnQix3QkFtQ2hCLDRCQW5DZ0IsQ0FBWDs7QUF1Q1AiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCwgVUksIFBvc2l0aW9ufSBmcm9tICcuJ1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jb25zdCBET01BSU49XCJxaWxpQ29uc29sZVwiXG5cbmNvbnN0IEFDVElPTj17XG5cdEFQUF9DSEFOR0VEOmFwcD0+e1xuXHRcdHJldHVybiB7dHlwZTpgQEAke0RPTUFJTn0vQVBQX0NIQU5HRURgLHBheWxvYWQ6e2FwcH19XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj17XG5cdFtET01BSU5dOiAoc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgYEBAJHtET01BSU59L0FQUF9DSEFOR0VEYDpcblx0XHRcdHJldHVybiB7YXBwOnBheWxvYWQuYXBwfVxuXHRcdH1cblx0XHRyZXR1cm4gc3RhdGVcblx0fVxufVxuXG5jb25zdCBRaWxpQ29uc29sZT1jb25uZWN0KHN0YXRlPT4oe2FwcDpzdGF0ZVtET01BSU5dLmFwcH0pKShcbmNsYXNzIF9RaWxpQ29uc29sZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXHRcdEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLGFwcD0+e1xuXHRcdFx0Y29uc3Qge2Rpc3BhdGNoLHJvdXRlcyxwYXJhbXMscm91dGVyfT10aGlzLnByb3BzXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQVBQX0NIQU5HRUQoYXBwKSlcblx0XHRcdGlmKHJvdXRlc1sxXSAmJiByb3V0ZXNbMV0ubmFtZT09J2FwcCcgJiYgcGFyYW1zLm5hbWUhPWFwcC5uYW1lKVxuXHRcdFx0XHRyb3V0ZXIucmVwbGFjZShgL2FwcC8ke2FwcC5uYW1lfWApXG5cdFx0fSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2FwcCwgaW5pdEFwcE5hbWUsIGNoaWxkcmVufT10aGlzLnByb3BzXG5cdFx0bGV0IHByb3BzPXtcblx0XHRcdGFwcElkOiBcInFpbGlBZG1pblwiXG5cdFx0XHQsIGluaXQ6YT0+QXBwbGljYXRpb24uaW5pdChpbml0QXBwTmFtZSlcblx0XHRcdCwgc2VydmljZTpcImh0dHA6Ly9sb2NhbGhvc3Q6OTA4MC8xL1wiXG5cdFx0fVxuXHRcdGlmKCFhcHApe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0XHQ8RW1wdHkgaWNvbj17PExvZ28vPn0+XG5cdFx0XHRcdFx0XHQ8TGluayB0bz1cImFwcFwiPmNsaWNrIHRvIGNyZWF0ZSB5b3VyIGZpcnN0IHFpbGkgYXBwPC9MaW5rPlxuXHRcdFx0XHRcdDwvRW1wdHk+XG5cdFx0XHRcdDwvUWlsaUFwcD5cblx0XHRcdClcblx0XHR9XG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0PEN1cnJlbnRBcHAgbmFtZT17YXBwLm5hbWV9IGFwcD17YXBwfSBvcGVuPXshIWFwcCAmJiB0aGlzLmNvbnRleHR1YWwoKX0vPlxuXHRcdFx0XHR7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcbiAgICB9XG5cblx0Y29udGV4dHVhbCgpe1xuXHRcdGNvbnN0IHtyb3V0ZXN9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gISEhcm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpXG5cdH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdGFwcDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cblx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFwcDogdGhpcy5wcm9wcy5hcHBcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRpbml0QXBwTmFtZTpudWxsXG5cdH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59KVxuXG5jb25zdCBDdXJyZW50QXBwPSh7bmFtZSwgYXBwLCBvcGVufSk9Pihcblx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIiBtaW5pPXt0cnVlfVxuXHRcdHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwiLCBkaXNwbGF5Om9wZW4gPyB1bmRlZmluZWQgOiBcIm5vbmVcIiB9fVxuXHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdGxldCBhcHBzPUFwcGxpY2F0aW9uLmFsbCwgbGVuPWFwcHMubGVuZ3RoXG5cdFx0XHRpZihsZW4+MSl7XG5cdFx0XHRcdGxldCBpbmRleD1hcHBzLmZpbmRJbmRleChhPT5hLl9pZD09YXBwLl9pZClcblx0XHRcdFx0bGV0IHRhcmdldD1hcHBzWyhpbmRleCsxKSAlIGxlbl1cblxuXHRcdFx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PXRhcmdldFxuXHRcdFx0fVxuXHRcdH19PlxuXHRcdHtuYW1lfVxuXHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuKVxuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkJ1xuaW1wb3J0IEFwcFVJLCB7Q3JlYXRvciwgUkVEVUNFUiBhcyBhcHBVSVJlZHVjZXJ9IGZyb20gJy4vYXBwJ1xuaW1wb3J0IENsb3VkVUkgZnJvbSAnLi9jbG91ZCdcbmltcG9ydCBEYXRhVUkgZnJvbSAnLi9kYXRhJ1xuaW1wb3J0IExvZ1VJLCB7UkVEVUNFUiBhcyBsb2dVSVJlZHVjZXJ9IGZyb20gJy4vbG9nJ1xuaW1wb3J0IE15VUkgZnJvbSBcIi4vbXlcIlxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwiLi9zZXR0aW5nXCJcbmltcG9ydCBQcm9maWxlVUkgZnJvbSBcIi4vdXNlci1wcm9maWxlXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tICdyZWR1eC1sb2dnZXInXG5cbmV4cG9ydCBjb25zdCBNYWluPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e1FpbGlDb25zb2xlfT5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFwcC86bmFtZVwiIG5hbWU9XCJhcHBcIiBjb21wb25lbnQ9e0FwcFVJfVxuXHRcdFx0b25FbnRlcj17KHtwYXJhbXM6e25hbWV9fSk9Pntcblx0XHRcdFx0aWYoIUFwcGxpY2F0aW9uLmN1cnJlbnQpe1xuXHRcdFx0XHRcdFFpbGlDb25zb2xlLldyYXBwZWRDb21wb25lbnQuZGVmYXVsdFByb3BzLmluaXRBcHBOYW1lPW5hbWVcblx0XHRcdFx0fVxuXHRcdFx0fX1cblx0XHRcdC8+XG5cdFx0PFJvdXRlIHBhdGg9XCJhcHBcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtDcmVhdG9yfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjbG91ZFwiIGNvbXBvbmVudD17Q2xvdWRVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiIGNvbXBvbmVudD17RGF0YVVJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOm5hbWVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJsb2dcIiBjb21wb25lbnQ9e0xvZ1VJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiYWxsXCIvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bGV2ZWxcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e015VUl9IGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdDwvUm91dGU+XG5cblxuICAgIDwvUm91dGU+KSx7fVxuXHQsT2JqZWN0LmFzc2lnbih7fSxSRURVQ0VSLGFwcFVJUmVkdWNlcixsb2dVSVJlZHVjZXIpXG5cdCx0aHVua1xuXHQsY3JlYXRlTG9nZ2VyKClcbilcblxuXG4vKipcbkBUb2RvOlxuKkRvbmU6IGFmdGVyIGFkZGluZyBuZXcgYXBwbGljYXRpb25cbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgbG9jYWwgc3RvcmFnZSB3aXRob3V0IEFsbCBmaWVsZHMsIHN1Y2ggYXMgd2l0aG91dCBhcHBsaWNhdGlvbiBuYW1lLCAuLi4sIGJlY2F1c2Ugc2VydmVyIHJldHVybmVkIG9ubHkgX2lkLCBjcmVhdGVkQXQsIC4uLlxuKkRvbmU6IGFmdGVyIGFwcGxpY2F0aW9uIGRlbGV0aW9uLCBVSSBzaG91bGQgZ28gdG8gLyBldmVuIHdpdGggZXJyb3JcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XG4qRG9uJ3Q6IHVzZSA8TGluay8+IHJhdGhlciB0aGFuIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvXG4qKkRvbmU6IE5ldmVyIGVtcHR5IFVJXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcblxuKiB0b28gc21hbGwtem9vbSBzaXplIGluIG1vYmlsZSBicm93c2VyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXG4qIGJhY2tncm91bmQgdG8gdXBsb2FkIHRvIGJhY2tlbmRcbiAgICBkb25lOiBXZWJTUUxEYiBpcyBkb25lXG4gICAgKioqIHNxbGl0ZVxuICAgIGRvbmU6ICoqKiBhZnRlciByZW1vdmUgYXBwLCBsb2NhbCBjYWNoZSBzaG91bGQgYmUgcmVtb3ZlZCB0b29cbioqIHRleHRmaWVsZCBjYW4ndCBiZSBjaGFuZ2VkICh3aGljaD8/KVxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxuKiBzaW1wbGUgZGF0YSBtb2RlOlxuICAgICogcmVtb3RlIHVwc2VydCBhbmQgcmVtb3ZlIGRpcmVjdGx5XG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXG4qIENhbm5vdCByZWFkIHByb3BlcnR5ICdjb21wb25lbnREaWRFbnRlcicgb2YgdW5kZWZpbmVkXG4qRG9uZTogRGF0ZSBzaG93IGFzIG1lYW5pbmdmdWxcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxuKi9cbiJdfQ==