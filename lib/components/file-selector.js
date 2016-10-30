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

main.toBinary = function (dataUrl) {
    return atob(dataUrl.substr(IMAGE_DATA_SCHEME_LEN));
};

module.exports = { //for testable
    main: main,
    toBinary: main.toBinary,
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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiaW5zdGFuY2UiLCJJTUFHRV9EQVRBX1NDSEVNRV9MRU4iLCJsZW5ndGgiLCJpbnB1dCIsIl9pbWdTaXplciIsIm1haW4iLCJ0eXBlIiwid2lkdGgiLCJoZWlnaHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsInBvc2l0aW9uIiwibGVmdCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibmVlZFJlc2l6ZSIsInNpemUiLCJNYXRoIiwibWF4Iiwib25jaGFuZ2UiLCJmaWxlIiwiZmlsZXMiLCJ2YWx1ZSIsIm5hbWUiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZGF0YSIsInJlc3VsdCIsImltZyIsIkltYWdlIiwic3JjIiwidXJsIiwicmVzaXplIiwib25lcnJvciIsIkpTT04iLCJwYXJzZSIsIkZ1bmN0aW9uIiwiYmluZCIsImVycm9yIiwicmVhZEFzRGF0YVVSTCIsInJlYWRBc1RleHQiLCJjbGljayIsImRhdGFVcmwiLCJjdHgiLCJnZXRDb250ZXh0Iiwid2giLCJmbG9vciIsImRyYXdJbWFnZSIsInRvRGF0YVVSTCIsInRvQmluYXJ5IiwiYXRvYiIsInN1YnN0ciIsIm1vZHVsZSIsImV4cG9ydHMiLCJzZWxlY3RKc29uRmlsZSIsInNlbGVjdEpzb25JbkpzRmlsZSIsInNlbGVjdEltYWdlRmlsZSIsImFyZ3VtZW50cyIsInNlbGVjdFRleHRGaWxlIiwic2VsZWN0Il0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQUo7QUFBQSxJQUNJQyx3QkFBc0IsMEJBQTBCQyxNQURwRDtBQUFBLElBRUlDLEtBRko7QUFBQSxJQUVVQyxTQUZWOztBQUlBLFNBQVNDLElBQVQsR0FBeUM7QUFBQSxRQUEzQkMsSUFBMkIsdUVBQXRCLE1BQXNCO0FBQUEsUUFBZEMsS0FBYztBQUFBLFFBQVBDLE1B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LE1BQVIsQ0FBZXZELHFCQUFmLENBQUwsQ0FBWDtBQUFBLENBQWQ7O0FBRUF3RCxPQUFPQyxPQUFQLEdBQWUsRUFBQztBQUNackQsY0FEVztBQUVYaUQsY0FBU2pELEtBQUtpRCxRQUZIO0FBR1hLLGtCQUhXLDRCQUdLO0FBQ1osZUFBT3RELEtBQUssTUFBTCxDQUFQO0FBQ0gsS0FMVTtBQU1YdUQsc0JBTlcsZ0NBTVM7QUFDaEIsZUFBT3ZELEtBQUssVUFBTCxDQUFQO0FBQ0gsS0FSVTtBQVNYd0QsbUJBVFcsMkJBU0t0RCxLQVRMLEVBU1dDLE1BVFgsRUFTa0I7QUFDekIsZUFBT0gsdUJBQUssT0FBTCxvQ0FBZ0J5RCxTQUFoQixHQUFQO0FBQ0gsS0FYVTtBQVlYQyxrQkFaVyw0QkFZSztBQUNaLGVBQU8xRCxLQUFLLE1BQUwsQ0FBUDtBQUNILEtBZFU7QUFlWDJELFVBZlcsb0JBZUg7QUFDSixlQUFPM0QsdUJBQUssS0FBTCxvQ0FBY3lELFNBQWQsR0FBUDtBQUNIO0FBakJVLENBQWYiLCJmaWxlIjoiZmlsZS1zZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBpbnN0YW5jZSxcbiAgICBJTUFHRV9EQVRBX1NDSEVNRV9MRU49XCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiLmxlbmd0aCxcbiAgICBpbnB1dCxfaW1nU2l6ZXI7XG5cbmZ1bmN0aW9uIG1haW4odHlwZT1cImpzb25cIiwgd2lkdGgsIGhlaWdodCl7XG4gICAgLy9yZXR1cm4gUHJvbWlzZS5hcyhcImh0dHA6Ly90czIubW0uYmluZy5uZXQvdGg/aWQ9Sk4udHpLbGllZzR3OGVZSmZEQmtFSG9BdyZwaWQ9MTUuMVwiKVxuXG4gICAgaWYoaW5wdXQ9PW51bGwpe1xuICAgICAgICBpbnB1dD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgIGlucHV0LnR5cGU9XCJmaWxlXCJcbiAgICAgICAgX2ltZ1NpemVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgICAgIF9pbWdTaXplci5zdHlsZS5wb3NpdGlvbj1pbnB1dC5zdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXG4gICAgICAgIF9pbWdTaXplci5zdHlsZS5sZWZ0PWlucHV0LnN0eWxlLmxlZnQ9Jy05OTk5cHgnXG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbnB1dClcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChfaW1nU2l6ZXIpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgdmFyIG5lZWRSZXNpemU9d2lkdGh8fGhlaWdodCxcbiAgICAgICAgICAgIHNpemU9TWF0aC5tYXgod2lkdGgsaGVpZ2h0KTtcblxuICAgICAgICBpbnB1dC5vbmNoYW5nZT1mdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGZpbGU9dGhpcy5maWxlc1swXTtcbiAgICAgICAgICAgIGlmKGZpbGU9PW51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZih0eXBlPT0ncmF3Jyl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmaWxlKVxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWU9XCJcIlxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciBuYW1lPWZpbGUubmFtZSxcbiAgICBcdFx0XHRyZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlPVwiXCJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YT1yZWFkZXIucmVzdWx0XG4gICAgICAgICAgICAgICAgc3dpdGNoKHR5cGUpe1xuICAgIFx0XHRcdGNhc2UgJ2ltYWdlJzpcbiAgICBcdFx0XHRcdGlmKG5lZWRSZXNpemUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltZz1uZXcgSW1hZ2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnNyYz1kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcub25sb2FkPSgpPT5yZXNvbHZlKHt1cmw6cmVzaXplKGRhdGEsIHNpemUsIGltZyksbmFtZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcub25lcnJvcj0oKT0+cmVzb2x2ZSh7dXJsOmRhdGEsbmFtZX0pXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgXHRcdFx0XHQgICAgcmVzb2x2ZSh7dXJsOmRhdGEsIG5hbWV9KVxuICAgIFx0XHRcdFx0YnJlYWtcbiAgICBcdFx0XHRjYXNlICdqc29uJzpcbiAgICBcdFx0XHRcdHJlc29sdmUoe2RhdGE6SlNPTi5wYXJzZShkYXRhKSwgbmFtZX0pXG4gICAgXHRcdFx0XHRicmVha1xuICAgIFx0XHRcdGNhc2UgJ2pzb25JbkpzJzpcbiAgICBcdFx0XHRcdHJlc29sdmUoe2RhdGE6IGRhdGEgJiYgbmV3IEZ1bmN0aW9uKFwiXCIsXCJyZXR1cm4gXCIrZGF0YSkoKSwgbmFtZX0pXG4gICAgXHRcdFx0XHRicmVha1xuICAgIFx0XHRcdGRlZmF1bHQ6XG4gICAgXHRcdFx0XHRyZXNvbHZlKHtkYXRhLG5hbWV9KVxuICAgIFx0XHRcdH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgcmVhZGVyLm9uZXJyb3I9ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKVxuICAgICAgICAgICAgfVxuXG4gICAgXHRcdHN3aXRjaCh0eXBlKXtcbiAgICBcdFx0Y2FzZSAnaW1hZ2UnOlxuICAgIFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpXG4gICAgXHRcdFx0YnJlYWtcbiAgICBcdFx0ZGVmYXVsdDpcbiAgICBcdFx0XHRyZWFkZXIucmVhZEFzVGV4dChmaWxlKVxuICAgIFx0XHR9XG4gICAgICAgIH1cblx0XHRcblx0XHRpbnB1dC5jbGljaygpXG4gICAgfSlcbn1cblxuXG5mdW5jdGlvbiByZXNpemUoZGF0YVVybCwgc2l6ZSwgaW1nKXtcbiAgICB2YXIgY3R4PV9pbWdTaXplci5nZXRDb250ZXh0KCcyZCcpXG4gICAgdmFyIHdoPWltZy53aWR0aC9pbWcuaGVpZ2h0O1xuICAgIF9pbWdTaXplci53aWR0aCA9IHdoPj0xID8gKHNpemU8aW1nLndpZHRoID8gc2l6ZSA6IGltZy53aWR0aCkgOiAoc2l6ZTxpbWcuaGVpZ2h0ID8gTWF0aC5mbG9vcihzaXplKndoKSA6IGltZy53aWR0aCk7XG4gICAgX2ltZ1NpemVyLmhlaWdodCA9IHdoPDEgPyAoc2l6ZTxpbWcuaGVpZ2h0ID8gc2l6ZSA6IGltZy5oZWlnaHQpIDogKHNpemU8aW1nLndpZHRoID8gTWF0aC5mbG9vcihzaXplL3doKSA6IGltZy5oZWlnaHQpO1xuICAgIF9pbWdTaXplci5zdHlsZS53aWR0aD1faW1nU2l6ZXIud2lkdGgrXCJweFwiXG4gICAgX2ltZ1NpemVyLnN0eWxlLmhlaWdodD1faW1nU2l6ZXIuaGVpZ2h0K1wicHhcIlxuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLDAsMCxpbWcud2lkdGgsaW1nLmhlaWdodCwwLDAsX2ltZ1NpemVyLndpZHRoLCBfaW1nU2l6ZXIuaGVpZ2h0KTtcbiAgICByZXR1cm4gX2ltZ1NpemVyLnRvRGF0YVVSTChcImltYWdlL2pwZWdcIilcbn1cblxubWFpbi50b0JpbmFyeT0oZGF0YVVybCk9PmF0b2IoZGF0YVVybC5zdWJzdHIoSU1BR0VfREFUQV9TQ0hFTUVfTEVOKSlcblxubW9kdWxlLmV4cG9ydHM9ey8vZm9yIHRlc3RhYmxlXG4gICAgbWFpbixcbiAgICB0b0JpbmFyeTptYWluLnRvQmluYXJ5LFxuICAgIHNlbGVjdEpzb25GaWxlKCl7XG4gICAgICAgIHJldHVybiBtYWluKFwianNvblwiKVxuICAgIH0sXG4gICAgc2VsZWN0SnNvbkluSnNGaWxlKCl7XG4gICAgICAgIHJldHVybiBtYWluKFwianNvbkluSnNcIilcbiAgICB9LFxuICAgIHNlbGVjdEltYWdlRmlsZSh3aWR0aCxoZWlnaHQpe1xuICAgICAgICByZXR1cm4gbWFpbihcImltYWdlXCIsLi4uYXJndW1lbnRzKVxuICAgIH0sXG4gICAgc2VsZWN0VGV4dEZpbGUoKXtcbiAgICAgICAgcmV0dXJuIG1haW4oXCJ0ZXh0XCIpXG4gICAgfSxcbiAgICBzZWxlY3QoKXtcbiAgICAgICAgcmV0dXJuIG1haW4oXCJyYXdcIiwuLi5hcmd1bWVudHMpXG4gICAgfVxufVxuIl19