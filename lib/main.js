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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJpbml0QXBwIiwiRW1wdHkiLCJET01BSU4iLCJBQ1RJT04iLCJTRVRfQ1VSUkVOVF9BUFBfQllfSUQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic3RhdGUiLCJhcHBzIiwiZW50aXRpZXMiLCJfbmFtZSIsImZvdW5kIiwiaWQiLCJTRVRfQ1VSUkVOVF9BUFAiLCJjdXJyZW50IiwiYXBwIiwidHlwZSIsInBheWxvYWQiLCJBUFBTX0ZFVENIRUQiLCJsZW5ndGgiLCJzY2hlbWEiLCJmaW5kIiwiYSIsIl9pZCIsIk5FWFRfQVBQTElDQVRJT04iLCJpZHMiLCJpbmRleCIsImluZGV4T2YiLCJuZXh0IiwiUkVEVUNFUiIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJuYW1lIiwiY2hpbGRyZW4iLCJyb3V0ZXMiLCJhcHBJZCIsImluaXQiLCJ0aGVuIiwicXVpY2tTd2l0Y2hTdHlsZSIsImZvbnRTaXplIiwiY29udGV4dHVhbCIsImRpc3BsYXkiLCJjb250ZXh0VHlwZXMiLCJyb3V0ZXIiLCJvYmplY3QiLCJNYWluIiwicmVuZGVyIiwicGFyYW1zIiwidXJsQXBwIiwiaW5mbyIsImlzQ3VycmVudCIsImNsb3VkQ29kZSIsInVpIiwiZGF0YSIsImxvZyIsImNsb3VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUF5RkE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQTVHQUEsUUFBUSxxQkFBUjs7O0FBWUEsSUFBSUMsVUFBUSxJQUFaOztJQUVPQyxLLFFBQUFBLEs7OztBQUVQLElBQU1DLFNBQU8sV0FBYjs7QUFFTyxJQUFNQywwQkFBTztBQUNuQkMsd0JBQXVCO0FBQUEsU0FBSSxVQUFDQyxRQUFELEVBQVVDLFFBQVYsRUFBcUI7QUFDL0MsT0FBSUMsUUFBTUQsVUFBVjtBQUNBLE9BQUlFLE9BQUtELE1BQU1FLFFBQU4sQ0FBZSxjQUFZQyxLQUEzQixDQUFUO0FBQ0EsT0FBSUMsUUFBTUgsS0FBS0ksRUFBTCxDQUFWO0FBQ0EsT0FBR0QsS0FBSCxFQUNDTixTQUFTRixPQUFPVSxlQUFQLENBQXVCRixLQUF2QixDQUFUO0FBQ0QsR0FOc0I7QUFBQSxFQURKO0FBUWxCRSxrQkFBZ0IsOEJBQUs7QUFDckIsZ0JBQVlDLE9BQVosR0FBb0JDLEdBQXBCO0FBQ0EsU0FBTyxFQUFDQyx1QkFBRCxFQUF3QkMsU0FBUUYsR0FBaEMsRUFBUDtBQUNBLEVBWGtCO0FBWWxCRyxlQUFjO0FBQUEsU0FBTSxvQkFBVTtBQUM5QixPQUFHVixLQUFLVyxNQUFSLEVBQWU7QUFDZGQsYUFBUyxnQkFBUywwQkFBVUcsSUFBVixFQUFlLHdCQUFRLGNBQVlZLE1BQXBCLENBQWYsRUFBNENYLFFBQXJELENBQVQ7QUFDQSxRQUFJSyxVQUFRLElBQVo7QUFDQSxRQUFHZCxPQUFILEVBQ0NjLFVBQVFOLEtBQUthLElBQUwsQ0FBVTtBQUFBLFlBQUdDLEVBQUVDLEdBQUYsSUFBT3ZCLE9BQVY7QUFBQSxLQUFWLENBQVI7QUFDRCxRQUFHLENBQUNjLE9BQUosRUFDQ0EsVUFBUU4sS0FBSyxDQUFMLENBQVI7QUFDREgsYUFBU0YsT0FBT1UsZUFBUCxDQUF1QkMsT0FBdkIsQ0FBVDtBQUNBO0FBQ0QsR0FWYztBQUFBLEVBWkk7QUF1QmxCVSxtQkFBa0I7QUFBQSxTQUFLLFVBQUNuQixRQUFELEVBQVVDLFFBQVYsRUFBcUI7QUFDNUMsT0FBTUMsUUFBTUQsVUFBWjtBQUNBLE9BQU1FLE9BQUtELE1BQU1FLFFBQU4sQ0FBZSxjQUFZQyxLQUEzQixDQUFYO0FBQ0EsT0FBSWUsTUFBSSxvQkFBWWpCLElBQVosQ0FBUjtBQUNBLE9BQUlrQixRQUFNRCxJQUFJLENBQUNBLElBQUlFLE9BQUosQ0FBWVosR0FBWixJQUFpQixDQUFsQixJQUFxQlUsSUFBSU4sTUFBN0IsQ0FBVjtBQUNBLE9BQUdPLEtBQUgsRUFBUztBQUNSLFFBQUlFLE9BQUtwQixLQUFLa0IsS0FBTCxDQUFUO0FBQ0FyQixhQUFTRixPQUFPVSxlQUFQLENBQXVCZSxJQUF2QixDQUFUO0FBQ0E7QUFDRCxHQVRrQjtBQUFBO0FBdkJBLENBQWI7O0FBbUNQLElBQU1DLFVBQVEsU0FBUkEsT0FBUSxHQUEyQjtBQUFBLEtBQTFCdEIsS0FBMEIsdUVBQXBCLEVBQW9CO0FBQUE7QUFBQSxLQUFoQlMsSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUN4QyxTQUFPRCxJQUFQO0FBQ0E7QUFDQyxVQUFPLEVBQUNELEtBQUlFLFFBQVFNLEdBQWIsRUFBUDtBQUZEO0FBSUEsUUFBT2hCLEtBQVA7QUFDQSxDQU5EOztJQVFNdUIsVzs7Ozs7Ozs7OzsyQkFDTTtBQUFBLGdCQUN5QyxLQUFLQyxLQUQ5QztBQUFBLE9BQ0dSLEdBREgsVUFDR0EsR0FESDtBQUFBLE9BQ09TLElBRFAsVUFDT0EsSUFEUDtBQUFBLE9BQ2FDLFFBRGIsVUFDYUEsUUFEYjtBQUFBLE9BQ3VCNUIsUUFEdkIsVUFDdUJBLFFBRHZCO0FBQUEsT0FDaUM2QixNQURqQyxVQUNpQ0EsTUFEakM7O0FBRVYsT0FBSUgsUUFBTTtBQUNUSSxXQUFPLFdBREU7QUFFUkMsVUFBSztBQUFBLFlBQUcsY0FBWUEsSUFBWixHQUFtQkMsSUFBbkIsQ0FBd0I7QUFBQSxhQUFNaEMsU0FBU0YsT0FBT2UsWUFBUCxDQUFvQlYsSUFBcEIsQ0FBVCxDQUFOO0FBQUEsTUFBeEIsQ0FBSDtBQUFBO0FBRkcsSUFBVjtBQUlBLE9BQUcsQ0FBQ2UsR0FBSixFQUFRO0FBQ1AsV0FDQztBQUFBO0FBQWFRLFVBQWI7QUFDQztBQUFDLFdBQUQ7QUFBQSxRQUFPLE1BQU0sbURBQWI7QUFDQztBQUFBO0FBQUEsU0FBTSxJQUFHLEtBQVQ7QUFBQTtBQUFBO0FBREQ7QUFERCxLQUREO0FBT0E7O0FBRUQsT0FBSU8sbUJBQWlCLEVBQUNDLFVBQVMsVUFBVixFQUFyQjtBQUNBLE9BQUdMLE9BQU9iLElBQVAsQ0FBWTtBQUFBLFdBQUdDLEVBQUVrQixVQUFGLEtBQWUsS0FBbEI7QUFBQSxJQUFaLENBQUgsRUFDQ0YsaUJBQWlCRyxPQUFqQixHQUF5QixNQUF6Qjs7QUFFSyxVQUNJO0FBQUE7QUFBYVYsU0FBYjtBQUNSO0FBQUE7QUFBQSxPQUFzQixXQUFVLGtCQUFoQyxFQUFtRCxNQUFNLElBQXpEO0FBQ0MsYUFBT08sZ0JBRFI7QUFFQyxlQUFTO0FBQUEsY0FBR2pDLFNBQVNGLE9BQU9xQixnQkFBUCxDQUF3QkQsR0FBeEIsQ0FBVCxDQUFIO0FBQUEsT0FGVjtBQUdFUztBQUhGLEtBRFE7QUFNUEM7QUFOTyxJQURKO0FBVUg7Ozs7O0FBL0JDSCxXLENBaUNFWSxZLEdBQWE7QUFDbkJDLFNBQVEsaUJBQVVDO0FBREMsQztBQWlCZCxJQUFNQyxzQkFBSyxVQUFRQyxNQUFSLENBQ2I7QUFBQTtBQUFBLEdBQU8sTUFBSyxHQUFaO0FBQ0gsYUFBVyx5QkFBUTtBQUFBLFVBQU8sZUFBUSw2QkFBY3ZDLEtBQWQsQ0FBUixFQUE2QixLQUE3QixFQUFtQyxNQUFuQyxDQUFQO0FBQUEsR0FBUixFQUEyRHVCLFdBQTNELENBRFI7QUFHRywwREFBWSw4QkFBWixHQUhIO0FBS0g7QUFBQTtBQUFBLElBQU8sTUFBSyxLQUFaLEVBQWtCLFlBQVksS0FBOUI7QUFDQywyREFBWSxXQUFXLHlDQUF2QixHQUREO0FBR0Msc0RBQU8sTUFBSyxNQUFaO0FBQ0MsY0FBVyx5QkFBUSxVQUFDdkIsS0FBRCxTQUF3QjtBQUFBLFFBQVJnQixHQUFRLFNBQWhCd0IsTUFBZ0IsQ0FBUnhCLEdBQVE7O0FBQzFDLFFBQUl5QixTQUFPLHNCQUFPekMsS0FBUCxFQUFhZ0IsR0FBYixDQUFYO0FBQ0EsUUFBSVQsVUFBUSw2QkFBY1AsS0FBZCxDQUFaO0FBQ0EsUUFBSTBDLE9BQUssZUFBUUQsTUFBUixFQUFlLE1BQWYsRUFBc0IsT0FBdEIsRUFBOEIsUUFBOUIsQ0FBVDtBQUNBQyxTQUFLQyxTQUFMLEdBQWVGLFVBQVFsQyxPQUF2QjtBQUNBLFdBQU9tQyxJQUFQO0FBQ0MsSUFOUyxnQkFEWjtBQVFDLFlBQVM7QUFBQSxRQUFVMUIsR0FBVixTQUFFd0IsTUFBRixDQUFVeEIsR0FBVjtBQUFBLFdBQWtCdkIsVUFBUXVCLEdBQTFCO0FBQUE7QUFSVjtBQUhELEVBTEc7QUFvQkcscURBQU8sTUFBSyxPQUFaLEVBQW9CLFdBQVcseUJBQVE7QUFBQSxVQUFRLEVBQUM0QixXQUFVLDZCQUFjNUMsS0FBZCxFQUFxQjRDLFNBQWhDLEVBQVI7QUFBQSxHQUFSLGtCQUEvQixHQXBCSDtBQXNCRztBQUFBO0FBQUEsSUFBTyxNQUFLLE1BQVo7QUFDTCxjQUFXLHlCQUFRO0FBQUEsc0NBQVk1QyxNQUFNNkMsRUFBTixDQUFTQyxJQUFyQixJQUEwQnRDLEtBQUksNkJBQWNSLEtBQWQsRUFBcUJnQixHQUFuRDtBQUFBLElBQVIsaUJBRE47QUFFSSw4REFBZSxTQUFPLE9BQUtiLEtBQTNCLEdBRko7QUFHSSxzREFBTyxNQUFLLE9BQVo7QUFISixFQXRCSDtBQTRCRztBQUFBO0FBQUEsSUFBTyxNQUFLLEtBQVo7QUFDTCxjQUFXLHlCQUFRO0FBQUEsV0FBT0gsTUFBTTZDLEVBQU4sQ0FBU0UsR0FBaEI7QUFBQSxJQUFSLGdCQUROO0FBRUksOERBQWUsSUFBRyxLQUFsQixHQUZKO0FBR0ksc0RBQU8sTUFBSyxRQUFaO0FBSEosRUE1Qkg7QUFrQ0g7QUFBQTtBQUFBLElBQU8sTUFBSyxJQUFaO0FBQ0M7QUFDQyxjQUFXLHlCQUFRO0FBQUEsV0FBUSxFQUFDOUMsTUFBSyxzQkFBY0QsTUFBTUUsUUFBTixDQUFlLGNBQVlDLEtBQTNCLENBQWQsQ0FBTixFQUFSO0FBQUEsSUFBUixlQURaO0FBRUMsZUFBWSxLQUZiLEdBREQ7QUFLQyxzREFBTyxNQUFLLFNBQVosRUFBc0IsNEJBQXRCLEdBTEQ7QUFNQyxzREFBTyxNQUFLLFNBQVosRUFBc0IsZ0NBQXRCLEVBQTRDLFlBQVksS0FBeEQ7QUFORDtBQWxDRyxDQURhLEVBOENoQixtQ0FBS1IsTUFBTCxFQUFhMkIsT0FBYixHQUNDO0FBQ0F1QixLQUFHLCtCQUNGLEVBQUNFLEtBQUksY0FBTXpCLE9BQVgsRUFERSxFQUVELEVBQUMwQixPQUFNLGdCQUFRMUIsT0FBZixFQUZDLEVBR0QsRUFBQ3dCLE1BQUssZUFBT3hCLE9BQWIsRUFIQztBQURILENBREQsQ0E5Q2dCLENBQVg7O0FBeURQIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeSwgUmVkaXJlY3QsIEluZGV4UmVkaXJlY3QsIExpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCwgVUksIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzLCBjb21wYWN0LCBFTlRJVElFU30gZnJvbSAnLidcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQge2dldEN1cnJlbnRBcHAsIGdldEFwcH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuXG5sZXQgaW5pdEFwcD1udWxsXG5cbmNvbnN0IHtFbXB0eX09VUlcblxuY29uc3QgRE9NQUlOPVwicWlsaUFkbWluXCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdFNFVF9DVVJSRU5UX0FQUF9CWV9JRDogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRsZXQgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGxldCBhcHBzPXN0YXRlLmVudGl0aWVzW0FwcGxpY2F0aW9uLl9uYW1lXVxuXHRcdGxldCBmb3VuZD1hcHBzW2lkXVxuXHRcdGlmKGZvdW5kKVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChmb3VuZCkpXG5cdH1cblx0LFNFVF9DVVJSRU5UX0FQUDphcHA9Pntcblx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxuXHRcdHJldHVybiB7dHlwZTpgU0VUX0NVUlJFTlRfQVBQYCxwYXlsb2FkOmFwcH1cblx0fVxuXHQsQVBQU19GRVRDSEVEOiBhcHBzPT5kaXNwYXRjaD0+e1xuXHRcdGlmKGFwcHMubGVuZ3RoKXtcblx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShhcHBzLGFycmF5T2YoQXBwbGljYXRpb24uc2NoZW1hKSkuZW50aXRpZXMpKVxuXHRcdFx0bGV0IGN1cnJlbnQ9bnVsbFxuXHRcdFx0aWYoaW5pdEFwcClcblx0XHRcdFx0Y3VycmVudD1hcHBzLmZpbmQoYT0+YS5faWQ9PWluaXRBcHApXG5cdFx0XHRpZighY3VycmVudClcblx0XHRcdFx0Y3VycmVudD1hcHBzWzBdXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uU0VUX0NVUlJFTlRfQVBQKGN1cnJlbnQpKVxuXHRcdH1cblx0fVxuXHQsTkVYVF9BUFBMSUNBVElPTjogYXBwPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGFwcHM9c3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdXG5cdFx0bGV0IGlkcz1PYmplY3Qua2V5cyhhcHBzKVxuXHRcdGxldCBpbmRleD1pZHNbKGlkcy5pbmRleE9mKGFwcCkrMSklaWRzLmxlbmd0aF1cblx0XHRpZihpbmRleCl7XG5cdFx0XHRsZXQgbmV4dD1hcHBzW2luZGV4XVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChuZXh0KSlcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgU0VUX0NVUlJFTlRfQVBQYDpcblx0XHRyZXR1cm4ge2FwcDpwYXlsb2FkLl9pZH1cblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgUWlsaUNvbnNvbGUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtfaWQsbmFtZSwgY2hpbGRyZW4sIGRpc3BhdGNoLCByb3V0ZXN9PXRoaXMucHJvcHNcblx0XHRsZXQgcHJvcHM9e1xuXHRcdFx0YXBwSWQ6IFwicWlsaUFkbWluXCJcblx0XHRcdCxpbml0OmE9PkFwcGxpY2F0aW9uLmluaXQoKS50aGVuKGFwcHM9PmRpc3BhdGNoKEFDVElPTi5BUFBTX0ZFVENIRUQoYXBwcykpKVxuXHRcdH1cblx0XHRpZighX2lkKXtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxRaWxpQXBwIHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0PEVtcHR5IGljb249ezxMb2dvLz59PlxuXHRcdFx0XHRcdFx0PExpbmsgdG89XCJhcHBcIj5jbGljayB0byBjcmVhdGUgeW91ciBmaXJzdCBxaWxpIGFwcDwvTGluaz5cblx0XHRcdFx0XHQ8L0VtcHR5PlxuXHRcdFx0XHQ8L1FpbGlBcHA+XG5cdFx0XHQpXG5cdFx0fVxuXG5cdFx0bGV0IHF1aWNrU3dpdGNoU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRxdWlja1N3aXRjaFN0eWxlLmRpc3BsYXk9XCJub25lXCJcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIiBtaW5pPXt0cnVlfVxuXHRcdFx0XHRcdHN0eWxlPXtxdWlja1N3aXRjaFN0eWxlfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ORVhUX0FQUExJQ0FUSU9OKF9pZCkpfT5cblx0XHRcdFx0XHR7bmFtZX1cblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cblx0XHRcdFx0e2NoaWxkcmVufVxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG5cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQnXG5pbXBvcnQgQXBwVUksIHtDcmVhdG9yfSBmcm9tICcuL2FwcCdcbmltcG9ydCBDbG91ZFVJIGZyb20gJy4vY2xvdWQnXG5pbXBvcnQgRGF0YVVJIGZyb20gJy4vZGF0YSdcbmltcG9ydCBMb2dVSSBmcm9tICcuL2xvZydcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcIi4vc2V0dGluZ1wiXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuXG5leHBvcnQgY29uc3QgTWFpbj1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCJcblx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudEFwcChzdGF0ZSksXCJfaWRcIixcIm5hbWVcIikpKFFpbGlDb25zb2xlKX0+XG5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cblx0XHRcblx0XHQ8Um91dGUgcGF0aD1cImFwcFwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdCgpKENyZWF0b3IpfS8+XG5cdFx0XHRcdFxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCIgXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7X2lkfX0pPT57XG5cdFx0XHRcdFx0bGV0IHVybEFwcD1nZXRBcHAoc3RhdGUsX2lkKVxuXHRcdFx0XHRcdGxldCBjdXJyZW50PWdldEN1cnJlbnRBcHAoc3RhdGUpXG5cdFx0XHRcdFx0bGV0IGluZm89Y29tcGFjdCh1cmxBcHAsXCJuYW1lXCIsXCJ1bmFtZVwiLFwiYXBpS2V5XCIpXG5cdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9dXJsQXBwPT1jdXJyZW50XG5cdFx0XHRcdFx0cmV0dXJuIGluZm9cblx0XHRcdFx0XHR9KShBcHBVSSl9XG5cdFx0XHRcdG9uRW50ZXI9eyh7cGFyYW1zOntfaWR9fSk9PmluaXRBcHA9X2lkfVxuXHRcdFx0XHQvPlxuXHRcdDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjbG91ZFwiIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtjbG91ZENvZGU6Z2V0Q3VycmVudEFwcChzdGF0ZSkuY2xvdWRDb2RlfSkpKENsb3VkVUkpfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJkYXRhXCJcblx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHsuLi5zdGF0ZS51aS5kYXRhLGFwcDpnZXRDdXJyZW50QXBwKHN0YXRlKS5faWR9KSkoRGF0YVVJKX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz17YCR7VXNlci5fbmFtZX1gfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpuYW1lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwibG9nXCJcblx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+c3RhdGUudWkubG9nKShMb2dVSSl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCJhbGxcIi8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpsZXZlbFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIj5cblx0XHRcdDxJbmRleFJvdXRlXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHthcHBzOk9iamVjdC52YWx1ZXMoc3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdKX0pKShNeVVJKX1cblx0XHRcdFx0Y29udGV4dHVhbD17ZmFsc2V9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cbiAgICA8L1JvdXRlPilcblx0LFsgIHtbRE9NQUlOXTpSRURVQ0VSfVxuXHRcdCx7XG5cdFx0XHR1aTplbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyhcblx0XHRcdFx0e2xvZzpMb2dVSS5SRURVQ0VSfVxuXHRcdFx0XHQse2Nsb3VkOkNsb3VkVUkuUkVEVUNFUn1cblx0XHRcdFx0LHtkYXRhOkRhdGFVSS5SRURVQ0VSfVxuXHRcdFx0KVxuXHRcdH1dXG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=