'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('.');

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

        Object.assign(_this.state, { app: _app2.default.current });
        _app2.default.on('change', function () {
            return _this.setState({ app: _app2.default.current });
        });
        return _this;
    }

    _createClass(QiliConsole, [{
        key: 'renderContent',
        value: function renderContent() {
            var app = this.state.app;

            return _.React.createElement(
                'div',
                null,
                _.React.createElement(CurrentApp, { app: app }),
                _.React.createElement(RouteHandler, { app: app })
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
            var _props = this.props;
            var _props$app = _props.app;
            var app = _props$app === undefined ? { name: "" } : _props$app;
            var _props$style = _props.style;
            var style = _props$style === undefined ? { opacity: 0.7, position: "absolute" } : _props$style;

            var others = _objectWithoutProperties(_props, ['app', 'style']);

            if (!app._id) style.display = "hidden";

            return _.React.createElement(
                _materialUi.FloatingActionButton,
                _extends({ className: 'sticky top right',
                    onClick: this.change.bind(this),
                    style: style
                }, others),
                app.name
            );
        }
    }, {
        key: 'change',
        value: function change() {
            var app = this.props.app;
            var apps = _app2.default.all;
            var len = apps.length;
            if (len < 2) return;

            var index = -1;
            apps.find(function (a) {
                return index++, a._id == app._id;
            });
            _app2.default.current = apps[(index + 1) % len];
        }
    }]);

    return CurrentApp;
}(_.Component);

var Route = _.Router.Route;
var RouteHandler = _.Router.RouteHandler;
var DefaultRoute = _.Router.DefaultRoute;

module.exports = _.QiliApp.render(_.React.createElement(
    Route,
    { path: '/', handler: QiliConsole },
    _.React.createElement(Route, { name: 'app', path: 'app/:name?', handler: require('./app') }),
    _.React.createElement(Route, { name: 'cloud', path: 'cloud/', handler: require('./cloud') }),
    _.React.createElement(Route, { name: 'data', path: 'data/:name?', handler: require('./data') }),
    _.React.createElement(Route, { name: 'log', path: 'log/:level?', handler: require('./log') }),
    _.React.createElement(DefaultRoute, { handler: require('./dashboard') })
));

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
//# sourceMappingURL=data:application/json;base64,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LFFBQVEsUUFBUixDQUFULEVBQXRDLENBSEQ7SUFJSSxzQkFBQyxLQUFELElBQU8sTUFBSyxLQUFMLEVBQVcsTUFBSyxhQUFMLEVBQW1CLFNBQVMsUUFBUSxPQUFSLENBQVQsRUFBckMsQ0FKSjtJQUtDLHNCQUFDLFlBQUQsSUFBYyxTQUFTLFFBQVEsYUFBUixDQUFULEVBQWQsQ0FMRDtDQURXLENBQWYiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLFJlYWN0LENvbXBvbmVudCxSb3V0ZXIsIFVJLCBQb3NpdGlvbn0gZnJvbSAnLidcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcblxuXG5jbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIFFpbGlBcHB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHthcHA6QXBwbGljYXRpb24uY3VycmVudH0pXG4gICAgICAgIEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLCgpPT50aGlzLnNldFN0YXRlKHthcHA6QXBwbGljYXRpb24uY3VycmVudH0pKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHthcHB9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEN1cnJlbnRBcHAgYXBwPXthcHB9Lz5cbiAgICAgICAgICAgICAgICA8Um91dGVIYW5kbGVyIGFwcD17YXBwfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn07XG5cbk9iamVjdC5hc3NpZ24oUWlsaUNvbnNvbGUuZGVmYXVsdFByb3BzLHtcbiAgICBhcHBJZDpcInFpbGlBZG1pblwiLFxuICAgIGluaXQ6KCk9PkFwcGxpY2F0aW9uLmluaXQoKVxufSk7XG5cbmNsYXNzIEN1cnJlbnRBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgdmFyIHtuYW1lOm5leHROYW1lfT1uZXh0UHJvcHMuYXBwfHx7fSxcbiAgICAgICAgICAgIHtuYW1lfT10aGlzLnByb3BzLmFwcHx8e307XG4gICAgICAgIHJldHVybiBuZXh0TmFtZSE9bmFtZVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2FwcD17bmFtZTpcIlwifSwgc3R5bGU9e29wYWNpdHk6MC43LCBwb3NpdGlvbjpcImFic29sdXRlXCJ9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHM7XG4gICAgICAgIGlmKCFhcHAuX2lkKVxuICAgICAgICAgICAgc3R5bGUuZGlzcGxheT1cImhpZGRlblwiXG5cbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgIHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAgICAgIHthcHAubmFtZX1cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG4gICAgY2hhbmdlKCl7XG4gICAgICAgIHZhciB7YXBwfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgYXBwcz1BcHBsaWNhdGlvbi5hbGwsXG4gICAgICAgICAgICBsZW49YXBwcy5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD0tMVxuICAgICAgICBhcHBzLmZpbmQoKGEpPT4oaW5kZXgrKyxhLl9pZD09YXBwLl9pZCkpXG4gICAgICAgIEFwcGxpY2F0aW9uLmN1cnJlbnQ9YXBwc1soaW5kZXgrMSkgJSBsZW5dXG4gICAgfVxufVxuXG5cbnZhciB7Um91dGUsIFJvdXRlSGFuZGxlciwgIERlZmF1bHRSb3V0ZX0gPSBSb3V0ZXI7XG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICA8Um91dGUgcGF0aD1cIi9cIiBoYW5kbGVyPXtRaWxpQ29uc29sZX0+XG4gICAgXHQ8Um91dGUgbmFtZT1cImFwcFwiIHBhdGg9XCJhcHAvOm5hbWU/XCIgaGFuZGxlcj17cmVxdWlyZSgnLi9hcHAnKX0vPlxuICAgIFx0PFJvdXRlIG5hbWU9XCJjbG91ZFwiIHBhdGg9XCJjbG91ZC9cIiBoYW5kbGVyPXtyZXF1aXJlKCcuL2Nsb3VkJyl9Lz5cbiAgICBcdDxSb3V0ZSBuYW1lPVwiZGF0YVwiIHBhdGg9XCJkYXRhLzpuYW1lP1wiIGhhbmRsZXI9e3JlcXVpcmUoJy4vZGF0YScpfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwibG9nXCIgcGF0aD1cImxvZy86bGV2ZWw/XCIgaGFuZGxlcj17cmVxdWlyZSgnLi9sb2cnKX0vPlxuICAgIFx0PERlZmF1bHRSb3V0ZSBoYW5kbGVyPXtyZXF1aXJlKCcuL2Rhc2hib2FyZCcpfS8+XG4gICAgPC9Sb3V0ZT5cbilcblxuXG4vKipcbkBUb2RvOlxuKkRvbmU6IGFmdGVyIGFkZGluZyBuZXcgYXBwbGljYXRpb25cbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgbG9jYWwgc3RvcmFnZSB3aXRob3V0IEFsbCBmaWVsZHMsIHN1Y2ggYXMgd2l0aG91dCBhcHBsaWNhdGlvbiBuYW1lLCAuLi4sIGJlY2F1c2Ugc2VydmVyIHJldHVybmVkIG9ubHkgX2lkLCBjcmVhdGVkQXQsIC4uLlxuKkRvbmU6IGFmdGVyIGFwcGxpY2F0aW9uIGRlbGV0aW9uLCBVSSBzaG91bGQgZ28gdG8gLyBldmVuIHdpdGggZXJyb3JcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XG4qRG9uJ3Q6IHVzZSA8TGluay8+IHJhdGhlciB0aGFuIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvXG4qKkRvbmU6IE5ldmVyIGVtcHR5IFVJXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcblxuKiB0b28gc21hbGwtem9vbSBzaXplIGluIG1vYmlsZSBicm93c2VyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXG4qIGJhY2tncm91bmQgdG8gdXBsb2FkIHRvIGJhY2tlbmRcbiAgICBkb25lOiBXZWJTUUxEYiBpcyBkb25lXG4gICAgKioqIHNxbGl0ZVxuICAgIGRvbmU6ICoqKiBhZnRlciByZW1vdmUgYXBwLCBsb2NhbCBjYWNoZSBzaG91bGQgYmUgcmVtb3ZlZCB0b29cbioqIHRleHRmaWVsZCBjYW4ndCBiZSBjaGFuZ2VkICh3aGljaD8/KVxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxuKiBzaW1wbGUgZGF0YSBtb2RlOlxuICAgICogcmVtb3RlIHVwc2VydCBhbmQgcmVtb3ZlIGRpcmVjdGx5XG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXG4qIENhbm5vdCByZWFkIHByb3BlcnR5ICdjb21wb25lbnREaWRFbnRlcicgb2YgdW5kZWZpbmVkXG4qRG9uZTogRGF0ZSBzaG93IGFzIG1lYW5pbmdmdWxcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxuKi9cbiJdfQ==