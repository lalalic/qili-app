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
	var lastVersion = _ref.lastVersion,
	    children = _ref.children;
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
	var _ref3$text = _ref3.text,
	    text = _ref3$text === undefined ? "New" : _ref3$text;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NoZWNrLXVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJDaGVja1VwZGF0ZSIsImxhc3RWZXJzaW9uIiwiY2hpbGRyZW4iLCJ2ZXJzaW9uIiwicHJvamVjdCIsImhhc1VwZGF0ZSIsInBhZGRpbmciLCJyaWdodCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiTmV3IiwidGV4dCIsImJhY2tncm91bmQiLCJjb2xvciIsInBhZGRpbmdSaWdodCIsInBhZGRpbmdMZWZ0IiwiYm9yZGVyUmFkaXVzIiwibWFyZ2luTGVmdCIsInN0YXRlIiwicWlsaUFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFTyxJQUFNQSxvQ0FBWSxTQUFaQSxXQUFZLGNBQThDO0FBQUEsS0FBNUNDLFdBQTRDLFFBQTVDQSxXQUE0QztBQUFBLEtBQWhDQyxRQUFnQyxRQUFoQ0EsUUFBZ0M7QUFBQSxLQUFaQyxPQUFZLFNBQXJCQyxPQUFxQixDQUFaRCxPQUFZOztBQUN0RSxLQUFJRSxZQUFVSixlQUFlQSxlQUFhRSxPQUExQztBQUNBLEtBQUcsQ0FBQ0UsU0FBSixFQUNDLE9BQU8sT0FBT0gsUUFBUCxJQUFrQixRQUFsQixHQUE2QjtBQUFBO0FBQUE7QUFBT0E7QUFBUCxFQUE3QixHQUF1REEsUUFBOUQ7O0FBRUQsS0FBRyxPQUFPQSxRQUFQLElBQWtCLFFBQXJCLEVBQThCO0FBQzdCLFNBQVE7QUFBQTtBQUFBO0FBQU9BLFdBQVA7QUFBZ0IsaUNBQUMsR0FBRDtBQUFoQixHQUFSO0FBQ0EsRUFGRCxNQUVLO0FBQ0osU0FDQztBQUFBO0FBQUEsS0FBTyxjQUFhLEdBQXBCO0FBQ0MsV0FBTyxFQUFDSSxTQUFRLEVBQVQsRUFEUjtBQUVDLGdCQUFZO0FBQ1hDLFlBQU0sQ0FBQyxDQURJO0FBRVhDLFVBQUksQ0FBQyxDQUZNO0FBR1hDLFlBQU0sRUFISztBQUlYQyxhQUFPLEVBSkk7QUFLWEMsc0JBQWdCO0FBTEwsS0FGYjtBQVNFVDtBQVRGLEdBREQ7QUFhQTtBQUNELENBdEJNOztBQXdCUEYsWUFBWVksWUFBWixHQUF5QjtBQUN4QlIsVUFBUyxpQkFBVVM7QUFESyxDQUF6Qjs7QUFJQSxJQUFNQyxNQUFJLFNBQUpBLEdBQUk7QUFBQSx3QkFBRUMsSUFBRjtBQUFBLEtBQUVBLElBQUYsOEJBQU8sS0FBUDtBQUFBLFFBQ1Q7QUFBQTtBQUFBLElBQU0sT0FBTztBQUNaQyxnQkFBVyxLQURDO0FBRVpDLFdBQU0sT0FGTTtBQUdaQyxrQkFBYSxFQUhEO0FBSVpDLGlCQUFZLEVBSkE7QUFLWkMsa0JBQWEsRUFMRDtBQU1aQyxnQkFBVztBQU5DLElBQWI7QUFRRU47QUFSRixFQURTO0FBQUEsQ0FBVjs7a0JBYWUseUJBQVE7QUFBQSxRQUFRLEVBQUNkLGFBQVlxQixNQUFNQyxPQUFOLENBQWN0QixXQUEzQixFQUFSO0FBQUEsQ0FBUixFQUEwREQsV0FBMUQsQyIsImZpbGUiOiJjaGVjay11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQge0JhZGdlfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuZXhwb3J0IGNvbnN0IENoZWNrVXBkYXRlPSh7bGFzdFZlcnNpb24sY2hpbGRyZW59LHtwcm9qZWN0Ont2ZXJzaW9ufX0pPT57XHJcblx0bGV0IGhhc1VwZGF0ZT1sYXN0VmVyc2lvbiAmJiBsYXN0VmVyc2lvbiE9dmVyc2lvblxyXG5cdGlmKCFoYXNVcGRhdGUpXHJcblx0XHRyZXR1cm4gdHlwZW9mKGNoaWxkcmVuKT09XCJzdHJpbmdcIiA/IDxzcGFuPntjaGlsZHJlbn08L3NwYW4+IDogY2hpbGRyZW5cclxuXHRcclxuXHRpZih0eXBlb2YoY2hpbGRyZW4pPT1cInN0cmluZ1wiKXtcclxuXHRcdHJldHVybiAoPHNwYW4+e2NoaWxkcmVufTxOZXcvPjwvc3Bhbj4pXHJcblx0fWVsc2V7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8QmFkZ2UgYmFkZ2VDb250ZW50PVwiLlwiXHJcblx0XHRcdFx0c3R5bGU9e3twYWRkaW5nOlwiXCJ9fVxyXG5cdFx0XHRcdGJhZGdlU3R5bGU9e3tcclxuXHRcdFx0XHRcdHJpZ2h0Oi02LFxyXG5cdFx0XHRcdFx0dG9wOi02LFxyXG5cdFx0XHRcdFx0d2lkdGg6MTIsXHJcblx0XHRcdFx0XHRoZWlnaHQ6MTIsXHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJyZWRcIlxyXG5cdFx0XHRcdH19PlxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9CYWRnZT5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbkNoZWNrVXBkYXRlLmNvbnRleHRUeXBlcz17XHJcblx0cHJvamVjdDogUHJvcFR5cGVzLm9iamVjdFxyXG59XHJcblxyXG5jb25zdCBOZXc9KHt0ZXh0PVwiTmV3XCJ9KT0+KFxyXG5cdDxzcGFuIHN0eWxlPXt7XHJcblx0XHRiYWNrZ3JvdW5kOlwicmVkXCIsXHJcblx0XHRjb2xvcjpcIndoaXRlXCIsXHJcblx0XHRwYWRkaW5nUmlnaHQ6MTAsXHJcblx0XHRwYWRkaW5nTGVmdDoxMCxcclxuXHRcdGJvcmRlclJhZGl1czoxMCxcclxuXHRcdG1hcmdpbkxlZnQ6M1xyXG5cdFx0fX0+XHJcblx0XHR7dGV4dH1cclxuXHQ8L3NwYW4+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGU9Pih7bGFzdFZlcnNpb246c3RhdGUucWlsaUFwcC5sYXN0VmVyc2lvbn0pKShDaGVja1VwZGF0ZSkiXX0=