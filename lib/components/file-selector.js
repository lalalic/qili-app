"use strict";

var instance,
    IMAGE_DATA_SCHEME_LEN = "data:image/jpeg;base64,".length,
    input,
    _imgSizer;

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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiaW5zdGFuY2UiLCJJTUFHRV9EQVRBX1NDSEVNRV9MRU4iLCJsZW5ndGgiLCJpbnB1dCIsIl9pbWdTaXplciIsIm1haW4iLCJ0eXBlIiwid2lkdGgiLCJoZWlnaHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsInBvc2l0aW9uIiwibGVmdCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibmVlZFJlc2l6ZSIsInNpemUiLCJNYXRoIiwibWF4Iiwib25jaGFuZ2UiLCJmaWxlIiwiZmlsZXMiLCJ2YWx1ZSIsIm5hbWUiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZGF0YSIsInJlc3VsdCIsImltZyIsIkltYWdlIiwic3JjIiwidXJsIiwicmVzaXplIiwib25lcnJvciIsIkpTT04iLCJwYXJzZSIsIkZ1bmN0aW9uIiwiYmluZCIsImVycm9yIiwicmVhZEFzRGF0YVVSTCIsInJlYWRBc1RleHQiLCJjbGljayIsImRhdGFVcmwiLCJjdHgiLCJnZXRDb250ZXh0Iiwid2giLCJmbG9vciIsImRyYXdJbWFnZSIsInRvRGF0YVVSTCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzZWxlY3RKc29uRmlsZSIsInNlbGVjdEpzb25JbkpzRmlsZSIsInNlbGVjdEltYWdlRmlsZSIsImFyZ3VtZW50cyIsInNlbGVjdFRleHRGaWxlIiwic2VsZWN0IiwidG9CbG9iIiwiY29udGVudFR5cGUiLCJzbGljZVNpemUiLCJieXRlQ2hhcmFjdGVycyIsImF0b2IiLCJzdWJzdHIiLCJieXRlQXJyYXlzIiwib2Zmc2V0Iiwic2xpY2UiLCJieXRlTnVtYmVycyIsIkFycmF5IiwiaSIsImNoYXJDb2RlQXQiLCJieXRlQXJyYXkiLCJVaW50OEFycmF5IiwicHVzaCIsImJsb2IiLCJCbG9iIl0sIm1hcHBpbmdzIjoiOztBQUFBLElB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RSxNQUExQixFQUFrQ3VFLEdBQWxDLEVBQXVDO0FBQ3RDRiw0QkFBWUUsQ0FBWixJQUFpQkgsTUFBTUksVUFBTixDQUFpQkQsQ0FBakIsQ0FBakI7QUFDQTs7QUFFRCxnQkFBSUUsWUFBWSxJQUFJQyxVQUFKLENBQWVMLFdBQWYsQ0FBaEI7O0FBRUFILHVCQUFXUyxJQUFYLENBQWdCRixTQUFoQjtBQUNBOztBQUVELFlBQUlHLE9BQU8sSUFBSUMsSUFBSixDQUFTWCxVQUFULEVBQXFCLEVBQUM5RCxNQUFNeUQsV0FBUCxFQUFyQixDQUFYO0FBQ0EsZUFBT2UsSUFBUDtBQUNBO0FBcENhLENBQWYiLCJmaWxlIjoiZmlsZS1zZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBpbnN0YW5jZSxcclxuICAgIElNQUdFX0RBVEFfU0NIRU1FX0xFTj1cImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIubGVuZ3RoLFxyXG4gICAgaW5wdXQsX2ltZ1NpemVyO1xyXG5cclxuZnVuY3Rpb24gbWFpbih0eXBlPVwianNvblwiLCB3aWR0aCwgaGVpZ2h0KXtcclxuICAgIC8vcmV0dXJuIFByb21pc2UuYXMoXCJodHRwOi8vdHMyLm1tLmJpbmcubmV0L3RoP2lkPUpOLnR6S2xpZWc0dzhlWUpmREJrRUhvQXcmcGlkPTE1LjFcIilcclxuXHJcbiAgICBpZihpbnB1dD09bnVsbCl7XHJcbiAgICAgICAgaW5wdXQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxyXG4gICAgICAgIGlucHV0LnR5cGU9XCJmaWxlXCJcclxuICAgICAgICBfaW1nU2l6ZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcclxuICAgICAgICBfaW1nU2l6ZXIuc3R5bGUucG9zaXRpb249aW5wdXQuc3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xyXG4gICAgICAgIF9pbWdTaXplci5zdHlsZS5sZWZ0PWlucHV0LnN0eWxlLmxlZnQ9Jy05OTk5cHgnXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5wdXQpXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChfaW1nU2l6ZXIpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICB2YXIgbmVlZFJlc2l6ZT13aWR0aHx8aGVpZ2h0LFxyXG4gICAgICAgICAgICBzaXplPU1hdGgubWF4KHdpZHRoLGhlaWdodCk7XHJcblxyXG4gICAgICAgIGlucHV0Lm9uY2hhbmdlPWZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBmaWxlPXRoaXMuZmlsZXNbMF07XHJcbiAgICAgICAgICAgIGlmKGZpbGU9PW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlPT0ncmF3Jyl7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlPVwiXCJcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIG5hbWU9ZmlsZS5uYW1lLFxyXG4gICAgXHRcdFx0cmVhZGVyPW5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWU9XCJcIlxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGE9cmVhZGVyLnJlc3VsdFxyXG4gICAgICAgICAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgXHRcdFx0Y2FzZSAnaW1hZ2UnOlxyXG4gICAgXHRcdFx0XHRpZihuZWVkUmVzaXplKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltZz1uZXcgSW1hZ2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPWRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZD0oKT0+cmVzb2x2ZSh7dXJsOnJlc2l6ZShkYXRhLCBzaXplLCBpbWcpLG5hbWV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcub25lcnJvcj0oKT0+cmVzb2x2ZSh7dXJsOmRhdGEsbmFtZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgIFx0XHRcdFx0ICAgIHJlc29sdmUoe3VybDpkYXRhLCBuYW1lfSlcclxuICAgIFx0XHRcdFx0YnJlYWtcclxuICAgIFx0XHRcdGNhc2UgJ2pzb24nOlxyXG4gICAgXHRcdFx0XHRyZXNvbHZlKHtkYXRhOkpTT04ucGFyc2UoZGF0YSksIG5hbWV9KVxyXG4gICAgXHRcdFx0XHRicmVha1xyXG4gICAgXHRcdFx0Y2FzZSAnanNvbkluSnMnOlxyXG4gICAgXHRcdFx0XHRyZXNvbHZlKHtkYXRhOiBkYXRhICYmIG5ldyBGdW5jdGlvbihcIlwiLFwicmV0dXJuIFwiK2RhdGEpKCksIG5hbWV9KVxyXG4gICAgXHRcdFx0XHRicmVha1xyXG4gICAgXHRcdFx0ZGVmYXVsdDpcclxuICAgIFx0XHRcdFx0cmVzb2x2ZSh7ZGF0YSxuYW1lfSlcclxuICAgIFx0XHRcdH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgcmVhZGVyLm9uZXJyb3I9ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICBcdFx0c3dpdGNoKHR5cGUpe1xyXG4gICAgXHRcdGNhc2UgJ2ltYWdlJzpcclxuICAgIFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpXHJcbiAgICBcdFx0XHRicmVha1xyXG4gICAgXHRcdGRlZmF1bHQ6XHJcbiAgICBcdFx0XHRyZWFkZXIucmVhZEFzVGV4dChmaWxlKVxyXG4gICAgXHRcdH1cclxuICAgICAgICB9XHJcblx0XHRcclxuXHRcdGlucHV0LmNsaWNrKClcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiByZXNpemUoZGF0YVVybCwgc2l6ZSwgaW1nKXtcclxuICAgIHZhciBjdHg9X2ltZ1NpemVyLmdldENvbnRleHQoJzJkJylcclxuICAgIHZhciB3aD1pbWcud2lkdGgvaW1nLmhlaWdodDtcclxuICAgIF9pbWdTaXplci53aWR0aCA9IHdoPj0xID8gKHNpemU8aW1nLndpZHRoID8gc2l6ZSA6IGltZy53aWR0aCkgOiAoc2l6ZTxpbWcuaGVpZ2h0ID8gTWF0aC5mbG9vcihzaXplKndoKSA6IGltZy53aWR0aCk7XHJcbiAgICBfaW1nU2l6ZXIuaGVpZ2h0ID0gd2g8MSA/IChzaXplPGltZy5oZWlnaHQgPyBzaXplIDogaW1nLmhlaWdodCkgOiAoc2l6ZTxpbWcud2lkdGggPyBNYXRoLmZsb29yKHNpemUvd2gpIDogaW1nLmhlaWdodCk7XHJcbiAgICBfaW1nU2l6ZXIuc3R5bGUud2lkdGg9X2ltZ1NpemVyLndpZHRoK1wicHhcIlxyXG4gICAgX2ltZ1NpemVyLnN0eWxlLmhlaWdodD1faW1nU2l6ZXIuaGVpZ2h0K1wicHhcIlxyXG4gICAgY3R4LmRyYXdJbWFnZShpbWcsMCwwLGltZy53aWR0aCxpbWcuaGVpZ2h0LDAsMCxfaW1nU2l6ZXIud2lkdGgsIF9pbWdTaXplci5oZWlnaHQpO1xyXG4gICAgcmV0dXJuIF9pbWdTaXplci50b0RhdGFVUkwoXCJpbWFnZS9qcGVnXCIpXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzPXsvL2ZvciB0ZXN0YWJsZVxyXG4gICAgbWFpbixcclxuICAgIHNlbGVjdEpzb25GaWxlKCl7XHJcbiAgICAgICAgcmV0dXJuIG1haW4oXCJqc29uXCIpXHJcbiAgICB9LFxyXG4gICAgc2VsZWN0SnNvbkluSnNGaWxlKCl7XHJcbiAgICAgICAgcmV0dXJuIG1haW4oXCJqc29uSW5Kc1wiKVxyXG4gICAgfSxcclxuICAgIHNlbGVjdEltYWdlRmlsZSh3aWR0aCxoZWlnaHQpe1xyXG4gICAgICAgIHJldHVybiBtYWluKFwiaW1hZ2VcIiwuLi5hcmd1bWVudHMpXHJcbiAgICB9LFxyXG4gICAgc2VsZWN0VGV4dEZpbGUoKXtcclxuICAgICAgICByZXR1cm4gbWFpbihcInRleHRcIilcclxuICAgIH0sXHJcbiAgICBzZWxlY3QoKXtcclxuICAgICAgICByZXR1cm4gbWFpbihcInJhd1wiLC4uLmFyZ3VtZW50cylcclxuICAgIH0sXHJcblx0dG9CbG9iKGRhdGEsY29udGVudFR5cGU9XCJpbWFnZS8qXCIsIHNsaWNlU2l6ZT01MTIpe1xyXG5cdFx0dmFyIGJ5dGVDaGFyYWN0ZXJzID0gYXRvYihkYXRhLnN1YnN0cihJTUFHRV9EQVRBX1NDSEVNRV9MRU4pKVxyXG5cdFx0dmFyIGJ5dGVBcnJheXMgPSBbXTtcclxuXHJcblx0XHRmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBieXRlQ2hhcmFjdGVycy5sZW5ndGg7IG9mZnNldCArPSBzbGljZVNpemUpIHtcclxuXHRcdFx0dmFyIHNsaWNlID0gYnl0ZUNoYXJhY3RlcnMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBzbGljZVNpemUpO1xyXG5cclxuXHRcdFx0dmFyIGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KHNsaWNlLmxlbmd0aCk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2UubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRieXRlTnVtYmVyc1tpXSA9IHNsaWNlLmNoYXJDb2RlQXQoaSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShieXRlTnVtYmVycyk7XHJcblxyXG5cdFx0XHRieXRlQXJyYXlzLnB1c2goYnl0ZUFycmF5KTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgYmxvYiA9IG5ldyBCbG9iKGJ5dGVBcnJheXMsIHt0eXBlOiBjb250ZW50VHlwZX0pO1xyXG5cdFx0cmV0dXJuIGJsb2I7XHJcblx0fVxyXG59XHJcbiJdfQ==