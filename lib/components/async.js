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
            var data = this.state.data;
            var _props$children = this.props.children;
            var children = _props$children === undefined ? [] : _props$children;

            return !_react2.default.isValidElement(children) && Array.isArray(children) && children.length == 0 && (!data || Array.isArray(data) && data.length == 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2FzeW5jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ3BCLGFBRG9CLEtBQ3BCLENBQVksS0FBWixFQUFrQjs4QkFERSxPQUNGOzsyRUFERSxrQkFFUCxRQURLOztBQUVYLGNBQUssS0FBTCxHQUFXLEVBQVgsQ0FGVztZQUdOLFFBQU8sTUFBSyxLQUFMLENBQVAsTUFITTs7O0FBS1gsWUFBRyxNQUFLLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBSCxFQUE4QjtBQUMxQixrQkFBSyxLQUFMLENBQVcsT0FBWCxHQUFtQixJQUFuQixDQUQwQjtBQUUxQixrQkFBSyxjQUFMLENBQW9CLEtBQXBCLEVBRjBCO1NBQTlCLE1BSUksTUFBSyxLQUFMLENBQVcsSUFBWCxHQUFnQixLQUFoQixDQUpKO3FCQUxXO0tBQWxCOztpQkFEb0I7O3VDQWFGLE9BQU07dUJBQ0MsU0FBTyxFQUFQLENBREQ7O2dCQUNaLG1CQURZO2dCQUNMLGlCQURLOztBQUVqQixtQkFBTyxTQUFTLElBQVQsQ0FGVTs7Ozt1Q0FLTixPQUFNOzs7QUFDakIsZ0JBQUcsQ0FBQyxLQUFELEVBQVEsT0FBWDtBQUNBLGdCQUFJLFVBQVEsU0FBUixPQUFRLENBQUMsSUFBRCxFQUFRO0FBQ3hCLHVCQUFLLFFBQUwsQ0FBYyxFQUFDLFVBQUQsRUFBTSxXQUFVLFNBQVYsRUFBb0IsU0FBUSxTQUFSLEVBQXhDLEVBRHdCO2FBQVI7Z0JBR1IsT0FBSyxTQUFMLElBQUssQ0FBQyxDQUFELEVBQUs7QUFDbEIsdUJBQUssUUFBTCxDQUFjLEVBQUMsV0FBVSxFQUFFLE9BQUYsRUFBVSxTQUFRLFNBQVIsRUFBbkMsRUFEa0I7YUFBTCxDQUxROztBQVNqQixnQkFBRyxPQUFPLE1BQU0sS0FBTixJQUFjLFdBQXJCLEVBQWlDOztBQUNoQyxzQkFBTSxLQUFOLENBQVksT0FBWixFQUFvQixJQUFwQixFQURnQzthQUFwQyxNQUVNLElBQUcsT0FBTyxNQUFNLElBQU4sSUFBYSxXQUFwQixFQUFnQzs7QUFDckMsc0JBQU0sSUFBTixDQUFXLE9BQVgsRUFBbUIsSUFBbkIsRUFEcUM7YUFBbkM7Ozs7a0RBS2dCLFdBQVU7Z0JBQzNCLFFBQU8sVUFBUCxNQUQyQjs7QUFFaEMsZ0JBQUcsU0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLElBQW9CLEtBQTNCLEVBQWlDO0FBQ2hDLG9CQUFHLEtBQUssY0FBTCxDQUFvQixLQUFwQixDQUFILEVBQThCO0FBQzFCLHlCQUFLLFFBQUwsQ0FBYyxFQUFDLFNBQVEsSUFBUixFQUFmLEVBRDBCO0FBRTFCLHlCQUFLLGNBQUwsQ0FBb0IsS0FBcEIsRUFGMEI7aUJBQTlCLE1BSUksS0FBSyxRQUFMLENBQWMsRUFBQyxNQUFLLEtBQUwsRUFBZixFQUpKO2FBREo7Ozs7a0NBU0s7QUFDRCxnQkFBQyxPQUFNLEtBQUssS0FBTCxDQUFOLElBQUQsQ0FEQztrQ0FFYSxLQUFLLEtBQUwsQ0FBYixTQUZBO2dCQUVBLDJDQUFTLHFCQUZUOztBQUdMLG1CQUFPLENBQUMsZ0JBQU0sY0FBTixDQUFxQixRQUFyQixDQUFELElBQ0EsTUFBTSxPQUFOLENBQWMsUUFBZCxLQUEyQixTQUFTLE1BQVQsSUFBaUIsQ0FBakIsS0FDMUIsQ0FBQyxJQUFELElBQVUsTUFBTSxPQUFOLENBQWMsSUFBZCxLQUF1QixLQUFLLE1BQUwsSUFBYSxDQUFiLENBRmxDLENBSEY7Ozs7aUNBUUo7eUJBQzRCLEtBQUssS0FBTCxDQUQ1QjtnQkFDSSxtQkFESjtnQkFDUyw2QkFEVDtBQUNHLGdCQUFnQix3QkFBaEIsQ0FESDt5QkFFcUMsS0FBSyxLQUFMLENBRnJDO2dCQUVVLGlCQUFOLE1BRko7QUFFRyxnQkFBdUIsbUJBQVIsT0FBZixDQUZIO0FBR0csNEJBSEg7O0FBS0QsZ0JBQUcsU0FBSCxFQUNJLGNBQVksS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBQVosQ0FESjs7QUFHQSxnQkFBRyxLQUFLLE9BQUwsRUFBSCxFQUFrQjtBQUNkLG9CQUFHLFNBQUgsRUFDSSxPQUFPLFdBQVAsQ0FESjs7QUFHQSxvQkFBRyxPQUFILEVBQ0ksT0FBTyxTQUFQLENBREosS0FHSSxPQUFPLE9BQVAsQ0FISjthQUpKLE1BUUs7QUFDRCx1QkFBTyxLQUFLLGFBQUwsQ0FBbUIsWUFBWSxXQUFaLEdBQTJCLFVBQVUsU0FBVixHQUFzQixTQUF0QixDQUFyRCxDQURDO2FBUkw7Ozs7b0NBYVEsT0FBTTtBQUNkLG1CQUFRLGlEQUFPLE1BQU0sS0FBTixFQUFhLE1BQU0sb0RBQU4sRUFBcEIsQ0FBUixDQURjOzs7O3NDQUlKLGdCQUFlO0FBQ3pCLG1CQUFROzs7Z0JBQU0sY0FBTjthQUFSLENBRHlCOzs7O1dBOUVaOzs7Ozs7QUFtRnJCLE1BQU0sWUFBTixHQUFtQjtBQUNmLGFBQVEsSUFBUjtBQUNBLFdBQU0sSUFBTjtDQUZKIiwiZmlsZSI6ImFzeW5jLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCBFbXB0eSBmcm9tICcuL2VtcHR5J1xuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi9sb2FkaW5nJ1xuXG5pbXBvcnQgRXJyb3IgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hbGVydC9lcnJvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzeW5jIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXt9XG4gICAgICAgIHZhciB7bW9kZWx9PXRoaXMucHJvcHNcblxuICAgICAgICBpZih0aGlzLl9faXNBc3luY01vZGVsKG1vZGVsKSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmxvYWRpbmc9dHJ1ZVxuICAgICAgICAgICAgdGhpcy5fX3Jlc29sdmVNb2RlbChtb2RlbClcbiAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YT1tb2RlbFxuICAgIH1cblxuICAgIF9faXNBc3luY01vZGVsKG1vZGVsKXtcbiAgICAgICAgdmFyIHtmZXRjaCwgdGhlbn09bW9kZWx8fHt9XG4gICAgICAgIHJldHVybiBmZXRjaCB8fCB0aGVuXG4gICAgfVxuXG4gICAgX19yZXNvbHZlTW9kZWwobW9kZWwpe1xuICAgICAgICBpZighbW9kZWwpIHJldHVybjtcbiAgICAgICAgdmFyIHN1Y2Nlc3M9KGRhdGEpPT57XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2RhdGEsbG9hZEVycm9yOnVuZGVmaW5lZCxsb2FkaW5nOnVuZGVmaW5lZH0pXG5cdFx0XHR9LFxuICAgICAgICAgICAgZmFpbD0oZSk9Pntcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7bG9hZEVycm9yOmUubWVzc2FnZSxsb2FkaW5nOnVuZGVmaW5lZH0pXG5cdFx0XHR9XG5cbiAgICAgICAgaWYodHlwZW9mKG1vZGVsLmZldGNoKSE9J3VuZGVmaW5lZCcpey8vbWluaW1vbmdvbyBAVG9kbzogcmVtb3ZlIGFuZCBhbHdheXMgd2l0aCBQcm9taXNlXG4gICAgICAgICAgICBtb2RlbC5mZXRjaChzdWNjZXNzLGZhaWwpXG4gICAgICAgIH1lbHNlIGlmKHR5cGVvZihtb2RlbC50aGVuKSE9J3VuZGVmaW5lZCcpey8vcHJvbWlzZVxuICAgICAgICAgICAgbW9kZWwudGhlbihzdWNjZXNzLGZhaWwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIHZhciB7bW9kZWx9PW5leHRQcm9wc1xuICAgICAgICBpZihtb2RlbCE9dGhpcy5wcm9wcy5tb2RlbCAmJiBtb2RlbCl7XG4gICAgICAgICAgICBpZih0aGlzLl9faXNBc3luY01vZGVsKG1vZGVsKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZzp0cnVlfSlcbiAgICAgICAgICAgICAgICB0aGlzLl9fcmVzb2x2ZU1vZGVsKG1vZGVsKVxuICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOm1vZGVsfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW1wdHkoKXtcbiAgICAgICAgdmFyIHtkYXRhfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge2NoaWxkcmVuPVtdfT10aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gIVJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKVxuICAgICAgICAgICAgJiYoQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgY2hpbGRyZW4ubGVuZ3RoPT0wKVxuICAgICAgICAgICAgJiYgKCFkYXRhIHx8IChBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEubGVuZ3RoPT0wKSlcbiAgICB9XG5cblx0cmVuZGVyKCl7XG4gICAgICAgIHZhciB7ZGF0YSxsb2FkRXJyb3IsbG9hZGluZ309dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHtlbXB0eTplbXB0eUVsLGxvYWRpbmc6bG9hZGluZ0VsfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgbG9hZEVycm9yRWw7XG5cbiAgICAgICAgaWYobG9hZEVycm9yKVxuICAgICAgICAgICAgbG9hZEVycm9yRWw9dGhpcy5yZW5kZXJFcnJvcihsb2FkRXJyb3IpXG5cbiAgICAgICAgaWYodGhpcy5pc0VtcHR5KCkpe1xuICAgICAgICAgICAgaWYobG9hZEVycm9yKVxuICAgICAgICAgICAgICAgIHJldHVybiBsb2FkRXJyb3JFbFxuXG4gICAgICAgICAgICBpZihsb2FkaW5nKVxuICAgICAgICAgICAgICAgIHJldHVybiBsb2FkaW5nRWxcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHlFbFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckNvbnRlbnQobG9hZEVycm9yID8gbG9hZEVycm9yRWwgOiAobG9hZGluZyA/IGxvYWRpbmdFbCA6IHVuZGVmaW5lZCkpXG4gICAgICAgIH1cblx0fVxuXG4gICAgcmVuZGVyRXJyb3IoZXJyb3Ipe1xuICAgICAgICByZXR1cm4gKDxFbXB0eSB0ZXh0PXtlcnJvcn0gaWNvbj17PEVycm9yLz59Lz4pXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudChsb2FkaW5nT3JFcnJvcil7XG4gICAgICAgIHJldHVybiAoPGRpdj57bG9hZGluZ09yRXJyb3J9PC9kaXY+KVxuICAgIH1cbn1cblxuQXN5bmMuZGVmYXVsdFByb3BzPXtcbiAgICBsb2FkaW5nOm51bGwsXG4gICAgZW1wdHk6bnVsbFxufVxuIl19