"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    return new _promise2.default(function (resolve, reject) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiaW5zdGFuY2UiLCJJTUFHRV9EQVRBX1NDSEVNRV9MRU4iLCJsZW5ndGgiLCJpbnB1dCIsIl9pbWdTaXplciIsIm1haW4iLCJ0eXBlIiwid2lkdGgiLCJoZWlnaHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsInBvc2l0aW9uIiwibGVmdCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInJlc29sdmUiLCJyZWplY3QiLCJuZWVkUmVzaXplIiwic2l6ZSIsIk1hdGgiLCJtYXgiLCJvbmNoYW5nZSIsImZpbGUiLCJmaWxlcyIsInZhbHVlIiwibmFtZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJkYXRhIiwicmVzdWx0IiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJ1cmwiLCJyZXNpemUiLCJvbmVycm9yIiwiSlNPTiIsInBhcnNlIiwiRnVuY3Rpb24iLCJiaW5kIiwiZXJyb3IiLCJyZWFkQXNEYXRhVVJMIiwicmVhZEFzVGV4dCIsImNsaWNrIiwiZGF0YVVybCIsImN0eCIsImdldENvbnRleHQiLCJ3aCIsImZsb29yIiwiZHJhd0ltYWdlIiwidG9EYXRhVVJMIiwidG9CaW5hcnkiLCJhdG9iIiwic3Vic3RyIiwibW9kdWxlIiwiZXhwb3J0cyIsInNlbGVjdEpzb25GaWxlIiwic2VsZWN0SnNvbkluSnNGaWxlIiwic2VsZWN0SW1hZ2VGaWxlIiwiYXJndW1lbnRzIiwic2VsZWN0VGV4dEZpbGUiLCJzZWxlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSUEsUUFBSjtBQUFBLElBQ0lDLHdCQUFzQiwwQkFBMEJDLE1BRHBEO0FBQUEsSUFFSUMsS0FGSjtBQUFBLElBRVVDLFNBRlY7O0FBSUEsU0FBU0MsSUFBVCxHQUF5QztBQUFBLFFBQTNCQyxJQUEyQix1RUFBdEIsTUFBc0I7QUFBQSxRQUFkQyxLQUFjO0FBQUEsUUFBUEMsTUFBTzs7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QkFBZixDQUFMLENBQVg7QUFBQSxDQUFkOztBQUVBdUQsT0FBT0MsT0FBUCxHQUFlLEVBQUM7QUFDWnBELGNBRFc7QUFFWGdELGNBQVNoRCxLQUFLZ0QsUUFGSDtBQUdYSyxrQkFIVyw0QkFHSztBQUNaLGVBQU9yRCxLQUFLLE1BQUwsQ0FBUDtBQUNILEtBTFU7QUFNWHNELHNCQU5XLGdDQU1TO0FBQ2hCLGVBQU90RCxLQUFLLFVBQUwsQ0FBUDtBQUNILEtBUlU7QUFTWHVELG1CQVRXLDJCQVNLckQsS0FUTCxFQVNXQyxNQVRYLEVBU2tCO0FBQ3pCLGVBQU9ILHVCQUFLLE9BQUwsb0NBQWdCd0QsU0FBaEIsR0FBUDtBQUNILEtBWFU7QUFZWEMsa0JBWlcsNEJBWUs7QUFDWixlQUFPekQsS0FBSyxNQUFMLENBQVA7QUFDSCxLQWRVO0FBZVgwRCxVQWZXLG9CQWVIO0FBQ0osZUFBTzFELHVCQUFLLEtBQUwsb0NBQWN3RCxTQUFkLEdBQVA7QUFDSDtBQWpCVSxDQUFmIiwiZmlsZSI6ImZpbGUtc2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaW5zdGFuY2UsXG4gICAgSU1BR0VfREFUQV9TQ0hFTUVfTEVOPVwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIi5sZW5ndGgsXG4gICAgaW5wdXQsX2ltZ1NpemVyO1xuXG5mdW5jdGlvbiBtYWluKHR5cGU9XCJqc29uXCIsIHdpZHRoLCBoZWlnaHQpe1xuICAgIC8vcmV0dXJuIFByb21pc2UuYXMoXCJodHRwOi8vdHMyLm1tLmJpbmcubmV0L3RoP2lkPUpOLnR6S2xpZWc0dzhlWUpmREJrRUhvQXcmcGlkPTE1LjFcIilcblxuICAgIGlmKGlucHV0PT1udWxsKXtcbiAgICAgICAgaW5wdXQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgICAgICBpbnB1dC50eXBlPVwiZmlsZVwiXG4gICAgICAgIF9pbWdTaXplcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgICBfaW1nU2l6ZXIuc3R5bGUucG9zaXRpb249aW5wdXQuc3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xuICAgICAgICBfaW1nU2l6ZXIuc3R5bGUubGVmdD1pbnB1dC5zdHlsZS5sZWZ0PSctOTk5OXB4J1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5wdXQpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoX2ltZ1NpemVyKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgICAgIHZhciBuZWVkUmVzaXplPXdpZHRofHxoZWlnaHQsXG4gICAgICAgICAgICBzaXplPU1hdGgubWF4KHdpZHRoLGhlaWdodCk7XG5cbiAgICAgICAgaW5wdXQub25jaGFuZ2U9ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBmaWxlPXRoaXMuZmlsZXNbMF07XG4gICAgICAgICAgICBpZihmaWxlPT1udWxsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgaWYodHlwZT09J3Jhdycpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZmlsZSlcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlPVwiXCJcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgbmFtZT1maWxlLm5hbWUsXG4gICAgXHRcdFx0cmVhZGVyPW5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkPWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZT1cIlwiXG4gICAgICAgICAgICAgICAgdmFyIGRhdGE9cmVhZGVyLnJlc3VsdFxuICAgICAgICAgICAgICAgIHN3aXRjaCh0eXBlKXtcbiAgICBcdFx0XHRjYXNlICdpbWFnZSc6XG4gICAgXHRcdFx0XHRpZihuZWVkUmVzaXplKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWc9bmV3IEltYWdlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zcmM9ZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZD0oKT0+cmVzb2x2ZSh7dXJsOnJlc2l6ZShkYXRhLCBzaXplLCBpbWcpLG5hbWV9KVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLm9uZXJyb3I9KCk9PnJlc29sdmUoe3VybDpkYXRhLG5hbWV9KVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxuICAgIFx0XHRcdFx0ICAgIHJlc29sdmUoe3VybDpkYXRhLCBuYW1lfSlcbiAgICBcdFx0XHRcdGJyZWFrXG4gICAgXHRcdFx0Y2FzZSAnanNvbic6XG4gICAgXHRcdFx0XHRyZXNvbHZlKHtkYXRhOkpTT04ucGFyc2UoZGF0YSksIG5hbWV9KVxuICAgIFx0XHRcdFx0YnJlYWtcbiAgICBcdFx0XHRjYXNlICdqc29uSW5Kcyc6XG4gICAgXHRcdFx0XHRyZXNvbHZlKHtkYXRhOiBkYXRhICYmIG5ldyBGdW5jdGlvbihcIlwiLFwicmV0dXJuIFwiK2RhdGEpKCksIG5hbWV9KVxuICAgIFx0XHRcdFx0YnJlYWtcbiAgICBcdFx0XHRkZWZhdWx0OlxuICAgIFx0XHRcdFx0cmVzb2x2ZSh7ZGF0YSxuYW1lfSlcbiAgICBcdFx0XHR9XG4gICAgICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgIHJlYWRlci5vbmVycm9yPWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgICAgICAgIH1cblxuICAgIFx0XHRzd2l0Y2godHlwZSl7XG4gICAgXHRcdGNhc2UgJ2ltYWdlJzpcbiAgICBcdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKVxuICAgIFx0XHRcdGJyZWFrXG4gICAgXHRcdGRlZmF1bHQ6XG4gICAgXHRcdFx0cmVhZGVyLnJlYWRBc1RleHQoZmlsZSlcbiAgICBcdFx0fVxuICAgICAgICB9XG5cdFx0XG5cdFx0aW5wdXQuY2xpY2soKVxuICAgIH0pXG59XG5cblxuZnVuY3Rpb24gcmVzaXplKGRhdGFVcmwsIHNpemUsIGltZyl7XG4gICAgdmFyIGN0eD1faW1nU2l6ZXIuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHZhciB3aD1pbWcud2lkdGgvaW1nLmhlaWdodDtcbiAgICBfaW1nU2l6ZXIud2lkdGggPSB3aD49MSA/IChzaXplPGltZy53aWR0aCA/IHNpemUgOiBpbWcud2lkdGgpIDogKHNpemU8aW1nLmhlaWdodCA/IE1hdGguZmxvb3Ioc2l6ZSp3aCkgOiBpbWcud2lkdGgpO1xuICAgIF9pbWdTaXplci5oZWlnaHQgPSB3aDwxID8gKHNpemU8aW1nLmhlaWdodCA/IHNpemUgOiBpbWcuaGVpZ2h0KSA6IChzaXplPGltZy53aWR0aCA/IE1hdGguZmxvb3Ioc2l6ZS93aCkgOiBpbWcuaGVpZ2h0KTtcbiAgICBfaW1nU2l6ZXIuc3R5bGUud2lkdGg9X2ltZ1NpemVyLndpZHRoK1wicHhcIlxuICAgIF9pbWdTaXplci5zdHlsZS5oZWlnaHQ9X2ltZ1NpemVyLmhlaWdodCtcInB4XCJcbiAgICBjdHguZHJhd0ltYWdlKGltZywwLDAsaW1nLndpZHRoLGltZy5oZWlnaHQsMCwwLF9pbWdTaXplci53aWR0aCwgX2ltZ1NpemVyLmhlaWdodCk7XG4gICAgcmV0dXJuIF9pbWdTaXplci50b0RhdGFVUkwoXCJpbWFnZS9qcGVnXCIpXG59XG5cbm1haW4udG9CaW5hcnk9KGRhdGFVcmwpPT5hdG9iKGRhdGFVcmwuc3Vic3RyKElNQUdFX0RBVEFfU0NIRU1FX0xFTikpXG5cbm1vZHVsZS5leHBvcnRzPXsvL2ZvciB0ZXN0YWJsZVxuICAgIG1haW4sXG4gICAgdG9CaW5hcnk6bWFpbi50b0JpbmFyeSxcbiAgICBzZWxlY3RKc29uRmlsZSgpe1xuICAgICAgICByZXR1cm4gbWFpbihcImpzb25cIilcbiAgICB9LFxuICAgIHNlbGVjdEpzb25JbkpzRmlsZSgpe1xuICAgICAgICByZXR1cm4gbWFpbihcImpzb25JbkpzXCIpXG4gICAgfSxcbiAgICBzZWxlY3RJbWFnZUZpbGUod2lkdGgsaGVpZ2h0KXtcbiAgICAgICAgcmV0dXJuIG1haW4oXCJpbWFnZVwiLC4uLmFyZ3VtZW50cylcbiAgICB9LFxuICAgIHNlbGVjdFRleHRGaWxlKCl7XG4gICAgICAgIHJldHVybiBtYWluKFwidGV4dFwiKVxuICAgIH0sXG4gICAgc2VsZWN0KCl7XG4gICAgICAgIHJldHVybiBtYWluKFwicmF3XCIsLi4uYXJndW1lbnRzKVxuICAgIH1cbn1cbiJdfQ==