"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withGraphqlClient = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require("recompose");

var _relayRuntime = require("relay-runtime");

var _environment = require("./environment");

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withGraphqlClient = exports.withGraphqlClient = function withGraphqlClient() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	return function (BaseComponent) {
		var factory = (0, _recompose.createEagerFactory)((0, _recompose.withContext)({
			client: _propTypes2.default.object,
			optics: _propTypes2.default.func
		}, function (_ref) {
			var client = _ref.client,
			    optics = _ref.optics,
			    store = _ref.store;
			return {
				client: client,
				optics: optics
			};
		})(BaseComponent));

		var WithGraphqlClient = function WithGraphqlClient(props) {
			var environment = props.client;

			var clientOpts = typeof options == "function" ? options(props) : options;
			if (!environment) {
				environment = (0, _environment2.default)(_extends({}, props, clientOpts));
				environment.get = function (id) {
					var store = this.getStore();
					return store.getSource().get(id);
				};

				environment.getAll = function (type) {
					var store = this.getStore();
					var source = store.getSource();
					var ex = type[0].toLowerCase() + type.substr(1) + 's';
					return source.getRecordIDs().filter(function (id) {
						return id.startsWith(ex);
					}).map(function (id) {
						return source.get(id);
					}).filter(function (a) {
						return !!a;
					});
				};

				environment.connection = function (store, key, filter) {
					var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "client:root";

					var record = store.get(id);
					var connection = _relayRuntime.ConnectionHandler.getConnection(record, key, filter);
					var type = function type(node) {
						var typeComments = node.id.split(":")[0];
						var TypeComment = typeComments[0].toUpperCase() + typeComments.substr(1, typeComments.length - 2);
						return TypeComment + 'Edge';
					};
					return {
						append: function append(node) {
							var edge = _relayRuntime.ConnectionHandler.createEdge(store, connection, store.get(node.id), type(node));
							_relayRuntime.ConnectionHandler.insertEdgeAfter(connection, edge);
						},
						prepend: function prepend(node) {
							var edge = _relayRuntime.ConnectionHandler.createEdge(store, connection, store.get(node.id), type(node));
							_relayRuntime.ConnectionHandler.insertEdgeBefore(connection, edge);
						}
					};
				};
			} else if (typeof environment == "function") {
				environment = environment(props);
			}
			return factory(_extends({ client: environment }, props));
		};

		if (process.env.NODE_ENV !== 'production') {
			return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'withGraphqlClient'))(WithGraphqlClient);
		}

		return WithGraphqlClient;
	};
};

exports.default = withGraphqlClient;