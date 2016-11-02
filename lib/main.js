"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Main = undefined;

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
	},
	APPS_FETCHED: function APPS_FETCHED(apps) {
		return { type: "@@" + DOMAIN + "/APPS_FETCHED", payload: (0, _normalizr.normalize)(apps, (0, _normalizr.arrayOf)(_app2.default.Schema)) };
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
		case "@@" + DOMAIN + "/APPS_FETCHED":
			return Object.assign({}, state, { entities: payload });
	}
	return state;
});

var QiliConsole = function (_Component) {
	_inherits(QiliConsole, _Component);

	function QiliConsole(props) {
		_classCallCheck(this, QiliConsole);

		var _this = _possibleConstructorReturn(this, (QiliConsole.__proto__ || Object.getPrototypeOf(QiliConsole)).call(this, props));

		console.log("/ constructed");
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

	_createClass(QiliConsole, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			console.log("/ did mount");
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps() {
			console.log("/ receiving props");
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props;
			var app = _props.app;
			var initAppName = _props.initAppName;
			var children = _props.children;
			var dispatch = _props.dispatch;

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

	return QiliConsole;
}(_react.Component);

QiliConsole.defaultProps = {
	initAppName: null
};


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
	{ path: "/", component: (0, _reactRedux.connect)(function (state) {
			return { app: state[DOMAIN].app };
		})(QiliConsole) },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: "app/:name", name: "app", component: (0, _reactRedux.connect)(function (state) {
			return state.ui;
		})(_app4.default),
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
), [REDUCER, _app4.default.REDUCER, _log2.default.REDUCER, _cloud2.default.REDUCER, _userProfile2.default.REDUCER, _data2.default.REDUCER]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwidHlwZSIsInBheWxvYWQiLCJhcHAiLCJBUFBTX0ZFVENIRUQiLCJhcHBzIiwiU2NoZW1hIiwiUkVEVUNFUiIsInN0YXRlIiwiT2JqZWN0IiwiYXNzaWduIiwiZW50aXRpZXMiLCJRaWxpQ29uc29sZSIsInByb3BzIiwiY29uc29sZSIsImxvZyIsIm9uIiwiZGlzcGF0Y2giLCJyb3V0ZXMiLCJwYXJhbXMiLCJyb3V0ZXIiLCJuYW1lIiwicmVwbGFjZSIsImluaXRBcHBOYW1lIiwiY2hpbGRyZW4iLCJhcHBJZCIsImluaXQiLCJ0aGVuIiwic2VydmljZSIsImNvbnRleHR1YWwiLCJmaW5kIiwiYSIsImRlZmF1bHRQcm9wcyIsIkN1cnJlbnRBcHAiLCJvcGVuIiwiZm9udFNpemUiLCJkaXNwbGF5IiwidW5kZWZpbmVkIiwiYWxsIiwibGVuIiwibGVuZ3RoIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJfaWQiLCJ0YXJnZXQiLCJjdXJyZW50IiwiTWFpbiIsInJlbmRlciIsInVpIiwiV3JhcHBlZENvbXBvbmVudCIsIl9uYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQW1HQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFySEFBLFFBQVEscUJBQVI7SUFXT0MsSyxRQUFBQSxLOzs7QUFFUCxJQUFNQyxTQUFPLE1BQWI7O0FBRUEsSUFBTUMsU0FBTztBQUNaQyxjQUFZLDBCQUFLO0FBQ2hCLFNBQU8sRUFBQ0MsYUFBVUgsTUFBVixpQkFBRCxFQUFnQ0ksU0FBUSxFQUFDQyxRQUFELEVBQXhDLEVBQVA7QUFDQSxFQUhXO0FBSVhDLGVBQWMsNEJBQU07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QSxPQUFUM0IsSUFBUyxTQUFqQkYsTUFBaUIsQ0FBVEUsSUFBUzs7QUFDM0IsT0FBRyxDQUFDLGNBQVl3QixPQUFoQixFQUF3QjtBQUN2QmpDLGdCQUFZcUMsZ0JBQVosQ0FBNkJqQixZQUE3QixDQUEwQ1QsV0FBMUMsR0FBc0RGLElBQXREO0FBQ0E7QUFDRDtBQUxJLEdBSEg7QUFVSCxxREFBTyxNQUFLLEtBQVosRUFBa0IsWUFBWSxLQUE5QixFQUFxQyx3QkFBckMsR0FWRztBQVlHLHFEQUFPLE1BQUssT0FBWixFQUFvQiwwQkFBcEIsR0FaSDtBQWNHO0FBQUE7QUFBQSxJQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkI7QUFDSSw4REFBZSxTQUFPLE9BQUs2QixLQUEzQixHQURKO0FBRUksc0RBQU8sTUFBSyxPQUFaO0FBRkosRUFkSDtBQW1CRztBQUFBO0FBQUEsSUFBTyxNQUFLLEtBQVosRUFBa0Isd0JBQWxCO0FBQ0ksOERBQWUsSUFBRyxLQUFsQixHQURKO0FBRUksc0RBQU8sTUFBSyxRQUFaO0FBRkosRUFuQkg7QUF3Qkg7QUFBQTtBQUFBLElBQU8sTUFBSyxJQUFaO0FBQ0MsMkRBQVksdUJBQVosRUFBNkIsWUFBWSxLQUF6QyxHQUREO0FBRUMsc0RBQU8sTUFBSyxTQUFaLEVBQXNCLDRCQUF0QixHQUZEO0FBR0Msc0RBQU8sTUFBSyxTQUFaLEVBQXNCLGdDQUF0QixFQUE0QyxZQUFZLEtBQXhEO0FBSEQ7QUF4QkcsQ0FEYSxFQWlDaEIsQ0FBQzNDLE9BQUQsRUFBUyxjQUFNQSxPQUFmLEVBQXVCLGNBQU1BLE9BQTdCLEVBQXFDLGdCQUFRQSxPQUE3QyxFQUFxRCxzQkFBVUEsT0FBL0QsRUFBdUUsZUFBT0EsT0FBOUUsQ0FqQ2dCLENBQVg7O0FBcUNQIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeSwgUmVkaXJlY3QsIEluZGV4UmVkaXJlY3QsIExpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCwgVUksIFBvc2l0aW9ufSBmcm9tICcuJ1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jb25zdCBET01BSU49XCJtYWluXCJcblxuY29uc3QgQUNUSU9OPXtcblx0QVBQX0NIQU5HRUQ6YXBwPT57XG5cdFx0cmV0dXJuIHt0eXBlOmBAQCR7RE9NQUlOfS9BUFBfQ0hBTkdFRGAscGF5bG9hZDp7YXBwfX1cblx0fVxuXHQsQVBQU19GRVRDSEVEOiBhcHBzPT57XG5cdFx0cmV0dXJuIHt0eXBlOmBAQCR7RE9NQUlOfS9BUFBTX0ZFVENIRURgLHBheWxvYWQ6bm9ybWFsaXplKGFwcHMsYXJyYXlPZihBcHBsaWNhdGlvbi5TY2hlbWEpKX1cblx0fVxufVxuXG5jb25zdCBSRURVQ0VSPXtcblx0W0RPTUFJTl06IChzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vQVBQX0NIQU5HRURgOlxuXHRcdFx0cmV0dXJuIHthcHA6cGF5bG9hZC5hcHB9XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vQVBQU19GRVRDSEVEYDpcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtlbnRpdGllczpwYXlsb2FkfSlcblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuY2xhc3MgUWlsaUNvbnNvbGUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblx0XHRjb25zb2xlLmxvZyhcIi8gY29uc3RydWN0ZWRcIilcblx0XHRBcHBsaWNhdGlvbi5vbignY2hhbmdlJyxhcHA9Pntcblx0XHRcdGNvbnN0IHtkaXNwYXRjaCxyb3V0ZXMscGFyYW1zLHJvdXRlcn09dGhpcy5wcm9wc1xuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkFQUF9DSEFOR0VEKGFwcCkpXG5cdFx0XHRpZihyb3V0ZXNbMV0gJiYgcm91dGVzWzFdLm5hbWU9PSdhcHAnICYmIHBhcmFtcy5uYW1lIT1hcHAubmFtZSlcblx0XHRcdFx0cm91dGVyLnJlcGxhY2UoYC9hcHAvJHthcHAubmFtZX1gKVxuXHRcdH0pXG4gICAgfVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc29sZS5sb2coXCIvIGRpZCBtb3VudFwiKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpe1xuXHRcdGNvbnNvbGUubG9nKFwiLyByZWNlaXZpbmcgcHJvcHNcIilcblx0fVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHthcHAsIGluaXRBcHBOYW1lLCBjaGlsZHJlbiwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRsZXQgcHJvcHM9e1xuXHRcdFx0YXBwSWQ6IFwicWlsaUFkbWluXCJcblx0XHRcdCwgaW5pdDphPT5BcHBsaWNhdGlvbi5pbml0KGluaXRBcHBOYW1lKS50aGVuKGFwcHM9PmRpc3BhdGNoKEFDVElPTi5BUFBTX0ZFVENIRUQoYXBwcykpKVxuXHRcdFx0LCBzZXJ2aWNlOlwiaHR0cDovL2xvY2FsaG9zdDo5MDgwLzEvXCJcblx0XHR9XG5cdFx0aWYoIWFwcCl7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UWlsaUFwcCB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdDxFbXB0eSBpY29uPXs8TG9nby8+fT5cblx0XHRcdFx0XHRcdDxMaW5rIHRvPVwiYXBwXCI+Y2xpY2sgdG8gY3JlYXRlIHlvdXIgZmlyc3QgcWlsaSBhcHA8L0xpbms+XG5cdFx0XHRcdFx0PC9FbXB0eT5cblx0XHRcdFx0PC9RaWxpQXBwPlxuXHRcdFx0KVxuXHRcdH1cblxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UWlsaUFwcCB7Li4ucHJvcHN9PlxuXHRcdFx0XHQ8Q3VycmVudEFwcCBuYW1lPXthcHAubmFtZX0gYXBwPXthcHB9IG9wZW49eyEhYXBwICYmIHRoaXMuY29udGV4dHVhbCgpfS8+XG5cdFx0XHRcdHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvUWlsaUFwcD5cbiAgICAgICAgKVxuICAgIH1cblxuXHRjb250ZXh0dWFsKCl7XG5cdFx0Y29uc3Qge3JvdXRlc309dGhpcy5wcm9wc1xuXHRcdHJldHVybiAhISFyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSlcblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGluaXRBcHBOYW1lOm51bGxcblx0fVxufVxuXG5jb25zdCBDdXJyZW50QXBwPSh7bmFtZSwgYXBwLCBvcGVufSk9Pihcblx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIiBtaW5pPXt0cnVlfVxuXHRcdHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwiLCBkaXNwbGF5Om9wZW4gPyB1bmRlZmluZWQgOiBcIm5vbmVcIiB9fVxuXHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdGxldCBhcHBzPUFwcGxpY2F0aW9uLmFsbCwgbGVuPWFwcHMubGVuZ3RoXG5cdFx0XHRpZihsZW4+MSl7XG5cdFx0XHRcdGxldCBpbmRleD1hcHBzLmZpbmRJbmRleChhPT5hLl9pZD09YXBwLl9pZClcblx0XHRcdFx0bGV0IHRhcmdldD1hcHBzWyhpbmRleCsxKSAlIGxlbl1cblxuXHRcdFx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PXRhcmdldFxuXHRcdFx0fVxuXHRcdH19PlxuXHRcdHtuYW1lfVxuXHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuKVxuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkJ1xuaW1wb3J0IEFwcFVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9hcHAnXG5pbXBvcnQgQ2xvdWRVSSBmcm9tICcuL2Nsb3VkJ1xuaW1wb3J0IERhdGFVSSBmcm9tICcuL2RhdGEnXG5pbXBvcnQgTG9nVUkgZnJvbSAnLi9sb2cnXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gXCIuL3NldHRpbmdcIlxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwiLi91c2VyLXByb2ZpbGVcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmV4cG9ydCBjb25zdCBNYWluPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YXBwOnN0YXRlW0RPTUFJTl0uYXBwfSkpKFFpbGlDb25zb2xlKX0+XG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhcHAvOm5hbWVcIiBuYW1lPVwiYXBwXCIgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5zdGF0ZS51aSkoQXBwVUkpfVxuXHRcdFx0b25FbnRlcj17KHtwYXJhbXM6e25hbWV9fSk9Pntcblx0XHRcdFx0aWYoIUFwcGxpY2F0aW9uLmN1cnJlbnQpe1xuXHRcdFx0XHRcdFFpbGlDb25zb2xlLldyYXBwZWRDb21wb25lbnQuZGVmYXVsdFByb3BzLmluaXRBcHBOYW1lPW5hbWVcblx0XHRcdFx0fVxuXHRcdFx0fX1cblx0XHRcdC8+XG5cdFx0PFJvdXRlIHBhdGg9XCJhcHBcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtDcmVhdG9yfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjbG91ZFwiIGNvbXBvbmVudD17Q2xvdWRVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiIGNvbXBvbmVudD17RGF0YVVJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOm5hbWVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJsb2dcIiBjb21wb25lbnQ9e0xvZ1VJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiYWxsXCIvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bGV2ZWxcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e015VUl9IGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdDwvUm91dGU+XG5cblxuICAgIDwvUm91dGU+KVxuXHQsW1JFRFVDRVIsQXBwVUkuUkVEVUNFUixMb2dVSS5SRURVQ0VSLENsb3VkVUkuUkVEVUNFUixQcm9maWxlVUkuUkVEVUNFUixEYXRhVUkuUkVEVUNFUl1cbilcblxuXG4vKipcbkBUb2RvOlxuKkRvbmU6IGFmdGVyIGFkZGluZyBuZXcgYXBwbGljYXRpb25cbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgbG9jYWwgc3RvcmFnZSB3aXRob3V0IEFsbCBmaWVsZHMsIHN1Y2ggYXMgd2l0aG91dCBhcHBsaWNhdGlvbiBuYW1lLCAuLi4sIGJlY2F1c2Ugc2VydmVyIHJldHVybmVkIG9ubHkgX2lkLCBjcmVhdGVkQXQsIC4uLlxuKkRvbmU6IGFmdGVyIGFwcGxpY2F0aW9uIGRlbGV0aW9uLCBVSSBzaG91bGQgZ28gdG8gLyBldmVuIHdpdGggZXJyb3JcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XG4qRG9uJ3Q6IHVzZSA8TGluay8+IHJhdGhlciB0aGFuIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvXG4qKkRvbmU6IE5ldmVyIGVtcHR5IFVJXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcblxuKiB0b28gc21hbGwtem9vbSBzaXplIGluIG1vYmlsZSBicm93c2VyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXG4qIGJhY2tncm91bmQgdG8gdXBsb2FkIHRvIGJhY2tlbmRcbiAgICBkb25lOiBXZWJTUUxEYiBpcyBkb25lXG4gICAgKioqIHNxbGl0ZVxuICAgIGRvbmU6ICoqKiBhZnRlciByZW1vdmUgYXBwLCBsb2NhbCBjYWNoZSBzaG91bGQgYmUgcmVtb3ZlZCB0b29cbioqIHRleHRmaWVsZCBjYW4ndCBiZSBjaGFuZ2VkICh3aGljaD8/KVxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxuKiBzaW1wbGUgZGF0YSBtb2RlOlxuICAgICogcmVtb3RlIHVwc2VydCBhbmQgcmVtb3ZlIGRpcmVjdGx5XG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXG4qIENhbm5vdCByZWFkIHByb3BlcnR5ICdjb21wb25lbnREaWRFbnRlcicgb2YgdW5kZWZpbmVkXG4qRG9uZTogRGF0ZSBzaG93IGFzIG1lYW5pbmdmdWxcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxuKi9cbiJdfQ==