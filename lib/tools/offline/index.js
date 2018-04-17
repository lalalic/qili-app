"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Offline = exports.Websql = exports.Cursor = exports.Collection = exports.DataService = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _dataService = require("./data-service");

Object.defineProperty(exports, "DataService", {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_dataService).default;
	}
});

var _collection = require("./collection");

Object.defineProperty(exports, "Collection", {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_collection).default;
	}
});

var _cursor = require("./cursor");

Object.defineProperty(exports, "Cursor", {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_cursor).default;
	}
});

var _dataServiceWebsql = require("./data-service-websql");

Object.defineProperty(exports, "Websql", {
	enumerable: true,
	get: function get() {
		return _interopRequireDefault(_dataServiceWebsql).default;
	}
});

var _graphql = require("graphql");

var _dataServiceWebsql2 = _interopRequireDefault(_dataServiceWebsql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var typed = function typed(id) {
	var _id$split = id.split(":"),
	    _id$split2 = _slicedToArray(_id$split, 2),
	    types = _id$split2[0],
	    _id = _id$split2[1];

	var Type = types[0].toUpperCase() + types.substring(1, types.length - 1);
	return [Type, _id, types];
};

var Offline = exports.Offline = function () {
	function Offline(schema) {
		_classCallCheck(this, Offline);

		this.schema = schema;
	}

	_createClass(Offline, [{
		key: "setSource",
		value: function setSource(mutableRecordSource) {
			if (mutableRecordSource.supportOffline) return;

			var support = function support(key, fn) {
				var _fn = mutableRecordSource[key];
				mutableRecordSource["__" + key] = _fn;
				mutableRecordSource[key] = function () {
					var r = _fn.apply(this, arguments);
					fn.apply(null, arguments);
					return r;
				};
			};
			support("set", this.set.bind(this));
			support("delete", this.remove.bind(this));
			support("remove", this.remove.bind(this));
			mutableRecordSource.supportOffline = true;
			return this;
		}
	}, {
		key: "unsetSource",
		value: function unsetSource(mutableRecordSource) {
			if (mutableRecordSource.supportOffline) {
				mutableRecordSource.set = mutableRecordSource.__set;
				mutableRecordSource.delete = mutableRecordSource.__delete;
				mutableRecordSource.remove = mutableRecordSource.__remove;
				delete mutableRecordSource.supportOffline;
			}
			return this;
		}
	}, {
		key: "set",
		value: function set(id, _ref) {
			var __id = _ref.__id,
			    __typename = _ref.__typename,
			    record = _objectWithoutProperties(_ref, ["__id", "__typename"]);

			if (id.startsWith("client:")) return;

			var _typed = typed(id),
			    _typed2 = _slicedToArray(_typed, 2),
			    Type = _typed2[0],
			    _id = _typed2[1];

			var _Object$keys$reduce = Object.keys(record).reduce(function (state, k) {
				var data = state.data,
				    refs = state.refs;

				var v = record[k];
				if (v && (typeof v === "undefined" ? "undefined" : _typeof(v)) == "object") {
					if (v.__ref) {
						refs[k.split("{")[0]] = v.__ref;
					} else if (v.__refs) {
						refs[k.split("{")[0]] = v.__refs;
					}
				} else {
					data[k] = v;
				}
				return state;
			}, { data: {}, refs: {} }),
			    data = _Object$keys$reduce.data,
			    refs = _Object$keys$reduce.refs;

			if (typeof this["onSet" + Type] == "function") return this["onSet" + Type](_id, data, refs);else return this.onSet(id, data, refs);
		}
	}, {
		key: "remove",
		value: function remove(id) {
			var _typed3 = typed(id),
			    _typed4 = _slicedToArray(_typed3, 3),
			    Type = _typed4[0],
			    _id = _typed4[1],
			    types = _typed4[2];

			if (typeof this["onRemove" + Type] == "function") return this["onRemove" + Type](_id);else return this.onRemove(id);
		}
	}, {
		key: "onSet",
		value: function onSet(id, record) {
			var _typed5 = typed(id),
			    _typed6 = _slicedToArray(_typed5, 3),
			    _id = _typed6[1],
			    cols = _typed6[2];

			return this.createOrUpdateEntity(cols, _id, record);
		}
	}, {
		key: "onSetUser",
		value: function onSetUser(_id, _ref2) {
			var record = _objectWithoutProperties(_ref2, []);

			return this.createOrUpdateEntity("users", _id, record);
		}
	}, {
		key: "onRemove",
		value: function onRemove(id) {
			var _typed7 = typed(id),
			    _typed8 = _slicedToArray(_typed7, 3),
			    _id = _typed8[1],
			    cols = _typed8[2];

			return this.removeEntity(cols, _id);
		}
	}, {
		key: "createOrUpdateEntity",
		value: function createOrUpdateEntity(cols, _id, data) {
			throw new Error("createOrUpdateEntity must be implemented");
		}
	}, {
		key: "removeEntity",
		value: function removeEntity(id) {
			throw new Error("removeEntity must be implemented");
		}
	}, {
		key: "getApp",
		value: function getApp() {
			throw new Error("getApp must be implemented");
		}
	}, {
		key: "getUser",
		value: function getUser() {
			throw new Error("getUser must be implemented");
		}
	}, {
		key: "runQL",
		value: function runQL(query, variables) {
			var _this = this;

			if (query.startsWith("mutation ")) return Promise.reject(new Error("offline not support this action"));

			return Promise.all([Promise.resolve(this.getApp()), Promise.resolve(this.getUser())]).then(function (_ref3) {
				var _ref4 = _slicedToArray(_ref3, 2),
				    app = _ref4[0],
				    user = _ref4[1];

				return (0, _graphql.graphql)(_this.schema, query, {}, { user: user, app: app }, variables);
			}).catch(function (e) {
				console.error(e);
				return e;
			});
		}
	}, {
		key: "user",
		set: function set(_ref5) {
			var id = _ref5.id;

			this._user = { id: id };
		}
	}]);

	return Offline;
}();

var WebSQLOffline = function (_Offline) {
	_inherits(WebSQLOffline, _Offline);

	function WebSQLOffline(appKey) {
		var _ref6;

		_classCallCheck(this, WebSQLOffline);

		for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			others[_key - 1] = arguments[_key];
		}

		var _this2 = _possibleConstructorReturn(this, (_ref6 = WebSQLOffline.__proto__ || Object.getPrototypeOf(WebSQLOffline)).call.apply(_ref6, [this].concat(others)));

		_this2.db = new _dataServiceWebsql2.default(appKey);
		_this2.seq = Promise.resolve();
		return _this2;
	}

	_createClass(WebSQLOffline, [{
		key: "getApp",
		value: function getApp() {
			return this.db;
		}
	}, {
		key: "getUser",
		value: function getUser() {
			return this.db.get1Entity("users", this._user);
		}
	}, {
		key: "createOrUpdateEntity",
		value: function createOrUpdateEntity(cols, _id, data) {
			var _this3 = this;

			return this.seq = this.seq.then(function () {
				return _this3.db.get1Entity(cols, { _id: _id }).then(function (doc) {
					return _this3.db.createEntity(cols, _extends({ _id: _id }, doc, data));
				}).catch(console.error);
			});
		}
	}, {
		key: "removeEntity",
		value: function removeEntity(cols, _id) {
			var _this4 = this;

			return this.seq = this.seq.then(function () {
				return _this4.db.remove1Entity(cols, { _id: _id }).catch(console.error);
			});
		}
	}]);

	return WebSQLOffline;
}(Offline);

exports.default = WebSQLOffline;