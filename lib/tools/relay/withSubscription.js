"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withSubscription = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRelay = require("react-relay");

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var withSubscription = function withSubscription(option) {
	return function (BaseComponent) {
		var factory = (0, _recompose.createEagerFactory)(BaseComponent);
		var withSubscription = (0, _recompose.compose)((0, _recompose.getContext)({ client: _react.PropTypes.object }))(function (_ref) {
			var environment = _ref.client,
			    others = _objectWithoutProperties(_ref, ["client"]);

			var _ref2 = typeof option == "function" ? option(others) : option,
			    subscription = _ref2.subscription,
			    updater = _ref2.updater,
			    more = _objectWithoutProperties(_ref2, ["subscription", "updater"]);
			//////hack: make variables default undefined as undefined


			subscription().subscription.argumentDefinitions.forEach(function (def) {
				if (def.defaultValue === null) {
					def.defaultValue = undefined;
				}
			});

			(0, _reactRelay.requestSubscription)(_extends({
				environment: environment,
				subscription: subscription
			}, more));

			return factory(others);
		});

		if (process.env.NODE_ENV !== 'production') {
			return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'withSubscription'))(WithSubscription);
		}
		return WithSubscription;
	};
};

exports.withSubscription = withSubscription;
exports.default = withSubscription;