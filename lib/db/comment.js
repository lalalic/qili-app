'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('./service');

var Service = _require.Service;

var Comment = function (_Service) {
    _inherits(Comment, _Service);

    function Comment() {
        _classCallCheck(this, Comment);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Comment).apply(this, arguments));
    }

    _createClass(Comment, null, [{
        key: 'of',
        value: function of(type) {
            return function (_Comment) {
                _inherits(TypedComment, _Comment);

                function TypedComment() {
                    _classCallCheck(this, TypedComment);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(TypedComment).apply(this, arguments));
                }

                _createClass(TypedComment, null, [{
                    key: '_name',
                    get: function get() {
                        return type + '_comment';
                    }
                }]);

                return TypedComment;
            }(Comment);
        }
    }]);

    return Comment;
}(Service);

exports.default = Comment;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9jb21tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2VBQWMsUUFBUSxXQUFSOztJQUFUOztJQUVnQjs7Ozs7Ozs7Ozs7MkJBQ1AsTUFBSztBQUNYOzBCQUFhOzs7Ozs7Ozs7O3dDQUNTO0FBQ2QsK0JBQVUsaUJBQVYsQ0FEYzs7Ozt1QkFEVDtjQUFxQixRQUFsQyxDQURXOzs7O1dBREU7RUFBZ0I7O2tCQUFoQiIsImZpbGUiOiJjb21tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtTZXJ2aWNlfT1yZXF1aXJlKCcuL3NlcnZpY2UnKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tZW50IGV4dGVuZHMgU2VydmljZXtcbiAgICBzdGF0aWMgb2YodHlwZSl7XG4gICAgICAgIHJldHVybiBjbGFzcyBUeXBlZENvbW1lbnQgZXh0ZW5kcyBDb21tZW50e1xuICAgICAgICAgICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHt0eXBlfV9jb21tZW50YFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19