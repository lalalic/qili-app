"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextFieldx = function (_Component) {
    _inherits(TextFieldx, _Component);

    function TextFieldx(props) {
        _classCallCheck(this, TextFieldx);

        var _this = _possibleConstructorReturn(this, (TextFieldx.__proto__ || Object.getPrototypeOf(TextFieldx)).call(this, props));

        _this.state = {
            value: _this.props.value
        };
        return _this;
    }

    _createClass(TextFieldx, [{
        key: "getValue",
        value: function getValue() {
            return this.refs.main.getValue();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(_materialUi.TextField, _extends({ ref: "main" }, this.props, { value: this.state.value }));
        }
    }, {
        key: "value",
        set: function set(value) {
            try {
                this.setState({ value: value });
            } catch (e) {
                console.error(e);
            }
        }
    }, {
        key: "errorText",
        set: function set(errorText) {
            try {
                this.refs.main.setState({ errorText: errorText });
            } catch (e) {
                console.error(e);
            }
        }
    }]);

    return TextFieldx;
}(_react.Component);

exports.default = TextFieldx;
module.exports = exports['default'];