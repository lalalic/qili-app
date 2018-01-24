"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withInit = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require("recompose");

var _recompose2 = require("./recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var withInit = function withInit(options) {
	return function (BaseComponent) {
		var factory = (0, _recompose.createEagerFactory)(BaseComponent);

		var Init = (0, _recompose2.withQuery)(options)(function (_ref) {
			var children = _ref.children;
			return _react2.default.createElement(
				"div",
				null,
				children
			);
		});

		var WithInit = function WithInit(_ref2) {
			var children = _ref2.children,
			    others = _objectWithoutProperties(_ref2, ["children"]);

			return _react2.default.createElement(
				BaseComponent,
				others,
				_react2.default.createElement(
					Init,
					null,
					children
				)
			);
		};

		if (process.env.NODE_ENV !== 'production') {
			return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'WithInit'))(WithInit);
		}

		return WithInit;
	};
};

exports.withInit = withInit;
exports.default = withInit;