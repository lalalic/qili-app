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
			var found = apps.find(function (a) {
				return a._id == id;
			});
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
	SWITCH_APPLICATION: function SWITCH_APPLICATION(app) {
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
	var type = _ref.type;
	var payload = _ref.payload;

	switch (type) {
		case "SET_CURRENT_APP":
			return { app: payload._id };
	}
	return state;
};

var QiliConsole = function (_Component) {
	(0, _inherits3.default)(QiliConsole, _Component);

	function QiliConsole(props) {
		(0, _classCallCheck3.default)(this, QiliConsole);
		return (0, _possibleConstructorReturn3.default)(this, (QiliConsole.__proto__ || (0, _getPrototypeOf2.default)(QiliConsole)).call(this, props));
		/*
  Application.on('change',(prev,current)=>{
  	const {dispatch,routes:[root,ui],params:{_id}}=this.props
  	const {router}=this.context
  	if(ui.name=='app' && _id!=current._id)
  		router.push(`/app/${current._id}`)
  })
  */
	}

	(0, _createClass3.default)(QiliConsole, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var _id = _props._id;
			var name = _props.name;
			var children = _props.children;
			var dispatch = _props.dispatch;
			var routes = _props.routes;

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
							return dispatch(ACTION.SWITCH_APPLICATION(_id));
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
	_react2.default.createElement(_reactRouter.Route, { path: "app/:_id", name: "app",
		component: (0, _reactRedux.connect)(function (state) {
			return (0, _extends3.default)({}, (0, _.compact)((0, _selector.getCurrentApp)(state), "name", "uname", "apiKey"));
		})(_app4.default),
		onEnter: function onEnter(_ref2) {
			var _id = _ref2.params._id;
			return initApp = _id;
		}
	}),
	_react2.default.createElement(_reactRouter.Route, { path: "app", contextual: false,
		component: (0, _reactRedux.connect)()(_app3.Creator) }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJpbml0QXBwIiwiRW1wdHkiLCJET01BSU4iLCJBQ1RJT04iLCJTRVRfQ1VSUkVOVF9BUFBfQllfSUQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic3RhdGUiLCJhcHBzIiwiZW50aXRpZXMiLCJfbmFtZSIsImZvdW5kIiwiZmluZCIsImEiLCJfaWQiLCJpZCIsIlNFVF9DVVJSRU5UX0FQUCIsImN1cnJlbnQiLCJhcHAiLCJ0eXBlIiwicGF5bG9hZCIsIkFQUFNfRkVUQ0hFRCIsImxlbmd0aCIsInNjaGVtYSIsIlNXSVRDSF9BUFBMSUNBVElPTiIsImlkcyIsImluZGV4IiwiaW5kZXhPZiIsIm5leHQiLCJSRURVQ0VSIiwiUWlsaUNvbnNvbGUiLCJwcm9wcyIsIm5hbWUiLCJjaGlsZHJlbiIsInJvdXRlcyIsImFwcElkIiwiaW5pdCIsInRoZW4iLCJxdWlja1N3aXRjaFN0eWxlIiwiZm9udFNpemUiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIm9iamVjdCIsIk1haW4iLCJyZW5kZXIiLCJwYXJhbXMiLCJjbG91ZENvZGUiLCJ1aSIsImRhdGEiLCJsb2ciLCJjbG91ZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBcUdBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUF4SEFBLFFBQVEscUJBQVI7OztBQVlBLElBQUlDLFVBQVEsSUFBWjs7SUFFT0MsSyxRQUFBQSxLOzs7QUFFUCxJQUFNQyxTQUFPLFdBQWI7O0FBRU8sSUFBTUMsMEJBQU87QUFDbkJDLHdCQUF1QjtBQUFBLFNBQUksVUFBQ0MsUUFBRCxFQUFVQyxRQUFW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QixPQUFNLGdCQUFRdkIsT0FBZixFQUZDLEVBR0QsRUFBQ3FCLE1BQUssZUFBT3JCLE9BQWIsRUFIQztBQURILENBREQsQ0F0Q2dCLENBQVg7O0FBaURQIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeSwgUmVkaXJlY3QsIEluZGV4UmVkaXJlY3QsIExpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCwgVUksIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzLCBjb21wYWN0LCBFTlRJVElFU30gZnJvbSAnLidcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQge2dldEN1cnJlbnRBcHB9IGZyb20gXCIuL3NlbGVjdG9yXCJcblxubGV0IGluaXRBcHA9bnVsbFxuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmNvbnN0IERPTUFJTj1cInFpbGlBZG1pblwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRTRVRfQ1VSUkVOVF9BUFBfQllfSUQ6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0bGV0IHN0YXRlPWdldFN0YXRlKClcblx0XHRsZXQgYXBwcz1zdGF0ZS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV1cblx0XHRsZXQgZm91bmQ9YXBwcy5maW5kKGE9PmEuX2lkPT1pZClcblx0XHRpZihmb3VuZClcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5TRVRfQ1VSUkVOVF9BUFAoZm91bmQpKVxuXHR9XG5cdCxTRVRfQ1VSUkVOVF9BUFA6YXBwPT57XG5cdFx0QXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRyZXR1cm4ge3R5cGU6YFNFVF9DVVJSRU5UX0FQUGAscGF5bG9hZDphcHB9XG5cdH1cblx0LEFQUFNfRkVUQ0hFRDogYXBwcz0+ZGlzcGF0Y2g9Pntcblx0XHRpZihhcHBzLmxlbmd0aCl7XG5cdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoYXBwcyxhcnJheU9mKEFwcGxpY2F0aW9uLnNjaGVtYSkpLmVudGl0aWVzKSlcblx0XHRcdGxldCBjdXJyZW50PW51bGxcblx0XHRcdGlmKGluaXRBcHApXG5cdFx0XHRcdGN1cnJlbnQ9YXBwcy5maW5kKGE9PmEuX2lkPT1pbml0QXBwKVxuXHRcdFx0aWYoIWN1cnJlbnQpXG5cdFx0XHRcdGN1cnJlbnQ9YXBwc1swXVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChjdXJyZW50KSlcblx0XHR9XG5cdH1cblx0LFNXSVRDSF9BUFBMSUNBVElPTjogYXBwPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGFwcHM9c3RhdGUuZW50aXRpZXNbQXBwbGljYXRpb24uX25hbWVdXG5cdFx0bGV0IGlkcz1PYmplY3Qua2V5cyhhcHBzKVxuXHRcdGxldCBpbmRleD1pZHNbKGlkcy5pbmRleE9mKGFwcCkrMSklaWRzLmxlbmd0aF1cblx0XHRpZihpbmRleCl7XG5cdFx0XHRsZXQgbmV4dD1hcHBzW2luZGV4XVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlNFVF9DVVJSRU5UX0FQUChuZXh0KSlcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgU0VUX0NVUlJFTlRfQVBQYDpcblx0XHRyZXR1cm4ge2FwcDpwYXlsb2FkLl9pZH1cblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgUWlsaUNvbnNvbGUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblx0XHQvKlxuXHRcdEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLChwcmV2LGN1cnJlbnQpPT57XG5cdFx0XHRjb25zdCB7ZGlzcGF0Y2gscm91dGVzOltyb290LHVpXSxwYXJhbXM6e19pZH19PXRoaXMucHJvcHNcblx0XHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdFx0aWYodWkubmFtZT09J2FwcCcgJiYgX2lkIT1jdXJyZW50Ll9pZClcblx0XHRcdFx0cm91dGVyLnB1c2goYC9hcHAvJHtjdXJyZW50Ll9pZH1gKVxuXHRcdH0pXG5cdFx0Ki9cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge19pZCxuYW1lLCBjaGlsZHJlbiwgZGlzcGF0Y2gsIHJvdXRlc309dGhpcy5wcm9wc1xuXHRcdGxldCBwcm9wcz17XG5cdFx0XHRhcHBJZDogXCJxaWxpQWRtaW5cIlxuXHRcdFx0LGluaXQ6YT0+QXBwbGljYXRpb24uaW5pdCgpLnRoZW4oYXBwcz0+ZGlzcGF0Y2goQUNUSU9OLkFQUFNfRkVUQ0hFRChhcHBzKSkpXG5cdFx0fVxuXHRcdGlmKCFfaWQpe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0XHQ8RW1wdHkgaWNvbj17PExvZ28vPn0+XG5cdFx0XHRcdFx0XHQ8TGluayB0bz1cImFwcFwiPmNsaWNrIHRvIGNyZWF0ZSB5b3VyIGZpcnN0IHFpbGkgYXBwPC9MaW5rPlxuXHRcdFx0XHRcdDwvRW1wdHk+XG5cdFx0XHRcdDwvUWlsaUFwcD5cblx0XHRcdClcblx0XHR9XG5cblx0XHRsZXQgcXVpY2tTd2l0Y2hTdHlsZT17Zm9udFNpemU6XCJ4eC1zbWFsbFwifVxuXHRcdGlmKHJvdXRlcy5maW5kKGE9PmEuY29udGV4dHVhbD09PWZhbHNlKSlcblx0XHRcdHF1aWNrU3dpdGNoU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UWlsaUFwcCB7Li4ucHJvcHN9PlxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiIG1pbmk9e3RydWV9XG5cdFx0XHRcdFx0c3R5bGU9e3F1aWNrU3dpdGNoU3R5bGV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNXSVRDSF9BUFBMSUNBVElPTihfaWQpKX0+XG5cdFx0XHRcdFx0e25hbWV9XG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG5cdFx0XHRcdHtjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvUWlsaUFwcD5cbiAgICAgICAgKVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkJ1xuaW1wb3J0IEFwcFVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9hcHAnXG5pbXBvcnQgQ2xvdWRVSSBmcm9tICcuL2Nsb3VkJ1xuaW1wb3J0IERhdGFVSSBmcm9tICcuL2RhdGEnXG5pbXBvcnQgTG9nVUkgZnJvbSAnLi9sb2cnXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gXCIuL3NldHRpbmdcIlxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwiLi91c2VyLXByb2ZpbGVcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cblxuZXhwb3J0IGNvbnN0IE1haW49UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiXG5cdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRBcHAoc3RhdGUpLFwiX2lkXCIsXCJuYW1lXCIpKShRaWxpQ29uc29sZSl9PlxuXG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17RGFzaGJvYXJkfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhcHAvOl9pZFwiIG5hbWU9XCJhcHBcIlxuXHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oey4uLmNvbXBhY3QoZ2V0Q3VycmVudEFwcChzdGF0ZSksXCJuYW1lXCIsXCJ1bmFtZVwiLFwiYXBpS2V5XCIpfSkpKEFwcFVJKX1cblx0XHRcdG9uRW50ZXI9eyh7cGFyYW1zOntfaWR9fSk9PmluaXRBcHA9X2lkfVxuXHRcdFx0Lz5cblx0XHQ8Um91dGUgcGF0aD1cImFwcFwiIGNvbnRleHR1YWw9e2ZhbHNlfVxuXHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KCkoQ3JlYXRvcil9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNsb3VkXCIgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2Nsb3VkQ29kZTpnZXRDdXJyZW50QXBwKHN0YXRlKS5jbG91ZENvZGV9KSkoQ2xvdWRVSSl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImRhdGFcIlxuXHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oey4uLnN0YXRlLnVpLmRhdGEsYXBwOmdldEN1cnJlbnRBcHAoc3RhdGUpLl9pZH0pKShEYXRhVUkpfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOm5hbWVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJsb2dcIlxuXHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5zdGF0ZS51aS5sb2cpKExvZ1VJKX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cImFsbFwiLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmxldmVsXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxuXHRcdFx0PEluZGV4Um91dGVcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2FwcHM6T2JqZWN0LnZhbHVlcyhzdGF0ZS5lbnRpdGllc1tBcHBsaWNhdGlvbi5fbmFtZV0pfSkpKE15VUkpfVxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdDwvUm91dGU+XG5cblxuICAgIDwvUm91dGU+KVxuXHQsWyAge1tET01BSU5dOlJFRFVDRVJ9XG5cdFx0LHtcblx0XHRcdHVpOmVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKFxuXHRcdFx0XHR7bG9nOkxvZ1VJLlJFRFVDRVJ9XG5cdFx0XHRcdCx7Y2xvdWQ6Q2xvdWRVSS5SRURVQ0VSfVxuXHRcdFx0XHQse2RhdGE6RGF0YVVJLlJFRFVDRVJ9XG5cdFx0XHQpXG5cdFx0fV1cbilcblxuXG4vKipcbkBUb2RvOlxuKkRvbmU6IGFmdGVyIGFkZGluZyBuZXcgYXBwbGljYXRpb25cbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgbG9jYWwgc3RvcmFnZSB3aXRob3V0IEFsbCBmaWVsZHMsIHN1Y2ggYXMgd2l0aG91dCBhcHBsaWNhdGlvbiBuYW1lLCAuLi4sIGJlY2F1c2Ugc2VydmVyIHJldHVybmVkIG9ubHkgX2lkLCBjcmVhdGVkQXQsIC4uLlxuKkRvbmU6IGFmdGVyIGFwcGxpY2F0aW9uIGRlbGV0aW9uLCBVSSBzaG91bGQgZ28gdG8gLyBldmVuIHdpdGggZXJyb3JcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XG4qRG9uJ3Q6IHVzZSA8TGluay8+IHJhdGhlciB0aGFuIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvXG4qKkRvbmU6IE5ldmVyIGVtcHR5IFVJXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcblxuKiB0b28gc21hbGwtem9vbSBzaXplIGluIG1vYmlsZSBicm93c2VyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXG4qIGJhY2tncm91bmQgdG8gdXBsb2FkIHRvIGJhY2tlbmRcbiAgICBkb25lOiBXZWJTUUxEYiBpcyBkb25lXG4gICAgKioqIHNxbGl0ZVxuICAgIGRvbmU6ICoqKiBhZnRlciByZW1vdmUgYXBwLCBsb2NhbCBjYWNoZSBzaG91bGQgYmUgcmVtb3ZlZCB0b29cbioqIHRleHRmaWVsZCBjYW4ndCBiZSBjaGFuZ2VkICh3aGljaD8/KVxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxuKiBzaW1wbGUgZGF0YSBtb2RlOlxuICAgICogcmVtb3RlIHVwc2VydCBhbmQgcmVtb3ZlIGRpcmVjdGx5XG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXG4qIENhbm5vdCByZWFkIHByb3BlcnR5ICdjb21wb25lbnREaWRFbnRlcicgb2YgdW5kZWZpbmVkXG4qRG9uZTogRGF0ZSBzaG93IGFzIG1lYW5pbmdmdWxcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxuKi9cbiJdfQ==