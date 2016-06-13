"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _React = require("React");

var _React2 = _interopRequireDefault(_React);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tutorial = function (_Component) {
    _inherits(Tutorial, _Component);

    function Tutorial(props) {
        _classCallCheck(this, Tutorial);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tutorial).call(this, props));

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
            _React2.default.findDOMNode(this).addEventListener("scroll", this.onScroll);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _React2.default.findDOMNode(this).removeEventListener("scroll", this.onScroll);
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
                last = _React2.default.createElement(
                    "div",
                    { className: "page" },
                    _React2.default.createElement("img", { src: last }),
                    _React2.default.createElement(
                        "div",
                        { style: { textAlign: "center" } },
                        _React2.default.createElement(
                            "button",
                            { onClick: function onClick(e) {
                                    return onEnd();
                                } },
                            "开始体验"
                        )
                    )
                );
            }
            return _React2.default.createElement(
                "div",
                { className: "tutorial" },
                slides.map(function (slide) {
                    return _React2.default.createElement(
                        "div",
                        { className: "page", key: i++ },
                        _React2.default.createElement("img", { src: slide })
                    );
                }),
                last,
                _React2.default.createElement("div", { style: { position: "fixed", textAlign: "center", width: "100%" } })
            );
        }
    }]);

    return Tutorial;
}(_React.Component);

Tutorial.propTypes = {
    onEnd: _React2.default.PropTypes.func
};
exports.default = Tutorial;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3R1dG9yaWFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBS2pCLGFBTGlCLFFBS2pCLENBQVksS0FBWixFQUFrQjs4QkFMRCxVQUtDOzsyRUFMRCxxQkFNUCxRQURROztBQUVkLGNBQUssUUFBTCxHQUFjLE1BQUssUUFBTCxDQUZBOztLQUFsQjs7aUJBTGlCOztpQ0FVUixHQUFFO0FBQ1AsZ0JBQUcsS0FBSyxZQUFMLEVBQ1IsYUFBYSxLQUFLLFlBQUwsQ0FBYixDQURLO0FBRU4saUJBQUssWUFBTCxHQUFrQixXQUFXLGFBQUcsRUFBSCxFQUUzQixHQUZnQixDQUFsQixDQUhhOzs7OzRDQVFRO0FBQ2YsNEJBQU0sV0FBTixDQUFrQixJQUFsQixFQUF3QixnQkFBeEIsQ0FBeUMsUUFBekMsRUFBa0QsS0FBSyxRQUFMLENBQWxELENBRGU7Ozs7K0NBSUc7QUFDbEIsNEJBQU0sV0FBTixDQUFrQixJQUFsQixFQUF3QixtQkFBeEIsQ0FBNEMsUUFBNUMsRUFBcUQsS0FBSyxRQUFMLENBQXJELENBRGtCOzs7O2lDQUlkO3lCQUNtQixLQUFLLEtBQUwsQ0FEbkI7dUNBQ0MsT0FERDtnQkFDQyx1Q0FBTyxtQkFEUjtBQUNBLGdCQUFZLG9CQUFaLENBREEsSUFDK0IsSUFBRSxDQUFGLENBRC9CO0FBRUosZ0JBQUksSUFBSixDQUZJO0FBR0osZ0JBQUcsS0FBSCxFQUFTO0FBQ0wsdUJBQUssT0FBTyxHQUFQLEVBQUwsQ0FESztBQUVMLHVCQUNJOztzQkFBSyxXQUFVLE1BQVYsRUFBTDtvQkFDSSx1Q0FBSyxLQUFLLElBQUwsRUFBTCxDQURKO29CQUVJOzswQkFBSyxPQUFPLEVBQUMsV0FBVSxRQUFWLEVBQVIsRUFBTDt3QkFBa0M7OzhCQUFRLFNBQVM7MkNBQUc7aUNBQUgsRUFBakI7O3lCQUFsQztxQkFGSjtpQkFESixDQUZLO2FBQVQ7QUFTQSxtQkFDSTs7a0JBQUssV0FBVSxVQUFWLEVBQUw7Z0JBQ0ssT0FBTyxHQUFQLENBQVc7MkJBQVE7OzBCQUFLLFdBQVUsTUFBVixFQUFpQixLQUFLLEdBQUwsRUFBdEI7d0JBQWdDLHVDQUFLLEtBQUssS0FBTCxFQUFMLENBQWhDOztpQkFBUixDQURoQjtnQkFFSyxJQUZMO2dCQUdJLHVDQUFLLE9BQU8sRUFBQyxVQUFTLE9BQVQsRUFBaUIsV0FBVSxRQUFWLEVBQW1CLE9BQU0sTUFBTixFQUE1QyxFQUFMLENBSEo7YUFESixDQVpJOzs7O1dBMUJTOzs7U0FDVixZQUFVO0FBQ2IsV0FBTyxnQkFBTSxTQUFOLENBQWdCLElBQWhCOztrQkFGTSIsImZpbGUiOiJ0dXRvcmlhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcIlJlYWN0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHV0b3JpYWwgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgIG9uRW5kOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMub25TY3JvbGw9dGhpcy5vblNjcm9sbFxuICAgIH1cblxuICAgIG9uU2Nyb2xsKGUpe1xuICAgICAgICBpZih0aGlzLl9zY3JvbGxUaW1lcilcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl9zY3JvbGxUaW1lcilcblx0XHR0aGlzLl9zY3JvbGxUaW1lcj1zZXRUaW1lb3V0KGU9PntcbiAgICAgICAgICAgIFxuXHRcdH0sMzAwKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLm9uU2Nyb2xsKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3NsaWRlcz1bXSwgb25FbmR9PXRoaXMucHJvcHMsIGk9MFxuICAgICAgICB2YXIgbGFzdFxuICAgICAgICBpZihvbkVuZCl7XG4gICAgICAgICAgICBsYXN0PXNsaWRlcy5wb3AoKVxuICAgICAgICAgICAgbGFzdD0oXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtsYXN0fS8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246XCJjZW50ZXJcIn19PjxidXR0b24gb25DbGljaz17ZT0+b25FbmQoKX0+5byA5aeL5L2T6aqMPC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHV0b3JpYWxcIj5cbiAgICAgICAgICAgICAgICB7c2xpZGVzLm1hcChzbGlkZT0+KDxkaXYgY2xhc3NOYW1lPVwicGFnZVwiIGtleT17aSsrfT48aW1nIHNyYz17c2xpZGV9Lz48L2Rpdj4pKX1cbiAgICAgICAgICAgICAgICB7bGFzdH1cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246XCJmaXhlZFwiLHRleHRBbGlnbjpcImNlbnRlclwiLHdpZHRoOlwiMTAwJVwifX0+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuIl19