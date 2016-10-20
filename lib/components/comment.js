"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _service = require("../db/service");

var _commandBar = require("./command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

var _user = require("../db/user");

var _user2 = _interopRequireDefault(_user);

var _comment = require("../db/comment");

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentUI = function (_Component) {
    _inherits(CommentUI, _Component);

    function CommentUI(props) {
        _classCallCheck(this, CommentUI);

        var _this = _possibleConstructorReturn(this, (CommentUI.__proto__ || Object.getPrototypeOf(CommentUI)).call(this, props));

        var _props$params = props.params;
        var type = _props$params.type;
        var _id = _props$params._id;

        _this.state = { type: type, _id: _id };
        _this.db = _comment2.default.of(type);
        _this._data = _this.db.find({ parent: _id });
        return _this;
    }

    _createClass(CommentUI, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            var _props$params2 = props.params;
            var type = _props$params2.type;
            var _id = _props$params2._id;

            if (type == this.state.type && _id == this.state._id) return;
            if (type != this.state.type) this.db = _comment2.default.of(type);
            this._data = this.db.find({ parent: _id });
            this.setState({ type: type, _id: _id });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var _id = _props.params._id;
            var template = _props.template;

            return _react2.default.createElement(
                "div",
                { className: "comment" },
                _react2.default.createElement(_list2.default, { ref: "list",
                    model: this._data,
                    template: template }),
                _react2.default.createElement(_commandBar2.default, {
                    className: "footbar centerinput",
                    items: ["Back", _react2.default.createElement("textarea", { ref: "comment",
                        placeholder: "give some comment:140",
                        maxLength: 140 }), { action: "Save", onSelect: function onSelect() {
                            return _this2.save();
                        } }]
                })
            );
        }
    }, {
        key: "save",
        value: function save() {
            var _this3 = this;

            var _refs$comment$value = this.refs.comment.value;
            var content = _refs$comment$value === undefined ? "" : _refs$comment$value;

            if (content.trim().length == 0) return;

            var user = _user2.default.current,
                comment = {
                type: this.state.type,
                parent: this.state._id,
                thumbnail: user.thumbnail,
                content: content
            };
            this.db.upsert(comment, function (updated) {
                var list = _this3.refs.list;

                list.setState({ data: new (Function.prototype.bind.apply(Array, [null].concat(_toConsumableArray(list.state.data), [updated])))() });
                _this3.refs.comment.value = "";
            });
        }
    }]);

    return CommentUI;
}(_react.Component);

CommentUI.defaultProps = {
    template: function (_Component2) {
        _inherits(template, _Component2);

        function template() {
            _classCallCheck(this, template);

            return _possibleConstructorReturn(this, (template.__proto__ || Object.getPrototypeOf(template)).apply(this, arguments));
        }

        _createClass(template, [{
            key: "render",
            value: function render() {
                var model = this.props.model;
                var name;var left;var right;var text;
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
                    _list2.default.Item,
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
        }]);

        return template;
    }(_react.Component)
};
exports.default = CommentUI;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiQ29tbWVudFVJIiwicHJvcHMiLCJwYXJhbXMiLCJ0eXBlIiwiX2lkIiwic3RhdGUiLCJkYiIsIm9mIiwiX2RhdGEiLCJmaW5kIiwicGFyZW50Iiwic2V0U3RhdGUiLCJ0ZW1wbGF0ZSIsImFjdGlvbiIsIm9uU2VsZWN0Iiwic2F2ZSIsInJlZnMiLCJjb21tZW50IiwidmFsdWUiLCJjb250ZW50IiwidHJpbSIsImxlbmd0aCIsInVzZXIiLCJjdXJyZW50IiwidGh1bWJuYWlsIiwidXBzZXJ0IiwidXBkYXRlZCIsImxpc3QiLCJkYXRhIiwiQXJyYXkiLCJkZWZhdWx0UHJvcHMiLCJtb2RlbCIsImF1dGhvciIsImlzT3duZXIiLCJsZWZ0IiwicmlnaHQiLCJuYW1lIiwiZm9udFNpemUiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFM7OztBQUNqQix1QkFBWUMsS0FBWixFQUFrQjtBQUFBOztBQUFBLDBIQUNSQSxLQURROztBQUFBLDRCQUVFQSxNQUFNQyxNQUZSO0FBQUEsWUFFVEMsSUFGUyxpQkFFVEEsSUFGUztBQUFBLFlBRUhDLEdBRkcsaUJBRUhBLEdBRkc7O0FBR2QsY0FBS0MsS0FBTCxHQUFXLEVBQUNGLFVBQUQsRUFBTUMsUUFBTixFQUFYO0FBQ0EsY0FBS0UsRUFBTCxHQUFRLGtCQUFRQyxFQUFSLENBQVdKLElBQVgsQ0FBUjtBQUNBLGNBQUtLLEtBQUwsR0FBVyxNQUFLRixFQUFMLENBQVFHLElBQVIsQ0FBYSxFQUFDQyxRQUFPTixHQUFSLEVBQWIsQ0FBWDtBQUxjO0FBTWpCOzs7O2tEQUV5QkgsSyxFQUFNO0FBQUEsaUNBQ1pBLE1BQU1DLE1BRE07QUFBQSxnQkFDdkJDLElB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LFNBQW5CLEdBQU47QUFDQVcsNEJBQU8sMkNBQVA7QUFDSDs7QUFFRCx1QkFDSTtBQUFBLG1DQUFNLElBQU47QUFBQTtBQUNJLDZCQUFLSixNQUFNM0IsR0FEZjtBQUVJLCtCQUFPLEVBQUNrQyxZQUFXLEVBQVosRUFBZUMsYUFBWSxFQUEzQixFQUZYO0FBR0ksb0NBQVlMLElBSGhCO0FBSUkscUNBQWFDLEtBSmpCO0FBS0kseUNBQWlCLElBTHJCO0FBTUtDLHdCQU5MO0FBUUk7QUFBQTtBQUFBLDBCQUFLLE9BQU8sRUFBQ0ksY0FBYSxDQUFkLEVBQVo7QUFDSTtBQUFBO0FBQUEsOEJBQUcseUJBQXNCUCxVQUFRLE9BQVIsR0FBZ0IsRUFBdEMsQ0FBSDtBQUNJO0FBQUE7QUFBQTtBQUFPRixzQ0FBTVo7QUFBYjtBQURKO0FBREo7QUFSSixpQkFESjtBQWdCSDtBQTlCTDs7QUFBQTtBQUFBO0FBRGdCLEM7a0JBNURIbkIsUyIsImZpbGUiOiJjb21tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtBdmF0YXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5cbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vZGIvc2VydmljZSdcbmltcG9ydCBDb21tYW5kQmFyIGZyb20gJy4vY29tbWFuZC1iYXInXG5pbXBvcnQgTGlzdCBmcm9tICcuL2xpc3QnXG5pbXBvcnQgVXNlciBmcm9tICcuLi9kYi91c2VyJ1xuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vZGIvY29tbWVudCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWVudFVJIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHZhciB7dHlwZSwgX2lkfT1wcm9wcy5wYXJhbXM7XG4gICAgICAgIHRoaXMuc3RhdGU9e3R5cGUsX2lkfVxuICAgICAgICB0aGlzLmRiPUNvbW1lbnQub2YodHlwZSlcbiAgICAgICAgdGhpcy5fZGF0YT10aGlzLmRiLmZpbmQoe3BhcmVudDpfaWR9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpe1xuICAgICAgICB2YXIge3R5cGUsIF9pZH09cHJvcHMucGFyYW1zO1xuICAgICAgICBpZih0eXBlPT10aGlzLnN0YXRlLnR5cGUgJiYgX2lkPT10aGlzLnN0YXRlLl9pZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYodHlwZSE9dGhpcy5zdGF0ZS50eXBlKVxuICAgICAgICAgICAgdGhpcy5kYj1Db21tZW50Lm9mKHR5cGUpO1xuICAgICAgICB0aGlzLl9kYXRhPXRoaXMuZGIuZmluZCh7cGFyZW50Ol9pZH0pXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3R5cGUsX2lkfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3BhcmFtczp7X2lkfSwgdGVtcGxhdGV9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tZW50XCI+XG5cbiAgICAgICAgICAgICAgICA8TGlzdCByZWY9XCJsaXN0XCJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw9e3RoaXMuX2RhdGF9XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlPXt0ZW1wbGF0ZX0vPlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJCYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDx0ZXh0YXJlYSByZWY9XCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJnaXZlIHNvbWUgY29tbWVudDoxNDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezE0MH0vPiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlNhdmVcIiwgb25TZWxlY3Q6KCk9PnRoaXMuc2F2ZSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICBcdFx0PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgc2F2ZSgpe1xuICAgICAgICB2YXIge3ZhbHVlOmNvbnRlbnQ9XCJcIn09dGhpcy5yZWZzLmNvbW1lbnRcbiAgICAgICAgaWYoY29udGVudC50cmltKCkubGVuZ3RoPT0wKVxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgdmFyIHVzZXI9VXNlci5jdXJyZW50LFxuICAgICAgICAgICAgY29tbWVudD17XG4gICAgICAgICAgICAgICAgdHlwZTp0aGlzLnN0YXRlLnR5cGUsXG4gICAgICAgICAgICAgICAgcGFyZW50OnRoaXMuc3RhdGUuX2lkLFxuICAgICAgICAgICAgICAgIHRodW1ibmFpbDp1c2VyLnRodW1ibmFpbCxcbiAgICAgICAgICAgICAgICBjb250ZW50OmNvbnRlbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIHRoaXMuZGIudXBzZXJ0KGNvbW1lbnQsKHVwZGF0ZWQpPT57XG4gICAgICAgICAgICBjb25zdCB7bGlzdH09dGhpcy5yZWZzXG4gICAgICAgICAgICBsaXN0LnNldFN0YXRlKHtkYXRhOiBuZXcgQXJyYXkoLi4ubGlzdC5zdGF0ZS5kYXRhLHVwZGF0ZWQpfSlcbiAgICAgICAgICAgIHRoaXMucmVmcy5jb21tZW50LnZhbHVlPVwiXCJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzPXtcbiAgICAgICAgdGVtcGxhdGU6IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICAgICAgdmFyIHttb2RlbH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZSwgbGVmdCwgcmlnaHQsIHRleHQsXG4gICAgICAgICAgICAgICAgICAgIGlzT3duZXI9bW9kZWwuYXV0aG9yLl9pZD09VXNlci5jdXJyZW50Ll9pZDtcbiAgICAgICAgICAgICAgICBpZihpc093bmVyKXtcbiAgICAgICAgICAgICAgICAgICAgbGVmdD0oPHNwYW4vPilcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ9KDxBdmF0YXIgc3JjPXtVc2VyLmN1cnJlbnQudGh1bWJuYWlsfS8+KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319Pnttb2RlbC5hdXRob3IubmFtZX08L3NwYW4+KVxuICAgICAgICAgICAgICAgICAgICBsZWZ0PSg8QXZhdGFyIHNyYz17bW9kZWwudGh1bWJuYWlsfS8+KVxuICAgICAgICAgICAgICAgICAgICByaWdodD0oPHNwYW4vPilcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e21vZGVsLl9pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZ1RvcDoxMCxwYWRkaW5nTGVmdDo2Mn19XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXtsZWZ0fVxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRBdmF0YXI9e3JpZ2h0fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVRvdWNoVGFwPXt0cnVlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtuYW1lfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7cGFkZGluZ1JpZ2h0OjV9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2Bjb250ZW50ICR7aXNPd25lcj9cIm93bmVyXCI6XCJcIn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e21vZGVsLmNvbnRlbnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=