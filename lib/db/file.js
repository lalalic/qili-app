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

            var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : File.Provider || "http://up.qiniu.com";

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
                url: '' + this.server + this._name + '/token'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maWxlLmpzIl0sIm5hbWVzIjpbIkZpbGUiLCJkYXRhIiwicHJvcHMiLCJ1cmwiLCJQcm92aWRlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiX2dldFRva2VuIiwidGhlbiIsImRhdGFBc0Jsb2IiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwidG9rZW4iLCJhIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0Iiwib3BlbiIsInNlbmQiLCJhamF4IiwibWV0aG9kIiwic2VydmVyIiwiX25hbWUiLCJCdWlsdEluIiwic3RhcnRzV2l0aCIsIndpbmRvdyIsInJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwiLCJlbnRyeSIsImZpbGUiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiQmxvYiIsIlVpbnQ4QXJyYXkiLCJyZXN1bHQiLCJ0eXBlIiwicmVhZEFzQXJyYXlCdWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7OytCQUtIQyxJLEVBQUtDLEssRUFBK0M7QUFBQTs7QUFBQSxnQkFBekNDLEdBQXlDLHVFQUFyQ0gsS0FBS0ksUUFBTCxJQUFlLHFCQUFzQjs7QUFDOUQsbUJBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUMzQyx1QkFBS0MsU0FBTCxHQUFpQkMsSUFBakIsQ0FBc0I7QUFBQSwyQkFBT0MsV0FBV1QsSUFBWCxFQUFpQlEsSUFBakIsQ0FBc0IsZ0JBQU07QUFDNUMsNEJBQUlFLFdBQVMsSUFBSUMsUUFBSixFQUFiO0FBQ0FELGlDQUFTRSxNQUFULENBQWdCLE1BQWhCLEVBQXVCWixJQUF2QjtBQUNBVSxpQ0FBU0UsTUFBVCxDQUFnQixPQUFoQixFQUF3QkMsS0FBeEI7QUFDQSw2QkFBSSxJQUFJQyxDQUFSLElBQWFiLEtBQWI7QUFDSVMscUNBQVNFLE1BQVQsQ0FBZ0JFLENBQWhCLEVBQWtCYixNQUFNYSxDQUFOLENBQWxCO0FBREoseUJBR0EsSUFBSUMsTUFBSSxJQUFJQyxjQUFKLEVBQVI7QUFDQUQsNEJBQUlFLGtCQUFKLEdBQXlCLFlBQVk7QUFDakMsZ0NBQUlGLElBQUlHLFVBQUosS0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEIsb0NBQUlILElBQUlJLE1BQUosSUFBYyxHQUFkLElBQXFCSixJQUFJSSxNQUFKLEdBQWEsR0FBdEMsRUFDSWQsUUFBUWUsS0FBS0MsS0FBTCxDQUFXTixJQUFJTyxZQUFmLEVBQTZCcEIsR0FBckMsRUFESixLQUdJSSxPQUFPUyxJQUFJTyxZQUFYO0FBQ1A7QUFDSix5QkFQRDs7QUFTQVAsNEJBQUlRLElBQUosQ0FBUyxNQUFULEVBQWdCckIsR0FBaEIsRUFBb0IsSUFBcEI7QUFDQWEsNEJBQUlTLElBQUosQ0FBU2QsUUFBVDtBQUNILHFCQW5CbUIsQ0FBUDtBQUFBLGlCQUF0QjtBQW9CTSxhQXJCTSxDQUFQO0FBc0JIOzs7b0NBRWlCO0FBQ2QsbUJBQU8sS0FBS2UsSUFBTCxDQUFVO0FBQ2JDLHdCQUFPLEtBRE07QUFFYnhCLDBCQUFPLEtBQUt5QixNQUFaLEdBQXFCLEtBQUtDLEtBQTFCO0FBRmEsYUFBVixFQUdKcEIsSUFISSxDQUdDLFVBQUNSLElBQUQ7QUFBQSx1QkFBUUEsS0FBS2EsS0FBYjtBQUFBLGFBSEQsQ0FBUDtBQUlIOzs7NEJBbENpQjtBQUNkLG1CQUFPLE9BQVA7QUFDTjs7OztFQUhnQyxpQkFBUWdCLE87O2tCQUFyQjlCLEk7OztBQXNDckIsU0FBU1UsVUFBVCxDQUFvQlQsSUFBcEIsRUFBeUI7QUFDeEIsV0FBTyxJQUFJSSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFTQyxNQUFULEVBQWtCO0FBQ3BDLHVCQUFjTixJQUFkLHlDQUFjQSxJQUFkO0FBQ0EsaUJBQUssUUFBTDtBQUNDLG9CQUFHQSxLQUFLOEIsVUFBTCxDQUFnQixTQUFoQixDQUFILEVBQThCO0FBQzdCQywyQkFBT0MseUJBQVAsQ0FBaUNoQyxJQUFqQyxFQUF1QztBQUFBLCtCQUFPaUMsTUFBTUMsSUFBTixDQUFXLGdCQUFNO0FBQzlELGdDQUFJQyxTQUFPLElBQUlDLFVBQUosRUFBWDtBQUNBRCxtQ0FBT0UsTUFBUCxHQUFjO0FBQUEsdUNBQUdoQyxRQUFRLElBQUlpQyxJQUFKLENBQVMsQ0FBQyxJQUFJQyxVQUFKLENBQWVKLE9BQU9LLE1BQXRCLENBQUQsQ0FBVCxFQUF5QyxFQUFDQyxNQUFLUCxLQUFLTyxJQUFYLEVBQXpDLENBQVIsQ0FBSDtBQUFBLDZCQUFkO0FBQ0FOLG1DQUFPTyxpQkFBUCxDQUF5QlIsSUFBekI7QUFDQSx5QkFKNkMsRUFJNUM1QixNQUo0QyxDQUFQO0FBQUEscUJBQXZDLEVBSVdBLE1BSlg7QUFLQSxpQkFORCxNQU1NLElBQUdOLEtBQUs4QixVQUFMLENBQWdCLHlCQUFoQixDQUFILEVBQThDO0FBQ25EekIsNEJBQVEsMEJBQU9MLElBQVAsQ0FBUjtBQUNBLGlCQUZLLE1BR0xLLFFBQVFMLElBQVI7QUFDRjtBQUNBO0FBQ0NLLHdCQUFRTCxJQUFSO0FBZEQ7QUFnQkEsS0FqQk0sQ0FBUDtBQWtCQSIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UnXG5pbXBvcnQge3RvQmxvYn0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZmlsZS1zZWxlY3RvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGUgZXh0ZW5kcyBTZXJ2aWNlLkJ1aWx0SW57XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICByZXR1cm4gJ2ZpbGVzJ1xuXHR9XG5cbiAgICBzdGF0aWMgdXBsb2FkKGRhdGEscHJvcHMsdXJsPUZpbGUuUHJvdmlkZXJ8fFwiaHR0cDovL3VwLnFpbml1LmNvbVwiKXtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHR0aGlzLl9nZXRUb2tlbigpLnRoZW4odG9rZW49PmRhdGFBc0Jsb2IoZGF0YSkudGhlbihkYXRhPT57XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1EYXRhPW5ldyBGb3JtRGF0YSgpXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJyxkYXRhKVxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndG9rZW4nLHRva2VuKVxuICAgICAgICAgICAgICAgIGZvcih2YXIgYSBpbiBwcm9wcylcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGEscHJvcHNbYV0pXG5cbiAgICAgICAgICAgICAgICB2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkudXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJyx1cmwsdHJ1ZSlcbiAgICAgICAgICAgICAgICB4aHIuc2VuZChmb3JtRGF0YSlcbiAgICAgICAgICAgIH0pKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBfZ2V0VG9rZW4oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICB1cmw6YCR7dGhpcy5zZXJ2ZXJ9JHt0aGlzLl9uYW1lfS90b2tlbmBcbiAgICAgICAgfSkudGhlbigoZGF0YSk9PmRhdGEudG9rZW4pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkYXRhQXNCbG9iKGRhdGEpe1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuXHRcdHN3aXRjaCh0eXBlb2YoZGF0YSkpe1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRpZihkYXRhLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpKXtcblx0XHRcdFx0d2luZG93LnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoZGF0YSwgZW50cnk9PmVudHJ5LmZpbGUoZmlsZT0+e1xuXHRcdFx0XHRcdGxldCByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKVxuXHRcdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZT0+cmVzb2x2ZShuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkocmVhZGVyLnJlc3VsdCldLHt0eXBlOmZpbGUudHlwZX0pKVxuXHRcdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKVxuXHRcdFx0XHR9LHJlamVjdCksIHJlamVjdClcblx0XHRcdH1lbHNlIGlmKGRhdGEuc3RhcnRzV2l0aChcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIpKXtcblx0XHRcdFx0cmVzb2x2ZSh0b0Jsb2IoZGF0YSkpXG5cdFx0XHR9ZWxzZVxuXHRcdFx0XHRyZXNvbHZlKGRhdGEpXG5cdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmVzb2x2ZShkYXRhKVxuXHRcdH1cblx0fSlcbn1cbiJdfQ==