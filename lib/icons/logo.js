'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function (_Component) {
  (0, _inherits3.default)(Logo, _Component);

  function Logo() {
    (0, _classCallCheck3.default)(this, Logo);
    return (0, _possibleConstructorReturn3.default)(this, (Logo.__proto__ || (0, _getPrototypeOf2.default)(Logo)).apply(this, arguments));
  }

  (0, _createClass3.default)(Logo, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var _props$drawStyle = _props.drawStyle;
      var drawStyle = _props$drawStyle === undefined ? {} : _props$drawStyle;
      var others = (0, _objectWithoutProperties3.default)(_props, ['drawStyle']);

      var _Object$assign = (0, _assign2.default)({
        fill: "none",
        stroke: "rgb(200,200,200)",
        strokeWidth: 1,
        fontSize: 5
      }, drawStyle);

      var _Object$assign$textSt = _Object$assign.textStroke;
      var textStroke = _Object$assign$textSt === undefined ? "lightgray" : _Object$assign$textSt;
      var otherDrawStyle = (0, _objectWithoutProperties3.default)(_Object$assign, ['textStroke']);


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9sb2dvLmpzIl0sIm5hbWVzIjpbIkxvZ28iLCJwcm9wcyIsImRyYXdTdHlsZSIsIm90aGVycyIsImZpbGwiLCJzdHJva2UiLCJzdHJva2VXaWR0aCIsImZvbnRTaXplIiwidGV4dFN0cm9rZSIsIm90aGVyRHJhd1N0eWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs2QkFDVjtBQUFBLG1CQUN5QixLQUFLQyxLQUQ5QjtBQUFBLG9DQUNBQyxTQURBO0FBQUEsVUFDQUEsU0FEQSxvQ0FDVSxFQURWO0FBQUEsVUFDaUJDLE1BRGpCOztBQUFBLDJCQUUyQyxzQkFBYztBQUN0REMsY0FBSyxNQURpRDtBQUV0REMsZ0JBQU8sa0JBRitDO0FBR3REQyxxQkFBWSxDQUgwQztBQUl0REMsa0JBQVM7QUFKNkMsT0FBZCxFQUsxQ0wsU0FMMEMsQ0FGM0M7O0FBQUEsaURBRUFNLFVBRkE7QUFBQSxVQUVBQSxVQUZBLHlDQUVXLFdBRlg7QUFBQSxVQUUyQkMsY0FGM0I7OztBQVNQLGFBQ0U7QUFBQTtBQUFhTixjQUFiO0FBQ0U7QUFBQTtBQUFPTSx3QkFBUDtBQUNMLGtEQUFNLEdBQUUsd2pCQUFSO0FBREs7QUFERixPQURGO0FBT0Q7Ozs7O2tCQWpCa0JULEkiLCJmaWxlIjoibG9nby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7U3ZnSWNvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dvIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gIHJlbmRlcigpIHtcclxuICAgICAgdmFyIHtkcmF3U3R5bGU9e30sIC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG4gICAgICB2YXIge3RleHRTdHJva2U9XCJsaWdodGdyYXlcIiwgLi4ub3RoZXJEcmF3U3R5bGV9PU9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgICAgICAgIGZpbGw6XCJub25lXCIsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlOlwicmdiKDIwMCwyMDAsMjAwKVwiLFxyXG4gICAgICAgICAgICAgIHN0cm9rZVdpZHRoOjEsXHJcbiAgICAgICAgICAgICAgZm9udFNpemU6NVxyXG4gICAgICAgICAgfSxkcmF3U3R5bGUpXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFN2Z0ljb24gey4uLm90aGVyc30+XHJcbiAgICAgICAgPGcgey4uLm90aGVyRHJhd1N0eWxlfT5cclxuXHRcdFx0PHBhdGggZD1cIk02IDE4YzAgLjU1LjQ1IDEgMSAxaDF2My41YzAgLjgzLjY3IDEuNSAxLjUgMS41czEuNS0uNjcgMS41LTEuNVYxOWgydjMuNWMwIC44My42NyAxLjUgMS41IDEuNXMxLjUtLjY3IDEuNS0xLjVWMTloMWMuNTUgMCAxLS40NSAxLTFWOEg2djEwek0zLjUgOEMyLjY3IDggMiA4LjY3IDIgOS41djdjMCAuODMuNjcgMS41IDEuNSAxLjVTNSAxNy4zMyA1IDE2LjV2LTdDNSA4LjY3IDQuMzMgOCAzLjUgOHptMTcgMGMtLjgzIDAtMS41LjY3LTEuNSAxLjV2N2MwIC44My42NyAxLjUgMS41IDEuNXMxLjUtLjY3IDEuNS0xLjV2LTdjMC0uODMtLjY3LTEuNS0xLjUtMS41em0tNC45Ny01Ljg0bDEuMy0xLjNjLjItLjIuMi0uNTEgMC0uNzEtLjItLjItLjUxLS4yLS43MSAwbC0xLjQ4IDEuNDhDMTMuODUgMS4yMyAxMi45NSAxIDEyIDFjLS45NiAwLTEuODYuMjMtMi42Ni42M0w3Ljg1LjE1Yy0uMi0uMi0uNTEtLjItLjcxIDAtLjIuMi0uMi41MSAwIC43MWwxLjMxIDEuMzFDNi45NyAzLjI2IDYgNS4wMSA2IDdoMTJjMC0xLjk5LS45Ny0zLjc1LTIuNDctNC44NHpNMTAgNUg5VjRoMXYxem01IDBoLTFWNGgxdjF6XCIvPlxyXG4gICAgICAgIDwvZz5cclxuICAgIDwvU3ZnSWNvbj5cclxuICAgIClcclxuICB9XHJcbn1cclxuIl19