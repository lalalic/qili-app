"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

require('../style/index.less');
var Empty = _.UI.Empty;


var ACTION = {
	APP_CHANGED: function APP_CHANGED(app) {
		return { type: "APP_CHANGED", app: app };
	}
};

var QiliConsole = function (_Component) {
	_inherits(QiliConsole, _Component);

	function QiliConsole(props) {
		_classCallCheck(this, QiliConsole);

		var _this = _possibleConstructorReturn(this, (QiliConsole.__proto__ || Object.getPrototypeOf(QiliConsole)).call(this, props));

		_app2.default.on('change', function (app) {
			var _this$props = _this.props,
			    dispatch = _this$props.dispatch,
			    routes = _this$props.routes,
			    params = _this$props.params,
			    router = _this$props.router;

			if (routes[1] && routes[1].name == 'app' && params.name != app.name) router.push("app/" + app.name);
			dispatch(ACTION.APP_CHANGED(app));
		});
		return _this;
	}

	_createClass(QiliConsole, [{
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

	return QiliConsole;
}(_react.Component);

QiliConsole.childContextTypes = {
	app: _react2.default.PropTypes.object
};
QiliConsole.defaultProps = {
	initAppName: null
};


var CurrentApp = function CurrentApp(_ref) {
	var name = _ref.name,
	    app = _ref.app,
	    open = _ref.open;
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

var REDUCER = {
	qiliConsole: function qiliConsole() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var _ref2 = arguments[1];
		var type = _ref2.type,
		    app = _ref2.app;

		switch (type) {
			case "APP_CHANGED":
				return { app: app };
			default:
				return state;
		}
	}
};

var QiliConsoleApp = (0, _reactRedux.connect)(function (state) {
	return { app: state.qiliConsole.app };
})(QiliConsole);

module.exports = _.QiliApp.render(_react2.default.createElement(
	_reactRouter.Route,
	{ path: "/", component: QiliConsoleApp },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: "app/:name", name: "app", component: _app4.default,
		onEnter: function onEnter(_ref3) {
			var name = _ref3.params.name;

			if (!_app2.default.current) {
				QiliConsole.defaultProps.initAppName = name;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwidHlwZSIsImFwcCIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJvbiIsImRpc3BhdGNoIiwicm91dGVzIiwicGFyYW1zIiwicm91dGVyIiwibmFtZSIsInB1c2giLCJpbml0QXBwTmFtZSIsImNoaWxkcmVuIiwiYXBwSWQiLCJpbml0Iiwic2VydmljZSIsImNvbnRleHR1YWwiLCJmaW5kIiwiYSIsImNoaWxkQ29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwiQ3VycmVudEFwcCIsIm9wZW4iLCJmb250U2l6ZSIsImRpc3BsYXkiLCJ1bmRlZmluZWQiLCJhcHBzIiwiYWxsIiwibGVuIiwibGVuZ3RoIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJfaWQiLCJ0YXJnZXQiLCJjdXJyZW50IiwiUkVEVUNFUiIsInFpbGlDb25zb2xlIiwic3RhdGUiLCJRaWxpQ29uc29sZUFwcCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZW5kZXIiLCJwcmV2IiwibmV4dCIsIl9uYW1lIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFtRkE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUF0R0FBLFFBQVEscUJBQVI7SUFVT0MsSyxRQUFBQSxLOzs7QUFFUCxJQUFNQyxTQUFPO0FBQ1pDLGNBQVksMEJBQUs7QUFDaEIsU0FBTyxFQUFDQyxNQUFLLGFBQU4sRUFBb0JDLFFBQXBCLEVBQVA7QUFDQTtBQUhXLENBQWI7O0lBTU1DLFc7OztBQUNGLHNCQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsd0hBQ1JBLEtBRFE7O0FB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O0FBaUJHO0FBQUE7QUFBQSxJQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkI7QUFDSSw4REFBZSxTQUFPLE9BQUtxQyxLQUEzQixHQURKO0FBRUksc0RBQU8sTUFBSyxPQUFaO0FBRkosRUFqQkg7QUFzQkc7QUFBQTtBQUFBLElBQU8sTUFBSyxLQUFaLEVBQWtCLHdCQUFsQjtBQUNJLDhEQUFlLElBQUcsS0FBbEIsR0FESjtBQUVJLHNEQUFPLE1BQUssUUFBWjtBQUZKLEVBdEJIO0FBMkJIO0FBQUE7QUFBQSxJQUFPLE1BQUssSUFBWjtBQUNDLDJEQUFZLHVCQUFaLEVBQTZCLFlBQVksS0FBekMsR0FERDtBQUVDLHNEQUFPLE1BQUssU0FBWixFQUFzQiw0QkFBdEIsR0FGRDtBQUdDLHNEQUFPLE1BQUssU0FBWixFQUFzQixnQ0FBdEIsRUFBNEMsWUFBWSxLQUF4RDtBQUhEO0FBM0JHLENBRFUsRUFtQ0QsRUFuQ0MsRUFzQ2JDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCWCxPQUFqQixnQkF0Q2Esd0JBd0NiLDRCQXhDYSxDQUFmOztBQTRDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCwgVUksIFBvc2l0aW9ufSBmcm9tICcuJ1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jb25zdCBBQ1RJT049e1xuXHRBUFBfQ0hBTkdFRDphcHA9Pntcblx0XHRyZXR1cm4ge3R5cGU6XCJBUFBfQ0hBTkdFRFwiLGFwcH1cblx0fVxufVxuXG5jbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXHRcdEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLGFwcD0+e1xuXHRcdFx0Y29uc3Qge2Rpc3BhdGNoLHJvdXRlcyxwYXJhbXMsIHJvdXRlcn09dGhpcy5wcm9wc1xuXHRcdFx0aWYocm91dGVzWzFdICYmIHJvdXRlc1sxXS5uYW1lPT0nYXBwJyAmJiBwYXJhbXMubmFtZSE9YXBwLm5hbWUpXG5cdFx0XHRcdHJvdXRlci5wdXNoKGBhcHAvJHthcHAubmFtZX1gKVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkFQUF9DSEFOR0VEKGFwcCkpXG5cdFx0fSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2FwcCwgaW5pdEFwcE5hbWUsIGNoaWxkcmVufT10aGlzLnByb3BzXG5cdFx0bGV0IHByb3BzPXtcblx0XHRcdGFwcElkOiBcInFpbGlBZG1pblwiXG5cdFx0XHQsIGluaXQ6YT0+QXBwbGljYXRpb24uaW5pdChpbml0QXBwTmFtZSlcblx0XHRcdCwgc2VydmljZTpcImh0dHA6Ly9sb2NhbGhvc3Q6OTA4MC8xL1wiXG5cdFx0fVxuXHRcdGlmKCFhcHApe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0XHQ8RW1wdHkgaWNvbj17PExvZ28vPn0+XG5cdFx0XHRcdFx0XHQ8TGluayB0bz1cImFwcFwiPmNsaWNrIHRvIGNyZWF0ZSB5b3VyIGZpcnN0IHFpbGkgYXBwPC9MaW5rPlxuXHRcdFx0XHRcdDwvRW1wdHk+XG5cdFx0XHRcdDwvUWlsaUFwcD5cblx0XHRcdClcblx0XHR9XG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0PEN1cnJlbnRBcHAgbmFtZT17YXBwLm5hbWV9IGFwcD17YXBwfSBvcGVuPXshIWFwcCAmJiB0aGlzLmNvbnRleHR1YWwoKX0vPlxuXHRcdFx0XHR7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcbiAgICB9XG5cdFxuXHRjb250ZXh0dWFsKCl7XG5cdFx0Y29uc3Qge3JvdXRlc309dGhpcy5wcm9wc1xuXHRcdHJldHVybiAhISFyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSlcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0YXBwOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuXHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YXBwOiB0aGlzLnByb3BzLmFwcFxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGluaXRBcHBOYW1lOm51bGxcblx0fVxufVxuXG5jb25zdCBDdXJyZW50QXBwPSh7bmFtZSwgYXBwLCBvcGVufSk9Pihcblx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIiBtaW5pPXt0cnVlfSBcblx0XHRzdHlsZT17e2ZvbnRTaXplOlwieHgtc21hbGxcIiwgZGlzcGxheTpvcGVuID8gdW5kZWZpbmVkIDogXCJub25lXCIgfX1cblx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRsZXQgYXBwcz1BcHBsaWNhdGlvbi5hbGwsIGxlbj1hcHBzLmxlbmd0aFxuXHRcdFx0aWYobGVuPjEpe1xuXHRcdFx0XHRsZXQgaW5kZXg9YXBwcy5maW5kSW5kZXgoYT0+YS5faWQ9PWFwcC5faWQpXG5cdFx0XHRcdGxldCB0YXJnZXQ9YXBwc1soaW5kZXgrMSkgJSBsZW5dXG5cblx0XHRcdFx0QXBwbGljYXRpb24uY3VycmVudD10YXJnZXRcblx0XHRcdH1cblx0XHR9fT5cblx0XHR7bmFtZX1cblx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cbilcblxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL2Rhc2hib2FyZCdcbmltcG9ydCBBcHBVSSwge0NyZWF0b3IsIFJFRFVDRVIgYXMgYXBwVUlSZWR1Y2VyfSBmcm9tICcuL2FwcCdcbmltcG9ydCBDbG91ZFVJIGZyb20gJy4vY2xvdWQnXG5pbXBvcnQgRGF0YVVJIGZyb20gJy4vZGF0YSdcbmltcG9ydCBMb2dVSSBmcm9tICcuL2xvZydcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcIi4vc2V0dGluZ1wiXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJ1xuXG5jb25zdCBSRURVQ0VSPXtcblx0cWlsaUNvbnNvbGU6IChzdGF0ZT17fSx7dHlwZSxhcHB9KT0+e1xuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlIFwiQVBQX0NIQU5HRURcIjpcblx0XHRcdHJldHVybiB7YXBwfVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgUWlsaUNvbnNvbGVBcHA9Y29ubmVjdChzdGF0ZT0+KHthcHA6c3RhdGUucWlsaUNvbnNvbGUuYXBwfSkpKFFpbGlDb25zb2xlKVxuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtRaWxpQ29uc29sZUFwcH0+XG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhcHAvOm5hbWVcIiBuYW1lPVwiYXBwXCIgY29tcG9uZW50PXtBcHBVSX1cblx0XHRcdG9uRW50ZXI9eyh7cGFyYW1zOntuYW1lfX0pPT57XG5cdFx0XHRcdGlmKCFBcHBsaWNhdGlvbi5jdXJyZW50KXtcblx0XHRcdFx0XHRRaWxpQ29uc29sZS5kZWZhdWx0UHJvcHMuaW5pdEFwcE5hbWU9bmFtZVxuXHRcdFx0XHR9XG5cdFx0XHR9fVxuXHRcdFx0b25DaGFuZ2U9eyhwcmV2LCBuZXh0KT0+e1xuXHRcdFx0XHRpZihwcmV2LnBhcmFtcy5uYW1lIT1uZXh0LnBhcmFtcy5uYW1lKVxuXHRcdFx0XHRcdEFwcGxpY2F0aW9uLmN1cnJlbnQ9bmV4dC5wYXJhbXMubmFtZVxuXHRcdFx0fX0vPlxuXHRcdDxSb3V0ZSBwYXRoPVwiYXBwXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17Q3JlYXRvcn0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e0Nsb3VkVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImRhdGFcIiBjb21wb25lbnQ9e0RhdGFVSX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz17YCR7VXNlci5fbmFtZX1gfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpuYW1lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwibG9nXCIgY29tcG9uZW50PXtMb2dVSX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cImFsbFwiLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmxldmVsXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cbiAgICA8L1JvdXRlPikse1xuXHRcdFxuXHR9XG5cdCxPYmplY3QuYXNzaWduKHt9LFJFRFVDRVIsYXBwVUlSZWR1Y2VyKVxuXHQsdGh1bmtcblx0LGNyZWF0ZUxvZ2dlcigpXG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=