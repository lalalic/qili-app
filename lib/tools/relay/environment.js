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
	var loading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (a) {
		return a;
	};
	var showMessage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : console.log;
	var isDev = arguments[5];

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