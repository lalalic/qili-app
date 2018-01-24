"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataService = require("./data-service");

var _dataService2 = _interopRequireDefault(_dataService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_DataService) {
    _inherits(_class, _DataService);

    function _class(id) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));

        _this.db = window.openDatabase(id, "1.0", id, 5 * 1024 * 1024);
        _this.db.transaction(function (tx) {
            return tx.executeSql("create table  if not exists docs(\n                col TEXT NOT NULL,\n                id TEXT NOT NULL,\n                state TEXT NOT NULL,\n                doc TEXT,\n                PRIMARY KEY (col, id)\n            )", [], null, function (tx, error) {
                return console.error(error);
            });
        });
        return _this;
    }

    _createClass(_class, [{
        key: "collection",
        value: function collection(cols) {
            return this.findEntity(cols);
        }
    }, {
        key: "createEntity",
        value: function createEntity(cols, _ref) {
            var _this2 = this;

            var _id = _ref._id,
                doc = _objectWithoutProperties(_ref, ["_id"]);

            _id = _id || this.makeId();
            var data = _extends({ _id: _id }, doc);
            return new Promise(function (resolve, reject) {
                _this2.db.transaction(function (tx) {
                    return tx.executeSql("insert or replace into docs(col,id,doc,state) values(?, ?, ?, ?)", [cols, _id, JSON.stringify(data), "upserted"], function () {
                        return resolve(data);
                    }, function (tx, e) {
                        return reject(e);
                    });
                });
            });
        }
    }, {
        key: "updateEntity",
        value: function updateEntity(cols, query, doc) {
            var _this3 = this;

            var _get1Entity = this.get1Entity(cols, query),
                _id = _get1Entity._id;

            var updatedAt = new Date();
            var data = _extends({}, doc, { _id: _id, updatedAt: updatedAt });
            return new Promise(function (resolve, reject) {
                return _this3.db.transaction(function (tx) {
                    return tx.executeSql("replace into docs(col, id, doc,state) values(?,?,?,?)", [cols, _id, JSON.stringify(data), "upserted"], function () {
                        return resolve(updatedAt);
                    }, function (tx, e) {
                        return reject(e);
                    });
                });
            });
        }
    }, {
        key: "patchEntity",
        value: function patchEntity(cols, query, patch) {
            var _this4 = this;

            var _get1Entity2 = this.get1Entity(cols, query),
                _id = _get1Entity2._id,
                raw = _objectWithoutProperties(_get1Entity2, ["_id"]);

            var updatedAt = new Date();
            var data = _extends({}, raw, patch, { _id: _id, updatedAt: updatedAt });
            return new Promise(function (resolve, reject) {
                return _this4.db.transaction(function (tx) {
                    return tx.executeSql("replace into docs(col, id, doc,state) values(?,?,?,?)", [cols, _id, JSON.stringify(data), "upserted"], function () {
                        return resolve(updatedAt);
                    }, function (tx, e) {
                        return reject(e);
                    });
                });
            });
        }
    }, {
        key: "remove1Entity",
        value: function remove1Entity(cols, query) {
            var _this5 = this;

            var _get1Entity3 = this.get1Entity(cols, query),
                _id = _get1Entity3._id,
                raw = _objectWithoutProperties(_get1Entity3, ["_id"]);

            var data = _extends({ _id: _id }, raw);
            return new Promise(function (resolve, reject) {
                return _this5.db.transaction(function (tx) {
                    return tx.executeSql("delete from docs where col=? and id=?", [cols, _id], resolve, function (tx, e) {
                        return reject(e);
                    });
                });
            });
        }
    }, {
        key: "get1Entity",
        value: function get1Entity(cols, _ref2) {
            var _this6 = this;

            var _id = _ref2._id,
                query = _objectWithoutProperties(_ref2, ["_id"]);

            if (_id) {
                return new Promise(function (resolve, reject) {
                    return _this6.db.transaction(function (tx) {
                        return tx.executeSql("select doc from docs where col=? and id=?", [cols, _id], function (tx, _ref3) {
                            var rows = _ref3.rows;

                            resolve(rows.length > 0 ? JSON.parse(rows[0].doc) : undefined);
                        }, function (tx, e) {
                            return reject(e);
                        });
                    });
                });
            } else {
                return this.findEntity(cols, query).then(function (docs) {
                    return docs[0];
                });
            }
        }
    }, {
        key: "findEntity",
        value: function findEntity(cols) {
            var _this7 = this;

            var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (cursor) {
                return cursor;
            };

            return new Promise(function (resolve, reject) {
                return _this7.db.transaction(function (tx) {
                    return tx.executeSql("select doc from docs where col=?", [cols], function (tx, _ref4) {
                        var rows = _ref4.rows;

                        var filtered = [];

                        var _loop = function _loop(i) {
                            var doc = JSON.parse(rows[i].doc);
                            if (Object.keys(query).reduce(function (state, k) {
                                return doc[k] === query[k] && state;
                            }, true)) filtered.push(doc);
                        };

                        for (var i = 0; i < rows.length; i++) {
                            _loop(i);
                        }
                        resolve(filtered);
                    }, function (tx, e) {
                        return reject(e);
                    });
                });
            });
        }
    }]);

    return _class;
}(_dataService2.default);

exports.default = _class;
module.exports = exports['default'];