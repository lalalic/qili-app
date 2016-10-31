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

var Messager = function (_Component) {
    _inherits(Messager, _Component);

    function Messager() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Messager);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Messager.__proto__ || Object.getPrototypeOf(Messager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            message: "default",
            level: 'Info',
            open: !!_this.props.open || false
        }, _temp), _possibleConstructorReturn(_this, _ret);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21lc3NhZ2VyLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2VyIiwic3RhdGUiLCJtZXNzYWdlIiwibGV2ZWwiLCJvcGVuIiwicHJvcHMiLCJjbGFzc05hbWUiLCJhdXRvSGlkZUR1cmF0aW9uIiwib3RoZXJzIiwiX190aW1lciIsInNldFRpbWVvdXQiLCJzZXRTdGF0ZSIsImNsZWFyVGltZW91dCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztJQUtxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxLLEdBQU07QUFDRkMscUJBQVEsU0FETjtBQUVGQyxtQkFBTSxNQUZKO0FBR0ZDLGtCQUFNLENBQUMsQ0FBQyxNQUFLQyxLQUFMLENBQVdELElBQWIsSUFBcUI7QUFIekIsUzs7Ozs7aUNBTUU7QUFBQSx5QkFDeUMsS0FBS0MsS0FEOUM7QUFBQSxnQkFDQ0MsU0FERCxVQUNDQSxTQUREO0FBQUEsZ0JBQ1lDLGdCQURaLFVBQ1lBLGdCQURaO0FBQUEsZ0JBQ2lDQyxNQURqQzs7QUFBQSxnQkFFQ0osSUFGRCxHQUVPLEtBQUtILEtBRlosQ0FFQ0csSUFGRDs7QUFHSixtQkFBTztBQUFBO0FBQUEsMkJBQUsseUJBQXVCRSxTQUF2QixVQUFvQ0YsT0FBTyxFQUFQLEdBQVksTUFBaEQsQ0FBTCxJQUFtRUksTUFBbkU7QUFBNEUscUJBQUtQLEtBQUwsQ0FBV0M7QUFBdkYsYUFBUDtBQUNIOzs7NkNBRW1CO0FBQUE7O0FBQUEsZ0JBQ1hFLElBRFcsR0FDTCxLQUFLSCxLQURBLENBQ1hHLElBRFc7O0FBRWhCLGdCQUFHQSxJQUFILEVBQVE7QUFDSixxQkFBS0ssT0FBTCxHQUFhQyxXQUFXLGFBQUc7QUFDdkIsMkJBQUtDLFFBQUwsQ0FBYyxFQUFDUCxNQUFLLEtBQU4sRUFBZDtBQUNBLDJCQUFLSyxPQUFMLElBQWdCRyxhQUFhLE9BQUtILE9BQWxCLENBQWhCO0FBQ0EsMkJBQU8sT0FBS0EsT0FBWjtBQUNILGlCQUpZLEVBSVgsS0FBS0osS0FBTCxDQUFXRSxnQkFKQSxDQUFiO0FBS0g7QUFDSjs7OzZCQUVJTCxPLEVBQXFCO0FBQUEsZ0JBQWJDLEtBQWEsdUVBQVAsTUFBTzs7QUFDdEIsZ0JBQUcsQ0FBQ0QsT0FBSixFQUFhO0FBQ2IsaUJBQUtPLE9BQUwsSUFBZ0JHLGFBQWEsS0FBS0gsT0FBbEIsQ0FBaEI7QUFDQSxtQkFBTyxLQUFLQSxPQUFaO0FBQ0EsaUJBQUtFLFFBQUwsQ0FBYyxFQUFDVCxnQkFBRCxFQUFTQyxZQUFULEVBQWdCQyxNQUFLLElBQXJCLEVBQWQ7QUFDSDs7Ozs7O2tCQTdCZ0JKLFE7OztBQWdDckJBLFNBQVNhLFlBQVQsR0FBc0IsRUFBQ04sa0JBQWlCLElBQWxCLEVBQXRCIiwiZmlsZSI6Im1lc3NhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZXIgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e1xuICAgICAgICBtZXNzYWdlOlwiZGVmYXVsdFwiLFxuICAgICAgICBsZXZlbDonSW5mbycsXG4gICAgICAgIG9wZW46ICEhdGhpcy5wcm9wcy5vcGVuIHx8IGZhbHNlXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7Y2xhc3NOYW1lLCBhdXRvSGlkZUR1cmF0aW9uLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IHtvcGVufT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17YHNuYWNrYmFyICR7Y2xhc3NOYW1lfSAke29wZW4gPyBcIlwiIDogXCJoaWRlXCJ9YH0gey4uLm90aGVyc30+e3RoaXMuc3RhdGUubWVzc2FnZX08L2Rpdj5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKXtcbiAgICAgICAgdmFyIHtvcGVufT10aGlzLnN0YXRlXG4gICAgICAgIGlmKG9wZW4pe1xuICAgICAgICAgICAgdGhpcy5fX3RpbWVyPXNldFRpbWVvdXQoYT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW46ZmFsc2V9KVxuICAgICAgICAgICAgICAgIHRoaXMuX190aW1lciAmJiBjbGVhclRpbWVvdXQodGhpcy5fX3RpbWVyKVxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9fdGltZXJcbiAgICAgICAgICAgIH0sdGhpcy5wcm9wcy5hdXRvSGlkZUR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdyhtZXNzYWdlLGxldmVsPVwiSW5mb1wiKXtcbiAgICAgICAgaWYoIW1lc3NhZ2UpIHJldHVybjtcbiAgICAgICAgdGhpcy5fX3RpbWVyICYmIGNsZWFyVGltZW91dCh0aGlzLl9fdGltZXIpXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9fdGltZXJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZSxsZXZlbCwgb3Blbjp0cnVlfSlcbiAgICB9XG59XG5cbk1lc3NhZ2VyLmRlZmF1bHRQcm9wcz17YXV0b0hpZGVEdXJhdGlvbjoyMDAwfVxuIl19