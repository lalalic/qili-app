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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Logo).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9sb2dvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs2QkFDVjttQkFDeUIsS0FBSyxLQUFMLENBRHpCO29DQUNBLFVBREE7VUFDQSw2Q0FBVSxzQkFEVjs7VUFDaUIseURBRGpCOzsyQkFFMkMsT0FBTyxNQUFQLENBQWM7QUFDdEQsY0FBSyxNQUFMO0FBQ0EsZ0JBQU8sa0JBQVA7QUFDQSxxQkFBWSxDQUFaO0FBQ0Esa0JBQVMsQ0FBVDtPQUp3QyxFQUsxQyxTQUwwQyxFQUYzQzs7aURBRUEsV0FGQTtVQUVBLG1EQUFXLG9DQUZYOztVQUUyQiwwRUFGM0I7O0FBU1AsYUFDRTs7UUFBYSxNQUFiO1FBQ0U7O1VBQU8sY0FBUDtVQUNMLHdDQUFNLEdBQUUsd2pCQUFGLEVBQU4sQ0FESztTQURGO09BREYsQ0FUTzs7OztTQURVIiwiZmlsZSI6ImxvZ28uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1N2Z0ljb259IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nbyBleHRlbmRzIENvbXBvbmVudHtcclxuICByZW5kZXIoKSB7XHJcbiAgICAgIHZhciB7ZHJhd1N0eWxlPXt9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuICAgICAgdmFyIHt0ZXh0U3Ryb2tlPVwibGlnaHRncmF5XCIsIC4uLm90aGVyRHJhd1N0eWxlfT1PYmplY3QuYXNzaWduKHtcclxuICAgICAgICAgICAgICBmaWxsOlwibm9uZVwiLFxyXG4gICAgICAgICAgICAgIHN0cm9rZTpcInJnYigyMDAsMjAwLDIwMClcIixcclxuICAgICAgICAgICAgICBzdHJva2VXaWR0aDoxLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOjVcclxuICAgICAgICAgIH0sZHJhd1N0eWxlKVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxTdmdJY29uIHsuLi5vdGhlcnN9PlxyXG4gICAgICAgIDxnIHsuLi5vdGhlckRyYXdTdHlsZX0+XHJcblx0XHRcdDxwYXRoIGQ9XCJNNiAxOGMwIC41NS40NSAxIDEgMWgxdjMuNWMwIC44My42NyAxLjUgMS41IDEuNXMxLjUtLjY3IDEuNS0xLjVWMTloMnYzLjVjMCAuODMuNjcgMS41IDEuNSAxLjVzMS41LS42NyAxLjUtMS41VjE5aDFjLjU1IDAgMS0uNDUgMS0xVjhINnYxMHpNMy41IDhDMi42NyA4IDIgOC42NyAyIDkuNXY3YzAgLjgzLjY3IDEuNSAxLjUgMS41UzUgMTcuMzMgNSAxNi41di03QzUgOC42NyA0LjMzIDggMy41IDh6bTE3IDBjLS44MyAwLTEuNS42Ny0xLjUgMS41djdjMCAuODMuNjcgMS41IDEuNSAxLjVzMS41LS42NyAxLjUtMS41di03YzAtLjgzLS42Ny0xLjUtMS41LTEuNXptLTQuOTctNS44NGwxLjMtMS4zYy4yLS4yLjItLjUxIDAtLjcxLS4yLS4yLS41MS0uMi0uNzEgMGwtMS40OCAxLjQ4QzEzLjg1IDEuMjMgMTIuOTUgMSAxMiAxYy0uOTYgMC0xLjg2LjIzLTIuNjYuNjNMNy44NS4xNWMtLjItLjItLjUxLS4yLS43MSAwLS4yLjItLjIuNTEgMCAuNzFsMS4zMSAxLjMxQzYuOTcgMy4yNiA2IDUuMDEgNiA3aDEyYzAtMS45OS0uOTctMy43NS0yLjQ3LTQuODR6TTEwIDVIOVY0aDF2MXptNSAwaC0xVjRoMXYxelwiLz5cclxuICAgICAgICA8L2c+XHJcbiAgICA8L1N2Z0ljb24+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiJdfQ==