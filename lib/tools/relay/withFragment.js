"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withFragment = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _recompose = require("recompose");

var _reactRelay = require("react-relay");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var withFragment = function withFragment(options) {
	return function (BaseComponent) {
		var WithFragment = null;
		if (isPagination(options)) {
			WithFragment = (0, _recompose.getContext)({ pagination: _react.PropTypes.any })(function (_ref) {
				var pagination = _ref.pagination,
				    props = _objectWithoutProperties(_ref, ["pagination"]);

				var _ref2 = typeof pagination == "function" ? pagination(props) : pagination,
				    query = _ref2.query,
				    variables = _ref2.variables,
				    direction = _ref2.direction,
				    _getVariables = _ref2.getVariables,
				    getConnectionFromProps = _ref2.getConnectionFromProps,
				    getFragmentVariables = _ref2.getFragmentVariables;

				var factory = (0, _recompose.createEagerFactory)((0, _reactRelay.createPaginationContainer)(BaseComponent, options, {
					getVariables: function getVariables(props, _ref3) {
						var count = _ref3.count,
						    cursor = _ref3.cursor;

						if (_getVariables) return _getVariables.apply(undefined, arguments);
						return _extends({}, variables, {
							count: count,
							cursor: cursor
						});
					},

					direction: direction,
					getConnectionFromProps: getConnectionFromProps,
					getFragmentVariables: getFragmentVariables,
					query: query
				}));
				return factory(props);
			});
		} else {
			var factory = (0, _recompose.createEagerFactory)(BaseComponent);
			WithFragment = (0, _reactRelay.createFragmentContainer)(function (props) {
				return factory(props);
			}, options);
		}

		if (process.env.NODE_ENV !== 'production') {
			return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'withFragment'))(WithFragment);
		}
		return WithFragment;
	};
};

exports.withFragment = withFragment;
exports.default = withFragment;


function isPagination(gql) {
	var _gql$Object$keys$ = gql[Object.keys(gql)[0]](),
	    metadata = _gql$Object$keys$.metadata;

	return metadata && metadata.connection && metadata.connection.length > 0;
}

var trim = function trim(o) {
	return Object.keys(o).reduce(function (o, k) {
		if (o[k] === null) {
			o[k] = undefined;
		} else if (_typeof(o[k]) == "object") {
			trim(o[k]);
		}
		return o;
	}, o);
};