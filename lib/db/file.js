'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('./service');

var _fileSelector = require('../components/file-selector');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var File = function (_Service$BuiltIn) {
    _inherits(File, _Service$BuiltIn);

    function File() {
        _classCallCheck(this, File);

        return _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).apply(this, arguments));
    }

    _createClass(File, null, [{
        key: 'upload',
        value: function upload(data, props) {
            var _this2 = this;

            var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "http://up.qiniu.com";

            return new Promise(function (resolve, reject) {
                _this2._getToken().then(function (token) {
                    return dataAsBlob(data).then(function (data) {
                        var formData = new FormData();
                        formData.append('file', data);
                        formData.append('token', token);
                        for (var a in props) {
                            formData.append(a, props[a]);
                        }var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText).url);else reject(xhr.responseText);
                            }
                        };

                        xhr.open('POST', url, true);
                        xhr.send(formData);
                    });
                });
            });
        }
    }, {
        key: '_getToken',
        value: function _getToken() {
            return this.ajax({
                method: 'get',
                url: 'http://qili2.com/1/files/token'
            }).then(function (data) {
                return data.token;
            });
        }
    }, {
        key: '_name',
        get: function get() {
            return 'files';
        }
    }]);

    return File;
}(_service.Service.BuiltIn);

exports.default = File;


function dataAsBlob(data) {
    return new Promise(function (resolve, reject) {
        switch (typeof data === 'undefined' ? 'undefined' : _typeof(data)) {
            case 'string':
                if (data.startsWith("file://")) {
                    window.resolveLocalFileSystemURL(data, function (entry) {
                        return entry.file(function (file) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                return resolve(new Blob([new Uint8Array(reader.result)], { type: file.type }));
                            };
                            reader.readAsArrayBuffer(file);
                        }, reject);
                    }, reject);
                } else if (data.startsWith("data:image/jpeg;base64,")) {
                    resolve((0, _fileSelector.toBlob)(data));
                } else resolve(data);
                break;
            default:
                resolve(data);
        }
    });
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maWxlLmpzIl0sIm5hbWVzIjpbIkZpbGUiLCJkYXRhIiwicHJvcHMiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIl9nZXRUb2tlbiIsInRoZW4iLCJkYXRhQXNCbG9iIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInRva2VuIiwiYSIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIm9wZW4iLCJzZW5kIiwiYWpheCIsIm1ldGhvZCIsIkJ1aWx0SW4iLCJzdGFydHNXaXRoIiwid2luZG93IiwicmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTCIsImVudHJ5IiwiZmlsZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJCbG9iIiwiVWludDhBcnJheSIsInJlc3VsdCIsInR5cGUiLCJyZWFkQXNBcnJheUJ1ZmZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7K0JBS0hDLEksRUFBS0MsSyxFQUFnQztBQUFBOztBQUFBLGdCQUExQkMsR0FBMEIsdUVBQXRCLHFCQUFzQjs7QUFDL0MsbUJBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUMzQyx1QkFBS0MsU0FBTCxHQUFpQkMsSUFBakIsQ0FBc0I7QUFBQSwyQkFBT0MsV0FBV1IsSUFBWCxFQUFpQk8sSUFBakIsQ0FBc0IsZ0JBQU07QUFDNUMsNEJBQUlFLFdBQVMsSUFBSUMsUUFBSixFQUFiO0FBQ0FELGlDQUFTRSxNQUFULENBQWdCLE1BQWhCLEVBQXVCWCxJQUF2QjtBQUNBUyxpQ0FBU0UsTUFBVCxDQUFnQixPQUFoQixFQUF3QkMsS0FBeEI7QUFDQSw2QkFBSSxJQUFJQyxDQUFSLElBQWFaLEtBQWI7QUFDSVEscUNBQVNFLE1BQVQsQ0FBZ0JFLENBQWhCLEVBQWtCWixNQUFNWSxDQUFOLENBQWxCO0FBREoseUJBR0EsSUFBSUMsTUFBSSxJQUFJQyxjQUFKLEVBQVI7QUFDQUQsNEJBQUlFLGtCQUFKLEdBQXlCLFlBQVk7QUFDakMsZ0NBQUlGLElBQUlHLFVBQUosS0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEIsb0NBQUlILElBQUlJLE1BQUosSUFBYyxHQUFkLElBQXFCSixJQUFJSSxNQUFKLEdBQWEsR0FBdEMsRUFDSWQsUUFBUWUsS0FBS0MsS0FBTCxDQUFXTixJQUFJTyxZQUFmLEVBQTZCbkIsR0FBckMsRUFESixLQUdJRyxPQUFPUyxJQUFJTyxZQUFYO0FBQ1A7QUFDSix5QkFQRDs7QUFTQVAsNEJBQUlRLElBQUosQ0FBUyxNQUFULEVBQWdCcEIsR0FBaEIsRUFBb0IsSUFBcEI7QUFDQVksNEJBQUlTLElBQUosQ0FBU2QsUUFBVDtBQUNILHFCQW5CbUIsQ0FBUDtBQUFBLGlCQUF0QjtBQW9CTSxhQXJCTSxDQUFQO0FBc0JIOzs7b0NBRWlCO0FBQ2QsbUJBQU8sS0FBS2UsSUFBTCxDQUFVO0FBQ2JDLHdCQUFPLEtBRE07QUFFYnZCLHFCQUFJO0FBRlMsYUFBVixFQUdKSyxJQUhJLENBR0MsVUFBQ1AsSUFBRDtBQUFBLHVCQUFRQSxLQUFLWSxLQUFiO0FBQUEsYUFIRCxDQUFQO0FBSUg7Ozs0QkFsQ2lCO0FBQ2QsbUJBQU8sT0FBUDtBQUNOOzs7O0VBSGdDLGlCQUFRYyxPOztrQkFBckIzQixJOzs7QUFzQ3JCLFNBQVNTLFVBQVQsQ0FBb0JSLElBQXBCLEVBQXlCO0FBQ3hCLFdBQU8sSUFBSUcsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVCxFQUFrQjtBQUNwQyx1QkFBY0wsSUFBZCx5Q0FBY0EsSUFBZDtBQUNBLGlCQUFLLFFBQUw7QUFDQyxvQkFBR0EsS0FBSzJCLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBSCxFQUE4QjtBQUM3QkMsMkJBQU9DLHlCQUFQLENBQWlDN0IsSUFBakMsRUFBdUM7QUFBQSwrQkFBTzhCLE1BQU1DLElBQU4sQ0FBVyxnQkFBTTtBQUM5RCxnQ0FBSUMsU0FBTyxJQUFJQyxVQUFKLEVBQVg7QUFDQUQsbUNBQU9FLE1BQVAsR0FBYztBQUFBLHVDQUFHOUIsUUFBUSxJQUFJK0IsSUFBSixDQUFTLENBQUMsSUFBSUMsVUFBSixDQUFlSixPQUFPSyxNQUF0QixDQUFELENBQVQsRUFBeUMsRUFBQ0MsTUFBS1AsS0FBS08sSUFBWCxFQUF6QyxDQUFSLENBQUg7QUFBQSw2QkFBZDtBQUNBTixtQ0FBT08saUJBQVAsQ0FBeUJSLElBQXpCO0FBQ0EseUJBSjZDLEVBSTVDMUIsTUFKNEMsQ0FBUDtBQUFBLHFCQUF2QyxFQUlXQSxNQUpYO0FBS0EsaUJBTkQsTUFNTSxJQUFHTCxLQUFLMkIsVUFBTCxDQUFnQix5QkFBaEIsQ0FBSCxFQUE4QztBQUNuRHZCLDRCQUFRLDBCQUFPSixJQUFQLENBQVI7QUFDQSxpQkFGSyxNQUdMSSxRQUFRSixJQUFSO0FBQ0Y7QUFDQTtBQUNDSSx3QkFBUUosSUFBUjtBQWREO0FBZ0JBLEtBakJNLENBQVA7QUFrQkEiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuaW1wb3J0IHt0b0Jsb2J9IGZyb20gXCIuLi9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdmaWxlcydcblx0fVxuXG4gICAgc3RhdGljIHVwbG9hZChkYXRhLHByb3BzLHVybD1cImh0dHA6Ly91cC5xaW5pdS5jb21cIil7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0dGhpcy5fZ2V0VG9rZW4oKS50aGVuKHRva2VuPT5kYXRhQXNCbG9iKGRhdGEpLnRoZW4oZGF0YT0+e1xuICAgICAgICAgICAgICAgIHZhciBmb3JtRGF0YT1uZXcgRm9ybURhdGEoKVxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsZGF0YSlcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Rva2VuJyx0b2tlbilcbiAgICAgICAgICAgICAgICBmb3IodmFyIGEgaW4gcHJvcHMpXG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChhLHByb3BzW2FdKVxuXG4gICAgICAgICAgICAgICAgdmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpLnVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB4aHIub3BlbignUE9TVCcsdXJsLHRydWUpXG4gICAgICAgICAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgX2dldFRva2VuKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOidnZXQnLFxuICAgICAgICAgICAgdXJsOidodHRwOi8vcWlsaTIuY29tLzEvZmlsZXMvdG9rZW4nXG4gICAgICAgIH0pLnRoZW4oKGRhdGEpPT5kYXRhLnRva2VuKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGF0YUFzQmxvYihkYXRhKXtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9Pntcblx0XHRzd2l0Y2godHlwZW9mKGRhdGEpKXtcblx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0aWYoZGF0YS5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSl7XG5cdFx0XHRcdHdpbmRvdy5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGRhdGEsIGVudHJ5PT5lbnRyeS5maWxlKGZpbGU9Pntcblx0XHRcdFx0XHRsZXQgcmVhZGVyPW5ldyBGaWxlUmVhZGVyKClcblx0XHRcdFx0XHRyZWFkZXIub25sb2FkPWU9PnJlc29sdmUobmV3IEJsb2IoW25ldyBVaW50OEFycmF5KHJlYWRlci5yZXN1bHQpXSx7dHlwZTpmaWxlLnR5cGV9KSlcblx0XHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSlcblx0XHRcdFx0fSxyZWplY3QpLCByZWplY3QpXG5cdFx0XHR9ZWxzZSBpZihkYXRhLnN0YXJ0c1dpdGgoXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiKSl7XG5cdFx0XHRcdHJlc29sdmUodG9CbG9iKGRhdGEpKVxuXHRcdFx0fWVsc2Vcblx0XHRcdFx0cmVzb2x2ZShkYXRhKVxuXHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJlc29sdmUoZGF0YSlcblx0XHR9XG5cdH0pXG59XG4iXX0=