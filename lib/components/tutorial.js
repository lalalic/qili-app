"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Carousel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialAutoRotatingCarousel = require("material-auto-rotating-carousel");

var _reactResponsive = require("react-responsive");

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tutorial = function (_Component) {
    _inherits(Tutorial, _Component);

    function Tutorial(props) {
        _classCallCheck(this, Tutorial);

        var _this = _possibleConstructorReturn(this, (Tutorial.__proto__ || Object.getPrototypeOf(Tutorial)).call(this, props));

        _this.onScroll = _this.onScroll;
        return _this;
    }

    _createClass(Tutorial, [{
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
            var _props = this.props,
                _props$slides = _props.slides,
                slides = _props$slides === undefined ? [] : _props$slides,
                onEnd = _props.onEnd,
                i = 0;

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
var Carousel = exports.Carousel = function Carousel(_ref) {
    var _ref$slides = _ref.slides,
        slides = _ref$slides === undefined ? [] : _ref$slides,
        onEnd = _ref.onEnd,
        _ref$landscape = _ref.landscape,
        landscape = _ref$landscape === undefined ? false : _ref$landscape;
    return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
            _reactResponsive2.default,
            { orientation: "landscape" },
            function (match) {
                return match && (landscape = true) && null;
            }
        ),
        _react2.default.createElement(
            _materialAutoRotatingCarousel.AutoRotatingCarousel,
            { open: true,
                label: "\u5F00\u59CB\u4F53\u9A8C",
                landscape: landscape,
                mobile: typeof cordova != 'undefined',
                onStart: onEnd },
            slides.map(function (a, i) {
                if (_react2.default.isValidElement(a)) return a;

                if (typeof a == 'string') a = { media: a };

                if (typeof a.media == "string") a.media = _react2.default.createElement("img", { src: a.media });

                return _react2.default.createElement(_materialAutoRotatingCarousel.Slide, _extends({ key: i }, _extends({ title: "", subtitle: "" }, a)));
            })
        )
    );
};

exports.default = Carousel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3R1dG9yaWFsLmpzIl0sIm5hbWVzIjpbIlR1dG9yaWFsIiwicHJvcHMiLCJvblNjcm9sbCIsImUiLCJfc2Nyb2xsVGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZmluZERPTU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNsaWRlcyIsIm9uRW5kIiwiaSIsImxhc3QiLCJwb3AiLCJ0ZXh0QWxpZ24iLCJtYXAiLCJzbGlkZSIsInBvc2l0aW9uIiwid2lkdGgiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiQ2Fyb3VzZWwiLCJsYW5kc2NhcGUiLCJtYXRjaCIsImNvcmRvdmEiLCJhIiwiaXNWYWxpZEVsZW1lbnQiLCJtZWRpYSIsInRpdGxlIiwic3VidGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFE7OztBQUtGLHNCQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsd0hBQ1JBLEtBRFE7O0FBRWQsY0FBS0MsUUFBTCxHQUFjLE1BQUtBLFFBQW5CO0FBRmM7QUFHakI7Ozs7aUNBRVFDLEMsRUFBRTtBQUNQLGdCQUFHLEtBQUtDLFlBQVIsRUFDTEMsYUFBYSxLQUFLRCxZQUFsQjtBQUNELGlCQUFLQSxZQUFMLEdBQWtCRSxXQUFXLGFBQUcsQ0FFL0IsQ0FGaUIsRUFFaEIsR0FGZ0IsQ0FBbEI7QUFHRzs7OzRDQUVrQjtBQUNmLDRCQUFNQyxXQUFOLENBQWtCLElBQWxCLEVBQXdCQyxnQkFBeEIsQ0FBeUMsUUFBekMsRUFBa0QsS0FBS04sUUFBdkQ7QUFDSDs7OytDQUVxQjtBQUNsQiw0QkFBTUssV0FBTixDQUFrQixJQUFsQixFQUF3QkUsbUJBQXhCLENBQTRDLFFBQTVDLEVBQXFELEtBQUtQLFFBQTFEO0FBQ0g7OztpQ0FFTztBQUFBLHlCQUNtQixLQUFLRCxLQUR4QjtBQUFBLHVDQUNDUyxNQUREO0FBQUEsZ0JBQ0NBLE1BREQsaUNBQ1EsRUFEUjtBQUFBLGdCQUNZQyxLQURaLFVBQ1lBLEtBRFo7QUFBQSxnQkFDK0JDLENBRC9CLEdBQ2lDLENBRGpDOztBQUVKLGdCQUFJQyxJQUFKO0FBQ0EsZ0JBQUdGLEtBQUgsRUFBUztBQUNMRSx1QkFBS0gsT0FBT0ksR0FBUCxFQUFMO0FBQ0FELHVCQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLE1BQWY7QUFDSSwyREFBSyxLQUFLQSxJQUFWLEdBREo7QUFFSTtBQUFBO0FBQUEsMEJBQUssT0FBTyxFQUFDRSxXQUFVLFFBQVgsRUFBWjtBQUFrQztBQUFBO0FBQUEsOEJBQVEsU0FBUztBQUFBLDJDQUFHSixPQUFIO0FBQUEsaUNBQWpCO0FBQUE7QUFBQTtBQUFsQztBQUZKLGlCQURKO0FBTUg7QUFDRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxVQUFmO0FBQ0tELHVCQUFPTSxHQUFQLENBQVc7QUFBQSwyQkFBUTtBQUFBO0FBQUEsMEJBQUssV0FBVSxNQUFmLEVBQXNCLEtBQUtKLEdBQTNCO0FBQWdDLCtEQUFLLEtBQUtLLEtBQVY7QUFBaEMscUJBQVI7QUFBQSxpQkFBWCxDQURMO0FBRUtKLG9CQUZMO0FBR0ksdURBQUssT0FBTyxFQUFDSyxVQUFTLE9BQVYsRUFBa0JILFdBQVUsUUFBNUIsRUFBcUNJLE9BQU0sTUFBM0MsRUFBWjtBQUhKLGFBREo7QUFTSDs7Ozs7O0FBL0NDbkIsUSxDQUNLb0IsUyxHQUFVO0FBQ2JULFdBQU8sZ0JBQU1VLFNBQU4sQ0FBZ0JDO0FBRFYsQztBQWlEZCxJQUFNQyw4QkFBUyxTQUFUQSxRQUFTO0FBQUEsMkJBQUViLE1BQUY7QUFBQSxRQUFFQSxNQUFGLCtCQUFTLEVBQVQ7QUFBQSxRQUFhQyxLQUFiLFFBQWFBLEtBQWI7QUFBQSw4QkFBb0JhLFNBQXBCO0FBQUEsUUFBb0JBLFNBQXBCLGtDQUE4QixLQUE5QjtBQUFBLFdBQ3JCO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxjQUFZLGFBQVksV0FBeEI7QUFDQztBQUFBLHVCQUFPQyxVQUFVRCxZQUFVLElBQXBCLEtBQTZCLElBQXBDO0FBQUE7QUFERCxTQUREO0FBSUM7QUFBQTtBQUFBLGNBQXNCLE1BQU0sSUFBNUI7QUFDQyx1QkFBTSwwQkFEUDtBQUVDLDJCQUFXQSxTQUZaO0FBR0Msd0JBQVEsT0FBT0UsT0FBUCxJQUFpQixXQUgxQjtBQUlDLHlCQUFTZixLQUpWO0FBTUVELG1CQUFPTSxHQUFQLENBQVcsVUFBQ1csQ0FBRCxFQUFHZixDQUFILEVBQU87QUFDakIsb0JBQUcsZ0JBQU1nQixjQUFOLENBQXFCRCxDQUFyQixDQUFILEVBQ0MsT0FBT0EsQ0FBUDs7QUFFRCxvQkFBRyxPQUFPQSxDQUFQLElBQVcsUUFBZCxFQUNDQSxJQUFFLEVBQUNFLE9BQU1GLENBQVAsRUFBRjs7QUFFRCxvQkFBRyxPQUFPQSxFQUFFRSxLQUFULElBQWlCLFFBQXBCLEVBQ0NGLEVBQUVFLEtBQUYsR0FBUSx1Q0FBSyxLQUFLRixFQUFFRSxLQUFaLEdBQVI7O0FBRUQsdUJBQU8sOEVBQU8sS0FBS2pCLENBQVosZUFBb0JrQixPQUFNLEVBQTFCLEVBQThCQyxVQUFTLEVBQXZDLElBQTZDSixDQUE3QyxHQUFQO0FBQ0EsYUFYRDtBQU5GO0FBSkQsS0FEcUI7QUFBQSxDQUFmOztrQkE0QlFKLFEiLCJmaWxlIjoidHV0b3JpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgeyBBdXRvUm90YXRpbmdDYXJvdXNlbCwgU2xpZGUgfSBmcm9tICdtYXRlcmlhbC1hdXRvLXJvdGF0aW5nLWNhcm91c2VsJ1xyXG5pbXBvcnQgTWVkaWFRdWVyeSBmcm9tIFwicmVhY3QtcmVzcG9uc2l2ZVwiXHJcblxyXG5jbGFzcyBUdXRvcmlhbCBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xyXG4gICAgICAgIG9uRW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB0aGlzLm9uU2Nyb2xsPXRoaXMub25TY3JvbGxcclxuICAgIH1cclxuXHJcbiAgICBvblNjcm9sbChlKXtcclxuICAgICAgICBpZih0aGlzLl9zY3JvbGxUaW1lcilcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX3Njcm9sbFRpbWVyKVxyXG5cdFx0dGhpcy5fc2Nyb2xsVGltZXI9c2V0VGltZW91dChlPT57XHJcbiAgICAgICAgICAgIFxyXG5cdFx0fSwzMDApXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5vblNjcm9sbClcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHZhciB7c2xpZGVzPVtdLCBvbkVuZH09dGhpcy5wcm9wcywgaT0wXHJcbiAgICAgICAgdmFyIGxhc3RcclxuICAgICAgICBpZihvbkVuZCl7XHJcbiAgICAgICAgICAgIGxhc3Q9c2xpZGVzLnBvcCgpXHJcbiAgICAgICAgICAgIGxhc3Q9KFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2xhc3R9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7dGV4dEFsaWduOlwiY2VudGVyXCJ9fT48YnV0dG9uIG9uQ2xpY2s9e2U9Pm9uRW5kKCl9PuW8gOWni+S9k+mqjDwvYnV0dG9uPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0dXRvcmlhbFwiPlxyXG4gICAgICAgICAgICAgICAge3NsaWRlcy5tYXAoc2xpZGU9Pig8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIiBrZXk9e2krK30+PGltZyBzcmM9e3NsaWRlfS8+PC9kaXY+KSl9XHJcbiAgICAgICAgICAgICAgICB7bGFzdH1cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjpcImZpeGVkXCIsdGV4dEFsaWduOlwiY2VudGVyXCIsd2lkdGg6XCIxMDAlXCJ9fT5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2Fyb3VzZWw9KHtzbGlkZXM9W10sIG9uRW5kLCBsYW5kc2NhcGU9ZmFsc2V9KT0+KFxyXG5cdDxkaXY+XHJcblx0XHQ8TWVkaWFRdWVyeSBvcmllbnRhdGlvbj1cImxhbmRzY2FwZVwiPlxyXG5cdFx0e21hdGNoPT5tYXRjaCAmJiAobGFuZHNjYXBlPXRydWUpICYmIG51bGx9XHJcblx0XHQ8L01lZGlhUXVlcnk+XHJcblx0XHQ8QXV0b1JvdGF0aW5nQ2Fyb3VzZWwgb3Blbj17dHJ1ZX1cclxuXHRcdFx0bGFiZWw9XCLlvIDlp4vkvZPpqoxcIlxyXG5cdFx0XHRsYW5kc2NhcGU9e2xhbmRzY2FwZX1cclxuXHRcdFx0bW9iaWxlPXt0eXBlb2YoY29yZG92YSkhPSd1bmRlZmluZWQnfVxyXG5cdFx0XHRvblN0YXJ0PXtvbkVuZH0+XHJcblx0XHRcdHtcclxuXHRcdFx0XHRzbGlkZXMubWFwKChhLGkpPT57XHJcblx0XHRcdFx0XHRpZihSZWFjdC5pc1ZhbGlkRWxlbWVudChhKSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGFcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYodHlwZW9mKGEpPT0nc3RyaW5nJylcclxuXHRcdFx0XHRcdFx0YT17bWVkaWE6YX1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYodHlwZW9mKGEubWVkaWEpPT1cInN0cmluZ1wiKVxyXG5cdFx0XHRcdFx0XHRhLm1lZGlhPTxpbWcgc3JjPXthLm1lZGlhfS8+XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHJldHVybiA8U2xpZGUga2V5PXtpfSB7Li4ue3RpdGxlOlwiXCIsIHN1YnRpdGxlOlwiXCIsLi4uYX19Lz5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHQ8L0F1dG9Sb3RhdGluZ0Nhcm91c2VsPlxyXG5cdDwvZGl2PlxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbCJdfQ==