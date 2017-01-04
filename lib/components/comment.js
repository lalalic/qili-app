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
                        }, placeholder: "\u8BF4\u4E24\u53E5" }), {
                        action: "Save",
                        label: "发布",
                        onSelect: function onSelect(e) {
                            return dispatch(ACTION.CREATE(type, _id, refComment.value));
                        }
                    }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJ0eXBlIiwiX2lkIiwib2YiLCJmaW5kIiwicGFyZW50IiwiZmV0Y2giLCJkaXNwYXRjaCIsInBheWxvYWQiLCJkYXRhIiwiQ1JFQVRFIiwiY29udGVudCIsInRyaW0iLCJsZW5ndGgiLCJQcm9taXNlIiwicmVqZWN0IiwidXNlciIsImN1cnJlbnQiLCJjb21tZW50IiwidGh1bWJuYWlsIiwidXBzZXJ0IiwidGhlbiIsImEiLCJyZWR1Y2VyIiwic3RhdGUiLCJDb21tZW50VUkiLCJwcm9wcyIsInBhcmFtcyIsInRlbXBsYXRlIiwiaGVpZ2h0IiwiY29udGV4dCIsIm11aVRoZW1lIiwicGFnZSIsInJlZkNvbW1lbnQiLCJtaW5IZWlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtYXAiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwiYWN0aW9uIiwibGFiZWwiLCJvblNlbGVjdCIsInZhbHVlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwibmFtZSIsImxlZnQiLCJyaWdodCIsInRleHQiLCJpc093bmVyIiwiYXV0aG9yIiwiZm9udFNpemUiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0xlZnQiLCJtYXJnaW5Cb3R0b20iLCJwYWRkaW5nUmlnaHQiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBTyxTQUFiO0FBQ0EsSUFBTUMsU0FBTztBQUNUQyxXQUFPLGVBQUNDLElBQUQsRUFBTUMsR0FBTjtBQUFBLGVBQVk7QUFBQSxtQkFBVSxrQkFBUUMsRUFBUixDQUFXRixJQUFYLEVBQWlCRyxJQUFqQixDQUFzQixFQUFDQyxRQUFPSCxHQUFSLEVBQXRCLEVB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ZUFDQztBQUFBO0FBQUE7QUFDQyxxQkFBSzlCLFFBQVFoQixHQURkO0FBRUMsdUJBQU8sRUFBQ21ELFlBQVcsRUFBWixFQUFlQyxhQUFZLEVBQTNCLEVBQStCQyxjQUFhLEVBQTVDLEVBRlI7QUFHQyw0QkFBWVIsSUFIYjtBQUlDLDZCQUFhQyxLQUpkO0FBS0MsMEJBQVUsSUFMWDtBQU1FRixnQkFORjtBQVFDO0FBQUE7QUFBQSxrQkFBSyxPQUFPLEVBQUNVLGNBQWEsQ0FBZCxFQUFaO0FBQ0M7QUFBQTtBQUFBLHNCQUFHLHlCQUFzQk4sVUFBUSxPQUFSLEdBQWdCLEVBQXRDLENBQUg7QUFDQztBQUFBO0FBQUE7QUFBT2hDLGdDQUFRUDtBQUFmO0FBREQ7QUFERDtBQVJELFNBREQ7QUFnQkE7QUE3QnFCLEM7a0JBaUNUOEMsT0FBT0MsTUFBUCxDQUFjLHlCQUFRO0FBQUEsV0FBT2xDLE1BQU1OLE9BQWI7QUFBQSxDQUFSLEVBQThCTyxTQUE5QixDQUFkLEVBQXVELEVBQUNGLGdCQUFELEVBQXZELEMiLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtBdmF0YXIsIExpc3QsIExpc3RJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQge2N5YW41MCBhcyBiZ30gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxuXG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4uL2RiL3NlcnZpY2UnXG5pbXBvcnQgQ29tbWFuZEJhciBmcm9tICcuL2NvbW1hbmQtYmFyJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vZGIvdXNlcidcbmltcG9ydCBDb21tZW50IGZyb20gJy4uL2RiL2NvbW1lbnQnXG5cbmNvbnN0IERPTUFJTj1cIkNPTU1FTlRcIlxuY29uc3QgQUNUSU9OPXtcbiAgICBGRVRDSDogKHR5cGUsX2lkKT0+ZGlzcGF0Y2g9PkNvbW1lbnQub2YodHlwZSkuZmluZCh7cGFyZW50Ol9pZH0pXG4gICAgICAgICAgICAuZmV0Y2goZGF0YT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLHBheWxvYWQ6e2RhdGEsdHlwZSxfaWR9fSkpXG5cbiAgICAsQ1JFQVRFOiAodHlwZSxfaWQsY29udGVudCk9PmRpc3BhdGNoPT57XG5cdFx0Y29udGVudD1jb250ZW50LnRyaW0oKVxuXHRcdGlmKGNvbnRlbnQubGVuZ3RoPDIpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxuXHRcdFxuICAgICAgICBjb25zdCB1c2VyPVVzZXIuY3VycmVudFxuICAgICAgICBjb25zdCBjb21tZW50PXtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHBhcmVudDpfaWQsXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsOnVzZXIudGh1bWJuYWlsLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6Y29udGVudFxuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29tbWVudC5vZih0eXBlKS51cHNlcnQoY29tbWVudClcbiAgICAgICAgICAgIC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9jcmVhdGVkYCxwYXlsb2FkOmF9KSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17fSwge3R5cGUsIHBheWxvYWR9KT0+e1xuICAgIHN3aXRjaCh0eXBlKXtcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XG4gICAgICAgIHJldHVybiB7fVxuICAgIGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRgOlxuICAgICAgICByZXR1cm4gey4uLnN0YXRlLCAuLi5wYXlsb2FkfVxuICAgIGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxuICAgICAgICByZXR1cm4gey4uLnN0YXRlLCBkYXRhOlsuLi4oc3RhdGUuZGF0YXx8W10pLHBheWxvYWRdfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIENvbW1lbnRVSSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBjb25zdCB7ZGlzcGF0Y2gscGFyYW1zOnt0eXBlLF9pZH19PXRoaXMucHJvcHNcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHR5cGUsX2lkKSlcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtkYXRhPVtdLHRlbXBsYXRlLGRpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge211aVRoZW1lOntwYWdlOiB7aGVpZ2h0fX19PXRoaXMuY29udGV4dFxuICAgICAgICBsZXQgcmVmQ29tbWVudFxuXHRcdHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1lbnRcIiBzdHlsZT17e21pbkhlaWdodDpoZWlnaHQsIGJhY2tncm91bmRDb2xvcjpiZ319PlxuICAgICAgICAgICAgICAgIDxMaXN0PlxuICAgICAgICAgICAgICAgICAgICB7ZGF0YS5tYXAoYT0+UmVhY3QuY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSwge2NvbW1lbnQ6YSxrZXk6YS5faWR9KSl9XG4gICAgICAgICAgICAgICAgPC9MaXN0PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCIsIGxhYmVsOlwiLlwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPHRleHRhcmVhIHJlZj17YT0+cmVmQ29tbWVudD1hfSBwbGFjZWhvbGRlcj1cIuivtOS4pOWPpVwiLz4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcblx0XHRcdFx0XHRcdFx0XHRhY3Rpb246XCJTYXZlXCIsIFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOlwi5Y+R5biDXCIsIFxuXHRcdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsIHJlZkNvbW1lbnQudmFsdWUpKVxuXHRcdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgIFx0XHQ8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuICAgICAgICB0ZW1wbGF0ZTogKHtjb21tZW50fSk9Pntcblx0XHRcdGxldCBuYW1lLCBsZWZ0LCByaWdodCwgdGV4dFxuXHRcdFx0Y29uc3QgaXNPd25lcj1jb21tZW50LmF1dGhvci5faWQ9PVVzZXIuY3VycmVudC5faWQ7XG5cdFx0XHRpZihpc093bmVyKXtcblx0XHRcdFx0bGVmdD0oPHNwYW4vPilcblx0XHRcdFx0cmlnaHQ9KDxBdmF0YXIgc3JjPXtVc2VyLmN1cnJlbnQudGh1bWJuYWlsfS8+KVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdG5hbWU9KDxzcGFuIHN0eWxlPXt7Zm9udFNpemU6J3gtc21hbGwnfX0+e2NvbW1lbnQuYXV0aG9yLm5hbWV9PC9zcGFuPilcblx0XHRcdFx0bGVmdD0oPEF2YXRhciBzcmM9e2NvbW1lbnQudGh1bWJuYWlsfS8+KVxuXHRcdFx0XHRyaWdodD0oPHNwYW4vPilcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PExpc3RJdGVtXG5cdFx0XHRcdFx0a2V5PXtjb21tZW50Ll9pZH1cblx0XHRcdFx0XHRzdHlsZT17e3BhZGRpbmdUb3A6MTAscGFkZGluZ0xlZnQ6NjIsIG1hcmdpbkJvdHRvbTozMH19XG5cdFx0XHRcdFx0bGVmdEF2YXRhcj17bGVmdH1cblx0XHRcdFx0XHRyaWdodEF2YXRhcj17cmlnaHR9XG5cdFx0XHRcdFx0ZGlzYWJsZWQ9e3RydWV9PlxuXHRcdFx0XHRcdHtuYW1lfVxuXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmdSaWdodDo1fX0+XG5cdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9e2Bjb250ZW50ICR7aXNPd25lcj9cIm93bmVyXCI6XCJcIn1gfT5cblx0XHRcdFx0XHRcdFx0PHNwYW4+e2NvbW1lbnQuY29udGVudH08L3NwYW4+XG5cdFx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvTGlzdEl0ZW0+XG5cdFx0XHQpXG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdChzdGF0ZT0+c3RhdGUuY29tbWVudCkoQ29tbWVudFVJKSx7cmVkdWNlcn0pXG4iXX0=