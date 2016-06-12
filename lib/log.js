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
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ logs: App.getLog(this._level()) });
        }
    }, {
        key: '_level',
        value: function _level(props) {
            var level = (props || this.props)['params'].level;

            return levels[level];
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

            var level = this.props.params.level;

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
//# sourceMappingURL=data:application/json;base64,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LE1BQWIsQ0FBb0IsT0FBcEIsVUFBbUMsTUFBTSxXQUFOLEVBQW5DLEVBRFc7Ozs7V0FoREU7RUFBWTs7a0JBQVo7OztBQXFEckIsSUFBSSxZQUFKLEdBQWlCLEVBQUMsUUFBTyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsRUFBekI7O0lBRU07Ozs7Ozs7Ozs7O2lDQUNNO2dCQUNPLE1BQUssS0FBSyxLQUFMLENBQVgsTUFERDs7QUFFSixtQkFBUSxvQkFBQyxLQUFLLElBQU4sSUFBVyxhQUFnQixPQUFPLElBQUksS0FBSixHQUFVLEVBQVYsYUFBb0IsSUFBSSxTQUFKLEVBQWlCLGVBQWUsSUFBSSxPQUFKLEVBQXRGLENBQVIsQ0FGSTs7OztXQUROO0VBQWEiLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtSZWFjdCwgQ29tcG9uZW50LCBVSTp7Q29tbWFuZEJhciwgTGlzdCwgRW1wdHl9fT1yZXF1aXJlKCcuJyksXG4gICAgQXBwPXJlcXVpcmUoJy4vZGIvYXBwJyksXG4gICAge0ZvbnRJY29ufT1yZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG5pbXBvcnQgSHR0cCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9odHRwXCJcbmltcG9ydCBFcnJvciBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FsZXJ0L2Vycm9yXCJcbmltcG9ydCBXYXJuaW5nIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvd2FybmluZ1wiXG5pbXBvcnQgQWxsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Fzc2lnbm1lbnRcIlxuXG5jb25zdCBsZXZlbHM9e1xuICAgIFx0d2FybmluZzoyLFxuICAgIFx0ZXJyb3I6MyxcbiAgICBcdGh0dHA6OSxcbiAgICBcdGFsbDpudWxsLFxuICAgICAgICBcIjlcIjpcImh0dHBcIixcbiAgICAgICAgXCIzXCI6XCJlcnJvclwiLFxuICAgICAgICBcIjJcIjpcIndhcm5pbmdcIixcbiAgICAgICAgXCIxXCI6XCJpbmZvXCJcbiAgICB9XG5jb25zdCBJY29ucz17SHR0cCwgRXJyb3IsIFdhcm5pbmcsIEFsbH1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHApe1xuICAgICAgICBzdXBlcihwKVxuICAgICAgICB0aGlzLnN0YXRlPXtsb2dzOm51bGx9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvZ3M6QXBwLmdldExvZyh0aGlzLl9sZXZlbCgpKX0pXG4gICAgfVxuXG4gICAgX2xldmVsKHByb3BzKXtcbiAgICAgICAgdmFyIHtsZXZlbH09KHByb3BzfHx0aGlzLnByb3BzKVsncGFyYW1zJ11cblx0XHRyZXR1cm4gbGV2ZWxzW2xldmVsXVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5hcHAhPW5leHRQcm9wcy5hcHApXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7bG9nczpBcHAuZ2V0TG9nKHRoaXMuX2xldmVsKCkpfSlcblxuICAgICAgICB2YXIge2xldmVsOm5leHRMZXZlbH09bmV4dFByb3BzLnBhcmFtcyxcbiAgICAgICAgICAgIHtsZXZlbH09dGhpcy5wcm9wcy5wYXJhbXNcbiAgICAgICAgaWYobGV2ZWwhPW5leHRMZXZlbClcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvZ3M6QXBwLmdldExvZyh0aGlzLl9sZXZlbChuZXh0UHJvcHMpKX0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bGV2ZWx9PXRoaXMucHJvcHMucGFyYW1zXG4gICAgICAgIGxldmVsPWxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2xldmVsLnN1YnN0cigxKVxuICAgICAgICB2YXIgSWNvbj1JY29uc1tsZXZlbF1cbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8TGlzdCBtb2RlbD17dGhpcy5zdGF0ZS5sb2dzfVxuICAgICAgICAgICAgICAgICAgICBlbXB0eT17PEVtcHR5IGljb249ezxJY29uLz59IHRleHQ9XCJcIi8+fVxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZT17QUxvZ30vPlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7dGV4dEFsaWduOidsZWZ0J319XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXsoYSk9PnRoaXMub25TZWxlY3QoYSl9XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e2xldmVsfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkh0dHBcIiwgaWNvbjpIdHRwfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJFcnJvclwiLCBpY29uOkVycm9yfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJXYXJuaW5nXCIsIGljb246V2FybmluZ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiQWxsXCIsIGljb246QWxsfVxuICAgICAgICAgICAgICAgICAgICBdfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGxldmVsKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBsb2cvJHtsZXZlbC50b0xvd2VyQ2FzZSgpfWApXG4gICAgfVxufVxuXG5Mb2cuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuY2xhc3MgQUxvZyBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbDpsb2d9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuICg8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXtgJHtsZXZlbHNbbG9nLmxldmVsK1wiXCJdfSBvbiAke2xvZy5jcmVhdGVkQXR9YH0gc2Vjb25kYXJ5VGV4dD17bG9nLm1lc3NhZ2V9Lz4pXG4gICAgfVxufVxuIl19