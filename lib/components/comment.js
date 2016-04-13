'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var _require = require('material-ui');

var Avatar = _require.Avatar;
var ClearFix = _require.ClearFix;

var _require2 = require('../db/service');

var Service = _require2.Service;
var CommandBar = require('./command-bar');
var List = require('./list');
var User = require('../db/user');
var Comment = require('../db/comment');
var Main = function (_Component) {
    _inherits(Main, _Component);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Main).call(this, props));

        var _props$params = props.params;
        var type = _props$params.type;
        var _id = _props$params._id;

        _this.state = { type: type, _id: _id };
        _this.db = Comment.of(type);
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
            if (type != this.state.type) this.db = Comment.of(type);
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


            return React.createElement(
                'div',
                { className: 'comment' },
                React.createElement(List, { ref: 'list',
                    model: this._data,
                    template: template }),
                React.createElement(CommandBar, {
                    className: 'footbar centerinput',
                    items: ["Back", React.createElement('textarea', { ref: 'comment',
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

            var user = User.current,
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
}(Component);

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
            var isOwner = model.author._id == User.current._id;
            if (isOwner) {
                left = React.createElement('span', null);
                right = React.createElement(Avatar, { src: User.current.thumbnail });
            } else {
                name = React.createElement(
                    'span',
                    { style: { fontSize: 'x-small' } },
                    model.author.name
                );
                left = React.createElement(Avatar, { src: model.thumbnail });
                right = React.createElement('span', null);
            }

            return React.createElement(
                List.Item,
                {
                    key: model._id,
                    style: { paddingTop: 10, paddingLeft: 62 },
                    leftAvatar: left,
                    rightAvatar: right,
                    disableTouchTap: true },
                name,
                React.createElement(
                    ClearFix,
                    { style: { paddingRight: 5 } },
                    React.createElement(
                        'p',
                        { className: 'content ' + (isOwner ? "owner" : "") },
                        React.createElement(
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
}(Component);

Main.defaultProps = {
    template: Template
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFJLFlBQU0sUUFBUSxPQUFSLENBQU47QUFDQSxJQUFDLFlBQVcsTUFBWCxTQUFEOztlQUNrQixRQUFRLGFBQVI7O0lBQWpCO0FBQUQsSUFBUSw0QkFBUjs7Z0JBQ1UsUUFBUSxlQUFSOztBQUFWLElBQUMsMkJBQUQ7QUFDQSxpQkFBVyxRQUFRLGVBQVIsQ0FBWDtBQUNBLFdBQUssUUFBUSxRQUFSLENBQUw7QUFDQSxXQUFLLFFBQVEsWUFBUixDQUFMO0FBQ0EsY0FBUSxRQUFRLGVBQVIsQ0FBUjtJQUVpQjs7O0FBQ2pCLGFBRGlCLElBQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxNQUNDOzsyRUFERCxpQkFFUCxRQURROzs0QkFFRSxNQUFNLE1BQU4sQ0FGRjtZQUVULDBCQUZTO1lBRUgsd0JBRkc7O0FBR2QsY0FBSyxLQUFMLEdBQVcsRUFBQyxVQUFELEVBQU0sUUFBTixFQUFYLENBSGM7QUFJZCxjQUFLLEVBQUwsR0FBUSxRQUFRLEVBQVIsQ0FBVyxJQUFYLENBQVIsQ0FKYztBQUtkLGNBQUssS0FBTCxHQUFXLE1BQUssRUFBTCxDQUFRLElBQVIsQ0FBYSxFQUFDLFFBQU8sR0FBUCxFQUFkLENBQVgsQ0FMYzs7S0FBbEI7O2lCQURpQjs7a0RBU1MsT0FBTTtpQ0FDWixNQUFNLE1BQU4sQ0FEWTtnQkFDdkIsMkJBRHVCO2dCQUNqQix5QkFEaUI7O0FBRTVCLGdCQUFHLFFBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxJQUFtQixPQUFLLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFDN0IsT0FESjtBQUVBLGdCQUFHLFFBQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxFQUNMLEtBQUssRUFBTCxHQUFRLFFBQVEsRUFBUixDQUFXLElBQVgsQ0FBUixDQURKO0FBRUEsaUJBQUssS0FBTCxHQUFXLEtBQUssRUFBTCxDQUFRLElBQVIsQ0FB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QUFNLE9BQU47eUJBRFg7cUJBREo7aUJBUko7YUFESixDQWJJOzs7O1dBRE47RUFBaUI7O0FBaUN2QixLQUFLLFlBQUwsR0FBa0I7QUFDZCxjQUFTLFFBQVQ7Q0FESiIsImZpbGUiOiJjb21tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0PXJlcXVpcmUoJ3JlYWN0JyksXG4gICAge0NvbXBvbmVudH09UmVhY3QsXG4gICAge0F2YXRhcixDbGVhckZpeH09cmVxdWlyZSgnbWF0ZXJpYWwtdWknKSxcbiAgICB7U2VydmljZX09cmVxdWlyZSgnLi4vZGIvc2VydmljZScpLFxuICAgIENvbW1hbmRCYXI9cmVxdWlyZSgnLi9jb21tYW5kLWJhcicpLFxuICAgIExpc3Q9cmVxdWlyZSgnLi9saXN0JyksXG4gICAgVXNlcj1yZXF1aXJlKCcuLi9kYi91c2VyJyksXG4gICAgQ29tbWVudD1yZXF1aXJlKCcuLi9kYi9jb21tZW50Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdmFyIHt0eXBlLCBfaWR9PXByb3BzLnBhcmFtcztcbiAgICAgICAgdGhpcy5zdGF0ZT17dHlwZSxfaWR9XG4gICAgICAgIHRoaXMuZGI9Q29tbWVudC5vZih0eXBlKVxuICAgICAgICB0aGlzLl9kYXRhPXRoaXMuZGIuZmluZCh7cGFyZW50Ol9pZH0pXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcyl7XG4gICAgICAgIHZhciB7dHlwZSwgX2lkfT1wcm9wcy5wYXJhbXM7XG4gICAgICAgIGlmKHR5cGU9PXRoaXMuc3RhdGUudHlwZSAmJiBfaWQ9PXRoaXMuc3RhdGUuX2lkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZih0eXBlIT10aGlzLnN0YXRlLnR5cGUpXG4gICAgICAgICAgICB0aGlzLmRiPUNvbW1lbnQub2YodHlwZSk7XG4gICAgICAgIHRoaXMuX2RhdGE9dGhpcy5kYi5maW5kKHtwYXJlbnQ6X2lkfSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHlwZSxfaWR9KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3BhcmFtczp7X2lkfSwgdGVtcGxhdGU9VGVtcGxhdGV9PXRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tZW50XCI+XG5cbiAgICAgICAgICAgICAgICA8TGlzdCByZWY9XCJsaXN0XCJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw9e3RoaXMuX2RhdGF9XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlPXt0ZW1wbGF0ZX0vPlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJCYWNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKDx0ZXh0YXJlYSByZWY9XCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJnaXZlIHNvbWUgY29tbWVudDoxNDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezE0MH0vPiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlNhdmVcIiwgb25TZWxlY3Q6KCk9PnRoaXMuc2F2ZSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICBcdFx0PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgc2F2ZSgpe1xuICAgICAgICB2YXIge3ZhbHVlOmNvbnRlbnQ9XCJcIn09dGhpcy5yZWZzLmNvbW1lbnQuZ2V0RE9NTm9kZSgpXG4gICAgICAgIGlmKGNvbnRlbnQudHJpbSgpLmxlbmd0aD09MClcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHZhciB1c2VyPVVzZXIuY3VycmVudCxcbiAgICAgICAgICAgIGNvbW1lbnQ9e1xuICAgICAgICAgICAgICAgIHR5cGU6dGhpcy5zdGF0ZS50eXBlLFxuICAgICAgICAgICAgICAgIHBhcmVudDp0aGlzLnN0YXRlLl9pZCxcbiAgICAgICAgICAgICAgICB0aHVtYm5haWw6dXNlci50aHVtYm5haWwsXG4gICAgICAgICAgICAgICAgY29udGVudDpjb250ZW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB0aGlzLmRiLnVwc2VydChjb21tZW50LCh1cGRhdGVkKT0+e1xuICAgICAgICAgICAgdmFye2xpc3QsIGNvbW1lbnQ6Y29tbWVudGVyfT10aGlzLnJlZnNcbiAgICAgICAgICAgIGxpc3Quc2V0U3RhdGUoe2RhdGE6IG5ldyBBcnJheSguLi5saXN0LnN0YXRlLmRhdGEsdXBkYXRlZCl9KVxuICAgICAgICAgICAgY29tbWVudGVyLmdldERPTU5vZGUoKS52YWx1ZT1cIlwiXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5jbGFzcyBUZW1wbGF0ZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIG5hbWUsIGxlZnQsIHJpZ2h0LCB0ZXh0LFxuICAgICAgICAgICAgaXNPd25lcj1tb2RlbC5hdXRob3IuX2lkPT1Vc2VyLmN1cnJlbnQuX2lkO1xuICAgICAgICBpZihpc093bmVyKXtcbiAgICAgICAgICAgIGxlZnQ9KDxzcGFuLz4pXG4gICAgICAgICAgICByaWdodD0oPEF2YXRhciBzcmM9e1VzZXIuY3VycmVudC50aHVtYm5haWx9Lz4pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbmFtZT0oPHNwYW4gc3R5bGU9e3tmb250U2l6ZToneC1zbWFsbCd9fT57bW9kZWwuYXV0aG9yLm5hbWV9PC9zcGFuPilcbiAgICAgICAgICAgIGxlZnQ9KDxBdmF0YXIgc3JjPXttb2RlbC50aHVtYm5haWx9Lz4pXG4gICAgICAgICAgICByaWdodD0oPHNwYW4vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TGlzdC5JdGVtXG4gICAgICAgICAgICAgICAga2V5PXttb2RlbC5faWR9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3twYWRkaW5nVG9wOjEwLHBhZGRpbmdMZWZ0OjYyfX1cbiAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXtsZWZ0fVxuICAgICAgICAgICAgICAgIHJpZ2h0QXZhdGFyPXtyaWdodH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlVG91Y2hUYXA9e3RydWV9PlxuICAgICAgICAgICAgICAgIHtuYW1lfVxuXG4gICAgICAgICAgICAgICAgPENsZWFyRml4IHN0eWxlPXt7cGFkZGluZ1JpZ2h0OjV9fT5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgY29udGVudCAke2lzT3duZXI/XCJvd25lclwiOlwiXCJ9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bW9kZWwuY29udGVudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L0NsZWFyRml4PlxuICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgIClcbiAgICB9XG59XG5cbk1haW4uZGVmYXVsdFByb3BzPXtcbiAgICB0ZW1wbGF0ZTpUZW1wbGF0ZVxufVxuIl19