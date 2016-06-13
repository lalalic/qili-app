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
            var _props$template = _props.template;
            var template = _props$template === undefined ? Template : _props$template;


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

exports.default = CommentUI;

var Template = function (_Component2) {
    _inherits(Template, _Component2);

    function Template() {
        _classCallCheck(this, Template);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Template).apply(this, arguments));
    }

    _createClass(Template, [{
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

    return Template;
}(_react.Component);

Main.defaultProps = {
    template: Template
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDakIsYUFEaUIsU0FDakIsQ0FBWSxLQUFaLEVBQWtCOzhCQURELFdBQ0M7OzJFQURELHNCQUVQLFFBRFE7OzRCQUVFLE1BQU0sTUFBTixDQUZGO1lBRVQsMEJBRlM7WUFFSCx3QkFGRzs7QUFHZCxjQUFLLEtBQUwsR0FBVyxFQUFDLFVBQUQsRUFBTSxRQUFOLEVBQVgsQ0FIYztBQUlkLGNBQUssRUFBTCxHQUFRLGtCQUFRLEVBQVIsQ0FBVyxJQUFYLENBQVIsQ0FKYztBQUtkLGNBQUssS0FBTCxHQUFXLE1BQUssRUFBTCxDQUFRLElBQVIsQ0FBYSxFQUFDLFFBQU8sR0FBUCxFQUFkLENBQVgsQ0FMYzs7S0FBbEI7O2lCQURpQjs7a0RBU1MsT0FBTTtpQ0FDWixNQUFNLE1BQU4sQ0FEWTtnQkFDdkIsMkJBRHVCO2dCQUNqQix5QkFEaUI7O0FBRTVCLGdCQUFHLFFBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixPQUFLLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFDN0IsT0FESjtBQUVBLGdCQUFHLFFBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxFQUNMLEtBQUssRUFBTCxHQUFRLGtCQUFRLEVBQVIsQ0FBVyxJQUFYLENBQVIsQ0FESjtBQUVBLGlCQUFLLEtBQUwsR0FBVyxLQUFLLEVBQUwsQ0FBUSxJQUFSLENBQWEsRUFBQyxRQUFPLEdBQVAsRUFBZCxDQUFYLENBTjRCO0FBTzVCLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLFVBQUQsRUFBTSxRQUFOLEVBQWQsRUFQNEI7Ozs7aUNBVXhCOzs7eUJBQ2tDLEtBQUssS0FBTCxDQURsQztnQkFDUyxhQUFSLE9BQVEsSUFEVDt5Q0FDZSxTQURmO2dCQUNlLDJDQUFTLDJCQUR4Qjs7O0FBR0osbUJBQ0k7O2tCQUFLLFdBQVUsU0FBVixFQUFMO2dCQUVJLGdEQUFNLEtBQUksTUFBSjtBQUNGLDJCQUFPLEtBQUssS0FBTDtBQUNQLDhCQUFVLFFBQVYsRUFGSixDQUZKO2dCQU1JO0FBQ0ksK0JBQVUscUJBQVY7QUFDQSwyQkFBTyxDQUNDLE1BREQsRUFFRSw0Q0FBVSxLQUFJLFNBQUo7QUFDUCxxQ0FBWSx1QkFBWjtBQUNBLG1DQUFXLEdBQVgsRUFGSCxDQUZGLEVBS0MsRUFBQyxRQUFPLE1BQVAsRUFBZSxVQUFTO21DQUFJLE9BQUssSUFBTDt5QkFBSixFQUwxQixDQUFQO2lCQUZKLENBTko7YUFESixDQUhJOzs7OytCQXVCRjs7O3VDQUNxQixtQkFBUyxVQUFULENBQW9CLEtBQUssSUFBTCxDQUFVLE9BQVYsRUFEekM7OzZEQUNHLE1BREg7Z0JBQ1MsZ0RBQVEsMkJBRGpCOztBQUVGLGdCQUFHLFFBQVEsSUFBUixHQUFlLE1BQWYsSUFBdUIsQ0FBdkIsRUFDQyxPQURKOztBQUdBLGdCQUFJLE9BQUssZUFBSyxPQUFMO2dCQUNMLFVBQVE7QUFDSixzQkFBSyxLQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ0wsd0JBQU8sS0FBSyxLQUFMLENBQVcsR0FBWDtBQUNQLDJCQUFVLEtBQUssU0FBTDtBQUNWLHlCQUFRLE9BQVI7YUFKSixDQU5GO0FBWUYsaUJBQUssRUFBTCxDQUFRLE1BQVIsQ0FBZSxPQUFmLEVBQXVCLFVBQUMsT0FBRCxFQUFXOzRCQUNELE9BQUssSUFBTCxDQURDO29CQUMxQixrQkFEMEI7b0JBQ1osa0JBQVIsUUFEb0I7O0FBRTlCLHFCQUFLLFFBQUwsQ0FBYyxFQUFDLHlDQUFVLHdDQUFTLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBZ0IsYUFBbkMsRUFBZixFQUY4QjtBQUc5QixtQ0FBUyxVQUFULENBQW9CLFNBQXBCLEVBQStCLEtBQS9CLEdBQXFDLEVBQXJDLENBSDhCO2FBQVgsQ0FBdkIsQ0FaRTs7OztXQTFDVzs7Ozs7SUE4RGY7Ozs7Ozs7Ozs7O2lDQUNNO0FBQ0EsZ0JBQUMsUUFBTyxLQUFLLEtBQUwsQ0FBUCxLQUFELENBREE7QUFFQSxxQkFGQSxJQUVNLEtBRk4sSUFFWSxNQUZaLElBRW1CLEtBRm5CO0FBR0EsMEJBQVEsTUFBTSxNQUFOLENBQWEsR0FBYixJQUFrQixlQUFLLE9BQUwsQ0FBYSxHQUFiLENBSDFCO0FBSUosZ0JBQUcsT0FBSCxFQUFXO0FBQ1AsdUJBQU0sMkNBQU4sQ0FETztBQUVQLHdCQUFPLDhCQUFDLE1BQUQsSUFBUSxLQUFLLGVBQUssT0FBTCxDQUFhLFNBQWIsRUFBYixDQUFQLENBRk87YUFBWCxNQUdLO0FBQ0QsdUJBQU07O3NCQUFNLE9BQU8sRUFBQyxVQUFTLFNBQVQsRUFBUixFQUFOO29CQUFvQyxNQUFNLE1BQU4sQ0FBYSxJQUFiO2lCQUExQyxDQURDO0FBRUQsdUJBQU0sOEJBQUMsTUFBRCxJQUFRLEtBQUssTUFBTSxTQUFOLEVBQWIsQ0FBTixDQUZDO0FBR0Qsd0JBQU8sMkNBQVAsQ0FIQzthQUhMOztBQVNBLG1CQUNJOytCQUFNLElBQU47O0FBQ0kseUJBQUssTUFBTSxHQUFOO0FBQ0wsMkJBQU8sRUFBQyxZQUFXLEVBQVgsRUFBYyxhQUFZLEVBQVosRUFBdEI7QUFDQSxnQ0FBWSxJQUFaO0FBQ0EsaUNBQWEsS0FBYjtBQUNBLHFDQUFpQixJQUFqQixFQUxKO2dCQU1LLElBTkw7Z0JBUUk7O3NCQUFLLE9BQU8sRUFBQyxjQUFhLENBQWIsRUFBUixFQUFMO29CQUNJOzswQkFBRyx5QkFBc0IsVUFBUSxPQUFSLEdBQWdCLEVBQWhCLENBQXRCLEVBQUg7d0JBQ0k7Ozs0QkFBTyxNQUFNLE9BQU47eUJBRFg7cUJBREo7aUJBUko7YUFESixDQWJJOzs7O1dBRE47OztBQWlDTixLQUFLLFlBQUwsR0FBa0I7QUFDZCxjQUFTLFFBQVQ7Q0FESiIsImZpbGUiOiJjb21tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuXG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4uL2RiL3NlcnZpY2UnXG5pbXBvcnQgQ29tbWFuZEJhciBmcm9tICcuL2NvbW1hbmQtYmFyJ1xuaW1wb3J0IExpc3QgZnJvbSAnLi9saXN0J1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vZGIvdXNlcidcbmltcG9ydCBDb21tZW50IGZyb20gJy4uL2RiL2NvbW1lbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnRVSSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB2YXIge3R5cGUsIF9pZH09cHJvcHMucGFyYW1zO1xuICAgICAgICB0aGlzLnN0YXRlPXt0eXBlLF9pZH1cbiAgICAgICAgdGhpcy5kYj1Db21tZW50Lm9mKHR5cGUpXG4gICAgICAgIHRoaXMuX2RhdGE9dGhpcy5kYi5maW5kKHtwYXJlbnQ6X2lkfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKXtcbiAgICAgICAgdmFyIHt0eXBlLCBfaWR9PXByb3BzLnBhcmFtcztcbiAgICAgICAgaWYodHlwZT09dGhpcy5zdGF0ZS50eXBlICYmIF9pZD09dGhpcy5zdGF0ZS5faWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmKHR5cGUhPXRoaXMuc3RhdGUudHlwZSlcbiAgICAgICAgICAgIHRoaXMuZGI9Q29tbWVudC5vZih0eXBlKTtcbiAgICAgICAgdGhpcy5fZGF0YT10aGlzLmRiLmZpbmQoe3BhcmVudDpfaWR9KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHt0eXBlLF9pZH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7cGFyYW1zOntfaWR9LCB0ZW1wbGF0ZT1UZW1wbGF0ZX09dGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1lbnRcIj5cblxuICAgICAgICAgICAgICAgIDxMaXN0IHJlZj1cImxpc3RcIlxuICAgICAgICAgICAgICAgICAgICBtb2RlbD17dGhpcy5fZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU9e3RlbXBsYXRlfS8+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyIGNlbnRlcmlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkJhY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPHRleHRhcmVhIHJlZj1cImNvbW1lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImdpdmUgc29tZSBjb21tZW50OjE0MFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heExlbmd0aD17MTQwfS8+KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiU2F2ZVwiLCBvblNlbGVjdDooKT0+dGhpcy5zYXZlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgIFx0XHQ8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBzYXZlKCl7XG4gICAgICAgIHZhciB7dmFsdWU6Y29udGVudD1cIlwifT1SZWFjdERPTS5nZXRET01Ob2RlKHRoaXMucmVmcy5jb21tZW50KVxuICAgICAgICBpZihjb250ZW50LnRyaW0oKS5sZW5ndGg9PTApXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICB2YXIgdXNlcj1Vc2VyLmN1cnJlbnQsXG4gICAgICAgICAgICBjb21tZW50PXtcbiAgICAgICAgICAgICAgICB0eXBlOnRoaXMuc3RhdGUudHlwZSxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6dGhpcy5zdGF0ZS5faWQsXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsOnVzZXIudGh1bWJuYWlsLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6Y29udGVudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYi51cHNlcnQoY29tbWVudCwodXBkYXRlZCk9PntcbiAgICAgICAgICAgIHZhcntsaXN0LCBjb21tZW50OmNvbW1lbnRlcn09dGhpcy5yZWZzXG4gICAgICAgICAgICBsaXN0LnNldFN0YXRlKHtkYXRhOiBuZXcgQXJyYXkoLi4ubGlzdC5zdGF0ZS5kYXRhLHVwZGF0ZWQpfSlcbiAgICAgICAgICAgIFJlYWN0RE9NLmdldERPTU5vZGUoY29tbWVudGVyKS52YWx1ZT1cIlwiXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5jbGFzcyBUZW1wbGF0ZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIG5hbWUsIGxlZnQsIHJpZ2h0LCB0ZXh0LFxuICAgICAgICAgICAgaXNPd25lcj1tb2RlbC5hdXRob3IuX2lkPT1Vc2VyLmN1cnJlbnQuX2lkO1xuICAgICAgICBpZihpc093bmVyKXtcbiAgICAgICAgICAgIGxlZnQ9KDxzcGFuLz4pXG4gICAgICAgICAgICByaWdodD0oPEF2YXRhciBzcmM9e1VzZXIuY3VycmVudC50aHVtYm5haWx9Lz4pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbmFtZT0oPHNwYW4gc3R5bGU9e3tmb250U2l6ZToneC1zbWFsbCd9fT57bW9kZWwuYXV0aG9yLm5hbWV9PC9zcGFuPilcbiAgICAgICAgICAgIGxlZnQ9KDxBdmF0YXIgc3JjPXttb2RlbC50aHVtYm5haWx9Lz4pXG4gICAgICAgICAgICByaWdodD0oPHNwYW4vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TGlzdC5JdGVtXG4gICAgICAgICAgICAgICAga2V5PXttb2RlbC5faWR9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3twYWRkaW5nVG9wOjEwLHBhZGRpbmdMZWZ0OjYyfX1cbiAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXtsZWZ0fVxuICAgICAgICAgICAgICAgIHJpZ2h0QXZhdGFyPXtyaWdodH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlVG91Y2hUYXA9e3RydWV9PlxuICAgICAgICAgICAgICAgIHtuYW1lfVxuXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3BhZGRpbmdSaWdodDo1fX0+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17YGNvbnRlbnQgJHtpc093bmVyP1wib3duZXJcIjpcIlwifWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e21vZGVsLmNvbnRlbnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuTWFpbi5kZWZhdWx0UHJvcHM9e1xuICAgIHRlbXBsYXRlOlRlbXBsYXRlXG59XG4iXX0=