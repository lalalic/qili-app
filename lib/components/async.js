'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _empty = require('./empty');

var _empty2 = _interopRequireDefault(_empty);

var _loading = require('./loading');

var _loading2 = _interopRequireDefault(_loading);

var _error = require('material-ui/svg-icons/alert/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Async = function (_Component) {
    _inherits(Async, _Component);

    function Async(props) {
        _classCallCheck(this, Async);

        var _this = _possibleConstructorReturn(this, (Async.__proto__ || Object.getPrototypeOf(Async)).call(this, props));

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
            var _ref = model || {},
                fetch = _ref.fetch,
                then = _ref.then;

            return fetch || then;
        }
    }, {
        key: '__resolveModel',
        value: function __resolveModel(model) {
            var _this2 = this;

            if (!model) return;
            var success = function success(data) {
                _this2.setState({ data: data, loadError: undefined, loading: undefined });
            },
                fail = function fail(e) {
                _this2.setState({ loadError: e.message, loading: undefined });
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
            var data = this.state.data,
                _props$children = this.props.children,
                children = _props$children === undefined ? [] : _props$children;

            return !_react2.default.isValidElement(children) && Array.isArray(children) && children.length == 0 && (!data || Array.isArray(data) && data.length == 0);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                data = _state.data,
                loadError = _state.loadError,
                loading = _state.loading,
                _props = this.props,
                emptyEl = _props.empty,
                loadingEl = _props.loading,
                loadErrorEl;


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
            return _react2.default.createElement(_empty2.default, { text: error, icon: _react2.default.createElement(_error2.default, null) });
        }
    }, {
        key: 'renderContent',
        value: function renderContent(loadingOrError) {
            return _react2.default.createElement(
                'div',
                null,
                loadingOrError
            );
        }
    }]);

    return Async;
}(_react.Component);

exports.default = Async;


Async.defaultProps = {
    loading: null,
    empty: null
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2FzeW5jLmpzIl0sIm5hbWVzIjpbIkFzeW5jIiwicHJvcHMiLCJzdGF0ZSIsIm1vZGVsIiwiX19pc0FzeW5jTW9kZWwiLCJsb2FkaW5nIiwiX19yZXNvbHZlTW9kZWwiLCJkYXRhIiwiZmV0Y2giLCJ0aGVuIiwic3VjY2VzcyIsInNldFN0YXRlIiwibG9hZEVycm9yIiwidW5kZWZpbmVkIiwiZmFpbCIsImUiLCJtZXNzYWdlIiwibmV4dFByb3BzIiwiY2hpbGRyZW4iLCJpc1ZhbGlkRWxlbWVudCIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImVtcHR5RWwiLCJlbXB0eSIsImxvYWRpbmdFbCIsImxvYWRFcnJvckVsIiwicmVuZGVyRXJyb3IiLCJpc0VtcHR5IiwicmVuZGVyQ29udGVudCIsImVycm9yIiwibG9hZGluZ09yRXJyb3IiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7O0FBQ3BCLG1CQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsa0hBQ0xBLEtBREs7O0FBRVgsY0FBS0MsS0FBTCxHQUFXLEVBQVg7QUFGVyxZQUdOQyxLQUhNLEdBR0MsTUFBS0YsS0FITixDQUdORSxLQUhNOzs7QUFLWCxZQUFHLE1BQUtDLGNBQUwsQ0FBb0JELEtBQXBCLENBQUgsRUFBOEI7QUFDMUIsa0JBQUtELEtBQUwsQ0FBV0csT0FBWCxHQUFtQixJQUFuQjtBQUNBLGtCQUFLQyxjQUFMLENBQW9CSCxLQUFwQjtBQUNILFNBSEQsTUFJSSxNQUFLRCxLQUFMLENBQVdLLElBQVgsR0FBZ0JKLEtBQWhCO0FBVE87QUFVZDs7Ozt1Q0FFY0EsSyxFQUFNO0FBQUEsdUJBQ0NBLFNBQU8sRUFEUjtBQUFBLGdCQUNaSyxLQURZLFFBQ1pBLEtBRFk7QUFBQSxnQkFDTEMsSUFESyxRQUNMQSxJQURLOztBQUVqQixtQkFBT0QsU0FB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OztBQW1GckJBLE1BQU1nQyxZQUFOLEdBQW1CO0FBQ2YzQixhQUFRLElBRE87QUFFZm1CLFdBQU07QUFGUyxDQUFuQiIsImZpbGUiOiJhc3luYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgRW1wdHkgZnJvbSAnLi9lbXB0eSdcbmltcG9ydCBMb2FkaW5nIGZyb20gJy4vbG9hZGluZydcblxuaW1wb3J0IEVycm9yIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvZXJyb3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3luYyBleHRlbmRzIENvbXBvbmVudHtcblx0Y29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICB2YXIge21vZGVsfT10aGlzLnByb3BzXG5cbiAgICAgICAgaWYodGhpcy5fX2lzQXN5bmNNb2RlbChtb2RlbCkpe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5sb2FkaW5nPXRydWVcbiAgICAgICAgICAgIHRoaXMuX19yZXNvbHZlTW9kZWwobW9kZWwpXG4gICAgICAgIH1lbHNlXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGE9bW9kZWxcbiAgICB9XG5cbiAgICBfX2lzQXN5bmNNb2RlbChtb2RlbCl7XG4gICAgICAgIHZhciB7ZmV0Y2gsIHRoZW59PW1vZGVsfHx7fVxuICAgICAgICByZXR1cm4gZmV0Y2ggfHwgdGhlblxuICAgIH1cblxuICAgIF9fcmVzb2x2ZU1vZGVsKG1vZGVsKXtcbiAgICAgICAgaWYoIW1vZGVsKSByZXR1cm47XG4gICAgICAgIHZhciBzdWNjZXNzPShkYXRhKT0+e1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtkYXRhLGxvYWRFcnJvcjp1bmRlZmluZWQsbG9hZGluZzp1bmRlZmluZWR9KVxuXHRcdFx0fSxcbiAgICAgICAgICAgIGZhaWw9KGUpPT57XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2xvYWRFcnJvcjplLm1lc3NhZ2UsbG9hZGluZzp1bmRlZmluZWR9KVxuXHRcdFx0fVxuXG4gICAgICAgIGlmKHR5cGVvZihtb2RlbC5mZXRjaCkhPSd1bmRlZmluZWQnKXsvL21pbmltb25nb28gQFRvZG86IHJlbW92ZSBhbmQgYWx3YXlzIHdpdGggUHJvbWlzZVxuICAgICAgICAgICAgbW9kZWwuZmV0Y2goc3VjY2VzcyxmYWlsKVxuICAgICAgICB9ZWxzZSBpZih0eXBlb2YobW9kZWwudGhlbikhPSd1bmRlZmluZWQnKXsvL3Byb21pc2VcbiAgICAgICAgICAgIG1vZGVsLnRoZW4oc3VjY2VzcyxmYWlsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICB2YXIge21vZGVsfT1uZXh0UHJvcHNcbiAgICAgICAgaWYobW9kZWwhPXRoaXMucHJvcHMubW9kZWwgJiYgbW9kZWwpe1xuICAgICAgICAgICAgaWYodGhpcy5fX2lzQXN5bmNNb2RlbChtb2RlbCkpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvYWRpbmc6dHJ1ZX0pXG4gICAgICAgICAgICAgICAgdGhpcy5fX3Jlc29sdmVNb2RlbChtb2RlbClcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTptb2RlbH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VtcHR5KCl7XG4gICAgICAgIHZhciB7ZGF0YX09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHtjaGlsZHJlbj1bXX09dGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuICFSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbilcbiAgICAgICAgICAgICYmKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmIGNoaWxkcmVuLmxlbmd0aD09MClcbiAgICAgICAgICAgICYmICghZGF0YSB8fCAoQXJyYXkuaXNBcnJheShkYXRhKSAmJiBkYXRhLmxlbmd0aD09MCkpXG4gICAgfVxuXG5cdHJlbmRlcigpe1xuICAgICAgICB2YXIge2RhdGEsbG9hZEVycm9yLGxvYWRpbmd9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB7ZW1wdHk6ZW1wdHlFbCxsb2FkaW5nOmxvYWRpbmdFbH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGxvYWRFcnJvckVsO1xuXG4gICAgICAgIGlmKGxvYWRFcnJvcilcbiAgICAgICAgICAgIGxvYWRFcnJvckVsPXRoaXMucmVuZGVyRXJyb3IobG9hZEVycm9yKVxuXG4gICAgICAgIGlmKHRoaXMuaXNFbXB0eSgpKXtcbiAgICAgICAgICAgIGlmKGxvYWRFcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZEVycm9yRWxcblxuICAgICAgICAgICAgaWYobG9hZGluZylcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZGluZ0VsXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5RWxcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJDb250ZW50KGxvYWRFcnJvciA/IGxvYWRFcnJvckVsIDogKGxvYWRpbmcgPyBsb2FkaW5nRWwgOiB1bmRlZmluZWQpKVxuICAgICAgICB9XG5cdH1cblxuICAgIHJlbmRlckVycm9yKGVycm9yKXtcbiAgICAgICAgcmV0dXJuICg8RW1wdHkgdGV4dD17ZXJyb3J9IGljb249ezxFcnJvci8+fS8+KVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQobG9hZGluZ09yRXJyb3Ipe1xuICAgICAgICByZXR1cm4gKDxkaXY+e2xvYWRpbmdPckVycm9yfTwvZGl2PilcbiAgICB9XG59XG5cbkFzeW5jLmRlZmF1bHRQcm9wcz17XG4gICAgbG9hZGluZzpudWxsLFxuICAgIGVtcHR5Om51bGxcbn1cbiJdfQ==