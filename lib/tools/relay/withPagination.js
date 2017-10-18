"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withPagination = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _recompose = require("recompose");

var _withQuery = require("./withQuery");

var _withQuery2 = _interopRequireDefault(_withQuery);

var _withFragment = require("./withFragment");

var _withFragment2 = _interopRequireDefault(_withFragment);

var _reactRelay = require("react-relay");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withPagination = exports.withPagination = function withPagination(options) {
    return function (BaseComponent) {
        var factory = (0, _recompose.createEagerFactory)((0, _recompose.withContext)({ pagination: _react.PropTypes.any }, function () {
            return { pagination: options };
        })(BaseComponent));

        var WithPagination = (0, _withQuery2.default)(options)(function (props) {
            return factory(props);
        });

        if (process.env.NODE_ENV !== 'production') {
            return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'withPagination'))(WithPagination);
        }

        return WithPagination;
    };
};

exports.default = withPagination;