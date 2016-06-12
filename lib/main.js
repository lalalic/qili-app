'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('.');

var _reactRouter = require('react-router');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _app3 = require('./app');

var _app4 = _interopRequireDefault(_app3);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var QiliConsole = function (_QiliApp) {
    _inherits(QiliConsole, _QiliApp);

    function QiliConsole(props) {
        _classCallCheck(this, QiliConsole);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(QiliConsole).call(this, props));

        Object.assign(_this.state, { app: _this.props.app });
        _app2.default.on('change', function (a) {
            _this.setState({ app: _app2.default.current });
        });
        return _this;
    }

    _createClass(QiliConsole, [{
        key: 'renderContent',
        value: function renderContent() {
            var _this2 = this;

            var app = this.state.app;

            return _.React.createElement(
                'div',
                null,
                _.React.createElement(CurrentApp, { app: app, onChange: function onChange(target) {
                        if (_this2.props.children.props.route.name == "app") _this2.context.router.push('app/' + target.name);else _app2.default.current = target;
                    } }),
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
            var _ref = nextProps.app || {};

            var nextName = _ref.name;

            var _ref2 = this.props.app || {};

            var name = _ref2.name;

            return nextName != name;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props;
            var _props$app = _props.app;
            var app = _props$app === undefined ? { name: "" } : _props$app;
            var _props$style = _props.style;
            var style = _props$style === undefined ? {} : _props$style;

            var others = _objectWithoutProperties(_props, ['app', 'style']);

            if (!app._id) style.display = "none";

            return _.React.createElement(
                _materialUi.FloatingActionButton,
                _extends({ className: 'sticky top right',
                    onClick: function onClick(e) {
                        return _this4.change();
                    },
                    style: style
                }, others),
                app.name
            );
        }
    }, {
        key: 'change',
        value: function change() {
            var _props2 = this.props;
            var app = _props2.app;
            var _props2$onChange = _props2.onChange;
            var onChange = _props2$onChange === undefined ? function (a) {
                return a;
            } : _props2$onChange;
            var apps = _app2.default.all;
            var len = apps.length;
            if (len < 2) return;

            var index = apps.findIndex(function (a) {
                return a._id == app._id;
            });
            onChange(apps[(index + 1) % len]);
        }
    }]);

    return CurrentApp;
}(_.Component);

module.exports = _.QiliApp.render(_.React.createElement(
    _reactRouter.Route,
    { path: '/', component: QiliConsole },
    _.React.createElement(_reactRouter.IndexRoute, { component: require('./dashboard') }),
    _.React.createElement(
        _reactRouter.Route,
        { path: 'app', name: 'app', component: require('./app') },
        _.React.createElement(_reactRouter.IndexRoute, { onEnter: function onEnter(nextState, replace, callback) {
                _app2.default.current = {};
                callback();
            } }),
        _.React.createElement(_reactRouter.Route, { path: ':name' })
    ),
    _.React.createElement(_reactRouter.Route, { path: 'cloud', component: require('./cloud') }),
    _.React.createElement(
        _reactRouter.Route,
        { path: 'data', component: require('./data') },
        _.React.createElement(_reactRouter.IndexRedirect, { to: '' + _.User._name }),
        _.React.createElement(_reactRouter.Route, { path: ':name' })
    ),
    _.React.createElement(
        _reactRouter.Route,
        { path: 'log', component: require('./log') },
        _.React.createElement(_reactRouter.IndexRedirect, { to: 'all' }),
        _.React.createElement(_reactRouter.Route, { path: ':level' })
    ),
    _.React.createElement(_reactRouter.Redirect, { from: 'log', to: 'log/all' })
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
//# sourceMappingURL=data:application/json;base64,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cmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLFJlYWN0LENvbXBvbmVudCwgVUksIFBvc2l0aW9ufSBmcm9tICcuJ1xuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeSwgUmVkaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5cbmNsYXNzIFFpbGlDb25zb2xlIGV4dGVuZHMgUWlsaUFwcHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2FwcDp0aGlzLnByb3BzLmFwcH0pXG4gICAgICAgIEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLGE9Pntcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2FwcDpBcHBsaWNhdGlvbi5jdXJyZW50fSlcblx0XHR9KVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHthcHB9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEN1cnJlbnRBcHAgYXBwPXthcHB9IG9uQ2hhbmdlPXt0YXJnZXQ9Pntcblx0XHRcdFx0XHRpZih0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnJvdXRlLm5hbWU9PVwiYXBwXCIpXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGFwcC8ke3RhcmdldC5uYW1lfWApXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0QXBwbGljYXRpb24uY3VycmVudD10YXJnZXRcblx0XHRcdFx0fX0vPlxuICAgICAgICAgICAgICAgIHtSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbix7YXBwfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn07XG5cbk9iamVjdC5hc3NpZ24oUWlsaUNvbnNvbGUuZGVmYXVsdFByb3BzLHtcbiAgICBhcHBJZDpcInFpbGlBZG1pblwiLFxuICAgIGluaXQ6KCk9PkFwcGxpY2F0aW9uLmluaXQoKVxufSk7XG5cbmNsYXNzIEN1cnJlbnRBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgdmFyIHtuYW1lOm5leHROYW1lfT1uZXh0UHJvcHMuYXBwfHx7fSxcbiAgICAgICAgICAgIHtuYW1lfT10aGlzLnByb3BzLmFwcHx8e307XG4gICAgICAgIHJldHVybiBuZXh0TmFtZSE9bmFtZVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2FwcD17bmFtZTpcIlwifSwgc3R5bGU9e30sIC4uLm90aGVyc309dGhpcy5wcm9wcztcbiAgICAgICAgaWYoIWFwcC5faWQpXG4gICAgICAgICAgICBzdHlsZS5kaXNwbGF5PVwibm9uZVwiXG5cbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PnRoaXMuY2hhbmdlKCl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgIHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAgICAgIHthcHAubmFtZX1cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG4gICAgY2hhbmdlKCl7XG4gICAgICAgIHZhciB7YXBwLCBvbkNoYW5nZT1hPT5hfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgYXBwcz1BcHBsaWNhdGlvbi5hbGwsXG4gICAgICAgICAgICBsZW49YXBwcy5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1hcHBzLmZpbmRJbmRleChhPT5hLl9pZD09YXBwLl9pZClcbiAgICAgICAgb25DaGFuZ2UoYXBwc1soaW5kZXgrMSkgJSBsZW5dKVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17UWlsaUNvbnNvbGV9PlxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e3JlcXVpcmUoJy4vZGFzaGJvYXJkJyl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFwcFwiIG5hbWU9XCJhcHBcIiBjb21wb25lbnQ9e3JlcXVpcmUoJy4vYXBwJyl9PlxuICAgICAgICAgICAgPEluZGV4Um91dGUgb25FbnRlcj17KG5leHRTdGF0ZSwgcmVwbGFjZSwgY2FsbGJhY2spPT57XG4gICAgXHRcdFx0XHRBcHBsaWNhdGlvbi5jdXJyZW50PXt9XG4gICAgXHRcdFx0XHRjYWxsYmFjaygpXG4gICAgXHRcdFx0fX0vPlxuXG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpuYW1lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e3JlcXVpcmUoJy4vY2xvdWQnKX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiIGNvbXBvbmVudD17cmVxdWlyZSgnLi9kYXRhJyl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89e2Ake1VzZXIuX25hbWV9YH0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bmFtZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImxvZ1wiIGNvbXBvbmVudD17cmVxdWlyZSgnLi9sb2cnKX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cImFsbFwiLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmxldmVsXCIvPlxuICAgICAgICA8L1JvdXRlPlxuICAgICAgICA8UmVkaXJlY3QgZnJvbT1cImxvZ1wiIHRvPVwibG9nL2FsbFwiIC8+XG4gICAgPC9Sb3V0ZT4pLHtcblx0XHRjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpe1xuXHRcdFx0aWYoQ29tcG9uZW50PT1RaWxpQ29uc29sZSl7XG5cdFx0XHRcdGxldCBjaGlsZD1wcm9wcy5jaGlsZHJlblxuXHRcdFx0XHRcdCx7cm91dGUscGFyYW1zfT1jaGlsZC5wcm9wc1xuXG5cdFx0XHRcdGlmKHJvdXRlLm5hbWU9PVwiYXBwXCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5BcHBsaWNhdGlvbi5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=