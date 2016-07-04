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
//# sourceMappingURL=data:application/json;base64,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Li4vc3R5bGUvaW5kZXgubGVzcycpXG5cbmltcG9ydCB7aW5pdCxVc2VyLFFpbGlBcHAsUmVhY3QsQ29tcG9uZW50LCBVSSwgUG9zaXRpb259IGZyb20gJy4nXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIFFpbGlBcHB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHthcHA6bnVsbH0pXG4gICAgICAgIEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLGFwcD0+dGhpcy5zZXRTdGF0ZSh7YXBwfSkpXG4gICAgfVxuXHRcblx0c2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcblx0XHRpZih0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnJvdXRlLm5hbWU9PSdhcHAnIFxuXHRcdFx0JiYgbmV4dFN0YXRlLmFwcCE9dGhpcy5zdGF0ZS5hcHBcblx0XHRcdCYmICF0aGlzLmNvbnRleHQucm91dGVyLmlzQWN0aXZlKGBhcHAvJHtuZXh0U3RhdGUuYXBwLm5hbWV9YCkpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBhcHAvJHtuZXh0U3RhdGUuYXBwLm5hbWV9YClcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciB7YXBwfT10aGlzLnN0YXRlXG5cdFx0aWYoIWFwcClcblx0XHRcdHJldHVybiAoPEVtcHR5IGljb249ezxMb2dvLz59PjxMaW5rIHRvPVwiYXBwXCI+Y2xpY2sgdG8gY3JlYXRlIHlvdXIgZmlyc3QgcWlsaSBhcHA8L0xpbms+PC9FbXB0eT4pXG5cdFx0XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5yb3V0ZS5jb250ZXh0dWFsIT09ZmFsc2UgXG5cdFx0XHRcdFx0JiYgKDxDdXJyZW50QXBwIGtleT1cImNvbnRleHRcIiBuYW1lPXthcHAubmFtZX0vPil9XG5cdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblx0XG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRhcHA6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fSwgUWlsaUFwcC5jaGlsZENvbnRleHRUeXBlcylcblx0XG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdGFwcDogdGhpcy5zdGF0ZS5hcHBcblx0XHR9KVxuXHR9XG59O1xuXG5PYmplY3QuYXNzaWduKFFpbGlDb25zb2xlLmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCJxaWxpQWRtaW5cIixcbiAgICBpbml0OigpPT5BcHBsaWNhdGlvbi5pbml0KClcbn0pO1xuXG5jbGFzcyBDdXJyZW50QXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge25hbWV9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4oXG4gICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5jaGFuZ2UoKX1cblx0XHRcdFx0bWluaT17dHJ1ZX1cbiAgICAgICAgICAgICAgICBzdHlsZT17e2ZvbnRTaXplOlwieHgtc21hbGxcIn19PlxuICAgICAgICAgICAgICAgIHtuYW1lfVxuICAgICAgICAgICAgPC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIHthcHB9PXRoaXMuY29udGV4dCxcbiAgICAgICAgICAgIGFwcHM9QXBwbGljYXRpb24uYWxsLFxuICAgICAgICAgICAgbGVuPWFwcHMubGVuZ3RoO1xuICAgICAgICBpZihsZW48MilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgaW5kZXg9YXBwcy5maW5kSW5kZXgoYT0+YS5faWQ9PWFwcC5faWQpXG5cdFx0XHQsdGFyZ2V0PWFwcHNbKGluZGV4KzEpICUgbGVuXVxuXHRcdFx0XG4gICAgICAgIEFwcGxpY2F0aW9uLmN1cnJlbnQ9dGFyZ2V0XG4gICAgfVxuXHRcblx0c3RhdGljIGNvbnRleHRUeXBlcz17YXBwOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vZGFzaGJvYXJkJ1xuaW1wb3J0IEFwcFVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9hcHAnXG5pbXBvcnQgQ2xvdWRVSSBmcm9tICcuL2Nsb3VkJ1xuaW1wb3J0IERhdGFVSSBmcm9tICcuL2RhdGEnXG5pbXBvcnQgTG9nVUkgZnJvbSAnLi9sb2cnXG5cbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e1FpbGlDb25zb2xlfT5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFwcC86bmFtZVwiIG5hbWU9XCJhcHBcIiBjb21wb25lbnQ9e0FwcFVJfS8+XG5cdFx0PFJvdXRlIHBhdGg9XCJhcHBcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtDcmVhdG9yfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjbG91ZFwiIGNvbXBvbmVudD17Q2xvdWRVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiIGNvbXBvbmVudD17RGF0YVVJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOm5hbWVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJsb2dcIiBjb21wb25lbnQ9e0xvZ1VJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiYWxsXCIvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bGV2ZWxcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cdFx0XG4gICAgPC9Sb3V0ZT4pLHtcblx0XHRjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpe1xuXHRcdFx0aWYoQ29tcG9uZW50PT1RaWxpQ29uc29sZSl7XG5cdFx0XHRcdGxldCBjaGlsZD1wcm9wcy5jaGlsZHJlblxuXHRcdFx0XHRcdCx7cm91dGUscGFyYW1zfT1jaGlsZC5wcm9wc1xuXG5cdFx0XHRcdGlmKHJvdXRlLm5hbWU9PVwiYXBwXCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5BcHBsaWNhdGlvbi5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=