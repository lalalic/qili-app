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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3R1dG9yaWFsLmpzIl0sIm5hbWVzIjpbIlR1dG9yaWFsIiwicHJvcHMiLCJvblNjcm9sbCIsImUiLCJfc2Nyb2xsVGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZmluZERPTU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNsaWRlcyIsIm9uRW5kIiwiaSIsImxhc3QiLCJwb3AiLCJ0ZXh0QWxpZ24iLCJtYXAiLCJzbGlkZSIsInBvc2l0aW9uIiwid2lkdGgiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiQ2Fyb3VzZWwiLCJsYW5kc2NhcGUiLCJtYXRjaCIsImNvcmRvdmEiLCJhIiwiaXNWYWxpZEVsZW1lbnQiLCJtZWRpYSIsInRpdGxlIiwic3VidGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFE7OztBQUtGLHNCQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsd0hBQ1JBLEtBRFE7O0FBRWQsY0FBS0MsUUFBTCxHQUFjLE1BQUtBLFFBQW5CO0FBRmM7QUFHakI7Ozs7aUNBRVFDLEMsRUFBRTtBQUNQLGdCQUFHLEtBQUtDLFlBQVIsRUFDTEMsYUFBYSxLQUFLRCxZQUFsQjtBQUNELGlCQUFLQSxZQUFMLEdBQWtCRSxXQUFXLGFBQUcsQ0FFL0IsQ0FGaUIsRUFFaEIsR0FGZ0IsQ0FBbEI7QUFHRzs7OzRDQUVrQjtBQUNmLDRCQUFNQyxXQUFOLENBQWtCLElBQWxCLEVBQXdCQyxnQkFBeEIsQ0FBeUMsUUFBekMsRUFBa0QsS0FBS04sUUFBdkQ7QUFDSDs7OytDQUVxQjtBQUNsQiw0QkFBTUssV0FBTixDQUFrQixJQUFsQixFQUF3QkUsbUJBQXhCLENBQTRDLFFBQTVDLEVBQXFELEtBQUtQLFFBQTFEO0FBQ0g7OztpQ0FFTztBQUFBLHlCQUNtQixLQUFLRCxLQUR4QjtBQUFBLHVDQUNDUyxNQUREO0FBQUEsZ0JBQ0NBLE1BREQsaUNBQ1EsRUFEUjtBQUFBLGdCQUNZQyxLQURaLFVBQ1lBLEtBRFo7QUFBQSxnQkFDK0JDLENBRC9CLEdBQ2lDLENBRGpDOztBQUVKLGdCQUFJQyxJQUFKO0FBQ0EsZ0JBQUdGLEtBQUgsRUFBUztBQUNMRSx1QkFBS0gsT0FBT0ksR0FBUCxFQUFMO0FBQ0FELHVCQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLE1BQWY7QUFDSSwyREFBSyxLQUFLQSxJQUFWLEdBREo7QUFFSTtBQUFBO0FBQUEsMEJBQUssT0FBTyxFQUFDRSxXQUFVLFFBQVgsRUFBWjtBQUFrQztBQUFBO0FBQUEsOEJBQVEsU0FBUztBQUFBLDJDQUFHSixPQUFIO0FBQUEsaUNBQWpCO0FBQUE7QUFBQTtBQUFsQztBQUZKLGlCQURKO0FBTUg7QUFDRCxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxVQUFmO0FBQ0tELHVCQUFPTSxHQUFQLENBQVc7QUFBQSwyQkFBUTtBQUFBO0FBQUEsMEJBQUssV0FBVSxNQUFmLEVBQXNCLEtBQUtKLEdBQTNCO0FBQWdDLCtEQUFLLEtBQUtLLEtBQVY7QUFBaEMscUJBQVI7QUFBQSxpQkFBWCxDQURMO0FBRUtKLG9CQUZMO0FBR0ksdURBQUssT0FBTyxFQUFDSyxVQUFTLE9BQVYsRUFBa0JILFdBQVUsUUFBNUIsRUFBcUNJLE9BQU0sTUFBM0MsRUFBWjtBQUhKLGFBREo7QUFTSDs7Ozs7O0FBL0NDbkIsUSxDQUNLb0IsUyxHQUFVO0FBQ2JULFdBQU8sZ0JBQU1VLFNBQU4sQ0FBZ0JDO0FBRFYsQztBQWlEZCxJQUFNQyw4QkFBUyxTQUFUQSxRQUFTO0FBQUEsMkJBQUViLE1BQUY7QUFBQSxRQUFFQSxNQUFGLCtCQUFTLEVBQVQ7QUFBQSxRQUFhQyxLQUFiLFFBQWFBLEtBQWI7QUFBQSw4QkFBb0JhLFNBQXBCO0FBQUEsUUFBb0JBLFNBQXBCLGtDQUE4QixLQUE5QjtBQUFBLFdBQ3JCO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxjQUFZLGFBQVksV0FBeEI7QUFDQztBQUFBLHVCQUFPQyxVQUFVRCxZQUFVLElBQXBCLEtBQTZCLElBQXBDO0FBQUE7QUFERCxTQUREO0FBSUM7QUFBQTtBQUFBLGNBQXNCLE1BQU0sSUFBNUI7QUFDQyx1QkFBTSwwQkFEUDtBQUVDLDJCQUFXQSxTQUZaO0FBR0Msd0JBQVEsT0FBT0UsT0FBUCxJQUFpQixXQUgxQjtBQUlDLHlCQUFTZixLQUpWO0FBTUVELG1CQUFPTSxHQUFQLENBQVcsVUFBQ1csQ0FBRCxFQUFHZixDQUFILEVBQU87QUFDakIsb0JBQUcsZ0JBQU1nQixjQUFOLENBQXFCRCxDQUFyQixDQUFILEVBQ0MsT0FBT0EsQ0FBUDs7QUFFRCxvQkFBRyxPQUFPQSxDQUFQLElBQVcsUUFBZCxFQUNDQSxJQUFFLEVBQUNFLE9BQU1GLENBQVAsRUFBRjs7QUFFRCxvQkFBRyxPQUFPQSxFQUFFRSxLQUFULElBQWlCLFFBQXBCLEVBQ0NGLEVBQUVFLEtBQUYsR0FBUSx1Q0FBSyxLQUFLRixFQUFFRSxLQUFaLEdBQVI7O0FBRUQsdUJBQU8sOEVBQU8sS0FBS2pCLENBQVosZUFBb0JrQixPQUFNLEVBQTFCLEVBQThCQyxVQUFTLEVBQXZDLElBQTZDSixDQUE3QyxHQUFQO0FBQ0EsYUFYRDtBQU5GO0FBSkQsS0FEcUI7QUFBQSxDQUFmOztrQkE0QlFKLFEiLCJmaWxlIjoidHV0b3JpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCB7IEF1dG9Sb3RhdGluZ0Nhcm91c2VsLCBTbGlkZSB9IGZyb20gJ21hdGVyaWFsLWF1dG8tcm90YXRpbmctY2Fyb3VzZWwnXG5pbXBvcnQgTWVkaWFRdWVyeSBmcm9tIFwicmVhY3QtcmVzcG9uc2l2ZVwiXG5cbmNsYXNzIFR1dG9yaWFsIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICBvbkVuZDogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLm9uU2Nyb2xsPXRoaXMub25TY3JvbGxcbiAgICB9XG5cbiAgICBvblNjcm9sbChlKXtcbiAgICAgICAgaWYodGhpcy5fc2Nyb2xsVGltZXIpXG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fc2Nyb2xsVGltZXIpXG5cdFx0dGhpcy5fc2Nyb2xsVGltZXI9c2V0VGltZW91dChlPT57XG5cblx0XHR9LDMwMClcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5vblNjcm9sbClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKS5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsdGhpcy5vblNjcm9sbClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtzbGlkZXM9W10sIG9uRW5kfT10aGlzLnByb3BzLCBpPTBcbiAgICAgICAgdmFyIGxhc3RcbiAgICAgICAgaWYob25FbmQpe1xuICAgICAgICAgICAgbGFzdD1zbGlkZXMucG9wKClcbiAgICAgICAgICAgIGxhc3Q9KFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17bGFzdH0vPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7dGV4dEFsaWduOlwiY2VudGVyXCJ9fT48YnV0dG9uIG9uQ2xpY2s9e2U9Pm9uRW5kKCl9PuW8gOWni+S9k+mqjDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInR1dG9yaWFsXCI+XG4gICAgICAgICAgICAgICAge3NsaWRlcy5tYXAoc2xpZGU9Pig8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIiBrZXk9e2krK30+PGltZyBzcmM9e3NsaWRlfS8+PC9kaXY+KSl9XG4gICAgICAgICAgICAgICAge2xhc3R9XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOlwiZml4ZWRcIix0ZXh0QWxpZ246XCJjZW50ZXJcIix3aWR0aDpcIjEwMCVcIn19PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IENhcm91c2VsPSh7c2xpZGVzPVtdLCBvbkVuZCwgbGFuZHNjYXBlPWZhbHNlfSk9Pihcblx0PGRpdj5cblx0XHQ8TWVkaWFRdWVyeSBvcmllbnRhdGlvbj1cImxhbmRzY2FwZVwiPlxuXHRcdHttYXRjaD0+bWF0Y2ggJiYgKGxhbmRzY2FwZT10cnVlKSAmJiBudWxsfVxuXHRcdDwvTWVkaWFRdWVyeT5cblx0XHQ8QXV0b1JvdGF0aW5nQ2Fyb3VzZWwgb3Blbj17dHJ1ZX1cblx0XHRcdGxhYmVsPVwi5byA5aeL5L2T6aqMXCJcblx0XHRcdGxhbmRzY2FwZT17bGFuZHNjYXBlfVxuXHRcdFx0bW9iaWxlPXt0eXBlb2YoY29yZG92YSkhPSd1bmRlZmluZWQnfVxuXHRcdFx0b25TdGFydD17b25FbmR9PlxuXHRcdFx0e1xuXHRcdFx0XHRzbGlkZXMubWFwKChhLGkpPT57XG5cdFx0XHRcdFx0aWYoUmVhY3QuaXNWYWxpZEVsZW1lbnQoYSkpXG5cdFx0XHRcdFx0XHRyZXR1cm4gYVxuXG5cdFx0XHRcdFx0aWYodHlwZW9mKGEpPT0nc3RyaW5nJylcblx0XHRcdFx0XHRcdGE9e21lZGlhOmF9XG5cblx0XHRcdFx0XHRpZih0eXBlb2YoYS5tZWRpYSk9PVwic3RyaW5nXCIpXG5cdFx0XHRcdFx0XHRhLm1lZGlhPTxpbWcgc3JjPXthLm1lZGlhfS8+XG5cblx0XHRcdFx0XHRyZXR1cm4gPFNsaWRlIGtleT17aX0gey4uLnt0aXRsZTpcIlwiLCBzdWJ0aXRsZTpcIlwiLC4uLmF9fS8+XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0PC9BdXRvUm90YXRpbmdDYXJvdXNlbD5cblx0PC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsXG4iXX0=