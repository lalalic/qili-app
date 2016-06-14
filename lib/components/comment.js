"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommentUI).call(this, props));

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

            var _ReactDOM$getDOMNode = _reactDom2.default.getDOMNode(this.refs.comment);

            var _ReactDOM$getDOMNode$ = _ReactDOM$getDOMNode.value;
            var content = _ReactDOM$getDOMNode$ === undefined ? "" : _ReactDOM$getDOMNode$;

            if (content.trim().length == 0) return;

            var user = _user2.default.current,
                comment = {
                type: this.state.type,
                parent: this.state._id,
                thumbnail: user.thumbnail,
                content: content
            };
            this.db.upsert(comment, function (updated) {
                var _refs = _this3.refs;
                var list = _refs.list;
                var commenter = _refs.comment;

                list.setState({ data: new (Function.prototype.bind.apply(Array, [null].concat(_toConsumableArray(list.state.data), [updated])))() });
                _reactDom2.default.getDOMNode(commenter).value = "";
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

            return _possibleConstructorReturn(this, Object.getPrototypeOf(template).apply(this, arguments));
        }

        _createClass(template, [{
            key: "render",
            value: function render() {
                var model = this.props.model;
                var name;var left;var right;var text;
                var isOwner = model.author._id == _user2.default.current._id;
                if (isOwner) {
                    left = _react2.default.createElement("span", null);
                    right = _react2.default.createElement(Avatar, { src: _user2.default.current.thumbnail });
                } else {
                    name = _react2.default.createElement(
                        "span",
                        { style: { fontSize: 'x-small' } },
                        model.author.name
                    );
                    left = _react2.default.createElement(Avatar, { src: model.thumbnail });
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDakIsYUFEaUIsU0FDakIsQ0FBWSxLQUFaLEVBQWtCOzhCQURELFdBQ0M7OzJFQURELHNCQUVQLFFBRFE7OzRCQUVFLE1BQU0sTUFBTixDQUZGO1lBRVQsMEJBRlM7WUFFSCx3QkFGRzs7QUFHZCxjQUFLLEtBQUwsR0FBVyxFQUFDLFVBQUQsRUFBTSxRQUFOLEVBQVgsQ0FIYztBQUlkLGNBQUssRUFBTCxHQUFRLGtCQUFRLEVBQVIsQ0FBVyxJQUFYLENBQVIsQ0FKYztBQUtkLGNBQUssS0FBTCxHQUFXLE1BQUssRUFBTCxDQUFRLElBQVIsQ0FBYSxFQUFDLFFBQU8sR0FBUCxFQUFkLENBQVgsQ0FMYzs7S0FBbEI7O2lCQURpQjs7a0RBU1MsT0FBTTtpQ0FDWixNQUFNLE1BQU4sQ0FEWTtnQkFDdkIsMkJBRHVCO2dCQUNqQix5QkFEaUI7O0FBRTVCLGdCQUFHLFFBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixPQUFLLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFDN0IsT0FESjtBQUVBLGdCQUFHLFFBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxFQUNMLEtBQUssRUFBTCxHQUFRLGtCQUFRLEVBQVIsQ0FBVyxJQUFYLENBQVIsQ0FESjtBQUVBLGlCQUFLLEtBQUwsR0FBVyxLQUFLLEVBQUwsQ0FBUSxJQUFSLENBQWEsRUFBQyxRQUFPLEdBQVAsRUFBZCxDQUFYLENBTjRCO0FBTzVCLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLFVBQUQsRUFBTSxRQUFOLEVBQWQsRUFQNEI7Ozs7aUNBVXhCOzs7eUJBQ3lCLEtBQUssS0FBTCxDQUR6QjtnQkFDUyxhQUFSLE9BQVEsSUFEVDtnQkFDZSwyQkFEZjs7QUFFSixtQkFDSTs7a0JBQUssV0FBVSxTQUFWLEVBQUw7Z0JBRUksZ0RBQU0sS0FBSSxNQUFKO0FBQ0YsMkJBQU8sS0FBSyxLQUFMO0FBQ1AsOEJBQVUsUUFBVixFQUZKLENBRko7Z0JBTUk7QUFDSSwrQkFBVSxxQkFBVjtBQUNBLDJCQUFPLENBQ0MsTUFERCxFQUVFLDRDQUFVLEtBQUksU0FBSjtBQUNQLHFDQUFZLHVCQUFaO0FBQ0EsbUNBQVcsR0FBWCxFQUZILENBRkYsRUFLQyxFQUFDLFFBQU8sTUFBUCxFQUFlLFVBQVM7bUNBQUksT0FBSyxJQUFMO3lCQUFKLEVBTDFCLENBQVA7aUJBRkosQ0FOSjthQURKLENBRkk7Ozs7K0JBc0JGOzs7dUNBQ3FCLG1CQUFTLFVBQVQsQ0FBb0IsS0FBSyxJQUFMLENBQVUsT0FBVixFQUR6Qzs7NkRBQ0csTUFESDtnQkFDUyxnREFBUSwyQkFEakI7O0FBRUYsZ0JBQUcsUUFBUSxJQUFSLEdBQWUsTUFBZixJQUF1QixDQUF2QixFQUNDLE9BREo7O0FBR0EsZ0JBQUksT0FBSyxlQUFLLE9BQUw7Z0JBQ0wsVUFBUTtBQUNKLHNCQUFLLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDTCx3QkFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYO0FBQ1AsMkJBQVUsS0FBSyxTQUFMO0FBQ1YseUJBQVEsT0FBUjthQUpKLENBTkY7QUFZRixpQkFBSyxFQUFMLENBQVEsTUFBUixDQUFlLE9BQWYsRUFBdUIsVUFBQyxPQUFELEVBQVc7NEJBQ0QsT0FBSyxJQUFMLENBREM7b0JBQzFCLGtCQUQwQjtvQkFDWixrQkFBUixRQURvQjs7QUFFOUIscUJBQUssUUFBTCxDQUFjLEVBQUMseUNBQVUsd0NBQVMsS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFnQixhQUFuQyxFQUFmLEVBRjhCO0FBRzlCLG1DQUFTLFVBQVQsQ0FBb0IsU0FBcEIsRUFBK0IsS0FBL0IsR0FBcUMsRUFBckMsQ0FIOEI7YUFBWCxDQUF2QixDQVpFOzs7O1dBekNXOzs7VUE0RFYsZUFBYTtBQUNoQjs7Ozs7Ozs7Ozs7cUNBQ1k7QUFDQSxvQkFBQyxRQUFPLEtBQUssS0FBTCxDQUFQLEtBQUQsQ0FEQTtBQUVBLHlCQUZBLElBRU0sS0FGTixJQUVZLE1BRlosSUFFbUIsS0FGbkI7QUFHQSw4QkFBUSxNQUFNLE1BQU4sQ0FBYSxHQUFiLElBQWtCLGVBQUssT0FBTCxDQUFhLEdBQWIsQ0FIMUI7QUFJSixvQkFBRyxPQUFILEVBQVc7QUFDUCwyQkFBTSwyQ0FBTixDQURPO0FBRVAsNEJBQU8sOEJBQUMsTUFBRCxJQUFRLEtBQUssZUFBSyxPQUFMLENBQWEsU0FBYixFQUFiLENBQVAsQ0FGTztpQkFBWCxNQUdLO0FBQ0QsMkJBQU07OzBCQUFNLE9BQU8sRUFBQyxVQUFTLFNBQVQsRUFBUixFQUFOO3dCQUFvQyxNQUFNLE1BQU4sQ0FBYSxJQUFiO3FCQUExQyxDQURDO0FBRUQsMkJBQU0sOEJBQUMsTUFBRCxJQUFRLEtBQUssTUFBTSxTQUFOLEVBQWIsQ0FBTixDQUZDO0FBR0QsNEJBQU8sMkNBQVAsQ0FIQztpQkFITDs7QUFTQSx1QkFDSTttQ0FBTSxJQUFOOztBQUNJLDZCQUFLLE1BQU0sR0FBTjtBQUNMLCtCQUFPLEVBQUMsWUFBVyxFQUFYLEVBQWMsYUFBWSxFQUFaLEVBQXRCO0FBQ0Esb0NBQVksSUFBWjtBQUNBLHFDQUFhLEtBQWI7QUFDQSx5Q0FBaUIsSUFBakIsRUFMSjtvQkFNSyxJQU5MO29CQVFJOzswQkFBSyxPQUFPLEVBQUMsY0FBYSxDQUFiLEVBQVIsRUFBTDt3QkFDSTs7OEJBQUcseUJBQXNCLFVBQVEsT0FBUixHQUFnQixFQUFoQixDQUF0QixFQUFIOzRCQUNJOzs7Z0NBQU8sTUFBTSxPQUFOOzZCQURYO3lCQURKO3FCQVJKO2lCQURKLENBYkk7Ozs7O3VCQURaOztrQkE3RGEiLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuLi9kYi9zZXJ2aWNlJ1xuaW1wb3J0IENvbW1hbmRCYXIgZnJvbSAnLi9jb21tYW5kLWJhcidcbmltcG9ydCBMaXN0IGZyb20gJy4vbGlzdCdcbmltcG9ydCBVc2VyIGZyb20gJy4uL2RiL3VzZXInXG5pbXBvcnQgQ29tbWVudCBmcm9tICcuLi9kYi9jb21tZW50J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tZW50VUkgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdmFyIHt0eXBlLCBfaWR9PXByb3BzLnBhcmFtcztcbiAgICAgICAgdGhpcy5zdGF0ZT17dHlwZSxfaWR9XG4gICAgICAgIHRoaXMuZGI9Q29tbWVudC5vZih0eXBlKVxuICAgICAgICB0aGlzLl9kYXRhPXRoaXMuZGIuZmluZCh7cGFyZW50Ol9pZH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyl7XG4gICAgICAgIHZhciB7dHlwZSwgX2lkfT1wcm9wcy5wYXJhbXM7XG4gICAgICAgIGlmKHR5cGU9PXRoaXMuc3RhdGUudHlwZSAmJiBfaWQ9PXRoaXMuc3RhdGUuX2lkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZih0eXBlIT10aGlzLnN0YXRlLnR5cGUpXG4gICAgICAgICAgICB0aGlzLmRiPUNvbW1lbnQub2YodHlwZSk7XG4gICAgICAgIHRoaXMuX2RhdGE9dGhpcy5kYi5maW5kKHtwYXJlbnQ6X2lkfSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHlwZSxfaWR9KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3BhcmFtczp7X2lkfSwgdGVtcGxhdGV9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiPlxuXG4gICAgICAgICAgICAgICAgPExpc3QgcmVmPVwibGlzdFwiXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsPXt0aGlzLl9kYXRhfVxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZT17dGVtcGxhdGV9Lz5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXIgY2VudGVyaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8dGV4dGFyZWEgcmVmPVwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZ2l2ZSBzb21lIGNvbW1lbnQ6MTQwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsxNDB9Lz4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJTYXZlXCIsIG9uU2VsZWN0OigpPT50aGlzLnNhdmUoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgXHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHNhdmUoKXtcbiAgICAgICAgdmFyIHt2YWx1ZTpjb250ZW50PVwiXCJ9PVJlYWN0RE9NLmdldERPTU5vZGUodGhpcy5yZWZzLmNvbW1lbnQpXG4gICAgICAgIGlmKGNvbnRlbnQudHJpbSgpLmxlbmd0aD09MClcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHZhciB1c2VyPVVzZXIuY3VycmVudCxcbiAgICAgICAgICAgIGNvbW1lbnQ9e1xuICAgICAgICAgICAgICAgIHR5cGU6dGhpcy5zdGF0ZS50eXBlLFxuICAgICAgICAgICAgICAgIHBhcmVudDp0aGlzLnN0YXRlLl9pZCxcbiAgICAgICAgICAgICAgICB0aHVtYm5haWw6dXNlci50aHVtYm5haWwsXG4gICAgICAgICAgICAgICAgY29udGVudDpjb250ZW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB0aGlzLmRiLnVwc2VydChjb21tZW50LCh1cGRhdGVkKT0+e1xuICAgICAgICAgICAgdmFye2xpc3QsIGNvbW1lbnQ6Y29tbWVudGVyfT10aGlzLnJlZnNcbiAgICAgICAgICAgIGxpc3Quc2V0U3RhdGUoe2RhdGE6IG5ldyBBcnJheSguLi5saXN0LnN0YXRlLmRhdGEsdXBkYXRlZCl9KVxuICAgICAgICAgICAgUmVhY3RET00uZ2V0RE9NTm9kZShjb21tZW50ZXIpLnZhbHVlPVwiXCJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzPXtcbiAgICAgICAgdGVtcGxhdGU6IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICAgICAgdmFyIHttb2RlbH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZSwgbGVmdCwgcmlnaHQsIHRleHQsXG4gICAgICAgICAgICAgICAgICAgIGlzT3duZXI9bW9kZWwuYXV0aG9yLl9pZD09VXNlci5jdXJyZW50Ll9pZDtcbiAgICAgICAgICAgICAgICBpZihpc093bmVyKXtcbiAgICAgICAgICAgICAgICAgICAgbGVmdD0oPHNwYW4vPilcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ9KDxBdmF0YXIgc3JjPXtVc2VyLmN1cnJlbnQudGh1bWJuYWlsfS8+KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319Pnttb2RlbC5hdXRob3IubmFtZX08L3NwYW4+KVxuICAgICAgICAgICAgICAgICAgICBsZWZ0PSg8QXZhdGFyIHNyYz17bW9kZWwudGh1bWJuYWlsfS8+KVxuICAgICAgICAgICAgICAgICAgICByaWdodD0oPHNwYW4vPilcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e21vZGVsLl9pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZ1RvcDoxMCxwYWRkaW5nTGVmdDo2Mn19XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXtsZWZ0fVxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRBdmF0YXI9e3JpZ2h0fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVRvdWNoVGFwPXt0cnVlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtuYW1lfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7cGFkZGluZ1JpZ2h0OjV9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2Bjb250ZW50ICR7aXNPd25lcj9cIm93bmVyXCI6XCJcIn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e21vZGVsLmNvbnRlbnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=