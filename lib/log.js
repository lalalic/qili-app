"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Log = exports.REDUCER = exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

var _http = require("material-ui/svg-icons/action/http");

var _http2 = _interopRequireDefault(_http);

var _error = require("material-ui/svg-icons/alert/error");

var _error2 = _interopRequireDefault(_error);

var _warning = require("material-ui/svg-icons/alert/warning");

var _warning2 = _interopRequireDefault(_warning);

var _assignment = require("material-ui/svg-icons/action/assignment");

var _assignment2 = _interopRequireDefault(_assignment);

var _ = require(".");

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CommandBar = _.UI.CommandBar,
    Empty = _.UI.Empty;


var LEVEL = {
	warning: 2,
	error: 3,
	http: 9,
	all: null,
	"9": "http",
	"3": "error",
	"2": "warning",
	"1": "info"
};
var Icons = { Http: _http2.default, Error: _error2.default, Warning: _warning2.default, All: _assignment2.default };
var DOMAIN = "ui.log";

var ACTION = exports.ACTION = {
	FETCH: function FETCH(level) {
		return function (dispatch) {
			return _app2.default.getLog(LEVEL[level]).then(function (logs) {
				return dispatch(ACTION.FETCHED(logs));
			});
		};
	},
	FETCHED: function FETCHED(logs) {
		return { type: "@@" + DOMAIN + "/fetched", payload: logs };
	}
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { logs: [] };
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/fetched":
			return { logs: payload };

	}
	return state;
});

var Log = exports.Log = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
})(function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props = this.props,
			    dispatch = _props.dispatch,
			    level = _props.params.level;

			dispatch(ACTION.FETCH(level));
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {
			if (next.params.level !== this.props.params.level) next.dispatch(ACTION.FETCH(next.params.level));
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    logs = _props2.logs,
			    router = _props2.router,
			    level = _props2.params.level,
			    dispatch = _props2.dispatch;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_materialUi.List,
					null,
					logs.map(function (_ref2) {
						var _id = _ref2._id,
						    level = _ref2.level,
						    createdAt = _ref2.createdAt,
						    message = _ref2.message;
						return _react2.default.createElement(_materialUi.ListItem, { key: _id, primaryText: LEVEL[level + ""] + " on " + createdAt, secondaryText: JSON.stringify(message) });
					})
				),
				_react2.default.createElement(CommandBar, { className: "footbar", dispath: dispatch,
					onSelect: function onSelect(level) {
						return router.replace("/log/" + level);
					},
					primary: level,
					items: [{ action: "Back" }, { action: "http", icon: _http2.default }, { action: "error", icon: _error2.default }, { action: "warning", icon: _warning2.default }, { action: "all", icon: _assignment2.default }] })
			);
		}
	}]);

	return _class;
}(_react.Component));
exports.default = Object.assign(Log, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2cuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiTEVWRUwiLCJ3YXJuaW5nIiwiZXJyb3IiLCJodHRwIiwiYWxsIiwiSWNvbnMiLCJIdHRwIiwiRXJyb3IiLCJXYXJuaW5nIiwiQWxsIiwiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJnZXRMb2ciLCJsZXZlbCIsInRoZW4iLCJkaXNwYXRjaCIsIkZFVENIRUQiLCJsb2dzIiwidHlwZSIsInBheWxvYWQiLCJSRURVQ0VSIiwic3RhdGUiLCJMb2ciLCJwcm9wcyIsInBhcmFtcyIsIm5leHQiLCJyb3V0ZXIiLCJtYXAiLCJfaWQiLCJjcmVhdGVkQXQiLCJtZXNzYWdlIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcGxhY2UiLCJhY3Rpb24iLCJpY29uIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU9BLFUsUUFBQUEsVTtJQUFZQyxLLFFBQUFBLEs7OztBQUVuQixJQUFNQyxRQUFNO0FBQ1BDLFVBQVEsQ0FERDtBQUVQQyxRQUFNLENBRkM7QUFHUEMsT0FBSyxDQUhFO0FBSVBDLE1BQUksSUFKRztBQUtKLE1BQUksTUFMQTtBQU1KLE1BQUksT0FOQTtBQU9KLE1BQUksU0FQQTtBQVFKLE1BQUk7QUFSQSxDQUFaO0FBVUEsSUFBTUMsUUFBTSxFQUFDQyxvQkFBRCxFQUFPQyxzQkFBUCxFQUFjQywwQkFBZCxFQUF1QkMseUJBQXZCLEVBQVo7QUFDQSxJQUFNQyxTQUFPLFFBQWI7O0FBRU8sSUFBTUMsMEJBQU87QUFDbkJDLFFBQU07QUFBQSxTQUFPO0FBQUEsVUFBVSxjQUFjQyxNQUFkLENBQXFCYixNQUFNYyxLQUFOLENBQXJCLEVBQW1DQyxJQUFuQyxDQUF3QztBQUFBLFdBQU1DLFNBQVNMLE9BQU9NLE9BQVAs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YWN0XCJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW19IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQgSHR0cCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9odHRwXCJcbmltcG9ydCBFcnJvciBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FsZXJ0L2Vycm9yXCJcbmltcG9ydCBXYXJuaW5nIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvd2FybmluZ1wiXG5pbXBvcnQgQWxsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Fzc2lnbm1lbnRcIlxuXG5pbXBvcnQge1VJfSBmcm9tIFwiLlwiXG5pbXBvcnQgZGJBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcblxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5fT1VSVxuXG5jb25zdCBMRVZFTD17XG4gICAgXHR3YXJuaW5nOjIsXG4gICAgXHRlcnJvcjozLFxuICAgIFx0aHR0cDo5LFxuICAgIFx0YWxsOm51bGwsXG4gICAgICAgIFwiOVwiOlwiaHR0cFwiLFxuICAgICAgICBcIjNcIjpcImVycm9yXCIsXG4gICAgICAgIFwiMlwiOlwid2FybmluZ1wiLFxuICAgICAgICBcIjFcIjpcImluZm9cIlxuICAgIH1cbmNvbnN0IEljb25zPXtIdHRwLCBFcnJvciwgV2FybmluZywgQWxsfVxuY29uc3QgRE9NQUlOPVwidWkubG9nXCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdEZFVENIOmxldmVsPT5kaXNwYXRjaD0+ZGJBcHBsaWNhdGlvbi5nZXRMb2coTEVWRUxbbGV2ZWxdKS50aGVuKGxvZ3M9PmRpc3BhdGNoKEFDVElPTi5GRVRDSEVEKGxvZ3MpKSlcblx0LEZFVENIRUQ6IGxvZ3M9Pih7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAscGF5bG9hZDpsb2dzfSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuICAgIFtET01BSU5dOihzdGF0ZT17bG9nczpbXX0se3R5cGUscGF5bG9hZH0pPT57XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRgOlxuXHRcdHJldHVybiB7bG9nczpwYXlsb2FkfVxuXHRcdFxuXHRcdH1cbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTG9nPWNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0pKFxuY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc3Qge2Rpc3BhdGNoLHBhcmFtczp7bGV2ZWx9fT10aGlzLnByb3BzXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIKGxldmVsKSlcblx0fVxuXHRcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRpZihuZXh0LnBhcmFtcy5sZXZlbCE9PXRoaXMucHJvcHMucGFyYW1zLmxldmVsKVxuXHRcdFx0bmV4dC5kaXNwYXRjaChBQ1RJT04uRkVUQ0gobmV4dC5wYXJhbXMubGV2ZWwpKVxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtsb2dzLHJvdXRlcixwYXJhbXM6e2xldmVsfSxkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8TGlzdD5cblx0XHRcdFx0XHR7bG9ncy5tYXAoKHtfaWQsbGV2ZWwsY3JlYXRlZEF0LG1lc3NhZ2V9KT0+XG5cdFx0XHRcdFx0XHQoPExpc3RJdGVtIGtleT17X2lkfSBwcmltYXJ5VGV4dD17YCR7TEVWRUxbbGV2ZWwrXCJcIl19IG9uICR7Y3JlYXRlZEF0fWB9IHNlY29uZGFyeVRleHQ9e0pTT04uc3RyaW5naWZ5KG1lc3NhZ2UpfS8+KVxuXHRcdFx0XHRcdCl9XG5cdFx0XHRcdDwvTGlzdD5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgZGlzcGF0aD17ZGlzcGF0Y2h9XG5cdFx0XHRcdFx0b25TZWxlY3Q9e2xldmVsPT5yb3V0ZXIucmVwbGFjZShgL2xvZy8ke2xldmVsfWApfVxuXHRcdFx0XHRcdHByaW1hcnk9e2xldmVsfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCJodHRwXCIsIGljb246SHR0cH0sXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiZXJyb3JcIiwgaWNvbjpFcnJvcn0sXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwid2FybmluZ1wiLCBpY29uOldhcm5pbmd9LFxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcImFsbFwiLCBpY29uOkFsbH1cblx0XHRcdFx0XHRdfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn0pXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKExvZyx7QUNUSU9OLFJFRFVDRVJ9KVxuIl19