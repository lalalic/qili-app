'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _error = require('material-ui/lib/svg-icons/alert/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var Empty = require('./empty');
var Loading = require('./loading');
var Async = function (_Component) {
    _inherits(Async, _Component);

    function Async(props) {
        _classCallCheck(this, Async);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Async).call(this, props));

        _this.state = {};
        var model = _this.props.model;


        if (_this.__isAsyncModel(model)) {
            _this.state.loading = true;
            _this.__resolveModel(model);
        } else _this.state.data = model;
        return _this;
    }

    _createClass(Async, [{
        key: '__isAsyncModel',
        value: function __isAsyncModel(model) {
            var _ref = model || {};

            var fetch = _ref.fetch;
            var then = _ref.then;

            return fetch || then;
        }
    }, {
        key: '__resolveModel',
        value: function __resolveModel(model) {
            var _this2 = this;

            if (!model) return;
            var success = function success(data) {
                return _this2.setState({ data: data, loadError: undefined, loading: undefined });
            },
                fail = function fail(e) {
                return _this2.setState({ loadError: e.message, loading: undefined });
            };

            if (typeof model.fetch != 'undefined') {
                //minimongoo @Todo: remove and always with Promise
                model.fetch(success, fail);
            } else if (typeof model.then != 'undefined') {
                //promise
                model.then(success, fail);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var model = nextProps.model;

            if (model != this.props.model && model) {
                if (this.__isAsyncModel(model)) {
                    this.setState({ loading: true });
                    this.__resolveModel(model);
                } else this.setState({ data: model });
            }
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            var data = this.state.data;
            var _props$children = this.props.children;
            var children = _props$children === undefined ? [] : _props$children;

            return !React.isValidElement(children) && Array.isArray(children) && children.length == 0 && (!data || Array.isArray(data) && data.length == 0);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var data = _state.data;
            var loadError = _state.loadError;
            var loading = _state.loading;
            var _props = this.props;
            var emptyEl = _props.empty;
            var loadingEl = _props.loading;
            var loadErrorEl;

            if (loadError) loadErrorEl = this.renderError(loadError);

            if (this.isEmpty()) {
                if (loadError) return loadErrorEl;

                if (loading) return loadingEl;else return emptyEl;
            } else {
                return this.renderContent(loadError ? loadErrorEl : loading ? loadingEl : undefined);
            }
        }
    }, {
        key: 'renderError',
        value: function renderError(error) {
            return React.createElement(Empty, { text: error, icon: React.createElement(_error2.default, null) });
        }
    }, {
        key: 'renderContent',
        value: function renderContent(loadingOrError) {
            return React.createElement(
                'div',
                null,
                loadingOrError
            );
        }
    }]);

    return Async;
}(Component);

exports.default = Async;


Async.defaultProps = {
    loading: null,
    empty: null
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2FzeW5jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBS0E7Ozs7Ozs7Ozs7OztBQUxJLFlBQU0sUUFBUSxPQUFSLENBQU47QUFDQSxJQUFDLFlBQVcsTUFBWCxTQUFEO0FBQ0EsWUFBTSxRQUFRLFNBQVIsQ0FBTjtBQUNBLGNBQVEsUUFBUSxXQUFSLENBQVI7SUFJaUI7OztBQUNwQixhQURvQixLQUNwQixDQUFZLEtBQVosRUFBa0I7OEJBREUsT0FDRjs7MkVBREUsa0JBRVAsUUFESzs7QUFFWCxjQUFLLEtBQUwsR0FBVyxFQUFYLENBRlc7WUFHTixRQUFPLE1BQUssS0FBTCxDQUFQLE1BSE07OztBQUtYLFlBQUcsTUFBSyxjQUFMLENBQW9CLEtBQXBCLENBQUgsRUFBOEI7QUFDMUIsa0JBQUssS0FBTCxDQUFXLE9BQVgsR0FBbUIsSUFBbkIsQ0FEMEI7QUFFMUIsa0JBQUssY0FBTCxDQUFvQixLQUFwQixFQUYwQjtTQUE5QixNQUlJLE1BQUssS0FBTCxDQUFXLElBQVgsR0FBZ0IsS0FBaEIsQ0FKSjtxQkFMVztLQUFsQjs7aUJBRG9COzt1Q0FhRixPQUFNO3VCQUNDLFNBQU8sRUFBUCxDQUREOztnQkFDWixtQkFEWTtnQkFDTCxpQkFESzs7QUFFakIsbUJBQU8sU0FBUyxJQUFULENBRlU7Ozs7dUNBS04sT0FBTTs7O0FBQ2pCLGdCQUFHLENBQUMsS0FBRCxFQUFRLE9BQVg7QUFDQSxnQkFBSSxVQUFRLFNBQVIsT0FBUSxDQUFDLElBQUQ7dUJBQVEsT0FBSyxRQUFMLENBQWMsRUFBQyxVQUFELEVBQU0sV0FBVSxTQUFWLEVBQW9CLFNBQVEsU0FBUixFQUF4QzthQUFSO2dCQUNSLE9BQUssU0FBTCxJQUFLLENBQUMsQ0FBRDt1QkFBSyxPQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVUsRUFBRSxPQUFGLEVBQVUsU0FBUSxTQUFSLEVBQW5DO2FBQUwsQ0FIUTs7QUFLakIsZ0JBQUcsT0FBTyxNQUFNLEtBQU4sSUFBYyxXQUFyQixFQUFpQzs7QUFDaEMsc0JBQU0sS0FBTixDQUFZLE9BQVosRUFBb0IsSUFBcEIsRUFEZ0M7YUFBcEMsTUFFTSxJQUFHLE9BQU8sTUFBTSxJQUFOLElBQWEsV0FBcEIsRUFBZ0M7O0FBQ3JDLHNCQUFNLElBQU4sQ0FBVyxPQUFYLEVBQW1CLElBQW5CLEVBRHFDO2FBQW5DOzs7O2tEQUtnQixXQUFVO2dCQUMzQixRQUFPLFVBQVAsTUFEMkI7O0FBRWhDLGdCQUFHLFNBQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxJQUFvQixLQUEzQixFQUFpQztBQUNoQyxvQkFBRyxLQUFLLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBSCxFQUE4QjtBQUMxQix5QkFBSyxRQUFMLENBQWMsRUFBQyxTQUFRLElBQVIsRUFBZixFQUQwQjtBQUUxQix5QkFBSyxjQUFMLENBQW9CLEtBQXBCLEVBRjBCO2lCQUE5QixNQUlJLEtBQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxLQUFMLEVBQWYsRUFKSjthQURKOzs7O2tDQVNLO0FBQ0QsZ0JBQUMsT0FBTSxLQUFLLEtBQUwsQ0FBTixJQUFELENBREM7a0NBRWEsS0FBSyxLQUFMLENBQWIsU0FGQTtnQkFFQSwyQ0FBUyxxQkFGVDs7QUFHTCxtQkFBTyxDQUFDLE1BQU0sY0FBTixDQUFxQixRQUFyQixDQUFELElBQ0EsTUFBTSxPQUFOLENBQWMsUUFBZCxLQUEyQixTQUFTLE1BQVQsSUFBaUIsQ0FBakIsS0FDMUIsQ0FBQyxJQUFELElBQVUsTUFBTSxPQUFOLENBQWMsSUFBZCxLQUF1QixLQUFLLE1BQUwsSUFBYSxDQUFiLENBRmxDLENBSEY7Ozs7aUNBUUo7eUJBQzRCLEtBQUssS0FBTCxDQUQ1QjtnQkFDSSxtQkFESjtnQkFDUyw2QkFEVDtBQUNHLGdCQUFnQix3QkFBaEIsQ0FESDt5QkFFcUMsS0FBSyxLQUFMLENBRnJDO2dCQUVVLGlCQUFOLE1BRko7QUFFRyxnQkFBdUIsbUJBQVIsT0FBZixDQUZIO0FBR0csNEJBSEg7O0FBS0QsZ0JBQUcsU0FBSCxFQUNJLGNBQVksS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBQVosQ0FESjs7QUFHQSxnQkFBRyxLQUFLLE9BQUwsRUFBSCxFQUFrQjtBQUNkLG9CQUFHLFNBQUgsRUFDSSxPQUFPLFdBQVAsQ0FESjs7QUFHQSxvQkFBRyxPQUFILEVBQ0ksT0FBTyxTQUFQLENBREosS0FHSSxPQUFPLE9BQVAsQ0FISjthQUpKLE1BUUs7QUFDRCx1QkFBTyxLQUFLLGFBQUwsQ0FBbUIsWUFBWSxXQUFaLEdBQTJCLFVBQVUsU0FBVixHQUFzQixTQUF0QixDQUFyRCxDQURDO2FBUkw7Ozs7b0NBYVEsT0FBTTtBQUNkLG1CQUFRLG9CQUFDLEtBQUQsSUFBTyxNQUFNLEtBQU4sRUFBYSxNQUFNLDBDQUFOLEVBQXBCLENBQVIsQ0FEYzs7OztzQ0FJSixnQkFBZTtBQUN6QixtQkFBUTs7O2dCQUFNLGNBQU47YUFBUixDQUR5Qjs7OztXQTFFWjtFQUFjOztrQkFBZDs7O0FBK0VyQixNQUFNLFlBQU4sR0FBbUI7QUFDZixhQUFRLElBQVI7QUFDQSxXQUFNLElBQU47Q0FGSiIsImZpbGUiOiJhc3luYy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdD1yZXF1aXJlKCdyZWFjdCcpLFxuICAgIHtDb21wb25lbnR9PVJlYWN0LFxuICAgIEVtcHR5PXJlcXVpcmUoJy4vZW1wdHknKSxcbiAgICBMb2FkaW5nPXJlcXVpcmUoJy4vbG9hZGluZycpO1xuXG5pbXBvcnQgRXJyb3IgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWxlcnQvZXJyb3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3luYyBleHRlbmRzIENvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICB2YXIge21vZGVsfT10aGlzLnByb3BzXG5cbiAgICAgICAgaWYodGhpcy5fX2lzQXN5bmNNb2RlbChtb2RlbCkpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5sb2FkaW5nPXRydWVcbiAgICAgICAgICAgIHRoaXMuX19yZXNvbHZlTW9kZWwobW9kZWwpXG4gICAgICAgIH1lbHNlXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGE9bW9kZWxcbiAgICB9XG5cbiAgICBfX2lzQXN5bmNNb2RlbChtb2RlbCl7XG4gICAgICAgIHZhciB7ZmV0Y2gsIHRoZW59PW1vZGVsfHx7fVxuICAgICAgICByZXR1cm4gZmV0Y2ggfHwgdGhlblxuICAgIH1cblxuICAgIF9fcmVzb2x2ZU1vZGVsKG1vZGVsKXtcbiAgICAgICAgaWYoIW1vZGVsKSByZXR1cm47XG4gICAgICAgIHZhciBzdWNjZXNzPShkYXRhKT0+dGhpcy5zZXRTdGF0ZSh7ZGF0YSxsb2FkRXJyb3I6dW5kZWZpbmVkLGxvYWRpbmc6dW5kZWZpbmVkfSksXG4gICAgICAgICAgICBmYWlsPShlKT0+dGhpcy5zZXRTdGF0ZSh7bG9hZEVycm9yOmUubWVzc2FnZSxsb2FkaW5nOnVuZGVmaW5lZH0pO1xuXG4gICAgICAgIGlmKHR5cGVvZihtb2RlbC5mZXRjaCkhPSd1bmRlZmluZWQnKXsvL21pbmltb25nb28gQFRvZG86IHJlbW92ZSBhbmQgYWx3YXlzIHdpdGggUHJvbWlzZVxuICAgICAgICAgICAgbW9kZWwuZmV0Y2goc3VjY2VzcyxmYWlsKVxuICAgICAgICB9ZWxzZSBpZih0eXBlb2YobW9kZWwudGhlbikhPSd1bmRlZmluZWQnKXsvL3Byb21pc2VcbiAgICAgICAgICAgIG1vZGVsLnRoZW4oc3VjY2VzcyxmYWlsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICB2YXIge21vZGVsfT1uZXh0UHJvcHNcbiAgICAgICAgaWYobW9kZWwhPXRoaXMucHJvcHMubW9kZWwgJiYgbW9kZWwpe1xuICAgICAgICAgICAgaWYodGhpcy5fX2lzQXN5bmNNb2RlbChtb2RlbCkpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvYWRpbmc6dHJ1ZX0pXG4gICAgICAgICAgICAgICAgdGhpcy5fX3Jlc29sdmVNb2RlbChtb2RlbClcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTptb2RlbH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VtcHR5KCl7XG4gICAgICAgIHZhciB7ZGF0YX09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHtjaGlsZHJlbj1bXX09dGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuICFSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbilcbiAgICAgICAgICAgICYmKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmIGNoaWxkcmVuLmxlbmd0aD09MClcbiAgICAgICAgICAgICYmICghZGF0YSB8fCAoQXJyYXkuaXNBcnJheShkYXRhKSAmJiBkYXRhLmxlbmd0aD09MCkpXG4gICAgfVxuXG5cdHJlbmRlcigpe1xuICAgICAgICB2YXIge2RhdGEsbG9hZEVycm9yLGxvYWRpbmd9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB7ZW1wdHk6ZW1wdHlFbCxsb2FkaW5nOmxvYWRpbmdFbH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGxvYWRFcnJvckVsO1xuXG4gICAgICAgIGlmKGxvYWRFcnJvcilcbiAgICAgICAgICAgIGxvYWRFcnJvckVsPXRoaXMucmVuZGVyRXJyb3IobG9hZEVycm9yKVxuXG4gICAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcbiAgICAgICAgICAgIGlmKGxvYWRFcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZEVycm9yRWxcblxuICAgICAgICAgICAgaWYobG9hZGluZylcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZGluZ0VsXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5RWxcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJDb250ZW50KGxvYWRFcnJvciA/IGxvYWRFcnJvckVsIDogKGxvYWRpbmcgPyBsb2FkaW5nRWwgOiB1bmRlZmluZWQpKVxuICAgICAgICB9XG5cdH1cblxuICAgIHJlbmRlckVycm9yKGVycm9yKXtcbiAgICAgICAgcmV0dXJuICg8RW1wdHkgdGV4dD17ZXJyb3J9IGljb249ezxFcnJvci8+fS8+KVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQobG9hZGluZ09yRXJyb3Ipe1xuICAgICAgICByZXR1cm4gKDxkaXY+e2xvYWRpbmdPckVycm9yfTwvZGl2PilcbiAgICB9XG59XG5cbkFzeW5jLmRlZmF1bHRQcm9wcz17XG4gICAgbG9hZGluZzpudWxsLFxuICAgIGVtcHR5Om51bGxcbn1cbiJdfQ==