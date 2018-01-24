"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _uuid = Date.now();

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, [{
        key: "makeId",
        value: function makeId() {
            return "" + _uuid++;
        }
    }, {
        key: "getDataLoader",
        value: function getDataLoader(type, f) {
            var _this = this;

            var load = function load(_id) {
                return _this.get1Entity(type, { _id: _id });
            };
            return {
                load: load
            };
        }
    }, {
        key: "collection",
        value: function collection() {}
    }, {
        key: "createEntity",
        value: function createEntity(cols, doc) {}
    }, {
        key: "updateEntity",
        value: function updateEntity(cols, query, doc) {}
    }, {
        key: "patchEntity",
        value: function patchEntity(cols, query, patch) {}
    }, {
        key: "remove1Entity",
        value: function remove1Entity(cols, query) {}
    }, {
        key: "get1Entity",
        value: function get1Entity(cols, query) {}
    }, {
        key: "findEntity",
        value: function findEntity(cols, query) {
            var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (cursor) {
                return cursor;
            };
        }
    }, {
        key: "nextPage",
        value: function nextPage(cols, _ref, filter) {
            var first = _ref.first,
                after = _ref.after;

            return this.findEntity(cols, {}, filter);
        }
    }, {
        key: "prevPage",
        value: function prevPage(cols, _ref2, filter) {
            var last = _ref2.last,
                before = _ref2.before;

            return this.findEntity(cols, {}, filter);
        }
    }]);

    return _class;
}();

exports.default = _class;
module.exports = exports['default'];