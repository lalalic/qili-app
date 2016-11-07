'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _service = require('./service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comment = function (_Service) {
    (0, _inherits3.default)(Comment, _Service);

    function Comment() {
        (0, _classCallCheck3.default)(this, Comment);
        return (0, _possibleConstructorReturn3.default)(this, (Comment.__proto__ || (0, _getPrototypeOf2.default)(Comment)).apply(this, arguments));
    }

    (0, _createClass3.default)(Comment, null, [{
        key: 'of',
        value: function of(type) {
            return function (_Comment) {
                (0, _inherits3.default)(TypedComment, _Comment);

                function TypedComment() {
                    (0, _classCallCheck3.default)(this, TypedComment);
                    return (0, _possibleConstructorReturn3.default)(this, (TypedComment.__proto__ || (0, _getPrototypeOf2.default)(TypedComment)).apply(this, arguments));
                }

                (0, _createClass3.default)(TypedComment, null, [{
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
}(_service.Service);

exports.default = Comment;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9jb21tZW50LmpzIl0sIm5hbWVzIjpbIkNvbW1lbnQiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBRXFCQSxPOzs7Ozs7Ozs7OzJCQUNQQyxJLEVBQUs7QUFDWDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx3Q0FDc0I7QUFDZCwrQkFBVUEsSUFBVjtBQUNIO0FBSEw7QUFBQTtBQUFBLGNBQWtDRCxPQUFsQztBQUtIOzs7OztrQkFQZ0JBLE8iLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tZW50IGV4dGVuZHMgU2VydmljZXtcbiAgICBzdGF0aWMgb2YodHlwZSl7XG4gICAgICAgIHJldHVybiBjbGFzcyBUeXBlZENvbW1lbnQgZXh0ZW5kcyBDb21tZW50e1xuICAgICAgICAgICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHt0eXBlfV9jb21tZW50YFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19