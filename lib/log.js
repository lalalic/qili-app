'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('material-ui/lib/svg-icons/action/http');

var _http2 = _interopRequireDefault(_http);

var _error = require('material-ui/lib/svg-icons/alert/error');

var _error2 = _interopRequireDefault(_error);

var _warning = require('material-ui/lib/svg-icons/alert/warning');

var _warning2 = _interopRequireDefault(_warning);

var _assignment = require('material-ui/lib/svg-icons/action/assignment');

var _assignment2 = _interopRequireDefault(_assignment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('.');

var React = _require.React;
var Component = _require.Component;
var _require$UI = _require.UI;
var CommandBar = _require$UI.CommandBar;
var List = _require$UI.List;
var Empty = _require$UI.Empty;
var App = require('./db/app');

var _require2 = require('material-ui');

var FontIcon = _require2.FontIcon;


var levels = {
    warning: 2,
    error: 3,
    http: 9,
    all: null,
    "9": "http",
    "3": "error",
    "2": "warning",
    "1": "info"
},
    Icons = { Http: _http2.default, Error: _error2.default, Warning: _warning2.default, All: _assignment2.default };

var Log = function (_Component) {
    _inherits(Log, _Component);

    function Log(p) {
        _classCallCheck(this, Log);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Log).call(this, p));

        _this.state = { logs: App.getLog(_this._level()) };
        return _this;
    }

    _createClass(Log, [{
        key: '_level',
        value: function _level(props) {
            var level = (props || this.props)['params'].level;

            return levels[level || 'all'];
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.app != nextProps.app) return this.setState({ logs: App.getLog(this._level()) });

            var nextLevel = nextProps.params.level;
            var level = this.props.params.level;

            if (level != nextLevel) this.setState({ logs: App.getLog(this._level(nextProps)) });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$params$level = this.props.params.level;
            var level = _props$params$level === undefined ? "All" : _props$params$level;

            level = level.charAt(0).toUpperCase() + level.substr(1);
            var Icon = Icons[level];
            return React.createElement(
                'div',
                null,
                React.createElement(List, { model: this.state.logs,
                    empty: React.createElement(Empty, { icon: React.createElement(Icon, null), text: '' }),
                    template: ALog }),
                React.createElement(CommandBar, { className: 'footbar', style: { textAlign: 'left' },
                    onSelect: function onSelect(a) {
                        return _this2.onSelect(a);
                    },
                    primary: level,
                    items: [{ action: "Back" }, { action: "Http", icon: _http2.default }, { action: "Error", icon: _error2.default }, { action: "Warning", icon: _warning2.default }, { action: "All", icon: _assignment2.default }] })
            );
        }
    }, {
        key: 'onSelect',
        value: function onSelect(level) {
            this.context.router.replaceWith("log", { level: level.toLowerCase() });
        }
    }]);

    return Log;
}(Component);

exports.default = Log;


Log.contextTypes = { router: React.PropTypes.func };

var ALog = function (_Component2) {
    _inherits(ALog, _Component2);

    function ALog() {
        _classCallCheck(this, ALog);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ALog).apply(this, arguments));
    }

    _createClass(ALog, [{
        key: 'render',
        value: function render() {
            var log = this.props.model;

            return React.createElement(List.Item, { primaryText: levels[log.level + ""] + ' on ' + log.createdAt, secondaryText: log.message });
        }
    }]);

    return ALog;
}(Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QU0sTUFBTSxXQUFOLEVBQU4sRUFBdkMsRUFEVzs7OztXQTVDRTtFQUFZOztrQkFBWjs7O0FBaURyQixJQUFJLFlBQUosR0FBaUIsRUFBQyxRQUFRLE1BQU0sU0FBTixDQUFnQixJQUFoQixFQUExQjs7SUFFTTs7Ozs7Ozs7Ozs7aUNBQ007Z0JBQ08sTUFBSyxLQUFLLEtBQUwsQ0FBWCxNQUREOztBQUVKLG1CQUFRLG9CQUFDLEtBQUssSUFBTixJQUFXLGFBQWdCLE9BQU8sSUFBSSxLQUFKLEdBQVUsRUFBVixhQUFvQixJQUFJLFNBQUosRUFBaUIsZUFBZSxJQUFJLE9BQUosRUFBdEYsQ0FBUixDQUZJOzs7O1dBRE47RUFBYSIsImZpbGUiOiJsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1JlYWN0LCBDb21wb25lbnQsIFVJOntDb21tYW5kQmFyLCBMaXN0LCBFbXB0eX19PXJlcXVpcmUoJy4nKSxcbiAgICBBcHA9cmVxdWlyZSgnLi9kYi9hcHAnKSxcbiAgICB7Rm9udEljb259PXJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbmltcG9ydCBIdHRwIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9odHRwXCJcbmltcG9ydCBFcnJvciBmcm9tIFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hbGVydC9lcnJvclwiXG5pbXBvcnQgV2FybmluZyBmcm9tIFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hbGVydC93YXJuaW5nXCJcbmltcG9ydCBBbGwgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2Fzc2lnbm1lbnRcIlxuXG52YXIgbGV2ZWxzPXtcbiAgICBcdHdhcm5pbmc6MixcbiAgICBcdGVycm9yOjMsXG4gICAgXHRodHRwOjksXG4gICAgXHRhbGw6bnVsbCxcbiAgICAgICAgXCI5XCI6XCJodHRwXCIsXG4gICAgICAgIFwiM1wiOlwiZXJyb3JcIixcbiAgICAgICAgXCIyXCI6XCJ3YXJuaW5nXCIsXG4gICAgICAgIFwiMVwiOlwiaW5mb1wiXG4gICAgfSxcbiAgICBJY29ucz17SHR0cCwgRXJyb3IsIFdhcm5pbmcsIEFsbH1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3RvcihwKXtcbiAgICAgICAgc3VwZXIocClcbiAgICAgICAgdGhpcy5zdGF0ZT17bG9nczpBcHAuZ2V0TG9nKHRoaXMuX2xldmVsKCkpfVxuICAgIH1cblxuICAgIF9sZXZlbChwcm9wcyl7XG4gICAgICAgIHZhciB7bGV2ZWx9PShwcm9wc3x8dGhpcy5wcm9wcylbJ3BhcmFtcyddXG5cdFx0cmV0dXJuIGxldmVsc1tsZXZlbHx8J2FsbCddXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLmFwcCE9bmV4dFByb3BzLmFwcClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtsb2dzOkFwcC5nZXRMb2codGhpcy5fbGV2ZWwoKSl9KVxuXG4gICAgICAgIHZhciB7bGV2ZWw6bmV4dExldmVsfT1uZXh0UHJvcHMucGFyYW1zLFxuICAgICAgICAgICAge2xldmVsfT10aGlzLnByb3BzLnBhcmFtc1xuICAgICAgICBpZihsZXZlbCE9bmV4dExldmVsKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9nczpBcHAuZ2V0TG9nKHRoaXMuX2xldmVsKG5leHRQcm9wcykpfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtsZXZlbD1cIkFsbFwifT10aGlzLnByb3BzLnBhcmFtc1xuICAgICAgICBsZXZlbD1sZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStsZXZlbC5zdWJzdHIoMSlcbiAgICAgICAgdmFyIEljb249SWNvbnNbbGV2ZWxdXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPExpc3QgbW9kZWw9e3RoaXMuc3RhdGUubG9nc31cbiAgICAgICAgICAgICAgICAgICAgZW1wdHk9ezxFbXB0eSBpY29uPXs8SWNvbi8+fSB0ZXh0PVwiXCIvPn0gXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlPXtBTG9nfS8+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t0ZXh0QWxpZ246J2xlZnQnfX1cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9eyhhKT0+dGhpcy5vblNlbGVjdChhKX1cbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17bGV2ZWx9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiSHR0cFwiLCBpY29uOkh0dHB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkVycm9yXCIsIGljb246RXJyb3J9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIldhcm5pbmdcIiwgaWNvbjpXYXJuaW5nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJBbGxcIiwgaWNvbjpBbGx9XG4gICAgICAgICAgICAgICAgICAgIF19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgb25TZWxlY3QobGV2ZWwpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2VXaXRoKFwibG9nXCIse2xldmVsOmxldmVsLnRvTG93ZXJDYXNlKCl9KVxuICAgIH1cbn1cblxuTG9nLmNvbnRleHRUeXBlcz17cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuY2xhc3MgQUxvZyBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbDpsb2d9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuICg8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXtgJHtsZXZlbHNbbG9nLmxldmVsK1wiXCJdfSBvbiAke2xvZy5jcmVhdGVkQXR9YH0gc2Vjb25kYXJ5VGV4dD17bG9nLm1lc3NhZ2V9Lz4pXG4gICAgfVxufVxuIl19