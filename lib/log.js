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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2cuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiTEVWRUwiLCJ3YXJuaW5nIiwiZXJyb3IiLCJodHRwIiwiYWxsIiwiSWNvbnMiLCJIdHRwIiwiRXJyb3IiLCJXYXJuaW5nIiwiQWxsIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImxvZ3MiLCJBQ1RJT04iLCJGRVRDSCIsImdldExvZyIsImxldmVsIiwidGhlbiIsImRpc3BhdGNoIiwiRkVUQ0hFRCIsInR5cGUiLCJwYXlsb2FkIiwiUkVEVUNFUiIsInN0YXRlIiwiTG9nIiwicHJvcHMiLCJwYXJhbXMiLCJuZXh0Iiwicm91dGVyIiwiY29udGV4dCIsIm1hcCIsIl9pZCIsImNyZWF0ZWRBdCIsIm1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwicmVwbGFjZSIsImFjdGlvbiIsImljb24iLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU9BLFUsUUFBQUEsVTtJQUFZQyxLLFFBQUFBLEs7OztBQUVuQixJQUFNQyxRQUFNO0FBQ1BDLFVBQVEsQ0FERDtBQUVQQyxRQUFNLENBRkM7QUFHUEMsT0FBSyxDQUhFO0FBSVBDLE1BQUksSUFKRztBQUtKLE1BQUksTUFMQTtBQU1KLE1BQUksT0FOQTtBQU9KLE1BQUksU0FQQTtBQVFKLE1BQUk7QUFSQSxDQUFaO0FBVUEsSUFBTUMsUUFBTSxFQUFDQyxvQkFBRCxFQUFPQyxzQkFBUCxFQUFjQywwQkFBZCxFQUF1QkMseUJBQXZCLEVBQVo7QUFDTyxJQUFNQywwQkFBTyxRQUFiO0FBQ1AsSUFBTUMsYUFBVyxFQUFDQyxNQUFLLEVBQU4sRUFBakI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsUUFBTTtBQUFBLFNBQU87QUFBQSxVQUFVLGNBQWND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ZUMsT0FBT0MsTUFBUCxDQUFjbEIsR0FBZCxFQUFrQixFQUFDZCxjQUFELEVBQVFHLGNBQVIsRUFBZVMsZ0JBQWYsRUFBbEIsQyIsImZpbGUiOiJsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0xpc3QsIExpc3RJdGVtfSBmcm9tICdtYXRlcmlhbC11aSdcclxuXHJcbmltcG9ydCBIdHRwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2h0dHBcIlxyXG5pbXBvcnQgRXJyb3IgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hbGVydC9lcnJvclwiXHJcbmltcG9ydCBXYXJuaW5nIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvd2FybmluZ1wiXHJcbmltcG9ydCBBbGwgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYXNzaWdubWVudFwiXHJcblxyXG5pbXBvcnQge1VJfSBmcm9tIFwiLlwiXHJcbmltcG9ydCBkYkFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xyXG5cclxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5fT1VSVxyXG5cclxuY29uc3QgTEVWRUw9e1xyXG4gICAgXHR3YXJuaW5nOjIsXHJcbiAgICBcdGVycm9yOjMsXHJcbiAgICBcdGh0dHA6OSxcclxuICAgIFx0YWxsOm51bGwsXHJcbiAgICAgICAgXCI5XCI6XCJodHRwXCIsXHJcbiAgICAgICAgXCIzXCI6XCJlcnJvclwiLFxyXG4gICAgICAgIFwiMlwiOlwid2FybmluZ1wiLFxyXG4gICAgICAgIFwiMVwiOlwiaW5mb1wiXHJcbiAgICB9XHJcbmNvbnN0IEljb25zPXtIdHRwLCBFcnJvciwgV2FybmluZywgQWxsfVxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwidWkubG9nXCJcclxuY29uc3QgSU5JVF9TVEFURT17bG9nczpbXX1cclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0RkVUQ0g6bGV2ZWw9PmRpc3BhdGNoPT5kYkFwcGxpY2F0aW9uLmdldExvZyhMRVZFTFtsZXZlbF0pLnRoZW4obG9ncz0+ZGlzcGF0Y2goQUNUSU9OLkZFVENIRUQobG9ncykpKVxyXG5cdCxGRVRDSEVEOiBsb2dzPT4oe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLHBheWxvYWQ6bG9nc30pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT1JTklUX1NUQVRFLHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcclxuXHRyZXR1cm4ge2xvZ3M6cGF5bG9hZH1cclxuICAgIGNhc2UgYEBAJHtET01BSU59L0NMRUFSYDpcclxuICAgIHJldHVybiBJTklUX1NUQVRFXHJcblx0fVxyXG4gICAgcmV0dXJuIHN0YXRlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2cgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGNvbnN0IHtkaXNwYXRjaCxwYXJhbXM6e2xldmVsfX09dGhpcy5wcm9wc1xyXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIKGxldmVsKSlcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XHJcblx0XHRpZihuZXh0LnBhcmFtcy5sZXZlbCE9PXRoaXMucHJvcHMucGFyYW1zLmxldmVsKVxyXG5cdFx0XHRuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSChuZXh0LnBhcmFtcy5sZXZlbCkpXHJcblx0fVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9DTEVBUmB9KVxyXG4gICAgfVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2xvZ3MscGFyYW1zOntsZXZlbH0sZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuICAgICAgICBjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PExpc3Q+XHJcblx0XHRcdFx0XHR7bG9ncy5tYXAoKHtfaWQsbGV2ZWwsY3JlYXRlZEF0LG1lc3NhZ2V9KT0+XHJcblx0XHRcdFx0XHRcdCg8TGlzdEl0ZW0ga2V5PXtfaWR9IHByaW1hcnlUZXh0PXtgJHtMRVZFTFtsZXZlbCtcIlwiXX0gb24gJHtjcmVhdGVkQXR9YH0gc2Vjb25kYXJ5VGV4dD17SlNPTi5zdHJpbmdpZnkobWVzc2FnZSl9Lz4pXHJcblx0XHRcdFx0XHQpfVxyXG5cdFx0XHRcdDwvTGlzdD5cclxuXHJcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIGRpc3BhdGNoPXtkaXNwYXRjaH1cclxuXHRcdFx0XHRcdG9uU2VsZWN0PXtsZXZlbD0+cm91dGVyLnJlcGxhY2UoYC9sb2cvJHtsZXZlbH1gKX1cclxuXHRcdFx0XHRcdHByaW1hcnk9e2xldmVsfVxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn0sXHJcblx0XHRcdFx0XHRcdHthY3Rpb246XCJodHRwXCIsIGljb246PEh0dHAvPn0sXHJcblx0XHRcdFx0XHRcdHthY3Rpb246XCJlcnJvclwiLCBpY29uOjxFcnJvci8+fSxcclxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIndhcm5pbmdcIiwgaWNvbjo8V2FybmluZy8+fSxcclxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcImFsbFwiLCBpY29uOjxBbGwvPn1cclxuXHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcbkxvZy5jb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihMb2cse0RPTUFJTixBQ1RJT04sUkVEVUNFUn0pXHJcbiJdfQ==