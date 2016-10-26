"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _http = require("material-ui/svg-icons/action/http");

var _http2 = _interopRequireDefault(_http);

var _error = require("material-ui/svg-icons/alert/error");

var _error2 = _interopRequireDefault(_error);

var _warning = require("material-ui/svg-icons/alert/warning");

var _warning2 = _interopRequireDefault(_warning);

var _assignment = require("material-ui/svg-icons/action/assignment");

var _assignment2 = _interopRequireDefault(_assignment);

var _ = require(".");

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _.UI.CommandBar;
var List = _.UI.List;
var Empty = _.UI.Empty;

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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Log);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Log.__proto__ || Object.getPrototypeOf(Log)).call.apply(_ref, [this].concat(args))), _this), _this.state = { logs: null }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Log, [{
        key: "getData",
        value: function getData(level) {
            this.setState({ logs: _app2.default.getLog(levels[level]) });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.getData(this.props.params.level);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps, nextContext) {
            if (this.context.app != nextContext.app) this.getData(this.props.params.level);else if (this.props.params.level != nextProps.params.levle) this.getData(nextProps.params.level);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(List, { model: this.state.logs, template: this.constructor.ALog }),
                _react2.default.createElement(CommandBar, { className: "footbar",
                    onSelect: function onSelect(level) {
                        return _this2.context.router.push("log/" + level);
                    },
                    primary: this.props.params.level,
                    items: [{ action: "Back" }, { action: "http", icon: _http2.default }, { action: "error", icon: _error2.default }, { action: "warning", icon: _warning2.default }, { action: "all", icon: _assignment2.default }] })
            );
        }
    }]);

    return Log;
}(_react.Component);

Log.contextTypes = {
    router: _react2.default.PropTypes.object,
    app: _react2.default.PropTypes.object
};

Log.ALog = function (_Component2) {
    _inherits(_class, _Component2);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "render",
        value: function render() {
            var log = this.props.model;

            return _react2.default.createElement(List.Item, { primaryText: levels[log.level + ""] + " on " + log.createdAt, secondaryText: log.message });
        }
    }]);

    return _class;
}(_react.Component);

exports.default = Log;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2cuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkxpc3QiLCJFbXB0eSIsImxldmVscyIsIndhcm5pbmciLCJlcnJvciIsImh0dHAiLCJhbGwiLCJJY29ucyIsIkh0dHAiLCJFcnJvciIsIldhcm5pbmciLCJBbGwiLCJMb2ciLCJzdGF0ZSIsImxvZ3MiLCJsZXZlbCIsInNldFN0YXRlIiwiZ2V0TG9nIiwiZ2V0RGF0YSIsInByb3BzIiwicGFyYW1zIiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJjb250ZXh0IiwiYXBwIiwibGV2bGUiLCJjb25zdHJ1Y3RvciIsIkFMb2ciLCJyb3V0ZXIiLCJwdXNoIiwiYWN0aW9uIiwiaWNvbiIsImNvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImxvZyIsIm1vZGVsIiwiY3JlYXRlZEF0IiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVPQSxVLFFBQUFBLFU7SUFBWUMsSSxRQUFBQSxJO0lBQU1DLEssUUFBQUEsSzs7QUFDekIsSUFBTUMsU0FBTztBQUNSQyxhQUFRLENBREE7QUFFUkMsV0FBTSxDQUZFO0FBR1JDLFVBQUssQ0FIRztBQUlSQyxTQUFJLElBSkk7QUFLTCxTQUFJLE1BTEM7QUFNTCxTQUFJLE9BTkM7QUFPTCxTQUFJLFNBUEM7QUFRTCxTQUFJO0FBUkMsQ0FBYjtBQVVBLElBQU1DLFFBQU0sRUFBQ0Msb0JBQUQsRUFBT0Msc0JBQVAsRUFBY0MsMEJBQWQsRUFBdUJDLHlCQUF2QixFQUFaOztJQUVxQkMsRzs7Ozs7Ozs7Ozs7Ozs7b0xBQ2pCQyxLLEdBQU0sRUFBQ0MsTUFBSyxJQUFOLEU7Ozs7O2dDQUVEQyxLLEVBQU07QUFDYixpQkFBS0MsUUFBTCxDQUFjLEVBQUNGLE1BQUssY0FBSUcsTUFBSixDQUFXZixPQUFPYSxLQUFQLENBQVgsQ0FBTixFQUFkO0FBQ0E7Ozs0Q0FFcUI7QUFDZixpQkFBS0csT0FBTCxDQUFhLEtBQUtDLEtBQUwsQ0FBV0MsTUFBWCxDQUFrQkwsS0FBL0I7QUFDSDs7O2tEQUV5Qk0sUyxFQUFXQyxXLEVBQVk7QUFDbkQsZ0JBQUcsS0FBS0MsT0FBTCxDQUFhQyxHQUFiLElBQWtCRixZQUFZRSxHQUFqQyxFQUNDLEtBQUtOLE9BQUwsQ0FBYSxLQUFLQyxLQUFMLENBQVdDLE1BQVgsQ0FBa0JMLEtBQS9CLEVBREQsS0FFSyxJQUFHLEtBQUtJLEtBQUwsQ0FBV0MsTUFBWCxDQUFrQkwsS0FBbEIsSUFBeUJNLFVBQVVELE1BQVYsQ0FBaUJLLEtBQTdDLEVBQ0osS0FBS1AsT0FBTCxDQUFhRyxVQUFVRCxNQUFWLENBQWlCTCxLQUE5QjtBQUNFOzs7aUNBRU87QUFBQTs7QUFDSixtQkFDSTtBQUFBO0FBQUE7QUFDSSw4Q0FBQyxJQUFELElBQU0sT0FBTyxLQUFLRixLQUFMLENBQVdDLElBQXhCLEVBQThCLFVBQVUsS0FBS1ksV0FBTCxDQUFpQkMsSUFBekQsR0FESjtBQUdJLDhDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCO0FBQ0ksOEJBQVU7QUFBQSwrQkFBTyxPQUFLSixPQUFMLENBQWFLLE1BQWIsQ0FBb0JDLElBQXBCLFVBQWdDZCxLQUFoQyxDQUFQO0FBQUEscUJBRGQ7QUFFSSw2QkFBUyxLQUFLSSxLQUFMLENBQVdDLE1BQVgsQ0FBa0JMLEtBRi9CO0FBR0ksMkJBQU8sQ0FDckIsRUFBQ2UsUUFBTyxNQUFSLEVBRHFCLEVBRUgsRUFBQ0EsUUFBTyxNQUFSLEVBQWdCQyxvQkFBaEIsRUFGRyxFQUdILEVBQUNELFFBQU8sT0FBUixFQUFpQkMscUJBQWpCLEVBSEcsRUFJSCxFQUFDRCxRQUFPLFNBQVIsRUFBbUJDLHVCQUFuQixFQUpHLEVBS0gsRUFBQ0QsUUFBTyxLQUFSLEVBQWVDLDBCQUFmLEVBTEcsQ0FIWDtBQUhKLGFBREo7QUFnQkg7Ozs7OztBQW5DZ0JuQixHLENBcUNib0IsWSxHQUFhO0FBQ25CSixZQUFPLGdCQUFNSyxTQUFOLENBQWdCQyxNQURKO0FBRW5CVixTQUFLLGdCQUFNUyxTQUFOLENBQWdCQztBQUZGLEM7O0FBckNBdEIsRyxDQTBDYmUsSTs7Ozs7Ozs7Ozs7aUNBQ0U7QUFBQSxnQkFDSVEsR0FESixHQUNTLEtBQUtoQixLQURkLENBQ0ZpQixLQURFOztBQUVQLG1CQUFRLDhCQUFDLElBQUQsQ0FBTSxJQUFOLElBQVcsYUFBZ0JsQyxPQUFPaUMsSUFBSXBCLEtBQUosR0FBVSxFQUFqQixDQUFoQixZQUEyQ29CLElBQUlFLFNBQTFELEVBQXVFLGVBQWVGLElBQUlHLE9BQTFGLEdBQVI7QUFDQTs7Ozs7O2tCQTlDa0IxQixHIiwiZmlsZSI6ImxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtGb250SWNvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBIdHRwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2h0dHBcIlxuaW1wb3J0IEVycm9yIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvZXJyb3JcIlxuaW1wb3J0IFdhcm5pbmcgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hbGVydC93YXJuaW5nXCJcbmltcG9ydCBBbGwgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYXNzaWdubWVudFwiXG5cbmltcG9ydCB7VUl9IGZyb20gXCIuXCJcbmltcG9ydCBBcHAgZnJvbSAnLi9kYi9hcHAnXG5cbmNvbnN0IHtDb21tYW5kQmFyLCBMaXN0LCBFbXB0eX09VUlcbmNvbnN0IGxldmVscz17XG4gICAgXHR3YXJuaW5nOjIsXG4gICAgXHRlcnJvcjozLFxuICAgIFx0aHR0cDo5LFxuICAgIFx0YWxsOm51bGwsXG4gICAgICAgIFwiOVwiOlwiaHR0cFwiLFxuICAgICAgICBcIjNcIjpcImVycm9yXCIsXG4gICAgICAgIFwiMlwiOlwid2FybmluZ1wiLFxuICAgICAgICBcIjFcIjpcImluZm9cIlxuICAgIH1cbmNvbnN0IEljb25zPXtIdHRwLCBFcnJvciwgV2FybmluZywgQWxsfVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2cgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e2xvZ3M6bnVsbH1cblxuXHRnZXREYXRhKGxldmVsKXtcblx0XHR0aGlzLnNldFN0YXRlKHtsb2dzOkFwcC5nZXRMb2cobGV2ZWxzW2xldmVsXSl9KVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMubGV2ZWwpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KXtcblx0XHRpZih0aGlzLmNvbnRleHQuYXBwIT1uZXh0Q29udGV4dC5hcHApXG5cdFx0XHR0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMubGV2ZWwpXG5cdFx0ZWxzZSBpZih0aGlzLnByb3BzLnBhcmFtcy5sZXZlbCE9bmV4dFByb3BzLnBhcmFtcy5sZXZsZSlcblx0XHRcdHRoaXMuZ2V0RGF0YShuZXh0UHJvcHMucGFyYW1zLmxldmVsKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxMaXN0IG1vZGVsPXt0aGlzLnN0YXRlLmxvZ3N9IHRlbXBsYXRlPXt0aGlzLmNvbnN0cnVjdG9yLkFMb2d9Lz5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17bGV2ZWw9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgbG9nLyR7bGV2ZWx9YCl9XG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e3RoaXMucHJvcHMucGFyYW1zLmxldmVsfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiaHR0cFwiLCBpY29uOkh0dHB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcImVycm9yXCIsIGljb246RXJyb3J9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIndhcm5pbmdcIiwgaWNvbjpXYXJuaW5nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJhbGxcIiwgaWNvbjpBbGx9XG4gICAgICAgICAgICAgICAgICAgIF19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXHRcdGFwcDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cblx0c3RhdGljIEFMb2c9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0cmVuZGVyKCl7XG5cdFx0XHR2YXIge21vZGVsOmxvZ309dGhpcy5wcm9wc1xuXHRcdFx0cmV0dXJuICg8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXtgJHtsZXZlbHNbbG9nLmxldmVsK1wiXCJdfSBvbiAke2xvZy5jcmVhdGVkQXR9YH0gc2Vjb25kYXJ5VGV4dD17bG9nLm1lc3NhZ2V9Lz4pXG5cdFx0fVxuXHR9XG59XG4iXX0=