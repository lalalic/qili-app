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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('../style/index.less');
var Empty = _.UI.Empty;


var DOMAIN = "main";

var ACTION = {
	APP_CHANGED: function APP_CHANGED(app) {
		return { type: "@@" + DOMAIN + "/APP_CHANGED", payload: app };
	},
	APPS_FETCHED: function APPS_FETCHED(apps) {
		return { type: "@@" + DOMAIN + "/APPS_FETCHED", payload: (0, _normalizr.normalize)(payload, arrayOf(_app2.default.Schema)) };
	}
};

var REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/APP_CHANGED":
			return { app: payload };
		case "@@" + DOMAIN + "/APPS_FETCHED":
			return Object.assign({}, state, { entities: payload });
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

		console.log("/ constructed");
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
		key: "componentDidMount",
		value: function componentDidMount() {
			console.log("/ did mount");
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    app = _props.app,
			    initAppName = _props.initAppName,
			    children = _props.children,
			    dispatch = _props.dispatch;

			var props = {
				appId: "qiliAdmin",
				init: function init(a) {
					return _app2.default.init(initAppName).then(function (apps) {
						return dispatch(ACTION.APPS_FETCHED(apps));
					});
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
	{ path: "/", component: QiliConsole, onChange: function onChange() {
			console.dir(arguments);
		} },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwidHlwZSIsInBheWxvYWQiLCJhcHAiLCJBUFBTX0ZFVENIRUQiLCJhcnJheU9mIiwiU2NoZW1hIiwiUkVEVUNFUiIsInN0YXRlIiwiT2JqZWN0IiwiYXNzaWduIiwiZW50aXRpZXMiLCJRaWxpQ29uc29sZSIsInByb3BzIiwiY29uc29sZSIsImxvZyIsIm9uIiwiZGlzcGF0Y2giLCJyb3V0ZXMiLCJwYXJhbXMiLCJyb3V0ZXIiLCJuYW1lIiwicmVwbGFjZSIsImluaXRBcHBOYW1lIiwiY2hpbGRyZW4iLCJhcHBJZCIsImluaXQiLCJ0aGVuIiwiYXBwcyIsInNlcnZpY2UiLCJjb250ZXh0dWFsIiwiZmluZCIsImEiLCJkZWZhdWx0UHJvcHMiLCJDdXJyZW50QXBwIiwib3BlbiIsImZvbnRTaXplIiwiZGlzcGxheSIsInVuZGVmaW5lZCIsImFsbCIsImxlbiIsImxlbmd0aCIsImluZGV4IiwiZmluZEluZGV4IiwiX2lkIiwidGFyZ2V0IiwiY3VycmVudCIsIk1haW4iLCJyZW5kZXIiLCJkaXIiLCJhcmd1bWVudHMiLCJXcmFwcGVkQ29tcG9uZW50IiwiX25hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFnR0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBbEhBQSxRQUFRLHFCQUFSO0lBV09DLEssUUFBQUEsSzs7O0FBRVAsSUFBTUMsU0FBTyxNQUFiOztBQUVBLElBQU1DLFNBQU87QUFDWkMsY0FBWSwwQkFBSztBQUNoQixTQUFPLEVBQUNDLGFBQVVILE1BQVYsaUJBQUQsRUFBZ0NJLFNBQVFDLEdBQXhDLEVBQVA7QUFDQSxFQUhXO0FB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QixFQUFtQyx3QkFBbkM7QUFDTCxXQUFTLHdCQUFtQjtBQUFBLE9BQVQ3QixJQUFTLFNBQWpCRixNQUFpQixDQUFURSxJQUFTOztBQUMzQixPQUFHLENBQUMsY0FBWXlCLE9BQWhCLEVBQXdCO0FBQ3ZCbEMsZ0JBQVl1QyxnQkFBWixDQUE2QmxCLFlBQTdCLENBQTBDVixXQUExQyxHQUFzREYsSUFBdEQ7QUFDQTtBQUNEO0FBTEksR0FISDtBQVVILHFEQUFPLE1BQUssS0FBWixFQUFrQixZQUFZLEtBQTlCLEVBQXFDLHdCQUFyQyxHQVZHO0FBWUcscURBQU8sTUFBSyxPQUFaLEVBQW9CLDBCQUFwQixHQVpIO0FBY0c7QUFBQTtBQUFBLElBQU8sTUFBSyxNQUFaLEVBQW1CLHlCQUFuQjtBQUNJLDhEQUFlLFNBQU8sT0FBSytCLEtBQTNCLEdBREo7QUFFSSxzREFBTyxNQUFLLE9BQVo7QUFGSixFQWRIO0FBbUJHO0FBQUE7QUFBQSxJQUFPLE1BQUssS0FBWixFQUFrQix3QkFBbEI7QUFDSSw4REFBZSxJQUFHLEtBQWxCLEdBREo7QUFFSSxzREFBTyxNQUFLLFFBQVo7QUFGSixFQW5CSDtBQXdCSDtBQUFBO0FBQUEsSUFBTyxNQUFLLElBQVo7QUFDQywyREFBWSx1QkFBWixFQUE2QixZQUFZLEtBQXpDLEdBREQ7QUFFQyxzREFBTyxNQUFLLFNBQVosRUFBc0IsNEJBQXRCLEdBRkQ7QUFHQyxzREFBTyxNQUFLLFNBQVosRUFBc0IsZ0NBQXRCLEVBQTRDLFlBQVksS0FBeEQ7QUFIRDtBQXhCRyxDQURhLEVBaUNoQjNDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCSCxPQUFqQixFQUF5QixjQUFNQSxPQUEvQixFQUF1QyxjQUFNQSxPQUE3QyxFQUFxRCxnQkFBUUEsT0FBN0QsRUFBcUUsc0JBQVVBLE9BQS9FLEVBQXVGLGVBQU9BLE9BQTlGLENBakNnQixDQUFYOztBQXFDUCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3RvcnksIFJlZGlyZWN0LCBJbmRleFJlZGlyZWN0LCBMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLCBVSSwgUG9zaXRpb259IGZyb20gJy4nXG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9kYi9hcHAnXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmNvbnN0IERPTUFJTj1cIm1haW5cIlxuXG5jb25zdCBBQ1RJT049e1xuXHRBUFBfQ0hBTkdFRDphcHA9Pntcblx0XHRyZXR1cm4ge3R5cGU6YEBAJHtET01BSU59L0FQUF9DSEFOR0VEYCxwYXlsb2FkOmFwcH1cblx0fVxuXHQsQVBQU19GRVRDSEVEOiBhcHBzPT57XG5cdFx0cmV0dXJuIHt0eXBlOmBAQCR7RE9NQUlOfS9BUFBTX0ZFVENIRURgLHBheWxvYWQ6bm9ybWFsaXplKHBheWxvYWQsYXJyYXlPZihBcHBsaWNhdGlvbi5TY2hlbWEpKX1cblx0fVxufVxuXG5jb25zdCBSRURVQ0VSPXtcblx0W0RPTUFJTl06IChzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vQVBQX0NIQU5HRURgOlxuXHRcdFx0cmV0dXJuIHthcHA6cGF5bG9hZH1cblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9BUFBTX0ZFVENIRURgOlxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2VudGl0aWVzOnBheWxvYWR9KVxuXHRcdH1cblx0XHRyZXR1cm4gc3RhdGVcblx0fVxufVxuXG5jb25zdCBRaWxpQ29uc29sZT1jb25uZWN0KHN0YXRlPT4oe2FwcDpzdGF0ZVtET01BSU5dLmFwcH0pKShcbmNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG5cdFx0Y29uc29sZS5sb2coXCIvIGNvbnN0cnVjdGVkXCIpXG5cdFx0QXBwbGljYXRpb24ub24oJ2NoYW5nZScsYXBwPT57XG5cdFx0XHRjb25zdCB7ZGlzcGF0Y2gscm91dGVzLHBhcmFtcyxyb3V0ZXJ9PXRoaXMucHJvcHNcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5BUFBfQ0hBTkdFRChhcHApKVxuXHRcdFx0aWYocm91dGVzWzFdICYmIHJvdXRlc1sxXS5uYW1lPT0nYXBwJyAmJiBwYXJhbXMubmFtZSE9YXBwLm5hbWUpXG5cdFx0XHRcdHJvdXRlci5yZXBsYWNlKGAvYXBwLyR7YXBwLm5hbWV9YClcblx0XHR9KVxuICAgIH1cblx0XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc29sZS5sb2coXCIvIGRpZCBtb3VudFwiKVxuXHR9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2FwcCwgaW5pdEFwcE5hbWUsIGNoaWxkcmVuLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGxldCBwcm9wcz17XG5cdFx0XHRhcHBJZDogXCJxaWxpQWRtaW5cIlxuXHRcdFx0LCBpbml0OmE9PkFwcGxpY2F0aW9uLmluaXQoaW5pdEFwcE5hbWUpLnRoZW4oYXBwcz0+ZGlzcGF0Y2goQUNUSU9OLkFQUFNfRkVUQ0hFRChhcHBzKSkpXG5cdFx0XHQsIHNlcnZpY2U6XCJodHRwOi8vbG9jYWxob3N0OjkwODAvMS9cIlxuXHRcdH1cblx0XHRpZighYXBwKXtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxRaWxpQXBwIHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0PEVtcHR5IGljb249ezxMb2dvLz59PlxuXHRcdFx0XHRcdFx0PExpbmsgdG89XCJhcHBcIj5jbGljayB0byBjcmVhdGUgeW91ciBmaXJzdCBxaWxpIGFwcDwvTGluaz5cblx0XHRcdFx0XHQ8L0VtcHR5PlxuXHRcdFx0XHQ8L1FpbGlBcHA+XG5cdFx0XHQpXG5cdFx0fVxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxRaWxpQXBwIHsuLi5wcm9wc30+XG5cdFx0XHRcdDxDdXJyZW50QXBwIG5hbWU9e2FwcC5uYW1lfSBhcHA9e2FwcH0gb3Blbj17ISFhcHAgJiYgdGhpcy5jb250ZXh0dWFsKCl9Lz5cblx0XHRcdFx0e2NoaWxkcmVufVxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG4gICAgfVxuXG5cdGNvbnRleHR1YWwoKXtcblx0XHRjb25zdCB7cm91dGVzfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuICEhIXJvdXRlcy5maW5kKGE9PmEuY29udGV4dHVhbD09PWZhbHNlKVxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aW5pdEFwcE5hbWU6bnVsbFxuXHR9XG59KVxuXG5jb25zdCBDdXJyZW50QXBwPSh7bmFtZSwgYXBwLCBvcGVufSk9Pihcblx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIiBtaW5pPXt0cnVlfVxuXHRcdHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwiLCBkaXNwbGF5Om9wZW4gPyB1bmRlZmluZWQgOiBcIm5vbmVcIiB9fVxuXHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdGxldCBhcHBzPUFwcGxpY2F0aW9uLmFsbCwgbGVuPWFwcHMubGVuZ3RoXG5cdFx0XHRpZihsZW4+MSl7XG5cdFx0XHRcdGxldCBpbmRleD1hcHBzLmZpbmRJbmRleChhPT5hLl9pZD09YXBwLl9pZClcblx0XHRcdFx0bGV0IHRhcmdldD1hcHBzWyhpbmRleCsxKSAlIGxlbl1cblxuXHRcdFx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PXRhcmdldFxuXHRcdFx0fVxuXHRcdH19PlxuXHRcdHtuYW1lfVxuXHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuKVxuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkJ1xuaW1wb3J0IEFwcFVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9hcHAnXG5pbXBvcnQgQ2xvdWRVSSBmcm9tICcuL2Nsb3VkJ1xuaW1wb3J0IERhdGFVSSBmcm9tICcuL2RhdGEnXG5pbXBvcnQgTG9nVUkgZnJvbSAnLi9sb2cnXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gXCIuL3NldHRpbmdcIlxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwiLi91c2VyLXByb2ZpbGVcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmV4cG9ydCBjb25zdCBNYWluPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e1FpbGlDb25zb2xlfSBvbkNoYW5nZT17ZnVuY3Rpb24oKXtjb25zb2xlLmRpcihhcmd1bWVudHMpfX0+XG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhcHAvOm5hbWVcIiBuYW1lPVwiYXBwXCIgY29tcG9uZW50PXtBcHBVSX1cblx0XHRcdG9uRW50ZXI9eyh7cGFyYW1zOntuYW1lfX0pPT57XG5cdFx0XHRcdGlmKCFBcHBsaWNhdGlvbi5jdXJyZW50KXtcblx0XHRcdFx0XHRRaWxpQ29uc29sZS5XcmFwcGVkQ29tcG9uZW50LmRlZmF1bHRQcm9wcy5pbml0QXBwTmFtZT1uYW1lXG5cdFx0XHRcdH1cblx0XHRcdH19XG5cdFx0XHQvPlxuXHRcdDxSb3V0ZSBwYXRoPVwiYXBwXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17Q3JlYXRvcn0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e0Nsb3VkVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImRhdGFcIiBjb21wb25lbnQ9e0RhdGFVSX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz17YCR7VXNlci5fbmFtZX1gfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpuYW1lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwibG9nXCIgY29tcG9uZW50PXtMb2dVSX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cImFsbFwiLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmxldmVsXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cbiAgICA8L1JvdXRlPilcblx0LE9iamVjdC5hc3NpZ24oe30sUkVEVUNFUixBcHBVSS5SRURVQ0VSLExvZ1VJLlJFRFVDRVIsQ2xvdWRVSS5SRURVQ0VSLFByb2ZpbGVVSS5SRURVQ0VSLERhdGFVSS5SRURVQ0VSKVxuKVxuXG5cbi8qKlxuQFRvZG86XG4qRG9uZTogYWZ0ZXIgYWRkaW5nIG5ldyBhcHBsaWNhdGlvblxuICAgIGFwcGxpY2F0aW9uIGxpc3QgZG9lc24ndCByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICBsb2NhbCBzdG9yYWdlIHdpdGhvdXQgQWxsIGZpZWxkcywgc3VjaCBhcyB3aXRob3V0IGFwcGxpY2F0aW9uIG5hbWUsIC4uLiwgYmVjYXVzZSBzZXJ2ZXIgcmV0dXJuZWQgb25seSBfaWQsIGNyZWF0ZWRBdCwgLi4uXG4qRG9uZTogYWZ0ZXIgYXBwbGljYXRpb24gZGVsZXRpb24sIFVJIHNob3VsZCBnbyB0byAvIGV2ZW4gd2l0aCBlcnJvclxuKkRvbmU6IGVycm9yIGhhcHBlbnMsIFVJIHNob3VsZCBub3QgYmUgRW1wdHlcbipEb24ndDogdXNlIDxMaW5rLz4gcmF0aGVyIHRoYW4gdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG9cbioqRG9uZTogTmV2ZXIgZW1wdHkgVUlcbioqRG9uZTogRmxvYXRBY3Rpb25CdXR0b24gcG9zaXRpb24gd2hlbiB2aWV3IHdpZHRoIGlzIDk2MFxuXG4qIHRvbyBzbWFsbC16b29tIHNpemUgaW4gbW9iaWxlIGJyb3dzZXJcbiogZmlyc3QgZm9jdXMgb24gZm9ybSwgY2xvdWQgVUlcbiogYmFja2dyb3VuZCB0byB1cGxvYWQgdG8gYmFja2VuZFxuICAgIGRvbmU6IFdlYlNRTERiIGlzIGRvbmVcbiAgICAqKiogc3FsaXRlXG4gICAgZG9uZTogKioqIGFmdGVyIHJlbW92ZSBhcHAsIGxvY2FsIGNhY2hlIHNob3VsZCBiZSByZW1vdmVkIHRvb1xuKiogdGV4dGZpZWxkIGNhbid0IGJlIGNoYW5nZWQgKHdoaWNoPz8pXG4qRG9uZTogbG9naW4gZXJyb3IsIHBsYWNlaG9sZGVyIGFuZCB2YWx1ZSBzaG93IHRvZ2V0aGVyXG4qIHNpbXBsZSBkYXRhIG1vZGU6XG4gICAgKiByZW1vdGUgdXBzZXJ0IGFuZCByZW1vdmUgZGlyZWN0bHlcbiAgICAqIGxvY2FsIGNhY2hlIGZvciBzZWFyY2hcbiogQ2Fubm90IHJlYWQgcHJvcGVydHkgJ2NvbXBvbmVudERpZEVudGVyJyBvZiB1bmRlZmluZWRcbipEb25lOiBEYXRlIHNob3cgYXMgbWVhbmluZ2Z1bFxuKiBkYXRhIGxpc3QgdG8gc2hvdyBvYmplY3QgZmllbGQgW29iamVjdF09PnsuLi59XG4qL1xuIl19