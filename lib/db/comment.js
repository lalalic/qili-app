'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('./service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var types = {};

var Comment = function (_Service) {
    _inherits(Comment, _Service);

    function Comment() {
        _classCallCheck(this, Comment);

        return _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).apply(this, arguments));
    }

    _createClass(Comment, null, [{
        key: 'of',
        value: function of(type) {
            if (types[type]) return types[type];
            return types[type] = function (_Comment) {
                _inherits(TypedComment, _Comment);

                function TypedComment() {
                    _classCallCheck(this, TypedComment);

                    return _possibleConstructorReturn(this, (TypedComment.__proto__ || Object.getPrototypeOf(TypedComment)).apply(this, arguments));
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
}(_service.Service);

exports.default = Comment;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9jb21tZW50LmpzIl0sIm5hbWVzIjpbInR5cGVzIiwiQ29tbWVudCIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBTSxFQUFaOztJQUNxQkMsTzs7Ozs7Ozs7Ozs7MkJBQ1BDLEksRUFBSztBQUNYLGdCQUFHRixNQUFNRSxJQUFOLENBQUgsRUFDSSxPQUFPRixNQUFNRSxJQUFOLENBQVA7QUFDSixtQkFBT0YsTUFBTUUsSUFBTjtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsd0NBQ2U7QUFDZCwrQkFBVUEsSUFBVjtBQUNIO0FBSEU7O0FBQUE7QUFBQSxjQUF1Q0QsT0FBdkMsQ0FBUDtBQUtIOzs7Ozs7a0JBVGdCQSxPIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NlcnZpY2V9IGZyb20gJy4vc2VydmljZSdcblxuY29uc3QgdHlwZXM9e31cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1lbnQgZXh0ZW5kcyBTZXJ2aWNle1xuICAgIHN0YXRpYyBvZih0eXBlKXtcbiAgICAgICAgaWYodHlwZXNbdHlwZV0pXG4gICAgICAgICAgICByZXR1cm4gdHlwZXNbdHlwZV1cbiAgICAgICAgcmV0dXJuIHR5cGVzW3R5cGVdPWNsYXNzIFR5cGVkQ29tbWVudCBleHRlbmRzIENvbW1lbnR7XG4gICAgICAgICAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3R5cGV9X2NvbW1lbnRgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=