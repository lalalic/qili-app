"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require("lodash.merge");

var _lodash2 = _interopRequireDefault(_lodash);

var _graphqlTools = require("graphql-tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var Scalar = {
	Date: {
		parseValue: function parseValue(value) {
			return new Date(value); // value from the client
		},
		serialize: function serialize(value) {
			return new Date(value); // value sent to the client
		},
		parseLiteral: function parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10); // ast value is always in string format
			}
			return null;
		}
	},

	ObjectID: {
		description: "mongodb ID",
		parseValue: function parseValue(value) {
			var _value$split = value.split(":"),
			    _value$split2 = _toArray(_value$split),
			    name = _value$split2[0],
			    id = _value$split2.slice(1);

			id = id.join(":");
			return id || name;
		}
	},
	JSON: require("graphql-type-json"),
	Node: {
		__resolveType: function __resolveType(obj, context, _ref) {
			var id = _ref.variableValues.id;

			var _id$split = id.split(":"),
			    _id$split2 = _slicedToArray(_id$split, 1),
			    colName = _id$split2[0];

			return colName[0].toUpperCase() + colName.substring(1, colName.length - 1);
		}
	}
};
module.exports = {
	merge: _lodash2.default,
	static: {
		on: function on(path, callback) {},
		reply: function reply(req, res) {}
	},
	wechat: {
		on: function on(event, callback) {},
		reply: function reply(req, res) {}
	},
	buildPagination: function buildPagination() {
		return {
			typeDefs: "",
			resolver: {}
		};
	},
	buildComment: function buildComment() {
		return {
			typeDefs: "",
			resolver: {}
		};
	},
	isDev: false,
	typeDefs: "",
	resolver: {},
	persistedQuery: {},
	makeSchema: function makeSchema(typeDefs) {
		var resolvers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		return (0, _graphqlTools.makeExecutableSchema)({
			typeDefs: typeDefs || this.typeDefs,
			resolvers: (0, _lodash2.default)({}, this.resolver, {
				User: {
					name: function name(_ref2) {
						var username = _ref2.username,
						    _name = _ref2.name;
						return username || _name;
					},
					username: function username(_ref3) {
						var _username = _ref3.username,
						    name = _ref3.name;
						return _username || name || "";
					}
				},
				Query: {
					me: function me(_, a, _ref4) {
						var app = _ref4.app,
						    user = _ref4.user;

						return user;
					}
				}
			}, resolvers, Scalar)
		});
	}
};