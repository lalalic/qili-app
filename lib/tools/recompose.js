"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setPhoto = exports.withInit = exports.graphql = exports.withPagination = exports.withGraphqlClient = exports.withMutation = exports.withFragment = exports.withQuery = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql;

var _withQuery = require("./relay/withQuery");

Object.defineProperty(exports, "withQuery", {
	enumerable: true,
	get: function get() {
		return _withQuery.withQuery;
	}
});

var _withFragment = require("./relay/withFragment");

Object.defineProperty(exports, "withFragment", {
	enumerable: true,
	get: function get() {
		return _withFragment.withFragment;
	}
});

var _withMutation = require("./relay/withMutation");

Object.defineProperty(exports, "withMutation", {
	enumerable: true,
	get: function get() {
		return _withMutation.withMutation;
	}
});

var _withGraphqlClient = require("./relay/withGraphqlClient");

Object.defineProperty(exports, "withGraphqlClient", {
	enumerable: true,
	get: function get() {
		return _withGraphqlClient.withGraphqlClient;
	}
});

var _withPagination = require("./relay/withPagination");

Object.defineProperty(exports, "withPagination", {
	enumerable: true,
	get: function get() {
		return _withPagination.withPagination;
	}
});

var _reactRelay = require("react-relay");

Object.defineProperty(exports, "graphql", {
	enumerable: true,
	get: function get() {
		return _reactRelay.graphql;
	}
});

var _withInit = require("./withInit");

Object.defineProperty(exports, "withInit", {
	enumerable: true,
	get: function get() {
		return _withInit.withInit;
	}
});

var _withMutation2 = require("./relay/withMutation");

var setPhoto = exports.setPhoto = function setPhoto(variables) {
	return (0, _withMutation2.withMutation)(function (props, data) {
		var vars = typeof variables == "function" ? variables(props, data) : variables;
		vars = _extends({
			id: props.id
		}, data, vars);
		return {
			name: "setPhoto",
			variables: vars,
			patch4: vars.id,
			mutation: _graphql || (_graphql = function _graphql() {
				return require("./__generated__/recompose_setPhoto_Mutation.graphql");
			})
		};
	});
};