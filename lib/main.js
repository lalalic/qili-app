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


var DOMAIN = "main";

var ACTION = {
	APP_CHANGED: function APP_CHANGED(app) {
		return { type: "@@" + DOMAIN + "/APP_CHANGED", payload: { app: app } };
	}
};

var REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type;
	var payload = _ref.payload;

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
			var _this$props = _this.props;
			var dispatch = _this$props.dispatch;
			var routes = _this$props.routes;
			var params = _this$props.params;
			var router = _this$props.router;

			dispatch(ACTION.APP_CHANGED(app));
			if (routes[1] && routes[1].name == 'app' && params.name != app.name) router.replace("/app/" + app.name);
		});
		return _this;
	}

	_createClass(_class, [{
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
	}]);

	return _class;
}(_react.Component), _class.defaultProps = {
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
), {}, Object.assign({}, REDUCER, _app4.default.REDUCER, _log2.default.REDUCER, _cloud2.default.REDUCER, _userProfile2.default.REDUCER, _data2.default.REDUCER), _reduxThunk2.default, (0, _reduxLogger2.default)());

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwidHlwZSIsInBheWxvYWQiLCJhcHAiLCJSRURVQ0VSIiwic3RhdGUiLCJRaWxpQ29uc29sZSIsInByb3BzIiwib24iLCJkaXNwYXRjaCIsInJvdXRlcyIsInBhcmFtcyIsInJvdXRlciIsIm5hbWUiLCJyZXBsYWNlIiwiaW5pdEFwcE5hbWUiLCJjaGlsZHJlbiIsImFwcElkIiwiaW5pdCIsInNlcnZpY2UiLCJjb250ZXh0dWFsIiwiZmluZCIsImEiLCJkZWZhdWx0UHJvcHMiLCJDdXJyZW50QXBwIiwib3BlbiIsImZvbnRTaXplIiwiZGlzcGxheSIsInVuZGVmaW5lZCIsImFwcHMiLCJhbGwiLCJsZW4iLCJsZW5ndGgiLCJpbmRleCIsImZpbmRJbmRleCIsIl9pZCIsInRhcmdldCIsImN1cnJlbnQiLCJNYWluIiwicmVuZGVyIiwiV3JhcHBlZENvbXBvbmVudCIsIl9uYW1lIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBc0ZBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUF6R0FBLFFBQVEscUJBQVI7SUFVT0MsSyxRQUFBQSxLOzs7QUFFUCxJQUFNQyxTQUFPLE1BQWI7O0FBRUEsSUFBTUMsU0FBTztBQUNaQyxjQUFZLDBCQUFLO0FBQ2hCLFNBQU8sRUFBQ0MsYUFBVUgsTUFBVixpQkFBRCxFQUFnQ0ksU0FBUSxFQUFDQyxRQUFELEVBQXhDLEVBQVA7QUFDQTtBQUhXLENBQWI7O0FBTUEsSUFBTUMsOEJBQ0pOLE1BREksRUFDSyxZQUEyQjtBQUFBLEtBQTFCTyxLQUEwQix1RUFBcEIsRUFB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QTZCLFlBQVksS0FBekMsR0FERDtBQUVDLHNEQUFPLE1BQUssU0FBWixFQUFzQiw0QkFBdEIsR0FGRDtBQUdDLHNEQUFPLE1BQUssU0FBWixFQUFzQixnQ0FBdEIsRUFBNEMsWUFBWSxLQUF4RDtBQUhEO0FBeEJHLENBRGEsRUFnQ0osRUFoQ0ksRUFpQ2hCQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQnZDLE9BQWpCLEVBQXlCLGNBQU1BLE9BQS9CLEVBQXVDLGNBQU1BLE9BQTdDLEVBQXFELGdCQUFRQSxPQUE3RCxFQUFxRSxzQkFBVUEsT0FBL0UsRUFBdUYsZUFBT0EsT0FBOUYsQ0FqQ2dCLHdCQW1DaEIsNEJBbkNnQixDQUFYOztBQXVDUCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3RvcnksIFJlZGlyZWN0LCBJbmRleFJlZGlyZWN0LCBMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLCBVSSwgUG9zaXRpb259IGZyb20gJy4nXG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9kYi9hcHAnXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmNvbnN0IERPTUFJTj1cIm1haW5cIlxuXG5jb25zdCBBQ1RJT049e1xuXHRBUFBfQ0hBTkdFRDphcHA9Pntcblx0XHRyZXR1cm4ge3R5cGU6YEBAJHtET01BSU59L0FQUF9DSEFOR0VEYCxwYXlsb2FkOnthcHB9fVxuXHR9XG59XG5cbmNvbnN0IFJFRFVDRVI9e1xuXHRbRE9NQUlOXTogKHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9BUFBfQ0hBTkdFRGA6XG5cdFx0XHRyZXR1cm4ge2FwcDpwYXlsb2FkLmFwcH1cblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuY29uc3QgUWlsaUNvbnNvbGU9Y29ubmVjdChzdGF0ZT0+KHthcHA6c3RhdGVbRE9NQUlOXS5hcHB9KSkoXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXHRcdEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLGFwcD0+e1xuXHRcdFx0Y29uc3Qge2Rpc3BhdGNoLHJvdXRlcyxwYXJhbXMscm91dGVyfT10aGlzLnByb3BzXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQVBQX0NIQU5HRUQoYXBwKSlcblx0XHRcdGlmKHJvdXRlc1sxXSAmJiByb3V0ZXNbMV0ubmFtZT09J2FwcCcgJiYgcGFyYW1zLm5hbWUhPWFwcC5uYW1lKVxuXHRcdFx0XHRyb3V0ZXIucmVwbGFjZShgL2FwcC8ke2FwcC5uYW1lfWApXG5cdFx0fSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2FwcCwgaW5pdEFwcE5hbWUsIGNoaWxkcmVufT10aGlzLnByb3BzXG5cdFx0bGV0IHByb3BzPXtcblx0XHRcdGFwcElkOiBcInFpbGlBZG1pblwiXG5cdFx0XHQsIGluaXQ6YT0+QXBwbGljYXRpb24uaW5pdChpbml0QXBwTmFtZSlcblx0XHRcdCwgc2VydmljZTpcImh0dHA6Ly9sb2NhbGhvc3Q6OTA4MC8xL1wiXG5cdFx0fVxuXHRcdGlmKCFhcHApe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0XHQ8RW1wdHkgaWNvbj17PExvZ28vPn0+XG5cdFx0XHRcdFx0XHQ8TGluayB0bz1cImFwcFwiPmNsaWNrIHRvIGNyZWF0ZSB5b3VyIGZpcnN0IHFpbGkgYXBwPC9MaW5rPlxuXHRcdFx0XHRcdDwvRW1wdHk+XG5cdFx0XHRcdDwvUWlsaUFwcD5cblx0XHRcdClcblx0XHR9XG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0PEN1cnJlbnRBcHAgbmFtZT17YXBwLm5hbWV9IGFwcD17YXBwfSBvcGVuPXshIWFwcCAmJiB0aGlzLmNvbnRleHR1YWwoKX0vPlxuXHRcdFx0XHR7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcbiAgICB9XG5cblx0Y29udGV4dHVhbCgpe1xuXHRcdGNvbnN0IHtyb3V0ZXN9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gISEhcm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRpbml0QXBwTmFtZTpudWxsXG5cdH1cbn0pXG5cbmNvbnN0IEN1cnJlbnRBcHA9KHtuYW1lLCBhcHAsIG9wZW59KT0+KFxuXHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiIG1pbmk9e3RydWV9XG5cdFx0c3R5bGU9e3tmb250U2l6ZTpcInh4LXNtYWxsXCIsIGRpc3BsYXk6b3BlbiA/IHVuZGVmaW5lZCA6IFwibm9uZVwiIH19XG5cdFx0b25DbGljaz17ZT0+e1xuXHRcdFx0bGV0IGFwcHM9QXBwbGljYXRpb24uYWxsLCBsZW49YXBwcy5sZW5ndGhcblx0XHRcdGlmKGxlbj4xKXtcblx0XHRcdFx0bGV0IGluZGV4PWFwcHMuZmluZEluZGV4KGE9PmEuX2lkPT1hcHAuX2lkKVxuXHRcdFx0XHRsZXQgdGFyZ2V0PWFwcHNbKGluZGV4KzEpICUgbGVuXVxuXG5cdFx0XHRcdEFwcGxpY2F0aW9uLmN1cnJlbnQ9dGFyZ2V0XG5cdFx0XHR9XG5cdFx0fX0+XG5cdFx0e25hbWV9XG5cdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4pXG5cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQnXG5pbXBvcnQgQXBwVUksIHtDcmVhdG9yfSBmcm9tICcuL2FwcCdcbmltcG9ydCBDbG91ZFVJIGZyb20gJy4vY2xvdWQnXG5pbXBvcnQgRGF0YVVJIGZyb20gJy4vZGF0YSdcbmltcG9ydCBMb2dVSSBmcm9tICcuL2xvZydcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcIi4vc2V0dGluZ1wiXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJ1xuXG5leHBvcnQgY29uc3QgTWFpbj1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtRaWxpQ29uc29sZX0+XG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhcHAvOm5hbWVcIiBuYW1lPVwiYXBwXCIgY29tcG9uZW50PXtBcHBVSX1cblx0XHRcdG9uRW50ZXI9eyh7cGFyYW1zOntuYW1lfX0pPT57XG5cdFx0XHRcdGlmKCFBcHBsaWNhdGlvbi5jdXJyZW50KXtcblx0XHRcdFx0XHRRaWxpQ29uc29sZS5XcmFwcGVkQ29tcG9uZW50LmRlZmF1bHRQcm9wcy5pbml0QXBwTmFtZT1uYW1lXG5cdFx0XHRcdH1cblx0XHRcdH19XG5cdFx0XHQvPlxuXHRcdDxSb3V0ZSBwYXRoPVwiYXBwXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17Q3JlYXRvcn0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e0Nsb3VkVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImRhdGFcIiBjb21wb25lbnQ9e0RhdGFVSX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz17YCR7VXNlci5fbmFtZX1gfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpuYW1lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwibG9nXCIgY29tcG9uZW50PXtMb2dVSX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cImFsbFwiLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmxldmVsXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cbiAgICA8L1JvdXRlPikse31cblx0LE9iamVjdC5hc3NpZ24oe30sUkVEVUNFUixBcHBVSS5SRURVQ0VSLExvZ1VJLlJFRFVDRVIsQ2xvdWRVSS5SRURVQ0VSLFByb2ZpbGVVSS5SRURVQ0VSLERhdGFVSS5SRURVQ0VSKVxuXHQsdGh1bmtcblx0LGNyZWF0ZUxvZ2dlcigpXG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=