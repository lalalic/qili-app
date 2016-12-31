"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CheckUpdate = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckUpdate = exports.CheckUpdate = function CheckUpdate(_ref, _ref2) {
	var lastVersion = _ref.lastVersion;
	var children = _ref.children;
	var version = _ref2.project.version;

	var hasUpdate = lastVersion && lastVersion != version;
	if (!hasUpdate) return typeof children == "string" ? _react2.default.createElement(
		"span",
		null,
		children
	) : children;

	if (typeof children == "string") {
		return _react2.default.createElement(
			"span",
			null,
			children,
			_react2.default.createElement(New, null)
		);
	} else {
		return _react2.default.createElement(
			_materialUi.Badge,
			{ badgeContent: ".",
				style: { padding: "" },
				badgeStyle: {
					right: -6,
					top: -6,
					width: 12,
					height: 12,
					backgroundColor: "red"
				} },
			children
		);
	}
};

CheckUpdate.contextTypes = {
	project: _react.PropTypes.object
};

var New = function New(_ref3) {
	var _ref3$text = _ref3.text;
	var text = _ref3$text === undefined ? "New" : _ref3$text;
	return _react2.default.createElement(
		"span",
		{ style: {
				background: "red",
				color: "white",
				paddingRight: 10,
				paddingLeft: 10,
				borderRadius: 10,
				marginLeft: 3
			} },
		text
	);
};

exports.default = (0, _reactRedux.connect)(function (state) {
	return { lastVersion: state.qiliApp.lastVersion };
})(CheckUpdate);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NoZWNrLXVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJDaGVja1VwZGF0ZSIsImxhc3RWZXJzaW9uIiwiY2hpbGRyZW4iLCJ2ZXJzaW9uIiwicHJvamVjdCIsImhhc1VwZGF0ZSIsInBhZGRpbmciLCJyaWdodCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiTmV3IiwidGV4dCIsImJhY2tncm91bmQiLCJjb2xvciIsInBhZGRpbmdSaWdodCIsInBhZGRpbmdMZWZ0IiwiYm9yZGVyUmFkaXVzIiwibWFyZ2luTGVmdCIsInN0YXRlIiwicWlsaUFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFTyxJQUFNQSxvQ0FBWSxTQUFaQSxXQUFZLGNBQThDO0FBQUEsS0FBNUNDLFdBQTRDLFFBQTVDQSxXQUE0QztBQUFBLEtBQWhDQyxRQUFnQyxRQUFoQ0EsUUFBZ0M7QUFBQSxLQUFaQyxPQUFZLFNBQXJCQyxPQUFxQixDQUFaRCxPQUFZOztBQUN0RSxLQUFJRSxZQUFVSixlQUFlQSxlQUFhRSxPQUExQztBQUNBLEtBQUcsQ0FBQ0UsU0FBSixFQUNDLE9BQU8sT0FBT0gsUUFBUCxJQUFrQixRQUFsQixHQUE2QjtBQUFBO0FBQUE7QUFBT0E7QUFBUCxFQUE3QixHQUF1REEsUUFBOUQ7O0FBRUQsS0FBRyxPQUFPQSxRQUFQLElBQWtCLFFBQXJCLEVBQThCO0FBQzdCLFNBQVE7QUFBQTtBQUFBO0FBQU9BLFdBQVA7QUFBZ0IsaUNBQUMsR0FBRDtBQUFoQixHQUFSO0FBQ0EsRUFGRCxNQUVLO0FBQ0osU0FDQztBQUFBO0FBQUEsS0FBTyxjQUFhLEdBQXBCO0FBQ0MsV0FBTyxFQUFDSSxTQUFRLEVBQVQsRUFEUjtBQUVDLGdCQUFZO0FBQ1hDLFlBQU0sQ0FBQyxDQURJO0FBRVhDLFVBQUksQ0FBQyxDQUZNO0FBR1hDLFlBQU0sRUFISztBQUlYQyxhQUFPLEVBSkk7QUFLWEMsc0JBQWdCO0FBTEwsS0FGYjtBQVNFVDtBQVRGLEdBREQ7QUFhQTtBQUNELENBdEJNOztBQXdCUEYsWUFBWVksWUFBWixHQUF5QjtBQUN4QlIsVUFBUyxpQkFBVVM7QUFESyxDQUF6Qjs7QUFJQSxJQUFNQyxNQUFJLFNBQUpBLEdBQUk7QUFBQSx3QkFBRUMsSUFBRjtBQUFBLEtBQUVBLElBQUYsOEJBQU8sS0FBUDtBQUFBLFFBQ1Q7QUFBQTtBQUFBLElBQU0sT0FBTztBQUNaQyxnQkFBVyxLQURDO0FBRVpDLFdBQU0sT0FGTTtBQUdaQyxrQkFBYSxFQUhEO0FBSVpDLGlCQUFZLEVBSkE7QUFLWkMsa0JBQWEsRUFMRDtBQU1aQyxnQkFBVztBQU5DLElBQWI7QUFRRU47QUFSRixFQURTO0FBQUEsQ0FBVjs7a0JBYWUseUJBQVE7QUFBQSxRQUFRLEVBQUNkLGFBQVlxQixNQUFNQyxPQUFOLENBQWN0QixXQUEzQixFQUFSO0FBQUEsQ0FBUixFQUEwREQsV0FBMUQsQyIsImZpbGUiOiJjaGVjay11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7QmFkZ2V9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5cbmV4cG9ydCBjb25zdCBDaGVja1VwZGF0ZT0oe2xhc3RWZXJzaW9uLGNoaWxkcmVufSx7cHJvamVjdDp7dmVyc2lvbn19KT0+e1xuXHRsZXQgaGFzVXBkYXRlPWxhc3RWZXJzaW9uICYmIGxhc3RWZXJzaW9uIT12ZXJzaW9uXG5cdGlmKCFoYXNVcGRhdGUpXG5cdFx0cmV0dXJuIHR5cGVvZihjaGlsZHJlbik9PVwic3RyaW5nXCIgPyA8c3Bhbj57Y2hpbGRyZW59PC9zcGFuPiA6IGNoaWxkcmVuXG5cdFxuXHRpZih0eXBlb2YoY2hpbGRyZW4pPT1cInN0cmluZ1wiKXtcblx0XHRyZXR1cm4gKDxzcGFuPntjaGlsZHJlbn08TmV3Lz48L3NwYW4+KVxuXHR9ZWxzZXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEJhZGdlIGJhZGdlQ29udGVudD1cIi5cIlxuXHRcdFx0XHRzdHlsZT17e3BhZGRpbmc6XCJcIn19XG5cdFx0XHRcdGJhZGdlU3R5bGU9e3tcblx0XHRcdFx0XHRyaWdodDotNixcblx0XHRcdFx0XHR0b3A6LTYsXG5cdFx0XHRcdFx0d2lkdGg6MTIsXG5cdFx0XHRcdFx0aGVpZ2h0OjEyLFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcInJlZFwiXG5cdFx0XHRcdH19PlxuXHRcdFx0XHR7Y2hpbGRyZW59XG5cdFx0XHQ8L0JhZGdlPlxuXHRcdClcblx0fVxufVxuXG5DaGVja1VwZGF0ZS5jb250ZXh0VHlwZXM9e1xuXHRwcm9qZWN0OiBQcm9wVHlwZXMub2JqZWN0XG59XG5cbmNvbnN0IE5ldz0oe3RleHQ9XCJOZXdcIn0pPT4oXG5cdDxzcGFuIHN0eWxlPXt7XG5cdFx0YmFja2dyb3VuZDpcInJlZFwiLFxuXHRcdGNvbG9yOlwid2hpdGVcIixcblx0XHRwYWRkaW5nUmlnaHQ6MTAsXG5cdFx0cGFkZGluZ0xlZnQ6MTAsXG5cdFx0Ym9yZGVyUmFkaXVzOjEwLFxuXHRcdG1hcmdpbkxlZnQ6M1xuXHRcdH19PlxuXHRcdHt0ZXh0fVxuXHQ8L3NwYW4+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGU9Pih7bGFzdFZlcnNpb246c3RhdGUucWlsaUFwcC5sYXN0VmVyc2lvbn0pKShDaGVja1VwZGF0ZSkiXX0=