"use strict";

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


var DOMAIN = "main";

var ACTION = {
	APP_CHANGED: function APP_CHANGED(app) {
		return { domain: DOMAIN, type: "APP_CHANGED", app: app };
	}
};

var REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var domain = _ref.domain;
	var type = _ref.type;
	var app = _ref.app;

	if (domain == DOMAIN) {
		switch (type) {
			case "APP_CHANGED":
				return { app: app };
		}
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
			var _this$props = _this.props;
			var dispatch = _this$props.dispatch;
			var routes = _this$props.routes;
			var params = _this$props.params;
			var router = _this$props.router;

			if (routes[1] && routes[1].name == 'app' && params.name != app.name) router.replace("app/" + app.name);
			dispatch(ACTION.APP_CHANGED(app));
		});
		return _this;
	}

	_createClass(_QiliConsole, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var app = _props.app;
			var initAppName = _props.initAppName;
			var children = _props.children;

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
}, _temp));

var CurrentApp = function CurrentApp(_ref2) {
	var name = _ref2.name;
	var app = _ref2.app;
	var open = _ref2.open;
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

module.exports = _.QiliApp.render(_react2.default.createElement(
	_reactRouter.Route,
	{ path: "/", component: QiliConsole },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: "app/:name", name: "app", component: _app4.default,
		onEnter: function onEnter(_ref3) {
			var name = _ref3.params.name;

			if (!_app2.default.current) {
				QiliConsole.WrappedComponent.defaultProps.initAppName = name;
			}
		},
		onChange: function onChange(prev, next) {
			if (prev.params.name != next.params.name) _app2.default.current = next.params.name;
		} }),
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
), {}, Object.assign({}, REDUCER, _app3.REDUCER), _reduxThunk2.default, (0, _reduxLogger2.default)());

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwiZG9tYWluIiwidHlwZSIsImFwcCIsIlJFRFVDRVIiLCJzdGF0ZSIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJvbiIsImRpc3BhdGNoIiwicm91dGVzIiwicGFyYW1zIiwicm91dGVyIiwibmFtZSIsInJlcGxhY2UiLCJpbml0QXBwTmFtZSIsImNoaWxkcmVuIiwiYXBwSWQiLCJpbml0Iiwic2VydmljZSIsImNvbnRleHR1YWwiLCJmaW5kIiwiYSIsImNoaWxkQ29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwiQ3VycmVudEFwcCIsIm9wZW4iLCJmb250U2l6ZSIsImRpc3BsYXkiLCJ1bmRlZmluZWQiLCJhcHBzIiwiYWxsIiwibGVuIiwibGVuZ3RoIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJfaWQiLCJ0YXJnZXQiLCJjdXJyZW50IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlbmRlciIsIldyYXBwZWRDb21wb25lbnQiLCJwcmV2IiwibmV4dCIsIl9uYW1lIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQWtHQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBckhBQSxRQUFRLHFCQUFSO0lBVU9DLEssUUFBQUEsSzs7O0FBRVAsSUFBTUMsU0FBTyxNQUFiOztBQUVBLElBQU1DLFNBQU87QUFDWkMsY0FBWSwwQkFBSztBQUNoQixTQUFPLEVBQUNDLFFBQU9ILE1BQVIsRUFBZ0JJLE1BQUssYUFBckIsRUFBbUNDLFFBQW5DLEVBQVA7QUFDQTtBQUhXLENBQWI7O0FBTUEs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LEVBQ0MsY0FBWTJCLE9BQVosR0FBb0JNLEtBQUtuQyxNQUFMLENBQVlFLElBQWhDO0FBQ0QsR0FUSSxHQUhIO0FBYUgscURBQU8sTUFBSyxLQUFaLEVBQWtCLFlBQVksS0FBOUIsRUFBcUMsd0JBQXJDLEdBYkc7QUFlRyxxREFBTyxNQUFLLE9BQVosRUFBb0IsMEJBQXBCLEdBZkg7QUFpQkc7QUFBQTtBQUFBLElBQU8sTUFBSyxNQUFaLEVBQW1CLHlCQUFuQjtBQUNJLDhEQUFlLFNBQU8sT0FBS2tDLEtBQTNCLEdBREo7QUFFSSxzREFBTyxNQUFLLE9BQVo7QUFGSixFQWpCSDtBQXNCRztBQUFBO0FBQUEsSUFBTyxNQUFLLEtBQVosRUFBa0Isd0JBQWxCO0FBQ0ksOERBQWUsSUFBRyxLQUFsQixHQURKO0FBRUksc0RBQU8sTUFBSyxRQUFaO0FBRkosRUF0Qkg7QUEyQkg7QUFBQTtBQUFBLElBQU8sTUFBSyxJQUFaO0FBQ0MsMkRBQVksdUJBQVosRUFBNkIsWUFBWSxLQUF6QyxHQUREO0FBRUMsc0RBQU8sTUFBSyxTQUFaLEVBQXNCLDRCQUF0QixHQUZEO0FBR0Msc0RBQU8sTUFBSyxTQUFaLEVBQXNCLGdDQUF0QixFQUE0QyxZQUFZLEtBQXhEO0FBSEQ7QUEzQkcsQ0FEVSxFQW1DRCxFQW5DQyxFQW9DYkMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUI3QyxPQUFqQixnQkFwQ2Esd0JBc0NiLDRCQXRDYSxDQUFmOztBQTBDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCwgVUksIFBvc2l0aW9ufSBmcm9tICcuJ1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jb25zdCBET01BSU49XCJtYWluXCJcblxuY29uc3QgQUNUSU9OPXtcblx0QVBQX0NIQU5HRUQ6YXBwPT57XG5cdFx0cmV0dXJuIHtkb21haW46RE9NQUlOLCB0eXBlOlwiQVBQX0NIQU5HRURcIixhcHB9XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj17XG5cdFtET01BSU5dOiAoc3RhdGU9e30se2RvbWFpbiwgdHlwZSxhcHB9KT0+e1xuXHRcdGlmKGRvbWFpbj09RE9NQUlOKXtcblx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdGNhc2UgXCJBUFBfQ0hBTkdFRFwiOlxuXHRcdFx0XHRyZXR1cm4ge2FwcH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuY29uc3QgUWlsaUNvbnNvbGU9Y29ubmVjdChzdGF0ZT0+KHthcHA6c3RhdGVbRE9NQUlOXS5hcHB9KSkoXG5jbGFzcyBfUWlsaUNvbnNvbGUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblx0XHRBcHBsaWNhdGlvbi5vbignY2hhbmdlJyxhcHA9Pntcblx0XHRcdGNvbnN0IHtkaXNwYXRjaCxyb3V0ZXMscGFyYW1zLCByb3V0ZXJ9PXRoaXMucHJvcHNcblx0XHRcdGlmKHJvdXRlc1sxXSAmJiByb3V0ZXNbMV0ubmFtZT09J2FwcCcgJiYgcGFyYW1zLm5hbWUhPWFwcC5uYW1lKVxuXHRcdFx0XHRyb3V0ZXIucmVwbGFjZShgYXBwLyR7YXBwLm5hbWV9YClcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5BUFBfQ0hBTkdFRChhcHApKVxuXHRcdH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHthcHAsIGluaXRBcHBOYW1lLCBjaGlsZHJlbn09dGhpcy5wcm9wc1xuXHRcdGxldCBwcm9wcz17XG5cdFx0XHRhcHBJZDogXCJxaWxpQWRtaW5cIlxuXHRcdFx0LCBpbml0OmE9PkFwcGxpY2F0aW9uLmluaXQoaW5pdEFwcE5hbWUpXG5cdFx0XHQsIHNlcnZpY2U6XCJodHRwOi8vbG9jYWxob3N0OjkwODAvMS9cIlxuXHRcdH1cblx0XHRpZighYXBwKXtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxRaWxpQXBwIHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0PEVtcHR5IGljb249ezxMb2dvLz59PlxuXHRcdFx0XHRcdFx0PExpbmsgdG89XCJhcHBcIj5jbGljayB0byBjcmVhdGUgeW91ciBmaXJzdCBxaWxpIGFwcDwvTGluaz5cblx0XHRcdFx0XHQ8L0VtcHR5PlxuXHRcdFx0XHQ8L1FpbGlBcHA+XG5cdFx0XHQpXG5cdFx0fVxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxRaWxpQXBwIHsuLi5wcm9wc30+XG5cdFx0XHRcdDxDdXJyZW50QXBwIG5hbWU9e2FwcC5uYW1lfSBhcHA9e2FwcH0gb3Blbj17ISFhcHAgJiYgdGhpcy5jb250ZXh0dWFsKCl9Lz5cblx0XHRcdFx0e2NoaWxkcmVufVxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG4gICAgfVxuXG5cdGNvbnRleHR1YWwoKXtcblx0XHRjb25zdCB7cm91dGVzfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuICEhIXJvdXRlcy5maW5kKGE9PmEuY29udGV4dHVhbD09PWZhbHNlKVxuXHR9XG5cblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRhcHA6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRhcHA6IHRoaXMucHJvcHMuYXBwXG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aW5pdEFwcE5hbWU6bnVsbFxuXHR9XG59KVxuXG5jb25zdCBDdXJyZW50QXBwPSh7bmFtZSwgYXBwLCBvcGVufSk9Pihcblx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIiBtaW5pPXt0cnVlfVxuXHRcdHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwiLCBkaXNwbGF5Om9wZW4gPyB1bmRlZmluZWQgOiBcIm5vbmVcIiB9fVxuXHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdGxldCBhcHBzPUFwcGxpY2F0aW9uLmFsbCwgbGVuPWFwcHMubGVuZ3RoXG5cdFx0XHRpZihsZW4+MSl7XG5cdFx0XHRcdGxldCBpbmRleD1hcHBzLmZpbmRJbmRleChhPT5hLl9pZD09YXBwLl9pZClcblx0XHRcdFx0bGV0IHRhcmdldD1hcHBzWyhpbmRleCsxKSAlIGxlbl1cblxuXHRcdFx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PXRhcmdldFxuXHRcdFx0fVxuXHRcdH19PlxuXHRcdHtuYW1lfVxuXHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuKVxuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkJ1xuaW1wb3J0IEFwcFVJLCB7Q3JlYXRvciwgUkVEVUNFUiBhcyBhcHBVSVJlZHVjZXJ9IGZyb20gJy4vYXBwJ1xuaW1wb3J0IENsb3VkVUkgZnJvbSAnLi9jbG91ZCdcbmltcG9ydCBEYXRhVUkgZnJvbSAnLi9kYXRhJ1xuaW1wb3J0IExvZ1VJIGZyb20gJy4vbG9nJ1xuaW1wb3J0IE15VUkgZnJvbSBcIi4vbXlcIlxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwiLi9zZXR0aW5nXCJcbmltcG9ydCBQcm9maWxlVUkgZnJvbSBcIi4vdXNlci1wcm9maWxlXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tICdyZWR1eC1sb2dnZXInXG5cbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e1FpbGlDb25zb2xlfT5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFwcC86bmFtZVwiIG5hbWU9XCJhcHBcIiBjb21wb25lbnQ9e0FwcFVJfVxuXHRcdFx0b25FbnRlcj17KHtwYXJhbXM6e25hbWV9fSk9Pntcblx0XHRcdFx0aWYoIUFwcGxpY2F0aW9uLmN1cnJlbnQpe1xuXHRcdFx0XHRcdFFpbGlDb25zb2xlLldyYXBwZWRDb21wb25lbnQuZGVmYXVsdFByb3BzLmluaXRBcHBOYW1lPW5hbWVcblx0XHRcdFx0fVxuXHRcdFx0fX1cblx0XHRcdG9uQ2hhbmdlPXsocHJldiwgbmV4dCk9Pntcblx0XHRcdFx0aWYocHJldi5wYXJhbXMubmFtZSE9bmV4dC5wYXJhbXMubmFtZSlcblx0XHRcdFx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PW5leHQucGFyYW1zLm5hbWVcblx0XHRcdH19Lz5cblx0XHQ8Um91dGUgcGF0aD1cImFwcFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0NyZWF0b3J9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNsb3VkXCIgY29tcG9uZW50PXtDbG91ZFVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJkYXRhXCIgY29tcG9uZW50PXtEYXRhVUl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89e2Ake1VzZXIuX25hbWV9YH0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bmFtZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImxvZ1wiIGNvbXBvbmVudD17TG9nVUl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCJhbGxcIi8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpsZXZlbFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIj5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TXlVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtQcm9maWxlVUl9IGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXG4gICAgPC9Sb3V0ZT4pLHt9XG5cdCxPYmplY3QuYXNzaWduKHt9LFJFRFVDRVIsYXBwVUlSZWR1Y2VyKVxuXHQsdGh1bmtcblx0LGNyZWF0ZUxvZ2dlcigpXG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=