"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withMutation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require("recompose");

var _reactRelay = require("react-relay");

var _spreadResponse = require("../spread-response");

var _spreadResponse2 = _interopRequireDefault(_spreadResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var isDate = function isDate(date) {
	return date && typeof date.getMonth === 'function';
};

/**
 * options:
 * all commitMutation options
 * spread?: to spread response on element
 *		>function(response, props): return {} to be spread
 * 		>string : response[spread]
 * 		>false: no spread
 * 		>any other: spread response[Object.keys(response)[0]] only when keys.length==1
 * patch4?: ID, auto update cache store for node[patch4]
 * patchData?: {}, only when patch4 specified
 * 		: spread it to node[patch4] in cache store
 * 		: spread input parameter of mutate to node[patch4]
 * shouldPatch(res): false will not patch, default function is all resonse are not null
 * promise?: boolean, mutate() return promise
 */

var withMutation = function withMutation(option) {
	return function (BaseComponent) {
		var factory = (0, _recompose.createEagerFactory)(BaseComponent);
		var WithMutation = (0, _recompose.getContext)({
			client: _propTypes2.default.object,
			showMessage: _propTypes2.default.func,
			loading: _propTypes2.default.func
		})(function (_ref) {
			var environment = _ref.client,
			    showMessage = _ref.showMessage,
			    loading = _ref.loading,
			    others = _objectWithoutProperties(_ref, ["client", "showMessage", "loading"]);

			var _ref2 = typeof option == "function" ? option(others, {}, environment) : option,
			    _ref2$name = _ref2.name,
			    name = _ref2$name === undefined ? "mutate" : _ref2$name,
			    mutation = _ref2.mutation;

			//////hack: make variables default undefined as undefined


			mutation().query.argumentDefinitions.forEach(function (def) {
				if (def.defaultValue === null) def.defaultValue = undefined;
			});

			function mutate(data) {
				loading(true);

				var _ref3 = typeof option == "function" ? option(others, data, environment) : option,
				    spread = _ref3.spread,
				    variables = _ref3.variables,
				    patch4 = _ref3.patch4,
				    patchData = _ref3.patchData,
				    shouldPatch = _ref3.shouldPatch,
				    delete4 = _ref3.delete4,
				    _ref3$dateFields = _ref3.dateFields,
				    dateFields = _ref3$dateFields === undefined ? [] : _ref3$dateFields,
				    mutation = _objectWithoutProperties(_ref3, ["spread", "variables", "patch4", "patchData", "shouldPatch", "delete4", "dateFields"]);

				var smart = {};
				if (patch4) {
					var updater = function updater(id, data) {
						return function (store, res) {
							if (res) {
								//updater only
								if (shouldPatch && !shouldPatch(res)) {
									return;
								}
							}
							var entity = store.get(id);
							if (entity) {
								Object.keys(data).forEach(function (k) {
									entity.setValue(isDate(data[k]) ? data[k].toISOString() : data[k], k);
								});
							}
						};
					};
					smart.updater = smart.optimisticUpdater = updater(patch4, patchData || data);
				} else if (delete4) {
					smart.updater = smart.optimisticUpdater = function (store) {
						store.delete(delete4);
					};
				}

				return new Promise(function (resolve, reject) {
					(0, _reactRelay.commitMutation)(environment, _extends({
						variables: _extends({}, variables, data)
					}, smart, mutation, {
						onError: reject,
						onCompleted: function onCompleted(res, error) {
							loading(false);
							if (error) {
								reject(error);
							} else {
								showMessage("Successful!");
								resolve((0, _spreadResponse2.default)(res, spread, others));
							}
						}
					}));
				});
			}
			return factory(_extends({}, others, _defineProperty({}, name, mutate)));
		});

		if (process.env.NODE_ENV !== 'production') {
			return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'withMutation'))(WithMutation);
		}

		return WithMutation;
	};
};

exports.withMutation = withMutation;
exports.default = withMutation;