"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommentUI = exports.REDUCER = exports.ACTION = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var DOMAIN = "COMMENT";
var INIT_STATE = {};
var ACTION = exports.ACTION = {
    FETCH: function FETCH(type, _id) {
        return function (dispatch) {
            return _comment2.default.of(type).find({ parent: _id }).fetch(function (data) {
                var _dispatch;

                return dispatch((_dispatch = { type: "@@" + DOMAIN + "/fetched", data: data }, (0, _defineProperty3.default)(_dispatch, "type", type), (0, _defineProperty3.default)(_dispatch, "_id", _id), _dispatch));
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
    var type = _ref.type,
        payload = _ref.payload;

    switch (_type) {
        case "@@" + DOMAIN + "/CLEAR":
            return INIT_STATE;
        case "@@" + DOMAIN + "/fetched":
            return payload;
        case "@@" + DOMAIN + "/created":
            var _type = state.type,
                _id = state._id,
                data = state.data;

            return { type: _type, _id: _id, data: new (Function.prototype.bind.apply(Array, [null].concat((0, _toConsumableArray3.default)(data), [payload])))() };
    }
    return state;
};

var CommentUI = exports.CommentUI = function (_Component) {
    (0, _inherits3.default)(CommentUI, _Component);

    function CommentUI() {
        (0, _classCallCheck3.default)(this, CommentUI);
        return (0, _possibleConstructorReturn3.default)(this, (CommentUI.__proto__ || (0, _getPrototypeOf2.default)(CommentUI)).apply(this, arguments));
    }

    (0, _createClass3.default)(CommentUI, [{
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
                data = _props2.data,
                template = _props2.template,
                dispatch = _props2.dispatch,
                _props2$params = _props2.params,
                type = _props2$params.type,
                _id = _props2$params._id;

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
exports.default = (0, _assign2.default)(CommentUI, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiSU5JVF9TVEFURSIsIkFDVElPTiIsIkZFVENIIiwidHlwZSIsIl9pZCIsIm9mIiwiZmluZCIsInBhcmVudCIsImZldGNoIiwiZGlzcGF0Y2giLCJkYXRhIiwiQ1JFQVRFIiwiY29udGVudCIsInVzZXIiLCJjdXJyZW50IiwiY29tbWVudCIsInRodW1ibmFpbCIsInVwc2VydCIsInRoZW4iLCJwYXlsb2FkIiwiYSIsIlJFRFVDRVIiLCJzdGF0ZSIsIkFycmF5IiwiQ29tbWVudFVJIiwicHJvcHMiLCJwYXJhbXMiLCJ0ZW1wbGF0ZSIsInJlZkNvbW1lbnQiLCJtYXBzIiwiYWN0aW9uIiwib25TZWxlY3QiLCJlIiwidmFsdWUiLCJ0cmltIiwiZGVmYXVsdFByb3BzIiwibW9kZWwiLCJuYW1lIiwibGVmdCIsInJpZ2h0IiwidGV4dCIsImlzT3duZXIiLCJhdXRob3IiLCJmb250U2l6ZSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFNBQU8sU0FBYjtBQUNBLElBQU1DLGFBQVcsRUFBakI7QUFDTyxJQUFNQywwQkFBTztBQUNoQkMsV0FBTyxlQUFDQyxJQUFELEVBQU1DLEdBQU47QUFBQSxlQUFZO0FBQUEsbUJBQVUsa0JBQVFDLEVBQVIsQ0FBV0YsSUFBWCxFQUFpQkcsSUFBakIsQ0FBc0IsRUFBQ0MsUUFBT0gsR0FBUixFQUF0QixFQUNwQkksS0FEb0IsQ0FDZDtBQUFBOztBQUFBLHVCQUFNQyx3QkFBVU4sYUFBVUosTUFBVixhQUFWLEVBQXFDVyxVQUFyQyxxREFBMENQLElBQTFDLG1EQUErQ0MsR0FBL0MsY0FBTjtBQUFBLGFBRGMsQ0FB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QUF0QyxDQUFIO0FBQ0k7QUFBQTtBQUFBO0FBQU9MLDhCQUFNeEI7QUFBYjtBQURKO0FBREo7QUFSSixTQURKO0FBZ0JIO0FBN0JlLEM7a0JBa0NULHNCQUFjWSxTQUFkLEVBQXdCLEVBQUN2QixjQUFELEVBQVFvQixnQkFBUixFQUF4QixDIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0F2YXRhciwgTGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXG5cbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vZGIvc2VydmljZSdcbmltcG9ydCBDb21tYW5kQmFyIGZyb20gJy4vY29tbWFuZC1iYXInXG5pbXBvcnQgVXNlciBmcm9tICcuLi9kYi91c2VyJ1xuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vZGIvY29tbWVudCdcblxuY29uc3QgRE9NQUlOPVwiQ09NTUVOVFwiXG5jb25zdCBJTklUX1NUQVRFPXt9XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcbiAgICBGRVRDSDogKHR5cGUsX2lkKT0+ZGlzcGF0Y2g9PkNvbW1lbnQub2YodHlwZSkuZmluZCh7cGFyZW50Ol9pZH0pXG4gICAgICAgICAgICAuZmV0Y2goZGF0YT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLGRhdGEsdHlwZSxfaWR9KSlcblxuICAgICxDUkVBVEU6ICh0eXBlLF9pZCxjb250ZW50KT0+ZGlhcGF0Y2g9PntcbiAgICAgICAgY29uc3QgdXNlcj1Vc2VyLmN1cnJlbnRcbiAgICAgICAgY29uc3QgY29tbWVudD17XG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6X2lkLFxuICAgICAgICAgICAgICAgIHRodW1ibmFpbDp1c2VyLnRodW1ibmFpbCxcbiAgICAgICAgICAgICAgICBjb250ZW50OmNvbnRlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENvbW1lbnQub2YodHlwZSkudXBzZXJ0KGNvbW1lbnQpXG4gICAgICAgICAgICAudGhlbihhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGAscGF5bG9hZDphfSkpXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSwge3R5cGUsIHBheWxvYWR9KT0+e1xuICAgIHN3aXRjaCh0eXBlKXtcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XG4gICAgICAgIHJldHVybiBJTklUX1NUQVRFXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XG4gICAgICAgIHJldHVybiBwYXlsb2FkXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XG4gICAgICAgIGNvbnN0IHt0eXBlLF9pZCxkYXRhfT1zdGF0ZVxuICAgICAgICByZXR1cm4ge3R5cGUsX2lkLCBkYXRhOm5ldyBBcnJheSguLi5kYXRhLHBheWxvYWQpfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIENvbW1lbnRVSSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBjb25zdCB7ZGlzcGF0Y2gscGFyYW1zOnt0eXBlLF9pZH19PXRoaXMucHJvcHNcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHR5cGUsX2lkKSlcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtkYXRhLHRlbXBsYXRlLGRpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXG4gICAgICAgIGxldCByZWZDb21tZW50XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiPlxuICAgICAgICAgICAgICAgIDxMaXN0PlxuICAgICAgICAgICAgICAgICAgICB7ZGF0YS5tYXBzKGE9Pjx0ZW1wbGF0ZSBtb2RlbD17YX0ga2V5PXthLl9pZH0vPil9XG4gICAgICAgICAgICAgICAgPC9MaXN0PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJCYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDx0ZXh0YXJlYSByZWY9e2E9PnJlZkNvbW1lbnQ9YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJnaXZlIHNvbWUgY29tbWVudDoxNDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezE0MH0vPiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlNhdmVcIiwgb25TZWxlY3Q6ZT0+KGU9cmVmQ29tbWVudC52YWx1ZS50cmltKCkpJiZkaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHR5cGUsX2lkLCBlKSkudGhlbihhPT5yZWZDb21tZW50LnZhbHVlPVwiXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICBcdFx0PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzPXtcbiAgICAgICAgdGVtcGxhdGU6ICh7bW9kZWx9KT0+e1xuICAgICAgICAgICAgbGV0IG5hbWUsIGxlZnQsIHJpZ2h0LCB0ZXh0XG4gICAgICAgICAgICBjb25zdCBpc093bmVyPW1vZGVsLmF1dGhvci5faWQ9PVVzZXIuY3VycmVudC5faWQ7XG4gICAgICAgICAgICBpZihpc093bmVyKXtcbiAgICAgICAgICAgICAgICBsZWZ0PSg8c3Bhbi8+KVxuICAgICAgICAgICAgICAgIHJpZ2h0PSg8QXZhdGFyIHNyYz17VXNlci5jdXJyZW50LnRodW1ibmFpbH0vPilcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG5hbWU9KDxzcGFuIHN0eWxlPXt7Zm9udFNpemU6J3gtc21hbGwnfX0+e21vZGVsLmF1dGhvci5uYW1lfTwvc3Bhbj4pXG4gICAgICAgICAgICAgICAgbGVmdD0oPEF2YXRhciBzcmM9e21vZGVsLnRodW1ibmFpbH0vPilcbiAgICAgICAgICAgICAgICByaWdodD0oPHNwYW4vPilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8TGlzdEl0ZW1cbiAgICAgICAgICAgICAgICAgICAga2V5PXttb2RlbC5faWR9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZ1RvcDoxMCxwYWRkaW5nTGVmdDo2Mn19XG4gICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9e2xlZnR9XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0QXZhdGFyPXtyaWdodH1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVRvdWNoVGFwPXt0cnVlfT5cbiAgICAgICAgICAgICAgICAgICAge25hbWV9XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3BhZGRpbmdSaWdodDo1fX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2Bjb250ZW50ICR7aXNPd25lcj9cIm93bmVyXCI6XCJcIn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bW9kZWwuY29udGVudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW0+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQ29tbWVudFVJLHtBQ1RJT04sUkVEVUNFUn0pXG4iXX0=