'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createEnvironment;

var _relayRuntime = require('relay-runtime');

var source = new _relayRuntime.RecordSource();
var store = new _relayRuntime.Store(source);
var handlerProvider = null;

var environments = {};

function createEnvironment(service, appId, token) {
	var showMessage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : console.log;
	var isDev = arguments[4];

	var key = appId + '-' + !!token;
	if (environments[key]) return environments[key];

	var fetcher = function fetcher(opt) {
		return fetch(service, _extends({
			method: 'POST'
		}, opt, {
			headers: _extends({
				'content-type': 'application/json',
				"X-Application-ID": appId,
				"X-Session-Token": token
			}, opt ? opt.headers : null)
		})).then(function (res) {
			return res.json();
		}).then(function (res) {
			if (res.errors) {
				var _res$errors$reduce = res.errors.reduce(function (state, a) {
					state.message.add(a.message);
					state.stack.add(a.stack);
					return state;
				}, { message: new Set(), stack: new Set() }),
				    message = _res$errors$reduce.message,
				    stack = _res$errors$reduce.stack;

				showMessage({ message: Array.from(message).join("|"), level: "error" });
				console.error("Server Error\r\n" + Array.from(stack).join("\r\n"));
			}
			return res;
		}, function (e) {
			showMessage({ message: e.message, level: "error" });
			console.error(e);
			throw e;
		});
	};

	var network = _relayRuntime.Network.create(function fetchQuery(operation, variables, cacheConfig, uploadables) {
		return fetcher({
			body: JSON.stringify({
				query: isDev === true ? operation.text : undefined, // GraphQL text from input
				id: isDev === true ? undefined : operation.name,
				variables: variables
			})
		});
	}); // see note below

	return environments[key] = Object.assign(new _relayRuntime.Environment({
		handlerProvider: handlerProvider, // Can omit.
		network: network,
		store: store
	}), {
		fetcher: fetcher,
		runQL: function runQL(query) {
			return fetcher({ body: JSON.stringify(query) });
		}
	});
}
module.exports = exports['default'];