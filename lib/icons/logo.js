'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logo = function (_Component) {
  _inherits(Logo, _Component);

  function Logo() {
    _classCallCheck(this, Logo);

    return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
  }

  _createClass(Logo, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var _props$drawStyle = _props.drawStyle;
      var drawStyle = _props$drawStyle === undefined ? {} : _props$drawStyle;

      var others = _objectWithoutProperties(_props, ['drawStyle']);

      var _Object$assign = Object.assign({
        fill: "none",
        stroke: "rgb(200,200,200)",
        strokeWidth: 1,
        fontSize: 5
      }, drawStyle);

      var _Object$assign$textSt = _Object$assign.textStroke;
      var textStroke = _Object$assign$textSt === undefined ? "lightgray" : _Object$assign$textSt;

      var otherDrawStyle = _objectWithoutProperties(_Object$assign, ['textStroke']);

      return _react2.default.createElement(
        _materialUi.SvgIcon,
        others,
        _react2.default.createElement(
          'g',
          otherDrawStyle,
          _react2.default.createElement('path', { d: 'M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z' })
        )
      );
    }
  }]);

  return Logo;
}(_react.Component);

exports.default = Logo;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9sb2dvLmpzIl0sIm5hbWVzIjpbIkxvZ28iLCJwcm9wcyIsImRyYXdTdHlsZSIsIm90aGVycyIsIk9iamVjdCIsImFzc2lnbiIsImZpbGwiLCJzdHJva2UiLCJzdHJva2VXaWR0aCIsImZvbnRTaXplIiwidGV4dFN0cm9rZSIsIm90aGVyRHJhd1N0eWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7NkJBQ1Y7QUFBQSxtQkFDeUIsS0FBS0MsS0FEOUI7QUFBQSxvQ0FDQUMsU0FEQTtBQUFBLFVBQ0FBLFNBREEsb0NBQ1UsRUFEVjs7QUFBQSxVQUNpQkMsTUFEakI7O0FBQUEsMkJBRTJDQyxPQUFPQyxNQUFQLENBQWM7QUFDdERDLGNBQUssTUFEaUQ7QUFFdERDLGdCQUFPLGtCQUYrQztBQUd0REMscUJBQVksQ0FIMEM7QUFJdERDLGtCQUFTO0FBSjZDLE9BQWQsRUFLMUNQLFNBTDBDLENBRjNDOztBQUFBLGlEQUVBUSxVQUZBO0FBQUEsVUFFQUEsVUFGQSx5Q0FFVyxXQUZYOztBQUFBLFVBRTJCQyxjQUYzQjs7QUFTUCxhQUNFO0FBQUE7QUFBYVIsY0FBYjtBQUNFO0FBQUE7QUFBT1Esd0JBQVA7QUFDTCxrREFBTSxHQUFFLHdqQkFBUjtBQURLO0FBREYsT0FERjtBQU9EOzs7Ozs7a0JBakJrQlgsSSIsImZpbGUiOiJsb2dvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHtTdmdJY29ufSBmcm9tICdtYXRlcmlhbC11aSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ28gZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgICB2YXIge2RyYXdTdHlsZT17fSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcbiAgICAgIHZhciB7dGV4dFN0cm9rZT1cImxpZ2h0Z3JheVwiLCAuLi5vdGhlckRyYXdTdHlsZX09T2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgICAgICAgZmlsbDpcIm5vbmVcIixcclxuICAgICAgICAgICAgICBzdHJva2U6XCJyZ2IoMjAwLDIwMCwyMDApXCIsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6MSxcclxuICAgICAgICAgICAgICBmb250U2l6ZTo1XHJcbiAgICAgICAgICB9LGRyYXdTdHlsZSlcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8U3ZnSWNvbiB7Li4ub3RoZXJzfT5cclxuICAgICAgICA8ZyB7Li4ub3RoZXJEcmF3U3R5bGV9PlxyXG5cdFx0XHQ8cGF0aCBkPVwiTTYgMThjMCAuNTUuNDUgMSAxIDFoMXYzLjVjMCAuODMuNjcgMS41IDEuNSAxLjVzMS41LS42NyAxLjUtMS41VjE5aDJ2My41YzAgLjgzLjY3IDEuNSAxLjUgMS41czEuNS0uNjcgMS41LTEuNVYxOWgxYy41NSAwIDEtLjQ1IDEtMVY4SDZ2MTB6TTMuNSA4QzIuNjcgOCAyIDguNjcgMiA5LjV2N2MwIC44My42NyAxLjUgMS41IDEuNVM1IDE3LjMzIDUgMTYuNXYtN0M1IDguNjcgNC4zMyA4IDMuNSA4em0xNyAwYy0uODMgMC0xLjUuNjctMS41IDEuNXY3YzAgLjgzLjY3IDEuNSAxLjUgMS41czEuNS0uNjcgMS41LTEuNXYtN2MwLS44My0uNjctMS41LTEuNS0xLjV6bS00Ljk3LTUuODRsMS4zLTEuM2MuMi0uMi4yLS41MSAwLS43MS0uMi0uMi0uNTEtLjItLjcxIDBsLTEuNDggMS40OEMxMy44NSAxLjIzIDEyLjk1IDEgMTIgMWMtLjk2IDAtMS44Ni4yMy0yLjY2LjYzTDcuODUuMTVjLS4yLS4yLS41MS0uMi0uNzEgMC0uMi4yLS4yLjUxIDAgLjcxbDEuMzEgMS4zMUM2Ljk3IDMuMjYgNiA1LjAxIDYgN2gxMmMwLTEuOTktLjk3LTMuNzUtMi40Ny00Ljg0ek0xMCA1SDlWNGgxdjF6bTUgMGgtMVY0aDF2MXpcIi8+XHJcbiAgICAgICAgPC9nPlxyXG4gICAgPC9TdmdJY29uPlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iXX0=