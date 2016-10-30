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

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
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
});

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
                        return _react2.default.createElement("template", { model: a });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiSU5JVF9TVEFURSIsIkFDVElPTiIsIkZFVENIIiwidHlwZSIsIl9pZCIsIm9mIiwiZmluZCIsInBhcmVudCIsImZldGNoIiwiZGlzcGF0Y2giLCJkYXRhIiwiQ1JFQVRFIiwiY29udGVudCIsInVzZXIiLCJjdXJyZW50IiwiY29tbWVudCIsInRodW1ibmFpbCIsInVwc2VydCIsInRoZW4iLCJwYXlsb2FkIiwiYSIsIlJFRFVDRVIiLCJzdGF0ZSIsIkFycmF5IiwiQ29tbWVudFVJIiwicHJvcHMiLCJwYXJhbXMiLCJ0ZW1wbGF0ZSIsInJlZkNvbW1lbnQiLCJtYXBzIiwiYWN0aW9uIiwib25TZWxlY3QiLCJlIiwidmFsdWUiLCJ0cmltIiwiZGVmYXVsdFByb3BzIiwibW9kZWwiLCJuYW1lIiwibGVmdCIsInJpZ2h0IiwidGV4dCIsImlzT3duZXIiLCJhdXRob3IiLCJmb250U2l6ZSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFPLFNBQWI7QUFDQSxJQUFNQyxhQUFXLEVBQWpCO0FBQ08sSUFBTUMsMEJBQU87QUFDaEJDLFdBQU8sZUFBQ0MsSUFBRCxFQUFNQyxHQUFOO0FBQUEsZUFBWTtBQUFBLG1CQUFVLGtCQUFRQyxFQUFSLENBQVdGLElBQVgsRUFBaUJHLElBQWpCLENBQXNCLEVBQUNDLFFBQU9ILEdBQVIsRUFBdEIsRUFDcEJJLEtBRG9CLENBQ2Q7QUFBQTs7QUFBQSx1QkFBTUMsd0JBQVVOLGFBQVVKLE1BQVYsYUFBVixFQUFxQ1csVUFBckMsdUNBQTBDUCxJQUExQyxxQ0FBK0NDLEdBQS9DLGNBQU47QUFBQSxhQURj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QU8sRUFBQ1MsY0FBYSxDQUFkLEVBQVo7QUFDSTtBQUFBO0FBQUEsc0JBQUcseUJBQXNCTCxVQUFRLE9BQVIsR0FBZ0IsRUFBdEMsQ0FBSDtBQUNJO0FBQUE7QUFBQTtBQUFPTCw4QkFBTXhCO0FBQWI7QUFESjtBQURKO0FBUkosU0FESjtBQWdCSDtBQTdCa0IsQ0FBdkI7O2tCQWdDZW1DLE9BQU9DLE1BQVAsQ0FBY3hCLFNBQWQsRUFBd0IsRUFBQ3ZCLGNBQUQsRUFBUW9CLGdCQUFSLEVBQXhCLEMiLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7QXZhdGFyLCBMaXN0LCBMaXN0SXRlbX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuLi9kYi9zZXJ2aWNlJ1xuaW1wb3J0IENvbW1hbmRCYXIgZnJvbSAnLi9jb21tYW5kLWJhcidcbmltcG9ydCBVc2VyIGZyb20gJy4uL2RiL3VzZXInXG5pbXBvcnQgQ29tbWVudCBmcm9tICcuLi9kYi9jb21tZW50J1xuXG5jb25zdCBET01BSU49XCJDT01NRU5UXCJcbmNvbnN0IElOSVRfU1RBVEU9e31cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuICAgIEZFVENIOiAodHlwZSxfaWQpPT5kaXNwYXRjaD0+Q29tbWVudC5vZih0eXBlKS5maW5kKHtwYXJlbnQ6X2lkfSlcbiAgICAgICAgICAgIC5mZXRjaChkYXRhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAsZGF0YSx0eXBlLF9pZH0pKVxuXG4gICAgLENSRUFURTogKHR5cGUsX2lkLGNvbnRlbnQpPT5kaWFwYXRjaD0+e1xuICAgICAgICBjb25zdCB1c2VyPVVzZXIuY3VycmVudFxuICAgICAgICBjb25zdCBjb21tZW50PXtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHBhcmVudDpfaWQsXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsOnVzZXIudGh1bWJuYWlsLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6Y29udGVudFxuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29tbWVudC5vZih0eXBlKS51cHNlcnQoY29tbWVudClcbiAgICAgICAgICAgIC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9jcmVhdGVkYCxwYXlsb2FkOmF9KSlcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcbiAgICBbRE9NQUlOXTogKHN0YXRlPUlOSVRfU1RBVEUsIHt0eXBlLCBwYXlsb2FkfSk9PntcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICBjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XG4gICAgICAgICAgICByZXR1cm4gSU5JVF9TVEFURVxuICAgICAgICBjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcbiAgICAgICAgICAgIHJldHVybiBwYXlsb2FkXG4gICAgICAgIGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxuICAgICAgICAgICAgY29uc3Qge3R5cGUsX2lkLGRhdGF9PXN0YXRlXG4gICAgICAgICAgICByZXR1cm4ge3R5cGUsX2lkLCBkYXRhOm5ldyBBcnJheSguLi5kYXRhLHBheWxvYWQpfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IENvbW1lbnRVST1jb25uZWN0KCkoXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBjb25zdCB7ZGlzcGF0Y2gscGFyYW1zOnt0eXBlLF9pZH19PXRoaXMucHJvcHNcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHR5cGUsX2lkKSlcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtkYXRhLHRlbXBsYXRlLGRpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXG4gICAgICAgIGxldCByZWZDb21tZW50XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiPlxuICAgICAgICAgICAgICAgIDxMaXN0PlxuICAgICAgICAgICAgICAgICAgICB7ZGF0YS5tYXBzKGE9Pjx0ZW1wbGF0ZSBtb2RlbD17YX0vPil9XG4gICAgICAgICAgICAgICAgPC9MaXN0PlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJCYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDx0ZXh0YXJlYSByZWY9e2E9PnJlZkNvbW1lbnQ9YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJnaXZlIHNvbWUgY29tbWVudDoxNDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezE0MH0vPiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlNhdmVcIiwgb25TZWxlY3Q6ZT0+KGU9cmVmQ29tbWVudC52YWx1ZS50cmltKCkpJiZkaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHR5cGUsX2lkLCBlKSkudGhlbihhPT5yZWZDb21tZW50LnZhbHVlPVwiXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICBcdFx0PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59KVxuXG5Db21tZW50VUkuZGVmYXVsdFByb3BzPXtcbiAgICB0ZW1wbGF0ZTogKHttb2RlbH0pPT57XG4gICAgICAgIGxldCBuYW1lLCBsZWZ0LCByaWdodCwgdGV4dFxuICAgICAgICBjb25zdCBpc093bmVyPW1vZGVsLmF1dGhvci5faWQ9PVVzZXIuY3VycmVudC5faWQ7XG4gICAgICAgIGlmKGlzT3duZXIpe1xuICAgICAgICAgICAgbGVmdD0oPHNwYW4vPilcbiAgICAgICAgICAgIHJpZ2h0PSg8QXZhdGFyIHNyYz17VXNlci5jdXJyZW50LnRodW1ibmFpbH0vPilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319Pnttb2RlbC5hdXRob3IubmFtZX08L3NwYW4+KVxuICAgICAgICAgICAgbGVmdD0oPEF2YXRhciBzcmM9e21vZGVsLnRodW1ibmFpbH0vPilcbiAgICAgICAgICAgIHJpZ2h0PSg8c3Bhbi8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMaXN0SXRlbVxuICAgICAgICAgICAgICAgIGtleT17bW9kZWwuX2lkfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZ1RvcDoxMCxwYWRkaW5nTGVmdDo2Mn19XG4gICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17bGVmdH1cbiAgICAgICAgICAgICAgICByaWdodEF2YXRhcj17cmlnaHR9XG4gICAgICAgICAgICAgICAgZGlzYWJsZVRvdWNoVGFwPXt0cnVlfT5cbiAgICAgICAgICAgICAgICB7bmFtZX1cblxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twYWRkaW5nUmlnaHQ6NX19PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2Bjb250ZW50ICR7aXNPd25lcj9cIm93bmVyXCI6XCJcIn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnttb2RlbC5jb250ZW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9MaXN0SXRlbT5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihDb21tZW50VUkse0FDVElPTixSRURVQ0VSfSlcbiJdfQ==