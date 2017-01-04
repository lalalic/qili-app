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

var _service = require("../db/service");

var _commandBar = require("./command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _user = require("../db/user");

var _user2 = _interopRequireDefault(_user);

var _comment = require("../db/comment");

var _comment2 = _interopRequireDefault(_comment);

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

    CREATE: function CREATE(type, _id, content) {
        return function (dispatch) {
            content = content.trim();
            if (content.length < 2) return Promise.reject();

            var user = _user2.default.current;
            var comment = {
                type: type,
                parent: _id,
                thumbnail: user.thumbnail,
                content: content
            };
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
        _classCallCheck(this, CommentUI);

        return _possibleConstructorReturn(this, (CommentUI.__proto__ || Object.getPrototypeOf(CommentUI)).apply(this, arguments));
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
            var _props2 = this.props,
                _props2$data = _props2.data,
                data = _props2$data === undefined ? [] : _props2$data,
                template = _props2.template,
                dispatch = _props2.dispatch,
                _props2$params = _props2.params,
                type = _props2$params.type,
                _id = _props2$params._id;
            var height = this.context.muiTheme.page.height;

            var refComment = void 0;
            return _react2.default.createElement(
                "div",
                { className: "comment", style: { minHeight: height, backgroundColor: _colors.cyan50 } },
                _react2.default.createElement(
                    _materialUi.List,
                    null,
                    data.map(function (a) {
                        return _react2.default.createElement(template, { comment: a, key: a._id });
                    })
                ),
                _react2.default.createElement(_commandBar2.default, {
                    className: "footbar centerinput",
                    items: [{ action: "Back", label: "." }, _react2.default.createElement("textarea", { ref: function ref(a) {
                            return refComment = a;
                        }, placeholder: "\u8BF4\u4E24\u53E5" }), { action: "Save", label: "发布", onSelect: function onSelect(e) {
                            return dispatch(ACTION.CREATE(type, _id, refComment.value)).then(function (a) {
                                return refComment.value = "";
                            });
                        } }]
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
    template: function template(_ref2) {
        var comment = _ref2.comment;

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
            _materialUi.ListItem,
            {
                key: comment._id,
                style: { paddingTop: 10, paddingLeft: 62, marginBottom: 30 },
                leftAvatar: left,
                rightAvatar: right,
                disabled: true },
            name,
            _react2.default.createElement(
                "div",
                { style: { paddingRight: 5 } },
                _react2.default.createElement(
                    "p",
                    { className: "content " + (isOwner ? "owner" : "") },
                    _react2.default.createElement(
                        "span",
                        null,
                        comment.content
                    )
                )
            )
        );
    }
};
exports.default = Object.assign((0, _reactRedux.connect)(function (state) {
    return state.comment;
})(CommentUI), { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJ0eXBlIiwiX2lkIiwib2YiLCJmaW5kIiwicGFyZW50IiwiZmV0Y2giLCJkaXNwYXRjaCIsInBheWxvYWQiLCJkYXRhIiwiQ1JFQVRFIiwiY29udGVudCIsInRyaW0iLCJsZW5ndGgiLCJQcm9taXNlIiwicmVqZWN0IiwidXNlciIsImN1cnJlbnQiLCJjb21tZW50IiwidGh1bWJuYWlsIiwidXBzZXJ0IiwidGhlbiIsImEiLCJyZWR1Y2VyIiwic3RhdGUiLCJDb21tZW50VUkiLCJwcm9wcyIsInBhcmFtcyIsInRlbXBsYXRlIiwiaGVpZ2h0IiwiY29udGV4dCIsIm11aVRoZW1lIiwicGFnZSIsInJlZkNvbW1lbnQiLCJtaW5IZWlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtYXAiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwiYWN0aW9uIiwibGFiZWwiLCJvblNlbGVjdCIsInZhbHVlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwibmFtZSIsImxlZnQiLCJyaWdodCIsInRleHQiLCJpc093bmVyIiwiYXV0aG9yIiwiZm9udFNpemUiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0xlZnQiLCJtYXJnaW5Cb3R0b20iLCJwYWRkaW5nUmlnaHQiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBTyxTQUFiO0FBQ0EsSUFBTUMsU0FBTztBQUNUQyxXQUFPLGVBQUNDLElBQUQsRUFBTUMsR0FBTjtBQUFBLGVBQVk7QUFBQSxtQkFBVSxrQkFBUUMsRUFBUixDQUFXRixJQUFYLEVBQWlCRyxJQUFqQixDQUFzQixFQUFDQyxRQUFPSCxHQUFSLEVBQXRCLEVB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QkFBTSxvREFBUSxLQUFLN0IsUUFBUUMsU0FBckIsR0FBTjtBQUNBNkIsb0JBQU8sMkNBQVA7QUFDQTs7QUFFRCxlQUNDO0FBQUE7QUFBQTtBQUNDLHFCQUFLOUIsUUFBUWhCLEdBRGQ7QUFFQyx1QkFBTyxFQUFDbUQsWUFBVyxFQUFaLEVBQWVDLGFBQVksRUFBM0IsRUFBK0JDLGNBQWEsRUFBNUMsRUFGUjtBQUdDLDRCQUFZUixJQUhiO0FBSUMsNkJBQWFDLEtBSmQ7QUFLQywwQkFBVSxJQUxYO0FBTUVGLGdCQU5GO0FBUUM7QUFBQTtBQUFBLGtCQUFLLE9BQU8sRUFBQ1UsY0FBYSxDQUFkLEVBQVo7QUFDQztBQUFBO0FBQUEsc0JBQUcseUJBQXNCTixVQUFRLE9BQVIsR0FBZ0IsRUFBdEMsQ0FBSDtBQUNDO0FBQUE7QUFBQTtBQUFPaEMsZ0NBQVFQO0FBQWY7QUFERDtBQUREO0FBUkQsU0FERDtBQWdCQTtBQTdCcUIsQztrQkFpQ1Q4QyxPQUFPQyxNQUFQLENBQWMseUJBQVE7QUFBQSxXQUFPbEMsTUFBTU4sT0FBYjtBQUFBLENBQVIsRUFBOEJPLFNBQTlCLENBQWQsRUFBdUQsRUFBQ0YsZ0JBQUQsRUFBdkQsQyIsImZpbGUiOiJjb21tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0F2YXRhciwgTGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7Y3lhbjUwIGFzIGJnfSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXG5cbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vZGIvc2VydmljZSdcbmltcG9ydCBDb21tYW5kQmFyIGZyb20gJy4vY29tbWFuZC1iYXInXG5pbXBvcnQgVXNlciBmcm9tICcuLi9kYi91c2VyJ1xuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vZGIvY29tbWVudCdcblxuY29uc3QgRE9NQUlOPVwiQ09NTUVOVFwiXG5jb25zdCBBQ1RJT049e1xuICAgIEZFVENIOiAodHlwZSxfaWQpPT5kaXNwYXRjaD0+Q29tbWVudC5vZih0eXBlKS5maW5kKHtwYXJlbnQ6X2lkfSlcbiAgICAgICAgICAgIC5mZXRjaChkYXRhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAscGF5bG9hZDp7ZGF0YSx0eXBlLF9pZH19KSlcblxuICAgICxDUkVBVEU6ICh0eXBlLF9pZCxjb250ZW50KT0+ZGlzcGF0Y2g9Pntcblx0XHRjb250ZW50PWNvbnRlbnQudHJpbSgpXG5cdFx0aWYoY29udGVudC5sZW5ndGg8Milcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpXG5cdFx0XG4gICAgICAgIGNvbnN0IHVzZXI9VXNlci5jdXJyZW50XG4gICAgICAgIGNvbnN0IGNvbW1lbnQ9e1xuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgcGFyZW50Ol9pZCxcbiAgICAgICAgICAgICAgICB0aHVtYm5haWw6dXNlci50aHVtYm5haWwsXG4gICAgICAgICAgICAgICAgY29udGVudDpjb250ZW50XG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb21tZW50Lm9mKHR5cGUpLnVwc2VydChjb21tZW50KVxuICAgICAgICAgICAgLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2NyZWF0ZWRgLHBheWxvYWQ6YX0pKVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPXt9LCB7dHlwZSwgcGF5bG9hZH0pPT57XG4gICAgc3dpdGNoKHR5cGUpe1xuICAgIGNhc2UgYEBAJHtET01BSU59L0NMRUFSYDpcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XG4gICAgICAgIHJldHVybiB7Li4uc3RhdGUsIC4uLnBheWxvYWR9XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XG4gICAgICAgIHJldHVybiB7Li4uc3RhdGUsIGRhdGE6Wy4uLihzdGF0ZS5kYXRhfHxbXSkscGF5bG9hZF19XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY2xhc3MgQ29tbWVudFVJIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIGNvbnN0IHtkaXNwYXRjaCxwYXJhbXM6e3R5cGUsX2lkfX09dGhpcy5wcm9wc1xuICAgICAgICBkaXNwYXRjaChBQ1RJT04uRkVUQ0godHlwZSxfaWQpKVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9DTEVBUmB9KVxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2RhdGE9W10sdGVtcGxhdGUsZGlzcGF0Y2gscGFyYW1zOnt0eXBlLF9pZH19PXRoaXMucHJvcHNcblx0XHRjb25zdCB7bXVpVGhlbWU6e3BhZ2U6IHtoZWlnaHR9fX09dGhpcy5jb250ZXh0XG4gICAgICAgIGxldCByZWZDb21tZW50XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiIHN0eWxlPXt7bWluSGVpZ2h0OmhlaWdodCwgYmFja2dyb3VuZENvbG9yOmJnfX0+XG4gICAgICAgICAgICAgICAgPExpc3Q+XG4gICAgICAgICAgICAgICAgICAgIHtkYXRhLm1hcChhPT5SZWFjdC5jcmVhdGVFbGVtZW50KHRlbXBsYXRlLCB7Y29tbWVudDphLGtleTphLl9pZH0pKX1cbiAgICAgICAgICAgICAgICA8L0xpc3Q+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyIGNlbnRlcmlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcblx0XHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIiwgbGFiZWw6XCIuXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8dGV4dGFyZWEgcmVmPXthPT5yZWZDb21tZW50PWF9IHBsYWNlaG9sZGVyPVwi6K+05Lik5Y+lXCIvPiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlNhdmVcIiwgbGFiZWw6XCLlj5HluINcIiwgb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh0eXBlLF9pZCwgcmVmQ29tbWVudC52YWx1ZSkpLnRoZW4oYT0+cmVmQ29tbWVudC52YWx1ZT1cIlwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgXHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXHRcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0bXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XG4gICAgICAgIHRlbXBsYXRlOiAoe2NvbW1lbnR9KT0+e1xuXHRcdFx0bGV0IG5hbWUsIGxlZnQsIHJpZ2h0LCB0ZXh0XG5cdFx0XHRjb25zdCBpc093bmVyPWNvbW1lbnQuYXV0aG9yLl9pZD09VXNlci5jdXJyZW50Ll9pZDtcblx0XHRcdGlmKGlzT3duZXIpe1xuXHRcdFx0XHRsZWZ0PSg8c3Bhbi8+KVxuXHRcdFx0XHRyaWdodD0oPEF2YXRhciBzcmM9e1VzZXIuY3VycmVudC50aHVtYm5haWx9Lz4pXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bmFtZT0oPHNwYW4gc3R5bGU9e3tmb250U2l6ZToneC1zbWFsbCd9fT57Y29tbWVudC5hdXRob3IubmFtZX08L3NwYW4+KVxuXHRcdFx0XHRsZWZ0PSg8QXZhdGFyIHNyYz17Y29tbWVudC50aHVtYm5haWx9Lz4pXG5cdFx0XHRcdHJpZ2h0PSg8c3Bhbi8+KVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8TGlzdEl0ZW1cblx0XHRcdFx0XHRrZXk9e2NvbW1lbnQuX2lkfVxuXHRcdFx0XHRcdHN0eWxlPXt7cGFkZGluZ1RvcDoxMCxwYWRkaW5nTGVmdDo2MiwgbWFyZ2luQm90dG9tOjMwfX1cblx0XHRcdFx0XHRsZWZ0QXZhdGFyPXtsZWZ0fVxuXHRcdFx0XHRcdHJpZ2h0QXZhdGFyPXtyaWdodH1cblx0XHRcdFx0XHRkaXNhYmxlZD17dHJ1ZX0+XG5cdFx0XHRcdFx0e25hbWV9XG5cblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZ1JpZ2h0OjV9fT5cblx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT17YGNvbnRlbnQgJHtpc093bmVyP1wib3duZXJcIjpcIlwifWB9PlxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj57Y29tbWVudC5jb250ZW50fTwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9MaXN0SXRlbT5cblx0XHRcdClcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihjb25uZWN0KHN0YXRlPT5zdGF0ZS5jb21tZW50KShDb21tZW50VUkpLHtyZWR1Y2VyfSlcbiJdfQ==