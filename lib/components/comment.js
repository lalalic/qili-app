"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommentUI = exports.REDUCER = exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DOMAIN = "COMMENT";
var INIT_STATE = {};
var ACTION = exports.ACTION = {
    FETCH: function FETCH(type, _id) {
        return function (dispatch) {
            return _comment2.default.of(type).find({ parent: _id }).fetch(function (data) {
                var _dispatch;

                return dispatch((_dispatch = { type: "@@" + DOMAIN + "/fetched", data: data }, _defineProperty(_dispatch, "type", type), _defineProperty(_dispatch, "_id", _id), _dispatch));
            });
        };
    },

    CREATE: function CREATE(type, _id, content) {
        return function (diapatch) {
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

var REDUCER = exports.REDUCER = function REDUCER() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
    var _ref = arguments[1];
    var type = _ref.type;
    var payload = _ref.payload;

    switch (_type) {
        case "@@" + DOMAIN + "/CLEAR":
            return INIT_STATE;
        case "@@" + DOMAIN + "/fetched":
            return payload;
        case "@@" + DOMAIN + "/created":
            var _type = state.type;
            var _id = state._id;
            var data = state.data;

            return { type: _type, _id: _id, data: new (Function.prototype.bind.apply(Array, [null].concat(_toConsumableArray(data), [payload])))() };
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
            var _props = this.props;
            var dispatch = _props.dispatch;
            var _props$params = _props.params;
            var type = _props$params.type;
            var _id = _props$params._id;

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
            var _props2 = this.props;
            var data = _props2.data;
            var template = _props2.template;
            var dispatch = _props2.dispatch;
            var _props2$params = _props2.params;
            var type = _props2$params.type;
            var _id = _props2$params._id;

            var refComment = void 0;
            return _react2.default.createElement(
                "div",
                { className: "comment" },
                _react2.default.createElement(
                    _materialUi.List,
                    null,
                    data.maps(function (a) {
                        return _react2.default.createElement("template", { model: a, key: a._id });
                    })
                ),
                _react2.default.createElement(_commandBar2.default, {
                    className: "footbar centerinput",
                    items: ["Back", _react2.default.createElement("textarea", { ref: function ref(a) {
                            return refComment = a;
                        },
                        placeholder: "give some comment:140",
                        maxLength: 140 }), { action: "Save", onSelect: function onSelect(e) {
                            return (e = refComment.value.trim()) && dispatch(ACTION.CREATE(type, _id, e)).then(function (a) {
                                return refComment.value = "";
                            });
                        } }]
                })
            );
        }
    }]);

    return CommentUI;
}(_react.Component);

CommentUI.defaultProps = {
    template: function template(_ref2) {
        var model = _ref2.model;

        var name = void 0,
            left = void 0,
            right = void 0,
            text = void 0;
        var isOwner = model.author._id == _user2.default.current._id;
        if (isOwner) {
            left = _react2.default.createElement("span", null);
            right = _react2.default.createElement(_materialUi.Avatar, { src: _user2.default.current.thumbnail });
        } else {
            name = _react2.default.createElement(
                "span",
                { style: { fontSize: 'x-small' } },
                model.author.name
            );
            left = _react2.default.createElement(_materialUi.Avatar, { src: model.thumbnail });
            right = _react2.default.createElement("span", null);
        }

        return _react2.default.createElement(
            _materialUi.ListItem,
            {
                key: model._id,
                style: { paddingTop: 10, paddingLeft: 62 },
                leftAvatar: left,
                rightAvatar: right,
                disableTouchTap: true },
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
                        model.content
                    )
                )
            )
        );
    }
};
exports.default = Object.assign(CommentUI, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiSU5JVF9TVEFURSIsIkFDVElPTiIsIkZFVENIIiwidHlwZSIsIl9pZCIsIm9mIiwiZmluZCIsInBhcmVudCIsImZldGNoIiwiZGlzcGF0Y2giLCJkYXRhIiwiQ1JFQVRFIiwiY29udGVudCIsInVzZXIiLCJjdXJyZW50IiwiY29tbWVudCIsInRodW1ibmFpbCIsInVwc2VydCIsInRoZW4iLCJwYXlsb2FkIiwiYSIsIlJFRFVDRVIiLCJzdGF0ZSIsIkFycmF5IiwiQ29tbWVudFVJIiwicHJvcHMiLCJwYXJhbXMiLCJ0ZW1wbGF0ZSIsInJlZkNvbW1lbnQiLCJtYXBzIiwiYWN0aW9uIiwib25TZWxlY3QiLCJlIiwidmFsdWUiLCJ0cmltIiwiZGVmYXVsdFByb3BzIiwibW9kZWwiLCJuYW1lIiwibGVmdCIsInJpZ2h0IiwidGV4dCIsImlzT3duZXIiLCJhdXRob3IiLCJmb250U2l6ZSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFPLFNBQWI7QUFDQSxJQUFNQyxhQUFXLEVBQWpCO0FBQ08sSUFBTUMsMEJBQU87QUFDaEJDLFdBQU8sZUFBQ0MsSUFBRCxFQUFNQyxHQUFOO0FBQUEsZUFBWTtBQUFBLG1CQUFVLGtCQUFRQyxFQUFSLENBQVdGLElBQVgsRUFBaUJHLElBQWpCLENBQXNCLEVBQUNDLFFBQU9ILEdBQVIsRUFBdEIsRUFDcEJJLEtBRG9CLENBQ2Q7QUFBQTs7QUFBQSx1QkFBTUMsd0JBQVVOLGFBQVVKLE1BQVYsYUFBVixFQUFxQ1csVUFBckMsdUNBQTBDUCxJQUExQyxxQ0FBK0NDLEdBQS9DLGNBQU47QUFBQSxhQURjLENBQVY7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QUF0QyxDQUFIO0FBQ0k7QUFBQTtBQUFBO0FBQU9MLDhCQUFNeEI7QUFBYjtBQURKO0FBREo7QUFSSixTQURKO0FBZ0JIO0FBN0JlLEM7a0JBa0NUbUMsT0FBT0MsTUFBUCxDQUFjeEIsU0FBZCxFQUF3QixFQUFDdkIsY0FBRCxFQUFRb0IsZ0JBQVIsRUFBeEIsQyIsImZpbGUiOiJjb21tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtBdmF0YXIsIExpc3QsIExpc3RJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuXG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4uL2RiL3NlcnZpY2UnXG5pbXBvcnQgQ29tbWFuZEJhciBmcm9tICcuL2NvbW1hbmQtYmFyJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vZGIvdXNlcidcbmltcG9ydCBDb21tZW50IGZyb20gJy4uL2RiL2NvbW1lbnQnXG5cbmNvbnN0IERPTUFJTj1cIkNPTU1FTlRcIlxuY29uc3QgSU5JVF9TVEFURT17fVxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG4gICAgRkVUQ0g6ICh0eXBlLF9pZCk9PmRpc3BhdGNoPT5Db21tZW50Lm9mKHR5cGUpLmZpbmQoe3BhcmVudDpfaWR9KVxuICAgICAgICAgICAgLmZldGNoKGRhdGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxkYXRhLHR5cGUsX2lkfSkpXG5cbiAgICAsQ1JFQVRFOiAodHlwZSxfaWQsY29udGVudCk9PmRpYXBhdGNoPT57XG4gICAgICAgIGNvbnN0IHVzZXI9VXNlci5jdXJyZW50XG4gICAgICAgIGNvbnN0IGNvbW1lbnQ9e1xuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgcGFyZW50Ol9pZCxcbiAgICAgICAgICAgICAgICB0aHVtYm5haWw6dXNlci50aHVtYm5haWwsXG4gICAgICAgICAgICAgICAgY29udGVudDpjb250ZW50XG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb21tZW50Lm9mKHR5cGUpLnVwc2VydChjb21tZW50KVxuICAgICAgICAgICAgLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2NyZWF0ZWRgLHBheWxvYWQ6YX0pKVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUsIHt0eXBlLCBwYXlsb2FkfSk9PntcbiAgICBzd2l0Y2godHlwZSl7XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vQ0xFQVJgOlxuICAgICAgICByZXR1cm4gSU5JVF9TVEFURVxuICAgIGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRgOlxuICAgICAgICByZXR1cm4gcGF5bG9hZFxuICAgIGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxuICAgICAgICBjb25zdCB7dHlwZSxfaWQsZGF0YX09c3RhdGVcbiAgICAgICAgcmV0dXJuIHt0eXBlLF9pZCwgZGF0YTpuZXcgQXJyYXkoLi4uZGF0YSxwYXlsb2FkKX1cbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjbGFzcyBDb21tZW50VUkgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgY29uc3Qge2Rpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXG4gICAgICAgIGRpc3BhdGNoKEFDVElPTi5GRVRDSCh0eXBlLF9pZCkpXG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH0pXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7ZGF0YSx0ZW1wbGF0ZSxkaXNwYXRjaCxwYXJhbXM6e3R5cGUsX2lkfX09dGhpcy5wcm9wc1xuICAgICAgICBsZXQgcmVmQ29tbWVudFxuXHRcdHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1lbnRcIj5cbiAgICAgICAgICAgICAgICA8TGlzdD5cbiAgICAgICAgICAgICAgICAgICAge2RhdGEubWFwcyhhPT48dGVtcGxhdGUgbW9kZWw9e2F9IGtleT17YS5faWR9Lz4pfVxuICAgICAgICAgICAgICAgIDwvTGlzdD5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXIgY2VudGVyaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8dGV4dGFyZWEgcmVmPXthPT5yZWZDb21tZW50PWF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZ2l2ZSBzb21lIGNvbW1lbnQ6MTQwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsxNDB9Lz4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJTYXZlXCIsIG9uU2VsZWN0OmU9PihlPXJlZkNvbW1lbnQudmFsdWUudHJpbSgpKSYmZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh0eXBlLF9pZCwgZSkpLnRoZW4oYT0+cmVmQ29tbWVudC52YWx1ZT1cIlwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgXHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XG4gICAgICAgIHRlbXBsYXRlOiAoe21vZGVsfSk9PntcbiAgICAgICAgICAgIGxldCBuYW1lLCBsZWZ0LCByaWdodCwgdGV4dFxuICAgICAgICAgICAgY29uc3QgaXNPd25lcj1tb2RlbC5hdXRob3IuX2lkPT1Vc2VyLmN1cnJlbnQuX2lkO1xuICAgICAgICAgICAgaWYoaXNPd25lcil7XG4gICAgICAgICAgICAgICAgbGVmdD0oPHNwYW4vPilcbiAgICAgICAgICAgICAgICByaWdodD0oPEF2YXRhciBzcmM9e1VzZXIuY3VycmVudC50aHVtYm5haWx9Lz4pXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319Pnttb2RlbC5hdXRob3IubmFtZX08L3NwYW4+KVxuICAgICAgICAgICAgICAgIGxlZnQ9KDxBdmF0YXIgc3JjPXttb2RlbC50aHVtYm5haWx9Lz4pXG4gICAgICAgICAgICAgICAgcmlnaHQ9KDxzcGFuLz4pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPExpc3RJdGVtXG4gICAgICAgICAgICAgICAgICAgIGtleT17bW9kZWwuX2lkfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3BhZGRpbmdUb3A6MTAscGFkZGluZ0xlZnQ6NjJ9fVxuICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXtsZWZ0fVxuICAgICAgICAgICAgICAgICAgICByaWdodEF2YXRhcj17cmlnaHR9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVUb3VjaFRhcD17dHJ1ZX0+XG4gICAgICAgICAgICAgICAgICAgIHtuYW1lfVxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twYWRkaW5nUmlnaHQ6NX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgY29udGVudCAke2lzT3duZXI/XCJvd25lclwiOlwiXCJ9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e21vZGVsLmNvbnRlbnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cdH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKENvbW1lbnRVSSx7QUNUSU9OLFJFRFVDRVJ9KVxuIl19