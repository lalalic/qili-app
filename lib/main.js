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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/APP_CHANGED":
			return { app: payload.app };
	}
	return state;
});

var QiliConsole = function (_Component) {
	_inherits(QiliConsole, _Component);

	function QiliConsole(props) {
		_classCallCheck(this, QiliConsole);

		var _this = _possibleConstructorReturn(this, (QiliConsole.__proto__ || Object.getPrototypeOf(QiliConsole)).call(this, props));

		_app2.default.on('change', function (app) {
			var _this$props = _this.props,
			    dispatch = _this$props.dispatch,
			    routes = _this$props.routes,
			    params = _this$props.params;
			var router = _this.context.router;

			dispatch(ACTION.APP_CHANGED(app));
			if (routes[1] && routes[1].name == 'app' && params.name != app.name) router.replace("/app/" + app.name);
		});
		return _this;
	}

	_createClass(QiliConsole, [{
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
			return { app: state[DOMAIN].app };
		})(QiliConsole) },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: "app/:name", name: "app",
		component: (0, _reactRedux.connect)(function (state) {
			return _extends({ app: state[DOMAIN].app }, state.ui[_app4.default.DOMAIN]);
		})(_app4.default),
		onEnter: function onEnter(_ref2) {
			var name = _ref2.params.name;

			if (!_app2.default.current) {
				QiliConsole.WrappedComponent.defaultProps.initAppName = name;
			}
		}
	}),
	_react2.default.createElement(_reactRouter.Route, { path: "app", contextual: false,
		component: (0, _reactRedux.connect)(function (state) {
			return state.ui;
		})(_app3.Creator) }),
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
), [REDUCER, { ui: (0, _.enhancedCombineReducers)(_app4.default.REDUCER) } /*,AppUI.REDUCER,LogUI.REDUCER,CloudUI.REDUCER,ProfileUI.REDUCER,DataUI.REDUCER*/]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFQUF9DSEFOR0VEIiwidHlwZSIsInBheWxvYWQiLCJhcHAiLCJBUFBTX0ZFVENIRUQiLCJkaXNwYXRjaCIsImFwcHMiLCJTY2hlbWEiLCJlbnRpdGllcyIsIlNXSVRDSF9BUFBMSUNBVElPTiIsImdldFN0YXRlIiwiX25hbWUiLCJpZHMiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXgiLCJpbmRleE9mIiwibGVuZ3RoIiwiY3VycmVudCIsIlJFRFVDRVIiLCJzdGF0ZSIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJvbiIsInJvdXRlcyIsInBhcmFtcyIsInJvdXRlciIsImNvbnRleHQiLCJuYW1lIiwicmVwbGFjZSIsImluaXRBcHBOYW1lIiwiY2hpbGRyZW4iLCJhcHBJZCIsImluaXQiLCJ0aGVuIiwicXVpY2tTd2l0Y2hTdHlsZSIsImZvbnRTaXplIiwiZmluZCIsImEiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsIl9pZCIsImRlZmF1bHRQcm9wcyIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIk1haW4iLCJyZW5kZXIiLCJ1aSIsIldyYXBwZWRDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFrRkE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBcEdBQSxRQUFRLHFCQUFSO0lBV09DLEssUUFBQUEsSzs7O0FBRVAsSUFBTUMsU0FBTyxXQUFiOztBQUVBLElBQU1DLFNBQU87QUFDWkMsY0FBWTtBQUFBLFNBQU0sRUFBQ0MsYUFBVUgsTUFBVixpQkFBRCxFQUFnQ0ksU0FBUSxFQUFDQyxRQUFELEVBQXhDLEVBQU47QUFBQSxFQURBO0FBRVhDLGVBQWM7QUFB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LEdBQVIsZ0JBRFosR0FiRztBQWdCRyxxREFBTyxNQUFLLE9BQVosRUFBb0IsMEJBQXBCLEdBaEJIO0FBa0JHO0FBQUE7QUFBQSxJQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkI7QUFDSSw4REFBZSxTQUFPLE9BQUtwQyxLQUEzQixHQURKO0FBRUksc0RBQU8sTUFBSyxPQUFaO0FBRkosRUFsQkg7QUF1Qkc7QUFBQTtBQUFBLElBQU8sTUFBSyxLQUFaLEVBQWtCLHdCQUFsQjtBQUNJLDhEQUFlLElBQUcsS0FBbEIsR0FESjtBQUVJLHNEQUFPLE1BQUssUUFBWjtBQUZKLEVBdkJIO0FBNEJIO0FBQUE7QUFBQSxJQUFPLE1BQUssSUFBWjtBQUNDLDJEQUFZLHVCQUFaLEVBQTZCLFlBQVksS0FBekMsR0FERDtBQUVDLHNEQUFPLE1BQUssU0FBWixFQUFzQiw0QkFBdEIsR0FGRDtBQUdDLHNEQUFPLE1BQUssU0FBWixFQUFzQixnQ0FBdEIsRUFBNEMsWUFBWSxLQUF4RDtBQUhEO0FBNUJHLENBRGEsRUFxQ2hCLENBQUNRLE9BQUQsRUFBVSxFQUFDNEIsSUFBRywrQkFBd0IsY0FBTTVCLE9BQTlCLENBQUosRUFBVixDQUFxRCxpRkFBckQsQ0FyQ2dCLENBQVg7O0FBeUNQIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeSwgUmVkaXJlY3QsIEluZGV4UmVkaXJlY3QsIExpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCwgVUksIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzfSBmcm9tICcuJ1xuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jb25zdCBET01BSU49XCJxaWxpQWRtaW5cIlxuXG5jb25zdCBBQ1RJT049e1xuXHRBUFBfQ0hBTkdFRDphcHA9Pih7dHlwZTpgQEAke0RPTUFJTn0vQVBQX0NIQU5HRURgLHBheWxvYWQ6e2FwcH19KVxuXHQsQVBQU19GRVRDSEVEOiBhcHBzPT5kaXNwYXRjaD0+e1xuXHRcdGRpc3BhdGNoKHt0eXBlOidOT1JNQUxJWkVEX0RBVEEnLHBheWxvYWQ6bm9ybWFsaXplKGFwcHMsYXJyYXlPZihBcHBsaWNhdGlvbi5TY2hlbWEpKS5lbnRpdGllc30pXG5cdH1cblx0LFNXSVRDSF9BUFBMSUNBVElPTjogYXBwPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3QgYXBwcz1nZXRTdGF0ZSgpLmVudGl0aWVzW0FwcGxpY2F0aW9uLl9uYW1lXVxuXHRcdGxldCBpZHM9T2JqZWN0LmtleXMoYXBwcylcblx0XHRsZXQgaW5kZXg9aWRzWyhpZHMuaW5kZXhPZihhcHApKzEpJWlkcy5sZW5ndGhdXG5cdFx0QXBwbGljYXRpb24uY3VycmVudD1hcHBzW2luZGV4XVxuXHR9XG59XG5cbmNvbnN0IFJFRFVDRVI9e1xuXHRbRE9NQUlOXTogKHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9BUFBfQ0hBTkdFRGA6XG5cdFx0XHRyZXR1cm4ge2FwcDpwYXlsb2FkLmFwcH1cblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuY2xhc3MgUWlsaUNvbnNvbGUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblx0XHRBcHBsaWNhdGlvbi5vbignY2hhbmdlJyxhcHA9Pntcblx0XHRcdGNvbnN0IHtkaXNwYXRjaCxyb3V0ZXMscGFyYW1zfT10aGlzLnByb3BzXG5cdFx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5BUFBfQ0hBTkdFRChhcHApKVxuXHRcdFx0aWYocm91dGVzWzFdICYmIHJvdXRlc1sxXS5uYW1lPT0nYXBwJyAmJiBwYXJhbXMubmFtZSE9YXBwLm5hbWUpXG5cdFx0XHRcdHJvdXRlci5yZXBsYWNlKGAvYXBwLyR7YXBwLm5hbWV9YClcblx0XHR9KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7YXBwLCBpbml0QXBwTmFtZSwgY2hpbGRyZW4sIGRpc3BhdGNoLCByb3V0ZXN9PXRoaXMucHJvcHNcblx0XHRsZXQgcHJvcHM9e1xuXHRcdFx0YXBwSWQ6IFwicWlsaUFkbWluXCJcblx0XHRcdCxpbml0OmE9PkFwcGxpY2F0aW9uLmluaXQoaW5pdEFwcE5hbWUpLnRoZW4oYXBwcz0+ZGlzcGF0Y2goQUNUSU9OLkFQUFNfRkVUQ0hFRChhcHBzKSkpXG5cdFx0fVxuXHRcdGlmKCFhcHApe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0XHQ8RW1wdHkgaWNvbj17PExvZ28vPn0+XG5cdFx0XHRcdFx0XHQ8TGluayB0bz1cImFwcFwiPmNsaWNrIHRvIGNyZWF0ZSB5b3VyIGZpcnN0IHFpbGkgYXBwPC9MaW5rPlxuXHRcdFx0XHRcdDwvRW1wdHk+XG5cdFx0XHRcdDwvUWlsaUFwcD5cblx0XHRcdClcblx0XHR9XG5cdFx0XG5cdFx0bGV0IHF1aWNrU3dpdGNoU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRxdWlja1N3aXRjaFN0eWxlLmRpc3BsYXk9XCJub25lXCJcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIiBtaW5pPXt0cnVlfVxuXHRcdFx0XHRcdHN0eWxlPXtxdWlja1N3aXRjaFN0eWxlfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TV0lUQ0hfQVBQTElDQVRJT04oYXBwLl9pZCkpfT5cblx0XHRcdFx0XHR7YXBwLm5hbWV9XG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG5cdFx0XHRcdHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvUWlsaUFwcD5cbiAgICAgICAgKVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRpbml0QXBwTmFtZTpudWxsXG5cdH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG5cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQnXG5pbXBvcnQgQXBwVUksIHtDcmVhdG9yfSBmcm9tICcuL2FwcCdcbmltcG9ydCBDbG91ZFVJIGZyb20gJy4vY2xvdWQnXG5pbXBvcnQgRGF0YVVJIGZyb20gJy4vZGF0YSdcbmltcG9ydCBMb2dVSSBmcm9tICcuL2xvZydcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcIi4vc2V0dGluZ1wiXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuXG5cbmV4cG9ydCBjb25zdCBNYWluPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBcblx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YXBwOnN0YXRlW0RPTUFJTl0uYXBwfSkpKFFpbGlDb25zb2xlKX0+XG5cdFx0XG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhcHAvOm5hbWVcIiBuYW1lPVwiYXBwXCIgXG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YXBwOnN0YXRlW0RPTUFJTl0uYXBwLC4uLnN0YXRlLnVpW0FwcFVJLkRPTUFJTl19KSkoQXBwVUkpfVxuXHRcdFx0b25FbnRlcj17KHtwYXJhbXM6e25hbWV9fSk9Pntcblx0XHRcdFx0aWYoIUFwcGxpY2F0aW9uLmN1cnJlbnQpe1xuXHRcdFx0XHRcdFFpbGlDb25zb2xlLldyYXBwZWRDb21wb25lbnQuZGVmYXVsdFByb3BzLmluaXRBcHBOYW1lPW5hbWVcblx0XHRcdFx0fVxuXHRcdFx0fX1cblx0XHRcdC8+XG5cdFx0PFJvdXRlIHBhdGg9XCJhcHBcIiBjb250ZXh0dWFsPXtmYWxzZX0gXG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PnN0YXRlLnVpKShDcmVhdG9yKX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e0Nsb3VkVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImRhdGFcIiBjb21wb25lbnQ9e0RhdGFVSX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz17YCR7VXNlci5fbmFtZX1gfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpuYW1lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwibG9nXCIgY29tcG9uZW50PXtMb2dVSX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cImFsbFwiLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmxldmVsXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cbiAgICA8L1JvdXRlPilcblx0LFtSRURVQ0VSLCB7dWk6ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoQXBwVUkuUkVEVUNFUil9LyosQXBwVUkuUkVEVUNFUixMb2dVSS5SRURVQ0VSLENsb3VkVUkuUkVEVUNFUixQcm9maWxlVUkuUkVEVUNFUixEYXRhVUkuUkVEVUNFUiovXVxuKVxuXG5cbi8qKlxuQFRvZG86XG4qRG9uZTogYWZ0ZXIgYWRkaW5nIG5ldyBhcHBsaWNhdGlvblxuICAgIGFwcGxpY2F0aW9uIGxpc3QgZG9lc24ndCByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICBsb2NhbCBzdG9yYWdlIHdpdGhvdXQgQWxsIGZpZWxkcywgc3VjaCBhcyB3aXRob3V0IGFwcGxpY2F0aW9uIG5hbWUsIC4uLiwgYmVjYXVzZSBzZXJ2ZXIgcmV0dXJuZWQgb25seSBfaWQsIGNyZWF0ZWRBdCwgLi4uXG4qRG9uZTogYWZ0ZXIgYXBwbGljYXRpb24gZGVsZXRpb24sIFVJIHNob3VsZCBnbyB0byAvIGV2ZW4gd2l0aCBlcnJvclxuKkRvbmU6IGVycm9yIGhhcHBlbnMsIFVJIHNob3VsZCBub3QgYmUgRW1wdHlcbipEb24ndDogdXNlIDxMaW5rLz4gcmF0aGVyIHRoYW4gdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG9cbioqRG9uZTogTmV2ZXIgZW1wdHkgVUlcbioqRG9uZTogRmxvYXRBY3Rpb25CdXR0b24gcG9zaXRpb24gd2hlbiB2aWV3IHdpZHRoIGlzIDk2MFxuXG4qIHRvbyBzbWFsbC16b29tIHNpemUgaW4gbW9iaWxlIGJyb3dzZXJcbiogZmlyc3QgZm9jdXMgb24gZm9ybSwgY2xvdWQgVUlcbiogYmFja2dyb3VuZCB0byB1cGxvYWQgdG8gYmFja2VuZFxuICAgIGRvbmU6IFdlYlNRTERiIGlzIGRvbmVcbiAgICAqKiogc3FsaXRlXG4gICAgZG9uZTogKioqIGFmdGVyIHJlbW92ZSBhcHAsIGxvY2FsIGNhY2hlIHNob3VsZCBiZSByZW1vdmVkIHRvb1xuKiogdGV4dGZpZWxkIGNhbid0IGJlIGNoYW5nZWQgKHdoaWNoPz8pXG4qRG9uZTogbG9naW4gZXJyb3IsIHBsYWNlaG9sZGVyIGFuZCB2YWx1ZSBzaG93IHRvZ2V0aGVyXG4qIHNpbXBsZSBkYXRhIG1vZGU6XG4gICAgKiByZW1vdGUgdXBzZXJ0IGFuZCByZW1vdmUgZGlyZWN0bHlcbiAgICAqIGxvY2FsIGNhY2hlIGZvciBzZWFyY2hcbiogQ2Fubm90IHJlYWQgcHJvcGVydHkgJ2NvbXBvbmVudERpZEVudGVyJyBvZiB1bmRlZmluZWRcbipEb25lOiBEYXRlIHNob3cgYXMgbWVhbmluZ2Z1bFxuKiBkYXRhIGxpc3QgdG8gc2hvdyBvYmplY3QgZmllbGQgW29iamVjdF09PnsuLi59XG4qL1xuIl19