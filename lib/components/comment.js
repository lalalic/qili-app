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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLFNBQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxXQUNDOzsyRUFERCxzQkFFUCxRQURROzs0QkFFRSxNQUFNLE1BQU4sQ0FGRjtZQUVULDBCQUZTO1lBRUgsd0JBRkc7O0FBR2QsY0FBSyxLQUFMLEdBQVcsRUFBQyxVQUFELEVBQU0sUUFBTixFQUFYLENBSGM7QUFJZCxjQUFLLEVBQUwsR0FBUSxrQkFBUSxFQUFSLENBQVcsSUFBWCxDQUFSLENBSmM7QUFLZCxjQUFLLEtBQUwsR0FBVyxNQUFLLEVBQUwsQ0FBUSxJQUFSLENBQWEsRUFBQyxRQUFPLEdBQVAsRUFBZCxDQUFYLENBTGM7O0tBQWxCOztpQkFEaUI7O2tEQVNTLE9BQU07aUNBQ1osTUFBTSxNQUFOLENBRFk7Z0JBQ3ZCLDJCQUR1QjtnQkFDakIseUJBRGlCOztBQUU1QixnQkFBRyxRQUFNLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBbUIsT0FBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQzdCLE9BREo7QUFFQSxnQkFBRyxRQUFNLEtBQUssS0FBTCxDQUFXLElBQVgsRUFDTCxLQUFLLEVBQUwsR0FBUSxrQkFBUSxFQUFSLENBQVcsSUFBWCxDQUFSLENBREo7QUFFQSxpQkFBSyxLQUFMLEdBQVcsS0FBSyxFQUFMLENBQVEsSUFBUixDQUFhLEVBQUMsUUFBTyxHQUFQLEVBQWQsQ0FBWCxDQU40QjtBQU81QixpQkFBSyxRQUFMLENBQWMsRUFBQyxVQUFELEVBQU0sUUFBTixFQUFkLEVBUDRCOzs7O2lDQVV4Qjs7O3lCQUMyQixLQUFLLEtBQUwsQ0FEM0I7Z0JBQ1csYUFBUixPQUFRLElBRFg7Z0JBQ2lCLDJCQURqQjs7QUFFVixtQkFDVTs7a0JBQUssV0FBVSxTQUFWLEVBQUw7Z0JBRUksZ0RBQU0sS0FBSSxNQUFKO0FBQ0YsMkJBQU8sS0FBSyxLQUFMO0FBQ1AsOEJBQVUsUUFBVixFQUZKLENBRko7Z0JBTUk7QUFDSSwrQkFBVSxxQkFBVjtBQUNBLDJCQUFPLENBQ0MsTUFERCxFQUVFLDRDQUFVLEtBQUksU0FBSjtBQUNQLHFDQUFZLHVCQUFaO0FBQ0EsbUNBQVcsR0FBWCxFQUZILENBRkYsRUFLQyxFQUFDLFFBQU8sTUFBUCxFQUFlLFVBQVM7bUNBQUksT0FBSyxJQUFMO3lCQUFKLEVBTDFCLENBQVA7aUJBRkosQ0FOSjthQURWLENBRlU7Ozs7K0JBc0JGOzs7c0NBQ3FCLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBbEIsTUFESDtnQkFDUyw4Q0FBUSx5QkFEakI7O0FBRUYsZ0JBQUcsUUFBUSxJQUFSLEdBQWUsTUFBZixJQUF1QixDQUF2QixFQUNDLE9BREo7O0FBR0EsZ0JBQUksT0FBSyxlQUFLLE9BQUw7Z0JBQ0wsVUFBUTtBQUNKLHNCQUFLLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDTCx3QkFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYO0FBQ1AsMkJBQVUsS0FBSyxTQUFMO0FBQ1YseUJBQVEsT0FBUjthQUpKLENBTkY7QUFZRixpQkFBSyxFQUFMLENBQVEsTUFBUixDQUFlLE9BQWYsRUFBdUIsVUFBQyxPQUFELEVBQVc7b0JBQ3ZCLE9BQU0sT0FBSyxJQUFMLENBQU4sS0FEdUI7O0FBRTlCLHFCQUFLLFFBQUwsQ0FBYyxFQUFDLHlDQUFVLHdDQUFTLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBZ0IsYUFBbkMsRUFBZixFQUY4QjtBQUc5Qix1QkFBSyxJQUFMLENBQVUsT0FBVixDQUFrQixLQUFsQixHQUF3QixFQUF4QixDQUg4QjthQUFYLENBQXZCLENBWkU7Ozs7V0F6Q1c7OztVQTREVixlQUFhO0FBQ2hCOzs7Ozs7Ozs7OztxQ0FDWTtBQUNBLG9CQUFDLFFBQU8sS0FBSyxLQUFMLENBQVAsS0FBRCxDQURBO0FBRUEseUJBRkEsSUFFTSxLQUZOLElBRVksTUFGWixJQUVtQixLQUZuQjtBQUdBLDhCQUFRLE1BQU0sTUFBTixDQUFhLEdBQWIsSUFBa0IsZUFBSyxPQUFMLENBQWEsR0FBYixDQUgxQjtBQUlKLG9CQUFHLE9BQUgsRUFBVztBQUNQLDJCQUFNLDJDQUFOLENBRE87QUFFUCw0QkFBTyxvREFBUSxLQUFLLGVBQUssT0FBTCxDQUFhLFNBQWIsRUFBYixDQUFQLENBRk87aUJBQVgsTUFHSztBQUNELDJCQUFNOzswQkFBTSxPQUFPLEVBQUMsVUFBUyxTQUFULEVBQVIsRUFBTjt3QkFBb0MsTUFBTSxNQUFOLENBQWEsSUFBYjtxQkFBMUMsQ0FEQztBQUVELDJCQUFNLG9EQUFRLEtBQUssTUFBTSxTQUFOLEVBQWIsQ0FBTixDQUZDO0FBR0QsNEJBQU8sMkNBQVAsQ0FIQztpQkFITDs7QUFTQSx1QkFDSTttQ0FBTSxJQUFOOztBQUNJLDZCQUFLLE1BQU0sR0FBTjtBQUNMLCtCQUFPLEVBQUMsWUFBVyxFQUFYLEVBQWMsYUFBWSxFQUFaLEVBQXRCO0FBQ0Esb0NBQVksSUFBWjtBQUNBLHFDQUFhLEtBQWI7QUFDQSx5Q0FBaUIsSUFBakIsRUFMSjtvQkFNSyxJQU5MO29CQVFJOzswQkFBSyxPQUFPLEVBQUMsY0FBYSxDQUFiLEVBQVIsRUFBTDt3QkFDSTs7OEJBQUcseUJBQXNCLFVBQVEsT0FBUixHQUFnQixFQUFoQixDQUF0QixFQUFIOzRCQUNJOzs7Z0NBQU8sTUFBTSxPQUFOOzZCQURYO3lCQURKO3FCQVJKO2lCQURKLENBYkk7Ozs7O3VCQURaOztrQkE3RGEiLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuXG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4uL2RiL3NlcnZpY2UnXG5pbXBvcnQgQ29tbWFuZEJhciBmcm9tICcuL2NvbW1hbmQtYmFyJ1xuaW1wb3J0IExpc3QgZnJvbSAnLi9saXN0J1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vZGIvdXNlcidcbmltcG9ydCBDb21tZW50IGZyb20gJy4uL2RiL2NvbW1lbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnRVSSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB2YXIge3R5cGUsIF9pZH09cHJvcHMucGFyYW1zO1xuICAgICAgICB0aGlzLnN0YXRlPXt0eXBlLF9pZH1cbiAgICAgICAgdGhpcy5kYj1Db21tZW50Lm9mKHR5cGUpXG4gICAgICAgIHRoaXMuX2RhdGE9dGhpcy5kYi5maW5kKHtwYXJlbnQ6X2lkfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKXtcbiAgICAgICAgdmFyIHt0eXBlLCBfaWR9PXByb3BzLnBhcmFtcztcbiAgICAgICAgaWYodHlwZT09dGhpcy5zdGF0ZS50eXBlICYmIF9pZD09dGhpcy5zdGF0ZS5faWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmKHR5cGUhPXRoaXMuc3RhdGUudHlwZSlcbiAgICAgICAgICAgIHRoaXMuZGI9Q29tbWVudC5vZih0eXBlKTtcbiAgICAgICAgdGhpcy5fZGF0YT10aGlzLmRiLmZpbmQoe3BhcmVudDpfaWR9KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHt0eXBlLF9pZH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtwYXJhbXM6e19pZH0sIHRlbXBsYXRlfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiPlxuXG4gICAgICAgICAgICAgICAgPExpc3QgcmVmPVwibGlzdFwiXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsPXt0aGlzLl9kYXRhfVxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZT17dGVtcGxhdGV9Lz5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXIgY2VudGVyaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8dGV4dGFyZWEgcmVmPVwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZ2l2ZSBzb21lIGNvbW1lbnQ6MTQwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsxNDB9Lz4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJTYXZlXCIsIG9uU2VsZWN0OigpPT50aGlzLnNhdmUoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgXHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHNhdmUoKXtcbiAgICAgICAgdmFyIHt2YWx1ZTpjb250ZW50PVwiXCJ9PXRoaXMucmVmcy5jb21tZW50XG4gICAgICAgIGlmKGNvbnRlbnQudHJpbSgpLmxlbmd0aD09MClcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHZhciB1c2VyPVVzZXIuY3VycmVudCxcbiAgICAgICAgICAgIGNvbW1lbnQ9e1xuICAgICAgICAgICAgICAgIHR5cGU6dGhpcy5zdGF0ZS50eXBlLFxuICAgICAgICAgICAgICAgIHBhcmVudDp0aGlzLnN0YXRlLl9pZCxcbiAgICAgICAgICAgICAgICB0aHVtYm5haWw6dXNlci50aHVtYm5haWwsXG4gICAgICAgICAgICAgICAgY29udGVudDpjb250ZW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB0aGlzLmRiLnVwc2VydChjb21tZW50LCh1cGRhdGVkKT0+e1xuICAgICAgICAgICAgY29uc3Qge2xpc3R9PXRoaXMucmVmc1xuICAgICAgICAgICAgbGlzdC5zZXRTdGF0ZSh7ZGF0YTogbmV3IEFycmF5KC4uLmxpc3Quc3RhdGUuZGF0YSx1cGRhdGVkKX0pXG4gICAgICAgICAgICB0aGlzLnJlZnMuY29tbWVudC52YWx1ZT1cIlwiXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XG4gICAgICAgIHRlbXBsYXRlOiBjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgICAgIHZhciB7bW9kZWx9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICAgICAgICAgIG5hbWUsIGxlZnQsIHJpZ2h0LCB0ZXh0LFxuICAgICAgICAgICAgICAgICAgICBpc093bmVyPW1vZGVsLmF1dGhvci5faWQ9PVVzZXIuY3VycmVudC5faWQ7XG4gICAgICAgICAgICAgICAgaWYoaXNPd25lcil7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ9KDxzcGFuLz4pXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0PSg8QXZhdGFyIHNyYz17VXNlci5jdXJyZW50LnRodW1ibmFpbH0vPilcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbmFtZT0oPHNwYW4gc3R5bGU9e3tmb250U2l6ZToneC1zbWFsbCd9fT57bW9kZWwuYXV0aG9yLm5hbWV9PC9zcGFuPilcbiAgICAgICAgICAgICAgICAgICAgbGVmdD0oPEF2YXRhciBzcmM9e21vZGVsLnRodW1ibmFpbH0vPilcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ9KDxzcGFuLz4pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXttb2RlbC5faWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3BhZGRpbmdUb3A6MTAscGFkZGluZ0xlZnQ6NjJ9fVxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17bGVmdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0QXZhdGFyPXtyaWdodH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVUb3VjaFRhcD17dHJ1ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bmFtZX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3BhZGRpbmdSaWdodDo1fX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgY29udGVudCAke2lzT3duZXI/XCJvd25lclwiOlwiXCJ9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnttb2RlbC5jb250ZW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19