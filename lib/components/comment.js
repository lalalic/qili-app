'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _service = require('../db/service');

var _commandBar = require('./command-bar');

var _commandBar2 = _interopRequireDefault(_commandBar);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _user = require('../db/user');

var _user2 = _interopRequireDefault(_user);

var _comment = require('../db/comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_Component) {
    _inherits(Main, _Component);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Main).call(this, props));

        var _props$params = props.params;
        var type = _props$params.type;
        var _id = _props$params._id;

        _this.state = { type: type, _id: _id };
        _this.db = _comment2.default.of(type);
        _this._data = _this.db.find({ parent: _id });
        return _this;
    }

    _createClass(Main, [{
        key: 'componentWillReceiveProps',
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
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var _id = _props.params._id;
            var _props$template = _props.template;
            var template = _props$template === undefined ? Template : _props$template;


            return _react2.default.createElement(
                'div',
                { className: 'comment' },
                _react2.default.createElement(_list2.default, { ref: 'list',
                    model: this._data,
                    template: template }),
                _react2.default.createElement(_commandBar2.default, {
                    className: 'footbar centerinput',
                    items: ["Back", _react2.default.createElement('textarea', { ref: 'comment',
                        placeholder: 'give some comment:140',
                        maxLength: 140 }), { action: "Save", onSelect: function onSelect() {
                            return _this2.save();
                        } }]
                })
            );
        }
    }, {
        key: 'save',
        value: function save() {
            var _this3 = this;

            var _refs$comment$getDOMN = this.refs.comment.getDOMNode();

            var _refs$comment$getDOMN2 = _refs$comment$getDOMN.value;
            var content = _refs$comment$getDOMN2 === undefined ? "" : _refs$comment$getDOMN2;

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
                commenter.getDOMNode().value = "";
            });
        }
    }]);

    return Main;
}(_react.Component);

exports.default = Main;

var Template = function (_Component2) {
    _inherits(Template, _Component2);

    function Template() {
        _classCallCheck(this, Template);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Template).apply(this, arguments));
    }

    _createClass(Template, [{
        key: 'render',
        value: function render() {
            var model = this.props.model;
            var name;var left;var right;var text;
            var isOwner = model.author._id == _user2.default.current._id;
            if (isOwner) {
                left = _react2.default.createElement('span', null);
                right = _react2.default.createElement(Avatar, { src: _user2.default.current.thumbnail });
            } else {
                name = _react2.default.createElement(
                    'span',
                    { style: { fontSize: 'x-small' } },
                    model.author.name
                );
                left = _react2.default.createElement(Avatar, { src: model.thumbnail });
                right = _react2.default.createElement('span', null);
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
                    ClearFix,
                    { style: { paddingRight: 5 } },
                    _react2.default.createElement(
                        'p',
                        { className: 'content ' + (isOwner ? "owner" : "") },
                        _react2.default.createElement(
                            'span',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLElBQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxNQUNDOzsyRUFERCxpQkFFUCxRQURROzs0QkFFRSxNQUFNLE1BQU4sQ0FGRjtZQUVULDBCQUZTO1lBRUgsd0JBRkc7O0FBR2QsY0FBSyxLQUFMLEdBQVcsRUFBQyxVQUFELEVBQU0sUUFBTixFQUFYLENBSGM7QUFJZCxjQUFLLEVBQUwsR0FBUSxrQkFBUSxFQUFSLENBQVcsSUFBWCxDQUFSLENBSmM7QUFLZCxjQUFLLEtBQUwsR0FBVyxNQUFLLEVBQUwsQ0FBUSxJQUFSLENBQWEsRUFBQyxRQUFPLEdBQVAsRUFBZCxDQUFYLENBTGM7O0tBQWxCOztpQkFEaUI7O2tEQVNTLE9BQU07aUNBQ1osTUFBTSxNQUFOLENBRFk7Z0JBQ3ZCLDJCQUR1QjtnQkFDakIseUJBRGlCOztBQUU1QixnQkFBRyxRQUFNLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBbUIsT0FBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQzdCLE9BREo7QUFFQSxnQkFBRyxRQUFNLEtBQUssS0FBTCxDQUFXLElBQVgsRUFDTCxLQUFLLEVBQUwsR0FBUSxrQkFBUSxFQUFSLENBQVcsSUFBWCxDQUFSLENBREo7QUFFQSxpQkFBSyxLQUFMLEdBQVcsS0FBSyxFQUFMLENBQVEsSUFBUixDQUFhLEVBQUMsUUFBTyxHQUFQLEVBQWQsQ0FBWCxDQU40QjtBQU81QixpQkFBSyxRQUFMLENBQWMsRUFBQyxVQUFELEVBQU0sUUFBTixFQUFkLEVBUDRCOzs7O2lDQVV4Qjs7O3lCQUNrQyxLQUFLLEtBQUwsQ0FEbEM7Z0JBQ1MsYUFBUixPQUFRLElBRFQ7eUNBQ2UsU0FEZjtnQkFDZSwyQ0FBUywyQkFEeEI7OztBQUdKLG1CQUNJOztrQkFBSyxXQUFVLFNBQVYsRUFBTDtnQkFFSSxnREFBTSxLQUFJLE1BQUo7QUFDRiwyQkFBTyxLQUFLLEtBQUw7QUFDUCw4QkFBVSxRQUFWLEVBRkosQ0FGSjtnQkFNSTtBQUNJLCtCQUFVLHFCQUFWO0FBQ0EsMkJBQU8sQ0FDQyxNQURELEVBRUUsNENBQVUsS0FBSSxTQUFKO0FBQ1AscUNBQVksdUJBQVo7QUFDQSxtQ0FBVyxHQUFYLEVBRkgsQ0FGRixFQUtDLEVBQUMsUUFBTyxNQUFQLEVBQWUsVUFBUzttQ0FBSSxPQUFLLElBQUw7eUJBQUosRUFMMUIsQ0FBUDtpQkFGSixDQU5KO2FBREosQ0FISTs7OzsrQkF1QkY7Ozt3Q0FDcUIsS0FBSyxJQUFMLENBQVUsT0FBVixDQUFrQixVQUFsQixHQURyQjs7K0RBQ0csTUFESDtnQkFDUyxpREFBUSw0QkFEakI7O0FBRUYsZ0JBQUcsUUFBUSxJQUFSLEdBQWUsTUFBZixJQUF1QixDQUF2QixFQUNDLE9BREo7O0FBR0EsZ0JBQUksT0FBSyxlQUFLLE9BQUw7Z0JBQ0wsVUFBUTtBQUNKLHNCQUFLLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDTCx3QkFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYO0FBQ1AsMkJBQVUsS0FBSyxTQUFMO0FBQ1YseUJBQVEsT0FBUjthQUpKLENBTkY7QUFZRixpQkFBSyxFQUFMLENBQVEsTUFBUixDQUFlLE9BQWYsRUFBdUIsVUFBQyxPQUFELEVBQVc7NEJBQ0QsT0FBSyxJQUFMLENBREM7b0JBQzFCLGtCQUQwQjtvQkFDWixrQkFBUixRQURvQjs7QUFFOUIscUJBQUssUUFBTCxDQUFjLEVBQUMseUNBQVUsd0NBQVMsS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFnQixhQUFuQyxFQUFmLEVBRjhCO0FBRzlCLDBCQUFVLFVBQVYsR0FBdUIsS0FBdkIsR0FBNkIsRUFBN0IsQ0FIOEI7YUFBWCxDQUF2QixDQVpFOzs7O1dBMUNXOzs7OztJQThEZjs7Ozs7Ozs7Ozs7aUNBQ007QUFDQSxnQkFBQyxRQUFPLEtBQUssS0FBTCxDQUFQLEtBQUQsQ0FEQTtBQUVBLHFCQUZBLElBRU0sS0FGTixJQUVZLE1BRlosSUFFbUIsS0FGbkI7QUFHQSwwQkFBUSxNQUFNLE1BQU4sQ0FBYSxHQUFiLElBQWtCLGVBQUssT0FBTCxDQUFhLEdBQWIsQ0FIMUI7QUFJSixnQkFBRyxPQUFILEVBQVc7QUFDUCx1QkFBTSwyQ0FBTixDQURPO0FBRVAsd0JBQU8sOEJBQUMsTUFBRCxJQUFRLEtBQUssZUFBSyxPQUFMLENBQWEsU0FBYixFQUFiLENBQVAsQ0FGTzthQUFYLE1BR0s7QUFDRCx1QkFBTTs7c0JBQU0sT0FBTyxFQUFDLFVBQVMsU0FBVCxFQUFSLEVBQU47b0JBQW9DLE1BQU0sTUFBTixDQUFhLElBQWI7aUJBQTFDLENBREM7QUFFRCx1QkFBTSw4QkFBQyxNQUFELElBQVEsS0FBSyxNQUFNLFNBQU4sRUFBYixDQUFOLENBRkM7QUFHRCx3QkFBTywyQ0FBUCxDQUhDO2FBSEw7O0FBU0EsbUJBQ0k7K0JBQU0sSUFBTjs7QUFDSSx5QkFBSyxNQUFNLEdBQU47QUFDTCwyQkFBTyxFQUFDLFlBQVcsRUFBWCxFQUFjLGFBQVksRUFBWixFQUF0QjtBQUNBLGdDQUFZLElBQVo7QUFDQSxpQ0FBYSxLQUFiO0FBQ0EscUNBQWlCLElBQWpCLEVBTEo7Z0JBTUssSUFOTDtnQkFRSTtBQUFDLDRCQUFEO3NCQUFVLE9BQU8sRUFBQyxjQUFhLENBQWIsRUFBUixFQUFWO29CQUNJOzswQkFBRyx5QkFBc0IsVUFBUSxPQUFSLEdBQWdCLEVBQWhCLENBQXRCLEVBQUg7d0JBQ0k7Ozs0QkFBTyxNQUFNLE9BQU47eUJBRFg7cUJBREo7aUJBUko7YUFESixDQWJJOzs7O1dBRE47OztBQWlDTixLQUFLLFlBQUwsR0FBa0I7QUFDZCxjQUFTLFFBQVQ7Q0FESiIsImZpbGUiOiJjb21tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuLi9kYi9zZXJ2aWNlJ1xuaW1wb3J0IENvbW1hbmRCYXIgZnJvbSAnLi9jb21tYW5kLWJhcidcbmltcG9ydCBMaXN0IGZyb20gJy4vbGlzdCdcbmltcG9ydCBVc2VyIGZyb20gJy4uL2RiL3VzZXInXG5pbXBvcnQgQ29tbWVudCBmcm9tICcuLi9kYi9jb21tZW50J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHZhciB7dHlwZSwgX2lkfT1wcm9wcy5wYXJhbXM7XG4gICAgICAgIHRoaXMuc3RhdGU9e3R5cGUsX2lkfVxuICAgICAgICB0aGlzLmRiPUNvbW1lbnQub2YodHlwZSlcbiAgICAgICAgdGhpcy5fZGF0YT10aGlzLmRiLmZpbmQoe3BhcmVudDpfaWR9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpe1xuICAgICAgICB2YXIge3R5cGUsIF9pZH09cHJvcHMucGFyYW1zO1xuICAgICAgICBpZih0eXBlPT10aGlzLnN0YXRlLnR5cGUgJiYgX2lkPT10aGlzLnN0YXRlLl9pZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYodHlwZSE9dGhpcy5zdGF0ZS50eXBlKVxuICAgICAgICAgICAgdGhpcy5kYj1Db21tZW50Lm9mKHR5cGUpO1xuICAgICAgICB0aGlzLl9kYXRhPXRoaXMuZGIuZmluZCh7cGFyZW50Ol9pZH0pXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3R5cGUsX2lkfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtwYXJhbXM6e19pZH0sIHRlbXBsYXRlPVRlbXBsYXRlfT10aGlzLnByb3BzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiPlxuXG4gICAgICAgICAgICAgICAgPExpc3QgcmVmPVwibGlzdFwiXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsPXt0aGlzLl9kYXRhfVxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZT17dGVtcGxhdGV9Lz5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXIgY2VudGVyaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8dGV4dGFyZWEgcmVmPVwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZ2l2ZSBzb21lIGNvbW1lbnQ6MTQwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsxNDB9Lz4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJTYXZlXCIsIG9uU2VsZWN0OigpPT50aGlzLnNhdmUoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgXHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHNhdmUoKXtcbiAgICAgICAgdmFyIHt2YWx1ZTpjb250ZW50PVwiXCJ9PXRoaXMucmVmcy5jb21tZW50LmdldERPTU5vZGUoKVxuICAgICAgICBpZihjb250ZW50LnRyaW0oKS5sZW5ndGg9PTApXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICB2YXIgdXNlcj1Vc2VyLmN1cnJlbnQsXG4gICAgICAgICAgICBjb21tZW50PXtcbiAgICAgICAgICAgICAgICB0eXBlOnRoaXMuc3RhdGUudHlwZSxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6dGhpcy5zdGF0ZS5faWQsXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsOnVzZXIudGh1bWJuYWlsLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6Y29udGVudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYi51cHNlcnQoY29tbWVudCwodXBkYXRlZCk9PntcbiAgICAgICAgICAgIHZhcntsaXN0LCBjb21tZW50OmNvbW1lbnRlcn09dGhpcy5yZWZzXG4gICAgICAgICAgICBsaXN0LnNldFN0YXRlKHtkYXRhOiBuZXcgQXJyYXkoLi4ubGlzdC5zdGF0ZS5kYXRhLHVwZGF0ZWQpfSlcbiAgICAgICAgICAgIGNvbW1lbnRlci5nZXRET01Ob2RlKCkudmFsdWU9XCJcIlxuICAgICAgICB9KVxuICAgIH1cbn1cblxuY2xhc3MgVGVtcGxhdGUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWx9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBuYW1lLCBsZWZ0LCByaWdodCwgdGV4dCxcbiAgICAgICAgICAgIGlzT3duZXI9bW9kZWwuYXV0aG9yLl9pZD09VXNlci5jdXJyZW50Ll9pZDtcbiAgICAgICAgaWYoaXNPd25lcil7XG4gICAgICAgICAgICBsZWZ0PSg8c3Bhbi8+KVxuICAgICAgICAgICAgcmlnaHQ9KDxBdmF0YXIgc3JjPXtVc2VyLmN1cnJlbnQudGh1bWJuYWlsfS8+KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIG5hbWU9KDxzcGFuIHN0eWxlPXt7Zm9udFNpemU6J3gtc21hbGwnfX0+e21vZGVsLmF1dGhvci5uYW1lfTwvc3Bhbj4pXG4gICAgICAgICAgICBsZWZ0PSg8QXZhdGFyIHNyYz17bW9kZWwudGh1bWJuYWlsfS8+KVxuICAgICAgICAgICAgcmlnaHQ9KDxzcGFuLz4pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPExpc3QuSXRlbVxuICAgICAgICAgICAgICAgIGtleT17bW9kZWwuX2lkfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZ1RvcDoxMCxwYWRkaW5nTGVmdDo2Mn19XG4gICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17bGVmdH1cbiAgICAgICAgICAgICAgICByaWdodEF2YXRhcj17cmlnaHR9XG4gICAgICAgICAgICAgICAgZGlzYWJsZVRvdWNoVGFwPXt0cnVlfT5cbiAgICAgICAgICAgICAgICB7bmFtZX1cblxuICAgICAgICAgICAgICAgIDxDbGVhckZpeCBzdHlsZT17e3BhZGRpbmdSaWdodDo1fX0+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17YGNvbnRlbnQgJHtpc093bmVyP1wib3duZXJcIjpcIlwifWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e21vZGVsLmNvbnRlbnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9DbGVhckZpeD5cbiAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICApXG4gICAgfVxufVxuXG5NYWluLmRlZmF1bHRQcm9wcz17XG4gICAgdGVtcGxhdGU6VGVtcGxhdGVcbn1cbiJdfQ==