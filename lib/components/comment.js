"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Inline = exports.CommentUI = exports.reducer = exports.ACTION = exports.DOMAIN = undefined;

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

var _modeComment = require("material-ui/svg-icons/editor/mode-comment");

var _modeComment2 = _interopRequireDefault(_modeComment);

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

var _empty = require("./empty");

var _empty2 = _interopRequireDefault(_empty);

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

var Inline = exports.Inline = function (_Component2) {
    _inherits(Inline, _Component2);

    function Inline() {
        _classCallCheck(this, Inline);

        return _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
    }

    _createClass(Inline, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _props3 = this.props,
                dispatch = _props3.dispatch,
                _name = _props3.type._name,
                _id = _props3.model._id;

            dispatch(ACTION.FETCH(_name, _id));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.props.dispatch({ type: "@@" + DOMAIN + "/CLEAR" });
        }
    }, {
        key: "render",
        value: function render() {
            var _props4 = this.props,
                _props4$data = _props4.data,
                data = _props4$data === undefined ? [] : _props4$data,
                template = _props4.template,
                emptyIcon = _props4.emptyIcon;


            var content = null;
            if (data.length) {
                content = _react2.default.createElement(
                    "div",
                    null,
                    data.map(function (a) {
                        return _react2.default.createElement(template, { comment: a, key: a._id });
                    })
                );
            } else {
                content = _react2.default.createElement(_empty2.default, { text: "\u5F53\u524D\u8FD8\u6CA1\u6709\u8BC4\u8BBA\u54E6", icon: emptyIcon });
            }

            return _react2.default.createElement(
                "div",
                { className: "comment inline" },
                _react2.default.createElement(
                    "div",
                    { style: { borderLeft: "5px solid red", borderRadius: 4, paddingLeft: 2, fontSize: "large" } },
                    "\u6700\u65B0\u8BC4\u8BBA"
                ),
                content
            );
        }
    }]);

    return Inline;
}(_react.Component);

Inline.defaultProps = {
    template: CommentUI.defaultProps.template,
    emptyIcon: _react2.default.createElement(_modeComment2.default, null)
};
exports.default = Object.assign((0, _reactRedux.connect)(function (state) {
    return state.comment;
})(CommentUI), {
    reducer: reducer,
    Inline: (0, _reactRedux.connect)(function (state) {
        return state.comment;
    })(Inline)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJ0eXBlIiwiX2lkIiwib2YiLCJmaW5kIiwicGFyZW50IiwiZmV0Y2giLCJkaXNwYXRjaCIsInBheWxvYWQiLCJkYXRhIiwiQ1JFQVRFIiwiaWQiLCJjb250ZW50IiwicHJvcHMiLCJ0cmltIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlamVjdCIsInVzZXIiLCJjdXJyZW50IiwiY29tbWVudCIsInRodW1ibmFpbCIsInVwc2VydCIsInRoZW4iLCJhIiwicmVkdWNlciIsInN0YXRlIiwiQ29tbWVudFVJIiwicGFyYW1zIiwidGVtcGxhdGUiLCJoZWlnaHQiLCJjb250ZXh0IiwibXVpVGhlbWUiLCJwYWdlIiwic2F2ZSIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJwaG90byIsInVwbG9hZCIsInVybCIsImNvbnRlbnRfdHlwZSIsIm1pbkhlaWdodCIsImJhY2tncm91bmRDb2xvciIsIm1hcCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsIm5hbWUiLCJsZWZ0IiwicmlnaHQiLCJ0ZXh0IiwiaXNPd25lciIsImF1dGhvciIsImZvbnRTaXplIiwicGFkZGluZyIsIndpZHRoIiwidmVydGljYWxBbGlnbiIsIklubGluZSIsIl9uYW1lIiwibW9kZWwiLCJlbXB0eUljb24iLCJib3JkZXJMZWZ0IiwiYm9yZGVyUmFkaXVzIiwicGFkZGluZ0xlZnQiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7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RUFBdUQ7QUFDckVGLG9CQURxRTtBQUVyRXlDLFlBQVEseUJBQVE7QUFBQSxlQUFPeEMsTUFBTU4sT0FBYjtBQUFBLEtBQVIsRUFBOEI4QyxNQUE5QjtBQUY2RCxDQUF2RCxDIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtBdmF0YXIsIExpc3QsIExpc3RJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQge2N5YW41MCBhcyBiZ30gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxyXG5pbXBvcnQgSWNvbkNhbWVyYSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvcGhvdG8tY2FtZXJhJ1xyXG5pbXBvcnQgSWNvblNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxyXG5pbXBvcnQgSWNvbkVtcHR5Q29tbWVudCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWNvbW1lbnRcIlxyXG5cclxuaW1wb3J0IHtzZWxlY3QgYXMgc2VsZWN0SW1hZ2VGaWxlfSBmcm9tIFwiLi9maWxlLXNlbGVjdG9yXCJcclxuXHJcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vZGIvc2VydmljZSdcclxuaW1wb3J0IENvbW1hbmRCYXIgZnJvbSAnLi9jb21tYW5kLWJhcidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vZGIvdXNlcidcclxuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vZGIvY29tbWVudCdcclxuaW1wb3J0IEZpbGUgZnJvbSBcIi4uL2RiL2ZpbGVcIlxyXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4vZW1wdHlcIlxyXG5cclxuZXhwb3J0IGNvbnN0IERPTUFJTj1cIkNPTU1FTlRcIlxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuICAgIEZFVENIOiAodHlwZSxfaWQpPT5kaXNwYXRjaD0+Q29tbWVudC5vZih0eXBlKS5maW5kKHtwYXJlbnQ6X2lkfSlcclxuICAgICAgICAgICAgLmZldGNoKGRhdGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOntkYXRhLHR5cGUsX2lkfX0pKVxyXG5cclxuICAgICxDUkVBVEU6ICh0eXBlLGlkLGNvbnRlbnQscHJvcHM9e30pPT5kaXNwYXRjaD0+e1xyXG5cdFx0Y29udGVudD1jb250ZW50LnRyaW0oKVxyXG5cdFx0aWYoY29udGVudC5sZW5ndGg8MilcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcclxuXHJcbiAgICAgICAgY29uc3QgdXNlcj1Vc2VyLmN1cnJlbnRcclxuICAgICAgICBjb25zdCBjb21tZW50PXtcclxuICAgICAgICAgICAgICAgIC4uLnByb3BzLFxyXG4gICAgICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgICAgIHBhcmVudDppZCxcclxuICAgICAgICAgICAgICAgIHRodW1ibmFpbDp1c2VyLnRodW1ibmFpbCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6Y29udGVudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENvbW1lbnQub2YodHlwZSkudXBzZXJ0KGNvbW1lbnQpXHJcbiAgICAgICAgICAgIC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9jcmVhdGVkYCxwYXlsb2FkOmF9KSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPXt9LCB7dHlwZSwgcGF5bG9hZH0pPT57XHJcbiAgICBzd2l0Y2godHlwZSl7XHJcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XHJcbiAgICAgICAgcmV0dXJuIHt9XHJcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcclxuICAgICAgICByZXR1cm4gey4uLnN0YXRlLCAuLi5wYXlsb2FkfVxyXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XHJcbiAgICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgZGF0YTpbLi4uKHN0YXRlLmRhdGF8fFtdKSxwYXlsb2FkXX1cclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbWVudFVJIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgc3RhdGU9e2NvbW1lbnQ6XCJcIn1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgICAgY29uc3Qge2Rpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXHJcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHR5cGUsX2lkKSlcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcclxuICAgIH1cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtkYXRhPVtdLHRlbXBsYXRlLGRpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7bXVpVGhlbWU6e3BhZ2U6IHtoZWlnaHR9fX09dGhpcy5jb250ZXh0XHJcbiAgICAgICAgY29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuICAgICAgICBsZXQgc2F2ZT17XHJcbiAgICAgICAgICAgIGFjdGlvbjpcIlNhdmVcIixcclxuICAgICAgICAgICAgbGFiZWw6XCLlj5HluINcIixcclxuICAgICAgICAgICAgaWNvbjogPEljb25TYXZlLz4sXHJcbiAgICAgICAgICAgIG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsIGNvbW1lbnQpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7Y29tbWVudDpcIlwifSkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwaG90bz17XHJcbiAgICAgICAgICAgIGFjdGlvbjpcInBob3RvXCIsXHJcbiAgICAgICAgICAgIGxhYmVsOlwi54Wn54mHXCIsXHJcbiAgICAgICAgICAgIGljb246IDxJY29uQ2FtZXJhLz4sXHJcbiAgICAgICAgICAgIG9uU2VsZWN0OmU9PnNlbGVjdEltYWdlRmlsZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbih1cmw9PkZpbGUudXBsb2FkKHVybCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbih1cmw9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsdXJsLHtjb250ZW50X3R5cGU6XCJwaG90b1wifSkpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjdGlvbj1waG90b1xyXG5cclxuICAgICAgICBpZihjb21tZW50LnRyaW0oKSlcclxuICAgICAgICAgICAgYWN0aW9uPXNhdmVcclxuXHJcblx0XHRyZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1lbnRcIiBzdHlsZT17e21pbkhlaWdodDpoZWlnaHQsIGJhY2tncm91bmRDb2xvcjpiZ319PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICB7ZGF0YS5tYXAoYT0+UmVhY3QuY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSwge2NvbW1lbnQ6YSxrZXk6YS5faWR9KSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXIgY2VudGVyaW5wdXRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCJTYXZlXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDx0ZXh0YXJlYSBwbGFjZWhvbGRlcj1cIuivtOS4pOWPpVwiIHZhbHVlPXtjb21tZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbW1lbnQ6ZS50YXJnZXQudmFsdWV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICBcdFx0PC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG4gICAgICAgIHRlbXBsYXRlOiAoe2NvbW1lbnR9KT0+e1xyXG5cdFx0XHRsZXQgbmFtZSwgbGVmdCwgcmlnaHQsIHRleHRcclxuXHRcdFx0Y29uc3QgaXNPd25lcj1jb21tZW50LmF1dGhvci5faWQ9PVVzZXIuY3VycmVudC5faWQ7XHJcblx0XHRcdGlmKGlzT3duZXIpe1xyXG5cdFx0XHRcdGxlZnQ9KDxzcGFuLz4pXHJcblx0XHRcdFx0cmlnaHQ9KDxBdmF0YXIgc3JjPXtVc2VyLmN1cnJlbnQudGh1bWJuYWlsfS8+KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319Pntjb21tZW50LmF1dGhvci5uYW1lfTwvc3Bhbj4pXHJcblx0XHRcdFx0bGVmdD0oPEF2YXRhciBzcmM9e2NvbW1lbnQudGh1bWJuYWlsfS8+KVxyXG5cdFx0XHRcdHJpZ2h0PSg8c3Bhbi8+KVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXYga2V5PXtjb21tZW50Ll9pZH0gY2xhc3NOYW1lPVwiYWNvbW1lbnRcIiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3dpZHRoOjQwLG1pbkhlaWdodDo0MCx2ZXJ0aWNhbEFsaWduOlwidG9wXCJ9fT57bGVmdH08L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjUsdmVydGljYWxBbGlnbjpcInRvcFwifX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e25hbWV9PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT17YGNvbnRlbnQgJHtpc093bmVyP1wib3duZXJcIjpcIlwifWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGNvbnRlbnQsdHlwZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBob3RvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8aW1nIHNyYz17Y29udGVudH0gc3R5bGU9e3t3aWR0aDoxNTB9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuPntjb250ZW50fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShjb21tZW50LmNvbnRlbnQsY29tbWVudC5jb250ZW50X3R5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOjQwLG1pbkhlaWdodDo0MCx2ZXJ0aWNhbEFsaWduOlwidG9wXCJ9fT57cmlnaHR9PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbmxpbmUgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICBjb25zdCB7ZGlzcGF0Y2gsdHlwZTp7X25hbWV9LG1vZGVsOntfaWR9fT10aGlzLnByb3BzXHJcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKF9uYW1lLF9pZCkpXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH0pXHJcbiAgICB9XHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZGF0YT1bXSx0ZW1wbGF0ZSwgZW1wdHlJY29ufT10aGlzLnByb3BzXHJcblx0XHRcclxuXHRcdGxldCBjb250ZW50PW51bGxcclxuXHRcdGlmKGRhdGEubGVuZ3RoKXtcclxuXHRcdFx0Y29udGVudD0oXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdHtkYXRhLm1hcChhPT5SZWFjdC5jcmVhdGVFbGVtZW50KHRlbXBsYXRlLCB7Y29tbWVudDphLGtleTphLl9pZH0pKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGNvbnRlbnQ9PEVtcHR5IHRleHQ9XCLlvZPliY3ov5jmsqHmnInor4Torrrlk6ZcIiBpY29uPXtlbXB0eUljb259Lz5cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tZW50IGlubGluZVwiPlxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3tib3JkZXJMZWZ0OlwiNXB4IHNvbGlkIHJlZFwiLGJvcmRlclJhZGl1czo0LCBwYWRkaW5nTGVmdDoyLCBmb250U2l6ZTpcImxhcmdlXCJ9fT5cclxuXHRcdFx0XHRcdOacgOaWsOivhOiuulxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdHtjb250ZW50fVxyXG4gICAgXHRcdDwvZGl2PlxyXG4gICAgICAgIClcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHR0ZW1wbGF0ZTpDb21tZW50VUkuZGVmYXVsdFByb3BzLnRlbXBsYXRlLFxyXG5cdFx0ZW1wdHlJY29uOjxJY29uRW1wdHlDb21tZW50Lz5cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdChzdGF0ZT0+c3RhdGUuY29tbWVudCkoQ29tbWVudFVJKSx7XHJcblx0cmVkdWNlciwgXHJcblx0SW5saW5lOiBjb25uZWN0KHN0YXRlPT5zdGF0ZS5jb21tZW50KShJbmxpbmUpXHJcbn0pXHJcbiJdfQ==