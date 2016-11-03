"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Main = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _materialUi = require("material-ui");

var _normalizr = require("normalizr");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');
var Empty = _.UI.Empty;


var DOMAIN = "qiliAdmin";

var ACTION = {
	APP_CHANGED: function APP_CHANGED(app) {
		return { type: "@@" + DOMAIN + "/APP_CHANGED", payload: { app: app } };
	},
	APPS_FETCHED: function APPS_FETCHED(apps) {
		return function (dispatch) {
			dispatch({ type: 'NORMALIZED_DATA', payload: (0, _normalizr.normalize)(apps, (0, _normalizr.arrayOf)(_app2.default.Schema)).entities });
		};
	},
	SWITCH_APPLICATION: function SWITCH_APPLICATION(app) {
		return function (dispatch, getState) {
			var apps = getState().entities[_app2.default._name];
			var ids = Object.keys(apps);
			var index = ids[(ids.indexOf(app) + 1) % ids.length];
			_app2.default.current = apps[index];
		};
	}
};

var REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type;
	var payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/APP_CHANGED":
			return { app: payload.app._id };
	}
	return state;
};

var QiliConsole = function (_Component) {
	_inherits(QiliConsole, _Component);

	function QiliConsole(props) {
		_classCallCheck(this, QiliConsole);

		var _this = _possibleConstructorReturn(this, (QiliConsole.__proto__ || Object.getPrototypeOf(QiliConsole)).call(this, props));

		_app2.default.on('change', function (app) {
			var _this$props = _this.props;
			var dispatch = _this$props.dispatch;
			var routes = _this$props.routes;
			var params = _this$props.params;
			var router = _this.context.router;

			dispatch(ACTION.APP_CHANGED(app));
			if (routes[1] && routes[1].name == 'app' && params.name != app.name) router.push("/app/" + app.name);
		});
		return _this;
	}

	_createClass(QiliConsole, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var app = _props.app;
			var initAppName = _props.initAppName;
			var children = _props.children;
			var dispatch = _props.dispatch;
			var routes = _props.routes;

			var props = {
				appId: "qiliAdmin",
				init: function init(a) {
					return _app2.default.init(initAppName).then(function (apps) {
						return dispatch(ACTION.APPS_FETCHED(apps));
					});
				}
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

			var quickSwitchStyle = { fontSize: "xx-small" };
			if (routes.find(function (a) {
				return a.contextual === false;
			})) quickSwitchStyle.display = "none";

			return _react2.default.createElement(
				_.QiliApp,
				props,
				_react2.default.createElement(
					_materialUi.FloatingActionButton,
					{ className: "sticky top right", mini: true,
						style: quickSwitchStyle,
						onClick: function onClick(e) {
							return dispatch(ACTION.SWITCH_APPLICATION(app._id));
						} },
					app.name
				),
				children
			);
		}
	}]);

	return QiliConsole;
}(_react.Component);

QiliConsole.defaultProps = {
	initAppName: null
};
QiliConsole.contextTypes = {
	router: _react.PropTypes.object
};
var Main = exports.Main = _.QiliApp.render(_react2.default.createElement(
	_reactRouter.Route,
	{ path: "/",
		component: (0, _reactRedux.connect)(function (state) {
			return { app: (0, _.compact)(_app2.default.current, "_id", "name") };
		})(QiliConsole) },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: "app/:name", name: "app",
		component: (0, _reactRedux.connect)(function (state, _ref2) {
			var name = _ref2.params.name;
			return _extends({ app: (0, _.compact)(_app2.default.current, "name", "uname", "apiKey"), name: name }, state.ui.app);
		})(_app4.default),
		onEnter: function onEnter(_ref3) {
			var name = _ref3.params.name;
			return QiliConsole.defaultProps.initAppName = name;
		}
	}),
	_react2.default.createElement(_reactRouter.Route, { path: "app", contextual: false,
		component: (0, _reactRedux.connect)(function (state) {
			return state.ui.app;
		})(_app3.Creator) }),
	_react2.default.createElement(_reactRouter.Route, { path: "cloud", component: (0, _reactRedux.connect)(function (state) {
			return { cloudCode: state[DOMAIN].app.cloudCode };
		})(_cloud2.default) }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "data",
			component: (0, _reactRedux.connect)(function (state) {
				return _extends({}, state.ui.data, { app: state[DOMAIN].app._id });
			})(_data2.default) },
		_react2.default.createElement(_reactRouter.IndexRedirect, { to: "" + _.User._name }),
		_react2.default.createElement(_reactRouter.Route, { path: ":name" })
	),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "log",
			component: (0, _reactRedux.connect)(function (state) {
				return state.ui.log;
			})(_log2.default) },
		_react2.default.createElement(_reactRouter.IndexRedirect, { to: "all" }),
		_react2.default.createElement(_reactRouter.Route, { path: ":level" })
	),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "my" },
		_react2.default.createElement(_reactRouter.IndexRoute, {
			component: (0, _reactRedux.connect)(function (state) {
				return { apps: Object.values(state.entities[_app2.default._name]) };
			})(_my2.default),
			contextual: false }),
		_react2.default.createElement(_reactRouter.Route, { path: "setting", component: _setting2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: "profile",
			component: (0, _reactRedux.connect)(function (state) {
				return { user: state.qiliApp.user };
			})(_userProfile2.default),
			contextual: false })
	)
), [_defineProperty({}, DOMAIN, REDUCER), {
	ui: (0, _.enhancedCombineReducers)({ app: _app4.default.REDUCER }, { log: _log2.default.REDUCER }, { cloud: _cloud2.default.REDUCER }, { data: _data2.default.REDUCER })
}]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwidHlwZSIsInBheWxvYWQiLCJhcHAiLCJBUFBTX0ZFVENIRUQiLCJkaXNwYXRjaCIsImFwcHMiLCJTY2hlbWEiLCJlbnRpdGllcyIsIlNXSVRDSF9BUFBMSUNBVElPTiIsImdldFN0YXRlIiwiX25hbWUiLCJpZHMiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXgiLCJpbmRleE9mIiwibGVuZ3RoIiwiY3VycmVudCIsIlJFRFVDRVIiLCJzdGF0ZSIsIl9pZCIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJvbiIsInJvdXRlcyIsInBhcmFtcyIsInJvdXRlciIsImNvbnRleHQiLCJuYW1lIiwicHVzaCIsImluaXRBcHBOYW1lIiwiY2hpbGRyZW4iLCJhcHBJZCIsImluaXQiLCJ0aGVuIiwicXVpY2tTd2l0Y2hTdHlsZSIsImZvbnRTaXplIiwiZmluZCIsImEiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIk1haW4iLCJyZW5kZXIiLCJ1aSIsImNsb3VkQ29kZSIsImRhdGEiLCJsb2ciLCJ2YWx1ZXMiLCJ1c2VyIiwicWlsaUFwcCIsImNsb3VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBZ0ZBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQWxHQUEsUUFBUSxxQkFBUjtJQVdPQyxLLFFBQUFBLEs7OztBQUVQLElBQU1DLFNBQU8sV0FBYjs7QUFFQSxJQUFNQyxTQUFPO0FBQ1pDLGNBQVk7QUFBQSxTQUFNLEVBQUNDLGFBQVVILE1BQVYsaUJBQUQsRUFBZ0NJLFNBQVEsRUFBQ0MsUUFB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TixDQUFjRCxJQUFwQixFQUFSO0FBQUEsSUFBUix3QkFEWjtBQUVDLGVBQVksS0FGYjtBQU5EO0FBMUJHLENBRGEsRUF3Q2hCLHFCQUFLdEQsTUFBTCxFQUFhcUIsT0FBYixHQUNDO0FBQ0E0QixLQUFHLCtCQUNGLEVBQUM1QyxLQUFJLGNBQU1nQixPQUFYLEVBREUsRUFFRCxFQUFDK0IsS0FBSSxjQUFNL0IsT0FBWCxFQUZDLEVBR0QsRUFBQ21DLE9BQU0sZ0JBQVFuQyxPQUFmLEVBSEMsRUFJRCxFQUFDOEIsTUFBSyxlQUFPOUIsT0FBYixFQUpDO0FBREgsQ0FERCxDQXhDZ0IsQ0FBWDs7QUFvRFAiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7bm9ybWFsaXplLGFycmF5T2Z9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLCBVSSwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMsIGNvbXBhY3R9IGZyb20gJy4nXG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9kYi9hcHAnXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmNvbnN0IERPTUFJTj1cInFpbGlBZG1pblwiXG5cbmNvbnN0IEFDVElPTj17XG5cdEFQUF9DSEFOR0VEOmFwcD0+KHt0eXBlOmBAQCR7RE9NQUlOfS9BUFBfQ0hBTkdFRGAscGF5bG9hZDp7YXBwfX0pXG5cdCxBUFBTX0ZFVENIRUQ6IGFwcHM9PmRpc3BhdGNoPT57XG5cdFx0ZGlzcGF0Y2goe3R5cGU6J05PUk1BTElaRURfREFUQScscGF5bG9hZDpub3JtYWxpemUoYXBwcyxhcnJheU9mKEFwcGxpY2F0aW9uLlNjaGVtYSkpLmVudGl0aWVzfSlcblx0fVxuXHQsU1dJVENIX0FQUExJQ0FUSU9OOiBhcHA9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBhcHBzPWdldFN0YXRlKCkuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdXG5cdFx0bGV0IGlkcz1PYmplY3Qua2V5cyhhcHBzKVxuXHRcdGxldCBpbmRleD1pZHNbKGlkcy5pbmRleE9mKGFwcCkrMSklaWRzLmxlbmd0aF1cblx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PWFwcHNbaW5kZXhdXG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vQVBQX0NIQU5HRURgOlxuXHRcdHJldHVybiB7YXBwOnBheWxvYWQuYXBwLl9pZH1cblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgUWlsaUNvbnNvbGUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblx0XHRBcHBsaWNhdGlvbi5vbignY2hhbmdlJyxhcHA9Pntcblx0XHRcdGNvbnN0IHtkaXNwYXRjaCxyb3V0ZXMscGFyYW1zfT10aGlzLnByb3BzXG5cdFx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5BUFBfQ0hBTkdFRChhcHApKVxuXHRcdFx0aWYocm91dGVzWzFdICYmIHJvdXRlc1sxXS5uYW1lPT0nYXBwJyAmJiBwYXJhbXMubmFtZSE9YXBwLm5hbWUpXG5cdFx0XHRcdHJvdXRlci5wdXNoKGAvYXBwLyR7YXBwLm5hbWV9YClcblx0XHR9KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7YXBwLCBpbml0QXBwTmFtZSwgY2hpbGRyZW4sIGRpc3BhdGNoLCByb3V0ZXN9PXRoaXMucHJvcHNcblx0XHRsZXQgcHJvcHM9e1xuXHRcdFx0YXBwSWQ6IFwicWlsaUFkbWluXCJcblx0XHRcdCxpbml0OmE9PkFwcGxpY2F0aW9uLmluaXQoaW5pdEFwcE5hbWUpLnRoZW4oYXBwcz0+ZGlzcGF0Y2goQUNUSU9OLkFQUFNfRkVUQ0hFRChhcHBzKSkpXG5cdFx0fVxuXHRcdGlmKCFhcHApe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0XHQ8RW1wdHkgaWNvbj17PExvZ28vPn0+XG5cdFx0XHRcdFx0XHQ8TGluayB0bz1cImFwcFwiPmNsaWNrIHRvIGNyZWF0ZSB5b3VyIGZpcnN0IHFpbGkgYXBwPC9MaW5rPlxuXHRcdFx0XHRcdDwvRW1wdHk+XG5cdFx0XHRcdDwvUWlsaUFwcD5cblx0XHRcdClcblx0XHR9XG5cblx0XHRsZXQgcXVpY2tTd2l0Y2hTdHlsZT17Zm9udFNpemU6XCJ4eC1zbWFsbFwifVxuXHRcdGlmKHJvdXRlcy5maW5kKGE9PmEuY29udGV4dHVhbD09PWZhbHNlKSlcblx0XHRcdHF1aWNrU3dpdGNoU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UWlsaUFwcCB7Li4ucHJvcHN9PlxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiIG1pbmk9e3RydWV9XG5cdFx0XHRcdFx0c3R5bGU9e3F1aWNrU3dpdGNoU3R5bGV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNXSVRDSF9BUFBMSUNBVElPTihhcHAuX2lkKSl9PlxuXHRcdFx0XHRcdHthcHAubmFtZX1cblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cblx0XHRcdFx0e2NoaWxkcmVufVxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGluaXRBcHBOYW1lOm51bGxcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG5cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQnXG5pbXBvcnQgQXBwVUksIHtDcmVhdG9yfSBmcm9tICcuL2FwcCdcbmltcG9ydCBDbG91ZFVJIGZyb20gJy4vY2xvdWQnXG5pbXBvcnQgRGF0YVVJIGZyb20gJy4vZGF0YSdcbmltcG9ydCBMb2dVSSBmcm9tICcuL2xvZydcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcIi4vc2V0dGluZ1wiXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuXG5leHBvcnQgY29uc3QgTWFpbj1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCJcblx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YXBwOmNvbXBhY3QoQXBwbGljYXRpb24uY3VycmVudCxcIl9pZFwiLFwibmFtZVwiKX0pKShRaWxpQ29uc29sZSl9PlxuXG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhcHAvOm5hbWVcIiBuYW1lPVwiYXBwXCJcblx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7bmFtZX19KT0+KHthcHA6Y29tcGFjdChBcHBsaWNhdGlvbi5jdXJyZW50LFwibmFtZVwiLFwidW5hbWVcIixcImFwaUtleVwiKSxuYW1lLC4uLnN0YXRlLnVpLmFwcH0pKShBcHBVSSl9XG5cdFx0XHRvbkVudGVyPXsoe3BhcmFtczp7bmFtZX19KT0+UWlsaUNvbnNvbGUuZGVmYXVsdFByb3BzLmluaXRBcHBOYW1lPW5hbWV9XG5cdFx0XHQvPlxuXHRcdDxSb3V0ZSBwYXRoPVwiYXBwXCIgY29udGV4dHVhbD17ZmFsc2V9XG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PnN0YXRlLnVpLmFwcCkoQ3JlYXRvcil9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNsb3VkXCIgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2Nsb3VkQ29kZTpzdGF0ZVtET01BSU5dLmFwcC5jbG91ZENvZGV9KSkoQ2xvdWRVSSl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImRhdGFcIlxuXHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oey4uLnN0YXRlLnVpLmRhdGEsYXBwOnN0YXRlW0RPTUFJTl0uYXBwLl9pZH0pKShEYXRhVUkpfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOm5hbWVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJsb2dcIlxuXHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5zdGF0ZS51aS5sb2cpKExvZ1VJKX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cImFsbFwiLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmxldmVsXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxuXHRcdFx0PEluZGV4Um91dGVcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2FwcHM6T2JqZWN0LnZhbHVlcyhzdGF0ZS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV0pfSkpKE15VUkpfVxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHt1c2VyOnN0YXRlLnFpbGlBcHAudXNlcn0pKShQcm9maWxlVUkpfVxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdDwvUm91dGU+XG5cblxuICAgIDwvUm91dGU+KVxuXHQsWyAge1tET01BSU5dOlJFRFVDRVJ9XG5cdFx0LHtcblx0XHRcdHVpOmVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKFxuXHRcdFx0XHR7YXBwOkFwcFVJLlJFRFVDRVJ9XG5cdFx0XHRcdCx7bG9nOkxvZ1VJLlJFRFVDRVJ9XG5cdFx0XHRcdCx7Y2xvdWQ6Q2xvdWRVSS5SRURVQ0VSfVxuXHRcdFx0XHQse2RhdGE6RGF0YVVJLlJFRFVDRVJ9XG5cdFx0XHQpXG5cdFx0fV1cbilcblxuXG4vKipcbkBUb2RvOlxuKkRvbmU6IGFmdGVyIGFkZGluZyBuZXcgYXBwbGljYXRpb25cbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgbG9jYWwgc3RvcmFnZSB3aXRob3V0IEFsbCBmaWVsZHMsIHN1Y2ggYXMgd2l0aG91dCBhcHBsaWNhdGlvbiBuYW1lLCAuLi4sIGJlY2F1c2Ugc2VydmVyIHJldHVybmVkIG9ubHkgX2lkLCBjcmVhdGVkQXQsIC4uLlxuKkRvbmU6IGFmdGVyIGFwcGxpY2F0aW9uIGRlbGV0aW9uLCBVSSBzaG91bGQgZ28gdG8gLyBldmVuIHdpdGggZXJyb3JcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XG4qRG9uJ3Q6IHVzZSA8TGluay8+IHJhdGhlciB0aGFuIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvXG4qKkRvbmU6IE5ldmVyIGVtcHR5IFVJXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcblxuKiB0b28gc21hbGwtem9vbSBzaXplIGluIG1vYmlsZSBicm93c2VyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXG4qIGJhY2tncm91bmQgdG8gdXBsb2FkIHRvIGJhY2tlbmRcbiAgICBkb25lOiBXZWJTUUxEYiBpcyBkb25lXG4gICAgKioqIHNxbGl0ZVxuICAgIGRvbmU6ICoqKiBhZnRlciByZW1vdmUgYXBwLCBsb2NhbCBjYWNoZSBzaG91bGQgYmUgcmVtb3ZlZCB0b29cbioqIHRleHRmaWVsZCBjYW4ndCBiZSBjaGFuZ2VkICh3aGljaD8/KVxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxuKiBzaW1wbGUgZGF0YSBtb2RlOlxuICAgICogcmVtb3RlIHVwc2VydCBhbmQgcmVtb3ZlIGRpcmVjdGx5XG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXG4qIENhbm5vdCByZWFkIHByb3BlcnR5ICdjb21wb25lbnREaWRFbnRlcicgb2YgdW5kZWZpbmVkXG4qRG9uZTogRGF0ZSBzaG93IGFzIG1lYW5pbmdmdWxcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxuKi9cbiJdfQ==