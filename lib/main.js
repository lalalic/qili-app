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
                _.React.createElement(CurrentApp, { app: app,
                    style: { position: 'fixed', top: 10, right: this._right(10), opacity: 0.7, zIndex: 9 } }),
                _.React.createElement(RouteHandler, { app: app })
            );
        }
    }]);

    return QiliConsole;
}(_.QiliApp);

;

Object.assign(QiliConsole.defaultProps, {
    appId: "admin",
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
            var style = _props$style === undefined ? {} : _props$style;

            var others = _objectWithoutProperties(_props, ['app', 'style']);

            if (!app._id) style.display = "hidden";

            return _.React.createElement(
                _materialUi.FloatingActionButton,
                _extends({
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
//# sourceMappingURL=data:application/json;base64,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QUFsQyxDQUZEO0lBR0Msc0JBQUMsS0FBRCxJQUFPLE1BQUssTUFBTCxFQUFZLE1BQUssYUFBTCxFQUFtQixTQUFTLFFBQVEsUUFBUixDQUFULEVBQXRDLENBSEQ7SUFJSSxzQkFBQyxLQUFELElBQU8sTUFBSyxLQUFMLEVBQVcsTUFBSyxhQUFMLEVBQW1CLFNBQVMsUUFBUSxPQUFSLENBQVQsRUFBckMsQ0FKSjtJQUtDLHNCQUFDLFlBQUQsSUFBYyxTQUFTLFFBQVEsYUFBUixDQUFULEVBQWQsQ0FMRDtDQURXLENBQWYiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLFJlYWN0LENvbXBvbmVudCxSb3V0ZXIsIFVJLCBQb3NpdGlvbn0gZnJvbSAnLidcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcblxuXG5jbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIFFpbGlBcHB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHthcHA6QXBwbGljYXRpb24uY3VycmVudH0pXG4gICAgICAgIEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLCgpPT50aGlzLnNldFN0YXRlKHthcHA6QXBwbGljYXRpb24uY3VycmVudH0pKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHthcHB9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEN1cnJlbnRBcHAgYXBwPXthcHB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cG9zaXRpb246J2ZpeGVkJyx0b3A6MTAscmlnaHQ6dGhpcy5fcmlnaHQoMTApLCBvcGFjaXR5OjAuNywgekluZGV4Ojl9fS8+XG4gICAgICAgICAgICAgICAgPFJvdXRlSGFuZGxlciBhcHA9e2FwcH0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59O1xuXG5PYmplY3QuYXNzaWduKFFpbGlDb25zb2xlLmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCJhZG1pblwiLFxuICAgIGluaXQ6KCk9PkFwcGxpY2F0aW9uLmluaXQoKVxufSk7XG5cbmNsYXNzIEN1cnJlbnRBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgdmFyIHtuYW1lOm5leHROYW1lfT1uZXh0UHJvcHMuYXBwfHx7fSxcbiAgICAgICAgICAgIHtuYW1lfT10aGlzLnByb3BzLmFwcHx8e307XG4gICAgICAgIHJldHVybiBuZXh0TmFtZSE9bmFtZVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2FwcD17bmFtZTpcIlwifSwgc3R5bGU9e30sIC4uLm90aGVyc309dGhpcy5wcm9wcztcbiAgICAgICAgaWYoIWFwcC5faWQpXG4gICAgICAgICAgICBzdHlsZS5kaXNwbGF5PVwiaGlkZGVuXCJcblxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICB7Li4ub3RoZXJzfT5cbiAgICAgICAgICAgICAgICB7YXBwLm5hbWV9XG4gICAgICAgICAgICA8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuICAgICAgICApXG4gICAgfVxuICAgIGNoYW5nZSgpe1xuICAgICAgICB2YXIge2FwcH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGFwcHM9QXBwbGljYXRpb24uYWxsLFxuICAgICAgICAgICAgbGVuPWFwcHMubGVuZ3RoO1xuICAgICAgICBpZihsZW48MilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgaW5kZXg9LTFcbiAgICAgICAgYXBwcy5maW5kKChhKT0+KGluZGV4KyssYS5faWQ9PWFwcC5faWQpKVxuICAgICAgICBBcHBsaWNhdGlvbi5jdXJyZW50PWFwcHNbKGluZGV4KzEpICUgbGVuXVxuICAgIH1cbn1cblxuXG52YXIge1JvdXRlLCBSb3V0ZUhhbmRsZXIsICBEZWZhdWx0Um91dGV9ID0gUm91dGVyO1xubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgPFJvdXRlIHBhdGg9XCIvXCIgaGFuZGxlcj17UWlsaUNvbnNvbGV9PlxuICAgIFx0PFJvdXRlIG5hbWU9XCJhcHBcIiBwYXRoPVwiYXBwLzpuYW1lP1wiIGhhbmRsZXI9e3JlcXVpcmUoJy4vYXBwJyl9Lz5cbiAgICBcdDxSb3V0ZSBuYW1lPVwiY2xvdWRcIiBwYXRoPVwiY2xvdWQvXCIgaGFuZGxlcj17cmVxdWlyZSgnLi9jbG91ZCcpfS8+XG4gICAgXHQ8Um91dGUgbmFtZT1cImRhdGFcIiBwYXRoPVwiZGF0YS86bmFtZT9cIiBoYW5kbGVyPXtyZXF1aXJlKCcuL2RhdGEnKX0vPlxuICAgICAgICA8Um91dGUgbmFtZT1cImxvZ1wiIHBhdGg9XCJsb2cvOmxldmVsP1wiIGhhbmRsZXI9e3JlcXVpcmUoJy4vbG9nJyl9Lz5cbiAgICBcdDxEZWZhdWx0Um91dGUgaGFuZGxlcj17cmVxdWlyZSgnLi9kYXNoYm9hcmQnKX0vPlxuICAgIDwvUm91dGU+XG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=