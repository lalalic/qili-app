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
				}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJpbml0QXBwIiwiRW1wdHkiLCJET01BSU4iLCJBQ1RJT04iLCJTRVRfQ1VSUkVOVF9BUFBfQllfSUQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic3RhdGUiLCJhcHBzIiwiZW50aXRpZXMiLCJfbmFtZSIsImZvdW5kIiwiaWQiLCJTRVRfQ1VSUkVOVF9BUFAiLCJjdXJyZW50IiwiYXBwIiwidHlwZSIsInBheWxvYWQiLCJBUFBTX0ZFVENIRUQiLCJsZW5ndGgiLCJzY2hlbWEiLCJmaW5kIiwiYSIsIl9pZCIsIk5FWFRfQVBQTElDQVRJT04iLCJpZHMiLCJpbmRleCIsImluZGV4T2YiLCJuZXh0IiwiUkVEVUNFUiIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJuYW1lIiwiY2hpbGRyZW4iLCJyb3V0ZXMiLCJhcHBJZCIsImluaXQiLCJ0aGVuIiwicXVpY2tTd2l0Y2hTdHlsZSIsImZvbnRTaXplIiwiY29udGV4dHVhbCIsImRpc3BsYXkiLCJjb250ZXh0VHlwZXMiLCJyb3V0ZXIiLCJvYmplY3QiLCJNYWluIiwicmVuZGVyIiwicGFyYW1zIiwidXJsQXBwIiwiaW5mbyIsImlzQ3VycmVudCIsImNsb3VkQ29kZSIsInVpIiwiZGF0YSIsImxvZyIsImNsb3VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUF3RkE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQTNHQUEsUUFBUSxxQkFBUjs7O0FBWUEsSUFBSUMsVUFBUSxJQUFaOztJQUVPQyxLLFFBQUFBLEs7OztBQUVQLElBQU1DLFNBQU8sV0FBYjs7QUFFTyxJQUFNQywwQkFBTztBQUNuQkMsd0JBQXVCO0FBQUEs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RyxDQURhLEVBOENoQixtQ0FBS1IsTUFBTCxFQUFhMkIsT0FBYixHQUNDO0FBQ0F1QixLQUFHLCtCQUNGLEVBQUNFLEtBQUksY0FBTXpCLE9BQVgsRUFERSxFQUVELEVBQUMwQixPQUFNLGdCQUFRMUIsT0FBZixFQUZDLEVBR0QsRUFBQ3dCLE1BQUssZUFBT3hCLE9BQWIsRUFIQztBQURILENBREQsQ0E5Q2dCLENBQVg7O0FBeURQIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeSwgUmVkaXJlY3QsIEluZGV4UmVkaXJlY3QsIExpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgQXBwQmFyLCBJY29uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7bm9ybWFsaXplLGFycmF5T2Z9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLCBVSSwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMsIGNvbXBhY3QsIEVOVElUSUVTfSBmcm9tICcuJ1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcbmltcG9ydCB7Z2V0Q3VycmVudEFwcCwgZ2V0QXBwfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmxldCBpbml0QXBwPW51bGxcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jb25zdCBET01BSU49XCJxaWxpQWRtaW5cIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0U0VUX0NVUlJFTlRfQVBQX0JZX0lEOiBpZD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGxldCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0bGV0IGFwcHM9c3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdXG5cdFx0bGV0IGZvdW5kPWFwcHNbaWRdXG5cdFx0aWYoZm91bmQpXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uU0VUX0NVUlJFTlRfQVBQKGZvdW5kKSlcblx0fVxuXHQsU0VUX0NVUlJFTlRfQVBQOmFwcD0+e1xuXHRcdEFwcGxpY2F0aW9uLmN1cnJlbnQ9YXBwXG5cdFx0cmV0dXJuIHt0eXBlOmBTRVRfQ1VSUkVOVF9BUFBgLHBheWxvYWQ6YXBwfVxuXHR9XG5cdCxBUFBTX0ZFVENIRUQ6IGFwcHM9PmRpc3BhdGNoPT57XG5cdFx0aWYoYXBwcy5sZW5ndGgpe1xuXHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGFwcHMsYXJyYXlPZihBcHBsaWNhdGlvbi5zY2hlbWEpKS5lbnRpdGllcykpXG5cdFx0XHRsZXQgY3VycmVudD1udWxsXG5cdFx0XHRpZihpbml0QXBwKVxuXHRcdFx0XHRjdXJyZW50PWFwcHMuZmluZChhPT5hLl9pZD09aW5pdEFwcClcblx0XHRcdGlmKCFjdXJyZW50KVxuXHRcdFx0XHRjdXJyZW50PWFwcHNbMF1cblx0XHRcdGRpc3BhdGNoKEFDVElPTi5TRVRfQ1VSUkVOVF9BUFAoY3VycmVudCkpXG5cdFx0fVxuXHR9XG5cdCxORVhUX0FQUExJQ0FUSU9OOiBhcHA9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgYXBwcz1zdGF0ZS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV1cblx0XHRsZXQgaWRzPU9iamVjdC5rZXlzKGFwcHMpXG5cdFx0bGV0IGluZGV4PWlkc1soaWRzLmluZGV4T2YoYXBwKSsxKSVpZHMubGVuZ3RoXVxuXHRcdGlmKGluZGV4KXtcblx0XHRcdGxldCBuZXh0PWFwcHNbaW5kZXhdXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uU0VUX0NVUlJFTlRfQVBQKG5leHQpKVxuXHRcdH1cblx0fVxufVxuXG5jb25zdCBSRURVQ0VSPShzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBTRVRfQ1VSUkVOVF9BUFBgOlxuXHRcdHJldHVybiB7YXBwOnBheWxvYWQuX2lkfVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5jbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge19pZCxuYW1lLCBjaGlsZHJlbiwgZGlzcGF0Y2gsIHJvdXRlc309dGhpcy5wcm9wc1xuXHRcdGxldCBwcm9wcz17XG5cdFx0XHRhcHBJZDogXCJxaWxpQWRtaW5cIlxuXHRcdFx0LGluaXQ6YT0+QXBwbGljYXRpb24uaW5pdCgpLnRoZW4oYXBwcz0+ZGlzcGF0Y2goQUNUSU9OLkFQUFNfRkVUQ0hFRChhcHBzKSkpXG5cdFx0fVxuXHRcdGlmKCFfaWQpe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0XHQ8QXBwQmFyIHRpdGxlPVwiU3RhcnQgZnJvbSB5b3VyIGZpcnN0IHFpbGkgQXBwbGljYWl0b24hXCIvPlxuXHRcdFx0XHRcdDxDcmVhdG9yIGJGaXJzdD17dHJ1ZX0gZGlzcGF0Y2g9e2Rpc3BhdGNofS8+XG5cdFx0XHRcdDwvUWlsaUFwcD5cblx0XHRcdClcblx0XHR9XG5cblx0XHRsZXQgcXVpY2tTd2l0Y2hTdHlsZT17Zm9udFNpemU6XCJ4eC1zbWFsbFwifVxuXHRcdGlmKHJvdXRlcy5maW5kKGE9PmEuY29udGV4dHVhbD09PWZhbHNlKSlcblx0XHRcdHF1aWNrU3dpdGNoU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UWlsaUFwcCB7Li4ucHJvcHN9PlxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiIG1pbmk9e3RydWV9XG5cdFx0XHRcdFx0c3R5bGU9e3F1aWNrU3dpdGNoU3R5bGV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLk5FWFRfQVBQTElDQVRJT04oX2lkKSl9PlxuXHRcdFx0XHRcdHtuYW1lfVxuXHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuXHRcdFx0XHR7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcbiAgICB9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL2Rhc2hib2FyZCdcbmltcG9ydCBBcHBVSSwge0NyZWF0b3J9IGZyb20gJy4vYXBwJ1xuaW1wb3J0IENsb3VkVUkgZnJvbSAnLi9jbG91ZCdcbmltcG9ydCBEYXRhVUkgZnJvbSAnLi9kYXRhJ1xuaW1wb3J0IExvZ1VJIGZyb20gJy4vbG9nJ1xuaW1wb3J0IE15VUkgZnJvbSBcIi4vbXlcIlxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwiLi9zZXR0aW5nXCJcbmltcG9ydCBQcm9maWxlVUkgZnJvbSBcIi4vdXNlci1wcm9maWxlXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5cbmV4cG9ydCBjb25zdCBNYWluPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIlxuXHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50QXBwKHN0YXRlKSxcIl9pZFwiLFwibmFtZVwiKSkoUWlsaUNvbnNvbGUpfT5cblxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0Rhc2hib2FyZH0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJhcHBcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e19pZH19KT0+e1xuXHRcdFx0XHRcdGxldCB1cmxBcHA9Z2V0QXBwKHN0YXRlLF9pZClcblx0XHRcdFx0XHRsZXQgY3VycmVudD1nZXRDdXJyZW50QXBwKHN0YXRlKVxuXHRcdFx0XHRcdGxldCBpbmZvPWNvbXBhY3QodXJsQXBwLFwibmFtZVwiLFwidW5hbWVcIixcImFwaUtleVwiKVxuXHRcdFx0XHRcdGluZm8uaXNDdXJyZW50PXVybEFwcD09Y3VycmVudFxuXHRcdFx0XHRcdHJldHVybiBpbmZvXG5cdFx0XHRcdFx0fSkoQXBwVUkpfVxuXHRcdFx0XHRvbkVudGVyPXsoe3BhcmFtczp7X2lkfX0pPT5pbml0QXBwPV9pZH1cblx0XHRcdFx0Lz5cblx0XHQ8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7Y2xvdWRDb2RlOmdldEN1cnJlbnRBcHAoc3RhdGUpLmNsb3VkQ29kZX0pKShDbG91ZFVJKX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiXG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7Li4uc3RhdGUudWkuZGF0YSxhcHA6Z2V0Q3VycmVudEFwcChzdGF0ZSkuX2lkfSkpKERhdGFVSSl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89e2Ake1VzZXIuX25hbWV9YH0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bmFtZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImxvZ1wiXG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PnN0YXRlLnVpLmxvZykoTG9nVUkpfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiYWxsXCIvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bGV2ZWxcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZVxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YXBwczpPYmplY3QudmFsdWVzKHN0YXRlLmVudGl0aWVzW0FwcGxpY2F0aW9uLl9uYW1lXSl9KSkoTXlVSSl9XG5cdFx0XHRcdGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtQcm9maWxlVUl9IGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXG4gICAgPC9Sb3V0ZT4pXG5cdCxbICB7W0RPTUFJTl06UkVEVUNFUn1cblx0XHQse1xuXHRcdFx0dWk6ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoXG5cdFx0XHRcdHtsb2c6TG9nVUkuUkVEVUNFUn1cblx0XHRcdFx0LHtjbG91ZDpDbG91ZFVJLlJFRFVDRVJ9XG5cdFx0XHRcdCx7ZGF0YTpEYXRhVUkuUkVEVUNFUn1cblx0XHRcdClcblx0XHR9XVxuKVxuXG5cbi8qKlxuQFRvZG86XG4qRG9uZTogYWZ0ZXIgYWRkaW5nIG5ldyBhcHBsaWNhdGlvblxuICAgIGFwcGxpY2F0aW9uIGxpc3QgZG9lc24ndCByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICBsb2NhbCBzdG9yYWdlIHdpdGhvdXQgQWxsIGZpZWxkcywgc3VjaCBhcyB3aXRob3V0IGFwcGxpY2F0aW9uIG5hbWUsIC4uLiwgYmVjYXVzZSBzZXJ2ZXIgcmV0dXJuZWQgb25seSBfaWQsIGNyZWF0ZWRBdCwgLi4uXG4qRG9uZTogYWZ0ZXIgYXBwbGljYXRpb24gZGVsZXRpb24sIFVJIHNob3VsZCBnbyB0byAvIGV2ZW4gd2l0aCBlcnJvclxuKkRvbmU6IGVycm9yIGhhcHBlbnMsIFVJIHNob3VsZCBub3QgYmUgRW1wdHlcbipEb24ndDogdXNlIDxMaW5rLz4gcmF0aGVyIHRoYW4gdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG9cbioqRG9uZTogTmV2ZXIgZW1wdHkgVUlcbioqRG9uZTogRmxvYXRBY3Rpb25CdXR0b24gcG9zaXRpb24gd2hlbiB2aWV3IHdpZHRoIGlzIDk2MFxuXG4qIHRvbyBzbWFsbC16b29tIHNpemUgaW4gbW9iaWxlIGJyb3dzZXJcbiogZmlyc3QgZm9jdXMgb24gZm9ybSwgY2xvdWQgVUlcbiogYmFja2dyb3VuZCB0byB1cGxvYWQgdG8gYmFja2VuZFxuICAgIGRvbmU6IFdlYlNRTERiIGlzIGRvbmVcbiAgICAqKiogc3FsaXRlXG4gICAgZG9uZTogKioqIGFmdGVyIHJlbW92ZSBhcHAsIGxvY2FsIGNhY2hlIHNob3VsZCBiZSByZW1vdmVkIHRvb1xuKiogdGV4dGZpZWxkIGNhbid0IGJlIGNoYW5nZWQgKHdoaWNoPz8pXG4qRG9uZTogbG9naW4gZXJyb3IsIHBsYWNlaG9sZGVyIGFuZCB2YWx1ZSBzaG93IHRvZ2V0aGVyXG4qIHNpbXBsZSBkYXRhIG1vZGU6XG4gICAgKiByZW1vdGUgdXBzZXJ0IGFuZCByZW1vdmUgZGlyZWN0bHlcbiAgICAqIGxvY2FsIGNhY2hlIGZvciBzZWFyY2hcbiogQ2Fubm90IHJlYWQgcHJvcGVydHkgJ2NvbXBvbmVudERpZEVudGVyJyBvZiB1bmRlZmluZWRcbipEb25lOiBEYXRlIHNob3cgYXMgbWVhbmluZ2Z1bFxuKiBkYXRhIGxpc3QgdG8gc2hvdyBvYmplY3QgZmllbGQgW29iamVjdF09PnsuLi59XG4qL1xuIl19