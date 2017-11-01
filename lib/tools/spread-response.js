"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.spreadResponse = spreadResponse;
function spreadResponse(res, spread, props) {
	var values = res;
	if (typeof spread == "function") {
		values = spread(res, props);
	} else if (typeof spread == "string") {
		values = res[spread];
	} else if (spread !== false) {
		var keys = Object.keys(res);
		if (keys.length == 1) {
			var v = res[keys[0]];
			if ((typeof v === "undefined" ? "undefined" : _typeof(v)) == "object") {
				values = v;
			}
		}
	}
	return values;
}

exports.default = spreadResponse;