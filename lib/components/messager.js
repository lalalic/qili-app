'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _instance;

var Messager = function (_Component) {
    _inherits(Messager, _Component);

    function Messager(props) {
        _classCallCheck(this, Messager);

        var _this = _possibleConstructorReturn(this, (Messager.__proto__ || Object.getPrototypeOf(Messager)).call(this, props));

        _this.state = {
            message: "default",
            level: 'Info',
            open: !!_this.props.open || false
        };
        _instance = _instance || _this;
        return _this;
    }

    _createClass(Messager, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                autoHideDuration = _props.autoHideDuration,
                others = _objectWithoutProperties(_props, ['className', 'autoHideDuration']);

            var open = this.state.open;

            return _react2.default.createElement(
                'div',
                _extends({ className: 'snackbar ' + className + ' ' + (open ? "" : "hide") }, others),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21lc3NhZ2VyLmpzIl0sIm5hbWVzIjpbIl9pbnN0YW5jZSIsIk1lc3NhZ2VyIiwicHJvcHMiLCJzdGF0ZSIsIm1lc3NhZ2UiLCJsZXZlbCIsIm9wZW4iLCJjbGFzc05hbWUiLCJhdXRvSGlkZUR1cmF0aW9uIiwib3RoZXJzIiwiX190aW1lciIsInNldFRpbWVvdXQiLCJzZXRTdGF0ZSIsImNsZWFyVGltZW91dCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQUo7O0lBQ3FCQyxROzs7QUFDakIsc0JBQVlDLEtBQVosRUFBa0I7QUFBQTs7QUFBQSx3SEFDUkEsS0FEUTs7QUFFZCxjQUFLQyxLQUFMLEdBQVc7QUFDUEMscUJBQVEsU0FERDtBQUVQQyxtQkFBTSxNQUZDO0FBR1BDLGtCQUFNLENBQUMsQ0FBQyxNQUFLSixLQUFMLENBQVdJLElBQWIsSUFBcUI7QUFIcEIsU0FBWDtBQUtOTixvQkFBVUEsa0JBQVY7QUFQb0I7QUFRakI7Ozs7aUNBRU87QUFBQSx5QkFDeUMsS0FBS0UsS0FEOUM7QUFBQSxnQkFDQ0ssU0FERCxVQUNDQSxTQUREO0FBQUEsZ0JBQ1lDLGdCQURaLFVBQ1lBLGdCQURaO0FBQUEsZ0JBQ2lDQyxNQURqQzs7QUFBQSxnQkFFQ0gsSUFGRCxHQUVPLEtBQUtILEtBRlosQ0FFQ0csSUFGRDs7QUFHSixtQkFBTztBQUFBO0FBQUEsMkJBQUsseUJBQXVCQyxTQUF2QixVQUFvQ0QsT0FBTyxFQUFQLEdBQVksTUFBaEQsQ0FBTCxJQUFtRUcsTUFBbkU7QUFBNEUscUJBQUtOLEtBQUwsQ0FBV0M7QUFBdkYsYUFBUDtBQUNIOzs7NkNBRW1CO0FBQUE7O0FBQUEsZ0JBQ1hFLElBRFcsR0FDTCxLQUFLSCxLQURBLENBQ1hHLElBRFc7O0FBRWhCLGdCQUFHQSxJQUFILEVBQVE7QUFDSixxQkFBS0ksT0FBTCxHQUFhQyxXQUFXLGFBQUc7QUFDdkIsMkJBQUtDLFFBQUwsQ0FBYyxFQUFDTixNQUFLLEtBQU4sRUFBZDtBQUNBLDJCQUFLSSxPQUFMLElBQWdCRyxhQUFhLE9BQUtILE9BQWxCLENBQWhCO0FBQ0EsMkJBQU8sT0FBS0EsT0FBWjtBQUNILGlCQUpZLEVBSVgsS0FBS1IsS0FBTCxDQUFXTSxnQkFKQSxDQUFiO0FBS0g7QUFDSjs7OzZCQUVJSixPLEVBQXFCO0FBQUEsZ0JBQWJDLEtBQWEsdUVBQVAsTUFBTzs7QUFDdEIsZ0JBQUcsQ0FBQ0QsT0FBSixFQUFhO0FBQ2IsaUJBQUtNLE9BQUwsSUFBZ0JHLGFBQWEsS0FBS0gsT0FBbEIsQ0FBaEI7QUFDQSxtQkFBTyxLQUFLQSxPQUFaO0FBQ0EsaUJBQUtFLFFBQUwsQ0FBYyxFQUFDUixnQkFBRCxFQUFTQyxZQUFULEVBQWdCQyxNQUFLLElBQXJCLEVBQWQ7QUFDSDs7Ozs7O2tCQWpDZ0JMLFE7OztBQW9DckJBLFNBQVNhLFlBQVQsR0FBc0IsRUFBQ04sa0JBQWlCLElBQWxCLEVBQXRCIiwiZmlsZSI6Im1lc3NhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcblxudmFyIF9pbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZXIgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBtZXNzYWdlOlwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgbGV2ZWw6J0luZm8nLFxuICAgICAgICAgICAgb3BlbjogISF0aGlzLnByb3BzLm9wZW4gfHwgZmFsc2VcbiAgICAgICAgfVxuXHRcdF9pbnN0YW5jZT1faW5zdGFuY2V8fHRoaXNcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgbGV0IHtjbGFzc05hbWUsIGF1dG9IaWRlRHVyYXRpb24sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICBsZXQge29wZW59PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtgc25hY2tiYXIgJHtjbGFzc05hbWV9ICR7b3BlbiA/IFwiXCIgOiBcImhpZGVcIn1gfSB7Li4ub3RoZXJzfT57dGhpcy5zdGF0ZS5tZXNzYWdlfTwvZGl2PlxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuICAgICAgICB2YXIge29wZW59PXRoaXMuc3RhdGVcbiAgICAgICAgaWYob3Blbil7XG4gICAgICAgICAgICB0aGlzLl9fdGltZXI9c2V0VGltZW91dChhPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3BlbjpmYWxzZX0pXG4gICAgICAgICAgICAgICAgdGhpcy5fX3RpbWVyICYmIGNsZWFyVGltZW91dCh0aGlzLl9fdGltZXIpXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX190aW1lclxuICAgICAgICAgICAgfSx0aGlzLnByb3BzLmF1dG9IaWRlRHVyYXRpb24pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KG1lc3NhZ2UsbGV2ZWw9XCJJbmZvXCIpe1xuICAgICAgICBpZighbWVzc2FnZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9fdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRoaXMuX190aW1lcilcbiAgICAgICAgZGVsZXRlIHRoaXMuX190aW1lclxuICAgICAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlLGxldmVsLCBvcGVuOnRydWV9KVxuICAgIH1cbn1cblxuTWVzc2FnZXIuZGVmYXVsdFByb3BzPXthdXRvSGlkZUR1cmF0aW9uOjIwMDB9XG4iXX0=