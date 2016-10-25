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
												return dispatch(APP_CHANGED(app));
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
												var app = this.context.app;
												var apps = _app2.default.all;
												var len = apps.length;
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
																var child = props.children;
																var _child$props = child.props;
																var route = _child$props.route;
																var params = _child$props.params;


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJkaXNwYXRjaCIsIm9uIiwiQVBQX0NIQU5HRUQiLCJhcHAiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJjaGlsZHJlbiIsInJvdXRlIiwibmFtZSIsImNvbnRleHQiLCJyb3V0ZXIiLCJpc0FjdGl2ZSIsInB1c2giLCJhcHBJZCIsImluaXQiLCJzZXJ2aWNlIiwiY29udGV4dHVhbCIsImNoaWxkQ29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiQ3VycmVudEFwcCIsImNoYW5nZSIsImZvbnRTaXplIiwiYWxsIiwiYXBwcyIsImxlbmd0aCIsImxlbiIsImluZGV4IiwiZmluZEluZGV4IiwiYSIsIl9pZCIsInRhcmdldCIsImN1cnJlbnQiLCJjb250ZXh0VHlwZXMiLCJRaWxpQ29uc29sZUFwcCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZW5kZXIiLCJfbmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJDb21wb25lbnQiLCJjaGlsZCIsInBhcmFtcyJdLCJtYXBwaW5ncyI6Ijs7OztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQXNGQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBMUdBQSxRQUFRLHFCQUFSOztJQVVPQyxLLFFBQUFBLEs7O0lBRURDLFc7OztBQUNGLHlCQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsOEhBQ1JBLEtBRFE7O0FBQUEsWUFFYkMsUUFGYSxHQUVILE1BQUtELEtBRkYsQ0FFYkMsUUFGYTs7QUFHZCxzQkFBWUMsRUFBWixDQUFlLFFBQWYsRUFBd0I7QUFBQSxtQkFBS0QsU0FBU0UsWUFBWUMsR0FBWixDQUFULENBQUw7QUFBQSxTQUF4QjtBQUhjO0FBSWpC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eEIsQ0FBSDtBQUFBLGlCQUFYO0FBTDJCO0FBTTVCO0FBQ0QsZUFBTyxzQkFBQyxTQUFELEVBQWVULEtBQWYsQ0FBUDtBQUNBO0FBVlcsQ0ExQkMsMkNBd0NiLDRCQXhDYSxDQUFmOztBQTRDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5cbmltcG9ydCB7aW5pdCxVc2VyLFFpbGlBcHAsUmVhY3QsQ29tcG9uZW50LCBVSSwgUG9zaXRpb259IGZyb20gJy4nXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xuICAgICAgICBBcHBsaWNhdGlvbi5vbignY2hhbmdlJyxhcHA9PmRpc3BhdGNoKEFQUF9DSEFOR0VEKGFwcCkpKVxuICAgIH1cblxuXHRzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuXHRcdGlmKHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGUubmFtZT09J2FwcCdcblx0XHRcdCYmIG5leHRQcm9wcy5hcHAhPXRoaXMucHJvcHMuYXBwXG5cdFx0XHQmJiAhdGhpcy5jb250ZXh0LnJvdXRlci5pc0FjdGl2ZShgYXBwLyR7bmV4dFByb3BzLmFwcC5uYW1lfWApKXtcblx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgYXBwLyR7bmV4dFByb3BzLmFwcC5uYW1lfWApXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHthcHB9PXRoaXMucHJvcHNcblx0XHRsZXQgcHJvcHM9e2FwcElkOiBcInFpbGlBZG1pblwiLCBpbml0OmE9PkFwcGxpY2F0aW9uLmluaXQoKSwgc2VydmljZTpcImh0dHA6Ly9sb2NhbGhvc3Q6OTA4MC8xL1wifVxuXHRcdGlmKCFhcHApe1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0XHQ8RW1wdHkgaWNvbj17PExvZ28vPn0+XG5cdFx0XHRcdFx0XHQ8TGluayB0bz1cImFwcFwiPmNsaWNrIHRvIGNyZWF0ZSB5b3VyIGZpcnN0IHFpbGkgYXBwPC9MaW5rPlxuXHRcdFx0XHRcdDwvRW1wdHk+XG5cdFx0XHRcdDwvUWlsaUFwcD5cblx0XHRcdClcblx0XHR9XG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgey4uLnByb3BzfT5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGUuY29udGV4dHVhbCE9PWZhbHNlXG5cdFx0XHRcdFx0JiYgKDxDdXJyZW50QXBwIGtleT1cImNvbnRleHRcIiBuYW1lPXthcHAubmFtZX0vPil9XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvUWlsaUFwcD5cbiAgICAgICAgKVxuICAgIH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdGFwcDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cblx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFwcDogdGhpcy5wcm9wcy5hcHBcblx0XHR9XG5cdH1cblxuXG59XG5cbmNsYXNzIEN1cnJlbnRBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bmFtZX09dGhpcy5wcm9wc1xuXHRcdHJldHVybihcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmNoYW5nZSgpfVxuXHRcdFx0XHRtaW5pPXt0cnVlfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX0+XG4gICAgICAgICAgICAgICAge25hbWV9XG4gICAgICAgICAgICA8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuICAgICAgICApXG4gICAgfVxuICAgIGNoYW5nZSgpe1xuICAgICAgICB2YXIge2FwcH09dGhpcy5jb250ZXh0LFxuICAgICAgICAgICAgYXBwcz1BcHBsaWNhdGlvbi5hbGwsXG4gICAgICAgICAgICBsZW49YXBwcy5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1hcHBzLmZpbmRJbmRleChhPT5hLl9pZD09YXBwLl9pZClcblx0XHRcdCx0YXJnZXQ9YXBwc1soaW5kZXgrMSkgJSBsZW5dXG5cbiAgICAgICAgQXBwbGljYXRpb24uY3VycmVudD10YXJnZXRcbiAgICB9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17YXBwOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkJ1xuaW1wb3J0IEFwcFVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9hcHAnXG5pbXBvcnQgQ2xvdWRVSSBmcm9tICcuL2Nsb3VkJ1xuaW1wb3J0IERhdGFVSSBmcm9tICcuL2RhdGEnXG5pbXBvcnQgTG9nVUkgZnJvbSAnLi9sb2cnXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gXCIuL3NldHRpbmdcIlxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwiLi91c2VyLXByb2ZpbGVcIlxuXG5pbXBvcnQgUmVkdWNlciBmcm9tIFwiLi9yZWR1Y2VyXCJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJ1xuXG5jb25zdCBRaWxpQ29uc29sZUFwcD1jb25uZWN0KCh7YXBwfSk9Pih7YXBwfSkpKFFpbGlDb25zb2xlKVxuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtRaWxpQ29uc29sZUFwcH0+XG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17KCk9PlwiSGVsbG9cIn0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYXBwLzpuYW1lXCIgbmFtZT1cImFwcFwiIGNvbXBvbmVudD17QXBwVUl9Lz5cblx0XHQ8Um91dGUgcGF0aD1cImFwcFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0NyZWF0b3J9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNsb3VkXCIgY29tcG9uZW50PXtDbG91ZFVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJkYXRhXCIgY29tcG9uZW50PXtEYXRhVUl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89e2Ake1VzZXIuX25hbWV9YH0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bmFtZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImxvZ1wiIGNvbXBvbmVudD17TG9nVUl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCJhbGxcIi8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpsZXZlbFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIj5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TXlVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtQcm9maWxlVUl9IGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXG4gICAgPC9Sb3V0ZT4pLHtcblx0XHRjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpe1xuXHRcdFx0aWYoQ29tcG9uZW50PT1RaWxpQ29uc29sZUFwcCl7XG5cdFx0XHRcdGxldCBjaGlsZD1wcm9wcy5jaGlsZHJlblxuXHRcdFx0XHRcdCx7cm91dGUscGFyYW1zfT1jaGlsZC5wcm9wc1xuXG5cdFx0XHRcdGlmKHJvdXRlLm5hbWU9PVwiYXBwXCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5BcHBsaWNhdGlvbi5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG5cdCxSZWR1Y2VyXG5cdCx0aHVua1xuXHQsY3JlYXRlTG9nZ2VyKClcbilcblxuXG4vKipcbkBUb2RvOlxuKkRvbmU6IGFmdGVyIGFkZGluZyBuZXcgYXBwbGljYXRpb25cbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgbG9jYWwgc3RvcmFnZSB3aXRob3V0IEFsbCBmaWVsZHMsIHN1Y2ggYXMgd2l0aG91dCBhcHBsaWNhdGlvbiBuYW1lLCAuLi4sIGJlY2F1c2Ugc2VydmVyIHJldHVybmVkIG9ubHkgX2lkLCBjcmVhdGVkQXQsIC4uLlxuKkRvbmU6IGFmdGVyIGFwcGxpY2F0aW9uIGRlbGV0aW9uLCBVSSBzaG91bGQgZ28gdG8gLyBldmVuIHdpdGggZXJyb3JcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XG4qRG9uJ3Q6IHVzZSA8TGluay8+IHJhdGhlciB0aGFuIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvXG4qKkRvbmU6IE5ldmVyIGVtcHR5IFVJXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcblxuKiB0b28gc21hbGwtem9vbSBzaXplIGluIG1vYmlsZSBicm93c2VyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXG4qIGJhY2tncm91bmQgdG8gdXBsb2FkIHRvIGJhY2tlbmRcbiAgICBkb25lOiBXZWJTUUxEYiBpcyBkb25lXG4gICAgKioqIHNxbGl0ZVxuICAgIGRvbmU6ICoqKiBhZnRlciByZW1vdmUgYXBwLCBsb2NhbCBjYWNoZSBzaG91bGQgYmUgcmVtb3ZlZCB0b29cbioqIHRleHRmaWVsZCBjYW4ndCBiZSBjaGFuZ2VkICh3aGljaD8/KVxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxuKiBzaW1wbGUgZGF0YSBtb2RlOlxuICAgICogcmVtb3RlIHVwc2VydCBhbmQgcmVtb3ZlIGRpcmVjdGx5XG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXG4qIENhbm5vdCByZWFkIHByb3BlcnR5ICdjb21wb25lbnREaWRFbnRlcicgb2YgdW5kZWZpbmVkXG4qRG9uZTogRGF0ZSBzaG93IGFzIG1lYW5pbmdmdWxcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxuKi9cbiJdfQ==