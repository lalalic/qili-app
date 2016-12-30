"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Main = exports.ACTION = undefined;

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

var _selector = require("./selector");

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


var initApp = null;

var Empty = _.UI.Empty;


var DOMAIN = "qiliAdmin";

var ACTION = exports.ACTION = {
	SET_CURRENT_APP_BY_ID: function SET_CURRENT_APP_BY_ID(id) {
		return function (dispatch, getState) {
			var state = getState();
			var apps = state.entities[_app2.default._name];
			var found = apps[id];
			if (found) dispatch(ACTION.SET_CURRENT_APP(found));
		};
	},
	SET_CURRENT_APP: function SET_CURRENT_APP(app) {
		_app2.default.current = app;
		return { type: "SET_CURRENT_APP", payload: app };
	},
	APPS_FETCHED: function APPS_FETCHED(apps) {
		return function (dispatch) {
			if (apps.length) {
				dispatch((0, _.ENTITIES)((0, _normalizr.normalize)(apps, (0, _normalizr.arrayOf)(_app2.default.schema)).entities));
				var current = null;
				if (initApp) current = apps.find(function (a) {
					return a._id == initApp;
				});
				if (!current) current = apps[0];
				dispatch(ACTION.SET_CURRENT_APP(current));
			}
		};
	},
	NEXT_APPLICATION: function NEXT_APPLICATION(app) {
		return function (dispatch, getState) {
			var state = getState();
			var apps = state.entities[_app2.default._name];
			var ids = (0, _keys2.default)(apps);
			var index = ids[(ids.indexOf(app) + 1) % ids.length];
			if (index) {
				var next = apps[index];
				dispatch(ACTION.SET_CURRENT_APP(next));
			}
		};
	}
};

var REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "SET_CURRENT_APP":
			return { app: payload._id };
	}
	return state;
};

var QiliConsole = function (_Component) {
	(0, _inherits3.default)(QiliConsole, _Component);

	function QiliConsole() {
		(0, _classCallCheck3.default)(this, QiliConsole);
		return (0, _possibleConstructorReturn3.default)(this, (QiliConsole.__proto__ || (0, _getPrototypeOf2.default)(QiliConsole)).apply(this, arguments));
	}

	(0, _createClass3.default)(QiliConsole, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    _id = _props._id,
			    name = _props.name,
			    children = _props.children,
			    dispatch = _props.dispatch,
			    routes = _props.routes;

			var props = {
				appId: "qiliAdmin",
				init: function init(a) {
					return _app2.default.init().then(function (apps) {
						return dispatch(ACTION.APPS_FETCHED(apps));
					});
				},
				project: require("../package.json")
			};
			if (!_id) {
				return _react2.default.createElement(
					_.QiliApp,
					props,
					_react2.default.createElement(_materialUi.AppBar, { title: "Start from your first qili Applicaiton!" }),
					_react2.default.createElement(_app3.Creator, { bFirst: true, dispatch: dispatch })
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
							return dispatch(ACTION.NEXT_APPLICATION(_id));
						} },
					name
				),
				children
			);
		}
	}]);
	return QiliConsole;
}(_react.Component);

QiliConsole.contextTypes = {
	router: _react.PropTypes.object
};
var Main = exports.Main = _.QiliApp.render(_react2.default.createElement(
	_reactRouter.Route,
	{ path: "/",
		component: (0, _reactRedux.connect)(function (state) {
			return (0, _.compact)((0, _selector.getCurrentApp)(state), "_id", "name");
		})(QiliConsole) },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "app", contextual: false },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)()(_app3.Creator) }),
		_react2.default.createElement(_reactRouter.Route, { path: ":_id",
			component: (0, _reactRedux.connect)(function (state, _ref2) {
				var _id = _ref2.params._id;

				var urlApp = (0, _selector.getApp)(state, _id);
				var current = (0, _selector.getCurrentApp)(state);
				var info = (0, _.compact)(urlApp, "name", "uname", "apiKey");
				info.isCurrent = urlApp == current;
				return info;
			})(_app4.default),
			onEnter: function onEnter(_ref3) {
				var _id = _ref3.params._id;
				return initApp = _id;
			}
		})
	),
	_react2.default.createElement(_reactRouter.Route, { path: "cloud", component: (0, _reactRedux.connect)(function (state) {
			return { cloudCode: (0, _selector.getCurrentApp)(state).cloudCode };
		})(_cloud2.default) }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "data",
			component: (0, _reactRedux.connect)(function (state) {
				return (0, _extends3.default)({}, state.ui.data, { app: (0, _selector.getCurrentApp)(state)._id });
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
	ui: (0, _.enhancedCombineReducers)({ log: _log2.default.REDUCER }, { cloud: _cloud2.default.REDUCER }, { data: _data2.default.REDUCER })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJpbml0QXBwIiwiRW1wdHkiLCJET01BSU4iLCJBQ1RJT04iLCJTRVRfQ1VSUkVOVF9BUFBfQllfSUQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic3RhdGUiLCJhcHBzIiwiZW50aXRpZXMiLCJfbmFtZSIsImZvdW5kIiwiaWQiLCJTRVRfQ1VSUkVOVF9BUFAiLCJjdXJyZW50IiwiYXBwIiwidHlwZSIsInBheWxvYWQiLCJBUFBTX0ZFVENIRUQiLCJsZW5ndGgiLCJzY2hlbWEiLCJmaW5kIiwiYSIsIl9pZCIsIk5FWFRfQVBQTElDQVRJT04iLCJpZHMiLCJpbmRleCIsImluZGV4T2YiLCJuZXh0IiwiUkVEVUNFUiIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJuYW1lIiwiY2hpbGRyZW4iLCJyb3V0ZXMiLCJhcHBJZCIsImluaXQiLCJ0aGVuIiwicHJvamVjdCIsInF1aWNrU3dpdGNoU3R5bGUiLCJmb250U2l6ZSIsImNvbnRleHR1YWwiLCJkaXNwbGF5IiwiY29udGV4dFR5cGVzIiwicm91dGVyIiwib2JqZWN0IiwiTWFpbiIsInJlbmRlciIsInBhcmFtcyIsInVybEFwcCIsImluZm8iLCJpc0N1cnJlbnQiLCJjbG91ZENvZGUiLCJ1aSIsImRhdGEiLCJsb2ciLCJjbG91ZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBeUZBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUE1R0FBLFFBQVEscUJBQVI7OztBQVlBLElBQUlDLFVBQVEsSUFBWjs7SUFFT0MsSyxRQUFBQSxLOzs7QUFFUCxJQUFNQyxTQUFPLFdBQWI7O0FBRU8sSUFBTUMsMEJBQU87QUFDbkJDLHdC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WixFQUFzQixnQ0FBdEIsRUFBNEMsWUFBWSxLQUF4RDtBQU5EO0FBbENHLENBRGEsRUE4Q2hCLG1DQUFLUixNQUFMLEVBQWEyQixPQUFiLEdBQ0M7QUFDQXdCLEtBQUcsK0JBQ0YsRUFBQ0UsS0FBSSxjQUFNMUIsT0FBWCxFQURFLEVBRUQsRUFBQzJCLE9BQU0sZ0JBQVEzQixPQUFmLEVBRkMsRUFHRCxFQUFDeUIsTUFBSyxlQUFPekIsT0FBYixFQUhDO0FBREgsQ0FERCxDQTlDZ0IsQ0FBWDs7QUF5RFAiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBBcHBCYXIsIEljb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCB7aW5pdCxVc2VyLFFpbGlBcHAsIFVJLCBlbmhhbmNlZENvbWJpbmVSZWR1Y2VycywgY29tcGFjdCwgRU5USVRJRVN9IGZyb20gJy4nXG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9kYi9hcHAnXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xuaW1wb3J0IHtnZXRDdXJyZW50QXBwLCBnZXRBcHB9IGZyb20gXCIuL3NlbGVjdG9yXCJcblxubGV0IGluaXRBcHA9bnVsbFxuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmNvbnN0IERPTUFJTj1cInFpbGlBZG1pblwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRTRVRfQ1VSUkVOVF9BUFBfQllfSUQ6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0bGV0IHN0YXRlPWdldFN0YXRlKClcblx0XHRsZXQgYXBwcz1zdGF0ZS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV1cblx0XHRsZXQgZm91bmQ9YXBwc1tpZF1cblx0XHRpZihmb3VuZClcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5TRVRfQ1VSUkVOVF9BUFAoZm91bmQpKVxuXHR9XG5cdCxTRVRfQ1VSUkVOVF9BUFA6YXBwPT57XG5cdFx0QXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRyZXR1cm4ge3R5cGU6YFNFVF9DVVJSRU5UX0FQUGAscGF5bG9hZDphcHB9XG5cdH1cblx0LEFQUFNfRkVUQ0hFRDogYXBwcz0+ZGlzcGF0Y2g9Pntcblx0XHRpZihhcHBzLmxlbmd0aCl7XG5cdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoYXBwcyxhcnJheU9mKEFwcGxpY2F0aW9uLnNjaGVtYSkpLmVudGl0aWVzKSlcblx0XHRcdGxldCBjdXJyZW50PW51bGxcblx0XHRcdGlmKGluaXRBcHApXG5cdFx0XHRcdGN1cnJlbnQ9YXBwcy5maW5kKGE9PmEuX2lkPT1pbml0QXBwKVxuXHRcdFx0aWYoIWN1cnJlbnQpXG5cdFx0XHRcdGN1cnJlbnQ9YXBwc1swXVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChjdXJyZW50KSlcblx0XHR9XG5cdH1cblx0LE5FWFRfQVBQTElDQVRJT046IGFwcD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBhcHBzPXN0YXRlLmVudGl0aWVzW0FwcGxpY2F0aW9uLl9uYW1lXVxuXHRcdGxldCBpZHM9T2JqZWN0LmtleXMoYXBwcylcblx0XHRsZXQgaW5kZXg9aWRzWyhpZHMuaW5kZXhPZihhcHApKzEpJWlkcy5sZW5ndGhdXG5cdFx0aWYoaW5kZXgpe1xuXHRcdFx0bGV0IG5leHQ9YXBwc1tpbmRleF1cblx0XHRcdGRpc3BhdGNoKEFDVElPTi5TRVRfQ1VSUkVOVF9BUFAobmV4dCkpXG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYFNFVF9DVVJSRU5UX0FQUGA6XG5cdFx0cmV0dXJuIHthcHA6cGF5bG9hZC5faWR9XG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmNsYXNzIFFpbGlDb25zb2xlIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7X2lkLG5hbWUsIGNoaWxkcmVuLCBkaXNwYXRjaCwgcm91dGVzfT10aGlzLnByb3BzXG5cdFx0bGV0IHByb3BzPXtcblx0XHRcdGFwcElkOiBcInFpbGlBZG1pblwiXG5cdFx0XHQsaW5pdDphPT5BcHBsaWNhdGlvbi5pbml0KCkudGhlbihhcHBzPT5kaXNwYXRjaChBQ1RJT04uQVBQU19GRVRDSEVEKGFwcHMpKSlcblx0XHRcdCxwcm9qZWN0OiByZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpXG5cdFx0fVxuXHRcdGlmKCFfaWQpe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0XHQ8QXBwQmFyIHRpdGxlPVwiU3RhcnQgZnJvbSB5b3VyIGZpcnN0IHFpbGkgQXBwbGljYWl0b24hXCIvPlxuXHRcdFx0XHRcdDxDcmVhdG9yIGJGaXJzdD17dHJ1ZX0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+XG5cdFx0XHRcdDwvUWlsaUFwcD5cblx0XHRcdClcblx0XHR9XG5cblx0XHRsZXQgcXVpY2tTd2l0Y2hTdHlsZT17Zm9udFNpemU6XCJ4eC1zbWFsbFwifVxuXHRcdGlmKHJvdXRlcy5maW5kKGE9PmEuY29udGV4dHVhbD09PWZhbHNlKSlcblx0XHRcdHF1aWNrU3dpdGNoU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UWlsaUFwcCB7Li4ucHJvcHN9PlxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiIG1pbmk9e3RydWV9XG5cdFx0XHRcdFx0c3R5bGU9e3F1aWNrU3dpdGNoU3R5bGV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLk5FWFRfQVBQTElDQVRJT04oX2lkKSl9PlxuXHRcdFx0XHRcdHtuYW1lfVxuXHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuXHRcdFx0XHR7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcbiAgICB9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL2Rhc2hib2FyZCdcbmltcG9ydCBBcHBVSSwge0NyZWF0b3J9IGZyb20gJy4vYXBwJ1xuaW1wb3J0IENsb3VkVUkgZnJvbSAnLi9jbG91ZCdcbmltcG9ydCBEYXRhVUkgZnJvbSAnLi9kYXRhJ1xuaW1wb3J0IExvZ1VJIGZyb20gJy4vbG9nJ1xuaW1wb3J0IE15VUkgZnJvbSBcIi4vbXlcIlxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwiLi9zZXR0aW5nXCJcbmltcG9ydCBQcm9maWxlVUkgZnJvbSBcIi4vdXNlci1wcm9maWxlXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5cbmV4cG9ydCBjb25zdCBNYWluPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIlxuXHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50QXBwKHN0YXRlKSxcIl9pZFwiLFwibmFtZVwiKSkoUWlsaUNvbnNvbGUpfT5cblxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0Rhc2hib2FyZH0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJhcHBcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e19pZH19KT0+e1xuXHRcdFx0XHRcdGxldCB1cmxBcHA9Z2V0QXBwKHN0YXRlLF9pZClcblx0XHRcdFx0XHRsZXQgY3VycmVudD1nZXRDdXJyZW50QXBwKHN0YXRlKVxuXHRcdFx0XHRcdGxldCBpbmZvPWNvbXBhY3QodXJsQXBwLFwibmFtZVwiLFwidW5hbWVcIixcImFwaUtleVwiKVxuXHRcdFx0XHRcdGluZm8uaXNDdXJyZW50PXVybEFwcD09Y3VycmVudFxuXHRcdFx0XHRcdHJldHVybiBpbmZvXG5cdFx0XHRcdFx0fSkoQXBwVUkpfVxuXHRcdFx0XHRvbkVudGVyPXsoe3BhcmFtczp7X2lkfX0pPT5pbml0QXBwPV9pZH1cblx0XHRcdFx0Lz5cblx0XHQ8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7Y2xvdWRDb2RlOmdldEN1cnJlbnRBcHAoc3RhdGUpLmNsb3VkQ29kZX0pKShDbG91ZFVJKX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiXG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7Li4uc3RhdGUudWkuZGF0YSxhcHA6Z2V0Q3VycmVudEFwcChzdGF0ZSkuX2lkfSkpKERhdGFVSSl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89e2Ake1VzZXIuX25hbWV9YH0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bmFtZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImxvZ1wiXG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PnN0YXRlLnVpLmxvZykoTG9nVUkpfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiYWxsXCIvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bGV2ZWxcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZVxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YXBwczpPYmplY3QudmFsdWVzKHN0YXRlLmVudGl0aWVzW0FwcGxpY2F0aW9uLl9uYW1lXSl9KSkoTXlVSSl9XG5cdFx0XHRcdGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtQcm9maWxlVUl9IGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXG4gICAgPC9Sb3V0ZT4pXG5cdCxbICB7W0RPTUFJTl06UkVEVUNFUn1cblx0XHQse1xuXHRcdFx0dWk6ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoXG5cdFx0XHRcdHtsb2c6TG9nVUkuUkVEVUNFUn1cblx0XHRcdFx0LHtjbG91ZDpDbG91ZFVJLlJFRFVDRVJ9XG5cdFx0XHRcdCx7ZGF0YTpEYXRhVUkuUkVEVUNFUn1cblx0XHRcdClcblx0XHR9XVxuKVxuXG5cbi8qKlxuQFRvZG86XG4qRG9uZTogYWZ0ZXIgYWRkaW5nIG5ldyBhcHBsaWNhdGlvblxuICAgIGFwcGxpY2F0aW9uIGxpc3QgZG9lc24ndCByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICBsb2NhbCBzdG9yYWdlIHdpdGhvdXQgQWxsIGZpZWxkcywgc3VjaCBhcyB3aXRob3V0IGFwcGxpY2F0aW9uIG5hbWUsIC4uLiwgYmVjYXVzZSBzZXJ2ZXIgcmV0dXJuZWQgb25seSBfaWQsIGNyZWF0ZWRBdCwgLi4uXG4qRG9uZTogYWZ0ZXIgYXBwbGljYXRpb24gZGVsZXRpb24sIFVJIHNob3VsZCBnbyB0byAvIGV2ZW4gd2l0aCBlcnJvclxuKkRvbmU6IGVycm9yIGhhcHBlbnMsIFVJIHNob3VsZCBub3QgYmUgRW1wdHlcbipEb24ndDogdXNlIDxMaW5rLz4gcmF0aGVyIHRoYW4gdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG9cbioqRG9uZTogTmV2ZXIgZW1wdHkgVUlcbioqRG9uZTogRmxvYXRBY3Rpb25CdXR0b24gcG9zaXRpb24gd2hlbiB2aWV3IHdpZHRoIGlzIDk2MFxuXG4qIHRvbyBzbWFsbC16b29tIHNpemUgaW4gbW9iaWxlIGJyb3dzZXJcbiogZmlyc3QgZm9jdXMgb24gZm9ybSwgY2xvdWQgVUlcbiogYmFja2dyb3VuZCB0byB1cGxvYWQgdG8gYmFja2VuZFxuICAgIGRvbmU6IFdlYlNRTERiIGlzIGRvbmVcbiAgICAqKiogc3FsaXRlXG4gICAgZG9uZTogKioqIGFmdGVyIHJlbW92ZSBhcHAsIGxvY2FsIGNhY2hlIHNob3VsZCBiZSByZW1vdmVkIHRvb1xuKiogdGV4dGZpZWxkIGNhbid0IGJlIGNoYW5nZWQgKHdoaWNoPz8pXG4qRG9uZTogbG9naW4gZXJyb3IsIHBsYWNlaG9sZGVyIGFuZCB2YWx1ZSBzaG93IHRvZ2V0aGVyXG4qIHNpbXBsZSBkYXRhIG1vZGU6XG4gICAgKiByZW1vdGUgdXBzZXJ0IGFuZCByZW1vdmUgZGlyZWN0bHlcbiAgICAqIGxvY2FsIGNhY2hlIGZvciBzZWFyY2hcbiogQ2Fubm90IHJlYWQgcHJvcGVydHkgJ2NvbXBvbmVudERpZEVudGVyJyBvZiB1bmRlZmluZWRcbipEb25lOiBEYXRlIHNob3cgYXMgbWVhbmluZ2Z1bFxuKiBkYXRhIGxpc3QgdG8gc2hvdyBvYmplY3QgZmllbGQgW29iamVjdF09PnsuLi59XG4qL1xuIl19