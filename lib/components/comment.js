"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommentUI = exports.REDUCER = exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

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

var CommentUI = exports.CommentUI = (0, _reactRedux.connect)()(function (_Component) {
    _inherits(_class, _Component);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
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

    return _class;
}(_react.Component));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiSU5JVF9TVEFURSIsIkFDVElPTiIsIkZFVENIIiwidHlwZSIsIl9pZCIsIm9mIiwiZmluZCIsInBhcmVudCIsImZldGNoIiwiZGlzcGF0Y2giLCJkYXRhIiwiQ1JFQVRFIiwiY29udGVudCIsInVzZXIiLCJjdXJyZW50IiwiY29tbWVudCIsInRodW1ibmFpbCIsInVwc2VydCIsInRoZW4iLCJwYXlsb2FkIiwiYSIsIlJFRFVDRVIiLCJzdGF0ZSIsIkFycmF5IiwiQ29tbWVudFVJIiwicHJvcHMiLCJwYXJhbXMiLCJ0ZW1wbGF0ZSIsInJlZkNvbW1lbnQiLCJtYXBzIiwiYWN0aW9uIiwib25TZWxlY3QiLCJlIiwidmFsdWUiLCJ0cmltIiwiZGVmYXVsdFByb3BzIiwibW9kZWwiLCJuYW1lIiwibGVmdCIsInJpZ2h0IiwidGV4dCIsImlzT3duZXIiLCJhdXRob3IiLCJmb250U2l6ZSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFPLFNBQWI7QUFDQSxJQUFNQyxhQUFXLEVBQWpCO0FBQ08sSUFBTUMsMEJBQU87QUFDaEJDLFdBQU8sZUFBQ0MsSUFBRCxFQUFNQyxHQUFOO0FBQUEsZUFBWTtBQUFBLG1CQUFVLGtCQUFRQyxFQUFSLENBQVdGLElBQVgsRUFBaUJHLElBQWpCLENBQXNCLEVBQUNDLFFBQU9ILEdBQVIsRUFBdEIsRUFDcEJJLEtBRG9CLENBQ2Q7QUFBQTs7QUFBQSx1QkFBTUMsd0JBQVVOLGFBQVVKLE1BQVYsYUFBVixFQUFxQ1csVUFBckMsdUNBQTBDUCxJQUExQyxxQ0FBK0NDLEdBQS9DLGNBQU47QUFBQSxhQURj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O0FBQUE7QUFBQSxrQkFBSyxPQUFPLEVBQUNTLGNBQWEsQ0FBZCxFQUFaO0FBQ0k7QUFBQTtBQUFBLHNCQUFHLHlCQUFzQkwsVUFBUSxPQUFSLEdBQWdCLEVBQXRDLENBQUg7QUFDSTtBQUFBO0FBQUE7QUFBT0wsOEJBQU14QjtBQUFiO0FBREo7QUFESjtBQVJKLFNBREo7QUFnQkg7QUE3QmtCLENBQXZCOztrQkFnQ2VtQyxPQUFPQyxNQUFQLENBQWN4QixTQUFkLEVBQXdCLEVBQUN2QixjQUFELEVBQVFvQixnQkFBUixFQUF4QixDIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0F2YXRhciwgTGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vZGIvc2VydmljZSdcbmltcG9ydCBDb21tYW5kQmFyIGZyb20gJy4vY29tbWFuZC1iYXInXG5pbXBvcnQgVXNlciBmcm9tICcuLi9kYi91c2VyJ1xuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vZGIvY29tbWVudCdcblxuY29uc3QgRE9NQUlOPVwiQ09NTUVOVFwiXG5jb25zdCBJTklUX1NUQVRFPXt9XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcbiAgICBGRVRDSDogKHR5cGUsX2lkKT0+ZGlzcGF0Y2g9PkNvbW1lbnQub2YodHlwZSkuZmluZCh7cGFyZW50Ol9pZH0pXG4gICAgICAgICAgICAuZmV0Y2goZGF0YT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLGRhdGEsdHlwZSxfaWR9KSlcblxuICAgICxDUkVBVEU6ICh0eXBlLF9pZCxjb250ZW50KT0+ZGlhcGF0Y2g9PntcbiAgICAgICAgY29uc3QgdXNlcj1Vc2VyLmN1cnJlbnRcbiAgICAgICAgY29uc3QgY29tbWVudD17XG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6X2lkLFxuICAgICAgICAgICAgICAgIHRodW1ibmFpbDp1c2VyLnRodW1ibmFpbCxcbiAgICAgICAgICAgICAgICBjb250ZW50OmNvbnRlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENvbW1lbnQub2YodHlwZSkudXBzZXJ0KGNvbW1lbnQpXG4gICAgICAgICAgICAudGhlbihhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGAscGF5bG9hZDphfSkpXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSwge3R5cGUsIHBheWxvYWR9KT0+e1xuICAgIHN3aXRjaCh0eXBlKXtcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XG4gICAgICAgIHJldHVybiBJTklUX1NUQVRFXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XG4gICAgICAgIHJldHVybiBwYXlsb2FkXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XG4gICAgICAgIGNvbnN0IHt0eXBlLF9pZCxkYXRhfT1zdGF0ZVxuICAgICAgICByZXR1cm4ge3R5cGUsX2lkLCBkYXRhOm5ldyBBcnJheSguLi5kYXRhLHBheWxvYWQpfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IENvbW1lbnRVST1jb25uZWN0KCkoXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBjb25zdCB7ZGlzcGF0Y2gscGFyYW1zOnt0eXBlLF9pZH19PXRoaXMucHJvcHNcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHR5cGUsX2lkKSlcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtkYXRhLHRlbXBsYXRlLGRpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXG4gICAgICAgIGxldCByZWZDb21tZW50XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiPlxuICAgICAgICAgICAgICAgIDxMaXN0PlxuICAgICAgICAgICAgICAgICAgICB7ZGF0YS5tYXBzKGE9Pjx0ZW1wbGF0ZSBtb2RlbD17YX0ga2V5PXthLl9pZH0vPil9XG4gICAgICAgICAgICAgICAgPC9MaXN0PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJCYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDx0ZXh0YXJlYSByZWY9e2E9PnJlZkNvbW1lbnQ9YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJnaXZlIHNvbWUgY29tbWVudDoxNDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezE0MH0vPiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlNhdmVcIiwgb25TZWxlY3Q6ZT0+KGU9cmVmQ29tbWVudC52YWx1ZS50cmltKCkpJiZkaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHR5cGUsX2lkLCBlKSkudGhlbihhPT5yZWZDb21tZW50LnZhbHVlPVwiXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICBcdFx0PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59KVxuXG5Db21tZW50VUkuZGVmYXVsdFByb3BzPXtcbiAgICB0ZW1wbGF0ZTogKHttb2RlbH0pPT57XG4gICAgICAgIGxldCBuYW1lLCBsZWZ0LCByaWdodCwgdGV4dFxuICAgICAgICBjb25zdCBpc093bmVyPW1vZGVsLmF1dGhvci5faWQ9PVVzZXIuY3VycmVudC5faWQ7XG4gICAgICAgIGlmKGlzT3duZXIpe1xuICAgICAgICAgICAgbGVmdD0oPHNwYW4vPilcbiAgICAgICAgICAgIHJpZ2h0PSg8QXZhdGFyIHNyYz17VXNlci5jdXJyZW50LnRodW1ibmFpbH0vPilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319Pnttb2RlbC5hdXRob3IubmFtZX08L3NwYW4+KVxuICAgICAgICAgICAgbGVmdD0oPEF2YXRhciBzcmM9e21vZGVsLnRodW1ibmFpbH0vPilcbiAgICAgICAgICAgIHJpZ2h0PSg8c3Bhbi8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMaXN0SXRlbVxuICAgICAgICAgICAgICAgIGtleT17bW9kZWwuX2lkfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZ1RvcDoxMCxwYWRkaW5nTGVmdDo2Mn19XG4gICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17bGVmdH1cbiAgICAgICAgICAgICAgICByaWdodEF2YXRhcj17cmlnaHR9XG4gICAgICAgICAgICAgICAgZGlzYWJsZVRvdWNoVGFwPXt0cnVlfT5cbiAgICAgICAgICAgICAgICB7bmFtZX1cblxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twYWRkaW5nUmlnaHQ6NX19PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2Bjb250ZW50ICR7aXNPd25lcj9cIm93bmVyXCI6XCJcIn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnttb2RlbC5jb250ZW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9MaXN0SXRlbT5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihDb21tZW50VUkse0FDVElPTixSRURVQ0VSfSlcbiJdfQ==