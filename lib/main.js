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
				var apps = state.entities[_app2.default._name];
				return { apps: apps ? Object.keys(apps).map(function (k) {
						return apps[k];
					}) : [] };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJpbml0QXBwIiwiRW1wdHkiLCJET01BSU4iLCJBQ1RJT04iLCJTRVRfQ1VSUkVOVF9BUFBfQllfSUQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic3RhdGUiLCJhcHBzIiwiZW50aXRpZXMiLCJfbmFtZSIsImZvdW5kIiwiaWQiLCJTRVRfQ1VSUkVOVF9BUFAiLCJjdXJyZW50IiwiYXBwIiwidHlwZSIsInBheWxvYWQiLCJBUFBTX0ZFVENIRUQiLCJsZW5ndGgiLCJzY2hlbWEiLCJmaW5kIiwiYSIsIl9pZCIsIk5FWFRfQVBQTElDQVRJT04iLCJpZHMiLCJPYmplY3QiLCJrZXlzIiwiaW5kZXgiLCJpbmRleE9mIiwibmV4dCIsIlJFRFVDRVIiLCJRaWxpQ29uc29sZSIsInByb3BzIiwibmFtZSIsImNoaWxkcmVuIiwicm91dGVzIiwiYXBwSWQiLCJpbml0IiwidGhlbiIsInByb2plY3QiLCJxdWlja1N3aXRjaFN0eWxlIiwiZm9udFNpemUiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIm9iamVjdCIsIk1haW4iLCJyZW5kZXIiLCJwYXJhbXMiLCJ1cmxBcHAiLCJpbmZvIiwiaXNDdXJyZW50IiwiY2xvdWRDb2RlIiwidWkiLCJkYXRhIiwibG9nIiwibWFwIiwiayIsImNsb3VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBeUZBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQTVHQUEsUUFBUSxxQkFBUjs7O0FBWUEsSUFBSUMsVUFBUSxJQUFaOztJQUVPQyxLLFFBQUFBLEs7OztBQUVQLElBQU1DLFNBQU8sV0FBYjs7QUFFTyxJQUFNQywwQkFBTztBQUNuQkMs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Q0FBTCxDQUFIO0FBQUEsTUFBdEIsQ0FBUCxHQUEyQyxFQUFsRCxFQUFQO0FBQ0EsSUFIVSxlQURaO0FBS0MsZUFBWSxLQUxiLEdBREQ7QUFRQyxzREFBTyxNQUFLLFNBQVosRUFBc0IsNEJBQXRCLEdBUkQ7QUFTQyxzREFBTyxNQUFLLFNBQVosRUFBc0IsZ0NBQXRCLEVBQTRDLFlBQVksS0FBeEQ7QUFURDtBQWxDRyxDQURhLEVBaURoQixxQkFBS3pELE1BQUwsRUFBYTZCLE9BQWIsR0FDQztBQUNBd0IsS0FBRywrQkFDRixFQUFDRSxLQUFJLGNBQU0xQixPQUFYLEVBREUsRUFFRCxFQUFDNkIsT0FBTSxnQkFBUTdCLE9BQWYsRUFGQyxFQUdELEVBQUN5QixNQUFLLGVBQU96QixPQUFiLEVBSEM7QUFESCxDQURELENBakRnQixDQUFYOztBQTREUCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b24sIEFwcEJhciwgSWNvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXHJcbmltcG9ydCB7bm9ybWFsaXplLGFycmF5T2Z9IGZyb20gXCJub3JtYWxpenJcIlxyXG5cclxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCwgVUksIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzLCBjb21wYWN0LCBFTlRJVElFU30gZnJvbSAnLidcclxuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xyXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xyXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXHJcbmltcG9ydCB7Z2V0Q3VycmVudEFwcCwgZ2V0QXBwfSBmcm9tIFwiLi9zZWxlY3RvclwiXHJcblxyXG5sZXQgaW5pdEFwcD1udWxsXHJcblxyXG5jb25zdCB7RW1wdHl9PVVJXHJcblxyXG5jb25zdCBET01BSU49XCJxaWxpQWRtaW5cIlxyXG5cclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0U0VUX0NVUlJFTlRfQVBQX0JZX0lEOiBpZD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0bGV0IHN0YXRlPWdldFN0YXRlKClcclxuXHRcdGxldCBhcHBzPXN0YXRlLmVudGl0aWVzW0FwcGxpY2F0aW9uLl9uYW1lXVxyXG5cdFx0bGV0IGZvdW5kPWFwcHNbaWRdXHJcblx0XHRpZihmb3VuZClcclxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChmb3VuZCkpXHJcblx0fVxyXG5cdCxTRVRfQ1VSUkVOVF9BUFA6YXBwPT57XHJcblx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxyXG5cdFx0cmV0dXJuIHt0eXBlOmBTRVRfQ1VSUkVOVF9BUFBgLHBheWxvYWQ6YXBwfVxyXG5cdH1cclxuXHQsQVBQU19GRVRDSEVEOiBhcHBzPT5kaXNwYXRjaD0+e1xyXG5cdFx0aWYoYXBwcy5sZW5ndGgpe1xyXG5cdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoYXBwcyxhcnJheU9mKEFwcGxpY2F0aW9uLnNjaGVtYSkpLmVudGl0aWVzKSlcclxuXHRcdFx0bGV0IGN1cnJlbnQ9bnVsbFxyXG5cdFx0XHRpZihpbml0QXBwKVxyXG5cdFx0XHRcdGN1cnJlbnQ9YXBwcy5maW5kKGE9PmEuX2lkPT1pbml0QXBwKVxyXG5cdFx0XHRpZighY3VycmVudClcclxuXHRcdFx0XHRjdXJyZW50PWFwcHNbMF1cclxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChjdXJyZW50KSlcclxuXHRcdH1cclxuXHR9XHJcblx0LE5FWFRfQVBQTElDQVRJT046IGFwcD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxyXG5cdFx0Y29uc3QgYXBwcz1zdGF0ZS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV1cclxuXHRcdGxldCBpZHM9T2JqZWN0LmtleXMoYXBwcylcclxuXHRcdGxldCBpbmRleD1pZHNbKGlkcy5pbmRleE9mKGFwcCkrMSklaWRzLmxlbmd0aF1cclxuXHRcdGlmKGluZGV4KXtcclxuXHRcdFx0bGV0IG5leHQ9YXBwc1tpbmRleF1cclxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChuZXh0KSlcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIGBTRVRfQ1VSUkVOVF9BUFBgOlxyXG5cdFx0cmV0dXJuIHthcHA6cGF5bG9hZC5faWR9XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5jbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtfaWQsbmFtZSwgY2hpbGRyZW4sIGRpc3BhdGNoLCByb3V0ZXN9PXRoaXMucHJvcHNcclxuXHRcdGxldCBwcm9wcz17XHJcblx0XHRcdGFwcElkOiBcInFpbGlBZG1pblwiXHJcblx0XHRcdCxpbml0OmE9PkFwcGxpY2F0aW9uLmluaXQoKS50aGVuKGFwcHM9PmRpc3BhdGNoKEFDVElPTi5BUFBTX0ZFVENIRUQoYXBwcykpKVxyXG5cdFx0XHQscHJvamVjdDogcmVxdWlyZShcIi4uL3BhY2thZ2UuanNvblwiKVxyXG5cdFx0fVxyXG5cdFx0aWYoIV9pZCl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cclxuXHRcdFx0XHRcdDxBcHBCYXIgdGl0bGU9XCJTdGFydCBmcm9tIHlvdXIgZmlyc3QgcWlsaSBBcHBsaWNhaXRvbiFcIi8+XHJcblx0XHRcdFx0XHQ8Q3JlYXRvciBiRmlyc3Q9e3RydWV9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPlxyXG5cdFx0XHRcdDwvUWlsaUFwcD5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBxdWlja1N3aXRjaFN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9XHJcblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXHJcblx0XHRcdHF1aWNrU3dpdGNoU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8UWlsaUFwcCB7Li4ucHJvcHN9PlxyXG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIgbWluaT17dHJ1ZX1cclxuXHRcdFx0XHRcdHN0eWxlPXtxdWlja1N3aXRjaFN0eWxlfVxyXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLk5FWFRfQVBQTElDQVRJT04oX2lkKSl9PlxyXG5cdFx0XHRcdFx0e25hbWV9XHJcblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgIDwvUWlsaUFwcD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcblxyXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkJ1xyXG5pbXBvcnQgQXBwVUksIHtDcmVhdG9yfSBmcm9tICcuL2FwcCdcclxuaW1wb3J0IENsb3VkVUkgZnJvbSAnLi9jbG91ZCdcclxuaW1wb3J0IERhdGFVSSBmcm9tICcuL2RhdGEnXHJcbmltcG9ydCBMb2dVSSBmcm9tICcuL2xvZydcclxuaW1wb3J0IE15VUkgZnJvbSBcIi4vbXlcIlxyXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gXCIuL3NldHRpbmdcIlxyXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXHJcblxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IE1haW49UWlsaUFwcC5yZW5kZXIoXHJcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCJcclxuXHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50QXBwKHN0YXRlKSxcIl9pZFwiLFwibmFtZVwiKSkoUWlsaUNvbnNvbGUpfT5cclxuXHJcbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImFwcFwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cclxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KCkoQ3JlYXRvcil9Lz5cclxuXHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZFwiXHJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KChzdGF0ZSx7cGFyYW1zOntfaWR9fSk9PntcclxuXHRcdFx0XHRcdGxldCB1cmxBcHA9Z2V0QXBwKHN0YXRlLF9pZClcclxuXHRcdFx0XHRcdGxldCBjdXJyZW50PWdldEN1cnJlbnRBcHAoc3RhdGUpXHJcblx0XHRcdFx0XHRsZXQgaW5mbz1jb21wYWN0KHVybEFwcCxcIm5hbWVcIixcInVuYW1lXCIsXCJhcGlLZXlcIilcclxuXHRcdFx0XHRcdGluZm8uaXNDdXJyZW50PXVybEFwcD09Y3VycmVudFxyXG5cdFx0XHRcdFx0cmV0dXJuIGluZm9cclxuXHRcdFx0XHRcdH0pKEFwcFVJKX1cclxuXHRcdFx0XHRvbkVudGVyPXsoe3BhcmFtczp7X2lkfX0pPT5pbml0QXBwPV9pZH1cclxuXHRcdFx0XHQvPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjbG91ZFwiIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtjbG91ZENvZGU6Z2V0Q3VycmVudEFwcChzdGF0ZSkuY2xvdWRDb2RlfSkpKENsb3VkVUkpfS8+XHJcblxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiXHJcblx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHsuLi5zdGF0ZS51aS5kYXRhLGFwcDpnZXRDdXJyZW50QXBwKHN0YXRlKS5faWR9KSkoRGF0YVVJKX0+XHJcbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cclxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bmFtZVwiLz5cclxuICAgICAgICA8L1JvdXRlPlxyXG5cclxuICAgICAgICA8Um91dGUgcGF0aD1cImxvZ1wiXHJcblx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+c3RhdGUudWkubG9nKShMb2dVSSl9PlxyXG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cImFsbFwiLz5cclxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bGV2ZWxcIi8+XHJcbiAgICAgICAgPC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XHJcblx0XHRcdDxJbmRleFJvdXRlXHJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT57XHJcblx0XHRcdFx0XHRsZXQgYXBwcz1zdGF0ZS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV1cclxuXHRcdFx0XHRcdHJldHVybiB7YXBwczogYXBwcyA/IE9iamVjdC5rZXlzKGFwcHMpLm1hcChrPT5hcHBzW2tdKSA6IFtdfVx0XHJcblx0XHRcdFx0fSkoTXlVSSl9XHJcblx0XHRcdFx0Y29udGV4dHVhbD17ZmFsc2V9Lz5cclxuXHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cclxuICAgIDwvUm91dGU+KVxyXG5cdCxbICB7W0RPTUFJTl06UkVEVUNFUn1cclxuXHRcdCx7XHJcblx0XHRcdHVpOmVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKFxyXG5cdFx0XHRcdHtsb2c6TG9nVUkuUkVEVUNFUn1cclxuXHRcdFx0XHQse2Nsb3VkOkNsb3VkVUkuUkVEVUNFUn1cclxuXHRcdFx0XHQse2RhdGE6RGF0YVVJLlJFRFVDRVJ9XHJcblx0XHRcdClcclxuXHRcdH1dXHJcbilcclxuXHJcblxyXG4vKipcclxuQFRvZG86XHJcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXHJcbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXHJcbiAgICBsb2NhbCBzdG9yYWdlIHdpdGhvdXQgQWxsIGZpZWxkcywgc3VjaCBhcyB3aXRob3V0IGFwcGxpY2F0aW9uIG5hbWUsIC4uLiwgYmVjYXVzZSBzZXJ2ZXIgcmV0dXJuZWQgb25seSBfaWQsIGNyZWF0ZWRBdCwgLi4uXHJcbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXHJcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XHJcbipEb24ndDogdXNlIDxMaW5rLz4gcmF0aGVyIHRoYW4gdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG9cclxuKipEb25lOiBOZXZlciBlbXB0eSBVSVxyXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcclxuXHJcbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXHJcbiogYmFja2dyb3VuZCB0byB1cGxvYWQgdG8gYmFja2VuZFxyXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxyXG4gICAgKioqIHNxbGl0ZVxyXG4gICAgZG9uZTogKioqIGFmdGVyIHJlbW92ZSBhcHAsIGxvY2FsIGNhY2hlIHNob3VsZCBiZSByZW1vdmVkIHRvb1xyXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcclxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxyXG4qIHNpbXBsZSBkYXRhIG1vZGU6XHJcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxyXG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXHJcbiogQ2Fubm90IHJlYWQgcHJvcGVydHkgJ2NvbXBvbmVudERpZEVudGVyJyBvZiB1bmRlZmluZWRcclxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXHJcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxyXG4qL1xyXG4iXX0=