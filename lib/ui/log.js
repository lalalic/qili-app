"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pullToRefresh = require("pull-to-refresh2");

var _pullToRefresh2 = _interopRequireDefault(_pullToRefresh);

var _recompose = require("recompose");

var _recompose2 = require("../tools/recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Log = function Log(_ref) {
    var logs = _ref.logs,
        loadMore = _ref.loadMore;
    return _react2.default.createElement(
        _pullToRefresh2.default,
        { onMore: loadMore },
        logs.map(function (log) {
            return _react2.default.createElement("div", null);
        })
    );
};

exports.default = (0, _recompose.compose)((0, _recompose2.withFragment)({
    data: function data() {
        return require("./__generated__/log.graphql");
    }
}))(Log);
module.exports = exports['default'];