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
				return state.ui.data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwidHlwZSIsInBheWxvYWQiLCJhcHAiLCJBUFBTX0ZFVENIRUQiLCJkaXNwYXRjaCIsImFwcHMiLCJTY2hlbWEiLCJlbnRpdGllcyIsIlNXSVRDSF9BUFBMSUNBVElPTiIsImdldFN0YXRlIiwiX25hbWUiLCJpZHMiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXgiLCJpbmRleE9mIiwibGVuZ3RoIiwiY3VycmVudCIsIlJFRFVDRVIiLCJzdGF0ZSIsIl9pZCIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJvbiIsInJvdXRlcyIsInBhcmFtcyIsInJvdXRlciIsImNvbnRleHQiLCJuYW1lIiwicHVzaCIsImluaXRBcHBOYW1lIiwiY2hpbGRyZW4iLCJhcHBJZCIsImluaXQiLCJ0aGVuIiwicXVpY2tTd2l0Y2hTdHlsZSIsImZvbnRTaXplIiwiZmluZCIsImEiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIk1haW4iLCJyZW5kZXIiLCJ1aSIsImNsb3VkQ29kZSIsImRhdGEiLCJsb2ciLCJ2YWx1ZXMiLCJ1c2VyIiwicWlsaUFwcCIsImNsb3VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBZ0ZBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQWxHQUEsUUFBUSxxQkFBUjtJQVdPQyxLLFFBQUFBLEs7OztBQUVQLElBQU1DLFNBQU8sV0FBYjs7QUFFQSxJQUFNQyxTQUFPO0FBQ1pDLGNBQVk7QUFBQSxTQUFNLEVBQUNDLGFBQVVILE1BQVYsaUJBQUQsRUFBZ0NJLFNBQVEsRUFBQ0MsUUFB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TkQ7QUExQkcsQ0FEYSxFQXdDaEIscUJBQUt0RCxNQUFMLEVBQWFxQixPQUFiLEdBQ0M7QUFDQTRCLEtBQUcsK0JBQ0YsRUFBQzVDLEtBQUksY0FBTWdCLE9BQVgsRUFERSxFQUVELEVBQUMrQixLQUFJLGNBQU0vQixPQUFYLEVBRkMsRUFHRCxFQUFDbUMsT0FBTSxnQkFBUW5DLE9BQWYsRUFIQyxFQUlELEVBQUM4QixNQUFLLGVBQU85QixPQUFiLEVBSkM7QUFESCxDQURELENBeENnQixDQUFYOztBQW9EUCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3RvcnksIFJlZGlyZWN0LCBJbmRleFJlZGlyZWN0LCBMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCB7aW5pdCxVc2VyLFFpbGlBcHAsIFVJLCBlbmhhbmNlZENvbWJpbmVSZWR1Y2VycywgY29tcGFjdH0gZnJvbSAnLidcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5cbmNvbnN0IHtFbXB0eX09VUlcblxuY29uc3QgRE9NQUlOPVwicWlsaUFkbWluXCJcblxuY29uc3QgQUNUSU9OPXtcblx0QVBQX0NIQU5HRUQ6YXBwPT4oe3R5cGU6YEBAJHtET01BSU59L0FQUF9DSEFOR0VEYCxwYXlsb2FkOnthcHB9fSlcblx0LEFQUFNfRkVUQ0hFRDogYXBwcz0+ZGlzcGF0Y2g9Pntcblx0XHRkaXNwYXRjaCh7dHlwZTonTk9STUFMSVpFRF9EQVRBJyxwYXlsb2FkOm5vcm1hbGl6ZShhcHBzLGFycmF5T2YoQXBwbGljYXRpb24uU2NoZW1hKSkuZW50aXRpZXN9KVxuXHR9XG5cdCxTV0lUQ0hfQVBQTElDQVRJT046IGFwcD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IGFwcHM9Z2V0U3RhdGUoKS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV1cblx0XHRsZXQgaWRzPU9iamVjdC5rZXlzKGFwcHMpXG5cdFx0bGV0IGluZGV4PWlkc1soaWRzLmluZGV4T2YoYXBwKSsxKSVpZHMubGVuZ3RoXVxuXHRcdEFwcGxpY2F0aW9uLmN1cnJlbnQ9YXBwc1tpbmRleF1cblx0fVxufVxuXG5jb25zdCBSRURVQ0VSPShzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9BUFBfQ0hBTkdFRGA6XG5cdFx0cmV0dXJuIHthcHA6cGF5bG9hZC5hcHAuX2lkfVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5jbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXHRcdEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLGFwcD0+e1xuXHRcdFx0Y29uc3Qge2Rpc3BhdGNoLHJvdXRlcyxwYXJhbXN9PXRoaXMucHJvcHNcblx0XHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkFQUF9DSEFOR0VEKGFwcCkpXG5cdFx0XHRpZihyb3V0ZXNbMV0gJiYgcm91dGVzWzFdLm5hbWU9PSdhcHAnICYmIHBhcmFtcy5uYW1lIT1hcHAubmFtZSlcblx0XHRcdFx0cm91dGVyLnB1c2goYC9hcHAvJHthcHAubmFtZX1gKVxuXHRcdH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHthcHAsIGluaXRBcHBOYW1lLCBjaGlsZHJlbiwgZGlzcGF0Y2gsIHJvdXRlc309dGhpcy5wcm9wc1xuXHRcdGxldCBwcm9wcz17XG5cdFx0XHRhcHBJZDogXCJxaWxpQWRtaW5cIlxuXHRcdFx0LGluaXQ6YT0+QXBwbGljYXRpb24uaW5pdChpbml0QXBwTmFtZSkudGhlbihhcHBzPT5kaXNwYXRjaChBQ1RJT04uQVBQU19GRVRDSEVEKGFwcHMpKSlcblx0XHR9XG5cdFx0aWYoIWFwcCl7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UWlsaUFwcCB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdDxFbXB0eSBpY29uPXs8TG9nby8+fT5cblx0XHRcdFx0XHRcdDxMaW5rIHRvPVwiYXBwXCI+Y2xpY2sgdG8gY3JlYXRlIHlvdXIgZmlyc3QgcWlsaSBhcHA8L0xpbms+XG5cdFx0XHRcdFx0PC9FbXB0eT5cblx0XHRcdFx0PC9RaWxpQXBwPlxuXHRcdFx0KVxuXHRcdH1cblxuXHRcdGxldCBxdWlja1N3aXRjaFN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9XG5cdFx0aWYocm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpKVxuXHRcdFx0cXVpY2tTd2l0Y2hTdHlsZS5kaXNwbGF5PVwibm9uZVwiXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxRaWxpQXBwIHsuLi5wcm9wc30+XG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIgbWluaT17dHJ1ZX1cblx0XHRcdFx0XHRzdHlsZT17cXVpY2tTd2l0Y2hTdHlsZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU1dJVENIX0FQUExJQ0FUSU9OKGFwcC5faWQpKX0+XG5cdFx0XHRcdFx0e2FwcC5uYW1lfVxuXHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuXHRcdFx0XHR7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0aW5pdEFwcE5hbWU6bnVsbFxuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL2Rhc2hib2FyZCdcbmltcG9ydCBBcHBVSSwge0NyZWF0b3J9IGZyb20gJy4vYXBwJ1xuaW1wb3J0IENsb3VkVUkgZnJvbSAnLi9jbG91ZCdcbmltcG9ydCBEYXRhVUkgZnJvbSAnLi9kYXRhJ1xuaW1wb3J0IExvZ1VJIGZyb20gJy4vbG9nJ1xuaW1wb3J0IE15VUkgZnJvbSBcIi4vbXlcIlxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwiLi9zZXR0aW5nXCJcbmltcG9ydCBQcm9maWxlVUkgZnJvbSBcIi4vdXNlci1wcm9maWxlXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5cbmV4cG9ydCBjb25zdCBNYWluPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIlxuXHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHthcHA6Y29tcGFjdChBcHBsaWNhdGlvbi5jdXJyZW50LFwiX2lkXCIsXCJuYW1lXCIpfSkpKFFpbGlDb25zb2xlKX0+XG5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFwcC86bmFtZVwiIG5hbWU9XCJhcHBcIlxuXHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KChzdGF0ZSx7cGFyYW1zOntuYW1lfX0pPT4oe2FwcDpjb21wYWN0KEFwcGxpY2F0aW9uLmN1cnJlbnQsXCJuYW1lXCIsXCJ1bmFtZVwiLFwiYXBpS2V5XCIpLG5hbWUsLi4uc3RhdGUudWkuYXBwfSkpKEFwcFVJKX1cblx0XHRcdG9uRW50ZXI9eyh7cGFyYW1zOntuYW1lfX0pPT5RaWxpQ29uc29sZS5kZWZhdWx0UHJvcHMuaW5pdEFwcE5hbWU9bmFtZX1cblx0XHRcdC8+XG5cdFx0PFJvdXRlIHBhdGg9XCJhcHBcIiBjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+c3RhdGUudWkuYXBwKShDcmVhdG9yKX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7Y2xvdWRDb2RlOnN0YXRlW0RPTUFJTl0uYXBwLmNsb3VkQ29kZX0pKShDbG91ZFVJKX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiXG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PnN0YXRlLnVpLmRhdGEpKERhdGFVSSl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89e2Ake1VzZXIuX25hbWV9YH0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bmFtZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImxvZ1wiXG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PnN0YXRlLnVpLmxvZykoTG9nVUkpfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiYWxsXCIvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bGV2ZWxcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZVxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YXBwczpPYmplY3QudmFsdWVzKHN0YXRlLmVudGl0aWVzW0FwcGxpY2F0aW9uLl9uYW1lXSl9KSkoTXlVSSl9XG5cdFx0XHRcdGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe3VzZXI6c3RhdGUucWlsaUFwcC51c2VyfSkpKFByb2ZpbGVVSSl9XG5cdFx0XHRcdGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXG4gICAgPC9Sb3V0ZT4pXG5cdCxbICB7W0RPTUFJTl06UkVEVUNFUn1cblx0XHQse1xuXHRcdFx0dWk6ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoXG5cdFx0XHRcdHthcHA6QXBwVUkuUkVEVUNFUn1cblx0XHRcdFx0LHtsb2c6TG9nVUkuUkVEVUNFUn1cblx0XHRcdFx0LHtjbG91ZDpDbG91ZFVJLlJFRFVDRVJ9XG5cdFx0XHRcdCx7ZGF0YTpEYXRhVUkuUkVEVUNFUn1cblx0XHRcdClcblx0XHR9XVxuKVxuXG5cbi8qKlxuQFRvZG86XG4qRG9uZTogYWZ0ZXIgYWRkaW5nIG5ldyBhcHBsaWNhdGlvblxuICAgIGFwcGxpY2F0aW9uIGxpc3QgZG9lc24ndCByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICBsb2NhbCBzdG9yYWdlIHdpdGhvdXQgQWxsIGZpZWxkcywgc3VjaCBhcyB3aXRob3V0IGFwcGxpY2F0aW9uIG5hbWUsIC4uLiwgYmVjYXVzZSBzZXJ2ZXIgcmV0dXJuZWQgb25seSBfaWQsIGNyZWF0ZWRBdCwgLi4uXG4qRG9uZTogYWZ0ZXIgYXBwbGljYXRpb24gZGVsZXRpb24sIFVJIHNob3VsZCBnbyB0byAvIGV2ZW4gd2l0aCBlcnJvclxuKkRvbmU6IGVycm9yIGhhcHBlbnMsIFVJIHNob3VsZCBub3QgYmUgRW1wdHlcbipEb24ndDogdXNlIDxMaW5rLz4gcmF0aGVyIHRoYW4gdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG9cbioqRG9uZTogTmV2ZXIgZW1wdHkgVUlcbioqRG9uZTogRmxvYXRBY3Rpb25CdXR0b24gcG9zaXRpb24gd2hlbiB2aWV3IHdpZHRoIGlzIDk2MFxuXG4qIHRvbyBzbWFsbC16b29tIHNpemUgaW4gbW9iaWxlIGJyb3dzZXJcbiogZmlyc3QgZm9jdXMgb24gZm9ybSwgY2xvdWQgVUlcbiogYmFja2dyb3VuZCB0byB1cGxvYWQgdG8gYmFja2VuZFxuICAgIGRvbmU6IFdlYlNRTERiIGlzIGRvbmVcbiAgICAqKiogc3FsaXRlXG4gICAgZG9uZTogKioqIGFmdGVyIHJlbW92ZSBhcHAsIGxvY2FsIGNhY2hlIHNob3VsZCBiZSByZW1vdmVkIHRvb1xuKiogdGV4dGZpZWxkIGNhbid0IGJlIGNoYW5nZWQgKHdoaWNoPz8pXG4qRG9uZTogbG9naW4gZXJyb3IsIHBsYWNlaG9sZGVyIGFuZCB2YWx1ZSBzaG93IHRvZ2V0aGVyXG4qIHNpbXBsZSBkYXRhIG1vZGU6XG4gICAgKiByZW1vdGUgdXBzZXJ0IGFuZCByZW1vdmUgZGlyZWN0bHlcbiAgICAqIGxvY2FsIGNhY2hlIGZvciBzZWFyY2hcbiogQ2Fubm90IHJlYWQgcHJvcGVydHkgJ2NvbXBvbmVudERpZEVudGVyJyBvZiB1bmRlZmluZWRcbipEb25lOiBEYXRlIHNob3cgYXMgbWVhbmluZ2Z1bFxuKiBkYXRhIGxpc3QgdG8gc2hvdyBvYmplY3QgZmllbGQgW29iamVjdF09PnsuLi59XG4qL1xuIl19