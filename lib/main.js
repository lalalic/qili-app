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
            var style = _props$style === undefined ? {} : _props$style;

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
//# sourceMappingURL=data:application/json;base64,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SSxzQkFBQyxLQUFELElBQU8sTUFBSyxLQUFMLEVBQVcsTUFBSyxhQUFMLEVBQW1CLFNBQVMsUUFBUSxPQUFSLENBQVQsRUFBckMsQ0FKSjtJQUtDLHNCQUFDLFlBQUQsSUFBYyxTQUFTLFFBQVEsYUFBUixDQUFULEVBQWQsQ0FMRDtDQURXLENBQWYiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLFJlYWN0LENvbXBvbmVudCxSb3V0ZXIsIFVJLCBQb3NpdGlvbn0gZnJvbSAnLidcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcblxuXG5jbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIFFpbGlBcHB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHthcHA6QXBwbGljYXRpb24uY3VycmVudH0pXG4gICAgICAgIEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLCgpPT50aGlzLnNldFN0YXRlKHthcHA6QXBwbGljYXRpb24uY3VycmVudH0pKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHthcHB9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEN1cnJlbnRBcHAgYXBwPXthcHB9Lz5cbiAgICAgICAgICAgICAgICA8Um91dGVIYW5kbGVyIGFwcD17YXBwfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn07XG5cbk9iamVjdC5hc3NpZ24oUWlsaUNvbnNvbGUuZGVmYXVsdFByb3BzLHtcbiAgICBhcHBJZDpcInFpbGlBZG1pblwiLFxuICAgIGluaXQ6KCk9PkFwcGxpY2F0aW9uLmluaXQoKVxufSk7XG5cbmNsYXNzIEN1cnJlbnRBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgdmFyIHtuYW1lOm5leHROYW1lfT1uZXh0UHJvcHMuYXBwfHx7fSxcbiAgICAgICAgICAgIHtuYW1lfT10aGlzLnByb3BzLmFwcHx8e307XG4gICAgICAgIHJldHVybiBuZXh0TmFtZSE9bmFtZVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2FwcD17bmFtZTpcIlwifSwgc3R5bGU9e30sIC4uLm90aGVyc309dGhpcy5wcm9wcztcbiAgICAgICAgaWYoIWFwcC5faWQpXG4gICAgICAgICAgICBzdHlsZS5kaXNwbGF5PVwiaGlkZGVuXCJcblxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgey4uLm90aGVyc30+XG4gICAgICAgICAgICAgICAge2FwcC5uYW1lfVxuICAgICAgICAgICAgPC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIHthcHB9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBhcHBzPUFwcGxpY2F0aW9uLmFsbCxcbiAgICAgICAgICAgIGxlbj1hcHBzLmxlbmd0aDtcbiAgICAgICAgaWYobGVuPDIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGluZGV4PS0xXG4gICAgICAgIGFwcHMuZmluZCgoYSk9PihpbmRleCsrLGEuX2lkPT1hcHAuX2lkKSlcbiAgICAgICAgQXBwbGljYXRpb24uY3VycmVudD1hcHBzWyhpbmRleCsxKSAlIGxlbl1cbiAgICB9XG59XG5cblxudmFyIHtSb3V0ZSwgUm91dGVIYW5kbGVyLCAgRGVmYXVsdFJvdXRlfSA9IFJvdXRlcjtcbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGhhbmRsZXI9e1FpbGlDb25zb2xlfT5cbiAgICBcdDxSb3V0ZSBuYW1lPVwiYXBwXCIgcGF0aD1cImFwcC86bmFtZT9cIiBoYW5kbGVyPXtyZXF1aXJlKCcuL2FwcCcpfS8+XG4gICAgXHQ8Um91dGUgbmFtZT1cImNsb3VkXCIgcGF0aD1cImNsb3VkL1wiIGhhbmRsZXI9e3JlcXVpcmUoJy4vY2xvdWQnKX0vPlxuICAgIFx0PFJvdXRlIG5hbWU9XCJkYXRhXCIgcGF0aD1cImRhdGEvOm5hbWU/XCIgaGFuZGxlcj17cmVxdWlyZSgnLi9kYXRhJyl9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJsb2dcIiBwYXRoPVwibG9nLzpsZXZlbD9cIiBoYW5kbGVyPXtyZXF1aXJlKCcuL2xvZycpfS8+XG4gICAgXHQ8RGVmYXVsdFJvdXRlIGhhbmRsZXI9e3JlcXVpcmUoJy4vZGFzaGJvYXJkJyl9Lz5cbiAgICA8L1JvdXRlPlxuKVxuXG5cbi8qKlxuQFRvZG86XG4qRG9uZTogYWZ0ZXIgYWRkaW5nIG5ldyBhcHBsaWNhdGlvblxuICAgIGFwcGxpY2F0aW9uIGxpc3QgZG9lc24ndCByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICBsb2NhbCBzdG9yYWdlIHdpdGhvdXQgQWxsIGZpZWxkcywgc3VjaCBhcyB3aXRob3V0IGFwcGxpY2F0aW9uIG5hbWUsIC4uLiwgYmVjYXVzZSBzZXJ2ZXIgcmV0dXJuZWQgb25seSBfaWQsIGNyZWF0ZWRBdCwgLi4uXG4qRG9uZTogYWZ0ZXIgYXBwbGljYXRpb24gZGVsZXRpb24sIFVJIHNob3VsZCBnbyB0byAvIGV2ZW4gd2l0aCBlcnJvclxuKkRvbmU6IGVycm9yIGhhcHBlbnMsIFVJIHNob3VsZCBub3QgYmUgRW1wdHlcbipEb24ndDogdXNlIDxMaW5rLz4gcmF0aGVyIHRoYW4gdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG9cbioqRG9uZTogTmV2ZXIgZW1wdHkgVUlcbioqRG9uZTogRmxvYXRBY3Rpb25CdXR0b24gcG9zaXRpb24gd2hlbiB2aWV3IHdpZHRoIGlzIDk2MFxuXG4qIHRvbyBzbWFsbC16b29tIHNpemUgaW4gbW9iaWxlIGJyb3dzZXJcbiogZmlyc3QgZm9jdXMgb24gZm9ybSwgY2xvdWQgVUlcbiogYmFja2dyb3VuZCB0byB1cGxvYWQgdG8gYmFja2VuZFxuICAgIGRvbmU6IFdlYlNRTERiIGlzIGRvbmVcbiAgICAqKiogc3FsaXRlXG4gICAgZG9uZTogKioqIGFmdGVyIHJlbW92ZSBhcHAsIGxvY2FsIGNhY2hlIHNob3VsZCBiZSByZW1vdmVkIHRvb1xuKiogdGV4dGZpZWxkIGNhbid0IGJlIGNoYW5nZWQgKHdoaWNoPz8pXG4qRG9uZTogbG9naW4gZXJyb3IsIHBsYWNlaG9sZGVyIGFuZCB2YWx1ZSBzaG93IHRvZ2V0aGVyXG4qIHNpbXBsZSBkYXRhIG1vZGU6XG4gICAgKiByZW1vdGUgdXBzZXJ0IGFuZCByZW1vdmUgZGlyZWN0bHlcbiAgICAqIGxvY2FsIGNhY2hlIGZvciBzZWFyY2hcbiogQ2Fubm90IHJlYWQgcHJvcGVydHkgJ2NvbXBvbmVudERpZEVudGVyJyBvZiB1bmRlZmluZWRcbipEb25lOiBEYXRlIHNob3cgYXMgbWVhbmluZ2Z1bFxuKiBkYXRhIGxpc3QgdG8gc2hvdyBvYmplY3QgZmllbGQgW29iamVjdF09PnsuLi59XG4qL1xuIl19