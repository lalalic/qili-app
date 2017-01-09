"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommentUI = exports.reducer = undefined;

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

var DOMAIN = "COMMENT";
var ACTION = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJ0eXBlIiwiX2lkIiwib2YiLCJmaW5kIiwicGFyZW50IiwiZmV0Y2giLCJkaXNwYXRjaCIsInBheWxvYWQiLCJkYXRhIiwiQ1JFQVRFIiwiaWQiLCJjb250ZW50IiwicHJvcHMiLCJ0cmltIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlamVjdCIsInVzZXIiLCJjdXJyZW50IiwiY29tbWVudCIsInRodW1ibmFpbCIsInVwc2VydCIsInRoZW4iLCJhIiwicmVkdWNlciIsInN0YXRlIiwiQ29tbWVudFVJIiwicGFyYW1zIiwidGVtcGxhdGUiLCJoZWlnaHQiLCJjb250ZXh0IiwibXVpVGhlbWUiLCJwYWdlIiwic2F2ZSIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJwaG90byIsInVwbG9hZCIsInVybCIsImNvbnRlbnRfdHlwZSIsIm1pbkhlaWdodCIsImJhY2tncm91bmRDb2xvciIsIm1hcCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsIm5hbWUiLCJsZWZ0IiwicmlnaHQiLCJ0ZXh0IiwiaXNPd25lciIsImF1dGhvciIsImZvbnRTaXplIiwicGFkZGluZyIsIndpZHRoIiwidmVydGljYWxBbGlnbiIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFPLFNBQWI7QUFDQSxJQUFNQyxTQUFPO0FBQ1RDLFdBQU8sZUFBQ0MsSUFBRCxFQUFNQyxH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QUFPLEVBQUNDLE9BQU0sRUFBUCxFQUFVcEIsV0FBVSxFQUFwQixFQUF1QnFCLGVBQWMsS0FBckMsRUFBWjtBQUEwRFI7QUFBMUQsYUFERDtBQUVDO0FBQUE7QUFBQSxrQkFBSyxPQUFPLEVBQUNNLFNBQVEsQ0FBVCxFQUFXRSxlQUFjLEtBQXpCLEVBQVo7QUFDbUI7QUFBQTtBQUFBO0FBQU1UO0FBQU4saUJBRG5CO0FBRUM7QUFBQTtBQUFBLHNCQUFHLHlCQUFzQkksVUFBUSxPQUFSLEdBQWdCLEVBQXRDLENBQUg7QUFFdUIsOEJBQUNoRCxPQUFELEVBQVNYLElBQVQsRUFBZ0I7QUFDYixnQ0FBT0EsSUFBUDtBQUNBLGlDQUFLLE9BQUw7QUFDSSx1Q0FBTyx1Q0FBSyxLQUFLVyxPQUFWLEVBQW1CLE9BQU8sRUFBQ29ELE9BQU0sR0FBUCxFQUExQixHQUFQO0FBQ0o7QUFDSSx1Q0FBTztBQUFBO0FBQUE7QUFBT3BEO0FBQVAsaUNBQVA7QUFKSjtBQU1ILHFCQVBELENBT0dRLFFBQVFSLE9BUFgsRUFPbUJRLFFBQVF1QixZQVAzQjtBQUZ0QjtBQUZELGFBRkQ7QUFpQmdCO0FBQUE7QUFBQSxrQkFBSyxPQUFPLEVBQUNxQixPQUFNLEVBQVAsRUFBVXBCLFdBQVUsRUFBcEIsRUFBdUJxQixlQUFjLEtBQXJDLEVBQVo7QUFBMERQO0FBQTFEO0FBakJoQixTQUREO0FBcUJBO0FBbENxQixDO2tCQXNDVFEsT0FBT0MsTUFBUCxDQUFjLHlCQUFRO0FBQUEsV0FBT3pDLE1BQU1OLE9BQWI7QUFBQSxDQUFSLEVBQThCTyxTQUE5QixDQUFkLEVBQXVELEVBQUNGLGdCQUFELEVBQXZELEMiLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0F2YXRhciwgTGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCB7Y3lhbjUwIGFzIGJnfSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXHJcbmltcG9ydCBJY29uQ2FtZXJhIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9waG90by1jYW1lcmEnXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXHJcblxyXG5pbXBvcnQge3NlbGVjdCBhcyBzZWxlY3RJbWFnZUZpbGV9IGZyb20gXCIuL2ZpbGUtc2VsZWN0b3JcIlxyXG5cclxuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuLi9kYi9zZXJ2aWNlJ1xyXG5pbXBvcnQgQ29tbWFuZEJhciBmcm9tICcuL2NvbW1hbmQtYmFyJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9kYi91c2VyJ1xyXG5pbXBvcnQgQ29tbWVudCBmcm9tICcuLi9kYi9jb21tZW50J1xyXG5pbXBvcnQgRmlsZSBmcm9tIFwiLi4vZGIvZmlsZVwiXHJcblxyXG5jb25zdCBET01BSU49XCJDT01NRU5UXCJcclxuY29uc3QgQUNUSU9OPXtcclxuICAgIEZFVENIOiAodHlwZSxfaWQpPT5kaXNwYXRjaD0+Q29tbWVudC5vZih0eXBlKS5maW5kKHtwYXJlbnQ6X2lkfSlcclxuICAgICAgICAgICAgLmZldGNoKGRhdGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOntkYXRhLHR5cGUsX2lkfX0pKVxyXG5cclxuICAgICxDUkVBVEU6ICh0eXBlLGlkLGNvbnRlbnQscHJvcHM9e30pPT5kaXNwYXRjaD0+e1xyXG5cdFx0Y29udGVudD1jb250ZW50LnRyaW0oKVxyXG5cdFx0aWYoY29udGVudC5sZW5ndGg8MilcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcclxuXHJcbiAgICAgICAgY29uc3QgdXNlcj1Vc2VyLmN1cnJlbnRcclxuICAgICAgICBjb25zdCBjb21tZW50PXtcclxuICAgICAgICAgICAgICAgIC4uLnByb3BzLFxyXG4gICAgICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgICAgIHBhcmVudDppZCxcclxuICAgICAgICAgICAgICAgIHRodW1ibmFpbDp1c2VyLnRodW1ibmFpbCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6Y29udGVudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENvbW1lbnQub2YodHlwZSkudXBzZXJ0KGNvbW1lbnQpXHJcbiAgICAgICAgICAgIC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9jcmVhdGVkYCxwYXlsb2FkOmF9KSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPXt9LCB7dHlwZSwgcGF5bG9hZH0pPT57XHJcbiAgICBzd2l0Y2godHlwZSl7XHJcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XHJcbiAgICAgICAgcmV0dXJuIHt9XHJcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcclxuICAgICAgICByZXR1cm4gey4uLnN0YXRlLCAuLi5wYXlsb2FkfVxyXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XHJcbiAgICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgZGF0YTpbLi4uKHN0YXRlLmRhdGF8fFtdKSxwYXlsb2FkXX1cclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbWVudFVJIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgc3RhdGU9e2NvbW1lbnQ6XCJcIn1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgICAgY29uc3Qge2Rpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXHJcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHR5cGUsX2lkKSlcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcclxuICAgIH1cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtkYXRhPVtdLHRlbXBsYXRlLGRpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7bXVpVGhlbWU6e3BhZ2U6IHtoZWlnaHR9fX09dGhpcy5jb250ZXh0XHJcbiAgICAgICAgY29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuICAgICAgICBsZXQgc2F2ZT17XHJcbiAgICAgICAgICAgIGFjdGlvbjpcIlNhdmVcIixcclxuICAgICAgICAgICAgbGFiZWw6XCLlj5HluINcIixcclxuICAgICAgICAgICAgaWNvbjogPEljb25TYXZlLz4sXHJcbiAgICAgICAgICAgIG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsIGNvbW1lbnQpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7Y29tbWVudDpcIlwifSkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwaG90bz17XHJcbiAgICAgICAgICAgIGFjdGlvbjpcInBob3RvXCIsXHJcbiAgICAgICAgICAgIGxhYmVsOlwi54Wn54mHXCIsXHJcbiAgICAgICAgICAgIGljb246IDxJY29uQ2FtZXJhLz4sXHJcbiAgICAgICAgICAgIG9uU2VsZWN0OmU9PnNlbGVjdEltYWdlRmlsZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbih1cmw9PkZpbGUudXBsb2FkKHVybCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbih1cmw9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsdXJsLHtjb250ZW50X3R5cGU6XCJwaG90b1wifSkpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjdGlvbj1waG90b1xyXG5cclxuICAgICAgICBpZihjb21tZW50LnRyaW0oKSlcclxuICAgICAgICAgICAgYWN0aW9uPXNhdmVcclxuXHJcblx0XHRyZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1lbnRcIiBzdHlsZT17e21pbkhlaWdodDpoZWlnaHQsIGJhY2tncm91bmRDb2xvcjpiZ319PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICB7ZGF0YS5tYXAoYT0+UmVhY3QuY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSwge2NvbW1lbnQ6YSxrZXk6YS5faWR9KSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXIgY2VudGVyaW5wdXRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCJTYXZlXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDx0ZXh0YXJlYSBwbGFjZWhvbGRlcj1cIuivtOS4pOWPpVwiIHZhbHVlPXtjb21tZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbW1lbnQ6ZS50YXJnZXQudmFsdWV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICBcdFx0PC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG4gICAgICAgIHRlbXBsYXRlOiAoe2NvbW1lbnR9KT0+e1xyXG5cdFx0XHRsZXQgbmFtZSwgbGVmdCwgcmlnaHQsIHRleHRcclxuXHRcdFx0Y29uc3QgaXNPd25lcj1jb21tZW50LmF1dGhvci5faWQ9PVVzZXIuY3VycmVudC5faWQ7XHJcblx0XHRcdGlmKGlzT3duZXIpe1xyXG5cdFx0XHRcdGxlZnQ9KDxzcGFuLz4pXHJcblx0XHRcdFx0cmlnaHQ9KDxBdmF0YXIgc3JjPXtVc2VyLmN1cnJlbnQudGh1bWJuYWlsfS8+KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319Pntjb21tZW50LmF1dGhvci5uYW1lfTwvc3Bhbj4pXHJcblx0XHRcdFx0bGVmdD0oPEF2YXRhciBzcmM9e2NvbW1lbnQudGh1bWJuYWlsfS8+KVxyXG5cdFx0XHRcdHJpZ2h0PSg8c3Bhbi8+KVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXYga2V5PXtjb21tZW50Ll9pZH0gY2xhc3NOYW1lPVwiYWNvbW1lbnRcIiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3dpZHRoOjQwLG1pbkhlaWdodDo0MCx2ZXJ0aWNhbEFsaWduOlwidG9wXCJ9fT57bGVmdH08L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjUsdmVydGljYWxBbGlnbjpcInRvcFwifX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e25hbWV9PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT17YGNvbnRlbnQgJHtpc093bmVyP1wib3duZXJcIjpcIlwifWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGNvbnRlbnQsdHlwZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBob3RvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8aW1nIHNyYz17Y29udGVudH0gc3R5bGU9e3t3aWR0aDoxNTB9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuPntjb250ZW50fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShjb21tZW50LmNvbnRlbnQsY29tbWVudC5jb250ZW50X3R5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOjQwLG1pbkhlaWdodDo0MCx2ZXJ0aWNhbEFsaWduOlwidG9wXCJ9fT57cmlnaHR9PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdChzdGF0ZT0+c3RhdGUuY29tbWVudCkoQ29tbWVudFVJKSx7cmVkdWNlcn0pXHJcbiJdfQ==