"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withQuery = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRelay = require("react-relay");

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wrapper = function (_PureComponent) {
	_inherits(Wrapper, _PureComponent);

	function Wrapper() {
		_classCallCheck(this, Wrapper);

		return _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).apply(this, arguments));
	}

	_createClass(Wrapper, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.props.handle();
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.Children.only(this.props.children);
		}
	}]);

	return Wrapper;
}(_react.PureComponent);

var withQuery = function withQuery(option) {
	return function (BaseComponent) {
		var factory = (0, _recompose.createEagerFactory)(_reactRelay.QueryRenderer);
		var WithQuery = (0, _recompose.compose)((0, _recompose.getContext)({ client: _react.PropTypes.object }), (0, _reactRedux.connect)())(function (_ref) {
			var environment = _ref.client,
			    dispatch = _ref.dispatch,
			    others = _objectWithoutProperties(_ref, ["client", "dispatch"]);

			var _ref2 = typeof option == "function" ? option(others) : option,
			    query = _ref2.query,
			    onSuccess = _ref2.onSuccess,
			    onError = _ref2.onError,
			    more = _objectWithoutProperties(_ref2, ["query", "onSuccess", "onError"]);
			//////hack: make variables default undefined as undefined


			query().query.argumentDefinitions.forEach(function (def) {
				if (def.defaultValue === null) {
					def.defaultValue = undefined;
				}
			});

			return factory(_extends({
				render: function render(_ref3) {
					var error = _ref3.error,
					    props = _ref3.props;

					if (props) {
						return _react2.default.createElement(
							Wrapper,
							{ handle: function handle() {
									return onSuccess && onSuccess(props, dispatch);
								} },
							_react2.default.createElement(BaseComponent, _extends({}, others, props, { data: props }))
						);
					} else if (error) {
						return _react2.default.createElement(
							Wrapper,
							{ handle: function handle() {
									return onError && onError(error, dispatch);
								} },
							_react2.default.createElement(
								"div",
								null,
								"error: ",
								error.toString()
							)
						);
					} else {
						return _react2.default.createElement(
							"div",
							null,
							"loading..."
						);
					}
				},

				environment: environment,
				query: query
			}, more));
		});

		if (process.env.NODE_ENV !== 'production') {
			return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'withQuery'))(WithQuery);
		}
		return WithQuery;
	};
};

exports.withQuery = withQuery;
exports.default = withQuery;