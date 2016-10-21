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

    function Log() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Log);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Log)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { logs: null }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Log, [{
        key: 'getData',
        value: function getData(level) {
            this.setState({ logs: App.getLog(levels[level]) });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getData(this.props.params.level);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            if (this.context.app != nextContext.app) this.getData(this.props.params.level);else if (this.props.params.level != nextProps.params.levle) this.getData(nextProps.params.level);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(List, { model: this.state.logs, template: this.constructor.ALog }),
                React.createElement(CommandBar, { className: 'footbar',
                    onSelect: function onSelect(level) {
                        return _this2.context.router.push('log/' + level);
                    },
                    primary: this.props.params.level,
                    items: [{ action: "Back" }, { action: "http", icon: _http2.default }, { action: "error", icon: _error2.default }, { action: "warning", icon: _warning2.default }, { action: "all", icon: _assignment2.default }] })
            );
        }
    }]);

    return Log;
}(Component);

Log.contextTypes = {
    router: React.PropTypes.object,
    app: React.PropTypes.object
};

Log.ALog = function (_Component2) {
    _inherits(_class, _Component2);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'render',
        value: function render() {
            var log = this.props.model;

            return React.createElement(List.Item, { primaryText: levels[log.level + ""] + ' on ' + log.createdAt, secondaryText: log.message });
        }
    }]);

    return _class;
}(Component);

exports.default = Log;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O2VBUHFELFFBQVEsR0FBUjs7SUFBaEQ7SUFBTzsyQkFBVztJQUFJO0lBQVk7QUFBbkMsSUFBeUMseUJBQXpDO0FBQ0EsVUFBSSxRQUFRLFVBQVIsQ0FBSjs7Z0JBQ1csUUFBUSxhQUFSOztJQUFWOzs7QUFPTCxJQUFNLFNBQU87QUFDUixhQUFRLENBQVI7QUFDQSxXQUFNLENBQU47QUFDQSxVQUFLLENBQUw7QUFDQSxTQUFJLElBQUo7QUFDRyxTQUFJLE1BQUo7QUFDQSxTQUFJLE9BQUo7QUFDQSxTQUFJLFNBQUo7QUFDQSxTQUFJLE1BQUo7Q0FSRjtBQVVOLElBQU0sUUFBTSxFQUFDLG9CQUFELEVBQU8sc0JBQVAsRUFBYywwQkFBZCxFQUF1Qix5QkFBdkIsRUFBTjs7SUFFZTs7Ozs7Ozs7Ozs7Ozs7cU1BQ2pCLFFBQU0sRUFBQyxNQUFLLElBQUw7OztpQkFEVTs7Z0NBR1osT0FBTTtBQUNiLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssSUFBSSxNQUFKLENBQVcsT0FBTyxLQUFQLENBQVgsQ0FBTCxFQUFmLEVBRGE7Ozs7NENBSVE7QUFDZixpQkFBSyxPQUFMLENBQWEsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUFsQixDQUFiLENBRGU7Ozs7a0RBSU8sV0FBVyxhQUFZO0FBQ25ELGdCQUFHLEtBQUssT0FBTCxDQUFhLEdBQWIsSUFBa0IsWUFBWSxHQUFaLEVBQ3BCLEtBQUssT0FBTCxDQUFhLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBbEIsQ0FBYixDQURELEtBRUssSUFBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQWxCLElBQXlCLFVBQVUsTUFBVixDQUFpQixLQUFqQixFQUNoQyxLQUFLLE9BQUwsQ0FBYSxVQUFVLE1BQVYsQ0FBaUIsS0FBakIsQ0FBYixDQURJOzs7O2lDQUlLOzs7QUFDSixtQkFDSTs7O2dCQUNJLG9CQUFDLElBQUQsSUFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsVUFBVSxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsRUFBeEMsQ0FESjtnQkFHSSxvQkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ1IsOEJBQVU7K0JBQU8sT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixVQUFnQyxLQUFoQztxQkFBUDtBQUNWLDZCQUFTLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBbEI7QUFDVCwyQkFBTyxDQUNyQixFQUFDLFFBQU8sTUFBUCxFQURvQixFQUVILEVBQUMsUUFBTyxNQUFQLEVBQWUsb0JBQWhCLEVBRkcsRUFHSCxFQUFDLFFBQU8sT0FBUCxFQUFnQixxQkFBakIsRUFIRyxFQUlILEVBQUMsUUFBTyxTQUFQLEVBQWtCLHVCQUFuQixFQUpHLEVBS0gsRUFBQyxRQUFPLEtBQVAsRUFBYywwQkFBZixFQUxHLENBQVAsRUFISixDQUhKO2FBREosQ0FESTs7OztXQWxCUztFQUFZOztBQUFaLElBcUNiLGVBQWE7QUFDbkIsWUFBTyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDUCxTQUFLLE1BQU0sU0FBTixDQUFnQixNQUFoQjs7O0FBdkNjLElBMENiOzs7Ozs7Ozs7OztpQ0FDRTtnQkFDSSxNQUFLLEtBQUssS0FBTCxDQUFYLE1BREU7O0FBRVAsbUJBQVEsb0JBQUMsS0FBSyxJQUFOLElBQVcsYUFBZ0IsT0FBTyxJQUFJLEtBQUosR0FBVSxFQUFWLGFBQW9CLElBQUksU0FBSixFQUFpQixlQUFlLElBQUksT0FBSixFQUF0RixDQUFSLENBRk87Ozs7O0VBRGlCOztrQkExQ04iLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtSZWFjdCwgQ29tcG9uZW50LCBVSTp7Q29tbWFuZEJhciwgTGlzdCwgRW1wdHl9fT1yZXF1aXJlKCcuJyksXG4gICAgQXBwPXJlcXVpcmUoJy4vZGIvYXBwJyksXG4gICAge0ZvbnRJY29ufT1yZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG5pbXBvcnQgSHR0cCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9odHRwXCJcbmltcG9ydCBFcnJvciBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FsZXJ0L2Vycm9yXCJcbmltcG9ydCBXYXJuaW5nIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvd2FybmluZ1wiXG5pbXBvcnQgQWxsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Fzc2lnbm1lbnRcIlxuXG5jb25zdCBsZXZlbHM9e1xuICAgIFx0d2FybmluZzoyLFxuICAgIFx0ZXJyb3I6MyxcbiAgICBcdGh0dHA6OSxcbiAgICBcdGFsbDpudWxsLFxuICAgICAgICBcIjlcIjpcImh0dHBcIixcbiAgICAgICAgXCIzXCI6XCJlcnJvclwiLFxuICAgICAgICBcIjJcIjpcIndhcm5pbmdcIixcbiAgICAgICAgXCIxXCI6XCJpbmZvXCJcbiAgICB9XG5jb25zdCBJY29ucz17SHR0cCwgRXJyb3IsIFdhcm5pbmcsIEFsbH1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtsb2dzOm51bGx9XG4gICAgXG5cdGdldERhdGEobGV2ZWwpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2xvZ3M6QXBwLmdldExvZyhsZXZlbHNbbGV2ZWxdKX0pXG5cdH1cblx0XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLmxldmVsKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCl7XG5cdFx0aWYodGhpcy5jb250ZXh0LmFwcCE9bmV4dENvbnRleHQuYXBwKVxuXHRcdFx0dGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLmxldmVsKVxuXHRcdGVsc2UgaWYodGhpcy5wcm9wcy5wYXJhbXMubGV2ZWwhPW5leHRQcm9wcy5wYXJhbXMubGV2bGUpXG5cdFx0XHR0aGlzLmdldERhdGEobmV4dFByb3BzLnBhcmFtcy5sZXZlbClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8TGlzdCBtb2RlbD17dGhpcy5zdGF0ZS5sb2dzfSB0ZW1wbGF0ZT17dGhpcy5jb25zdHJ1Y3Rvci5BTG9nfS8+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2xldmVsPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGxvZy8ke2xldmVsfWApfVxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXt0aGlzLnByb3BzLnBhcmFtcy5sZXZlbH1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcblx0XHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcImh0dHBcIiwgaWNvbjpIdHRwfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJlcnJvclwiLCBpY29uOkVycm9yfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJ3YXJuaW5nXCIsIGljb246V2FybmluZ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiYWxsXCIsIGljb246QWxsfVxuICAgICAgICAgICAgICAgICAgICBdfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXHRcdGFwcDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cdFxuXHRzdGF0aWMgQUxvZz1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRyZW5kZXIoKXtcblx0XHRcdHZhciB7bW9kZWw6bG9nfT10aGlzLnByb3BzXG5cdFx0XHRyZXR1cm4gKDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e2Ake2xldmVsc1tsb2cubGV2ZWwrXCJcIl19IG9uICR7bG9nLmNyZWF0ZWRBdH1gfSBzZWNvbmRhcnlUZXh0PXtsb2cubWVzc2FnZX0vPilcblx0XHR9XG5cdH1cbn1cblxuXG4iXX0=