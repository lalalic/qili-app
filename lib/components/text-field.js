"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextFieldx = function (_Component) {
    (0, _inherits3.default)(TextFieldx, _Component);

    function TextFieldx(props) {
        (0, _classCallCheck3.default)(this, TextFieldx);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TextFieldx.__proto__ || (0, _getPrototypeOf2.default)(TextFieldx)).call(this, props));

        _this.state = {
            value: _this.props.value
        };
        return _this;
    }

    (0, _createClass3.default)(TextFieldx, [{
        key: "getValue",
        value: function getValue() {
            return this.refs.main.getValue();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(_materialUi.TextField, (0, _extends3.default)({ ref: "main" }, this.props, { value: this.state.value }));
        }
    }, {
        key: "value",
        set: function set(value) {
            this.setState({ value: value });
        }
    }, {
        key: "errorText",
        set: function set(errorText) {
            this.refs.main.setState({ errorText: errorText });
        }
    }]);
    return TextFieldx;
}(_react.Component);

exports.default = TextFieldx;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3RleHQtZmllbGQuanMiXSwibmFtZXMiOlsiVGV4dEZpZWxkeCIsInByb3BzIiwic3RhdGUiLCJ2YWx1ZSIsInJlZnMiLCJtYWluIiwiZ2V0VmFsdWUiLCJzZXRTdGF0ZSIsImVycm9yVGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztJQUVxQkEsVTs7O0FBQ2pCLHdCQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsa0pBQ1JBLEtBRFE7O0FBRWQsY0FBS0MsS0FBTCxHQUFXO0FBQ1BDLG1CQUFNLE1BQUtGLEtBQUwsQ0FBV0U7QUFEVixTQUFYO0FBRmM7QUFLakI7Ozs7bUNBVVM7QUFDTixtQkFBTyxLQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZUMsUUFBZixFQUFQO0FBQ0g7OztpQ0FFTztBQUNKLG1CQUFPLDhFQUFXLEtBQUksTUFBZixJQUEwQixLQUFLTCxLQUEvQixJQUFzQyxPQUFPLEtBQUtDLEtBQUwsQ0FBV0MsS0FBeEQsSUFBUDtBQUNIOzs7MEJBZFNBLEssRUFBTTtBQUNaLGlCQUFLSSxRQUFMLENBQWMsRUFBQ0osWUFBRCxFQUFkO0FBQ0g7OzswQkFFYUssUyxFQUFVO0FBQ3BCLGlCQUFLSixJQUFMLENBQVVDLElBQVYsQ0FBZUUsUUFBZixDQUF3QixFQUFDQyxvQkFBRCxFQUF4QjtBQUNIOzs7OztrQkFkZ0JSLFUiLCJmaWxlIjoidGV4dC1maWVsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0RmllbGR4IGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e1xuICAgICAgICAgICAgdmFsdWU6dGhpcy5wcm9wcy52YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWV9KVxuICAgIH1cblxuICAgIHNldCBlcnJvclRleHQoZXJyb3JUZXh0KXtcbiAgICAgICAgdGhpcy5yZWZzLm1haW4uc2V0U3RhdGUoe2Vycm9yVGV4dH0pXG4gICAgfVxuXG4gICAgZ2V0VmFsdWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5tYWluLmdldFZhbHVlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxUZXh0RmllbGQgcmVmPVwibWFpblwiIHsuLi50aGlzLnByb3BzfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0vPlxuICAgIH1cbn1cbiJdfQ==