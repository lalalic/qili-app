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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJ0eXBlIiwiX2lkIiwib2YiLCJmaW5kIiwicGFyZW50IiwiZmV0Y2giLCJkaXNwYXRjaCIsInBheWxvYWQiLCJkYXRhIiwiQ1JFQVRFIiwiaWQiLCJjb250ZW50IiwicHJvcHMiLCJ0cmltIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlamVjdCIsInVzZXIiLCJjdXJyZW50IiwiY29tbWVudCIsInRodW1ibmFpbCIsInVwc2VydCIsInRoZW4iLCJhIiwicmVkdWNlciIsInN0YXRlIiwiQ29tbWVudFVJIiwicGFyYW1zIiwidGVtcGxhdGUiLCJoZWlnaHQiLCJjb250ZXh0IiwibXVpVGhlbWUiLCJwYWdlIiwic2F2ZSIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJwaG90byIsInVwbG9hZCIsInVybCIsImNvbnRlbnRfdHlwZSIsIm1pbkhlaWdodCIsImJhY2tncm91bmRDb2xvciIsIm1hcCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsIm5hbWUiLCJsZWZ0IiwicmlnaHQiLCJ0ZXh0IiwiaXNPd25lciIsImF1dGhvciIsImZvbnRTaXplIiwicGFkZGluZyIsIndpZHRoIiwidmVydGljYWxBbGlnbiIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFPLFNBQWI7QUFDQSxJQUFNQyxTQUFPO0FBQ1RDLFdBQU8sZUFBQ0MsSUFBRCxFQUFNQyxH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QUFPLEVBQUNDLE9BQU0sRUFBUCxFQUFVcEIsV0FBVSxFQUFwQixFQUF1QnFCLGVBQWMsS0FBckMsRUFBWjtBQUEwRFI7QUFBMUQsYUFERDtBQUVDO0FBQUE7QUFBQSxrQkFBSyxPQUFPLEVBQUNNLFNBQVEsQ0FBVCxFQUFXRSxlQUFjLEtBQXpCLEVBQVo7QUFDbUI7QUFBQTtBQUFBO0FBQU1UO0FBQU4saUJBRG5CO0FBRUM7QUFBQTtBQUFBLHNCQUFHLHlCQUFzQkksVUFBUSxPQUFSLEdBQWdCLEVBQXRDLENBQUg7QUFFdUIsOEJBQUNoRCxPQUFELEVBQVNYLElBQVQsRUFBZ0I7QUFDYixnQ0FBT0EsSUFBUDtBQUNBLGlDQUFLLE9BQUw7QUFDSSx1Q0FBTyx1Q0FBSyxLQUFLVyxPQUFWLEVBQW1CLE9BQU8sRUFBQ29ELE9BQU0sR0FBUCxFQUExQixHQUFQO0FBQ0o7QUFDSSx1Q0FBTztBQUFBO0FBQUE7QUFBT3BEO0FBQVAsaUNBQVA7QUFKSjtBQU1ILHFCQVBELENBT0dRLFFBQVFSLE9BUFgsRUFPbUJRLFFBQVF1QixZQVAzQjtBQUZ0QjtBQUZELGFBRkQ7QUFpQmdCO0FBQUE7QUFBQSxrQkFBSyxPQUFPLEVBQUNxQixPQUFNLEVBQVAsRUFBVXBCLFdBQVUsRUFBcEIsRUFBdUJxQixlQUFjLEtBQXJDLEVBQVo7QUFBMERQO0FBQTFEO0FBakJoQixTQUREO0FBcUJBO0FBbENxQixDO2tCQXNDVFEsT0FBT0MsTUFBUCxDQUFjLHlCQUFRO0FBQUEsV0FBT3pDLE1BQU1OLE9BQWI7QUFBQSxDQUFSLEVBQThCTyxTQUE5QixDQUFkLEVBQXVELEVBQUNGLGdCQUFELEVBQXZELEMiLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtBdmF0YXIsIExpc3QsIExpc3RJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQge2N5YW41MCBhcyBiZ30gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxuaW1wb3J0IEljb25DYW1lcmEgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL3Bob3RvLWNhbWVyYSdcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5cbmltcG9ydCB7c2VsZWN0IGFzIHNlbGVjdEltYWdlRmlsZX0gZnJvbSBcIi4vZmlsZS1zZWxlY3RvclwiXG5cbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vZGIvc2VydmljZSdcbmltcG9ydCBDb21tYW5kQmFyIGZyb20gJy4vY29tbWFuZC1iYXInXG5pbXBvcnQgVXNlciBmcm9tICcuLi9kYi91c2VyJ1xuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vZGIvY29tbWVudCdcbmltcG9ydCBGaWxlIGZyb20gXCIuLi9kYi9maWxlXCJcblxuY29uc3QgRE9NQUlOPVwiQ09NTUVOVFwiXG5jb25zdCBBQ1RJT049e1xuICAgIEZFVENIOiAodHlwZSxfaWQpPT5kaXNwYXRjaD0+Q29tbWVudC5vZih0eXBlKS5maW5kKHtwYXJlbnQ6X2lkfSlcbiAgICAgICAgICAgIC5mZXRjaChkYXRhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAscGF5bG9hZDp7ZGF0YSx0eXBlLF9pZH19KSlcblxuICAgICxDUkVBVEU6ICh0eXBlLGlkLGNvbnRlbnQscHJvcHM9e30pPT5kaXNwYXRjaD0+e1xuXHRcdGNvbnRlbnQ9Y29udGVudC50cmltKClcblx0XHRpZihjb250ZW50Lmxlbmd0aDwyKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcblxuICAgICAgICBjb25zdCB1c2VyPVVzZXIuY3VycmVudFxuICAgICAgICBjb25zdCBjb21tZW50PXtcbiAgICAgICAgICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHBhcmVudDppZCxcbiAgICAgICAgICAgICAgICB0aHVtYm5haWw6dXNlci50aHVtYm5haWwsXG4gICAgICAgICAgICAgICAgY29udGVudDpjb250ZW50XG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb21tZW50Lm9mKHR5cGUpLnVwc2VydChjb21tZW50KVxuICAgICAgICAgICAgLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2NyZWF0ZWRgLHBheWxvYWQ6YX0pKVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPXt9LCB7dHlwZSwgcGF5bG9hZH0pPT57XG4gICAgc3dpdGNoKHR5cGUpe1xuICAgIGNhc2UgYEBAJHtET01BSU59L0NMRUFSYDpcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XG4gICAgICAgIHJldHVybiB7Li4uc3RhdGUsIC4uLnBheWxvYWR9XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XG4gICAgICAgIHJldHVybiB7Li4uc3RhdGUsIGRhdGE6Wy4uLihzdGF0ZS5kYXRhfHxbXSkscGF5bG9hZF19XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY2xhc3MgQ29tbWVudFVJIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtjb21tZW50OlwiXCJ9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgY29uc3Qge2Rpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXG4gICAgICAgIGRpc3BhdGNoKEFDVElPTi5GRVRDSCh0eXBlLF9pZCkpXG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH0pXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7ZGF0YT1bXSx0ZW1wbGF0ZSxkaXNwYXRjaCxwYXJhbXM6e3R5cGUsX2lkfX09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHttdWlUaGVtZTp7cGFnZToge2hlaWdodH19fT10aGlzLmNvbnRleHRcbiAgICAgICAgY29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcbiAgICAgICAgbGV0IHNhdmU9e1xuICAgICAgICAgICAgYWN0aW9uOlwiU2F2ZVwiLFxuICAgICAgICAgICAgbGFiZWw6XCLlj5HluINcIixcbiAgICAgICAgICAgIGljb246IDxJY29uU2F2ZS8+LFxuICAgICAgICAgICAgb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh0eXBlLF9pZCwgY29tbWVudCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7Y29tbWVudDpcIlwifSkpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBob3RvPXtcbiAgICAgICAgICAgIGFjdGlvbjpcInBob3RvXCIsXG4gICAgICAgICAgICBsYWJlbDpcIueFp+eJh1wiLFxuICAgICAgICAgICAgaWNvbjogPEljb25DYW1lcmEvPixcbiAgICAgICAgICAgIG9uU2VsZWN0OmU9PnNlbGVjdEltYWdlRmlsZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4odXJsPT5GaWxlLnVwbG9hZCh1cmwpKVxuICAgICAgICAgICAgICAgIC50aGVuKHVybD0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh0eXBlLF9pZCx1cmwse2NvbnRlbnRfdHlwZTpcInBob3RvXCJ9KSkpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWN0aW9uPXBob3RvXG5cbiAgICAgICAgaWYoY29tbWVudC50cmltKCkpXG4gICAgICAgICAgICBhY3Rpb249c2F2ZVxuXG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiIHN0eWxlPXt7bWluSGVpZ2h0OmhlaWdodCwgYmFja2dyb3VuZENvbG9yOmJnfX0+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAge2RhdGEubWFwKGE9PlJlYWN0LmNyZWF0ZUVsZW1lbnQodGVtcGxhdGUsIHtjb21tZW50OmEsa2V5OmEuX2lkfSkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCJTYXZlXCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcblx0XHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDx0ZXh0YXJlYSBwbGFjZWhvbGRlcj1cIuivtOS4pOWPpVwiIHZhbHVlPXtjb21tZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tbWVudDplLnRhcmdldC52YWx1ZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgIFx0XHQ8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRtdWlUaGVtZTogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzPXtcbiAgICAgICAgdGVtcGxhdGU6ICh7Y29tbWVudH0pPT57XG5cdFx0XHRsZXQgbmFtZSwgbGVmdCwgcmlnaHQsIHRleHRcblx0XHRcdGNvbnN0IGlzT3duZXI9Y29tbWVudC5hdXRob3IuX2lkPT1Vc2VyLmN1cnJlbnQuX2lkO1xuXHRcdFx0aWYoaXNPd25lcil7XG5cdFx0XHRcdGxlZnQ9KDxzcGFuLz4pXG5cdFx0XHRcdHJpZ2h0PSg8QXZhdGFyIHNyYz17VXNlci5jdXJyZW50LnRodW1ibmFpbH0vPilcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319Pntjb21tZW50LmF1dGhvci5uYW1lfTwvc3Bhbj4pXG5cdFx0XHRcdGxlZnQ9KDxBdmF0YXIgc3JjPXtjb21tZW50LnRodW1ibmFpbH0vPilcblx0XHRcdFx0cmlnaHQ9KDxzcGFuLz4pXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYga2V5PXtjb21tZW50Ll9pZH0gY2xhc3NOYW1lPVwiYWNvbW1lbnRcIiBzdHlsZT17e3BhZGRpbmc6NX19PlxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3t3aWR0aDo0MCxtaW5IZWlnaHQ6NDAsdmVydGljYWxBbGlnbjpcInRvcFwifX0+e2xlZnR9PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NSx2ZXJ0aWNhbEFsaWduOlwidG9wXCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e25hbWV9PC9kaXY+XG5cdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9e2Bjb250ZW50ICR7aXNPd25lcj9cIm93bmVyXCI6XCJcIn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGNvbnRlbnQsdHlwZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicGhvdG9cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8aW1nIHNyYz17Y29udGVudH0gc3R5bGU9e3t3aWR0aDoxNTB9fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4+e2NvbnRlbnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoY29tbWVudC5jb250ZW50LGNvbW1lbnQuY29udGVudF90eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHRcdDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6NDAsbWluSGVpZ2h0OjQwLHZlcnRpY2FsQWxpZ246XCJ0b3BcIn19PntyaWdodH08L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdChzdGF0ZT0+c3RhdGUuY29tbWVudCkoQ29tbWVudFVJKSx7cmVkdWNlcn0pXG4iXX0=