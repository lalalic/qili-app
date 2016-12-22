"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Carousel = undefined;

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

var _materialAutoRotatingCarousel = require("material-auto-rotating-carousel");

var _reactResponsive = require("react-responsive");

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

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

                return _react2.default.createElement(_materialAutoRotatingCarousel.Slide, (0, _extends3.default)({ key: i }, (0, _extends3.default)({ title: "", subtitle: "" }, a)));
            })
        )
    );
};

exports.default = Carousel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3R1dG9yaWFsLmpzIl0sIm5hbWVzIjpbIlR1dG9yaWFsIiwicHJvcHMiLCJvblNjcm9sbCIsImUiLCJfc2Nyb2xsVGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZmluZERPTU5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNsaWRlcyIsIm9uRW5kIiwiaSIsImxhc3QiLCJwb3AiLCJ0ZXh0QWxpZ24iLCJtYXAiLCJzbGlkZSIsInBvc2l0aW9uIiwid2lkdGgiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiQ2Fyb3VzZWwiLCJsYW5kc2NhcGUiLCJtYXRjaCIsImNvcmRvdmEiLCJhIiwiaXNWYWxpZEVsZW1lbnQiLCJtZWRpYSIsInRpdGxlIiwic3VidGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOztBQUNBOzs7Ozs7SUFFTUEsUTs7O0FBS0Ysc0JBQVlDLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw4SUFDUkEsS0FEUTs7QUFFZCxjQUFLQyxRQUFMLEdBQWMsTUFBS0EsUUFBbkI7QUFGYztBQUdqQjs7OztpQ0FFUUMsQyxFQUFFO0FBQ1AsZ0JBQUcsS0FBS0MsWUFBUixFQUNMQyxhQUFhLEtBQUtELFlBQWxCO0FBQ0QsaUJBQUtBLFlBQUwsR0FBa0JFLFdBQVcsYUFBRyxDQUUvQixDQUZpQixFQUVoQixHQUZnQixDQUFsQjtBQUdHOzs7NENBRWtCO0FBQ2YsNEJBQU1DLFdBQU4sQ0FBa0IsSUFBbEIsRUFBd0JDLGdCQUF4QixDQUF5QyxRQUF6QyxFQUFrRCxLQUFLTixRQUF2RDtBQUNIOzs7K0NBRXFCO0FBQ2xCLDRCQUFNSyxXQUFOLENBQWtCLElBQWxCLEVBQXdCRSxtQkFBeEIsQ0FBNEMsUUFBNUMsRUFBcUQsS0FBS1AsUUFBMUQ7QUFDSDs7O2lDQUVPO0FBQUEseUJBQ21CLEtBQUtELEtBRHhCO0FBQUEsdUNBQ0NTLE1BREQ7QUFBQSxnQkFDQ0EsTUFERCxpQ0FDUSxFQURSO0FBQUEsZ0JBQ1lDLEtBRFosVUFDWUEsS0FEWjtBQUFBLGdCQUMrQkMsQ0FEL0IsR0FDaUMsQ0FEakM7O0FBRUosZ0JBQUlDLElBQUo7QUFDQSxnQkFBR0YsS0FBSCxFQUFTO0FBQ0xFLHVCQUFLSCxPQUFPSSxHQUFQLEVBQUw7QUFDQUQsdUJBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsTUFBZjtBQUNJLDJEQUFLLEtBQUtBLElBQVYsR0FESjtBQUVJO0FBQUE7QUFBQSwwQkFBSyxPQUFPLEVBQUNFLFdBQVUsUUFBWCxFQUFaO0FBQWtDO0FBQUE7QUFBQSw4QkFBUSxTQUFTO0FBQUEsMkNBQUdKLE9BQUg7QUFBQSxpQ0FBakI7QUFBQTtBQUFBO0FBQWxDO0FBRkosaUJBREo7QUFNSDtBQUNELG1CQUNJO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFVBQWY7QUFDS0QsdUJBQU9NLEdBQVAsQ0FBVztBQUFBLDJCQUFRO0FBQUE7QUFBQSwwQkFBSyxXQUFVLE1BQWYsRUFBc0IsS0FBS0osR0FBM0I7QUFBZ0MsK0RBQUssS0FBS0ssS0FBVjtBQUFoQyxxQkFBUjtBQUFBLGlCQUFYLENBREw7QUFFS0osb0JBRkw7QUFHSSx1REFBSyxPQUFPLEVBQUNLLFVBQVMsT0FBVixFQUFrQkgsV0FBVSxRQUE1QixFQUFxQ0ksT0FBTSxNQUEzQyxFQUFaO0FBSEosYUFESjtBQVNIOzs7OztBQS9DQ25CLFEsQ0FDS29CLFMsR0FBVTtBQUNiVCxXQUFPLGdCQUFNVSxTQUFOLENBQWdCQztBQURWLEM7QUFpRGQsSUFBTUMsOEJBQVMsU0FBVEEsUUFBUztBQUFBLDJCQUFFYixNQUFGO0FBQUEsUUFBRUEsTUFBRiwrQkFBUyxFQUFUO0FBQUEsUUFBYUMsS0FBYixRQUFhQSxLQUFiO0FBQUEsOEJBQW9CYSxTQUFwQjtBQUFBLFFBQW9CQSxTQUFwQixrQ0FBOEIsS0FBOUI7QUFBQSxXQUNyQjtBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsY0FBWSxhQUFZLFdBQXhCO0FBQ0M7QUFBQSx1QkFBT0MsVUFBVUQsWUFBVSxJQUFwQixLQUE2QixJQUFwQztBQUFBO0FBREQsU0FERDtBQUlDO0FBQUE7QUFBQSxjQUFzQixNQUFNLElBQTVCO0FBQ0MsdUJBQU0sMEJBRFA7QUFFQywyQkFBV0EsU0FGWjtBQUdDLHdCQUFRLE9BQU9FLE9BQVAsSUFBaUIsV0FIMUI7QUFJQyx5QkFBU2YsS0FKVjtBQU1FRCxtQkFBT00sR0FBUCxDQUFXLFVBQUNXLENBQUQsRUFBR2YsQ0FBSCxFQUFPO0FBQ2pCLG9CQUFHLGdCQUFNZ0IsY0FBTixDQUFxQkQsQ0FBckIsQ0FBSCxFQUNDLE9BQU9BLENBQVA7O0FBRUQsb0JBQUcsT0FBT0EsQ0FBUCxJQUFXLFFBQWQsRUFDQ0EsSUFBRSxFQUFDRSxPQUFNRixDQUFQLEVBQUY7O0FBRUQsb0JBQUcsT0FBT0EsRUFBRUUsS0FBVCxJQUFpQixRQUFwQixFQUNDRixFQUFFRSxLQUFGLEdBQVEsdUNBQUssS0FBS0YsRUFBRUUsS0FBWixHQUFSOztBQUVELHVCQUFPLDRGQUFPLEtBQUtqQixDQUFaLDZCQUFvQmtCLE9BQU0sRUFBMUIsRUFBOEJDLFVBQVMsRUFBdkMsSUFBNkNKLENBQTdDLEdBQVA7QUFDQSxhQVhEO0FBTkY7QUFKRCxLQURxQjtBQUFBLENBQWY7O2tCQTRCUUosUSIsImZpbGUiOiJ0dXRvcmlhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IHsgQXV0b1JvdGF0aW5nQ2Fyb3VzZWwsIFNsaWRlIH0gZnJvbSAnbWF0ZXJpYWwtYXV0by1yb3RhdGluZy1jYXJvdXNlbCdcbmltcG9ydCBNZWRpYVF1ZXJ5IGZyb20gXCJyZWFjdC1yZXNwb25zaXZlXCJcblxuY2xhc3MgVHV0b3JpYWwgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgIG9uRW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMub25TY3JvbGw9dGhpcy5vblNjcm9sbFxuICAgIH1cblxuICAgIG9uU2Nyb2xsKGUpe1xuICAgICAgICBpZih0aGlzLl9zY3JvbGxUaW1lcilcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl9zY3JvbGxUaW1lcilcblx0XHR0aGlzLl9zY3JvbGxUaW1lcj1zZXRUaW1lb3V0KGU9PntcbiAgICAgICAgICAgIFxuXHRcdH0sMzAwKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3NsaWRlcz1bXSwgb25FbmR9PXRoaXMucHJvcHMsIGk9MFxuICAgICAgICB2YXIgbGFzdFxuICAgICAgICBpZihvbkVuZCl7XG4gICAgICAgICAgICBsYXN0PXNsaWRlcy5wb3AoKVxuICAgICAgICAgICAgbGFzdD0oXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtsYXN0fS8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246XCJjZW50ZXJcIn19PjxidXR0b24gb25DbGljaz17ZT0+b25FbmQoKX0+5byA5aeL5L2T6aqMPC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHV0b3JpYWxcIj5cbiAgICAgICAgICAgICAgICB7c2xpZGVzLm1hcChzbGlkZT0+KDxkaXYgY2xhc3NOYW1lPVwicGFnZVwiIGtleT17aSsrfT48aW1nIHNyYz17c2xpZGV9Lz48L2Rpdj4pKX1cbiAgICAgICAgICAgICAgICB7bGFzdH1cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246XCJmaXhlZFwiLHRleHRBbGlnbjpcImNlbnRlclwiLHdpZHRoOlwiMTAwJVwifX0+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgQ2Fyb3VzZWw9KHtzbGlkZXM9W10sIG9uRW5kLCBsYW5kc2NhcGU9ZmFsc2V9KT0+KFxuXHQ8ZGl2PlxuXHRcdDxNZWRpYVF1ZXJ5IG9yaWVudGF0aW9uPVwibGFuZHNjYXBlXCI+XG5cdFx0e21hdGNoPT5tYXRjaCAmJiAobGFuZHNjYXBlPXRydWUpICYmIG51bGx9XG5cdFx0PC9NZWRpYVF1ZXJ5PlxuXHRcdDxBdXRvUm90YXRpbmdDYXJvdXNlbCBvcGVuPXt0cnVlfVxuXHRcdFx0bGFiZWw9XCLlvIDlp4vkvZPpqoxcIlxuXHRcdFx0bGFuZHNjYXBlPXtsYW5kc2NhcGV9XG5cdFx0XHRtb2JpbGU9e3R5cGVvZihjb3Jkb3ZhKSE9J3VuZGVmaW5lZCd9XG5cdFx0XHRvblN0YXJ0PXtvbkVuZH0+XG5cdFx0XHR7XG5cdFx0XHRcdHNsaWRlcy5tYXAoKGEsaSk9Pntcblx0XHRcdFx0XHRpZihSZWFjdC5pc1ZhbGlkRWxlbWVudChhKSlcblx0XHRcdFx0XHRcdHJldHVybiBhXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYodHlwZW9mKGEpPT0nc3RyaW5nJylcblx0XHRcdFx0XHRcdGE9e21lZGlhOmF9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYodHlwZW9mKGEubWVkaWEpPT1cInN0cmluZ1wiKVxuXHRcdFx0XHRcdFx0YS5tZWRpYT08aW1nIHNyYz17YS5tZWRpYX0vPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiA8U2xpZGUga2V5PXtpfSB7Li4ue3RpdGxlOlwiXCIsIHN1YnRpdGxlOlwiXCIsLi4uYX19Lz5cblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHQ8L0F1dG9Sb3RhdGluZ0Nhcm91c2VsPlxuXHQ8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWwiXX0=