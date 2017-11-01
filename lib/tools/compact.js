"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var compact = exports.compact = function compact(o) {
  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return o ? keys.reduce(function (a, k) {
    return a[k] = o[k], a;
  }, {}) : {};
};

exports.default = compact;