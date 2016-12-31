'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Messager = function (_Component) {
    (0, _inherits3.default)(Messager, _Component);

    function Messager() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Messager);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Messager.__proto__ || (0, _getPrototypeOf2.default)(Messager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            message: "default",
            level: 'Info',
            open: !!_this.props.open || false
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Messager, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var className = _props.className;
            var autoHideDuration = _props.autoHideDuration;
            var others = (0, _objectWithoutProperties3.default)(_props, ['className', 'autoHideDuration']);
            var open = this.state.open;

            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({ className: 'snackbar ' + className + ' ' + (open ? "" : "hide") }, others),
                this.state.message
            );
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            var open = this.state.open;

            if (open) {
                this.__timer = setTimeout(function (a) {
                    _this2.setState({ open: false });
                    _this2.__timer && clearTimeout(_this2.__timer);
                    delete _this2.__timer;
                }, this.props.autoHideDuration);
            }
        }
    }, {
        key: 'show',
        value: function show(message) {
            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Info";

            if (!message) return;
            this.__timer && clearTimeout(this.__timer);
            delete this.__timer;
            this.setState({ message: message, level: level, open: true });
        }
    }]);
    return Messager;
}(_react.Component);

exports.default = Messager;


Messager.defaultProps = { autoHideDuration: 2000 };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21lc3NhZ2VyLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2VyIiwic3RhdGUiLCJtZXNzYWdlIiwibGV2ZWwiLCJvcGVuIiwicHJvcHMiLCJjbGFzc05hbWUiLCJhdXRvSGlkZUR1cmF0aW9uIiwib3RoZXJzIiwiX190aW1lciIsInNldFRpbWVvdXQiLCJzZXRTdGF0ZSIsImNsZWFyVGltZW91dCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFLcUJBLFE7Ozs7Ozs7Ozs7Ozs7O29OQUNqQkMsSyxHQUFNO0FBQ0ZDLHFCQUFRLFNBRE47QUFFRkMsbUJBQU0sTUFGSjtBQUdGQyxrQkFBTSxDQUFDLENBQUMsTUFBS0MsS0FBTCxDQUFXRCxJQUFiLElBQXFCO0FBSHpCLFM7Ozs7O2lDQU1FO0FBQUEseUJBQ3lDLEtBQUtDLEtBRDlDO0FBQUEsZ0JBQ0NDLFNBREQsVUFDQ0EsU0FERDtBQUFBLGdCQUNZQyxnQkFEWixVQUNZQSxnQkFEWjtBQUFBLGdCQUNpQ0MsTUFEakM7QUFBQSxnQkFFQ0osSUFGRCxHQUVPLEtBQUtILEtBRlosQ0FFQ0csSUFGRDs7QUFHSixtQkFBTztBQUFBO0FBQUEseUNBQUsseUJBQXVCRSxTQUF2QixVQUFvQ0YsT0FBTyxFQUFQLEdBQVksTUFBaEQsQ0FBTCxJQUFtRUksTUFBbkU7QUFBNEUscUJBQUtQLEtBQUwsQ0FBV0M7QUFBdkYsYUFBUDtBQUNIOzs7NkNBRW1CO0FBQUE7O0FBQUEsZ0JBQ1hFLElBRFcsR0FDTCxLQUFLSCxLQURBLENBQ1hHLElBRFc7O0FBRWhCLGdCQUFHQSxJQUFILEVBQVE7QUFDSixxQkFBS0ssT0FBTCxHQUFhQyxXQUFXLGFBQUc7QUFDdkIsMkJBQUtDLFFBQUwsQ0FBYyxFQUFDUCxNQUFLLEtBQU4sRUFBZDtBQUNBLDJCQUFLSyxPQUFMLElBQWdCRyxhQUFhLE9BQUtILE9BQWxCLENBQWhCO0FBQ0EsMkJBQU8sT0FBS0EsT0FBWjtBQUNILGlCQUpZLEVBSVgsS0FBS0osS0FBTCxDQUFXRSxnQkFKQSxDQUFiO0FBS0g7QUFDSjs7OzZCQUVJTCxPLEVBQXFCO0FBQUEsZ0JBQWJDLEtBQWEsdUVBQVAsTUFBTzs7QUFDdEIsZ0JBQUcsQ0FBQ0QsT0FBSixFQUFhO0FBQ2IsaUJBQUtPLE9BQUwsSUFBZ0JHLGFBQWEsS0FBS0gsT0FBbEIsQ0FBaEI7QUFDQSxtQkFBTyxLQUFLQSxPQUFaO0FBQ0EsaUJBQUtFLFFBQUwsQ0FBYyxFQUFDVCxnQkFBRCxFQUFTQyxZQUFULEVBQWdCQyxNQUFLLElBQXJCLEVBQWQ7QUFDSDs7Ozs7a0JBN0JnQkosUTs7O0FBZ0NyQkEsU0FBU2EsWUFBVCxHQUFzQixFQUFDTixrQkFBaUIsSUFBbEIsRUFBdEIiLCJmaWxlIjoibWVzc2FnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlciBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17XG4gICAgICAgIG1lc3NhZ2U6XCJkZWZhdWx0XCIsXG4gICAgICAgIGxldmVsOidJbmZvJyxcbiAgICAgICAgb3BlbjogISF0aGlzLnByb3BzLm9wZW4gfHwgZmFsc2VcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgbGV0IHtjbGFzc05hbWUsIGF1dG9IaWRlRHVyYXRpb24sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICBsZXQge29wZW59PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtgc25hY2tiYXIgJHtjbGFzc05hbWV9ICR7b3BlbiA/IFwiXCIgOiBcImhpZGVcIn1gfSB7Li4ub3RoZXJzfT57dGhpcy5zdGF0ZS5tZXNzYWdlfTwvZGl2PlxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuICAgICAgICB2YXIge29wZW59PXRoaXMuc3RhdGVcbiAgICAgICAgaWYob3Blbil7XG4gICAgICAgICAgICB0aGlzLl9fdGltZXI9c2V0VGltZW91dChhPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3BlbjpmYWxzZX0pXG4gICAgICAgICAgICAgICAgdGhpcy5fX3RpbWVyICYmIGNsZWFyVGltZW91dCh0aGlzLl9fdGltZXIpXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX190aW1lclxuICAgICAgICAgICAgfSx0aGlzLnByb3BzLmF1dG9IaWRlRHVyYXRpb24pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KG1lc3NhZ2UsbGV2ZWw9XCJJbmZvXCIpe1xuICAgICAgICBpZighbWVzc2FnZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9fdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRoaXMuX190aW1lcilcbiAgICAgICAgZGVsZXRlIHRoaXMuX190aW1lclxuICAgICAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlLGxldmVsLCBvcGVuOnRydWV9KVxuICAgIH1cbn1cblxuTWVzc2FnZXIuZGVmYXVsdFByb3BzPXthdXRvSGlkZUR1cmF0aW9uOjIwMDB9XG4iXX0=