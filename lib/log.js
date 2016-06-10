'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('material-ui/svg-icons/action/http');

var _http2 = _interopRequireDefault(_http);

var _error = require('material-ui/svg-icons/alert/error');

var _error2 = _interopRequireDefault(_error);

var _warning = require('material-ui/svg-icons/alert/warning');

var _warning2 = _interopRequireDefault(_warning);

var _assignment = require('material-ui/svg-icons/action/assignment');

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
};
var Icons = { Http: _http2.default, Error: _error2.default, Warning: _warning2.default, All: _assignment2.default };

var Log = function (_Component) {
    _inherits(Log, _Component);

    function Log(p) {
        _classCallCheck(this, Log);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Log).call(this, p));

        _this.state = { logs: null };
        return _this;
    }

    _createClass(Log, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.state = { logs: App.getLog(this._level()) };
        }
    }, {
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
            this.context.router.replace('log/' + level.toLowerCase());
        }
    }]);

    return Log;
}(Component);

exports.default = Log;


Log.contextTypes = { router: React.PropTypes.object };

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
//# sourceMappingURL=data:application/json;base64,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LGlCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLE9BQXBCLFVBQW1DLE1BQU0sV0FBTixFQUFuQyxFQURXOzs7O1dBaERFO0VBQVk7O2tCQUFaOzs7QUFxRHJCLElBQUksWUFBSixHQUFpQixFQUFDLFFBQU8sTUFBTSxTQUFOLENBQWdCLE1BQWhCLEVBQXpCOztJQUVNOzs7Ozs7Ozs7OztpQ0FDTTtnQkFDTyxNQUFLLEtBQUssS0FBTCxDQUFYLE1BREQ7O0FBRUosbUJBQVEsb0JBQUMsS0FBSyxJQUFOLElBQVcsYUFBZ0IsT0FBTyxJQUFJLEtBQUosR0FBVSxFQUFWLGFBQW9CLElBQUksU0FBSixFQUFpQixlQUFlLElBQUksT0FBSixFQUF0RixDQUFSLENBRkk7Ozs7V0FETjtFQUFhIiwiZmlsZSI6ImxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7UmVhY3QsIENvbXBvbmVudCwgVUk6e0NvbW1hbmRCYXIsIExpc3QsIEVtcHR5fX09cmVxdWlyZSgnLicpLFxuICAgIEFwcD1yZXF1aXJlKCcuL2RiL2FwcCcpLFxuICAgIHtGb250SWNvbn09cmVxdWlyZSgnbWF0ZXJpYWwtdWknKTtcblxuaW1wb3J0IEh0dHAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vaHR0cFwiXG5pbXBvcnQgRXJyb3IgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hbGVydC9lcnJvclwiXG5pbXBvcnQgV2FybmluZyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FsZXJ0L3dhcm5pbmdcIlxuaW1wb3J0IEFsbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hc3NpZ25tZW50XCJcblxuY29uc3QgbGV2ZWxzPXtcbiAgICBcdHdhcm5pbmc6MixcbiAgICBcdGVycm9yOjMsXG4gICAgXHRodHRwOjksXG4gICAgXHRhbGw6bnVsbCxcbiAgICAgICAgXCI5XCI6XCJodHRwXCIsXG4gICAgICAgIFwiM1wiOlwiZXJyb3JcIixcbiAgICAgICAgXCIyXCI6XCJ3YXJuaW5nXCIsXG4gICAgICAgIFwiMVwiOlwiaW5mb1wiXG4gICAgfVxuY29uc3QgSWNvbnM9e0h0dHAsIEVycm9yLCBXYXJuaW5nLCBBbGx9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3RvcihwKXtcbiAgICAgICAgc3VwZXIocClcbiAgICAgICAgdGhpcy5zdGF0ZT17bG9nczpudWxsfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMuc3RhdGU9e2xvZ3M6QXBwLmdldExvZyh0aGlzLl9sZXZlbCgpKX1cbiAgICB9XG5cbiAgICBfbGV2ZWwocHJvcHMpe1xuICAgICAgICB2YXIge2xldmVsfT0ocHJvcHN8fHRoaXMucHJvcHMpWydwYXJhbXMnXVxuXHRcdHJldHVybiBsZXZlbHNbbGV2ZWx8fCdhbGwnXVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5hcHAhPW5leHRQcm9wcy5hcHApXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7bG9nczpBcHAuZ2V0TG9nKHRoaXMuX2xldmVsKCkpfSlcblxuICAgICAgICB2YXIge2xldmVsOm5leHRMZXZlbH09bmV4dFByb3BzLnBhcmFtcyxcbiAgICAgICAgICAgIHtsZXZlbH09dGhpcy5wcm9wcy5wYXJhbXNcbiAgICAgICAgaWYobGV2ZWwhPW5leHRMZXZlbClcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvZ3M6QXBwLmdldExvZyh0aGlzLl9sZXZlbChuZXh0UHJvcHMpKX0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bGV2ZWw9XCJBbGxcIn09dGhpcy5wcm9wcy5wYXJhbXNcbiAgICAgICAgbGV2ZWw9bGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrbGV2ZWwuc3Vic3RyKDEpXG4gICAgICAgIHZhciBJY29uPUljb25zW2xldmVsXVxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxMaXN0IG1vZGVsPXt0aGlzLnN0YXRlLmxvZ3N9XG4gICAgICAgICAgICAgICAgICAgIGVtcHR5PXs8RW1wdHkgaWNvbj17PEljb24vPn0gdGV4dD1cIlwiLz59XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlPXtBTG9nfS8+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t0ZXh0QWxpZ246J2xlZnQnfX1cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9eyhhKT0+dGhpcy5vblNlbGVjdChhKX1cbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17bGV2ZWx9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiSHR0cFwiLCBpY29uOkh0dHB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkVycm9yXCIsIGljb246RXJyb3J9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIldhcm5pbmdcIiwgaWNvbjpXYXJuaW5nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJBbGxcIiwgaWNvbjpBbGx9XG4gICAgICAgICAgICAgICAgICAgIF19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgb25TZWxlY3QobGV2ZWwpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGxvZy8ke2xldmVsLnRvTG93ZXJDYXNlKCl9YClcbiAgICB9XG59XG5cbkxvZy5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXG5jbGFzcyBBTG9nIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsOmxvZ309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e2Ake2xldmVsc1tsb2cubGV2ZWwrXCJcIl19IG9uICR7bG9nLmNyZWF0ZWRBdH1gfSBzZWNvbmRhcnlUZXh0PXtsb2cubWVzc2FnZX0vPilcbiAgICB9XG59XG4iXX0=