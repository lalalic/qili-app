"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Main = exports.ACTION = undefined;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
			var ids = Object.keys(apps);
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
	_inherits(QiliConsole, _Component);

	function QiliConsole() {
		_classCallCheck(this, QiliConsole);

		return _possibleConstructorReturn(this, (QiliConsole.__proto__ || Object.getPrototypeOf(QiliConsole)).apply(this, arguments));
	}

	_createClass(QiliConsole, [{
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
				return _extends({}, state.ui.data, { app: (0, _selector.getCurrentApp)(state)._id });
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
		_react2.default.createElement(_reactRouter.Route, { path: "profile", component: _userProfile2.default, contextual: false })
	)
), [_defineProperty({}, DOMAIN, REDUCER), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJpbml0QXBwIiwiRW1wdHkiLCJET01BSU4iLCJBQ1RJT04iLCJTRVRfQ1VSUkVOVF9BUFBfQllfSUQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic3RhdGUiLCJhcHBzIiwiZW50aXRpZXMiLCJfbmFtZSIsImZvdW5kIiwiaWQiLCJTRVRfQ1VSUkVOVF9BUFAiLCJjdXJyZW50IiwiYXBwIiwidHlwZSIsInBheWxvYWQiLCJBUFBTX0ZFVENIRUQiLCJsZW5ndGgiLCJzY2hlbWEiLCJmaW5kIiwiYSIsIl9pZCIsIk5FWFRfQVBQTElDQVRJT04iLCJpZHMiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXgiLCJpbmRleE9mIiwibmV4dCIsIlJFRFVDRVIiLCJRaWxpQ29uc29sZSIsInByb3BzIiwibmFtZSIsImNoaWxkcmVuIiwicm91dGVzIiwiYXBwSWQiLCJpbml0IiwidGhlbiIsInByb2plY3QiLCJxdWlja1N3aXRjaFN0eWxlIiwiZm9udFNpemUiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIm9iamVjdCIsIk1haW4iLCJyZW5kZXIiLCJwYXJhbXMiLCJ1cmxBcHAiLCJpbmZvIiwiaXNDdXJyZW50IiwiY2xvdWRDb2RlIiwidWkiLCJkYXRhIiwibG9nIiwidmFsdWVzIiwiY2xvdWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUF5RkE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBNUdBQSxRQUFRLHFCQUFSOzs7QUFZQSxJQUFJQyxVQUFRLElBQVo7O0lBRU9DLEssUUFBQUEsSzs7O0FBRVAsSUFBTUMsU0FBTyxXQUFiOztBQUVPLElBQU1DLDBCQUFPO0FBQ25CQyx3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QUF0QixHQUxEO0FBTUMsc0RBQU8sTUFBSyxTQUFaLEVBQXNCLGdDQUF0QixFQUE0QyxZQUFZLEtBQXhEO0FBTkQ7QUFsQ0csQ0FEYSxFQThDaEIscUJBQUtSLE1BQUwsRUFBYTZCLE9BQWIsR0FDQztBQUNBd0IsS0FBRywrQkFDRixFQUFDRSxLQUFJLGNBQU0xQixPQUFYLEVBREUsRUFFRCxFQUFDNEIsT0FBTSxnQkFBUTVCLE9BQWYsRUFGQyxFQUdELEVBQUN5QixNQUFLLGVBQU96QixPQUFiLEVBSEM7QUFESCxDQURELENBOUNnQixDQUFYOztBQXlEUCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3RvcnksIFJlZGlyZWN0LCBJbmRleFJlZGlyZWN0LCBMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b24sIEFwcEJhciwgSWNvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCwgVUksIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzLCBjb21wYWN0LCBFTlRJVElFU30gZnJvbSAnLidcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQge2dldEN1cnJlbnRBcHAsIGdldEFwcH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuXG5sZXQgaW5pdEFwcD1udWxsXG5cbmNvbnN0IHtFbXB0eX09VUlcblxuY29uc3QgRE9NQUlOPVwicWlsaUFkbWluXCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdFNFVF9DVVJSRU5UX0FQUF9CWV9JRDogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRsZXQgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGxldCBhcHBzPXN0YXRlLmVudGl0aWVzW0FwcGxpY2F0aW9uLl9uYW1lXVxuXHRcdGxldCBmb3VuZD1hcHBzW2lkXVxuXHRcdGlmKGZvdW5kKVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChmb3VuZCkpXG5cdH1cblx0LFNFVF9DVVJSRU5UX0FQUDphcHA9Pntcblx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxuXHRcdHJldHVybiB7dHlwZTpgU0VUX0NVUlJFTlRfQVBQYCxwYXlsb2FkOmFwcH1cblx0fVxuXHQsQVBQU19GRVRDSEVEOiBhcHBzPT5kaXNwYXRjaD0+e1xuXHRcdGlmKGFwcHMubGVuZ3RoKXtcblx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShhcHBzLGFycmF5T2YoQXBwbGljYXRpb24uc2NoZW1hKSkuZW50aXRpZXMpKVxuXHRcdFx0bGV0IGN1cnJlbnQ9bnVsbFxuXHRcdFx0aWYoaW5pdEFwcClcblx0XHRcdFx0Y3VycmVudD1hcHBzLmZpbmQoYT0+YS5faWQ9PWluaXRBcHApXG5cdFx0XHRpZighY3VycmVudClcblx0XHRcdFx0Y3VycmVudD1hcHBzWzBdXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uU0VUX0NVUlJFTlRfQVBQKGN1cnJlbnQpKVxuXHRcdH1cblx0fVxuXHQsTkVYVF9BUFBMSUNBVElPTjogYXBwPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGFwcHM9c3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdXG5cdFx0bGV0IGlkcz1PYmplY3Qua2V5cyhhcHBzKVxuXHRcdGxldCBpbmRleD1pZHNbKGlkcy5pbmRleE9mKGFwcCkrMSklaWRzLmxlbmd0aF1cblx0XHRpZihpbmRleCl7XG5cdFx0XHRsZXQgbmV4dD1hcHBzW2luZGV4XVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChuZXh0KSlcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgU0VUX0NVUlJFTlRfQVBQYDpcblx0XHRyZXR1cm4ge2FwcDpwYXlsb2FkLl9pZH1cblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgUWlsaUNvbnNvbGUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtfaWQsbmFtZSwgY2hpbGRyZW4sIGRpc3BhdGNoLCByb3V0ZXN9PXRoaXMucHJvcHNcblx0XHRsZXQgcHJvcHM9e1xuXHRcdFx0YXBwSWQ6IFwicWlsaUFkbWluXCJcblx0XHRcdCxpbml0OmE9PkFwcGxpY2F0aW9uLmluaXQoKS50aGVuKGFwcHM9PmRpc3BhdGNoKEFDVElPTi5BUFBTX0ZFVENIRUQoYXBwcykpKVxuXHRcdFx0LHByb2plY3Q6IHJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIilcblx0XHR9XG5cdFx0aWYoIV9pZCl7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UWlsaUFwcCB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdDxBcHBCYXIgdGl0bGU9XCJTdGFydCBmcm9tIHlvdXIgZmlyc3QgcWlsaSBBcHBsaWNhaXRvbiFcIi8+XG5cdFx0XHRcdFx0PENyZWF0b3IgYkZpcnN0PXt0cnVlfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cblx0XHRcdFx0PC9RaWxpQXBwPlxuXHRcdFx0KVxuXHRcdH1cblxuXHRcdGxldCBxdWlja1N3aXRjaFN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9XG5cdFx0aWYocm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpKVxuXHRcdFx0cXVpY2tTd2l0Y2hTdHlsZS5kaXNwbGF5PVwibm9uZVwiXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxRaWxpQXBwIHsuLi5wcm9wc30+XG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIgbWluaT17dHJ1ZX1cblx0XHRcdFx0XHRzdHlsZT17cXVpY2tTd2l0Y2hTdHlsZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uTkVYVF9BUFBMSUNBVElPTihfaWQpKX0+XG5cdFx0XHRcdFx0e25hbWV9XG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG5cdFx0XHRcdHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvUWlsaUFwcD5cbiAgICAgICAgKVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkJ1xuaW1wb3J0IEFwcFVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9hcHAnXG5pbXBvcnQgQ2xvdWRVSSBmcm9tICcuL2Nsb3VkJ1xuaW1wb3J0IERhdGFVSSBmcm9tICcuL2RhdGEnXG5pbXBvcnQgTG9nVUkgZnJvbSAnLi9sb2cnXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gXCIuL3NldHRpbmdcIlxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwiLi91c2VyLXByb2ZpbGVcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cblxuZXhwb3J0IGNvbnN0IE1haW49UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiXG5cdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRBcHAoc3RhdGUpLFwiX2lkXCIsXCJuYW1lXCIpKShRaWxpQ29uc29sZSl9PlxuXG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cImFwcFwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdCgpKENyZWF0b3IpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZFwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7X2lkfX0pPT57XG5cdFx0XHRcdFx0bGV0IHVybEFwcD1nZXRBcHAoc3RhdGUsX2lkKVxuXHRcdFx0XHRcdGxldCBjdXJyZW50PWdldEN1cnJlbnRBcHAoc3RhdGUpXG5cdFx0XHRcdFx0bGV0IGluZm89Y29tcGFjdCh1cmxBcHAsXCJuYW1lXCIsXCJ1bmFtZVwiLFwiYXBpS2V5XCIpXG5cdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9dXJsQXBwPT1jdXJyZW50XG5cdFx0XHRcdFx0cmV0dXJuIGluZm9cblx0XHRcdFx0XHR9KShBcHBVSSl9XG5cdFx0XHRcdG9uRW50ZXI9eyh7cGFyYW1zOntfaWR9fSk9PmluaXRBcHA9X2lkfVxuXHRcdFx0XHQvPlxuXHRcdDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjbG91ZFwiIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtjbG91ZENvZGU6Z2V0Q3VycmVudEFwcChzdGF0ZSkuY2xvdWRDb2RlfSkpKENsb3VkVUkpfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJkYXRhXCJcblx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHsuLi5zdGF0ZS51aS5kYXRhLGFwcDpnZXRDdXJyZW50QXBwKHN0YXRlKS5faWR9KSkoRGF0YVVJKX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz17YCR7VXNlci5fbmFtZX1gfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpuYW1lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwibG9nXCJcblx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+c3RhdGUudWkubG9nKShMb2dVSSl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCJhbGxcIi8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpsZXZlbFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIj5cblx0XHRcdDxJbmRleFJvdXRlXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHthcHBzOk9iamVjdC52YWx1ZXMoc3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdKX0pKShNeVVJKX1cblx0XHRcdFx0Y29udGV4dHVhbD17ZmFsc2V9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cbiAgICA8L1JvdXRlPilcblx0LFsgIHtbRE9NQUlOXTpSRURVQ0VSfVxuXHRcdCx7XG5cdFx0XHR1aTplbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyhcblx0XHRcdFx0e2xvZzpMb2dVSS5SRURVQ0VSfVxuXHRcdFx0XHQse2Nsb3VkOkNsb3VkVUkuUkVEVUNFUn1cblx0XHRcdFx0LHtkYXRhOkRhdGFVSS5SRURVQ0VSfVxuXHRcdFx0KVxuXHRcdH1dXG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=