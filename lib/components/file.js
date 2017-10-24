"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _recompose = require("../tools/recompose");

var IMAGE_DATA_SCHEME_LEN = "data:image/jpeg;base64,".length;
var instance, input, _imgSizer;

function main() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "json";
    var width = arguments[1];
    var height = arguments[2];

    //return Promise.as("http://ts2.mm.bing.net/th?id=JN.tzKlieg4w8eYJfDBkEHoAw&pid=15.1")

    if (input == null) {
        input = document.createElement('input');
        input.type = "file";
        _imgSizer = document.createElement('canvas');
        _imgSizer.style.position = input.style.position = 'absolute';
        _imgSizer.style.left = input.style.left = '-9999px';

        document.body.appendChild(input);
        document.body.appendChild(_imgSizer);
    }

    return new Promise(function (resolve, reject) {
        var needResize = width || height,
            size = Math.max(width, height);

        input.onchange = function () {
            var file = this.files[0];
            if (file == null) return;

            if (type == 'raw') {
                resolve(file);
                this.value = "";
                return;
            }

            var name = file.name,
                reader = new FileReader();
            reader.onload = function () {
                this.value = "";
                var data = reader.result;
                switch (type) {
                    case 'image':
                        if (needResize) {
                            (function () {
                                var img = new Image();
                                img.src = data;
                                img.onload = function () {
                                    return resolve({ url: resize(data, size, img), name: name });
                                };
                                img.onerror = function () {
                                    return resolve({ url: data, name: name });
                                };
                            })();
                        } else resolve({ url: data, name: name });
                        break;
                    case 'json':
                        resolve({ data: JSON.parse(data), name: name });
                        break;
                    case 'jsonInJs':
                        resolve({ data: data && new Function("", "return " + data)(), name: name });
                        break;
                    default:
                        resolve({ data: data, name: name });
                }
            }.bind(this);

            reader.onerror = function () {
                reject(reader.error);
            };

            switch (type) {
                case 'image':
                    reader.readAsDataURL(file);
                    break;
                default:
                    reader.readAsText(file);
            }
        };

        input.click();
    });
}

function resize(dataUrl, size, img) {
    var ctx = _imgSizer.getContext('2d');
    var wh = img.width / img.height;
    _imgSizer.width = wh >= 1 ? size < img.width ? size : img.width : size < img.height ? Math.floor(size * wh) : img.width;
    _imgSizer.height = wh < 1 ? size < img.height ? size : img.height : size < img.width ? Math.floor(size / wh) : img.height;
    _imgSizer.style.width = _imgSizer.width + "px";
    _imgSizer.style.height = _imgSizer.height + "px";
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, _imgSizer.width, _imgSizer.height);
    return _imgSizer.toDataURL("image/jpeg");
}

function dataAsBlob(data) {
    return new Promise(function (resolve, reject) {
        switch (typeof data === "undefined" ? "undefined" : _typeof(data)) {
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
                    resolve(module.exports.toBlob(data));
                } else resolve(data);
                break;
            default:
                resolve(data);
        }
    });
}

module.exports = { //for testable
    main: main,
    selectJsonFile: function selectJsonFile() {
        return main("json");
    },
    selectJsonInJsFile: function selectJsonInJsFile() {
        return main("jsonInJs");
    },
    selectImageFile: function selectImageFile(width, height) {
        return main.apply(undefined, ["image"].concat(Array.prototype.slice.call(arguments)));
    },
    selectTextFile: function selectTextFile() {
        return main("text");
    },
    select: function select() {
        return main.apply(undefined, ["raw"].concat(Array.prototype.slice.call(arguments)));
    },
    toBlob: function toBlob(data) {
        var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "image/*";
        var sliceSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 512;

        var byteCharacters = atob(data.substr(IMAGE_DATA_SCHEME_LEN));
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    },

    root: null, //injected later
    upload: function upload(data, props, token) {
        var url = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "http://up.qiniu.com";

        return new Promise(function (resolve, reject) {
            props = props || {};
            if (!props.id || !props.key) {
                reject("upload must have id and key in props");
            }
            if (module.exports.root) {
                props = _extends({}, props, { key: module.exports.root + "/" + props.id + "/" + props.key });
            }
            dataAsBlob(data).then(function (data) {
                var formData = new FormData();
                formData.append('file', data);
                formData.append('token', token);
                Object.keys(props).forEach(function (a) {
                    return formData.append(a, props[a]);
                });

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText));else reject(xhr.responseText);
                    }
                };

                xhr.open('POST', url, true);
                xhr.send(formData);
            });
        });
    },

    withGetToken: (0, _recompose.withMutation)({
        name: "getToken",
        promise: true,
        mutation: function mutation() {
            return require("./__generated__/file_token_Mutation.graphql");
        }
    })
};