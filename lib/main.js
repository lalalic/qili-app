'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('.');

var _reactRouter = require('react-router');

var _materialUi = require('material-ui');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _app3 = require('./app');

var _app4 = _interopRequireDefault(_app3);

var _logo = require('./icons/logo');

var _logo2 = _interopRequireDefault(_logo);

var _action = require('./action');

var _dashboard = require('./dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _cloud = require('./cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _my = require('./my');

var _my2 = _interopRequireDefault(_my);

var _setting = require('./setting');

var _setting2 = _interopRequireDefault(_setting);

var _userProfile = require('./user-profile');

var _userProfile2 = _interopRequireDefault(_userProfile);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var Empty = _.UI.Empty;

var QiliConsole = function (_Component) {
	_inherits(QiliConsole, _Component);

	function QiliConsole(props) {
		_classCallCheck(this, QiliConsole);

		var _this = _possibleConstructorReturn(this, (QiliConsole.__proto__ || Object.getPrototypeOf(QiliConsole)).call(this, props));

		var dispatch = _this.props.dispatch;

		_app2.default.on('change', function (app) {
			return dispatch((0, _action.APP_CHANGED)(app));
		});
		return _this;
	}

	_createClass(QiliConsole, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (this.props.children.props.route.name == 'app' && nextProps.app != this.props.app && !this.context.router.isActive('app/' + nextProps.app.name)) {
				this.context.router.push('app/' + nextProps.app.name);
				return false;
			}
			return true;
		}
	}, {
		key: 'render',
		value: function render() {
			var app = this.props.app;

			var props = { appId: "qiliAdmin", init: function init(a) {
					return _app2.default.init();
				}, service: "http://localhost:9080/1/" };
			if (!app) {
				return _.React.createElement(
					_.QiliApp,
					props,
					_.React.createElement(
						Empty,
						{ icon: _.React.createElement(_logo2.default, null) },
						_.React.createElement(
							_reactRouter.Link,
							{ to: 'app' },
							'click to create your first qili app'
						)
					)
				);
			}

			return _.React.createElement(
				_.QiliApp,
				props,
				this.props.children.props.route.contextual !== false && _.React.createElement(CurrentApp, { key: 'context', name: app.name }),
				this.props.children
			);
		}
	}, {
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				app: this.props.app
			};
		}
	}]);

	return QiliConsole;
}(_.Component);

QiliConsole.childContextTypes = {
	app: _.React.PropTypes.object
};

var CurrentApp = function (_Component2) {
	_inherits(CurrentApp, _Component2);

	function CurrentApp() {
		_classCallCheck(this, CurrentApp);

		return _possibleConstructorReturn(this, (CurrentApp.__proto__ || Object.getPrototypeOf(CurrentApp)).apply(this, arguments));
	}

	_createClass(CurrentApp, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var name = this.props.name;

			return _.React.createElement(
				_materialUi.FloatingActionButton,
				{ className: 'sticky top right',
					onClick: function onClick(e) {
						return _this3.change();
					},
					mini: true,
					style: { fontSize: "xx-small" } },
				name
			);
		}
	}, {
		key: 'change',
		value: function change() {
			var app = this.context.app,
			    apps = _app2.default.all,
			    len = apps.length;

			if (len < 2) return;

			var index = apps.findIndex(function (a) {
				return a._id == app._id;
			}),
			    target = apps[(index + 1) % len];

			_app2.default.current = target;
		}
	}]);

	return CurrentApp;
}(_.Component);

CurrentApp.contextTypes = { app: _.React.PropTypes.object };


var QiliConsoleApp = (0, _reactRedux.connect)(function (_ref) {
	var app = _ref.app;
	return { app: app };
})(QiliConsole);

module.exports = _.QiliApp.render(_.React.createElement(
	_reactRouter.Route,
	{ path: '/', component: QiliConsoleApp },
	_.React.createElement(_reactRouter.IndexRoute, { component: function component() {
			return "Hello";
		} }),
	_.React.createElement(_reactRouter.Route, { path: 'app/:name', name: 'app', component: _app4.default }),
	_.React.createElement(_reactRouter.Route, { path: 'app', contextual: false, component: _app3.Creator }),
	_.React.createElement(_reactRouter.Route, { path: 'cloud', component: _cloud2.default }),
	_.React.createElement(
		_reactRouter.Route,
		{ path: 'data', component: _data2.default },
		_.React.createElement(_reactRouter.IndexRedirect, { to: '' + _.User._name }),
		_.React.createElement(_reactRouter.Route, { path: ':name' })
	),
	_.React.createElement(
		_reactRouter.Route,
		{ path: 'log', component: _log2.default },
		_.React.createElement(_reactRouter.IndexRedirect, { to: 'all' }),
		_.React.createElement(_reactRouter.Route, { path: ':level' })
	),
	_.React.createElement(
		_reactRouter.Route,
		{ path: 'my' },
		_.React.createElement(_reactRouter.IndexRoute, { component: _my2.default, contextual: false }),
		_.React.createElement(_reactRouter.Route, { path: 'setting', component: _setting2.default }),
		_.React.createElement(_reactRouter.Route, { path: 'profile', component: _userProfile2.default, contextual: false })
	)
), {
	createElement: function createElement(Component, props) {
		if (Component == QiliConsoleApp) {
			(function () {
				var child = props.children,
				    _child$props = child.props,
				    route = _child$props.route,
				    params = _child$props.params;


				if (route.name == "app") props.init = function (a) {
					return _app2.default.init(params.name);
				};
			})();
		}
		return _.React.createElement(Component, props);
	}
}, _reducer2.default, _reduxThunk2.default, (0, _reduxLogger2.default)());

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJkaXNwYXRjaCIsIm9uIiwiYXBwIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiY2hpbGRyZW4iLCJyb3V0ZSIsIm5hbWUiLCJjb250ZXh0Iiwicm91dGVyIiwiaXNBY3RpdmUiLCJwdXNoIiwiYXBwSWQiLCJpbml0Iiwic2VydmljZSIsImNvbnRleHR1YWwiLCJjaGlsZENvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsIkN1cnJlbnRBcHAiLCJjaGFuZ2UiLCJmb250U2l6ZSIsImFwcHMiLCJhbGwiLCJsZW4iLCJsZW5ndGgiLCJpbmRleCIsImZpbmRJbmRleCIsImEiLCJfaWQiLCJ0YXJnZXQiLCJjdXJyZW50IiwiY29udGV4dFR5cGVzIiwiUWlsaUNvbnNvbGVBcHAiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVuZGVyIiwiX25hbWUiLCJjcmVhdGVFbGVtZW50IiwiQ29tcG9uZW50IiwiY2hpbGQiLCJwYXJhbXMiXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFJQTs7QUFvRkE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQTVHQUEsUUFBUSxxQkFBUjs7SUFVT0MsSyxRQUFBQSxLOztJQUlEQyxXOzs7QUFDRixzQkFBWUMsS0FBWixFQUFrQjtBQUFBOztBQUFBLHdIQUNSQSxLQURROztBQUFBLE1BRWJDLFFBRmEsR0FFSCxNQUFLRCxLQUZGLENBRWJDLFFBRmE7O0FBR2QsZ0JBQVlDLEVBQVosQ0FBZSxRQUFmLEVBQXdCO0FBQUEsVUFBS0QsU0FBUyx5QkFBWUUsR0FBWixDQUFULENBQUw7QUFBQSxHQUF4QjtBQUhjO0FBSWpCOzs7O3dDQUVr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QU8sc0JBQUMsU0FBRCxFQUFlUixLQUFmLENBQVA7QUFDQTtBQVZXLENBMUJDLDJDQXdDYiw0QkF4Q2EsQ0FBZjs7QUE0Q0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLFJlYWN0LENvbXBvbmVudCwgVUksIFBvc2l0aW9ufSBmcm9tICcuJ1xuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeSwgUmVkaXJlY3QsIEluZGV4UmVkaXJlY3QsIExpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5cbmNvbnN0IHtFbXB0eX09VUlcblxuaW1wb3J0IHtBUFBfQ0hBTkdFRH0gZnJvbSBcIi4vYWN0aW9uXCJcblxuY2xhc3MgUWlsaUNvbnNvbGUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcbiAgICAgICAgQXBwbGljYXRpb24ub24oJ2NoYW5nZScsYXBwPT5kaXNwYXRjaChBUFBfQ0hBTkdFRChhcHApKSlcbiAgICB9XG5cdFxuXHRzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuXHRcdGlmKHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGUubmFtZT09J2FwcCcgXG5cdFx0XHQmJiBuZXh0UHJvcHMuYXBwIT10aGlzLnByb3BzLmFwcFxuXHRcdFx0JiYgIXRoaXMuY29udGV4dC5yb3V0ZXIuaXNBY3RpdmUoYGFwcC8ke25leHRQcm9wcy5hcHAubmFtZX1gKSl7XG5cdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGFwcC8ke25leHRQcm9wcy5hcHAubmFtZX1gKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdHJldHVybiB0cnVlXG5cdH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7YXBwfT10aGlzLnByb3BzXG5cdFx0bGV0IHByb3BzPXthcHBJZDogXCJxaWxpQWRtaW5cIiwgaW5pdDphPT5BcHBsaWNhdGlvbi5pbml0KCksIHNlcnZpY2U6XCJodHRwOi8vbG9jYWxob3N0OjkwODAvMS9cIn1cblx0XHRpZighYXBwKXtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxRaWxpQXBwIHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0PEVtcHR5IGljb249ezxMb2dvLz59PlxuXHRcdFx0XHRcdFx0PExpbmsgdG89XCJhcHBcIj5jbGljayB0byBjcmVhdGUgeW91ciBmaXJzdCBxaWxpIGFwcDwvTGluaz5cblx0XHRcdFx0XHQ8L0VtcHR5PlxuXHRcdFx0XHQ8L1FpbGlBcHA+XG5cdFx0XHQpXG5cdFx0fVxuXHRcdFx0XG5cdFx0XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UWlsaUFwcCB7Li4ucHJvcHN9PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5yb3V0ZS5jb250ZXh0dWFsIT09ZmFsc2UgXG5cdFx0XHRcdFx0JiYgKDxDdXJyZW50QXBwIGtleT1cImNvbnRleHRcIiBuYW1lPXthcHAubmFtZX0vPil9XG5cdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcbiAgICB9XG5cdFxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdGFwcDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cdFxuXHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YXBwOiB0aGlzLnByb3BzLmFwcFxuXHRcdH1cblx0fVxuXHRcblx0XG59XG5cbmNsYXNzIEN1cnJlbnRBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bmFtZX09dGhpcy5wcm9wc1xuXHRcdHJldHVybihcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmNoYW5nZSgpfVxuXHRcdFx0XHRtaW5pPXt0cnVlfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX0+XG4gICAgICAgICAgICAgICAge25hbWV9XG4gICAgICAgICAgICA8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuICAgICAgICApXG4gICAgfVxuICAgIGNoYW5nZSgpe1xuICAgICAgICB2YXIge2FwcH09dGhpcy5jb250ZXh0LFxuICAgICAgICAgICAgYXBwcz1BcHBsaWNhdGlvbi5hbGwsXG4gICAgICAgICAgICBsZW49YXBwcy5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1hcHBzLmZpbmRJbmRleChhPT5hLl9pZD09YXBwLl9pZClcblx0XHRcdCx0YXJnZXQ9YXBwc1soaW5kZXgrMSkgJSBsZW5dXG5cdFx0XHRcbiAgICAgICAgQXBwbGljYXRpb24uY3VycmVudD10YXJnZXRcbiAgICB9XG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXthcHA6IFJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQnXG5pbXBvcnQgQXBwVUksIHtDcmVhdG9yfSBmcm9tICcuL2FwcCdcbmltcG9ydCBDbG91ZFVJIGZyb20gJy4vY2xvdWQnXG5pbXBvcnQgRGF0YVVJIGZyb20gJy4vZGF0YSdcbmltcG9ydCBMb2dVSSBmcm9tICcuL2xvZydcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcIi4vc2V0dGluZ1wiXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXG5cbmltcG9ydCBRSUxJX0NPTlNPTEUgZnJvbSBcIi4vcmVkdWNlclwiXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXG5pbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcidcblxuY29uc3QgUWlsaUNvbnNvbGVBcHA9Y29ubmVjdCgoe2FwcH0pPT4oe2FwcH0pKShRaWxpQ29uc29sZSlcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17UWlsaUNvbnNvbGVBcHB9PlxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9eygpPT5cIkhlbGxvXCJ9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFwcC86bmFtZVwiIG5hbWU9XCJhcHBcIiBjb21wb25lbnQ9e0FwcFVJfS8+XG5cdFx0PFJvdXRlIHBhdGg9XCJhcHBcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtDcmVhdG9yfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjbG91ZFwiIGNvbXBvbmVudD17Q2xvdWRVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiIGNvbXBvbmVudD17RGF0YVVJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOm5hbWVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJsb2dcIiBjb21wb25lbnQ9e0xvZ1VJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiYWxsXCIvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bGV2ZWxcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cdFx0XG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cblx0XHQ8L1JvdXRlPlxuXHRcdFxuXHRcdFxuICAgIDwvUm91dGU+KSx7XG5cdFx0Y3JlYXRlRWxlbWVudChDb21wb25lbnQsIHByb3BzKXtcblx0XHRcdGlmKENvbXBvbmVudD09UWlsaUNvbnNvbGVBcHApe1xuXHRcdFx0XHRsZXQgY2hpbGQ9cHJvcHMuY2hpbGRyZW5cblx0XHRcdFx0XHQse3JvdXRlLHBhcmFtc309Y2hpbGQucHJvcHNcblxuXHRcdFx0XHRpZihyb3V0ZS5uYW1lPT1cImFwcFwiKVxuXHRcdFx0XHRcdHByb3BzLmluaXQ9YT0+QXBwbGljYXRpb24uaW5pdChwYXJhbXMubmFtZSlcblx0XHRcdH1cblx0XHRcdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30vPlxuXHRcdH1cblx0fVxuXHQsUUlMSV9DT05TT0xFXG5cdCx0aHVua1xuXHQsY3JlYXRlTG9nZ2VyKClcbilcblxuXG4vKipcbkBUb2RvOlxuKkRvbmU6IGFmdGVyIGFkZGluZyBuZXcgYXBwbGljYXRpb25cbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgbG9jYWwgc3RvcmFnZSB3aXRob3V0IEFsbCBmaWVsZHMsIHN1Y2ggYXMgd2l0aG91dCBhcHBsaWNhdGlvbiBuYW1lLCAuLi4sIGJlY2F1c2Ugc2VydmVyIHJldHVybmVkIG9ubHkgX2lkLCBjcmVhdGVkQXQsIC4uLlxuKkRvbmU6IGFmdGVyIGFwcGxpY2F0aW9uIGRlbGV0aW9uLCBVSSBzaG91bGQgZ28gdG8gLyBldmVuIHdpdGggZXJyb3JcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XG4qRG9uJ3Q6IHVzZSA8TGluay8+IHJhdGhlciB0aGFuIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvXG4qKkRvbmU6IE5ldmVyIGVtcHR5IFVJXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcblxuKiB0b28gc21hbGwtem9vbSBzaXplIGluIG1vYmlsZSBicm93c2VyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXG4qIGJhY2tncm91bmQgdG8gdXBsb2FkIHRvIGJhY2tlbmRcbiAgICBkb25lOiBXZWJTUUxEYiBpcyBkb25lXG4gICAgKioqIHNxbGl0ZVxuICAgIGRvbmU6ICoqKiBhZnRlciByZW1vdmUgYXBwLCBsb2NhbCBjYWNoZSBzaG91bGQgYmUgcmVtb3ZlZCB0b29cbioqIHRleHRmaWVsZCBjYW4ndCBiZSBjaGFuZ2VkICh3aGljaD8/KVxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxuKiBzaW1wbGUgZGF0YSBtb2RlOlxuICAgICogcmVtb3RlIHVwc2VydCBhbmQgcmVtb3ZlIGRpcmVjdGx5XG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXG4qIENhbm5vdCByZWFkIHByb3BlcnR5ICdjb21wb25lbnREaWRFbnRlcicgb2YgdW5kZWZpbmVkXG4qRG9uZTogRGF0ZSBzaG93IGFzIG1lYW5pbmdmdWxcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxuKi9cbiJdfQ==