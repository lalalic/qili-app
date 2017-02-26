"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Log = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

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
var DOMAIN = exports.DOMAIN = "ui.log";
var INIT_STATE = { logs: [] };
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

var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/fetched":
			return { logs: payload };
		case "@@" + DOMAIN + "/CLEAR":
			return INIT_STATE;
	}
	return state;
};

var Log = exports.Log = function (_Component) {
	_inherits(Log, _Component);

	function Log() {
		_classCallCheck(this, Log);

		return _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).apply(this, arguments));
	}

	_createClass(Log, [{
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
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.props.dispatch({ type: "@@" + DOMAIN + "/CLEAR" });
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    logs = _props2.logs,
			    level = _props2.params.level,
			    dispatch = _props2.dispatch;
			var router = this.context.router;

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
				_react2.default.createElement(CommandBar, { className: "footbar", dispatch: dispatch,
					onSelect: function onSelect(level) {
						return router.replace("/log/" + level);
					},
					primary: level,
					items: [{ action: "Back" }, { action: "http", icon: _react2.default.createElement(_http2.default, null) }, { action: "error", icon: _react2.default.createElement(_error2.default, null) }, { action: "warning", icon: _react2.default.createElement(_warning2.default, null) }, { action: "all", icon: _react2.default.createElement(_assignment2.default, null) }] })
			);
		}
	}]);

	return Log;
}(_react.Component);

Log.contextTypes = { router: _react.PropTypes.object };

exports.default = Object.assign(Log, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2cuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiTEVWRUwiLCJ3YXJuaW5nIiwiZXJyb3IiLCJodHRwIiwiYWxsIiwiSWNvbnMiLCJIdHRwIiwiRXJyb3IiLCJXYXJuaW5nIiwiQWxsIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImxvZ3MiLCJBQ1RJT04iLCJGRVRDSCIsImdldExvZyIsImxldmVsIiwidGhlbiIsImRpc3BhdGNoIiwiRkVUQ0hFRCIsInR5cGUiLCJwYXlsb2FkIiwiUkVEVUNFUiIsInN0YXRlIiwiTG9nIiwicHJvcHMiLCJwYXJhbXMiLCJuZXh0Iiwicm91dGVyIiwiY29udGV4dCIsIm1hcCIsIl9pZCIsImNyZWF0ZWRBdCIsIm1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwicmVwbGFjZSIsImFjdGlvbiIsImljb24iLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU9BLFUsUUFBQUEsVTtJQUFZQyxLLFFBQUFBLEs7OztBQUVuQixJQUFNQyxRQUFNO0FBQ1BDLFVBQVEsQ0FERDtBQUVQQyxRQUFNLENBRkM7QUFHUEMsT0FBSyxDQUhFO0FBSVBDLE1BQUksSUFKRztBQUtKLE1BQUksTUFMQTtBQU1KLE1BQUksT0FOQTtBQU9KLE1BQUksU0FQQTtBQVFKLE1BQUk7QUFSQSxDQUFaO0FBVUEsSUFBTUMsUUFBTSxFQUFDQyxvQkFBRCxFQUFPQyxzQkFBUCxFQUFjQywwQkFBZCxFQUF1QkMseUJBQXZCLEVBQVo7QUFDTyxJQUFNQywwQkFBTyxRQUFiO0FBQ1AsSUFBTUMsYUFBVyxFQUFDQyxNQUFLLEVBQU4sRUFBakI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsUUFBTTtBQUFBLFNBQU87QUFBQSxVQUFVLGNBQWND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ZUMsT0FBT0MsTUFBUCxDQUFjbEIsR0FBZCxFQUFrQixFQUFDZCxjQUFELEVBQVFHLGNBQVIsRUFBZVMsZ0JBQWYsRUFBbEIsQyIsImZpbGUiOiJsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtMaXN0LCBMaXN0SXRlbX0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBIdHRwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2h0dHBcIlxuaW1wb3J0IEVycm9yIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvZXJyb3JcIlxuaW1wb3J0IFdhcm5pbmcgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hbGVydC93YXJuaW5nXCJcbmltcG9ydCBBbGwgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYXNzaWdubWVudFwiXG5cbmltcG9ydCB7VUl9IGZyb20gXCIuXCJcbmltcG9ydCBkYkFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuXG5jb25zdCB7Q29tbWFuZEJhciwgRW1wdHl9PVVJXG5cbmNvbnN0IExFVkVMPXtcbiAgICBcdHdhcm5pbmc6MixcbiAgICBcdGVycm9yOjMsXG4gICAgXHRodHRwOjksXG4gICAgXHRhbGw6bnVsbCxcbiAgICAgICAgXCI5XCI6XCJodHRwXCIsXG4gICAgICAgIFwiM1wiOlwiZXJyb3JcIixcbiAgICAgICAgXCIyXCI6XCJ3YXJuaW5nXCIsXG4gICAgICAgIFwiMVwiOlwiaW5mb1wiXG4gICAgfVxuY29uc3QgSWNvbnM9e0h0dHAsIEVycm9yLCBXYXJuaW5nLCBBbGx9XG5leHBvcnQgY29uc3QgRE9NQUlOPVwidWkubG9nXCJcbmNvbnN0IElOSVRfU1RBVEU9e2xvZ3M6W119XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0g6bGV2ZWw9PmRpc3BhdGNoPT5kYkFwcGxpY2F0aW9uLmdldExvZyhMRVZFTFtsZXZlbF0pLnRoZW4obG9ncz0+ZGlzcGF0Y2goQUNUSU9OLkZFVENIRUQobG9ncykpKVxuXHQsRkVUQ0hFRDogbG9ncz0+KHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOmxvZ3N9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcblx0cmV0dXJuIHtsb2dzOnBheWxvYWR9XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vQ0xFQVJgOlxuICAgIHJldHVybiBJTklUX1NUQVRFXG5cdH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIExvZyBleHRlbmRzIENvbXBvbmVudHtcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRjb25zdCB7ZGlzcGF0Y2gscGFyYW1zOntsZXZlbH19PXRoaXMucHJvcHNcblx0XHRkaXNwYXRjaChBQ1RJT04uRkVUQ0gobGV2ZWwpKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRpZihuZXh0LnBhcmFtcy5sZXZlbCE9PXRoaXMucHJvcHMucGFyYW1zLmxldmVsKVxuXHRcdFx0bmV4dC5kaXNwYXRjaChBQ1RJT04uRkVUQ0gobmV4dC5wYXJhbXMubGV2ZWwpKVxuXHR9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcbiAgICB9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtsb2dzLHBhcmFtczp7bGV2ZWx9LGRpc3BhdGNofT10aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8TGlzdD5cblx0XHRcdFx0XHR7bG9ncy5tYXAoKHtfaWQsbGV2ZWwsY3JlYXRlZEF0LG1lc3NhZ2V9KT0+XG5cdFx0XHRcdFx0XHQoPExpc3RJdGVtIGtleT17X2lkfSBwcmltYXJ5VGV4dD17YCR7TEVWRUxbbGV2ZWwrXCJcIl19IG9uICR7Y3JlYXRlZEF0fWB9IHNlY29uZGFyeVRleHQ9e0pTT04uc3RyaW5naWZ5KG1lc3NhZ2UpfS8+KVxuXHRcdFx0XHRcdCl9XG5cdFx0XHRcdDwvTGlzdD5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgZGlzcGF0Y2g9e2Rpc3BhdGNofVxuXHRcdFx0XHRcdG9uU2VsZWN0PXtsZXZlbD0+cm91dGVyLnJlcGxhY2UoYC9sb2cvJHtsZXZlbH1gKX1cblx0XHRcdFx0XHRwcmltYXJ5PXtsZXZlbH1cblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn0sXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiaHR0cFwiLCBpY29uOjxIdHRwLz59LFxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcImVycm9yXCIsIGljb246PEVycm9yLz59LFxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIndhcm5pbmdcIiwgaWNvbjo8V2FybmluZy8+fSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCJhbGxcIiwgaWNvbjo8QWxsLz59XG5cdFx0XHRcdFx0XX0vPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5Mb2cuY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihMb2cse0RPTUFJTixBQ1RJT04sUkVEVUNFUn0pXG4iXX0=