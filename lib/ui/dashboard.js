"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dashboard = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _dashboard = require("material-ui/svg-icons/action/dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

var _cloud = require("material-ui/svg-icons/file/cloud");

var _cloud2 = _interopRequireDefault(_cloud);

var _assignment = require("material-ui/svg-icons/action/assignment");

var _assignment2 = _interopRequireDefault(_assignment);

var _accountBox = require("material-ui/svg-icons/action/account-box");

var _accountBox2 = _interopRequireDefault(_accountBox);

var _checkUpdate = require("../components/check-update");

var _checkUpdate2 = _interopRequireDefault(_checkUpdate);

var _commandBar = require("../components/command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _empty = require("../components/empty");

var _empty2 = _interopRequireDefault(_empty);

var _graphiql = require("graphiql");

var _graphiql2 = _interopRequireDefault(_graphiql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dashboard = exports.Dashboard = function Dashboard(_ref) {
	var router = _ref.router,
	    fetcher = _ref.fetcher,
	    theme = _ref.theme;
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(_graphiql2.default, {
			ref: function ref(ql) {
				if (ql) {
					var a = document.querySelector('.graphiql-container');
					a.style.position = "absolute";
					a.style.height = theme.page.height - theme.footbar.height + "px";
					ql.setState({ docExplorerOpen: false });
				}
			},
			fetcher: fetcher,
			query: "query{schema}"
		}),
		_react2.default.createElement(_commandBar2.default, { className: "footbar",
			onSelect: function onSelect(cmd) {
				return router.push("/" + cmd.toLowerCase());
			},
			items: [{ action: "Cloud", icon: _react2.default.createElement(_cloud2.default, null) }, { action: "Log", icon: _react2.default.createElement(_assignment2.default, null) }, { action: "My", icon: _react2.default.createElement(
					_checkUpdate2.default,
					null,
					_react2.default.createElement(_accountBox2.default, null)
				) }]
		})
	);
};

exports.default = (0, _recompose.compose)((0, _recompose.getContext)({
	router: _react.PropTypes.object,
	fetcher: _react.PropTypes.func,
	theme: _react.PropTypes.object,
	client: _react.PropTypes.object
}), (0, _reactRedux.connect)(function (_ref2, _ref3) {
	var current = _ref2.qili.current;
	var _fetcher = _ref3.fetcher,
	    client = _ref3.client;

	var apiKey = client.get(current).apiKey;
	return {
		fetcher: function fetcher(params) {
			return _fetcher({
				body: JSON.stringify(params),
				headers: {
					"X-Application-ID2": apiKey
				}
			}).then(function (res) {
				return res.json();
			});
		}
	};
}))(Dashboard);