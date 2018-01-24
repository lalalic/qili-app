"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createEnvironment;

var _relayRuntime = require("relay-runtime");

var source = new _relayRuntime.RecordSource();
var store = new _relayRuntime.Store(source);
var handlerProvider = null;
var environments = {};
var NoService = new Error("Network error");

function createEnvironment(props) {
	var user = props.user,
	    appId = props.appId,
	    supportOffline = props.supportOffline,
	    network = props.network,
	    showMessage = props.showMessage,
	    loading = props.loading,
	    isDev = props.isDev;

	var token = user ? user.token : null;
	var key = appId + "-" + !!token;
	if (environments[key]) return environments[key];

	if (supportOffline) {
		supportOffline.user = user;
	}

	function handleErrors(errors) {
		var _errors$reduce = errors.reduce(function (state, a) {
			state.message.add(a.message);
			state.stack.add(a.stack);
			return state;
		}, { message: new Set(), stack: new Set() }),
		    message = _errors$reduce.message,
		    stack = _errors$reduce.stack;

		if (isDev) {
			showMessage({ message: Array.from(message).join("|"), level: "error" });
			console.error("Server Error\r\n" + Array.from(stack).join("\r\n"));
		} else {
			showMessage({ message: Array.from(message).join("|"), level: "warn" });
		}
	}

	function fetcherOnline(opt) {
		if (supportOffline) supportOffline.setSource(source);

		var service = props.service,
		    report = props.optics;

		return fetch(service, _extends({
			method: 'POST'
		}, opt, {
			headers: _extends({
				'content-type': 'application/json',
				"X-Application-ID": appId,
				"X-Session-Token": token
			}, opt ? opt.headers : null)
		})).then(function (res) {
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			return res.json();
		}).then(function (res) {
			if (res.errors) handleErrors(res.errors, showMessage);

			if (res.extensions) report(res.extensions.report);

			return res;
		});
	}

	function fetchQueryOnline(operation, variables, cacheConfig, uploadables) {
		return fetcherOnline({
			body: JSON.stringify({
				query: isDev === true ? operation.text : undefined, // GraphQL text from input
				id: isDev === true ? undefined : operation.name,
				variables: variables
			})
		}).catch(function (e) {

			network("offline");

			if (supportOffline) return fetchQueryOffline(operation, variables, cacheConfig, uploadables);

			return e;
		});
	}

	function fetchQueryOffline(operation, variables, cacheConfig, uploadables) {
		supportOffline.unsetSource(source);
		return supportOffline.runQL(operation.text, variables).then(function (res) {
			if (res.errors) handleErrors(res.errors, showMessage);

			if (isDev) {
				console.dir({
					query: operation.text,
					variables: variables,
					result: res
				});
			}
			return res;
		});
	}

	function fetchQuery() {
		var _arguments = arguments;

		loading(true);
		return function () {
			if (network() == "online") return fetchQueryOnline.apply(undefined, _arguments);else if (supportOffline) return fetchQueryOffline.apply(undefined, _arguments);else return Promise.resolve(NoService);
		}().catch(function (e) {
			loading(false);
			showMessage({ message: e.message, level: "error" });
			return e;
		}).then(function (res) {
			loading(false);
			return res;
		});
	}

	return Object.assign(new _relayRuntime.Environment({
		handlerProvider: handlerProvider,
		network: _relayRuntime.Network.create(fetchQuery),
		store: store
	}), {
		fetcher: function fetcher(req) {
			var _arguments2 = arguments;

			loading(true);
			return function () {
				if (network() == "online") {
					return fetcherOnline.apply(undefined, _arguments2);
				} else if (supportOffline) {
					var _JSON$parse = JSON.parse(req.body),
					    query = _JSON$parse.query,
					    variables = _JSON$parse.variables;

					return supportOffline.runQL(query, variables).then(function (result) {
						if (isDev) {
							console.dir({
								query: query,
								variables: variables,
								result: result
							});
						}
						return result;
					});
				} else {
					return Promise.resolve(NoService);
				}
			}().catch(function (e) {
				loading(false);
				showMessage({ message: e.message, level: "error" });
				return e;
			}).then(function (res) {
				loading(false);
				return res;
			});
		},
		runQL: function runQL(query, variables) {
			loading(true);
			return function () {
				if (network() == "online") {
					return fetcherOnline({ body: JSON.stringify(query) });
				} else if (supportOffline) {
					return supportOffline.runQL(query, variables).then(function (result) {
						if (isDev) {
							console.dir({
								query: query,
								variables: variables,
								result: result
							});
						}
						return result;
					});
				} else {
					return Promise.resolve(NoService);
				}
			}().catch(function (e) {
				loading(false);
				showMessage({ message: e.message, level: "error" });
				return e;
			}).then(function (res) {
				loading(false);
				return res;
			});
		}
	});
}
module.exports = exports['default'];