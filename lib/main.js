'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
                this.props.children.props.route.contextual !== false && _.React.createElement(CurrentApp, { key: 'context', app: app, name: app.name }),
                _.React.cloneElement(this.props.children, { app: app })
            );
        }
    }]);

    return QiliConsole;
}(_.QiliApp);

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
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return nextProps.name != this.props.name;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props;
            var name = _props.name;
            var _props$style = _props.style;
            var style = _props$style === undefined ? { fontSize: "xx-small" } : _props$style;

            var others = _objectWithoutProperties(_props, ['name', 'style']);

            return _.React.createElement(
                _materialUi.FloatingActionButton,
                _extends({ className: 'sticky top right',
                    onClick: function onClick(e) {
                        return _this3.change();
                    },
                    mini: true,
                    style: style
                }, others),
                name
            );
        }
    }, {
        key: 'change',
        value: function change() {
            var _props2 = this.props;
            var app = _props2.app;
            var onChange = _props2.onChange;
            var apps = _app2.default.all;
            var len = apps.length;
            if (len < 2) return;

            var index = apps.findIndex(function (a) {
                return a._id == app._id;
            }),
                target = apps[(index + 1) % len];
            onChange ? onChange(target) : _app2.default.current = target;
        }
    }]);

    return CurrentApp;
}(_.Component);

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
//# sourceMappingURL=data:application/json;base64,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cmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLFJlYWN0LENvbXBvbmVudCwgVUksIFBvc2l0aW9ufSBmcm9tICcuJ1xuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeSwgUmVkaXJlY3QsIEluZGV4UmVkaXJlY3QsIExpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5cbmNvbnN0IHtFbXB0eX09VUlcblxuY2xhc3MgUWlsaUNvbnNvbGUgZXh0ZW5kcyBRaWxpQXBwe1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7YXBwOm51bGx9KVxuICAgICAgICBBcHBsaWNhdGlvbi5vbignY2hhbmdlJyxhcHA9PnRoaXMuc2V0U3RhdGUoe2FwcH0pKVxuICAgIH1cblx0XG5cdHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG5cdFx0aWYodGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5yb3V0ZS5uYW1lPT0nYXBwJyBcblx0XHRcdCYmIG5leHRTdGF0ZS5hcHAhPXRoaXMuc3RhdGUuYXBwXG5cdFx0XHQmJiAhdGhpcy5jb250ZXh0LnJvdXRlci5pc0FjdGl2ZShgYXBwLyR7bmV4dFN0YXRlLmFwcC5uYW1lfWApKXtcblx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgYXBwLyR7bmV4dFN0YXRlLmFwcC5uYW1lfWApXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2FwcH09dGhpcy5zdGF0ZVxuXHRcdGlmKCFhcHApXG5cdFx0XHRyZXR1cm4gKDxFbXB0eSBpY29uPXs8TG9nby8+fT48TGluayB0bz1cImFwcFwiPmNsaWNrIHRvIGNyZWF0ZSB5b3VyIGZpcnN0IHFpbGkgYXBwPC9MaW5rPjwvRW1wdHk+KVxuXHRcdFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGUuY29udGV4dHVhbCE9PWZhbHNlIFxuXHRcdFx0XHRcdCYmICg8Q3VycmVudEFwcCBrZXk9XCJjb250ZXh0XCIgYXBwPXthcHB9IG5hbWU9e2FwcC5uYW1lfS8+KX1cblx0XHRcdFx0XHRcbiAgICAgICAgICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4se2FwcH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59O1xuXG5PYmplY3QuYXNzaWduKFFpbGlDb25zb2xlLmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCJxaWxpQWRtaW5cIixcbiAgICBpbml0OigpPT5BcHBsaWNhdGlvbi5pbml0KClcbn0pO1xuXG5jbGFzcyBDdXJyZW50QXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG4gICAgICAgIHJldHVybiBuZXh0UHJvcHMubmFtZSE9dGhpcy5wcm9wcy5uYW1lXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bmFtZSwgc3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn0sIC4uLm90aGVyc309dGhpcy5wcm9wcztcbiAgICAgICAgXG5cdFx0cmV0dXJuKFxuICAgICAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PnRoaXMuY2hhbmdlKCl9XG5cdFx0XHRcdG1pbmk9e3RydWV9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgIHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAgICAgIHtuYW1lfVxuICAgICAgICAgICAgPC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIHthcHAsIG9uQ2hhbmdlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgYXBwcz1BcHBsaWNhdGlvbi5hbGwsXG4gICAgICAgICAgICBsZW49YXBwcy5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1hcHBzLmZpbmRJbmRleChhPT5hLl9pZD09YXBwLl9pZClcblx0XHRcdCx0YXJnZXQ9YXBwc1soaW5kZXgrMSkgJSBsZW5dXG4gICAgICAgIG9uQ2hhbmdlID8gb25DaGFuZ2UodGFyZ2V0KSA6IChBcHBsaWNhdGlvbi5jdXJyZW50PXRhcmdldClcbiAgICB9XG59XG5cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQnXG5pbXBvcnQgQXBwVUksIHtDcmVhdG9yfSBmcm9tICcuL2FwcCdcbmltcG9ydCBDbG91ZFVJIGZyb20gJy4vY2xvdWQnXG5pbXBvcnQgRGF0YVVJIGZyb20gJy4vZGF0YSdcbmltcG9ydCBMb2dVSSBmcm9tICcuL2xvZydcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17UWlsaUNvbnNvbGV9PlxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0Rhc2hib2FyZH0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYXBwLzpuYW1lXCIgbmFtZT1cImFwcFwiIGNvbXBvbmVudD17QXBwVUl9Lz5cblx0XHQ8Um91dGUgcGF0aD1cImFwcFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0NyZWF0b3J9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNsb3VkXCIgY29tcG9uZW50PXtDbG91ZFVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJkYXRhXCIgY29tcG9uZW50PXtEYXRhVUl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89e2Ake1VzZXIuX25hbWV9YH0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bmFtZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImxvZ1wiIGNvbXBvbmVudD17TG9nVUl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCJhbGxcIi8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpsZXZlbFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblx0XHRcbiAgICA8L1JvdXRlPikse1xuXHRcdGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBwcm9wcyl7XG5cdFx0XHRpZihDb21wb25lbnQ9PVFpbGlDb25zb2xlKXtcblx0XHRcdFx0bGV0IGNoaWxkPXByb3BzLmNoaWxkcmVuXG5cdFx0XHRcdFx0LHtyb3V0ZSxwYXJhbXN9PWNoaWxkLnByb3BzXG5cblx0XHRcdFx0aWYocm91dGUubmFtZT09XCJhcHBcIilcblx0XHRcdFx0XHRwcm9wcy5pbml0PWE9PkFwcGxpY2F0aW9uLmluaXQocGFyYW1zLm5hbWUpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9Lz5cblx0XHR9XG5cdH1cbilcblxuXG4vKipcbkBUb2RvOlxuKkRvbmU6IGFmdGVyIGFkZGluZyBuZXcgYXBwbGljYXRpb25cbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgbG9jYWwgc3RvcmFnZSB3aXRob3V0IEFsbCBmaWVsZHMsIHN1Y2ggYXMgd2l0aG91dCBhcHBsaWNhdGlvbiBuYW1lLCAuLi4sIGJlY2F1c2Ugc2VydmVyIHJldHVybmVkIG9ubHkgX2lkLCBjcmVhdGVkQXQsIC4uLlxuKkRvbmU6IGFmdGVyIGFwcGxpY2F0aW9uIGRlbGV0aW9uLCBVSSBzaG91bGQgZ28gdG8gLyBldmVuIHdpdGggZXJyb3JcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XG4qRG9uJ3Q6IHVzZSA8TGluay8+IHJhdGhlciB0aGFuIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvXG4qKkRvbmU6IE5ldmVyIGVtcHR5IFVJXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcblxuKiB0b28gc21hbGwtem9vbSBzaXplIGluIG1vYmlsZSBicm93c2VyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXG4qIGJhY2tncm91bmQgdG8gdXBsb2FkIHRvIGJhY2tlbmRcbiAgICBkb25lOiBXZWJTUUxEYiBpcyBkb25lXG4gICAgKioqIHNxbGl0ZVxuICAgIGRvbmU6ICoqKiBhZnRlciByZW1vdmUgYXBwLCBsb2NhbCBjYWNoZSBzaG91bGQgYmUgcmVtb3ZlZCB0b29cbioqIHRleHRmaWVsZCBjYW4ndCBiZSBjaGFuZ2VkICh3aGljaD8/KVxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxuKiBzaW1wbGUgZGF0YSBtb2RlOlxuICAgICogcmVtb3RlIHVwc2VydCBhbmQgcmVtb3ZlIGRpcmVjdGx5XG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXG4qIENhbm5vdCByZWFkIHByb3BlcnR5ICdjb21wb25lbnREaWRFbnRlcicgb2YgdW5kZWZpbmVkXG4qRG9uZTogRGF0ZSBzaG93IGFzIG1lYW5pbmdmdWxcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxuKi9cbiJdfQ==