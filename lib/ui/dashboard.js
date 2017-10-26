"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dashboard = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _graphiql = require("graphiql");

var _graphiql2 = _interopRequireDefault(_graphiql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dashboard = exports.Dashboard = function Dashboard(_ref) {
	var fetcher = _ref.fetcher,
	    height = _ref.height;
	return _react2.default.createElement(_graphiql2.default, {
		ref: function ref(ql) {
			if (ql) {
				var a = document.querySelector('.graphiql-container');
				a.style.position = "absolute";
				a.style.height = height + "px";
				ql.setState({ docExplorerOpen: false });
			}
		},
		fetcher: fetcher

	});
};

exports.default = (0, _recompose.compose)((0, _recompose.getContext)({
	theme: _react.PropTypes.object,
	client: _react.PropTypes.object,
	showMessage: _react.PropTypes.func
}), (0, _reactRedux.connect)(function (_ref2, _ref3) {
	var current = _ref2.qili.current;
	var client = _ref3.client,
	    theme = _ref3.theme,
	    showMessage = _ref3.showMessage;

	var height = theme.page.height - theme.footbar.height;
	var apiKey = client.get(current).apiKey;
	return {
		fetcher: function fetcher(params) {
			if (apiKey) {
				return client.fetcher({
					body: JSON.stringify(params),
					headers: {
						"X-Application-ID2": apiKey
					}
				});
			} else {
				showMessage({ level: "error", message: "system  error" });
			}
		},

		height: height
	};
}))(Dashboard);