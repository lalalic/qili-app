"use strict";

var instance,
    IMAGE_DATA_SCHEME_LEN = "data:image/jpeg;base64,".length,
    input,
    _imgSizer;

function main() {
    var type = arguments.length <= 0 || arguments[0] === undefined ? "json" : arguments[0];
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
        setTimeout(function () {
            return input.click();
        }, 100);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLFFBQUo7SUFDSSx3QkFBc0IsMEJBQTBCLE1BQTFCO0lBQ3RCLEtBRko7SUFFVSxTQUZWOztBQUlBLFNBQVMsSUFBVCxHQUF5QztRQUEzQiw2REFBSyxzQkFBc0I7UUFBZCxxQkFBYztRQUFQLHNCQUFPOzs7O0FBR3JDLFFBQUcsU0FBTyxJQUFQLEVBQVk7QUFDWCxnQkFBTSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBTixDQURXO0FBRVgsY0FBTSxJQUFOLEdBQVcsTUFBWCxDQUZXO0FBR1gsb0JBQVUsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVYsQ0FIVztBQUlYLGtCQUFVLEtBQVYsQ0FBZ0IsUUFBaEIsR0FBeUIsTUFBTSxLQUFOLENBQVksUUFBWixHQUFxQixVQUFyQixDQUpkO0FBS1gsa0JBQVUsS0FBVixDQUFnQixJQUFoQixHQUFxQixNQUFNLEtBQU4sQ0FBWSxJQUFaLEdBQWlCLFNBQWpCLENBTFY7O0FBT1gsaUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBMUIsRUFQVztBQVFYLGlCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLFNBQTFCLEVBUlc7S0FBZjs7QUFXQSxXQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQsRUFBa0I7QUFDakMsWUFBSSxhQUFXLFNBQU8sTUFBUDtZQUNYLE9BQUssS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFlLE1BQWYsQ0FBTCxDQUY2Qjs7QUFJakMsY0FBTSxRQUFOLEdBQWUsWUFBVTtBQUNyQixnQkFBSSxPQUFLLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBTCxDQURpQjtBQUVyQixnQkFBRyxRQUFNLElBQU4sRUFDQyxPQURKOztBQUdBLGdCQUFHLFFBQU0sS0FBTixFQUFZO0FBQ1gsd0JBQVEsSUFBUixFQURXO0FBRVgscUJBQUssS0FBTCxHQUFXLEVB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QUosRUFBVyxDQUEzQyxFQUE2QyxDQUE3QyxFQUErQyxVQUFVLEtBQVYsRUFBaUIsVUFBVSxNQUFWLENBQWhFLENBUCtCO0FBUS9CLFdBQU8sVUFBVSxTQUFWLENBQW9CLFlBQXBCLENBQVAsQ0FSK0I7Q0FBbkM7O0FBV0EsS0FBSyxRQUFMLEdBQWMsVUFBQyxPQUFEO1dBQVcsS0FBSyxRQUFRLE1BQVIsQ0FBZSxxQkFBZixDQUFMO0NBQVg7O0FBRWQsT0FBTyxPQUFQLEdBQWU7QUFDWCxjQURXO0FBRVgsY0FBUyxLQUFLLFFBQUw7QUFDVCw4Q0FBZ0I7QUFDWixlQUFPLEtBQUssTUFBTCxDQUFQLENBRFk7S0FITDtBQU1YLHNEQUFvQjtBQUNoQixlQUFPLEtBQUssVUFBTCxDQUFQLENBRGdCO0tBTlQ7QUFTWCw4Q0FBZ0IsT0FBTSxRQUFPO0FBQ3pCLGVBQU8sdUJBQUssMkNBQVcsV0FBaEIsQ0FBUCxDQUR5QjtLQVRsQjtBQVlYLDhDQUFnQjtBQUNaLGVBQU8sS0FBSyxNQUFMLENBQVAsQ0FEWTtLQVpMO0FBZVgsOEJBQVE7QUFDSixlQUFPLHVCQUFLLHlDQUFTLFdBQWQsQ0FBUCxDQURJO0tBZkc7Q0FBZiIsImZpbGUiOiJmaWxlLXNlbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGluc3RhbmNlLFxuICAgIElNQUdFX0RBVEFfU0NIRU1FX0xFTj1cImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIubGVuZ3RoLFxuICAgIGlucHV0LF9pbWdTaXplcjtcblxuZnVuY3Rpb24gbWFpbih0eXBlPVwianNvblwiLCB3aWR0aCwgaGVpZ2h0KXtcbiAgICAvL3JldHVybiBQcm9taXNlLmFzKFwiaHR0cDovL3RzMi5tbS5iaW5nLm5ldC90aD9pZD1KTi50ektsaWVnNHc4ZVlKZkRCa0VIb0F3JnBpZD0xNS4xXCIpXG5cbiAgICBpZihpbnB1dD09bnVsbCl7XG4gICAgICAgIGlucHV0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgaW5wdXQudHlwZT1cImZpbGVcIlxuICAgICAgICBfaW1nU2l6ZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICAgICAgX2ltZ1NpemVyLnN0eWxlLnBvc2l0aW9uPWlucHV0LnN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcbiAgICAgICAgX2ltZ1NpemVyLnN0eWxlLmxlZnQ9aW5wdXQuc3R5bGUubGVmdD0nLTk5OTlweCdcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlucHV0KVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKF9pbWdTaXplcilcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICB2YXIgbmVlZFJlc2l6ZT13aWR0aHx8aGVpZ2h0LFxuICAgICAgICAgICAgc2l6ZT1NYXRoLm1heCh3aWR0aCxoZWlnaHQpO1xuXG4gICAgICAgIGlucHV0Lm9uY2hhbmdlPWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgZmlsZT10aGlzLmZpbGVzWzBdO1xuICAgICAgICAgICAgaWYoZmlsZT09bnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIGlmKHR5cGU9PSdyYXcnKXtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGUpXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZT1cIlwiXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIG5hbWU9ZmlsZS5uYW1lLFxuICAgIFx0XHRcdHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZD1mdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWU9XCJcIlxuICAgICAgICAgICAgICAgIHZhciBkYXRhPXJlYWRlci5yZXN1bHRcbiAgICAgICAgICAgICAgICBzd2l0Y2godHlwZSl7XG4gICAgXHRcdFx0Y2FzZSAnaW1hZ2UnOlxuICAgIFx0XHRcdFx0aWYobmVlZFJlc2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1nPW5ldyBJbWFnZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPWRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5vbmxvYWQ9KCk9PnJlc29sdmUoe3VybDpyZXNpemUoZGF0YSwgc2l6ZSwgaW1nKSxuYW1lfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5vbmVycm9yPSgpPT5yZXNvbHZlKHt1cmw6ZGF0YSxuYW1lfSlcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcbiAgICBcdFx0XHRcdCAgICByZXNvbHZlKHt1cmw6ZGF0YSwgbmFtZX0pXG4gICAgXHRcdFx0XHRicmVha1xuICAgIFx0XHRcdGNhc2UgJ2pzb24nOlxuICAgIFx0XHRcdFx0cmVzb2x2ZSh7ZGF0YTpKU09OLnBhcnNlKGRhdGEpLCBuYW1lfSlcbiAgICBcdFx0XHRcdGJyZWFrXG4gICAgXHRcdFx0Y2FzZSAnanNvbkluSnMnOlxuICAgIFx0XHRcdFx0cmVzb2x2ZSh7ZGF0YTogZGF0YSAmJiBuZXcgRnVuY3Rpb24oXCJcIixcInJldHVybiBcIitkYXRhKSgpLCBuYW1lfSlcbiAgICBcdFx0XHRcdGJyZWFrXG4gICAgXHRcdFx0ZGVmYXVsdDpcbiAgICBcdFx0XHRcdHJlc29sdmUoe2RhdGEsbmFtZX0pXG4gICAgXHRcdFx0fVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICByZWFkZXIub25lcnJvcj1mdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgICAgICAgICB9XG5cbiAgICBcdFx0c3dpdGNoKHR5cGUpe1xuICAgIFx0XHRjYXNlICdpbWFnZSc6XG4gICAgXHRcdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSlcbiAgICBcdFx0XHRicmVha1xuICAgIFx0XHRkZWZhdWx0OlxuICAgIFx0XHRcdHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpXG4gICAgXHRcdH1cbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KCgpPT5pbnB1dC5jbGljaygpLCAxMDApXG4gICAgfSlcbn1cblxuXG5mdW5jdGlvbiByZXNpemUoZGF0YVVybCwgc2l6ZSwgaW1nKXtcbiAgICB2YXIgY3R4PV9pbWdTaXplci5nZXRDb250ZXh0KCcyZCcpXG4gICAgdmFyIHdoPWltZy53aWR0aC9pbWcuaGVpZ2h0O1xuICAgIF9pbWdTaXplci53aWR0aCA9IHdoPj0xID8gKHNpemU8aW1nLndpZHRoID8gc2l6ZSA6IGltZy53aWR0aCkgOiAoc2l6ZTxpbWcuaGVpZ2h0ID8gTWF0aC5mbG9vcihzaXplKndoKSA6IGltZy53aWR0aCk7XG4gICAgX2ltZ1NpemVyLmhlaWdodCA9IHdoPDEgPyAoc2l6ZTxpbWcuaGVpZ2h0ID8gc2l6ZSA6IGltZy5oZWlnaHQpIDogKHNpemU8aW1nLndpZHRoID8gTWF0aC5mbG9vcihzaXplL3doKSA6IGltZy5oZWlnaHQpO1xuICAgIF9pbWdTaXplci5zdHlsZS53aWR0aD1faW1nU2l6ZXIud2lkdGgrXCJweFwiXG4gICAgX2ltZ1NpemVyLnN0eWxlLmhlaWdodD1faW1nU2l6ZXIuaGVpZ2h0K1wicHhcIlxuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLDAsMCxpbWcud2lkdGgsaW1nLmhlaWdodCwwLDAsX2ltZ1NpemVyLndpZHRoLCBfaW1nU2l6ZXIuaGVpZ2h0KTtcbiAgICByZXR1cm4gX2ltZ1NpemVyLnRvRGF0YVVSTChcImltYWdlL2pwZWdcIilcbn1cblxubWFpbi50b0JpbmFyeT0oZGF0YVVybCk9PmF0b2IoZGF0YVVybC5zdWJzdHIoSU1BR0VfREFUQV9TQ0hFTUVfTEVOKSlcblxubW9kdWxlLmV4cG9ydHM9ey8vZm9yIHRlc3RhYmxlXG4gICAgbWFpbixcbiAgICB0b0JpbmFyeTptYWluLnRvQmluYXJ5LFxuICAgIHNlbGVjdEpzb25GaWxlKCl7XG4gICAgICAgIHJldHVybiBtYWluKFwianNvblwiKVxuICAgIH0sXG4gICAgc2VsZWN0SnNvbkluSnNGaWxlKCl7XG4gICAgICAgIHJldHVybiBtYWluKFwianNvbkluSnNcIilcbiAgICB9LFxuICAgIHNlbGVjdEltYWdlRmlsZSh3aWR0aCxoZWlnaHQpe1xuICAgICAgICByZXR1cm4gbWFpbihcImltYWdlXCIsLi4uYXJndW1lbnRzKVxuICAgIH0sXG4gICAgc2VsZWN0VGV4dEZpbGUoKXtcbiAgICAgICAgcmV0dXJuIG1haW4oXCJ0ZXh0XCIpXG4gICAgfSxcbiAgICBzZWxlY3QoKXtcbiAgICAgICAgcmV0dXJuIG1haW4oXCJyYXdcIiwuLi5hcmd1bWVudHMpXG4gICAgfVxufVxuIl19