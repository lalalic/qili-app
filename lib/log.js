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

var CommandBar = _.UI.CommandBar;
var Empty = _.UI.Empty;


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

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
	var _ref = arguments[1];
	var type = _ref.type;
	var payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/fetched":
			return { logs: payload };
		case "@@" + DOMAIN + "/CLEAR":
			return INIT_STATE;
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
			var _props = this.props;
			var dispatch = _props.dispatch;
			var level = _props.params.level;

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
			this.props.dispatch("@@" + DOMAIN + "/CLEAR");
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props;
			var logs = _props2.logs;
			var router = _props2.router;
			var level = _props2.params.level;
			var dispatch = _props2.dispatch;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_materialUi.List,
					null,
					logs.map(function (_ref2) {
						var _id = _ref2._id;
						var level = _ref2.level;
						var createdAt = _ref2.createdAt;
						var message = _ref2.message;
						return _react2.default.createElement(_materialUi.ListItem, { key: _id, primaryText: LEVEL[level + ""] + " on " + createdAt, secondaryText: JSON.stringify(message) });
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

	return _class;
}(_react.Component));
exports.default = Object.assign(Log, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2cuanMiXSwibmFtZXMiOlsiQ29tbWFuZEJhciIsIkVtcHR5IiwiTEVWRUwiLCJ3YXJuaW5nIiwiZXJyb3IiLCJodHRwIiwiYWxsIiwiSWNvbnMiLCJIdHRwIiwiRXJyb3IiLCJXYXJuaW5nIiwiQWxsIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImxvZ3MiLCJBQ1RJT04iLCJGRVRDSCIsImdldExvZyIsImxldmVsIiwidGhlbiIsImRpc3BhdGNoIiwiRkVUQ0hFRCIsInR5cGUiLCJwYXlsb2FkIiwiUkVEVUNFUiIsInN0YXRlIiwiTG9nIiwicHJvcHMiLCJwYXJhbXMiLCJuZXh0Iiwicm91dGVyIiwibWFwIiwiX2lkIiwiY3JlYXRlZEF0IiwibWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXBsYWNlIiwiYWN0aW9uIiwiaWNvbiIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVPQSxVLFFBQUFBLFU7SUFBWUMsSyxRQUFBQSxLOzs7QUFFbkIsSUFBTUMsUUFBTTtBQUNQQyxVQUFRLENBREQ7QUFFUEMsUUFBTSxDQUZDO0FBR1BDLE9BQUssQ0FIRTtBQUlQQyxNQUFJLElBSkc7QUFLSixNQUFJLE1BTEE7QUFNSixNQUFJLE9BTkE7QUFPSixNQUFJLFNBUEE7QUFRSixNQUFJO0FBUkEsQ0FBWjtBQVVBLElBQU1DLFFBQU0sRUFBQ0Msb0JBQUQsRUFBT0Msc0JBQVAsRUFBY0MsMEJBQWQsRUFBdUJDLHlCQUF2QixFQUFaO0FBQ0EsSUFBTUMsU0FBTyxRQUFiO0FBQ0EsSUFBTUMsYUFBVyxFQUFDQyxNQUFLLEVBQU4sRUFBakI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsUUFBTTtBQUFBLFNBQU87QUFBQSxVQUFVLGNBQWNDLE1BQWQsQ0FBcUJmLE1BQU1nQixLQUFOLENBQXJCLEVBQW1DQyxJQUFuQyxDQUF3QztBQUFBLFdBQU1DLFNBQVNMLE9BQU9NLE9BQVAsQ0FBZVAsSUFBZixDQUFULENBQU47QUFBQSxJQUF4QyxDQUFWO0FBQUEsR0FBUDtBQUFBLEVBRGE7QUFFbEJPLFVBQVM7QUFBQSxTQUFPLEVBQUNDLGFBQVVWLE1BQVYsYUFBRCxFQUE0QlcsU0FBUVQsSUFBcEMsRUFBUDtBQUFBO0FBRlMsQ0FBYjs7QUFLQSxJQUFNVSxnREFDUlosTUFEUSxFQUNBLFlBQW1DO0FBQUEsS0FBbENhLEtBQWtDLHVFQUE1QlosVUFBNEI7QUFBQTtBQUFBLEtBQWhCUyxJQUFnQixRQUFoQkEsSUFBZ0I7QUFBQSxLQUFYQyxPQUFXLFFBQVhBLE9BQVc7O0FBQzlDLFNBQU9ELElBQVA7QUFDQSxjQUFVVixNQUFWO0FBQ0EsVUFBTyxFQUFDRSxNQUFLUyxPQUFOLEVBQVA7QUFDTSxjQUFVWCxNQUFWO0FBQ0EsVUFBT0MsVUFBUDtBQUpOO0FBTU0sUUFBT1ksS0FBUDtBQUNILENBVFEsQ0FBTjs7QUFZQSxJQUFNQyxvQkFBSSx5QkFBUTtBQUFBLFFBQU9ELE1BQU1iLE1BQU4sQ0FBUDtBQUFBLENBQVI7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHNDQUVHO0FBQUEsZ0JBQ2MsS0FBS2UsS0FEbkI7QUFBQSxPQUNYUCxRQURXLFVBQ1hBLFFBRFc7QUFBQSxPQUNNRixLQUROLFVBQ0ZVLE1BREUsQ0FDTVYsS0FETjs7QUFFbEJFLFlBQVNMLE9BQU9DLEtBQVAsQ0FBYUUsS0FBYixDQUFUO0FBQ0E7QUFMZTtBQUFBO0FBQUEsNENBT1VXLElBUFYsRUFPZTtBQUM5QixPQUFHQSxLQUFLRCxNQUFMLENBQVlWLEtBQVosS0FBb0IsS0FBS1MsS0FBTCxDQUFXQyxNQUFYLENBQWtCVixLQUF6QyxFQUNDVyxLQUFLVCxRQUFMLENBQWNMLE9BQU9DLEtBQVAsQ0FBYWEsS0FBS0QsTUFBTCxDQUFZVixLQUF6QixDQUFkO0FBQ0Q7QUFWZTtBQUFBO0FBQUEseUNBV1M7QUFDbEIsUUFBS1MsS0FBTCxDQUFXUCxRQUFYLFFBQXlCUixNQUF6QjtBQUNIO0FBYlk7QUFBQTtBQUFBLDJCQWNSO0FBQUEsaUJBQ3FDLEtBQUtlLEtBRDFDO0FBQUEsT0FDQWIsSUFEQSxXQUNBQSxJQURBO0FBQUEsT0FDS2dCLE1BREwsV0FDS0EsTUFETDtBQUFBLE9BQ29CWixLQURwQixXQUNZVSxNQURaLENBQ29CVixLQURwQjtBQUFBLE9BQzJCRSxRQUQzQixXQUMyQkEsUUFEM0I7O0FBRVAsVUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUE7QUFDRU4sVUFBS2lCLEdBQUwsQ0FBUztBQUFBLFVBQUVDLEdBQUYsU0FBRUEsR0FBRjtBQUFBLFVBQU1kLEtBQU4sU0FBTUEsS0FBTjtBQUFBLFVBQVllLFNBQVosU0FBWUEsU0FBWjtBQUFBLFVBQXNCQyxPQUF0QixTQUFzQkEsT0FBdEI7QUFBQSxhQUNSLHNEQUFVLEtBQUtGLEdBQWYsRUFBb0IsYUFBZ0I5QixNQUFNZ0IsUUFBTSxFQUFaLENBQWhCLFlBQXNDZSxTQUExRCxFQUF1RSxlQUFlRSxLQUFLQyxTQUFMLENBQWVGLE9BQWYsQ0FBdEYsR0FEUTtBQUFBLE1BQVQ7QUFERixLQUREO0FBT0Msa0NBQUMsVUFBRCxJQUFZLFdBQVUsU0FBdEIsRUFBZ0MsU0FBU2QsUUFBekM7QUFDQyxlQUFVO0FBQUEsYUFBT1UsT0FBT08sT0FBUCxXQUF1Qm5CLEtBQXZCLENBQVA7QUFBQSxNQURYO0FBRUMsY0FBU0EsS0FGVjtBQUdDLFlBQU8sQ0FDTixFQUFDb0IsUUFBTyxNQUFSLEVBRE0sRUFFTixFQUFDQSxRQUFPLE1BQVIsRUFBZ0JDLE1BQUssbURBQXJCLEVBRk0sRUFHTixFQUFDRCxRQUFPLE9BQVIsRUFBaUJDLE1BQUssb0RBQXRCLEVBSE0sRUFJTixFQUFDRCxRQUFPLFNBQVIsRUFBbUJDLE1BQUssc0RBQXhCLEVBSk0sRUFLTixFQUFDRCxRQUFPLEtBQVIsRUFBZUMsTUFBSyx5REFBcEIsRUFMTSxDQUhSO0FBUEQsSUFERDtBQW9CQTtBQXBDZTs7QUFBQTtBQUFBLG9CQUFWO2tCQXNDUUMsT0FBT0MsTUFBUCxDQUFjZixHQUFkLEVBQWtCLEVBQUNYLGNBQUQsRUFBUVMsZ0JBQVIsRUFBbEIsQyIsImZpbGUiOiJsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW19IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQgSHR0cCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9odHRwXCJcbmltcG9ydCBFcnJvciBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FsZXJ0L2Vycm9yXCJcbmltcG9ydCBXYXJuaW5nIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvd2FybmluZ1wiXG5pbXBvcnQgQWxsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Fzc2lnbm1lbnRcIlxuXG5pbXBvcnQge1VJfSBmcm9tIFwiLlwiXG5pbXBvcnQgZGJBcHBsaWNhdGlvbiBmcm9tICcuL2RiL2FwcCdcblxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5fT1VSVxuXG5jb25zdCBMRVZFTD17XG4gICAgXHR3YXJuaW5nOjIsXG4gICAgXHRlcnJvcjozLFxuICAgIFx0aHR0cDo5LFxuICAgIFx0YWxsOm51bGwsXG4gICAgICAgIFwiOVwiOlwiaHR0cFwiLFxuICAgICAgICBcIjNcIjpcImVycm9yXCIsXG4gICAgICAgIFwiMlwiOlwid2FybmluZ1wiLFxuICAgICAgICBcIjFcIjpcImluZm9cIlxuICAgIH1cbmNvbnN0IEljb25zPXtIdHRwLCBFcnJvciwgV2FybmluZywgQWxsfVxuY29uc3QgRE9NQUlOPVwidWkubG9nXCJcbmNvbnN0IElOSVRfU1RBVEU9e2xvZ3M6W119XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0g6bGV2ZWw9PmRpc3BhdGNoPT5kYkFwcGxpY2F0aW9uLmdldExvZyhMRVZFTFtsZXZlbF0pLnRoZW4obG9ncz0+ZGlzcGF0Y2goQUNUSU9OLkZFVENIRUQobG9ncykpKVxuXHQsRkVUQ0hFRDogbG9ncz0+KHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOmxvZ3N9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj17XG4gICAgW0RPTUFJTl06KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRgOlxuXHRcdHJldHVybiB7bG9nczpwYXlsb2FkfVxuICAgICAgICBjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XG4gICAgICAgIHJldHVybiBJTklUX1NUQVRFXG5cdFx0fVxuICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBMb2c9Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSkoXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRjb25zdCB7ZGlzcGF0Y2gscGFyYW1zOntsZXZlbH19PXRoaXMucHJvcHNcblx0XHRkaXNwYXRjaChBQ1RJT04uRkVUQ0gobGV2ZWwpKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRpZihuZXh0LnBhcmFtcy5sZXZlbCE9PXRoaXMucHJvcHMucGFyYW1zLmxldmVsKVxuXHRcdFx0bmV4dC5kaXNwYXRjaChBQ1RJT04uRkVUQ0gobmV4dC5wYXJhbXMubGV2ZWwpKVxuXHR9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChgQEAke0RPTUFJTn0vQ0xFQVJgKVxuICAgIH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2xvZ3Mscm91dGVyLHBhcmFtczp7bGV2ZWx9LGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxMaXN0PlxuXHRcdFx0XHRcdHtsb2dzLm1hcCgoe19pZCxsZXZlbCxjcmVhdGVkQXQsbWVzc2FnZX0pPT5cblx0XHRcdFx0XHRcdCg8TGlzdEl0ZW0ga2V5PXtfaWR9IHByaW1hcnlUZXh0PXtgJHtMRVZFTFtsZXZlbCtcIlwiXX0gb24gJHtjcmVhdGVkQXR9YH0gc2Vjb25kYXJ5VGV4dD17SlNPTi5zdHJpbmdpZnkobWVzc2FnZSl9Lz4pXG5cdFx0XHRcdFx0KX1cblx0XHRcdFx0PC9MaXN0PlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBkaXNwYXRoPXtkaXNwYXRjaH1cblx0XHRcdFx0XHRvblNlbGVjdD17bGV2ZWw9PnJvdXRlci5yZXBsYWNlKGAvbG9nLyR7bGV2ZWx9YCl9XG5cdFx0XHRcdFx0cHJpbWFyeT17bGV2ZWx9XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9LFxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcImh0dHBcIiwgaWNvbjo8SHR0cC8+fSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCJlcnJvclwiLCBpY29uOjxFcnJvci8+fSxcblx0XHRcdFx0XHRcdHthY3Rpb246XCJ3YXJuaW5nXCIsIGljb246PFdhcm5pbmcvPn0sXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiYWxsXCIsIGljb246PEFsbC8+fVxuXHRcdFx0XHRcdF19Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufSlcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oTG9nLHtBQ1RJT04sUkVEVUNFUn0pXG4iXX0=