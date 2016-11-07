"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Main = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _values = require("babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

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

require('../style/index.less');
var Empty = _.UI.Empty;


var DOMAIN = "qiliAdmin";

var ACTION = {
	APP_CHANGED: function APP_CHANGED(app) {
		return { type: "@@" + DOMAIN + "/APP_CHANGED", payload: { app: app } };
	},
	APPS_FETCHED: function APPS_FETCHED(apps) {
		return function (dispatch) {
			var normalized = (0, _normalizr.normalize)(apps, (0, _normalizr.arrayOf)(_app2.default.schema));
			dispatch((0, _.ENTITIES)(normalized.entities));
		};
	},
	SWITCH_APPLICATION: function SWITCH_APPLICATION(app) {
		return function (dispatch, getState) {
			var apps = getState().entities[_app2.default._name];
			var ids = (0, _keys2.default)(apps);
			var index = ids[(ids.indexOf(app) + 1) % ids.length];
			_app2.default.current = apps[index];
		};
	}
};

var REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/APP_CHANGED":
			return { app: payload.app._id };
	}
	return state;
};

var QiliConsole = function (_Component) {
	(0, _inherits3.default)(QiliConsole, _Component);

	function QiliConsole(props) {
		(0, _classCallCheck3.default)(this, QiliConsole);

		var _this = (0, _possibleConstructorReturn3.default)(this, (QiliConsole.__proto__ || (0, _getPrototypeOf2.default)(QiliConsole)).call(this, props));

		_app2.default.on('change', function (app) {
			var _this$props = _this.props,
			    dispatch = _this$props.dispatch,
			    routes = _this$props.routes,
			    params = _this$props.params;
			var router = _this.context.router;

			dispatch(ACTION.APP_CHANGED(app));
			if (routes[1] && routes[1].name == 'app' && params.name != app.name) router.push("/app/" + app.name);
		});
		return _this;
	}

	(0, _createClass3.default)(QiliConsole, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    app = _props.app,
			    initAppName = _props.initAppName,
			    children = _props.children,
			    dispatch = _props.dispatch,
			    routes = _props.routes;

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
			return (0, _extends3.default)({ app: (0, _.compact)(_app2.default.current, "name", "uname", "apiKey"), name: name }, state.ui.app);
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
				return (0, _extends3.default)({}, state.ui.data, { app: state[DOMAIN].app._id });
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
				return { apps: (0, _values2.default)(state.entities[_app2.default._name]) };
			})(_my2.default),
			contextual: false }),
		_react2.default.createElement(_reactRouter.Route, { path: "setting", component: _setting2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: "profile", component: _userProfile2.default, contextual: false })
	)
), [(0, _defineProperty3.default)({}, DOMAIN, REDUCER), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwidHlwZSIsInBheWxvYWQiLCJhcHAiLCJBUFBTX0ZFVENIRUQiLCJub3JtYWxpemVkIiwiYXBwcyIsInNjaGVtYSIsImRpc3BhdGNoIiwiZW50aXRpZXMiLCJTV0lUQ0hfQVBQTElDQVRJT04iLCJnZXRTdGF0ZSIsIl9uYW1lIiwiaWRzIiwiaW5kZXgiLCJpbmRleE9mIiwibGVuZ3RoIiwiY3VycmVudCIsIlJFRFVDRVIiLCJzdGF0ZSIsIl9pZCIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJvbiIsInJvdXRlcyIsInBhcmFtcyIsInJvdXRlciIsImNvbnRleHQiLCJuYW1lIiwicHVzaCIsImluaXRBcHBOYW1lIiwiY2hpbGRyZW4iLCJhcHBJZCIsImluaXQiLCJ0aGVuIiwicXVpY2tTd2l0Y2hTdHlsZSIsImZvbnRTaXplIiwiZmluZCIsImEiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIk1haW4iLCJyZW5kZXIiLCJ1aSIsImNsb3VkQ29kZSIsImRhdGEiLCJsb2ciLCJjbG91ZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBaUZBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFuR0FBLFFBQVEscUJBQVI7SUFXT0MsSyxRQUFBQSxLOzs7QUFFUCxJQUFNQyxTQUFPLFdBQWI7O0FBRUEsSUFBTUMsU0FBTztBQUNaQyxjQUFZO0FBQUEsU0FBTSxFQUFDQyxhQUFVSCxNQUFWLGlCQUFELEVBQWdDSSxTQUFRLEVBQUNDLFFBQUQsRUFB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QUNBNEIsS0FBRywrQkFDRixFQUFDM0MsS0FBSSxjQUFNZSxPQUFYLEVBREUsRUFFRCxFQUFDK0IsS0FBSSxjQUFNL0IsT0FBWCxFQUZDLEVBR0QsRUFBQ2dDLE9BQU0sZ0JBQVFoQyxPQUFmLEVBSEMsRUFJRCxFQUFDOEIsTUFBSyxlQUFPOUIsT0FBYixFQUpDO0FBREgsQ0FERCxDQXRDZ0IsQ0FBWDs7QUFrRFAiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7bm9ybWFsaXplLGFycmF5T2Z9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLCBVSSwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMsIGNvbXBhY3QsIEVOVElUSUVTfSBmcm9tICcuJ1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jb25zdCBET01BSU49XCJxaWxpQWRtaW5cIlxuXG5jb25zdCBBQ1RJT049e1xuXHRBUFBfQ0hBTkdFRDphcHA9Pih7dHlwZTpgQEAke0RPTUFJTn0vQVBQX0NIQU5HRURgLHBheWxvYWQ6e2FwcH19KVxuXHQsQVBQU19GRVRDSEVEOiBhcHBzPT5kaXNwYXRjaD0+e1xuXHRcdGxldCBub3JtYWxpemVkPW5vcm1hbGl6ZShhcHBzLGFycmF5T2YoQXBwbGljYXRpb24uc2NoZW1hKSlcblx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemVkLmVudGl0aWVzKSlcblx0fVxuXHQsU1dJVENIX0FQUExJQ0FUSU9OOiBhcHA9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBhcHBzPWdldFN0YXRlKCkuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdXG5cdFx0bGV0IGlkcz1PYmplY3Qua2V5cyhhcHBzKVxuXHRcdGxldCBpbmRleD1pZHNbKGlkcy5pbmRleE9mKGFwcCkrMSklaWRzLmxlbmd0aF1cblx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PWFwcHNbaW5kZXhdXG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vQVBQX0NIQU5HRURgOlxuXHRcdHJldHVybiB7YXBwOnBheWxvYWQuYXBwLl9pZH1cblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgUWlsaUNvbnNvbGUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblx0XHRBcHBsaWNhdGlvbi5vbignY2hhbmdlJyxhcHA9Pntcblx0XHRcdGNvbnN0IHtkaXNwYXRjaCxyb3V0ZXMscGFyYW1zfT10aGlzLnByb3BzXG5cdFx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5BUFBfQ0hBTkdFRChhcHApKVxuXHRcdFx0aWYocm91dGVzWzFdICYmIHJvdXRlc1sxXS5uYW1lPT0nYXBwJyAmJiBwYXJhbXMubmFtZSE9YXBwLm5hbWUpXG5cdFx0XHRcdHJvdXRlci5wdXNoKGAvYXBwLyR7YXBwLm5hbWV9YClcblx0XHR9KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7YXBwLCBpbml0QXBwTmFtZSwgY2hpbGRyZW4sIGRpc3BhdGNoLCByb3V0ZXN9PXRoaXMucHJvcHNcblx0XHRsZXQgcHJvcHM9e1xuXHRcdFx0YXBwSWQ6IFwicWlsaUFkbWluXCJcblx0XHRcdCxpbml0OmE9PkFwcGxpY2F0aW9uLmluaXQoaW5pdEFwcE5hbWUpLnRoZW4oYXBwcz0+ZGlzcGF0Y2goQUNUSU9OLkFQUFNfRkVUQ0hFRChhcHBzKSkpXG5cdFx0fVxuXHRcdGlmKCFhcHApe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0XHQ8RW1wdHkgaWNvbj17PExvZ28vPn0+XG5cdFx0XHRcdFx0XHQ8TGluayB0bz1cImFwcFwiPmNsaWNrIHRvIGNyZWF0ZSB5b3VyIGZpcnN0IHFpbGkgYXBwPC9MaW5rPlxuXHRcdFx0XHRcdDwvRW1wdHk+XG5cdFx0XHRcdDwvUWlsaUFwcD5cblx0XHRcdClcblx0XHR9XG5cblx0XHRsZXQgcXVpY2tTd2l0Y2hTdHlsZT17Zm9udFNpemU6XCJ4eC1zbWFsbFwifVxuXHRcdGlmKHJvdXRlcy5maW5kKGE9PmEuY29udGV4dHVhbD09PWZhbHNlKSlcblx0XHRcdHF1aWNrU3dpdGNoU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UWlsaUFwcCB7Li4ucHJvcHN9PlxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiIG1pbmk9e3RydWV9XG5cdFx0XHRcdFx0c3R5bGU9e3F1aWNrU3dpdGNoU3R5bGV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNXSVRDSF9BUFBMSUNBVElPTihhcHAuX2lkKSl9PlxuXHRcdFx0XHRcdHthcHAubmFtZX1cblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cblx0XHRcdFx0e2NoaWxkcmVufVxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGluaXRBcHBOYW1lOm51bGxcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG5cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQnXG5pbXBvcnQgQXBwVUksIHtDcmVhdG9yfSBmcm9tICcuL2FwcCdcbmltcG9ydCBDbG91ZFVJIGZyb20gJy4vY2xvdWQnXG5pbXBvcnQgRGF0YVVJIGZyb20gJy4vZGF0YSdcbmltcG9ydCBMb2dVSSBmcm9tICcuL2xvZydcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcIi4vc2V0dGluZ1wiXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuXG5leHBvcnQgY29uc3QgTWFpbj1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCJcblx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YXBwOmNvbXBhY3QoQXBwbGljYXRpb24uY3VycmVudCxcIl9pZFwiLFwibmFtZVwiKX0pKShRaWxpQ29uc29sZSl9PlxuXG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhcHAvOm5hbWVcIiBuYW1lPVwiYXBwXCJcblx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7bmFtZX19KT0+KHthcHA6Y29tcGFjdChBcHBsaWNhdGlvbi5jdXJyZW50LFwibmFtZVwiLFwidW5hbWVcIixcImFwaUtleVwiKSxuYW1lLC4uLnN0YXRlLnVpLmFwcH0pKShBcHBVSSl9XG5cdFx0XHRvbkVudGVyPXsoe3BhcmFtczp7bmFtZX19KT0+UWlsaUNvbnNvbGUuZGVmYXVsdFByb3BzLmluaXRBcHBOYW1lPW5hbWV9XG5cdFx0XHQvPlxuXHRcdDxSb3V0ZSBwYXRoPVwiYXBwXCIgY29udGV4dHVhbD17ZmFsc2V9XG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PnN0YXRlLnVpLmFwcCkoQ3JlYXRvcil9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNsb3VkXCIgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2Nsb3VkQ29kZTpzdGF0ZVtET01BSU5dLmFwcC5jbG91ZENvZGV9KSkoQ2xvdWRVSSl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImRhdGFcIlxuXHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oey4uLnN0YXRlLnVpLmRhdGEsYXBwOnN0YXRlW0RPTUFJTl0uYXBwLl9pZH0pKShEYXRhVUkpfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOm5hbWVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJsb2dcIlxuXHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5zdGF0ZS51aS5sb2cpKExvZ1VJKX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cImFsbFwiLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmxldmVsXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxuXHRcdFx0PEluZGV4Um91dGVcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2FwcHM6T2JqZWN0LnZhbHVlcyhzdGF0ZS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV0pfSkpKE15VUkpfVxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdDwvUm91dGU+XG5cblxuICAgIDwvUm91dGU+KVxuXHQsWyAge1tET01BSU5dOlJFRFVDRVJ9XG5cdFx0LHtcblx0XHRcdHVpOmVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKFxuXHRcdFx0XHR7YXBwOkFwcFVJLlJFRFVDRVJ9XG5cdFx0XHRcdCx7bG9nOkxvZ1VJLlJFRFVDRVJ9XG5cdFx0XHRcdCx7Y2xvdWQ6Q2xvdWRVSS5SRURVQ0VSfVxuXHRcdFx0XHQse2RhdGE6RGF0YVVJLlJFRFVDRVJ9XG5cdFx0XHQpXG5cdFx0fV1cbilcblxuXG4vKipcbkBUb2RvOlxuKkRvbmU6IGFmdGVyIGFkZGluZyBuZXcgYXBwbGljYXRpb25cbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgbG9jYWwgc3RvcmFnZSB3aXRob3V0IEFsbCBmaWVsZHMsIHN1Y2ggYXMgd2l0aG91dCBhcHBsaWNhdGlvbiBuYW1lLCAuLi4sIGJlY2F1c2Ugc2VydmVyIHJldHVybmVkIG9ubHkgX2lkLCBjcmVhdGVkQXQsIC4uLlxuKkRvbmU6IGFmdGVyIGFwcGxpY2F0aW9uIGRlbGV0aW9uLCBVSSBzaG91bGQgZ28gdG8gLyBldmVuIHdpdGggZXJyb3JcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XG4qRG9uJ3Q6IHVzZSA8TGluay8+IHJhdGhlciB0aGFuIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvXG4qKkRvbmU6IE5ldmVyIGVtcHR5IFVJXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcblxuKiB0b28gc21hbGwtem9vbSBzaXplIGluIG1vYmlsZSBicm93c2VyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXG4qIGJhY2tncm91bmQgdG8gdXBsb2FkIHRvIGJhY2tlbmRcbiAgICBkb25lOiBXZWJTUUxEYiBpcyBkb25lXG4gICAgKioqIHNxbGl0ZVxuICAgIGRvbmU6ICoqKiBhZnRlciByZW1vdmUgYXBwLCBsb2NhbCBjYWNoZSBzaG91bGQgYmUgcmVtb3ZlZCB0b29cbioqIHRleHRmaWVsZCBjYW4ndCBiZSBjaGFuZ2VkICh3aGljaD8/KVxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxuKiBzaW1wbGUgZGF0YSBtb2RlOlxuICAgICogcmVtb3RlIHVwc2VydCBhbmQgcmVtb3ZlIGRpcmVjdGx5XG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXG4qIENhbm5vdCByZWFkIHByb3BlcnR5ICdjb21wb25lbnREaWRFbnRlcicgb2YgdW5kZWZpbmVkXG4qRG9uZTogRGF0ZSBzaG93IGFzIG1lYW5pbmdmdWxcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxuKi9cbiJdfQ==