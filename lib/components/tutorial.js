"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tutorial = function (_Component) {
    (0, _inherits3.default)(Tutorial, _Component);

    function Tutorial(props) {
        (0, _classCallCheck3.default)(this, Tutorial);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Tutorial.__proto__ || (0, _getPrototypeOf2.default)(Tutorial)).call(this, props));

        _this.onScroll = _this.onScroll;
        return _this;
    }

    (0, _createClass3.default)(Tutorial, [{
        key: "onScroll",
        value: function onScroll(e) {
            if (this._scrollTimer) clearTimeout(this._scrollTimer);
            this._scrollTimer = setTimeout(function (e) {}, 300);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            _react2.default.findDOMNode(this).addEventListener("scroll", this.onScroll);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _react2.default.findDOMNode(this).removeEventListener("scroll", this.onScroll);
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props;
            var _props$slides = _props.slides;
            var slides = _props$slides === undefined ? [] : _props$slides;
            var onEnd = _props.onEnd;var i = 0;
            var last;
            if (onEnd) {
                last = slides.pop();
                last = _react2.default.createElement(
                    "div",
                    { className: "page" },
                    _react2.default.createElement("img", { src: last }),
                    _react2.default.createElement(
                        "div",
                        { style: { textAlign: "center" } },
                        _react2.default.createElement(
                            "button",
                            { onClick: function onClick(e) {
                                    return onEnd();
                                } },
                            "\u5F00\u59CB\u4F53\u9A8C"
                        )
                    )
                );
            }
            return _react2.default.createElement(
                "div",
                { className: "tutorial" },
                slides.map(function (slide) {
                    return _react2.default.createElement(
                        "div",
                        { className: "page", key: i++ },
                        _react2.default.createElement("img", { src: slide })
                    );
                }),
                last,
                _react2.default.createElement("div", { style: { position: "fixed", textAlign: "center", width: "100%" } })
            );
        }
    }]);
    return Tutorial;
}(_react.Component);

Tutorial.propTypes = {
    onEnd: _react2.default.PropTypes.func
};
exports.default = Tutorial;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3R1dG9yaWFsLmpzIl0sIm5hbWVzIjpbIlR1dG9yaWFsIiwicHJvcHMiLCJvblNjcm9sbCIsImUiLCJfc2Nyb2xsVGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZmluZERPTU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNsaWRlcyIsIm9uRW5kIiwibGFzdCIsInBvcCIsInRleHRBbGlnbiIsIm1hcCIsImkiLCJzbGlkZSIsInBvc2l0aW9uIiwid2lkdGgiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLFE7OztBQUtqQixzQkFBWUMsS0FBWixFQUFrQjtBQUFBOztBQUFBLDhJQUNSQSxLQURROztBQUVkLGNBQUtDLFFBQUwsR0FBYyxNQUFLQSxRQUFuQjtBQUZjO0FBR2pCOzs7O2lDQUVRQyxDLEVBQUU7QUFDUCxnQkFBRyxLQUFLQyxZQUFSLEVBQ0xDLGFBQWEsS0FBS0QsWUFBbEI7QUFDRCxpQkFBS0EsWUFBTCxHQUFrQkUsV0FBVyxhQUFHLENBRS9CLENBRmlCLEVBRWhCLEdBRmdCLENBQWxCO0FBR0c7Ozs0Q0FFa0I7QUFDZiw0QkFBTUMsV0FBTixDQUFrQixJQUFsQixFQUF3QkMsZ0JBQXhCLENBQXlDLFFBQXpDLEVBQWtELEtBQUtOLFFBQXZEO0FBQ0g7OzsrQ0FFcUI7QUFDbEIsNEJBQU1LLFdBQU4sQ0FBa0IsSUFBbEIsRUFBd0JFLG1CQUF4QixDQUE0QyxRQUE1QyxFQUFxRCxLQUFLUCxRQUExRDtBQUNIOzs7aUNBRU87QUFBQSx5QkFDbUIsS0FBS0QsS0FEeEI7QUFBQSx1Q0FDQ1MsTUFERDtBQUFBLGdCQUNDQSxNQURELGlDQUNRLEVBRFI7QUFDQSxnQkFBWUMsS0FBWixVQUFZQSxLQUFaLENBQStCLFFBQUUsQ0FBRjtBQUNuQyxnQkFBSUMsSUFBSjtBQUNBLGdCQUFHRCxLQUFILEVBQVM7QUFDTEMsdUJBQUtGLE9BQU9HLEdBQVAsRUFBTDtBQUNBRCx1QkFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxNQUFmO0FBQ0ksMkRBQUssS0FBS0EsSUFBVixHQURKO0FBRUk7QUFBQTtBQUFBLDBCQUFLLE9BQU8sRUFBQ0UsV0FBVSxRQUFYLEVBQVo7QUFBa0M7QUFBQTtBQUFBLDhCQUFRLFNBQVM7QUFBQSwyQ0FBR0gsT0FBSDtBQUFBLGlDQUFqQjtBQUFBO0FBQUE7QUFBbEM7QUFGSixpQkFESjtBQU1IO0FBQ0QsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsVUFBZjtBQUNLRCx1QkFBT0ssR0FBUCxDQUFXO0FBQUEsMkJBQVE7QUFBQTtBQUFBLDBCQUFLLFdBQVUsTUFBZixFQUFzQixLQUFLQyxHQUEzQjtBQUFnQywrREFBSyxLQUFLQyxLQUFWO0FBQWhDLHFCQUFSO0FBQUEsaUJBQVgsQ0FETDtBQUVLTCxvQkFGTDtBQUdJLHVEQUFLLE9BQU8sRUFBQ00sVUFBUyxPQUFWLEVBQWtCSixXQUFVLFFBQTVCLEVBQXFDSyxPQUFNLE1BQTNDLEVBQVo7QUFISixhQURKO0FBU0g7Ozs7O0FBL0NnQm5CLFEsQ0FDVm9CLFMsR0FBVTtBQUNiVCxXQUFPLGdCQUFNVSxTQUFOLENBQWdCQztBQURWLEM7a0JBREF0QixRIiwiZmlsZSI6InR1dG9yaWFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXRvcmlhbCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgb25FbmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5vblNjcm9sbD10aGlzLm9uU2Nyb2xsXG4gICAgfVxuXG4gICAgb25TY3JvbGwoZSl7XG4gICAgICAgIGlmKHRoaXMuX3Njcm9sbFRpbWVyKVxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX3Njcm9sbFRpbWVyKVxuXHRcdHRoaXMuX3Njcm9sbFRpbWVyPXNldFRpbWVvdXQoZT0+e1xuICAgICAgICAgICAgXG5cdFx0fSwzMDApXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgUmVhY3QuZmluZERPTU5vZGUodGhpcykuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgUmVhY3QuZmluZERPTU5vZGUodGhpcykucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHRoaXMub25TY3JvbGwpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7c2xpZGVzPVtdLCBvbkVuZH09dGhpcy5wcm9wcywgaT0wXG4gICAgICAgIHZhciBsYXN0XG4gICAgICAgIGlmKG9uRW5kKXtcbiAgICAgICAgICAgIGxhc3Q9c2xpZGVzLnBvcCgpXG4gICAgICAgICAgICBsYXN0PShcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2xhc3R9Lz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3RleHRBbGlnbjpcImNlbnRlclwifX0+PGJ1dHRvbiBvbkNsaWNrPXtlPT5vbkVuZCgpfT7lvIDlp4vkvZPpqow8L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0dXRvcmlhbFwiPlxuICAgICAgICAgICAgICAgIHtzbGlkZXMubWFwKHNsaWRlPT4oPGRpdiBjbGFzc05hbWU9XCJwYWdlXCIga2V5PXtpKyt9PjxpbWcgc3JjPXtzbGlkZX0vPjwvZGl2PikpfVxuICAgICAgICAgICAgICAgIHtsYXN0fVxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjpcImZpeGVkXCIsdGV4dEFsaWduOlwiY2VudGVyXCIsd2lkdGg6XCIxMDAlXCJ9fT5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=