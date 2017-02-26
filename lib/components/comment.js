"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommentUI = exports.reducer = exports.ACTION = exports.DOMAIN = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

var _colors = require("material-ui/styles/colors");

var _photoCamera = require("material-ui/svg-icons/image/photo-camera");

var _photoCamera2 = _interopRequireDefault(_photoCamera);

var _save = require("material-ui/svg-icons/content/save");

var _save2 = _interopRequireDefault(_save);

var _fileSelector = require("./file-selector");

var _service = require("../db/service");

var _commandBar = require("./command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _user = require("../db/user");

var _user2 = _interopRequireDefault(_user);

var _comment = require("../db/comment");

var _comment2 = _interopRequireDefault(_comment);

var _file = require("../db/file");

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DOMAIN = exports.DOMAIN = "COMMENT";
var ACTION = exports.ACTION = {
    FETCH: function FETCH(type, _id) {
        return function (dispatch) {
            return _comment2.default.of(type).find({ parent: _id }).fetch(function (data) {
                return dispatch({ type: "@@" + DOMAIN + "/fetched", payload: { data: data, type: type, _id: _id } });
            });
        };
    },

    CREATE: function CREATE(type, id, content) {
        var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        return function (dispatch) {
            content = content.trim();
            if (content.length < 2) return Promise.reject();

            var user = _user2.default.current;
            var comment = _extends({}, props, {
                type: type,
                parent: id,
                thumbnail: user.thumbnail,
                content: content
            });
            return _comment2.default.of(type).upsert(comment).then(function (a) {
                return dispatch({ type: "@@" + DOMAIN + "/created", payload: a });
            });
        };
    }
};

var reducer = exports.reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case "@@" + DOMAIN + "/CLEAR":
            return {};
        case "@@" + DOMAIN + "/fetched":
            return _extends({}, state, payload);
        case "@@" + DOMAIN + "/created":
            return _extends({}, state, { data: [].concat(_toConsumableArray(state.data || []), [payload]) });
    }
    return state;
};

var CommentUI = exports.CommentUI = function (_Component) {
    _inherits(CommentUI, _Component);

    function CommentUI() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, CommentUI);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = CommentUI.__proto__ || Object.getPrototypeOf(CommentUI)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { comment: "" }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CommentUI, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _props = this.props,
                dispatch = _props.dispatch,
                _props$params = _props.params,
                type = _props$params.type,
                _id = _props$params._id;

            dispatch(ACTION.FETCH(type, _id));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.props.dispatch({ type: "@@" + DOMAIN + "/CLEAR" });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                _props2$data = _props2.data,
                data = _props2$data === undefined ? [] : _props2$data,
                template = _props2.template,
                dispatch = _props2.dispatch,
                _props2$params = _props2.params,
                type = _props2$params.type,
                _id = _props2$params._id;
            var height = this.context.muiTheme.page.height;
            var comment = this.state.comment;

            var save = {
                action: "Save",
                label: "发布",
                icon: _react2.default.createElement(_save2.default, null),
                onSelect: function onSelect(e) {
                    return dispatch(ACTION.CREATE(type, _id, comment)).then(function (a) {
                        return _this2.setState({ comment: "" });
                    });
                }
            };
            var photo = {
                action: "photo",
                label: "照片",
                icon: _react2.default.createElement(_photoCamera2.default, null),
                onSelect: function onSelect(e) {
                    return (0, _fileSelector.select)().then(function (url) {
                        return _file2.default.upload(url);
                    }).then(function (url) {
                        return dispatch(ACTION.CREATE(type, _id, url, { content_type: "photo" }));
                    });
                }
            };

            var action = photo;

            if (comment.trim()) action = save;

            return _react2.default.createElement(
                "div",
                { className: "comment", style: { minHeight: height, backgroundColor: _colors.cyan50 } },
                _react2.default.createElement(
                    "div",
                    null,
                    data.map(function (a) {
                        return _react2.default.createElement(template, { comment: a, key: a._id });
                    })
                ),
                _react2.default.createElement(_commandBar2.default, {
                    className: "footbar centerinput",
                    primary: "Save",
                    items: [{ action: "Back" }, _react2.default.createElement("textarea", { placeholder: "\u8BF4\u4E24\u53E5", value: comment,
                        onChange: function onChange(e) {
                            _this2.setState({ comment: e.target.value });
                            e.preventDefault();
                        } }), action]
                })
            );
        }
    }]);

    return CommentUI;
}(_react.Component);

CommentUI.contextTypes = {
    muiTheme: _react.PropTypes.object
};
CommentUI.defaultProps = {
    template: function template(_ref3) {
        var comment = _ref3.comment;

        var name = void 0,
            left = void 0,
            right = void 0,
            text = void 0;
        var isOwner = comment.author._id == _user2.default.current._id;
        if (isOwner) {
            left = _react2.default.createElement("span", null);
            right = _react2.default.createElement(_materialUi.Avatar, { src: _user2.default.current.thumbnail });
        } else {
            name = _react2.default.createElement(
                "span",
                { style: { fontSize: 'x-small' } },
                comment.author.name
            );
            left = _react2.default.createElement(_materialUi.Avatar, { src: comment.thumbnail });
            right = _react2.default.createElement("span", null);
        }

        return _react2.default.createElement(
            "div",
            { key: comment._id, className: "acomment", style: { padding: 5 } },
            _react2.default.createElement(
                "div",
                { style: { width: 40, minHeight: 40, verticalAlign: "top" } },
                left
            ),
            _react2.default.createElement(
                "div",
                { style: { padding: 5, verticalAlign: "top" } },
                _react2.default.createElement(
                    "div",
                    null,
                    name
                ),
                _react2.default.createElement(
                    "p",
                    { className: "content " + (isOwner ? "owner" : "") },
                    function (content, type) {
                        switch (type) {
                            case "photo":
                                return _react2.default.createElement("img", { src: content, style: { width: 150 } });
                            default:
                                return _react2.default.createElement(
                                    "span",
                                    null,
                                    content
                                );
                        }
                    }(comment.content, comment.content_type)
                )
            ),
            _react2.default.createElement(
                "div",
                { style: { width: 40, minHeight: 40, verticalAlign: "top" } },
                right
            )
        );
    }
};
exports.default = Object.assign((0, _reactRedux.connect)(function (state) {
    return state.comment;
})(CommentUI), { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJ0eXBlIiwiX2lkIiwib2YiLCJmaW5kIiwicGFyZW50IiwiZmV0Y2giLCJkaXNwYXRjaCIsInBheWxvYWQiLCJkYXRhIiwiQ1JFQVRFIiwiaWQiLCJjb250ZW50IiwicHJvcHMiLCJ0cmltIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlamVjdCIsInVzZXIiLCJjdXJyZW50IiwiY29tbWVudCIsInRodW1ibmFpbCIsInVwc2VydCIsInRoZW4iLCJhIiwicmVkdWNlciIsInN0YXRlIiwiQ29tbWVudFVJIiwicGFyYW1zIiwidGVtcGxhdGUiLCJoZWlnaHQiLCJjb250ZXh0IiwibXVpVGhlbWUiLCJwYWdlIiwic2F2ZSIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJwaG90byIsInVwbG9hZCIsInVybCIsImNvbnRlbnRfdHlwZSIsIm1pbkhlaWdodCIsImJhY2tncm91bmRDb2xvciIsIm1hcCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsIm5hbWUiLCJsZWZ0IiwicmlnaHQiLCJ0ZXh0IiwiaXNPd25lciIsImF1dGhvciIsImZvbnRTaXplIiwicGFkZGluZyIsIndpZHRoIiwidmVydGljYWxBbGlnbiIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSwwQkFBTyxTQUFiO0FBQ0EsSUFBTUMsMEJBQU87QUFDaEJDLFdBQU8sZUFBQ0MsSUFBRCxFQUFN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SyxPQUFPLEVBQUNDLE9BQU0sRUFBUCxFQUFVcEIsV0FBVSxFQUFwQixFQUF1QnFCLGVBQWMsS0FBckMsRUFBWjtBQUEwRFI7QUFBMUQsYUFERDtBQUVDO0FBQUE7QUFBQSxrQkFBSyxPQUFPLEVBQUNNLFNBQVEsQ0FBVCxFQUFXRSxlQUFjLEtBQXpCLEVBQVo7QUFDbUI7QUFBQTtBQUFBO0FBQU1UO0FBQU4saUJBRG5CO0FBRUM7QUFBQTtBQUFBLHNCQUFHLHlCQUFzQkksVUFBUSxPQUFSLEdBQWdCLEVBQXRDLENBQUg7QUFFdUIsOEJBQUNoRCxPQUFELEVBQVNYLElBQVQsRUFBZ0I7QUFDYixnQ0FBT0EsSUFBUDtBQUNBLGlDQUFLLE9BQUw7QUFDSSx1Q0FBTyx1Q0FBSyxLQUFLVyxPQUFWLEVBQW1CLE9BQU8sRUFBQ29ELE9BQU0sR0FBUCxFQUExQixHQUFQO0FBQ0o7QUFDSSx1Q0FBTztBQUFBO0FBQUE7QUFBT3BEO0FBQVAsaUNBQVA7QUFKSjtBQU1ILHFCQVBELENBT0dRLFFBQVFSLE9BUFgsRUFPbUJRLFFBQVF1QixZQVAzQjtBQUZ0QjtBQUZELGFBRkQ7QUFpQmdCO0FBQUE7QUFBQSxrQkFBSyxPQUFPLEVBQUNxQixPQUFNLEVBQVAsRUFBVXBCLFdBQVUsRUFBcEIsRUFBdUJxQixlQUFjLEtBQXJDLEVBQVo7QUFBMERQO0FBQTFEO0FBakJoQixTQUREO0FBcUJBO0FBbENxQixDO2tCQXNDVFEsT0FBT0MsTUFBUCxDQUFjLHlCQUFRO0FBQUEsV0FBT3pDLE1BQU1OLE9BQWI7QUFBQSxDQUFSLEVBQThCTyxTQUE5QixDQUFkLEVBQXVELEVBQUNGLGdCQUFELEVBQXZELEMiLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtBdmF0YXIsIExpc3QsIExpc3RJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQge2N5YW41MCBhcyBiZ30gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxuaW1wb3J0IEljb25DYW1lcmEgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL3Bob3RvLWNhbWVyYSdcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5cbmltcG9ydCB7c2VsZWN0IGFzIHNlbGVjdEltYWdlRmlsZX0gZnJvbSBcIi4vZmlsZS1zZWxlY3RvclwiXG5cbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vZGIvc2VydmljZSdcbmltcG9ydCBDb21tYW5kQmFyIGZyb20gJy4vY29tbWFuZC1iYXInXG5pbXBvcnQgVXNlciBmcm9tICcuLi9kYi91c2VyJ1xuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vZGIvY29tbWVudCdcbmltcG9ydCBGaWxlIGZyb20gXCIuLi9kYi9maWxlXCJcblxuZXhwb3J0IGNvbnN0IERPTUFJTj1cIkNPTU1FTlRcIlxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG4gICAgRkVUQ0g6ICh0eXBlLF9pZCk9PmRpc3BhdGNoPT5Db21tZW50Lm9mKHR5cGUpLmZpbmQoe3BhcmVudDpfaWR9KVxuICAgICAgICAgICAgLmZldGNoKGRhdGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOntkYXRhLHR5cGUsX2lkfX0pKVxuXG4gICAgLENSRUFURTogKHR5cGUsaWQsY29udGVudCxwcm9wcz17fSk9PmRpc3BhdGNoPT57XG5cdFx0Y29udGVudD1jb250ZW50LnRyaW0oKVxuXHRcdGlmKGNvbnRlbnQubGVuZ3RoPDIpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXG4gICAgICAgIGNvbnN0IHVzZXI9VXNlci5jdXJyZW50XG4gICAgICAgIGNvbnN0IGNvbW1lbnQ9e1xuICAgICAgICAgICAgICAgIC4uLnByb3BzLFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgcGFyZW50OmlkLFxuICAgICAgICAgICAgICAgIHRodW1ibmFpbDp1c2VyLnRodW1ibmFpbCxcbiAgICAgICAgICAgICAgICBjb250ZW50OmNvbnRlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENvbW1lbnQub2YodHlwZSkudXBzZXJ0KGNvbW1lbnQpXG4gICAgICAgICAgICAudGhlbihhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGAscGF5bG9hZDphfSkpXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU9e30sIHt0eXBlLCBwYXlsb2FkfSk9PntcbiAgICBzd2l0Y2godHlwZSl7XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vQ0xFQVJgOlxuICAgICAgICByZXR1cm4ge31cbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcbiAgICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgLi4ucGF5bG9hZH1cbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9jcmVhdGVkYDpcbiAgICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgZGF0YTpbLi4uKHN0YXRlLmRhdGF8fFtdKSxwYXlsb2FkXX1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjbGFzcyBDb21tZW50VUkgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e2NvbW1lbnQ6XCJcIn1cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBjb25zdCB7ZGlzcGF0Y2gscGFyYW1zOnt0eXBlLF9pZH19PXRoaXMucHJvcHNcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHR5cGUsX2lkKSlcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtkYXRhPVtdLHRlbXBsYXRlLGRpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge211aVRoZW1lOntwYWdlOiB7aGVpZ2h0fX19PXRoaXMuY29udGV4dFxuICAgICAgICBjb25zdCB7Y29tbWVudH09dGhpcy5zdGF0ZVxuICAgICAgICBsZXQgc2F2ZT17XG4gICAgICAgICAgICBhY3Rpb246XCJTYXZlXCIsXG4gICAgICAgICAgICBsYWJlbDpcIuWPkeW4g1wiLFxuICAgICAgICAgICAgaWNvbjogPEljb25TYXZlLz4sXG4gICAgICAgICAgICBvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHR5cGUsX2lkLCBjb21tZW50KSlcbiAgICAgICAgICAgICAgICAudGhlbihhPT50aGlzLnNldFN0YXRlKHtjb21tZW50OlwiXCJ9KSlcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGhvdG89e1xuICAgICAgICAgICAgYWN0aW9uOlwicGhvdG9cIixcbiAgICAgICAgICAgIGxhYmVsOlwi54Wn54mHXCIsXG4gICAgICAgICAgICBpY29uOiA8SWNvbkNhbWVyYS8+LFxuICAgICAgICAgICAgb25TZWxlY3Q6ZT0+c2VsZWN0SW1hZ2VGaWxlKClcbiAgICAgICAgICAgICAgICAudGhlbih1cmw9PkZpbGUudXBsb2FkKHVybCkpXG4gICAgICAgICAgICAgICAgLnRoZW4odXJsPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHR5cGUsX2lkLHVybCx7Y29udGVudF90eXBlOlwicGhvdG9cIn0pKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhY3Rpb249cGhvdG9cblxuICAgICAgICBpZihjb21tZW50LnRyaW0oKSlcbiAgICAgICAgICAgIGFjdGlvbj1zYXZlXG5cblx0XHRyZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tZW50XCIgc3R5bGU9e3ttaW5IZWlnaHQ6aGVpZ2h0LCBiYWNrZ3JvdW5kQ29sb3I6Ymd9fT5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZGF0YS5tYXAoYT0+UmVhY3QuY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSwge2NvbW1lbnQ6YSxrZXk6YS5faWR9KSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyIGNlbnRlcmlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIlNhdmVcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuXHRcdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPHRleHRhcmVhIHBsYWNlaG9sZGVyPVwi6K+05Lik5Y+lXCIgdmFsdWU9e2NvbW1lbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjb21tZW50OmUudGFyZ2V0LnZhbHVlfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgXHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuICAgICAgICB0ZW1wbGF0ZTogKHtjb21tZW50fSk9Pntcblx0XHRcdGxldCBuYW1lLCBsZWZ0LCByaWdodCwgdGV4dFxuXHRcdFx0Y29uc3QgaXNPd25lcj1jb21tZW50LmF1dGhvci5faWQ9PVVzZXIuY3VycmVudC5faWQ7XG5cdFx0XHRpZihpc093bmVyKXtcblx0XHRcdFx0bGVmdD0oPHNwYW4vPilcblx0XHRcdFx0cmlnaHQ9KDxBdmF0YXIgc3JjPXtVc2VyLmN1cnJlbnQudGh1bWJuYWlsfS8+KVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdG5hbWU9KDxzcGFuIHN0eWxlPXt7Zm9udFNpemU6J3gtc21hbGwnfX0+e2NvbW1lbnQuYXV0aG9yLm5hbWV9PC9zcGFuPilcblx0XHRcdFx0bGVmdD0oPEF2YXRhciBzcmM9e2NvbW1lbnQudGh1bWJuYWlsfS8+KVxuXHRcdFx0XHRyaWdodD0oPHNwYW4vPilcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBrZXk9e2NvbW1lbnQuX2lkfSBjbGFzc05hbWU9XCJhY29tbWVudFwiIHN0eWxlPXt7cGFkZGluZzo1fX0+XG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3dpZHRoOjQwLG1pbkhlaWdodDo0MCx2ZXJ0aWNhbEFsaWduOlwidG9wXCJ9fT57bGVmdH08L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1LHZlcnRpY2FsQWxpZ246XCJ0b3BcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57bmFtZX08L2Rpdj5cblx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT17YGNvbnRlbnQgJHtpc093bmVyP1wib3duZXJcIjpcIlwifWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoY29udGVudCx0eXBlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2godHlwZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwaG90b1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxpbWcgc3JjPXtjb250ZW50fSBzdHlsZT17e3dpZHRoOjE1MH19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8c3Bhbj57Y29udGVudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShjb21tZW50LmNvbnRlbnQsY29tbWVudC5jb250ZW50X3R5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdFx0PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDo0MCxtaW5IZWlnaHQ6NDAsdmVydGljYWxBbGlnbjpcInRvcFwifX0+e3JpZ2h0fTwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihjb25uZWN0KHN0YXRlPT5zdGF0ZS5jb21tZW50KShDb21tZW50VUkpLHtyZWR1Y2VyfSlcbiJdfQ==