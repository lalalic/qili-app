"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Log = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

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
	(0, _inherits3.default)(Log, _Component);

	function Log() {
		(0, _classCallCheck3.default)(this, Log);
		return (0, _possibleConstructorReturn3.default)(this, (Log.__proto__ || (0, _getPrototypeOf2.default)(Log)).apply(this, arguments));
	}

	(0, _createClass3.default)(Log, [{
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
						return _react2.default.createElement(_materialUi.ListItem, { key: _id, primaryText: LEVEL[level + ""] + " on " + createdAt, secondaryText: (0, _stringify2.default)(message) });
					})
				),
				_react2.default.createElement(CommandBar, { className: "footbar", dispath: dispatch,
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

exports.default = (0, _assign2.default)(Log, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2cuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiTEVWRUwiLCJ3YXJuaW5nIiwiZXJyb3IiLCJodHRwIiwiYWxsIiwiSWNvbnMiLCJIdHRwIiwiRXJyb3IiLCJXYXJuaW5nIiwiQWxsIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImxvZ3MiLCJBQ1RJT04iLCJGRVRDSCIsImdldExvZyIsImxldmVsIiwidGhlbiIsImRpc3BhdGNoIiwiRkVUQ0hFRCIsInR5cGUiLCJwYXlsb2FkIiwiUkVEVUNFUiIsInN0YXRlIiwiTG9nIiwicHJvcHMiLCJwYXJhbXMiLCJuZXh0Iiwicm91dGVyIiwiY29udGV4dCIsIm1hcCIsIl9pZCIsImNyZWF0ZWRBdCIsIm1lc3NhZ2UiLCJyZXBsYWNlIiwiYWN0aW9uIiwiaWNvbiIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7OztJQUVPQSxVLFFBQUFBLFU7SUFBWUMsSyxRQUFBQSxLOzs7QUFFbkIsSUFBTUMsUUFBTTtBQUNQQyxVQUFRLENBREQ7QUFFUEMsUUFBTSxDQUZDO0FBR1BDLE9BQUssQ0FIRTtBQUlQQyxNQUFJLElBSkc7QUFLSixNQUFJLE1BTEE7QUFNSixNQUFJLE9BTkE7QUFPSixNQUFJLFNBUEE7QUFRSixNQUFJO0FBUkEsQ0FBWjtBQVVBLElBQU1DLFFBQU0sRUFBQ0Msb0JBQUQsRUFBT0Msc0JBQVAsRUFBY0MsMEJBQWQsRUFBdUJDLHlCQUF2QixFQUFaO0FBQ08sSUFBTUMsMEJBQU8sUUFBYjtBQUNQLElBQU1DLGFBQVcsRUFBQ0MsTUFBSyxFQUFOLEVBQWpCO0FBQ08sSUFBTUMsMEJBQU87QUFDbkJDLFFBQU07QUFBQSxTQUFPO0FBQUEsVUFBVSxjQUFjQyxNQUFkLENBQXFCZixNQUFNZ0IsS0FBTixDQUFyQixFQUFtQ0MsSUFBbkMsQ0FBd0M7QUFBQSxXQUFNQyxTQUFTTCxPQUFPTSxPQUFQLENBQWVQLElBQWYsQ0FBVCxDQUFOO0FBQUEsSUFBeEMsQ0FBVjtBQUFBLEdBQVA7QUFBQSxFQURhO0FBRWxCTyxVQUFTO0FBQUEsU0FBTyxFQUFDQyxhQUFVVixNQUFWLGFBQUQsRUFBNEJXLFNBQVFULElBQXBDLEVBQVA7QUFBQTtBQUZTLENBQWI7O0FBS0EsSUFBTVUsNEJBQVEsU0FBUkEsT0FBUSxHQUFtQztBQUFBLEtBQWxDQyxLQUFrQyx1RUFBNUJaLFVBQTRCO0FBQUE7QUFBQSxLQUFoQlMsSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUN2RCxTQUFPRCxJQUFQO0FBQ0EsY0FBVVYsTUFBVjtBQUNBLFVBQU8sRUFBQ0UsTUFBS1MsT0FBTixFQUFQO0FBQ0csY0FBVVgsTUFBVjtBQUNBLFVBQU9DLFVBQVA7QUFKSDtBQU1HLFFBQU9ZLEtBQVA7QUFDSCxDQVJNOztJQVVNQyxHLFdBQUFBLEc7Ozs7Ozs7Ozs7c0NBQ087QUFBQSxnQkFDYyxLQUFLQyxLQURuQjtBQUFBLE9BQ1hQLFFBRFcsVUFDWEEsUUFEVztBQUFBLE9BQ01GLEtBRE4sVUFDRlUsTUFERSxDQUNNVixLQUROOztBQUVsQkUsWUFBU0wsT0FBT0MsS0FBUCxDQUFhRSxLQUFiLENBQVQ7QUFDQTs7OzRDQUV5QlcsSSxFQUFLO0FBQzlCLE9BQUdBLEtBQUtELE1BQUwsQ0FBWVYsS0FBWixLQUFvQixLQUFLUyxLQUFMLENBQVdDLE1BQVgsQ0FBa0JWLEtBQXpDLEVBQ0NXLEtBQUtULFFBQUwsQ0FBY0wsT0FBT0MsS0FBUCxDQUFhYSxLQUFLRCxNQUFMLENBQVlWLEtBQXpCLENBQWQ7QUFDRDs7O3lDQUN3QjtBQUNsQixRQUFLUyxLQUFMLENBQVdQLFFBQVgsQ0FBb0IsRUFBQ0UsYUFBVVYsTUFBVixXQUFELEVBQXBCO0FBQ0g7OzsyQkFDSTtBQUFBLGlCQUM4QixLQUFLZSxLQURuQztBQUFBLE9BQ0FiLElBREEsV0FDQUEsSUFEQTtBQUFBLE9BQ2FJLEtBRGIsV0FDS1UsTUFETCxDQUNhVixLQURiO0FBQUEsT0FDb0JFLFFBRHBCLFdBQ29CQSxRQURwQjtBQUFBLE9BRU1VLE1BRk4sR0FFYyxLQUFLQyxPQUZuQixDQUVNRCxNQUZOOztBQUdQLFVBQ0M7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBO0FBQ0VoQixVQUFLa0IsR0FBTCxDQUFTO0FBQUEsVUFBRUMsR0FBRixTQUFFQSxHQUFGO0FBQUEsVUFBTWYsS0FBTixTQUFNQSxLQUFOO0FBQUEsVUFBWWdCLFNBQVosU0FBWUEsU0FBWjtBQUFBLFVBQXNCQyxPQUF0QixTQUFzQkEsT0FBdEI7QUFBQSxhQUNSLHNEQUFVLEtBQUtGLEdBQWYsRUFBb0IsYUFBZ0IvQixNQUFNZ0IsUUFBTSxFQUFaLENBQWhCLFlBQXNDZ0IsU0FBMUQsRUFBdUUsZUFBZSx5QkFBZUMsT0FBZixDQUF0RixHQURRO0FBQUEsTUFBVDtBQURGLEtBREQ7QUFPQyxrQ0FBQyxVQUFELElBQVksV0FBVSxTQUF0QixFQUFnQyxTQUFTZixRQUF6QztBQUNDLGVBQVU7QUFBQSxhQUFPVSxPQUFPTSxPQUFQLFdBQXVCbEIsS0FBdkIsQ0FBUDtBQUFBLE1BRFg7QUFFQyxjQUFTQSxLQUZWO0FBR0MsWUFBTyxDQUNOLEVBQUNtQixRQUFPLE1BQVIsRUFETSxFQUVOLEVBQUNBLFFBQU8sTUFBUixFQUFnQkMsTUFBSyxtREFBckIsRUFGTSxFQUdOLEVBQUNELFFBQU8sT0FBUixFQUFpQkMsTUFBSyxvREFBdEIsRUFITSxFQUlOLEVBQUNELFFBQU8sU0FBUixFQUFtQkMsTUFBSyxzREFBeEIsRUFKTSxFQUtOLEVBQUNELFFBQU8sS0FBUixFQUFlQyxNQUFLLHlEQUFwQixFQUxNLENBSFI7QUFQRCxJQUREO0FBb0JBOzs7OztBQUVGWixJQUFJYSxZQUFKLEdBQWlCLEVBQUNULFFBQU8saUJBQVVVLE1BQWxCLEVBQWpCOztrQkFFZSxzQkFBY2QsR0FBZCxFQUFrQixFQUFDZCxjQUFELEVBQVFHLGNBQVIsRUFBZVMsZ0JBQWYsRUFBbEIsQyIsImZpbGUiOiJsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtMaXN0LCBMaXN0SXRlbX0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBIdHRwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2h0dHBcIlxuaW1wb3J0IEVycm9yIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvZXJyb3JcIlxuaW1wb3J0IFdhcm5pbmcgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hbGVydC93YXJuaW5nXCJcbmltcG9ydCBBbGwgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYXNzaWdubWVudFwiXG5cbmltcG9ydCB7VUl9IGZyb20gXCIuXCJcbmltcG9ydCBkYkFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuXG5jb25zdCB7Q29tbWFuZEJhciwgRW1wdHl9PVVJXG5cbmNvbnN0IExFVkVMPXtcbiAgICBcdHdhcm5pbmc6MixcbiAgICBcdGVycm9yOjMsXG4gICAgXHRodHRwOjksXG4gICAgXHRhbGw6bnVsbCxcbiAgICAgICAgXCI5XCI6XCJodHRwXCIsXG4gICAgICAgIFwiM1wiOlwiZXJyb3JcIixcbiAgICAgICAgXCIyXCI6XCJ3YXJuaW5nXCIsXG4gICAgICAgIFwiMVwiOlwiaW5mb1wiXG4gICAgfVxuY29uc3QgSWNvbnM9e0h0dHAsIEVycm9yLCBXYXJuaW5nLCBBbGx9XG5leHBvcnQgY29uc3QgRE9NQUlOPVwidWkubG9nXCJcbmNvbnN0IElOSVRfU1RBVEU9e2xvZ3M6W119XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0g6bGV2ZWw9PmRpc3BhdGNoPT5kYkFwcGxpY2F0aW9uLmdldExvZyhMRVZFTFtsZXZlbF0pLnRoZW4obG9ncz0+ZGlzcGF0Y2goQUNUSU9OLkZFVENIRUQobG9ncykpKVxuXHQsRkVUQ0hFRDogbG9ncz0+KHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOmxvZ3N9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcblx0cmV0dXJuIHtsb2dzOnBheWxvYWR9XG4gICAgY2FzZSBgQEAke0RPTUFJTn0vQ0xFQVJgOlxuICAgIHJldHVybiBJTklUX1NUQVRFXG5cdH1cbiAgICByZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIExvZyBleHRlbmRzIENvbXBvbmVudHtcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRjb25zdCB7ZGlzcGF0Y2gscGFyYW1zOntsZXZlbH19PXRoaXMucHJvcHNcblx0XHRkaXNwYXRjaChBQ1RJT04uRkVUQ0gobGV2ZWwpKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRpZihuZXh0LnBhcmFtcy5sZXZlbCE9PXRoaXMucHJvcHMucGFyYW1zLmxldmVsKVxuXHRcdFx0bmV4dC5kaXNwYXRjaChBQ1RJT04uRkVUQ0gobmV4dC5wYXJhbXMubGV2ZWwpKVxuXHR9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcbiAgICB9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtsb2dzLHBhcmFtczp7bGV2ZWx9LGRpc3BhdGNofT10aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8TGlzdD5cblx0XHRcdFx0XHR7bG9ncy5tYXAoKHtfaWQsbGV2ZWwsY3JlYXRlZEF0LG1lc3NhZ2V9KT0+XG5cdFx0XHRcdFx0XHQoPExpc3RJdGVtIGtleT17X2lkfSBwcmltYXJ5VGV4dD17YCR7TEVWRUxbbGV2ZWwrXCJcIl19IG9uICR7Y3JlYXRlZEF0fWB9IHNlY29uZGFyeVRleHQ9e0pTT04uc3RyaW5naWZ5KG1lc3NhZ2UpfS8+KVxuXHRcdFx0XHRcdCl9XG5cdFx0XHRcdDwvTGlzdD5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgZGlzcGF0aD17ZGlzcGF0Y2h9XG5cdFx0XHRcdFx0b25TZWxlY3Q9e2xldmVsPT5yb3V0ZXIucmVwbGFjZShgL2xvZy8ke2xldmVsfWApfVxuXHRcdFx0XHRcdHByaW1hcnk9e2xldmVsfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCJodHRwXCIsIGljb246PEh0dHAvPn0sXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiZXJyb3JcIiwgaWNvbjo8RXJyb3IvPn0sXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwid2FybmluZ1wiLCBpY29uOjxXYXJuaW5nLz59LFxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcImFsbFwiLCBpY29uOjxBbGwvPn1cblx0XHRcdFx0XHRdfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cbkxvZy5jb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKExvZyx7RE9NQUlOLEFDVElPTixSRURVQ0VSfSlcbiJdfQ==