'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var Empty = _.UI.Empty;

var QiliConsole = function (_QiliApp) {
    _inherits(QiliConsole, _QiliApp);

    function QiliConsole(props) {
        _classCallCheck(this, QiliConsole);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(QiliConsole).call(this, props));

        Object.assign(_this.state, { app: null });
        _app2.default.on('change', function (app) {
            return _this.setState({ app: app });
        });
        return _this;
    }

    _createClass(QiliConsole, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (this.props.children.props.route.name == 'app' && nextState.app != this.state.app && !this.context.router.isActive('app/' + nextState.app.name)) {
                this.context.router.push('app/' + nextState.app.name);
                return false;
            }
            return true;
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var app = this.state.app;

            if (!app) return _.React.createElement(
                Empty,
                { icon: _.React.createElement(_logo2.default, null) },
                _.React.createElement(
                    _reactRouter.Link,
                    { to: 'app' },
                    'click to create your first qili app'
                )
            );

            return _.React.createElement(
                'div',
                null,
                this.props.children.props.route.contextual !== false && _.React.createElement(CurrentApp, { key: 'context', name: app.name }),
                this.props.children
            );
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return Object.assign(_get(Object.getPrototypeOf(QiliConsole.prototype), 'getChildContext', this).call(this), {
                app: this.state.app
            });
        }
    }]);

    return QiliConsole;
}(_.QiliApp);

QiliConsole.childContextTypes = Object.assign({
    app: _.React.PropTypes.object
}, _.QiliApp.childContextTypes);
;

Object.assign(QiliConsole.defaultProps, {
    appId: "qiliAdmin",
    init: function init() {
        return _app2.default.init();
    }
});

var CurrentApp = function (_Component) {
    _inherits(CurrentApp, _Component);

    function CurrentApp() {
        _classCallCheck(this, CurrentApp);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CurrentApp).apply(this, arguments));
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


module.exports = _.QiliApp.render(_.React.createElement(
    _reactRouter.Route,
    { path: '/', component: QiliConsole },
    _.React.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
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
        if (Component == QiliConsole) {
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
});

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
//# sourceMappingURL=data:application/json;base64,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LEtBQVosRUFDRixNQUFNLElBQU4sR0FBVzsyQkFBRyxjQUFZLElBQVosQ0FBaUIsT0FBTyxJQUFQO2lCQUFwQixDQURaO2lCQUp5QjtTQUExQjtBQU9BLGVBQU8sc0JBQUMsU0FBRCxFQUFlLEtBQWYsQ0FBUCxDQVI4QjtLQURuQjtDQTFCQyxDQUFmIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IHtpbml0LFVzZXIsUWlsaUFwcCxSZWFjdCxDb21wb25lbnQsIFVJLCBQb3NpdGlvbn0gZnJvbSAnLidcbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3RvcnksIFJlZGlyZWN0LCBJbmRleFJlZGlyZWN0LCBMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9kYi9hcHAnXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmNsYXNzIFFpbGlDb25zb2xlIGV4dGVuZHMgUWlsaUFwcHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2FwcDpudWxsfSlcbiAgICAgICAgQXBwbGljYXRpb24ub24oJ2NoYW5nZScsYXBwPT50aGlzLnNldFN0YXRlKHthcHB9KSlcbiAgICB9XG5cdFxuXHRzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuXHRcdGlmKHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGUubmFtZT09J2FwcCcgXG5cdFx0XHQmJiBuZXh0U3RhdGUuYXBwIT10aGlzLnN0YXRlLmFwcFxuXHRcdFx0JiYgIXRoaXMuY29udGV4dC5yb3V0ZXIuaXNBY3RpdmUoYGFwcC8ke25leHRTdGF0ZS5hcHAubmFtZX1gKSl7XG5cdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGFwcC8ke25leHRTdGF0ZS5hcHAubmFtZX1gKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdHJldHVybiB0cnVlXG5cdH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHthcHB9PXRoaXMuc3RhdGVcblx0XHRpZighYXBwKVxuXHRcdFx0cmV0dXJuICg8RW1wdHkgaWNvbj17PExvZ28vPn0+PExpbmsgdG89XCJhcHBcIj5jbGljayB0byBjcmVhdGUgeW91ciBmaXJzdCBxaWxpIGFwcDwvTGluaz48L0VtcHR5Pilcblx0XHRcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnJvdXRlLmNvbnRleHR1YWwhPT1mYWxzZSBcblx0XHRcdFx0XHQmJiAoPEN1cnJlbnRBcHAga2V5PVwiY29udGV4dFwiIG5hbWU9e2FwcC5uYW1lfS8+KX1cblx0XHRcdFx0XHRcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXHRcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdGFwcDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9LCBRaWxpQXBwLmNoaWxkQ29udGV4dFR5cGVzKVxuXHRcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuXHRcdFx0YXBwOiB0aGlzLnN0YXRlLmFwcFxuXHRcdH0pXG5cdH1cblx0XG5cdFxufTtcblxuT2JqZWN0LmFzc2lnbihRaWxpQ29uc29sZS5kZWZhdWx0UHJvcHMse1xuICAgIGFwcElkOlwicWlsaUFkbWluXCIsXG4gICAgaW5pdDooKT0+QXBwbGljYXRpb24uaW5pdCgpXG59KTtcblxuY2xhc3MgQ3VycmVudEFwcCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtuYW1lfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuKFxuICAgICAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PnRoaXMuY2hhbmdlKCl9XG5cdFx0XHRcdG1pbmk9e3RydWV9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tmb250U2l6ZTpcInh4LXNtYWxsXCJ9fT5cbiAgICAgICAgICAgICAgICB7bmFtZX1cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG4gICAgY2hhbmdlKCl7XG4gICAgICAgIHZhciB7YXBwfT10aGlzLmNvbnRleHQsXG4gICAgICAgICAgICBhcHBzPUFwcGxpY2F0aW9uLmFsbCxcbiAgICAgICAgICAgIGxlbj1hcHBzLmxlbmd0aDtcbiAgICAgICAgaWYobGVuPDIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGluZGV4PWFwcHMuZmluZEluZGV4KGE9PmEuX2lkPT1hcHAuX2lkKVxuXHRcdFx0LHRhcmdldD1hcHBzWyhpbmRleCsxKSAlIGxlbl1cblx0XHRcdFxuICAgICAgICBBcHBsaWNhdGlvbi5jdXJyZW50PXRhcmdldFxuICAgIH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e2FwcDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL2Rhc2hib2FyZCdcbmltcG9ydCBBcHBVSSwge0NyZWF0b3J9IGZyb20gJy4vYXBwJ1xuaW1wb3J0IENsb3VkVUkgZnJvbSAnLi9jbG91ZCdcbmltcG9ydCBEYXRhVUkgZnJvbSAnLi9kYXRhJ1xuaW1wb3J0IExvZ1VJIGZyb20gJy4vbG9nJ1xuaW1wb3J0IE15VUkgZnJvbSBcIi4vbXlcIlxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwiLi9zZXR0aW5nXCJcbmltcG9ydCBQcm9maWxlVUkgZnJvbSBcIi4vdXNlci1wcm9maWxlXCJcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17UWlsaUNvbnNvbGV9PlxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0Rhc2hib2FyZH0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYXBwLzpuYW1lXCIgbmFtZT1cImFwcFwiIGNvbXBvbmVudD17QXBwVUl9Lz5cblx0XHQ8Um91dGUgcGF0aD1cImFwcFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0NyZWF0b3J9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNsb3VkXCIgY29tcG9uZW50PXtDbG91ZFVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJkYXRhXCIgY29tcG9uZW50PXtEYXRhVUl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89e2Ake1VzZXIuX25hbWV9YH0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bmFtZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImxvZ1wiIGNvbXBvbmVudD17TG9nVUl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCJhbGxcIi8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpsZXZlbFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblx0XHRcblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e015VUl9IGNvbnRleHR1YWw9e2ZhbHNlfS8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdDwvUm91dGU+XG5cdFx0XG5cdFx0XG4gICAgPC9Sb3V0ZT4pLHtcblx0XHRjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpe1xuXHRcdFx0aWYoQ29tcG9uZW50PT1RaWxpQ29uc29sZSl7XG5cdFx0XHRcdGxldCBjaGlsZD1wcm9wcy5jaGlsZHJlblxuXHRcdFx0XHRcdCx7cm91dGUscGFyYW1zfT1jaGlsZC5wcm9wc1xuXG5cdFx0XHRcdGlmKHJvdXRlLm5hbWU9PVwiYXBwXCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5BcHBsaWNhdGlvbi5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=