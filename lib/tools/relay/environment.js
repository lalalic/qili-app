'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createEnvironment;

var _relayRuntime = require('relay-runtime');

var source = new _relayRuntime.RecordSource();
var store = new _relayRuntime.Store(source);
var handlerProvider = null;

var environments = {};

function createEnvironment(service, appId, token) {
	var loading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (a) {
		return a;
	};
	var showMessage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : console.log;

	var key = appId + '-' + !!token;
	if (environments[key]) return environments[key];
	var network = _relayRuntime.Network.create(function fetchQuery(operation, variables, cacheConfig, uploadables) {
		//loading(true)
		return fetch(service, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				"X-Application-ID": appId,
				"X-Session-Token": token
			},
			body: JSON.stringify({
				query: operation.text, // GraphQL text from input
				variables: variables
			})
		}).then(function (res) {
			return res.json();
		}).then(function (res) {
			//loading(false)
			if (res.errors) {
				showMessage({ message: "server error!", level: "error" });
				console.error("server error:" + res.errors.map(function (a) {
					return a.message;
				}).join("\r\n"));
			}
			return res;
		}, function (e) {
			//loading(false)
			showMessage({ message: "server error!", level: "error" });
			console.error("server error:" + e.message);
			throw e;
		});
	}); // see note below

	return environments[key] = new _relayRuntime.Environment({
		handlerProvider: handlerProvider, // Can omit.
		network: network,
		store: store
	});
}
module.exports = exports['default'];